import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import puntosRoutes from "./routes/puntosRoutes.js";
import retosRoutes from "./routes/retosRoutes.js";

// Cargar variables de entorno
dotenv.config();

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Ruta base para verificar que el servidor funciona
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "API EcoGuía funcionando correctamente 🚀",
  });
});

// Rutas del sistema (API)
app.use("/api/auth", authRoutes);
app.use("/api/puntos", puntosRoutes);
app.use("/api/retos", retosRoutes);

// Manejo global de errores (fallback)
app.use((err, req, res, next) => {
  console.error("🔥 Error en el servidor:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Error interno del servidor",
  });
});

// Puerto dinámico para producción
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🌱 Servidor EcoGuía corriendo en http://localhost:${PORT}`);
});
