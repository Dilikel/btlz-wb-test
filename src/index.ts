import cron from "node-cron";
import { fetchWBTariffs } from "./jobs/fetchWBTariffs.js";
import { updateGoogleSheets } from "./jobs/updateGoogleSheets.js";
import config from "./config/dotenv.config.js";

(async () => {
    console.log("Первичная загрузка данных с вб и обновление Google Sheets...");
    try {
        await fetchWBTariffs();
        for (const id of config.googleSheetsIds) {
            console.log(`Первичная загрузка данных для таблицы с ID: ${id}...`);
            await updateGoogleSheets(id);
        }
        console.log("Первичная загрузка успешно завершено");
    } catch (error) {
        console.error("Ошибка при первичной загрузке:", error);
    }
})();

cron.schedule("0 * * * *", async () => {
    console.log("Ежечасная загрузка данных с вб...");
    try {
        await fetchWBTariffs();
        console.log("Ежечасная загрузка успешна");
    } catch (error) {
        console.error("Ошибка при ежечасной загрузке:", error);
    }
});

cron.schedule("0 0 * * *", async () => {
    console.log("Ежедневная обновление Google Sheets...");
    try {
        for (const id of config.googleSheetsIds) {
            console.log(`Обновление данных для таблицы с ID: ${id}...`);
            await updateGoogleSheets(id);
        }
        console.log("Ежедневное обновление успешно завершено Google Sheets");
    } catch (error) {
        console.error("Ошибка при ежедневном обновлении Google Sheets:", error);
    }
});
