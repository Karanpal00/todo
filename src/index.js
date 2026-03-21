import "./styles.css";
// index.js
import { 
    addTodoToProject, 
    editTodoFromProject, 
    deleteTodoFromProject,
    createProjectInModel,
    editProjectInModel,
    deleteProjectInModel
} from './controllers/appController.js';

import { getAllProjects } from './models/projectModel.js';
import { getAllTodos } from './models/todoModel.js';

// expose to browser console for testing
window.addTodoToProject = addTodoToProject;
window.editTodoFromProject = editTodoFromProject;
window.deleteTodoFromProject = deleteTodoFromProject;
window.createProjectInModel = createProjectInModel;
window.editProjectInModel = editProjectInModel;
window.deleteProjectInModel = deleteProjectInModel;
window.getAllProjects = getAllProjects;
window.getAllTodos = getAllTodos;