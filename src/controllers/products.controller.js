const { Router } = require('express');
// Importar ProductManager desde ProductManager.js que está en el directorio padre src
const ProductManager = require('../ProductManager.js');


const router = Router();

// Instanciar la clase ProductManager para gestionar productos.
const productManager = new ProductManager();

router.get('/', (req, res) => {
  try {
    console.log("me llamaste");
    // Si el cliente no crea ninguna propiedad en req.query, devolver todo el array con objetos.
    if (Object.keys(req.query).length === 0) {
      const products = productManager.getProducts();
      return res.json({ status: "success", payload: products });
    }

    // Si el cliente crea propiedades en el objeto req.query, tomar la propiedad 'limit'.
    const limit = parseInt(req.query.limit);
    if (isNaN(limit) || limit <= 0) {
      throw new Error("El valor asignado a 'limit' debe ser un número mayor que cero.");
    }

    // Obtener la lista completa de productos y devolver solo los primeros 'limit'.
    const products = productManager.getProducts();
    const limitedProducts = products.slice(0, limit);
    res.json({ products: limitedProducts });
  } catch (error) {
    // En caso de error, devolver un objeto JSON con el mensaje de error.
    res.json({ error: error.message });
  }
});
  
  
router.get('/:pid', (req, res) => {
  try {
    // Obtener el parámetro 'pid' de la solicitud y convertirlo a un número entero.
    const productId = parseInt(req.params.pid);
    // Obtener el producto por su ID.
    const product = productManager.getProductById(productId);
    // Devolver un objeto JSON con el producto.
    res.json({ product });
  } catch (error) {
    // En caso de error, devolver un objeto JSON con el mensaje de error.
    res.json({ error: error.message });
  }
});
  
  
router.post('/', (req, res) => {
  try {
    // Obtener los datos del cuerpo de la solicitud.
    const { title, description, code, price, stock, category, thumbnails } = req.body;

    // Validar que se proporcionen todos los campos necesarios.
    if (!title || !description || !code || !price || !stock || !category) {
      throw new Error("Todos los campos son obligatorios.");
    }

    // Llamar al método addProduct de la instancia de ProductManager.
    const result = productManager.addProduct({ title, description, code, price, stock, category, thumbnails });
    res.json({ message: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
  
  
router.put('/:pid', (req, res) => {
  try {
    // Obtener el ID del producto de los parámetros de la solicitud.
    const productId = parseInt(req.params.pid);
    
    // Obtener los datos del cuerpo de la solicitud.
    const { title, description, price, thumbnail, code, stock } = req.body;

    // Validar que al menos uno de los campos de actualización esté presente en el cuerpo de la solicitud.
    if (!title && !description && !price && !thumbnail && !code && !stock) {
      throw new Error("Se debe proporcionar al menos un campo para actualizar el producto.");
    }

    // Llamar al método updateProduct de la instancia de ProductManager.
    const resultMessage = productManager.updateProduct(
      productId, 
      title, 
      description, 
      price, 
      thumbnail, 
      code, 
      stock
    );

    res.json({ message: resultMessage });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
  
  
router.delete('/:pid', (req, res) => {
  try {
    // Obtener el ID del producto de los parámetros de la solicitud.
    const productId = parseInt(req.params.pid);

    // Llamar al método deleteProduct de la instancia de ProductManager.
    const resultMessage = productManager.deleteProduct(productId);

    res.json({ message: resultMessage });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;
