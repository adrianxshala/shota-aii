"use client"

import { ExternalLink, Code, Rocket, Sparkles } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

const projects = [
  {
    id: 1,
    name: "AI-Powered Web Platform",
    description:
      "A cutting-edge web application leveraging artificial intelligence to deliver intelligent user experiences and automated workflows.",
    tech: ["Next.js", "AI/ML", "TypeScript"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    link: "https://ai-powerd-wine.vercel.app/",
    icon: Sparkles,
    featured: true,
  },
  {
    id: 2,
    name: "Web & Dashboard",
    description:
      "A comprehensive analytics dashboard with real-time data visualization and advanced reporting.",
    tech: ["React", "Node.js", "PostgreSQL"],
    image: "/web%20%26%20dashboard.webp",
    link: "#",
    icon: Code,
    featured: false,
  },
  {
    id: 3,
    name: "Automation & Workflows",
    description:
      "Streamlined automation solutions that reduce manual tasks and scale your operations.",
    tech: ["Next.js", "APIs", "MongoDB"],
    image: "/automation.jpg",
    link: "https://autmoation-flow.vercel.app/",
    icon: Rocket,
    featured: false,
  },
]

// Subtle, professional fade-up used for section heading and cards
const fadeUp = { initial: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }
const viewport = { once: true, margin: "0px 0px -40px 0px", amount: 0.1 }

function ProjectCard({
  project,
  index,
  variant,
}: {
  project: (typeof projects)[0]
  index: number
  variant: "featured" | "compact"
}) {
  const isFeatured = variant === "featured"

  return (
    <motion.a
      href={project.link}
      initial={fadeUp.initial}
      whileInView={fadeUp.visible}
      viewport={viewport}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.33, 1, 0.68, 1] }}
      className={`group/card relative flex overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.06] to-primary/[0.02] shadow-[0_0_30px_-14px_rgba(0,180,255,0.08)] transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_40px_-12px_rgba(0,180,255,0.12)] ${
        isFeatured
          ? "flex-col md:flex-row md:rounded-3xl"
          : "flex-col md:rounded-2xl"
      }`}
    >
      {/* Image area */}
      <div
        className={`relative shrink-0 overflow-hidden bg-gradient-to-br from-primary/15 to-primary/5 ${
          isFeatured ? "h-52 w-full md:h-auto md:w-[45%]" : "h-36 w-full sm:h-40"
        }`}
      >
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes={isFeatured ? "(max-width: 768px) 100vw, 45vw" : "(max-width: 768px) 100vw, 50vw"}
          className="object-cover transition-transform duration-500 group-hover/card:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent md:from-transparent md:via-transparent md:to-transparent md:bg-gradient-to-l md:from-background/70" />
        {isFeatured && (
          <span className="absolute left-4 top-4 rounded-full border border-primary/30 bg-primary/20 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-sm">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div
        className={`relative flex flex-1 flex-col p-5 sm:p-6 ${
          isFeatured ? "md:justify-center md:py-8 md:pl-8 md:pr-10" : "p-5"
        }`}
      >
        {!isFeatured && (
          <div className="absolute right-4 top-4 opacity-40">
            <project.icon className="h-8 w-8 text-primary" />
          </div>
        )}
        <h3
          className={`font-display font-bold text-foreground ${
            isFeatured ? "text-xl sm:text-2xl md:text-3xl" : "text-base sm:text-lg"
          }`}
        >
          {project.name}
        </h3>
        <p
          className={`mt-2 leading-relaxed text-muted-foreground ${
            isFeatured ? "text-sm sm:text-base max-w-xl" : "text-sm line-clamp-2"
          }`}
        >
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary sm:text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary transition-colors group-hover/card:text-primary/90">
          <span>View Project</span>
          <ExternalLink className="h-4 w-4 transition-transform group-hover/card:translate-x-1" />
        </div>
      </div>
    </motion.a>
  )
}

export function FeaturesSection() {
  const [featured, ...rest] = projects

  return (
    <section className="relative bg-background py-16 sm:py-24" id="projects">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.visible}
          viewport={viewport}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="mb-12 text-center sm:mb-14"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm">
            Our Work
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Featured{" "}
            <span
              className="inline-block bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, hsl(199 89% 48%), hsl(187 85% 55%), hsl(199 89% 48%))",
                backgroundSize: "200% auto",
              }}
            >
              Projects
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
            From AI platforms to dashboards and automation — see what we build.
          </p>
        </motion.div>

        {/* Featured project - large horizontal card */}
        <div className="mb-6 sm:mb-8">
          <ProjectCard project={featured} index={0} variant="featured" />
        </div>

        {/* Two smaller cards */}
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
          {rest.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index + 1}
              variant="compact"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
