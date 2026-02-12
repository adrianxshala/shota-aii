"use client"

import { useState } from "react"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt=""
            width={160}
            height={40}
            className="h-8 w-auto object-contain"
            priority
          />
          <span className="font-display text-xl">
            <span className="font-bold text-white">Shota</span>
            <span className="font-light text-primary"> Ai</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          <a href="#" className="text-sm font-medium text-primary transition-colors hover:text-primary">
            Home
          </a>
          <button className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground">
            Solutions <ChevronDown className="h-3 w-3" />
          </button>
          <button className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground">
            AI Platform <ChevronDown className="h-3 w-3" />
          </button>
          <a href="#about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            About
          </a>
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden rounded-full border border-primary/50 bg-primary/10 px-5 py-2 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground md:inline-flex"
        >
          Contact
        </a>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-foreground md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="border-t border-border/50 bg-background px-6 py-4 md:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-4">
            <a href="#" className="text-sm font-medium text-primary">Home</a>
            <a href="#" className="text-sm text-muted-foreground">Solutions</a>
            <a href="#" className="text-sm text-muted-foreground">AI Platform</a>
            <a href="#about" className="text-sm text-muted-foreground">About</a>
            <a
              href="#contact"
              className="mt-2 inline-flex justify-center rounded-full border border-primary/50 bg-primary/10 px-5 py-2 text-sm font-medium text-primary"
            >
              Contact
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
