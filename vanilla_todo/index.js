class Task {
  constructor(description, color, completed = false) {
	this.description = description;
	this.color = color;
	this.completed = completed;
  }
}


const addTaskBtn = document.getElementById("btn");
const deskTaskInput = document.getElementById("description-task");
const todosWrapper = document.querySelector(".todos-wrapper");
const colorSelector = document.getElementById("color-change")

console.log(colorSelector)

let tasks = localStorage.tasks ? JSON.parse(localStorage.getItem("tasks")) : []



let todoItemElems = [];

const colorArray = ["#5e59b4", "#fa9a01", "#1a7602", "#f92c03", "#2fd160", "#4b33ff"]

colorArray.forEach(color => {
  renderColorBox(color)
})

let selectedColor = randomColor();

changeSelectedColor(selectedColor)

function changeSelectedColor(color) {
  const prevBox = document.getElementById(`color-box-${selectedColor}`)
  prevBox.classList.remove("selected-color-box")
  const newBox = document.getElementById(`color-box-${color}`)
  newBox.classList.add("selected-color-box")
  selectedColor = color;
}


function renderColorBox(color) {
  const wrapper = document.createElement("div")

  const colorBox = document.createElement("div")
  colorBox.className = "radio1"
  colorBox.onclick = function () {
	changeSelectedColor(color)
  }

  wrapper.className = "color-box-wrapper"
  colorBox.style.backgroundColor = color;
  wrapper.appendChild(colorBox)

  wrapper.id = `color-box-${color}`
  colorSelector.appendChild(wrapper)
}


function randomColor() {
  const randIndex = Math.floor(Math.random() * colorArray.length)
  return colorArray[randIndex]
}







function renderTask(task, index) {
  let isCompleted = task.completed;
  const wrapper = document.createElement("div");
  wrapper.classList.add("todo-item");

  wrapper.style.backgroundColor = isCompleted ? "A9A9A9FF" : task.color ;

  if (isCompleted) {
	wrapper.classList.add("checked");
  }

  const checkbox = document.createElement("input")
  checkbox.type = "checkbox";
  checkbox.classList.add("btn__complete");
  checkbox.checked = isCompleted;
  checkbox.onchange = () => onCheck(index)

  wrapper.appendChild(checkbox);

  const textWrap = document.createElement("div");
  textWrap.classList.add("description");
  textWrap.textContent = task.description;
  wrapper.appendChild(textWrap);
  return wrapper;
}


// const createTemplate = (task, index) => {
//   return `
//  		<div   class="todo-item ${task.completed ? "checked" : ""}">
//             <input onclick="completeTask(${index})" class="btn__complete" type="checkbox" ${task.completed ? "checked" : ""} >
//             <div   class="description">${task.description}</div>
//         </div>
// `
// }





const fillHtmlList = () => {
  todosWrapper.innerHTML = "";
  if (tasks.length > 0) {
	tasks.forEach((item, index) => {
	  todosWrapper.appendChild(renderTask(item, index))
	})
	todoItemElems = document.querySelectorAll(".todo-item")
  }
}

fillHtmlList();


const onCheck = (index) => {
  tasks[index] = {
    ...tasks[index],
    completed: !tasks[index].completed
  }
  updateLocal()
  fillHtmlList()
}



// const completeTask = (index) => {
//   tasks[index].completed = !tasks[index].completed;
//   if (tasks[index].completed) {
//     todoItemElems[index].classList.add("checked");
//   } else {
//     todoItemElems[index].classList.remove("checked");
//   }
//
//   updateLocal();
//   fillHtmlList();
//
// }

const updateLocal = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks))
}




addTaskBtn.addEventListener("click", () => {
  let inputValue = deskTaskInput.value
  tasks.push(new Task(inputValue, selectedColor));
  updateLocal();
  fillHtmlList();
  deskTaskInput.value = "";
})