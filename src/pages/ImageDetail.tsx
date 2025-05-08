
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, ArrowRight, ZoomIn, ZoomOut, 
  Square, Pencil, Tag, Share, Download, 
  Check, X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TagBadge from "@/components/common/TagBadge";

// Mock data - in a real app this would be fetched based on projectId and imageId
const mockImageDetails = {
  "1": {
    "1": {
      id: "1",
      name: "traffic_cam_01_20250508.jpg",
      src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
      tags: ["traffic", "urban", "intersection", "pedestrian", "vehicles"],
      source: "API",
      date: "2025-05-06",
      metadata: {
        resolution: "1920x1080",
        size: "2.4 MB",
        format: "JPEG",
        captureDate: "2025-05-08 09:15:22",
        device: "AXIS Q1785-LE",
        location: "Main St & 5th Ave"
      },
      annotations: [
        { 
          id: "box1", 
          type: "box", 
          label: "car", 
          coordinates: { x: 30, y: 50, width: 120, height: 80 },
          color: "#3b82f6" 
        },
        { 
          id: "box2", 
          type: "box", 
          label: "pedestrian", 
          coordinates: { x: 200, y: 100, width: 40, height: 80 },
          color: "#10b981" 
        }
      ]
    },
    "5": {
      id: "5",
      name: "retail_analytics_store_15.jpg",
      src: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
      tags: ["retail", "store", "analytics"],
      source: "Edge Box",
      date: "2025-05-02",
      metadata: {
        resolution: "1280x720",
        size: "1.8 MB",
        format: "PNG",
        captureDate: "2025-05-02 15:22:10",
        device: "Canon EOS R5",
        location: "Retail Store #15"
      },
      annotations: []
    }
  },
  "2": {
    // Project 2 images would be here
  }
};

// Available annotation classes
const annotationClasses = [
  "car", "pedestrian", "bicycle", "traffic light", "stop sign", 
  "bus", "truck", "motorcycle", "road marking", "construction"
];

