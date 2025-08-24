# Troubleshooting GitHub Actions Deployment Issues

This guide helps diagnose and fix common issues with the automated deployment workflow.

## For Web-Only Users (GitHub Interface Only)

If you're editing files directly on GitHub without a local development setup, follow these steps:

### Step 1: Check GitHub Actions Status
1. Go to your repository on GitHub
2. Click the `Actions` tab
3. Look for workflow runs with red X (failed) or yellow circle (in progress)
4. Click on the most recent run to see details

**Common error messages and solutions:**
- "Error: Unable to find account" → Missing or wrong `CLOUDFLARE_ACCOUNT_ID`
- "Authentication failed" → Missing or expired `CLOUDFLARE_API_TOKEN`
- "Workflow not found" → GitHub Actions not enabled

### Step 2: Enable GitHub Actions (If Needed)
If you see "Workflows aren't being run on this forked repository":
1. Click "I understand my workflows, go ahead and enable them"
2. This is required for all forks - it's a GitHub security feature

### Step 3: Set Up Repository Secrets
This is the most common issue for web-only users:

1. **Get your Cloudflare credentials:**
   - Log into [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Account ID: Found in the right sidebar of any page
   - API Token: Go to "My Profile" → "API Tokens" → "Create Token"
     - Use "Workers:Edit" template
     - Copy the token immediately (you can't see it again)

2. **Add secrets to your GitHub repository:**
   - Go to your repository on GitHub
   - Click `Settings` tab (top of repository)
   - In left sidebar: `Secrets and variables` → `Actions`
   - Click "New repository secret"
   - Add both:
     - Name: `CLOUDFLARE_API_TOKEN`, Value: [your API token]
     - Name: `CLOUDFLARE_ACCOUNT_ID`, Value: [your account ID]

### Step 4: Verify Your Branch
- Make sure you're editing files on the `main` branch (not `master`)
- Check the branch dropdown when editing files
- GitHub Actions only runs on pushes to `main`

### Step 5: Check Your Post Format
When adding new posts via GitHub web interface:

**Correct format:**
```markdown
---
title: "My Blog Post Title"
date: "2024-01-25"
excerpt: "A brief description of the post"
---

# My Blog Post Title

Your content here...
```

**Common mistakes:**
- Missing the `---` lines around frontmatter
- Forgetting quotes around values
- Wrong date format (use YYYY-MM-DD)
- Missing required fields (title, date, excerpt)

## Quick Diagnosis Checklist

When your GitHub Actions workflow stops working ("loopt toch weer niet door"), check these items in order:

### 1. Repository Settings
- [ ] GitHub Actions are enabled in your repository settings
- [ ] You're pushing to the `main` branch (not `master`)
- [ ] The workflow file exists at `.github/workflows/deploy.yml`

### 2. Secrets Configuration
Check that these secrets are properly set in your repository:
- [ ] `CLOUDFLARE_API_TOKEN` - Must have Workers:Edit permissions
- [ ] `CLOUDFLARE_ACCOUNT_ID` - Found in Cloudflare dashboard sidebar

### 3. Content Issues
- [ ] All `.mdx` files have required frontmatter (`title`, `date`, `excerpt`)
- [ ] No syntax errors in markdown files
- [ ] Images are properly referenced and exist in `public/` folder

### 4. Cloudflare Account Status
- [ ] Cloudflare Workers quota not exceeded
- [ ] API token hasn't expired
- [ ] Worker name doesn't conflict with existing workers

## Common Problems and Solutions

### Problem: "Workflow not triggering"
**Symptoms:** No workflow runs appear in the Actions tab after pushing

**Solutions:**
1. Check if you're pushing to `main` branch:
   ```bash
   git branch --show-current
   # Should show 'main'
   ```

2. Verify workflow file exists:
   ```bash
   ls -la .github/workflows/
   # Should show deploy.yml
   ```

3. Enable GitHub Actions in repository settings:
   - Go to Settings → Actions → General
   - Ensure "Allow all actions and reusable workflows" is selected

### Problem: "Secrets not found"
**Symptoms:** Workflow fails with "Error: Unable to find account" or authentication errors

**Solutions:**
1. Add/update repository secrets:
   - Go to Settings → Secrets and variables → Actions
   - Add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`

2. Generate new Cloudflare API token:
   - Go to Cloudflare dashboard → My Profile → API Tokens
   - Create token with "Workers:Edit" permissions

### Problem: "Build fails during posts generation"
**Symptoms:** Error in "Generate posts data" step

**Solutions:**
1. Check all posts have required frontmatter:
   ```markdown
   ---
   title: "Your Post Title"
   date: "2024-01-25"
   excerpt: "Brief description"
   ---
   ```

2. Test locally:
   ```bash
   node scripts/generate-posts-data.js
   ```

3. Fix any markdown syntax errors in your posts

### Problem: "Cloudflare deployment fails"
**Symptoms:** Build succeeds but deployment step fails

**Solutions:**
1. Check Cloudflare Workers quota:
   - Free plan: 100,000 requests/day
   - Paid plan: Higher limits

2. Verify worker name availability:
   - Worker names must be unique across Cloudflare
   - Try changing the name in `wrangler.jsonc`

3. Update API token permissions:
   - Ensure token has "Workers:Edit" and "Zone:Read" permissions

## Debugging Steps

### Step 1: Check Workflow Status
1. Go to your repository on GitHub
2. Click "Actions" tab
3. Look for recent workflow runs
4. Click on failed runs to see error details

### Step 2: Test Locally
```bash
# Test posts generation
node scripts/generate-posts-data.js

# Test build process
npm run ci:build

# Test with your secrets (create .env file)
echo "CLOUDFLARE_API_TOKEN=your_token" > .env
echo "CLOUDFLARE_ACCOUNT_ID=your_account_id" >> .env
npx wrangler deploy --dry-run
```

### Step 3: Check Cloudflare Dashboard
1. Log into Cloudflare dashboard
2. Go to Workers & Pages
3. Check if your worker exists and is healthy
4. Review any error logs

### Step 4: Verify Repository Structure
Your repository should have this structure:
```
your-repo/
├── .github/workflows/deploy.yml
├── src/content/posts/
│   ├── 01-your-post.mdx
│   └── 02-another-post.mdx
├── scripts/generate-posts-data.js
└── wrangler.jsonc
```

## Emergency Recovery

If nothing works, try these steps:

### Option 1: Re-fork the Template
1. Delete your current fork
2. Fork the original template again
3. Copy your posts to the new fork
4. Set up secrets again

### Option 2: Manual Deployment
```bash
# Clone your repository locally
git clone https://github.com/YOUR_USERNAME/next-blog.git
cd next-blog

# Install dependencies
npm install

# Generate posts and build
node scripts/generate-posts-data.js
npm run ci:build

# Deploy manually (with your secrets in .env)
npx wrangler deploy
```

### Option 3: Reset Workflow
1. Delete `.github/workflows/deploy.yml`
2. Copy the workflow file from the original template
3. Commit and push changes

## Getting Help

If you're still having issues:

1. **Check the original repository**: Compare your fork with the [original template](https://github.com/rkristelijn/next-blog)
2. **Create an issue**: Open an issue in the original repository with:
   - Error messages from GitHub Actions
   - Your repository structure
   - Steps you've already tried
3. **Contact maintainer**: Reach out to @rkristelijn for direct support

## Prevention Tips

To avoid future issues:

1. **Regular updates**: Keep your fork updated with the original template
2. **Test locally**: Always test changes locally before pushing
3. **Monitor quotas**: Keep an eye on your Cloudflare Workers usage
4. **Backup secrets**: Keep a secure backup of your API tokens
5. **Use descriptive commit messages**: This helps identify when issues started

---

*This troubleshooting guide is maintained by the Next.js Blog Template community. Last updated: August 2024*
