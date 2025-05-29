import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOProps {
  title: string;
  description: string;
  keywords: string[] | string;
  canonicalUrl?: string;
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  structuredData?: Record<string, any>;
  ogType?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords, 
  canonicalUrl,
  ogImage = 'https://www.esnapup.com/images/og-default.jpg',
  twitterCard = 'summary_large_image',
  structuredData,
  ogType = 'website'
}) => {
  const router = useRouter();
  const keywordsString = Array.isArray(keywords) ? keywords.join(', ') : keywords;
  const siteUrl = "https://www.esnapup.com";
  const canonical = canonicalUrl 
    ? `${siteUrl}${canonicalUrl}` 
    : `${siteUrl}${router.asPath}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordsString} />
      <link rel="canonical" href={canonical} />
      
      {/* OpenGraph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="ESnapup" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content="en_US" />
      
      {/* Facebook specific */}
      <meta property="fb:app_id" content="your-facebook-app-id-here" />
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content="@esnapup" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* Structured Data / JSON-LD */}
      {structuredData && (
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      
      {/* Other important meta tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="robots" content="index, follow" />
    </Head>
  );
};

export default SEO;