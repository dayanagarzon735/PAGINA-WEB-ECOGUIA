import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];

    // Si no viene token
    if (!token) {
        return res.status(403).json({
            message: "Acceso denegado. No se proporcionó un token."
        });
    }

    try {
        // Formato esperado: "Bearer token_aquí"
        const tokenLimpo = token.split(" ")[1];

        const decoded = jwt.verify(tokenLimpo, process.env.JWT_SECRET);

        req.user = decoded; // Guardamos datos del usuario en la request
        next(); // Continuar a la siguiente función

    } catch (error) {
        return res.status(401).json({
            message: "Token inválido o expirado",
            error: error.message
        });
    }
};
