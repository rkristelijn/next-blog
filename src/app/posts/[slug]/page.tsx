import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import styles from './post.module.css';

// This would typically come from a CMS or file system
const posts = {
  'hello-world': {
    title: 'Hello World',
    content: `# Hello World

Welcome to my first blog post! This is a simple introduction to my blog.

## What to expect

I'll be writing about:
- Web development
- Next.js tips and tricks
- Personal projects
- And much more!

Stay tuned for more content!`,
    date: '2024-01-15',
    excerpt: 'Welcome to my first blog post!'
  },
  'getting-started': {
    title: 'Getting Started with Next.js',
    content: `# Getting Started with Next.js

Next.js is a powerful React framework that makes building full-stack web applications simple and efficient.

## Why Next.js?

- **Server-side rendering** for better SEO
- **File-based routing** for intuitive navigation
- **API routes** for backend functionality
- **Built-in optimizations** for performance

## Getting Started

1. Create a new project: \`npx create-next-app@latest\`
2. Navigate to your project: \`cd your-project\`
3. Start the development server: \`npm run dev\`

That's it! You're ready to build amazing web applications.`,
    date: '2024-01-20',
    excerpt: 'Learn how to build modern web applications with Next.js.'
  }
};

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = posts[slug as keyof typeof posts];

  if (!post) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <article className={styles.post}>
        <header className={styles.header}>
          <h1>{post.title}</h1>
          <time className={styles.date}>{post.date}</time>
        </header>
        <div className={styles.content}>
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
} 