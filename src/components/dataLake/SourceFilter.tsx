
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
  return (
    <Select value={filterSource} onValueChange={setFilterSource}>
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
