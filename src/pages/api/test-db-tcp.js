import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // Use environment variables for security
  const supabaseUrl = process.env.NEXT_PUBLIC_DATABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ message: 'Supabase env variables missing' });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Test: list tables or run a simple query
    const { data, error } = await supabase.from('your_table_name').select('*').limit(1);

    if (error) {
      return res.status(500).json({ message: '❌ Supabase query failed', error: error.message });
    }

    res.status(200).json({ message: '✅ Supabase query succeeded', data });
  } catch (err) {
    res.status(500).json({ message: '❌ Supabase connection failed', error: err.message });
  }
}
