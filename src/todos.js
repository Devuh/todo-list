import { format } from "date-fns";

class Todo {
    constructor(title, description, dueDate, priority, projectId) {
        this.id = self.crypto.randomUUID();
        this.isComplete = false;
        this.title = title;
        this.description = description;
        const date = dueDate.split("/");
        this.dueDate = format(new Date(date[0], date[1] - 1, date[2]), "MM/dd/yyyy");
        const priorities = ["Low", "Medium", "High"];
        this.priority = priorities[priority];
        this.projectId = projectId;
    }

    toggleComplete() {
        this.isComplete = !this.isComplete;
    }
}

export { Todo };