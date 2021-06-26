// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


// Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
// after reloading the page
document.addEventListener('DOMContentLoaded', getTodos);


// Functions
function addTodo(e){
    e.preventDefault();

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('new-item');
    todoDiv.appendChild(newTodo);
    // Saving in localStorage
    saveLocalTodos(todoInput.value);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    // Appending the whole div in the ul(todoList)
    todoList.appendChild(todoDiv);

    // Clearing todoInput field after entering one
    todoInput.value = '';
}


function deleteCheck(e){
    const i = e.target;

    // DELETING
    if(i.classList[0] === 'trash-btn'){

        // Animation (here parentElement is the whole div with li)
        i.parentElement.classList.add('fall');
        removeLocalTodos(i.parentElement); //removing from localStorage
        i.parentElement.addEventListener('transitionend', () =>{
            i.parentElement.remove();
        });
    }

    // CHECKING
    if(i.classList[0] === 'complete-btn'){
        i.parentElement.classList.toggle('completed');
    }
}


function filterTodo(e){
    // here children means all the todos created in the ul
    const todos = todoList.children;
    const todos2 = Array.from(todos);

    todos2.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
        }
    });
}


//-------------------------------------------------------------//


function saveLocalTodos(todo){
    // Check -- Do i already have todos in there?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}


// For showing the todos from localStorage after refreshing--

function getTodos(){
    // Check -- Do i already have todos in there?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    // Doing the same thing again just to show the saved todos
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('new-item');
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    // Appending the whole div in the ul(todoList)
    todoList.appendChild(todoDiv);
    });
}


function removeLocalTodos(todo){
    // Check -- Do i already have todos in there?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    //here 'todo' is actually the whole div from ul
    const a = todo.children[0].innerText;
    todos.splice(todos.indexOf(a), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}


