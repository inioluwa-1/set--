// Load from localStorage or initialize empty
let users = new Set(JSON.parse(localStorage.getItem("users")) || []);
let todos = new Set(JSON.parse(localStorage.getItem("todos")) || []);
let currentUser = localStorage.getItem("currentUser") || null;

// --- Save helpers ---
function saveUsers() {
  localStorage.setItem("users", JSON.stringify(Array.from(users)));
}
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(Array.from(todos)));
}
function saveCurrentUser() {
  if (currentUser) {
    localStorage.setItem("currentUser", currentUser);
  } else {
    localStorage.removeItem("currentUser");
  }
}

// --- Signup ---
function signup() {
  const username = document.getElementById("signup-username").value.trim();
  const password = document.getElementById("signup-password").value.trim();

  if (!username || !password) {
    alert("Please fill all fields");
    return;
  }

  // check duplicates
  for (let u of users) {
    const parsed = JSON.parse(u);
    if (parsed.username === username) {
      alert("Username already exists!");
      return;
    }
  }

  users.add(JSON.stringify({ username, password }));
  saveUsers();

  alert("Signup successful! Please login.");
  showLogin();
}

// --- Login ---
function login() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();

  for (let u of users) {
    const parsed = JSON.parse(u);
    if (parsed.username === username && parsed.password === password) {
      currentUser = username;
      saveCurrentUser();
      document.getElementById("user").innerText = username;
      showDashboard();
      return;
    }
  }
  alert("Invalid credentials");
}

// --- Add Todo ---
function addTodo() {
  const todo = document.getElementById("todo-input").value.trim();
  if (!todo) {
    alert("Please type something!");
    return;
  }

  if (todos.has(todo)) {
    alert("Todo already exists!");
    return;
  }

  todos.add(todo);
  saveTodos();
  renderTodos();
  document.getElementById("todo-input").value = "";
}

// --- Render Todos ---
function renderTodos() {
  const list = document.getElementById("todo-list");
  list.innerHTML = "";

  for (let t of todos) {
    const li = document.createElement("li");
    li.textContent = t;

// Delete button
const delBtn = document.createElement("button");
delBtn.textContent = "❌";
delBtn.style.marginLeft = "10px";
// delBtn.style.background = "red";
delBtn.style.color = "white";
delBtn.style.border = "none";
delBtn.style.borderRadius = "50%";
delBtn.style.cursor = "pointer";
delBtn.style.width = "25px";   // small size
delBtn.style.height = "25px";  // small size
delBtn.style.fontSize = "14px";
delBtn.style.display = "inline-flex";
delBtn.style.alignItems = "center";
delBtn.style.justifyContent = "center";


    delBtn.onclick = () => {
      todos.delete(t);
      saveTodos();
      renderTodos();
    };

    li.appendChild(delBtn);
    list.appendChild(li);
  }
}

// --- Logout ---
function logout() {
  currentUser = null;
  saveCurrentUser();
  todos.clear();
  saveTodos();
  showLogin();
}

// --- Navigation ---
function showSignup() {
  document.getElementById("signup-page").style.display = "block";
  document.getElementById("login-page").style.display = "none";
  document.getElementById("dashboard").style.display = "none";
}

function showLogin() {
  document.getElementById("signup-page").style.display = "none";
  document.getElementById("login-page").style.display = "block";
  document.getElementById("dashboard").style.display = "none";
}

function showDashboard() {
  document.getElementById("signup-page").style.display = "none";
  document.getElementById("login-page").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
  renderTodos();
}

// --- Auto-load state on refresh ---
window.onload = () => {
  if (currentUser) {
    document.getElementById("user").innerText = currentUser;
    showDashboard();
  } else {
    showLogin();
  }
};
