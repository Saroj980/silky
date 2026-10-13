'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { CustomCodeSnippet, getCustomCodeSnippets, getSiteConfig } from '@/lib/laravel-api'

function matchesPage(targetPage: string | undefined, currentPath: string): boolean {
  if (!targetPage || targetPage === 'all') return true
  const cleanCurrent = (currentPath || '/').trim()
  if (targetPage === '/' && (cleanCurrent === '/' || cleanCurrent === '')) return true
  if (targetPage === '/products/*' && cleanCurrent.startsWith('/products')) return true

  // Normalize leading slash for comparison
  const normTarget = targetPage.startsWith('/') ? targetPage : `/${targetPage}`
  const normCurrent = cleanCurrent.startsWith('/') ? cleanCurrent : `/${cleanCurrent}`

  return normTarget === normCurrent
}

const FONT_MAP: Record<string, { family: string; googleQuery: string }> = {
  montserrat: { family: "'Montserrat', sans-serif", googleQuery: 'family=Montserrat:wght@400;600;700;800;900' },
  poppins: { family: "'Poppins', sans-serif", googleQuery: 'family=Poppins:wght@400;500;600;700;800' },
  playfair: { family: "'Playfair Display', serif", googleQuery: 'family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,400' },
  cinzel: { family: "'Cinzel', serif", googleQuery: 'family=Cinzel:wght@500;700;800;900' },
  cormorant: { family: "'Cormorant Garamond', serif", googleQuery: 'family=Cormorant+Garamond:wght@500;600;700' },
  inter: { family: "'Inter', sans-serif", googleQuery: 'family=Inter:wght@400;500;600;700;800' },
  jakarta: { family: "'Plus Jakarta Sans', sans-serif", googleQuery: 'family=Plus+Jakarta+Sans:wght@500;600;700;800' },
  outfit: { family: "'Outfit', sans-serif", googleQuery: 'family=Outfit:wght@500;600;700;800' },
  roboto: { family: "'Roboto', sans-serif", googleQuery: 'family=Roboto:wght@400;500;700' },
  'open-sans': { family: "'Open Sans', sans-serif", googleQuery: 'family=Open+Sans:wght@400;600;700' },
}

