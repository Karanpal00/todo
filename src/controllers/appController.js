import { createTodo, editTodo, deleteTodo, getAllTodos } from '../models/todoModel.js';
import { 
    createProject, 
    editProject, 
    deleteProject, 
    getAllProjects 
} from '../models/projectModel.js'
import { saveAppData, loadAppData } from '../services/storageService.js';

const defaultData = {
    title : "Add a title", 
    description : "Write a description", 
    dueDate : "", 
    priority : "1",
    done: false,
};

export function addTodoToProject(projectId, data = defaultData) {
    const {id: todoId, todo} = createTodo(data.title, data.description, data.dueDate, data.priority);

    const projects = getAllProjects();

    const project = projects.get(projectId);

    if (!project) return null;

    project.todos.push(todoId);

    return {todoId, todo};
}

export function editTodoFromProject (todoId, changes) {
    const edited = editTodo(todoId, changes);
    if (!edited) return null;

    const {todoId: id, todo} = edited;
    return {id, todo};
}

export function deleteTodoFromProject (projectId, todoId) {
    const projects = getAllProjects();

    const project = projects.get(projectId);

    if (!project) return null;

    const index = project.todos.indexOf(todoId);

    if (index === -1) return null;

    project.todos.splice(index, 1);

    deleteTodo(todoId);
    
    return null;
}

export function createProjectModel (name = "Add title") {
    const {id, project} = createProject(name);
    return {id, project};
}

export function editProjectModel (projectId, name) {
    const edited = editProject(projectId, name);
    if (!edited) return null;

    const {projectId: id, project} = edited;
    return {id, project};
}

export function deleteProjectModel (projectId) {
    const projects = getAllProjects();

    const project = projects.get(projectId);
    if (!project) return null;

    project.todos.forEach(todoId => {
        deleteTodo(todoId);
    });

    deleteProject(projectId);

    return null;
}

export function getProjectsModel () {
    return getAllProjects();
}

export function getTodosModel () {
    return getAllTodos();
}

export function getProjectById (projectId) {
    return getAllProjects().get(projectId) ?? null;
}

export function getTodoById (todoId) {
    return getAllTodos().get(todoId) ?? null;
}

export function getTodosByProject (projectId) {
    const project = getProjectById(projectId);
    if (!project) return [];

    const todos = getAllTodos();
    return project.todos
        .map(todoId => ({ todoId, todo: todos.get(todoId) }))
        .filter(({ todo }) => Boolean(todo));
}

export function persistData () {
    saveAppData(getAllProjects(), getAllTodos());
}

export function hydrateData () {
    const data = loadAppData();
    if (!data) return false;

    const projects = getAllProjects();
    const todos = getAllTodos();

    projects.clear();
    todos.clear();

    data.todos.forEach(([id, todo]) => {
        if (!id || !todo || typeof todo !== 'object') return;
        todos.set(id, {
            title: todo.title ?? 'Add a title',
            description: todo.description ?? 'Write a description',
            dueDate: todo.dueDate ?? '',
            priority: todo.priority ?? '1',
            createDate: todo.createDate ?? '',
            done: Boolean(todo.done),
        });
    });

    data.projects.forEach(([id, project]) => {
        if (!id || !project || typeof project !== 'object') return;
        const todoIds = Array.isArray(project.todos)
            ? project.todos.filter(todoId => todos.has(todoId))
            : [];

        projects.set(id, {
            name: project.name ?? 'Add title',
            todos: todoIds,
        });
    });

    return projects.size > 0;
}