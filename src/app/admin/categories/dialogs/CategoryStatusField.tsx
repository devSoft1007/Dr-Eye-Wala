import React from "react";
import { Switch } from "@/components/ui/switch";

interface CategoryStatusFieldProps {
  isActive: boolean;
  onStatusChange: (checked: boolean) => void;
  id: string;
}

export function CategoryStatusField({ 
  isActive, 
  onStatusChange, 
  id 
}: CategoryStatusFieldProps) {
  return (
    <div className="flex items-center gap-2">
      <Switch
        id={id}
        checked={isActive}
        onCheckedChange={onStatusChange}
        className="cursor-pointer"
        aria-label="Active status"
      />
      <span>Active</span>
    </div>
  );
}
