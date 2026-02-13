"use client"

import { AnimateInView } from "./animate-in-view"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const cuteIn =
  "opacity-0 translate-y-4 transition-[opacity,transform] duration-500 ease-out group-[.in-view]:opacity-100 group-[.in-view]:translate-y-0"

export function ContactSection() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Add your form submission logic (e.g. send to API, email service)
  }

  return (
    <section className="relative bg-background py-12 sm:py-20" id="contact">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <AnimateInView>
          <div className={`mb-6 text-center sm:mb-8 ${cuteIn}`} style={{ transitionDelay: "0ms" }}>
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
          </div>

          <div
            className={`group relative overflow-hidden rounded-2xl border border-primary/10 bg-background/40 shadow-[0_0_24px_-8px_rgba(0,180,255,0.08)] backdrop-blur-md transition-all ${cuteIn}`}
            style={{ transitionDelay: "80ms" }}
          >
            <div className="relative p-4 sm:p-6 md:p-7">
              <svg
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
              </svg>

              <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4 sm:space-y-4">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-4">
                  <div className="space-y-1.5">
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
                  </div>
                  <div className="space-y-1.5">
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
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs text-foreground sm:text-sm">
                    Phone <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="h-9 border-primary/15 bg-background/60 text-sm placeholder:text-muted-foreground/80 focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-1.5">
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
                </div>
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
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </form>
            </div>
          </div>
        </AnimateInView>
      </div>
    </section>
  )
}
