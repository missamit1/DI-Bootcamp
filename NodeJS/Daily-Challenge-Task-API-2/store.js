const fs = require('node:fs/promises');
const { randomUUID } = require('node:crypto');
module.exports = file => {
  let queue = Promise.resolve();
  async function read() {
    const users = JSON.parse(await fs.readFile(file, 'utf8'));
    if (!Array.isArray(users) || users.some(u => !u || typeof u.id !== 'string' || typeof u.username !== 'string' || typeof u.password !== 'string')) throw new Error('Invalid users file');
    return users;
  }
  function change(operation) {
    const result = queue.then(async () => {
      const users = await read();
      const value = await operation(users);
      const temp = file + '.' + randomUUID() + '.tmp';
      try {
        await fs.writeFile(temp, JSON.stringify(users, null, 2) + '\n', { flag: 'wx' });
        await fs.rename(temp, file);
      } finally { await fs.unlink(temp).catch(() => {}); }
      return value;
    });
    queue = result.catch(() => {});
    return result;
  }
  return { read, change };
};
