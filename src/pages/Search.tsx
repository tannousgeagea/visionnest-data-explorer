
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Search</h1>
            <p className="text-muted-foreground">Search across your projects and data</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects, images, models..."
            className="pl-9"
          />
        </div>

        {/* Search Results Placeholder */}
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <Search className="h-12 w-12 mx-auto mb-3 opacity-50 text-muted-foreground" />
          <p className="text-lg font-medium">Start searching</p>
          <p className="text-muted-foreground mt-1">
            Enter a search term to find projects, images, and models
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
