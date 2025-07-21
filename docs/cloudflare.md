# Cloudflare Deployment Setup

This guide will help you set up automatic deployment of your Next.js blog to Cloudflare Workers using GitHub Actions.

## Prerequisites

- A GitHub account
- A Cloudflare account
- Your Next.js blog project (this repository)

## Step 1: Set up GitHub Repository

### 1.1 Create a new repository on GitHub

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner and select "New repository"
3. Name your repository (e.g., `next-blog`)
4. Choose "Public" or "Private" (Public is recommended for open source projects)
5. **Don't** initialize with README, .gitignore, or license (since you already have a project)
6. Click "Create repository"

### 1.2 Connect your local project to GitHub

```bash
# Add the remote origin (replace with your repository URL)
git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git

# Push your code to GitHub
git push -u origin main
```

## Step 2: Set up Cloudflare API Token

### 2.1 Create API Token

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
2. Click "Create Token"
3. Choose "Use a template" and select "Custom token"
4. Configure the token with the following permissions:

#### Token Permissions:
- **Account**: `Cloudflare Pages` - `Edit` (for deployment)
- **Account**: `Workers Scripts` - `Edit` (for Workers deployment)
- **Zone**: `Zone` - `Edit` (if you want to use a custom domain)
- **Zone**: `Zone Settings` - `Edit` (if you want to use a custom domain)

**Note**: If you don't see "Workers Scripts", look for these alternatives:
- `Workers Builds Configuration` - `Edit`
- `Workers KV Storage` - `Edit` (if using KV)
- `Workers Observability` - `Edit`

#### Account Resources:
- Include: `All accounts`

#### Zone Resources:
- Include: `All zones` (if using custom domain)
- Or: `Specific zone` and select your domain (if using custom domain)

### 2.2 Copy the API Token

1. After creating the token, copy the token value (it looks like: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)
2. **Important**: Store this token securely - you won't be able to see it again!

## Step 3: Configure GitHub Secrets

### 3.1 Add Cloudflare API Token

1. Go to your GitHub repository
2. Click on "Settings" tab
3. In the left sidebar, click "Secrets and variables" → "Actions"
4. Click "New repository secret"
5. Name: `CLOUDFLARE_API_TOKEN`
6. Value: Paste your Cloudflare API token
7. Click "Add secret"

### 3.2 Add Cloudflare Account ID

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Look at the URL or find your Account ID in the right sidebar
3. Copy your Account ID (it's a 32-character hexadecimal string)
4. Go back to GitHub repository settings
5. Click "New repository secret"
6. Name: `CLOUDFLARE_ACCOUNT_ID`
7. Value: Paste your Cloudflare Account ID
8. Click "Add secret"

## Step 4: Deploy Your Blog

### 4.1 Trigger Deployment

The deployment will automatically trigger when you push to the `main` branch:

```bash
git add .
git commit -m "feat: initial deployment"
git push origin main
```

### 4.2 Monitor Deployment

1. Go to your GitHub repository
2. Click on the "Actions" tab
3. You should see a workflow running called "Deploy to Cloudflare Workers"
4. Click on it to see the deployment progress

### 4.3 Access Your Blog

Once deployment is successful, your blog will be available at:
- `https://YOUR_PROJECT_NAME.YOUR_SUBDOMAIN.workers.dev`

The exact URL will be shown in the GitHub Actions logs.

## Step 5: Custom Domain (Optional)

### 5.1 Add Custom Domain

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select your domain
3. Go to "Workers & Pages"
4. Find your deployed worker
5. Click on it and go to "Settings" → "Triggers"
6. Add your custom domain

### 5.2 Update DNS Records

1. In your Cloudflare DNS settings, add a CNAME record:
   - Name: `blog` (or whatever subdomain you want)
   - Target: `YOUR_PROJECT_NAME.YOUR_SUBDOMAIN.workers.dev`
   - Proxy status: Proxied (orange cloud)

## Troubleshooting

### Common Issues

#### 1. "Permission denied" error
- Check that your Cloudflare API token has the correct permissions
- Verify your Account ID is correct
- Make sure you have `Workers Scripts` or `Cloudflare Pages` permissions

#### 2. Build fails
- Check the GitHub Actions logs for specific error messages
- Ensure all dependencies are properly installed

#### 3. Domain not working
- Verify DNS records are correctly configured
- Check that the custom domain is added to your worker

### Getting Help

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [OpenNext Documentation](https://opennext.js.org/cloudflare/get-started)

## Security Notes

- Never commit your API tokens to your repository
- Use GitHub Secrets for all sensitive information
- Regularly rotate your API tokens
- Use the principle of least privilege when setting up permissions 