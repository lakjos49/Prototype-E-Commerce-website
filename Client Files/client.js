function checkAuth(role) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user || user.role !== role) {
    window.location.href = "index.html";
  }
  loadProducts();
  loadOrders();
  loadCart();
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

// View Products
function loadProducts() {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  let html = products
    .map(
      (p, i) => `
        <div>
          ${p.name} - ₹${p.price} | Stock: ${p.stock}
          <input type="number" id="qty-${i}" min="1" max="${p.stock}" value="1">
          <button onclick="addToCart(${i})">Add to Cart</button>
        </div>
      `
    )
    .join("");
  document.getElementById("productList").innerHTML =
    html || "No products available";
}

// Add to Cart
function addToCart(index) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let user = JSON.parse(localStorage.getItem("currentUser"));

  let qty = parseInt(document.getElementById(`qty-${index}`).value);
  if (qty < 1 || qty > products[index].stock) {
    alert("Invalid quantity or out of stock");
    return;
  }

  let userCart = cart.find((c) => c.username === user.username);
  if (!userCart) {
    userCart = { username: user.username, items: [] };
    cart.push(userCart);
  }

  userCart.items.push({ ...products[index], quantity: qty });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
  loadCart();
}

// View Cart
function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let user = JSON.parse(localStorage.getItem("currentUser"));
  let userCart = cart.find((c) => c.username === user.username);

  if (!userCart || userCart.items.length === 0) {
    document.getElementById("myCart").innerHTML = "Your cart is empty";
    return;
  }

  let html = userCart.items
    .map(
      (item, idx) => `
        ${item.name} (x${item.quantity}) - ₹${item.price} each
        <button onclick="removeFromCart(${idx})">Remove</button>
      `
    )
    .join("<br>");

  html += `<br><button onclick="placeOrderFromCart()">Place Order</button>`;
  document.getElementById("myCart").innerHTML = html;
}

// Remove from Cart
function removeFromCart(itemIndex) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let user = JSON.parse(localStorage.getItem("currentUser"));
  let userCart = cart.find((c) => c.username === user.username);

  if (userCart) {
    userCart.items.splice(itemIndex, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  loadCart();
}

// Place Order
function placeOrderFromCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  let products = JSON.parse(localStorage.getItem("products")) || [];
  let user = JSON.parse(localStorage.getItem("currentUser"));
  let userCart = cart.find((c) => c.username === user.username);

  if (!userCart || userCart.items.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Stock check
  for (let item of userCart.items) {
    let product = products.find((p) => p.name === item.name);
    if (!product || product.stock < item.quantity) {
      alert(`Not enough stock for ${item.name}`);
      return;
    }
  }

  // Deduct stock
  for (let item of userCart.items) {
    let product = products.find((p) => p.name === item.name);
    product.stock -= item.quantity;
  }

  let totalCost = userCart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  let orderId = "ORD" + Date.now();
  let orderDate = new Date();
  let deliveryDate = new Date(orderDate);
  deliveryDate.setDate(orderDate.getDate() + 5);

  let newOrder = {
    id: orderId,
    user: user.username,
    items: userCart.items,
    total: totalCost,
    date: orderDate.toLocaleString(),
    expectedDelivery: deliveryDate.toLocaleDateString(),
    status: "Processing",
  };

  orders.push(newOrder);
  userCart.items = [];

  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.setItem("products", JSON.stringify(products));

  alert("Order placed successfully!");
  loadOrders();
  loadCart();
  loadProducts();
}

// View Orders
function loadOrders() {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  let user = JSON.parse(localStorage.getItem("currentUser"));
  let myOrders = orders.filter((o) => o.user === user.username);

  if (myOrders.length === 0) {
    document.getElementById("myOrders").innerHTML = "No orders yet";
    return;
  }

  let html = myOrders
    .map(
      (o) => `
      <div style="border:1px solid #ccc; padding:10px; margin:5px;">
        <strong>Order ID:</strong> ${o.id}<br>
        <strong>Date:</strong> ${o.date}<br>
        <strong>Expected Delivery:</strong> ${o.expectedDelivery}<br>
        <strong>Status:</strong> ${o.status}<br>
        <strong>Items:</strong>
        <ul>
          ${o.items
            .map(
              (item) =>
                `<li>${item.name} (x${item.quantity}) - ₹${item.price} each</li>`
            )
            .join("")}
        </ul>
        <strong>Total Cost:</strong> ₹${o.total}
      </div>
    `
    )
    .join("");

  document.getElementById("myOrders").innerHTML = html;
}
