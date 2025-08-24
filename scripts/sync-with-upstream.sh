#!/bin/bash

# 🔄 Sync Fork with Upstream Template
# Voor Gertjan en andere fork maintainers

set -e

echo "🔄 Syncing fork with upstream template"
echo "📅 $(date)"
echo "=================================="

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Not in a git repository"
    exit 1
fi

# Backup current content
echo "💾 Creating backup of personal content..."
mkdir -p ~/blog-backup-$(date +%Y%m%d-%H%M)
BACKUP_DIR=~/blog-backup-$(date +%Y%m%d-%H%M)

# Backup personal posts and images
if [ -d "src/content/posts" ]; then
    cp -r src/content/posts/ "$BACKUP_DIR/posts/"
    echo "✅ Posts backed up to $BACKUP_DIR/posts/"
fi

if [ -d "public" ]; then
    cp -r public/ "$BACKUP_DIR/public/"
    echo "✅ Images backed up to $BACKUP_DIR/public/"
fi

# Add upstream remote if it doesn't exist
if ! git remote get-url upstream > /dev/null 2>&1; then
    echo "🔗 Adding upstream remote..."
    git remote add upstream https://github.com/rkristelijn/next-blog.git
fi

# Fetch latest changes
echo "📥 Fetching latest changes from upstream..."
git fetch upstream

# Show what's new
echo ""
echo "📊 New commits in upstream:"
git log --oneline HEAD..upstream/main | head -10

echo ""
echo "🤔 Do you want to merge these changes? (y/N)"
read -r response

if [[ "$response" =~ ^[Yy]$ ]]; then
    echo "🔄 Merging upstream changes..."
    
    # Create a merge commit
    git merge upstream/main -m "sync: merge latest template updates from upstream

    Merged changes from rkristelijn/next-blog main branch.
    Personal content preserved in backup: $BACKUP_DIR"
    
    echo "✅ Merge completed!"
    echo ""
    echo "🔧 Next steps:"
    echo "1. Check if your personal posts are still there"
    echo "2. Test locally: npm run build"
    echo "3. If everything looks good: git push origin main"
    echo "4. Your backup is in: $BACKUP_DIR"
    
else
    echo "❌ Sync cancelled"
    echo "💾 Your backup is still available in: $BACKUP_DIR"
fi

echo ""
echo "📖 For more help, see: docs/USER-MANUAL-nl.md"
