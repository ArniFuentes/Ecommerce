const app = require('./server');


// Definir el puerto en el que la aplicación escuchará las solicitudes.
const port = 8080;

// Iniciar el servidor y escuchar en el puerto definido.
app.listen(port, () => {
  console.log(`El servidor está corriendo en http://localhost:${port}`);
});
