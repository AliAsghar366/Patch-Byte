-- PatchByte Database Migration
-- Run this in Supabase SQL Editor:
-- Dashboard → SQL Editor → New query → paste → Run

-- ── cart_items ────────────────────────────────────────────────────────────
ALTER TABLE cart_items
  ADD COLUMN IF NOT EXISTS product_slug  TEXT,
  ADD COLUMN IF NOT EXISTS product_name  TEXT,
  ADD COLUMN IF NOT EXISTS unit_price    DECIMAL(10,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS properties    JSONB DEFAULT '{}';

-- ── orders ────────────────────────────────────────────────────────────────
ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS customer_name    TEXT,
  ADD COLUMN IF NOT EXISTS customer_email   TEXT,
  ADD COLUMN IF NOT EXISTS customer_phone   TEXT,
  ADD COLUMN IF NOT EXISTS shipping_address JSONB DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS notes            TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS total            DECIMAL(10,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS status           TEXT DEFAULT 'pending';

-- ── order_items ───────────────────────────────────────────────────────────
ALTER TABLE order_items
  ADD COLUMN IF NOT EXISTS product_slug  TEXT,
  ADD COLUMN IF NOT EXISTS product_name  TEXT,
  ADD COLUMN IF NOT EXISTS unit_price    DECIMAL(10,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS properties    JSONB DEFAULT '{}';

-- ── contact_submissions ───────────────────────────────────────────────────
ALTER TABLE contact_submissions
  ADD COLUMN IF NOT EXISTS name    TEXT,
  ADD COLUMN IF NOT EXISTS email   TEXT,
  ADD COLUMN IF NOT EXISTS phone   TEXT,
  ADD COLUMN IF NOT EXISTS message TEXT;

-- ── Row Level Security (allow public inserts) ─────────────────────────────
-- Allow anyone to insert/read their own cart items (anon key)
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_cart" ON cart_items;
CREATE POLICY "anon_cart" ON cart_items
  FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_orders" ON orders;
CREATE POLICY "anon_orders" ON orders
  FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_order_items" ON order_items;
CREATE POLICY "anon_order_items" ON order_items
  FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_contact" ON contact_submissions;
CREATE POLICY "anon_contact" ON contact_submissions
  FOR ALL USING (true) WITH CHECK (true);
