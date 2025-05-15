import type { FC } from 'react';

export interface TerminalTextProps {
  /** The text to be displayed in the terminal */
  text: string;
  /** Speed of typing animation in milliseconds */
  typingSpeed?: number;
  /** Additional CSS classes */
  className?: string;
  /** Delay before starting the animation in milliseconds */
  startDelay?: number;
  /** Whether to show the blinking cursor */
  cursorBlink?: boolean;
  /** Callback function when typing animation completes */
  onComplete?: () => void;
}

export type TerminalTextComponent = FC<TerminalTextProps>;

export interface TerminalState {
  displayedText: string;
  isComplete: boolean;
  error: string | null;
}

export type TerminalAction =
  | { type: 'SET_TEXT'; payload: string }
  | { type: 'SET_COMPLETE' }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'RESET' }; 