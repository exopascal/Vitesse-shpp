export interface ShopifyProductOption {
  name: string;
  values: string[];
}

export interface ShopifyProductVariantOption {
  name: string;
  value: string;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number;
  price: number;
  compareAtPrice?: number;
  image?: {
    url: string;
    altText?: string;
  };
  selectedOptions: ShopifyProductVariantOption[];
}

export interface ShopifyProductReviewSummary {
  ratingValue?: number;
  reviewCount?: number;
}

export interface ShopifyProduct {
  id: string;
  variant_id?: string;
  title: string;
  description?: string;
  createdAt?: string;
  handle: string;
  vendor?: string;
  subtitle?: string;
  featured_image?: string;
  price: number;
  compare_at_price?: number;
  on_sale: boolean;
  available: boolean;
  images?: string[];
  imageAlts?: string[];
  collections?: string[];
  options?: ShopifyProductOption[];
  variants?: ShopifyProductVariant[];
  reviewSummary?: ShopifyProductReviewSummary;
}
  
  export interface ShopifyCollection {
    id: string;
    title: string;
    handle: string;
    products: ShopifyProduct[];
  }
  
  export interface ShopifyConfig {
    shopifyDomain: string;
    shopifyAccessToken: string;
    shopifyApiVersion: string;
  }

export interface ProductFilterOptions {
  category?: string;
  price?: number;
  minPrice?: number;
  maxPrice?: number;
  available?: boolean;
  sortBy?: 'price-asc' | 'price-desc' | 'title-asc' | 'title-desc' | 'created-desc' | 'created-asc';
  filterQuery?: string; // Suchbegriff für Produkttitel
  tags?: string[]; // Produkt-Tags
  productType?: string; // Produkttyp
  limit?: number;
  cursor?: string; // für Pagination
  collection?: string; // für die Filterung nach Collection
}
