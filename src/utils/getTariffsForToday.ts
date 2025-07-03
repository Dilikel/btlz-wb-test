import pool from "../config/db.js";
import { BoxTariff } from "../types/BoxTariff.js";
import dayjs from "dayjs";

export async function getTariffsForToday(): Promise<BoxTariff[]> {
    const today = dayjs().format("YYYY-MM-DD");
    const query = `
    SELECT id, date, warehouse_name, delivery_and_storage_expr, delivery_base, delivery_liter, storage_base, storage_liter
    FROM box_tariffs
    WHERE date = $1
  `;
    try {
        const result = await pool.query<BoxTariff>(query, [today]);
        return result.rows;
    } catch (error) {
        console.error("Ошибка при получении тарифов:", error);
        throw error;
    }
}
