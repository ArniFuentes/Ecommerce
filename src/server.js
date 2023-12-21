const express = require("express");
const router = require("./router/index");
const handlebars = require("express-handlebars");

// Crear una instancia de la aplicación Express.
const app = express();

// Usar express.json() para analizar el cuerpo de las solicitudes POST al convertir el json en objeto.
// todas las request pasan por el método use
app.use(express.json());
app.use(express.static(process.cwd() + "/src/public"));

router(app);

// Configurar handlebars como motor de plantilla
app.engine("handlebars", handlebars.engine());
// Ubicar la ruta de las vistas de acuerdo a la docu
app.set("views", process.cwd() + "/src/views");
// // Para no conolocar el .handlebars
// app.set("view engine", "handlebars");

// Exportar la instancia app
module.exports = app;
