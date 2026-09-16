// Cloudflare Worker entry point
// This worker serves static assets from the dist directory

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    
    // Handle SPA routing - serve index.html for all non-asset routes
    if (
      !url.pathname.includes('.') &&
      url.pathname !== '/assets' &&
      !url.pathname.startsWith('/assets/')
    ) {
      return new Response(null, {
        status: 301,
        headers: { Location: '/' },
      });
    }

    return new Response('Not Found', { status: 404 });
  },
};
