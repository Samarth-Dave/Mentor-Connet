import { Mentors } from "@/components/mentors"
import { ProblemSolving } from "@/components/problem-solving"
import { Testimonials } from "@/components/testimonials"
import { DynamicHero } from "@/components/dynamic-hero"
import { DashboardFeatures } from "@/components/dashboard-features"

export default function Home() {
  return (
    <main className="min-h-screen">
      <DynamicHero />
      <div className="container mx-auto px-4 py-12 space-y-24">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8">
          <ProblemSolving />
        </div>
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8">
          <Mentors />
        </div>
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-lg rounded-3xl shadow-xl p-8">
          <Testimonials />
        </div>
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8">
          <DashboardFeatures />
        </div>
      </div>
    </main>
  )
}

