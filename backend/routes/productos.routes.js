import express from "express";
import { pool } from "../db.js";

const router = express.Router();

/**
 * Estructura esperada:
 * {
 *   nombre: string,
 *   descripcion: string,
 *   precio: number,
 *   stock: number,
 *   imagen: string (base64),
 *   fecha_agregado: string (ISO)
 * }
 */

// Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM productos ORDER BY id_producto ASC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
});

// Obtener un producto por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM productos WHERE id_producto = $1", [
      id,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto", error });
  }
});

// Crear un producto
router.post("/", async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, imagen } = req.body;

    const result = await pool.query(
      `INSERT INTO productos (nombre, descripcion, precio, stock, imagen, fecha_agregado)
       VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
      [nombre, descripcion, precio, stock, imagen]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al crear producto", error });
  }
});

// Actualizar parcialmente un producto
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, imagen } = req.body;

    // Armamos dinámicamente el UPDATE según los campos enviados
    const fields = [];
    const values = [];
    let index = 1;

    if (nombre !== undefined) {
      fields.push(`nombre = $${index++}`);
      values.push(nombre);
    }
    if (descripcion !== undefined) {
      fields.push(`descripcion = $${index++}`);
      values.push(descripcion);
    }
    if (precio !== undefined) {
      fields.push(`precio = $${index++}`);
      values.push(precio);
    }
    if (stock !== undefined) {
      fields.push(`stock = $${index++}`);
      values.push(stock);
    }
    if (imagen !== undefined) {
      fields.push(`imagen = $${index++}`);
      values.push(imagen);
    }

    if (fields.length === 0) {
      return res.status(400).json({ message: "No se enviaron campos para actualizar" });
    }

    const query = `
      UPDATE productos
      SET ${fields.join(", ")}
      WHERE id_producto = $${index}
      RETURNING *
    `;

    values.push(id);
    const result = await pool.query(query, values);

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Producto no encontrado" });

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar producto", error });
  }
});


// Eliminar un producto
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM productos WHERE id_producto = $1 RETURNING id_producto",
      [id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Producto no encontrado" });

    res.json({ message: "Producto eliminado", id });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto", error });
  }
});

export default router;
