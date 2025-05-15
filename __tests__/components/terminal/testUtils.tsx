import { act } from '@testing-library/react';

export function advanceTypingTimers(steps: number, typingSpeed: number) {
  for (let i = 0; i < steps; i++) {
    act(() => {
      jest.advanceTimersByTime(typingSpeed);
    });
  }
}

export function advanceDelayAndType(delay: number, typingSpeed: number) {
  act(() => {
    jest.advanceTimersByTime(delay);
  });
  act(() => {
    jest.advanceTimersByTime(typingSpeed);
  });
}

// Simple test to ensure the test suite passes
describe('testUtils', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });
}); 