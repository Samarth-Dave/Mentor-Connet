import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  UserIcon,
  CalendarIcon,
  BellIcon,
  UsersIcon,
  VideoIcon,
  UserPlusIcon,
  LineChartIcon,
  TargetIcon,
  FileTextIcon,
  BotIcon,
} from "lucide-react"

export function DashboardFeatures() {
  return (
    <section className="py-12 relative">
      {/* Lightbulb doodle */}
      <svg
        className="absolute bottom-0 left-0 w-32 h-32 text-secondary/10 -z-10"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 21C9 21.55 9.45 22 10 22H14C14.55 22 15 21.55 15 21V20H9V21ZM12 2C8.14 2 5 5.14 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.14 15.86 2 12 2ZM14.85 13.1L14 13.7V16H10V13.7L9.15 13.1C7.8 12.16 7 10.63 7 9C7 6.24 9.24 4 12 4C14.76 4 17 6.24 17 9C17 10.63 16.2 12.16 14.85 13.1Z"
          fill="currentColor"
        />
      </svg>

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Powerful Dashboard Features</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Tailored experiences for both mentors and mentees to maximize the mentorship journey.
        </p>
      </div>

      <Tabs defaultValue="mentor" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="mentor">For Mentors</TabsTrigger>
          <TabsTrigger value="mentee">For Mentees</TabsTrigger>
        </TabsList>

        <TabsContent value="mentor" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<UserIcon className="h-6 w-6" />}
              title="Profile Management"
              description="Showcase your expertise, experience, and availability to attract the right mentees."
            />
            <FeatureCard
              icon={<CalendarIcon className="h-6 w-6" />}
              title="Calendar Integration"
              description="Manage your mentorship schedule with easy calendar integration and automated reminders."
            />
            <FeatureCard
              icon={<BellIcon className="h-6 w-6" />}
              title="Daily Updates"
              description="Get notified about mentee progress, upcoming sessions, and platform announcements."
            />
            <FeatureCard
              icon={<UsersIcon className="h-6 w-6" />}
              title="Mentee Requests"
              description="Review and respond to mentorship requests with detailed mentee information."
            />
            <FeatureCard
              icon={<VideoIcon className="h-6 w-6" />}
              title="Live Weekly Calls"
              description="Host group sessions with multiple mentees for efficient knowledge sharing."
            />
            <FeatureCard
              icon={<BotIcon className="h-6 w-6" />}
              title="Fabuddy AI Assistant"
              description="Get help organizing your mentorship activities and preparing for sessions."
            />
          </div>
        </TabsContent>

        <TabsContent value="mentee" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<UserPlusIcon className="h-6 w-6" />}
              title="Request Mentors"
              description="Browse and connect with mentors who match your career goals and interests."
            />
            <FeatureCard
              icon={<LineChartIcon className="h-6 w-6" />}
              title="Progress Tracking"
              description="Visualize your growth with comprehensive progress metrics and milestone tracking."
            />
            <FeatureCard
              icon={<TargetIcon className="h-6 w-6" />}
              title="Goal Setting"
              description="Set SMART goals with your mentor and track your journey toward achieving them."
            />
            <FeatureCard
              icon={<VideoIcon className="h-6 w-6" />}
              title="Video Chat"
              description="Connect face-to-face with your mentor through our integrated video platform."
            />
            <FeatureCard
              icon={<FileTextIcon className="h-6 w-6" />}
              title="Notes Taking"
              description="Capture important insights from your mentorship sessions with our built-in notes feature."
            />
            <FeatureCard
              icon={<BotIcon className="h-6 w-6" />}
              title="Fabuddy AI Assistant"
              description="Get reminders for tasks and assistance with mentorship-related questions."
            />
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="border-none shadow hover:shadow-md transition-all">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="bg-primary/10 p-3 rounded-full text-primary">{icon}</div>
        <div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

