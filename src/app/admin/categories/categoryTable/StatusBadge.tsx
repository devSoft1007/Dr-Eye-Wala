import { Badge } from "@/components/ui/badge";
import { StatusBadgeProps } from "./types";

export default function StatusBadge({ isActive }: StatusBadgeProps) {
    if (isActive) {
      return (
        <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
          Active
        </Badge>
      );
    }
    
    return (
      <Badge variant="outline" className="text-gray-500">
        Inactive
      </Badge>
    );
  }