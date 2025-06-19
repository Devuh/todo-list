import { Todo } from "./todos.js";

class Project {
    static projectList = [];

    constructor(name = "Project") {
        this.id = self.crypto.randomUUID();
        this.name = name
        this.todos = new Array;
        Project.projectList.push(this);
    }

    addTodo(title, description, dueDate, priority) {
        this.todos.push(new Todo(title, description, dueDate, priority, this.id));
    }

    deleteTodo(selectedTodo) {
        this.todos = this.todos.filter((todo) => todo !== selectedTodo);
    }
}

export { Project };