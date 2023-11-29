import z from 'zod'

const envSchema = z.object({
    app: z.object({
        host: z.string().trim(),
        port: z.coerce.number().int().min(0).max(65535),
    }),
    mysql: z.object({
        host: z.string().trim(),
        port: z.coerce.number().int().min(0).max(65535).default(3306),
        user: z.string().default('root'),
        password: z.string().default('root'),
        dbname: z.string().default('onyo'),
    }).required(),
    redis: z.object({
        host: z.string().trim(),
        port: z.coerce.number().int().min(0).max(65535).default(6379),
        user: z.string().default('root'),
        password: z.string().optional(),
        db: z.coerce.number().int().min(0).max(15).default(0),
        url: z.string().url()
    }).required(),
    jwt: z.object({
        iss: z.string().trim().default('onyo-srv'),
        aud: z.string().trim().default('onyo-react-web'),
        accessTokenSecret: z.string().trim(),
        refreshTokenSecret: z.string().trim(),
        accessTokenAge: z.coerce.number().default(600),
    }),
    NODE_ENV: z
        .enum(['development', 'production', 'test'])
        .default('development'),
})

const parsedEnv = envSchema.safeParse({
    app: {
        host: process.env.HOST,
        port: process.env.PORT,
    },
    mysql: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        dbname: process.env.DB_NAME,
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        user: process.env.REDIS_USER,
        password: process.env.REDIS_PWD,
        db: process.env.REDIS_DB,
        url: process.env.REDIS_URL
    },
    jwt: {
        iss: process.env.JWT_ISS,
        aud: process.env.JWT_AUD,
        accessTokenAge: process.env.JWT_ACCESS_TOKEN_AGE,
        accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
        refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    },
    NODE_ENV: process.env.NODE_ENV
})

if (!parsedEnv.success) {
    console.error(parsedEnv.error.issues);
    throw new Error('There is an error with the server environment variables');
}

export const env = parsedEnv.data;
