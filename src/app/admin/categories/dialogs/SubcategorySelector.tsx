import React from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu";
import { Option, Subcategory } from "@/types/category";

interface SubcategorySelectorProps {
  selectedSubcategories: Option<Subcategory>[];
  onToggleSubcategory: (item: Option<Subcategory>) => void;
  subcategoryOptions: Option<Subcategory>[];
}

export function SubcategorySelector({ 
  selectedSubcategories, 
  onToggleSubcategory, 
  subcategoryOptions 
}: SubcategorySelectorProps) {  const getDisplayText = () => {
    if (selectedSubcategories?.length) {
      const selectedLabels = subcategoryOptions
        .filter(c => selectedSubcategories?.some(fv => fv.value?.id === c.value?.id))
        .map(c => c.label);
      
      if (selectedLabels.length > 2) {
        return `${selectedLabels.slice(0, 2).join(", ")} +${selectedLabels.length - 2} more`;
      }
      return selectedLabels.join(", ");
    }
    return "Select subcategories";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {getDisplayText()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[15rem]">
        {subcategoryOptions.map(cat => (
          <DropdownMenuCheckboxItem
            key={cat.value.id}
            onPointerDown={e => e.stopPropagation()}
            checked={selectedSubcategories?.some(x => x.value?.id === cat.value.id)}
            onSelect={e => {
              e.preventDefault();
              onToggleSubcategory(cat);
            }}
            className="cursor-pointer"
          >
            {cat.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
