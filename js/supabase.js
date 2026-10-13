import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const supabaseUrl = "https://tffoacgagqypeasbnowc.supabase.co";
const supabaseKey = "sb_publishable_2I8ZjC73Bk0g0NE10D0r-Q_OxB5Kgup";

export const supabase = createClient(supabaseUrl, supabaseKey);
