import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectFormData } from "@/pages/CreateProject";
import { Plus, X, Palette } from "lucide-react";

interface AnnotationClassesProps {
  formData: ProjectFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProjectFormData>>;
}

const predefinedColors = [
  "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16",
  "#22c55e", "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9",
  "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef",
  "#ec4899", "#f43f5e"
];

const AnnotationClasses: React.FC<AnnotationClassesProps> = ({
  formData,
  setFormData
}) => {
  const [newClassName, setNewClassName] = useState("");
  const [selectedColor, setSelectedColor] = useState(predefinedColors[0]);

  const addClass = () => {
    if (newClassName.trim() === "") return;
    
    // Check if class name already exists
    const exists = formData.annotationClasses.some(
      cls => cls.name.toLowerCase() === newClassName.toLowerCase()
    );
    
    if (exists) return;

    const newClass = {
      id: Date.now().toString(),
      name: newClassName.trim(),
      color: selectedColor
    };

    setFormData(prev => ({
      ...prev,
      annotationClasses: [...prev.annotationClasses, newClass]
    }));

    setNewClassName("");
    // Select next color
    const currentIndex = predefinedColors.indexOf(selectedColor);
    const nextIndex = (currentIndex + 1) % predefinedColors.length;
    setSelectedColor(predefinedColors[nextIndex]);
  };

  const removeClass = (id: string) => {
    setFormData(prev => ({
      ...prev,
      annotationClasses: prev.annotationClasses.filter(cls => cls.id !== id)
    }));
  };

  const classNameExists = formData.annotationClasses.some(
    cls => cls.name.toLowerCase() === newClassName.toLowerCase()
  );

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium">Annotation Classes *</Label>
        <p className="text-sm text-muted-foreground mt-1">
          Define the classes or categories for your annotations
        </p>
      </div>

      {/* Add new class */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <Label htmlFor="class-name">Class Name</Label>
                <Input
                  id="class-name"
                  placeholder="Enter class name (e.g., 'Car', 'Person', 'Defect')"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addClass()}
                  className={classNameExists ? "border-destructive" : ""}
                />
                {classNameExists && (
                  <p className="text-sm text-destructive mt-1">
                    This class name already exists
                  </p>
                )}
              </div>
              
              <div>
                <Label>Color</Label>
                <div className="flex items-center gap-2 mt-2">
                  <div
                    className="w-8 h-8 rounded border-2 border-border cursor-pointer flex items-center justify-center"
                    style={{ backgroundColor: selectedColor }}
                  >
                    <Palette className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-end">
                <Button 
                  onClick={addClass}
                  disabled={!newClassName.trim() || classNameExists}
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>

            {/* Color palette */}
            <div>
              <Label className="text-sm">Choose Color</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {predefinedColors.map((color) => (
                  <button
                    key={color}
                    className={`w-6 h-6 rounded border-2 ${
                      selectedColor === color ? "border-foreground" : "border-muted"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Existing classes */}
      {formData.annotationClasses.length > 0 && (
        <div>
          <Label className="text-sm font-medium">Added Classes ({formData.annotationClasses.length})</Label>
          <div className="grid gap-2 mt-2">
            {formData.annotationClasses.map((cls) => (
              <div
                key={cls.id}
                className="flex items-center gap-3 p-3 bg-muted rounded-lg"
              >
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: cls.color }}
                />
                <span className="flex-1 font-medium">{cls.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeClass(cls.id)}
                  className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {formData.annotationClasses.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Palette className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No annotation classes added yet</p>
          <p className="text-sm">Add at least one class to continue</p>
        </div>
      )}
    </div>
  );
};

export default AnnotationClasses;
