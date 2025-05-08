
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { mockImages, mockProjectOptions, sources } from "@/data/mockImages";
import SearchFilter from "@/components/dataLake/SearchFilter";
import SourceFilter from "@/components/dataLake/SourceFilter";
import SortControl from "@/components/dataLake/SortControl";
import TagFilter from "@/components/dataLake/TagFilter";
import SelectionHeader from "@/components/dataLake/SelectionHeader";
import ImageGrid from "@/components/dataLake/ImageGrid";
import NoResults from "@/components/dataLake/NoResults";

// Available tags from all images
const allTags = Array.from(
  new Set(mockImages.flatMap(img => img.tags))
).sort();

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
  if (filterSource && filterSource !== "all") {
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

  // Check if any filters are active
  const hasActiveFilters = searchTerm !== "" || filterSource !== undefined || filterTags.length > 0;

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
          <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <SourceFilter 
            filterSource={filterSource} 
            setFilterSource={setFilterSource} 
            sources={sources} 
          />
          <SortControl sortOrder={sortOrder} setSortOrder={setSortOrder} />
        </div>
        
        <TagFilter 
          allTags={allTags}
          filterTags={filterTags}
          toggleFilterTag={toggleFilterTag}
          handleClearFilters={handleClearFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </div>

      {/* Selection header */}
      <SelectionHeader
        selectedImages={selectedImages}
        filteredImages={filteredImages}
        toggleSelectAll={toggleSelectAll}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        projectOptions={mockProjectOptions}
        handleAddToProject={handleAddToProject}
      />

      {/* Images grid */}
      {filteredImages.length > 0 ? (
        <ImageGrid 
          images={filteredImages} 
          selectedImages={selectedImages} 
          onImageClick={handleImageClick}
          toggleImageSelection={toggleImageSelection}
        />
      ) : (
        <NoResults onClearFilters={handleClearFilters} />
      )}
    </div>
  );
};

export default DataLake;
