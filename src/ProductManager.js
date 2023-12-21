// Importar el módulo 'fs' para operaciones en el sistema de archivos.
const fs = require('fs');


// Clase ProductManager para gestionar productos.
class ProductManager {
  // Constructor que inicializa la ruta predeterminada y el ID inicial.
  constructor() {
    // Ruta al archivo JSON que almacena los datos de los productos.
    this.path = "Productos.json";
    // Obtener la lista actual de productos.
    this.products = this.getProducts();
    // Calcular el próximo ID disponible.
    this.id = this.calculateNextId();
  }


  // Método para calcular el próximo ID disponible (encuentra el ID máximo actual)
  calculateNextId() {
    // 0 es el valor inicial de max. Si el id actual es mayor queda como max
    const maxId = this.products.reduce((max, product) => (product.id > max ? product.id : max), 0);
    return maxId;
  }


  addProduct({ title, description, code, price, stock, category, thumbnails = [] }) {
    try {
      // Obtener productos existentes desde el archivo.
      const products = this.getProducts();
      // Verificar si hay un código de producto duplicado.
      const duplicateCode = products.some((product) => product.code === code);

      if (duplicateCode) {
        throw new Error(`El código "${code}" está repetido, no se pudo agregar el producto.`);
      }

      // Crear un nuevo producto con un ID único y status por defecto.
      const newProduct = {
        id: ++this.id,
        title,
        description,
        code,
        price,
        status: true,
        stock,
        category,
        thumbnails,
      };

      // Agregar el nuevo producto a la lista y escribir en el archivo.
      products.push(newProduct);
      fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
      // Devolver un mensaje indicando que el producto se agregó con éxito.
      return "El producto se agregó exitosamente.";
    } catch (error) {
      throw error;
    }
  }


  // Método para obtener la lista de productos.
  getProducts() {
    try {
      // Leer el archivo y esperar la promesa.
      const data = fs.readFileSync(this.path, "utf8");
      // Parsear los datos JSON y devolver la lista de productos.
      const products = JSON.parse(data);
      return products;
    } catch (error) {
      // Lanzar cualquier error que ocurra durante el proceso.
      throw error;
    }
  }


  // Método para obtener un producto por su ID.
  getProductById(id) {
    try {
      // Obtener la lista de productos.
      const products = this.getProducts();
      // Si la callback devuelve true, devolver el producto sino undefined
      const product = products.find((product) => product.id === id);

      if (product) {
        // Devolver el producto si se encuentra.
        return product;
      }

      // Lanzar un error si el producto con el ID no se encuentra.
      throw new Error(`Producto con ID ${id} no existe.`);
    } catch (error) {
      // Lanzar cualquier error que ocurra durante el proceso.
      throw error;
    }
  }


  // Método para actualizar un producto por su ID.
  updateProduct(id, title, description, price, thumbnail, code, stock) {
    try {
      // Obtener la lista de productos.
      const products = this.getProducts();
      // Encontrar el índice del producto con el ID proporcionado.
      const index = products.findIndex((product) => product.id === id);

      if (index === -1) {
        // Lanzar un error si el producto con el ID no se encuentra.
        throw new Error(`No se encontró el producto con id ${id}. La actualización no se realizó.`);
      }

      // Actualizar el producto en la lista y escribir en el archivo.
      products[index] = {
        id: products[index].id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
      // Devolver un mensaje indicando que el producto se actualizó con éxito.
      return `El producto con id ${id} se actualizó exitosamente.`;
    } catch (error) {
      // Lanzar cualquier error que ocurra durante el proceso.
      throw error;
    }
  }


  // Método para eliminar un producto por su ID.
  deleteProduct(id) {
    try {
      // Obtener la lista de productos.
      const products = this.getProducts();
      // Filtrar la lista para excluir el producto con el ID proporcionado.
      const newProductList = products.filter((product) => product.id !== id);

      if (newProductList.length === products.length) {
        // Lanzar un error si el producto con el ID no se encuentra.
        throw new Error(`El producto con id ${id} no existe.`);
      }

      // Escribir la nueva lista de productos en el archivo.
      fs.writeFileSync(this.path, JSON.stringify(newProductList, null, 2));
      // Devolver un mensaje indicando que el producto se eliminó con éxito.
      return `El producto con id ${id} fue borrado exitosamente.`;
    } catch (error) {
      // Lanzar cualquier error que ocurra durante el proceso.
      throw error;
    }
  }
}

// Exportar la clase ProductManager.
module.exports = ProductManager;


