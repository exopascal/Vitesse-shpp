/**
 * SEO Recommendation Engine
 *
 * Generates actionable recommendations for improving internal linking.
 */

import type { BuilderPage } from './page-discovery.js'
import type { LinkGraph, PageNode } from './link-graph.js'
import { findOrphanPages, findShallowPages, findHubPages, findDeepPages } from './link-graph.js'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Link recommendation
 */
export interface LinkRecommendation {
  /** Target page that needs links */
  page: string
  /** Page title */
  pageTitle: string
  /** Action to take */
  action: 'add_links_from' | 'add_links_to' | 'move_closer_to_homepage'
  /** Priority level */
  priority: 'high' | 'medium' | 'low'
  /** Suggested pages to link from/to */
  suggestions: Array<{
    /** URL of suggested page */
    url: string
    /** Page title */
    title: string
    /** Reason for suggestion */
    reason: string
    /** Confidence score (0-100) */
    confidence: number
  }>
}

/**
 * All recommendations
 */
export interface RecommendationReport {
  /** Recommendations for orphan pages */
  orphanRecommendations: LinkRecommendation[]
  /** Recommendations for shallow pages */
  shallowRecommendations: LinkRecommendation[]
  /** Recommendations for deep pages */
  deepRecommendations: LinkRecommendation[]
  /** Summary */
  summary: {
    totalRecommendations: number
    highPriority: number
    mediumPriority: number
    lowPriority: number
  }
}

// ============================================================================
// KEYWORD EXTRACTION & SIMILARITY
// ============================================================================

/**
 * Extract keywords from text
 *
 * @param text Text to analyze
 * @returns Set of keywords
 */
export function extractKeywords(text: string): Set<string> {
  if (!text) return new Set()

  // German and English stop words
  const stopWords = new Set([
    // German
    'der', 'die', 'das', 'und', 'in', 'für', 'mit', 'auf', 'zu', 'im',
    'ist', 'sich', 'von', 'dem', 'des', 'den', 'bei', 'aus', 'ein',
    'eine', 'einer', 'einen', 'einem', 'wird', 'sind', 'hat', 'haben',
    // English
    'the', 'and', 'for', 'with', 'that', 'this', 'from', 'are', 'was',
    'were', 'been', 'have', 'has', 'had', 'will', 'would', 'can', 'could'
  ])

  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-zäöüß\s]/gi, ' ') // Remove non-letters
      .split(/\s+/)
      .filter(word => word.length > 3 && !stopWords.has(word))
  )
}

/**
 * Calculate similarity between two keyword sets (Jaccard Index)
 *
 * @param keywords1 First keyword set
 * @param keywords2 Second keyword set
 * @returns Similarity score (0-100)
 */
export function calculateSimilarity(keywords1: Set<string>, keywords2: Set<string>): number {
  if (keywords1.size === 0 || keywords2.size === 0) return 0

  const intersection = new Set([...keywords1].filter(k => keywords2.has(k)))
  const union = new Set([...keywords1, ...keywords2])

  return Math.round((intersection.size / union.size) * 100)
}

/**
 * Find similar pages based on content
 *
 * @param targetPage Target page
 * @param allPages All pages
 * @param limit Max results
 * @param minSimilarity Minimum similarity score
 * @returns Similar pages with similarity scores
 */
export function findSimilarPages(
  targetPage: BuilderPage,
  allPages: BuilderPage[],
  limit: number = 5,
  minSimilarity: number = 20
): Array<{ page: BuilderPage; similarity: number }> {
  const targetText = (targetPage.data.title || '') + ' ' + (targetPage.data.description || '')
  const targetKeywords = extractKeywords(targetText)

  const similarities = allPages
    .filter(p =>
      p.data.url !== targetPage.data.url &&
      p.published === 'published'
    )
    .map(page => {
      const pageText = (page.data.title || '') + ' ' + (page.data.description || '')
      const pageKeywords = extractKeywords(pageText)
      const similarity = calculateSimilarity(targetKeywords, pageKeywords)

      return { page, similarity }
    })
    .filter(s => s.similarity >= minSimilarity)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit)

  return similarities
}

// ============================================================================
// RECOMMENDATION GENERATION
// ============================================================================

/**
 * Generate recommendations for orphan pages
 *
 * @param orphans Orphan page nodes
 * @param graph Link graph
 * @param allPages All Builder.io pages
 * @returns Recommendations
 */
