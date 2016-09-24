var todoList = {
    todos: [],
    
    displayTodos: function(){
        for(var i= 0; i<this.todos.length; i++){
         console.log(this.todos[i].todoText);
        }
    },
    
    addTodo: function(todoText){
        this.todos.push({
            todoText: todoText,
            completed: false
        });
        this.displayTodos();
    },
    
    changeTodo: function(index, todoText){
        this.todos[index].todoText = todoText;
        this.displayTodos();
    },
    
    toggleCompleted: function(index){
        var todo = this.todos[index];
        todo.completed = !todo.completed;
        this.displayTodos();
    },
    
    deleteTodo: function(index){
        this.todos.splice(index, 1);
        this.displayTodos();
    }
};