-- Add social_links JSONB column to settings table
-- Run this in Supabase SQL Editor

ALTER TABLE settings
  ADD COLUMN IF NOT EXISTS social_links jsonb DEFAULT '{}'::jsonb;