export function CustomCodeInjector() {
  const [snippets, setSnippets] = useState<CustomCodeSnippet[]>([])
  const pathname = usePathname() || '/'

  // 1. Load active custom code snippets
  useEffect(() => {
    let isMounted = true
    getCustomCodeSnippets(true)
      .then((data) => {
        if (isMounted && Array.isArray(data)) {
          setSnippets(data)
        }
      })
      .catch((err) => {
        console.error('Failed to load custom code snippets:', err)
      })

    return () => {
      isMounted = false
    }
  }, [])

  // 2. Load global site fonts & typography selected from Theme & Header CMS
  useEffect(() => {
    let isMounted = true
    getSiteConfig()
      .then((cfg) => {
        if (!isMounted || !cfg || typeof document === 'undefined') return
        const customUrlRaw = (cfg.customFontUrl || '').trim()
        const customFamily = (cfg.customFontFamily || '').trim()
        const headingKey = String(cfg.headingFont || 'inter').toLowerCase()
        const bodyKey = String(cfg.bodyFont || 'inter').toLowerCase()
        const headingFont = FONT_MAP[headingKey] || FONT_MAP.inter
        const bodyFont = FONT_MAP[bodyKey] || FONT_MAP.inter

        // Load Preset Google Fonts if needed
        const fontsToLoad = Array.from(new Set([headingFont.googleQuery, bodyFont.googleQuery])).join('&')
        const linkId = 'global-typography-font-link'
        let fontLink = document.getElementById(linkId) as HTMLLinkElement | null
        if (!fontLink) {
          fontLink = document.createElement('link')
          fontLink.id = linkId
          fontLink.rel = 'stylesheet'
          document.head.appendChild(fontLink)
        }
        fontLink.href = `https://fonts.googleapis.com/css2?${fontsToLoad}&display=swap`

        // Load Custom Google Font URL if provided
        if (customUrlRaw) {
          let cleanUrl = customUrlRaw
          const urlMatch = customUrlRaw.match(/https?:\/\/[^\s"'\)]+/)
          if (urlMatch) {
            cleanUrl = urlMatch[0]
          }
          const customLinkId = 'custom-google-font-link'
          let customFontLink = document.getElementById(customLinkId) as HTMLLinkElement | null
          if (!customFontLink) {
            customFontLink = document.createElement('link')
            customFontLink.id = customLinkId
            customFontLink.rel = 'stylesheet'
            document.head.appendChild(customFontLink)
          }
          customFontLink.href = cleanUrl
        }

        // Determine effective font families
        const effectiveHeadingFamily = (headingKey === 'custom' && customFamily) ? customFamily : headingFont.family
        const effectiveBodyFamily = (bodyKey === 'custom' && customFamily) ? customFamily : bodyFont.family

        // Inject global font rules into head
        const styleId = 'global-site-typography-style'
        let fontStyle = document.getElementById(styleId) as HTMLStyleElement | null
        if (!fontStyle) {
          fontStyle = document.createElement('style')
          fontStyle.id = styleId
          document.head.appendChild(fontStyle)
        }
        fontStyle.textContent = `
          :root {
            --site-heading-font: ${effectiveHeadingFamily};
            --site-body-font: ${effectiveBodyFamily};
          }
          h1, h2, h3, h4, h5, h6, .font-serif, .font-heading {
            font-family: var(--site-heading-font) !important;
          }
          body, p, span, li, button, input {
            font-family: var(--site-body-font) !important;
          }
        `
      })
      .catch(() => {})

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined' || !snippets.length) return

    snippets.forEach((snip) => {
      const elementId = `custom-code-${snip.id}`
      const isTargetPage = matchesPage(snip.targetPage, pathname)

      // If snippet is inactive or does not match current page, clean it up if present
      if (!snip.isActive || !snip.code?.trim() || !isTargetPage) {
        const existing = document.getElementById(elementId)
        if (existing) existing.remove()

        // Also clean up multi-node html tags if any
        document.querySelectorAll(`[id^="${elementId}-"]`).forEach((el) => el.remove())
        return
      }

      // ─── 1. CSS ─────────────────────────────────────────────────────────────
      if (snip.codeType === 'css') {
        let existing = document.getElementById(elementId) as HTMLStyleElement | null
        if (!existing) {
          existing = document.createElement('style')
          existing.id = elementId
          existing.setAttribute('data-custom-code', 'css')
          document.head.appendChild(existing)
        }

        let cssContent = snip.code
        if (snip.targetDevice === 'mobile') {
          cssContent = `@media (max-width: 768px) {\n${snip.code}\n}`
        } else if (snip.targetDevice === 'desktop') {
          cssContent = `@media (min-width: 769px) {\n${snip.code}\n}`
        }

        existing.textContent = cssContent
        return
      }

      // ─── 2. JavaScript ──────────────────────────────────────────────────────
      if (snip.codeType === 'js') {
        // Only inject once per unique script run
        if (!document.getElementById(elementId)) {
          const script = document.createElement('script')
          script.id = elementId
          script.setAttribute('data-custom-code', 'js')
          script.text = snip.code

          if (snip.placement === 'footer') {
            document.body.appendChild(script)
          } else {
            document.head.appendChild(script)
          }
        }
        return
      }

      // ─── 3. HTML (Meta tags, Google Verification, GTM, etc.) ────────────────
      if (snip.codeType === 'html') {
        let container = document.getElementById(elementId)
        if (!container) {
          // Parse the HTML string into DOM nodes
          const parser = new DOMParser()
          const doc = parser.parseFromString(snip.code, 'text/html')

          // Extract head elements and body elements
          const headNodes = Array.from(doc.head.children)
          const bodyNodes = Array.from(doc.body.children)
          const allNodes = [...headNodes, ...bodyNodes]

          const targetParent = snip.placement === 'footer' ? document.body : document.head

          allNodes.forEach((node, idx) => {
            const nodeId = `${elementId}-${idx}`
            if (document.getElementById(nodeId)) return

            // If it's a script tag, create fresh script so browser executes it
            if (node.tagName.toLowerCase() === 'script') {
              const newScript = document.createElement('script')
              newScript.id = nodeId
              newScript.setAttribute('data-custom-code', 'html-script')
              Array.from(node.attributes).forEach((attr) => {
                newScript.setAttribute(attr.name, attr.value)
              })
              newScript.text = node.textContent || ''
              targetParent.appendChild(newScript)
            } else {
              // Meta, link, noscript, etc.
              const clone = node.cloneNode(true) as HTMLElement
              clone.id = nodeId
              clone.setAttribute('data-custom-code', 'html-tag')
              targetParent.appendChild(clone)
            }
          })
        }
      }
    })
  }, [snippets, pathname])

  return null
}
