//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todos');

//Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodos);
//this one is for when the document first loads
document.addEventListener('DOMContentLoaded', loadTodos);

//Backend API endpoint
const url = 'http://127.0.0.1:8000/';

//Functions
function addTodo(event) {
    //prevent form from submitting (which means refreshing on click)
    event.preventDefault();
    
    //create a new ToDo div for this new Todo
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    
    //Create <li> that will be placed inside of the new div
    const todoLi = document.createElement('li');
    todoLi.classList.add('todo-item');

    //place a value inside of the new <li>
    todoLi.innerText = todoInput.value;
    
    //actually place the <li> inside of the new div
    todoDiv.appendChild(todoLi);
    
    //create checkmark button
    const completedButton = document.createElement('button');
    
    //insert HTML inside of the button element we just created, as opposed to text
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    
    //create trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    
    //finally append the new div to the todo list
    todoList.appendChild(todoDiv);
    
    //clear input box for todo creation
    todoInput.value = "";
}

function deleteCheck(event) {
    //item being clicked on
    const item = event.target;
    
    //check the first item in the target's classList
    if(item.classList[0] === "trash-btn" || item.classList[1] === "fa-trash"){
        //get the parent element of the item
        let todoDiv = item.parentElement;
                
        //make sure we are getting the outer div as the parent, not the button
        if(todoDiv.tagName.toLowerCase() === "button"){
            todoDiv = todoDiv.parentElement;
        }
        
        //add transition effect
        todoDiv.classList.add('fall');
        //callback function for when animation finishes
        todoDiv.addEventListener('transitionend', function(){
            todoDiv.remove();
        });
    }
            
    if(item.classList[0] === "complete-btn" || item.classList[1] === "fa-check"){
        let todoDiv = item.parentElement;
        
        //make sure we are getting the outer div as the parent, not the button
        if(todoDiv.tagName.toLowerCase() === "button"){
            todoDiv = todoDiv.parentElement;
        }
        
        //toggles (on/off) the completed class on that element
        todoDiv.classList.toggle('completed');
       }
}

function filterTodos(event) {
    const todos = todoList.childNodes;
    
    todos.forEach(function(todo){
        //get value of the filter
        switch(event.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains("completed")){
                    todo.style.display = 'flex';
                }
                else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }
                else {
                    todo.style.display = 'none';
                }
                break;
        }
        
    });
}

//save a todo to the backend database
function saveTodo(){


}

//load todos from the backend database
function loadTodos(){
    const Http = new XMLHttpRequest();
    Http.open('GET', url);


    // callback for when we receive response
    Http.onload = () => {
        console.log(Http.responseText);
        responseData = JSON.parse(Http.responseText);
        console.log('Respone data in JSON:');
        console.log(responseData[0]);

        // add each todo in the response to our list
        responseData.forEach(todo => {

            const todoDiv = document.createElement('div');
            todoDiv.classList.add('todo');

            //Create <li> that will be placed inside of the new div
            const todoLi = document.createElement('li');
            todoLi.classList.add('todo-item');

            //place a value inside of the new <li>
            todoLi.innerText = todo['title'];

            //actually place the <li> inside of the new div
            todoDiv.appendChild(todoLi);

            //create checkmark button
            const completedButton = document.createElement('button');

            //insert HTML inside of the button element we just created, as opposed to text
            completedButton.innerHTML = '<i class="fas fa-check"></i>';

            completedButton.classList.add("complete-btn");
            todoDiv.appendChild(completedButton);

            //create trash button
            const trashButton = document.createElement('button');
            trashButton.innerHTML = '<i class="fas fa-trash"></i>';
            trashButton.classList.add("trash-btn");
            todoDiv.appendChild(trashButton);

            //finally append the new div to the todo list
            todoList.appendChild(todoDiv);

            //check to see if it's completed, if so show it as such
            if(todo["completed"]){
                todoDiv.classList.add('completed');
            }
        })
    }

    Http.send();
}

//delete a todo from the backend database
function deleteTodo(){
    
}