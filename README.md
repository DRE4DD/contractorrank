# ContractorRank.agency

A complete, custom-coded agency website for ContractorRank — a specialized digital agency that builds, fixes, and ranks websites for contractor businesses (HVAC, plumbing, roofing, landscaping, tree removal, and gravel companies).

## Tech Stack

- Pure HTML5, CSS3, and vanilla JavaScript — no frameworks, no dependencies
- Semantic markup with full SEO (title tags, meta descriptions, schema markup)
- Mobile-first responsive design
- Sitemap.xml and robots.txt included
- GitHub Actions FTP deployment to Hostinger

## Pages

| Page | File | Description |
|------|------|-------------|
| Homepage | `index.html` | Hero, services overview, stats, portfolio preview, CTAs |
| Services | `services.html` | Detailed breakdown of all 4 services |
| Preview | `preview.html` | Interactive contractor website preview tool |
| Portfolio | `portfolio.html` | Case studies for lascrucesnmhvac.com and newmexicogravel.com |
| Pricing | `pricing.html` | Three-tier pricing with FAQ and guarantee |
| Contact | `contact.html` | Lead capture form with free audit offer |

## File Structure

```
contractorrank/
├── index.html
├── services.html
├── preview.html
├── portfolio.html
├── pricing.html
├── contact.html
├── sitemap.xml
├── robots.txt
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   └── preview.js
└── .github/
    └── workflows/
        └── deploy.yml
```

---

## How to Connect to GitHub

### Step 1: Initialize Git (if not done)

```bash
cd /path/to/contractorrank
git init
git add .
git commit -m "Initial commit: ContractorRank.agency website"
```

### Step 2: Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** icon → **New repository**
3. Name it `contractorrank` (or anything you prefer)
4. Set to **Public** or **Private** — your choice
5. Do NOT initialize with README (we already have one)
6. Click **Create repository**

### Step 3: Push to GitHub

Copy the remote URL from GitHub, then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/contractorrank.git
git branch -M main
git push -u origin main
```

---

## How to Set Up Auto-Deploy to Hostinger

### Step 1: Get Your Hostinger FTP Credentials

1. Log in to [hPanel](https://hpanel.hostinger.com)
2. Go to **Hosting** → select your plan → **FTP Accounts**
3. Note your **FTP Host**, **FTP Username**, and **FTP Password**
   - Host is usually: `ftp.yourdomain.com` or your server IP
   - Username is usually: your hosting username
4. If you need to create a new FTP account, do so now

### Step 2: Add GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add these three secrets:

| Secret Name | Value |
|-------------|-------|
| `FTP_HOST` | Your Hostinger FTP hostname (e.g., `ftp.contractorrank.agency`) |
| `FTP_USERNAME` | Your FTP username |
| `FTP_PASSWORD` | Your FTP password |

### Step 3: Configure Your Domain on Hostinger

1. In hPanel, go to **Domains** → **Add Domain** or use your existing domain
2. Point your domain DNS to Hostinger's nameservers:
   - `ns1.dns-parking.com`
   - `ns2.dns-parking.com`
3. Wait for DNS propagation (up to 48 hours, usually under 2 hours)

### Step 4: Deploy

Every time you push to the `main` branch, the GitHub Action will automatically upload all files to `/public_html/` on Hostinger.

```bash
# Make changes, then:
git add .
git commit -m "Update: describe your changes here"
git push origin main
# → GitHub Actions will auto-deploy to Hostinger
```

### Step 5: Monitor Deployments

- Go to your GitHub repo → **Actions** tab
- You'll see each deployment run with logs
- Green checkmark = successful deploy
- Red X = something went wrong (check logs for FTP errors)

---

## SEO Checklist After Launch

- [ ] Submit `sitemap.xml` to Google Search Console
  - Go to [search.google.com/search-console](https://search.google.com/search-console)
  - Add your property (`https://contractorrank.agency`)
  - Go to **Sitemaps** → submit `https://contractorrank.agency/sitemap.xml`
- [ ] Verify ownership in Google Search Console (HTML file method or DNS method)
- [ ] Set up Google Analytics 4 — add your GA4 measurement ID to each HTML page
- [ ] Test site speed at [pagespeed.web.dev](https://pagespeed.web.dev)
- [ ] Test mobile usability at [search.google.com/test/mobile-friendly](https://search.google.com/test/mobile-friendly)
- [ ] Validate schema markup at [validator.schema.org](https://validator.schema.org)
- [ ] Update `sitemap.xml` `<lastmod>` dates to your actual launch date

---

## Updating the Site

### To edit a page:
1. Open the `.html` file in your editor
2. Make your changes
3. Save, commit, and push to main — GitHub Actions handles the rest

### To update styles:
1. Edit `css/styles.css`
2. Save, commit, push

### To update the preview tool data (cities/services):
1. Edit `js/preview.js`
2. Modify the `STATES` or `SERVICES` objects at the top of the file

---

## Contact Form Setup

The contact form currently simulates a submission (shows a success message). To make it actually send emails, you have two options:

**Option A — Formspree (easiest)**
1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form and copy your form endpoint URL
3. In `contact.html`, update the `<form>` tag:
   ```html
   <form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. Remove the JS form submission handler from `main.js` (or keep it for the UX animation)

**Option B — Netlify Forms (if you switch to Netlify hosting)**
1. Add `netlify` attribute to the form tag
2. Deploy to Netlify — forms work automatically

---

## License

This code is proprietary and built for ContractorRank.agency. All rights reserved.
