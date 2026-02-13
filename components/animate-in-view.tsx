"use client"

import { useRef, useState, useEffect, type ReactNode } from "react"

type AnimateInViewProps = {
  children: ReactNode
  className?: string
}

/** Lightweight: when in view adds class so CSS can run cute fade-up. No Framer Motion. */
export function AnimateInView({ children, className = "" }: AnimateInViewProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setInView(true)
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`group ${inView ? "in-view" : ""} ${className}`.trim()}
    >
      {children}
    </div>
  )
}
