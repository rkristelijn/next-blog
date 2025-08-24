# Next.js Blog Template 🚀

A modern, fast, and easy-to-use blog template built with Next.js 15, Material-UI, and deployed on Cloudflare Workers.

## ✨ Features

- 📝 **MDX Support** - Write blog posts in Markdown with React components
- 🎨 **Material-UI** - Beautiful, consistent design system
- 🌙 **Dark/Light Theme** - Automatic theme switching with user preference
- ⚡ **Fast Performance** - Static generation with Cloudflare CDN
- 📱 **Responsive Design** - Works perfectly on all devices
- 🔍 **SEO Optimized** - Proper meta tags and structured data
- ♿ **Accessible** - WCAG 2.2 AA compliant
- 🚀 **Auto-Deploy** - Automatic deployment via GitHub Actions

## 🎯 Demo

**Live Demo**: https://next-blog.rkristelijn.workers.dev/

## 🚀 Quick Start for Users

### 1. Fork this Repository
Click the "Fork" button on GitHub to create your own copy.

### 2. Clone Your Fork
```bash
git clone https://github.com/YOUR_USERNAME/next-blog.git
cd next-blog
npm install
```

### 3. Add Your Content
Create new blog posts in `src/content/posts/`:

```markdown
---
title: "My First Blog Post"
date: "2024-01-25"
author: "Your Name"
excerpt: "A brief description of your post"
---

# My First Blog Post

Your content here...
```

### 4. Deploy Your Blog
```bash
git add .
git commit -m "Add my blog posts"
git push origin main
```

**That's it!** 🎉 GitHub Actions will automatically:
- Regenerate the posts data
- Build your blog
- Deploy to Cloudflare Workers

## 📝 Writing Blog Posts

### File Structure
```
src/content/posts/
├── 01-my-first-post.mdx
├── 02-another-post.mdx
└── 03-latest-post.mdx
```

### Post Format
Every post needs frontmatter at the top:

```markdown
---
title: "Your Post Title"
date: "YYYY-MM-DD"
author: "Your Name"
excerpt: "Brief description (1-2 sentences)"
---

# Your Post Title

Your content here using **Markdown** syntax!

## Subheadings work great

- Lists are supported
- Code blocks too

```javascript
console.log("Hello, world!");
```
```

### Supported Content
- ✅ **Markdown** - All standard markdown syntax
- ✅ **Code blocks** - With syntax highlighting
- ✅ **Images** - Add images to `public/` folder
- ✅ **Links** - Internal and external links
- ✅ **Lists** - Ordered and unordered
- ✅ **Tables** - Markdown tables
- ✅ **Any language** - Dutch, English, German, etc.

## 🛠️ Development

