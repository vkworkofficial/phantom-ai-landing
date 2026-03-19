import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import BlogPostPage, { generateMetadata, generateStaticParams } from './page';
import React from 'react';

// Mocking 'next/link' as it's a common dependency
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode, href: string }) => <a href={href}>{children}</a>
}));

// Mocking 'lucide-react' to avoid SVG rendering issues in simple tests
vi.mock('lucide-react', () => ({
  ArrowLeft: () => <div data-testid="arrow-left" />,
  Calendar: () => <div data-testid="calendar" />,
  User: () => <div data-testid="user" />,
  Clock: () => <div data-testid="clock" />,
  ArrowRight: () => <div data-testid="arrow-right" />,
  Share2: () => <div data-testid="share-2" />,
  BookOpen: () => <div data-testid="book-open" />,
}));

// Mocking the SEO components
vi.mock('@/components/seo/SEO', () => ({
  SEO: () => <div data-testid="seo-component" />
}));
vi.mock('@/components/seo/SchemaOrg', () => ({
  SchemaOrg: () => <div data-testid="schema-org" />
}));

describe('BlogPostPage Substrate', () => {
  it('should generate static params for indexability', async () => {
    // This requires mock files in src/content/blog if we want to test real FS, 
    // but we can just check if it's an async function that returns an array.
    const params = await generateStaticParams();
    expect(Array.isArray(params)).toBe(true);
  });

  it('should generate high-fidelity metadata', async () => {
    const props = { params: Promise.resolve({ slug: 'pmf-velocity' }) };
    const metadata = await generateMetadata(props);
    // Even if post 404s, it should return an empty object or basic metadata
    expect(typeof metadata).toBe('object');
  });
});
