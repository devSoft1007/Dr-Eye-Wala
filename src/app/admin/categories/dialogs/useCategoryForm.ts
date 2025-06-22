import React, { useEffect } from "react";
import { Category, Option, Subcategory } from "@/types/category";
import { defaultFormValues } from "./categoryConstants";

export function useCategoryForm(
  isOpen: boolean,
  category?: Category | null,
  onSave?: (category: Partial<Category>) => void,
  setIsOpen?: (isOpen: boolean) => void
) {
  const isEditMode = !!category;
  const [formValues, setFormValues] = React.useState(defaultFormValues);
  const [pendingImageFile, setPendingImageFile] = React.useState<File | null>(null);
  // Reset form when dialog opens/closes or category changes
  useEffect(() => {
    if (isOpen) {
      setFormValues({
        ...defaultFormValues,
        ...(category ?? {}),
        // ensure subcategory is always an array
        subcategory: category?.subcategory ?? defaultFormValues.subcategory,
      });
      setPendingImageFile(null); // Reset pending image when dialog opens
    }
  }, [isOpen, category]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    const fieldName = id.replace("category-", "");
    
    // Convert display_order to number
    const fieldValue = fieldName === "display_order" ? parseInt(value, 10) : value;
    
    setFormValues({
      ...formValues,
      [fieldName]: fieldValue,
    });
    
    // Auto-generate slug from name if in add mode and slug is empty
    if (fieldName === "name" && (!isEditMode || !formValues.slug)) {
      setFormValues(prev => ({
        ...prev,
        slug: value.toLowerCase().replace(/\s+/g, "-"),
      }));
    }
  };

  // Handle switch change for active status
  const handleSwitchChange = (checked: boolean) => {
    setFormValues({
      ...formValues,
      is_active: checked,
    });
  };

  // Close dialog and reset form
  const handleClose = () => {
    setIsOpen?.(false);
  };

  // Save category data
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave?.(formValues);
    setIsOpen?.(false);
  };
  // Handle multi‑select of subcategories
  const handleToggleSubcategory = (item: Option<Subcategory>) => {
    setFormValues(prev => {
      const isSelected = prev.subcategory.some(
        sub => sub.value.id === item.value.id
      );

      const newSubs: Option<Subcategory>[] = isSelected
        ? prev.subcategory.filter(sub => sub.value.id !== item.value.id)
        : [...prev.subcategory, item];

      return { ...prev, subcategory: newSubs };
    });
  };

  // Handle image upload
  const handleImageUpload = (imageUrl: string) => {
    setFormValues(prev => ({
      ...prev,
      image_url: imageUrl,
    }));
  };
  // Handle image removal
  const handleImageRemove = () => {
    setFormValues(prev => ({
      ...prev,
      image_url: undefined,
    }));
    setPendingImageFile(null);
  };

  // Handle file selection for new categories
  const handleFileSelect = (file: File) => {
    if (!isEditMode) {
      setPendingImageFile(file);
    }
  };

  return {
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
  };
}
