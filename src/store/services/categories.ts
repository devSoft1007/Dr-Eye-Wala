import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Add your Supabase anon key
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${SUPABASE_URL}/functions/v1`,
    prepareHeaders: (headers) => {
      // Add the required headers for Supabase
      headers.set('apikey', SUPABASE_ANON_KEY as string)
      headers.set('Authorization', `Bearer ${SUPABASE_ANON_KEY}`)
      return headers
    },
   }),
  tagTypes: ['Category'],
  endpoints: (build) => ({
    getAllCategories: build.query({
      query: (name: string) => ({
        url: `/fetch-categories-with-subcategories`,
        method: 'GET',
      }),
      providesTags: ["Category"], // This query provides 'Category' tagged data
    }),

    addCategory: build.mutation({
      query: (newCategory) => ({
        url: '/category',
        method: 'POST',
        body: newCategory,
      }),
      invalidatesTags: ['Category'], // This will trigger a refetch of getAllCategories
    }),
    
    updateCategory: build.mutation({
      query: (updatedCategory) => ({
        url: `/category/${updatedCategory.id}`,
        method: 'PUT',
        body: updatedCategory,
      }),
      invalidatesTags: ['Category'], // This will also trigger a refetch
    }),
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `/delete-category/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'], // This will also trigger a refetch
    }),
  }),
})

// Export hooks for usage in functional components
export const { 
  useGetAllCategoriesQuery, 
  useAddCategoryMutation, 
  useUpdateCategoryMutation,
  useDeleteCategoryMutation 
} = categoryApi