// Definición de un middleware para verificar el rol de un usuario autenticado.
// Este middleware toma un arreglo de roles permitidos como parámetro.
export const rol = (roles) => {
    return (req, res, next) => {
        // Obtiene la información del usuario autenticado desde req.body.
        const loggedUser = req.body.loggedUser;
        // Verifica si el usuario está autenticado y si su rol está incluido en los roles permitidos.
        if (!loggedUser || !roles.includes(loggedUser.rol)) {
            // Si el usuario no está autenticado o su rol no es válido, responde con un estado 401 (Unauthorized) y un mensaje de "Access Denied".
            return res.status(401).json({ message: "Access Denied" });
        }
        // Si el usuario tiene uno de los roles permitidos, permite que la solicitud continúe a la siguiente función middleware o controlador.
        next();
    };
};
