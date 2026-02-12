"use client"

import { useEffect, useRef, useCallback } from "react"

interface Node {
  x: number
  y: number
  baseX: number
  baseY: number
  vx: number
  vy: number
  radius: number
  connections: number[]
  brightness: number
  pulsePhase: number
  layer: "core" | "mid" | "outer" | "edge"
}

interface Particle {
  fromNode: number
  toNode: number
  progress: number
  speed: number
  brightness: number
}

export function InteractiveBrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const nodesRef = useRef<Node[]>([])
  const particlesRef = useRef<Particle[]>([])
  const animRef = useRef<number>(0)
  const timeRef = useRef(0)
  const brainCenterRef = useRef({ x: 0, y: 0 })

  const initNodes = useCallback((width: number, height: number) => {
    const nodes: Node[] = []
    const isMobile = width < 768
    const centerX = width * 0.55
    const centerY = isMobile ? height * 0.32 : height * 0.45
    const size = Math.min(width, height)
    const brainRadiusX = size * (isMobile ? 0.42 : 0.28)
    const brainRadiusY = size * (isMobile ? 0.36 : 0.24)

    brainCenterRef.current = { x: centerX, y: centerY }

    // Core nodes (dense center of brain)
    for (let i = 0; i < 15; i++) {
      const angle = (Math.PI * 2 * i) / 15 + Math.random() * 0.3
      const dist = Math.random() * 0.3
      const x = centerX + Math.cos(angle) * brainRadiusX * dist
      const y = centerY + Math.sin(angle) * brainRadiusY * dist
      nodes.push({
        x, y, baseX: x, baseY: y,
        vx: 0, vy: 0,
        radius: 2.5 + Math.random() * 2,
        connections: [],
        brightness: 0.8 + Math.random() * 0.2,
        pulsePhase: Math.random() * Math.PI * 2,
        layer: "core",
      })
    }

    // Mid layer (brain cortex shape)
    for (let i = 0; i < 30; i++) {
      const angle = (Math.PI * 2 * i) / 30 + Math.random() * 0.2
      const dist = 0.3 + Math.random() * 0.4
      // Add brain wrinkle distortion
      const wrinkle = Math.sin(angle * 5) * 0.08
      const x = centerX + Math.cos(angle) * brainRadiusX * (dist + wrinkle)
      const y = centerY + Math.sin(angle) * brainRadiusY * (dist + wrinkle)
      nodes.push({
        x, y, baseX: x, baseY: y,
        vx: 0, vy: 0,
        radius: 1.8 + Math.random() * 1.5,
        connections: [],
        brightness: 0.6 + Math.random() * 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
        layer: "mid",
      })
    }

    // Outer layer (brain outline)
    for (let i = 0; i < 35; i++) {
      const angle = (Math.PI * 2 * i) / 35 + Math.random() * 0.1
      const dist = 0.7 + Math.random() * 0.3
      const wrinkle = Math.sin(angle * 7) * 0.06
      const x = centerX + Math.cos(angle) * brainRadiusX * (dist + wrinkle)
      const y = centerY + Math.sin(angle) * brainRadiusY * (dist + wrinkle)
      nodes.push({
        x, y, baseX: x, baseY: y,
        vx: 0, vy: 0,
        radius: 1.2 + Math.random() * 1,
        connections: [],
        brightness: 0.4 + Math.random() * 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
        layer: "outer",
      })
    }

    // Edge nodes (circuit traces extending outward)
    for (let i = 0; i < 25; i++) {
      const angle = (Math.PI * 2 * i) / 25 + Math.random() * 0.3
      const dist = 1.1 + Math.random() * 0.6
      const x = centerX + Math.cos(angle) * brainRadiusX * dist
      const y = centerY + Math.sin(angle) * brainRadiusY * dist
      nodes.push({
        x, y, baseX: x, baseY: y,
        vx: 0, vy: 0,
        radius: 0.8 + Math.random() * 0.8,
        connections: [],
        brightness: 0.2 + Math.random() * 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
        layer: "edge",
      })
    }

    // Build connections
    const maxDist = size * (isMobile ? 0.22 : 0.18)
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < maxDist) {
          // Core nodes connect more
          const threshold =
            nodes[i].layer === "core" || nodes[j].layer === "core"
              ? 0.7
              : nodes[i].layer === "edge" || nodes[j].layer === "edge"
              ? 0.25
              : 0.45
          if (Math.random() < threshold) {
            nodes[i].connections.push(j)
            nodes[j].connections.push(i)
          }
        }
      }
    }

    nodesRef.current = nodes

    // Initialize particles
    const particles: Particle[] = []
    for (let i = 0; i < 40; i++) {
      const nodeIdx = Math.floor(Math.random() * nodes.length)
      const node = nodes[nodeIdx]
      if (node.connections.length > 0) {
        const connIdx = node.connections[Math.floor(Math.random() * node.connections.length)]
        particles.push({
          fromNode: nodeIdx,
          toNode: connIdx,
          progress: Math.random(),
          speed: 0.003 + Math.random() * 0.008,
          brightness: 0.5 + Math.random() * 0.5,
        })
      }
    }
    particlesRef.current = particles
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      initNodes(rect.width, rect.height)
    }

    resize()
    window.addEventListener("resize", resize)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    const animate = () => {
      timeRef.current += 0.016
      const time = timeRef.current
      const w = canvas.width / window.devicePixelRatio
      const h = canvas.height / window.devicePixelRatio
      const mouse = mouseRef.current
      const nodes = nodesRef.current
      const particles = particlesRef.current

      ctx.clearRect(0, 0, w, h)

      // Update node positions based on mouse
      const interactRadius = 150
      for (const node of nodes) {
        const dx = mouse.x - node.baseX
        const dy = mouse.y - node.baseY
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < interactRadius) {
          const force = (1 - dist / interactRadius) * 25
          const angle = Math.atan2(dy, dx)
          // Push away from mouse
          node.vx -= Math.cos(angle) * force * 0.02
          node.vy -= Math.sin(angle) * force * 0.02
          // Boost brightness when near mouse
          node.brightness = Math.min(1, node.brightness + 0.05)
        } else {
          node.brightness = Math.max(
            node.layer === "core" ? 0.7 : node.layer === "mid" ? 0.5 : node.layer === "outer" ? 0.3 : 0.15,
            node.brightness - 0.01
          )
        }

        // Spring back to base position
        node.vx += (node.baseX - node.x) * 0.04
        node.vy += (node.baseY - node.y) * 0.04
        node.vx *= 0.9
        node.vy *= 0.9

        // Add subtle floating motion
        node.x = node.baseX + node.vx + Math.sin(time * 0.5 + node.pulsePhase) * 1.5
        node.y = node.baseY + node.vy + Math.cos(time * 0.7 + node.pulsePhase) * 1.5
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        for (const j of node.connections) {
          if (j > i) {
            const other = nodes[j]
            const avgBrightness = (node.brightness + other.brightness) / 2

            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = `rgba(0, 180, 255, ${avgBrightness * 0.3})`
            ctx.lineWidth = avgBrightness * 1.2
            ctx.stroke()
          }
        }
      }

      // Draw particles traveling along connections
      for (const particle of particles) {
        const fromNode = nodes[particle.fromNode]
        const toNode = nodes[particle.toNode]

        if (!fromNode || !toNode) continue

        particle.progress += particle.speed
        if (particle.progress >= 1) {
          particle.progress = 0
          particle.fromNode = particle.toNode
          const newNode = nodes[particle.toNode]
          if (newNode.connections.length > 0) {
            particle.toNode = newNode.connections[Math.floor(Math.random() * newNode.connections.length)]
          }
          particle.brightness = 0.5 + Math.random() * 0.5
        }

        const px = fromNode.x + (toNode.x - fromNode.x) * particle.progress
        const py = fromNode.y + (toNode.y - fromNode.y) * particle.progress

        ctx.beginPath()
        ctx.arc(px, py, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(100, 220, 255, ${particle.brightness})`
        ctx.fill()

        // Particle glow
        ctx.beginPath()
        ctx.arc(px, py, 4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(100, 220, 255, ${particle.brightness * 0.2})`
        ctx.fill()
      }

      // Draw nodes
      for (const node of nodes) {
        const pulse = Math.sin(time * 2 + node.pulsePhase) * 0.3 + 0.7

        // Node glow
        const glowRadius = node.radius * 4 * node.brightness
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, glowRadius
        )
        gradient.addColorStop(0, `rgba(0, 200, 255, ${node.brightness * 0.6 * pulse})`)
        gradient.addColorStop(1, "rgba(0, 200, 255, 0)")
        ctx.beginPath()
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Node center
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(150, 230, 255, ${node.brightness})`
        ctx.fill()
      }

      // Draw circuit trace lines from edge nodes outward
      const { x: centerX, y: centerY } = brainCenterRef.current
      for (const node of nodes) {
        if (node.layer === "edge") {
          const dx = node.x - centerX
          const dy = node.y - centerY
          const angle = Math.atan2(dy, dx)
          const traceLen = 20 + Math.random() * 0.5

          ctx.beginPath()
          ctx.moveTo(node.x, node.y)

          // Circuit-style right-angle traces
          const endX = node.x + Math.cos(angle) * traceLen
          const midY = node.y
          ctx.lineTo(endX, midY)
          const endY = midY + (Math.random() > 0.5 ? 1 : -1) * (8 + Math.random() * 12)
          ctx.lineTo(endX, endY)

          ctx.strokeStyle = `rgba(0, 150, 220, ${node.brightness * 0.25})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("resize", resize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [initNodes])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  )
}
