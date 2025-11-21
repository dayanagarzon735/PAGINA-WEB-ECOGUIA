export const addPunto = async (req, res) => {
    const { nombre, direccion, coordenadas_lat, coordenadas_lng, tipo_material } = req.body;

    await db.query(
        "INSERT INTO PuntoReciclaje (nombre, direccion, coordenadas_lat, coordenadas_lng, tipo_material) VALUES (?, ?, ?, ?, ?)",
        [nombre, direccion, coordenadas_lat, coordenadas_lng, tipo_material]
    );

    res.json({ message: "Punto agregado" });
};
