import { format } from "date-fns";

class Todo {
    constructor (title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.createDate = format(new Date, 'E dd LLL y');
    }
}

const todos = new Map();

export function createTodo (
    title = "Add a title", 
    description = "Write a description", 
    dueDate  = "Enter duedate", 
    priority="default"
) {

    const todo = new Todo(title, description, dueDate, priority);
    const id = crypto.randomUUID();
    todos.set(id ,todo);

    return id;
}

export function editTodo (todoId, changes) {
    const todo = todos.get(todoId);
    
    if(!todo) return null;
    Object.assign(todo, changes);

    todos.set(todoId, todo);

    return todoId;
}

export function deleteTodo (todoId) {
    if(!todos.has(todoId)) return null;
    todos.delete(todoId);
    return null;
}

export function getAllTodos () {
    return todos;
}

