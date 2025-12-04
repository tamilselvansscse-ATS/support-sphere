import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Search,
  Filter,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreHorizontal,
  User,
  Calendar,
} from "lucide-react";

interface TicketData {
  id: string;
  title: string;
  description: string;
  customer: {
    name: string;
    email: string;
  };
  status: "open" | "pending" | "closed";
  priority: "low" | "medium" | "high";
  assignee?: string;
  createdAt: string;
  lastUpdate: string;
  aiHandled: boolean;
}

const mockTickets: TicketData[] = [
  {
    id: "TKT-001",
    title: "Unable to access account settings",
    description: "Customer cannot update their email address in account settings.",
    customer: { name: "John Smith", email: "john@example.com" },
    status: "open",
    priority: "high",
    assignee: "Alice Brown",
    createdAt: "2024-01-15 10:30 AM",
    lastUpdate: "10 min ago",
    aiHandled: false,
  },
  {
    id: "TKT-002",
    title: "Billing inquiry about subscription",
    description: "Question about upgrading from monthly to annual plan.",
    customer: { name: "Sarah Johnson", email: "sarah@example.com" },
    status: "pending",
    priority: "medium",
    assignee: "Bob Wilson",
    createdAt: "2024-01-15 09:15 AM",
    lastUpdate: "25 min ago",
    aiHandled: true,
  },
  {
    id: "TKT-003",
    title: "Feature request: Dark mode",
    description: "User is requesting dark mode functionality for the dashboard.",
    customer: { name: "Mike Wilson", email: "mike@example.com" },
    status: "open",
    priority: "low",
    createdAt: "2024-01-15 08:00 AM",
    lastUpdate: "1 hour ago",
    aiHandled: true,
  },
  {
    id: "TKT-004",
    title: "Integration issue with API",
    description: "Webhook events are not being received properly.",
    customer: { name: "Emily Davis", email: "emily@example.com" },
    status: "closed",
    priority: "high",
    assignee: "Charlie Green",
    createdAt: "2024-01-14 02:30 PM",
    lastUpdate: "2 hours ago",
    aiHandled: false,
  },
  {
    id: "TKT-005",
    title: "Password reset not working",
    description: "Customer is not receiving password reset emails.",
    customer: { name: "David Lee", email: "david@example.com" },
    status: "pending",
    priority: "high",
    assignee: "Alice Brown",
    createdAt: "2024-01-14 11:00 AM",
    lastUpdate: "3 hours ago",
    aiHandled: false,
  },
];

const statusConfig = {
  open: {
    label: "Open",
    icon: AlertCircle,
    variant: "destructive" as const,
  },
  pending: {
    label: "Pending",
    icon: Clock,
    variant: "secondary" as const,
  },
  closed: {
    label: "Closed",
    icon: CheckCircle2,
    variant: "outline" as const,
  },
};

const priorityConfig = {
  low: { label: "Low", className: "bg-muted text-muted-foreground" },
  medium: { label: "Medium", className: "bg-info/10 text-info" },
  high: { label: "High", className: "bg-destructive/10 text-destructive" },
};

export default function Tickets() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const filteredTickets = mockTickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || ticket.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <MainLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              Tickets
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage and track customer support tickets
            </p>
          </div>
          <Button variant="accent">
            <Plus className="h-4 w-4 mr-2" />
            New Ticket
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl border border-border/50 p-4 mb-6 shadow-soft">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {Object.entries(statusConfig).map(([key, config]) => (
                <Button
                  key={key}
                  variant={selectedStatus === key ? "default" : "outline"}
                  size="sm"
                  onClick={() =>
                    setSelectedStatus(selectedStatus === key ? null : key)
                  }
                  className="capitalize"
                >
                  {config.label}
                </Button>
              ))}
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="bg-card rounded-xl border border-border/50 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 font-medium text-muted-foreground text-sm">
                    Ticket
                  </th>
                  <th className="text-left p-4 font-medium text-muted-foreground text-sm">
                    Customer
                  </th>
                  <th className="text-left p-4 font-medium text-muted-foreground text-sm">
                    Status
                  </th>
                  <th className="text-left p-4 font-medium text-muted-foreground text-sm">
                    Priority
                  </th>
                  <th className="text-left p-4 font-medium text-muted-foreground text-sm">
                    Assignee
                  </th>
                  <th className="text-left p-4 font-medium text-muted-foreground text-sm">
                    Updated
                  </th>
                  <th className="w-12 p-4"></th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket, index) => {
                  const status = statusConfig[ticket.status];
                  const priority = priorityConfig[ticket.priority];
                  const StatusIcon = status.icon;

                  return (
                    <tr
                      key={ticket.id}
                      className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors cursor-pointer animate-slide-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="p-4">
                        <div className="flex items-start gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-muted-foreground">
                                {ticket.id}
                              </span>
                              {ticket.aiHandled && (
                                <span className="px-1.5 py-0.5 rounded text-xs bg-accent/10 text-accent font-medium">
                                  AI
                                </span>
                              )}
                            </div>
                            <h4 className="font-medium text-foreground mt-1">
                              {ticket.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mt-0.5 max-w-md truncate">
                              {ticket.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                            <User className="h-4 w-4 text-secondary-foreground" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground text-sm">
                              {ticket.customer.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {ticket.customer.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={status.variant}
                          className="gap-1"
                        >
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <span
                          className={cn(
                            "px-2 py-1 rounded text-xs font-medium capitalize",
                            priority.className
                          )}
                        >
                          {priority.label}
                        </span>
                      </td>
                      <td className="p-4">
                        {ticket.assignee ? (
                          <span className="text-sm text-foreground">
                            {ticket.assignee}
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            Unassigned
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span className="text-sm">{ticket.lastUpdate}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
