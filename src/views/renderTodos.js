const priority = ['high', 'medium', 'low'];

function getPriorityLabel (value) {
    const normalized = Number.parseInt(value, 10);
    if (Number.isNaN(normalized) || normalized < 0 || normalized > 2) return priority[1];
    return priority[normalized];
}

export function renderTodo (projectId, todoId, data, container) {
    const todo = document.createElement('div');
    todo.dataset.project = projectId;
    todo.dataset.todo = todoId;
    todo.className = 'todo-card';
    if (data.done) todo.classList.add('completed');

    const title = document.createElement('h3');
    title.className = 'todo-title';
    title.textContent = data.title;

    const description = document.createElement('p');
    description.textContent = data.description;

    const dueDate = document.createElement('span');
    dueDate.className = 'todo-date';
    dueDate.textContent = `Due: ${data.dueDate || 'No due date'}`;

    const createDate = document.createElement('span');
    createDate.className = 'todo-date';
    createDate.textContent = `Created: ${data.createDate} |`;

    const priorityTag = document.createElement('span');
    const priorityLabel = getPriorityLabel(data.priority);
    todo.classList.add(`todo-${priorityLabel}`);
    priorityTag.className = `todo-priority ${priorityLabel}`;
    priorityTag.textContent = priorityLabel;

    const metaContainer = document.createElement('div');
    metaContainer.className = 'todo-meta';
    metaContainer.appendChild(createDate);
    metaContainer.appendChild(dueDate);
    metaContainer.appendChild(priorityTag);

    const divContainer = document.createElement('div');
    divContainer.className = 'todo-header';
    divContainer.appendChild(title);
    divContainer.appendChild(metaContainer);

    const footer = document.createElement('div');
    footer.className = 'todo-footer';

    const doneLabel = document.createElement('label');
    doneLabel.className = 'todo-done';
    doneLabel.textContent = 'Done';

    const done = document.createElement('input');
    done.type = 'checkbox';
    done.className = 'toggle-done-btn';
    done.checked = Boolean(data.done);
    doneLabel.appendChild(done);

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-todo-btn';
    editBtn.textContent = 'Edit';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-todo-btn';
    deleteBtn.textContent = 'Delete';

    footer.appendChild(doneLabel);
    footer.appendChild(editBtn);
    footer.appendChild(deleteBtn);

    todo.appendChild(divContainer);
    todo.appendChild(description);
    todo.appendChild(footer);

    container.appendChild(todo);
    
    return todo;
}

export function renderTodoInput (container, data = {}, mode = 'create') {
    const todo = document.createElement('div');
    todo.className = 'todo-card-input';
    todo.dataset.mode = mode;
    if (data.todoId) todo.dataset.todo = data.todoId;
    if (data.projectId) todo.dataset.project = data.projectId;

    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Title';

    const title = document.createElement('input');
    title.name = 'title';
    title.required = true;
    title.value = data.title ?? '';

    titleLabel.appendChild(title);

    const descriptionLabel = document.createElement('label');
    descriptionLabel.textContent = 'Description';

    const description = document.createElement('input');
    description.name = 'description';
    description.required = true;
    description.value = data.description ?? '';

    descriptionLabel.appendChild(description);

    const dueDateLabel = document.createElement('label');
    dueDateLabel.textContent = 'Due date';

    const dueDate = document.createElement('input');
    dueDate.name = 'dueDate';
    dueDate.type = 'date';
    dueDate.value = data.dueDate ?? '';

    dueDateLabel.appendChild(dueDate);

    const priorityLabel = document.createElement('label');
    priorityLabel.textContent = 'Priority';

    const priority = document.createElement('select');
    priority.name = 'priority';

    const high = document.createElement('option');
    high.value = '0';
    high.textContent = 'High';

    const medium = document.createElement('option');
    medium.value = '1';
    medium.textContent = 'Medium';

    const low = document.createElement('option');
    low.value = '2';
    low.textContent = 'Low';

    priority.appendChild(high);
    priority.appendChild(medium);
    priority.appendChild(low);
    priority.value = data.priority ?? '1';

    priorityLabel.appendChild(priority);

    const confirmBtn = document.createElement('button');
    confirmBtn.className = 'confirm-todo-btn';
    confirmBtn.type = 'button';
    confirmBtn.textContent = mode === 'edit' ? 'Save' : 'Confirm';

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'cancel-todo-btn';
    cancelBtn.type = 'button';
    cancelBtn.textContent = 'Cancel';

    const btnContainer = document.createElement('div');
    btnContainer.className = 'input-actions';
    btnContainer.appendChild(confirmBtn);
    btnContainer.appendChild(cancelBtn);

    const form = document.createElement('form');

    form.appendChild(titleLabel);
    form.appendChild(dueDateLabel);
    form.appendChild(descriptionLabel);
    form.appendChild(priorityLabel);
    form.appendChild(btnContainer);

    todo.appendChild(form);

    container.appendChild(todo);
    title.focus();
    
    return todo;

}