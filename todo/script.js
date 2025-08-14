const newTaskBtn = document.querySelector(".add-task-btn");
const closeBtn = document.querySelector(".close-btn");
const inputContainer = document.querySelector(".input-container");
const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const tasksContainer = document.querySelector(".tasks");

let editingIndex = null;
const STORAGE_KEY = "taskData";

let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

function saveTask() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
document.body.addEventListener("keydown", (e) => {
  if (e.shiftKey && e.key.toLocaleLowerCase() === "n") {
    e.preventDefault();
    inputContainer.classList.toggle("input-toggle");
    addBtn.textContent = "Add";
    taskInput.focus();
  }
});

newTaskBtn.addEventListener("click", () => {
  inputContainer.classList.toggle("input-toggle");
  addBtn.textContent = "Add";
  taskInput.focus();
});
closeBtn.addEventListener("click", () => {
  if(editingIndex === null){
    inputContainer.classList.toggle("input-toggle");
}else{
    taskInput.value = ""
    editingIndex = null
    inputContainer.classList.toggle("input-toggle");
  }
});

function render() {
  let clutter = tasks.map((task, index) => {
    let status;
    task.completed ? (status = "completed") : (status = "pending");

    return `<div class="task">
            <div class="text">
              <p class="task-text ${status}">${task.text}</p>
            </div>

            <div class="task-actions">
              ${
                task.completed
                  ? (icon = `<i data-index="${index}" class="bi bi-arrow-counterclockwise task-done"></i>`)
                  : (icon = `<i data-index="${index}" class="bi bi-check-circle-fill task-done"></i>`)
              }
              <i data-index="${index}" class="bi bi-pencil-square edit-btn"></i>
              <i data-index="${index}" class="bi bi-file-earmark-x-fill delete-btn"></i>
            </div>
          </div>`;
  });

  tasksContainer.innerHTML = clutter.join("");
}

render();

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (taskInput.value.trim() === "") {
      alert("input box is empty");
      return;
    }
    if (editingIndex === null) {
      tasks.push({
        text: taskInput.value.trim(),
        completed: false,
      });
    } else {
      tasks[editingIndex].text = taskInput.value.trim();
      editingIndex = null;
    }
    saveTask();
    render();
    taskInput.value = "";
    inputContainer.classList.toggle("input-toggle");
  }
});

addBtn.addEventListener("click", () => {
  if (taskInput.value.trim() === "") {
    alert("input box is empty");
    return;
  }
  if (editingIndex === null) {
    tasks.push({
      text: taskInput.value.trim(),
      completed: false,
    });
  } else {
    tasks[editingIndex].text = taskInput.value.trim();
    saveTask();
    editingIndex = null;
  }
  saveTask();
  render();
  taskInput.value = "";
  inputContainer.classList.toggle("input-toggle");
});

tasksContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("task-done")) {
    let index = e.target.dataset.index;
    tasks[index].completed = tasks[index].completed ? false : true;
    saveTask();
    render();
  }
  if (e.target.classList.contains("edit-btn")) {
    let index = e.target.dataset.index;
    editingIndex = index;
    inputContainer.classList.toggle("input-toggle");
    taskInput.focus();
    taskInput.value = tasks[index].text;
    addBtn.textContent = "Update";
  }
  if (e.target.classList.contains("delete-btn")) {
    let index = e.target.dataset.index;
    tasks.splice(index, 1);
    saveTask();
    render();
  }
});




