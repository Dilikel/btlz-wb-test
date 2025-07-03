import pkg from "pg";
import config from "./dotenv.config.js";

const { Pool } = pkg;

const pool = new Pool({
    host: config.postgresHost,
    port: Number(config.postgresPort),
    user: config.postgresUser,
    password: config.postgresPassword,
    database: config.postgresDb,
});

export default pool;
