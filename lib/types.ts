export interface MenteeData {
  id: string
  name: string
  email: string
  avatar: string
  joinDate: string
  progress: ProgressData
  currentCourses: Course[]
  completedCourses: number
  currentMentors: Mentor[]
  recommendedMentors: Mentor[]
  upcomingTasks: Task[]
  nextMilestone: {
    title: string
    daysLeft: number
  }
}

export interface ProgressData {
  overall: number
  weeklyGoal: {
    current: number
    target: number
  }
  weeklyActivity: number[]
  monthlyProgress: number[]
  skillsDistribution: {
    programming: number
    design: number
    business: number
    softSkills: number
  }
}

export interface Course {
  id: string
  title: string
  description: string
  category: string
  image: string
  progress: number
  duration: string
  lessons: number
  completedLessons: number
  instructor: string
}

export interface Mentor {
  id: string
  name: string
  title: string
  avatar: string
  expertise: string[]
  rating: number
  reviewCount: number
  availability: string
}

export interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  priority: string
  course?: string
  completed: boolean
}

