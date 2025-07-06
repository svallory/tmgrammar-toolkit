#!/usr/bin/env node

/**
 * Build script for GitHub Pages documentation
 * Copies internal READMEs and generates LLMs.txt files
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const siteDir = join(projectRoot, 'site');

console.log('🔧 Building documentation for GitHub Pages...');

// Ensure site directories exist
const internalDocsDir = join(siteDir, '_internal_docs');
const userDocsDir = join(siteDir, '_user_docs');

if (!existsSync(internalDocsDir)) {
  mkdirSync(internalDocsDir, { recursive: true });
}

// Copy user docs from docs/ to site/_user_docs/
console.log('📖 Copying user documentation...');
const docsSourceDir = join(projectRoot, 'docs');
if (existsSync(docsSourceDir)) {
  const docFiles = readdirSync(docsSourceDir).filter(file => file.endsWith('.md'));
  
  for (const file of docFiles) {
    const sourcePath = join(docsSourceDir, file);
    const targetPath = join(userDocsDir, file);
    
    if (!existsSync(userDocsDir)) {
      mkdirSync(userDocsDir, { recursive: true });
    }
    
    const content = readFileSync(sourcePath, 'utf-8');
    writeFileSync(targetPath, content);
    console.log(`✅ Copied docs/${file} -> site/_user_docs/${file}`);
  }
}

// Internal documentation mappings
const internalDocs = [
  {
    source: 'src/README.md',
    target: 'site/_internal_docs/src.md',
    title: 'Source Code Architecture',
    description: 'Core implementation and contributor guide',
    order: 1
  },
  {
    source: 'src/helpers/README.md',
    target: 'site/_internal_docs/helpers.md',
    title: 'Helpers Module',
    description: 'Regex construction utilities for contributors',
    order: 2
  },
  {
    source: 'src/scopes/README.md',
    target: 'site/_internal_docs/scopes.md',
    title: 'Scopes Architecture',
    description: 'Type-safe scope system internals',
    order: 3
  },
  {
    source: 'src/scopes/well-known/README.md',
    target: 'site/_internal_docs/well-known-scopes.md',
    title: 'Well-Known Scopes',
    description: 'Predefined scope categories and structure',
    order: 4
  },
  {
    source: 'src/terminals/README.md',
    target: 'site/_internal_docs/terminals.md',
    title: 'Terminals Module',
    description: 'Pre-built patterns for common constructs',
    order: 5
  },
  {
    source: 'src/testing/README.md',
    target: 'site/_internal_docs/testing.md',
    title: 'Testing Framework',
    description: 'Internal testing architecture and APIs',
    order: 6
  },
  {
    source: 'src/validation/README.md',
    target: 'site/_internal_docs/validation.md',
    title: 'Validation System',
    description: 'Grammar and pattern validation internals',
    order: 7
  }
];

// Copy internal docs with front matter
console.log('📝 Copying internal documentation...');
for (const doc of internalDocs) {
  const sourcePath = join(projectRoot, doc.source);
  const targetPath = join(projectRoot, doc.target);
  
  if (!existsSync(sourcePath)) {
    console.warn(`⚠️  Warning: ${doc.source} not found, skipping...`);
    continue;
  }
  
  const content = readFileSync(sourcePath, 'utf-8');
  
  // Add Jekyll front matter
  const frontMatter = `---
title: ${doc.title}
description: ${doc.description}
order: ${doc.order}
source_file: ${doc.source}
---

`;
  
  const processedContent = frontMatter + content;
  writeFileSync(targetPath, processedContent);
  console.log(`✅ Copied ${doc.source} -> ${doc.target}`);
}

console.log('✨ Documentation build complete!');