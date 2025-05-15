import React from 'react';
import { render, screen } from '@testing-library/react';
import { TerminalText } from '@/components/terminal/TerminalText';
import { ANIMATION } from '@/lib/constants/animations';
import { advanceTypingTimers, advanceDelayAndType } from './testUtils';
import { act } from 'react-dom/test-utils';

describe('TerminalText', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders initial state correctly', () => {
    render(<TerminalText text="Hello" />);
    expect(screen.getByRole('text')).toBeInTheDocument();
  });

  it('displays text with typing animation', async () => {
    render(<TerminalText text="Hello" typingSpeed={50} />);
    
    // Initial state: only the cursor is present
    expect(screen.getByRole('text')).toHaveTextContent('█');
    
    // After first character
    advanceTypingTimers(1, 50);
    expect(screen.getByRole('text')).toHaveTextContent('H█');
    
    // After all characters
    advanceTypingTimers(4, 50);
    expect(screen.getByRole('text')).toHaveTextContent('Hello');
  });

  it('handles start delay correctly', () => {
    render(<TerminalText text="Hello" startDelay={1000} typingSpeed={50} />);
    
    // Before delay: only the cursor is present
    expect(screen.getByRole('text')).toHaveTextContent('█');
    
    // After delay and first character
    advanceDelayAndType(1000, 50);
    expect(screen.getByRole('text')).toHaveTextContent('H█');
  });

  it('shows error message for invalid typing speed', () => {
    render(<TerminalText text="Hello" typingSpeed={ANIMATION.TYPING.MIN_SPEED - 1} />);
    expect(screen.getByRole('alert')).toHaveTextContent('Error: Invalid typing speed provided');
  });

  it('calls onComplete callback when animation finishes', () => {
    const onComplete = jest.fn();
    render(<TerminalText text="Hello" onComplete={onComplete} typingSpeed={50} />);
    
    // Advance enough timers to complete the animation
    advanceTypingTimers(5, 50);
    // Ensure the animation completes by advancing the timer by the total animation duration
    act(() => {
      jest.advanceTimersByTime(5 * 50);
    });
    expect(onComplete).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<TerminalText text="Hello" className="custom-class" />);
    expect(screen.getByRole('text')).toHaveClass('custom-class');
  });

  it('handles empty text', () => {
    render(<TerminalText text="" />);
    // Only the cursor should be present
    expect(screen.getByRole('text')).toHaveTextContent('█');
  });
}); 