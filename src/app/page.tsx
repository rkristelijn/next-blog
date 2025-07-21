import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        
        <h1 className={styles.title}>Welcome to My Blog</h1>
        <p className={styles.description}>
          A simple blog built with Next.js and deployed on Cloudflare Workers
        </p>

        <div className={styles.ctas}>
          <Link href="/posts" className={styles.primary}>
            <Image
              className={styles.logo}
              src="/file.svg"
              alt="File icon"
              width={20}
              height={20}
            />
            Read Blog Posts
          </Link>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Next.js Docs
          </a>
        </div>

        <div className={styles.features}>
          <div className={styles.feature}>
            <h3>🚀 Fast</h3>
            <p>Built with Next.js for optimal performance</p>
          </div>
          <div className={styles.feature}>
            <h3>📝 Markdown</h3>
            <p>Write content in Markdown with MDX support</p>
          </div>
          <div className={styles.feature}>
            <h3>☁️ Cloudflare</h3>
            <p>Deployed globally on Cloudflare Workers</p>
          </div>
        </div>
      </main>
      
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn Next.js
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Templates
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
