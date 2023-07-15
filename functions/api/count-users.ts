import { createClient } from '@supabase/supabase-js';

export async function onRequestPost({ env }: any) {
  const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

  const { data, count, error } = await supabase.from('telegram-users').select('*', { count: 'exact' });

  if (error) {
    const json = JSON.stringify({ message: error?.message });
    return new Response(json, { status: 400 });
  }
  return new Response(JSON.stringify(count), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
