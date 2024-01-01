const { Router } = require("express");
const ProductManager = require("../ProductManager");

const router = Router();

const productManager = new ProductManager();

// Si se busca el template realtimeproducts
router.get("/", (req, res) => {
  // Se le pasa lo que reemplaza al body
  const productList = productManager.getProducts();
  // Pasar la vista "products.handlebars"
  res.render("realTimeProducts.handlebars", { products: productList });
});

// Si se busca la plantilla al endpoint "/" entonces renderizar la plantilla
router.get("/", (req, res) => {
  const productList = productManager.getProducts();
  res.render("home.handlebars", { products: productList });
});



module.exports = router;
