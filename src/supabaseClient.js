import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://raaxybcfkdowqfgblknl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYXh5YmNma2Rvd3FmZ2Jsa25sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzOTgzMzMsImV4cCI6MjA0Mzk3NDMzM30.1j3_KonHIV1bnUdFpjCfp_1vHV3zEgZgx6hhunbSSNc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
