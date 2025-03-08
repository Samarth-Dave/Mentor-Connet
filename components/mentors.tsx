import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarIcon } from "lucide-react"

const mentors = [
  {
    name: "Dr. Sarah Chen",
    image: "/placeholder.svg?height=200&width=200",
    industry: "Technology",
    oneLiner: "Helping tech enthusiasts navigate the AI revolution",
    experience: "15+ years in Silicon Valley, former CTO at TechGiant",
    rating: 4.9,
  },
  {
    name: "Marcus Johnson",
    image: "",
    industry: "Finance",
    oneLiner: "Turning financial confusion into clarity",
    experience: "Investment banker turned financial educator with 12 years experience",
    rating: 4.8,
  },
  {
    name: "Priya Sharma",
    image: "/placeholder.svg?height=200&width=200",
    industry: "Healthcare",
    oneLiner: "Bridging the gap between medicine and management",
    experience: "MD/MBA with experience in hospital administration and health tech",
    rating: 5.0,
  },
  {
    name: "James Wilson",
    image: "/placeholder.svg?height=200&width=200",
    industry: "Creative Arts",
    oneLiner: "Nurturing the next generation of creative thinkers",
    experience: "Award-winning film director with 20+ years in the industry",
    rating: 4.7,
  },
]

export function Mentors() {
  return (
    <section className="py-12 relative">
      {/* Background doodle */}
      <svg
        className="absolute bottom-0 left-0 w-64 h-64 text-secondary/10 -z-10"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M39.9,-67.9C52.8,-60.7,65,-51.6,73.3,-39.4C81.7,-27.2,86.1,-11.8,84.4,2.9C82.7,17.7,74.8,31.8,65.8,44.8C56.8,57.8,46.6,69.7,33.7,76.3C20.8,82.9,5.2,84.2,-10.4,82.1C-26,80,-41.5,74.5,-54.1,65.3C-66.7,56.2,-76.3,43.4,-80.9,29C-85.5,14.6,-85.1,-1.4,-81.2,-16.3C-77.4,-31.2,-70.1,-45,-59.3,-55.6C-48.6,-66.2,-34.4,-73.6,-20.1,-77.5C-5.8,-81.4,8.6,-81.8,21.6,-77.7C34.6,-73.6,46.3,-65,39.9,-67.9Z"
          transform="translate(100 100)"
        />
      </svg>

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Top Mentors</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Learn from industry leaders who are passionate about sharing their knowledge and experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mentors.map((mentor, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-square relative overflow-hidden">
              <img
                src={mentor.image || "/placeholder.svg"}
                alt={mentor.name}
                className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
              />
              <Badge className="absolute top-3 right-3 bg-primary/90">{mentor.industry}</Badge>
            </div>

            <CardHeader className="pb-2">
              <h3 className="text-xl font-bold">{mentor.name}</h3>
              <p className="text-muted-foreground italic">{mentor.oneLiner}</p>
            </CardHeader>

            <CardContent>
              <p className="text-sm">{mentor.experience}</p>
            </CardContent>

            <CardFooter className="flex items-center justify-between border-t pt-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(mentor.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="font-medium">{mentor.rating.toFixed(1)}</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

