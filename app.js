const form = document.querySelector("form");
const todoList = document.querySelector("#todo_list");
let UI = parseInt(localStorage.getItem("UI")) || 0;
const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

for (let i = 0; i < savedTodos.length; i++) {
  let newLi = document.createElement("li");
  let newButton = document.createElement("button");
  let text = savedTodos[i].task;
  newLi.innerText = text.concat("   ");
  newLi.id = savedTodos[i].ID;;
  newLi.isCompleted = savedTodos[i].isCompleted ? true : false;
  if (newLi.isCompleted) {
    newLi.className = "completed";
  }
  else{
    newLi.className = "todo";
  }
  
  newButton.innerHTML = "&#10006;";
  newLi.append(newButton);
  todoList.appendChild(newLi);
}


form.addEventListener("submit", function(event) {
    event.preventDefault();
    UI++;
    const newTodoInput = document.querySelector("#new-todo");
    const newLi = document.createElement("li");
    const newButton = document.createElement("button");
    let text = newTodoInput.value;
    newLi.innerText = text.concat("   ");
    newLi.className = "todo";
    newLi.id = UI;
    todoList.append(newLi);
    savedTodos.push({ ID: UI, task: newLi.innerText, isCompleted: false });
    newButton.innerHTML = "&#10006;";
    newLi.append(newButton);
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
      if (crossIndex > -1) { 
        savedTodos[crossIndex].isCompleted = true;
      }
      let UI = parseInt(localStorage.getItem("UI"))
      localStorage.clear();
      localStorage.setItem("todos", JSON.stringify(savedTodos));
      localStorage.setItem("UI", UI);
    }
  });

 


