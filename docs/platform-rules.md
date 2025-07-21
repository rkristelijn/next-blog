# Code and platform rules

## MUI

- **Never use hardcoded px values and color values** - it will break the dark/light theme. Update the theme instead.
- **Use the proper version of MUI** - in this case MUI 7
- **Use theme tokens** - Always use `theme.palette.*`, `theme.spacing()`, `theme.breakpoints.*` instead of hardcoded values
- **Responsive design** - Use MUI's responsive breakpoints and spacing system
- **Component variants** - Use MUI's built-in variants (primary, secondary, etc.) rather than custom colors
- **Typography scale** - Use MUI's typography variants instead of custom font sizes

### Theme Guidelines

- **Palette colors**: Use `theme.palette.primary.main`, `theme.palette.secondary.main`, etc.
- **Background colors**: Use `theme.palette.background.default`, `theme.palette.background.paper`
- **Text colors**: Use `theme.palette.text.primary`, `theme.palette.text.secondary`
- **Spacing**: Use `theme.spacing(1)`, `theme.spacing(2)`, etc. instead of px values
- **Breakpoints**: Use `theme.breakpoints.up('md')`, `theme.breakpoints.down('sm')`, etc.

### Examples

```typescript
// ❌ Bad - hardcoded values
sx={{ 
  backgroundColor: '#f5f5f5',
  padding: '16px',
  color: '#333'
}}

// ✅ Good - theme tokens
sx={{ 
  backgroundColor: 'background.default',
  padding: theme => theme.spacing(2),
  color: 'text.primary'
}}
```

## React

- **Mind that this is NextJS** - use server side features first
- **Server Components** - Prefer server components over client components when possible
- **Client Components** - Only use 'use client' when necessary (interactivity, hooks, browser APIs)
- **Data Fetching** - Use Next.js data fetching methods (getServerSideProps, getStaticProps, etc.)
- **Routing** - Use Next.js App Router patterns and conventions

## TypeScript

- **Strict mode** - Always use strict TypeScript configuration
- **Type definitions** - Define interfaces for all props and data structures
- **Generic types** - Use generics for reusable components and functions
- **Utility types** - Leverage TypeScript utility types (Partial, Pick, Omit, etc.)

## Performance

- **Code splitting** - Use dynamic imports for large components
- **Image optimization** - Use Next.js Image component with proper optimization
- **Bundle analysis** - Regularly analyze bundle size and optimize
- **Lazy loading** - Implement lazy loading for non-critical components

## Accessibility

- **Semantic HTML** - Use proper HTML elements and ARIA attributes
- **Keyboard navigation** - Ensure all interactive elements are keyboard accessible
- **Color contrast** - Maintain proper contrast ratios (WCAG 2.2 AA compliance)
- **Screen readers** - Test with screen readers and provide proper labels

## Testing

- **Unit tests** - Write tests for utility functions and components
- **Integration tests** - Test component interactions and data flow
- **E2E tests** - Test critical user journeys
- **Accessibility tests** - Include accessibility testing in your test suite