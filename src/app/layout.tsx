import type React from "react"
import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond } from "next/font/google"
import "./globals.css"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
})

export const metadata: Metadata = {
  title: "AILUXE — Coming Soon",
  description: "AILUXE — The AI Concierge of Tomorrow. Time is the Real Luxury.",
  icons: {
    icon: "/favicon.ico",
  },
}

export const viewport: Viewport = {
  themeColor: "#000000",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.className} antialiased`}>{children}</body>
    </html>
  )
}

