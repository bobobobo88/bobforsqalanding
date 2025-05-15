// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
  },
})); 