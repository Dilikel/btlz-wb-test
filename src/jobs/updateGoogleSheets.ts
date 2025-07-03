import { google } from "googleapis";
import config from "../config/dotenv.config.js";
import { getTariffsForToday } from "../utils/getTariffsForToday.js";
import { BoxTariff } from "../types/BoxTariff.js";
import { formattedDate } from "../utils/formattedDate.js";

export async function updateGoogleSheets(spreadsheetId?: string): Promise<void> {
    try {
        const tariffs: BoxTariff[] = await getTariffsForToday();

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: config.googleServiceAccountEmail,
                private_key: config.googlePrivateKey?.replace(/\\n/g, "\n"),
            },
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        const values = [
            ["ID", "Дата", "Название склада", "Доставка + Хранение Экспр", "База доставки", "Объем доставки в литрах", "База хранения", "Хранение литр"],
            ...tariffs.map((t) => [
                t.id,
                t.date ? formattedDate(t.date) : "",
                t.warehouse_name,
                t.delivery_and_storage_expr,
                t.delivery_base,
                t.delivery_liter,
                t.storage_base ?? "",
                t.storage_liter ?? "",
            ]),
        ];

        const numRows = values.length;
        const numCols = values[0].length;

        function columnToLetter(column: number): string {
            let temp,
                letter = "";
            while (column > 0) {
                temp = (column - 1) % 26;
                letter = String.fromCharCode(temp + 65) + letter;
                column = Math.floor((column - temp - 1) / 26);
            }
            return letter;
        }

        const lastColumnLetter = columnToLetter(numCols);
        const range = `stocks_coefs!A1:${lastColumnLetter}${numRows}`;

        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range,
            valueInputOption: "USER_ENTERED",
            requestBody: { values },
        });
    } catch (error) {
        console.error("Ошибка при обновлении Google Sheets:", error);
        throw error;
    }
}
