import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Faltam as variáveis SUPABASE_URL e SUPABASE_ANON_KEY. Configure-as no arquivo .env.local (dev) ou nas Environment Variables do projeto na Vercel (produção).',
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
