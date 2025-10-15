import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

interface CompareToggleProps {
  isComparing: boolean;
  onToggle: () => void;
}

export const CompareToggle = ({ isComparing, onToggle }: CompareToggleProps) => {
  return (
    <div className="flex justify-center mb-6">
      <Button
        variant={isComparing ? "default" : "outline"}
        onClick={onToggle}
        className="gap-2"
      >
        <Copy className="h-4 w-4" />
        {isComparing ? "Exit Compare Mode" : "Compare Scenarios"}
      </Button>
    </div>
  );
};
