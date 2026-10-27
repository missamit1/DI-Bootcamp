const fs = require('node:fs/promises');
const { randomUUID } = require('node:crypto');

function createStore(filePath) {
  let pending = Promise.resolve();
  async function read() {
    const tasks = JSON.parse(await fs.readFile(filePath, 'utf8'));
    if (!Array.isArray(tasks) || tasks.some(task => !task || typeof task.id !== 'string' || typeof task.title !== 'string' || typeof task.description !== 'string' || typeof task.completed !== 'boolean')) {
      throw new Error('Invalid task file');
    }
    return tasks;
  }
  async function save(tasks) {
    const temporary = filePath + '.' + randomUUID() + '.tmp';
    try {
      await fs.writeFile(temporary, JSON.stringify(tasks, null, 2) + '\n', { flag: 'wx' });
      await fs.rename(temporary, filePath);
    } finally {
      await fs.unlink(temporary).catch(() => {});
    }
  }
  function change(operation) {
    const result = pending.then(async () => {
      const tasks = await read();
      const value = operation(tasks);
      if (value !== null) await save(tasks);
      return value;
    });
    pending = result.catch(() => {});
    return result;
  }
  return {
    all: read,
    create: data => change(tasks => {
      const task = { id: randomUUID(), ...data };
      tasks.push(task);
      return task;
    }),
    update: (id, data) => change(tasks => {
      const task = tasks.find(task => task.id === id);
      if (!task) return null;
      Object.assign(task, data);
      return task;
    }),
    remove: id => change(tasks => {
      const index = tasks.findIndex(task => task.id === id);
      if (index === -1) return null;
      return tasks.splice(index, 1)[0];
    }),
  };
}
module.exports = { createStore };
