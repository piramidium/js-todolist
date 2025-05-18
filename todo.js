const addTaskForm = document.getElementById("add-task-form");
const newTaskInput = document.getElementById("new-task-input");
const taskList = document.getElementById("task-list");
const taskCounter = document.getElementById("task-counter");
const taskAddDeletePopup = document.getElementById("task-add-delete-popup");
let popupTimeoutId = null;

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
    deleteButton.innerText = "x";
    deleteButton.type = "button";
    deleteButton.classList.add("delete-task-button");
    deleteButton.setAttribute("aria-label", `Delete task: ${taskInputText}`);
    newTaskItem.appendChild(deleteButton);

    taskList.appendChild(newTaskItem);

    newTaskInput.value = "";

    updateTaskCounter();

    displayPopup("Task added", "Your task has been added succesfully!");
}

function handleTaskDelete(event) {

    if (event.target.classList.contains("delete-task-button")) {
        const taskItemToRemove = event.target.parentElement;
        taskItemToRemove.remove();

        updateTaskCounter();

        displayPopup("Task deleted", "Your task has been deleted succesfully!");
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

function displayPopup(h3Message, paragraphMessage) {

    const popupH3 = taskAddDeletePopup.querySelector("h3");
    const popupParagraph = taskAddDeletePopup.querySelector("p");

    popupH3.innerText = h3Message;
    popupParagraph.innerText = paragraphMessage;

    if (popupTimeoutId) {
        clearTimeout(popupTimeoutId);
    }

    taskAddDeletePopup.classList.remove("hidden");

    popupTimeoutId = setTimeout(() => {
        taskAddDeletePopup.classList.add("hidden");
        popupTimeoutId = null;
    }, 3000)
}