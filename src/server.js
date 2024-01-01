const express = require("express");
const router = require("./router/index");
const handlebars = require("express-handlebars");

// Crear una instancia de la aplicación Express.
const app = express();

// Usar express.json() para analizar el cuerpo de las solicitudes POST al convertir el json en objeto.
// todas las request pasan por el método use
app.use(express.json());

// configura el middleware express.static para servir archivos estáticos desde "public" dentro de "src"
app.use(express.static(process.cwd() + "/src/public"));

// Configurar handlebars como motor de plantilla
app.engine("handlebars", handlebars.engine());
// Ubicar la ruta de las vistas de acuerdo a la docu
app.set("views", process.cwd() + "/src/views");

// Al llamar a la función router se ejecutan los middleware
router(app);

// Exportar la instancia app
module.exports = app;
