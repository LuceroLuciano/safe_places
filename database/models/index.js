'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
// llama la configuración de las variables de entorno de la BD
const {DB} = require("../../config/config");
const config = DB;
const db = {};

// conexión a la BD de sequelize
let sequelize;
sequelize = new Sequelize(
  config.NAME, 
  config.USER, 
  config.PASSWORD,{
    host: config.HOST,
    dialect: config.DIALECT,
  });


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;