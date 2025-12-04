import { Ticket, MessageSquare, Clock, ThumbsUp } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentTickets } from "@/components/dashboard/RecentTickets";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { AIResolutionRate } from "@/components/dashboard/AIResolutionRate";

const stats = [
  {
    title: "Total Tickets",
    value: "1,836",
    change: "+12% from last month",
    changeType: "positive" as const,
    icon: Ticket,
    iconColor: "bg-accent/10 text-accent",
  },
  {
    title: "Active Chats",
    value: "24",
    change: "Live right now",
    changeType: "neutral" as const,
    icon: MessageSquare,
    iconColor: "bg-info/10 text-info",
  },
  {
    title: "Avg. Resolution Time",
    value: "2.4h",
    change: "-18% improvement",
    changeType: "positive" as const,
    icon: Clock,
    iconColor: "bg-warning/10 text-warning",
  },
  {
    title: "Customer Satisfaction",
    value: "4.8",
    change: "Based on 520 ratings",
    changeType: "neutral" as const,
    icon: ThumbsUp,
    iconColor: "bg-success/10 text-success",
  },
];

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening with your support today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={stat.title} style={{ animationDelay: `${index * 100}ms` }}>
              <StatsCard {...stat} />
            </div>
          ))}
        </div>

        {/* Charts & Data */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PerformanceChart />
          </div>
          <div>
            <AIResolutionRate />
          </div>
        </div>

        {/* Recent Tickets */}
        <div className="mt-6">
          <RecentTickets />
        </div>
      </div>
    </MainLayout>
  );
}
