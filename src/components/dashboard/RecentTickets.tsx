import { cn } from "@/lib/utils";
import { Clock, CheckCircle2, AlertCircle } from "lucide-react";

interface Ticket {
  id: string;
  title: string;
  customer: string;
  status: "open" | "pending" | "closed";
  priority: "low" | "medium" | "high";
  createdAt: string;
}

const mockTickets: Ticket[] = [
  {
    id: "TKT-001",
    title: "Unable to access account settings",
    customer: "John Smith",
    status: "open",
    priority: "high",
    createdAt: "10 min ago",
  },
  {
    id: "TKT-002",
    title: "Billing inquiry about subscription",
    customer: "Sarah Johnson",
    status: "pending",
    priority: "medium",
    createdAt: "25 min ago",
  },
  {
    id: "TKT-003",
    title: "Feature request: Dark mode",
    customer: "Mike Wilson",
    status: "open",
    priority: "low",
    createdAt: "1 hour ago",
  },
  {
    id: "TKT-004",
    title: "Integration issue with API",
    customer: "Emily Davis",
    status: "closed",
    priority: "high",
    createdAt: "2 hours ago",
  },
];

const statusConfig = {
  open: {
    label: "Open",
    icon: AlertCircle,
    className: "bg-destructive/10 text-destructive",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    className: "bg-warning/10 text-warning",
  },
  closed: {
    label: "Closed",
    icon: CheckCircle2,
    className: "bg-success/10 text-success",
  },
};

const priorityConfig = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-info/10 text-info",
  high: "bg-destructive/10 text-destructive",
};

export function RecentTickets() {
  return (
    <div className="bg-card rounded-xl shadow-soft border border-border/50 animate-slide-up">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Recent Tickets</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Latest support requests from customers
        </p>
      </div>
      <div className="divide-y divide-border">
        {mockTickets.map((ticket) => {
          const status = statusConfig[ticket.status];
          const StatusIcon = status.icon;

          return (
            <div
              key={ticket.id}
              className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-muted-foreground">
                      {ticket.id}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
                        status.className
                      )}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {status.label}
                    </span>
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-full text-xs font-medium capitalize",
                        priorityConfig[ticket.priority]
                      )}
                    >
                      {ticket.priority}
                    </span>
                  </div>
                  <h4 className="text-sm font-medium text-foreground truncate">
                    {ticket.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {ticket.customer}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {ticket.createdAt}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-4 border-t border-border">
        <button className="text-sm font-medium text-accent hover:text-accent/80 transition-colors">
          View all tickets →
        </button>
      </div>
    </div>
  );
}
