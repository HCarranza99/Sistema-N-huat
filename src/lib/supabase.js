import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Si las variables no están configuradas, el cliente se crea pero
// todas las operaciones fallarán silenciosamente (manejado en analytics.js)
export const supabase = createClient(supabaseUrl ?? '', supabaseKey ?? '')
