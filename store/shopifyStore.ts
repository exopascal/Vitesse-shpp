// stores/shopify.ts
import { defineStore } from "pinia";
import { useRuntimeConfig } from "nuxt/app";
import type {
  ProductFilterOptions,
  ShopifyProduct,
} from "~/types/domain/shopify";

function parseMoneyAmount(value?: string | null): number {
  const amount = Number.parseFloat(value || "0");
  return Number.isFinite(amount) ? amount : 0;
}

function parseIntegerValue(value?: string | null): number | undefined {
  const amount = Number.parseInt(value || "", 10);
  return Number.isFinite(amount) ? amount : undefined;
}

function normalizeReviewSummary(product: any) {
  const customRating = Number.parseFloat(product.customRating?.value || "");
  const reviewsRating = Number.parseFloat(product.reviewsRating?.value || "");
  const customReviewCount = parseIntegerValue(product.customReviewCount?.value);
  const reviewsCount = parseIntegerValue(product.reviewsCount?.value);

  const ratingValue = Number.isFinite(customRating)
    ? customRating
    : Number.isFinite(reviewsRating)
      ? reviewsRating
      : undefined;

  const reviewCount = customReviewCount ?? reviewsCount;

  if (ratingValue === undefined && reviewCount === undefined) {
    return undefined;
  }

  return {
    ratingValue,
    reviewCount,
  };
}

function normalizeProduct(shopifyProduct: any): ShopifyProduct {
  const firstVariant = shopifyProduct.variants?.edges?.[0]?.node;
  const compareAtPrice = parseMoneyAmount(firstVariant?.compareAtPrice?.amount);
  const price = parseMoneyAmount(firstVariant?.price?.amount);

  return {
    id: shopifyProduct.id,
    variant_id: firstVariant?.id,
    title: shopifyProduct.title,
    description: shopifyProduct.descriptionHtml || shopifyProduct.description,
    createdAt: shopifyProduct.createdAt,
    handle: shopifyProduct.handle,
    vendor: shopifyProduct.vendor,
    subtitle: shopifyProduct.subtitle?.value || undefined,
    featured_image: shopifyProduct.featuredImage?.url,
    on_sale: compareAtPrice > price,
    available: firstVariant?.availableForSale || false,
    price,
    compare_at_price: compareAtPrice || undefined,
    images: shopifyProduct.images?.edges?.map((edge: any) => edge.node.url) || [],
    imageAlts:
      shopifyProduct.images?.edges?.map((edge: any) => edge.node.altText || "") || [],
    options:
      shopifyProduct.options?.map((option: any) => ({
        name: option.name,
        values: option.values,
      })) || [],
    variants:
      shopifyProduct.variants?.edges?.map(({ node }: any) => ({
        id: node.id,
        title: node.title,
        availableForSale: node.availableForSale,
        quantityAvailable: node.quantityAvailable || 0,
        price: parseMoneyAmount(node.price?.amount),
        compareAtPrice: parseMoneyAmount(node.compareAtPrice?.amount) || undefined,
        image: node.image?.url
          ? {
              url: node.image.url,
              altText: node.image.altText || undefined,
            }
          : undefined,
        selectedOptions:
          node.selectedOptions?.map((option: any) => ({
            name: option.name,
            value: option.value,
          })) || [],
      })) || [],
    reviewSummary: normalizeReviewSummary(shopifyProduct),
  };
}

