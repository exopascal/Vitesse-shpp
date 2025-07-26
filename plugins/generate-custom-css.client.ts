/**
 * Client-Plugin für Design Token CSS Generation
 * Lädt Design Tokens von Builder.io beim App-Start und schreibt CSS direkt in den DOM
 */

import { fetchOneEntry } from '@builder.io/sdk-vue'

interface DesignTokens {
  colors?: any
  typography?: any
  spacing?: any
  sizing?: any
  borderRadius?: any
  shadows?: any
  zIndex?: any
  transitions?: any
  components?: any
}

export default defineNuxtPlugin(async () => {
  // Nur im Client ausführen
  if (process.server) return

  const config = useRuntimeConfig()
  const apiKey = config.public.BUILDER_API_KEY as string

  if (!apiKey) {
    console.warn('[Design Tokens] No Builder.io API key found')
    return
  }

  try {
    // Design Tokens von Builder.io laden
    const builderContent = await fetchOneEntry({
      model: 'design-tokens',
      apiKey: apiKey,
      options: {
        includeRefs: true
      }
    })

    if (!builderContent?.data) {
      return
    }

    // Die Tokens können in verschiedenen Strukturen kommen
    let tokens: DesignTokens
    
    if (builderContent.data.tokens?.tokens) {
      // Structure: { tokens: { tokens: {...}, metadata: {...} } }
      tokens = builderContent.data.tokens.tokens
    } else if (builderContent.data.tokens) {
      // Structure: { tokens: {...} }
      tokens = builderContent.data.tokens
    } else {
      // Direct structure: {...}
      tokens = builderContent.data as DesignTokens
    }
    
    if (!tokens || typeof tokens !== 'object') {
      console.log('[Design Tokens] Invalid token structure')
      return
    }
    // CSS generieren
    const css = generateTokenCSS(tokens)
    
    // CSS in den DOM einfügen
    injectCSS(css)
  } catch (error) {
    console.error('[Design Tokens] Error loading tokens:', error)
  }
})

/**
 * CSS aus Design Tokens generieren
 */
function generateTokenCSS(tokens: DesignTokens): string {
  const cssRules: string[] = []
  
  cssRules.push('/* Generated Design Tokens from Builder.io */')
  cssRules.push(':root {')

  // Colors
  if (tokens.colors) {
    cssRules.push('  /* === COLORS === */')
    generateColorCSS(tokens.colors, cssRules)
  }

  // Typography
  if (tokens.typography) {
    cssRules.push('  /* === TYPOGRAPHY === */')
    generateTypographyCSS(tokens.typography, cssRules)
  }

  // Spacing
  if (tokens.spacing) {
    cssRules.push('  /* === SPACING === */')
    generateSpacingCSS(tokens.spacing, 'space', cssRules)
  }

  // Sizing
  if (tokens.sizing) {
    cssRules.push('  /* === SIZING === */')
    generateSpacingCSS(tokens.sizing, 'size', cssRules)
  }

  // Border Radius
  if (tokens.borderRadius) {
    cssRules.push('  /* === BORDER RADIUS === */')
    generateBorderRadiusCSS(tokens.borderRadius, cssRules)
  }

  // Shadows
  if (tokens.shadows) {
    cssRules.push('  /* === SHADOWS === */')
    generateShadowCSS(tokens.shadows, cssRules)
  }

  // Z-Index
  if (tokens.zIndex) {
    cssRules.push('  /* === Z-INDEX === */')
    generateZIndexCSS(tokens.zIndex, cssRules)
  }

  // Transitions
  if (tokens.transitions) {
    cssRules.push('  /* === TRANSITIONS === */')
    generateTransitionCSS(tokens.transitions, cssRules)
  }

  // Components
  if (tokens.components) {
    cssRules.push('  /* === COMPONENTS === */')
    generateComponentCSS(tokens.components, cssRules)
  }

  cssRules.push('}')
  cssRules.push('')
  cssRules.push(`/* Generated at: ${new Date().toISOString()} */`)

  console.log('[Design Tokens] Generated CSS:', cssRules.join('\n'))

  return cssRules.join('\n')
}

