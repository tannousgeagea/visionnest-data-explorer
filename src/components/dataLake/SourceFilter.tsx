
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SourceFilterProps {
  filterSource: string | undefined;
  setFilterSource: (value: string | undefined) => void;
  sources: string[];
}

const SourceFilter: React.FC<SourceFilterProps> = ({ 
  filterSource, 
  setFilterSource, 
  sources 
}) => {
  // Handle the selection change
  const handleValueChange = (value: string) => {
    setFilterSource(value === "all" ? undefined : value);
  };

  return (
    <Select 
      value={filterSource || "all"} 
      onValueChange={handleValueChange}
    >
      <SelectTrigger>
        <SelectValue placeholder="Filter by source" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Sources</SelectItem>
        {sources.map(source => (
          <SelectItem key={source} value={source}>{source}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SourceFilter;
