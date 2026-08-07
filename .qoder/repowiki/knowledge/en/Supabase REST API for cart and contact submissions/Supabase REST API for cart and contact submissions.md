---
kind: external_dependency
name: Supabase REST API for cart and contact submissions
slug: supabase
category: external_dependency
category_hints:
    - sdk_real_api
    - client_constraint
scope:
    - '**'
---

Frontend JavaScript (`frontend/js/patchbyte.js`) uses Supabase's public REST endpoint (`https://hjnowvzxusjjyhxxgdji.supabase.co/rest/v1/`) with an anonymous API key stored in the client script. It persists a session ID in `localStorage` and performs CRUD on `cart_items` and `contact_submissions` tables via raw `fetch` calls using `apikey` and `Authorization: Bearer` headers. This is a client-side integration — the anonymous key is embedded in the shipped JS, so only read-only or permissive RLS policies should apply to those tables.