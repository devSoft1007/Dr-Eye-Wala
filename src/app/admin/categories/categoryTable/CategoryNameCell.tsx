import { CategoryNameCellProps } from "./types";

export default function CategoryNameCell({ category }: CategoryNameCellProps) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
          <img 
            src="/api/placeholder/40/40" 
            alt={category.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="font-medium">{category.name}</div>
          <div className="text-xs text-gray-500">{category.slug}</div>
        </div>
      </div>
    );
  }