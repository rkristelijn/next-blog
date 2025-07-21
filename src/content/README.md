# Content Directory

This directory contains the blog content in MDX format.

## Structure

```
src/content/
└── posts/
    ├── hello-world.mdx
    ├── getting-started.mdx
    └── [your-post].mdx
```

## MDX File Format

Each blog post should be a `.mdx` file with the following structure:

```mdx
---
title: "Your Post Title"
date: "YYYY-MM-DD"
excerpt: "Brief description of your post"
---

# Your Post Title

Your content goes here in standard markdown format.

## Subheadings

You can use all standard markdown features:

- **Bold text**
- *Italic text*
- `Code snippets`
- [Links](https://example.com)

### Code Blocks

```javascript
console.log('Hello, World!');
```

### Lists

1. Numbered lists
2. Work as expected

- Bullet points
- Also work fine
```

## Frontmatter Requirements

Every MDX file must include these frontmatter fields:

- `title` (string): The title of the blog post
- `date` (string): Publication date in YYYY-MM-DD format
- `excerpt` (string): Brief description for the post listing

## Adding New Posts

1. Create a new `.mdx` file in `src/content/posts/`
2. Use a descriptive filename (this becomes the URL slug)
3. Add the required frontmatter
4. Write your content in markdown
5. The post will automatically appear in the blog listing

## File Naming

- Use kebab-case for filenames (e.g., `my-awesome-post.mdx`)
- The filename becomes the URL slug (e.g., `/posts/my-awesome-post`)
- Avoid special characters and spaces in filenames

## Benefits of MDX

- **Content Separation**: Content is separate from code
- **Version Control**: Track content changes in Git
- **Easy Editing**: Use any markdown editor
- **Future-Proof**: Can easily migrate to a CMS later
- **Developer-Friendly**: Developers can edit content directly 