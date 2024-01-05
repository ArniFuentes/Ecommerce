const productsController = require("../controllers/products.controller");
const cartsController = require("../controllers/carts.controller");
const ProductManager = require("../ProductManager");
const productManager = new ProductManager();

// Crear la función router la cual por parámetro recibe app (de server)
const router = (app) => {
  // Configuración de las rutas para productos y carritos
  app.use("/api/products", productsController);
  app.use("/api/carts", cartsController);

  // Ruta para mostrar productos en tiempo real
  app.get("/realtimeproducts", (req, res) => {
    const productList = productManager.getProducts();
    res.render("realTimeProducts.handlebars", { products: productList });
  });

  // Ruta para la página de inicio
  app.get("/", (req, res) => {
    const productList = productManager.getProducts();
    res.render("home.handlebars", { products: productList });
  });
};

module.exports = router;
