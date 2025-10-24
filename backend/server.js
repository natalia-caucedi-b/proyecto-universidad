import express from 'express';
import cors from 'cors';
// Rutas para productos
import productosRoutes from './routes/productos.routes.js';
// Ruta para inicio de sesion
import administradorRouter from "./routes/administrador.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Permitir base64 grandes

app.get('/', (req, res) => {
  res.send('🚀 Servidor backend funcionando correctamente');
});

// Rutas del backend
app.use('/api/productos', productosRoutes);
app.use('/api/administrador', administradorRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
