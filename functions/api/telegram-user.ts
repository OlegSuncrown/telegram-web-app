import { createClient } from '@supabase/supabase-js';

export async function onRequestPost({ env, request }: any) {
  const payload = await request.json();
  const { query_id, chat_id, user_id, is_bot, first_name, last_name, username, photo_url } = payload?.telegramUser;
  const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

  const { data, error } = await supabase
    .from('telegram-users')
    .insert([
      {
        query_id,
        chat_id,
        user_id,
        is_bot,
        first_name,
        last_name,
        username,
        photo_url,
      },
    ])
    .select();

  if (error) {
    const json = JSON.stringify({message: error?.message})
    return new Response(json, { status: 400 });
  };
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
