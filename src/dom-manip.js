import { Project } from "./projects.js";

class DOM {
    static updateProjects() {
        const projects = document.querySelector("#projects ul");
        while(projects.firstChild){
            projects.removeChild(projects.lastChild);
        }

        Project.projectList.forEach((project) => {
            const listItem = document.createElement("li");
            listItem.id = project.id;
            listItem.textContent = project.name;
            projects.appendChild(listItem);
        });
    }

    static selectProject(project = Project.projectList[0]) {
        const main = document.querySelector("main");
        const card = document.querySelector(".card");
        while(main.firstChild){
            main.removeChild(main.lastChild);
        }

        project.todos.forEach((todo) => {
            card.id = project.todos[0].id;
            const newCard = card.cloneNode(true);
            newCard.querySelector("h3").textContent = todo.title;
            newCard.querySelector("p").textContent = todo.description;
            newCard.querySelector("h5").textContent = todo.dueDate;
            newCard.querySelector("#toggle-complete").classList = [todo.isComplete];
            if(todo.isComplete) {
                newCard.querySelector("#toggle-complete").textContent = "✓";
            } else {
                newCard.querySelector("#toggle-complete").textContent = "X";
            }
            let priority = "!";
            switch(todo.priority) {
                case "Low":
                    priority = "!";
                    newCard.querySelector("#priority").classList = ["low"];
                    break;
                case "Medium":
                    priority = "!!";
                    newCard.querySelector("#priority").classList = ["medium"];
                    break;
                case "High":
                    priority = "!!!";
                    newCard.querySelector("#priority").classList = ["high"];
                    break;
                default:
                    priority = "!";
                    break;
            }
            newCard.querySelector("#priority").textContent = priority;
            newCard.id = todo.id;
            main.appendChild(newCard);
        });
    }

    static openProjectName() {
        const dialog = document.querySelector("#project-name");
        dialog.showModal();
    }

    static closeProjectName() {
        const dialog = document.querySelector("#project-name");
        dialog.close();
    }

    static openTodoInput() {
        const dialog = document.querySelector("#todo-input");
        dialog.showModal();
    }

    static closeTodoInput() {
        const dialog = document.querySelector("#todo-input");
        dialog.close();
    }
}

export { DOM }