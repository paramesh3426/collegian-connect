import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot } from "lucide-react";

export const TypingIndicator = () => {
  return (
    <div className="flex gap-3 p-4 max-w-4xl mx-auto">
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback className="bg-gradient-campus text-primary-foreground">
          <Bot className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-1">
        <div className="bg-card border border-border rounded-2xl px-4 py-3 shadow-card">
          <div className="flex space-x-1">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-campus-gray rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-campus-gray rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-campus-gray rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
        <span className="text-xs text-muted-foreground px-2">
          Assistant is typing...
        </span>
      </div>
    </div>
  );
};