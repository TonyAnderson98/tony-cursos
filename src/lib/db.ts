import { sql } from '@vercel/postgres';

// Configurar a variável de ambiente que o @vercel/postgres espera
if (process.env.DATABASE_URL && !process.env.POSTGRES_URL) {
	process.env.POSTGRES_URL = process.env.DATABASE_URL;
}

export default sql;
