const express = require("express");
const router = express.Router();

const puntosController = require("../controllers/puntosController");
const authMiddleware = require("../middleware/authMiddleware");

// Obtener puntos del usuario autenticado
router.get("/mis-puntos", authMiddleware, puntosController.obtenerPuntos);

// Sumar puntos (por retos completados, acciones, etc.)
router.post("/sumar", authMiddleware, puntosController.sumarPuntos);

// Restar puntos (si alguna acción lo requiere)
router.post("/restar", authMiddleware, puntosController.restarPuntos);

// Ranking global de usuarios
router.get("/ranking", puntosController.obtenerRanking);

module.exports = router;