"use client";

import React, { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  children: ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = 'top'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);
  
  const getPositionStyles = () => {
    switch (position) {
      case 'top':
        return { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '10px' };
      case 'bottom':
        return { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '10px' };
      case 'left':
        return { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: '10px' };
      case 'right':
        return { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: '10px' };
      default:
        return { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '10px' };
    }
  };
  
  return (
    <div 
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && content && (
          <motion.div
            className="absolute z-50 px-3 py-1.5 text-xs rounded bg-black/90 border border-primary/20 text-primary min-w-max max-w-xs whitespace-pre-wrap"
            style={getPositionStyles()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};