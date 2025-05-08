
import React from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SortControlProps {
  sortOrder: "asc" | "desc";
  setSortOrder: (value: "asc" | "desc") => void;
}

const SortControl: React.FC<SortControlProps> = ({ sortOrder, setSortOrder }) => {
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <Button
      variant="outline"
      onClick={toggleSortOrder}
    >
      Date {sortOrder === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />}
    </Button>
  );
};

export default SortControl;
