import "./styles.css";

import { Project } from "./projects.js";
import { DOM } from "./dom-manip.js";

// project1.addTodo("Homework #3", "Complete assignment 3b", "08/23/2025", 1, project1.id);
// project1.addTodo("Take Out Trash", "No recycling today", "07/11/2025", 2, project1.id);
// project1.addTodo("Make Bed", "Just did laundry", "09/02/2025", 0, project1.id);

let projects = JSON.parse(localStorage.getItem("projects"));

console.log(projects);

console.log("Current version");

if (projects) {
    Project.projectList = projects.map((p) => {
        let proj = new Project(p.name);
        proj.id = p.id;
        proj.todos = p.todos.map((t) => {
        let todo = {
            ...t,
            toggleComplete: function () {
                this.isComplete = !this.isComplete;
            }
        };
        return todo;
    });
        return proj;
    });
} else {
    let project1 = new Project("School");
    project1.addTodo("Homework #3", "Complete assignment 3b", "2025/08/03", 1);
    project1.addTodo("Take Out Trash", "No recycling today", "2025/11/16", 2);
    project1.addTodo("Make Bed", "Just did laundry", "2026/09/23", 0);
}

// if(projects) Project.projectList = projects;

DOM.updateProjects();
DOM.selectProject();

// Event Handler

let currentProject = project1;

const body = document.querySelector("body");

body.addEventListener("click", (event) => {
    // Select project
    if(event.target.tagName == "LI") {
        let targetProject;
        Project.projectList.forEach((project) => {
            if(project.id == event.target.id) targetProject = project;
        });
        DOM.selectProject(targetProject);
        currentProject = targetProject;
    }

    // Add new project
    if(event.target.parentNode.id == "add-project") {
        DOM.openProjectName();
    }

    if(event.target.id == "submit-project-name") {
        const newName = document.querySelector("#project-name-input").value;
        if(newName) {
            let newProject = new Project(newName);
            newProject.addTodo("Example Title", "Example Description", "01/01/2000", 0);
            DOM.closeProjectName();
            document.querySelector("#project-name-input").value = "";
            DOM.updateProjects();
            localStorage.setItem("projects", JSON.stringify(Project.projectList));
        } else {
            DOM.closeProjectName();
        }
    }

    // Delete current project
    if(event.target.id == "delete-project") {
        if(Project.projectList.length != 1) {
            Project.projectList = Project.projectList.filter((project) => project.id !== currentProject.id);
            DOM.updateProjects();
            DOM.selectProject();
            currentProject = Project.projectList[0];
            localStorage.setItem("projects", JSON.stringify(Project.projectList));
        }
    }

    // Toggle complete
    if(event.target.id == "toggle-complete") {
        let currentTodo = event.target.parentNode.parentNode;
        let toggledTodo = currentProject.todos.filter((todos) => todos.id == currentTodo.id);
        toggledTodo[0].toggleComplete();
        event.target.classList.toggle("true");
        event.target.classList.contains("true") ? event.target.textContent = "✓" : event.target.textContent = "X";
        localStorage.setItem("projects", JSON.stringify(Project.projectList));
    }

    // Add to-do
    if(event.target.id == "add-todo") {
        DOM.openTodoInput();
    }

    if(event.target.id == "submit-todo") {
        let title = document.querySelector("#todo-title-input").value;
        let description = document.querySelector("#todo-description-input").value;
        let date = document.querySelector("#todo-date-input").value.replaceAll("-", "/");
        let priority = document.querySelector("#todo-priority-input").value;
        if(title && description && date && priority >= 0) {
            currentProject.addTodo(title, description, date, priority);
        }
        DOM.closeTodoInput();
        DOM.selectProject(currentProject);
        document.querySelector("#todo-title-input").value = "";
        document.querySelector("#todo-description-input").value = "";
        document.querySelector("#todo-date-input").value = "";
        document.querySelector("#todo-priority-input").value = "Low";
        localStorage.setItem("projects", JSON.stringify(Project.projectList));
    }

    // Delete to-do
    if(event.target.id == "delete-todo") {
        if(currentProject.todos.length > 1) {
            let deletedTodo = currentProject.todos.filter((todos) => todos.id == event.target.parentNode.id);
            currentProject.deleteTodo(deletedTodo[0]);
            DOM.selectProject(currentProject);
            localStorage.setItem("projects", JSON.stringify(Project.projectList));
        }
    }
});