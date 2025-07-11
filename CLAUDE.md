# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

tmgrammar-toolkit is a TypeScript toolkit for creating TextMate grammars with type safety, validation, and integrated testing. It transforms writing TextMate grammars from error-prone JSON files into a type-safe, testable development experience.

## Essential Commands

```bash
# Development
bun run build        # Clean and compile TypeScript
bun run dev          # Watch mode compilation

# Testing
bun test             # Run all tests
bun test:watch       # Run tests in watch mode
bun test <file>      # Run specific test file

# Code Quality
bun run lint         # Run ESLint
bun run lint:fix     # Auto-fix linting issues
bun run format       # Format with Prettier

# CLI Commands (use bunx or npx)
bunx tmt emit <grammar.ts>           # Generate JSON grammar
bunx tmt test <test-files> -g <grammar>  # Run declarative tests
bunx tmt snap <files> --update       # Generate/update snapshots
bunx tmt validate <grammar>          # Validate grammar
```

## Architecture

### Core Modules
- **`/src/factory.ts`**: Main grammar creation API (`createGrammar()`)
- **`/src/scopes`**: Type-safe scope system with proxy-based access
- **`/src/cli`**: Command-line interface implementation
- **`/src/helpers`**: Regex construction utilities
- **`/src/terminals`**: Pre-built patterns for common language constructs
- **`/src/testing`**: Testing framework for grammars
- **`/src/validation`**: Grammar and pattern validation

### Key Patterns
1. **Factory Pattern**: Use `createGrammar()` with typed rule objects
2. **Type-Safe Scopes**: Access via `scopes.category.subcategory`
3. **Repository Auto-generation**: Rules with keys become repository items
4. **Modular Exports**: Each module has its own README and exports

### Testing
- Unit tests mirror source structure in `/tests`
- Use Vitest for testing
- Snapshot tests for grammar output
- Declarative test format support

## Development Guidelines

1. **Type Safety**: Maintain strong typing for all APIs
2. **Module Structure**: Each feature should be a separate module with README
3. **Testing**: Write tests for all new functionality
4. **Performance**: Use atomic grouping and pattern optimization
5. **Documentation**: Update module READMEs when changing APIs

## Common Tasks

### Adding New Features
1. Create module in appropriate directory
2. Add types to `types.ts` if needed
3. Export from module's index.ts
4. Add tests in corresponding test directory
5. Update module README

### Working with CLI
- CLI commands are in `/src/cli/commands`
- Use Commander.js patterns
- Support both TS and compiled JS grammars
- Handle Bun runtime for direct TS execution

### Grammar Development
- Use `createGrammar()` factory
- Define rules with proper types (MatchRule, BeginEndRule, etc.)
- Use scope helpers for readability
- Test with declarative tests or programmatic API\n\n
---

Default to using Bun instead of Node.js.

- Use `bun <file>` instead of `node <file>` or `ts-node <file>`
- Use `bun test` instead of `jest` or `vitest`
- Use `bun build <file.html|file.ts|file.css>` instead of `webpack` or `esbuild`
- Use `bun install` instead of `npm install` or `yarn install` or `pnpm install`
- Use `bun run <script>` instead of `npm run <script>` or `yarn run <script>` or `pnpm run <script>`
- Bun automatically loads .env, so don't use dotenv.

## APIs

- `Bun.serve()` supports WebSockets, HTTPS, and routes. Don't use `express`.
- `bun:sqlite` for SQLite. Don't use `better-sqlite3`.
- `Bun.redis` for Redis. Don't use `ioredis`.
- `Bun.sql` for Postgres. Don't use `pg` or `postgres.js`.
- `WebSocket` is built-in. Don't use `ws`.
- Prefer `Bun.file` over `node:fs`'s readFile/writeFile
- Bun.$`ls` instead of execa.

## Testing

Use `bun test` to run tests.

```ts#index.test.ts
import { test, expect } from "bun:test";

test("hello world", () => {
  expect(1).toBe(1);
});
```

## Frontend

Use HTML imports with `Bun.serve()`. Don't use `vite`. HTML imports fully support React, CSS, Tailwind.

Server:

```ts#index.ts
import index from "./index.html"

Bun.serve({
  routes: {
    "/": index,
    "/api/users/:id": {
      GET: (req) => {
        return new Response(JSON.stringify({ id: req.params.id }));
      },
    },
  },
  // optional websocket support
  websocket: {
    open: (ws) => {
      ws.send("Hello, world!");
    },
    message: (ws, message) => {
      ws.send(message);
    },
    close: (ws) => {
      // handle close
    }
  },
  development: {
    hmr: true,
    console: true,
  }
})
```

HTML files can import .tsx, .jsx or .js files directly and Bun's bundler will transpile & bundle automatically. `<link>` tags can point to stylesheets and Bun's CSS bundler will bundle.

```html#index.html
<html>
  <body>
    <h1>Hello, world!</h1>
    <script type="module" src="./frontend.tsx"></script>
  </body>
</html>
```

With the following `frontend.tsx`:

```tsx#frontend.tsx
import React from "react";

// import .css files directly and it works
import './index.css';

import { createRoot } from "react-dom/client";

const root = createRoot(document.body);

export default function Frontend() {
  return <h1>Hello, world!</h1>;
}

root.render(<Frontend />);
```

Then, run index.ts

```sh
bun --hot ./index.ts
```

For more information, read the Bun API docs in `node_modules/bun-types/docs/**.md`.
