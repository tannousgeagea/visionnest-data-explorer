
import React from "react";
import { Database, FolderOpen, Image, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatCard from "@/components/common/StatCard";
import ProjectCard from "@/components/common/ProjectCard";
import ImageCard from "@/components/common/ImageCard";

// Mock data
const recentProjects = [
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
    lastUpdated: "2 days ago"
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
    lastUpdated: "5 days ago"
  },
];

const recentImages = [
  {
    id: "1",
    name: "traffic_cam_01_20250508.jpg",
    src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    tags: ["traffic", "urban"],
    source: "API"
  },
  {
    id: "2",
    name: "defect_analysis_circuit_05.jpg",
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    tags: ["circuit", "defect"],
    source: "Upload"
  },
  {
    id: "3",
    name: "warehouse_inventory_scan_12.jpg",
    src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    tags: ["inventory", "warehouse"],
    source: "Edge Box"
  },
  {
    id: "4",
    name: "product_assembly_check_33.jpg",
    src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    tags: ["assembly", "product"],
    source: "API"
  },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome to VisionNest</h1>
          <p className="text-muted-foreground mt-1">Your computer vision operations platform</p>
        </div>
        <div className="space-x-4">
          <Button variant="outline">
            <FolderOpen className="mr-2 h-4 w-4" />
            New Project
          </Button>
          <Button className="bg-accent hover:bg-accent/80">
            <Image className="mr-2 h-4 w-4" />
            Upload Images
          </Button>
        </div>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Images" 
          value="2,547" 
          description="+123 in last 7 days"
          icon={<Image className="h-5 w-5 text-primary" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard 
          title="Projects" 
          value="16" 
          description="3 active projects"
          icon={<FolderOpen className="h-5 w-5 text-primary" />}
        />
        <StatCard 
          title="Data Sources" 
          value="8" 
          description="5 connected, 3 pending"
          icon={<Database className="h-5 w-5 text-primary" />}
        />
        <StatCard 
          title="Tags" 
          value="42" 
          description="12 used in last week"
          icon={<Filter className="h-5 w-5 text-primary" />}
        />
      </div>

      {/* Quick access tabs */}
      <Tabs defaultValue="recent-projects">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="recent-projects">Recent Projects</TabsTrigger>
            <TabsTrigger value="recent-images">Recent Images</TabsTrigger>
          </TabsList>
          <Button variant="link" size="sm">
            View All
          </Button>
        </div>
        
        <TabsContent value="recent-projects" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentProjects.map(project => (
              <ProjectCard
                key={project.id}
                id={project.id}
                name={project.name}
                description={project.description}
                imageCount={project.imageCount}
                tags={project.tags}
                thumbnails={project.thumbnails}
                lastUpdated={project.lastUpdated}
                onClick={() => {}}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="recent-images" className="mt-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
            {recentImages.map(image => (
              <ImageCard
                key={image.id}
                id={image.id}
                src={image.src}
                name={image.name}
                tags={image.tags}
                source={image.source}
                onClick={() => {}}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick actions */}
      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>Essential steps to set up your vision pipelines</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Database className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Explore Data Lake</h3>
              <p className="text-sm text-muted-foreground mt-1">Browse all your image data from various sources</p>
              <Button variant="link" className="px-0 mt-1">Browse Data Lake</Button>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <FolderOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Create a Project</h3>
              <p className="text-sm text-muted-foreground mt-1">Organize images into custom projects</p>
              <Button variant="link" className="px-0 mt-1">Create New Project</Button>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Image className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Upload Images</h3>
              <p className="text-sm text-muted-foreground mt-1">Add images directly to your data lake</p>
              <Button variant="link" className="px-0 mt-1">Upload New Images</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
