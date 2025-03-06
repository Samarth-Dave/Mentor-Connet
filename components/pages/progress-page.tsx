"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart, LineChart, PieChart } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Calendar, Award, Target } from "lucide-react"
import type { MenteeData } from "@/lib/types"
import { getMenteeData } from "@/lib/data"

export function ProgressPage() {
  const [menteeData, setMenteeData] = useState<MenteeData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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

  // Weekly activity data
  const weeklyActivityData = [
    { name: "Mon", hours: menteeData.progress.weeklyActivity[0] },
    { name: "Tue", hours: menteeData.progress.weeklyActivity[1] },
    { name: "Wed", hours: menteeData.progress.weeklyActivity[2] },
    { name: "Thu", hours: menteeData.progress.weeklyActivity[3] },
    { name: "Fri", hours: menteeData.progress.weeklyActivity[4] },
    { name: "Sat", hours: menteeData.progress.weeklyActivity[5] },
    { name: "Sun", hours: menteeData.progress.weeklyActivity[6] },
  ]

  // Monthly progress data
  const monthlyProgressData = [
    { name: "Jan", progress: menteeData.progress.monthlyProgress[0] },
    { name: "Feb", progress: menteeData.progress.monthlyProgress[1] },
    { name: "Mar", progress: menteeData.progress.monthlyProgress[2] },
    { name: "Apr", progress: menteeData.progress.monthlyProgress[3] },
    { name: "May", progress: menteeData.progress.monthlyProgress[4] },
    { name: "Jun", progress: menteeData.progress.monthlyProgress[5] },
  ]

  // Skills distribution data
  const skillsData = [
    { name: "Programming", value: menteeData.progress.skillsDistribution.programming },
    { name: "Design", value: menteeData.progress.skillsDistribution.design },
    { name: "Business", value: menteeData.progress.skillsDistribution.business },
    { name: "Soft Skills", value: menteeData.progress.skillsDistribution.softSkills },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold">Progress Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400">Track your learning journey and skill development</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Last 30 Days
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{menteeData.progress.overall}%</div>
              <Progress value={menteeData.progress.overall} className="mt-2 h-2" />
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">+5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Weekly Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {menteeData.progress.weeklyGoal.current}/{menteeData.progress.weeklyGoal.target} hrs
              </div>
              <Progress
                value={(menteeData.progress.weeklyGoal.current / menteeData.progress.weeklyGoal.target) * 100}
                className="mt-2 h-2"
              />
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                {Math.round((menteeData.progress.weeklyGoal.current / menteeData.progress.weeklyGoal.target) * 100)}%
                completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completed Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{menteeData.completedCourses}</div>
              <div className="mt-2 flex items-center">
                <Award className="mr-1 h-4 w-4 text-amber-500" />
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {menteeData.currentCourses.length} courses in progress
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Next Milestone</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold truncate">{menteeData.nextMilestone.title}</div>
              <div className="mt-2 flex items-center">
                <Target className="mr-1 h-4 w-4 text-blue-500" />
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {menteeData.nextMilestone.daysLeft} days left
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Learning Activity</CardTitle>
              <CardDescription>Your weekly learning hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <BarChart
                  data={weeklyActivityData}
                  index="name"
                  categories={["hours"]}
                  colors={["#6366f1"]}
                  valueFormatter={(value) => `${value} hrs`}
                  yAxisWidth={40}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Progress</CardTitle>
              <CardDescription>Your progress over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <LineChart
                  data={monthlyProgressData}
                  index="name"
                  categories={["progress"]}
                  colors={["#8b5cf6"]}
                  valueFormatter={(value) => `${value}%`}
                  yAxisWidth={40}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills Distribution</CardTitle>
              <CardDescription>Breakdown of your learning focus areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <PieChart
                  data={skillsData}
                  index="name"
                  valueFormatter={(value) => `${value}%`}
                  category="value"
                  colors={["#6366f1", "#8b5cf6", "#ec4899", "#14b8a6"]}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Learning Achievements</CardTitle>
              <CardDescription>Milestones and certifications you've earned</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-start gap-4 rounded-lg border p-4 dark:border-slate-800">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                      <Award className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {["JavaScript Fundamentals", "Responsive Web Design", "UI/UX Principles"][i]}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {["Completed with 92% score", "Completed all projects", "Passed final assessment"][i]}
                      </p>
                      <div className="mt-2">
                        <Badge variant="secondary">{["Certificate", "Badge", "Achievement"][i]}</Badge>
                      </div>
                    </div>
                    <div className="ml-auto text-right text-sm text-slate-500 dark:text-slate-400">
                      {["Mar 15, 2023", "Apr 22, 2023", "May 10, 2023"][i]}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

