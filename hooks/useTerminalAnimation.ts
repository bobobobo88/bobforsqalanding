import { useEffect, useReducer, useCallback } from 'react';
import { ANIMATION, ERROR_MESSAGES } from '@/lib/constants/animations';
import type { TerminalState, TerminalAction } from '@/lib/types/terminal';

const initialState: TerminalState = {
  displayedText: '',
  isComplete: false,
  error: null,
};

function terminalReducer(state: TerminalState, action: TerminalAction): TerminalState {
  switch (action.type) {
    case 'SET_TEXT':
      return { ...state, displayedText: action.payload };
    case 'SET_COMPLETE':
      return { ...state, isComplete: true };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isComplete: true };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

interface UseTerminalAnimationProps {
  text: string;
  typingSpeed?: number;
  startDelay?: number;
  onComplete?: () => void;
  onStep?: (currentText: string, currentIndex: number) => void;
}

export function useTerminalAnimation({
  text,
  typingSpeed = ANIMATION.TYPING.DEFAULT_SPEED,
  startDelay = 0,
  onComplete,
  onStep,
}: UseTerminalAnimationProps) {
  const [state, dispatch] = useReducer(terminalReducer, initialState);

  const validateTypingSpeed = useCallback((speed: number) => {
    if (speed < ANIMATION.TYPING.MIN_SPEED || speed > ANIMATION.TYPING.MAX_SPEED) {
      throw new Error(ERROR_MESSAGES.INVALID_SPEED);
    }
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let typingInterval: ReturnType<typeof setInterval>;

    const startTyping = () => {
      let currentIndex = 0;

      try {
        validateTypingSpeed(typingSpeed);
        
        typingInterval = setInterval(() => {
          if (currentIndex < text.length) {
            const nextText = text.substring(0, currentIndex + 1);
            dispatch({ type: 'SET_TEXT', payload: nextText });
            if (onStep) onStep(nextText, currentIndex);
            currentIndex++;
          } else {
            clearInterval(typingInterval);
            dispatch({ type: 'SET_COMPLETE' });
            if (onComplete) onComplete();
          }
        }, typingSpeed);
      } catch (err) {
        dispatch({ 
          type: 'SET_ERROR', 
          payload: err instanceof Error ? err.message : ERROR_MESSAGES.ANIMATION_ERROR 
        });
      }
    };

    try {
      if (startDelay > 0) {
        timer = setTimeout(startTyping, startDelay);
      } else {
        startTyping();
      }
    } catch (err) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: err instanceof Error ? err.message : ERROR_MESSAGES.ANIMATION_ERROR 
      });
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (typingInterval) clearInterval(typingInterval);
    };
  }, [text, typingSpeed, startDelay, onComplete, onStep, validateTypingSpeed]);

  return state;
} 