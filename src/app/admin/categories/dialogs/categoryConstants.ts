import { ImageUrls } from "@/enums/enums";
import { Category, Option, Subcategory } from "@/types/category";

export const subcategoryOptions: Option<Subcategory>[] = [
  { label: "Men", value: { id: 1, name: 'men' } },
  { label: "Women", value: { id: 2, name: 'women' } },
  { label: "Kids", value: { id: 3, name: 'kids' } },
];

export const defaultFormValues: Partial<Category> & { subcategory: Option<Subcategory>[] } = {
  name: "",
  slug: "",
  description: "",
  parent_id: null,
  is_active: true,
  display_order: 1,
  image_url: `/${ImageUrls.CategoryImages}/placeholder.jpg`,
  subcategory: [],
};
