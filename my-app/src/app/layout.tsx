import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Disease Predictor",
  description: "Predict potential diseases based on your symptoms using advanced NLP technology.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <main className="min-h-screen bg-white shadow-md">{children}</main>
      </body>
    </html>
  )
}