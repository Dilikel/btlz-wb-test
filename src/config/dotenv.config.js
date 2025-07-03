import dotenv from "dotenv";

dotenv.config();

export default {
    wbApiKey: process.env.WB_API_KEY,
    wbApiUrl: process.env.WB_API_URL,
    appPort: process.env.APP_PORT,
    postgresHost: process.env.POSTGRES_HOST,
    postgresPort: process.env.POSTGRES_PORT,
    postgresDb: process.env.POSTGRES_DB,
    postgresUser: process.env.POSTGRES_USER,
    postgresPassword: process.env.POSTGRES_PASSWORD,
    googleSheetsIds: process.env.GOOGLE_SHEETS_IDS?.split(",") || [],
    googleServiceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    googlePrivateKey: process.env.GOOGLE_PRIVATE_KEY,
};
