import type { Config } from 'drizzle-kit';

const basePath = "./src/infrastructures/data-sources/mysql"

export default {
    schema: basePath + "/schema/index.ts",
    out: basePath + '/migrations',
    driver: 'mysql2',
    dbCredentials: {
        host: process.env.DB_HOST || "127.0.0.1",
        port: (process.env.DB_PORT || 3307) as number,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || "onyo",
    },
} satisfies Config;
