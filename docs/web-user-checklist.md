# GitHub Web User Checklist - "My Deployment Doesn't Work"

For users who work only through the GitHub website (no local setup).

## ✅ Step-by-Step Checklist

### 1. Check GitHub Actions Status
- [ ] Go to your repository on GitHub
- [ ] Click `Actions` tab
- [ ] Do you see red X's (failed runs)?
- [ ] Click on the most recent run for details

### 2. Enable GitHub Actions
- [ ] Do you see "Workflows aren't being run on this forked repository"?
- [ ] If yes: click "I understand my workflows, go ahead and enable them"

### 3. Set Up Cloudflare Secrets
**This is usually the problem!**

**Get Cloudflare credentials:**
- [ ] Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
- [ ] Account ID: found in the right sidebar
- [ ] API Token: "My Profile" → "API Tokens" → "Create Token" → "Workers:Edit"

**Add secrets to GitHub:**
- [ ] Go to your repository → `Settings` tab
- [ ] Left sidebar: `Secrets and variables` → `Actions`
- [ ] Click "New repository secret"
- [ ] Add: `CLOUDFLARE_API_TOKEN` (your API token)
- [ ] Add: `CLOUDFLARE_ACCOUNT_ID` (your account ID)

### 4. Check Branch
- [ ] Edit your files on the `main` branch (not `master`)
- [ ] Check the branch dropdown when editing files

### 5. Check Post Format
Make sure your new posts have this format:

```markdown
---
title: "Your Post Title"
date: "2024-01-25"
excerpt: "Brief description"
---

# Your Post Title

Your content here...
```

**Watch out for:**
- [ ] `---` lines above and below frontmatter
- [ ] Quotes around all values
- [ ] Date format: YYYY-MM-DD
- [ ] All required fields: title, date, excerpt

## 🚨 Most Common Problems

### "Error: Unable to find account"
→ `CLOUDFLARE_ACCOUNT_ID` is missing or wrong

### "Authentication failed" 
→ `CLOUDFLARE_API_TOKEN` is missing or expired

### "Workflow not found"
→ GitHub Actions not enabled

### New posts don't appear
→ Frontmatter format is wrong or missing

## 🆘 Emergency Solution

If nothing works:

1. **Check your secrets again:**
   - Delete old secrets
   - Create new Cloudflare API token
   - Add them again to GitHub

2. **Test with a small change:**
   - Edit the README.md
   - Add a space
   - Commit the change
   - See if GitHub Actions starts

3. **Ask for help:**
   - Create an issue in the [original repository](https://github.com/rkristelijn/next-blog/issues)
   - Include: error messages from GitHub Actions
   - Include: which steps you've already tried

## 📞 Contact

For direct help: contact @rkristelijn via GitHub issues.

---

*This checklist is specifically made for users who work only through the GitHub website.*
