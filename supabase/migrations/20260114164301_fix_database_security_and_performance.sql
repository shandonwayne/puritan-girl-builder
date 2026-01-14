/*
  # Fix Database Security and Performance Issues

  This migration addresses multiple security and performance issues identified in the database audit:

  ## 1. Foreign Key Indexes
  Add missing indexes for foreign key columns to improve query performance:
  - `campaign_sections.user_id`
  - `puritan_girl_designs.user_id`

  ## 2. RLS Policy Optimization
  Update all RLS policies to use `(select auth.uid())` instead of `auth.uid()` to prevent
  per-row re-evaluation and improve query performance at scale.
  
  Tables affected:
  - characters (4 policies)
  - campaigns (4 policies)
  - sessions (4 policies)
  - notes (4 policies)
  - inventory_items (4 policies)
  - map_progress (3 policies)
  - user_profiles (3 policies)
  - puritan_girl_designs (4 policies)
  - campaign_sections (multiple policies)
  - campaign_players (multiple policies)
  - dialogue_progress (4 policies)
  - dialogue_choices (3 policies)
  - dice_modifiers (4 policies)
  - roll_history (3 policies)

  ## 3. Remove Duplicate Policies
  Remove duplicate/overlapping policies:
  - campaign_sections: Remove old duplicate policies
  - campaign_players: Consolidate duplicate SELECT policies

  ## 4. Fix Function Search Path
  Set immutable search path for the `update_dice_modifiers_updated_at` function
*/

-- ==========================================
-- 1. ADD MISSING FOREIGN KEY INDEXES
-- ==========================================

CREATE INDEX IF NOT EXISTS idx_campaign_sections_user_id_fkey 
  ON campaign_sections(user_id);

CREATE INDEX IF NOT EXISTS idx_puritan_girl_designs_user_id_fkey 
  ON puritan_girl_designs(user_id);

-- ==========================================
-- 2. OPTIMIZE RLS POLICIES
-- ==========================================

-- Drop and recreate all policies with optimized auth.uid() calls

-- CHARACTERS TABLE
DROP POLICY IF EXISTS "Users can view own characters" ON characters;
DROP POLICY IF EXISTS "Users can insert own characters" ON characters;
DROP POLICY IF EXISTS "Users can update own characters" ON characters;
DROP POLICY IF EXISTS "Users can delete own characters" ON characters;

CREATE POLICY "Users can view own characters"
  ON characters FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own characters"
  ON characters FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own characters"
  ON characters FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete own characters"
  ON characters FOR DELETE
  TO authenticated
  USING ((select auth.uid()) = user_id);

-- CAMPAIGNS TABLE
DROP POLICY IF EXISTS "Users can view own campaigns" ON campaigns;
DROP POLICY IF EXISTS "Users can insert own campaigns" ON campaigns;
DROP POLICY IF EXISTS "Users can update own campaigns" ON campaigns;
DROP POLICY IF EXISTS "Users can delete own campaigns" ON campaigns;

CREATE POLICY "Users can view own campaigns"
  ON campaigns FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own campaigns"
  ON campaigns FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own campaigns"
  ON campaigns FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete own campaigns"
  ON campaigns FOR DELETE
  TO authenticated
  USING ((select auth.uid()) = user_id);

-- SESSIONS TABLE
DROP POLICY IF EXISTS "Users can view own sessions" ON sessions;
DROP POLICY IF EXISTS "Users can insert own sessions" ON sessions;
DROP POLICY IF EXISTS "Users can update own sessions" ON sessions;
DROP POLICY IF EXISTS "Users can delete own sessions" ON sessions;

CREATE POLICY "Users can view own sessions"
  ON sessions FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own sessions"
  ON sessions FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own sessions"
  ON sessions FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete own sessions"
  ON sessions FOR DELETE
  TO authenticated
  USING ((select auth.uid()) = user_id);

-- NOTES TABLE
DROP POLICY IF EXISTS "Users can view own notes" ON notes;
DROP POLICY IF EXISTS "Users can insert own notes" ON notes;
DROP POLICY IF EXISTS "Users can update own notes" ON notes;
DROP POLICY IF EXISTS "Users can delete own notes" ON notes;

