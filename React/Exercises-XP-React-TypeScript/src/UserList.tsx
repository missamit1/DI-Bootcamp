import { useEffect, useState } from 'react';
export interface User { id: number; name: string; username: string; email: string }
function isUser(value: unknown): value is User {
  return typeof value === 'object' && value !== null &&
    'id' in value && typeof value.id === 'number' &&
    'name' in value && typeof value.name === 'string' &&
    'username' in value && typeof value.username === 'string' &&
    'email' in value && typeof value.email === 'string';
}
export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    async function loadUsers(): Promise<void> {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users', { signal: controller.signal });
        if (!response.ok) throw new Error(`Unable to load users (${response.status}).`);
        const data: unknown = await response.json();
        if (!Array.isArray(data) || !data.every(isUser)) throw new Error('Unexpected user data.');
        if (!controller.signal.aborted) setUsers(data);
      } catch (error: unknown) {
        if (!controller.signal.aborted) setError(error instanceof Error ? error.message : 'Unable to load users.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void loadUsers();
    return () => controller.abort();
  }, []);
  if (loading) return <p role="status">Loading users…</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!users.length) return <p>No users found.</p>;
  return <ul className="users">{users.map(user => <li key={user.id}><strong>{user.name}</strong> (@{user.username}) — {user.email}</li>)}</ul>;
}