const ImageDetail: React.FC = () => {
  const { projectId, imageId } = useParams<{ projectId: string; imageId: string }>();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState("object");
  const [zoom, setZoom] = useState(100);
  const [selectedAnnotation, setSelectedAnnotation] = useState<string | null>(null);
  
  // Get the image data
  const currentImage = projectId && imageId && 
    mockImageDetails[projectId as keyof typeof mockImageDetails]?.[imageId];
    
  const tags = currentImage?.tags || [];
  const [imageTagList, setImageTagList] = useState<string[]>(tags);
  const [newTag, setNewTag] = useState("");
  
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };
  
  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  const removeTag = (tagToRemove: string) => {
    setImageTagList(prevTags => prevTags.filter(tag => tag !== tagToRemove));
  };

  const addTag = () => {
    if (newTag && !imageTagList.includes(newTag)) {
      setImageTagList([...imageTagList, newTag]);
      setNewTag("");
    }
  };

  const selectAnnotation = (id: string) => {
    setSelectedAnnotation(id === selectedAnnotation ? null : id);
  };
  
  const handleNavigateToPreviousImage = () => {
    // In a real app, this would navigate to the previous image in the sequence
    navigate(`/projects/${projectId}`);
  };
  
  const handleNavigateToNextImage = () => {
    // In a real app, this would navigate to the next image in the sequence
    navigate(`/projects/${projectId}`);
  };
  
  if (!currentImage) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-2">Image Not Found</h2>
        <p className="text-muted-foreground mb-4">The image you're looking for doesn't exist.</p>
        {projectId && (
          <Button onClick={() => navigate(`/projects/${projectId}`)}>
            Back to Project
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col animate-fade-in">
      {/* Top bar */}
      <div className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(`/projects/${projectId}`)}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Project
          </Button>
          <h1 className="text-lg font-medium">{currentImage.name}</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleNavigateToPreviousImage}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button variant="ghost" size="sm" onClick={handleNavigateToNextImage}>
            Next
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
          
          <div className="mx-4">
            <Select defaultValue="in-review">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not-started">Not Started</SelectItem>
                <SelectItem value="in-review">In Review</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-1" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex">
        {/* Image canvas */}
        <div className="flex-1 bg-black/5 overflow-hidden relative">
          <div 
            className="w-full h-full flex items-center justify-center overflow-auto"
            style={{
              backgroundSize: "20px 20px",
              backgroundImage: "linear-gradient(to right, #f0f0f0 1px, transparent 1px), linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)"
            }}
          >
            <div style={{ transform: `scale(${zoom / 100})`, transition: "transform 0.2s" }}>
              <div className="relative">
                <img 
                  src={currentImage.src} 
                  alt={currentImage.name} 
                  className="max-w-none"
                />
                
                {/* Render annotation boxes */}
                {currentImage.annotations.map(annotation => (
                  <div 
                    key={annotation.id}
                    className={cn(
                      "absolute border-2 cursor-pointer transition-all",
                      selectedAnnotation === annotation.id ? "border-white" : `border-[${annotation.color}]`
                    )}
                    style={{
                      left: `${annotation.coordinates.x}px`,
                      top: `${annotation.coordinates.y}px`,
                      width: `${annotation.coordinates.width}px`,
                      height: `${annotation.coordinates.height}px`,
                      borderColor: annotation.color,
                      boxShadow: selectedAnnotation === annotation.id ? "0 0 0 2px white" : "none"
                    }}
                    onClick={() => selectAnnotation(annotation.id)}
                  >
                    <div 
                      className="absolute top-0 left-0 translate-y-[-100%] text-xs px-1.5 py-0.5 font-medium rounded-sm text-white"
                      style={{ backgroundColor: annotation.color }}
                    >
                      {annotation.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Zoom controls */}
          <div className="absolute bottom-4 right-4 flex space-x-2 bg-card/80 backdrop-blur-sm p-1 rounded-lg border shadow-sm">
            <Button size="icon" variant="ghost" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="flex items-center px-2 text-sm">{zoom}%</span>
            <Button size="icon" variant="ghost" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Right sidebar */}
        <div className="w-80 border-l bg-card flex flex-col">
          <Tabs 
            defaultValue="object" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex flex-col h-full"
          >
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="object">
                <Square className="h-4 w-4 mr-2" />
                Object
              </TabsTrigger>
              <TabsTrigger value="segment">
                <Pencil className="h-4 w-4 mr-2" />
                Segment
              </TabsTrigger>
              <TabsTrigger value="tags">
                <Tag className="h-4 w-4 mr-2" />
                Tags
              </TabsTrigger>
            </TabsList>
            
            <ScrollArea className="flex-1">
              <TabsContent value="object" className="p-4 mt-0">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Annotation Tools</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-10 annotation-tool bg-primary/5"
                      >
                        <Square className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-10 annotation-tool"
                      >
                        <span className="text-sm">+</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-10 annotation-tool"
                        disabled={!selectedAnnotation}
                      >
                        <span className="text-sm">-</span>
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Class Selection</h3>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a class" />
                      </SelectTrigger>
                      <SelectContent>
                        {annotationClasses.map((cls) => (
                          <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Annotations</h3>
                    <div className="space-y-2">
                      {currentImage.annotations.map(annotation => (
                        <div 
                          key={annotation.id}
                          className={cn(
                            "flex items-center justify-between p-2 rounded-md cursor-pointer",
                            selectedAnnotation === annotation.id ? "bg-primary/10" : "hover:bg-muted"
                          )}
                          onClick={() => selectAnnotation(annotation.id)}
                        >
                          <div className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-2" 
                              style={{ backgroundColor: annotation.color }}
                            />
                            <span>{annotation.label}</span>
                          </div>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="segment" className="p-4 mt-0">
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Pencil className="h-10 w-10 mx-auto mb-2 opacity-20" />
                    <p>Segmentation tools coming soon</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="tags" className="p-4 mt-0">
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Add new tag..."
                        className="w-full px-3 py-2 rounded-md border bg-background"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') addTag();
                        }}
                      />
                    </div>
                    <Button onClick={addTag}>
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Image Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {imageTagList.map(tag => (
                        <TagBadge 
                          key={tag} 
                          tag={tag} 
                          onRemove={() => removeTag(tag)} 
                        />
                      ))}
                    </div>
                    {imageTagList.length === 0 && (
                      <p className="text-sm text-muted-foreground">No tags added yet</p>
                    )}
                  </div>
                </div>
              </TabsContent>
            </ScrollArea>
            
            <div className="p-4 border-t">
              <h3 className="text-sm font-medium mb-2">Image Details</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                <span className="text-muted-foreground">Resolution:</span>
                <span>{currentImage.metadata.resolution}</span>
                <span className="text-muted-foreground">Size:</span>
                <span>{currentImage.metadata.size}</span>
                <span className="text-muted-foreground">Capture Date:</span>
                <span>{currentImage.metadata.captureDate}</span>
                <span className="text-muted-foreground">Source:</span>
                <span>{currentImage.source}</span>
              </div>
              
              <div className="mt-4 flex space-x-2">
                <Button size="sm" className="w-full">Save Changes</Button>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ImageDetail;
