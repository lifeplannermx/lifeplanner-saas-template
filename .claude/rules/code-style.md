# Code Style Rules

- Use functional components, never class components
- Prefer named exports for components, default exports only for pages
- Use 2-space indentation
- Use single quotes for imports, double quotes for JSX attributes
- Prefer `const` over `let`. Never use `var`
- Use TypeScript strict mode — no `any` types unless absolutely necessary
- Destructure props in function parameters
- Keep components under 150 lines. Extract sub-components if larger
- Co-locate component-specific types in the same file. Shared types go in `types/`
