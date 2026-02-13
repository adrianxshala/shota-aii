"use client"

import { Mail, MapPin, Phone } from "lucide-react"
import { motion } from "framer-motion"

const contactCards = [
  {
    icon: Mail,
    title: "Email Us",
    detail: "hello@shotaai.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    detail: "+1 (555) 000-0000",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    detail: "San Francisco, CA",
  },
]

export function ContactSection() {
  return (
    <section className="relative bg-background py-16 sm:py-24" id="contact">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center sm:mb-12"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Get in Touch
          </p>
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
            Ready to <span className="text-primary">Transform</span> Your
            Business?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Reach out to us and discover how our AI-powered solutions can
            accelerate your digital transformation.
          </p>
        </motion.div>

        <div className="grid w-full gap-4 sm:gap-8 md:grid-cols-3">
          {contactCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-primary/20 bg-primary/[0.03] shadow-[0_0_40px_-12px_rgba(0,180,255,0.1)] backdrop-blur-xl transition-all active:scale-[0.98] hover:border-primary/40 hover:shadow-[0_0_40px_-8px_rgba(0,180,255,0.15)] md:rounded-3xl"
            >
              <div className="relative flex flex-1 items-center gap-4 p-5 sm:flex-col sm:items-center sm:p-6 sm:pt-7 sm:text-center md:p-8 md:pt-8">
                {/* Diamond accent - hidden on mobile for cleaner look */}
                <svg
                  className="absolute right-4 top-4 hidden h-10 w-10 text-primary/30 sm:block sm:right-6 sm:top-6 sm:h-12 sm:w-12 md:right-8 md:top-8"
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

                {/* Icon */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 sm:mb-4 sm:h-12 sm:w-12">
                  <card.icon className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
                </div>

                {/* Text */}
                <div className="sm:text-center">
                  <h3 className="font-display text-base font-bold text-foreground sm:mb-2 sm:text-lg">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {card.detail}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
