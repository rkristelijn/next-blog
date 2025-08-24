# Console Suppression in Tests

## Problem

During testing, Mermaid rendering errors and other debug messages were cluttering the test output with messages like:
- `Mermaid rendering error: Invalid syntax`
- Various React warnings
- Other development-only console messages

## Solution

We implemented selective console suppression in the test setup that:

1. **Suppresses known noisy messages** during tests
2. **Preserves important error messages** for debugging
3. **Allows tests to verify console calls** while hiding the output

## Implementation

### Test Setup (`src/test-utils/setup.ts`)

```typescript
// Store original console methods
const originalConsole = {
  error: console.error,
  warn: console.warn,
  log: console.log,
};

// Mock console methods to suppress noisy output during tests
beforeEach(() => {
  console.error = vi.fn((message, ...args) => {
    // Only suppress specific known noisy messages
    if (
      typeof message === 'string' && 
      (message.includes('Mermaid rendering error') ||
       message.includes('Invalid syntax') ||
       message.includes('Warning: ReactDOM.render'))
    ) {
      return;
    }
    // For other errors, still log them (useful for debugging real issues)
    originalConsole.error(message, ...args);
  });
});

afterEach(() => {
  // Restore original console methods
  console.error = originalConsole.error;
  console.warn = originalConsole.warn;
  console.log = originalConsole.log;
});
```

### Test Verification

Tests can still verify that console methods are called:

```typescript
it('handles rendering errors gracefully', async () => {
  const consoleSpy = vi.spyOn(console, 'error');
  
  // ... test code that triggers error ...
  
  // Verify console.error was called (but output was suppressed)
  expect(consoleSpy).toHaveBeenCalledWith(
    'Mermaid rendering error:',
    expect.any(Error)
  );
  
  consoleSpy.mockRestore();
});
```

## Benefits

1. **Clean test output** - No more noisy debug messages
2. **Selective suppression** - Only known noisy messages are hidden
3. **Debugging preserved** - Real errors still show up
4. **Test verification** - Can still test that console methods are called
5. **Environment aware** - Different behavior for development vs production

## Suppressed Message Types

- Mermaid rendering errors
- React warnings about deprecated methods
- Invalid syntax messages
- Other development-only warnings

## Usage

The console suppression is automatically active for all tests. No changes needed in individual test files unless you want to verify console calls.

## Testing

Run tests to verify suppression works:

```bash
npm run ci:test    # Clean output in CI mode
npm test          # Clean output in watch mode
```

Both should now run without noisy console messages while preserving important debugging information.
