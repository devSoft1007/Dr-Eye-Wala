import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Category } from "@/types/category";
import { CategoryForm } from "./CategoryForm";
import { useCategoryForm } from "./useCategoryForm";
import { subcategoryOptions } from "./categoryConstants";

interface CategoryDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  category?: Category | null; // Existing category for edit mode, null for add mode
  categories: Category[];
  onSave: (category: Partial<Category>, pendingImageFile?: File | null) => void;
}

export function CategoryDialog({
  isOpen,
  setIsOpen,
  category,
  categories,
  onSave,
}: CategoryDialogProps) {
  const {
    formValues,
    isEditMode,
    pendingImageFile,
    handleInputChange,
    handleSwitchChange,
    handleClose,
    handleSubmit,
    handleToggleSubcategory,
    handleImageUpload,
    handleImageRemove,
    handleFileSelect,
  } = useCategoryForm(isOpen, category, (categoryData) => onSave(categoryData, pendingImageFile), setIsOpen);

  // Filter out current category from parent options (to prevent self-reference)
  const parentOptions = categories.filter(cat => 
    cat.parent_id === null && (!isEditMode || cat.id !== category?.id)
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Category" : "Add New Category"}</DialogTitle>
          <DialogDescription>
            {isEditMode 
              ? "Update the category details. Click save when you're done."
              : "Create a new product category. Click save when you're done."
            }
          </DialogDescription>
        </DialogHeader>        
        <CategoryForm
          formValues={formValues}
          isEditMode={isEditMode}
          onInputChange={handleInputChange}
          onSwitchChange={handleSwitchChange}
          onToggleSubcategory={handleToggleSubcategory}
          onSubmit={handleSubmit}
          onClose={handleClose}
          parentOptions={parentOptions}
          subcategoryOptions={subcategoryOptions}
          onImageUpload={handleImageUpload}
          onImageRemove={handleImageRemove}
          onFileSelect={handleFileSelect}
        />
      </DialogContent>
    </Dialog>
  );
}