import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Maximize2, X } from "lucide-react";

interface MaximizeChartProps {
  title: string;
  children: React.ReactNode;
}

export const MaximizeChart = ({ title, children }: MaximizeChartProps) => {
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsMaximized(true)}
        className="absolute top-4 right-4 z-10"
      >
        <Maximize2 className="h-4 w-4" />
      </Button>

      <Dialog open={isMaximized} onOpenChange={setIsMaximized}>
        <DialogContent className="max-w-7xl h-[90vh] p-6">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 h-full pb-6 flex items-center justify-center">
            <div className="w-full h-full max-h-[calc(90vh-8rem)]">
              {children}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
