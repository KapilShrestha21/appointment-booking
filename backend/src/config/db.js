import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'appointment_db',
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
})

pool.on('connect', () => {
  console.log('Database connected successfully!');
});

pool.on("error", (err) => {
    console.error("Error on Postgres client", err);
    
})

export default pool;