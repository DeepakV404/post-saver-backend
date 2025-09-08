-- Users table schema (auth-ready)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email CITEXT UNIQUE NOT NULL,
    password_hash TEXT, -- nullable to allow OAuth-only accounts
    display_name VARCHAR(150),
    avatar_url TEXT,
    role VARCHAR(50) DEFAULT 'user', -- e.g., user, admin
    status VARCHAR(50) DEFAULT 'active', -- e.g., active, disabled
    provider VARCHAR(50) DEFAULT 'password', -- e.g., password, google, github
    provider_id TEXT, -- external provider subject/id
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMPTZ
);

-- Extensions required for UUIDs and case-insensitive email
CREATE EXTENSION IF NOT EXISTS pgcrypto; -- for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS citext;   -- for CITEXT email

-- Useful indexes
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_users_provider_id ON users(provider, provider_id);

-- Trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_user_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_user_updated_at_column();


