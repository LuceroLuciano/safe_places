const models = require("../../database/models");

const addCommentToPlace = async(req,res) =>{
    try {
        const {body, userId} = req;
        //comentario
        const existPlace = await models.places.findOne({
            where:{
                id: body.placeId,
                statusDelete: false,
            }
        });

        if(!existPlace) return res.status(404).send("El lugar no existe")
        const comment = await models.comments.create({
            placeId: body.placeId,
            userId,
            comment: body.comment,
        });
        return res.status(201).send(comment);

    } catch (error) {
        return res.status(500).send("Internal server error");

    }
}

const getCommentsByPlace = async(req,res) =>{
    try {
        const {placeId} = req.params;
        
        const comments = await models.comments.findAll({
            where:{
                placeId:placeId,
                statusDelete: false,
            }
        });
        return res.status(200).send(comments);

    } catch (error) {
        return res.status(500).send("Internal server error");

    }
}

const deleteComment = async(req, res) => {
    try {
        
        const { commentId } = req.params; // se obtiene el id del place
        
        // Verificar que el comentario exista
        const comments = await models.comments.findOne({
            where: {
                id: commentId,
                statusDelete: false,
            },
        });
        
        //si no encuentra el comment
        if(!comment) return res.status(404).send("El comentario no se encuentra");   
        
        // 3. Actualizar datos        
        await comment.update({
           statusDelete: true,
        });

        // 4. Devolver una respuesta
        return res.status(200).send("Se ha eliminado exitosamente.");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Lo sentimos ha ocurrido un error");
    };
};

module.exports = {addCommentToPlace, getCommentsByPlace, deleteComment};