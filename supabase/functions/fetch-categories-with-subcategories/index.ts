import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "@supabase/supabase-js";
Deno.serve(async (req)=>{
  // CORS headers
  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", "*"); // Or use your frontend URL like "https://yourfrontend.com"
  headers.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, x-client-info, apikey");
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers
    });
  }
  try {
    const supabaseClient = createClient(Deno.env.get('SUPABASE_URL'), Deno.env.get('SUPABASE_ANON_KEY'));
    // Fetch categories with their associated subcategories
    const { data: categoryJunctions, error: categoriesError } = await supabaseClient.from('category_subcategory').select(`
        category_id,
        categories:category_id(id, name, display_order, image_url, is_active),
        subcategories:subcategory_id(id, name)
      `);
    if (categoriesError) {
      console.error('Error fetching categories:', categoriesError);
      return new Response(JSON.stringify({
        error: 'Failed to fetch categories'
      }), {
        status: 500,
        headers
      });
    }
    // Get all unique category IDs
    const categoryIds = [
      ...new Set(categoryJunctions.filter((junction)=>junction.categories).map((junction)=>junction.categories.id))
    ];
    // Fetch product counts by category using raw SQL query
    const { data: productCounts, error: productCountsError } = await supabaseClient.rpc('get_product_counts_by_category', {
      category_ids: categoryIds
    });
    if (productCountsError) {
      console.error('Error fetching product counts:', productCountsError);
      return new Response(JSON.stringify({
        error: 'Failed to fetch product counts: ' + productCountsError.message
      }), {
        status: 500,
        headers
      });
    }
    // Convert product counts to a map for easier lookup
    const productCountsMap = {};
    if (productCounts) {
      productCounts.forEach((item)=>{
        productCountsMap[item.category_id] = parseInt(item.count);
      });
    }
    // Extract all subcategory IDs to fetch related data in a single query
    const subcategoryIds = categoryJunctions.filter((junction)=>junction.subcategories).map((junction)=>junction.subcategories.id);
    // If no valid subcategories were found, return empty categories
    if (subcategoryIds.length === 0) {
      const emptyCategories = categoryJunctions.filter((junction)=>junction.categories).reduce((acc, junction)=>{
        const categoryId = junction.categories.id;
        if (!acc[categoryId]) {
          acc[categoryId] = {
            id: categoryId,
            name: junction.categories.name,
            display_order: junction.categories.display_order,
            image_url: junction.categories.image_url || "",
            productCount: productCountsMap[categoryId] || 0,
            subcategories: []
          };
        }
        return acc;
      }, {});
      return new Response(JSON.stringify(Object.values(emptyCategories)), {
        status: 200,
        headers
      });
    }
    // Fetch all shapes/collections/brands for all subcategories in a single query
    const { data: allShapesCollectionsBrands, error: scbError } = await supabaseClient.from('shapes_collections_brands').select(`
        subcategory_id,
        shape_id,
        shapes:shape_id(id, name, description),
        collection_id,
        collections:collection_id(id, name, description),
        brand_id,
        brands:brand_id(id, name, description)
      `).in('subcategory_id', subcategoryIds);
    if (scbError) {
      console.error('Error fetching shapes/collections/brands:', scbError);
      return new Response(JSON.stringify({
        error: 'Failed to fetch shapes/collections/brands'
      }), {
        status: 500,
        headers
      });
    }
    // Group shapes/collections/brands by subcategory_id for easier lookup
    const scbBySubcategoryId = {};
    if (allShapesCollectionsBrands) {
      allShapesCollectionsBrands.forEach((item)=>{
        if (!scbBySubcategoryId[item.subcategory_id]) {
          scbBySubcategoryId[item.subcategory_id] = {
            shapes: [],
            collections: [],
            brands: []
          };
        }
        const group = scbBySubcategoryId[item.subcategory_id];
        if (item.shapes && !group.shapes.some((s)=>s.id === item.shapes.id)) {
          group.shapes.push({
            id: item.shapes.id,
            name: item.shapes.name,
            description: item.shapes.description || ""
          });
        }
        if (item.collections && !group.collections.some((c)=>c.id === item.collections.id)) {
          group.collections.push({
            id: item.collections.id,
            name: item.collections.name,
            description: item.collections.description || ""
          });
        }
        if (item.brands && !group.brands.some((b)=>b.id === item.brands.id)) {
          group.brands.push({
            id: item.brands.id,
            name: item.brands.name,
            description: item.brands.description || ""
          });
        }
      });
    }
    // Create a map to hold categories
    const categoriesMap = {};
    // Process each junction to build the final data structure
    for (const junction of categoryJunctions){
      const categoryId = junction.category_id;
      // Skip if categories or subcategories are null
      if (!junction.categories || !junction.subcategories) {
        console.log('Found null reference:', junction);
        continue;
      }
      // Initialize category if it doesn't exist in map
      if (!categoriesMap[categoryId]) {
        categoriesMap[categoryId] = {
          id: junction.categories.id,
          name: junction.categories.name,
          display_order: junction.categories.display_order,
          image_url: junction.categories.image_url || "",
          productCount: productCountsMap[categoryId] || 0,
          is_active: junction.categories.is_active,
          subcategories: []
        };
      }
      // Check if this subcategory is already added
      const subcategoryExists = categoriesMap[categoryId].subcategories.some((sub)=>sub.id === junction.subcategories.id);
      if (!subcategoryExists) {
        const subcategoryId = junction.subcategories.id;
        const relatedData = scbBySubcategoryId[subcategoryId] || {
          shapes: [],
          collections: [],
          brands: []
        };
        // Add subcategory with its related data in a cleaner format
        categoriesMap[categoryId].subcategories.push({
          id: subcategoryId,
          name: junction.subcategories.name,
          shapes: relatedData.shapes || [],
          collections: relatedData.collections || [],
          brands: relatedData.brands || []
        });
      }
    }
    // Convert the map to array for the response
    const responseData = Object.values(categoriesMap);
    // Return the processed data
    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 400,
      headers
    });
  }
});