CREATE POLICY "Users can view own notes"
  ON notes FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own notes"
  ON notes FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own notes"
  ON notes FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete own notes"
  ON notes FOR DELETE
  TO authenticated
  USING ((select auth.uid()) = user_id);

-- INVENTORY_ITEMS TABLE
DROP POLICY IF EXISTS "Users can view own inventory items" ON inventory_items;
DROP POLICY IF EXISTS "Users can insert own inventory items" ON inventory_items;
DROP POLICY IF EXISTS "Users can update own inventory items" ON inventory_items;
DROP POLICY IF EXISTS "Users can delete own inventory items" ON inventory_items;

CREATE POLICY "Users can view own inventory items"
  ON inventory_items FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own inventory items"
  ON inventory_items FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own inventory items"
  ON inventory_items FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete own inventory items"
  ON inventory_items FOR DELETE
  TO authenticated
  USING ((select auth.uid()) = user_id);

-- MAP_PROGRESS TABLE
DROP POLICY IF EXISTS "Users can read own map progress" ON map_progress;
DROP POLICY IF EXISTS "Users can insert own map progress" ON map_progress;
DROP POLICY IF EXISTS "Users can update own map progress" ON map_progress;

CREATE POLICY "Users can read own map progress"
  ON map_progress FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own map progress"
  ON map_progress FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own map progress"
  ON map_progress FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

-- USER_PROFILES TABLE
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;

CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

-- PURITAN_GIRL_DESIGNS TABLE
DROP POLICY IF EXISTS "Users can read own puritan girl designs" ON puritan_girl_designs;
DROP POLICY IF EXISTS "Users can insert own puritan girl designs" ON puritan_girl_designs;
DROP POLICY IF EXISTS "Users can update own puritan girl designs" ON puritan_girl_designs;
DROP POLICY IF EXISTS "Users can delete own puritan girl designs" ON puritan_girl_designs;

CREATE POLICY "Users can read own puritan girl designs"
  ON puritan_girl_designs FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own puritan girl designs"
  ON puritan_girl_designs FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own puritan girl designs"
  ON puritan_girl_designs FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete own puritan girl designs"
  ON puritan_girl_designs FOR DELETE
  TO authenticated
  USING ((select auth.uid()) = user_id);

-- DICE_MODIFIERS TABLE
DROP POLICY IF EXISTS "Users can view own dice modifiers" ON dice_modifiers;
DROP POLICY IF EXISTS "Users can insert own dice modifiers" ON dice_modifiers;
DROP POLICY IF EXISTS "Users can update own dice modifiers" ON dice_modifiers;
DROP POLICY IF EXISTS "Users can delete own dice modifiers" ON dice_modifiers;

CREATE POLICY "Users can view own dice modifiers"
  ON dice_modifiers FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own dice modifiers"
  ON dice_modifiers FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own dice modifiers"
  ON dice_modifiers FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete own dice modifiers"
  ON dice_modifiers FOR DELETE
  TO authenticated
  USING ((select auth.uid()) = user_id);

-- ROLL_HISTORY TABLE
DROP POLICY IF EXISTS "Users can view own roll history" ON roll_history;
DROP POLICY IF EXISTS "Users can insert own roll history" ON roll_history;
DROP POLICY IF EXISTS "Users can delete own roll history" ON roll_history;

CREATE POLICY "Users can view own roll history"
  ON roll_history FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own roll history"
  ON roll_history FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete own roll history"
  ON roll_history FOR DELETE
  TO authenticated
  USING ((select auth.uid()) = user_id);

-- DIALOGUE_PROGRESS TABLE
DROP POLICY IF EXISTS "Users can view their own dialogue progress" ON dialogue_progress;
DROP POLICY IF EXISTS "Users can insert their own dialogue progress" ON dialogue_progress;
DROP POLICY IF EXISTS "Users can update their own dialogue progress" ON dialogue_progress;
DROP POLICY IF EXISTS "Users can delete their own dialogue progress" ON dialogue_progress;

CREATE POLICY "Users can view their own dialogue progress"
  ON dialogue_progress FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert their own dialogue progress"
  ON dialogue_progress FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update their own dialogue progress"
  ON dialogue_progress FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete their own dialogue progress"
  ON dialogue_progress FOR DELETE
  TO authenticated
  USING ((select auth.uid()) = user_id);

