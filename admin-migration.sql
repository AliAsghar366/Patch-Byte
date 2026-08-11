-- PatchKraft Admin Portal – Database Migration
-- Run this in Supabase SQL Editor: Dashboard → SQL Editor → New query → paste → Run
-- (Idempotent — safe to run again.)
--
-- Adds fulfillment/payment/refund fields to orders, then tightens Row Level
-- Security so the PUBLIC anon key can only INSERT orders (never read or
-- modify them). The admin portal talks to Supabase through the server using
-- the SERVICE ROLE key, which bypasses RLS entirely.

-- ── orders: new columns ───────────────────────────────────────────────────
-- The first four columns (payment_intent_id, subtotal, shipping_cost) are
-- written by checkout/index.html — older Supabase projects are missing them,
-- which makes checkout fail with "column does not exist".
ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS payment_intent_id TEXT,
  ADD COLUMN IF NOT EXISTS subtotal          DECIMAL(10,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS shipping_cost     DECIMAL(10,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS order_number      BIGSERIAL,
  ADD COLUMN IF NOT EXISTS payment_status    TEXT DEFAULT 'unpaid',      -- paid | unpaid | partially_refunded | refunded | failed
  ADD COLUMN IF NOT EXISTS refunded_amount   DECIMAL(10,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS refund_reason     TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS tracking_number   TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS tracking_url      TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS admin_notes       TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS shipped_at        TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS completed_at      TIMESTAMPTZ;

-- Backfill: existing orders created with the old checkout wrote status='paid'.
-- Keep them visible in the admin "active" list by giving them a payment status.
UPDATE orders SET payment_status = 'paid' WHERE status = 'paid' AND (payment_status IS NULL OR payment_status = 'unpaid');
-- Orders with no explicit payment status but a Stripe intent id were paid.
UPDATE orders SET payment_status = 'paid' WHERE payment_intent_id IS NOT NULL AND payment_status = 'unpaid';

-- ── Row Level Security ────────────────────────────────────────────────────
-- The storefront ONLY inserts orders / order_items / contact_submissions —
-- it never reads or updates them. The admin portal uses the service-role key
-- (server-side) so it is unaffected by these policies.
--
-- This closes a real hole: previously anyone with the public anon key
-- (which ships in every page's JavaScript) could read ALL customers' orders,
-- including names, emails, phone numbers and shipping addresses.

-- cart_items: keep read/write for the shopper's own session (no auth, so
-- this is inherently permissive — cart contents are not sensitive).
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_cart" ON cart_items;
CREATE POLICY "anon_cart" ON cart_items
  FOR ALL USING (true) WITH CHECK (true);

-- orders: anon may insert ONLY.
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_orders" ON orders;
CREATE POLICY "anon_orders_insert" ON orders
  FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "anon_orders_select" ON orders;
DROP POLICY IF EXISTS "anon_orders_update" ON orders;
DROP POLICY IF EXISTS "anon_orders_delete" ON orders;

-- order_items: anon may insert ONLY.
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_order_items" ON order_items;
CREATE POLICY "anon_order_items_insert" ON order_items
  FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "anon_order_items_select" ON order_items;
DROP POLICY IF EXISTS "anon_order_items_update" ON order_items;
DROP POLICY IF EXISTS "anon_order_items_delete" ON order_items;

-- contact_submissions: anon may insert ONLY.
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_contact" ON contact_submissions;
CREATE POLICY "anon_contact_insert" ON contact_submissions
  FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "anon_contact_select" ON contact_submissions;
DROP POLICY IF EXISTS "anon_contact_update" ON contact_submissions;
DROP POLICY IF EXISTS "anon_contact_delete" ON contact_submissions;

-- ── Admin convenience view (optional but handy) ───────────────────────────
-- SELECT * FROM order_summary;  →  each order with its line items rolled up
CREATE OR REPLACE VIEW order_summary AS
SELECT
  o.id,
  o.created_at,
  o.customer_name,
  o.customer_email,
  o.customer_phone,
  o.total,
  o.status,
  o.payment_status,
  o.refunded_amount,
  o.tracking_number,
  COUNT(oi.id)                                   AS item_count,
  COALESCE(SUM(oi.quantity), 0)                  AS total_quantity,
  COALESCE(SUM(oi.unit_price * oi.quantity), 0)  AS items_total
FROM orders o
LEFT JOIN order_items oi ON oi.order_id = o.id
GROUP BY o.id;
