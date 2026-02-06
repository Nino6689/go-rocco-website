-- Go Rocco Early Adopter Subscribers Database Schema
-- GDPR-compliant with consent tracking and double opt-in

CREATE TABLE IF NOT EXISTS subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  dog_name TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'unsubscribed')),
  confirm_token TEXT UNIQUE,
  consent_timestamp DATETIME NOT NULL,
  consent_text TEXT NOT NULL,
  confirmed_at DATETIME,
  ip_address TEXT,
  source TEXT DEFAULT 'website' CHECK (source IN ('website', 'beta')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers(status);
CREATE INDEX IF NOT EXISTS idx_subscribers_token ON subscribers(confirm_token);
