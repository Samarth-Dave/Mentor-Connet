"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, MessageSquare, Star, ChevronLeft, ChevronRight } from "lucide-react"
import type { Mentor } from "@/lib/types"

interface ExploreMentorsProps {
  mentors: Mentor[]
}

export function ExploreMentors({ mentors }: ExploreMentorsProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [visibleMentors, setVisibleMentors] = useState(4)
  const [startIndex, setStartIndex] = useState(0)

  const filteredMentors = mentors.filter(
    (mentor) =>
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.expertise.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const nextMentors = () => {
    if (startIndex + visibleMentors < filteredMentors.length) {
      setStartIndex(startIndex + 1)
    }
  }

  const prevMentors = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1)
    }
  }

  const displayedMentors = filteredMentors.slice(startIndex, startIndex + visibleMentors)

  return (
    <section className="mt-12">
      <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold">Explore Mentors</h2>
          <p className="text-slate-500 dark:text-slate-400">Find the perfect mentor for your learning journey</p>
        </div>
        <div className="flex w-full items-center space-x-2 sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search mentors or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevMentors}
              disabled={startIndex === 0}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextMentors}
              disabled={startIndex + visibleMentors >= filteredMentors.length}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {displayedMentors.map((mentor, index) => (
          <motion.div
            key={mentor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="transition-all duration-300"
          >
            <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
              <div className="relative h-24 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 transform">
                  <Avatar className="h-20 w-20 border-4 border-white dark:border-slate-900">
                    <AvatarImage src={mentor.avatar} alt={mentor.name} />
                    <AvatarFallback className="text-lg">
                      {mentor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <CardContent className="mt-12 p-4 text-center">
                <h3 className="text-lg font-bold">{mentor.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{mentor.title}</p>

                <div className="mt-2 flex items-center justify-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < mentor.rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-slate-200 text-slate-200 dark:fill-slate-700 dark:text-slate-700"
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">({mentor.reviewCount})</span>
                </div>

                <div className="mt-3 flex flex-wrap justify-center gap-1">
                  {mentor.expertise.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {mentor.expertise.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{mentor.expertise.length - 3} more
                    </Badge>
                  )}
                </div>

                <Button className="mt-4 w-full" variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Connect
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

