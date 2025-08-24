# 📝 Easy Blogging Guide

**For users like Gert Jan - How to easily blog with this system**

## 🎯 Blog in 3 simple steps:

### Step 1: Fork the project
- Go to https://github.com/rkristelijn/next-blog
- Click "Fork" (top right)
- You now have your own copy!

### Step 2: Add your posts
- Go to `src/content/posts/` in your fork
- Create new `.mdx` files
- Use this format:

```markdown
---
title: "My Blog Post Title"
date: "2024-01-25"
author: "Your Name"
excerpt: "Brief description of your post"
---

# My Blog Post Title

Here you write your content...

## Subheadings work too

- Lists are possible
- **Bold** and *italic* text
- Links to [other sites](https://example.com)

```javascript
// Code blocks with syntax highlighting
console.log("Hello world!");
```
```

### Step 3: Publish
```bash
git add .
git commit -m "Added new blog post"
git push origin main
```

**Done!** 🎉 Your blog will be automatically built and published online.

## 🔄 What happens automatically?

When you push to the `main` branch:

1. **GitHub Actions starts** 🤖
2. **Posts are processed** - The system reads your `.mdx` files
3. **Data is generated** - `posts.json` is automatically created
4. **Blog is built** - Next.js creates static pages
5. **Deployment** - Your blog goes live on Cloudflare Workers

## 📁 File Structure

```
your-blog/
├── src/content/posts/     👈 PUT your blog posts HERE!
│   ├── 01-first-post.mdx
│   ├── 02-second-post.mdx
│   └── 03-latest-post.mdx
├── src/data/posts.json    👈 This is automatically created
└── other files...
```

## ✅ Checklist for new posts

- [ ] File ends with `.mdx`
- [ ] Frontmatter is complete (`title`, `date`, `author`, `excerpt`)
- [ ] Date format is `YYYY-MM-DD`
- [ ] Title is descriptive
- [ ] Excerpt is 1-2 sentences
- [ ] Content is in markdown format

## 🌍 Languages

The system works with **any language**:
- 🇳🇱 Dutch ✅
- 🇬🇧 English ✅  
- 🇩🇪 German ✅
- 🇫🇷 French ✅
- And all other languages!

## 🎨 Customizations

### Personalizing your blog:

1. **Site title**: Edit `src/app/layout.tsx`
2. **Colors**: Adjust `src/lib/theme.ts`
3. **Homepage**: Change `src/components/Hero.tsx`
4. **Footer**: Edit `src/components/Footer.tsx`

## 🆘 Need help?

### Frequently asked questions:

**Q: My new post doesn't appear**
A: Check if:
- Your frontmatter is complete
- You pushed to the `main` branch
- GitHub Actions is finished (green checkmark)

**Q: Error during build**
A: Check if:
- All posts have valid frontmatter
- No syntax errors in your markdown
- Date format is correct (`YYYY-MM-DD`)

**Q: How do I see if deployment works?**
A: Go to your GitHub repository → "Actions" tab → view the latest workflow

### Contact:
- 🐛 Report bugs: [GitHub Issues](https://github.com/rkristelijn/next-blog/issues)
- 💬 Ask questions: [GitHub Discussions](https://github.com/rkristelijn/next-blog/discussions)

## 🎉 Examples

### Example post:
```markdown
---
title: "My Adventure with AI"
date: "2024-01-25"
author: "Gert Jan"
excerpt: "How I use AI in my daily life"
---

# My Adventure with AI

Today I want to tell you about my experiences with AI...

## What I learned

AI is a powerful tool, but...

### Tips for beginners:
1. Start small
2. Experiment a lot
3. Stay critical

**Conclusion**: AI is fantastic if you know how to use it!
```

---

**Happy blogging!** 🚀 Have fun with your new blog!
