const Reto = require("../models/Reto");
const Usuario = require("../models/Usuario");

// Obtener todos los retos
exports.obtenerRetos = async (req, res) => {
    try {
        const retos = await Reto.find();
        res.json(retos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los retos" });
    }
};

// Obtener un reto por ID
exports.obtenerRetoPorId = async (req, res) => {
    try {
        const reto = await Reto.findById(req.params.id);
        if (!reto) return res.status(404).json({ mensaje: "Reto no encontrado" });
        res.json(reto);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al buscar el reto" });
    }
};

// Crear un reto
exports.crearReto = async (req, res) => {
    try {
        const nuevoReto = new Reto(req.body);
        await nuevoReto.save();
        res.status(201).json({ mensaje: "Reto creado correctamente", reto: nuevoReto });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear el reto" });
    }
};

// Editar un reto
exports.editarReto = async (req, res) => {
    try {
        const retoActualizado = await Reto.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!retoActualizado)
            return res.status(404).json({ mensaje: "Reto no encontrado" });

        res.json({ mensaje: "Reto actualizado", reto: retoActualizado });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el reto" });
    }
};

// Eliminar un reto
exports.eliminarReto = async (req, res) => {
    try {
        const eliminado = await Reto.findByIdAndDelete(req.params.id);
        if (!eliminado)
            return res.status(404).json({ mensaje: "Reto no encontrado" });

        res.json({ mensaje: "Reto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el reto" });
    }
};

// Marcar reto como completado
exports.completarReto = async (req, res) => {
    try {
        const retoId = req.params.id;
        const usuarioId = req.user.id; // viene del authMiddleware

        const reto = await Reto.findById(retoId);
        if (!reto)
            return res.status(404).json({ mensaje: "Reto no encontrado" });

        const usuario = await Usuario.findById(usuarioId);
        if (!usuario)
            return res.status(404).json({ mensaje: "Usuario no encontrado" });

        // Evitar repetir reto
        if (usuario.retosCompletados.includes(retoId)) {
            return res.status(400).json({ mensaje: "Este reto ya fue completado" });
        }

        // Guardar reto como completado
        usuario.retosCompletados.push(retoId);

        // Sumar puntos del reto
        usuario.puntos += reto.puntos;

        await usuario.save();

        res.json({ mensaje: "Reto completado", puntosGanados: reto.puntos });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al completar el reto" });
    }
};

