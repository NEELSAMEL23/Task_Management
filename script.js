document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("task-form");
    const taskTitle = document.getElementById("task-title");
    const taskDesc = document.getElementById("task-desc");
    const taskStatus = document.getElementById("task-status");
    const filterStatus = document.getElementById("filter-status");
    const taskList = document.getElementById("task-list");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Render tasks
    function renderTasks() {
        taskList.innerHTML = "";

        const filteredTasks = tasks.filter(
            (task) => filterStatus.value === "All" || task.status === filterStatus.value
        );

        filteredTasks.forEach((task, index) => {
            const taskItem = document.createElement("li");
            taskItem.className = `task-item ${task.status === "Completed" ? "completed" : ""}`;

            taskItem.innerHTML = `
                <div>
                    <strong>${task.title}</strong>
                    <p>${task.description}</p>
                    <small>Status: ${task.status}</small>
                </div>
                <div class="task-actions">
                    <button class="toggle-btn" onclick="toggleComplete(${index})">Toggle</button>
                    <button class="edit-btn" onclick="editTask(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
                </div>
            `;

            taskList.appendChild(taskItem);
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Add Task
    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const newTask = {
            title: taskTitle.value.trim(),
            description: taskDesc.value.trim(),
            status: taskStatus.value,
        };

        tasks.push(newTask);
        saveTasks();
        taskForm.reset();
    });

    // Toggle Task Completion
    window.toggleComplete = function (index) {
        tasks[index].status = tasks[index].status === "Completed" ? "Pending" : "Completed";
        saveTasks();
    };

    // Edit Task
    window.editTask = function (index) {
        const task = tasks[index];
        taskTitle.value = task.title;
        taskDesc.value = task.description;
        taskStatus.value = task.status;

        // Remove the task & re-add on form submit
        tasks.splice(index, 1);
        saveTasks();
    };

    // Delete Task
    window.deleteTask = function (index) {
        tasks.splice(index, 1);
        saveTasks();
    };

    // Save & Render Tasks
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }

    // Filter Tasks
    filterStatus.addEventListener("change", renderTasks);

    renderTasks(); // Initial Render
});
