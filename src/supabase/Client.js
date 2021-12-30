import { url, publicApiKey } from "./CONFIG";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(url, publicApiKey);

export default supabase;