-- DIALOGUE_CHOICES TABLE
DROP POLICY IF EXISTS "Users can view their own dialogue choices" ON dialogue_choices;
DROP POLICY IF EXISTS "Users can insert their own dialogue choices" ON dialogue_choices;
DROP POLICY IF EXISTS "Users can delete their own dialogue choices" ON dialogue_choices;

CREATE POLICY "Users can view their own dialogue choices"
  ON dialogue_choices FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert their own dialogue choices"
  ON dialogue_choices FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete their own dialogue choices"
  ON dialogue_choices FOR DELETE
  TO authenticated
  USING ((select auth.uid()) = user_id);

-- ==========================================
-- 3. FIX CAMPAIGN_SECTIONS POLICIES
-- ==========================================

-- Remove all old policies
DROP POLICY IF EXISTS "DMs can view their own campaign sections" ON campaign_sections;
DROP POLICY IF EXISTS "DMs can create campaign sections" ON campaign_sections;
DROP POLICY IF EXISTS "DMs can update their own campaign sections" ON campaign_sections;
DROP POLICY IF EXISTS "DMs can delete their own campaign sections" ON campaign_sections;
DROP POLICY IF EXISTS "DMs can view all sections in their campaigns" ON campaign_sections;
DROP POLICY IF EXISTS "Players can view visible sections in their campaigns" ON campaign_sections;
DROP POLICY IF EXISTS "Players can view visible sections from accessible campaigns" ON campaign_sections;
DROP POLICY IF EXISTS "DMs can create sections in their campaigns" ON campaign_sections;
DROP POLICY IF EXISTS "DMs can update sections in their campaigns" ON campaign_sections;
DROP POLICY IF EXISTS "DMs can delete sections in their campaigns" ON campaign_sections;

-- Create consolidated, optimized policies
CREATE POLICY "DMs can manage sections in their campaigns"
  ON campaign_sections FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM campaigns
      WHERE campaigns.id = campaign_sections.campaign_id
      AND campaigns.user_id = (select auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM campaigns
      WHERE campaigns.id = campaign_sections.campaign_id
      AND campaigns.user_id = (select auth.uid())
    )
  );

CREATE POLICY "Players can view visible sections in campaigns they belong to"
  ON campaign_sections FOR SELECT
  TO authenticated
  USING (
    is_visible = true
    AND EXISTS (
      SELECT 1 FROM campaign_players
      WHERE campaign_players.campaign_id = campaign_sections.campaign_id
      AND campaign_players.user_id = (select auth.uid())
    )
  );

-- ==========================================
-- 4. FIX CAMPAIGN_PLAYERS POLICIES
-- ==========================================

-- Remove all old policies
DROP POLICY IF EXISTS "DMs can view players in their campaigns" ON campaign_players;
DROP POLICY IF EXISTS "Players can view their campaign memberships" ON campaign_players;
DROP POLICY IF EXISTS "DMs can add players to their campaigns" ON campaign_players;
DROP POLICY IF EXISTS "DMs can remove players from their campaigns" ON campaign_players;

-- Create consolidated, optimized policies
CREATE POLICY "Users can view campaign memberships"
  ON campaign_players FOR SELECT
  TO authenticated
  USING (
    -- Players can see their own memberships
    user_id = (select auth.uid())
    OR
    -- DMs can see all players in their campaigns
    EXISTS (
      SELECT 1 FROM campaigns
      WHERE campaigns.id = campaign_players.campaign_id
      AND campaigns.user_id = (select auth.uid())
    )
  );

CREATE POLICY "DMs can manage players in their campaigns"
  ON campaign_players FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM campaigns
      WHERE campaigns.id = campaign_players.campaign_id
      AND campaigns.user_id = (select auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM campaigns
      WHERE campaigns.id = campaign_players.campaign_id
      AND campaigns.user_id = (select auth.uid())
    )
  );

-- ==========================================
-- 5. FIX FUNCTION SEARCH PATH
-- ==========================================

-- Recreate the function with a stable search path
CREATE OR REPLACE FUNCTION update_dice_modifiers_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;