/**
 * Color CSS generieren
 */
function generateColorCSS(colors: any, cssRules: string[]) {
  // Primary Colors
  if (colors.primary) {
    cssRules.push('  /* Primary Colors */')
    Object.entries(colors.primary).forEach(([key, value]) => {
      if (value) {
        cssRules.push(`  --color-primary-${key}: ${value} !important;`)
      }
    })
  }

  // Secondary Colors
  if (colors.secondary) {
    cssRules.push('  /* Secondary Colors */')
    Object.entries(colors.secondary).forEach(([key, value]) => {
      if (value) {
        cssRules.push(`  --color-secondary-${key}: ${value} !important;`)
      }
    })
  }

  // Neutral Colors
  if (colors.neutral) {
    cssRules.push('  /* Neutral Colors */')
    Object.entries(colors.neutral).forEach(([key, value]) => {
      if (value) {
        cssRules.push(`  --color-neutral-${key}: ${value} !important;`)
      }
    })
  }

  // Semantic Colors
  const semanticColors = ['success', 'warning', 'error', 'info']
  semanticColors.forEach(colorName => {
    if (colors[colorName]) {
      cssRules.push(`  /* ${colorName.charAt(0).toUpperCase() + colorName.slice(1)} Colors */`)
      Object.entries(colors[colorName]).forEach(([key, value]) => {
        if (value) {
          cssRules.push(`  --color-${colorName}-${key}: ${value} !important;`)
        }
      })
    }
  })

  // Background Colors
  if (colors.background) {
    cssRules.push('  /* Background Colors */')
    Object.entries(colors.background).forEach(([key, value]) => {
      if (value) {
        cssRules.push(`  --color-background-${key}: ${value} !important;`)
      }
    })
  }

  // Text Colors
  if (colors.text) {
    cssRules.push('  /* Text Colors */')
    Object.entries(colors.text).forEach(([key, value]) => {
      if (value) {
        const cssKey = key === 'linkHover' ? 'link-hover' : key
        cssRules.push(`  --color-text-${cssKey}: ${value} !important;`)
      }
    })
  }

  // Border Colors
  if (colors.border) {
    cssRules.push('  /* Border Colors */')
    Object.entries(colors.border).forEach(([key, value]) => {
      if (value) {
        cssRules.push(`  --color-border-${key}: ${value} !important;`)
      }
    })
  }
}

/**
 * Typography CSS generieren
 */
function generateTypographyCSS(typography: any, cssRules: string[]) {
  if (typography.fontFamily) {
    cssRules.push('  /* Font Families */')
    Object.entries(typography.fontFamily).forEach(([key, value]) => {
      if (value) {
        cssRules.push(`  --font-family-${key}: ${value} !important;`)
      }
    })
  }

  if (typography.fontSize) {
    cssRules.push('  /* Font Sizes */')
    Object.entries(typography.fontSize).forEach(([key, value]) => {
      if (value) {
        cssRules.push(`  --font-size-${key}: ${value} !important;`)
      }
    })
  }

  if (typography.fontWeight) {
    cssRules.push('  /* Font Weights */')
    Object.entries(typography.fontWeight).forEach(([key, value]) => {
      if (value) {
        cssRules.push(`  --font-weight-${key}: ${value} !important;`)
      }
    })
  }

  if (typography.lineHeight) {
    cssRules.push('  /* Line Heights */')
    Object.entries(typography.lineHeight).forEach(([key, value]) => {
      if (value) {
        cssRules.push(`  --line-height-${key}: ${value} !important;`)
      }
    })
  }

  if (typography.letterSpacing) {
    cssRules.push('  /* Letter Spacing */')
    Object.entries(typography.letterSpacing).forEach(([key, value]) => {
      if (value) {
        cssRules.push(`  --letter-spacing-${key}: ${value} !important;`)
      }
    })
  }
}

