import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { mockImages, mockProjectOptions, sources } from "@/data/mockImages";
import { fetchImages, ImageQueryParams } from "@/services/ImageService";
import SearchFilter from "@/components/dataLake/SearchFilter";
import SourceFilter from "@/components/dataLake/SourceFilter";
import SortControl from "@/components/dataLake/SortControl";
import TagFilter from "@/components/dataLake/TagFilter";
import SelectionHeader from "@/components/dataLake/SelectionHeader";
import ImageGrid from "@/components/dataLake/ImageGrid";
import NoResults from "@/components/dataLake/NoResults";
import { Loader } from "lucide-react";
import { parseQueryString, formatQueryAsTagParams, ParsedQuery } from "@/utils/queryParser";

// Extract all tags from mock images for initial loading
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
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [parsedQuery, setParsedQuery] = useState<ParsedQuery>({});
  
  const navigate = useNavigate();

  // Debounce search term to prevent excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      // Parse the search term whenever it changes
      setParsedQuery(parseQueryString(searchTerm));
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Handle removing a specific filter from the search
  const handleRemoveFilter = (key: string) => {
    // Create a new search string without the removed filter
    const newSearchTerms = Object.entries(parsedQuery)
      .filter(([k]) => k !== key)
      .map(([k, v]) => {
        // Add quotes if the value contains spaces
        const formattedValue = v.includes(' ') ? `"${v}"` : v;
        return `${k}:${formattedValue}`;
      })
      .join(' ');
    
    setSearchTerm(newSearchTerms);
  };

  // Format tag filters from parsed query
  const tagFiltersFromQuery = formatQueryAsTagParams(parsedQuery);
  
  // Combine text-based tag filters with UI-selected tag filters
  const combinedTagFilters = [...filterTags, ...tagFiltersFromQuery];

  // Extract text search term if present
  const textSearchTerm = parsedQuery.text || '';
  
  // Prepare query parameters
  const queryParams: ImageQueryParams = {
    name: textSearchTerm || undefined,
    source: filterSource,
    // Use tag filters from both UI selection and structured query
    tag: combinedTagFilters.length > 0 ? combinedTagFilters[0] : undefined,
    // Add additional tag parameters for multi-tag filtering
    ...(combinedTagFilters.length > 1 && {
      additionalTags: combinedTagFilters.slice(1)
    })
  };

  // Fetch images with React Query
  const { 
    data: imageResponse, 
    isLoading, 
    isError 
  } = useQuery({
    queryKey: ['images', queryParams],
    queryFn: () => fetchImages(queryParams),
  });

  // Clear selected images when filters change
  useEffect(() => {
    setSelectedImages([]);
  }, [debouncedSearchTerm, filterSource, filterTags, tagFiltersFromQuery]);

  const toggleImageSelection = (id: string) => {
    setSelectedImages(prev => 
      prev.includes(id) 
        ? prev.filter(imgId => imgId !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const displayedImages = imageResponse?.data || [];
    if (selectedImages.length === displayedImages.length) {
      setSelectedImages([]);
    } else {
      setSelectedImages(displayedImages.map(img => img.id));
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
  
  // Get displayed images from API response or use empty array if loading/error
  const displayedImages = imageResponse?.data || [];
  
  // Apply sorting (we still need to sort client-side)
  const sortedImages = [...displayedImages].sort((a, b) => {
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
          <SearchFilter 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            parsedQuery={parsedQuery}
            onRemoveFilter={handleRemoveFilter}
          />
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
        filteredImages={sortedImages}
        toggleSelectAll={toggleSelectAll}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        projectOptions={mockProjectOptions}
        handleAddToProject={handleAddToProject}
      />

      {/* Loading state */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center p-12">
          <Loader className="animate-spin h-8 w-8 mb-4 text-primary" />
          <p className="text-muted-foreground">Loading images...</p>
        </div>
      )}

      {/* Error state */}
      {isError && !isLoading && (
        <div className="text-center p-12">
          <p className="text-destructive font-medium mb-2">Failed to load images</p>
          <p className="text-muted-foreground">Using mock data as fallback</p>
        </div>
      )}

      {/* Images grid or no results */}
      {!isLoading && sortedImages.length > 0 ? (
        <ImageGrid 
          images={sortedImages} 
          selectedImages={selectedImages} 
          onImageClick={handleImageClick}
          toggleImageSelection={toggleImageSelection}
        />
      ) : (
        !isLoading && <NoResults onClearFilters={handleClearFilters} />
      )}
    </div>
  );
};

export default DataLake;
