const socket = io();

document.addEventListener("DOMContentLoaded", () => {
  const productForm = document.getElementById("productForm");

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

    // Mostrar los valores por consola del navegador
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Code:", code);
    console.log("Price:", price);
    console.log("Status:", status);
    console.log("Stock:", stock);
    console.log("Category:", category);
  });
});
