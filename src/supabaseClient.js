// supabase.js
import { createClient } from '@supabase/supabase-js';

// Replace with your actual Supabase project URL and anon key
const SUPABASE_URL = 'https://lrvhrdvpaywowecfncxj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxydmhyZHZwYXl3b3dlY2ZuY3hqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MTg2ODYsImV4cCI6MjA0NjI5NDY4Nn0.0afTedHSPuBd62DLmJTnKIohMmStvkk0B_gpW9uD4XU';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
