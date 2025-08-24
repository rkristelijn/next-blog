#!/bin/bash

# Fork Health Check Script
# Checks the status of known forks and their sync status

echo "🏥 Fork Health Check"
echo "📅 $(date)"
echo "===================="

# Known forks (add more as needed)
FORKS=(
    "gjvdptev/next-blog"
)

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

check_fork() {
    local fork_url=$1
    local fork_owner=$(echo $fork_url | cut -d'/' -f1)
    local fork_repo=$(echo $fork_url | cut -d'/' -f2)
    
    echo ""
    echo "🔍 Checking: $fork_url"
    echo "----------------------------------------"
    
    # Add remote if it doesn't exist
    if ! git remote | grep -q "^$fork_owner$"; then
        echo "➕ Adding remote for $fork_owner"
        git remote add $fork_owner https://github.com/$fork_url.git
    fi
    
    # Fetch latest
    echo "📥 Fetching latest changes..."
    if git fetch $fork_owner 2>/dev/null; then
        echo "✅ Fetch successful"
    else
        echo -e "${RED}❌ Failed to fetch from $fork_url${NC}"
        echo "   Repository might be private or deleted"
        return 1
    fi
    
    # Check if main branch exists
    if ! git branch -r | grep -q "$fork_owner/main"; then
        echo -e "${YELLOW}⚠️  No 'main' branch found${NC}"
        echo "Available branches:"
        git branch -r | grep $fork_owner | sed 's/^/  /'
        return 1
    fi
    
    # Count commits ahead/behind
    local ahead=$(git rev-list --count $fork_owner/main..main 2>/dev/null || echo "0")
    local behind=$(git rev-list --count main..$fork_owner/main 2>/dev/null || echo "0")
    
    echo "📊 Sync Status:"
    if [ "$ahead" -eq 0 ] && [ "$behind" -eq 0 ]; then
        echo -e "  ${GREEN}✅ Perfect sync${NC}"
    elif [ "$behind" -eq 0 ]; then
        echo -e "  ${GREEN}✅ Fork is up to date${NC}"
        echo "  📈 Main is $ahead commits ahead"
    elif [ "$ahead" -eq 0 ]; then
        echo -e "  ${YELLOW}⚠️  Fork is $behind commits ahead${NC}"
        echo "  📥 Consider reviewing their changes"
    else
        echo -e "  ${YELLOW}⚠️  Fork has diverged${NC}"
        echo "  📈 Main is $ahead commits ahead"
        echo "  📥 Fork is $behind commits ahead"
        echo "  🔄 Sync recommended"
    fi
    
    # Check for recent activity
    local last_commit_date=$(git log -1 --format="%ci" $fork_owner/main 2>/dev/null)
    if [ ! -z "$last_commit_date" ]; then
        echo "📅 Last activity: $last_commit_date"
        
        # Check if it's been more than 30 days (cross-platform compatible)
        local commit_timestamp=$(git log -1 --format="%ct" $fork_owner/main 2>/dev/null)
        local current_timestamp=$(date +%s)
        local days_ago=$(( (current_timestamp - commit_timestamp) / 86400 ))
        
        if [ "$days_ago" -gt 30 ]; then
            echo -e "  ${YELLOW}⚠️  No activity for $days_ago days${NC}"
        else
            echo -e "  ${GREEN}✅ Recent activity ($days_ago days ago)${NC}"
        fi
    fi
    
    # Check for deployment issues (look for common problems)
    echo "🔧 Health Checks:"
    
    # Check if they have the workflow file
    if git show $fork_owner/main:.github/workflows/deploy.yml >/dev/null 2>&1; then
        echo "  ✅ Deployment workflow exists"
    else
        echo -e "  ${RED}❌ Missing deployment workflow${NC}"
    fi
    
    # Check if they have posts
    local post_count=$(git ls-tree -r $fork_owner/main -- src/content/posts/ 2>/dev/null | wc -l)
    if [ "$post_count" -gt 0 ]; then
        echo "  ✅ Has $post_count blog posts"
    else
        echo -e "  ${YELLOW}⚠️  No blog posts found${NC}"
    fi
    
    # Check for package.json
    if git show $fork_owner/main:package.json >/dev/null 2>&1; then
        echo "  ✅ Package.json exists"
    else
        echo -e "  ${RED}❌ Missing package.json${NC}"
    fi
    
    # Recommendations
    echo "💡 Recommendations:"
    if [ "$ahead" -gt 5 ]; then
        echo "  📤 Consider creating sync PR to fork"
    fi
    if [ "$behind" -gt 0 ]; then
        echo "  📥 Review fork changes: ./scripts/sync-with-fork.sh $fork_owner"
    fi
    if [ "$days_ago" -gt 60 ]; then
        echo "  📞 Check if fork maintainer needs help"
    fi
}

# Main execution
echo "🔍 Checking $(echo ${FORKS[@]} | wc -w) known forks..."

for fork in "${FORKS[@]}"; do
    check_fork "$fork"
done

echo ""
echo "📋 Summary"
echo "=========="
echo "✅ Health check complete"
echo "📖 For detailed fork management, see: docs/DEVELOPER-DOCS.md"
echo "🔧 To sync with a specific fork: ./scripts/sync-with-fork.sh [owner]"

# Cleanup old review branches
echo ""
echo "🧹 Cleaning up old review branches..."
OLD_BRANCHES=$(git branch | grep -E "review-.*-[0-9]{8}" | head -5)
if [ ! -z "$OLD_BRANCHES" ]; then
    echo "Found old review branches:"
    echo "$OLD_BRANCHES" | sed 's/^/  /'
    echo "To clean up: git branch -D branch-name"
else
    echo "✅ No old review branches to clean up"
fi
