"use client"

import { Shield, Cpu, BarChart3, Users } from "lucide-react"
import { AnimateInView } from "./animate-in-view"
import { CountUp } from "./count-up"

const cuteIn =
  "opacity-0 translate-y-4 transition-[opacity,transform] duration-500 ease-out group-[.in-view]:opacity-100 group-[.in-view]:translate-y-0"

const stats = [
  { icon: Shield, end: 99.9, suffix: "%", decimals: 1, label: "Uptime" },
  { icon: Cpu, end: 50, suffix: "+", decimals: 0, label: "AI Models" },
  { icon: BarChart3, end: 10, suffix: "x", decimals: 0, label: "Faster Delivery" },
  { icon: Users, end: 500, suffix: "+", decimals: 0, label: "Clients Worldwide" },
]

export function AboutSection() {
  return (
    <section className="relative bg-background py-16 sm:py-24" id="about">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <AnimateInView>
          <div className={`mb-10 text-center sm:mb-12 ${cuteIn}`} style={{ transitionDelay: "0ms" }}>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Who We Are
            </p>
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
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
            <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
              We combine cutting-edge artificial intelligence with modern web
              technologies to create transformative solutions that drive business
              growth and innovation.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:gap-6 lg:gap-8">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`group relative flex flex-col overflow-hidden rounded-2xl border border-primary/20 bg-primary/[0.03] shadow-[0_0_40px_-12px_rgba(0,180,255,0.1)] backdrop-blur-xl transition-all active:scale-[0.98] hover:border-primary/40 hover:shadow-[0_0_40px_-8px_rgba(0,180,255,0.15)] md:rounded-3xl ${cuteIn}`}
                  style={{ transitionDelay: `${80 + index * 80}ms` }}
                >
                <div className="relative flex flex-1 flex-col p-4 pt-5 sm:p-6 sm:pt-7 md:p-8 md:pt-8">
                  <svg
                    className="absolute right-3 top-3 h-8 w-8 text-primary/30 sm:right-6 sm:top-6 sm:h-12 sm:w-12 md:right-8 md:top-8"
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
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 sm:mb-4 sm:h-12 sm:w-12">
                    <stat.icon className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="mb-1 font-display text-lg font-bold text-foreground sm:mb-2 sm:text-xl">
                    <CountUp
                      end={stat.end}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                      duration={1800}
                    />
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {stat.label}
                  </p>
                </div>
                </div>
              ))}
          </div>
        </AnimateInView>
      </div>
    </section>
  )
}
