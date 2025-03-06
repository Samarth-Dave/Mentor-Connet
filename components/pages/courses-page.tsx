"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BookOpen, Clock, Award, Search, Filter, Grid3X3, List, Calendar } from "lucide-react"
import type { MenteeData, Course } from "@/lib/types"
import { getMenteeData } from "@/lib/data"

export function CoursesPage() {
  const [menteeData, setMenteeData] = useState<MenteeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [activeTab, setActiveTab] = useState("current")

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

  // Filter courses based on search query
  const filteredCourses = menteeData.currentCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Recommended courses (simulated)
  const recommendedCourses: Course[] = [
    {
      id: "rec-001",
      title: "Advanced React Patterns",
      description: "Learn advanced React patterns and performance optimization techniques.",
      category: "Programming",
      image: "/placeholder.svg?height=160&width=320",
      progress: 0,
      duration: "6 weeks",
      lessons: 18,
      completedLessons: 0,
      instructor: "Michael Johnson",
    },
    {
      id: "rec-002",
      title: "UX Research Methods",
      description: "Master the art of user research to create better product experiences.",
      category: "Design",
      image: "/placeholder.svg?height=160&width=320",
      progress: 0,
      duration: "4 weeks",
      lessons: 12,
      completedLessons: 0,
      instructor: "Emma Rodriguez",
    },
    {
      id: "rec-003",
      title: "Data Visualization with D3.js",
      description: "Create powerful interactive data visualizations for the web.",
      category: "Programming",
      image: "/placeholder.svg?height=160&width=320",
      progress: 0,
      duration: "8 weeks",
      lessons: 24,
      completedLessons: 0,
      instructor: "David Lee",
    },
  ]

  // Completed courses (simulated)
  const completedCourses: Course[] = [
    {
      id: "comp-001",
      title: "HTML & CSS Fundamentals",
      description: "Learn the building blocks of web development.",
      category: "Programming",
      image: "/placeholder.svg?height=160&width=320",
      progress: 100,
      duration: "4 weeks",
      lessons: 12,
      completedLessons: 12,
      instructor: "Jennifer Smith",
    },
    {
      id: "comp-002",
      title: "Introduction to JavaScript",
      description: "Master the basics of JavaScript programming.",
      category: "Programming",
      image: "/placeholder.svg?height=160&width=320",
      progress: 100,
      duration: "6 weeks",
      lessons: 18,
      completedLessons: 18,
      instructor: "Robert Johnson",
    },
  ]

  const renderCourseCard = (course: Course) => (
    <Card className="h-full overflow-hidden border-slate-200 dark:border-slate-800">
      <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${course.image})` }}>
        <div className="flex h-full w-full items-end bg-gradient-to-t from-black/60 to-transparent p-4">
          <Badge className="bg-blue-500 hover:bg-blue-600">{course.category}</Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1">{course.title}</CardTitle>
        <CardDescription className="flex items-center">
          <Clock className="mr-1 h-3 w-3" />
          {course.duration} • {course.lessons} lessons
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="mb-4 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">{course.description}</p>
        <div className="mb-1 flex items-center justify-between">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm font-medium">{course.progress}%</span>
        </div>
        <Progress value={course.progress} className="h-2" />

        <div className="mt-4 flex items-center text-sm text-slate-500 dark:text-slate-400">
          <Award className="mr-1 h-4 w-4 text-amber-500" />
          <span>
            {course.completedLessons}/{course.lessons} lessons completed
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          disabled={course.progress === 100}
        >
          <BookOpen className="mr-2 h-4 w-4" />
          {course.progress === 100 ? "Completed" : "Continue Learning"}
        </Button>
      </CardFooter>
    </Card>
  )

  const renderCourseListItem = (course: Course) => (
    <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
      <div className="flex flex-col md:flex-row">
        <div
          className="h-40 w-full bg-cover bg-center md:h-auto md:w-48"
          style={{ backgroundImage: `url(${course.image})` }}
        >
          <div className="flex h-full w-full items-end bg-gradient-to-t from-black/60 to-transparent p-4 md:items-start">
            <Badge className="bg-blue-500 hover:bg-blue-600">{course.category}</Badge>
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <CardHeader className="pb-2">
            <CardTitle>{course.title}</CardTitle>
            <CardDescription className="flex items-center">
              <Clock className="mr-1 h-3 w-3" />
              {course.duration} • {course.lessons} lessons • Instructor: {course.instructor}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">{course.description}</p>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-medium">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />

            <div className="mt-4 flex items-center text-sm text-slate-500 dark:text-slate-400">
              <Award className="mr-1 h-4 w-4 text-amber-500" />
              <span>
                {course.completedLessons}/{course.lessons} lessons completed
              </span>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              disabled={course.progress === 100}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              {course.progress === 100 ? "Completed" : "Continue Learning"}
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold">Courses</h1>
            <p className="text-slate-500 dark:text-slate-400">Manage your learning journey</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule
            </Button>
            <Button>
              <BookOpen className="mr-2 h-4 w-4" />
              Browse Catalog
            </Button>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Tabs defaultValue="current" className="w-full" onValueChange={(value) => setActiveTab(value)}>
            <TabsList>
              <TabsTrigger value="current">Current Courses</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-slate-100 dark:bg-slate-800" : ""}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-slate-100 dark:bg-slate-800" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {activeTab === "current" && (
          <>
            {viewMode === "grid" ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.map((course) => (
                  <div key={course.id}>{renderCourseCard(course)}</div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCourses.map((course) => (
                  <div key={course.id}>{renderCourseListItem(course)}</div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "completed" && (
          <>
            {viewMode === "grid" ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {completedCourses.map((course) => (
                  <div key={course.id}>{renderCourseCard(course)}</div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {completedCourses.map((course) => (
                  <div key={course.id}>{renderCourseListItem(course)}</div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "recommended" && (
          <>
            {viewMode === "grid" ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {recommendedCourses.map((course) => (
                  <div key={course.id}>{renderCourseCard(course)}</div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {recommendedCourses.map((course) => (
                  <div key={course.id}>{renderCourseListItem(course)}</div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}

