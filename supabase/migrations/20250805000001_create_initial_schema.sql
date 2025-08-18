-- Create services table
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL
);

-- Create cities table
CREATE TABLE cities (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL
);

-- Create leads table
CREATE TABLE leads (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    mobile TEXT NOT NULL,
    city_id INTEGER REFERENCES cities(id),
    address TEXT,
    service_id INTEGER REFERENCES services(id),
    preferred_date DATE,
    preferred_time TIME,
    details TEXT,
    sms_consent BOOLEAN DEFAULT FALSE,
    whatsapp_consent BOOLEAN DEFAULT FALSE,
    utm_params JSONB,
    page_path TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    lead_id INTEGER REFERENCES leads(id) ON DELETE CASCADE,
    slot_date DATE NOT NULL,
    slot_time TIME NOT NULL,
    status TEXT CHECK (status IN ('pending', 'confirmed', 'cancelled')) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create jobs table (for recent jobs showcase)
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES services(id),
    city_id INTEGER REFERENCES cities(id),
    title TEXT,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create attachments table
CREATE TABLE attachments (
    id SERIAL PRIMARY KEY,
    lead_id INTEGER REFERENCES leads(id) ON DELETE CASCADE,
    job_id INTEGER REFERENCES jobs(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    type TEXT CHECK (type IN ('photo', 'video')),
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    -- Ensure attachment is linked to either a lead or a job, but not both
    CONSTRAINT attachment_belongs_to_one CHECK (
        (lead_id IS NOT NULL AND job_id IS NULL) OR 
        (lead_id IS NULL AND job_id IS NOT NULL)
    )
);

-- Create chat sessions table
CREATE TABLE chat_sessions (
    id SERIAL PRIMARY KEY,
    conversation JSONB,
    captured_lead_id INTEGER REFERENCES leads(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_leads_city_id ON leads(city_id);
CREATE INDEX idx_leads_service_id ON leads(service_id);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_mobile ON leads(mobile);
CREATE INDEX idx_leads_email ON leads(email) WHERE email IS NOT NULL;

CREATE INDEX idx_bookings_lead_id ON bookings(lead_id);
CREATE INDEX idx_bookings_slot_date ON bookings(slot_date);
CREATE INDEX idx_bookings_status ON bookings(status);

CREATE INDEX idx_attachments_lead_id ON attachments(lead_id) WHERE lead_id IS NOT NULL;
CREATE INDEX idx_attachments_job_id ON attachments(job_id) WHERE job_id IS NOT NULL;

CREATE INDEX idx_jobs_service_id ON jobs(service_id);
CREATE INDEX idx_jobs_city_id ON jobs(city_id);
CREATE INDEX idx_jobs_created_at ON jobs(created_at DESC);

CREATE INDEX idx_chat_sessions_captured_lead_id ON chat_sessions(captured_lead_id) WHERE captured_lead_id IS NOT NULL;

-- Create index on cities and services slugs for URL-based lookups
CREATE INDEX idx_cities_slug ON cities(slug);
CREATE INDEX idx_services_slug ON services(slug);

-- Enable Row Level Security
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;