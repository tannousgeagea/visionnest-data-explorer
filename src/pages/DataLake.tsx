
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Filter, ArrowDown, ArrowUp, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import ImageCard from "@/components/common/ImageCard";
import { toast } from "@/components/ui/use-toast";

// Mock data
const mockImages = [
  {
    id: "1",
    name: "traffic_cam_01_20250508.jpg",
    src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    tags: ["traffic", "urban", "intersection"],
    source: "API",
    date: "2025-05-06",
    projectId: "1"
  },
  {
    id: "2",
    name: "defect_analysis_circuit_05.jpg",
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    tags: ["circuit", "defect", "electronics"],
    source: "Upload",
    date: "2025-05-05"
  },
  {
    id: "3",
    name: "warehouse_inventory_scan_12.jpg",
    src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    tags: ["inventory", "warehouse", "products"],
    source: "Edge Box",
    date: "2025-05-04"
  },
  {
    id: "4",
    name: "product_assembly_check_33.jpg",
    src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    tags: ["assembly", "product", "quality"],
    source: "API",
    date: "2025-05-03"
  },
  {
    id: "5",
    name: "retail_analytics_store_15.jpg",
    src: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
    tags: ["retail", "store", "analytics"],
    source: "Edge Box",
    date: "2025-05-02",
    projectId: "1"
  },
  {
    id: "6",
    name: "facial_recognition_sample_27.jpg",
    src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    tags: ["face", "recognition", "identity"],
    source: "Upload",
    date: "2025-05-01"
  },
  {
    id: "7",
    name: "autonomous_vehicle_road_08.jpg",
    src: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    tags: ["vehicle", "road", "autonomous"],
    source: "API",
    date: "2025-04-30"
  },
  {
    id: "8",
    name: "wildlife_monitoring_forest_22.jpg",
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    tags: ["wildlife", "forest", "monitoring"],
    source: "Edge Box",
    date: "2025-04-29"
  },
];

// Available tags from all images
const allTags = Array.from(
  new Set(mockImages.flatMap(img => img.tags))
).sort();

// Available sources
const sources = ["API", "Upload", "Edge Box"];

// Mock projects for assignment
const mockProjectOptions = [
  { id: "1", name: "Traffic Analysis" },
  { id: "2", name: "Product Defect Detection" },
  { id: "3", name: "Wildlife Monitoring System" },
  { id: "4", name: "Retail Analytics" },
  { id: "5", name: "Facial Recognition Demo" },
];

const DataLake: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSource, setFilterSource] = useState<string | undefined>(undefined);
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedProject, setSelectedProject] = useState<string>("");
  
  const navigate = useNavigate();

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
    setFilterSource(undefined);
    setFilterTags([]);
  };
  
  const handleImageClick = (image: typeof mockImages[0]) => {
    // If the image has a project ID, navigate to the image detail within that project
    if (image.projectId) {
      navigate(`/projects/${image.projectId}/images/${image.id}`);
    } else {
      // Show a toast notifying that this image isn't in a project yet
      toast({
        title: "Image not in a project",
        description: "Add this image to a project to view and annotate it.",
        duration: 3000,
      });
    }
  };
  
  const handleAddToProject = () => {
    if (selectedImages.length === 0 || !selectedProject) {
      toast({
        title: "Selection required",
        description: "Please select images and a project first.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    toast({
      title: "Images added to project",
      description: `Added ${selectedImages.length} image(s) to ${mockProjectOptions.find(p => p.id === selectedProject)?.name}`,
      duration: 3000,
    });
    
    // Clear selection after adding
    setSelectedImages([]);
    setSelectedProject("");
  };
  
  // Filter and sort images
  let filteredImages = [...mockImages];
  
  // Apply search filter
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredImages = filteredImages.filter(
      img => img.name.toLowerCase().includes(term) || 
             img.tags.some(tag => tag.toLowerCase().includes(term))
    );
  }
  
  // Apply source filter
  if (filterSource) {
    filteredImages = filteredImages.filter(img => img.source === filterSource);
  }
  
  // Apply tag filters
  if (filterTags.length > 0) {
    filteredImages = filteredImages.filter(img => 
      filterTags.every(tag => img.tags.includes(tag))
    );
  }
  
  // Apply sorting
  filteredImages.sort((a, b) => {
    return sortOrder === "asc"
      ? new Date(a.date).getTime() - new Date(b.date).getTime()
      : new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Data Lake</h1>
          <p className="text-muted-foreground mt-1">Explore and manage all your image data</p>
        </div>
        <div className="space-x-4">
          <Button variant="outline">Add to Project</Button>
          <Button className="bg-accent hover:bg-accent/80">Upload Images</Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card p-4 rounded-lg border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search images by name or tag..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={filterSource} onValueChange={setFilterSource}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Sources</SelectItem>
              {sources.map(source => (
                <SelectItem key={source} value={source}>{source}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button
            variant="outline"
            onClick={() => setSortOrder(prev => (prev === "asc" ? "desc" : "asc"))}
          >
            Date {sortOrder === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />}
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
            {(filterTags.length > 0 || searchTerm || filterSource) && (
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

      {/* Selection header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Checkbox 
            id="select-all"
            checked={selectedImages.length > 0 && selectedImages.length === filteredImages.length}
            onCheckedChange={toggleSelectAll}
            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <label htmlFor="select-all" className="text-sm">
            {selectedImages.length === 0 
              ? "Select All" 
              : `${selectedImages.length} image${selectedImages.length > 1 ? 's' : ''} selected`}
          </label>
        </div>
        
        {selectedImages.length > 0 && (
          <div className="flex space-x-3 items-center">
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Add to project..." />
              </SelectTrigger>
              <SelectContent>
                {mockProjectOptions.map((project) => (
                  <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleAddToProject} 
              disabled={!selectedProject}
            >
              Add to Project
            </Button>
            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
              Delete
            </Button>
          </div>
        )}
      </div>

      {/* Images grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredImages.map(image => (
          <ImageCard
            key={image.id}
            id={image.id}
            src={image.src}
            name={image.name}
            tags={image.tags}
            source={image.source}
            selected={selectedImages.includes(image.id)}
            onClick={() => {
              if (selectedImages.length > 0) {
                toggleImageSelection(image.id);
              } else {
                handleImageClick(image);
              }
            }}
          />
        ))}
      </div>
      
      {filteredImages.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <p className="text-lg font-medium">No images match your search criteria</p>
          <p className="text-muted-foreground mt-1">Try adjusting your filters</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={handleClearFilters}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default DataLake;
