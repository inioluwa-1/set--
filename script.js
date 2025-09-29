// Store users in a Set
  const users = new Set();
  // Store todos in a Set
  const todos = new Set();
  let currentUser = null;

  function signup() {
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;

    if (!username || !password) {
      alert("Please fill all fields");
      return;
    }

    // Check if username already exists
    for (let u of users) {
      if (u.username === username) {
        alert("Username already exists!");
        return;
      }
    }

    users.add({ username, password });
    alert("Signup successful! Please login.");
    showLogin();
  }

  function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    for (let u of users) {
      if (u.username === username && u.password === password) {
        currentUser = username;
        document.getElementById("user").innerText = username;
        showDashboard();
        return;
      }
    }
    alert("Invalid credentials");
  }

  function addTodo() {
    const todo = document.getElementById("todo-input").value;
    if (!todo) return;

    if (todos.has(todo)) {
      alert("Todo already exists!");
      return;
    }

    todos.add(todo);
    renderTodos();
    document.getElementById("todo-input").value = "";
  }

  function renderTodos() {
    const list = document.getElementById("todo-list");
    list.innerHTML = "";
    for (let t of todos) {
      const li = document.createElement("li");
      li.textContent = t;
      list.appendChild(li);
    }
  }

  function logout() {
    currentUser = null;
    todos.clear();
    showLogin();
  }

  // Navigation helpers
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
  }