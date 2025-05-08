
import React from "react";
import { NavLink } from "react-router-dom";
import { 
  Home, Database, FolderOpen, Search, Settings, 
  LogOut, ChevronLeft
} from "lucide-react";
import { 
  Sidebar as SidebarContainer, 
  SidebarContent,
  SidebarFooter,
  SidebarHeader, 
  SidebarTrigger 
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <SidebarHeader className="px-4 py-6">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">V</div>
          <span className="ml-3 text-xl font-semibold text-sidebar-foreground">VisionNest</span>
        </div>
        <SidebarTrigger className="ml-auto hover:bg-sidebar-accent rounded-full p-1" />
      </SidebarHeader>
      
      <SidebarContent>
        <nav className="space-y-1 px-3">
          {[
            { name: "Dashboard", to: "/", icon: Home },
            { name: "Data Lake", to: "/data-lake", icon: Database },
            { name: "Projects", to: "/projects", icon: FolderOpen },
            { name: "Search", to: "/search", icon: Search },
            { name: "Settings", to: "/settings", icon: Settings },
          ].map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )
              }
            >
              <item.icon className="mr-3 h-5 w-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </SidebarContent>

      <SidebarFooter className="px-3 py-4">
        <button className="flex w-full items-center px-3 py-2 text-sm font-medium rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
          <LogOut className="mr-3 h-5 w-5" />
          <span>Log out</span>
        </button>
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default Sidebar;
