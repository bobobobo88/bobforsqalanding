export const ANIMATION = {
  TYPING: {
    DEFAULT_SPEED: 50,
    MIN_SPEED: 10,
    MAX_SPEED: 200,
  },
  CURSOR: {
    BLINK_DURATION: 500,
    BLINK_DELAY: 0,
  },
  MOTION: {
    INITIAL_OPACITY: 0.8,
    ANIMATE_OPACITY: 1,
    TRANSITION_DURATION: 0.3,
  },
} as const;

export const ERROR_MESSAGES = {
  ANIMATION_ERROR: 'An error occurred during animation',
  INVALID_SPEED: 'Invalid typing speed provided',
} as const; 