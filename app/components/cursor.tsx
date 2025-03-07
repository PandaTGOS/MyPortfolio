"use client"

import { useEffect, useRef } from "react"

export default function GooeyCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const circlesRef = useRef<HTMLDivElement[]>([])
  const TAIL_LENGTH = 20
  const cursorHistory = useRef<{ x: number; y: number }[]>(Array(TAIL_LENGTH).fill({ x: 0, y: 0 }))
  const mousePos = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()
  const splatterRef = useRef(false)

  useEffect(() => {
    if (cursorRef.current && circlesRef.current.length === 0) {
      for (let i = 0; i < TAIL_LENGTH; i++) {
        const div = document.createElement("div")
        div.classList.add("cursor-circle")
        cursorRef.current.appendChild(div)
        circlesRef.current.push(div)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    const handleClick = () => {
      splatterRef.current = true
      setTimeout(() => (splatterRef.current = false), 150)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("click", handleClick)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  useEffect(() => {
    const updateCursor = () => {
      const history = cursorHistory.current
      history.shift()
      history.push({ ...mousePos.current })

      for (let i = 0; i < TAIL_LENGTH; i++) {
        const current = history[i]
        const next = history[i + 1] || history[TAIL_LENGTH - 1]

        if (splatterRef.current) {
          current.x += (Math.random() * 100 - 50) * (1 - i / TAIL_LENGTH)
          current.y += (Math.random() * 100 - 50) * (1 - i / TAIL_LENGTH)
        } else {
          // 👇 Slowed down motion for a more gooey effect
          current.x += (next.x - current.x) * 0.15
          current.y += (next.y - current.y) * 0.15
        }

        if (circlesRef.current[i]) {
          circlesRef.current[i].style.transform = `translate(${current.x}px, ${current.y}px) scale(${i / TAIL_LENGTH})`
        }
      }

      animationRef.current = requestAnimationFrame(updateCursor)
    }

    animationRef.current = requestAnimationFrame(updateCursor)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" className="goo" version="1.1" width="100%">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur"></feGaussianBlur>
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15"
              result="goo"
            ></feColorMatrix>
            <feComposite in="SourceGraphic" in2="goo" operator="atop"></feComposite>
          </filter>
        </defs>
      </svg>
      <div id="cursor" ref={cursorRef}></div>
    </>
  )
}
