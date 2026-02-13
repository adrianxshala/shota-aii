import { ExternalLink, Code, Rocket, Sparkles } from "lucide-react"
import Image from "next/image"
import { AnimateInView } from "./animate-in-view"

const cuteIn =
  "opacity-0 translate-y-4 transition-[opacity,transform] duration-500 ease-out group-[.in-view]:opacity-100 group-[.in-view]:translate-y-0"

const projects = [
  {
    id: 1,
    name: "AI-Powered Web Platform",
    description:
      "A cutting-edge web application leveraging artificial intelligence to deliver intelligent user experiences and automated workflows.",
    tech: ["Next.js", "AI/ML", "TypeScript"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    link: "#",
    icon: Sparkles,
  },
  {
    id: 2,
    name: "Web & Dashboard",
    description:
      "A comprehensive analytics dashboard with real-time data visualization and advanced reporting capabilities for enterprise clients.",
    tech: ["React", "Node.js", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    link: "#",
    icon: Code,
  },
  {
    id: 3,
    name: "Automation & Workflows",
    description:
      "Streamlined automation solutions that reduce manual tasks and scale your operations with smart workflows and integrations.",
    tech: ["Next.js", "APIs", "MongoDB"],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    link: "#",
    icon: Rocket,
  },
]

export function FeaturesSection() {
  return (
    <section className="relative bg-background py-16 sm:py-24" id="projects">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <AnimateInView>
          <div className={`mb-10 text-center sm:mb-12 ${cuteIn}`} style={{ transitionDelay: "0ms" }}>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Our Work
            </p>
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Explore our portfolio of innovative solutions built with cutting-edge technology
            </p>
          </div>

          <div className="grid w-full gap-5 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <a
                key={project.id}
                href={project.link}
                className={`group/card relative flex flex-col overflow-hidden rounded-2xl border border-primary/20 bg-primary/[0.03] shadow-[0_0_40px_-12px_rgba(0,180,255,0.1)] backdrop-blur-xl transition-all active:scale-[0.98] hover:border-primary/40 hover:shadow-[0_0_40px_-8px_rgba(0,180,255,0.15)] md:rounded-3xl ${cuteIn}`}
                style={{ transitionDelay: `${80 + index * 80}ms` }}
              >
              {/* Project Image */}
              <div className="relative h-40 w-full overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 sm:h-48">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover/card:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative flex flex-1 flex-col p-4 pt-5 sm:p-5 sm:pt-6 md:p-8 md:pt-8">
                {/* Diamond accent */}
                <svg
                  className="absolute right-4 top-4 h-10 w-10 text-primary/30 sm:right-5 sm:top-5 sm:h-12 sm:w-12 md:right-8 md:top-8"
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
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 sm:mb-4 sm:h-12 sm:w-12">
                  <project.icon className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
                </div>

                {/* Project Name */}
                <h3 className="mb-1.5 font-display text-base font-bold text-foreground sm:mb-2 sm:text-lg">
                  {project.name}
                </h3>

                {/* Description */}
                <p className="mb-3 flex-1 text-sm leading-relaxed text-muted-foreground sm:mb-4">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="mb-3 flex flex-wrap gap-1.5 sm:mb-4 sm:gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-[11px] font-medium text-primary sm:px-3 sm:py-1 sm:text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <div className="flex items-center gap-2 text-sm font-medium text-primary transition-colors group-hover/card:text-primary/80">
                  <span>View Project</span>
                  <ExternalLink className="h-4 w-4 transition-transform group-hover/card:translate-x-1" />
                </div>
              </div>
            </a>
          ))}
          </div>
        </AnimateInView>
      </div>
    </section>
  )
}
