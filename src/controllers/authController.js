import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js";

export const register = async (req, res) => {
    try {
        const { nombre, correo, password, ciudad } = req.body;

        const hash = bcrypt.hashSync(password, 10);

        await db.query(
            "INSERT INTO Usuario (nombre, correo, password, ciudad, rol) VALUES (?, ?, ?, ?, 'registrado')",
            [nombre, correo, hash, ciudad]
        );

        res.json({ message: "Usuario registrado con éxito" });
    } catch (error) {
        res.status(500).json({ error: "Error al registrar usuario" });
    }
};
export const login = async (req, res) => {
    try {
        const { correo, password } = req.body;

        const [rows] = await db.query("SELECT * FROM Usuario WHERE correo = ?", [correo]);

        if (rows.length === 0) return res.status(404).json({ message: "Usuario no encontrado" });

        const user = rows[0];
        const validPass = bcrypt.compareSync(password, user.password);

        if (!validPass) return res.status(401).json({ message: "Contraseña incorrecta" });

        const token = jwt.sign(
            { usuario_id: user.usuario_id, rol: user.rol },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Error al iniciar sesión" });
    }
};
