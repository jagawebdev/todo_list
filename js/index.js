/*global $*/

var todoList = {
    todos: [],
   
    addTodo: function(todoText){
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },
    
    changeTodo: function(index,todoText){
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
        todoList.changeTodo(index,todoText);
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
            todoLi.setAttribute("class", 'todoLi');
            var todoTextWithCompletion = "";
            
            if(todo.completed === true){
                todoTextWithCompletion = todo.todoText;
                todoLi.style.textDecoration = 'line-through';
                todoLi.style.color = '#c0c1c1';
            }else{
                todoTextWithCompletion = todo.todoText;
            } 
            
            todoLi.id = index;
            todoLi.textContent = todoTextWithCompletion;
            todoLi.appendChild(view.createToggleButton());
            todoLi.appendChild(view.createDeleteButton());
            todoLi.appendChild(view.createEditButton());
            todosUl.appendChild(todoLi);
        });
        
        
    },

    createDeleteButton: function(){
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "";
        deleteButton.className = "ion-close-round";
        return deleteButton;
    },
    
    createToggleButton: function(){
        var toggleButton = document.createElement("button");
        toggleButton.textContent = "";
        toggleButton.className = "ion-android-done";
        return toggleButton;
    },
    
    createChangeButton: function(){
        var changeButton = document.createElement("button");
        changeButton.textContent = "Done";
        changeButton.className = "changeButton";
        return changeButton;
    },
    
    createEditButton: function(){
        var editButton = document.createElement("button");
        editButton.textContent = "";
        editButton.className = "ion-edit";
        return editButton;
    },
    
    setUpEventListeners: function(){
        var todosUl = document.getElementById("todoUl");
        var editInput;
        var parentContent;
        todosUl.addEventListener("click", function(event) {
            //Get the element that was clicked on.
            var elementClicked = event.target;
            // Check if element clicked is a delete button
            if (elementClicked.className === "ion-close-round"){
                //Run handleres.deleteTodo(index).
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
            // Check if element clicked is a toggle button
            }else if(elementClicked.className === "ion-android-done"){
                //Run handlers.toggleCompleted(index);
                handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
            }else if(elementClicked.className === "ion-edit"){
                var parentLi = elementClicked.parentNode;
                
                parentContent = parentLi.textContent;
                
                parentLi.textContent = '';
                editInput = document.createElement("input");
                editInput.setAttribute("value", parentContent);
                editInput.setAttribute("id", "editTodoTextInput")
                parentLi.appendChild(editInput);
                parentLi.appendChild(view.createChangeButton());
            }else if(elementClicked.className === "changeButton"){
                //Run handlers.changeTodo(index, newValue);
                handlers.changeTodo(parseInt(elementClicked.parentNode.id), editInput.value);
            }
        });
    }
};

view.setUpEventListeners();

$(document).ready(function(){
    $('#addTodoTextInput').keypress(function(e){
        if(e.which == 13){
            $(this).blur();  
            $(".addButton").css("opacity", "0");
            handlers.addTodo();
        }
    });
    
    $("#addTodoTextInput").click(function(event){
        event.stopPropagation();
        $(".addButton").css("opacity", "1");
    });
    $(document).click( function(){
        $(".addButton").css("opacity", "0");
    });
    
    $('.checkAllButton').click(function(){
        $(this).find('span').toggleClass('ion-android-radio-button-off ion-android-checkmark-circle');
    });
    
    
    
    
    $("ul, button").click(function(){
        var notDone = 0;
            todoList.todos.forEach(function(todo){
                if(todo.completed === false){
                     notDone++;
                }
            });
            //return done;
            $(".numberUpdate").text(notDone);
    });
});