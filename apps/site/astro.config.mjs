// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import markdoc from '@astrojs/markdoc';

// https://astro.build/config
export default defineConfig({
	site: 'https://svallory.github.io',
	base: '/tmgrammar-toolkit',
	integrations: [
		markdoc(),
		starlight({
			title: 'TextMate Grammar Toolkit',
			description: 'A TypeScript toolkit for creating TextMate grammars with type safety, validation, and integrated testing.',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/svallory/tmgrammar-toolkit' },
			],
			sidebar: [
				{
					label: 'How to Use',
					items: [
						{ label: 'Overview', slug: 'overview' },
						{ label: 'Getting Started', slug: 'getting-started' },
						{ label: 'Modules Overview', slug: 'modules-overview' },
						{ label: 'API Reference', slug: 'api-reference' },
						{ label: 'Using Scopes', slug: 'using-scopes' },
						{ label: 'TextMate Scopes', slug: 'textmate-scopes' },
						{ label: 'Troubleshooting', slug: 'troubleshooting' },
					],
				},
				{
					label: 'How it Works',
					items: [
						{ label: 'Source Architecture', slug: 'internal/src' },
						{ label: 'Helpers', slug: 'internal/helpers' },
						{ label: 'Scopes', slug: 'internal/scopes' },
						{ label: 'Terminals', slug: 'internal/terminals' },
						{ label: 'Testing', slug: 'internal/testing' },
						{ label: 'Validation', slug: 'internal/validation' },
						{ label: 'Well-known Scopes', slug: 'internal/well-known-scopes' },
					],
				},
			],
		}),
	],
});
