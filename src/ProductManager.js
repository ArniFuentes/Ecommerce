// Importar el módulo 'fs' para operaciones en el sistema de archivos.
import * as fs from 'fs';


// Clase ProductManager para gestionar productos.
class ProductManager {
  // Constructor que inicializa la ruta predeterminada y el ID inicial.
  constructor() {
    // Ruta al archivo JSON que almacena los datos de los productos.
    this.path = "Productos.json";
    // ID inicial para nuevos productos.
    this.id = 1;
  }

  // Método asíncrono para agregar un nuevo producto a la lista.
  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      // Obtener productos existentes desde el archivo.
      const products = await this.getProducts();
      // Verificar si hay un código de producto duplicado.
      const duplicateCode = products.some((product) => product.code === code);

      if (duplicateCode) {
        // Lanzar un error si el código está duplicado.
        throw new Error(`El código "${code}" está repetido, no se pudo agregar el producto.`);
      }

      // Crear un nuevo producto con un ID único.
      const newProduct = {
        id: this.id++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      // Agregar el nuevo producto a la lista y escribir en el archivo.
      products.push(newProduct);
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
      // Devolver un mensaje indicando que el producto se agregó con éxito.
      return "El producto se agregó exitosamente.";
    } catch (error) {
      // lanzar cualquier error que ocurra durante el proceso.
      throw error;
    }
  }

  // Método asíncrono para obtener la lista de productos.
  async getProducts() {
    try {
      // Leer el archivo y esperar la promesa.
      const data = await fs.promises.readFile(this.path, "utf8");
      // Parsear los datos JSON y devolver la lista de productos.
      const products = JSON.parse(data);
      return products;
    } catch (error) {
      // Lanzar cualquier error que ocurra durante el proceso.
      throw error;
    }
  }

  // Método asíncrono para obtener un producto por su ID.
  async getProductById(id) {
    try {
      // Obtener la lista de productos.
      const products = await this.getProducts();
      // Encontrar el producto con el ID proporcionado.
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

  // Método asíncrono para actualizar un producto por su ID.
  async updateProduct(id, title, description, price, thumbnail, code, stock) {
    try {
      // Obtener la lista de productos.
      const products = await this.getProducts();
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

      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
      // Devolver un mensaje indicando que el producto se actualizó con éxito.
      return `El producto con id ${id} se actualizó exitosamente.`;
    } catch (error) {
      // Lanzar cualquier error que ocurra durante el proceso.
      throw error;
    }
  }

  // Método asíncrono para eliminar un producto por su ID.
  async deleteProduct(id) {
    try {
      // Obtener la lista de productos.
      const products = await this.getProducts();
      // Filtrar la lista para excluir el producto con el ID proporcionado.
      const newProductList = products.filter((product) => product.id !== id);

      if (newProductList.length === products.length) {
        // Lanzar un error si el producto con el ID no se encuentra.
        throw new Error(`El producto con id ${id} no existe.`);
      }

      // Escribir la nueva lista de productos en el archivo.
      await fs.promises.writeFile(this.path, JSON.stringify(newProductList, null, 2));
      // Devolver un mensaje indicando que el producto se eliminó con éxito.
      return `El producto con id ${id} fue borrado exitosamente.`;
    } catch (error) {
      // Lanzar cualquier error que ocurra durante el proceso.
      throw error;
    }
  }
}

// Exportar la clase ProductManager.
export default ProductManager;


