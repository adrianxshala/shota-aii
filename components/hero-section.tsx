"use client"

import { InteractiveBrain } from "./interactive-brain"
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const heroViewport = { once: true, amount: 0.2 }

export function HeroSection() {
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const contentInView = useInView(sectionRef, heroViewport)

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
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Interactive brain canvas */}
      <div className="absolute inset-0">
        <InteractiveBrain />
      </div>

      {/* Content - positioned lower on mobile/tablet for a more professional layout */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-5rem)] min-h-[calc(100vh-5rem)] max-w-7xl flex-col justify-center px-4 pb-20 pt-80 sm:px-6 sm:pb-16 sm:pt-36 md:min-h-screen md:py-0">
        <div className="grid w-full gap-6 sm:gap-8 lg:grid-cols-2">
          {/* Left text content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Badge - cute fade up */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
              className="mb-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs text-primary sm:mb-6 sm:gap-2 sm:px-4 sm:py-1.5 sm:text-sm"
            >
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Web & AI Innovation</span>
            </motion.div>

            {/* H1 - blur to sharp (like text revealing / being written) */}
            <motion.h1
              initial={{ opacity: 0, filter: "blur(12px)" }}
              animate={contentInView ? { opacity: 1, filter: "blur(0px)" } : {}}
              transition={{ duration: 1.25, delay: 0.25, ease: [0.33, 1, 0.68, 1] }}
              className="font-display text-[2rem] font-bold leading-[1.15] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
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
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.95, delay: 0.55, ease: [0.33, 1, 0.68, 1] }}
              className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground sm:mt-5 sm:max-w-md sm:text-lg"
            >
              Empowering Web & AI Innovation
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.85, ease: [0.33, 1, 0.68, 1] }}
              className="mt-7 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:gap-4"
            >
              <a
                ref={ctaRef}
                href="/projects"
                className="group relative inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_0_30px_-6px_rgba(0,180,255,0.3)] transition-[box-shadow,transform] duration-200 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:rounded-full sm:px-7 sm:py-3.5"
                style={{
                  backgroundImage: "linear-gradient(120deg, hsl(199 89% 48%), hsl(187 85% 55%), hsl(199 89% 48%))",
                  backgroundSize: "200% auto",
                }}
              >
                Explore Platform
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <a
                href="/about"
                className="inline-flex items-center justify-center rounded-2xl border border-primary/20 px-5 py-3.5 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/50 hover:text-primary hover:shadow-[0_0_20px_rgba(0,180,255,0.15)] active:scale-[0.98] sm:rounded-full sm:px-7 sm:py-3.5"
              >
                Learn More
              </a>
            </motion.div>

            {/* Trust line - soft fade */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={contentInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 1.15, ease: [0.33, 1, 0.68, 1] }}
              className="mt-8 text-xs text-muted-foreground/80 sm:mt-10 sm:text-sm"
            >
              Trusted by teams building the next generation of apps.
            </motion.p>
          </div>

          {/* Right side - space for the interactive brain */}
          <div className="hidden lg:block" aria-hidden="true" />
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={contentInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.4, ease: [0.33, 1, 0.68, 1] }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-muted-foreground sm:flex sm:bottom-8 sm:gap-2"
        >
          <span className="text-[10px] font-medium uppercase tracking-widest sm:text-xs">Scroll</span>
          <ChevronDown className="h-5 w-5 animate-scroll-bounce sm:h-6 sm:w-6" aria-hidden />
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none sm:h-32" />
    </section>
  )
}
