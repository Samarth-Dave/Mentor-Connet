"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Clock } from "lucide-react"
import type { Task } from "@/lib/types"

interface UpcomingTasksProps {
  tasks: Task[]
}

export function UpcomingTasks({ tasks }: UpcomingTasksProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-500 hover:bg-red-600"
      case "medium":
        return "bg-amber-500 hover:bg-amber-600"
      case "low":
        return "bg-green-500 hover:bg-green-600"
      default:
        return "bg-slate-500 hover:bg-slate-600"
    }
  }

  return (
    <Card className="h-full border-slate-200 dark:border-slate-800">
      <CardHeader className="bg-slate-50 dark:bg-slate-800/50">
        <CardTitle className="flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-blue-500" />
          Upcoming Tasks
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group"
            >
              <div className="flex items-start space-x-3 rounded-lg border border-slate-200 p-3 transition-all duration-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50">
                <Checkbox id={`task-${task.id}`} className="mt-1" />
                <div className="flex-1">
                  <label htmlFor={`task-${task.id}`} className="block cursor-pointer font-medium">
                    {task.title}
                  </label>
                  <div className="mt-1 flex items-center text-sm text-slate-500 dark:text-slate-400">
                    <Clock className="mr-1 h-3 w-3" />
                    {task.dueDate}
                  </div>
                  <div className="mt-2 flex items-center space-x-2">
                    <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                    {task.course && (
                      <Badge variant="outline" className="border-slate-200 dark:border-slate-700">
                        {task.course}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

