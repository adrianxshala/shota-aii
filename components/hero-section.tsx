"use client"

import { InteractiveBrain } from "./interactive-brain"
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react"
import { useState, useRef, useEffect } from "react"

const HERO_STAGGER = 120

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const btn = ctaRef.current
    if (!btn || !sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    const moveX = x * 12
    const moveY = y * 8
    btn.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`
  }

  const handleMouseLeave = () => {
    if (ctaRef.current) {
      ctaRef.current.style.transform = "translate(0, 0) scale(1)"
    }
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100dvh] min-h-screen overflow-hidden bg-background pt-20 pb-24 sm:pb-20"
    >
      {/* Background circuit pattern overlay */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 180, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 180, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Interactive brain canvas */}
      <div className="absolute inset-0">
        <InteractiveBrain />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-5rem)] min-h-[calc(100vh-5rem)] max-w-7xl flex-col justify-center px-4 py-10 sm:px-6 sm:py-12 md:min-h-screen md:py-0">
        <div className="grid w-full gap-6 sm:gap-8 lg:grid-cols-2">
          {/* Left text content */}
          <div className="flex flex-col justify-center">
            {/* Badge */}
            <div
              className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs text-primary sm:mb-6 sm:gap-2 sm:px-4 sm:py-1.5 sm:text-sm"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                transitionDelay: "0ms",
              }}
            >
              <Sparkles className="h-4 w-4" />
              <span>Web & AI Innovation</span>
            </div>

            <h1
              className="font-display text-4xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                transitionDelay: mounted ? `${HERO_STAGGER}ms` : "0ms",
              }}
            >
              <span className="text-balance block">
                Future of{" "}
                <span
                  className="inline-block bg-clip-text text-transparent animate-hero-shimmer"
                  style={{
                    backgroundImage:
                      "linear-gradient(120deg, hsl(199 89% 48%), hsl(187 85% 55%), hsl(199 89% 48%))",
                    backgroundSize: "200% auto",
                  }}
                >
                  Intelligence
                </span>
              </span>
            </h1>

            <p
              className="mt-4 max-w-md text-base text-muted-foreground sm:mt-5 sm:text-lg"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                transitionDelay: mounted ? `${HERO_STAGGER * 2}ms` : "0ms",
              }}
            >
              Empowering Web & AI Innovation
            </p>

            <div
              className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                transitionDelay: mounted ? `${HERO_STAGGER * 3}ms` : "0ms",
              }}
            >
              <a
                ref={ctaRef}
                href="#platform"
                className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-[box-shadow,background-color] duration-200 hover:shadow-lg hover:shadow-primary/30 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-7 sm:py-3.5"
              >
                Explore Platform
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/50 hover:text-primary hover:shadow-[0_0_20px_rgba(0,180,255,0.15)] sm:px-7 sm:py-3.5"
              >
                Learn More
              </a>
            </div>

            {/* Subtle trust line */}
            <p
              className="mt-6 text-xs text-muted-foreground/80 sm:mt-10 sm:text-sm"
              style={{
                opacity: mounted ? 1 : 0,
                transition: "opacity 0.8s ease",
                transitionDelay: mounted ? `${HERO_STAGGER * 4}ms` : "0ms",
              }}
            >
              Trusted by teams building the next generation of apps.
            </p>
          </div>

          {/* Right side - space for the interactive brain */}
          <div className="hidden lg:block" aria-hidden="true" />
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-muted-foreground sm:bottom-8 sm:gap-2"
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 1s ease",
            transitionDelay: "800ms",
          }}
        >
          <span className="text-[10px] font-medium uppercase tracking-widest sm:text-xs">Scroll</span>
          <ChevronDown className="h-5 w-5 animate-scroll-bounce sm:h-6 sm:w-6" aria-hidden />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none sm:h-32" />
    </section>
  )
}
