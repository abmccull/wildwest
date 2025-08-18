'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { validateFile, getFileSizeDisplay, ALLOWED_FILE_TYPES } from '@/lib/form-utils';

export interface FileWithPreview extends File {
  preview?: string;
}

export interface FileUploadProps {
  onFilesChange: (files: FileWithPreview[]) => void;
  files: FileWithPreview[];
  error?: string;
  maxFiles?: number;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFilesChange,
  files,
  error,
  maxFiles = 5,
}) => {
  const [uploadError, setUploadError] = useState<string>('');

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setUploadError('');

      // Handle rejected files
      if (rejectedFiles.length > 0) {
        setUploadError('Some files were rejected. Please check file types and sizes.');
        return;
      }

      // Validate files and create previews
      const validFiles: FileWithPreview[] = [];

      for (const file of acceptedFiles) {
        const validation = validateFile(file);

        if (!validation.isValid) {
          setUploadError(validation.error || 'File validation failed');
          return;
        }

        // Create preview for images
        const fileWithPreview = file as FileWithPreview;
        if (file.type.startsWith('image/')) {
          fileWithPreview.preview = URL.createObjectURL(file);
        }

        validFiles.push(fileWithPreview);
      }

      // Check total file count
      if (files.length + validFiles.length > maxFiles) {
        setUploadError(`Maximum ${maxFiles} files allowed`);
        return;
      }

      onFilesChange([...files, ...validFiles]);
    },
    [files, onFilesChange, maxFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
      'video/*': ['.mp4', '.mov', '.avi'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: true,
  });

  const removeFile = useCallback(
    (index: number) => {
      const newFiles = [...files];
      const removedFile = newFiles.splice(index, 1)[0];

      // Revoke object URL to prevent memory leaks
      if (removedFile.preview) {
        URL.revokeObjectURL(removedFile.preview);
      }

      onFilesChange(newFiles);
    },
    [files, onFilesChange]
  );

  // Clean up object URLs on unmount
  React.useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

  const displayError = error || uploadError;

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200 min-h-[120px] flex flex-col items-center justify-center ${
          isDragActive
            ? 'border-primary bg-primary/5'
            : displayError
              ? 'border-red-300 bg-red-50/50'
              : 'border-gray-300 hover:border-primary hover:bg-primary/5'
        }`}
        role="button"
        tabIndex={0}
        aria-label="File upload area"
      >
        <input {...getInputProps()} aria-describedby="file-upload-description" />

        <div className="mb-2">
          <svg
            className="w-8 h-8 mx-auto text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>

        <p className="text-sm text-gray-600 mb-1">
          {isDragActive ? (
            'Drop files here...'
          ) : (
            <>
              <span className="font-medium text-primary">Click to upload</span> or drag and drop
            </>
          )}
        </p>

        <p id="file-upload-description" className="text-xs text-gray-500">
          Images: JPEG, PNG, WebP • Videos: MP4, MOV, AVI • Max 10MB each • Up to {maxFiles} files
        </p>
      </div>

      {displayError && (
        <p className="mt-2 text-sm text-red-600" role="alert" aria-live="polite">
          {displayError}
        </p>
      )}

      {files.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-text-dark mb-3">
            Uploaded Files ({files.length}/{maxFiles})
          </h4>

          <div className="grid grid-cols-1 gap-3">
            {files.map((file, index) => (
              <div
                key={`${file.name}_${index}`}
                className="flex items-center p-3 border border-gray-200 rounded-lg bg-white"
              >
                {file.preview ? (
                  <img
                    src={file.preview}
                    alt={`Preview of ${file.name}`}
                    className="w-10 h-10 object-cover rounded flex-shrink-0"
                    onLoad={() => URL.revokeObjectURL(file.preview!)}
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}

                <div className="ml-3 flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-dark truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{getFileSizeDisplay(file.size)}</p>
                </div>

                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="ml-3 text-red-500 hover:text-red-700 p-1 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                  aria-label={`Remove ${file.name}`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
