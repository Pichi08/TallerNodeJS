import userService from "../services/user.service";
class userController {
    // Método para crear un nuevo usuario en la base de datos.
    async createUser(req, res) {
        try {
            // Llama al servicio de creación de usuario, pasando los datos del cuerpo de la solicitud.
            const user = await userService.createUser(req.body);
            res.status(201).json(user);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
    // Método para manejar el inicio de sesión de un usuario.
    async login(req, res) {
        try {
            // Llama al servicio de inicio de sesión, pasando los datos del cuerpo de la solicitud.
            const resObj = await userService.login(req.body);
            res.status(200).json(resObj);
        }
        catch (error) {
            if (error instanceof ReferenceError)
                res.status(401).json({ message: "Not authorized" });
            res.status(500).json();
        }
    }
    // Método para obtener todos los usuarios de la base de datos.
    async getAll(req, res) {
        try {
            // Llama al servicio para obtener todos los usuarios.
            const users = await userService.findAll();
            // Responde con la lista de usuarios en formato JSON.
            return res.json(users);
        }
        catch (error) {
            return error;
        }
    }
    // Método para actualizar un usuario existente en la base de datos.
    async update(req, res) {
        try {
            // Llama al servicio de actualización de usuario, pasando el ID y los datos actualizados del usuario.
            const user = await userService.update(req.params.idUser, req.body);
            if (!user) {
                res.status(404).json({ message: `User with id:${req.params.id} not found` });
            }
            res.json(user);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
    // Método para eliminar un usuario de la base de datos.
    async delete(req, res) {
        try {
            // Llama al servicio de eliminación de usuario, pasando el ID del usuario.
            const user = await userService.delete(req.params.idUser);
            if (!user) {
                res.status(404).json({ error: "not found", message: `User with id ${req.params.id} not found` });
            }
            res.json(user);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
}
export default new userController;
