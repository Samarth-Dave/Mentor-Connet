"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BarChart, LineChart, PieChart } from "@/components/ui/chart"
import type { ProgressData } from "@/lib/types"

interface ProgressOverviewProps {
  progress: ProgressData
}

export function ProgressOverview({ progress }: ProgressOverviewProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  // Weekly activity data
  const weeklyActivityData = [
    { name: "Mon", hours: progress.weeklyActivity[0] },
    { name: "Tue", hours: progress.weeklyActivity[1] },
    { name: "Wed", hours: progress.weeklyActivity[2] },
    { name: "Thu", hours: progress.weeklyActivity[3] },
    { name: "Fri", hours: progress.weeklyActivity[4] },
    { name: "Sat", hours: progress.weeklyActivity[5] },
    { name: "Sun", hours: progress.weeklyActivity[6] },
  ]

  // Monthly progress data
  const monthlyProgressData = [
    { name: "Jan", progress: progress.monthlyProgress[0] },
    { name: "Feb", progress: progress.monthlyProgress[1] },
    { name: "Mar", progress: progress.monthlyProgress[2] },
    { name: "Apr", progress: progress.monthlyProgress[3] },
    { name: "May", progress: progress.monthlyProgress[4] },
    { name: "Jun", progress: progress.monthlyProgress[5] },
  ]

  // Skills distribution data
  const skillsData = [
    { name: "Programming", value: progress.skillsDistribution.programming },
    { name: "Design", value: progress.skillsDistribution.design },
    { name: "Business", value: progress.skillsDistribution.business },
    { name: "Soft Skills", value: progress.skillsDistribution.softSkills },
  ]

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md dark:border-slate-800">
      <CardHeader className="bg-slate-50 dark:bg-slate-800/50">
        <CardTitle>Progress Overview</CardTitle>
        <CardDescription>Track your learning journey and skill development</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="weekly">Weekly Activity</TabsTrigger>
            <TabsTrigger value="monthly">Monthly Progress</TabsTrigger>
            <TabsTrigger value="skills">Skills Distribution</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="mt-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="h-[300px] w-full"
              ref={chartRef}
            >
              <BarChart
                data={weeklyActivityData}
                index="name"
                categories={["hours"]}
                colors={["#6366f1"]}
                valueFormatter={(value) => `${value} hrs`}
                yAxisWidth={40}
              />
            </motion.div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">Weekly Goal</h4>
                <div className="mt-1 flex items-end justify-between">
                  <span className="text-2xl font-bold">
                    {progress.weeklyGoal.current}/{progress.weeklyGoal.target} hrs
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {Math.round((progress.weeklyGoal.current / progress.weeklyGoal.target) * 100)}% completed
                  </span>
                </div>
                <Progress
                  value={(progress.weeklyGoal.current / progress.weeklyGoal.target) * 100}
                  className="mt-2 h-2"
                />
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">Most Active Day</h4>
                <div className="mt-1 text-2xl font-bold">
                  {weeklyActivityData.reduce((max, day) => (day.hours > max.hours ? day : max)).name}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {weeklyActivityData.reduce((max, day) => (day.hours > max.hours ? day : max)).hours} hours of activity
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="monthly" className="mt-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="h-[300px] w-full"
            >
              <LineChart
                data={monthlyProgressData}
                index="name"
                categories={["progress"]}
                colors={["#8b5cf6"]}
                valueFormatter={(value) => `${value}%`}
                yAxisWidth={40}
              />
            </motion.div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">Average Monthly Progress</h4>
                <div className="text-2xl font-bold">
                  {Math.round(
                    monthlyProgressData.reduce((sum, month) => sum + month.progress, 0) / monthlyProgressData.length,
                  )}
                  %
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Consistent improvement over time</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">Best Month</h4>
                <div className="text-2xl font-bold">
                  {monthlyProgressData.reduce((max, month) => (month.progress > max.progress ? month : max)).name}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {monthlyProgressData.reduce((max, month) => (month.progress > max.progress ? month : max)).progress}%
                  progress achieved
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="mt-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="h-[300px] w-full"
            >
              <PieChart
                data={skillsData}
                index="name"
                valueFormatter={(value) => `${value}%`}
                category="value"
                colors={["#6366f1", "#8b5cf6", "#ec4899", "#14b8a6"]}
              />
            </motion.div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">Strongest Skill</h4>
                <div className="text-2xl font-bold">
                  {skillsData.reduce((max, skill) => (skill.value > max.value ? skill : max)).name}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {skillsData.reduce((max, skill) => (skill.value > max.value ? skill : max)).value}% of your learning
                  focus
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">Recommended Focus</h4>
                <div className="text-2xl font-bold">
                  {skillsData.reduce((min, skill) => (skill.value < min.value ? skill : min)).name}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Currently only {skillsData.reduce((min, skill) => (skill.value < min.value ? skill : min)).value}% of
                  your learning
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

