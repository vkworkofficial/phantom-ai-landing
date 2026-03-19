import React from 'react';

interface SchemaOrgProps {
  type: 'Article' | 'WebSite' | 'Organization' | 'BreadcrumbList';
  data: any;
}

export const SchemaOrg: React.FC<SchemaOrgProps> = ({ type, data }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": type,
    ...data
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
