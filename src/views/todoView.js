const Test = {
    title: 'title',
    description: 'description',
}
export function renderTodos (todos = Test) {
    const container = document.getElementById('todo-list');

    todos.forEach(todo => {
        const item = document.createElement('div');
        item.textContent = todo.title;
        console.log(Test);
    
        container.appendChild(item);
    });
}

