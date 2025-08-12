function register() {
  const username = document.getElementById("regUsername").value;
  const password = document.getElementById("regPassword").value;
  const role = document.getElementById("regRole").value;

  if (!username || !password) return alert("Please fill all fields");

  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.find((u) => u.username === username)) {
    return alert("Username already exists");
  }

  users.push({ username, password, role });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registered successfully!");
}

function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) return alert("Invalid credentials");

  localStorage.setItem("currentUser", JSON.stringify(user));

  if (user.role === "admin") {
    window.location.href = "admin.html";
  } else {
    window.location.href = "client.html";
  }
}
