/*
  # Idleverse Database Schema

  ## Overview
  This migration creates the database structure for Idleverse, a mobile idle game
  where players create and watch worlds evolve with various Skai entities.

  ## Tables Created

  1. **worlds**
     - `id` (uuid, primary key)
     - `user_id` (uuid, references auth.users)
     - `created_at` (timestamptz)
     - `last_seen_at` (timestamptz)
     - `total_spawns_used` (int)
     - `free_spawns_remaining` (int)
     - `daily_discovery_limit` (int)
     - `discoveries_today` (int)
     - `credits` (int)
     - `last_discovery_reset` (text)
     - `data` (jsonb) - stores full world state

  2. **world_saves**
     - Automatic backups of world state
     - `id` (uuid, primary key)
     - `world_id` (uuid, references worlds)
     - `snapshot_at` (timestamptz)
     - `data` (jsonb)

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Users can only access their own worlds
  - Authenticated users required for all operations
*/

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Worlds table
CREATE TABLE IF NOT EXISTS worlds (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  last_seen_at timestamptz DEFAULT now() NOT NULL,
  total_spawns_used int DEFAULT 0 NOT NULL,
  free_spawns_remaining int DEFAULT 25 NOT NULL,
  daily_discovery_limit int DEFAULT 5 NOT NULL,
  discoveries_today int DEFAULT 0 NOT NULL,
  credits int DEFAULT 200 NOT NULL,
  last_discovery_reset text DEFAULT '' NOT NULL,
  data jsonb DEFAULT '{}'::jsonb NOT NULL
);

-- World saves table for automatic backups
CREATE TABLE IF NOT EXISTS world_saves (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  world_id uuid REFERENCES worlds(id) ON DELETE CASCADE NOT NULL,
  snapshot_at timestamptz DEFAULT now() NOT NULL,
  data jsonb DEFAULT '{}'::jsonb NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS worlds_user_id_idx ON worlds(user_id);
CREATE INDEX IF NOT EXISTS world_saves_world_id_idx ON world_saves(world_id);

-- Enable Row Level Security
ALTER TABLE worlds ENABLE ROW LEVEL SECURITY;
ALTER TABLE world_saves ENABLE ROW LEVEL SECURITY;

-- RLS Policies for worlds table

CREATE POLICY "Users can view own worlds"
  ON worlds
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own worlds"
  ON worlds
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own worlds"
  ON worlds
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own worlds"
  ON worlds
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for world_saves table

CREATE POLICY "Users can view own world saves"
  ON world_saves
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM worlds
      WHERE worlds.id = world_saves.world_id
      AND worlds.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own world saves"
  ON world_saves
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM worlds
      WHERE worlds.id = world_saves.world_id
      AND worlds.user_id = auth.uid()
    )
  );

-- Function to automatically create world saves (optional backup feature)
CREATE OR REPLACE FUNCTION create_world_backup()
RETURNS TRIGGER AS $$
BEGIN
  -- Only create backup if significant time has passed (1 hour)
  IF (NEW.last_seen_at - OLD.last_seen_at) > INTERVAL '1 hour' THEN
    INSERT INTO world_saves (world_id, snapshot_at, data)
    VALUES (NEW.id, NEW.last_seen_at, NEW.data);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to create backups on world updates
DROP TRIGGER IF EXISTS trigger_create_world_backup ON worlds;
CREATE TRIGGER trigger_create_world_backup
  AFTER UPDATE ON worlds
  FOR EACH ROW
  EXECUTE FUNCTION create_world_backup();
