const btnAddItem = document.querySelector(".btn-container");
const mainHeading = document.querySelector(".main-heading");
const addItem = document.querySelector(".add-item");
const main = document.querySelector(".main");
const todosCont = document.querySelector(".todosContainer");
const mainPara = main.querySelector("p");


btnAddItem.addEventListener("click", () => {
 mainPara.classList.add("hiddenList");
 const todos=document.querySelectorAll(".todo");
 
   if(todos.length>0){
todos.forEach(ele=>{
  ele.classList.add("blur");
})
   }
  createInputContainer((input) => {
    addSingleTodo(input);
    addTodoToLS();
  });
  
});
//Function to display storedTodos
function displayStoredTodos(){
  if(todosCont.firstElementChild){
    mainPara.remove();
  }
  
  todosCont.innerHTML=``;
  const storedTodo=localStorage.getItem("singleTodo");
  if(storedTodo){
    const todos=JSON.parse(storedTodo);
    todos.forEach(todo=>{
      const singleTodo=document.createElement("div");
      singleTodo.classList.add("todo");
      // helper

      singleTodo.innerHTML=`
      <div class="todo-container">
                        <h2 class="todo-heading">${todo.head}</h2>
                        <hr style="color:black; background-color:black">
                        <div class="todo-list">
                         
                        ${createTodoList(todo)}
                        </div>
                    </div>
                    <div class="todo-btns">
                        <button class="trash-btn todobtn"><i class="fa-solid fa-trash"></i></button>
                        <button class="addTodo-btn todobtn"><i class="fa-solid fa-plus"></i></button>
                    </div>`
      todosCont.appendChild(singleTodo);

      bindTodoButtons(singleTodo);
      bindMarkDoneBtns(singleTodo);
    });
  }
}
//Function to add List Items
function createTodoList(todoItem) {
  if (todoItem && todoItem.listItems && todoItem.listItems.length > 0) {
    return todoItem.listItems.map(item => {
      return `<div class="todo-mark">
                <p class="todo-text ${item.completed ? 'completed' : ''}">${item.head}</p>
                <button class="mark-btn">Mark Done</button>
              </div>`;
    }).join('');  // Join the array of Html strings into a single string
  }
  return "";  // Return empty string if no list items
};



//Function to bind markdone button with wach list item
function bindMarkDoneBtns(singleTodo){
  const markBtns=singleTodo.querySelectorAll(".mark-btn");
  markBtns.forEach(btn=>{
btn.addEventListener("click",()=>{
  const markText=btn.previousElementSibling;
  markText.classList.toggle("completed");
  addTodoToLS();
});
  });
};
//Function to toggle add item view
function toggleAddItemView() {
  mainHeading.classList.add("hidden");
  addItem.classList.add("hidden");
};
//function to create Input Container
function createInputContainer(addOn) {
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");
  inputContainer.innerHTML = ` 
      <div class="input">
                  <h3 class="input-heading">Add New List</h3>
                  <input type="text" class="input-text" placeholder="Add New List">
                  <div class="input-btn">
                      <button class="add-Btn btn">Add</button>
                      <button class="close-btn btn">Close</button>
                  </div>
              </div>`;
  document.body.appendChild(inputContainer);
  addBlur();

  //handling Input Values

  const addBtn = inputContainer.querySelector(".add-Btn");
  const closeBtn = inputContainer.querySelector(".close-btn");
  console.log(addBtn);
  addBtn.addEventListener("click", () => {
    const inputEle = inputContainer.querySelector(".input-text");
    const inputValue = inputEle.value.trim();
   
    if (inputValue) {
      inputEle.value = "";
      inputContainer.remove();
removeBlur();
const todos = document.querySelectorAll(".todo");
if (todos) {
  todos.forEach(ele=>{
    ele.classList.remove("blur");
  });
}
      addOn(inputValue); //callback function to add todo
      addTodoToLS();
     
    } else {
      alert("Enter valid input");
      
    }


   
  });
  closeBtn.addEventListener("click", () => {
    inputContainer.remove();
    removeBlur();
    const todos = document.querySelectorAll(".todo");
    if (todos) {
      todos.forEach(ele=>{
        ele.classList.remove("blur");
        mainPara.classList.add("hiddenList");
      });
    }
    // mainPara.classList.remove("hiddenList");

    
  });
}
//Add Single Todo FUnction

function addSingleTodo(inputValue) {
  mainHeading.classList.remove("hidden");
  addItem.classList.remove("hidden");
  
  const singleTodo = document.createElement("div");
  singleTodo.classList.add("todo");
  singleTodo.innerHTML = ` <div class="todo-container">
                        <h2 class="todo-heading">${inputValue}</h2>
                        <hr style="color:black; background-color:black">
                        <div class="todo-list">
                         
                        
                        </div>
                    </div>
                    <div class="todo-btns">
                        <button class="trash-btn todobtn"><i class="fa-solid fa-trash"></i></button>
                        <button class="addTodo-btn todobtn"><i class="fa-solid fa-plus"></i></button>
                    </div>`;
  todosCont.appendChild(singleTodo);
  const todo=todosCont.querySelector(".todo");
 
    mainPara.classList.add("hiddenList");
    // removeBlur();
    

  singleTodo.classList.remove("hiddenList");

  //handling Input Values
  bindTodoButtons(singleTodo);
  addTodoToLS();
}


