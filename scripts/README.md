# Scripts Directory

This directory contains utility scripts for the Next.js blog project.

## Cloudflare Worker Initialization

### `init-cloudflare-worker.js`

This script checks if the Cloudflare Worker exists and provides guidance for deployment. For existing projects like this one, workers are created automatically on first deployment.

#### Usage

```bash
# Run the initialization script
npm run init-worker
```

#### What it does

1. **Checks if worker exists**: Uses `wrangler deploy --dry-run` to test deployment
2. **Provides guidance**: Shows appropriate next steps based on worker status
3. **Error handling**: Handles authentication and configuration issues

#### GitHub Actions Integration

The GitHub Action workflow (`.github/workflows/deploy.yml`) includes similar logic:

1. **Check step**: Determines if the worker exists using dry-run deployment
2. **Deploy step**: Deploys the application (creates worker if needed)

#### Required GitHub Secrets

For the GitHub Action to work, you need to add these secrets in your repository settings:

1. **`CLOUDFLARE_API_TOKEN`**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
   - Create token with "Edit Cloudflare Workers" template
   - Copy the token value and add as GitHub secret

2. **`CLOUDFLARE_ACCOUNT_ID`**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Find your Account ID in the right sidebar (32-character hex string)
   - Copy and add as GitHub secret

**To add secrets:**
1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add both secrets with the exact names above

#### Troubleshooting

##### Workers.dev Subdomain Issue

If you see this error:
```
You need to register a workers.dev subdomain before publishing to workers.dev
```

**Solution**: The `wrangler.jsonc` file includes `"workers_dev": true` which automatically registers a workers.dev subdomain on first deployment.

##### First Deployment

- The first deployment will automatically create the worker and register a workers.dev subdomain
- Your blog will be available at: `https://next-blog.YOUR_SUBDOMAIN.workers.dev`
- The exact URL will be shown in the GitHub Actions logs

#### Why This Approach?

For existing projects with `wrangler.jsonc` configuration:

- **`wrangler init`** is for creating new projects from scratch
- **`wrangler deploy`** automatically creates workers on first deployment
- **Dry-run checks** are more reliable than deployment list checks

#### Error Handling

The script handles common issues:

- **Authentication errors**: Prompts to run `npx wrangler login`
- **Account ID errors**: Prompts to set `CLOUDFLARE_ACCOUNT_ID`
- **Configuration errors**: Provides debugging commands

#### Similar to git/lab/agitlity/frontend-apps

This pattern is similar to the initialization scripts used in the git/lab/agitlity/frontend-apps generator, where:

- Workers are checked before deployment
- Automatic worker creation on first deployment
- Consistent behavior across local and CI environments

## Other Scripts

### `generate-posts-data.js`

Generates the posts data from MDX files in the content directory. This runs automatically as a prebuild step. 