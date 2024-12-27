/*
  # Create designs table

  1. New Tables
    - `designs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `room_layout` (jsonb)
      - `selected_furniture` (jsonb)
      - `furniture_arrangement` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `designs` table
    - Add policies for authenticated users to:
      - Read their own designs
      - Create new designs
      - Update their own designs
      - Delete their own designs
*/

CREATE TABLE IF NOT EXISTS designs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  room_layout jsonb NOT NULL,
  selected_furniture jsonb NOT NULL,
  furniture_arrangement jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE designs ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read own designs"
  ON designs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create designs"
  ON designs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own designs"
  ON designs
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own designs"
  ON designs
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);