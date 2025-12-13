"use client"

import type React from "react"

import { useState } from "react"

export function ComingSoon() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail("")
    }
  }

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center px-6 py-12">
      <div className="flex flex-col items-center justify-center max-w-lg w-full text-center space-y-12">
        {/* Logo */}
        <div className="space-y-1">
          <h1 className="text-gold text-4xl md:text-5xl font-light tracking-[0.3em] uppercase">AILUXE</h1>
          <div className="w-16 h-px bg-gold/40 mx-auto mt-4" />
        </div>

        {/* Headline */}
          <h2 className="text-white/90 text-xl md:text-2xl font-light tracking-wide leading-relaxed">
           Something Beautiful Is Being Crafted.</h2>
        {/* Subtext */}
        <div className="space-y-2">
          <p className="text-white/50 text-sm md:text-base tracking-widest uppercase">
            AILUXE — The AI Concierge of Tomorrow.
          </p>
          <p className="text-gold/70 text-sm md:text-base font-light italic">Time is the Real Luxury.</p>
        </div>

        {/* Email Capture */}
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          {!submitted ? (
            <>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-transparent border border-gold/30 text-white/90 placeholder:text-white/30 px-4 py-3 text-sm tracking-wide focus:outline-none focus:border-gold/60 transition-colors duration-300"
                required
              />
              <button
                type="submit"
                className="w-full border border-gold/50 text-gold/90 px-6 py-3 text-sm tracking-[0.2em] uppercase hover:bg-gold/10 hover:border-gold transition-all duration-300"
              >
                Notify Me
              </button>
            </>
          ) : (
            <p className="text-gold/80 text-sm tracking-wide">Thank you. We'll be in touch.</p>
          )}
        </form>

        {/* Footer */}
        <footer className="pt-12">
          <p className="text-white/20 text-xs tracking-[0.15em] uppercase">
            © AILUXE 2025. Crafted with Precision. Inspired by Soul.
          </p>
        </footer>
      </div>
    </main>
  )
}
