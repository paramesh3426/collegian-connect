import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Calendar, 
  MapPin, 
  Utensils, 
  BookOpen, 
  FileText, 
  Clock 
} from "lucide-react";

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

export const QuickActions = ({ onActionClick }: QuickActionsProps) => {
  const actions = [
    {
      icon: Calendar,
      label: "Class Schedules",
      query: "Show me my class schedule for today"
    },
    {
      icon: Utensils,
      label: "Dining Hours",
      query: "What are the dining hall hours?"
    },
    {
      icon: BookOpen,
      label: "Library Services",
      query: "Tell me about library hours and services"
    },
    {
      icon: MapPin,
      label: "Campus Map",
      query: "Help me find buildings on campus"
    },
    {
      icon: FileText,
      label: "Admin Procedures",
      query: "Help with registration and forms"
    },
    {
      icon: Clock,
      label: "Office Hours",
      query: "Show me faculty office hours"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-4xl mx-auto p-4">
      {actions.map((action) => (
        <Card
          key={action.label}
          className="cursor-pointer transition-all duration-300 hover:shadow-card hover:scale-105 border-campus-gray-light"
          onClick={() => onActionClick(action.query)}
        >
          <Button
            variant="ghost"
            className="w-full h-full p-4 flex flex-col gap-2 items-center justify-center text-center min-h-[100px]"
          >
            <action.icon className="h-6 w-6 text-campus-blue" />
            <span className="text-sm font-medium text-foreground">
              {action.label}
            </span>
          </Button>
        </Card>
      ))}
    </div>
  );
};