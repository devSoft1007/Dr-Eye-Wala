-- Setup Supabase Storage Buckets for Dr. EyeWala
-- Run this in your Supabase SQL Editor

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('category-images', 'category-images', true),
  ('product-images', 'product-images', true),
  ('brand-images', 'brand-images', true),
  ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Create policies for category-images bucket
CREATE POLICY "Allow public read access on category images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'category-images');

CREATE POLICY "Allow authenticated users to upload category images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'category-images' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update category images" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'category-images' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete category images" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'category-images' AND auth.role() = 'authenticated');

-- Create policies for product-images bucket
CREATE POLICY "Allow public read access on product images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'product-images');

CREATE POLICY "Allow authenticated users to upload product images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update product images" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete product images" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- Create policies for brand-images bucket
CREATE POLICY "Allow public read access on brand images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'brand-images');

CREATE POLICY "Allow authenticated users to upload brand images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'brand-images' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update brand images" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'brand-images' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete brand images" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'brand-images' AND auth.role() = 'authenticated');

-- Create policies for avatars bucket
CREATE POLICY "Allow public read access on avatars" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'avatars');

CREATE POLICY "Allow authenticated users to upload avatars" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update avatars" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'avatars' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete avatars" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'avatars' AND auth.role() = 'authenticated');
