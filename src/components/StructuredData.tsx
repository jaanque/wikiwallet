export default function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "WikiWallet",
    "url": "https://wikiwallet.com",
    "logo": "https://wikiwallet.com/logo.png",
    "description": "El mapa de tus inversiones tecnológicas. Mapea productos y ecosistemas industriales.",
    "sameAs": [
      "https://twitter.com/wikiwallet",
      "https://github.com/wikiwallet"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "WikiWallet",
    "url": "https://wikiwallet.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://wikiwallet.com/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
