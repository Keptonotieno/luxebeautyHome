# Deployment Guide

## Overview
This guide covers deploying the Luxy Beauty Salon website to production, including both frontend and backend deployment options.

---

## Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Frontend Deployment](#frontend-deployment)
3. [Backend Deployment](#backend-deployment)
4. [Database Setup](#database-setup)
5. [Domain & SSL Configuration](#domain--ssl-configuration)
6. [Post-Deployment](#post-deployment)
7. [Monitoring & Maintenance](#monitoring--maintenance)

---

## Pre-Deployment Checklist

### Code Preparation
- [ ] Remove all console.log statements
- [ ] Minify CSS and JavaScript
- [ ] Optimize images (compress, resize)
- [ ] Update API URLs to production
- [ ] Test all functionality locally
- [ ] Run security audit
- [ ] Update environment variables
- [ ] Create production .env file
- [ ] Test responsive design on all devices
- [ ] Verify all forms work correctly

### Content Review
- [ ] Check all text for typos
- [ ] Verify all images load correctly
- [ ] Test all links
- [ ] Review contact information
- [ ] Update business hours
- [ ] Verify pricing is current
- [ ] Check social media links

### Performance
- [ ] Run Lighthouse audit
- [ ] Optimize Core Web Vitals
- [ ] Enable caching
- [ ] Compress assets
- [ ] Lazy load images

---

## Frontend Deployment

### Option 1: Netlify (Recommended for Static Sites)

#### Step 1: Prepare for Deployment
```bash
# Create netlify.toml in project root
```

**netlify.toml:**
```toml
[build]
  publish = "."
  command = "echo 'No build command needed'"

[[redirects]]
  from = "/*"
  to = "/luxy.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

#### Step 2: Deploy via Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize site
netlify init

# Deploy
netlify deploy --prod
```

#### Step 3: Deploy via Git (Recommended)
1. Push code to GitHub/GitLab/Bitbucket
2. Go to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Connect your repository
5. Configure build settings:
   - Build command: (leave empty)
   - Publish directory: `.`
6. Click "Deploy site"

#### Step 4: Configure Environment Variables
In Netlify dashboard:
1. Go to Site settings → Build & deploy → Environment
2. Add variables:
   ```
   API_URL=https://api.luxysalon.com
   ```

---

### Option 2: Vercel

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Deploy
```bash
# Login
vercel login

# Deploy
vercel --prod
```

#### Step 3: Configure via Dashboard
1. Go to [Vercel](https://vercel.com)
2. Import Git repository
3. Configure project settings
4. Deploy

---

### Option 3: GitHub Pages

#### Step 1: Prepare Repository
```bash
# Create gh-pages branch
git checkout -b gh-pages

# Push to GitHub
git push origin gh-pages
```

#### Step 2: Enable GitHub Pages
1. Go to repository Settings
2. Navigate to Pages section
3. Select gh-pages branch
4. Save

#### Step 3: Access Site
```
https://yourusername.github.io/repository-name
```

---

### Option 4: Traditional Web Hosting (cPanel)

#### Step 1: Prepare Files
```bash
# Create deployment package
zip -r luxy-website.zip * -x "*.git*" -x "node_modules/*" -x "docs/*"
```

#### Step 2: Upload via FTP
1. Connect to server via FTP client (FileZilla)
2. Upload all files to `public_html` or `www` directory
3. Extract if uploaded as zip

#### Step 3: Configure
1. Set file permissions (755 for directories, 644 for files)
2. Update .htaccess if needed:

**.htaccess:**
```apache
# Enable HTTPS redirect
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Compress files
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

---

## Backend Deployment

### Option 1: Heroku

#### Step 1: Prepare Application
```bash
# Create Procfile
echo "web: node server.js" > Procfile

# Create .gitignore
echo "node_modules/
.env
uploads/" > .gitignore
```

#### Step 2: Deploy
```bash
# Install Heroku CLI
# Download from https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
heroku create luxy-salon-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set EMAIL_HOST=smtp.gmail.com
heroku config:set EMAIL_USER=your_email
heroku config:set EMAIL_PASSWORD=your_password
heroku config:set FRONTEND_URL=https://luxysalon.com

# Deploy
git push heroku main

# Open app
heroku open
```

#### Step 3: Scale Dynos
```bash
# Scale to 1 dyno
heroku ps:scale web=1

# Check status
heroku ps
```

---

### Option 2: DigitalOcean Droplet

#### Step 1: Create Droplet
1. Go to [DigitalOcean](https://digitalocean.com)
2. Create new droplet
3. Choose Ubuntu 22.04 LTS
4. Select plan ($6/month minimum)
5. Add SSH key
6. Create droplet

#### Step 2: Initial Server Setup
```bash
# SSH into server
ssh root@your_server_ip

# Update system
apt update && apt upgrade -y

# Create new user
adduser luxy
usermod -aG sudo luxy

# Switch to new user
su - luxy
```

#### Step 3: Install Node.js
```bash
# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version
```

#### Step 4: Install MongoDB
```bash
# Import MongoDB public key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Create list file
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Update and install
sudo apt update
sudo apt install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

#### Step 5: Install Nginx
```bash
sudo apt install -y nginx

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

#### Step 6: Deploy Application
```bash
# Clone repository
cd /var/www
sudo git clone https://github.com/yourusername/luxy-backend.git
cd luxy-backend

# Install dependencies
npm install --production

# Create .env file
sudo nano .env
```

**.env:**
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://localhost:27017/luxy_salon
JWT_SECRET=your_super_secret_key
FRONTEND_URL=https://luxysalon.com
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

#### Step 7: Install PM2
```bash
# Install PM2
sudo npm install -g pm2

# Start application
pm2 start server.js --name luxy-api

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

#### Step 8: Configure Nginx
```bash
sudo nano /etc/nginx/sites-available/luxy-api
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name api.luxysalon.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/luxy-api /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

#### Step 9: Install SSL Certificate
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d api.luxysalon.com

# Auto-renewal
sudo certbot renew --dry-run
```

---

### Option 3: AWS EC2

#### Step 1: Launch EC2 Instance
1. Go to AWS Console
2. Launch EC2 instance
3. Choose Ubuntu Server 22.04 LTS
4. Select t2.micro (free tier)
5. Configure security group:
   - SSH (22)
   - HTTP (80)
   - HTTPS (443)
   - Custom TCP (5000) - for API
6. Launch instance

#### Step 2: Connect and Setup
```bash
# SSH into instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Follow same steps as DigitalOcean (Steps 2-9)
```

---

### Option 4: Serverless (Firebase Functions)

#### Step 1: Install Firebase CLI
```bash
npm install -g firebase-tools
firebase login
```

#### Step 2: Initialize Firebase
```bash
firebase init functions
```

#### Step 3: Deploy Functions
```bash
# Deploy
firebase deploy --only functions

# View logs
firebase functions:log
```

---

## Database Setup

### Option 1: MongoDB Atlas (Recommended)

#### Step 1: Create Cluster
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Choose cloud provider and region
4. Create cluster

#### Step 2: Configure Access
1. Database Access → Add New Database User
2. Network Access → Add IP Address (0.0.0.0/0 for all)
3. Get connection string

#### Step 3: Connect
```javascript
// Connection string
mongodb+srv://username:password@cluster.mongodb.net/luxy_salon?retryWrites=true&w=majority
```

---

### Option 2: Self-Hosted MongoDB

#### Already covered in DigitalOcean deployment

---

### Option 3: PostgreSQL (Alternative)

#### Install PostgreSQL
```bash
sudo apt install -y postgresql postgresql-contrib

# Start service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database
sudo -u postgres psql
CREATE DATABASE luxy_salon;
CREATE USER luxy_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE luxy_salon TO luxy_user;
\q
```

---

## Domain & SSL Configuration

### Step 1: Purchase Domain
- Namecheap
- GoDaddy
- Google Domains
- Cloudflare

### Step 2: Configure DNS

**For Frontend (Netlify/Vercel):**
```
Type: A
Name: @
Value: [Netlify/Vercel IP]

Type: CNAME
Name: www
Value: [your-site].netlify.app
```

**For Backend (DigitalOcean/AWS):**
```
Type: A
Name: api
Value: [Your Server IP]
```

### Step 3: SSL Certificate

**Automatic (Netlify/Vercel):**
- SSL is automatically provisioned

**Manual (Let's Encrypt):**
```bash
sudo certbot --nginx -d luxysalon.com -d www.luxysalon.com
```

---

## Post-Deployment

### Step 1: Verify Deployment
- [ ] Visit website URL
- [ ] Test all pages load
- [ ] Test forms submission
- [ ] Verify API endpoints work
- [ ] Check mobile responsiveness
- [ ] Test in different browsers

### Step 2: Configure Analytics
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Step 3: Set Up Monitoring

**Frontend Monitoring:**
- Google Analytics
- Hotjar (user behavior)
- Sentry (error tracking)

**Backend Monitoring:**
```bash
# Install monitoring tools
npm install @sentry/node
npm install newrelic
```

### Step 4: Configure Backups

**Database Backup Script:**
```bash
#!/bin/bash
# backup-db.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/mongodb"
mkdir -p $BACKUP_DIR

mongodump --out $BACKUP_DIR/backup_$DATE

# Keep only last 7 days
find $BACKUP_DIR -type d -mtime +7 -exec rm -rf {} +
```

**Automate with Cron:**
```bash
# Edit crontab
crontab -e

# Add daily backup at 2 AM
0 2 * * * /path/to/backup-db.sh
```

### Step 5: Set Up Email Notifications

**For Bookings:**
- Configure email templates
- Test email delivery
- Set up SMTP properly

---

## Monitoring & Maintenance

### Performance Monitoring

**Tools:**
- Google PageSpeed Insights
- GTmetrix
- Pingdom
- UptimeRobot

**Metrics to Track:**
- Page load time
- Time to First Byte (TTFB)
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)

### Security Monitoring

**Best Practices:**
- Regular security audits
- Update dependencies monthly
- Monitor for vulnerabilities
- Review access logs
- Implement rate limiting
- Use Web Application Firewall (WAF)

### Regular Maintenance Tasks

**Weekly:**
- [ ] Check error logs
- [ ] Review analytics
- [ ] Test forms
- [ ] Check uptime

**Monthly:**
- [ ] Update dependencies
- [ ] Review security
- [ ] Optimize images
- [ ] Check backups
- [ ] Review performance

**Quarterly:**
- [ ] Full security audit
- [ ] Content review
- [ ] SEO audit
- [ ] User feedback review
- [ ] Feature updates

---

## Troubleshooting

### Common Issues

#### Issue: Site not loading
**Solution:**
1. Check DNS propagation
2. Verify server is running
3. Check firewall rules
4. Review Nginx/Apache logs

#### Issue: API not responding
**Solution:**
1. Check PM2 status: `pm2 status`
2. Review logs: `pm2 logs`
3. Verify database connection
4. Check environment variables

#### Issue: SSL certificate error
**Solution:**
1. Renew certificate: `sudo certbot renew`
2. Check certificate expiry
3. Verify DNS records

#### Issue: Slow performance
**Solution:**
1. Enable caching
2. Optimize images
3. Minify CSS/JS
4. Use CDN
5. Upgrade server resources

---

## Rollback Procedure

### Frontend Rollback
```bash
# Netlify
netlify rollback

# Vercel
vercel rollback [deployment-url]

# Git-based
git revert HEAD
git push origin main
```

### Backend Rollback
```bash
# Stop current version
pm2 stop luxy-api

# Checkout previous version
git checkout [previous-commit-hash]

# Install dependencies
npm install

# Restart
pm2 restart luxy-api
```

---

## Scaling Considerations

### Horizontal Scaling
- Load balancer (Nginx, HAProxy)
- Multiple server instances
- Database replication
- CDN for static assets

### Vertical Scaling
- Upgrade server resources
- Optimize database queries
- Implement caching (Redis)
- Use database indexing

---

## Cost Estimation

### Hosting Costs (Monthly)

**Frontend:**
- Netlify: Free - $19
- Vercel: Free - $20
- GitHub Pages: Free
- Traditional Hosting: $5 - $20

**Backend:**
- Heroku: $7 - $25
- DigitalOcean: $6 - $40
- AWS EC2: $5 - $50
- Serverless: $0 - $25

**Database:**
- MongoDB Atlas: Free - $57
- Self-hosted: Included in server cost

**Domain:**
- $10 - $15/year

**SSL:**
- Free (Let's Encrypt)

**Total Estimated Cost:**
- Minimum: $15/month
- Recommended: $30-50/month
- Enterprise: $100+/month

---

## Support Resources

### Documentation
- [Netlify Docs](https://docs.netlify.com/)
- [Vercel Docs](https://vercel.com/docs)
- [DigitalOcean Tutorials](https://www.digitalocean.com/community/tutorials)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)

### Community
- Stack Overflow
- GitHub Issues
- Discord/Slack communities
- Reddit (r/webdev)

---

## Checklist Summary

### Pre-Launch
- [ ] Code tested and optimized
- [ ] Environment variables configured
- [ ] Database set up and populated
- [ ] Domain purchased and configured
- [ ] SSL certificate installed
- [ ] Analytics configured
- [ ] Monitoring set up
- [ ] Backups configured

### Launch Day
- [ ] Deploy frontend
- [ ] Deploy backend
- [ ] Verify all functionality
- [ ] Test forms and bookings
- [ ] Check mobile responsiveness
- [ ] Monitor for errors
- [ ] Announce launch

### Post-Launch
- [ ] Monitor performance
- [ ] Review analytics
- [ ] Collect user feedback
- [ ] Fix any issues
- [ ] Plan updates
- [ ] Regular maintenance

---

## Conclusion

Your Luxy Beauty Salon website is now ready for deployment! Follow this guide step-by-step, and don't hesitate to refer back to specific sections as needed. Remember to test thoroughly before going live and monitor closely after deployment.

Good luck with your launch! 🚀
