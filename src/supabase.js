// ── Konfigurasi Supabase ──────────────────────────────────────────────────
// Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY di file .env.local
// (lokal) atau di Vercel Dashboard → Settings → Environment Variables

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase =
  SUPABASE_URL && SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

export const isSupabaseReady = Boolean(supabase);
