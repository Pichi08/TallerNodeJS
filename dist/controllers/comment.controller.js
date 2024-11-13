// Importamos el servicio de comentarios
import commentService from "../services/comment.service";
// Definimos la clase controladora para los comentarios
class commentController {
    // Método para crear un nuevo comentario
    async createComment(req, res) {
        try {
            const idUser = req.params.id; // Obtenemos el ID del usuario de los parámetros de la ruta
            const comment = req.body; // Obtenemos el comentario del cuerpo de la petición
            // Llamamos al servicio para crear el comentario
            const user = await commentService.createComment(idUser, comment.comment);
            res.status(201).json(user); // Devolvemos el usuario actualizado con un estado 201 (Created)
        }
        catch (error) {
            res.status(500).json(error); // En caso de error, devolvemos un estado 500
        }
    }
    // Método para crear una respuesta a un comentario
    async createReply(req, res) {
        try {
            const replier = req.params.id; // ID del usuario que responde
            const { comment, parent } = req.body; // Obtenemos el comentario y el ID del comentario padre
            // Llamamos al servicio para crear la respuesta
            const replyCreated = await commentService.createReply(replier, comment, parent);
            res.status(201).json(replyCreated); // Devolvemos la respuesta creada
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
    // Método para eliminar un comentario
    async deleteComment(req, res) {
        try {
            const idUser = req.params.id; // ID del usuario
            const idComment = req.params.idComment; // ID del comentario a eliminar
            // Llamamos al servicio para eliminar el comentario
            const user = await commentService.deleteComment(idUser, idComment);
            if (!user) {
                res.status(404).json({ error: "not found", message: `User with id ${req.params.id} not found` });
            }
            else {
                res.status(204).json(user); // 204 indica éxito sin contenido
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
    // Método para actualizar un comentario
    async updateComment(req, res) {
        try {
            const idUser = req.params.id;
            const idComment = req.params.idComment;
            const comment = req.body;
            // Llamamos al servicio para actualizar el comentario
            const user = await commentService.updateComment(idUser, idComment, comment);
            if (!user) {
                res.status(404).json({ message: "Comment not found or does not belong to the user" });
            }
            else {
                res.status(200).json(user);
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
    // Método para obtener todos los usuarios con sus comentarios
    async getAll(req, res) {
        try {
            const users = await commentService.findAll();
            res.status(200).json(users);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
}
// Exportamos una instancia de la clase controladora
export default new commentController;
