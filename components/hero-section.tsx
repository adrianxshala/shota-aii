"use client"

import { InteractiveBrain } from "./interactive-brain"
import { ArrowRight, MousePointerClick } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background pt-20">
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
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6">
        <div className="grid w-full gap-8 lg:grid-cols-2">
          {/* Left text content */}
          <div className="flex flex-col justify-center">
            <h1 className="font-display text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
              <span className="text-balance">
                Future of{" "}
                <span className="text-primary">Intelligence</span>
              </span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">
              Empowering Web & AI Innovation
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#platform"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
              >
                Explore Platform
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:text-primary"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Right side - space for the interactive brain */}
          <div className="hidden lg:block" aria-hidden="true" />
        </div>
      </div>

      {/* Interaction hint */}
      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2">
        <div className="flex items-center gap-2 rounded-full border border-border/50 bg-secondary/60 px-4 py-2 text-xs text-muted-foreground backdrop-blur-sm">
          <MousePointerClick className="h-3.5 w-3.5" />
          <span>Click to send energy waves -- Double-click to toggle attract mode</span>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
