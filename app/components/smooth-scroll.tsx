"use client"

import { useRef, useEffect, type ReactNode } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"

interface SmoothScrollProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function SmoothScrollSection({ children, delay = 0, duration = 0.8, className = "" }: SmoothScrollProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <div ref={ref} className={`reveal-container ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
        animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 50, filter: "blur(10px)" }}
        transition={{ duration, delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export function ParallaxSection({ children, className = "" }: SmoothScrollProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const springY = useSpring(y, { stiffness: 100, damping: 30 })
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 })

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y: springY, opacity: springOpacity }}>{children}</motion.div>
    </div>
  )
}

export function BlurReveal({ children, className = "" }: SmoothScrollProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (isInView && ref.current) {
      const element = ref.current as HTMLElement
      element.classList.add("in-view")
    }
  }, [isInView])

  return (
    <div ref={ref} className={`blur-reveal ${className}`}>
      {children}
    </div>
  )
}

