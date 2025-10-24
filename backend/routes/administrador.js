import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// 🔹 Endpoint para login
router.post("/login", async (req, res) => {
  try {
    const { usuario, contrasena } = req.body;

    // Verificar que envíen los campos
    if (!usuario || !contrasena) {
      return res.status(400).json({ message: "Usuario y contraseña son requeridos" });
    }

    // Buscar administrador
    const result = await pool.query(
      "SELECT * FROM administrador WHERE usuario = $1 AND contrasena = $2",
      [usuario, contrasena]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const admin = result.rows[0];
    res.json({
      message: "Inicio de sesión exitoso",
      admin: {
        id: admin.id,
        nombre: admin.nombre,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error al iniciar sesión", error });
  }
});

export default router;
