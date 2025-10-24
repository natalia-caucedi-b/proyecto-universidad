import { Pool } from 'pg';

export const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '1234',
  database: 'postgres',
  port: 5432,
});


// ✅ Probar conexión al iniciar
pool
  .connect()
  .then(() => console.log("🟢 Conectado a PostgreSQL"))
  .catch((err) => console.error("🔴 Error al conectar con PostgreSQL:", err));