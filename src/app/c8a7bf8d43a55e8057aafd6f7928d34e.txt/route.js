export async function GET() {
  return new Response("c8a7bf8d43a55e8057aafd6f7928d34e", {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  });
}
