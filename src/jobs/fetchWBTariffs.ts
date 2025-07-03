import axios from "axios";
import pool from "../config/db.js";
import dayjs from "dayjs";
import config from "../config/dotenv.config.js";

export async function fetchWBTariffs() {
    try {
        const date = dayjs().format("YYYY-MM-DD");

        const { data } = await axios.get(`${config.wbApiUrl}/v1/tariffs/box`, {
            headers: {
                Authorization: `Bearer ${config.wbApiKey}`,
            },
            params: { date },
        });
        const warehouses = data.response?.data?.warehouseList || [];

        for (const w of warehouses) {
            const delivery_and_storage_expr = parseFloat(w.boxDeliveryAndStorageExpr);
            const delivery_base = parseFloat(w.boxDeliveryBase.replace(",", "."));
            const delivery_liter = parseFloat(w.boxDeliveryLiter.replace(",", "."));
            const storage_base = w.boxStorageBase !== "-" ? parseFloat(w.boxStorageBase.replace(",", ".")) : null;
            const storage_liter = w.boxStorageLiter !== "-" ? parseFloat(w.boxStorageLiter.replace(",", ".")) : null;

            const query = `
            INSERT INTO box_tariffs
                (date, warehouse_name, delivery_and_storage_expr, delivery_base, delivery_liter, storage_base, storage_liter)
            VALUES
                ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (date, warehouse_name)
            DO UPDATE SET
                delivery_and_storage_expr = EXCLUDED.delivery_and_storage_expr,
                delivery_base = EXCLUDED.delivery_base,
                delivery_liter = EXCLUDED.delivery_liter,
                storage_base = EXCLUDED.storage_base,
                storage_liter = EXCLUDED.storage_liter
        `;

            await pool.query(query, [date, w.warehouseName, delivery_and_storage_expr, delivery_base, delivery_liter, storage_base, storage_liter]);
        }
    } catch (error) {
        console.error("Ошибка при получении тарифов с апи вб:", error);
    }
}
