"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

export function DynamicHero() {
  const heroRef = useRef(null)
  const isInView = useInView(heroRef)
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const gradientStyle = {
    background: `
      radial-gradient(
        circle at 50% 50%,
        rgba(255, 99, 71, 0.8),
        rgba(65, 105, 225, 0.8),
        rgba(50, 205, 50, 0.8)
      )
    `,
    backgroundSize: "400% 400%",
    animation: "gradientAnimation 15s ease infinite",
  }

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={gradientStyle}
    >
      {/* Dynamic background elements */}
      <div className="absolute inset-0 z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="doodle-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              {/* Books */}
              <path d="M20 180 Q40 160 60 180 T100 180" stroke="rgba(255,255,255,0.3)" fill="none" strokeWidth="2" />
              <path d="M120 180 Q140 160 160 180 T200 180" stroke="rgba(255,255,255,0.3)" fill="none" strokeWidth="2" />

              {/* Lightbulb */}
              <path
                d="M100 20 Q100 40 80 60 Q120 60 100 20"
                stroke="rgba(255,255,255,0.3)"
                fill="none"
                strokeWidth="2"
              />
              <line x1="100" y1="60" x2="100" y2="80" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />

              {/* Graduation cap */}
              <rect x="140" y="40" width="40" height="10" fill="rgba(255,255,255,0.2)" />
              <polygon points="160,50 140,70 180,70" fill="rgba(255,255,255,0.2)" />

              {/* Speech bubbles */}
              <circle cx="40" cy="100" r="20" fill="rgba(255,255,255,0.15)" />
              <polygon points="40,120 30,140 50,120" fill="rgba(255,255,255,0.15)" />

              <circle cx="180" cy="120" r="15" fill="rgba(255,255,255,0.15)" />
              <polygon points="180,135 170,150 190,135" fill="rgba(255,255,255,0.15)" />

              {/* Gears */}
              <circle cx="60" cy="40" r="15" stroke="rgba(255,255,255,0.3)" fill="none" strokeWidth="2" />
              <circle cx="60" cy="40" r="8" stroke="rgba(255,255,255,0.3)" fill="none" strokeWidth="2" />
              <circle cx="160" cy="140" r="12" stroke="rgba(255,255,255,0.3)" fill="none" strokeWidth="2" />
              <circle cx="160" cy="140" r="6" stroke="rgba(255,255,255,0.3)" fill="none" strokeWidth="2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#doodle-pattern)" />
        </svg>
      </div>

      {/* Animated floating elements */}
      <motion.div
        className="absolute inset-0 z-0"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
      >
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
            style={{
              width: `${Math.random() * 60 + 40}px`,
              height: `${Math.random() * 60 + 40}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            variants={{
              hidden: { scale: 0, opacity: 0 },
              visible: {
                scale: 1,
                opacity: 0.7,
                transition: {
                  type: "spring",
                  stiffness: 50,
                  damping: 10,
                  duration: 0.5,
                },
              },
            }}
          >
            {/* Random icons inside floating elements */}
            {["📚", "🎖️","💡", "🎓", "⚙️"][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 items-center gap-12">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white space-y-6"
          >
            <h1 className="text-5xl md:text-6xl font-bold">
              Find your perfect
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                mentor match
              </span>
            </h1>
            <p className="text-xl text-white/90">
              Join thousands of professionals who've accelerated their careers through our mentorship platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
              >
                Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="border border-white/50 text-white px-6 py-3 rounded-md hover:bg-white/10 transition"
              >
                Sign up
              </motion.button>
            </div>
          </motion.div>

          {/* Illustration/Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
              <img
                src="https://img.freepik.com/free-vector/mentoring-concept-illustration_114360-7494.jpg"
                alt="Mentorship Illustration"
                className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
              />
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 bg-white/10 backdrop-blur-md p-6 rounded-xl"
        >
          <div className="text-center">
            <p className="text-3xl font-bold text-white">5,000+</p>
            <p className="text-white/80">Active Mentors</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">12,000+</p>
            <p className="text-white/80">Mentees</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">50,000+</p>
            <p className="text-white/80">Sessions</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">98%</p>
            <p className="text-white/80">Satisfaction</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

