// El código dentro de server.js se ejecuta al importar la instancia
const app = require("./server");
const { port } = require("./configs/server.config");
const { Server } = require("socket.io");

// Iniciar el servidor y escuchar en el puerto definido.
const httpServer = app.listen(port, () => {
  console.log(`El servidor está corriendo en http://localhost:${port}`);
});

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on();
});
