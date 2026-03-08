import { format } from "date-fns";

class Todo {
    constructor (title, description, dueDate, priority) {
        Todo.title = title;
        Todo.description = description;
        Todo.dueDate = dueDate;
        Todo.priority = priority;
        Todo.createDate = format(new Date, 'E dd LLL y');
    }
}

const todos = [];
