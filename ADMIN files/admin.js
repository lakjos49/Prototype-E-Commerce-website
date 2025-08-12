function checkAuth(role) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user || user.role !== role) {
    window.location.href = "index.html";
  }
  loadProducts();
  loadOrders();
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}



//  View Products (with delete button)
function loadProducts() {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  let html = products
    .map(
      (p, i) => `
        <div>
            ${p.name} - ₹${p.price}
            <button onclick="deleteProduct(${i})">Delete</button>
        </div>
    `
    )
    .join("");
  document.getElementById("productList").innerHTML = html || "No products";
}

// 4. Delete Products
function deleteProduct(index) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  loadProducts();
}

// 5. View Orders (full details)
function addProduct() {
  const name = document.getElementById("prodName").value;
  const price = parseFloat(document.getElementById("prodPrice").value);
  const stock = parseInt(document.getElementById("prodStock").value);

  if (!name || !price || !stock) return alert("Enter all product details");

  let products = JSON.parse(localStorage.getItem("products")) || [];
  products.push({ name, price, stock });
  localStorage.setItem("products", JSON.stringify(products));

  document.getElementById("prodName").value = "";
  document.getElementById("prodPrice").value = "";
  document.getElementById("prodStock").value = "";
  loadProducts();
}


