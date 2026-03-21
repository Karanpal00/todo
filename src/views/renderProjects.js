export function renderProject (id, name, container) {
    const project = document.createElement('div');
    project.dataset.project = id;
    project.className = 'project';

    project.textContent = name;

    container.appendChild(project);

    return project;
}

