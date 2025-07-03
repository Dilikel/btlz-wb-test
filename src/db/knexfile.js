import config from "../config/dotenv.config.js";

export default {
    client: "pg",
    connection: {
        host: config.postgresHost,
        port: Number(config.postgresPort),
        user: config.postgresUser,
        password: config.postgresPassword,
        database: config.postgresDb,
    },
    migrations: {
        directory: "./migrations",
    },
};
