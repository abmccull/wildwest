-- Create SMS interactions table for tracking SMS communications
CREATE TABLE sms_interactions (
    id SERIAL PRIMARY KEY,
    lead_id INTEGER REFERENCES leads(id) ON DELETE CASCADE,
    phone_number TEXT NOT NULL,
    message_text TEXT NOT NULL,
    message_type TEXT CHECK (message_type IN ('outbound', 'inbound')) DEFAULT 'outbound',
    status TEXT CHECK (status IN ('pending', 'sent', 'delivered', 'failed', 'received')) DEFAULT 'pending',
    twilio_sid TEXT, -- Twilio message SID for tracking
    error_message TEXT, -- Store error details if sending fails
    utm_params JSONB, -- UTM parameters for tracking source
    page_path TEXT, -- Page where SMS was initiated
    consent_given BOOLEAN DEFAULT TRUE, -- SMS consent status
    cost_cents INTEGER, -- Cost in cents for analytics
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_sms_interactions_lead_id ON sms_interactions(lead_id) WHERE lead_id IS NOT NULL;
CREATE INDEX idx_sms_interactions_phone_number ON sms_interactions(phone_number);
CREATE INDEX idx_sms_interactions_status ON sms_interactions(status);
CREATE INDEX idx_sms_interactions_message_type ON sms_interactions(message_type);
CREATE INDEX idx_sms_interactions_created_at ON sms_interactions(created_at DESC);
CREATE INDEX idx_sms_interactions_twilio_sid ON sms_interactions(twilio_sid) WHERE twilio_sid IS NOT NULL;

-- Enable Row Level Security
ALTER TABLE sms_interactions ENABLE ROW LEVEL SECURITY;

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_sms_interactions_updated_at 
    BEFORE UPDATE ON sms_interactions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();