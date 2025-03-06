import type { MenteeData } from "./types"

export function getMenteeData(): Promise<MenteeData> {
  // This would normally be a fetch to an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: "m-001",
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        avatar: "/placeholder.svg?height=128&width=128",
        joinDate: "2023-01-15",
        progress: {
          overall: 68,
          weeklyGoal: {
            current: 12,
            target: 15,
          },
          weeklyActivity: [2, 3, 5, 1, 4, 2, 3],
          monthlyProgress: [45, 52, 58, 63, 65, 68],
          skillsDistribution: {
            programming: 45,
            design: 25,
            business: 15,
            softSkills: 15,
          },
        },
        currentCourses: [
          {
            id: "c-001",
            title: "Advanced JavaScript Fundamentals",
            description: "Master JavaScript with modern ES6+ features and patterns.",
            category: "Programming",
            image: "/placeholder.svg?height=160&width=320",
            progress: 75,
            duration: "8 weeks",
            lessons: 24,
            completedLessons: 18,
            instructor: "Sarah Miller",
          },
          {
            id: "c-002",
            title: "UI/UX Design Principles",
            description: "Learn the fundamentals of creating user-friendly interfaces.",
            category: "Design",
            image: "/placeholder.svg?height=160&width=320",
            progress: 45,
            duration: "6 weeks",
            lessons: 18,
            completedLessons: 8,
            instructor: "David Chen",
          },
          {
            id: "c-003",
            title: "React & Next.js Masterclass",
            description: "Build modern web applications with React and Next.js.",
            category: "Programming",
            image: "/placeholder.svg?height=160&width=320",
            progress: 30,
            duration: "10 weeks",
            lessons: 30,
            completedLessons: 9,
            instructor: "Michael Brown",
          },
          {
            id: "c-004",
            title: "Business Communication Skills",
            description: "Enhance your professional communication in the workplace.",
            category: "Business",
            image: "/placeholder.svg?height=160&width=320",
            progress: 60,
            duration: "4 weeks",
            lessons: 12,
            completedLessons: 7,
            instructor: "Emily Wilson",
          },
        ],
        completedCourses: 5,
        currentMentors: [
          {
            id: "mentor-001",
            name: "Dr. James Wilson",
            title: "Senior Software Engineer",
            avatar: "/placeholder.svg?height=80&width=80",
            expertise: ["JavaScript", "React", "Node.js", "System Design"],
            rating: 4.9,
            reviewCount: 127,
            availability: "Mon, Wed, Fri",
          },
          {
            id: "mentor-002",
            name: "Lisa Chen",
            title: "UX Design Lead",
            avatar: "/placeholder.svg?height=80&width=80",
            expertise: ["UI/UX", "Figma", "User Research", "Prototyping"],
            rating: 4.7,
            reviewCount: 89,
            availability: "Tue, Thu",
          },
        ],
        recommendedMentors: [
          {
            id: "mentor-003",
            name: "Dr. James Wilson",
            title: "Senior Software Engineer",
            avatar: "/placeholder.svg?height=80&width=80",
            expertise: ["JavaScript", "React", "Node.js", "System Design"],
            rating: 4.9,
            reviewCount: 127,
            availability: "Mon, Wed, Fri",
          },
          {
            id: "mentor-004",
            name: "Lisa Chen",
            title: "UX Design Lead",
            avatar: "/placeholder.svg?height=80&width=80",
            expertise: ["UI/UX", "Figma", "User Research", "Prototyping"],
            rating: 4.7,
            reviewCount: 89,
            availability: "Tue, Thu",
          },
          {
            id: "mentor-005",
            name: "Robert Taylor",
            title: "Product Manager",
            avatar: "/placeholder.svg?height=80&width=80",
            expertise: ["Product Strategy", "Agile", "Market Research", "Analytics"],
            rating: 4.8,
            reviewCount: 103,
            availability: "Mon, Fri",
          },
          {
            id: "mentor-006",
            name: "Maria Rodriguez",
            title: "Full Stack Developer",
            avatar: "/placeholder.svg?height=80&width=80",
            expertise: ["Python", "Django", "React", "AWS", "Database Design"],
            rating: 4.6,
            reviewCount: 78,
            availability: "Wed, Thu, Sat",
          },
          {
            id: "mentor-007",
            name: "Thomas Johnson",
            title: "Data Science Specialist",
            avatar: "/placeholder.svg?height=80&width=80",
            expertise: ["Machine Learning", "Python", "Data Visualization", "Statistics"],
            rating: 4.8,
            reviewCount: 92,
            availability: "Tue, Thu, Sun",
          },
        ],
        upcomingTasks: [
          {
            id: "task-001",
            title: "Complete JavaScript Assignment",
            description: "Finish the advanced array methods exercise",
            dueDate: "Tomorrow, 11:59 PM",
            priority: "High",
            course: "Advanced JavaScript",
            completed: false,
          },
          {
            id: "task-002",
            title: "UI Design Mockup Review",
            description: "Review feedback from mentor on dashboard design",
            dueDate: "Wednesday, 3:00 PM",
            priority: "Medium",
            course: "UI/UX Design",
            completed: false,
          },
          {
            id: "task-003",
            title: "React Project Milestone",
            description: "Complete authentication module for the project",
            dueDate: "Friday, 5:00 PM",
            priority: "High",
            course: "React & Next.js",
            completed: false,
          },
          {
            id: "task-004",
            title: "Mentor Meeting Preparation",
            description: "Prepare questions and progress report",
            dueDate: "Thursday, 2:00 PM",
            priority: "Medium",
            completed: false,
          },
          {
            id: "task-005",
            title: "Business Communication Quiz",
            description: "Take the mid-course assessment quiz",
            dueDate: "Next Monday, 10:00 AM",
            priority: "Low",
            course: "Business Communication",
            completed: false,
          },
        ],
        nextMilestone: {
          title: "JavaScript Certification",
          daysLeft: 14,
        },
      })
    }, 1000)
  })
}

export function getMotivationalQuote(): string {
  const quotes = [
    "The expert in anything was once a beginner.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The only way to do great work is to love what you do.",
    "Learning is a journey, not a destination.",
    "Your future is created by what you do today, not tomorrow.",
    "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
    "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
    "The beautiful thing about learning is that nobody can take it away from you.",
    "Believe you can and you're halfway there.",
    "The only limit to our realization of tomorrow will be our doubts of today.",
  ]

  return quotes[Math.floor(Math.random() * quotes.length)]
}

