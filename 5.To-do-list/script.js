// dom accessing
const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

//a global variable to access in all functions
let editTodo = null;

//function, take input value from input box , apply the following
const addTodo = () => {
  //trim: remove initial and leading spaces

  const inputText = inputBox.value.trim();

  //cant add empty input
  if (inputText.length <= 0) {
    alert("please write a task to add in the do list");
    return false;
  }

  //check if addbtn has the value edit
  if (addBtn.value === "Edit") {
    const oldText = editTodo.target.previousElementSibling.innerHTML; // old value
    editTodo.target.previousElementSibling.innerHTML = inputText;

    // call edit local todo function here
    editLocalTodos(oldText, inputText);

    addBtn.value = "Add";
    inputBox.value = "";
  } else {
    // create an instance of li and p to be used later- dom manipulation
    const li = document.createElement("li");
    const p = document.createElement("p");

    //nesting
    p.innerHTML = inputText;
    li.appendChild(p);

    //edit button
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";

    //giving class to style in css
    editBtn.classList.add("btn", "editBtn");

    //nest
    li.appendChild(editBtn);

    //delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Remove";

    //giving class to style in css
    deleteBtn.classList.add("btn", "deleteBtn");
    //nest
    li.appendChild(deleteBtn);

    //final nest
    todoList.appendChild(li);
    //empty input box after adding
    inputBox.value = "";

    //local storage save
    saveLocalTodos(inputText);
  }
};

//function: remove and edit task
const updateTodo = (e) => {
  //passing e as a parameter

  //remove button

  //condition: if clicked remove then remove the parent element-by dom manipulation
  if (e.target.innerHTML === "Remove") {
    todoList.removeChild(e.target.parentElement);

    //delete from local storage func
    deleteLocalTodos(e.target.parentElement);
  }

  // click edit, input text goes back into parent element and focused then returned to child
  if (e.target.innerHTML === "Edit") {
    inputBox.value = e.target.previousElementSibling.innerHTML;
    inputBox.focus();
    addBtn.value = "Edit";
    editTodo = e;
  }
};

//save in local storage
const saveLocalTodos = (todo) => {
  //save in an array
  let todos;

  //condition if null
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    //first check already saved items
    //json parse to convert string to object
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);

  //give key and value to local storage
  //json stringify to covert objects into a string
  localStorage.setItem("todos", JSON.stringify(todos));
};

// get from local storage
const getLocalTodos = () => {
  // again , first check if null

  //save in an array
  let todos;

  //condition if null
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    //first check already saved items
    //json parse to convert string to object
    todos = JSON.parse(localStorage.getItem("todos"));

    //loop to show all saved todos
    todos.forEach((todo) => {
      //the following code is copied from line - function add todos

      // create an instance of li and p to be used later- dom manipulation
      const li = document.createElement("li");
      const p = document.createElement("p");

      //nesting
      p.innerHTML = todo;
      li.appendChild(p);

      //edit button
      const editBtn = document.createElement("button");
      editBtn.innerText = "Edit";

      //giving class to style in css
      editBtn.classList.add("btn", "editBtn");

      //nest
      li.appendChild(editBtn);

      //delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Remove";

      //giving class to style in css
      deleteBtn.classList.add("btn", "deleteBtn");
      //nest
      li.appendChild(deleteBtn);

      //final nest
      todoList.appendChild(li);
    });
  }
};

//delete from local storage
const deleteLocalTodos = (todo) => {
  //following code copied from save local todo function to check the condition

  //save in an array
  let todos;

  //condition if null
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    //first check already saved items
    //json parse to convert string to object
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  //take arrays first child
  let todoText = todo.children[0].innerHTML;

  //see whats the childs index positiion is
  let todoIndex = todos.indexOf(todoText);

  //array splice:
  // deletes from passed index, and the number of elements to be deleted
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));

  console.log(todoIndex);
};

//edit in local storage
const editLocalTodos = (oldTodo, newTodo) => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  let todoIndex = todos.indexOf(oldTodo); // find old value
  if (todoIndex !== -1) {
    todos[todoIndex] = newTodo; // replace with new value
    //set in local storage
    localStorage.setItem("todos", JSON.stringify(todos));
  }
};

//event: when the full page from dom is loaded , run getlocaltodos function
document.addEventListener("DOMContentLoaded", getLocalTodos);

//event , click add btn triggers add todo function
addBtn.addEventListener("click", addTodo);

//event , clicking the task buttons-del and edit => triggers updateTodo function
todoList.addEventListener("click", updateTodo);
