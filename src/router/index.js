const productsController = require("../controllers/products.controller");
const cartsController = require("../controllers/carts.controller");
const templatesController = require("../controllers/template.controller");


// Crear la función router la cual por parámetro recibe app (de server)
const router = (app) => {
  app.use("/api/products", productsController);
  app.use("/api/carts", cartsController);

  // Resporder todas las peticiones que llegue a "/"
  app.use("/", templatesController);
};


module.exports = router;


