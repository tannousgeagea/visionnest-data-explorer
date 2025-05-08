
import React, { useState } from "react";
import { PlusCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCard from "@/components/common/ProjectCard";

// Mock data
const mockProjects = [
  {
    id: "1",
    name: "Traffic Analysis",
    description: "Urban intersection monitoring for pedestrian safety analysis",
    imageCount: 256,
    tags: ["traffic", "urban", "pedestrians"],
    thumbnails: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
    ],
    status: "active",
    lastUpdated: "2025-05-06"
  },
  {
    id: "2",
    name: "Product Defect Detection",
    description: "Automated quality control for manufacturing line",
    imageCount: 128,
    tags: ["manufacturing", "quality control", "defects"],
    thumbnails: [
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    ],
    status: "active",
    lastUpdated: "2025-05-03"
  },
  {
    id: "3",
    name: "Wildlife Monitoring System",
    description: "Forest preservation and endangered species tracking",
    imageCount: 512,
    tags: ["wildlife", "forest", "conservation"],
    thumbnails: [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    ],
    status: "active",
    lastUpdated: "2025-04-28"
  },
  {
    id: "4",
    name: "Retail Analytics",
    description: "Store traffic and customer behavior analysis",
    imageCount: 384,
    tags: ["retail", "store", "analytics"],
    thumbnails: [
      "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    ],
    status: "archived",
    lastUpdated: "2025-03-15"
  },
  {
    id: "5",
    name: "Facial Recognition Demo",
    description: "Technical demo for identity verification system",
    imageCount: 96,
    tags: ["face", "recognition", "identity"],
    thumbnails: [
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    ],
    status: "archived",
    lastUpdated: "2025-02-22"
  },
];

const Projects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter projects based on search
  const filterProjects = (projects: typeof mockProjects, term: string) => {
    if (!term) return projects;
    
    const lowerTerm = term.toLowerCase();
    return projects.filter(project => 
      project.name.toLowerCase().includes(lowerTerm) || 
      project.description?.toLowerCase().includes(lowerTerm) ||
      project.tags.some(tag => tag.toLowerCase().includes(lowerTerm))
    );
  };
  
  // Get active and archived projects
  const activeProjects = mockProjects.filter(p => p.status === "active");
  const archivedProjects = mockProjects.filter(p => p.status === "archived");
  
  // Filter based on search term
  const filteredActive = filterProjects(activeProjects, searchTerm);
  const filteredArchived = filterProjects(archivedProjects, searchTerm);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-1">Organize and manage your visual data</p>
        </div>
        <Button className="bg-accent hover:bg-accent/80">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Projects tabs */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active ({filteredActive.length})</TabsTrigger>
          <TabsTrigger value="archived">Archived ({filteredArchived.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          {filteredActive.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActive.map(project => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  name={project.name}
                  description={project.description}
                  imageCount={project.imageCount}
                  tags={project.tags}
                  thumbnails={project.thumbnails}
                  lastUpdated={new Date(project.lastUpdated).toLocaleDateString()}
                  onClick={() => {}}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <p className="text-lg font-medium">No active projects found</p>
              <p className="text-muted-foreground mt-1">
                {searchTerm ? "Try a different search term" : "Create a new project to get started"}
              </p>
              {!searchTerm && (
                <Button className="mt-4 bg-accent hover:bg-accent/80">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Project
                </Button>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="archived">
          {filteredArchived.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArchived.map(project => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  name={project.name}
                  description={project.description}
                  imageCount={project.imageCount}
                  tags={project.tags}
                  thumbnails={project.thumbnails}
                  lastUpdated={new Date(project.lastUpdated).toLocaleDateString()}
                  onClick={() => {}}
                  className="opacity-80"
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <p className="text-lg font-medium">No archived projects found</p>
              <p className="text-muted-foreground mt-1">
                {searchTerm ? "Try a different search term" : "Archived projects will appear here"}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Projects;
