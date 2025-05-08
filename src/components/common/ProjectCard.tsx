
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import TagBadge from "./TagBadge";

interface ProjectCardProps {
  id: string;
  name: string;
  description?: string;
  imageCount: number;
  tags?: string[];
  thumbnails?: string[];
  onClick?: () => void;
  className?: string;
  lastUpdated?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  name,
  description,
  imageCount,
  tags = [],
  thumbnails = [],
  onClick,
  className,
  lastUpdated,
}) => {
  return (
    <Card 
      className={cn("overflow-hidden cursor-pointer image-card-hover", className)}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium">{name}</h3>
            {description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
            )}
          </div>
          <div className="bg-primary/10 text-primary rounded-md px-2 py-1 text-sm font-medium">
            {imageCount} images
          </div>
        </div>
        
        {thumbnails.length > 0 && (
          <div className="grid grid-cols-3 gap-1 mt-4">
            {thumbnails.slice(0, 3).map((src, index) => (
              <div key={`${id}-thumb-${index}`} className="aspect-square bg-muted rounded-md overflow-hidden">
                <img 
                  src={src} 
                  alt={`${name} thumbnail ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {tags.slice(0, 3).map((tag) => (
              <TagBadge key={`${id}-${tag}`} tag={tag} size="sm" />
            ))}
            {tags.length > 3 && (
              <span className="text-xs text-muted-foreground">+{tags.length - 3} more</span>
            )}
          </div>
        )}
      </CardContent>
      
      {lastUpdated && (
        <CardFooter className="px-4 py-3 border-t bg-muted/50 text-xs text-muted-foreground">
          Last updated: {lastUpdated}
        </CardFooter>
      )}
    </Card>
  );
};

export default ProjectCard;
