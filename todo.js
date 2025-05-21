const addTaskForm = document.getElementById("add-task-form");
const newTaskInput = document.getElementById("new-task-input");
const taskList = document.getElementById("task-list");
const taskCounter = document.getElementById("task-counter");
const taskAddDeletePopup = document.getElementById("task-add-delete-popup");
const popupTitle = taskAddDeletePopup.querySelector(".popup-title");
const popupMessage = taskAddDeletePopup.querySelector(".popup-message");
let popupTimeoutId;

addTaskForm.addEventListener("submit", handleTaskAdd);

taskList.addEventListener("click", handleTaskDelete);

function handleTaskAdd(event) {
    event.preventDefault();

    const taskInputText = newTaskInput.value;
    if (taskInputText === "") {
        return;
    }

    const newTaskItem = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", handleTaskToggle);
    newTaskItem.appendChild(checkbox);

    const taskTextElement = document.createElement("span");
    taskTextElement.textContent = taskInputText;
    newTaskItem.appendChild(taskTextElement);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("delete-task-button");
    newTaskItem.appendChild(deleteButton);

    taskList.appendChild(newTaskItem);

    newTaskInput.value = "";

    updateTaskCounter();
    
    displayPopup("Task added", "Your task has been added successfully!");
}

function handleTaskDelete(event) {

    if (event.target.classList.contains("delete-task-button")) {
        const taskItemToRemove = event.target.parentElement;
        taskItemToRemove.remove();

        updateTaskCounter();

        displayPopup("Task deleted", "Your task has been deleted successfully!");
    }
}

function handleTaskToggle(event) {
    const toggledTask = event.target.parentElement;
    toggledTask.classList.toggle("completed");

    updateTaskCounter();
}

function updateTaskCounter() {
    const totalTasks = taskList.children.length;

    const completedTasks = taskList.querySelectorAll("li.completed").length;

    taskCounter.innerText = `${completedTasks} of ${totalTasks} completed`;
}

function displayPopup(titleText, messageText) {

    popupTitle.innerText = titleText;
    popupMessage.innerText = messageText;

    if (popupTimeoutId) {
        clearTimeout(popupTimeoutId);
    }

    taskAddDeletePopup.classList.remove("hidden");

    popupTimeoutId = setTimeout(() => {
        taskAddDeletePopup.classList.add("hidden");
    }, 3000)
}