/**
 * Spacing/Sizing CSS generieren
 */
function generateSpacingCSS(spacing: any, prefix: string, cssRules: string[]) {
  if (spacing && typeof spacing === 'object') {
    Object.entries(spacing).forEach(([key, value]) => {
      if (value) {
        cssRules.push(`  --${prefix}-${key}: ${value} !important;`)
      }
    })
  }
}

/**
 * Border Radius CSS generieren
 */
function generateBorderRadiusCSS(borderRadius: any, cssRules: string[]) {
  if (borderRadius && typeof borderRadius === 'object') {
    Object.entries(borderRadius).forEach(([key, value]) => {
      if (value) {
        cssRules.push(`  --border-radius-${key}: ${value} !important;`)
      }
    })
  }
}

/**
 * Shadow CSS generieren
 */
function generateShadowCSS(shadows: any, cssRules: string[]) {
  if (shadows && typeof shadows === 'object') {
    Object.entries(shadows).forEach(([key, value]) => {
      if (value) {
        cssRules.push(`  --shadow-${key}: ${value} !important;`)
      }
    })
  }
}

/**
 * Z-Index CSS generieren
 */
function generateZIndexCSS(zIndex: any, cssRules: string[]) {
  if (zIndex && typeof zIndex === 'object') {
    Object.entries(zIndex).forEach(([key, value]) => {
      if (value) {
        cssRules.push(`  --z-index-${key}: ${value} !important;`)
      }
    })
  }
}

/**
 * Transition CSS generieren
 */
function generateTransitionCSS(transitions: any, cssRules: string[]) {
  if (transitions && typeof transitions === 'object') {
    if (transitions.duration && typeof transitions.duration === 'object') {
      cssRules.push('  /* Transition Durations */')
      Object.entries(transitions.duration).forEach(([key, value]) => {
        if (value) {
          cssRules.push(`  --transition-duration-${key}: ${value} !important;`)
        }
      })
    }

    if (transitions.timing && typeof transitions.timing === 'object') {
      cssRules.push('  /* Transition Timings */')
      Object.entries(transitions.timing).forEach(([key, value]) => {
        if (value) {
          const cssKey = key === 'inOut' ? 'in-out' : key
          cssRules.push(`  --transition-timing-${cssKey}: ${value} !important;`)
        }
      })
    }
  }
}

/**
 * Component CSS generieren
 */
function generateComponentCSS(components: any, cssRules: string[]) {
  if (components && typeof components === 'object') {
    Object.entries(components).forEach(([componentName, componentTokens]) => {
      if (componentTokens && typeof componentTokens === 'object') {
        cssRules.push(`  /* ${componentName.charAt(0).toUpperCase() + componentName.slice(1)} Component */`)
        
        Object.entries(componentTokens).forEach(([tokenKey, tokenValue]) => {
          if (tokenValue !== null && tokenValue !== undefined) {
            if (typeof tokenValue === 'object') {
              Object.entries(tokenValue).forEach(([subKey, subValue]) => {
                if (subValue) {
                  cssRules.push(`  --${componentName}-${tokenKey}-${subKey}: ${subValue};`)
                }
              })
            } else {
              const cssKey = tokenKey === 'paddingX' ? 'padding-x' : 
                            tokenKey === 'borderWidth' ? 'border-width' : tokenKey
              cssRules.push(`  --${componentName}-${cssKey}: ${tokenValue};`)
            }
          }
        })
      }
    })
  }
}

/**
 * CSS in den DOM einfügen mit höchster Priorität + direkte Klassen-Overrides
 */
function injectCSS(css: string) {
  // Vorherige Builder.io CSS entfernen
  const existingStyle = document.getElementById('builder-design-tokens')
  if (existingStyle) {
    existingStyle.remove()
  }

  // Neues Style-Element erstellen
  const style = document.createElement('style')
  style.id = 'builder-design-tokens'
  
  style.textContent = css
  
  // CSS mit höchster Priorität einfügen (am Ende des head)
  document.head.appendChild(style)
}