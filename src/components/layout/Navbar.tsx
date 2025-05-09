
import React from "react";
import { Search, Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const Navbar: React.FC = () => {
  return (
    <div className="border-b px-6 py-3 flex items-center justify-between bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 text-white">
      <div className="flex items-center space-x-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white">
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="url(#paint0_linear)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
              stroke="url(#paint1_linear)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5Z"
              fill="url(#paint2_linear)"
            />
            <defs>
              <linearGradient id="paint0_linear" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6366F1" />
                <stop offset="1" stopColor="#8B5CF6" />
              </linearGradient>
              <linearGradient id="paint1_linear" x1="8" y1="12" x2="16" y2="12" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6366F1" />
                <stop offset="1" stopColor="#8B5CF6" />
              </linearGradient>
              <linearGradient id="paint2_linear" x1="10.5" y1="12" x2="13.5" y2="12" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6366F1" />
                <stop offset="1" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span className="font-bold text-lg">VisionNest</span>
      </div>
      <div className="flex-1 max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
          <Input 
            placeholder="Search across all images and projects..." 
            className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/70"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
          <Bell className="h-5 w-5 text-white" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
        </button>
        <Avatar className="h-8 w-8 border-2 border-white/20">
          <AvatarFallback className="bg-white/10 text-white">JD</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
