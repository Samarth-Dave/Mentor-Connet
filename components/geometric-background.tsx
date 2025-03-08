import type React from "react"

export const GeometricBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] opacity-20">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="geometric-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            {/* Triangles */}
            <path d="M0 0 L50 50 L0 100 Z" fill="rgba(65, 105, 225, 0.1)" />
            <path d="M100 0 L50 50 L100 100 Z" fill="rgba(255, 99, 71, 0.1)" />

            {/* Circles */}
            <circle cx="50" cy="50" r="20" fill="none" stroke="rgba(50, 205, 50, 0.1)" strokeWidth="2" />

            {/* Squares */}
            <rect x="80" y="80" width="20" height="20" fill="rgba(255, 215, 0, 0.1)" />
            <rect x="0" y="80" width="20" height="20" fill="rgba(138, 43, 226, 0.1)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#geometric-pattern)" />
      </svg>
    </div>
  )
}

