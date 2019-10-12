// UI Variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // DOM Load event
    document.addEventListener("DOMContentLoaded", getTasks);
    // Add Task event
    form.addEventListener("submit", addTask);
    // Remove Task event
    taskList.addEventListener("click", removeTask);
    // Clear all Task event
    clearBtn.addEventListener("click", clearTasks);
    // Filter  tasks
    filter.addEventListener("keyup", filterTasks);
}

// Get Tasks from Local Storage
function getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task) {
        // Create li element
        const li = document.createElement("li");
        // Add Class
        li.className = "collection-item";
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));

        // Create new link element
        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);

        // Append li to the ul
        taskList.appendChild(li);
    });
}

// Add Task
function addTask(e) {
    if (taskInput.value === "") {
        alert("Add a task first!");
        return false;
    }

    // Create li element
    const li = document.createElement("li");
    // Add Class
    li.className = "collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    // Create new link element
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    // Append li to the ul
    taskList.appendChild(li);

    // Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = "";

    e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove Task function
function removeTask(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
        e.target.parentElement.parentElement.remove();
        // Remove from Local Storeage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}

// Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear Tasks function
function clearTasks() {
    // Remove all tasks
    if (confirm("Are You Sure?")) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        // Clear from Local Storage
        clearTasksFromLocalStorage();
    }
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll(".collection-item").forEach(function(task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
}