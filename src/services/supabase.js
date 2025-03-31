import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://adjruqkgtxenjlhyrfyf.supabase.co";
const supabaseKey =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkanJ1cWtndHhlbmpsaHlyZnlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwODkxNzQsImV4cCI6MjA1ODY2NTE3NH0.kQct3nIqJ67-uqbdFB7v3ZJZyAJ0FkeMvHwdtXV4LW4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

export { supabaseUrl };
