"use client"

import { Clock, Star, Trash2, Play, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface HistoryItem {
  id: string
  title: string
  description: string
  timestamp: string
  status: "completed" | "running" | "failed"
  starred: boolean
}

const historyItems: HistoryItem[] = [
  {
    id: "1",
    title: "Data Analysis Pipeline",
    description: "Processed 10,000 records with custom transformations",
    timestamp: "2 hours ago",
    status: "completed",
    starred: true,
  },
  {
    id: "2",
    title: "API Integration Test",
    description: "Validated REST endpoints for user authentication",
    timestamp: "5 hours ago",
    status: "completed",
    starred: false,
  },
  {
    id: "3",
    title: "Machine Learning Model",
    description: "Training neural network on dataset v2.3",
    timestamp: "1 day ago",
    status: "running",
    starred: true,
  },
  {
    id: "4",
    title: "Database Migration",
    description: "Schema update failed due to constraint violation",
    timestamp: "2 days ago",
    status: "failed",
    starred: false,
  },
  {
    id: "5",
    title: "Performance Benchmark",
    description: "Stress test completed with 99.9% uptime",
    timestamp: "3 days ago",
    status: "completed",
    starred: false,
  },
]

function getStatusBadge(status: HistoryItem["status"]) {
  switch (status) {
    case "completed":
      return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Completed</Badge>
    case "running":
      return <Badge className="bg-primary/20 text-primary border-primary/30">Running</Badge>
    case "failed":
      return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Failed</Badge>
  }
}

export function PlaygroundHistory() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">History</h2>
          <p className="text-muted-foreground">View and manage your playground sessions</p>
        </div>
        <Button variant="outline" className="border-primary/20 hover:bg-primary/10 bg-transparent">
          <Clock className="mr-2 size-4" />
          Clear History
        </Button>
      </div>

      <div className="grid gap-4">
        {historyItems.map((item) => (
          <Card
            key={item.id}
            className="bg-gradient-to-br from-card via-background to-secondary/10 border-primary/10 shadow-lg shadow-primary/5 transition-all hover:shadow-primary/10 hover:border-primary/20"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {item.starred && <Star className="size-4 fill-yellow-400 text-yellow-400" />}
                  <div>
                    <CardTitle className="text-base">{item.title}</CardTitle>
                    <CardDescription className="mt-1">{item.description}</CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8 hover:bg-primary/10">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="border-primary/20 bg-card/95 backdrop-blur">
                    <DropdownMenuItem className="hover:bg-primary/10">
                      <Play className="mr-2 size-4" />
                      Run Again
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-primary/10">
                      <Star className="mr-2 size-4" />
                      {item.starred ? "Unstar" : "Star"}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-400 hover:bg-red-500/10 hover:text-red-400">
                      <Trash2 className="mr-2 size-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{item.timestamp}</span>
                {getStatusBadge(item.status)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
