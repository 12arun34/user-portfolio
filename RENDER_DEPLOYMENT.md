# Render Deployment Guide

## Fixed Issues for 502 Bad Gateway Error

### 1. Host Binding Issue ✅ FIXED
**Problem**: Server was only binding to localhost
**Solution**: Updated server.js to bind to `0.0.0.0` for Render

```javascript
const HOST = process.env.HOST || '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
});
```

### 2. Health Check Endpoint ✅ ADDED
**Problem**: Render needs a health check endpoint
**Solution**: Added `/health` endpoint

```javascript
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

### 3. Timeout Configuration ✅ IMPROVED
**Problem**: Default timeouts too low for Render
**Solution**: Increased timeout values

```javascript
server.keepAliveTimeout = 120000; // 2 minutes
server.headersTimeout = 120000; // 2 minutes
```

### 4. Graceful Shutdown ✅ ADDED
**Problem**: No graceful shutdown handling
**Solution**: Added SIGTERM and SIGINT handlers

```javascript
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});
```

## Render Configuration

### Environment Variables
Set these in your Render dashboard:
- `NODE_ENV=production`
- `PORT` (automatically set by Render)

### Build Settings
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Node Version**: 14.0.0 or higher

### Service Settings
- **Instance Type**: Free tier is sufficient
- **Auto-Deploy**: Enable for automatic deployments
- **Health Check Path**: `/health`

## Deployment Steps

1. **Push to Git Repository**
   ```bash
   git add .
   git commit -m "Fix Render deployment issues"
   git push origin main
   ```

2. **Connect to Render**
   - Go to Render dashboard
   - Click "New +" → "Web Service"
   - Connect your Git repository
   - Select the repository

3. **Configure Service**
   - **Name**: arun-kumar-portfolio
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Node Version**: 18 (or latest)

4. **Environment Variables**
   - `NODE_ENV=production`
   - No need to set PORT (Render handles this)

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Your site will be available at the provided URL

## Testing Deployment

After deployment, test these endpoints:
- `https://your-app.onrender.com/` - Main site
- `https://your-app.onrender.com/health` - Health check
- `https://your-app.onrender.com/contact` - Contact form (if database configured)

## Troubleshooting

### If 502 Error Persists:
1. Check Render logs for specific errors
2. Verify all dependencies are in package.json
3. Ensure Node.js version compatibility
4. Check if any environment variables are missing

### Common Issues:
- **Build fails**: Check package.json dependencies
- **Runtime errors**: Check server logs in Render dashboard
- **Static files not loading**: Verify public folder structure

## Performance Optimization

For better performance on Render:
1. **Enable Caching**: Add cache headers for static assets
2. **Compress Responses**: Use compression middleware
3. **Optimize Images**: Compress images in public/images/
4. **Minify Assets**: Consider minifying CSS/JS for production

## Monitoring

Render provides:
- **Logs**: Real-time application logs
- **Metrics**: CPU, memory, and response time
- **Alerts**: Email notifications for downtime
- **Health Checks**: Automatic health monitoring

Your portfolio should now deploy successfully on Render! 🚀
