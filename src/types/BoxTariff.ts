export interface BoxTariff {
    id: number;
    date: string;
    warehouse_name: string;
    delivery_and_storage_expr: string;
    delivery_base: string;
    delivery_liter: string;
    storage_base: string | null;
    storage_liter: string | null;
}
