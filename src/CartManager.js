const fs = require('fs');


class CartManager {
  constructor() {
    this.path = 'Carrito.json';
    // Al momento de instanciar se tiene el [] actual
    this.carts = this.getCarts();
    this.id = this.calculateNextId();
  }

  calculateNextId() {
    const maxId = this.carts.reduce((max, cart) => (cart.id > max ? cart.id : max), 0);
    return maxId + 1;
  }

  getCarts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      const carts = JSON.parse(data);
      return carts;
    } catch (error) {
      return [];
    }
  }

  createCart() {
    const newCart = {
      id: this.id++,
      products: [],
    };
    this.carts.push(newCart);
    this.saveCarts();
    return newCart;
  }

  getCartById(cartId) {
    // Encontrar el objeto con el ID proporcionado, en otro caso undefined
    const cart = this.carts.find((c) => c.id === cartId);
    if (!cart) {
      throw new Error(`Carrito con ID ${cartId} no encontrado.`);
    }
    return cart;
  }

  saveCarts() {
    // Convertir el arreglo de carritos (this.carts) a una cadena JSON
    fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2));
  }
}

module.exports = CartManager;
