# SnapSheet Deployment Guide

This guide covers deploying SnapSheet to various platforms.

## 🚀 Quick Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fshreya251-oss%2FSnapSheet)

### Manual Vercel Deployment

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/shreya251-oss/SnapSheet.git
   cd SnapSheet
   ```

2. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set environment variables in Vercel dashboard**
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `NODE_ENV`: production

## 🐳 Docker Deployment

### Build and run with Docker

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Docker Commands

```bash
# Build the image
docker build -t snapsheet .

# Run the container
docker run -p 3000:3000 -e GEMINI_API_KEY=your_api_key snapsheet
```

## ☁️ Other Cloud Platforms

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard

### Railway

1. Connect your GitHub repository to Railway
2. Railway will auto-detect Next.js
3. Add environment variables in Railway dashboard

### DigitalOcean App Platform

1. Create a new app from GitHub repository
2. Select Node.js environment
3. Set build command: `npm run build`
4. Set run command: `npm start`
5. Add environment variables

## 🔧 Environment Variables

Required environment variables for deployment:

```bash
# Required
GEMINI_API_KEY=your_gemini_api_key_here

# Optional
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## 📊 Performance Optimization

### For production deployments:

1. **Enable compression** (handled by Next.js)
2. **Use CDN** for static assets
3. **Monitor Core Web Vitals**
4. **Set up error tracking** (Sentry recommended)
5. **Configure caching headers**

### Vercel-specific optimizations:

- Edge functions are automatically enabled
- Image optimization is built-in
- Analytics can be enabled in dashboard

## 🔒 Security Considerations

1. **API Key Security**
   - Never commit API keys to repository
   - Use environment variables
   - Rotate keys regularly

2. **CORS Configuration**
   - Configure allowed origins
   - Set proper headers

3. **Rate Limiting**
   - Implement API rate limiting
   - Monitor usage patterns

## 📈 Monitoring

### Recommended monitoring tools:

- **Vercel Analytics** (built-in)
- **Google Analytics** (optional)
- **Sentry** for error tracking
- **Uptime monitoring** services

### Health Check Endpoint

The app includes health checks at:
- `/api/health` (if implemented)
- Main page load time monitoring

## 🚨 Troubleshooting

### Common deployment issues:

1. **Build failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check TypeScript errors

2. **API failures**
   - Verify Gemini API key is set
   - Check API quotas and limits
   - Monitor error logs

3. **Performance issues**
   - Enable compression
   - Optimize images
   - Check bundle size

### Debug commands:

```bash
# Check build locally
npm run build
npm start

# Analyze bundle size
npm run build -- --analyze

# Check for TypeScript errors
npm run type-check
```

## 📞 Support

For deployment issues:
- Check the [Issues](https://github.com/shreya251-oss/SnapSheet/issues) page
- Create a new issue with deployment details
- Include error logs and environment information

---

**Maintained by Shreya** | [GitHub](https://github.com/shreya251-oss/SnapSheet)