import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://sshfuukiwewewnmmtssv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzaGZ1dWtpd2V3ZXdubW10c3N2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2MDEzMjQsImV4cCI6MjA2MTE3NzMyNH0.pMWeYxMNr0mLrrk7zbMDFzNwSbiZXKhjfVj-GztmIZg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
