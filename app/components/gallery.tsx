"use client"
import { useRef } from "react"
import { useInView } from "framer-motion"
import { SmoothScrollSection, BlurReveal } from "./smooth-scroll"
import Image from "next/image";


export default function Gallery() {
  const ref = useRef(null)

  const images = [
    {
      src: "",
      alt: "Art piece 1",
      title: "Ethereal Dreams",
    },
    {
      src: "",
      alt: "Art piece 2",
      title: "Urban Symphony",
    },
    {
      src: "",
      alt: "Art piece 3",
      title: "Digital Nostalgia",
    },
    {
      src: "",
      alt: "Art piece 4",
      title: "Abstract Reality",
    },
  ]

  return (
    <section className="relative py-20">
      <div ref={ref} className="container mx-auto px-4">
        <SmoothScrollSection>
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl">Featured Works</h2>
        </SmoothScrollSection>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {images.map((image, index) => (
            <SmoothScrollSection key={index} delay={index * 0.2}>
              <div className="group relative overflow-hidden rounded-lg">
                <div className="aspect-[2/3] overflow-hidden">
                  <BlurReveal>
                    <Image
                      src={image.src || ""}
                      alt={image.alt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </BlurReveal>
                </div>
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <h3 className="text-xl font-semibold text-white">{image.title}</h3>
                </div>
              </div>
            </SmoothScrollSection>
          ))}
        </div>
      </div>
    </section>
  )
}

