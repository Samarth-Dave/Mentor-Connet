import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { GeometricBackground } from "@/components/geometric-background"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MentorMatch - Connect with Expert Mentors",
  description: "Find the perfect mentor to guide your career journey",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-blue-50 to-purple-50`}>
        <GeometricBackground />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  )
}



import './globals.css'