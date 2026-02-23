"use client"

import { Shield, Cpu, BarChart3, Users, Sparkles, Zap, Globe, Award } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { CountUp } from "./count-up"

const stats = [
  { 
    icon: Shield, 
    end: 99.9, 
    suffix: "%", 
    decimals: 1, 
    label: "Uptime",
    description: "Reliable infrastructure",
    gradient: "from-blue-500/20 to-cyan-500/10"
  },
  { 
    icon: Cpu, 
    end: 50, 
    suffix: "+", 
    decimals: 0, 
    label: "AI Models",
    description: "Powered by intelligence",
    gradient: "from-purple-500/20 to-pink-500/10"
  },
  { 
    icon: BarChart3, 
    end: 10, 
    suffix: "x", 
    decimals: 0, 
    label: "Faster Delivery",
    description: "Accelerated workflows",
    gradient: "from-green-500/20 to-emerald-500/10"
  },
  { 
    icon: Users, 
    end: 500, 
    suffix: "+", 
    decimals: 0, 
    label: "Clients Worldwide",
    description: "Trusted globally",
    gradient: "from-orange-500/20 to-amber-500/10"
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1],
    },
  },
}

const iconVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.5,
    rotate: -180,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.7,
      ease: [0.34, 1.56, 0.64, 1],
      delay: 0.2,
    },
  },
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "0px 0px -100px 0px", amount: 0.2 })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-background py-16 sm:py-24" id="about">
      {/* Subtle background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_120%,rgba(0,180,255,0.04),transparent)]" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="mb-12 text-center sm:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary sm:px-5 sm:py-2 sm:text-sm"
          >
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="uppercase tracking-widest">Who We Are</span>
          </motion.div>
          
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            Building the Future with{" "}
            <span
              className="inline-block bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, hsl(199 89% 48%), hsl(187 85% 55%), hsl(199 89% 48%))",
                backgroundSize: "200% auto",
              }}
            >
              Intelligent Solutions
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
            className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:mt-5 sm:text-base"
          >
            We combine cutting-edge artificial intelligence with modern web
            technologies to create transformative solutions that drive business
            growth and innovation.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-5"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: [0.33, 1, 0.68, 1] }
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.06] to-primary/[0.02] shadow-[0_0_40px_-12px_rgba(0,180,255,0.08)] backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_50px_-10px_rgba(0,180,255,0.15)] md:rounded-3xl"
            >
              {/* Animated gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
              
              {/* Diamond accent */}
              <motion.svg
                initial={{ opacity: 0, rotate: 0 }}
                animate={isInView ? { opacity: 1, rotate: 360 } : {}}
                transition={{ duration: 1, delay: 0.4 + index * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                className="absolute right-3 top-3 h-8 w-8 text-primary/20 transition-colors duration-300 group-hover:text-primary/40 sm:right-4 sm:top-4 sm:h-10 sm:w-10 md:right-5 md:top-5 md:h-12 md:w-12"
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

              <div className="relative flex flex-1 flex-col p-5 pt-6 sm:p-6 sm:pt-7 md:p-7 md:pt-8">
                {/* Icon */}
                <motion.div
                  variants={iconVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 shadow-[0_4px_20px_rgba(0,180,255,0.15)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_6px_30px_rgba(0,180,255,0.25)] sm:mb-5 sm:h-14 sm:w-14"
                >
                  <stat.icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110 sm:h-7 sm:w-7" />
                </motion.div>

                {/* Number */}
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="mb-2 font-display text-2xl font-bold text-foreground sm:mb-2.5 sm:text-3xl md:text-4xl"
                >
                  <CountUp
                    end={stat.end}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                    duration={2000}
                  />
                </motion.h3>

                {/* Label */}
                <p className="mb-1 text-sm font-semibold text-foreground transition-colors duration-300 group-hover:text-primary sm:text-base">
                  {stat.label}
                </p>
                
                {/* Description */}
                <p className="text-xs leading-relaxed text-muted-foreground/80 sm:text-sm">
                  {stat.description}
                </p>
              </div>

              {/* Shine effect on hover */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:translate-x-full group-hover:opacity-100" />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom accent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:mt-16 sm:gap-8"
        >
          <div className="flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
            <Award className="h-4 w-4 text-primary" />
            <span>Industry Leading</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
            <Zap className="h-4 w-4 text-primary" />
            <span>Lightning Fast</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
            <Globe className="h-4 w-4 text-primary" />
            <span>Global Reach</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
