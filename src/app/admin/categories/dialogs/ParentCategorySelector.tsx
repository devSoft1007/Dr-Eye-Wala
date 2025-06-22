import React from "react";
import { Category } from "@/types/category";

interface ParentCategorySelectorProps {
  value: string | number | null;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  parentOptions: Category[];
  id: string;
}

export function ParentCategorySelector({ 
  value, 
  onChange, 
  parentOptions, 
  id 
}: ParentCategorySelectorProps) {
  return (
    <select
      id={id}
      className="rounded-md border px-3 py-2"
      value={value || ""}
      onChange={onChange}
    >
      <option value="">None (Top Level)</option>
      {parentOptions.map(cat => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </select>
  );
}
