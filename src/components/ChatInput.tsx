import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <div className="sticky bottom-0 bg-background/80 backdrop-blur-xl border-t border-border p-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask me about campus schedules, dining, library, or anything else..."
            className={cn(
              "flex-1 rounded-full border-campus-gray-light",
              "focus:ring-2 focus:ring-campus-blue focus:border-transparent",
              "transition-all duration-300"
            )}
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!message.trim() || isLoading}
            className={cn(
              "rounded-full bg-gradient-campus hover:opacity-90",
              "shadow-campus transition-all duration-300",
              "disabled:opacity-50"
            )}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};