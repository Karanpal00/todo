const STORAGE_KEY = 'todo-app-data';

function safeParse (value) {
    try {
        return JSON.parse(value);
    } catch {
        return null;
    }
}

function mapToEntries (map) {
    return [...map.entries()];
}

export function saveAppData (projects, todos) {
    const payload = {
        projects: mapToEntries(projects),
        todos: mapToEntries(todos),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function loadAppData () {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = safeParse(raw);
    if (!parsed) return null;

    return {
        projects: Array.isArray(parsed.projects) ? parsed.projects : [],
        todos: Array.isArray(parsed.todos) ? parsed.todos : [],
    };
}
