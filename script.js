const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const dueDate = document.getElementById("dueDate");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const searchTask = document.getElementById("searchTask");
const filter = document.getElementById("filter");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

addBtn.addEventListener("click", addTask);

function addTask() {

    if(taskInput.value.trim() === ""){
        alert("Please enter a task");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskInput.value,
        priority: priority.value,
        dueDate: dueDate.value,
        completed: false
    };

    tasks.push(task);

    saveTasks();

    taskInput.value = "";
    dueDate.value = "";

    displayTasks();
}
function displayTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {

        if (filter.value === "completed") return task.completed;
        if (filter.value === "pending") return !task.completed;

        return true;
    });

    filteredTasks = filteredTasks.filter(task =>
        task.text.toLowerCase().includes(searchTask.value.toLowerCase())
    );

    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }
        if (task.priority === "High") {
    li.classList.add("high");
} else if (task.priority === "Medium") {
    li.classList.add("medium");
} else {
    li.classList.add("low");
}

        li.innerHTML = `
            <div class="task-info">
    <strong>📝 ${task.text}</strong>
    <span>🏷️ Priority: ${task.priority}</span>
    <span>📅 Due: ${task.dueDate || "Not Set"}</span>
</div>

            <div class="task-buttons">
                <button onclick="toggleTask(${task.id})">✓</button>
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        taskList.appendChild(li);

    });

    updateCounts();
}
function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });

    saveTasks();
    displayTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    displayTasks();
}

function editTask(id) {
    const task = tasks.find(task => task.id === id);

    const newTask = prompt("Edit Task", task.text);

    if (newTask !== null && newTask.trim() !== "") {
        task.text = newTask;
        saveTasks();
        displayTasks();
    }
}

function updateCounts() {
    totalTasks.textContent = tasks.length;

    completedTasks.textContent = tasks.filter(task => task.completed).length;

    pendingTasks.textContent = tasks.filter(task => !task.completed).length;
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

searchTask.addEventListener("keyup", displayTasks);
filter.addEventListener("change", displayTasks);