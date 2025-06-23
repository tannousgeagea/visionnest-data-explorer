
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProjectBasicInfo from "@/components/project/ProjectBasicInfo";
import ProjectTaskSelection from "@/components/project/ProjectTaskSelection";
import AnnotationClasses from "@/components/project/AnnotationClasses";
import { ModelType } from "@/types/models";

export interface ProjectFormData {
  name: string;
  description: string;
  task: ModelType | "";
  annotationClasses: Array<{
    id: string;
    name: string;
    color: string;
  }>;
}

const CreateProject: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ProjectFormData>({
    name: "",
    description: "",
    task: "",
    annotationClasses: []
  });

  const steps = [
    { number: 1, title: "Basic Information", component: ProjectBasicInfo },
    { number: 2, title: "Task Selection", component: ProjectTaskSelection },
    { number: 3, title: "Annotation Classes", component: AnnotationClasses }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // TODO: Implement project creation logic
    console.log("Creating project:", formData);
    // For now, navigate back to projects
    navigate("/projects");
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() !== "";
      case 2:
        return formData.task !== "";
      case 3:
        return formData.annotationClasses.length > 0;
      default:
        return false;
    }
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/projects")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Create New Project</h1>
            <p className="text-muted-foreground">Set up your computer vision project</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-4">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step.number
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step.number}
              </div>
              <span className={`ml-2 text-sm ${
                currentStep >= step.number ? "text-foreground" : "text-muted-foreground"
              }`}>
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-4 ${
                  currentStep > step.number ? "bg-primary" : "bg-muted"
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Content */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>{steps[currentStep - 1].title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <CurrentStepComponent
              formData={formData}
              setFormData={setFormData}
            />

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep === steps.length ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!isStepValid()}
                  className="bg-accent hover:bg-accent/80"
                >
                  Create Project
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="bg-accent hover:bg-accent/80"
                >
                  Next
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateProject;
