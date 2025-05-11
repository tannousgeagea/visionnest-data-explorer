
import React from "react";
import { Link } from "react-router-dom";
import { Layers, ArrowRight, Database } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ModelSummaryCardProps {
  projectId: string;
  modelCount: number;
  latestModelName?: string;
  latestVersionNumber?: number;
  latestDatasetName?: string;
}

const ModelSummaryCard: React.FC<ModelSummaryCardProps> = ({
  projectId,
  modelCount,
  latestModelName,
  latestVersionNumber,
  latestDatasetName,
}) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-primary/10 p-2 rounded-full">
            <Layers className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-medium text-lg">Models</h3>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-muted-foreground text-sm">Total Models</p>
            <p className="text-2xl font-bold">{modelCount}</p>
          </div>

          {latestModelName && latestVersionNumber && (
            <div>
              <p className="text-muted-foreground text-sm">Latest Version</p>
              <p className="font-medium">
                {latestModelName} (v{latestVersionNumber})
              </p>
              
              {latestDatasetName && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <Database className="h-3 w-3" />
                  <span>{latestDatasetName}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="bg-muted/50 p-3">
        <Button asChild variant="ghost" className="w-full">
          <Link to={`/projects/${projectId}/models`} className="flex justify-between items-center">
            View all models
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ModelSummaryCard;
