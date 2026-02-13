"use client"

import { motion } from "framer-motion"

const footerLinks = [
  {
    title: "Solutions",
    links: [
      { label: "Web Development", href: "#" },
      { label: "AI Integration", href: "#" },
      { label: "Automation", href: "#" },
      { label: "Consulting", href: "#" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative bg-background py-10 sm:py-16 safe-bottom" id="footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/[0.03] shadow-[0_0_40px_-12px_rgba(0,180,255,0.1)] backdrop-blur-xl md:rounded-3xl"
        >
          <div className="relative p-5 sm:p-8 md:p-10">
            {/* Diamond accent */}
            <svg
              className="absolute right-5 top-5 h-10 w-10 text-primary/30 sm:right-8 sm:top-8 sm:h-12 sm:w-12 md:right-10 md:top-10"
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path
                d="M 8 24 L 24 8 L 40 24 L 24 40 Z"
                strokeDasharray="1 1"
                strokeDashoffset="0"
                opacity="0.9"
              />
            </svg>

            {/* Brand - centered on mobile */}
            <div className="mb-8 text-center sm:mb-0 sm:text-left">
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <span className="text-sm font-bold text-primary-foreground">
                    S
                  </span>
                </div>
                <span className="font-display text-lg font-bold text-foreground">
                  Shota AI
                </span>
              </div>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground sm:mx-0">
                Empowering businesses through intelligent solutions and
                cutting-edge technology.
              </p>
            </div>

            {/* Link columns - horizontal scroll on mobile, grid on desktop */}
            <div className="mt-6 grid grid-cols-3 gap-6 sm:mt-8 sm:grid-cols-3 sm:gap-8 md:grid-cols-4">
              {/* Empty spacer for desktop to match 4-col layout */}
              <div className="hidden md:block" />

              {footerLinks.map((group) => (
                <div key={group.title}>
                  <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground sm:mb-4 sm:text-sm sm:tracking-normal sm:normal-case">
                    {group.title}
                  </h4>
                  <ul className="flex flex-col gap-2 sm:gap-2.5">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="block py-0.5 text-xs text-muted-foreground transition-colors hover:text-primary active:text-primary sm:text-sm"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bottom bar */}
            <div className="mt-8 border-t border-primary/20 pt-5 text-center sm:mt-10 sm:pt-6">
              <p className="text-xs text-muted-foreground sm:text-sm">
                &copy; 2026 Shota AI. All rights reserved.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
