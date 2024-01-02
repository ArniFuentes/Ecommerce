const socket = io();

document.addEventListener("DOMContentLoaded", () => {
  const productForm = document.getElementById("productForm");
  const productList = document.getElementById("productList");

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
    // Crear el HTML para el nuevo producto
    const productHTML = `
      <li>
        <h2>${data.title}</h2>
        <p>Code: ${data.code}</p>
        <p>Price: $${data.price}</p>
      </li>
    `;

    // Agregar el nuevo producto a la lista existente
    productList.innerHTML += productHTML;

    // Limpiar los campos del formulario después de agregar el producto
    productForm.reset();
  });
});

