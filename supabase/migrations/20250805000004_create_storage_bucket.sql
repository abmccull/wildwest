-- Create storage bucket for attachments
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'attachments',
    'attachments',
    false,
    10485760, -- 10MB limit
    ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/quicktime', 'video/webm']
);

-- Create storage policies for attachments bucket
CREATE POLICY "Allow anon users to upload attachments" ON storage.objects
    FOR INSERT TO anon
    WITH CHECK (bucket_id = 'attachments');

CREATE POLICY "Allow service role full access to attachments" ON storage.objects
    FOR ALL USING (bucket_id = 'attachments' AND auth.jwt() ->> 'role' = 'service_role');

-- Create a function to generate signed URLs for private attachments
CREATE OR REPLACE FUNCTION get_attachment_url(attachment_id INTEGER)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    attachment_record RECORD;
    signed_url TEXT;
BEGIN
    -- Get the attachment record
    SELECT * INTO attachment_record
    FROM attachments
    WHERE id = attachment_id;
    
    -- Return the URL directly (in production, this would generate a signed URL)
    RETURN attachment_record.url;
END;
$$;