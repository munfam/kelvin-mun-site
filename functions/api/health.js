// Cloudflare Pages Function: GET /api/health
// Runs on the free Workers allowance, no server required.
export async function onRequestGet() {
  return new Response(
    JSON.stringify({
      ok: true,
      runtime: 'cloudflare-pages-functions',
      time: new Date().toISOString(),
    }),
    {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store',
      },
    },
  );
}
