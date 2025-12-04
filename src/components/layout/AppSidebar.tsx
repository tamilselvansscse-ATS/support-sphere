import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquare,
  Ticket,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Headphones,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  title: string;
  icon: React.ElementType;
  href: string;
  badge?: number;
}

const mainNavItems: NavItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/" },
  { title: "Chat Support", icon: MessageSquare, href: "/chat", badge: 3 },
  { title: "Tickets", icon: Ticket, href: "/tickets", badge: 12 },
];

const adminNavItems: NavItem[] = [
  { title: "Team", icon: Users, href: "/team" },
  { title: "Settings", icon: Settings, href: "/settings" },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar transition-all duration-300 ease-in-out flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
            <Headphones className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="text-lg font-semibold text-sidebar-foreground animate-fade-in">
              SupportAI
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive(item.href)
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && (
                <span className="flex-1 animate-fade-in">{item.title}</span>
              )}
              {!collapsed && item.badge && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-sidebar-primary px-1.5 text-xs font-medium text-sidebar-primary-foreground animate-fade-in">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-sidebar-border">
          {!collapsed && (
            <p className="px-3 mb-2 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/40 animate-fade-in">
              Admin
            </p>
          )}
          <div className="space-y-1">
            {adminNavItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive(item.href)
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && (
                  <span className="animate-fade-in">{item.title}</span>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* User section */}
      <div className="border-t border-sidebar-border p-3">
        <div
          className={cn(
            "flex items-center gap-3 rounded-lg p-2",
            collapsed ? "justify-center" : ""
          )}
        >
          <div className="h-9 w-9 rounded-full bg-sidebar-accent flex items-center justify-center shrink-0">
            <span className="text-sm font-medium text-sidebar-foreground">
              AD
            </span>
          </div>
          {!collapsed && (
            <div className="flex-1 animate-fade-in">
              <p className="text-sm font-medium text-sidebar-foreground">
                Admin User
              </p>
              <p className="text-xs text-sidebar-foreground/60">
                admin@company.com
              </p>
            </div>
          )}
          {!collapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent animate-fade-in"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </aside>
  );
}
