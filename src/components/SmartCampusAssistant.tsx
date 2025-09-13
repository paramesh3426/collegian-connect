import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { QuickActions } from "./QuickActions";
import { TypingIndicator } from "./TypingIndicator";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  GraduationCap, 
  MessageCircle, 
  X, 
  Calendar, 
  MapPin, 
  BookOpen 
} from "lucide-react";
import { cn } from "@/lib/utils";
import campusHero from "@/assets/campus-hero.jpg";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export const SmartCampusAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const getCampusResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("schedule") || message.includes("class")) {
      return "I can help you with class schedules! Here are today's classes:\n\n📚 Computer Science 101 - 9:00 AM, Room 204\n📚 Mathematics 202 - 11:00 AM, Room 156\n📚 Physics Lab - 2:00 PM, Lab Building A\n\nWould you like me to show you tomorrow's schedule or help you find a specific course?";
    }
    
    if (message.includes("dining") || message.includes("food") || message.includes("cafeteria")) {
      return "🍽️ Campus Dining Information:\n\n📍 Main Cafeteria: 7:00 AM - 9:00 PM\n📍 Coffee Corner: 6:30 AM - 11:00 PM\n📍 Pizza Place: 11:00 AM - 10:00 PM\n📍 Healthy Bites: 8:00 AM - 6:00 PM\n\nToday's special: Grilled Salmon with vegetables! Would you like to see the full menu or nutrition information?";
    }
    
    if (message.includes("library")) {
      return "📚 Library Services & Hours:\n\n🕐 Main Library: 24/7 (during semester)\n🕐 Science Library: 8:00 AM - 12:00 AM\n🕐 Study Rooms: Available for booking online\n\n📋 Services:\n• Book reservations & renewals\n• Research assistance\n• Printing & scanning\n• Group study rooms\n• Silent study areas\n\nNeed help finding a specific resource or booking a study room?";
    }
    
    if (message.includes("map") || message.includes("building") || message.includes("location")) {
      return "🗺️ Campus Navigation Help:\n\n🏢 Main Buildings:\n• Administration: Building A (Center campus)\n• Science Labs: Building B (North wing)\n• Library: Building C (East side)\n• Student Center: Building D (South plaza)\n• Dormitories: East Campus\n\n🚶‍♂️ The campus shuttle runs every 15 minutes between main stops. Would you like directions to a specific building or information about parking?";
    }
    
    if (message.includes("registration") || message.includes("admin") || message.includes("form")) {
      return "📄 Administrative Procedures:\n\n📝 Common Forms & Procedures:\n• Course Registration: Online portal (opens 8 AM)\n• Transcript Requests: Registrar's office\n• ID Card Services: Student Center, Room 101\n• Financial Aid: Building A, 2nd floor\n• Academic Advising: By appointment\n\n⏰ Office Hours: Mon-Fri 8:00 AM - 5:00 PM\n\nWhat specific procedure do you need help with?";
    }
    
    if (message.includes("office hours") || message.includes("faculty") || message.includes("professor")) {
      return "👨‍🏫 Faculty Office Hours:\n\n📅 Today's Available Office Hours:\n• Dr. Smith (CS) - 2:00-4:00 PM, Room 301\n• Prof. Johnson (Math) - 1:00-3:00 PM, Room 205\n• Dr. Williams (Physics) - 10:00 AM-12:00 PM, Room 178\n\n📧 You can also schedule appointments via email or the faculty portal. Need contact information for a specific professor?";
    }
    
    if (message.includes("hello") || message.includes("hi") || message.includes("help")) {
      return "Hello! I'm your Smart Campus Assistant 🎓\n\nI can help you with:\n• 📅 Class schedules and academic calendar\n• 🍽️ Dining halls and meal information\n• 📚 Library hours and services\n• 🗺️ Campus maps and building locations\n• 📋 Administrative procedures and forms\n• 👨‍🏫 Faculty office hours and contacts\n\nWhat would you like to know about campus today?";
    }
    
    return "I understand you're asking about campus services! While I'm designed to help with schedules, dining, library services, campus navigation, and administrative procedures, I might need a bit more specific information to give you the best answer. Could you try asking about one of these areas:\n\n• Class schedules\n• Dining hours\n• Library services\n• Campus buildings\n• Administrative forms\n• Faculty office hours\n\nWhat specific campus information can I help you with?";
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = getCampusResponse(content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickAction = (query: string) => {
    setIsChatOpen(true);
    handleSendMessage(query);
  };

  if (!isChatOpen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-campus-blue-lighter/20 to-accent-light/10">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div 
            className="h-[60vh] bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: `url(${campusHero})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-campus-blue/70 via-campus-blue/50 to-campus-green/30" />
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="text-center text-white px-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-md mb-6 shadow-glow">
                  <GraduationCap className="w-10 h-10" />
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
                  Smart Campus
                  <span className="block text-accent-light">Assistant</span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
                  Your AI-powered guide to campus life. Get instant answers about schedules, dining, library services, and more.
                </p>
                <Button
                  size="lg"
                  onClick={() => setIsChatOpen(true)}
                  className="bg-white text-campus-blue hover:bg-white/90 transition-spring shadow-glow text-lg px-8 py-6 rounded-full"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start Chatting
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What can I help you with?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Click on any of these common topics to get started
            </p>
          </div>
          <QuickActions onActionClick={handleQuickAction} />
        </div>

        {/* Features */}
        <div className="py-16 bg-gradient-card">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 text-center shadow-card border-campus-gray-light">
                <div className="w-12 h-12 rounded-full bg-gradient-campus text-white flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Academic Info</h3>
                <p className="text-muted-foreground">
                  Get your class schedules, exam dates, and academic calendar information instantly.
                </p>
              </Card>
              
              <Card className="p-6 text-center shadow-card border-campus-gray-light">
                <div className="w-12 h-12 rounded-full bg-gradient-campus text-white flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Campus Navigation</h3>
                <p className="text-muted-foreground">
                  Find buildings, dining halls, libraries, and get directions around campus.
                </p>
              </Card>
              
              <Card className="p-6 text-center shadow-card border-campus-gray-light">
                <div className="w-12 h-12 rounded-full bg-gradient-campus text-white flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Services & Support</h3>
                <p className="text-muted-foreground">
                  Access library services, administrative procedures, and faculty office hours.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Chat Header */}
      <div className="bg-gradient-campus text-primary-foreground p-4 shadow-campus">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Smart Campus Assistant</h1>
              <p className="text-sm text-primary-foreground/80">
                Always here to help with campus information
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsChatOpen(false)}
            className="text-primary-foreground hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="py-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                How can I help you today?
              </h2>
              <p className="text-muted-foreground">
                Ask me about schedules, dining, library services, or try one of these quick actions:
              </p>
            </div>
            <QuickActions onActionClick={handleSendMessage} />
          </div>
        ) : (
          <div className="py-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.content}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Chat Input */}
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};