"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useTerminalAnimation } from '@/hooks/useTerminalAnimation';
import { ANIMATION } from '@/lib/constants/animations';
import type { TerminalTextComponent } from '@/lib/types/terminal';
import { Cursor } from './Cursor';

/**
 * A component that displays text with a terminal-like typing animation
 * @param props - TerminalTextProps
 * @returns React component
 */
export const TerminalText: TerminalTextComponent = ({
  text,
  typingSpeed = ANIMATION.TYPING.DEFAULT_SPEED,
  className = '',
  startDelay = 0,
  cursorBlink = true,
  onComplete
}) => {
  const { displayedText, isComplete, error } = useTerminalAnimation({
    text,
    typingSpeed,
    startDelay,
    onComplete
  });

  if (error) {
    return (
      <span 
        className="text-red-500" 
        role="alert"
        aria-live="polite"
      >
        Error: {error}
      </span>
    );
  }

  return (
    <motion.span 
      className={`font-mono ${className}`}
      initial={{ opacity: ANIMATION.MOTION.INITIAL_OPACITY }}
      animate={{ opacity: ANIMATION.MOTION.ANIMATE_OPACITY }}
      transition={{ duration: ANIMATION.MOTION.TRANSITION_DURATION }}
      role="text"
      aria-label={text}
      aria-live="polite"
    >
      {displayedText}
      {!isComplete && cursorBlink && (
        <Cursor
          isBlinking
          className="ml-0.5"
        />
      )}
      {isComplete && cursorBlink && (
        <Cursor
          isBlinking={false}
          className="ml-0.5 cursor-blink"
        />
      )}
    </motion.span>
  );
};