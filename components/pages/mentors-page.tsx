"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, MessageSquare, Star, Calendar, Video, Filter, Grid3X3, List, UserPlus } from "lucide-react"
import type { MenteeData, Mentor } from "@/lib/types"
import { getMenteeData } from "@/lib/data"

export function MentorsPage() {
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

  // Filter mentors based on search query
  const filteredCurrentMentors = menteeData.currentMentors.filter(
    (mentor) =>
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.expertise.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const filteredRecommendedMentors = menteeData.recommendedMentors.filter(
    (mentor) =>
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.expertise.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Past mentors (simulated)
  const pastMentors: Mentor[] = [
    {
      id: "past-001",
      name: "Sarah Williams",
      title: "Frontend Developer",
      avatar: "/placeholder.svg?height=80&width=80",
      expertise: ["HTML", "CSS", "JavaScript", "React"],
      rating: 4.8,
      reviewCount: 65,
      availability: "Completed",
    },
    {
      id: "past-002",
      name: "Daniel Brown",
      title: "UX Designer",
      avatar: "/placeholder.svg?height=80&width=80",
      expertise: ["User Research", "Wireframing", "Prototyping"],
      rating: 4.6,
      reviewCount: 42,
      availability: "Completed",
    },
  ]

  const renderMentorCard = (mentor: Mentor) => (
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

        <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center justify-center">
            <Calendar className="mr-1 h-3 w-3" />
            Availability: {mentor.availability}
          </span>
        </div>

        <div className="mt-4 flex gap-2">
          <Button className="flex-1" variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            Message
          </Button>
          <Button className="flex-1">
            <Video className="mr-2 h-4 w-4" />
            Call
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderMentorListItem = (mentor: Mentor) => (
    <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
      <div className="flex flex-col p-4 sm:flex-row sm:items-center">
        <div className="flex flex-col items-center sm:flex-row sm:space-x-4">
          <Avatar className="h-16 w-16 border-2 border-white dark:border-slate-900">
            <AvatarImage src={mentor.avatar} alt={mentor.name} />
            <AvatarFallback className="text-lg">
              {mentor.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="mt-4 text-center sm:mt-0 sm:text-left">
            <h3 className="text-lg font-bold">{mentor.name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{mentor.title}</p>
            <div className="mt-1 flex items-center justify-center space-x-1 sm:justify-start">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < mentor.rating
                      ? "fill-amber-400 text-amber-400"
                      : "fill-slate-200 text-slate-200 dark:fill-slate-700 dark:text-slate-700"
                  }`}
                />
              ))}
              <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">({mentor.reviewCount})</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex-1 sm:mt-0 sm:ml-4">
          <div className="flex flex-wrap gap-1">
            {mentor.expertise.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center">
              <Calendar className="mr-1 h-3 w-3" />
              Availability: {mentor.availability}
            </span>
          </div>
        </div>

        <div className="mt-4 flex gap-2 sm:mt-0 sm:ml-auto">
          <Button variant="outline" size="sm">
            <MessageSquare className="mr-2 h-3 w-3" />
            Message
          </Button>
          <Button size="sm">
            <Video className="mr-2 h-3 w-3" />
            Call
          </Button>
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
            <h1 className="text-3xl font-bold">Mentors</h1>
            <p className="text-slate-500 dark:text-slate-400">Connect with experts to accelerate your learning</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule
            </Button>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Find New Mentor
            </Button>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Tabs defaultValue="current" className="w-full" onValueChange={(value) => setActiveTab(value)}>
            <TabsList>
              <TabsTrigger value="current">Current Mentors</TabsTrigger>
              <TabsTrigger value="past">Past Mentors</TabsTrigger>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search mentors or skills..."
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
                {filteredCurrentMentors.map((mentor) => (
                  <div key={mentor.id}>{renderMentorCard(mentor)}</div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCurrentMentors.map((mentor) => (
                  <div key={mentor.id}>{renderMentorListItem(mentor)}</div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "past" && (
          <>
            {viewMode === "grid" ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pastMentors.map((mentor) => (
                  <div key={mentor.id}>{renderMentorCard(mentor)}</div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {pastMentors.map((mentor) => (
                  <div key={mentor.id}>{renderMentorListItem(mentor)}</div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "recommended" && (
          <>
            {viewMode === "grid" ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredRecommendedMentors.map((mentor) => (
                  <div key={mentor.id}>{renderMentorCard(mentor)}</div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRecommendedMentors.map((mentor) => (
                  <div key={mentor.id}>{renderMentorListItem(mentor)}</div>
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

