'use client'

import React, { useEffect, useState } from 'react'
import { CustomCodeSnippet, getCustomCodeSnippets } from '@/lib/laravel-api'

export function CustomCodeInjector() {
  const [snippets, setSnippets] = useState<CustomCodeSnippet[]>([])

  useEffect(() => {
    // Fetch live active snippets on mount
    getCustomCodeSnippets(true)
      .then((data) => {
        if (Array.isArray(data)) {
          setSnippets(data)
        }
      })
      .catch((err) => {
        console.error('Failed to load custom code snippets:', err)
      })
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined' || !snippets.length) return

    const appliedIds = new Set<string>()

    snippets.forEach((snip) => {
      if (!snip.isActive || !snip.code?.trim()) return

      const elementId = `custom-code-${snip.id}`
      appliedIds.add(elementId)

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

    // Cleanup: remove any previously applied elements that are now inactive or deleted
    return () => {
      // (Styles update in-place; elements tagged with custom-code can be cleaned up on unmount)
    }
  }, [snippets])

  return null
}
