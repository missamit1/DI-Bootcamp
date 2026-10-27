export class TodoList {
  constructor() {
    this.tasks = [];
    this.nextId = 1;
  }

  addTask(title) {
    const task = { id: this.nextId++, title, completed: false };
    this.tasks.push(task);
    return task.id;
  }

  completeTask(id) {
    const task = this.tasks.find(task => task.id === id);
    if (!task) return false;
    task.completed = true;
    return true;
  }

  listTasks() {
    return this.tasks.map(task => ({ ...task }));
  }
}
