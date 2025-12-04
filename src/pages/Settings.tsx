import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Bell,
  Mail,
  Bot,
  Shield,
  Palette,
  Globe,
  Save,
} from "lucide-react";

export default function Settings() {
  return (
    <MainLayout>
      <div className="p-6 lg:p-8 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your application preferences
          </p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="general" className="gap-2">
              <Globe className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="ai" className="gap-2">
              <Bot className="h-4 w-4" />
              AI Settings
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6 animate-fade-in">
            <div className="bg-card rounded-xl border border-border/50 p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Company Information
              </h3>
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" defaultValue="Acme Inc." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supportEmail">Support Email</Label>
                    <Input
                      id="supportEmail"
                      type="email"
                      defaultValue="support@acme.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="welcomeMessage">Welcome Message</Label>
                  <Textarea
                    id="welcomeMessage"
                    defaultValue="Hello! How can we help you today?"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border/50 p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Business Hours
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">24/7 Support</p>
                    <p className="text-sm text-muted-foreground">
                      Enable round-the-clock AI support
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input id="startTime" type="time" defaultValue="09:00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input id="endTime" type="time" defaultValue="18:00" />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6 animate-fade-in">
            <div className="bg-card rounded-xl border border-border/50 p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Email Notifications
              </h3>
              <div className="space-y-4">
                {[
                  {
                    title: "New ticket created",
                    description: "Get notified when a new ticket is created",
                  },
                  {
                    title: "Ticket assigned",
                    description: "Get notified when a ticket is assigned to you",
                  },
                  {
                    title: "Ticket updated",
                    description: "Get notified when a ticket is updated",
                  },
                  {
                    title: "Ticket closed",
                    description: "Get notified when a ticket is closed",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2"
                  >
                    <div>
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <Switch defaultChecked={index < 2} />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ai" className="space-y-6 animate-fade-in">
            <div className="bg-card rounded-xl border border-border/50 p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                AI Assistant Configuration
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-foreground">
                      Enable AI Auto-Response
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Allow AI to automatically respond to common questions
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-foreground">
                      Auto-create Tickets
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Create tickets when AI cannot resolve an issue
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aiInstructions">AI Instructions</Label>
                  <Textarea
                    id="aiInstructions"
                    placeholder="Provide custom instructions for the AI assistant..."
                    rows={4}
                    defaultValue="You are a helpful customer support assistant. Be polite, professional, and concise. If you cannot resolve an issue, offer to create a support ticket."
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6 animate-fade-in">
            <div className="bg-card rounded-xl border border-border/50 p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Security Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-foreground">
                      Two-Factor Authentication
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Require 2FA for all team members
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-foreground">Session Timeout</p>
                    <p className="text-sm text-muted-foreground">
                      Auto-logout after 30 minutes of inactivity
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-foreground">IP Whitelisting</p>
                    <p className="text-sm text-muted-foreground">
                      Restrict access to specific IP addresses
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <Button variant="accent">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
