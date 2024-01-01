const socket = io();

document.addEventListener("DOMContentLoaded", () => {
  const productForm = document.getElementById("productForm");
  const productDetailsContainer = document.getElementById("productDetailsContainer");

  // Array para almacenar los productos
  const productsHistory = [];

  productForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const code = document.getElementById("code").value;
    const price = document.getElementById("price").value;
    const status = document.getElementById("status").value;
    const stock = document.getElementById("stock").value;
    const category = document.getElementById("category").value;

    // Emitir el evento 'newProduct' al servidor con los datos del formulario
    socket.emit("newProduct", {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
    });
  });

  // Escuchar el evento 'productAdded' del servidor y actualizar la lista de productos
  socket.on("productAdded", (data) => {
    // Agregar el nuevo producto al historial
    productsHistory.push(data);

    // Crear el HTML para todos los productos en el historial
    const productsHTML = productsHistory.map((product) => `
      <div class="product">
        <h3>New Product Details:</h3>
        <p><strong>Title:</strong> ${product.title}</p>
        <p><strong>Description:</strong> ${product.description}</p>
        <p><strong>Code:</strong> ${product.code}</p>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Status:</strong> ${product.status}</p>
        <p><strong>Stock:</strong> ${product.stock}</p>
        <p><strong>Category:</strong> ${product.category}</p>
      </div>
    `).join('');

    // Actualizar el contenedor con la lista de productos
    productDetailsContainer.innerHTML = productsHTML;
  });
});

