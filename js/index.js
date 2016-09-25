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
        var changeTodoPositionInput = document.getElementById("changeTodoPositionInput");
        var changeTodoTextInput = document.getElementById("changeTodoTextInput");
        todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
        changeTodoPositionInput.value = '';    
        changeTodoTextInput.value = "";
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
            
            todoLi.id = index; //todoLi.setAttribute('id', i);
            todoLi.textContent = todoTextWithCompletion;
            todoLi.appendChild(view.createToggleButton());
            todoLi.appendChild(view.createDeleteButton());
            todosUl.appendChild(todoLi);
        });
    },
    
    createDeleteButton: function(){
        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.className = "deleteButton";
        return deleteButton;
    },
    
    createToggleButton: function(){
        var toggleButton = document.createElement("button");
        toggleButton.innerHTML = "toggle";
        toggleButton.className = "toggleButton";
        return toggleButton;
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
            // Check if element clicked is a change button
            }else if(elementClicked.className === "toggleButton"){
                //Run handlers.toggleCompleted(index);
                handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
            }
        });
    }
};

view.setUpEventListeners();