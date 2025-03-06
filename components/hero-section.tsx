"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { MenteeData } from "@/lib/types"
import { getMotivationalQuote } from "@/lib/data"

interface HeroSectionProps {
  mentee: MenteeData
}

export function HeroSection({ mentee }: HeroSectionProps) {
  const [quote, setQuote] = useState("")

  useEffect(() => {
    setQuote(getMotivationalQuote())
  }, [])

  return (
    <section className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-white/20"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              x: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
              y: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              width: Math.random() * 10 + 2 + "px",
              height: Math.random() * 10 + 2 + "px",
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold md:text-4xl">
            Welcome back, <span className="text-blue-200">{mentee.name}</span>!
          </h1>
          <p className="mt-2 max-w-2xl text-blue-100">{quote}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-6 flex flex-wrap gap-3"
        >
          <Badge className="bg-white/20 text-white hover:bg-white/30">
            {mentee.currentCourses.length} Ongoing Courses
          </Badge>
          <Badge className="bg-white/20 text-white hover:bg-white/30">
            {mentee.currentMentors.length} Active Mentors
          </Badge>
          <Badge className="bg-white/20 text-white hover:bg-white/30">
            {mentee.completedCourses} Completed Courses
          </Badge>
          <Badge className="bg-white/20 text-white hover:bg-white/30">
            {mentee.upcomingTasks.length} Upcoming Tasks
          </Badge>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 grid gap-4 md:grid-cols-3"
        >
          <Card className="bg-white/10 border-none shadow-lg backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="text-sm font-medium text-blue-200">Overall Progress</div>
              <div className="mt-1 text-2xl font-bold">{mentee.progress.overall}%</div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/20">
                <motion.div
                  className="h-full bg-blue-300"
                  initial={{ width: 0 }}
                  animate={{ width: `${mentee.progress.overall}%` }}
                  transition={{ delay: 0.8, duration: 1 }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-none shadow-lg backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="text-sm font-medium text-blue-200">Weekly Goal</div>
              <div className="mt-1 text-2xl font-bold">
                {mentee.progress.weeklyGoal.current}/{mentee.progress.weeklyGoal.target} hrs
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/20">
                <motion.div
                  className="h-full bg-green-300"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(mentee.progress.weeklyGoal.current / mentee.progress.weeklyGoal.target) * 100}%`,
                  }}
                  transition={{ delay: 0.9, duration: 1 }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-none shadow-lg backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="text-sm font-medium text-blue-200">Next Milestone</div>
              <div className="mt-1 text-lg font-bold truncate">{mentee.nextMilestone.title}</div>
              <div className="mt-2 text-sm text-blue-200">{mentee.nextMilestone.daysLeft} days left</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

