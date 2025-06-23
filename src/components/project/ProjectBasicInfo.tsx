
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ProjectFormData } from "@/pages/CreateProject";

interface ProjectBasicInfoProps {
  formData: ProjectFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProjectFormData>>;
}

// Mock existing project names for validation
const existingProjects = [
  "Traffic Analysis",
  "Product Defect Detection", 
  "Wildlife Monitoring System",
  "Retail Analytics",
  "Facial Recognition Demo"
];

const ProjectBasicInfo: React.FC<ProjectBasicInfoProps> = ({
  formData,
  setFormData
}) => {
  const isNameTaken = existingProjects.some(
    name => name.toLowerCase() === formData.name.toLowerCase()
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      name: e.target.value
    }));
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      description: e.target.value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="project-name">Project Name *</Label>
        <Input
          id="project-name"
          placeholder="Enter project name"
          value={formData.name}
          onChange={handleNameChange}
          className={isNameTaken ? "border-destructive" : ""}
        />
        {isNameTaken && (
          <p className="text-sm text-destructive">
            This project name already exists. Please choose a different name.
          </p>
        )}
        {formData.name && !isNameTaken && (
          <p className="text-sm text-muted-foreground">
            ✓ Project name is available
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="project-description">Description</Label>
        <Textarea
          id="project-description"
          placeholder="Describe your project goals and objectives"
          value={formData.description}
          onChange={handleDescriptionChange}
          rows={4}
        />
        <p className="text-sm text-muted-foreground">
          Optional: Provide details about what you want to achieve with this project
        </p>
      </div>
    </div>
  );
};

export default ProjectBasicInfo;
