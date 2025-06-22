interface Shape {
    shape_id: string;
    shape_name: string;
    description: string;
}

interface Brand {
    brand_id: string;
    brand_name: string;
    description: string;
}

interface Collection {
    collection_id: string;
    collection_name: string;
    description: string;
}

interface ShapesCollectionsBrands {
    shapes?: Shape[];
    brands?: Brand[];
    collections?: Collection[];
}

export interface Category {
    name: string;
    id: string;
    slug: string;
    description: string;
    is_active: boolean;
    image_url: string;
    parent_id: string | null;
    display_order: number;
    subcategory?: Option<Subcategory>[];
}

// 1. describe what a “Subcategory” actually looks like
export interface Subcategory {
    id: number
    name: string
  }
  
  // 2. create a generic option type (or inline it)
export type Option<T> = {
    label: string
    value: T
  }
  