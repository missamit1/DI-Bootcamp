import { TodoList } from "./todo.js";

const todoList = new TodoList();
const firstTask = todoList.addTask("Learn Node.js modules");
todoList.addTask("Practice file operations");
todoList.addTask("Finish the exercises");
todoList.completeTask(firstTask);
console.log(todoList.listTasks());
