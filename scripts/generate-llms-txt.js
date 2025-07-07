#!/usr/bin/env node

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const siteDir = join(rootDir, 'apps', 'site', 'public');

// Get all markdown files from docs and src directories
function getAllFiles(dir, extension = '.md') {
  const files = [];
  
  function traverse(currentDir) {
    const entries = readdirSync(currentDir);
    
    for (const entry of entries) {
      const fullPath = join(currentDir, entry);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (entry.endsWith(extension)) {
        files.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

// Generate basic llms.txt
function generateBasicLlms() {
  const content = `# tmgrammar-toolkit

A TypeScript toolkit for creating TextMate grammars with type safety, validation, and integrated testing.

## Key Features

- Type-safe grammar creation with full TypeScript support
- Comprehensive validation using actual Oniguruma regex engine
- Built-in testing framework with programmatic and declarative approaches
- CLI tools for grammar emission, testing, and validation
- Pre-built terminal patterns for common language constructs

## Repository Structure

- \`src/\` - Core toolkit implementation
- \`docs/\` - User documentation
- \`apps/site/\` - Documentation website
- \`examples/\` - Example grammar implementations
- \`tests/\` - Test suite

## Getting Started

\`\`\`typescript
import { createGrammar, scopes, regex } from 'tmgrammar-toolkit';

const grammar = createGrammar(
  'My Language',
  'source.mylang',
  ['mylang'],
  [
    {
      key: 'keywords',
      match: regex.keywords(['if', 'else', 'while']),
      scope: scopes.keyword.control
    }
  ]
);
\`\`\`

## Documentation

Full documentation available at: https://svallory.github.io/tmgrammar-toolkit/

## CLI Usage

\`\`\`bash
# Generate grammar JSON
bunx tmt emit grammar.ts -o grammar.json

# Run tests
bunx tmt test 'tests/**/*.test.lang' -g grammar.json

# Validate grammar
bunx tmt validate grammar.json
\`\`\`
`;

  writeFileSync(join(siteDir, 'llms.txt'), content);
  console.log('✓ Generated llms.txt');
}

// Generate comprehensive llms-full.txt
function generateFullLlms() {
  let content = `# tmgrammar-toolkit - Complete Documentation

A TypeScript toolkit for creating TextMate grammars with type safety, validation, and integrated testing.

---

`;

  // Add main README
  const mainReadme = join(rootDir, 'README.md');
  if (statSync(mainReadme).isFile()) {
    content += `## Main README\n\n`;
    content += readFileSync(mainReadme, 'utf8');
    content += '\n\n---\n\n';
  }

  // Add CLAUDE.md
  const claudeFile = join(rootDir, 'CLAUDE.md');
  if (statSync(claudeFile).isFile()) {
    content += `## Project Instructions (CLAUDE.md)\n\n`;
    content += readFileSync(claudeFile, 'utf8');
    content += '\n\n---\n\n';
  }

  // Add documentation files
  const docsDir = join(rootDir, 'docs');
  if (statSync(docsDir).isDirectory()) {
    const docFiles = getAllFiles(docsDir, '.md');
    
    for (const file of docFiles) {
      const relativePath = file.replace(rootDir + '/', '');
      content += `## ${relativePath}\n\n`;
      content += readFileSync(file, 'utf8');
      content += '\n\n---\n\n';
    }
  }

  // Add src README files
  const srcDir = join(rootDir, 'src');
  if (statSync(srcDir).isDirectory()) {
    const srcReadmes = getAllFiles(srcDir, '.md');
    
    for (const file of srcReadmes) {
      const relativePath = file.replace(rootDir + '/', '');
      content += `## ${relativePath}\n\n`;
      content += readFileSync(file, 'utf8');
      content += '\n\n---\n\n';
    }
  }

  writeFileSync(join(siteDir, 'llms-full.txt'), content);
  console.log('✓ Generated llms-full.txt');
}

// Generate both files
console.log('Generating LLMs.txt files...');
generateBasicLlms();
generateFullLlms();
console.log('LLMs.txt generation complete!');