"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Video,
  Users,
  BookOpen,
  MessageSquare,
} from "lucide-react"
import type { MenteeData } from "@/lib/types"
import { getMenteeData } from "@/lib/data"

// Calendar event interface
interface CalendarEvent {
  id: string
  title: string
  date: Date
  startTime: string
  endTime: string
  type: "session" | "deadline" | "class" | "meeting"
  description?: string
  participants?: string[]
  location?: string
}

export function CalendarPage() {
  const [menteeData, setMenteeData] = useState<MenteeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentView, setCurrentView] = useState<"month" | "week" | "day">("month")
  const [events, setEvents] = useState<CalendarEvent[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMenteeData()
        setMenteeData(data)

        // Generate sample calendar events
        generateSampleEvents(data)
      } catch (error) {
        console.error("Error fetching mentee data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const generateSampleEvents = (data: MenteeData) => {
    const today = new Date()
    const sampleEvents: CalendarEvent[] = []

    // Generate mentor sessions
    data.currentMentors.forEach((mentor, index) => {
      const sessionDate = new Date(today)
      sessionDate.setDate(today.getDate() + index * 2 + 1)

      sampleEvents.push({
        id: `mentor-session-${index}`,
        title: `Mentoring Session with ${mentor.name}`,
        date: sessionDate,
        startTime: "10:00 AM",
        endTime: "11:00 AM",
        type: "session",
        description: "Weekly mentoring session to discuss progress and challenges",
        participants: [mentor.name, data.name],
        location: "Zoom",
      })
    })

    // Generate course deadlines
    data.currentCourses.forEach((course, index) => {
      const deadlineDate = new Date(today)
      deadlineDate.setDate(today.getDate() + index * 3 + 2)

      sampleEvents.push({
        id: `deadline-${index}`,
        title: `${course.title} Assignment Due`,
        date: deadlineDate,
        startTime: "11:59 PM",
        endTime: "11:59 PM",
        type: "deadline",
        description: `Submit the assignment for ${course.title}`,
      })
    })

    // Generate class sessions
    data.currentCourses.forEach((course, index) => {
      for (let i = 0; i < 2; i++) {
        const classDate = new Date(today)
        classDate.setDate(today.getDate() + index * 2 + i + 1)

        sampleEvents.push({
          id: `class-${index}-${i}`,
          title: `${course.title} Class`,
          date: classDate,
          startTime: i % 2 === 0 ? "2:00 PM" : "3:30 PM",
          endTime: i % 2 === 0 ? "3:30 PM" : "5:00 PM",
          type: "class",
          description: `Regular class session for ${course.title}`,
          location: "Virtual Classroom",
        })
      }
    })

    // Generate group meetings
    for (let i = 0; i < 3; i++) {
      const meetingDate = new Date(today)
      meetingDate.setDate(today.getDate() + i * 4 + 3)

      sampleEvents.push({
        id: `meeting-${i}`,
        title: `Study Group Meeting`,
        date: meetingDate,
        startTime: "6:00 PM",
        endTime: "7:30 PM",
        type: "meeting",
        description: "Weekly study group to discuss course materials and assignments",
        participants: ["Alex", "Jamie", "Taylor", "Jordan"],
        location: "Discord",
      })
    }

    setEvents(sampleEvents)
  }

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

  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get day of week for first day of month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  // Generate calendar days for current month view
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfMonth = getFirstDayOfMonth(year, month)

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: null, date: null })
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      days.push({ day, date })
    }

    return days
  }

  // Get events for a specific date
  const getEventsForDate = (date: Date | null) => {
    if (!date) return []

    return events.filter((event) => {
      const eventDate = new Date(event.date)
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      )
    })
  }

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Navigate to previous month/week/day
  const navigatePrevious = () => {
    const newDate = new Date(currentDate)
    if (currentView === "month") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else if (currentView === "week") {
      newDate.setDate(newDate.getDate() - 7)
    } else {
      newDate.setDate(newDate.getDate() - 1)
    }
    setCurrentDate(newDate)
  }

  // Navigate to next month/week/day
  const navigateNext = () => {
    const newDate = new Date(currentDate)
    if (currentView === "month") {
      newDate.setMonth(newDate.getMonth() + 1)
    } else if (currentView === "week") {
      newDate.setDate(newDate.getDate() + 7)
    } else {
      newDate.setDate(newDate.getDate() + 1)
    }
    setCurrentDate(newDate)
  }

  // Navigate to today
  const navigateToday = () => {
    setCurrentDate(new Date())
  }

  // Get event type badge
  const getEventTypeBadge = (type: string) => {
    switch (type) {
      case "session":
        return <Badge className="bg-blue-500">Mentoring</Badge>
      case "deadline":
        return <Badge className="bg-red-500">Deadline</Badge>
      case "class":
        return <Badge className="bg-green-500">Class</Badge>
      case "meeting":
        return <Badge className="bg-purple-500">Meeting</Badge>
      default:
        return <Badge>Event</Badge>
    }
  }

  // Get event type icon
  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "session":
        return <Users className="h-4 w-4 text-blue-500" />
      case "deadline":
        return <Clock className="h-4 w-4 text-red-500" />
      case "class":
        return <BookOpen className="h-4 w-4 text-green-500" />
      case "meeting":
        return <MessageSquare className="h-4 w-4 text-purple-500" />
      default:
        return <CalendarIcon className="h-4 w-4" />
    }
  }

  // Render month view
  const renderMonthView = () => {
    const calendarDays = generateCalendarDays()
    const today = new Date()

    return (
      <div className="mt-4">
        <div className="grid grid-cols-7 gap-1 text-center font-medium">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="p-2">
              {day}
            </div>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1">
          {calendarDays.map((dayObj, index) => {
            const { day, date } = dayObj
            const isToday =
              date &&
              date.getDate() === today.getDate() &&
              date.getMonth() === today.getMonth() &&
              date.getFullYear() === today.getFullYear()

            const dayEvents = getEventsForDate(date)

            return (
              <div
                key={index}
                className={`min-h-24 rounded-md border p-1 ${
                  !day
                    ? "bg-slate-50 dark:bg-slate-800/50"
                    : isToday
                      ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                }`}
              >
                {day && (
                  <>
                    <div
                      className={`text-right text-sm font-medium ${isToday ? "text-blue-600 dark:text-blue-400" : ""}`}
                    >
                      {day}
                    </div>
                    <div className="mt-1 space-y-1">
                      {dayEvents.slice(0, 3).map((event) => (
                        <div
                          key={event.id}
                          className="truncate rounded-sm bg-white p-1 text-xs shadow-sm dark:bg-slate-800"
                        >
                          <div className="flex items-center gap-1">
                            {getEventTypeIcon(event.type)}
                            <span className="truncate">{event.title}</span>
                          </div>
                        </div>
                      ))}
                      {dayEvents.length > 3 && (
                        <div className="text-center text-xs text-slate-500 dark:text-slate-400">
                          +{dayEvents.length - 3} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Render week view
  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate)
    const day = currentDate.getDay()
    startOfWeek.setDate(currentDate.getDate() - day)

    const weekDays = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      weekDays.push(date)
    }

    const today = new Date()

    return (
      <div className="mt-4">
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((date, index) => {
            const isToday =
              date.getDate() === today.getDate() &&
              date.getMonth() === today.getMonth() &&
              date.getFullYear() === today.getFullYear()

            const dayEvents = getEventsForDate(date)

            return (
              <div key={index} className="flex flex-col">
                <div className={`text-center ${isToday ? "font-bold text-blue-600 dark:text-blue-400" : ""}`}>
                  <div>{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()]}</div>
                  <div
                    className={`mt-1 flex h-8 w-8 items-center justify-center rounded-full mx-auto ${
                      isToday ? "bg-blue-100 dark:bg-blue-900/50" : ""
                    }`}
                  >
                    {date.getDate()}
                  </div>
                </div>
                <div
                  className={`mt-2 flex-1 rounded-md border p-2 ${
                    isToday ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800" : ""
                  }`}
                >
                  <div className="space-y-2">
                    {dayEvents.map((event) => (
                      <div key={event.id} className="rounded-md bg-white p-2 text-sm shadow-sm dark:bg-slate-800">
                        <div className="flex items-center gap-1">
                          {getEventTypeIcon(event.type)}
                          <span className="font-medium">{event.title}</span>
                        </div>
                        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          {event.startTime} - {event.endTime}
                        </div>
                      </div>
                    ))}
                    {dayEvents.length === 0 && (
                      <div className="text-center text-xs text-slate-400 dark:text-slate-500">No events</div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Render day view
  const renderDayView = () => {
    const dayEvents = getEventsForDate(currentDate)
    const hours = Array.from({ length: 12 }, (_, i) => i + 8) // 8 AM to 7 PM

    return (
      <div className="mt-4">
        <div className="rounded-md border">
          {hours.map((hour) => {
            const hourStr = hour <= 12 ? `${hour} AM` : `${hour - 12} PM`
            const hourEvents = dayEvents.filter((event) => {
              const eventHour = Number.parseInt(event.startTime.split(":")[0])
              const isPM = event.startTime.includes("PM")
              const normalizedEventHour = isPM && eventHour !== 12 ? eventHour + 12 : eventHour
              return normalizedEventHour === hour
            })

            return (
              <div key={hour} className="flex border-b last:border-b-0">
                <div className="w-20 border-r p-2 text-right text-sm text-slate-500 dark:text-slate-400">{hourStr}</div>
                <div className="flex-1 p-2">
                  {hourEvents.map((event) => (
                    <div key={event.id} className="rounded-md bg-white p-2 text-sm shadow-sm dark:bg-slate-800">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {getEventTypeIcon(event.type)}
                          <span className="font-medium">{event.title}</span>
                        </div>
                        {getEventTypeBadge(event.type)}
                      </div>
                      <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {event.startTime} - {event.endTime}
                      </div>
                      {event.description && <div className="mt-2 text-xs">{event.description}</div>}
                      {event.location && (
                        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          Location: {event.location}
                        </div>
                      )}
                      {event.participants && event.participants.length > 0 && (
                        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          Participants: {event.participants.join(", ")}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold">Calendar</h1>
            <p className="text-slate-500 dark:text-slate-400">Manage your schedule and upcoming events</p>
          </div>
          <div className="flex gap-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={navigatePrevious}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={navigateToday}>
                  Today
                </Button>
                <Button variant="outline" size="icon" onClick={navigateNext}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <h2 className="text-xl font-bold">
                  {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <Select
                  value={currentView}
                  onValueChange={(value) => setCurrentView(value as "month" | "week" | "day")}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="View" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">Month</SelectItem>
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="day">Day</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {currentView === "month" && renderMonthView()}
            {currentView === "week" && renderWeekView()}
            {currentView === "day" && renderDayView()}
          </CardContent>
        </Card>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Your schedule for the next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events
                  .filter((event) => {
                    const eventDate = new Date(event.date)
                    const today = new Date()
                    const sevenDaysLater = new Date(today)
                    sevenDaysLater.setDate(today.getDate() + 7)
                    return eventDate >= today && eventDate <= sevenDaysLater
                  })
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .slice(0, 5)
                  .map((event) => (
                    <div key={event.id} className="flex items-start gap-4 rounded-lg border p-4 dark:border-slate-800">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                        {getEventTypeIcon(event.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{event.title}</h3>
                          {getEventTypeBadge(event.type)}
                        </div>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          {formatDate(event.date)} • {event.startTime} - {event.endTime}
                        </p>
                        {event.description && <p className="mt-2 text-sm">{event.description}</p>}
                        {event.location && (
                          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Location: {event.location}</p>
                        )}
                      </div>
                      <Button variant="outline" size="sm">
                        <Video className="mr-2 h-3 w-3" />
                        Join
                      </Button>
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

