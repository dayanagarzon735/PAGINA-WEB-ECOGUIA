export const getRetos = async (req, res) => {
    const [rows] = await db.query("SELECT * FROM Reto");
    res.json(rows);
};
