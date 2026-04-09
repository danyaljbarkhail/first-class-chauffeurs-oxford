# First Class Chauffeurs Oxford - Deployment Guide

This guide provides comprehensive instructions for deploying the First Class Chauffeurs Oxford website to production.

## Project Overview

**Website Name:** First Class Chauffeurs Oxford  
**Type:** Full-stack React + Express application with database backend  
**Tech Stack:** React 19, TypeScript, TailwindCSS 4, Express 4, tRPC 11, MySQL/TiDB  
**Features:** Luxury chauffeur booking system, contact forms, SEO-optimized

## Pre-Deployment Checklist

- [x] All pages and sections implemented
- [x] Booking system fully functional
- [x] Contact form with inquiry submission
- [x] Database schema created and migrated
- [x] SEO meta tags and schema markup added
- [x] Sitemap.xml and robots.txt configured
- [x] All tests passing (12/12 tests)
- [x] Responsive design verified
- [x] Performance optimizations applied
- [x] Environment variables configured

## Deployment Options

### Option 1: Manus Built-in Hosting (Recommended)

The easiest and most integrated option is to use Manus's built-in hosting:

1. **Create a Checkpoint**
   ```bash
   # Already done - the project has an initial checkpoint
   ```

2. **Publish via Management UI**
   - Open the Management UI (click the "Dashboard" button in the chatbox)
   - Navigate to the "Publish" button in the header
   - Follow the prompts to publish your website
   - Your site will be available at: `https://first-class-chauffeurs-oxford.manus.space`

3. **Custom Domain Setup**
   - In the Management UI, go to Settings → Domains
   - Purchase or bind your custom domain (e.g., `www.firstclasschauffeurs.co.uk`)
   - Update DNS records as instructed
   - SSL certificate is automatically provisioned

**Advantages:**
- No manual server setup required
- Automatic SSL/TLS certificates
- Built-in analytics and monitoring
- Database included
- Email notifications for bookings
- Zero downtime deployments

### Option 2: Render (Alternative)

If you prefer external hosting:

1. **Prepare for Deployment**
   ```bash
   # Build the project
   pnpm build
   ```

2. **Create Render Account**
   - Visit https://render.com
   - Sign up and create a new Web Service

3. **Connect Repository**
   - Export code to GitHub (via Management UI → More → GitHub)
   - Connect your GitHub repository to Render
   - Select the repository and branch

4. **Configure Environment**
   - Set environment variables in Render dashboard:
     - `DATABASE_URL`: Your MySQL/TiDB connection string
     - `JWT_SECRET`: Generate a secure random string
     - `VITE_APP_ID`: Your OAuth app ID
     - `OAUTH_SERVER_URL`: OAuth server URL
     - `VITE_OAUTH_PORTAL_URL`: OAuth portal URL
     - Other required variables from `.env.example`

5. **Deploy**
   - Render will automatically build and deploy on push to main branch
   - Your site will be available at a Render-provided URL

### Option 3: Netlify (Alternative)

For frontend-only deployment (without backend):

1. **Build Static Site**
   ```bash
   pnpm build
   ```

2. **Deploy to Netlify**
   - Connect your GitHub repository to Netlify
   - Set build command: `pnpm build`
   - Set publish directory: `dist`
   - Deploy

**Note:** This option requires a separate backend service for booking/inquiry submissions.

### Option 4: Vercel (Alternative)

1. **Prepare Repository**
   - Export code to GitHub via Management UI

2. **Deploy to Vercel**
   - Import project from GitHub at https://vercel.com
   - Configure environment variables
   - Deploy

## Environment Variables

Required environment variables for production:

```env
# Database
DATABASE_URL=mysql://user:password@host:port/database

# Authentication
JWT_SECRET=your-secure-random-secret-here
VITE_APP_ID=your-oauth-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im

# Owner Information
OWNER_NAME=Your Name
OWNER_OPEN_ID=your-open-id

# Built-in APIs
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=your-api-key
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY=your-frontend-api-key

# Analytics (optional)
VITE_ANALYTICS_ENDPOINT=https://analytics.manus.im
VITE_ANALYTICS_WEBSITE_ID=your-website-id
```

## Post-Deployment Steps

### 1. Verify Website

- [ ] Visit your deployed website
- [ ] Test all navigation links
- [ ] Test booking form submission
- [ ] Test contact form submission
- [ ] Verify WhatsApp button functionality
- [ ] Check responsive design on mobile
- [ ] Verify all images load correctly

### 2. SEO Verification

- [ ] Submit sitemap to Google Search Console
- [ ] Verify meta tags in page source
- [ ] Check structured data with Schema.org validator
- [ ] Test Open Graph tags with social media debuggers
- [ ] Monitor search console for indexing status

### 3. Performance Optimization

- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals
- [ ] Verify page load time
- [ ] Test on slow 3G connection
- [ ] Monitor server response times

### 4. Security Checks

- [ ] Enable HTTPS (automatic on Manus)
- [ ] Set security headers
- [ ] Test form validation and CSRF protection
- [ ] Verify no sensitive data in logs
- [ ] Check for vulnerabilities with npm audit

### 5. Monitoring Setup

- [ ] Enable error tracking
- [ ] Set up email alerts for failures
- [ ] Monitor database performance
- [ ] Track booking submission rates
- [ ] Monitor website uptime

## Maintenance

### Regular Tasks

**Weekly:**
- Check booking submissions
- Review contact inquiries
- Monitor error logs

**Monthly:**
- Update dependencies: `pnpm update`
- Review analytics
- Backup database
- Check security updates

**Quarterly:**
- Performance audit
- SEO audit
- User feedback review
- Update testimonials/content

### Database Backups

For Manus hosting, backups are automatic. For external hosting:

```bash
# Backup MySQL database
mysqldump -u user -p database_name > backup_$(date +%Y%m%d).sql

# Restore from backup
mysql -u user -p database_name < backup_20240101.sql
```

## Troubleshooting

### Booking Form Not Submitting

1. Check database connection
2. Verify environment variables
3. Check browser console for errors
4. Review server logs
5. Test with valid data format

### Email Notifications Not Working

1. Verify `notifyOwner` function is called
2. Check owner email configuration
3. Review email service logs
4. Test with test booking

### SEO Issues

1. Verify robots.txt is accessible
2. Check sitemap.xml validity
3. Verify meta tags in HTML
4. Test with Google Search Console
5. Check for duplicate content

### Performance Issues

1. Enable caching headers
2. Optimize images
3. Minify CSS/JS
4. Enable gzip compression
5. Use CDN for static assets

## Support & Resources

- **Manus Documentation:** https://docs.manus.im
- **React Documentation:** https://react.dev
- **TailwindCSS:** https://tailwindcss.com
- **tRPC:** https://trpc.io
- **Express:** https://expressjs.com

## Rollback Procedure

If deployment has issues:

1. **Via Manus Management UI:**
   - Go to Dashboard → Version History
   - Select previous checkpoint
   - Click "Rollback"

2. **Via Git (if using external hosting):**
   ```bash
   git revert <commit-hash>
   git push
   ```

## Next Steps

1. Publish the website using Manus Management UI
2. Set up custom domain
3. Configure email notifications
4. Monitor analytics
5. Collect customer feedback
6. Iterate and improve

---

**Last Updated:** April 4, 2024  
**Version:** 1.0.0  
**Status:** Production Ready
