"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ProgressOverview } from "@/components/progress-overview"
import { CurrentCourses } from "@/components/current-courses"
import { UpcomingTasks } from "@/components/upcoming-tasks"
import { AiBuddyWidget } from "@/components/ai-buddy-widget"
import { ExploreMentors } from "@/components/explore-mentors"
import { Footer } from "@/components/footer"
import type { MenteeData } from "@/lib/types"
import { getMenteeData } from "@/lib/data"

export function MenteeOverview() {
  const [menteeData, setMenteeData] = useState<MenteeData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      try {
        const data = await getMenteeData()
        setMenteeData(data)
      } catch (error) {
        console.error("Error fetching mentee data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!menteeData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg text-gray-600">Failed to load mentee data.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <HeroSection mentee={menteeData} />
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ProgressOverview progress={menteeData.progress} />
          </div>
          <div>
            <UpcomingTasks tasks={menteeData.upcomingTasks} />
          </div>
        </div>
        <CurrentCourses courses={menteeData.currentCourses} />
        <ExploreMentors mentors={menteeData.recommendedMentors} />
      </main>
      <AiBuddyWidget />
      <Footer />
    </div>
  )
}

