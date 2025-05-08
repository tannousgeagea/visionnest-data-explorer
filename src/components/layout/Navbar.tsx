
import React from "react";
import { Search, Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const Navbar: React.FC = () => {
  return (
    <div className="border-b px-6 py-3 flex items-center justify-between bg-card">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search across all images and projects..." 
            className="pl-9 bg-background"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-accent/10 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
        </button>
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
