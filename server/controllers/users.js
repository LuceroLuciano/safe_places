const bcryptjs = require("bcryptjs");
const models = require("../../database/models");

const registry = async(req, res) =>{
    try {
      const {body} = req;
      //encriptacion con bcrypt. Contrasena y numero de saltos
      encPassword = bcryptjs.hashSync(body.password, 10);
      const addUser = await models.users.create  ({
        username:body.username,
        password:encPassword,
      });

      //no mostrar contrasena
      delete addUser.dataValues.password;

      return res.status(201).send(addUser);
    } catch (error) {
     return res
        .status(500)
        .send("Lo sentimos ha ocurrido un error en el servidor");
    }
};

module.exports = {registry};