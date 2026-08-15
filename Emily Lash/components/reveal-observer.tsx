'use client'

import { useEffect } from 'react'

export function RevealObserver() {
  useEffect(() => {
    document.documentElement.classList.add('js-ready')

    const elements = Array.from(document.querySelectorAll('.reveal'))

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in')
              io.unobserve(e.target)
            }
          })
        },
        { threshold: 0.15 },
      )
      elements.forEach((el) => io.observe(el))
      return () => io.disconnect()
    } else {
      elements.forEach((el) => el.classList.add('in'))
    }
  }, [])

  return null
}
