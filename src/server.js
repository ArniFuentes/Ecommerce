// Importar el módulo 'express' para la creación de la aplicación web.
const express = require('express');
const router = require("./router/index");


// Crear una instancia de la aplicación Express.
const app = express();

// Usar express.json() para analizar el cuerpo de las solicitudes POST al convertir el json en objeto.
app.use(express.json());

router(app);


module.exports = app;

