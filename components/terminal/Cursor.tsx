import React from 'react';

interface CursorProps {
  isBlinking?: boolean;
  className?: string;
  style?: React.CSSProperties;
  'aria-hidden'?: boolean;
}

export const Cursor: React.FC<CursorProps> = ({
  isBlinking = true,
  className = '',
  style = {},
  ...props
}) => (
  <span
    className={isBlinking ? `animate-pulse ${className}` : className}
    style={style}
    aria-hidden={props['aria-hidden'] ?? true}
  >
    &#9608;
  </span>
); 