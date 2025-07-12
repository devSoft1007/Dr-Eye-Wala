import React, { memo } from "react";
import { Label } from "@/components/ui/label";

interface CategoryFormFieldProps {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}

function CategoryFormFieldComponent({ 
  label, 
  htmlFor, 
  children, 
  className = "flex flex-col gap-2" 
}: CategoryFormFieldProps) {
  return (
    <div className={className}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}

export const CategoryFormField = memo(CategoryFormFieldComponent);
