#!/bin/bash

# Sync with Fork Script
# Usage: ./scripts/sync-with-fork.sh [fork-owner] [fork-repo]

FORK_OWNER=${1:-"gjvdptev"}
FORK_REPO=${2:-"next-blog"}
DATE=$(date +%Y%m%d-%H%M)

echo "🔄 Syncing with $FORK_OWNER/$FORK_REPO"
echo "📅 Date: $(date)"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d ".git" ]; then
    echo "❌ Error: Run this script from the repository root"
    exit 1
fi

# Check if remote exists, if not add it
if ! git remote | grep -q "^$FORK_OWNER$"; then
    echo "➕ Adding remote for $FORK_OWNER"
    git remote add $FORK_OWNER https://github.com/$FORK_OWNER/$FORK_REPO.git
fi

# Fetch latest from fork
echo "📥 Fetching latest changes from $FORK_OWNER/$FORK_REPO..."
git fetch $FORK_OWNER

# Check if fork's main branch exists
if ! git branch -r | grep -q "$FORK_OWNER/main"; then
    echo "❌ Error: $FORK_OWNER/main branch not found"
    echo "Available branches:"
    git branch -r | grep $FORK_OWNER
    exit 1
fi

# Show commit differences
echo ""
echo "📊 New commits in fork (not in main):"
FORK_COMMITS=$(git log --oneline main..$FORK_OWNER/main --no-merges)
if [ -z "$FORK_COMMITS" ]; then
    echo "✅ No new commits in fork"
else
    echo "$FORK_COMMITS"
fi

echo ""
echo "📊 New commits in main (not in fork):"
MAIN_COMMITS=$(git log --oneline $FORK_OWNER/main..main --no-merges)
if [ -z "$MAIN_COMMITS" ]; then
    echo "✅ Fork is up to date with main"
else
    echo "$MAIN_COMMITS"
fi

# Show file differences
echo ""
echo "📁 Files modified in fork:"
MODIFIED_FILES=$(git diff --name-only main..$FORK_OWNER/main)
if [ -z "$MODIFIED_FILES" ]; then
    echo "✅ No file differences"
else
    echo "$MODIFIED_FILES"
    
    # Categorize changes
    echo ""
    echo "📋 Change analysis:"
    
    # Check for blog posts
    BLOG_POSTS=$(echo "$MODIFIED_FILES" | grep "src/content/posts/" || true)
    if [ ! -z "$BLOG_POSTS" ]; then
        echo "📝 Blog posts (likely personal content):"
        echo "$BLOG_POSTS" | sed 's/^/  - /'
    fi
    
    # Check for documentation
    DOCS=$(echo "$MODIFIED_FILES" | grep -E "(docs/|README\.md|\.md$)" || true)
    if [ ! -z "$DOCS" ]; then
        echo "📚 Documentation changes:"
        echo "$DOCS" | sed 's/^/  - /'
    fi
    
    # Check for code changes
    CODE=$(echo "$MODIFIED_FILES" | grep -E "\.(js|ts|tsx|jsx|json|yml|yaml)$" || true)
    if [ ! -z "$CODE" ]; then
        echo "💻 Code changes:"
        echo "$CODE" | sed 's/^/  - /'
    fi
    
    # Check for config changes
    CONFIG=$(echo "$MODIFIED_FILES" | grep -E "(package\.json|\.github/|scripts/)" || true)
    if [ ! -z "$CONFIG" ]; then
        echo "⚙️  Configuration changes:"
        echo "$CONFIG" | sed 's/^/  - /'
    fi
fi

# Create review branch if there are changes
if [ ! -z "$MODIFIED_FILES" ] || [ ! -z "$FORK_COMMITS" ]; then
    REVIEW_BRANCH="review-$FORK_OWNER-$DATE"
    echo ""
    echo "🔍 Creating review branch: $REVIEW_BRANCH"
    
    # Ensure we're on main
    git checkout main
    
    # Create review branch from fork
    git checkout -b $REVIEW_BRANCH $FORK_OWNER/main
    
    echo "✅ Review branch created!"
    echo ""
    echo "🔧 Next steps:"
    echo "1. Review changes: git diff main..$REVIEW_BRANCH"
    echo "2. Check specific files: git diff main..$REVIEW_BRANCH -- path/to/file"
    echo "3. Cherry-pick useful changes:"
    echo "   git checkout main"
    echo "   git cherry-pick <commit-hash>"
    echo "4. Or copy specific files:"
    echo "   git checkout $REVIEW_BRANCH -- path/to/useful/file"
    echo "   git add path/to/useful/file"
    echo "   git commit -m 'feat: add useful feature from $FORK_OWNER'"
    echo "5. Clean up: git branch -D $REVIEW_BRANCH"
    
else
    echo ""
    echo "✅ No changes to review"
fi

echo ""
echo "📖 For more help, see: docs/DEVELOPER-DOCS.md"
