
let tasks = [];

document.getElementById("task-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const due_date = document.getElementById("due_date").value;

    const newTask = {
        id: Date.now(),
        title,
        description,
        due_date,
        status: "Pending",
    };

    tasks.push(newTask);
    renderTasks();
    this.reset(); 
});

function renderTasks(filter = "All") {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    const filteredTasks = tasks.filter((task) => filter === "All" || task.status === filter);

    filteredTasks.forEach((task) => {
        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item", task.status.toLowerCase());

        taskItem.innerHTML = `
            <div>
                <strong>${task.title}</strong> <br />
                <small>${task.due_date}</small>
            </div>
            <div>
                <button onclick="toggleStatus(${task.id})">${task.status === "Pending" ? "Mark as Completed" : "Mark as Pending"}</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        taskList.appendChild(taskItem);
    });
}

function toggleStatus(taskId) {
    const task = tasks.find((task) => task.id === taskId);
    task.status = task.status === "Pending" ? "Completed" : "Pending";
    renderTasks();
}

function deleteTask(taskId) {
    tasks = tasks.filter((task) => task.id !== taskId);
    renderTasks();
}

function filterTasks(status) {
    renderTasks(status);
}


renderTasks();
