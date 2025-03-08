import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { QuoteIcon } from "lucide-react"

const testimonials = [
  {
    name: "Alex Rivera",
    avatar: "/placeholder.svg?height=50&width=50",
    initials: "AR",
    text: "Finding a mentor in my field was nearly impossible until I discovered MentorMatch. The platform matched me with someone who understood exactly what I needed to grow.",
  },
  {
    name: "Jasmine Taylor",
    avatar: "/placeholder.svg?height=50&width=50",
    initials: "JT",
    text: "The structured approach to mentorship helped me set clear goals and actually achieve them. My mentor has been instrumental in my recent promotion.",
  },
  {
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=50&width=50",
    initials: "MC",
    text: "As someone who struggled with networking, this platform made connecting with industry leaders approachable and less intimidating.",
  },
  {
    name: "Sophia Williams",
    avatar: "/placeholder.svg?height=50&width=50",
    initials: "SW",
    text: "The notes feature has been a game-changer for me. I can review my mentor's advice anytime and track how far I've come.",
  },
  {
    name: "David Okafor",
    avatar: "/placeholder.svg?height=50&width=50",
    initials: "DO",
    text: "My mentor challenged me to think differently about my career path. Six months later, I've launched my own business with their guidance.",
  },
  {
    name: "Emma Rodriguez",
    avatar: "/placeholder.svg?height=50&width=50",
    initials: "ER",
    text: "The video chat feature makes it feel like my mentor is right there with me, despite us being in different countries. The connection is invaluable.",
  },
]

export function Testimonials() {
  return (
    <section className="py-12 relative">
      {/* Rocket doodle */}
      <svg
        className="absolute top-0 right-0 w-32 h-32 text-primary/10 -z-10"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.5 16.5C3 17.48 2 19.5 2 19.5C2 19.5 4.02 18.5 5 17C5.98 15.5 5.79 13.79 4.5 12.5C3.21 11.21 1.5 11.02 0 12C1.5 10.98 3.52 10 4.5 10C7.5 10 9 11.5 9 14.5C9 15.48 8.02 17.5 8.02 17.5C8.02 17.5 6 16.5 4.5 16.5Z"
          fill="currentColor"
        />
        <path
          d="M12 15L9 11.5L11 7L15 9L19.5 4.5L22 6C22 6 20.5 9.5 18.5 11.5C16.5 13.5 15 15 15 15L12 15Z"
          fill="currentColor"
        />
      </svg>

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Mentee Success Stories</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Hear from mentees who have transformed their careers through meaningful mentorship.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-muted/50 border-none hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar>
                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                <AvatarFallback>{testimonial.initials}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{testimonial.name}</h3>
                <p className="text-xs text-muted-foreground">Mentee</p>
              </div>
              <QuoteIcon className="h-5 w-5 text-primary ml-auto" />
            </CardHeader>
            <CardContent>
              <p className="text-sm italic">{testimonial.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

