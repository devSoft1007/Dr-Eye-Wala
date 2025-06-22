// CategoryTable.tsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CategoryActions from "./CategoryActions";
import { CategoryTableProps } from "./types";
import CategoryNameCell from "./CategoryNameCell";
import StatusBadge from "./StatusBadge";

export function CategoryTable({
  categories,
  getParentName,
  handleDelete,
  handleEdit,
}: CategoryTableProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Name</TableHead>
            <TableHead>Display Order</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length > 0 ? (
            categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">
                  <CategoryNameCell category={category} />
                </TableCell>
                <TableCell>{category.display_order}</TableCell>
                <TableCell>{category.productCount} products</TableCell>
                <TableCell>
                  {/* <StatusBadge isActive={'category.isActive'} /> */}
                  <StatusBadge isActive={category.is_active} />
                </TableCell>
                <TableCell className="text-right">
                  <CategoryActions
                    category={category}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    // setCurrentCategory={setCurrentCategory}
                    // setIsEditDialogOpen={setIsEditDialogOpen}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                No categories found. Try adjusting your search.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}