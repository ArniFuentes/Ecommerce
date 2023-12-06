// Importar el módulo 'express' para la creación de la aplicación web.
import express from 'express';
// Importar la clase ProductManager desde el archivo 'ProductManager.js'.
import ProductManager from './ProductManager.js';


// Crear una instancia de la aplicación Express.
const app = express();
// Definir el puerto en el que la aplicación escuchará las solicitudes.
const port = 8080;

// Instanciar la clase ProductManager para gestionar productos.
const productManager = new ProductManager();

// Definir una ruta para manejar solicitudes GET a '/products'.
app.get('/products', async (req, res) => {
  try {
    // Si el cliente no crea ninguna propiedad en req.query, devolver todo el array con objetos.
    if (Object.keys(req.query).length === 0) {
      const products = await productManager.getProducts();
      return res.json({ products });
    }

    // Si el cliente crea propiedades en el objeto req.query, tomar la propiedad 'limit'.
    const limit = parseInt(req.query.limit);
    if (isNaN(limit) || limit <= 0) {
      throw new Error("El valor asignado a 'limit' debe ser un número mayor que cero.");
    }

    // Obtener la lista completa de productos y devolver solo los primeros 'limit'.
    const products = await productManager.getProducts();
    const limitedProducts = products.slice(0, limit);
    res.json({ products: limitedProducts });
  } catch (error) {
    // En caso de error, devolver un objeto JSON con el mensaje de error.
    res.json({ error: error.message });
  }
});

// Definir una ruta para manejar solicitudes GET a '/products/:pid'.
app.get('/products/:pid', async (req, res) => {
  try {
    // Obtener el parámetro 'pid' de la solicitud y convertirlo a un número entero.
    const productId = parseInt(req.params.pid);
    // Obtener el producto por su ID.
    const product = await productManager.getProductById(productId);
    // Devolver un objeto JSON con el producto.
    res.json({ product });
  } catch (error) {
    // En caso de error, devolver un objeto JSON con el mensaje de error.
    res.json({ error: error.message });
  }
});

// Iniciar el servidor y escuchar en el puerto definido.
app.listen(port, () => {
  console.log(`El servidor está corriendo en http://localhost:${port}`);
});
