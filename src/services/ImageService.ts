
import { mockImages } from "@/data/mockImages";

// Toggle for development mode
const USE_MOCK_DATA = false;

export interface ImageResponse {
  total: number;
  limit: number;
  offset: number;
  data: Image[];
}

export interface Image {
  id: string;
  name: string;
  src: string;
  tags: string[];
  source: string;
  date: string;
  projectId?: string;
}

export interface ImageQueryParams {
  name?: string;
  source?: string;
  tag?: string;
  additionalTags?: string[];
  limit?: number;
  offset?: number;
}

export const fetchImages = async (params: ImageQueryParams = {}): Promise<ImageResponse> => {
  if (USE_MOCK_DATA) {
    console.log("Using mock data instead of API");
    return createMockResponse(params);
  }

  try {
    // Build query string from params
    const queryParams = new URLSearchParams();
    
    // Add primary params
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '' && key !== 'additionalTags') {
        queryParams.append(key, value.toString());
      }
    });
    
    // Handle additional tags (for structured queries)
    if (params.additionalTags && params.additionalTags.length > 0) {
      params.additionalTags.forEach(tag => {
        queryParams.append('tag', tag);
      });
    }

    const queryString = queryParams.toString();
    const url = `/images${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching images:", error);
    // Fallback to mock data on error
    return createMockResponse(params);
  }
};

// Helper function to check if a tag matches, handling structured tag formats
function tagMatches(tagFilter: string, imageTags: string[]): boolean {
  // Check if tagFilter has a key:value format
  if (tagFilter.includes(':')) {
    const [key, value] = tagFilter.split(':');
    
    // If the tag filter has format "tag:value", we need to check if the raw value exists in image tags
    if (key.toLowerCase() === 'tag') {
      return imageTags.some(tag => 
        tag.toLowerCase() === value.toLowerCase().trim()
      );
    }
    
    // For other structured tags (key:value format), check if any tag has that key:value pair
    return imageTags.some(tag => {
      // Case insensitive comparison
      return tag.toLowerCase() === tagFilter.toLowerCase().trim();
    });
  } 
  
  // For simple tags without key: prefix, just check if it exists
  return imageTags.some(tag => 
    tag.toLowerCase() === tagFilter.toLowerCase().trim()
  );
}

// Helper function to filter mock data based on query params
function createMockResponse(params: ImageQueryParams): ImageResponse {
  let filteredData = [...mockImages];
  
  // Apply filters that match API parameters
  if (params.name) {
    const term = params.name.toLowerCase();
    filteredData = filteredData.filter(img => 
      img.name.toLowerCase().includes(term)
    );
  }
  
  if (params.source) {
    filteredData = filteredData.filter(img => 
      img.source.toLowerCase() === params.source?.toLowerCase()
    );
  }
  
  // Filter by primary tag
  if (params.tag) {
    filteredData = filteredData.filter(img => tagMatches(params.tag!, img.tags));
  }
  
  // Filter by additional tags
  if (params.additionalTags && params.additionalTags.length > 0) {
    params.additionalTags.forEach(tagFilter => {
      filteredData = filteredData.filter(img => tagMatches(tagFilter, img.tags));
    });
  }
  
  // Handle pagination
  const total = filteredData.length;
  const limit = params.limit || 20;
  const offset = params.offset || 0;
  
  const paginatedData = filteredData.slice(offset, offset + limit);
  
  return {
    total,
    limit,
    offset,
    data: paginatedData
  };
}
