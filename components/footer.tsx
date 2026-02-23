"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Mail, Phone, MapPin } from "lucide-react"

const footerContainer = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1],
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const footerItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
}

const solutionsLinks = [
  { label: "Web Development", href: "#" },
  { label: "AI Integration", href: "#" },
  { label: "Automation", href: "#" },
  { label: "Consulting", href: "#" },
]

const contactData = [
  { icon: Mail, label: "Email", value: "hello@shotaai.com", href: "mailto:hello@shotaai.com" },
  { icon: Phone, label: "Phone", value: "+383 43 599 558", href: "tel:+38343599558" },
  { icon: MapPin, label: "Locations", value: "Stuttgart, DE · Pristina, XK", href: "#" },
]

export function Footer() {
  return (
    <footer className="relative bg-background py-6 sm:py-16 safe-bottom" id="footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          variants={footerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/[0.03] shadow-[0_0_40px_-12px_rgba(0,180,255,0.1)] backdrop-blur-xl md:rounded-3xl"
        >
          <div className="relative p-4 sm:p-8 md:p-10">
            {/* Diamond accent */}
            <motion.svg
              initial={{ opacity: 0, rotate: -90 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1], delay: 0.15 }}
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
            </motion.svg>

            {/* Main content: flex on all sizes so footer stays compact, not too long */}
            <motion.div variants={footerItem} className="flex flex-wrap items-start justify-between gap-6 sm:gap-8">
              {/* Brand */}
              <motion.div variants={footerItem} className="min-w-0 flex-shrink-0 text-center sm:text-left">
                <a href="/" className="flex items-center justify-center gap-2 sm:justify-start">
                  <Image
                    src="/logo.png"
                    alt="Shota AI"
                    width={120}
                    height={32}
                    className="h-7 w-auto object-contain sm:h-8"
                  />
                  <span className="font-display text-lg font-bold text-foreground">Shota</span>
                  <span
                    className="font-display inline-block font-light bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(120deg, hsl(199 89% 48%), hsl(187 85% 55%), hsl(199 89% 48%))",
                      backgroundSize: "200% auto",
                    }}
                  >
                    {" "}Ai
                  </span>
                </a>
                <p className="mx-auto mt-2 max-w-xs text-xs leading-relaxed text-muted-foreground sm:mx-0 sm:mt-3 sm:text-sm">
                  Empowering businesses through intelligent solutions.
                </p>
              </motion.div>

              {/* Solutions + Contact in one row on mobile */}
              <motion.div variants={footerItem} className="flex flex-1 flex-wrap items-start justify-center gap-6 sm:justify-end sm:gap-8 md:gap-12">
                {/* Solutions - hidden on mobile */}
                <motion.div variants={footerItem} className="min-w-0 hidden sm:block">
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground sm:mb-3 sm:text-sm sm:tracking-normal sm:normal-case">
                    Solutions
                  </h4>
                  <ul className="flex flex-col gap-1.5 sm:gap-2">
                    {solutionsLinks.map((link) => (
                      <li key={link.label}>
                        <motion.a
                          href={link.href}
                          className="block py-0.5 text-xs text-muted-foreground transition-colors hover:text-primary active:text-primary sm:text-sm"
                          whileHover={{ x: 2 }}
                          transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
                        >
                          {link.label}
                        </motion.a>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Contact data: number, email, address */}
                <motion.div variants={footerItem} className="flex flex-col gap-3 sm:gap-4">
                  {contactData.map((item) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-2 text-left transition-colors hover:text-primary sm:gap-3"
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
                    >
                      <item.icon className="h-4 w-4 shrink-0 text-primary sm:h-5 sm:w-5" />
                      <div className="min-w-0">
                        <span className="block text-xs text-muted-foreground sm:text-sm">
                          {item.label}
                        </span>
                        <span className="block truncate text-xs font-medium text-foreground sm:text-sm">
                          {item.value}
                        </span>
                      </div>
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Bottom bar */}
            <motion.div variants={footerItem} className="mt-6 border-t border-primary/20 pt-4 text-center sm:mt-8 sm:pt-5">
              <p className="text-xs text-muted-foreground sm:text-sm">
                &copy; 2026 Shota AI. All rights reserved.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
