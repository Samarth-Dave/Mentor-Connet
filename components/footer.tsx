import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Linkedin, Github, Send } from "lucide-react"

export function Footer() {
  return (
    <footer className="mt-16 border-t bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center">
              <div className="relative h-8 w-8 mr-2 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold">M</div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                MentorMatch
              </span>
            </Link>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              Connecting mentees with expert mentors to accelerate learning and career growth.
            </p>
            <div className="mt-4 flex space-x-3">
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="text-sm text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary"
                >
                  All Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/mentors"
                  className="text-sm text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary"
                >
                  Find Mentors
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/help"
                  className="text-sm text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="text-sm text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary"
                >
                  Community Guidelines
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Subscribe to Newsletter</h3>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              Get the latest updates and resources delivered to your inbox.
            </p>
            <div className="mt-4 flex">
              <Input
                placeholder="Enter your email"
                className="rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button className="rounded-l-none">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-6 dark:border-slate-800">
          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            © {new Date().getFullYear()} MentorMatch. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

