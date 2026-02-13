"use client"

import { useEffect, useRef, useState } from "react"

function easeOutQuart(t: number) {
  return 1 - (1 - t) ** 4
}

type CountUpProps = {
  end: number
  suffix?: string
  duration?: number
  decimals?: number
  className?: string
}

export function CountUp({
  end,
  suffix = "",
  duration = 1800,
  decimals = 0,
  className = "",
}: CountUpProps) {
  const [value, setValue] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (hasAnimated) return
        if (!entries[0]?.isIntersecting) return
        setHasAnimated(true)
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasAnimated])

  useEffect(() => {
    if (!hasAnimated) return

    const start = performance.now()
    const run = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutQuart(progress)
      const current = eased * end
      setValue(current)
      if (progress < 1) requestAnimationFrame(run)
    }
    requestAnimationFrame(run)
  }, [hasAnimated, end, duration])

  const display =
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString()

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  )
}
