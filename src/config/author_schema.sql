-- Authors table schema
CREATE TABLE IF NOT EXISTS authors (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    account_name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    role VARCHAR(200),
    current_company VARCHAR(200),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for commonly queried fields
CREATE INDEX IF NOT EXISTS idx_authors_account_name ON authors(account_name);
CREATE INDEX IF NOT EXISTS idx_authors_role ON authors(role);
CREATE INDEX IF NOT EXISTS idx_authors_company ON authors(current_company);

-- Trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_author_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_authors_updated_at 
    BEFORE UPDATE ON authors 
    FOR EACH ROW 
    EXECUTE FUNCTION update_author_updated_at_column();
