const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const models = require("../../database/models");
const {JWT} = require("../../config/config")
const login = async(req, res)=>{
    try {
        const {body} = req;
        //buscar registro en la bd
        //comparar contrasena si existe
        const findUser =await models.users.findOne({
            where:{
                username: body.username,
            },
        });
        if(!findUser) 
            return res.status(404).send("The username wasn't found");

        if (!bcryptjs.compareSync(body.password, findUser.password))
            return res.status(404).send("The password isn't correct");

        //no mostrar contrasena
        delete findUser.dataValues.password;

        //no guardar contra, ni datos sensibles
        //datos, firma, duracion, 
        const token = jwt.sign({userId:findUser.id}, JWT.SEED, {
            expiresIn: JWT.EXPIRES,
        });

        //return res.status(200).send({data:findUser, token:token});
        return res.status(200).send({data:findUser, token:token,}); 
    } catch (error) {
        return res
        .status(500)
        .send("Lo sentimos ha ocurrido un error en el servidor");
    }
}

module.exports = {login};