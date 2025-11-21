import { db } from "../config/db.js";

export const getPuntos = async (req, res) => {
    const [rows] = await db.query("SELECT * FROM PuntoReciclaje");
    res.json(rows);
};
