//inicializar nuestro servidor
const express = require("express");
const { router } = require("./routes/index"); // importamos las rutas
const server = express();

// idicamos que las solicitudes van a traer algo en el código
server.use(express.json());

// middleware son funciones que se ejecutan antes de que se ejecute otra función
server.use(router);
//ver imagen en la ruta, haciendo carpeta public static
server.use('/public', express.static(__dirname + '/public'));

// exportmos la instancia del server
module.exports = { server };