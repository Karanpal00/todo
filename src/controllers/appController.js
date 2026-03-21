import { createTodo, editTodo, deleteTodo, getAllTodos } from '../models/todoModel.js';
import { 
    createProject, 
    editProject, 
    deleteProject, 
    getAllProjects 
} from '../models/projectModel.js'

export function addTodoToProject(projectId, data) {
    const id = createTodo(data.title, data.description, data.dueDate, data.priority);
    const projects = getAllProjects();

    const project = projects.get(projectId);

    if (!project) return null;
    
    project.todos.push(id);

    return id;
}

export function editTodoFromProject (todoId, changes) {
    const id = editTodo(todoId, changes);
    if (!id) return null;

    return id;
}

export function deleteTodoFromProject (projectId, todoId) {
    const projects = getAllProjects();

    const project = projects.get(projectId);

    if (!project) return null;

    const index = project.todos.indexOf(todoId);

    if (index === -1) return null;

    project.todos.splice(index, 1);

    deleteTodo(todoId);
    
    return 0;
}

export function createProjectInModel (name) {
    let id = createProject(name);

    return id;
}

export function editProjectInModel (projectId, name) {
    let id = editProject(projectId, name);

    return id;
}

export function deleteProjectInModel (projectId) {
    const projects = getAllProjects();

    const project = projects.get(projectId);
    if (!project) return null;

    project.todos.forEach(todoId => {
        deleteTodo(todoId);
    });

    deleteProject(projectId);

    return 0;
} 