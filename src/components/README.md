# Components

This directory contains reusable React components for the Next.js Blog application.

## Component Architecture

All components follow the principles outlined in `docs/rules.md`:

- **RTFM**: Use Next.js and MUI patterns correctly
- **C4C**: Write clear, readable code
- **C4I**: Make components easy to understand for new developers
- **KISS**: Keep components simple and focused
- **HIPI**: Hide implementation details behind clean interfaces
- **NBI**: Use descriptive, intention-based naming

## Components

### Navigation
**File**: `Navigation.tsx`

A reusable navigation component that provides consistent header navigation across the blog.

**Props**:
- `title?: string` - Optional title to display in the navigation bar
- `showHome?: boolean` - Whether to show the home button (default: true)
- `showBack?: boolean` - Whether to show the back button (default: false)
- `showBlogPosts?: boolean` - Whether to show the blog posts button (default: false)

**Usage**:
```tsx
<Navigation title="Blog Posts" showHome={true} showBack={false} />
```

### PostCard
**File**: `PostCard.tsx`

Displays a single blog post preview card with hover effects and proper linking.

**Props**:
- `post: Post` - The post data to display

**Usage**:
```tsx
<PostCard post={postData} />
```

### PostContent
**File**: `PostContent.tsx`

Renders blog post content with markdown support and consistent styling.

**Props**:
- `post: Post` - The post containing the content to render

**Usage**:
```tsx
<PostContent post={postData} />
```

### ThemeRegistry
**File**: `ThemeRegistry.tsx`

MUI theme provider that handles emotion cache creation and server-side rendering.

**Props**:
- `children: React.ReactNode` - React components to wrap with theme provider

**Usage**:
```tsx
<ThemeRegistry>
  <App />
</ThemeRegistry>
```

### ErrorBoundary
**File**: `ErrorBoundary.tsx`

Catches and handles React errors gracefully with a user-friendly fallback UI.

**Props**:
- `children: React.ReactNode` - React components to wrap with error boundary
- `fallback?: React.ReactNode` - Optional custom fallback UI

**Usage**:
```tsx
<ErrorBoundary>
  <ComponentThatMightError />
</ErrorBoundary>
```

### Header
**File**: `Header.tsx`

A reusable header component for consistent navigation across the blog.

**Props**:
- `title?: string` - Optional title to display in the header (default: "Next.js Blog")
- `showBlogPostsButton?: boolean` - Whether to show the blog posts button (default: true)

**Usage**:
```tsx
<Header title="My Blog" showBlogPostsButton={true} />
```

### Footer
**File**: `Footer.tsx`

A reusable footer component with external links and consistent styling.

**Props**: None (static footer)

**Usage**:
```tsx
<Footer />
```

### Hero
**File**: `Hero.tsx`

Displays the main hero section with welcome message and call-to-action buttons.

**Props**: None (static hero content)

**Usage**:
```tsx
<Hero />
```

### Features
**File**: `Features.tsx`

Displays feature cards highlighting the blog's key capabilities.

**Props**: None (static feature content)

**Usage**:
```tsx
<Features />
```

## Best Practices

1. **Single Responsibility**: Each component has one clear purpose
2. **Props Interface**: All components use TypeScript interfaces for props
3. **Documentation**: Each component includes JSDoc comments
4. **Reusability**: Components are designed to be reusable across the application
5. **Error Handling**: Components include proper error handling where appropriate
6. **Accessibility**: Components follow accessibility best practices

## Adding New Components

When adding new components:

1. Create the component file with proper TypeScript interfaces
2. Add JSDoc documentation explaining the component's purpose
3. Include usage examples in the component's documentation
4. Update this README with the new component's information
5. Follow the established naming conventions and patterns 