function escapeSearchTerm(value: string): string {
  return value.replace(/(["\\])/g, "\\$1").trim();
}

function buildProductSearchQuery(filterQuery: string, minPrice: number, maxPrice: number) {
  const queryParts: string[] = [];
  const normalizedQuery = escapeSearchTerm(filterQuery);

  if (normalizedQuery) {
    queryParts.push(normalizedQuery);
  }

  if (minPrice > 0 || maxPrice < 1000000) {
    queryParts.push(`variants.price:>=${minPrice}`);
    queryParts.push(`variants.price:<=${maxPrice}`);
  }

  return queryParts.join(" AND ");
}

function normalizeSearchValue(value?: string | null): string {
  return (value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function sortProductsLocally(
  products: ShopifyProduct[],
  sortBy: NonNullable<ProductFilterOptions["sortBy"]>
): ShopifyProduct[] {
  const sortedProducts = [...products];

  switch (sortBy) {
    case "price-asc":
      return sortedProducts.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sortedProducts.sort((a, b) => b.price - a.price);
    case "title-asc":
      return sortedProducts.sort((a, b) => a.title.localeCompare(b.title, "de"));
    case "title-desc":
      return sortedProducts.sort((a, b) => b.title.localeCompare(a.title, "de"));
    case "created-asc":
      return sortedProducts.sort((a, b) => {
        return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
      });
    case "created-desc":
    default:
      return sortedProducts.sort((a, b) => {
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      });
  }
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description?: string;
  image?: string;
  productsCount?: number;
}

interface ShopifyState {
  products: Map<string, ShopifyProduct>;
  collections: Map<string, ShopifyProduct[]>;
  collectionsData: Map<string, ShopifyCollection>;
  allCollections: ShopifyCollection[];
  isLoading: boolean;
  error: string | null;
}

// Definieren Sie den Shopify Store
export const useShopifyStore = defineStore("shopifyStore", {
  // State
  state: (): ShopifyState => ({
    products: new Map(),
    collections: new Map(),
    collectionsData: new Map(),
    allCollections: [],
    isLoading: false,
    error: null,
  }),

  // Getters
  getters: {
    getProduct:
      (state) =>
      (productId: string): ShopifyProduct | undefined => {
        return state.products.get(productId);
      },

    getProductByHandle:
      (state) =>
      (handle: string): ShopifyProduct | undefined => {
        // Suche im Cache nach einem Produkt mit dem gegebenen Handle
        for (const [key, product] of state.products) {
          if (product.handle === handle) {
            return product;
          }
        }
        return undefined;
      },

    getProductsByCollection:
      (state) =>
      (collectionHandle: string): ShopifyProduct[] | undefined => {
        return state.collections.get(collectionHandle);
      },

    getCollection:
      (state) =>
      (collectionHandle: string): ShopifyCollection | undefined => {
        return state.collectionsData.get(collectionHandle);
      },

    getAllCollections: (state): ShopifyCollection[] => {
      return state.allCollections;
    },
  },

  // Actions
  actions: {
    /**
     * Lädt die Shopify-Konfiguration für den aktuellen Mandanten
     */
    async getShopifyConfig() {
      const config = useRuntimeConfig();

      return {
        shopifyDomain: String(config.public.shopify.domain || ''),
        shopifyAccessToken: String(config.public.shopify.accessToken || ''),
        shopifyApiVersion: String(config.public.shopify.apiVersion || "2025-01"),
      };
    },

    /**
     * Führt eine GraphQL-Abfrage an die Shopify Storefront API durch
     */
    async shopifyFetch(query: string, variables: Record<string, any> = {}) {
      const { shopifyDomain, shopifyAccessToken, shopifyApiVersion } =
        await this.getShopifyConfig();

      if (!shopifyDomain || !shopifyAccessToken) {
        this.error = "Shopify configuration is missing";
        console.error(this.error);
        return null;
      }

      const url = `https://${shopifyDomain}/api/${shopifyApiVersion}/graphql.json`;

      try {
        this.isLoading = true;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": shopifyAccessToken,
          },
          body: JSON.stringify({ query, variables }),
        });

        if (!response.ok) {
          throw new Error(`Shopify API error: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        this.error = `Error fetching from Shopify: ${error}`;
        console.error(this.error);
        return null;
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Holt ein einzelnes Produkt anhand seiner ID
     */
    async fetchProduct(productId: string): Promise<ShopifyProduct | null> {
      // Prüfen auf Cache-Treffer
      if (this.products.has(productId)) {
        return this.products.get(productId) as ShopifyProduct;
      }

      // GraphQL-Abfrage für ein einzelnes Produkt
      const query = `
        query getProduct($productId: ID!) {
          product(id: $productId) {
            id
            title
            description
            descriptionHtml
            handle
            vendor
            featuredImage {
              url
              altText
            }
            images(first: 10) {
                edges {
                  node {
                    url
                    altText
                    width
                    height
                  }
                }
            }
            options {
              name
              values
            }
            subtitle: metafield(namespace: "custom", key: "subtitle") {
              value
            }
            customRating: metafield(namespace: "custom", key: "rating") {
              value
            }
            customReviewCount: metafield(namespace: "custom", key: "review_count") {
              value
            }
            reviewsRating: metafield(namespace: "reviews", key: "rating") {
              value
            }
            reviewsCount: metafield(namespace: "reviews", key: "rating_count") {
              value
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 50) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  quantityAvailable
                  price {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
                    width
                    height
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }  
          }
        }
      `;
      console.log("Fetching product:", productId);
      const response = await this.shopifyFetch(query, { productId });
      console.log("Product response:", response);
      if (!response?.data?.product) {
        return null;
      }

      const product = normalizeProduct(response.data.product);

      // Im Cache speichern
      this.products.set(productId, product);

      return product;
    },

    /**
     * Holt ein einzelnes Produkt anhand seines Handles
     */
    async fetchProductByHandle(handle: string): Promise<ShopifyProduct | null> {
      // Für direkte URL-Aufrufe: Immer API-Call machen
      // Cache-Check optional - wird überschrieben falls nicht gefunden

      // GraphQL-Abfrage für ein einzelnes Produkt anhand des Handles
      const query = `
        query getProductByHandle($handle: String!) {
          productByHandle(handle: $handle) {
            id
            title
            description
            descriptionHtml
            handle
            vendor
            featuredImage {
              url
              altText
            }
            images(first: 10) {
                edges {
                  node {
                    url
                    altText
                    width
                    height
                  }
                }
            }
            options {
              name
              values
            }
            subtitle: metafield(namespace: "custom", key: "subtitle") {
              value
            }
            customRating: metafield(namespace: "custom", key: "rating") {
              value
            }
            customReviewCount: metafield(namespace: "custom", key: "review_count") {
              value
            }
            reviewsRating: metafield(namespace: "reviews", key: "rating") {
              value
            }
            reviewsCount: metafield(namespace: "reviews", key: "rating_count") {
              value
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 50) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  quantityAvailable
                  price {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
                    width
                    height
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }  
          }
        }
      `;
      
      const response = await this.shopifyFetch(query, { handle });
      
      if (!response?.data?.productByHandle) {
        return null;
      }

      const product = normalizeProduct(response.data.productByHandle);

      // Im Cache speichern (verwende ID als Key für Konsistenz)
      this.products.set(product.id, product);

      return product;
    },

    /**
     * Holt Produkte aus einer bestimmten Sammlung
     */
    async fetchProductsByCollection(
      collectionHandle: string,
      limit: number = 8
    ): Promise<ShopifyProduct[]> {
      // Generiere Cache-Schlüssel
      const cacheKey = collectionHandle;

      // Prüfen auf Cache-Treffer
      if (this.collections.has(cacheKey)) {
        return this.collections.get(cacheKey) as ShopifyProduct[];
      }

      // GraphQL-Abfrage für Produkte in einer Sammlung
      const query = `
        query getProductsByCollection($collectionHandle: String!, $numProducts: Int!) {
          collection(handle: $collectionHandle) {
            products(first: $numProducts) {
              edges {
                node {
                  id
                  title
                  handle
                  featuredImage {
                    url
                    altText
                  }
                  priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                  maxVariantPrice {
                    amount
                    currencyCode
                  }
                }
                compareAtPriceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                  variants(first: 1) {
                    edges {
                      node {
                        id
                        price {
                      amount
                      currencyCode
                    }
                      compareAtPrice {
                      amount
                      currencyCode
                    }
                        availableForSale
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;

      const response = await this.shopifyFetch(query, {
        collectionHandle,
        numProducts: limit,
      });

      console.log("Collection response:", response);

      if (!response?.data?.collection?.products?.edges) {
        return [];
      }

      // Transformieren der Produktdaten
      const products = response.data.collection.products.edges.map(
        ({ node }: any) => {
          const firstVariant = node.variants.edges[0]?.node;

          const product: ShopifyProduct = {
            id: node.id,
            title: node.title,
            handle: node.handle,
            featured_image: node.featuredImage?.url,
            price: parseMoneyAmount(firstVariant?.price?.amount),
            compare_at_price: parseMoneyAmount(firstVariant?.compareAtPrice?.amount) || undefined,
            on_sale:
              parseMoneyAmount(firstVariant?.compareAtPrice?.amount) >
              parseMoneyAmount(firstVariant?.price?.amount),
            available: firstVariant?.availableForSale || false,
          };

          // Produkt auch im Produkt-Cache speichern
          this.products.set(product.id, product);

          return product;
        }
      );

      // Im Collection-Cache speichern
      this.collections.set(cacheKey, products);

      return products;
    },

    /**
     * Holt alle Collections von Shopify
     */
    async fetchAllCollections(): Promise<ShopifyCollection[]> {
      // Prüfen auf Cache-Treffer
      if (this.allCollections.length > 0) {
        return this.allCollections;
      }

      const query = `
        query getAllCollections($numCollections: Int!) {
          collections(first: $numCollections) {
            edges {
              node {
                id
                title
                handle
                description
                image {
                  url
                  altText
                }
              }
            }
          }
        }
      `;

      const response = await this.shopifyFetch(query, {
        numCollections: 50,
      });

      if (!response?.data?.collections?.edges) {
        return [];
      }

      const collections = response.data.collections.edges.map(({ node }: any) => {
        const collection: ShopifyCollection = {
          id: node.id,
          title: node.title,
          handle: node.handle,
          description: node.description,
          image: node.image?.url,
          productsCount: 0, // Note: productsCount not available in Storefront API
        };

        // Collection auch im Collections-Cache speichern
        this.collectionsData.set(collection.handle, collection);

        return collection;
      });

      // Im State speichern
      this.allCollections = collections;

      return collections;
    },

    /**
     * Holt eine spezifische Collection anhand des Handles
     */
    async fetchCollection(collectionHandle: string): Promise<ShopifyCollection | null> {
      // Prüfen auf Cache-Treffer
      if (this.collectionsData.has(collectionHandle)) {
        return this.collectionsData.get(collectionHandle) as ShopifyCollection;
      }

      const query = `
        query getCollection($collectionHandle: String!) {
          collection(handle: $collectionHandle) {
            id
            title
            handle
            description
            image {
              url
              altText
            }
          }
        }
      `;

      const response = await this.shopifyFetch(query, {
        collectionHandle,
      });

      if (!response?.data?.collection) {
        return null;
      }

      const collectionData = response.data.collection;
      const collection: ShopifyCollection = {
        id: collectionData.id,
        title: collectionData.title,
        handle: collectionData.handle,
        description: collectionData.description,
        image: collectionData.image?.url,
        productsCount: 0, // Note: productsCount not available in Storefront API
      };

      // Im Cache speichern
      this.collectionsData.set(collectionHandle, collection);

      return collection;
    },

    async fetchProducts(
      options: ProductFilterOptions = {}
    ): Promise<ShopifyProduct[]> {
      // Default-Werte
      const {
        minPrice = 0,
        maxPrice = 1000000,
        available,
        sortBy = "price-desc",
        filterQuery = "",
        tags = [],
        productType = "",
        limit = 10,
        cursor = "",
      } = options;
      const hasSearchTerm = Boolean(filterQuery.trim());

      // Cache-Schlüssel basierend auf Filteroptionen generieren
      const cacheKey = `all_products_${minPrice}_${maxPrice}_${available}_${sortBy}_${filterQuery}_${tags.join(
        "_"
      )}_${productType}_${limit}_${cursor}`;

      // Prüfen auf Cache-Treffer
      if (this.collections.has(cacheKey)) {
        return this.collections.get(cacheKey) as ShopifyProduct[];
      }

      // Sortierungsoption für GraphQL umwandeln
      let sortKey, reverse;
      switch (sortBy) {
        case "price-asc":
          sortKey = "PRICE";
          reverse = false;
          break;
        case "price-desc":
          sortKey = "PRICE";
          reverse = true;
          break;
        case "title-asc":
          sortKey = "TITLE";
          reverse = false;
          break;
        case "title-desc":
          sortKey = "TITLE";
          reverse = true;
          break;
        case "created-desc":
          sortKey = "CREATED_AT";
          reverse = true;
          break;
        case "created-asc":
          sortKey = "CREATED_AT";
          reverse = false;
          break;
        default:
          sortKey = "RELEVANCE";
          reverse = false;
      }

      // Filter für Verfügbarkeit (currently unused in this implementation)
      // let availabilityFilter = "";
      // if (available !== undefined) {
      //   availabilityFilter = `, availableForSale: ${available}`;
      // }

      // Filter für Tags
      let tagsFilter = "";
      if (tags.length > 0) {
        tagsFilter = `, tag: "${tags[0]}"`;
      }

      // Filter für Produkttyp
      let productTypeFilter = "";
      if (productType) {
        productTypeFilter = `, productType: "${productType}"`;
      }

      // Pagination mit Cursor
      let afterCursor = "";
      if (cursor) {
        afterCursor = `, after: "${cursor}"`;
      }

      // GraphQL-Abfrage mit allen Filtern
      const query = `
        query getProducts(
          $numProducts: Int!
          $query: String
        ) {
          products(
            first: $numProducts
            query: $query
            sortKey: ${sortKey}
            reverse: ${reverse}
            ${afterCursor}
            ${tagsFilter}
            ${productTypeFilter}
          ) {
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              node {
                id
                title
                description
                handle
                vendor
                productType
                tags
                createdAt
                collections(first: 5) {
                  edges {
                    node {
                      id
                      title
                      handle
                    }
                  }
                }
                featuredImage {
                  url
                  altText
                }
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                  maxVariantPrice {
                    amount
                    currencyCode
                  }
                }
                compareAtPriceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                variants(first: 1) {
                  edges {
                    node {
                      id
                      price {
                      amount
                      currencyCode
                    }
                      compareAtPrice {
                      amount
                      currencyCode
                    }
                      availableForSale
                    }
                  }
                }
              }
            }
          }
        }
      `;

      const searchQuery = buildProductSearchQuery(
        hasSearchTerm ? "" : filterQuery,
        minPrice,
        maxPrice
      );
      const requestedLimit = hasSearchTerm ? Math.max(limit, 250) : limit;

      // API-Anfrage senden
      const response = await this.shopifyFetch(query, {
        query: searchQuery || null,
        numProducts: requestedLimit,
      });

      console.log("Shopify response:", response);

      if (!response?.data?.products?.edges) {
        return [];
      }

      // Pagination-Informationen extrahieren (currently unused)
      // const pageInfo = response.data.products.pageInfo;

      // Produktdaten transformieren
      let products = response.data.products.edges.map(({ node }: any) => {
        const firstVariant = node.variants.edges[0]?.node;

        const product: ShopifyProduct = {
          id: node.id,
          title: node.title,
          description: node.description,
          createdAt: node.createdAt,
          handle: node.handle,
          vendor: node.vendor,
          featured_image: node.featuredImage?.url,
          price: parseMoneyAmount(firstVariant?.price?.amount),
          compare_at_price: parseMoneyAmount(firstVariant?.compareAtPrice?.amount) || undefined,
          on_sale:
            parseMoneyAmount(firstVariant?.compareAtPrice?.amount) >
            parseMoneyAmount(firstVariant?.price?.amount),
          available: firstVariant?.availableForSale || false,
          variant_id: firstVariant?.id,
          collections: node.collections.edges.map(
            (edge: any) => edge.node.handle
          ),
        };

        // Produkt auch im Produkt-Cache speichern
        this.products.set(product.id, product);

        return product;
      });

      if (available !== undefined) {
        products = products.filter((product: ShopifyProduct) => product.available === available);
      }

      if (hasSearchTerm) {
        products = this.filterProductsBySearchTerm(products, filterQuery, requestedLimit);
        products = sortProductsLocally(products, sortBy);
        products = products.slice(0, limit);
      }

      // Im Collection-Cache speichern
      this.collections.set(cacheKey, products);

      return products;
    },

    async searchProducts(searchTerm: string, limit = 6): Promise<ShopifyProduct[]> {
      const normalizedQuery = searchTerm.trim();

      if (!normalizedQuery) {
        return [];
      }

      const query = `
        query predictiveSearchProducts($query: String!, $limit: Int!) {
          predictiveSearch(
            query: $query
            limit: $limit
            types: [PRODUCT]
            searchableFields: [TITLE, PRODUCT_TYPE, VARIANT_TITLE, VENDOR, TAG]
          ) {
            products {
              id
              title
              handle
              description
              vendor
              featuredImage {
                url
                altText
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                    availableForSale
                  }
                }
              }
            }
          }
        }
      `;

      const response = await this.shopifyFetch(query, {
        query: normalizedQuery,
        limit,
      });

      const products = response?.data?.predictiveSearch?.products;

      if (!Array.isArray(products)) {
        return this.searchProductsFromCatalog(normalizedQuery, limit);
      }

      const mappedProducts = products.map((product) => {
        const normalizedProduct = normalizeProduct(product);
        this.products.set(normalizedProduct.id, normalizedProduct);
        return normalizedProduct;
      });

      const filteredProducts = this.filterProductsBySearchTerm(
        mappedProducts,
        normalizedQuery,
        limit
      );

      if (filteredProducts.length > 0) {
        return filteredProducts;
      }

      return this.searchProductsFromCatalog(normalizedQuery, limit);
    },

    filterProductsBySearchTerm(
      products: ShopifyProduct[],
      searchTerm: string,
      limit = 6
    ): ShopifyProduct[] {
      const normalizedSearchTerm = normalizeSearchValue(searchTerm);

      if (!normalizedSearchTerm) {
        return [];
      }

      const searchTokens = normalizedSearchTerm.split(" ").filter(Boolean);

      return products
        .filter((product) => {
          const searchableText = normalizeSearchValue(
            [
              product.title,
              product.vendor,
              product.handle,
              product.subtitle,
              product.description,
            ].join(" ")
          );

          return searchTokens.every((token) => searchableText.includes(token));
        })
        .slice(0, limit);
    },

    async searchProductsFromCatalog(searchTerm: string, limit = 6): Promise<ShopifyProduct[]> {
      const catalog = await this.fetchProducts({
        sortBy: "created-desc",
        available: undefined,
        limit: 100,
      });

      return this.filterProductsBySearchTerm(catalog, searchTerm, limit);
    },

    /*
    Add to cart 
     */

    /**
     * Den Cache für eine bestimmte Sammlung leeren
     */
    clearCollectionCache(collectionHandle: string) {
      this.collections.delete(collectionHandle);
    },

    /**
     * Den Cache für ein bestimmtes Produkt leeren
     */
    clearProductCache(productId: string) {
      this.products.delete(productId);
    },

    /**
     * Den gesamten Cache leeren
     */
    clearCache() {
      this.products.clear();
      this.collections.clear();
    },
  },
});
