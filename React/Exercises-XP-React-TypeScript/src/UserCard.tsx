interface UserCardProps { name?: string; age?: number; role?: string }
export default function UserCard({ name = 'Guest', age = 0, role = 'Visitor' }: UserCardProps) {
  return <article className="user-card"><h3>{name}</h3><p>Age: {age}</p><p>Role: {role}</p></article>;
}
