# Theme System

This document describes the theme system implementation for the Next.js Blog application.

## Overview

The application uses Material-UI's built-in theme system with color scheme support for light and dark modes. This follows MUI 7 best practices and ensures proper theme switching throughout the application without flashing.

## Architecture

### Theme Provider
- **Location**: `src/components/ThemeRegistry.tsx`
- **Purpose**: Provides theme context to the entire application
- **Implementation**: Uses MUI's `ThemeProvider` with emotion cache for SSR support
- **Key Feature**: Prevents theme flashing during server-side rendering

### Theme Configuration
- **Location**: `src/lib/theme.ts`
- **Purpose**: Defines the base theme with custom colors, typography, and spacing
- **Features**: 
  - Color schemes for both light and dark modes
  - Custom primary and secondary colors
  - Typography scale with proper font weights
  - Consistent border radius
  - No hardcoded colors (follows platform rules)

### Theme Toggle
- **Location**: `src/components/ThemeToggle.tsx`
- **Purpose**: Allows users to switch between light and dark themes
- **Features**:
  - Uses MUI's `useColorScheme` hook
  - Persists preference in localStorage
  - Respects system preference on first visit
  - Smooth hover animations

## Key Principles

### 1. No Hardcoded Colors
Following the platform rules, all colors are defined in the theme:

```typescript
// ❌ Bad - hardcoded colors
sx={{ backgroundColor: '#f5f5f5', color: '#333' }}

// ✅ Good - theme tokens
sx={{ backgroundColor: 'background.paper', color: 'text.primary' }}
```

### 2. Theme Token Usage
Always use theme tokens instead of hardcoded values:

```typescript
// Spacing
sx={{ padding: theme => theme.spacing(2) }}

// Colors
sx={{ color: 'primary.main' }}

// Typography
sx={{ fontSize: 'h6.fontSize' }}
```

### 3. Responsive Design
Use MUI's responsive breakpoints:

```typescript
sx={{
  display: { xs: 'block', md: 'flex' },
  fontSize: { xs: 'body2.fontSize', md: 'h6.fontSize' }
}}
```

## Theme Structure

### Color Schemes
The theme uses MUI 7's `colorSchemes` approach:

```typescript
colorSchemes: {
  light: {
    palette: {
      primary: { main: '#1976d2', ... },
      background: { default: '#fafafa', paper: '#ffffff' },
      text: { primary: 'rgba(0, 0, 0, 0.87)', ... }
    }
  },
  dark: {
    palette: {
      primary: { main: '#90caf9', ... },
      background: { default: '#121212', paper: '#1e1e1e' },
      text: { primary: '#ffffff', ... }
    }
  }
}
```

### Typography
- **Font Family**: System fonts with emoji support
- **Font Weights**: Consistent weight scale (600-700)
- **Variants**: h1-h6 with proper sizing

### Shape
- **Border Radius**: 8px for consistent rounded corners

## Preventing Theme Flashing

### SSR Setup
The theme system prevents flashing during server-side rendering:

1. **Emotion Insertion Point**: Added to `layout.tsx`:
   ```html
   <meta name="emotion-insertion-point" content="" />
   ```

2. **ThemeRegistry**: Handles emotion cache and SSR:
   ```typescript
   const [{ cache, flush }] = useState(() => {
     const cache = createCache({ key: 'mui' });
     cache.compat = true;
     // ... cache setup
   });
   ```

3. **useServerInsertedHTML**: Injects styles during SSR:
   ```typescript
   useServerInsertedHTML(() => {
     const names = flush();
     // ... style injection
   });
   ```

### Color Scheme Persistence
- **localStorage**: Theme preference is saved automatically
- **System Preference**: Detects user's system theme on first visit
- **No Flash**: Theme is applied before page renders

## Usage Examples

### Components
```typescript
import { Box, Typography } from '@mui/material';

export default function MyComponent() {
  return (
    <Box sx={{ 
      backgroundColor: 'background.paper',
      color: 'text.primary',
      padding: theme => theme.spacing(2)
    }}>
      <Typography variant="h5" color="primary.main">
        Hello World
      </Typography>
    </Box>
  );
}
```

### Theme Toggle
```typescript
import ThemeToggle from '@/components/ThemeToggle';

export default function Header() {
  return (
    <AppBar>
      <Toolbar>
        <Typography>Title</Typography>
        <ThemeToggle /> {/* Theme toggle in header */}
      </Toolbar>
    </AppBar>
  );
}
```

## Best Practices

1. **Always use theme tokens** - Never hardcode colors or spacing
2. **Test both themes** - Ensure components work in light and dark modes
3. **Accessibility** - Maintain proper contrast ratios
4. **Performance** - Theme changes are instant with no re-renders
5. **Persistence** - User preferences are saved automatically
6. **No flashing** - SSR setup prevents theme flashing

## Troubleshooting

### Theme not switching
- Check that `ThemeRegistry` wraps your app
- Verify `ThemeToggle` is using `useColorScheme`
- Clear localStorage if needed

### Colors not updating
- Ensure you're using theme tokens, not hardcoded values
- Check that components are wrapped in `ThemeProvider`
- Verify MUI version compatibility

### Theme flashing
- Ensure `emotion-insertion-point` meta tag is present
- Check that `ThemeRegistry` is properly configured
- Verify SSR setup is correct

### SSR issues
- `ThemeRegistry` handles emotion cache for SSR
- No additional configuration needed for Next.js
- Emotion insertion point prevents style flashing

## MUI 7 Specific Features

### Color Schemes
MUI 7 introduces a new color scheme approach:
- **Automatic switching**: Based on system preference
- **Manual control**: Via `useColorScheme` hook
- **Persistent preferences**: Saved to localStorage

### Performance
- **No re-renders**: Theme changes are instant
- **Optimized bundles**: Only required styles are included
- **Tree shaking**: Unused theme properties are removed

### Accessibility
- **High contrast**: Proper contrast ratios in both themes
- **Keyboard navigation**: Theme toggle is keyboard accessible
- **Screen reader support**: Proper ARIA labels and descriptions 