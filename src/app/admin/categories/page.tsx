'use client';
// CategoryManagement.tsx - Updated implementation with common dialog
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, PlusCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { CategoryTable } from "./categoryTable/CategoryTable";
import { CategoryDialog } from "./dialogs/CategoryDialog";
import { uploadPendingCategoryImage } from "./dialogs/CategoryImageUpload";
import { Category } from "@/types/category";
import { useAddCategoryMutation, useGetAllCategoriesQuery, useUpdateCategoryMutation, useDeleteCategoryMutation } from "@/store/services/categories";

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  const { data = [], error: fetchError, isLoading: isFetching } = useGetAllCategoriesQuery('');
  const [addCategory, { isLoading: isAdding, isSuccess, isError, error: addError }] = useAddCategoryMutation();

  useEffect(() => {
    setCategories(data);
  }, [data.length]);

  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();

  // Filter categories based on search term and active status
  const filteredCategories = data.filter(
    (category: Category) =>
      category?.name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!showActiveOnly || category.is_active)
  );
  
  // Get parent category name by ID
  const getParentName = (parentId: string | null) => {
    if (!parentId) return "—";
    const parent = categories.find((cat) => cat.id === parentId);
    return parent ? parent.name : "Unknown";
  };

  // Delete a category
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        // Call the delete mutation
        await deleteCategory(id).unwrap();
      } catch (err) {
        console.error("Failed to delete category:", err);
      }
    }
  };

  // Open dialog to add a new category
  const handleAddNew = () => {
    setCurrentCategory(null); // null means add mode
    setIsDialogOpen(true);
  };

  // Open dialog to edit existing category
  const handleEdit = (category: Category) => {
    setCurrentCategory(category); // existing category means edit mode
    setIsDialogOpen(true);
  };

  // Save category (handles both add and edit)
  const handleSaveCategory = async (categoryData: Partial<Category>, pendingImageFile?: File | null) => {
    console.log('categoryData', categoryData)
    try {
      // fire the RTK Query mutation and unwrap the result
      // const newCategory = await addCategory(categoryData).unwrap();
      
      // // Handle pending image upload for new categories
      // if (pendingImageFile && newCategory.id) {
      //   try {
      //     const uploadResult = await uploadPendingCategoryImage(pendingImageFile, newCategory.id);
          
      //     if (uploadResult.publicUrl) {
      //       // Update the category with the uploaded image URL using RTK Query
      //       await updateCategory({
      //         ...newCategory,
      //         image_url: uploadResult.publicUrl
      //       }).unwrap();
      //     }
      //   } catch (uploadError) {
      //     console.error("Failed to upload image:", uploadError);
      //     // Category was created but image upload failed - could show a warning
      //   }
      // }
      
    } catch (err) {
      console.error("Failed to add category:", err);
    } finally {
      setIsDialogOpen(false);
      setCurrentCategory(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Category Management</h1>
          <p className="text-gray-500 mt-1">
            Manage product categories and subcategories
          </p>
        </div>
        <Button 
          onClick={handleAddNew}
          className="flex items-center gap-2"
        >
          <PlusCircle size={18} />
          Add Category
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Categories</CardTitle>
          <CardDescription>
            You have {filteredCategories.length} categories in total.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filter Bar */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search categories..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox 
                id="active-only" 
                checked={showActiveOnly}
                onCheckedChange={(checked) => 
                  setShowActiveOnly(checked === true)
                }
              />
              <label 
                htmlFor="active-only" 
                className="text-sm text-gray-700 cursor-pointer"
              >
                Active only
              </label>
            </div>
          </div>

          <CategoryTable
            categories={filteredCategories}
            getParentName={getParentName}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            setCurrentCategory={setCurrentCategory}
            setIsEditDialogOpen={setIsDialogOpen}
            />
        </CardContent>
        <CardFooter className="flex justify-between border-t p-4">
          <div className="text-sm text-gray-500">
            Showing {filteredCategories.length} of {categories.length} categories
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Common Dialog for both Add and Edit */}
      <CategoryDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        category={currentCategory}
        categories={categories}
        onSave={handleSaveCategory}
      />
    </div>
  );
}