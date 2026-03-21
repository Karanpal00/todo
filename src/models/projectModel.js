class Project {
    constructor (name) {
        this.name = name;
        this.todos = [];
    }
}

const projects = new Map();

export function createProject (name = "Add a title") {
    const project = new Project(name);
    const id = crypto.randomUUID();

    projects.set(id, project);

    return id;
}

export function editProject (projectId, name) {
    const project = projects.get(projectId);
    
    if (!project) return null;
    project.name = name;
    projects.set(projectId, project);

    return projectId;
}

export function deleteProject (projectId) {
    if (!projects.has(projectId)) return null;
    projects.delete(projectId);
    return null;
}

export function getAllProjects () {
    return projects;
}