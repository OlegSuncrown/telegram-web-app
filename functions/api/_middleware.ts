// Transforms Telegram.WebApp.initData string into object
type TransformInitData = {
  [k: string]: string;
};

function transformInitData(initData: string): TransformInitData {
  return Object.fromEntries(new URLSearchParams(initData));
}

async function generateHex(data: TransformInitData, botToken: string): Promise<string> {
  const encoder = new TextEncoder();
  const checkString = await Object.keys(data)
    .filter((key) => key !== 'hash')
    .map((key) => `${key}=${data[key]}`)
    .sort()
    .join('\n');
  const secretKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode('WebAppData'),
    { name: 'HMAC', hash: 'SHA-256' },
    true,
    ['sign']
  );
  const secret = await crypto.subtle.sign(
    'HMAC',
    secretKey,
    encoder.encode(botToken)
  );
  const signatureKey = await crypto.subtle.importKey(
    'raw',
    secret,
    { name: 'HMAC', hash: 'SHA-256' },
    true,
    ['sign']
  );
  const signature = await crypto.subtle.sign(
    'HMAC',
    signatureKey,
    encoder.encode(checkString)
  );

  const hex = [...new Uint8Array(signature)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return hex;
}

export async function onRequest(context: any) {
  try {
    const payload = await context.request.json();
    const dataCheckString = payload.hash;
    const data = transformInitData(dataCheckString);
    const botToken = context.env.BOT_TOKEN;
  
    const hex = await generateHex(data, botToken);
    if(data['hash'] === hex) {
      return await context.next();
    }
  
    const json = JSON.stringify({ message: 'not authorized' });
    return new Response(json, { status: 403 });
    
  } catch (err) {
    return new Response('Server Error', { status: 500 });
  }
}