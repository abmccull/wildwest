import { NextRequest, NextResponse } from 'next/server';
import {
  withApiMiddleware,
  successResponse,
  ValidationError,
  getClientIP,
  getUserAgent,
} from '@/lib/api-middleware';
import { storageService, analyticsService } from '@/lib/services';

export const POST = withApiMiddleware(
  async (req: NextRequest) => {
    try {
      // Parse multipart form data
      const formData = await req.formData();

      // Get form fields
      const file = formData.get('file') as File;
      const leadId = formData.get('leadId') as string;
      const jobId = formData.get('jobId') as string;

      if (!file) {
        throw new ValidationError('No file provided');
      }

      // Validate file is actually a File object
      if (!(file instanceof File)) {
        throw new ValidationError('Invalid file format');
      }

      // Get client information for tracking
      const ip = getClientIP(req);
      const userAgent = getUserAgent(req);

      let uploadResult;

      // Upload based on context
      if (leadId) {
        const leadIdNum = parseInt(leadId);
        if (isNaN(leadIdNum)) {
          throw new ValidationError('Invalid lead ID');
        }
        uploadResult = await storageService.uploadLeadAttachment(file, leadIdNum);
      } else if (jobId) {
        const jobIdNum = parseInt(jobId);
        if (isNaN(jobIdNum)) {
          throw new ValidationError('Invalid job ID');
        }
        uploadResult = await storageService.uploadJobAttachment(file, jobIdNum);
      } else {
        // Generic upload without association
        uploadResult = await storageService.uploadFile({
          bucket: 'attachments',
          path: `uploads/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${file.name.split('.').pop()}`,
          file,
          contentType: file.type,
        });
      }

      if (!uploadResult.success) {
        throw new ValidationError(uploadResult.error || 'File upload failed');
      }

      // Track upload analytics
      const promises = [];

      promises.push(
        analyticsService
          .trackFileUpload(file.type, file.size, true, req.headers.get('x-client-id') || undefined)
          .catch((error) => {
            console.error('File upload analytics tracking failed:', error);
          })
      );

      // Track custom upload event
      promises.push(
        analyticsService
          .trackCustomEvent(
            'file_uploaded',
            {
              event_category: 'file',
              event_label: file.type,
              file_name: file.name,
              file_size: file.size,
              file_type: file.type,
              upload_context: leadId ? 'lead' : jobId ? 'job' : 'general',
              lead_id: leadId || undefined,
              job_id: jobId || undefined,
            },
            req.headers.get('x-client-id') || undefined
          )
          .catch((error) => {
            console.error('File upload event tracking failed:', error);
          })
      );

      // Execute analytics without waiting
      Promise.allSettled(promises);

      // Log successful upload
      console.log('File uploaded successfully:', {
        fileName: file.name,
        fileSize: storageService.formatFileSize(file.size),
        fileType: file.type,
        leadId: leadId || null,
        jobId: jobId || null,
        url: uploadResult.url,
        ip,
      });

      // Generate signed URL for immediate access (valid for 1 hour)
      let signedUrl = uploadResult.url;
      if (uploadResult.path) {
        const signedUrlResult = await storageService.getSignedUrl(
          'attachments',
          uploadResult.path,
          { expiresIn: 3600 } // 1 hour
        );

        if (signedUrlResult.url) {
          signedUrl = signedUrlResult.url;
        }
      }

      const responseData = {
        message: 'File uploaded successfully',
        file: {
          name: file.name,
          size: file.size,
          type: file.type,
          url: uploadResult.url,
          signedUrl: signedUrl,
          path: uploadResult.path,
        },
        uploadContext: {
          leadId: leadId || null,
          jobId: jobId || null,
        },
        metadata: {
          isImage: storageService.isImageFile(file.type),
          isVideo: storageService.isVideoFile(file.type),
          formattedSize: storageService.formatFileSize(file.size),
        },
      };

      return NextResponse.json(successResponse(responseData), { status: 201 });
    } catch (error: any) {
      console.error('File upload error:', error);

      // Track failed upload analytics
      if (error instanceof ValidationError) {
        analyticsService
          .trackCustomEvent(
            'file_upload_error',
            {
              event_category: 'file',
              event_label: 'validation_error',
              error_message: error.message,
            },
            req.headers.get('x-client-id') || undefined
          )
          .catch(console.error);
      } else {
        analyticsService
          .trackApiError(
            '/api/uploads',
            error.constructor.name,
            error.message,
            req.headers.get('x-client-id') || undefined
          )
          .catch(console.error);
      }

      // Re-throw to be handled by middleware
      throw error;
    }
  },
  { methods: ['POST'] }
);

// GET endpoint to retrieve file information or generate signed URLs
export const GET = withApiMiddleware(
  async (req: NextRequest) => {
    try {
      const { searchParams } = new URL(req.url);
      const path = searchParams.get('path');
      const bucket = searchParams.get('bucket') || 'attachments';
      const download = searchParams.get('download') === 'true';
      const expiresIn = parseInt(searchParams.get('expiresIn') || '3600'); // Default 1 hour

      if (!path) {
        throw new ValidationError('File path is required');
      }

      // Get file info
      const fileInfo = await storageService.getFileInfo(bucket, path);

      if (fileInfo.error) {
        throw new ValidationError(fileInfo.error);
      }

      // Generate signed URL
      const signedUrlResult = await storageService.getSignedUrl(bucket, path, {
        expiresIn,
        download,
      });

      if (signedUrlResult.error) {
        throw new ValidationError(signedUrlResult.error);
      }

      const responseData = {
        message: 'File information retrieved successfully',
        file: {
          path,
          bucket,
          info: fileInfo.info,
          signedUrl: signedUrlResult.url,
          expiresIn,
          download,
        },
      };

      return NextResponse.json(successResponse(responseData), { status: 200 });
    } catch (error: any) {
      console.error('File info retrieval error:', error);
      throw error;
    }
  },
  { methods: ['GET'] }
);

// DELETE endpoint to remove files
export const DELETE = withApiMiddleware(
  async (req: NextRequest) => {
    try {
      const { searchParams } = new URL(req.url);
      const path = searchParams.get('path');
      const bucket = searchParams.get('bucket') || 'attachments';

      if (!path) {
        throw new ValidationError('File path is required');
      }

      // Delete file from storage
      const deleteResult = await storageService.deleteFile(bucket, path);

      if (!deleteResult.success) {
        throw new ValidationError(deleteResult.error || 'Failed to delete file');
      }

      // Track deletion analytics
      analyticsService
        .trackCustomEvent(
          'file_deleted',
          {
            event_category: 'file',
            event_label: 'file_deletion',
            file_path: path,
            bucket,
          },
          req.headers.get('x-client-id') || undefined
        )
        .catch(console.error);

      const responseData = {
        message: 'File deleted successfully',
        file: {
          path,
          bucket,
        },
      };

      return NextResponse.json(successResponse(responseData), { status: 200 });
    } catch (error: any) {
      console.error('File deletion error:', error);
      throw error;
    }
  },
  { methods: ['DELETE'] }
);

// Handle preflight requests
export const OPTIONS = withApiMiddleware(
  async (req: NextRequest) => {
    return NextResponse.json(successResponse({ message: 'OK' }), { status: 200 });
  },
  { methods: ['OPTIONS'], skipRateLimit: true }
);
