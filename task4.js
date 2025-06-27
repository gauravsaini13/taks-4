 document.getElementById("contactForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Message sent successfully!");
});


// part 2

// Load tasks on page load
window.onload = function () {
  loadTasks();
};

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();
  if (task === "") return;

  const tasks = getTasksFromStorage();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskInput.value = "";
  renderTasks();
}

function deleteTask(index) {
  const tasks = getTasksFromStorage();
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function getTasksFromStorage() {
  const stored = localStorage.getItem("tasks");
  return stored ? JSON.parse(stored) : [];
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  const tasks = getTasksFromStorage();

  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${task}
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

function loadTasks() {
  renderTasks();
}



// part 3


const products = [
  { name: "Smartphone", category: "Electronics", price: 1200, rating: 4.5 },
  { name: "Headphones", category: "Electronics", price: 300, rating: 4.2 },
  { name: "T-Shirt", category: "Fashion", price: 500, rating: 4.0 },
  { name: "Laptop", category: "Electronics", price: 1500, rating: 4.8 },
  { name: "Shoes", category: "Fashion", price: 800, rating: 4.3 },
  { name: "Watch", category: "Fashion", price: 1500, rating: 4.6 },
];

const productList = document.getElementById("productList");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");
const sortBy = document.getElementById("sortBy");

function displayProducts(items) {
  productList.innerHTML = "";
  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h2>${item.name}</h2>
      <p>Category: ${item.category}</p>
      <p>Price: ₹${item.price}</p>
      <p>Rating: ⭐ ${item.rating}</p>
    `;
    productList.appendChild(card);
  });
}

function applyFilters() {
  let filtered = [...products];

  const category = categoryFilter.value;
  const priceRange = priceFilter.value;
  const sort = sortBy.value;

  // Filter by category
  if (category !== "all") {
    filtered = filtered.filter((item) => item.category === category);
  }

  // Filter by price
  if (priceRange !== "all") {
    const [min, max] = priceRange.split("-").map(Number);
    filtered = filtered.filter((item) => item.price >= min && item.price <= max);
  }

  // Sort
  if (sort === "priceAsc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "priceDesc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === "ratingDesc") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  displayProducts(filtered);
}

// Event Listeners
categoryFilter.addEventListener("change", applyFilters);
priceFilter.addEventListener("change", applyFilters);
sortBy.addEventListener("change", applyFilters);

// Initial Display
displayProducts(products);
