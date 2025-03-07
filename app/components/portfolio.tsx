"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SmoothScrollSection, BlurReveal } from "./smooth-scroll"
import Image from "next/image";

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", "digital", "paintings", "sculptures"]

  const works = [
    {
      id: 1,
      title: "Digital Dreamscape",
      category: "digital",
      image: "",
      year: "2024",
    },
    {
      id: 2,
      title: "Abstract Harmony",
      category: "paintings",
      image: "",
      year: "2023",
    },
    {
      id: 3,
      title: "Metal Flow",
      category: "sculptures",
      image: "",
      year: "2024",
    },
    {
      id: 4,
      title: "Neon Nights",
      category: "digital",
      image: "",
      year: "2023",
    },
    {
      id: 5,
      title: "Nature Whisper",
      category: "paintings",
      image: "",
      year: "2024",
    },
    {
      id: 6,
      title: "Bronze Echo",
      category: "sculptures",
      image: "",
      year: "2023",
    },
  ]

  const filteredWorks = works.filter((work) => (selectedCategory === "all" ? true : work.category === selectedCategory))

  return (
    <section className="bg-black py-20">
      <div className="container mx-auto px-4">
        <SmoothScrollSection>
          <div className="mb-12 flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="text-sm capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </SmoothScrollSection>
        <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredWorks.map((work, index) => (
              <SmoothScrollSection key={work.id} delay={index * 0.1}>
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="overflow-hidden bg-zinc-900">
                    <CardContent className="p-0">
                      <div className="group relative">
                        <BlurReveal>
                          <Image
                            src={work.image || ""}
                            alt={work.title}
                            className="w-full transition-transform duration-500 group-hover:scale-105"
                          />
                        </BlurReveal>
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <h3 className="text-xl font-semibold text-white">{work.title}</h3>
                          <p className="mt-2 text-sm text-gray-300">{work.year}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </SmoothScrollSection>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

