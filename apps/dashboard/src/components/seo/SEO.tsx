import React from 'react';
import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  article?: boolean;
  author?: string;
  date?: string;
  canonical?: string;
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  image = 'https://phantom-ai.com/og-image.png', 
  article = false,
  author,
  date,
  canonical
}) => {
  const siteName = "Phantom AI";
  const fullTitle = `${title} | ${siteName}`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      
      {article && author && <meta property="article:author" content={author} />}
      {article && date && <meta property="article:published_time" content={date} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
};
