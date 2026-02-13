"use client"

import { motion } from "framer-motion"
import { Search, PenTool, Code2, Rocket, HeartHandshake } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Discovery & Strategy",
    desc: "We dive deep into your goals, audience, and competition to create a roadmap for success.",
  },
  {
    icon: PenTool,
    title: "Design & Prototyping",
    desc: "Interactive mockups and visual designs crafted to align with your brand and user expectations.",
  },
  {
    icon: Code2,
    title: "Development & Testing",
    desc: "Clean, performant code built with modern frameworks. Rigorous testing at every stage.",
  },
  {
    icon: Rocket,
    title: "Launch & Optimization",
    desc: "Seamless deployment with performance monitoring, SEO optimization, and analytics setup.",
  },
  {
    icon: HeartHandshake,
    title: "Support & Growth",
    desc: "Ongoing maintenance, feature updates, and strategic guidance to keep you ahead.",
  },
]

export function ProcessSection() {
  return (
    <section id="process" className="relative bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center sm:mb-16"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            How We Work
          </p>
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            Our Proven{" "}
            <span
              className="inline-block bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, hsl(199 89% 48%), hsl(187 85% 55%), hsl(199 89% 48%))",
                backgroundSize: "200% auto",
              }}
            >
              Process
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:mt-5 sm:text-base">
            A structured approach that delivers consistent, high-quality results every time.
          </p>
        </motion.div>

        {/* Timeline — same layout on mobile and desktop */}
        <div className="relative mx-auto max-w-3xl">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-border sm:left-6 md:left-1/2 md:-translate-x-px" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative mb-10 flex items-start last:mb-0 sm:mb-12 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Icon circle */}
              <div
                className="absolute left-5 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full shadow-lg sm:left-6 sm:h-12 sm:w-12 md:left-1/2"
                style={{
                  background: "linear-gradient(120deg, hsl(199 89% 48%), hsl(187 85% 55%))",
                  boxShadow: "0 4px 20px rgba(0, 180, 255, 0.3)",
                }}
              >
                <step.icon className="h-4 w-4 text-primary-foreground sm:h-5 sm:w-5" />
              </div>

              {/* Content */}
              <div
                className={`ml-14 sm:ml-16 md:ml-0 md:w-[calc(50%-3rem)] ${
                  i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"
                }`}
              >
                <span className="text-[11px] font-bold uppercase tracking-wide text-primary sm:text-xs">
                  Step {i + 1}
                </span>
                <h3 className="mt-1 mb-1.5 font-display text-base font-semibold text-foreground sm:mb-2 sm:text-lg">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: steps.length * 0.1 }}
          className="mt-10 text-center sm:mt-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-5 py-2.5 text-xs font-medium text-primary shadow-sm sm:px-6 sm:py-3 sm:text-sm">
            <Rocket className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Typical project timeline: 4–8 weeks
          </div>
        </motion.div>
      </div>
    </section>
  )
}