export function generateOrphanRecommendations(
  orphans: PageNode[],
  graph: LinkGraph,
  allPages: BuilderPage[]
): LinkRecommendation[] {
  const recommendations: LinkRecommendation[] = []

  const hubs = findHubPages(graph, 3) // Pages with 3+ inbound links

  orphans.forEach(orphan => {
    const orphanPage = allPages.find(p => p.data.url === orphan.url)
    if (!orphanPage) return

    const suggestions: LinkRecommendation['suggestions'] = []

    // 1. Find thematically similar pages
    const similar = findSimilarPages(orphanPage, allPages, 3, 25)
    similar.forEach(sim => {
      suggestions.push({
        url: sim.page.data.url,
        title: sim.page.data.title || sim.page.name,
        reason: `Thematisch ähnlich (${sim.similarity}% Übereinstimmung)`,
        confidence: sim.similarity
      })
    })

    // 2. Suggest linking from hub pages
    hubs.slice(0, 2).forEach(hub => {
      // Don't suggest if already similar
      if (suggestions.some(s => s.url === hub.url)) return

      suggestions.push({
        url: hub.url,
        title: hub.title,
        reason: `Hub Page mit ${hub.inboundLinks.length} eingehenden Links`,
        confidence: Math.min(80, 40 + hub.inboundLinks.length * 5)
      })
    })

    // 3. Homepage as fallback
    if (suggestions.length === 0) {
      suggestions.push({
        url: '/',
        title: 'Homepage',
        reason: 'Fallback: Von der Homepage verlinken',
        confidence: 50
      })
    }

    recommendations.push({
      page: orphan.url,
      pageTitle: orphan.title,
      action: 'add_links_from',
      priority: 'high',
      suggestions: suggestions.slice(0, 5) // Max 5 suggestions
    })
  })

  return recommendations
}

/**
 * Generate recommendations for shallow pages
 *
 * @param shallow Shallow page nodes
 * @param graph Link graph
 * @param allPages All Builder.io pages
 * @returns Recommendations
 */
export function generateShallowRecommendations(
  shallow: PageNode[],
  graph: LinkGraph,
  allPages: BuilderPage[]
): LinkRecommendation[] {
  const recommendations: LinkRecommendation[] = []

  shallow.forEach(page => {
    const builderPage = allPages.find(p => p.data.url === page.url)
    if (!builderPage) return

    const suggestions: LinkRecommendation['suggestions'] = []

    // Find similar pages to link TO
    const similar = findSimilarPages(builderPage, allPages, 5, 20)
    similar.forEach(sim => {
      // Don't suggest if already linking
      if (page.outboundLinks.includes(sim.page.data.url)) return

      suggestions.push({
        url: sim.page.data.url,
        title: sim.page.data.title || sim.page.name,
        reason: `Verwandter Inhalt (${sim.similarity}% ähnlich)`,
        confidence: sim.similarity
      })
    })

    // Suggest linking to /probetraining if not already
    if (!page.outboundLinks.includes('/probetraining')) {
      suggestions.push({
        url: '/probetraining',
        title: 'Probetraining',
        reason: 'Standard CTA - sollte auf jeder Seite verlinkt sein',
        confidence: 90
      })
    }

    // Suggest linking to /kontakt if not already
    if (!page.outboundLinks.includes('/kontakt')) {
      suggestions.push({
        url: '/kontakt',
        title: 'Kontakt',
        reason: 'Standard Kontakt-Link',
        confidence: 70
      })
    }

    if (suggestions.length > 0) {
      recommendations.push({
        page: page.url,
        pageTitle: page.title,
        action: 'add_links_to',
        priority: 'medium',
        suggestions: suggestions.slice(0, 5)
      })
    }
  })

  return recommendations
}

/**
 * Generate recommendations for deep pages
 *
 * @param deep Deep page nodes
 * @param graph Link graph
 * @param allPages All Builder.io pages
 * @returns Recommendations
 */
export function generateDeepRecommendations(
  deep: PageNode[],
  graph: LinkGraph,
  allPages: BuilderPage[]
): LinkRecommendation[] {
  const recommendations: LinkRecommendation[] = []

  const hubs = findHubPages(graph, 5)

  deep.forEach(page => {
    const builderPage = allPages.find(p => p.data.url === page.url)
    if (!builderPage) return

    const suggestions: LinkRecommendation['suggestions'] = []

    // 1. Suggest linking from homepage
    if (!page.inboundLinks.includes('/')) {
      suggestions.push({
        url: '/',
        title: 'Homepage',
        reason: `Seite ist auf Tiefe ${page.depth} - direkter Link von Homepage reduziert Tiefe`,
        confidence: 80
      })
    }

    // 2. Suggest linking from hub pages
    hubs.slice(0, 3).forEach(hub => {
      if (hub.outboundLinks.includes(page.url)) return // Already linking

      suggestions.push({
        url: hub.url,
        title: hub.title,
        reason: `Hub Page (${hub.inboundLinks.length} inbound links) kann Tiefe reduzieren`,
        confidence: 70
      })
    })

    // 3. Find thematically similar pages with lower depth
    const similar = findSimilarPages(builderPage, allPages, 3, 25)
    similar.forEach(sim => {
      const simNode = graph.nodes.get(sim.page.data.url)
      if (!simNode || simNode.depth >= page.depth) return // Only suggest lower depth

      if (!simNode.outboundLinks.includes(page.url)) {
        suggestions.push({
          url: sim.page.data.url,
          title: sim.page.data.title || sim.page.name,
          reason: `Ähnlicher Inhalt auf Tiefe ${simNode.depth} (vs. aktuelle Tiefe ${page.depth})`,
          confidence: sim.similarity
        })
      }
    })

    if (suggestions.length > 0) {
      recommendations.push({
        page: page.url,
        pageTitle: page.title,
        action: 'move_closer_to_homepage',
        priority: 'medium',
        suggestions: suggestions.slice(0, 5)
      })
    }
  })

  return recommendations
}

