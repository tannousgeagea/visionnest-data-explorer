
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
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        queryParams.append(key, value.toString());
      }
    });

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
      img.source === params.source
    );
  }
  
  if (params.tag) {
    filteredData = filteredData.filter(img => 
      img.tags.includes(params.tag)
    );
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
