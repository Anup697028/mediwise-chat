import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Send, 
  Search, 
  Check, 
  CheckCheck, 
  Clock, 
  File, 
  Paperclip,
  Image,
  Plus,
  ArrowDownToLine,
  Phone,
  Video,
  MoreVertical,
  PaperclipIcon,
  SendHorizontal,
  Smile,
  ImageIcon,
  Mic,
  User2
} from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: Date;
  status?: "sending" | "sent" | "delivered" | "read";
  attachments?: Array<{
    id: string;
    type: "image" | "document";
    name: string;
    url: string;
  }>;
}

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  lastMessageTime: Date;
  avatar: string;
  unread: number;
  isOnline?: boolean;
  typing?: boolean;
}

const MessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      name: "Dr. Rajesh Kumar",
      lastMessage: "Your prescription is ready",
      lastMessageTime: new Date("2024-05-25T10:30:00"),
      avatar: "",
      unread: 2,
      isOnline: true,
    },
    {
      id: "2",
      name: "Dr. Priya Sharma",
      lastMessage: "How are you feeling today?",
      lastMessageTime: new Date("2024-05-24T16:45:00"),
      avatar: "",
      unread: 0,
      isOnline: false,
    },
    {
      id: "3",
      name: "Dr. Amit Patel",
      lastMessage: "Your reports are available",
      lastMessageTime: new Date("2024-05-24T08:15:00"),
      avatar: "",
      unread: 1,
      isOnline: true,
      typing: true,
    },
    {
      id: "4",
      name: "Dr. Neha Gupta",
      lastMessage: "Please take the medicine as prescribed",
      lastMessageTime: new Date("2024-05-23T14:20:00"),
      avatar: "",
      unread: 0,
      isOnline: false,
    },
    {
      id: "5",
      name: "Dr. Sanjay Verma",
      lastMessage: "Let's schedule a follow-up next week",
      lastMessageTime: new Date("2024-05-22T11:05:00"),
      avatar: "",
      unread: 0,
      isOnline: true,
    },
  ]);

  const [allMessages, setAllMessages] = useState<Record<string, Message[]>>({
    "1": [
      {
        id: "1",
        sender: { id: "doctor1", name: "Dr. Rajesh Kumar", avatar: "" },
        content: "Namaste! How can I help you?",
        timestamp: new Date("2024-05-25T10:00:00"),
        status: "read",
      },
      {
        id: "2",
        sender: { id: "user", name: "You" },
        content: "I wanted to ask about my recent prescription",
        timestamp: new Date("2024-05-25T10:01:00"),
        status: "read",
      },
      {
        id: "3",
        sender: { id: "doctor1", name: "Dr. Rajesh Kumar", avatar: "" },
        content: "Sure, I've uploaded your prescription. You can download it from the 'Prescriptions' section of the app.",
        timestamp: new Date("2024-05-25T10:05:00"),
        status: "read",
      },
      {
        id: "4",
        sender: { id: "doctor1", name: "Dr. Rajesh Kumar", avatar: "" },
        content: "Your prescription is ready",
        timestamp: new Date("2024-05-25T10:30:00"),
        status: "read",
        attachments: [
          {
            id: "1",
            type: "document",
            name: "Prescription_May2024.pdf",
            url: "#",
          },
        ],
      },
    ],
    "2": [
      {
        id: "1",
        sender: { id: "doctor2", name: "Dr. Priya Sharma", avatar: "" },
        content: "Hello! How are you doing today?",
        timestamp: new Date("2024-05-24T16:40:00"),
        status: "read",
      },
      {
        id: "2",
        sender: { id: "user", name: "You" },
        content: "I'm feeling much better. The new medication seems to be working.",
        timestamp: new Date("2024-05-24T16:42:00"),
        status: "read",
      },
      {
        id: "3",
        sender: { id: "doctor2", name: "Dr. Priya Sharma", avatar: "" },
        content: "That's great to hear! Any side effects?",
        timestamp: new Date("2024-05-24T16:44:00"),
        status: "read",
      },
      {
        id: "4",
        sender: { id: "doctor2", name: "Dr. Priya Sharma", avatar: "" },
        content: "How are you feeling today?",
        timestamp: new Date("2024-05-24T16:45:00"),
        status: "delivered",
      },
    ],
    "3": [
      {
        id: "1",
        sender: { id: "doctor3", name: "Dr. Amit Patel", avatar: "" },
        content: "Hi there! Your lab test results are now available.",
        timestamp: new Date("2024-05-24T08:10:00"),
        status: "read",
      },
      {
        id: "2",
        sender: { id: "doctor3", name: "Dr. Amit Patel", avatar: "" },
        content: "I've reviewed them and everything looks normal. No need to worry.",
        timestamp: new Date("2024-05-24T08:12:00"),
        status: "read",
      },
      {
        id: "3",
        sender: { id: "user", name: "You" },
        content: "That's a relief! Thank you, doctor.",
        timestamp: new Date("2024-05-24T08:14:00"),
        status: "read",
      },
      {
        id: "4",
        sender: { id: "doctor3", name: "Dr. Amit Patel", avatar: "" },
        content: "Your reports are available",
        timestamp: new Date("2024-05-24T08:15:00"),
        status: "sent",
        attachments: [
          {
            id: "1",
            type: "document",
            name: "LabResults_May2024.pdf",
            url: "#",
          },
        ],
      },
    ],
  });

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChat, allMessages]);

  useEffect(() => {
    if (selectedChat) {
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === selectedChat ? { ...chat, unread: 0 } : chat
        )
      );
    }
  }, [selectedChat]);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedChat) return;

    const newMessage: Message = {
      id: `${Date.now()}`,
      sender: { id: "user", name: "You" },
      content: messageInput,
      timestamp: new Date(),
      status: "sending",
    };

    setAllMessages((prev) => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessage],
    }));

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === selectedChat
          ? {
              ...chat,
              lastMessage: messageInput,
              lastMessageTime: new Date(),
            }
          : chat
      )
    );

    setMessageInput("");

    setTimeout(() => {
      setAllMessages((prev) => ({
        ...prev,
        [selectedChat]: prev[selectedChat].map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "sent" } : msg
        ),
      }));
      
      setTimeout(() => {
        setAllMessages((prev) => ({
          ...prev,
          [selectedChat]: prev[selectedChat].map((msg) =>
            msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
          ),
        }));
        
        setTimeout(() => {
          setAllMessages((prev) => ({
            ...prev,
            [selectedChat]: prev[selectedChat].map((msg) =>
              msg.id === newMessage.id ? { ...msg, status: "read" } : msg
            ),
          }));
        }, 2000);
      }, 1000);
    }, 500);
  };

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedChats = [...filteredChats].sort(
    (a, b) => b.lastMessageTime.getTime() - a.lastMessageTime.getTime()
  );

  const formatMessageTime = (date: Date) => {
    const today = new Date();
    const messageDate = new Date(date);
    
    if (
      messageDate.getDate() === today.getDate() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear()
    ) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (
      today.getTime() - messageDate.getTime() < 7 * 24 * 60 * 60 * 1000
    ) {
      return messageDate.toLocaleDateString([], { weekday: 'short' });
    } else {
      return messageDate.toLocaleDateString([], { day: 'numeric', month: 'short' });
    }
  };

  const renderMessageStatus = (status?: string) => {
    switch (status) {
      case "sending":
        return <Clock className="h-3 w-3 text-muted-foreground" />;
      case "sent":
        return <Check className="h-3 w-3 text-muted-foreground" />;
      case "delivered":
        return <CheckCheck className="h-3 w-3 text-muted-foreground" />;
      case "read":
        return <CheckCheck className="h-3 w-3 text-primary" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-10rem)]">
        <Card className="col-span-4 h-full flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle>Messages</CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden">
            <ScrollArea className="h-full pr-4">
              <div className="space-y-2">
                {sortedChats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-accent transition-colors ${
                      selectedChat === chat.id ? "bg-accent" : ""
                    }`}
                    onClick={() => setSelectedChat(chat.id)}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={chat.avatar} />
                        <AvatarFallback>{chat.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      {chat.isOnline && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold truncate">{chat.name}</h4>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatMessageTime(chat.lastMessageTime)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground truncate max-w-[70%]">
                          {chat.typing ? (
                            <span className="text-primary animate-pulse">Typing...</span>
                          ) : (
                            chat.lastMessage
                          )}
                        </p>
                        {chat.unread > 0 && (
                          <span className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="col-span-8 h-full flex flex-col">
          {selectedChat ? (
            <>
              <CardHeader className="border-b pb-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage 
                        src={chats.find(c => c.id === selectedChat)?.avatar || ""} 
                      />
                      <AvatarFallback>
                        {chats.find(c => c.id === selectedChat)?.name.split(" ").map(n => n[0]).join("") || ""}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">
                        {chats.find(c => c.id === selectedChat)?.name}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground">
                        {chats.find(c => c.id === selectedChat)?.isOnline 
                          ? "Online" 
                          : "Offline"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea 
                  ref={scrollAreaRef} 
                  className="h-full"
                  scrollHideDelay={100}
                >
                  <div className="p-4 space-y-4">
                    {(allMessages[selectedChat] || []).map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender.id === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        {message.sender.id !== "user" && (
                          <Avatar className="h-8 w-8 mr-2 mt-1">
                            <AvatarImage src={message.sender.avatar} />
                            <AvatarFallback>
                              {message.sender.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className="max-w-[70%]">
                          <div
                            className={`p-3 rounded-lg ${
                              message.sender.id === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-accent"
                            }`}
                          >
                            <p className="break-words">{message.content}</p>
                            
                            {message.attachments && message.attachments.length > 0 && (
                              <div className="mt-2 space-y-2">
                                {message.attachments.map(attachment => (
                                  <div 
                                    key={attachment.id}
                                    className={`flex items-center gap-2 p-2 rounded ${
                                      message.sender.id === "user"
                                        ? "bg-primary-foreground/10"
                                        : "bg-background/80"
                                    }`}
                                  >
                                    {attachment.type === "image" ? (
                                      <Image className="h-4 w-4" />
                                    ) : (
                                      <File className="h-4 w-4" />
                                    )}
                                    <span className="text-sm truncate">{attachment.name}</span>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-7 px-2 ml-auto"
                                      onClick={() => {
                                        toast.success(`Downloading ${attachment.name}`);
                                      }}
                                    >
                                      <ArrowDownToLine className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center mt-1 space-x-1">
                            <span className="text-xs text-muted-foreground ml-1">
                              {message.timestamp.toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </span>
                            {message.sender.id === "user" && (
                              <span className="ml-1">{renderMessageStatus(message.status)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => toast.info("Attachment feature coming soon")}
                  >
                    <PaperclipIcon className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                  >
                    <SendHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <div className="rounded-full bg-primary/10 p-4 mb-4">
                <Send className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Your Messages</h3>
              <p className="text-muted-foreground max-w-md mb-4">
                Select a conversation to start messaging with your healthcare provider
              </p>
              <Button onClick={() => {
                if (sortedChats.length > 0) {
                  setSelectedChat(sortedChats[0].id);
                }
              }}>
                Start a conversation
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default MessagesPage;
