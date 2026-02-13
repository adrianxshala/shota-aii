"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { label: "Home", href: "#", active: true },
  { label: "Solutions", href: "#", dropdown: true },
  { label: "AI Platform", href: "#", dropdown: true },
  { label: "About", href: "#about" },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 safe-top"
      >
        <div className="mx-auto max-w-7xl px-3 pt-2 sm:px-6 sm:pt-3">
          <div className="rounded-2xl border border-primary/20 bg-background/80 shadow-[0_0_40px_-12px_rgba(0,180,255,0.1)] backdrop-blur-xl">
            <div className="flex items-center justify-between px-4 py-2.5 sm:px-6 sm:py-3">
              {/* Logo */}
              <a href="#" className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt=""
                  width={160}
                  height={40}
                  className="h-7 w-auto object-contain sm:h-8"
                  priority
                />
                <span className="font-display text-lg sm:text-xl">
                  <span className="font-bold text-white">Shota</span>
                  <span className="font-light text-primary"> Ai</span>
                </span>
              </a>

              {/* Desktop Nav */}
              <nav
                className="hidden items-center gap-8 md:flex"
                aria-label="Main navigation"
              >
                {navLinks.map((link) =>
                  link.dropdown ? (
                    <button
                      key={link.label}
                      className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label} <ChevronDown className="h-3 w-3" />
                    </button>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      className={`text-sm font-medium transition-colors hover:text-primary ${
                        link.active ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {link.label}
                    </a>
                  )
                )}
              </nav>

              {/* CTA */}
              <a
                href="#contact"
                className="hidden rounded-full border border-primary/20 bg-primary/10 px-5 py-2 text-sm font-medium text-primary shadow-[0_0_20px_-6px_rgba(0,180,255,0.15)] transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_20px_-4px_rgba(0,180,255,0.3)] md:inline-flex"
              >
                Contact
              </a>

              {/* Mobile Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="relative z-50 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors active:scale-95 md:hidden"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Full-screen mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />

            {/* Menu content */}
            <nav
              className="relative flex h-full flex-col justify-center px-8 safe-top safe-bottom"
              aria-label="Mobile navigation"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`flex items-center justify-between rounded-2xl px-5 py-4 text-2xl font-semibold transition-colors active:bg-primary/5 ${
                      link.active
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {link.label}
                    {link.dropdown && (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </motion.a>
                ))}
              </div>

              {/* Mobile CTA */}
              <motion.a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: navLinks.length * 0.05 }}
                className="mt-8 flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-lg font-semibold text-primary-foreground shadow-[0_0_30px_-6px_rgba(0,180,255,0.3)] transition-all active:scale-[0.98]"
              >
                Get in Touch
                <ArrowRight className="h-5 w-5" />
              </motion.a>

              {/* Bottom info */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="mt-auto pb-8 text-center text-xs text-muted-foreground"
              >
                Shota AI &middot; Future of Intelligence
              </motion.p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
