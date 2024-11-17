// Importamos el servicio de reacciones que contiene la lógica de negocio
import reactionService from "../services/reaction.service";
class reactionController {
    // Método para crear una nueva reacción
    async createReaction(req, res) {
        try {
            const { reaction, commentId } = req.body; // Extraemos reaction y commentId del cuerpo de la petición
            const userId = req.params.id; // Obtenemos el ID del usuario de los parámetros de la ruta
            // Llamamos al servicio para crear la reacción
            const savedReaction = await reactionService.createReaction(reaction, commentId, userId);
            // Devolvemos la reacción guardada con un estado 201 (Created)
            res.status(201).json(savedReaction);
        }
        catch (error) {
            // Si ocurre un error, devolvemos un estado 500 (Internal Server Error)
            res.status(500).json(error);
        }
    }
    // Método para eliminar una reacción
    async deleteReaction(req, res) {
        try {
            // Extraemos reactionId y commentId del cuerpo de la petición
            const { reactionId, commentId } = req.body;
            // Obtenemos el ID del usuario de los parámetros de la ruta
            const userId = req.params.id;
            // Llamamos al servicio para eliminar la reacción
            const deletedReaction = await reactionService.deleteReaction(reactionId, userId, commentId);
            if (deletedReaction.success) {
                // Si la eliminación fue exitosa, devolvemos un estado 204 (No Content)
                res.status(204).json({ message: deletedReaction.message });
            }
            else {
                // Si la reacción no se encontró, devolvemos un estado 404 (Not Found)
                res.status(404).json({ message: deletedReaction.message });
            }
        }
        catch (error) {
            // Si ocurre un error, devolvemos un estado 500 (Internal Server Error)
            res.status(500).json(error);
        }
    }
}
// Exportamos una nueva instancia de la clase controladora
export default new reactionController;
