# BobForsqa Landing Project

## Overview

BobForsqa Landing is a modern, accessible, and secure Next.js web application designed for high performance and maintainability. It features a terminal-inspired UI, robust testing, and best practices for accessibility, security, and developer experience.

---

## Features

- **Terminal-like Animated Text**: Custom `TerminalText` component with typing and blinking cursor effects.
- **Reusable UI Components**: Modular components for dialogs, commands, and more.
- **Accessibility**: ARIA roles, `aria-live`, and keyboard navigation support.
- **Error Boundaries**: Graceful error handling for terminal UI.
- **Type Safety**: Strict TypeScript throughout the codebase.
- **Testing**: Comprehensive unit tests using Jest and React Testing Library.
- **Security**: Regular dependency audits and upgrades.
- **Performance**: Optimized for fast load times and smooth animations.
- **Modern Tooling**: Uses Tailwind CSS, Framer Motion, and Radix UI.

---

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript (strict mode)](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Primitives**: [Radix UI](https://www.radix-ui.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Testing**: [Jest](https://jestjs.io/), [React Testing Library](https://testing-library.com/)
- **Linting/Formatting**: ESLint, Prettier

---

## Directory Structure

```
project/
├── components/
│   ├── terminal/           # Terminal UI components (TerminalText, Cursor, ErrorBoundary)
│   └── ui/                 # General UI components (dialogs, command palette, etc.)
├── hooks/                  # Custom React hooks
├── lib/
│   ├── constants/          # Animation and other constants
│   └── types/              # TypeScript type definitions
├── __tests__/              # Unit and integration tests
├── public/                 # Static assets
├── styles/                 # Global and Tailwind styles
├── pages/ or app/          # Next.js pages or app directory
├── jest.config.js          # Jest configuration
├── jest.setup.js           # Jest setup (mocks, etc.)
├── tsconfig.json           # TypeScript configuration
├── package.json            # Project metadata and scripts
└── README.md               # This file
```

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)

### Installation
```sh
npm install
```

### Development
```sh
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) to view the app.

### Production Build
```sh
npm run build
npm start
```

---

## Testing

- **Run all tests:**
  ```sh
  npm test
  ```
- **Watch mode:**
  ```sh
  npm run test:watch
  ```
- **Coverage report:**
  ```sh
  npm run test:coverage
  ```
- **Test files:** Located in `__tests__/` and alongside components as needed.

---

## Security

- **Dependency Audits:**
  - Run `npm audit` regularly to check for vulnerabilities.
  - All critical and moderate vulnerabilities are fixed before deployment.
- **Type Safety:**
  - TypeScript strict mode is enabled.
- **Best Practices:**
  - Error boundaries, input validation, and secure dependency management.

---

## Accessibility

- Uses ARIA roles and `aria-live` for screen reader support.
- Keyboard navigation is supported throughout the UI.
- Color contrast and focus indicators are tested.

---

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub.
2. Import the repo in [Vercel](https://vercel.com/).
3. Set up environment variables if needed.
4. Deploy!

### Other Platforms
- **Netlify**: Use the Next.js build preset.
- **Custom Server**: Run `npm run build` and `npm start`.

---

## Contribution Guidelines

1. **Fork the repository** and create a new branch for your feature or bugfix.
2. **Write clear, descriptive commit messages.**
3. **Add or update tests** for your changes.
4. **Run `npm test` and `npm run lint`** before submitting a PR.
5. **Open a pull request** with a clear description of your changes.

---

## Troubleshooting

- **Type Errors:**
  - Ensure all dependencies use the same `@types/react` version (currently 18.x).
  - If you see type mismatches, run:
    ```sh
    rm -rf node_modules package-lock.json
    npm install
    ```
- **Build Fails:**
  - Check for type errors or missing dependencies.
  - Run `npm audit` and fix any vulnerabilities.
- **UI Issues:**
  - Check browser console for errors.
  - Ensure you are using a supported browser.

---

## License

This project is licensed under the MIT License.

---

## Maintainers
- [Your Name Here]

For questions or support, open an issue or contact the maintainer. 
