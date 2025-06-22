# Image Upload Setup Guide

## Overview
This guide helps you set up the complete image upload system for your Lenskart-type application using Supabase Storage.

## ✅ What's Already Implemented

1. **Supabase Storage Service** (`src/utils/supabase/storage.ts`)
   - Upload, delete, validate, and compress images
   - Generate proper file paths for categories and products
   - Support for multiple image types and buckets

2. **Image Upload Hook** (`src/hooks/useImageUpload.ts`)
   - React hook for handling upload state and progress
   - Error handling and success callbacks
   - Category and product specific upload methods

3. **Category Image Upload Component** (`src/app/admin/categories/dialogs/CategoryImageUpload.tsx`)
   - Drag and drop functionality
   - Upload progress indicator
   - Image preview and removal
   - File validation

4. **Updated CategoryForm and Dialog**
   - Integrated image upload into category management
   - State management for image URLs
   - Proper form handling

5. **Next.js Configuration**
   - Added Supabase storage domain to image optimization

## 🚀 Setup Steps

### 1. Configure Supabase Storage Buckets
Run the SQL script in your Supabase dashboard:
```bash
# Copy the content from scripts/setup-storage.sql
# Go to Supabase Dashboard > SQL Editor > New Query
# Paste and execute the script
```

### 2. Update Environment Variables
Make sure your `.env.local` has Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Test the Application
1. Start your development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

2. Navigate to `/admin/categories`
3. Try adding/editing a category with an image
4. Test drag & drop and click to upload

## 🎯 Key Features

### Image Upload Component Features:
- **Drag & Drop**: Users can drag images directly onto the upload area
- **Click to Upload**: Traditional file picker fallback
- **Progress Tracking**: Real-time upload progress indication
- **Error Handling**: Clear error messages for invalid files or upload failures
- **Image Preview**: Shows uploaded image with remove option
- **File Validation**: 
  - Supports JPEG, PNG, GIF, WebP formats
  - Maximum file size: 2MB
  - Automatic image compression

### Storage Architecture:
- **Backend Storage**: All images stored in Supabase Storage (not frontend)
- **CDN Delivery**: Fast image delivery through Supabase CDN
- **Organized Structure**: 
  ```
  category-images/
    ├── {categoryId}/
    │   └── {timestamp}.{ext}
  product-images/
    ├── {productId}/
    │   ├── 0_{timestamp}.{ext}
    │   └── 1_{timestamp}.{ext}
  ```

### Performance Benefits:
- **SEO Friendly**: Images served from CDN with proper URLs
- **Scalable**: No frontend storage limitations
- **Fast Loading**: Optimized image delivery
- **Backup & Security**: Managed by Supabase

## 🔧 Usage Examples

### Basic Category Image Upload
```tsx
<CategoryImageUpload
  imageUrl={category.image_url}
  isEditMode={true}
  categoryId={category.id}
  onImageUpload={(url) => setImageUrl(url)}
  onImageRemove={() => setImageUrl(undefined)}
/>
```

### Custom Upload Hook Usage
```tsx
const { uploadCategoryImage, isUploading, uploadProgress } = useImageUpload({
  bucket: SupabaseStorageService.BUCKETS.CATEGORIES,
  onSuccess: (url) => console.log('Upload successful:', url),
  onError: (error) => console.error('Upload failed:', error)
});

// Upload image
uploadCategoryImage('category-123', file);
```

### Direct Storage Service Usage
```tsx
// Upload image
const result = await SupabaseStorageService.uploadCategoryImage('cat-123', file);

// Delete image
await SupabaseStorageService.deleteImage('category-images', 'path/to/image.jpg');

// Validate file
const validation = SupabaseStorageService.validateImageFile(file);
if (!validation.isValid) {
  console.error(validation.error);
}
```

## 🛡️ Security & Permissions

The setup includes proper RLS (Row Level Security) policies:
- **Public Read**: Anyone can view images (for public product/category display)
- **Authenticated Upload/Update/Delete**: Only logged-in users can manage images
- **Bucket Isolation**: Different buckets for different image types

## 🎨 Customization Options

### Upload Component Styling
The upload component uses Tailwind classes and can be customized:
- Drag area styling: `border-dashed`, `hover:border-gray-400`
- Progress indicator: Custom progress bar implementation
- Error display: Toast notifications or inline error messages

### Storage Configuration
Modify bucket names and paths in `src/utils/supabase/storage.ts`:
```tsx
static readonly BUCKETS = {
  CATEGORIES: 'your-category-bucket',
  PRODUCTS: 'your-product-bucket',
  // ... add more buckets
} as const;
```

## 🐛 Troubleshooting

### Common Issues:

1. **Upload fails with "Bucket not found"**
   - Ensure you've run the storage setup SQL script
   - Check bucket names match in your code

2. **Images not displaying**
   - Verify Next.js config includes Supabase domain
   - Check image URLs are properly formed

3. **Permission denied errors**
   - Ensure user is authenticated
   - Verify RLS policies are set up correctly

4. **Large file upload issues**
   - Check file size limits (default 2MB)
   - Verify Supabase storage limits

### Debug Mode:
Enable console logging in the storage service for debugging:
```tsx
// Add to storage.ts for debugging
console.log('Uploading to:', bucket, filePath);
console.log('Upload result:', result);
```

## 🚀 Next Steps

1. **Test the complete workflow**
2. **Add image optimization for different sizes**
3. **Implement bulk image upload for products**
4. **Add image editing capabilities**
5. **Set up automated image compression**

## 📱 Mobile Considerations

The upload component is responsive and works on mobile devices:
- Touch-friendly drag & drop
- Mobile-optimized file picker
- Responsive layout for different screen sizes
