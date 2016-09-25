/*global $*/

var todoList = {
    todos: [],
   
    addTodo: function(todoText){
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },
    
    changeTodo: function(index, todoText){
        this.todos[index].todoText = todoText;
    },
    
    toggleCompleted: function(index){
        var todo = this.todos[index];
        todo.completed = !todo.completed;
    },
    
    deleteTodo: function(index){
        this.todos.splice(index, 1);
    },
    
    toggleAll: function(){
         var totalTodos = this.todos.length;
         var completedTodos = 0;

        //Get number of completed todos
        this.todos.forEach(function(todo){
            if(todo.completed === true){
                 completedTodos++;
            }
        });
        
        // Case 1: If evertyhing's true, make everything false
        if(completedTodos === totalTodos){
            this.todos.forEach(function(todo) {
                todo.completed = false;
            });
        //Case2: Otherwise, make everything true
        }else{
            this.todos.forEach(function(todo){
               todo.completed = true; 
            });
        }
     }
};

var handlers = {
    addTodo: function(){
        var addTodoTextInput = document.getElementById("addTodoTextInput");
        todoList.addTodo(addTodoTextInput.value);
        addTodoTextInput.value = '';
        view.displayTodos();
    },
    
    changeTodo: function(index, todoText){
        todoList.changeTodo(index, todoText);
        view.displayTodos();
    },
    
    toggleCompleted: function(index){
        todoList.toggleCompleted(index);
        view.displayTodos();
    },
    
    deleteTodo: function(index){ 
        todoList.deleteTodo(index);
        view.displayTodos();
    },
    
    toggleAll: function() {
       todoList.toggleAll(); 
       view.displayTodos();
    }
};

var view = {
    displayTodos: function(){
        var todosUl = document.getElementById("todoUl");
        todosUl.innerHTML = '';
        
        todoList.todos.forEach(function(todo, index){
            var todoLi = document.createElement("li");
            var todoTextWithCompletion = "";
            
            if(todo.completed === true){
                todoTextWithCompletion = "(x) " + todo.todoText;
            }else{
                    todoTextWithCompletion = "( ) " + todo.todoText;
            } 
            
            todoLi.id = index;
            todoLi.textContent = todoTextWithCompletion;
            todoLi.appendChild(view.createToggleButton());
            todoLi.appendChild(view.createChangeButton());
            todoLi.appendChild(view.createDeleteButton());
            todosUl.appendChild(todoLi);
        });
        
        
    },
    
    createDeleteButton: function(){
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "deleteButton";
        return deleteButton;
    },
    
    createToggleButton: function(){
        var toggleButton = document.createElement("button");
        toggleButton.textContent = "Toggle";
        toggleButton.className = "toggleButton";
        return toggleButton;
    },
    
    createChangeButton: function(){
        var changeButton = document.createElement("button");
        changeButton.textContent = "Edit";
        changeButton.className = "changeButton";
        return changeButton;
    },
    
    createDoneButton: function(){
        var doneButton = document.createElement("button");
        doneButton.textContent = "Done";
        doneButton.className = "doneButton";
        return doneButton;
    },
    
    setUpEventListeners: function(){
        var todosUl = document.getElementById("todoUl");
        todosUl.addEventListener("click", function(event) {
            //Get the element that was clicked on.
            var elementClicked = event.target;
            // Check if element clicked is a delete button
            if (elementClicked.className === "deleteButton"){
                //Run handleres.deleteTodo(index).
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
            // Check if element clicked is a toggle button
            }else if(elementClicked.className === "toggleButton"){
                //Run handlers.toggleCompleted(index);
                handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
            }else if(elementClicked.className === "changeButton"){
                var parentLi = elementClicked.parentNode;
                
                var parentContent = parentLi.textContent;
                console.log(parentContent);
                
                parentLi.textContent = '';
                var editInput = document.createElement("input");
                editInput.setAttribute("value", parentContent);
                //parentLi.appendChild(view.createInput(parentContent));
                parentLi.appendChild(editInput);
                parentLi.appendChild(view.createDoneButton());
            }
        });
    }
};

view.setUpEventListeners();

$(document).ready(function(){
    $('#addTodoTextInput').keypress(function(e){
        if(e.which == 13){
            $(this).blur();  
            handlers.addTodo();
        }
    });
});