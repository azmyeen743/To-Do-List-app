document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Task cannot be empty!");
        return;
    }

    let taskList = document.getElementById("taskList");

    let li = document.createElement("li");
    li.innerHTML = `${taskText} 
        <button class="edit" onclick="editTask(this)">Edit</button>
        <button class="delete" onclick="deleteTask(this)">Delete</button>`;

    taskList.appendChild(li);
    saveTask();

    taskInput.value = "";
}

function editTask(button) {
    let li = button.parentElement;
    let updatedText = prompt("Edit your task:", li.firstChild.textContent);

    if (updatedText !== null && updatedText.trim() !== "") {
        li.firstChild.textContent = updatedText;
        saveTask();
    } else {
        alert("Task cannot be empty!");
    }
}

function deleteTask(button) {
    let li = button.parentElement;
    li.remove();
    saveTask();
}

function saveTask() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push(li.firstChild.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");

    tasks.forEach(taskText => {
        let li = document.createElement("li");
        li.innerHTML = `${taskText} 
            <button class="edit" onclick="editTask(this)">Edit</button>
            <button class="delete" onclick="deleteTask(this)">Delete</button>`;
        taskList.appendChild(li);
    });
}
