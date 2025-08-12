const addTaskWrapper = document.querySelector("#addTaskWrapper");
const input = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addTask");
const taskList = document.querySelector("#taskList");

let data = JSON.parse(localStorage.getItem("data")) || [];
let editingIndex = null;

function renderTask() {
  taskList.innerHTML = "";
  data.forEach((task, index) => {
    //creating elements
    const div = document.createElement("div");
    const actionDiv = document.createElement("div");
    const li = document.createElement("li");
    const btn = document.createElement("button");
    const editBtn = document.createElement("button");
    const doneBtn = document.createElement("button");

    //dealing with text contents
    addBtn.textContent = editingIndex === null? "Add": "Update"
    li.textContent = task.text;
    btn.textContent = "Delete";
    editBtn.textContent = "Edit";
    doneBtn.textContent = task.completed ? "Undo" : "Done";
    
    //dealing with classes and id
    li.classList.add("list");

    if (task.completed) {
      li.classList.add("task-completed")
    }

    div.classList.add("listWrapper");
    actionDiv.classList.add("actionDiv");
    // btn.id = index;
    btn.dataset.index = index;
    btn.classList.add("delete");
    // editBtn.id = index + 1;
    editBtn.dataset.index = index;
    editBtn.classList.add("edit");
    // doneBtn.id = index + 2
    doneBtn.dataset.index = index;
    doneBtn.classList.add("done");

    //appending elements
    taskList.appendChild(div);
    div.appendChild(li);
    actionDiv.appendChild(doneBtn);
    actionDiv.appendChild(editBtn);
    actionDiv.appendChild(btn);
    div.appendChild(actionDiv);

    //event listeners for 'Delete, Edit and Done' buttons
    actionDiv.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete")) {
        let index = e.target.dataset.index;
        data.splice(index, 1);
        localStorage.setItem("data", JSON.stringify(data));
        renderTask();
      }

      if (e.target.classList.contains("edit")) {
        let index = Number(e.target.dataset.index);
        let currentTask = data[index].text;
        input.value = currentTask;
        input.focus()
        editingIndex = index;
        addBtn.textContent = "Update"

        //   let newtask = prompt("edit your task", currentTask);
        //   if(!newtask || newtask.trim() === ""){
        //       alert("you can't leave it blank")
        //       return
        // }
        //   data[index].text = newtask;
        //   localStorage.setItem("data", JSON.stringify(data));
        // renderTask();
      }

      if (e.target.classList.contains("done")) {
        let index = Number(e.target.dataset.index);
        data[index].completed = !data[index].completed;
        localStorage.setItem("data", JSON.stringify(data));
        renderTask();
      }
    });
  });
}

renderTask();

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
  if (input.value.trim() === "") {
    alert("enter a task");
    return;
  }

  if (editingIndex === null) {
    data.push({
      text: input.value.trim(),
      completed: false,
    });
  }else{
    data[editingIndex].text = input.value.trim()
    editingIndex = null
    addBtn.textContent = "Add"
  }

  localStorage.setItem("data", JSON.stringify(data));
  input.value = "";
  renderTask();
  }
});

addBtn.addEventListener("click", () => {
  if (input.value.trim() === "") {
    alert("enter a task");
    return;
  }

  if (editingIndex === null) {
    data.push({
      text: input.value.trim(),
      completed: false,
    });
  }else{
    data[editingIndex].text = input.value.trim()
    editingIndex = null
    addBtn.textContent = "Add"
  }

  localStorage.setItem("data", JSON.stringify(data));
  input.value = "";
  renderTask();
});



