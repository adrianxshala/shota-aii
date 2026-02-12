import { Globe, Brain, Zap } from "lucide-react"

const features = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Constructing your exact and concurrent team-matching solutions including web development, user interfaces, and enterprise applications.",
  },
  {
    icon: Brain,
    title: "Artificial Intelligence",
    description:
      "Empowering web search systems, natural language processing, artificial intelligence, and hybrid innovation with AI-driven insights.",
  },
  {
    icon: Zap,
    title: "Innovation & Automation",
    description:
      "Innovative automation enables and provides targeted innovation and efficiency, with multi-tier scheduled automated systems.",
  },
]

export function FeaturesSection() {
  return (
    <section className="relative bg-background py-24" id="platform">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid w-full gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative flex flex-col justify-center rounded-2xl border border-primary/20 bg-primary/[0.03] p-5 pt-14 shadow-[0_0_40px_-12px_rgba(0,180,255,0.1)] backdrop-blur-xl transition-all hover:border-primary/40 hover:shadow-[0_0_40px_-8px_rgba(0,180,255,0.15)] sm:p-6 sm:pt-16 md:rounded-3xl md:p-8 md:pt-20"
            >
              {/* Diamond accent (vector-style) */}
              <svg
                className="absolute left-5 top-6 h-12 w-12 text-primary/50 sm:left-6 sm:top-8 md:left-8 md:top-10"
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

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 font-display text-lg font-bold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
