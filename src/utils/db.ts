import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Teste de conexão
pool.on('connect', () => console.log('🟢 Conectado ao Neon.tech'));
pool.on('error', (err) => console.error('🔴 Erro de conexão:', err));

export const db = {
    query: async (text: string, params?: any[]) => {
        const client = await pool.connect();
        try {
            return await client.query(text, params);
        } finally {
            client.release();
        }
    }
};