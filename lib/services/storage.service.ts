import { createServerServiceClient } from '../supabase-server';
import mimeTypes from 'mime-types';

export interface FileUploadOptions {
  bucket: string;
  path: string;
  file: File | Buffer;
  contentType?: string;
  cacheControl?: string;
  upsert?: boolean;
}

export interface FileUploadResult {
  success: boolean;
  path?: string;
  url?: string;
  error?: string;
  size?: number;
  contentType?: string;
}

export interface SignedUrlOptions {
  expiresIn?: number; // seconds
  download?: boolean;
  transform?: {
    width?: number;
    height?: number;
    resize?: 'cover' | 'contain' | 'fill';
    format?: 'webp' | 'png' | 'jpg';
    quality?: number;
  };
}

class StorageService {
  private supabase = createServerServiceClient();
  private defaultBucket = 'attachments';
  private maxFileSize = 10 * 1024 * 1024; // 10MB
  private allowedFileTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'video/mp4',
    'video/quicktime',
    'video/x-msvideo',
    'application/pdf',
    'text/plain',
  ];

  constructor() {
    this.initializeBuckets();
  }

  private async initializeBuckets(): Promise<void> {
    try {
      // Check if the default bucket exists, create if it doesn't
      const { data: buckets } = await this.supabase.storage.listBuckets();

      const bucketExists = buckets?.some((bucket) => bucket.name === this.defaultBucket);

      if (!bucketExists) {
        const { error } = await this.supabase.storage.createBucket(this.defaultBucket, {
          public: false,
          allowedMimeTypes: this.allowedFileTypes,
          fileSizeLimit: this.maxFileSize,
        });

        if (error) {
          console.error('Failed to create storage bucket:', error);
        } else {
          console.log(`Storage bucket '${this.defaultBucket}' created successfully`);
        }
      }
    } catch (error) {
      console.error('Error initializing storage buckets:', error);
    }
  }

  private validateFile(
    file: File | Buffer,
    contentType?: string
  ): { valid: boolean; error?: string } {
    let fileSize: number;
    let fileType: string;

    if (file instanceof File) {
      fileSize = file.size;
      fileType = file.type;
    } else {
      fileSize = file.length;
      fileType = contentType || 'application/octet-stream';
    }

    // Check file size
    if (fileSize > this.maxFileSize) {
      return {
        valid: false,
        error: `File size (${Math.round(fileSize / 1024 / 1024)}MB) exceeds maximum allowed size (${Math.round(this.maxFileSize / 1024 / 1024)}MB)`,
      };
    }

    // Check file type
    if (!this.allowedFileTypes.includes(fileType)) {
      return {
        valid: false,
        error: `File type '${fileType}' is not allowed. Allowed types: ${this.allowedFileTypes.join(', ')}`,
      };
    }

    return { valid: true };
  }

  private generateFilePath(originalName: string, leadId?: number, jobId?: number): string {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const extension = originalName.split('.').pop() || '';

    let basePath = 'uploads';

    if (leadId) {
      basePath = `leads/${leadId}`;
    } else if (jobId) {
      basePath = `jobs/${jobId}`;
    }

    return `${basePath}/${timestamp}_${randomString}.${extension}`;
  }

  async uploadFile(options: FileUploadOptions): Promise<FileUploadResult> {
    try {
      const { bucket, path, file, contentType, cacheControl, upsert } = options;

      // Validate file
      const validation = this.validateFile(file, contentType);
      if (!validation.valid) {
        return {
          success: false,
          error: validation.error,
        };
      }

      // Determine content type
      let finalContentType = contentType;
      if (!finalContentType) {
        if (file instanceof File) {
          finalContentType = file.type;
        } else {
          finalContentType = mimeTypes.lookup(path) || 'application/octet-stream';
        }
      }

      // Convert File to ArrayBuffer if needed
      let fileBuffer: ArrayBuffer;
      if (file instanceof File) {
        fileBuffer = await file.arrayBuffer();
      } else {
        fileBuffer = file.buffer.slice(
          file.byteOffset,
          file.byteOffset + file.byteLength
        ) as ArrayBuffer;
      }

      // Upload to Supabase Storage
      const { data, error } = await this.supabase.storage.from(bucket).upload(path, fileBuffer, {
        contentType: finalContentType,
        cacheControl: cacheControl || '3600',
        upsert: upsert || false,
      });

      if (error) {
        console.error('Storage upload error:', error);
        return {
          success: false,
          error: error.message,
        };
      }

      // Get public URL
      const { data: urlData } = this.supabase.storage.from(bucket).getPublicUrl(path);

      return {
        success: true,
        path: data.path,
        url: urlData.publicUrl,
        size: file instanceof File ? file.size : file.length,
        contentType: finalContentType,
      };
    } catch (error: any) {
      console.error('File upload error:', error);
      return {
        success: false,
        error: error.message || 'Unknown upload error',
      };
    }
  }

  async uploadLeadAttachment(
    file: File,
    leadId: number,
    fileName?: string
  ): Promise<FileUploadResult> {
    const filePath = this.generateFilePath(fileName || file.name, leadId);

    return this.uploadFile({
      bucket: this.defaultBucket,
      path: filePath,
      file,
      contentType: file.type,
    });
  }

  async uploadJobAttachment(
    file: File,
    jobId: number,
    fileName?: string
  ): Promise<FileUploadResult> {
    const filePath = this.generateFilePath(fileName || file.name, undefined, jobId);

    return this.uploadFile({
      bucket: this.defaultBucket,
      path: filePath,
      file,
      contentType: file.type,
    });
  }

  async uploadBuffer(
    buffer: Buffer,
    fileName: string,
    contentType: string,
    leadId?: number,
    jobId?: number
  ): Promise<FileUploadResult> {
    const filePath = this.generateFilePath(fileName, leadId, jobId);

    return this.uploadFile({
      bucket: this.defaultBucket,
      path: filePath,
      file: buffer,
      contentType,
    });
  }

  async getSignedUrl(
    bucket: string,
    path: string,
    options: SignedUrlOptions = {}
  ): Promise<{ url?: string; error?: string }> {
    try {
      const { expiresIn = 3600, download = false, transform } = options;

      let signedUrlOptions: any = { expiresIn };

      if (download) {
        signedUrlOptions.download = true;
      }

      if (transform) {
        signedUrlOptions.transform = transform;
      }

      const { data, error } = await this.supabase.storage
        .from(bucket)
        .createSignedUrl(path, expiresIn, signedUrlOptions);

      if (error) {
        return { error: error.message };
      }

      return { url: data.signedUrl };
    } catch (error: any) {
      return { error: error.message || 'Failed to generate signed URL' };
    }
  }

  async deleteFile(bucket: string, path: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await this.supabase.storage.from(bucket).remove([path]);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to delete file' };
    }
  }

  async listFiles(
    bucket: string,
    path?: string,
    options: {
      limit?: number;
      offset?: number;
      sortBy?: { column: string; order: 'asc' | 'desc' };
    } = {}
  ): Promise<{ files?: any[]; error?: string }> {
    try {
      const { limit = 100, offset = 0, sortBy } = options;

      const { data, error } = await this.supabase.storage.from(bucket).list(path, {
        limit,
        offset,
        sortBy,
      });

      if (error) {
        return { error: error.message };
      }

      return { files: data };
    } catch (error: any) {
      return { error: error.message || 'Failed to list files' };
    }
  }

  async getFileInfo(bucket: string, path: string): Promise<{ info?: any; error?: string }> {
    try {
      const { data, error } = await this.supabase.storage
        .from(bucket)
        .list(path.split('/').slice(0, -1).join('/'), {
          search: path.split('/').pop(),
        });

      if (error) {
        return { error: error.message };
      }

      const fileInfo = data.find((file) => file.name === path.split('/').pop());

      if (!fileInfo) {
        return { error: 'File not found' };
      }

      return { info: fileInfo };
    } catch (error: any) {
      return { error: error.message || 'Failed to get file info' };
    }
  }

  // Helper method to check if file type is image
  isImageFile(contentType: string): boolean {
    return contentType.startsWith('image/');
  }

  // Helper method to check if file type is video
  isVideoFile(contentType: string): boolean {
    return contentType.startsWith('video/');
  }

  // Helper method to format file size
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Get storage stats
  async getStorageStats(): Promise<{
    totalFiles?: number;
    totalSize?: number;
    buckets?: string[];
    error?: string;
  }> {
    try {
      const { data: buckets, error: bucketsError } = await this.supabase.storage.listBuckets();

      if (bucketsError) {
        return { error: bucketsError.message };
      }

      const bucketNames = buckets.map((bucket) => bucket.name);
      let totalFiles = 0;
      let totalSize = 0;

      for (const bucketName of bucketNames) {
        const { files, error } = await this.listFiles(bucketName);
        if (!error && files) {
          totalFiles += files.length;
          totalSize += files.reduce((sum, file) => sum + (file.metadata?.size || 0), 0);
        }
      }

      return {
        totalFiles,
        totalSize,
        buckets: bucketNames,
      };
    } catch (error: any) {
      return { error: error.message || 'Failed to get storage stats' };
    }
  }
}

// Export singleton instance
export const storageService = new StorageService();
export default storageService;
