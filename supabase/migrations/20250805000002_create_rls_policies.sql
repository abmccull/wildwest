-- RLS Policies for services table
-- Public read access for services
CREATE POLICY "services_public_read" ON services
    FOR SELECT USING (true);

-- RLS Policies for cities table
-- Public read access for cities
CREATE POLICY "cities_public_read" ON cities
    FOR SELECT USING (true);

-- RLS Policies for leads table
-- No public access - only authenticated users/service role
CREATE POLICY "leads_insert_anon" ON leads
    FOR INSERT TO anon
    WITH CHECK (true);

-- RLS Policies for bookings table
-- No public access - only authenticated users/service role
CREATE POLICY "bookings_insert_anon" ON bookings
    FOR INSERT TO anon
    WITH CHECK (true);

-- RLS Policies for attachments table
-- Insert only for authenticated users/anon for lead attachments
CREATE POLICY "attachments_insert_anon" ON attachments
    FOR INSERT TO anon
    WITH CHECK (lead_id IS NOT NULL);

-- Public read for job attachments
CREATE POLICY "attachments_public_read_jobs" ON attachments
    FOR SELECT USING (job_id IS NOT NULL);

-- RLS Policies for jobs table
-- Public read access for jobs
CREATE POLICY "jobs_public_read" ON jobs
    FOR SELECT USING (true);

-- RLS Policies for chat_sessions table
-- Insert only for anon users
CREATE POLICY "chat_sessions_insert_anon" ON chat_sessions
    FOR INSERT TO anon
    WITH CHECK (true);

-- Additional policies for authenticated admin access
-- These would typically be added for admin panel functionality
CREATE POLICY "admin_all_access_services" ON services
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "admin_all_access_cities" ON cities
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "admin_all_access_leads" ON leads
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "admin_all_access_bookings" ON bookings
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "admin_all_access_attachments" ON attachments
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "admin_all_access_jobs" ON jobs
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "admin_all_access_chat_sessions" ON chat_sessions
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');