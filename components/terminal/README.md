# Terminal Components

This directory contains reusable components for terminal-like UI effects, including animated typing, blinking cursors, and error boundaries.

## Components

- **TerminalText**: Displays text with a typing animation and blinking cursor. Highly accessible and customizable.
- **Cursor**: A reusable blinking cursor component, used by TerminalText and available for other terminal UIs.
- **TerminalErrorBoundary**: Catches and displays errors in terminal UI components.

## Usage

```
import { TerminalText } from './TerminalText';
import { TerminalErrorBoundary } from './TerminalErrorBoundary';

<TerminalErrorBoundary>
  <TerminalText text="Hello, world!" />
</TerminalErrorBoundary>
```

## Design
- **Accessibility**: Uses `aria-live` and proper roles for screen readers.
- **Customization**: Typing speed, delay, and cursor can be customized.
- **Error Handling**: Wrap terminal UIs in `TerminalErrorBoundary` for graceful error display.

## Extending
- Use the `useTerminalAnimation` hook for custom typing/animation effects.
- The `Cursor` component can be used independently for any blinking-cursor UI.

---

For more details, see the source code and JSDoc comments in each file. 