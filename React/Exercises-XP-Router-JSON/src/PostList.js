import posts from './data/posts.json';
export default function PostList() {
  return <>{posts.map(post => (
    <article key={post.id} className="mb-3">
      <h3>{post.title}</h3><p>{post.content}</p>
    </article>
  ))}</>;
}
