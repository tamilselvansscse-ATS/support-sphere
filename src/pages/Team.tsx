import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Plus,
  Mail,
  Phone,
  MoreHorizontal,
  Star,
  Ticket,
  Clock,
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "staff";
  avatar?: string;
  status: "online" | "away" | "offline";
  ticketsResolved: number;
  avgResponseTime: string;
  rating: number;
}

const mockTeam: TeamMember[] = [
  {
    id: "1",
    name: "Alice Brown",
    email: "alice@company.com",
    role: "admin",
    status: "online",
    ticketsResolved: 245,
    avgResponseTime: "12m",
    rating: 4.9,
  },
  {
    id: "2",
    name: "Bob Wilson",
    email: "bob@company.com",
    role: "staff",
    status: "online",
    ticketsResolved: 189,
    avgResponseTime: "15m",
    rating: 4.7,
  },
  {
    id: "3",
    name: "Charlie Green",
    email: "charlie@company.com",
    role: "staff",
    status: "away",
    ticketsResolved: 167,
    avgResponseTime: "18m",
    rating: 4.8,
  },
  {
    id: "4",
    name: "Diana Ross",
    email: "diana@company.com",
    role: "staff",
    status: "offline",
    ticketsResolved: 134,
    avgResponseTime: "20m",
    rating: 4.6,
  },
];

const statusConfig = {
  online: { label: "Online", className: "bg-success" },
  away: { label: "Away", className: "bg-warning" },
  offline: { label: "Offline", className: "bg-muted-foreground" },
};

export default function Team() {
  return (
    <MainLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              Team Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your support team members
            </p>
          </div>
          <Button variant="accent">
            <Plus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mockTeam.map((member, index) => (
            <div
              key={member.id}
              className="bg-card rounded-xl border border-border/50 shadow-soft p-6 hover:shadow-lg transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="relative">
                  <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-lg font-semibold text-primary-foreground">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <span
                    className={cn(
                      "absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-card",
                      statusConfig[member.status].className
                    )}
                  />
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              {/* Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">{member.name}</h3>
                  <Badge
                    variant={member.role === "admin" ? "default" : "secondary"}
                    className="text-xs capitalize"
                  >
                    {member.role}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" />
                  <span className="text-sm truncate">{member.email}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-border">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-foreground">
                    <Ticket className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="font-semibold">{member.ticketsResolved}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">Resolved</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-foreground">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="font-semibold">{member.avgResponseTime}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">Avg Time</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-foreground">
                    <Star className="h-3.5 w-3.5 text-warning fill-warning" />
                    <span className="font-semibold">{member.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">Rating</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  <Mail className="h-3.5 w-3.5 mr-1" />
                  Email
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Phone className="h-3.5 w-3.5 mr-1" />
                  Call
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
