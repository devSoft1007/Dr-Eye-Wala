import React, { useRef, useState } from "react";
import { Image, Upload, X, Loader2 } from "lucide-react";
import { useImageUpload } from "@/hooks/useImageUpload";
import { SupabaseStorageService } from "@/utils/supabase/storage";
import { Button } from "@/components/ui/button";

interface CategoryImageUploadProps {
  imageUrl?: string;
  isEditMode: boolean;
  categoryId?: string;
  onImageUpload?: (imageUrl: string) => void;
  onImageRemove?: () => void;
  onFileSelect?: (file: File) => void;
}

export function CategoryImageUpload({ 
  imageUrl, 
  isEditMode, 
  categoryId,
  onImageUpload,
  onImageRemove,
  onFileSelect 
}: CategoryImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { uploadCategoryImage, isUploading, uploadProgress } = useImageUpload({
    bucket: SupabaseStorageService.BUCKETS.CATEGORIES,
    onSuccess: (publicUrl) => {
      setUploadError(null);
      onImageUpload?.(publicUrl);
    },
    onError: (error) => {
      setUploadError(error);
    }
  });

  const handleFileSelect = (file: File) => {
    // For edit mode, upload immediately if we have a valid categoryId
    if (isEditMode && categoryId && categoryId !== 'new') {
      uploadCategoryImage(categoryId, file);
    } else {
      // For new categories, store file locally and show preview
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onFileSelect?.(file);
      setUploadError(null);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    onImageRemove?.();
  };

  // Clean up preview URL on unmount
  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);
  // Get display image URL - priority: imageUrl > previewUrl
  const displayImageUrl = imageUrl || previewUrl;


  return (
    <div className="space-y-3">
      <div 
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all
          ${dragOver ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-gray-400'}
          ${isUploading ? 'pointer-events-none' : ''}
        `}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />

        {isUploading ? (
          <div className="space-y-3">
            <Loader2 className="mx-auto h-10 w-10 text-primary animate-spin" />
            <div className="text-sm text-gray-600">
              Uploading... {uploadProgress}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>        ) : displayImageUrl ? (
          <div className="relative">
            <img
              src={displayImageUrl}
              alt="Category thumbnail"
              className="mx-auto h-24 w-24 object-cover rounded-lg"
            />
            <Button
              variant="destructive"
              size="sm"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
              onClick={handleRemoveImage}
            >
              <X className="h-3 w-3" />
            </Button>
            <div className="mt-2 text-sm text-gray-500">
              <span className="font-medium text-primary">
                Click to replace image
              </span>
              {!isEditMode && selectedFile && (
                <div className="text-xs text-blue-600 mt-1">
                  Preview - Image will upload after saving category
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {dragOver ? (
              <Upload className="mx-auto h-10 w-10 text-primary" />
            ) : (
              <Image className="mx-auto h-10 w-10 text-gray-400" />
            )}
            <div className="text-sm text-gray-500">
              <span className="font-medium text-primary">
                Click to upload
              </span>
              {" or drag and drop"}
            </div>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF up to 2MB
            </p>
          </div>
        )}
      </div>

      {uploadError && (
        <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
          {uploadError}
        </div>      )}
    </div>
  );
}

// Export a utility function to upload pending images
export const uploadPendingCategoryImage = async (file: File, categoryId: string) => {
  return await SupabaseStorageService.uploadCategoryImage(categoryId, file);
};