### Local Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Check code quality
```

### Project Structure
```
next-blog/
├── src/
│   ├── app/              # Next.js pages
│   ├── components/       # React components
│   ├── content/posts/    # 📝 Your blog posts go here!
│   ├── data/            # Generated posts data
│   └── lib/             # Utility functions
├── scripts/             # Build scripts
└── .github/workflows/   # Auto-deployment
```

## 🔧 Configuration

### Customizing Your Blog

1. **Site Title & Description**: Edit `src/app/layout.tsx`
2. **Theme Colors**: Modify `src/lib/theme.ts`
3. **Home Page**: Update `src/components/Hero.tsx`
4. **Footer**: Edit `src/components/Footer.tsx`

### Deployment Settings

The blog automatically deploys to Cloudflare Workers. To set up your own deployment:

1. **Fork this repository**
2. **Set up Cloudflare secrets** in GitHub:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
3. **Push to main branch** - automatic deployment!

## 🤝 For Contributors

### Adding Features
```bash
git checkout -b feature/my-feature
# Make your changes
git commit -m "feat: add my feature"
git push origin feature/my-feature
# Create pull request
```

### Running Tests
```bash
npm test              # Run tests
npm run type-check    # TypeScript checking
```

## 📚 Documentation

Detailed documentation is available in the [`./docs`](docs) folder:

- [User Manual](docs/USER-MANUAL.md) - Complete blogging guide for GitHub web interface
- [User Guide](docs/user-guide.md) - How to use the blog
- [Web User Checklist](docs/web-user-checklist.md) - Troubleshooting in Dutch
- [Developer Guide](docs/developer-guide.md) - Technical details
- [Architecture Overview](docs/architecture.md) - System design

## 🆘 Troubleshooting

### Quick Diagnosis

If your GitHub Actions deployment stops working, run the diagnostic tool:

```bash
npm run diagnose
```

This will check your setup and identify common issues.

### For Web-Only Users (No Local Setup)

If you're editing files directly on GitHub and deployment stops working:

1. **Check GitHub Actions Status**:
   - Go to your repository's `Actions` tab
   - Look for failed workflow runs (red X marks)
   - Click on the failed run to see error details

2. **Enable GitHub Actions** (if needed):
   - In your repository, go to `Actions` tab
   - If you see "Workflows aren't being run on this forked repository"
   - Click "I understand my workflows, go ahead and enable them"

3. **Verify Repository Secrets**:
   - Go to `Settings` → `Secrets and variables` → `Actions`
   - Ensure you have both secrets set:
     - `CLOUDFLARE_API_TOKEN` (get from Cloudflare dashboard)
     - `CLOUDFLARE_ACCOUNT_ID` (found in Cloudflare sidebar)

4. **Check Your Branch**:
   - Make sure you're editing files on the `main` branch
   - GitHub Actions only triggers on `main` branch changes

5. **Validate Post Format**:
   - Ensure all `.mdx` files in `src/content/posts/` have proper frontmatter:
   ```markdown
   ---
   title: "Your Post Title"
   date: "2024-01-25"
   excerpt: "Brief description"
   ---
   ```

### Common Issues

**Q: My new posts don't show up**
A: Make sure you:
1. Added proper frontmatter to your `.mdx` files
2. Pushed to the `main` branch
3. Waited for GitHub Actions to complete

**Q: Build fails**
A: Check that:
1. All posts have required frontmatter (`title`, `date`, `excerpt`)
2. No syntax errors in your markdown
3. All dependencies are installed

**Q: GitHub Actions workflow not running**
A: Verify that:
1. You have the correct secrets set in your repository:
   - `CLOUDFLARE_API_TOKEN` (with Workers:Edit permissions)
   - `CLOUDFLARE_ACCOUNT_ID`
2. The workflow file is in `.github/workflows/deploy.yml`
3. You're pushing to the `main` branch (not `master` or other branches)
4. GitHub Actions are enabled in your repository settings

**Q: Cloudflare deployment fails**
A: Check that:
1. Your Cloudflare API token has the correct permissions (Workers:Edit, Zone:Read)
2. Your account ID is correct (found in Cloudflare dashboard sidebar)
3. The worker name doesn't conflict with existing workers
4. You have sufficient Cloudflare Workers quota

**Q: Theme not working**
A: Clear your browser cache and check that JavaScript is enabled.

### Getting Help

- 📖 Check the [documentation](docs/)
- 🐛 [Report bugs](https://github.com/rkristelijn/next-blog/issues)
- 💬 [Ask questions](https://github.com/rkristelijn/next-blog/discussions)

## 🎉 Success Stories

This template is being used by:
- Personal blogs
- Technical documentation
- Company blogs
- Portfolio sites

**Active Forks:**
- [Gertjan's Blog](https://github.com/gjvdptev/next-blog) - Managed by gjvdptev

## 📄 License

MIT License - feel free to use this for any project!

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Material-UI](https://mui.com/)
- Deployed on [Cloudflare Workers](https://workers.cloudflare.com/)
- Inspired by modern web development practices

---

**Happy blogging!** 🎉 If you create something cool with this template, let us know!
