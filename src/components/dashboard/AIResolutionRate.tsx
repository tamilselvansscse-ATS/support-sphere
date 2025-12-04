import { Bot, TrendingUp } from "lucide-react";

export function AIResolutionRate() {
  const aiRate = 68;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (aiRate / 100) * circumference;

  return (
    <div className="bg-card rounded-xl shadow-soft border border-border/50 p-6 animate-slide-up">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">AI Resolution Rate</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Issues solved without human intervention
          </p>
        </div>
        <div className="p-2 rounded-lg bg-accent/10">
          <Bot className="h-5 w-5 text-accent" />
        </div>
      </div>

      <div className="flex items-center justify-center py-4">
        <div className="relative">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="hsl(var(--accent))"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-foreground">{aiRate}%</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-4 text-success">
        <TrendingUp className="h-4 w-4" />
        <span className="text-sm font-medium">+5% from last week</span>
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-foreground">1,247</p>
            <p className="text-xs text-muted-foreground">AI Resolved</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">589</p>
            <p className="text-xs text-muted-foreground">Human Assisted</p>
          </div>
        </div>
      </div>
    </div>
  );
}