function bindTodoButtons(singleTodo) {
  const trashBtn = singleTodo.querySelector(".trash-btn");
  const addListBtn = singleTodo.querySelector(".addTodo-btn");

  trashBtn.addEventListener("click", () => {
    singleTodo.remove();
    removeTodoFromLS(singleTodo);
    const todos = document.querySelectorAll(".todo");
if (todos.length<=0) {
  mainPara.classList.remove("hiddenList");
}
  });

  addListBtn.addEventListener("click", () => {
    // singleTodo.classList.add("blur");
    const todos = document.querySelectorAll(".todo");
    if (todos) {
      todos.forEach(ele=>{
        ele.classList.add("blur");
      })
    }

    createInputContainer((inputValue) => {
 
      const itemList = singleTodo.querySelector(".todo-list");
      const todoItem = document.createElement("div");
      todoItem.classList.add("todo-mark");
      todoItem.innerHTML = ` <p class="todo-text">${inputValue}</p>
        <button class="mark-btn">Mark Done</button>`;
      itemList.appendChild(todoItem);
      
       //Adding marked signs to the values
  const markBtn=todoItem.querySelector(".mark-btn");
  console.log(markBtn);
  markBtn.addEventListener("click",()=>{
    const markText=todoItem.querySelector(".todo-text");
    markText.classList.toggle("completed");
    addTodoToLS();
  });
  removeBlur();
  addTodoToLS();
    });
  
  });

  
};
//Adding Todos to lS
function addTodoToLS(){
  let todoData=[];
  const todos=document.querySelectorAll(".todo");

  todos.forEach(todo=>{
    const todoHeading=todo.querySelector(".todo-heading");
    const todoList=todo.querySelector(".todo-list");
    const todoMark=todoList.querySelectorAll(".todo-mark");

    let listItem=[];
todoMark.forEach(mark=>{
  const todoText=mark.querySelector(".todo-text");
  listItem.push(
    {
      head:todoText.innerHTML,
      completed:todoText.classList.contains("completed")
    }
  )
});
todoData.push(
  {
    head:todoHeading.innerHTML,
    listItems:listItem
  }
)
  });
  localStorage.setItem("singleTodo",JSON.stringify(todoData));
};

//to Remove todo from Local storage

function removeTodoFromLS(singleTodo){
  const todoHeading=singleTodo.querySelector(".todo-heading").innerHTML;
const storedTodo=JSON.parse(localStorage.getItem("singleTodo"));
const updatedTodos=storedTodo.filter(todo=>todo.head !==todoHeading);
localStorage.setItem("singleTodo",JSON.stringify(updatedTodos));
};

//to remove blur
function removeBlur(){
    mainHeading.classList.remove("hidden");
    addItem.classList.remove("hidden");
  
  
}
//to add Blur
function addBlur(){
    mainHeading.classList.add("hidden");
    addItem.classList.add("hidden");
}
displayStoredTodos();
document.addEventListener("DOMContentLoaded",displayStoredTodos);
/* <div class="todo-mark">
<p class="todo-text">hex</p>
<button class="mark-btn">mark done</button>
</div> */

/* <div class="todo">
<div class="todo-container">
    <h2 class="todo-heading">Todo</h2>
    <hr style="color:black; background-color:black">
    <div class="todo-list">
        <div class="todo-mark">
            <p class="todo-text">hex</p>
            <button class="mark-btn">mark done</button>
        </div>
        <div class="todo-mark">
            <p class="todo-text">hex</p>
            <button class="mark-btn">mark done</button>
        </div>
        <div class="todo-mark">
            <p class="todo-text">hex</p>
            <button class="mark-btn">mark done</button>
        </div>
    </div>
</div>
<div class="todo-btns">
    <button class="trash-btn todobtn"><i class="fa-solid fa-trash"></i></button>
    <button class="addTodo-btn todobtn"><i class="fa-solid fa-plus"></i></button>
</div>
</div> */

// const addItem = document.querySelector(".add-item");
// mainHeading.classList.add("hidden");
// addItem.classList.add("hidden");
// const inputContainer = document.createElement("div");
// inputContainer.classList.add("input-container");
// inputContainer.innerHTML = `
//   <div class="input">
//               <h3 class="input-heading">Add New List</h3>
//               <input type="text" class="input-text" placeholder="Add New List">
//               <div class="input-btn">
//                   <button class="add-Btn btn">Add</button>
//                   <button class="close btn">Close</button>
//               </div>
//           </div>`;
//           document.body.appendChild(inputContainer)
