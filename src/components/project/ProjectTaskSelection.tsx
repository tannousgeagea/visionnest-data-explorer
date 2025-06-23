
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ModelType } from "@/types/models";
import { ProjectFormData } from "@/pages/CreateProject";
import { Eye, Target, Layers, MessageSquare, Brain } from "lucide-react";

interface ProjectTaskSelectionProps {
  formData: ProjectFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProjectFormData>>;
}

const taskOptions = [
  {
    type: "classification" as ModelType,
    title: "Classification",
    description: "Categorize images into predefined classes",
    icon: Target,
    examples: ["Product categorization", "Quality control", "Medical diagnosis"]
  },
  {
    type: "object-detection" as ModelType,
    title: "Object Detection",
    description: "Detect and locate objects within images",
    icon: Eye,
    examples: ["Security monitoring", "Defect detection", "Traffic analysis"]
  },
  {
    type: "segmentation" as ModelType,
    title: "Segmentation",
    description: "Segment different regions or objects in images",
    icon: Layers,
    examples: ["Medical imaging", "Autonomous driving", "Background removal"]
  },
  {
    type: "vlm" as ModelType,
    title: "Vision Language Model",
    description: "Generate descriptions or answer questions about images",
    icon: MessageSquare,
    examples: ["Image captioning", "Visual Q&A", "Content description"]
  },
  {
    type: "llm" as ModelType,
    title: "Language Model",
    description: "Process and generate text-based content",
    icon: Brain,
    examples: ["Text classification", "Content generation", "Sentiment analysis"]
  }
];

const ProjectTaskSelection: React.FC<ProjectTaskSelectionProps> = ({
  formData,
  setFormData
}) => {
  const handleTaskSelect = (task: ModelType) => {
    setFormData(prev => ({
      ...prev,
      task
    }));
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base font-medium">Select Project Task Type *</Label>
        <p className="text-sm text-muted-foreground mt-1">
          Choose the type of computer vision or AI task for your project
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {taskOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = formData.task === option.type;
          
          return (
            <Card
              key={option.type}
              className={`cursor-pointer transition-all hover:shadow-md ${
                isSelected 
                  ? "ring-2 ring-primary bg-primary/5" 
                  : "hover:border-primary/50"
              }`}
              onClick={() => handleTaskSelect(option.type)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{option.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {option.description}
                    </p>
                    <div className="mt-3">
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        Use cases:
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-0.5">
                        {option.examples.map((example, index) => (
                          <li key={index}>• {example}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectTaskSelection;
