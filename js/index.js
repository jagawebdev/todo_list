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
        
            for(var i = 0; i < totalTodos; i++){
                if(this.todos[i].completed === true){
                     completedTodos++;
                }
            }
               
        if(completedTodos === totalTodos){
            for(var i = 0; i < totalTodos; i++){
                this.todos[i].completed = false;
            }
        }else{
            for(var i = 0; i < totalTodos; i++){
                this.todos[i].completed = true;
            }
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
    
    changeTodo: function(){
        var changeTodoPositionInput = document.getElementById("changeTodoPositionInput");
        var changeTodoTextInput = document.getElementById("changeTodoTextInput");
        todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
        changeTodoPositionInput.value = '';    
        changeTodoTextInput.value = "";
        view.displayTodos();
    },
    
    toggleCompleted: function(){
        var toggleCompletedPositionInput = document.getElementById("toggleCompletedPositionInput");
        todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
        toggleCompletedPositionInput.value = "";
        view.displayTodos();
    },
    
    deleteTodo: function(){
        var deleteTodoPositionInput = document.getElementById("deleteTodoPositionInput");
        todoList.deleteTodo(deleteTodoPositionInput.valueAsNumber);
        deleteTodoPositionInput.value = "";
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
        
        for(var i = 0; i < todoList.todos.length; i++ ){
            var todoLi = document.createElement("li");
            var todoTextWithCompletion = "";
            var todo = todoList.todos[i];
            
            if(todo.completed === true){
                todoTextWithCompletion = "(x) " + todo.todoText;
            }else{
                    todoTextWithCompletion = "( ) " + todo.todoText;
            } 
            
            //todoLi.setAttribute('id', i);
            todoLi.id = i;
            todoLi.textContent = todoTextWithCompletion;
            todoLi.appendChild(this.createDeleteButton());
            todosUl.appendChild(todoLi);
        }
    },
    
    createDeleteButton: function(){
        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.className = "deleteButton";
        return deleteButton;
    }
};
