# Contributing to Next.js Blog Template

Thank you for your interest in contributing! This document outlines the process for contributing to this project.

## 🚀 Quick Start

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📋 Contribution Workflow

### 1. Setup Your Development Environment

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/next-blog.git
cd next-blog

# Add upstream remote
git remote add upstream https://github.com/rkristelijn/next-blog.git

# Install dependencies
npm install
```

### 2. Create a Feature Branch

**Important:** Never work directly on the `main` branch. Always create a feature branch.

```bash
# Ensure you're on main and up to date
git checkout main
git pull upstream main

# Create and switch to a new feature branch
git checkout -b feature/your-feature-name
```

#### Branch Naming Conventions:
- `feature/add-new-functionality` - New features
- `fix/resolve-deployment-issue` - Bug fixes  
- `docs/update-user-manual` - Documentation updates
- `refactor/improve-code-structure` - Code improvements
- `chore/update-dependencies` - Maintenance tasks

### 3. Make Your Changes

- Write clear, concise commit messages
- Follow existing code style and conventions
- Add tests if applicable
- Update documentation as needed

```bash
# Make your changes
git add .
git commit -m "feat: add comprehensive user guide for web interface"
```

### 4. Test Your Changes

Before submitting, ensure your changes work:

```bash
# Run diagnostics
npm run diagnose

# Test posts generation
node scripts/generate-posts-data.js

# Run linting
npm run lint

# Test build
npm run ci:build
```

### 5. Submit a Pull Request

```bash
# Push your branch to your fork
git push origin feature/your-feature-name
```

Then create a pull request through GitHub's interface.

## 🎯 Types of Contributions We Welcome

### ✅ Encouraged Contributions:
- **Bug fixes** - Resolve issues with deployment, build process, or functionality
- **Documentation improvements** - Better guides, clearer instructions, translations
- **Developer tools** - Scripts, diagnostics, automation that helps all users
- **Template enhancements** - Features that benefit the template itself
- **Accessibility improvements** - Better a11y support
- **Performance optimizations** - Faster builds, better runtime performance

### ❌ Contributions We Don't Accept:
- **Personal blog content** - Your individual blog posts and personal customizations
- **Fork-specific features** - Changes that only benefit your specific use case
- **Breaking changes** - Without prior discussion and community agreement
- **Opinionated styling** - Major design changes without consensus

## 📝 Content Guidelines

### Blog Posts (Template Examples)
If contributing example blog posts:
- Keep content generic and educational
- Focus on demonstrating features
- Avoid personal stories or opinions
- Use placeholder names and data

### Documentation
- Write in clear, simple English
- Include code examples where helpful
- Test all instructions before submitting
- Consider non-technical users

### Code
- Follow existing patterns and conventions
- Add comments for complex logic
- Ensure cross-platform compatibility
- Test on multiple environments

## 🔍 Pull Request Guidelines

### PR Title Format:
```
type: brief description

Examples:
feat: add diagnostic script for troubleshooting
fix: resolve deployment issue with missing secrets
docs: improve user manual for web interface
```

### PR Description Should Include:
- **What** - What changes you made
- **Why** - Why these changes are needed
- **How** - How you implemented the solution
- **Testing** - How you tested the changes
- **Screenshots** - If UI changes are involved

### Example PR Description:
```markdown
## What
Added comprehensive diagnostic script that checks common deployment issues.

## Why
Users frequently struggle with deployment failures due to missing secrets, 
wrong branch names, or invalid post formats. This script automates the 
troubleshooting process.

## How
- Created `scripts/diagnose.js` with automated checks
- Added npm script `npm run diagnose`
- Integrated with existing workflow

## Testing
- Tested on clean repository setup
- Verified all check functions work correctly
- Confirmed helpful error messages are displayed

## Impact
Should reduce support requests by ~70% based on common issue patterns.
```

## 🧪 Testing Guidelines

### Before Submitting:
- [ ] Run `npm run diagnose` - should pass all checks
- [ ] Test `node scripts/generate-posts-data.js` - should generate valid posts.json
- [ ] Run `npm run lint` - should have no errors
- [ ] Test `npm run ci:build` - should build successfully
- [ ] Verify documentation is accurate and up-to-date

### For New Features:
- [ ] Test with clean repository
- [ ] Test with existing content
- [ ] Test error conditions
- [ ] Verify cross-platform compatibility (Windows, macOS, Linux)

## 🌍 Internationalization

### Documentation Translation:
- English is the primary language for technical documentation
- Translations welcome for user-facing guides
- Use `-nl.md`, `-de.md`, `-fr.md` naming convention
- Maintain consistency with English version

### Code Internationalization:
- Keep code and comments in English
- Use i18n patterns for user-facing messages
- Consider cultural differences in UX

## 🚨 Security Guidelines

### Never Include:
- API keys or tokens
- Personal credentials
- Sensitive configuration data
- Private information

### Security Checklist:
- [ ] No hardcoded secrets in code
- [ ] No sensitive data in commit history
- [ ] Dependencies are up to date
- [ ] No known vulnerabilities introduced

## 📞 Getting Help

### Before Contributing:
- Check existing issues and PRs
- Read the documentation thoroughly
- Test the current version

### If You Need Help:
- Create an issue describing your question
- Join discussions in existing issues
- Reach out to maintainers for guidance

### Communication Guidelines:
- Be respectful and constructive
- Provide clear, detailed descriptions
- Include relevant code examples
- Be patient with review process

## 🎉 Recognition

Contributors are recognized in several ways:
- Co-author credits in commit messages
- Acknowledgment in release notes
- Listing in project documentation
- Community appreciation

## 📋 Checklist for Contributors

Before submitting your PR:

### Code Quality:
- [ ] Code follows existing patterns
- [ ] No console.log statements left in production code
- [ ] Error handling is appropriate
- [ ] Code is well-commented

### Testing:
- [ ] All existing tests pass
- [ ] New functionality is tested
- [ ] Edge cases are considered
- [ ] Cross-platform compatibility verified

### Documentation:
- [ ] README updated if needed
- [ ] Code comments added for complex logic
- [ ] User-facing changes documented
- [ ] Breaking changes clearly noted

### Git Hygiene:
- [ ] Commit messages are clear and descriptive
- [ ] No merge commits (use rebase if needed)
- [ ] Branch is up to date with main
- [ ] No unrelated changes included

## 🔄 Review Process

1. **Automated Checks** - GitHub Actions will run tests
2. **Maintainer Review** - Code and approach review
3. **Community Feedback** - Input from other contributors
4. **Approval** - Final approval from maintainers
5. **Merge** - Squash merge to main branch

### Review Criteria:
- Code quality and maintainability
- Alignment with project goals
- Impact on existing users
- Documentation completeness
- Test coverage

## 📚 Additional Resources

- [Developer Documentation](docs/DEVELOPER-DOCS.md) - Comprehensive development guide
- [Architecture Overview](docs/architecture.md) - System design and patterns
- [Troubleshooting Guide](docs/troubleshooting-github-actions.md) - Common issues and solutions

---

Thank you for contributing to the Next.js Blog Template! Your contributions help make this project better for everyone. 🚀
