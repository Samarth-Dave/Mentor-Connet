import { LightbulbIcon, UsersIcon, ClockIcon, TrendingUpIcon } from "lucide-react"
import { Users, Clock, Lightbulb, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const problems = [
  {
    question: "Finding the right mentor?",
    solution: "Our AI matching algorithm connects you with the perfect mentor based on your goals and interests.",
    icon: UsersIcon,
    largeIcon: Users,
  },
  {
    question: "No time for meetings?",
    solution: "Flexible scheduling with calendar integration makes finding time for mentorship easy.",
    icon: ClockIcon,
    largeIcon: Clock,
  },
  {
    question: "Unsure where to start?",
    solution: "Guided onboarding and goal-setting tools help you begin your mentorship journey with clarity.",
    icon: LightbulbIcon,
    largeIcon: Lightbulb,
  },
  {
    question: "Can't track progress?",
    solution: "Comprehensive analytics and milestone tracking to visualize your growth.",
    icon: TrendingUpIcon,
    largeIcon: TrendingUp,
  },
]

export function ProblemSolving() {
  return (
    <section className="py-12 relative overflow-hidden">
      {/* Background doodle */}
      <svg
        className="absolute top-0 right-0 w-64 h-64 text-primary/5 -z-10"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M44.5,-76.3C59.1,-69.9,73,-59.2,79.7,-45.2C86.4,-31.2,85.9,-15.6,83.2,-1.6C80.5,12.5,75.5,25,68.3,36.2C61.1,47.4,51.7,57.3,40.3,64.8C28.9,72.3,14.4,77.3,-0.7,78.5C-15.8,79.7,-31.6,77,-45.1,70C-58.6,63,-69.8,51.6,-76.7,38.1C-83.6,24.6,-86.2,9,-85.6,-6.5C-84.9,-22.1,-81,-37.6,-72.2,-49.7C-63.4,-61.8,-49.8,-70.5,-35.8,-77.1C-21.8,-83.7,-7.3,-88.2,7.3,-88.8C21.8,-89.5,43.6,-86.3,44.5,-76.3Z"
          transform="translate(100 100)"
        />
      </svg>

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Common Mentorship Challenges Solved</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We've identified the biggest obstacles in mentorship and built solutions to address each one.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {problems.map((problem, index) => (
          <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow animate-float">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <problem.icon className="h-8 w-8 text-primary animate-pulse-slow" />
                <problem.largeIcon className="h-16 w-16 text-primary/20" />
              </div>
              <CardTitle className="text-xl mt-4">{problem.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">{problem.solution}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

