import "@/styles/globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import GooeyCursor from "./components/cursor"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <GooeyCursor />
      </body>
    </html>
  )
}

