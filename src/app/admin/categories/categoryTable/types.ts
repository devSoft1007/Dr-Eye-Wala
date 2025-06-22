import { Category } from "@/types/category";

// Category actions dropdown
export interface CategoryActionsProps {
    category: Category;
    handleDelete: (id: string) => void;
    setCurrentCategory: (category: Category) => void;
    setIsEditDialogOpen: (isOpen: boolean) => void;
  }

export interface CategoryTableProps {
  categories: Category[];
  getParentName: (parentId: string | null) => string;
  handleDelete: (id: string) => void;
  setCurrentCategory: (category: Category) => void;
  setIsEditDialogOpen: (isOpen: boolean) => void;
  handleEdit: (category: Category) => void;
}  

// Category name with image
export interface CategoryNameCellProps {
    category: Category;
  }

// Status badge component
export interface StatusBadgeProps {
    isActive: boolean;
  }  