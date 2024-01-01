const app = require("./server");
const { port } = require("./configs/server.config");
const { Server } = require("socket.io");
// const socket = require("./public/js/products");

const httpServer = app.listen(port, () => {
  console.log(`El servidor está corriendo en http://localhost:${port}`);
});

// asignar el servidor de socket a io
const io = new Server(httpServer);

// Inicializar el servidor socket con el evento "connection"
io.on("connection", (socket) => {
  console.log("Cliente conectado");

  // Escuchar el evento 'newProduct' del cliente y mostrar los datos en la consola del servidor
  socket.on("newProduct", (data) => {
    console.log("Nuevo producto recibido en el servidor:", data);
  });
});
