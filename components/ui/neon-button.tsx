"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NeonButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent';
  disabled?: boolean;
  fullWidth?: boolean;
  glitch?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const NeonButton: React.FC<NeonButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  disabled = false,
  fullWidth = false,
  glitch = false,
  type = 'button'
}) => {
  const variantClasses = {
    primary: 'border-primary text-primary',
    secondary: 'border-secondary text-secondary',
    accent: 'border-accent text-accent'
  };

  const variantGlow = {
    primary: 'rgba(57, 255, 20, 0.5)',
    secondary: 'rgba(255, 0, 255, 0.5)',
    accent: 'rgba(255, 0, 0, 0.5)'
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const buttonClassName = cn(
    'neon-button',
    variantClasses[variant],
    fullWidth ? 'w-full' : '',
    disabled ? 'opacity-50 cursor-not-allowed' : '',
    className
  );

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      className={buttonClassName}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      style={{
        boxShadow: `0 0 10px ${variantGlow[variant]}, inset 0 0 10px ${variantGlow[variant]}`,
      }}
      animate={glitch ? {
        x: [0, -2, 2, -2, 0],
        opacity: [1, 0.8, 1, 0.9, 1]
      } : {}}
      transition={glitch ? {
        duration: 0.2,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
        repeatDelay: Math.random() * 5 + 2
      } : {}}
    >
      {children}
    </motion.button>
  );
};