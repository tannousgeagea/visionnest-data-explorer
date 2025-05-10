
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ModelService } from "@/services/ModelService";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import TrainingForm from "@/components/models/TrainingForm";

const ModelTraining: React.FC = () => {
  const { projectId, modelId } = useParams<{ projectId: string; modelId: string }>();
  
  const { data: model, isLoading, error } = useQuery({
    queryKey: ["model", modelId],
    queryFn: () => ModelService.getModelById(modelId || ""),
    enabled: !!modelId
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-80" />
          </div>
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (error || !model) {
    return (
      <div className="bg-destructive/10 p-6 rounded-lg">
        <h3 className="font-bold text-destructive mb-2">Error Loading Model</h3>
        <p className="mb-4">We couldn't load the model details. Please try again.</p>
        <Button asChild>
          <Link to={`/projects/${projectId}/models`}>Back to Models</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Button 
          variant="ghost" 
          className="pl-0 mb-2" 
          asChild
        >
          <Link to={`/projects/${projectId}/models/${modelId}`}>
            <ArrowLeft className="mr-2 h-4 w-4" /> 
            Back to Model
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Train New Version</h1>
        <p className="text-muted-foreground">
          Configure and start training a new version of {model.name}
        </p>
      </div>

      <TrainingForm model={model} projectId={projectId || ''} />
    </div>
  );
};

export default ModelTraining;
