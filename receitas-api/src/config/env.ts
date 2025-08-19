import 'dotenv/config';

function required(key: string) {
    const v = process.env[key];
    if (!v) throw new Error(`Variavel ${key} é obrigatória`);
    return v;
}

export const env = {
    NODE_ENV: required('NODE_ENV'),
    PORT: Number(required('PORT')),
    DATABASE_URL: required('DATABASE_URL'),
    JWT_SECRET: required('JWT_SECRET'),
    JWT_EXPIRES: required('JWT_EXPIRES'),
};

export function validateEnv() {
    Object.keys(env).forEach((key) => {
        if (env[key as keyof typeof env] === undefined) {
            throw new Error(`Variavel de ambiente ${key} está faltando`);
        }
    });
}
