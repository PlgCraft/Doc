import { siteConfig } from "@/lib/site";

export function buildOrganizationJsonLd(options?: {
  description?: string;
  sameAs?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logoPath}`,
    description: options?.description ?? siteConfig.description,
    sameAs: options?.sameAs ?? [],
  };
}

export function buildWebSiteJsonLd(options?: {
  target?: string;
  description?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: options?.description ?? siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: options?.target ?? `${siteConfig.url}/blog?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildHomeJsonLd(options?: { sameAs?: string[] }) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationJsonLd({
        sameAs: options?.sameAs,
      }),
      buildWebSiteJsonLd(),
    ],
  };
}

export function buildBlogPostingJsonLd(options: {
  title: string;
  description?: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  image?: string;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: options.url,
    headline: options.title,
    description: options.description,
    datePublished: options.datePublished,
    dateModified: options.dateModified ?? options.datePublished,
    author: {
      "@type": "Person",
      name: options.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}${siteConfig.logoPath}`,
      },
    },
    image: options.image ? [options.image] : undefined,
    keywords: options.keywords?.length ? options.keywords.join(", ") : undefined,
  };
}

export function buildProductJsonLd(options: {
  name: string;
  description?: string;
  url: string;
  image?: string;
  category?: string;
  brand?: string;
  offers?: {
    price: string;
    priceCurrency?: string;
    availability?: string;
    url?: string;
  };
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
    worstRating?: number;
  };
}) {
  const offers = options.offers
    ? {
        "@type": "Offer",
        price: options.offers.price,
        priceCurrency: options.offers.priceCurrency ?? "USD",
        availability: options.offers.availability,
        url: options.offers.url ?? options.url,
      }
    : undefined;

  const aggregateRating = options.aggregateRating
    ? {
        "@type": "AggregateRating",
        ratingValue: options.aggregateRating.ratingValue,
        reviewCount: options.aggregateRating.reviewCount,
        bestRating: options.aggregateRating.bestRating,
        worstRating: options.aggregateRating.worstRating,
      }
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: options.name,
    description: options.description,
    url: options.url,
    image: options.image ? [options.image] : undefined,
    category: options.category,
    brand: {
      "@type": "Brand",
      name: options.brand ?? siteConfig.name,
    },
    offers,
    aggregateRating,
  };
}

export function buildBlogIndexJsonLd(options: {
  url: string;
  name: string;
  description?: string;
  items: Array<{
    position: number;
    url: string;
    name: string;
    description?: string;
    datePublished?: string;
  }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: options.url,
    name: options.name,
    description: options.description,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: options.items.map((item) => ({
        "@type": "ListItem",
        position: item.position,
        url: item.url,
        name: item.name,
        description: item.description,
        datePublished: item.datePublished,
      })),
    },
  };
}

export function buildBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
