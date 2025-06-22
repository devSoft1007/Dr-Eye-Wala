import { useState, useCallback } from 'react';
import { SupabaseStorageService } from '@/utils/supabase/storage';

interface UseImageUploadProps {
  bucket: string;
  onSuccess?: (publicUrl: string) => void;
  onError?: (error: string) => void;
  compress?: boolean;
  quality?: number;
}

export function useImageUpload({
  bucket,
  onSuccess,
  onError,
  compress = true,
  quality = 0.8
}: UseImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadImage = useCallback(async (file: File, filePath: string) => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Validate file
      const validation = SupabaseStorageService.validateImageFile(file);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      // Compress if needed
      let fileToUpload = file;
      if (compress) {
        fileToUpload = await SupabaseStorageService.compressImage(file, quality);
      }

      setUploadProgress(50);

      // Upload to Supabase
      const { data, error, publicUrl } = await SupabaseStorageService.uploadImage(
        fileToUpload,
        bucket,
        filePath
      );

      if (error) {
        throw new Error(error.message);
      }

      setUploadProgress(100);
      
      if (publicUrl && onSuccess) {
        onSuccess(publicUrl);
      }

      return { success: true, publicUrl };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      if (onError) {
        onError(errorMessage);
      }
      return { success: false, error: errorMessage };
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  }, [bucket, onSuccess, onError, compress, quality]);

  const uploadCategoryImage = useCallback(async (categoryId: string, file: File) => {
    const filePath = SupabaseStorageService.generateCategoryImagePath(categoryId, file.name);
    return await uploadImage(file, filePath);
  }, [uploadImage]);

  const uploadProductImage = useCallback(async (productId: string, file: File, index: number = 0) => {
    const filePath = SupabaseStorageService.generateProductImagePath(productId, file.name, index);
    return await uploadImage(file, filePath);
  }, [uploadImage]);

  return {
    uploadImage,
    uploadCategoryImage,
    uploadProductImage,
    isUploading,
    uploadProgress
  };
}
