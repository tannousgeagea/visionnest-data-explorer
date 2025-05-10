import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Filter, ArrowLeft, Search, Plus, Tag, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import ImageCard from "@/components/common/ImageCard";
import TagBadge from "@/components/common/TagBadge";
import ModelSummaryCard from "@/components/common/ModelSummaryCard";

// Mock project data - in a real app, this would come from an API
const mockProjects = {
  "1": {
    id: "1",
    name: "Traffic Analysis",
    description: "Urban intersection monitoring for pedestrian safety analysis",
    imageCount: 256,
    tags: ["traffic", "urban", "pedestrians"],
    lastUpdated: "2025-05-06",
    images: [
      {
        id: "1",
        name: "traffic_cam_01_20250508.jpg",
        src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
        tags: ["traffic", "urban", "intersection"],
        source: "API",
        date: "2025-05-06",
        status: "annotated"
      },
      {
        id: "5",
        name: "retail_analytics_store_15.jpg",
        src: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
        tags: ["retail", "store", "analytics"],
        source: "Edge Box",
        date: "2025-05-02",
        status: "pending"
      },
      {
        id: "9",
        name: "traffic_cam_02_20250508.jpg",
        src: "https://images.unsplash.com/photo-1567602712938-825d94d9425d",
        tags: ["traffic", "urban", "night"],
        source: "API",
        date: "2025-05-01",
        status: "pending"
      },
      {
        id: "10",
        name: "intersection_busy_20250507.jpg",
        src: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
        tags: ["traffic", "intersection", "busy"],
        source: "API",
        date: "2025-04-28",
        status: "annotated"
      }
    ]
  },
  "2": {
    id: "2",
    name: "Product Defect Detection",
    description: "Automated quality control for manufacturing line",
    imageCount: 128,
    tags: ["manufacturing", "quality control", "defects"],
    lastUpdated: "2025-05-03",
    images: [
      {
        id: "2",
        name: "defect_analysis_circuit_05.jpg",
        src: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        tags: ["circuit", "defect", "electronics"],
        source: "Upload",
        date: "2025-05-05",
        status: "annotated"
      },
      {
        id: "4",
        name: "product_assembly_check_33.jpg",
        src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
        tags: ["assembly", "product", "quality"],
        source: "API",
        date: "2025-05-03",
        status: "pending"
      }
    ]
  }
};

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [filterTags, setFilterTags] = useState<string[]>([]);

  // Get project data
  const project = projectId && mockProjects[projectId as keyof typeof mockProjects];

  useEffect(() => {
    // Reset selections when changing tabs
    setSelectedImages([]);
  }, [activeTab]);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <h2 className="text-2xl font-semibold mb-2">Project Not Found</h2>
        <p className="text-muted-foreground mb-4">The project you're looking for doesn't exist.</p>
        <Button onClick={() => navigate("/projects")}>Back to Projects</Button>
      </div>
    );
  }

  // Get all unique tags from project images
  const allTags = Array.from(
    new Set(project.images.flatMap(img => img.tags))
  ).sort();

  // Filter images based on search, tabs, and tags
  const filteredImages = project.images.filter(image => {
    // Filter by search term
    const matchesSearch = searchTerm === "" || 
      image.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      image.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Filter by tab
    const matchesTab = 
      activeTab === "all" || 
      (activeTab === "annotated" && image.status === "annotated") ||
      (activeTab === "pending" && image.status === "pending");
    
    // Filter by selected tags
    const matchesTags = filterTags.length === 0 || 
      filterTags.every(tag => image.tags.includes(tag));
    
    return matchesSearch && matchesTab && matchesTags;
  });

  const toggleImageSelection = (id: string) => {
    setSelectedImages(prev => 
      prev.includes(id) 
        ? prev.filter(imgId => imgId !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedImages.length === filteredImages.length) {
      setSelectedImages([]);
    } else {
      setSelectedImages(filteredImages.map(img => img.id));
    }
  };

  const toggleFilterTag = (tag: string) => {
    setFilterTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilterTags([]);
  };

  const handleImageClick = (imageId: string) => {
    if (selectedImages.length > 0) {
      // If we're in selection mode, toggle selection instead of navigating
      toggleImageSelection(imageId);
    } else {
      // Navigate to image detail
      navigate(`/projects/${projectId}/images/${imageId}`);
    }
  };

  const handleModelsClick = () => {
    navigate(`/projects/${projectId}/models`);
  };

  // Mock model data (would come from an API in a real app)
  const modelCount = 3;
  const latestModelName = "Traffic Classifier";
  const latestVersion = 2;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with back button */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate("/projects")} className="p-1">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
          <p className="text-muted-foreground mt-1">{project.description}</p>
        </div>
      </div>

      {/* Project metadata and tags */}
      <div className="bg-card p-4 rounded-lg border">
        <div className="flex flex-wrap gap-2 items-center mb-4">
          <span className="text-sm font-medium">Project Tags:</span>
          {project.tags.map(tag => (
            <TagBadge key={tag} tag={tag} />
          ))}
          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Images:</span>
            <span className="ml-2 font-medium">{project.imageCount}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Models:</span>
            <span className="ml-2 font-medium">{modelCount}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Last Updated:</span>
            <span className="ml-2 font-medium">{new Date(project.lastUpdated).toLocaleDateString()}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Annotation Progress:</span>
            <span className="ml-2 font-medium">
              {Math.round((project.images.filter(img => img.status === "annotated").length / project.images.length) * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Project overview cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ModelSummaryCard 
          projectId={projectId || ""} 
          modelCount={modelCount} 
          latestModelName={latestModelName}
          latestVersionNumber={latestVersion}
        />
        
        {/* Placeholder for other summary cards */}
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="font-medium mb-2">Dataset Overview</h3>
          <p className="text-muted-foreground">Image stats and distribution</p>
        </div>
        
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="font-medium mb-2">Recent Activity</h3>
          <p className="text-muted-foreground">Latest annotations and model runs</p>
        </div>
      </div>

      {/* Search, filters and actions */}
      <div className="flex flex-col space-y-4">
        <div className="flex space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search project images..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button className="bg-accent hover:bg-accent/80">
            <Plus className="mr-2 h-4 w-4" />
            Add Images
          </Button>
        </div>

        {/* Tag filters */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filter by Tags:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleFilterTag(tag)}
                className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
                  filterTags.includes(tag)
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {tag}
              </button>
            ))}
            {(filterTags.length > 0 || searchTerm) && (
              <button
                onClick={handleClearFilters}
                className="text-xs text-muted-foreground hover:text-foreground ml-2 underline"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Status tabs and image grid */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">
              All Images ({project.images.length})
            </TabsTrigger>
            <TabsTrigger value="annotated">
              Annotated ({project.images.filter(img => img.status === "annotated").length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending Review ({project.images.filter(img => img.status === "pending").length})
            </TabsTrigger>
            <TabsTrigger value="models" onClick={handleModelsClick}>
              Models ({modelCount})
            </TabsTrigger>
          </TabsList>

          {selectedImages.length > 0 && (
            <div className="space-x-2">
              <Button variant="outline" size="sm">Add Tags</Button>
              <Button variant="outline" size="sm" className="text-destructive">Remove</Button>
            </div>
          )}
        </div>
        
        <TabsContent value="all" className="m-0">
          {/* Selection header */}
          <div className="flex items-center mb-4">
            <Checkbox 
              id="select-all"
              checked={selectedImages.length > 0 && selectedImages.length === filteredImages.length}
              onCheckedChange={toggleSelectAll}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <label htmlFor="select-all" className="ml-2 text-sm">
              {selectedImages.length === 0 
                ? "Select All" 
                : `${selectedImages.length} image${selectedImages.length > 1 ? 's' : ''} selected`}
            </label>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredImages.map(image => (
              <ImageCard
                key={image.id}
                id={image.id}
                src={image.src}
                name={image.name}
                tags={image.tags}
                source={image.source}
                selected={selectedImages.includes(image.id)}
                onClick={() => handleImageClick(image.id)}
              />
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-lg font-medium">No images match your search criteria</p>
              <p className="text-muted-foreground mt-1">Try adjusting your filters</p>
              <Button variant="outline" className="mt-4" onClick={handleClearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="annotated" className="m-0">
          {/* Selection header */}
          <div className="flex items-center mb-4">
            <Checkbox 
              id="select-all-annotated"
              checked={selectedImages.length > 0 && selectedImages.length === filteredImages.length}
              onCheckedChange={toggleSelectAll}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <label htmlFor="select-all-annotated" className="ml-2 text-sm">
              {selectedImages.length === 0 
                ? "Select All" 
                : `${selectedImages.length} image${selectedImages.length > 1 ? 's' : ''} selected`}
            </label>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredImages.map(image => (
              <ImageCard
                key={image.id}
                id={image.id}
                src={image.src}
                name={image.name}
                tags={image.tags}
                source={image.source}
                selected={selectedImages.includes(image.id)}
                onClick={() => handleImageClick(image.id)}
              />
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-lg font-medium">No images match your search criteria</p>
              <p className="text-muted-foreground mt-1">Try adjusting your filters</p>
              <Button variant="outline" className="mt-4" onClick={handleClearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="pending" className="m-0">
          {/* Selection header */}
          <div className="flex items-center mb-4">
            <Checkbox 
              id="select-all-pending"
              checked={selectedImages.length > 0 && selectedImages.length === filteredImages.length}
              onCheckedChange={toggleSelectAll}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <label htmlFor="select-all-pending" className="ml-2 text-sm">
              {selectedImages.length === 0 
                ? "Select All" 
                : `${selectedImages.length} image${selectedImages.length > 1 ? 's' : ''} selected`}
            </label>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredImages.map(image => (
              <ImageCard
                key={image.id}
                id={image.id}
                src={image.src}
                name={image.name}
                tags={image.tags}
                source={image.source}
                selected={selectedImages.includes(image.id)}
                onClick={() => handleImageClick(image.id)}
              />
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-lg font-medium">No images match your search criteria</p>
              <p className="text-muted-foreground mt-1">Try adjusting your filters</p>
              <Button variant="outline" className="mt-4" onClick={handleClearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetail;
