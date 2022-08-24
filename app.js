const form = document.querySelector("form");
const todoList = document.querySelector("#todo_list");

const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

for (let i = 0; i < savedTodos.length; i++) {
  let newLi = document.createElement("li");
  let newButton = document.createElement("button");
  newLi.innerText = savedTodos[i].task;
  newLi.isCompleted = savedTodos[i].isCompleted ? true : false;
  if (newLi.isCompleted) {
    newLi.style.textDecoration = "line-through";
  }
  newLi.className = "todo";
  newButton.innerText = "";
  newLi.append(newButton);
  todoList.appendChild(newLi);
}


form.addEventListener("submit", function(event) {
    event.preventDefault();
    const newTodoInput = document.querySelector("#new-todo");
    const newLi = document.createElement("li");
    const newButton = document.createElement("button");
    newLi.innerText = newTodoInput.value;
    newLi.className = "todo";
    newButton.innerText = "";
    newLi.append(newButton);
    todoList.append(newLi);
    savedTodos.push({ task: newLi.innerText, isCompleted: false });
    localStorage.setItem("todos", JSON.stringify(savedTodos));
    form.reset();
  });

  todoList.addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
      event.target.parentElement.remove();
      localStorage.clear();
    }
  });

  todoList.addEventListener("click", function(event) {
    if (event.target.textContent) {
      event.target.className = "completed";
    }
  });

 


