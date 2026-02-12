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
  targetBrightness: number
  pulsePhase: number
  layer: "core" | "mid" | "outer" | "edge"
  clickEnergy: number
}

interface Particle {
  fromNode: number
  toNode: number
  progress: number
  speed: number
  brightness: number
  size: number
  trail: { x: number; y: number; alpha: number }[]
}

interface ShockWave {
  x: number
  y: number
  radius: number
  maxRadius: number
  alpha: number
  speed: number
}

interface Spark {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  hue: number
}

interface EnergyBeam {
  fromX: number
  fromY: number
  toX: number
  toY: number
  life: number
  maxLife: number
  width: number
}

export function InteractiveBrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000, isDown: false })
  const nodesRef = useRef<Node[]>([])
  const particlesRef = useRef<Particle[]>([])
  const shockWavesRef = useRef<ShockWave[]>([])
  const sparksRef = useRef<Spark[]>([])
  const energyBeamsRef = useRef<EnergyBeam[]>([])
  const animRef = useRef<number>(0)
  const timeRef = useRef(0)
  const attractModeRef = useRef(false)
  const globalEnergyRef = useRef(0)
  const lastClickTimeRef = useRef(0)

  const initNodes = useCallback((width: number, height: number) => {
    const nodes: Node[] = []
    const centerX = width * 0.55
    const centerY = height * 0.45

    const brainRadiusX = Math.min(width, height) * 0.28
    const brainRadiusY = Math.min(width, height) * 0.24

    // Core nodes
    for (let i = 0; i < 20; i++) {
      const angle = (Math.PI * 2 * i) / 20 + Math.random() * 0.3
      const dist = Math.random() * 0.3
      const x = centerX + Math.cos(angle) * brainRadiusX * dist
      const y = centerY + Math.sin(angle) * brainRadiusY * dist
      nodes.push({
        x, y, baseX: x, baseY: y,
        vx: 0, vy: 0,
        radius: 2.5 + Math.random() * 2.5,
        connections: [],
        brightness: 0.8 + Math.random() * 0.2,
        targetBrightness: 0.8,
        pulsePhase: Math.random() * Math.PI * 2,
        layer: "core",
        clickEnergy: 0,
      })
    }

    // Mid layer
    for (let i = 0; i < 35; i++) {
      const angle = (Math.PI * 2 * i) / 35 + Math.random() * 0.2
      const dist = 0.3 + Math.random() * 0.4
      const wrinkle = Math.sin(angle * 5) * 0.08
      const x = centerX + Math.cos(angle) * brainRadiusX * (dist + wrinkle)
      const y = centerY + Math.sin(angle) * brainRadiusY * (dist + wrinkle)
      nodes.push({
        x, y, baseX: x, baseY: y,
        vx: 0, vy: 0,
        radius: 1.8 + Math.random() * 1.5,
        connections: [],
        brightness: 0.6 + Math.random() * 0.3,
        targetBrightness: 0.5,
        pulsePhase: Math.random() * Math.PI * 2,
        layer: "mid",
        clickEnergy: 0,
      })
    }

    // Outer layer
    for (let i = 0; i < 40; i++) {
      const angle = (Math.PI * 2 * i) / 40 + Math.random() * 0.1
      const dist = 0.7 + Math.random() * 0.3
      const wrinkle = Math.sin(angle * 7) * 0.06
      const x = centerX + Math.cos(angle) * brainRadiusX * (dist + wrinkle)
      const y = centerY + Math.sin(angle) * brainRadiusY * (dist + wrinkle)
      nodes.push({
        x, y, baseX: x, baseY: y,
        vx: 0, vy: 0,
        radius: 1.2 + Math.random() * 1.2,
        connections: [],
        brightness: 0.4 + Math.random() * 0.3,
        targetBrightness: 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
        layer: "outer",
        clickEnergy: 0,
      })
    }

    // Edge nodes with extending circuit traces
    for (let i = 0; i < 30; i++) {
      const angle = (Math.PI * 2 * i) / 30 + Math.random() * 0.3
      const dist = 1.1 + Math.random() * 0.7
      const x = centerX + Math.cos(angle) * brainRadiusX * dist
      const y = centerY + Math.sin(angle) * brainRadiusY * dist
      nodes.push({
        x, y, baseX: x, baseY: y,
        vx: 0, vy: 0,
        radius: 0.8 + Math.random() * 1,
        connections: [],
        brightness: 0.2 + Math.random() * 0.3,
        targetBrightness: 0.15,
        pulsePhase: Math.random() * Math.PI * 2,
        layer: "edge",
        clickEnergy: 0,
      })
    }

    // Build connections
    const maxDist = Math.min(width, height) * 0.18
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].baseX - nodes[j].baseX
        const dy = nodes[i].baseY - nodes[j].baseY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < maxDist) {
          const threshold =
            nodes[i].layer === "core" || nodes[j].layer === "core"
              ? 0.7
              : nodes[i].layer === "edge" || nodes[j].layer === "edge"
              ? 0.3
              : 0.5
          if (Math.random() < threshold) {
            nodes[i].connections.push(j)
            nodes[j].connections.push(i)
          }
        }
      }
    }

    nodesRef.current = nodes

    // Initialize particles with trails
    const particles: Particle[] = []
    for (let i = 0; i < 60; i++) {
      const nodeIdx = Math.floor(Math.random() * nodes.length)
      const node = nodes[nodeIdx]
      if (node.connections.length > 0) {
        const connIdx = node.connections[Math.floor(Math.random() * node.connections.length)]
        particles.push({
          fromNode: nodeIdx,
          toNode: connIdx,
          progress: Math.random(),
          speed: 0.003 + Math.random() * 0.01,
          brightness: 0.5 + Math.random() * 0.5,
          size: 1 + Math.random() * 1.5,
          trail: [],
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

    let w = 0
    let h = 0

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * window.devicePixelRatio
      canvas.height = h * window.devicePixelRatio
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0)
      initNodes(w, h)
    }

    resize()
    window.addEventListener("resize", resize)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000
      mouseRef.current.y = -1000
      mouseRef.current.isDown = false
    }

    const handleMouseDown = (e: MouseEvent) => {
      mouseRef.current.isDown = true
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top

      const now = Date.now()
      const isDoubleClick = now - lastClickTimeRef.current < 350
      lastClickTimeRef.current = now

      if (isDoubleClick) {
        // Double-click: toggle attract/repel mode
        attractModeRef.current = !attractModeRef.current
        globalEnergyRef.current = 1

        // Big shockwave on mode toggle
        shockWavesRef.current.push({
          x: mx, y: my,
          radius: 0,
          maxRadius: 400,
          alpha: 1,
          speed: 8,
        })
      }

      // Shockwave on click
      shockWavesRef.current.push({
        x: mx, y: my,
        radius: 0,
        maxRadius: 250,
        alpha: 0.8,
        speed: 5,
      })

      // Spawn sparks
      const sparkCount = isDoubleClick ? 30 : 15
      for (let i = 0; i < sparkCount; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 2 + Math.random() * 6
        sparksRef.current.push({
          x: mx, y: my,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: 0.5 + Math.random() * 0.8,
          size: 1 + Math.random() * 2.5,
          hue: attractModeRef.current ? 280 : 195,
        })
      }

      // Energy beams to nearby nodes
      const nodes = nodesRef.current
      const nearNodes: number[] = []
      for (let i = 0; i < nodes.length; i++) {
        const dx = nodes[i].x - mx
        const dy = nodes[i].y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200) {
          nearNodes.push(i)
          nodes[i].clickEnergy = Math.max(nodes[i].clickEnergy, 1 - dist / 200)
        }
      }

      // Create energy beams between click and nearest nodes
      nearNodes.slice(0, 6).forEach((ni) => {
        energyBeamsRef.current.push({
          fromX: mx, fromY: my,
          toX: nodes[ni].x, toY: nodes[ni].y,
          life: 1,
          maxLife: 0.4 + Math.random() * 0.3,
          width: 1 + Math.random() * 2,
        })
      })

      // Burst spawn extra particles from the click area
      nearNodes.slice(0, 5).forEach((ni) => {
        const node = nodes[ni]
        if (node.connections.length > 0) {
          for (let c = 0; c < 2; c++) {
            const connIdx = node.connections[Math.floor(Math.random() * node.connections.length)]
            particlesRef.current.push({
              fromNode: ni,
              toNode: connIdx,
              progress: 0,
              speed: 0.015 + Math.random() * 0.02,
              brightness: 1,
              size: 2 + Math.random() * 1.5,
              trail: [],
            })
          }
        }
      })
    }

    const handleMouseUp = () => {
      mouseRef.current.isDown = false
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)
    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("mouseup", handleMouseUp)

    // Touch support
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      const rect = canvas.getBoundingClientRect()
      const touch = e.touches[0]
      mouseRef.current.x = touch.clientX - rect.left
      mouseRef.current.y = touch.clientY - rect.top
    }

    const handleTouchStart = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      const touch = e.touches[0]
      mouseRef.current.x = touch.clientX - rect.left
      mouseRef.current.y = touch.clientY - rect.top
      handleMouseDown({ clientX: touch.clientX, clientY: touch.clientY } as MouseEvent)
    }

    const handleTouchEnd = () => {
      mouseRef.current.x = -1000
      mouseRef.current.y = -1000
      mouseRef.current.isDown = false
    }

    canvas.addEventListener("touchmove", handleTouchMove, { passive: false })
    canvas.addEventListener("touchstart", handleTouchStart, { passive: true })
    canvas.addEventListener("touchend", handleTouchEnd)

    const animate = () => {
      timeRef.current += 0.016
      const time = timeRef.current
      const mouse = mouseRef.current
      const nodes = nodesRef.current
      const particles = particlesRef.current
      const shockWaves = shockWavesRef.current
      const sparks = sparksRef.current
      const energyBeams = energyBeamsRef.current

      // Decay global energy
      globalEnergyRef.current *= 0.97

      ctx.clearRect(0, 0, w, h)

      // Ambient background glow near mouse
      if (mouse.x > 0 && mouse.y > 0) {
        const ambientGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 300)
        const hue = attractModeRef.current ? "120, 100, 255" : "0, 150, 255"
        ambientGrad.addColorStop(0, `rgba(${hue}, 0.06)`)
        ambientGrad.addColorStop(1, "rgba(0, 0, 0, 0)")
        ctx.fillStyle = ambientGrad
        ctx.fillRect(0, 0, w, h)
      }

      // --- Update nodes ---
      const interactRadius = mouse.isDown ? 220 : 170
      const isAttract = attractModeRef.current

      for (const node of nodes) {
        const dx = mouse.x - node.baseX
        const dy = mouse.y - node.baseY
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < interactRadius && mouse.x > 0) {
          const force = (1 - dist / interactRadius) * (mouse.isDown ? 45 : 28)
          const angle = Math.atan2(dy, dx)
          const direction = isAttract ? 1 : -1
          node.vx += Math.cos(angle) * force * 0.025 * direction
          node.vy += Math.sin(angle) * force * 0.025 * direction
          node.targetBrightness = Math.min(1, 0.8 + (1 - dist / interactRadius) * 0.5)
        } else {
          const baseBrightness =
            node.layer === "core" ? 0.7 : node.layer === "mid" ? 0.5 : node.layer === "outer" ? 0.3 : 0.15
          node.targetBrightness = baseBrightness
        }

        // Smooth brightness transitions
        node.brightness += (node.targetBrightness - node.brightness) * 0.08

        // Click energy decay and effect
        if (node.clickEnergy > 0) {
          node.clickEnergy *= 0.94
          node.brightness = Math.min(1, node.brightness + node.clickEnergy * 0.4)
          // Click ripple displacement
          const cx = w * 0.55
          const cy = h * 0.45
          const toCenterAngle = Math.atan2(node.baseY - cy, node.baseX - cx)
          node.vx += Math.cos(toCenterAngle) * node.clickEnergy * 2
          node.vy += Math.sin(toCenterAngle) * node.clickEnergy * 2
        }

        // Spring back
        node.vx += (node.baseX - node.x) * 0.035
        node.vy += (node.baseY - node.y) * 0.035
        node.vx *= 0.88
        node.vy *= 0.88

        // Floating motion
        const floatAmp = 2 + globalEnergyRef.current * 4
        node.x = node.baseX + node.vx + Math.sin(time * 0.5 + node.pulsePhase) * floatAmp
        node.y = node.baseY + node.vy + Math.cos(time * 0.7 + node.pulsePhase) * floatAmp
      }

      // --- Draw connections ---
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        for (const j of node.connections) {
          if (j > i) {
            const other = nodes[j]
            const avgBrightness = (node.brightness + other.brightness) / 2
            const energyBoost = Math.max(node.clickEnergy, other.clickEnergy)

            // Connection line
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(other.x, other.y)

            const alpha = avgBrightness * 0.3 + energyBoost * 0.4
            const lineWidth = avgBrightness * 1.2 + energyBoost * 2

            if (energyBoost > 0.1) {
              // Energized connections glow brighter
              ctx.strokeStyle = `rgba(100, 220, 255, ${alpha})`
              ctx.lineWidth = lineWidth
              ctx.stroke()

              // Extra glow layer
              ctx.strokeStyle = `rgba(150, 240, 255, ${energyBoost * 0.3})`
              ctx.lineWidth = lineWidth + 2
              ctx.stroke()
            } else {
              ctx.strokeStyle = `rgba(0, 180, 255, ${alpha})`
              ctx.lineWidth = lineWidth
              ctx.stroke()
            }
          }
        }
      }

      // --- Draw energy beams ---
      for (let i = energyBeams.length - 1; i >= 0; i--) {
        const beam = energyBeams[i]
        beam.life -= 0.016 / beam.maxLife

        if (beam.life <= 0) {
          energyBeams.splice(i, 1)
          continue
        }

        const alpha = beam.life * 0.8
        ctx.beginPath()
        ctx.moveTo(beam.fromX, beam.fromY)

        // Jagged lightning-style beam
        const dx = beam.toX - beam.fromX
        const dy = beam.toY - beam.fromY
        const segments = 6
        for (let s = 1; s <= segments; s++) {
          const t = s / segments
          const jitter = s < segments ? (Math.random() - 0.5) * 20 * beam.life : 0
          ctx.lineTo(
            beam.fromX + dx * t + jitter,
            beam.fromY + dy * t + jitter
          )
        }

        ctx.strokeStyle = `rgba(150, 230, 255, ${alpha})`
        ctx.lineWidth = beam.width * beam.life
        ctx.stroke()

        // Glow
        ctx.strokeStyle = `rgba(100, 200, 255, ${alpha * 0.3})`
        ctx.lineWidth = beam.width * beam.life * 3
        ctx.stroke()
      }

      // --- Draw shockwaves ---
      for (let i = shockWaves.length - 1; i >= 0; i--) {
        const wave = shockWaves[i]
        wave.radius += wave.speed
        wave.alpha -= 0.015

        if (wave.alpha <= 0) {
          shockWaves.splice(i, 1)
          continue
        }

        // Affect nearby nodes
        for (const node of nodes) {
          const dx = node.x - wave.x
          const dy = node.y - wave.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const ringDist = Math.abs(dist - wave.radius)
          if (ringDist < 30) {
            const angle = Math.atan2(dy, dx)
            const pushForce = wave.alpha * 3 * (1 - ringDist / 30)
            node.vx += Math.cos(angle) * pushForce
            node.vy += Math.sin(angle) * pushForce
            node.brightness = Math.min(1, node.brightness + wave.alpha * 0.3)
          }
        }

        ctx.beginPath()
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2)
        const isAttractWave = attractModeRef.current
        const waveColor = isAttractWave ? `rgba(120, 100, 255, ${wave.alpha * 0.5})` : `rgba(0, 200, 255, ${wave.alpha * 0.5})`
        ctx.strokeStyle = waveColor
        ctx.lineWidth = 2
        ctx.stroke()

        // Inner glow ring
        ctx.beginPath()
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2)
        const innerColor = isAttractWave ? `rgba(120, 100, 255, ${wave.alpha * 0.15})` : `rgba(0, 200, 255, ${wave.alpha * 0.15})`
        ctx.strokeStyle = innerColor
        ctx.lineWidth = 8
        ctx.stroke()
      }

      // --- Draw and update particles ---
      const maxParticles = 80
      if (particles.length > maxParticles) {
        particles.splice(0, particles.length - maxParticles)
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i]
        const fromNode = nodes[particle.fromNode]
        const toNode = nodes[particle.toNode]

        if (!fromNode || !toNode) {
          particles.splice(i, 1)
          continue
        }

        // Speed boost when near mouse
        let speedMult = 1
        const px = fromNode.x + (toNode.x - fromNode.x) * particle.progress
        const py = fromNode.y + (toNode.y - fromNode.y) * particle.progress
        const mouseDist = Math.sqrt((mouse.x - px) ** 2 + (mouse.y - py) ** 2)
        if (mouseDist < 150) {
          speedMult = 1.5 + (1 - mouseDist / 150) * 2
          particle.brightness = Math.min(1, particle.brightness + 0.02)
        }

        particle.progress += particle.speed * speedMult

        if (particle.progress >= 1) {
          particle.progress = 0
          particle.fromNode = particle.toNode
          const newNode = nodes[particle.toNode]
          if (newNode && newNode.connections.length > 0) {
            particle.toNode = newNode.connections[Math.floor(Math.random() * newNode.connections.length)]
          } else {
            particles.splice(i, 1)
            continue
          }
          // Gradually decay brightness for burst particles
          particle.brightness *= 0.95
          if (particle.brightness < 0.1 && particle.speed > 0.012) {
            particles.splice(i, 1)
            continue
          }
        }

        const currX = fromNode.x + (toNode.x - fromNode.x) * particle.progress
        const currY = fromNode.y + (toNode.y - fromNode.y) * particle.progress

        // Add to trail
        particle.trail.push({ x: currX, y: currY, alpha: particle.brightness })
        if (particle.trail.length > 8) particle.trail.shift()

        // Draw trail
        for (let t = 0; t < particle.trail.length; t++) {
          const tp = particle.trail[t]
          const trailAlpha = (t / particle.trail.length) * tp.alpha * 0.4
          ctx.beginPath()
          ctx.arc(tp.x, tp.y, particle.size * 0.6, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(100, 220, 255, ${trailAlpha})`
          ctx.fill()
        }

        // Particle body
        ctx.beginPath()
        ctx.arc(currX, currY, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(150, 235, 255, ${particle.brightness})`
        ctx.fill()

        // Particle glow
        ctx.beginPath()
        ctx.arc(currX, currY, particle.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(100, 220, 255, ${particle.brightness * 0.15})`
        ctx.fill()
      }

      // --- Draw sparks ---
      for (let i = sparks.length - 1; i >= 0; i--) {
        const spark = sparks[i]
        spark.x += spark.vx
        spark.y += spark.vy
        spark.vx *= 0.96
        spark.vy *= 0.96
        spark.vy += 0.05 // gravity
        spark.life -= 0.016 / spark.maxLife

        if (spark.life <= 0) {
          sparks.splice(i, 1)
          continue
        }

        const alpha = spark.life
        ctx.beginPath()
        ctx.arc(spark.x, spark.y, spark.size * spark.life, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${spark.hue}, 100%, 75%, ${alpha})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(spark.x, spark.y, spark.size * spark.life * 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${spark.hue}, 100%, 75%, ${alpha * 0.2})`
        ctx.fill()
      }

      // --- Draw nodes ---
      for (const node of nodes) {
        const pulse = Math.sin(time * 2 + node.pulsePhase) * 0.3 + 0.7

        // Outer glow
        const glowRadius = node.radius * (4 + node.clickEnergy * 6) * node.brightness
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowRadius)
        gradient.addColorStop(0, `rgba(0, 200, 255, ${node.brightness * 0.5 * pulse})`)
        gradient.addColorStop(0.5, `rgba(0, 150, 255, ${node.brightness * 0.15 * pulse})`)
        gradient.addColorStop(1, "rgba(0, 200, 255, 0)")
        ctx.beginPath()
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Node center
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180, 240, 255, ${node.brightness})`
        ctx.fill()

        // Extra bright ring on high energy
        if (node.clickEnergy > 0.2) {
          ctx.beginPath()
          ctx.arc(node.x, node.y, node.radius * pulse * 1.8, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(200, 250, 255, ${node.clickEnergy * 0.5})`
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      }

      // --- Circuit traces from edge nodes ---
      for (const node of nodes) {
        if (node.layer === "edge") {
          const centerX = w * 0.55
          const centerY = h * 0.45
          const dx = node.baseX - centerX
          const dy = node.baseY - centerY
          const angle = Math.atan2(dy, dx)
          const traceLen = 15 + Math.sin(time + node.pulsePhase) * 5

          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          const endX = node.x + Math.cos(angle) * traceLen
          ctx.lineTo(endX, node.y)
          const endY = node.y + (Math.sin(node.pulsePhase) > 0 ? 1 : -1) * (6 + Math.random() * 0.5)
          ctx.lineTo(endX, endY)

          const traceAlpha = node.brightness * 0.3 + node.clickEnergy * 0.4
          ctx.strokeStyle = `rgba(0, 150, 220, ${traceAlpha})`
          ctx.lineWidth = 0.6
          ctx.stroke()

          // Small terminal dot
          ctx.beginPath()
          ctx.arc(endX, endY, 1, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0, 200, 255, ${traceAlpha})`
          ctx.fill()
        }
      }

      // Mouse cursor effect - connection lines to nearest nodes when hovering
      if (mouse.x > 0 && mouse.y > 0) {
        const nearNodes: { idx: number; dist: number }[] = []
        for (let i = 0; i < nodes.length; i++) {
          const dx = nodes[i].x - mouse.x
          const dy = nodes[i].y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            nearNodes.push({ idx: i, dist })
          }
        }
        nearNodes.sort((a, b) => a.dist - b.dist)
        const closest = nearNodes.slice(0, 5)

        for (const { idx, dist } of closest) {
          const alpha = (1 - dist / 120) * 0.35
          ctx.beginPath()
          ctx.moveTo(mouse.x, mouse.y)
          ctx.lineTo(nodes[idx].x, nodes[idx].y)
          ctx.strokeStyle = attractModeRef.current
            ? `rgba(140, 120, 255, ${alpha})`
            : `rgba(0, 200, 255, ${alpha})`
          ctx.lineWidth = 1
          ctx.setLineDash([4, 4])
          ctx.stroke()
          ctx.setLineDash([])
        }

        // Mouse cursor dot
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = attractModeRef.current ? "rgba(140, 120, 255, 0.6)" : "rgba(0, 200, 255, 0.6)"
        ctx.fill()

        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 8, 0, Math.PI * 2)
        ctx.fillStyle = attractModeRef.current ? "rgba(140, 120, 255, 0.1)" : "rgba(0, 200, 255, 0.1)"
        ctx.fill()
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("resize", resize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("mouseup", handleMouseUp)
      canvas.removeEventListener("touchmove", handleTouchMove)
      canvas.removeEventListener("touchstart", handleTouchStart)
      canvas.removeEventListener("touchend", handleTouchEnd)
    }
  }, [initNodes])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full cursor-crosshair"
      aria-hidden="true"
    />
  )
}
