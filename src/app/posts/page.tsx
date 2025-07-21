import Link from 'next/link';
import styles from './posts.module.css';

// This would typically come from a CMS or file system
const posts = [
  {
    id: 'hello-world',
    title: 'Hello World',
    excerpt: 'Welcome to my first blog post!',
    date: '2024-01-15',
    slug: 'hello-world'
  },
  {
    id: 'getting-started',
    title: 'Getting Started with Next.js',
    excerpt: 'Learn how to build modern web applications with Next.js.',
    date: '2024-01-20',
    slug: 'getting-started'
  }
];

export default function PostsPage() {
  return (
    <div className={styles.container}>
      <h1>Blog Posts</h1>
      <div className={styles.posts}>
        {posts.map((post) => (
          <article key={post.id} className={styles.post}>
            <h2>
              <Link href={`/posts/${post.slug}`}>
                {post.title}
              </Link>
            </h2>
            <p className={styles.excerpt}>{post.excerpt}</p>
            <time className={styles.date}>{post.date}</time>
          </article>
        ))}
      </div>
    </div>
  );
} 