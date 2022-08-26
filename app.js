const form = document.querySelector("form");
const todoList = document.querySelector("#todo_list");
let UI = parseInt(localStorage.getItem("UI")) || 0;
const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

for (let i = 0; i < savedTodos.length; i++) {
  let newLi = document.createElement("li");
  let newButton = document.createElement("button");
  newLi.innerText = savedTodos[i].task;
  newLi.id = savedTodos[i].ID;;
  newLi.isCompleted = savedTodos[i].isCompleted ? true : false;
  if (newLi.isCompleted) {
    newLi.className = "completed";
  }
  else{
    newLi.className = "todo";
  }
  
  newButton.innerText = "";
  newLi.append(newButton);
  todoList.appendChild(newLi);
}


form.addEventListener("submit", function(event) {
    event.preventDefault();
    UI++;
    const newTodoInput = document.querySelector("#new-todo");
    const newLi = document.createElement("li");
    const newButton = document.createElement("button");
    newLi.innerText = newTodoInput.value;
    newLi.className = "todo";
    newLi.id = UI;
    newButton.innerText = "";
    newLi.append(newButton);
    todoList.append(newLi);
    savedTodos.push({ ID: UI, task: newLi.innerText, isCompleted: false });
    localStorage.setItem("UI", UI);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
    form.reset();
    console.log(UI);
  });

  todoList.addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
      event.target.parentElement.remove();
      let this_id = event.target.parentElement.id;
      let str_id = this_id.toString();
      let removeIndex = savedTodos.findIndex(x => x.ID == str_id);
      console.log(removeIndex);
      if (removeIndex > -1) { 
        savedTodos.splice(removeIndex, 1); 
      }
      let UI = parseInt(localStorage.getItem("UI"))
      localStorage.clear();
      localStorage.setItem("todos", JSON.stringify(savedTodos));
      localStorage.setItem("UI", UI);
    }
  });

  todoList.addEventListener("click", function(event) {
    if (event.target.textContent) {
      event.target.className = "completed";
      let this_id = event.target.id;
      let str_id = this_id.toString();
      let crossIndex = savedTodos.findIndex(x => x.ID == str_id);
      //obj = savedTodos[crossIndex];
      savedTodos[crossIndex].isCompleted = true;
      //console.log(obj);
      let UI = parseInt(localStorage.getItem("UI"))
      localStorage.clear();
      localStorage.setItem("todos", JSON.stringify(savedTodos));
      localStorage.setItem("UI", UI);
    }
  });

 


