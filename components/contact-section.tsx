"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
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

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
}

export function ContactSection() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Add your form submission logic (e.g. send to API, email service)
  }

  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "0px 0px -80px 0px", amount: 0.2 })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-background py-12 sm:py-20" id="contact">
      {/* Match subtle radial background used in \"Who We Are\" */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_120%,rgba(0,180,255,0.04),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
          className="mb-6 text-center sm:mb-8"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary sm:text-sm">
            Get in Touch
          </p>
          <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl md:text-3xl">
            Ready to{" "}
            <span
              className="inline-block bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, hsl(199 89% 48%), hsl(187 85% 55%), hsl(199 89% 48%))",
                backgroundSize: "200% auto",
              }}
            >
              Transform
            </span>{" "}
            Your Business?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-xs text-muted-foreground sm:text-sm">
            Reach out and we&apos;ll get back to you soon.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
          className="group relative overflow-hidden rounded-2xl border border-primary/10 bg-background/60 shadow-[0_0_24px_-8px_rgba(0,180,255,0.1)] backdrop-blur-md transition-all duration-300 hover:border-primary/25 hover:shadow-[0_0_30px_-10px_rgba(0,180,255,0.16)]"
        >
          {/* Soft \"shine\" on hover (cute but minimal) */}
          <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/8 to-transparent opacity-0 transition-[opacity,transform] duration-700 ease-out group-hover:translate-x-full group-hover:opacity-100" />
          <div className="relative p-4 sm:p-6 md:p-7">
            <motion.svg
              initial={{ opacity: 0, rotate: -90 }}
              animate={inView ? { opacity: 1, rotate: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }}
              className="absolute right-4 top-4 h-8 w-8 text-primary/25 sm:right-6 sm:top-6 sm:h-10 sm:w-10"
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

            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit}
              className="mx-auto max-w-md space-y-4 sm:space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-4">
                <motion.div variants={itemVariants} className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs text-foreground sm:text-sm">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    required
                    className="h-9 border-primary/15 bg-background/60 text-sm placeholder:text-muted-foreground/80 focus-visible:ring-primary"
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs text-foreground sm:text-sm">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="h-9 border-primary/15 bg-background/60 text-sm placeholder:text-muted-foreground/80 focus-visible:ring-primary"
                  />
                </motion.div>
              </div>
              <motion.div variants={itemVariants} className="space-y-1.5">
                <Label htmlFor="phone" className="text-xs text-foreground sm:text-sm">
                  Phone <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+383 43 599 558"
                  className="h-9 border-primary/15 bg-background/60 text-sm placeholder:text-muted-foreground/80 focus-visible:ring-primary"
                />
              </motion.div>
              <motion.div variants={itemVariants} className="space-y-1.5">
                <Label htmlFor="message" className="text-xs text-foreground sm:text-sm">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your project..."
                  required
                  rows={4}
                  className="min-h-[96px] border-primary/15 bg-background/60 text-sm placeholder:text-muted-foreground/80 focus-visible:ring-primary sm:min-h-[100px]"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <Button
                  type="submit"
                  size="sm"
                  className="h-9 w-full gap-1.5 rounded-xl border-0 px-4 text-sm font-semibold text-primary-foreground shadow-[0_0_20px_-6px_rgba(0,180,255,0.25)] transition-all hover:opacity-95 sm:w-auto sm:rounded-full sm:px-6"
                  style={{
                    backgroundImage:
                      "linear-gradient(120deg, hsl(199 89% 48%), hsl(187 85% 55%), hsl(199 89% 48%))",
                    backgroundSize: "200% auto",
                  }}
                >
                  Send Message
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Button>
              </motion.div>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
