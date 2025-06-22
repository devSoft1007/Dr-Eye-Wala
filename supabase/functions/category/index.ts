import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'npm:@supabase/supabase-js@2';

// common CORS headers
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, x-client-info, apikey"
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: CORS
    });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL"), 
    Deno.env.get("SUPABASE_ANON_KEY"), 
    {
      global: {
        headers: {
          Authorization: req.headers.get("Authorization")
        }
      }
    }
  );

  try {
    if (req.method === "POST") {
      // Create new category
      const payload = await req.json();
      // strip subcategory so it never goes into the insert
      const { subcategory, ...payloadToInsert } = payload;
      
      // 1) insert into categories
      const { data: catData, error: catError } = await supabaseClient
        .from("categories")
        .insert(payloadToInsert)
        .select();
        
      if (catError || !catData?.length) {
        return new Response(JSON.stringify({
          error: catError?.message || "Insert failed"
        }), {
          status: 400,
          headers: {
            ...CORS,
            "Content-Type": "application/json"
          }
        });
      }
      
      const newCategory = catData[0];
      
      // 2) insert into category_subcategory
      if (Array.isArray(subcategory) && subcategory.length) {
        const associations = subcategory.map((item) => ({
          category_id: newCategory.id,
          subcategory_id: item.value.id
        }));
        
        const { error: assocError } = await supabaseClient
          .from("category_subcategory")
          .insert(associations);
          
        if (assocError) {
          return new Response(JSON.stringify({
            error: assocError.message
          }), {
            status: 400,
            headers: {
              ...CORS,
              "Content-Type": "application/json"
            }
          });
        }
      }
      
      return new Response(JSON.stringify({
        success: true,
        data: newCategory
      }), {
        status: 201,
        headers: {
          ...CORS,
          "Content-Type": "application/json"
        }
      });
      
    } else if (req.method === "PUT") {
      // Update existing category
      const url = new URL(req.url);
      const pathSegments = url.pathname.split('/');
      const categoryId = pathSegments[pathSegments.length - 1];
      
      if (!categoryId) {
        return new Response(JSON.stringify({
          error: "Category ID is required for update"
        }), {
          status: 400,
          headers: {
            ...CORS,
            "Content-Type": "application/json"
          }
        });
      }
      
      const payload = await req.json();
      const { subcategory, ...updateData } = payload;
      
      // 1) update the category
      const { data: catData, error: catError } = await supabaseClient
        .from("categories")
        .update(updateData)
        .eq('id', categoryId)
        .select();
        
      if (catError || !catData?.length) {
        return new Response(JSON.stringify({
          error: catError?.message || "Update failed"
        }), {
          status: 400,
          headers: {
            ...CORS,
            "Content-Type": "application/json"
          }
        });
      }
      
      const updatedCategory = catData[0];
      
      // 2) handle subcategory associations if provided
      if (Array.isArray(subcategory)) {
        // First, delete existing associations
        const { error: deleteError } = await supabaseClient
          .from("category_subcategory")
          .delete()
          .eq('category_id', categoryId);
          
        if (deleteError) {
          return new Response(JSON.stringify({
            error: deleteError.message
          }), {
            status: 400,
            headers: {
              ...CORS,
              "Content-Type": "application/json"
            }
          });
        }
        
        // Then, insert new associations
        if (subcategory.length > 0) {
          const associations = subcategory.map((item) => ({
            category_id: categoryId,
            subcategory_id: item.value.id
          }));
          
          const { error: assocError } = await supabaseClient
            .from("category_subcategory")
            .insert(associations);
            
          if (assocError) {
            return new Response(JSON.stringify({
              error: assocError.message
            }), {
              status: 400,
              headers: {
                ...CORS,
                "Content-Type": "application/json"
              }
            });
          }
        }
      }
      
      return new Response(JSON.stringify({
        success: true,
        data: updatedCategory
      }), {
        status: 200,
        headers: {
          ...CORS,
          "Content-Type": "application/json"
        }
      });
      
    } else {
      return new Response(JSON.stringify({
        error: "Method not allowed"
      }), {
        status: 405,
        headers: {
          ...CORS,
          "Content-Type": "application/json"
        }
      });
    }
  } catch (err) {
    return new Response(JSON.stringify({
      error: err.message
    }), {
      status: 500,
      headers: {
        ...CORS,
        "Content-Type": "application/json"
      }
    });
  }
});