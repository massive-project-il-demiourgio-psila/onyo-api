import type { Config } from 'drizzle-kit';

export default {
    schema: './db/schema/index.ts',
    out: './db/migrations',
    driver: 'mysql2',
    dbCredentials: {
        host: process.env.DB_HOST || "localhost",
        port: (process.env.DB_PORT || 3307) as number,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || "rental",
    },
} satisfies Config;
