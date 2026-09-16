export default {
  async fetch(request: Request): Promise<Response> {
    return new Response('Artisan Roast - Specialty Coffee', {
      headers: { 'content-type': 'text/plain' },
    });
  },
};
