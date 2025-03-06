"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Award, ChevronLeft, ChevronRight } from "lucide-react"
import type { Course } from "@/lib/types"

interface CurrentCoursesProps {
  courses: Course[]
}

export function CurrentCourses({ courses }: CurrentCoursesProps) {
  const [visibleCourses, setVisibleCourses] = useState(3)
  const [startIndex, setStartIndex] = useState(0)

  const nextCourses = () => {
    if (startIndex + visibleCourses < courses.length) {
      setStartIndex(startIndex + 1)
    }
  }

  const prevCourses = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1)
    }
  }

  const displayedCourses = courses.slice(startIndex, startIndex + visibleCourses)

  return (
    <section className="mt-12">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Current Courses</h2>
          <p className="text-slate-500 dark:text-slate-400">Continue your learning journey</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevCourses}
            disabled={startIndex === 0}
            className="rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextCourses}
            disabled={startIndex + visibleCourses >= courses.length}
            className="rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayedCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="transition-all duration-300"
          >
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
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Continue Learning
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

