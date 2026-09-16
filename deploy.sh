#!/bin/bash
set -e

echo "🔨 Building project..."
npm run build

echo "🚀 Deploying to Cloudflare..."
npx wrangler deploy

echo "✅ Deploy complete!"
