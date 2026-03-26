export function renderProject (id, name, container) {
    const project = document.createElement('div');
    const selectBtn = document.createElement('button');
    const addTodoBtn = document.createElement('button');
    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    selectBtn.className = 'project-select-btn';
    selectBtn.textContent = name;

    addTodoBtn.className = 'add-todo-btn';
    addTodoBtn.textContent = 'Add todo';

    editBtn.className = 'edit-project-btn';
    editBtn.textContent = 'Edit';

    deleteBtn.className = 'delete-project-btn';
    deleteBtn.textContent = 'Delete';

    const actionContainer = document.createElement('div');
    actionContainer.className = 'project-actions';
    actionContainer.appendChild(addTodoBtn);
    actionContainer.appendChild(editBtn);
    actionContainer.appendChild(deleteBtn);

    project.dataset.project = id;
    project.className = 'project-card';
    project.appendChild(selectBtn);
    project.appendChild(actionContainer);

    container.appendChild(project);

    return project;
}

export function renderProjectInput(container, data = {}, mode = 'create') {
    const cardContainer = document.createElement('div');
    cardContainer.className = 'project-input-container';
    cardContainer.dataset.mode = mode;
    if (data.projectId) cardContainer.dataset.project = data.projectId;

    const fieldConainer = document.createElement('div');
    fieldConainer.className = 'field-container';
    const label = document.createElement('label');
    label.textContent = 'Title';

    const inputField = document.createElement('input');
    inputField.className = 'project-title-input';
    inputField.value = data.name ?? '';

    const confirmBtn = document.createElement('button');
    confirmBtn.className = 'confirm-btn';
    confirmBtn.textContent = mode === 'edit' ? 'Save' : 'Confirm';

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'cancel-btn';
    cancelBtn.textContent = 'Cancel';

    const btnContainer = document.createElement('div');
    btnContainer.className = 'input-actions';
    btnContainer.appendChild(confirmBtn);
    btnContainer.appendChild(cancelBtn);

    fieldConainer.appendChild(label);
    fieldConainer.appendChild(inputField);
    inputField.focus();
    cardContainer.appendChild(fieldConainer);
    cardContainer.appendChild(btnContainer);

    container.appendChild(cardContainer);

    return fieldConainer;
}

