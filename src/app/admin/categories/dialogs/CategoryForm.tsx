import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Category, Option, Subcategory } from "@/types/category";
import { CategoryFormField } from "./CategoryFormField";
import { SubcategorySelector } from "./SubcategorySelector";
import { ParentCategorySelector } from "./ParentCategorySelector";
import { CategoryStatusField } from "./CategoryStatusField";
import { CategoryImageUpload } from "./CategoryImageUpload";

interface CategoryFormProps {
  formValues: Partial<Category> & { subcategory: Option<Subcategory>[] };
  isEditMode: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSwitchChange: (checked: boolean) => void;
  onToggleSubcategory: (item: Option<Subcategory>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  parentOptions: Category[];
  subcategoryOptions: Option<Subcategory>[];
  onImageUpload?: (imageUrl: string) => void;
  onImageRemove?: () => void;
  onFileSelect?: (file: File) => void;
}

export function CategoryForm({
  formValues,
  isEditMode,
  onInputChange,
  onSwitchChange,
  onToggleSubcategory,
  onSubmit,
  onClose,
  parentOptions,
  subcategoryOptions,
  onImageUpload,
  onImageRemove,
  onFileSelect,
}: CategoryFormProps) {
    console.log("CategoryForm rendered with values:", formValues);
  return (
    <form onSubmit={onSubmit} className="grid grid-cols-2 gap-6">
      <CategoryFormField label="Name" htmlFor="category-name">
        <Input
          id="category-name"
          placeholder="Category name"
          value={formValues.name || ""}
          onChange={onInputChange}
          required
        />
      </CategoryFormField>

      <CategoryFormField label="Slug" htmlFor="category-slug">
        <Input
          id="category-slug"
          placeholder="category-slug"
          value={formValues.slug || ""}
          onChange={onInputChange}
          required
        />
      </CategoryFormField>

      <CategoryFormField label="Subcategories">
        <SubcategorySelector
          selectedSubcategories={formValues.subcategory}
          onToggleSubcategory={onToggleSubcategory}
          subcategoryOptions={subcategoryOptions}
        />
      </CategoryFormField>

      <CategoryFormField label="Description" htmlFor="category-description">
        <Textarea
          id="category-description"
          placeholder="Category description"
          rows={3}
          value={formValues.description || ""}
          onChange={onInputChange}
        />
      </CategoryFormField>      
      <CategoryFormField label="Parent" htmlFor="category-parentId">
        <ParentCategorySelector
          value={formValues.parent_id || null}
          onChange={onInputChange}
          parentOptions={parentOptions}
          id="category-parentId"
        />
      </CategoryFormField>

      <CategoryFormField label="Display Order" htmlFor="category-display_order">
        <select
          id="category-display_order"
          className="rounded-md border px-3 py-2"
          value={formValues.display_order || 1}
          onChange={onInputChange}
        >
          {[1, 2, 3, 4, 5, 6].map((order) => (
            <option key={order} value={order}>
              {order}
            </option>
          ))}
        </select>
      </CategoryFormField>

      <CategoryFormField label="Status" htmlFor="category-active-status">
        <CategoryStatusField
          isActive={!!formValues.is_active}
          onStatusChange={onSwitchChange}
          id="category-active-status"
        />
      </CategoryFormField>        
      <CategoryFormField label="Image">
        <CategoryImageUpload
          imageUrl={formValues.image_url}
          isEditMode={isEditMode}
          categoryId={formValues.id?.toString() || 'new'}
          onImageUpload={onImageUpload}
          onImageRemove={onImageRemove}
          onFileSelect={onFileSelect}
        />
      </CategoryFormField>

      <DialogFooter className="col-span-2 flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit">
          {isEditMode ? "Save Changes" : "Save Category"}
        </Button>
      </DialogFooter>
    </form>
  );
}
