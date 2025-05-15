"use client";

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface TerminalWindowProps {
  children: ReactNode;
  title?: string;
  className?: string;
  variant?: 'default' | 'error' | 'success';
  animate?: boolean;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
  children,
  title = 'terminal@bobforsqa:~',
  className = '',
  variant = 'default',
  animate = true
}) => {
  const borderColor = 
    variant === 'error' 
      ? 'border-red-500/50' 
      : variant === 'success' 
        ? 'border-green-500/50' 
        : 'border-primary/20';
  
  const glowColor = 
    variant === 'error' 
      ? 'rgba(255, 0, 0, 0.1)' 
      : variant === 'success' 
        ? 'rgba(0, 255, 0, 0.1)' 
        : 'rgba(57, 255, 20, 0.1)';

  const motionProps = animate ? {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  } : {};

  return (
    <motion.div 
      className={`terminal-window ${borderColor} ${className}`}
      style={{ boxShadow: `0 0 15px 5px ${glowColor}` }}
      {...motionProps}
    >
      <div className="terminal-header">
        <div className="terminal-circle terminal-circle-red"></div>
        <div className="terminal-circle terminal-circle-yellow"></div>
        <div className="terminal-circle terminal-circle-green"></div>
        <div className="text-xs text-muted-foreground ml-2">{title}</div>
      </div>
      <div className="text-primary">
        {children}
      </div>
    </motion.div>
  );
};