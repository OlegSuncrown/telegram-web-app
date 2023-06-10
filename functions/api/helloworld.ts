export function onRequest(context: any) {
  const data = {id: 1, text: 'test'}
  return new Response(JSON.stringify(data))
}