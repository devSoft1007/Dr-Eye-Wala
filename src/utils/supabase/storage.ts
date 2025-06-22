import { createClient } from './client';

export class SupabaseStorageService {
  private static supabase = createClient();
  
  // Storage bucket names
  static readonly BUCKETS = {
    CATEGORIES: 'category-images',
    PRODUCTS: 'product-images',
    BRANDS: 'brand-images',
    AVATARS: 'avatars'
  } as const;

  /**
   * Upload image to Supabase storage
   */
  static async uploadImage(
    file: File,
    bucket: string,
    filePath: string,
    options?: {
      cacheControl?: string;
      upsert?: boolean;
    }
  ): Promise<{ data: any; error: any; publicUrl?: string }> {
    try {
      // Upload file
      const { data, error } = await this.supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: options?.cacheControl || '3600',
          upsert: options?.upsert || true,
        });

      if (error) {
        return { data: null, error };
      }

      // Get public URL
      const { data: { publicUrl } } = this.supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      return { data, error: null, publicUrl };
    } catch (err) {
      return { data: null, error: err };
    }
  }

  /**
   * Delete image from storage
   */
  static async deleteImage(bucket: string, filePath: string) {
    return await this.supabase.storage
      .from(bucket)
      .remove([filePath]);
  }

  /**
   * Get public URL for an image
   */
  static getPublicUrl(bucket: string, filePath: string): string {
    const { data } = this.supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);
    
    return data.publicUrl;
  }

  /**
   * Generate unique file path for category images
   */
  static generateCategoryImagePath(categoryId: string, fileName: string): string {
    const timestamp = Date.now();
    const fileExtension = fileName.split('.').pop();
    return `categories/${categoryId}/${timestamp}.${fileExtension}`;
  }

  /**
   * Generate unique file path for product images
   */
  static generateProductImagePath(productId: string, fileName: string, index: number = 0): string {
    const timestamp = Date.now();
    const fileExtension = fileName.split('.').pop();
    return `products/${productId}/${index}_${timestamp}.${fileExtension}`;
  }

  /**
   * Upload category image with proper path generation
   */
  static async uploadCategoryImage(categoryId: string, file: File) {
    const filePath = this.generateCategoryImagePath(categoryId, file.name);
    return await this.uploadImage(file, this.BUCKETS.CATEGORIES, filePath);
  }

  /**
   * Upload product image with proper path generation
   */
  static async uploadProductImage(productId: string, file: File, index: number = 0) {
    const filePath = this.generateProductImagePath(productId, file.name, index);
    return await this.uploadImage(file, this.BUCKETS.PRODUCTS, filePath);
  }

  /**
   * Upload multiple product images
   */
  static async uploadProductImages(productId: string, files: File[]): Promise<string[]> {
    const uploadPromises = files.map((file, index) =>
      this.uploadProductImage(productId, file, index)
    );

    const results = await Promise.all(uploadPromises);
    return results
      .filter(result => !result.error && result.publicUrl)
      .map(result => result.publicUrl!);
  }

  /**
   * Validate image file
   */
  static validateImageFile(file: File): { isValid: boolean; error?: string } {
    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return { isValid: false, error: 'Please upload a valid image file (JPEG, PNG, GIF, or WebP)' };
    }

    // Check file size (2MB limit)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      return { isValid: false, error: 'Image size must be less than 2MB' };
    }

    return { isValid: true };
  }

  /**
   * Compress image before upload (optional)
   */
  static async compressImage(file: File, quality: number = 0.8): Promise<File> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions (max 800px width)
        const maxWidth = 800;
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;

        // Draw and compress
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => {
            const compressedFile = new File([blob!], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          file.type,
          quality
        );
      };

      img.src = URL.createObjectURL(file);
    });
  }
}