/**
 * Generate all recommendations
 *
 * @param graph Link graph
 * @param allPages All Builder.io pages
 * @returns Complete recommendation report
 */
export function generateRecommendations(
  graph: LinkGraph,
  allPages: BuilderPage[]
): RecommendationReport {
  // Find issues
  const orphans = findOrphanPages(graph, false, true)
  const shallow = findShallowPages(graph, 2, true)
  const deep = findDeepPages(graph, 3)

  // Generate recommendations
  const orphanRecommendations = generateOrphanRecommendations(orphans, graph, allPages)
  const shallowRecommendations = generateShallowRecommendations(shallow, graph, allPages)
  const deepRecommendations = generateDeepRecommendations(deep, graph, allPages)

  // Calculate summary
  const allRecs = [
    ...orphanRecommendations,
    ...shallowRecommendations,
    ...deepRecommendations
  ]

  const summary = {
    totalRecommendations: allRecs.length,
    highPriority: allRecs.filter(r => r.priority === 'high').length,
    mediumPriority: allRecs.filter(r => r.priority === 'medium').length,
    lowPriority: allRecs.filter(r => r.priority === 'low').length
  }

  return {
    orphanRecommendations,
    shallowRecommendations,
    deepRecommendations,
    summary
  }
}

/**
 * Format recommendations as text
 *
 * @param recommendations Recommendation report
 * @returns Formatted text
 */
export function formatRecommendations(recommendations: RecommendationReport): string {
  let output = '\n💡 SEO RECOMMENDATIONS\n\n'

  output += `Total: ${recommendations.summary.totalRecommendations} recommendations\n`
  output += `  • High Priority: ${recommendations.summary.highPriority}\n`
  output += `  • Medium Priority: ${recommendations.summary.mediumPriority}\n`
  output += `  • Low Priority: ${recommendations.summary.lowPriority}\n\n`

  // Orphan recommendations
  if (recommendations.orphanRecommendations.length > 0) {
    output += `🚨 ORPHAN PAGES (${recommendations.orphanRecommendations.length}):\n\n`

    recommendations.orphanRecommendations.forEach(rec => {
      output += `  ${rec.page} (${rec.pageTitle})\n`
      output += `  Aktion: Füge Links hinzu von:\n`

      rec.suggestions.forEach(sug => {
        output += `    • ${sug.url} - ${sug.reason} (Confidence: ${sug.confidence}%)\n`
      })

      output += '\n'
    })
  }

  // Shallow recommendations
  if (recommendations.shallowRecommendations.length > 0) {
    output += `📄 SHALLOW PAGES (${recommendations.shallowRecommendations.length}):\n\n`

    recommendations.shallowRecommendations.slice(0, 5).forEach(rec => {
      output += `  ${rec.page}\n`
      output += `  Aktion: Füge Links hinzu zu:\n`

      rec.suggestions.slice(0, 3).forEach(sug => {
        output += `    • ${sug.url} - ${sug.reason}\n`
      })

      output += '\n'
    })

    if (recommendations.shallowRecommendations.length > 5) {
      output += `  ... und ${recommendations.shallowRecommendations.length - 5} weitere\n\n`
    }
  }

  // Deep recommendations
  if (recommendations.deepRecommendations.length > 0) {
    output += `🔽 DEEP PAGES (${recommendations.deepRecommendations.length}):\n\n`

    recommendations.deepRecommendations.slice(0, 5).forEach(rec => {
      output += `  ${rec.page}\n`
      output += `  Aktion: Füge Links hinzu von:\n`

      rec.suggestions.slice(0, 3).forEach(sug => {
        output += `    • ${sug.url} - ${sug.reason}\n`
      })

      output += '\n'
    })

    if (recommendations.deepRecommendations.length > 5) {
      output += `  ... und ${recommendations.deepRecommendations.length - 5} weitere\n\n`
    }
  }

  return output
}
