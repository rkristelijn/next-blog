# Next.js Blog Documentation

This documentation covers the architecture, setup, and development guidelines for the Next.js blog application.

## Table of Contents

- [Architecture Overview](architecture.md)
- [Platform Rules](platform-rules.md)
- [Architecture Rules](architecture-rules.md)
- [Setup Guide](setup.md)
- [Cloudflare Deployment](cloudflare.md)
- [Theme System](theme-system.md)

## Type Management

### Single Source of Truth Principle

**Problem**: Having multiple type definitions for the same entity violates the DRY (Don't Repeat Yourself) principle and creates maintenance nightmares.

**Solution**: All TypeScript interfaces are defined in `src/types/index.ts` and imported where needed.

#### ✅ **Correct Approach**
```typescript
// src/types/index.ts - Single source of truth
export interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  slug: string;
  content: string;
}

// Other files import from the central location
import type { Post } from '@/types';
```

#### ❌ **Avoid This**
```typescript
// Don't define Post interface in multiple files
// src/lib/posts.ts
interface Post { /* ... */ }

// src/components/PostCard.tsx  
interface Post { /* ... */ }

// src/content/posts/some-post.mdx
interface Post { /* ... */ }
```

### Type Consistency

- **All Post interfaces** should reference `src/types/index.ts`
- **Blog posts** should include comments pointing to the actual type definition
- **Documentation** should reference the central type file
- **No duplicate definitions** across the codebase

### Benefits

1. **Maintainability**: Change once, updates everywhere
2. **Consistency**: All components use the same type structure
3. **Type Safety**: TypeScript catches mismatches automatically
4. **Documentation**: Clear reference for developers
5. **Refactoring**: Easy to update types across the entire application

## Development Guidelines

Follow the principles outlined in [architecture-rules.md](architecture-rules.md) and [platform-rules.md](platform-rules.md) for consistent, maintainable code.