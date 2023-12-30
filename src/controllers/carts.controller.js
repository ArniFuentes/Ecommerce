const { Router } = require('express');
const CartManager = require('../CartManager.js');
const ProductManager = require('../ProductManager.js');


const router = Router();

// Instanciar la clase CartManager para gestionar carritos.
const cartManager = new CartManager();
// Instanciar la clase ProductManager
const productManager = new ProductManager();


router.post('/', (req, res) => {
  try {
    const newCart = cartManager.createCart();
    res.json({ cart: newCart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
  
  
// Definir una endpoint para mostrar los productos del carrito
router.get('/:cid', (req, res) => {
  try {
      const cartId = parseInt(req.params.cid);
      const cart = cartManager.getCartById(cartId);
      const cartProducts = cart.products;
      res.json({ cartProducts: cartProducts });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});
  

// Agregar un producto a un determinado carro
router.post('/:cid/product/:pid', (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);

    const cart = cartManager.getCartById(cartId);
    const product = productManager.getProductById(productId);

    // Verificar si el producto (el id) ya está en el carrito 
    const existingProduct = cart.products.find((item) => item.product === productId);

    if (existingProduct) {
      // Si el producto ya está en el carrito, incrementar la cantidad
      existingProduct.quantity++;
    } else {
      // Si el producto no está en el carrito, agregarlo con cantidad 1
      cart.products.push({ product: productId, quantity: 1 });
    }

    cartManager.saveCarts();
    
    res.json({ message: 'Producto agregado al carrito exitosamente.' });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;
