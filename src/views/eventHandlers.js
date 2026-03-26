import {
    createProjectModel,
    editProjectModel,
    addTodoToProject,
    deleteProjectModel,
    deleteTodoFromProject,
    editTodoFromProject,
    getProjectsModel,
    getTodosByProject,
    getTodoById,
    getProjectById,
    persistData,
    hydrateData,
} from '../controllers/appController.js';
import { renderProject, renderProjectInput } from './renderProjects.js';
import { renderTodo, renderTodoInput } from './renderTodos.js';

const projectContainer = document.getElementById('project-list');
const todoContainer = document.getElementById('todo-container');
const addProjectBtn = document.getElementById('add-project');
let activeProjectId = null;
let todoInputState = null;

export function init() {
    const hasData = hydrateData();

    if (!hasData) {
        const {id} = createProjectModel();
        addTodoToProject(id);
        activeProjectId = id;
        persistData();
    } else {
        const projects = getProjectsModel();
        activeProjectId = [...projects.keys()][0] ?? null;
    }

    renderProjects();
    renderTodosForActiveProject();
}

function handleAddProject() {
    if (projectContainer.querySelector('.project-input-container')) return;
    renderProjectInput(projectContainer);
}

function resetProjectInput() {
    const container = projectContainer.querySelector('.project-input-container');
    if (!container) return;
    container.remove();
}

function addProject() {
    const inputContainer = projectContainer.querySelector('.project-input-container');
    const inputField = projectContainer.querySelector('.project-title-input');
    if (!inputField || !inputContainer) return null;

    const name = inputField.value.trim();
    if (!name) {
        inputField.focus();
        return null;
    }

    if (inputContainer.dataset.mode === 'edit') {
        const projectId = inputContainer.dataset.project;
        if (!projectId) return null;

        const edited = editProjectModel(projectId, name);
        if (!edited) return null;
        activeProjectId = projectId;
    } else {
        const {id} = createProjectModel(name);
        activeProjectId = id;
    }

    persistData();

    resetProjectInput();
    renderProjects();
    renderTodosForActiveProject();

    return null;
}

function handleAddTodo (projectId) {
    if (!projectId) return;

    activeProjectId = projectId;
    todoInputState = {
        mode: 'create',
        projectId,
    };

    renderProjects();
    renderTodosForActiveProject();
}

function renderProjects() {
    const projects = getProjectsModel();
    projectContainer.textContent = '';

    projects.forEach((project, id) => {
        const projectNode = renderProject(id, project.name, projectContainer);
        if (id === activeProjectId) projectNode.classList.add('active');
    });

    if (!projects.size) {
        activeProjectId = null;
        todoContainer.textContent = '';
    }
}

function renderTodosForActiveProject() {
    todoContainer.textContent = '';

    if (!activeProjectId) {
        renderEmptyState('Create a project to start adding todos.');
        return;
    }

    if (todoInputState && todoInputState.projectId === activeProjectId) {
        if (todoInputState.mode === 'edit') {
            const todo = getTodoById(todoInputState.todoId);
            if (todo) {
                renderTodoInput(todoContainer, {
                    projectId: activeProjectId,
                    todoId: todoInputState.todoId,
                    title: todo.title,
                    description: todo.description,
                    dueDate: todo.dueDate,
                    priority: todo.priority,
                }, 'edit');
            }
        } else {
            renderTodoInput(todoContainer, {
                projectId: activeProjectId,
            });
        }
    }

    const todos = getTodosByProject(activeProjectId);
    if (!todos.length) {
        renderEmptyState('No todos yet. Use Add todo to create one.');
        return;
    }

    todos.forEach(({todoId, todo}) => {
        renderTodo(activeProjectId, todoId, todo, todoContainer);
    });
}

function renderEmptyState(text) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = text;
    todoContainer.appendChild(empty);
}

function resetTodoInput() {
    todoInputState = null;
    renderTodosForActiveProject();
}

function getTodoFormData(form) {
    const data = new FormData(form);
    return {
        title: String(data.get('title') ?? '').trim(),
        description: String(data.get('description') ?? '').trim(),
        dueDate: String(data.get('dueDate') ?? ''),
        priority: String(data.get('priority') ?? '1'),
    };
}

function saveTodo(e) {
    const inputCard = e.target.closest('.todo-card-input');
    if (!inputCard) return;

    const form = inputCard.querySelector('form');
    if (!form) return;

    const formData = getTodoFormData(form);

    if (!formData.title || !formData.description) return;

    if (inputCard.dataset.mode === 'edit') {
        const todoId = inputCard.dataset.todo;
        if (!todoId) return;
        editTodoFromProject(todoId, formData);
    } else {
        const projectId = inputCard.dataset.project;
        if (!projectId) return;
        addTodoToProject(projectId, formData);
    }

    todoInputState = null;
    persistData();
    renderTodosForActiveProject();
}

function handleSidebarClick(e) {
    if (e.target.closest('.confirm-btn')) {
        addProject();
        return;
    }

    if (e.target.closest('.cancel-btn')) {
        resetProjectInput();
        return;
    }

    const card = e.target.closest('.project-card');
    if (!card) return;

    const projectId = card.dataset.project;
    if (!projectId) return;

    if (e.target.closest('.delete-project-btn')) {
        deleteProjectModel(projectId);
        const projects = getProjectsModel();
        const ids = [...projects.keys()];
        activeProjectId = ids[0] ?? null;
        todoInputState = null;
        persistData();
        renderProjects();
        renderTodosForActiveProject();
        return;
    }

    if (e.target.closest('.edit-project-btn')) {
        resetProjectInput();
        const project = getProjectById(projectId);
        if (!project) return;
        renderProjectInput(projectContainer, {
            projectId,
            name: project.name,
        }, 'edit');
        return;
    }

    if (e.target.closest('.add-todo-btn')) {
        handleAddTodo(projectId);
        return;
    }

    activeProjectId = projectId;
    todoInputState = null;
    renderProjects();
    renderTodosForActiveProject();
}

function handleTodoClick(e) {
    if (e.target.closest('.cancel-todo-btn')) {
        resetTodoInput();
        return;
    }

    if (e.target.closest('.confirm-todo-btn')) {
        saveTodo(e);
        return;
    }

    const todoCard = e.target.closest('.todo-card');
    if (!todoCard) return;
    const todoId = todoCard.dataset.todo;
    if (!todoId) return;

    if (e.target.closest('.delete-todo-btn')) {
        deleteTodoFromProject(activeProjectId, todoId);
        todoInputState = null;
        persistData();
        renderTodosForActiveProject();
        return;
    }

    if (e.target.closest('.edit-todo-btn')) {
        todoInputState = {
            mode: 'edit',
            projectId: activeProjectId,
            todoId,
        };
        renderTodosForActiveProject();
    }
}

function handleTodoChange(e) {
    if (!e.target.matches('.toggle-done-btn')) return;

    const todoCard = e.target.closest('.todo-card');
    if (!todoCard) return;

    const todoId = todoCard.dataset.todo;
    if (!todoId) return;

    editTodoFromProject(todoId, { done: e.target.checked });
    persistData();
    renderTodosForActiveProject();
}

addProjectBtn.addEventListener('click', handleAddProject);
projectContainer.addEventListener('click', handleSidebarClick);
todoContainer.addEventListener('click', handleTodoClick);
todoContainer.addEventListener('change', handleTodoChange);
