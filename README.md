# E-Commerce Dashboard — Admin & Client

This project is a simple browser-based e-commerce dashboard built using HTML, CSS, and JavaScript with data stored in `localStorage`. It provides separate interfaces for **Admin** and **Client** users, allowing basic product management, cart functionality, and order placement.

---

## Features

### Admin Panel
- **Login**: Admins authenticate to access the dashboard.
- **Add Products**: Add new products with name, price, and stock quantity.
- **View Products**: View the list of all products with details and current stock.
- **Delete Products**: (To be implemented/extendable) Option to remove products.
- **View Orders**: See all placed orders with details like order ID, user, date, expected delivery, status, items, and total cost.

### Client Panel
- **Register**: New users can register (basic implementation assumed).
- **Login**: Clients log in to access their dashboard.
- **View Products**: Browse available products with price and current stock.
- **Add to Cart**: Select quantity and add products to the shopping cart.
- **View Cart**: Review items in the cart, adjust/remove items.
- **Delete Cart Items**: Remove individual items from the cart.
- **Place Order**: Confirm order from the cart, which updates product stock and generates order records with timestamp, expected delivery, and status.

---

## Technologies Used

- HTML5 & CSS3 (Responsive, clean UI)
- Vanilla JavaScript (Client-side logic and state management)
- `localStorage` (Persistent storage for users, products, cart, and orders)

---

## File Structure

/index.html - Landing page (Login/Register logic assumed)
/admin.html - Admin dashboard interface
/client.html - Client dashboard interface
/styles.css - Shared styling for all pages
/admin.js - Admin panel JavaScript logic
/client.js - Client panel JavaScript logic# Prototype-E-Commerce-website
