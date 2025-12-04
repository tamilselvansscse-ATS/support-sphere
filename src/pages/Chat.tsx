import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Send,
  Bot,
  User,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Ticket,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai" | "agent";
  timestamp: string;
  senderName?: string;
}

interface Conversation {
  id: string;
  customer: string;
  lastMessage: string;
  time: string;
  unread: number;
  status: "active" | "waiting" | "closed";
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    customer: "John Smith",
    lastMessage: "I need help with my subscription",
    time: "2 min",
    unread: 2,
    status: "active",
  },
  {
    id: "2",
    customer: "Sarah Johnson",
    lastMessage: "Thank you for your help!",
    time: "15 min",
    unread: 0,
    status: "active",
  },
  {
    id: "3",
    customer: "Mike Wilson",
    lastMessage: "Is there a dark mode option?",
    time: "1 hour",
    unread: 1,
    status: "waiting",
  },
];

const mockMessages: Message[] = [
  {
    id: "1",
    content: "Hello! I'm having trouble accessing my account settings. Can you help?",
    sender: "user",
    timestamp: "10:30 AM",
    senderName: "John Smith",
  },
  {
    id: "2",
    content:
      "Hi John! I'd be happy to help you with your account settings. Could you tell me what specific issue you're experiencing? Are you unable to find the settings page, or is there an error when you try to access it?",
    sender: "ai",
    timestamp: "10:30 AM",
    senderName: "AI Assistant",
  },
  {
    id: "3",
    content:
      "I can find the settings page, but when I try to update my email address, it shows an error message saying 'Invalid request'.",
    sender: "user",
    timestamp: "10:32 AM",
    senderName: "John Smith",
  },
  {
    id: "4",
    content:
      "I understand. This error typically occurs when the email format isn't recognized or if there's a temporary server issue. Let me check a few things:\n\n1. Is the new email address in the correct format (example@domain.com)?\n2. Is the email address already associated with another account?\n\nCould you try clearing your browser cache and attempting again? If the issue persists, I can create a support ticket for our technical team to investigate further.",
    sender: "ai",
    timestamp: "10:33 AM",
    senderName: "AI Assistant",
  },
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputValue, setInputValue] = useState("");
  const [selectedConversation, setSelectedConversation] = useState(
    mockConversations[0]
  );

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "agent",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      senderName: "Support Agent",
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  return (
    <MainLayout>
      <div className="h-screen flex">
        {/* Conversations List */}
        <div className="w-80 border-r border-border bg-card flex flex-col">
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Conversations</h2>
            <p className="text-sm text-muted-foreground">
              {mockConversations.length} active chats
            </p>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2">
              {mockConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={cn(
                    "w-full p-3 rounded-lg text-left transition-colors mb-1",
                    selectedConversation.id === conv.id
                      ? "bg-accent/10"
                      : "hover:bg-muted"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <span className="text-sm font-medium text-primary-foreground">
                        {conv.customer
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground text-sm">
                          {conv.customer}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {conv.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mt-0.5">
                        {conv.lastMessage}
                      </p>
                    </div>
                    {conv.unread > 0 && (
                      <span className="h-5 min-w-5 rounded-full bg-accent flex items-center justify-center text-xs font-medium text-accent-foreground">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="h-16 border-b border-border bg-card px-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">
                  {selectedConversation.customer
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <h3 className="font-medium text-foreground">
                  {selectedConversation.customer}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Active {selectedConversation.time} ago
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Ticket className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4 max-w-3xl mx-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3 animate-slide-up",
                    message.sender === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.sender !== "user" && (
                    <div
                      className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                        message.sender === "ai"
                          ? "bg-accent"
                          : "bg-primary"
                      )}
                    >
                      {message.sender === "ai" ? (
                        <Bot className="h-4 w-4 text-accent-foreground" />
                      ) : (
                        <User className="h-4 w-4 text-primary-foreground" />
                      )}
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-md rounded-2xl px-4 py-3",
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    )}
                  >
                    {message.sender !== "user" && (
                      <p className="text-xs font-medium mb-1 opacity-70">
                        {message.senderName}
                      </p>
                    )}
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p
                      className={cn(
                        "text-xs mt-1",
                        message.sender === "user"
                          ? "text-primary-foreground/60"
                          : "text-muted-foreground"
                      )}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                  {message.sender === "user" && (
                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                      <User className="h-4 w-4 text-secondary-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-border bg-card p-4">
            <div className="max-w-3xl mx-auto flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
              />
              <Button variant="accent" onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
