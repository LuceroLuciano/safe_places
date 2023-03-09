// llamamos a los controladores
const { addPlace, getPlace, updatePlace, deletePlace } = require("../controllers/places")
const { addCommentToPlace, getCommentsByPlace, deleteComment } = require("../controllers/comments");
const { addLikeDislike } = require("../controllers/likes");
const { registry } = require("../controllers/users");
const { login } = require("../controllers/login");
const {verifyToken} = require("../middlewares/auth");
// requerimos una clase propia de express
const { Router } =  require("express");

const router = Router();
// creamos el enpoint para agregar un place
// router.post("/place", addPlace);

// en esta ruta se llaman todos los metodos: post, get
router.route("/places").post(verifyToken, addPlace).get(getPlace);

// ruta para actualizar 
router.put("/places/:placeId", updatePlace);

//ruta para eliminar
router.delete("/places/:placeId", deletePlace);

//ruta agregar comentario
router.post("/comments", verifyToken, addCommentToPlace);
router.get("/comments/:placeId", getCommentsByPlace);
router.delete("/comments/:commentId",deleteComment);

//ruta agregar, quitar like
router.post("/likes", addLikeDislike);

//registro de usuario
router.post("/registry", registry);

//login de usuario
router.post("/login", login);
module.exports = { router };