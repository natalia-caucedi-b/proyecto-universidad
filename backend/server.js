import express from 'express';
import cors from 'cors';
import productosRoutes from './routes/productos.routes.js';

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Permitir base64 grandes

app.get('/', (req, res) => {
  res.send('🚀 Servidor backend funcionando correctamente');
});

app.use('/api/productos', productosRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
