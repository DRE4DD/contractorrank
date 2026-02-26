/* ============================================================
   ContractorRank.agency — Interactive Preview JavaScript
   ============================================================ */

'use strict';

/* ── Data ── */
const STATES = {
  'New Mexico': {
    abbr: 'NM',
    cities: ['Albuquerque', 'Santa Fe', 'Las Cruces', 'Rio Rancho', 'Roswell', 'Farmington', 'Taos', 'Carlsbad', 'Clovis', 'Hobbs', 'Alamogordo', 'Silver City']
  },
  'Arizona': {
    abbr: 'AZ',
    cities: ['Phoenix', 'Tucson', 'Mesa', 'Chandler', 'Scottsdale', 'Gilbert', 'Glendale', 'Tempe', 'Peoria', 'Flagstaff', 'Surprise', 'Yuma']
  },
  'Colorado': {
    abbr: 'CO',
    cities: ['Denver', 'Colorado Springs', 'Aurora', 'Fort Collins', 'Lakewood', 'Boulder', 'Pueblo', 'Westminster', 'Greeley', 'Centennial', 'Arvada', 'Thornton']
  },
  'Utah': {
    abbr: 'UT',
    cities: ['Salt Lake City', 'West Valley City', 'Provo', 'Orem', 'Sandy', 'Ogden', 'St. George', 'Logan', 'Layton', 'South Jordan', 'Murray', 'Millcreek']
  },
  'Texas': {
    abbr: 'TX',
    cities: ['Houston', 'San Antonio', 'Dallas', 'Austin', 'Fort Worth', 'El Paso', 'Arlington', 'Corpus Christi', 'Lubbock', 'Amarillo', 'McKinney', 'Plano']
  },
  'Oklahoma': {
    abbr: 'OK',
    cities: ['Oklahoma City', 'Tulsa', 'Norman', 'Broken Arrow', 'Lawton', 'Edmond', 'Moore', 'Midwest City', 'Enid', 'Stillwater', 'Muskogee', 'Bartlesville']
  }
};

const SERVICES = {
  'HVAC': {
    emoji: '❄️',
    tagline: 'Heating & Cooling Experts',
    color: '#1B6EBF',
    bgGradient: 'linear-gradient(135deg, #0A2540 0%, #1B6EBF 100%)',
    subServices: ['AC Repair & Installation', 'Furnace Repair', 'Heat Pump Service', 'Duct Cleaning', 'Indoor Air Quality', 'Emergency HVAC Service'],
    heroDesc: 'Fast, reliable heating and cooling services. Licensed, insured, and available 24/7 for all your HVAC needs.',
    phone: true
  },
  'Plumbing': {
    emoji: '🔧',
    tagline: 'Licensed Master Plumbers',
    color: '#0A7E8C',
    bgGradient: 'linear-gradient(135deg, #061A20 0%, #0A7E8C 100%)',
    subServices: ['Pipe Repair & Replacement', 'Water Heater Service', 'Drain Cleaning', 'Leak Detection', 'Bathroom Remodels', 'Emergency Plumbing'],
    heroDesc: 'Professional plumbing services for residential and commercial properties. Fast response, fair pricing, guaranteed work.',
    phone: true
  },
  'Gravel': {
    emoji: '🪨',
    tagline: 'Bulk Gravel & Aggregate Delivery',
    color: '#7A6A52',
    bgGradient: 'linear-gradient(135deg, #1A1510 0%, #5A4E3A 100%)',
    subServices: ['Crushed Stone Delivery', 'Driveway Gravel', 'Road Base Material', 'Decorative Rock', 'Fill Dirt & Sand', 'Commercial Aggregate'],
    heroDesc: 'Premium gravel, crushed stone, and aggregate delivered fast. Serving contractors, homeowners, and municipalities.',
    phone: false
  },
  'Tree Removal': {
    emoji: '🌲',
    tagline: 'Certified Arborists & Tree Experts',
    color: '#2D6A2D',
    bgGradient: 'linear-gradient(135deg, #0D1F0D 0%, #2D6A2D 100%)',
    subServices: ['Tree Removal', 'Stump Grinding', 'Tree Trimming', 'Emergency Storm Cleanup', 'Land Clearing', 'Tree Health Assessment'],
    heroDesc: 'Safe, professional tree removal and trimming services. Fully insured with certified arborists on every job.',
    phone: true
  },
  'Landscaping': {
    emoji: '🌿',
    tagline: 'Professional Landscaping Services',
    color: '#3A7D44',
    bgGradient: 'linear-gradient(135deg, #0D1F10 0%, #3A7D44 100%)',
    subServices: ['Lawn Maintenance', 'Landscape Design', 'Irrigation Systems', 'Mulching & Edging', 'Sod Installation', 'Seasonal Cleanups'],
    heroDesc: 'Transform your outdoor space with professional landscaping. Design, installation, and year-round maintenance.',
    phone: false
  },
  'Roofing': {
    emoji: '🏠',
    tagline: 'Licensed Roofing Contractors',
    color: '#8C2D2D',
    bgGradient: 'linear-gradient(135deg, #1F0A0A 0%, #8C2D2D 100%)',
    subServices: ['Roof Replacement', 'Roof Repair', 'Storm Damage Repair', 'Shingle Installation', 'Flat Roof Systems', 'Roof Inspection & Estimates'],
    heroDesc: 'Expert roofing services for residential and commercial properties. Free estimates and insurance claim assistance.',
    phone: true
  }
};

/* ── DOM References ── */
const stateSelect   = document.getElementById('stateSelect');
const citySelect    = document.getElementById('citySelect');
const serviceSelect = document.getElementById('serviceSelect');
const previewBtn    = document.getElementById('generatePreview');
const previewWindow = document.getElementById('previewWindow');
const browserUrlEl  = document.getElementById('browserUrl');
const previewContent = document.getElementById('previewContent');

/* ── Populate states ── */
if (stateSelect) {
  Object.keys(STATES).forEach(state => {
    const opt = document.createElement('option');
    opt.value = state;
    opt.textContent = state;
    stateSelect.appendChild(opt);
  });
}

/* ── State → City cascade ── */
if (stateSelect && citySelect) {
  stateSelect.addEventListener('change', () => {
    const selectedState = stateSelect.value;
    citySelect.innerHTML = '<option value="">Select a City</option>';
    citySelect.disabled = !selectedState;

    if (selectedState && STATES[selectedState]) {
      STATES[selectedState].cities.forEach(city => {
        const opt = document.createElement('option');
        opt.value = city;
        opt.textContent = city;
        citySelect.appendChild(opt);
      });
    }
  });
}

/* ── Generate preview ── */
function generatePreview() {
  const state   = stateSelect ? stateSelect.value : '';
  const city    = citySelect  ? citySelect.value  : '';
  const service = serviceSelect ? serviceSelect.value : '';

  if (!state || !city || !service) {
    showPreviewError('Please select a state, city, and service type to generate your preview.');
    return;
  }

  const stateAbbr  = STATES[state].abbr;
  const serviceData = SERVICES[service];
  const businessName = `${city} ${service} Pro`;
  const domain = `${city.toLowerCase().replace(/[\s.]/g, '')}${service.toLowerCase().replace(/\s/g, '')}s.com`;
  const phone  = `(${Math.floor(Math.random() * 800 + 200)}) ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`;

  if (browserUrlEl) {
    browserUrlEl.textContent = domain;
  }

  const html = buildSiteHTML({ city, state, stateAbbr, service, serviceData, businessName, domain, phone });

  if (previewContent) {
    previewContent.innerHTML = html;
    if (previewWindow) {
      previewWindow.style.display = 'block';
      previewWindow.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

function buildSiteHTML({ city, state, stateAbbr, service, serviceData, businessName, domain, phone }) {
  const { emoji, tagline, color, bgGradient, subServices, heroDesc } = serviceData;

  const servicesGrid = subServices.map(s => `
    <div class="psite-service-card">
      <div class="psite-service-icon">${getServiceEmoji(s)}</div>
      <h4>${s}</h4>
      <p>Professional ${s.toLowerCase()} in ${city}, ${stateAbbr}. Fast response guaranteed.</p>
    </div>
  `).join('');

  return `
<div class="preview-site">
  <!-- Nav -->
  <div class="psite-nav">
    <div class="psite-logo">${city} <span>${service}</span> Pro</div>
    <div class="psite-phone">📞 ${phone}</div>
  </div>

  <!-- Hero -->
  <div class="psite-hero" style="background: ${bgGradient};">
    <div style="display:inline-block;background:rgba(255,255,255,0.1);padding:6px 16px;border-radius:100px;font-size:0.75rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.9);margin-bottom:16px;">
      ${emoji} ${tagline} — Serving ${city}, ${stateAbbr}
    </div>
    <h1>#1 ${service} Company in ${city}, ${state}</h1>
    <p>${heroDesc}</p>
    <div>
      <a class="psite-btn" href="#">📞 Call Now — ${phone}</a>
      <a class="psite-btn outline" href="#">Get Free Estimate</a>
    </div>
    <div style="margin-top:24px;display:flex;justify-content:center;gap:24px;flex-wrap:wrap;">
      ${['✅ Licensed & Insured', '⭐ 5-Star Rated', '🏆 Local Experts', '⚡ Same-Day Service'].map(t => `<span style="font-size:0.78rem;color:rgba(255,255,255,0.8);font-weight:600;">${t}</span>`).join('')}
    </div>
  </div>

  <!-- Services -->
  <div class="psite-services">
    <h2>Our ${service} Services in ${city}</h2>
    <div class="psite-services-grid">
      ${servicesGrid}
    </div>
  </div>

  <!-- Why Us -->
  <div style="padding:40px 24px;background:#fff;">
    <h2 style="text-align:center;font-size:1.2rem;margin-bottom:24px;color:#111;">Why ${city} Chooses Us</h2>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;">
      ${[
        ['🏅', 'Licensed & Insured', `Fully licensed and insured for all ${service.toLowerCase()} work in ${stateAbbr}.`],
        ['⚡', 'Fast Response', `We serve ${city} and surrounding areas with same-day availability.`],
        ['💰', 'Fair Pricing', 'Transparent, upfront pricing. No hidden fees, ever.']
      ].map(([icon, title, desc]) => `
        <div style="text-align:center;padding:20px 12px;border:1px solid #eee;border-radius:6px;">
          <div style="font-size:1.8rem;margin-bottom:10px;">${icon}</div>
          <h4 style="font-size:0.9rem;margin-bottom:8px;color:#111;font-weight:700;">${title}</h4>
          <p style="font-size:0.78rem;color:#666;line-height:1.5;">${desc}</p>
        </div>
      `).join('')}
    </div>
  </div>

  <!-- CTA -->
  <div class="psite-cta" style="background:${bgGradient};">
    <h2>Ready for ${service} Service in ${city}?</h2>
    <p>Contact ${businessName} today for a free estimate. We serve ${city}, ${state} and all surrounding areas.</p>
    <a class="psite-btn" href="#">Get Your Free Quote Today</a>
  </div>

  <!-- Reviews -->
  <div style="padding:40px 24px;background:#f8f8f8;">
    <h2 style="text-align:center;font-size:1.2rem;margin-bottom:24px;color:#111;">What ${city} Customers Say</h2>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
      ${[
        ['J.M.', `Best ${service.toLowerCase()} company in ${city}! Fast, professional, and fair pricing. Highly recommend!`],
        ['S.R.', `Called them at 8am and they were here by noon. Fixed everything quickly. Will definitely use again.`]
      ].map(([name, review]) => `
        <div style="background:#fff;border:1px solid #e0e0e0;border-radius:8px;padding:20px;">
          <div style="color:#FFB800;font-size:0.9rem;margin-bottom:8px;">★★★★★</div>
          <p style="font-size:0.82rem;color:#444;line-height:1.6;margin-bottom:12px;">"${review}"</p>
          <div style="font-size:0.78rem;font-weight:700;color:#111;">— ${name}, ${city}, ${stateAbbr}</div>
        </div>
      `).join('')}
    </div>
  </div>

  <!-- Footer -->
  <div class="psite-footer">
    © 2025 ${businessName} · ${city}, ${state} · ${phone} · All Rights Reserved
    <br><small style="opacity:0.5;font-size:0.65rem;">Preview generated by ContractorRank.agency</small>
  </div>
</div>
  `;
}

function getServiceEmoji(serviceName) {
  const name = serviceName.toLowerCase();
  if (name.includes('ac') || name.includes('heat') || name.includes('cool') || name.includes('hvac') || name.includes('duct') || name.includes('air') || name.includes('pump')) return '❄️';
  if (name.includes('pipe') || name.includes('drain') || name.includes('leak') || name.includes('water heater') || name.includes('bath') || name.includes('plumb')) return '🔧';
  if (name.includes('stone') || name.includes('gravel') || name.includes('aggregate') || name.includes('crush') || name.includes('fill') || name.includes('road')) return '🪨';
  if (name.includes('tree') || name.includes('stump') || name.includes('trim') || name.includes('storm') || name.includes('land clear') || name.includes('arb')) return '🌲';
  if (name.includes('lawn') || name.includes('landscape') || name.includes('irrig') || name.includes('mulch') || name.includes('sod') || name.includes('garden')) return '🌿';
  if (name.includes('roof') || name.includes('shingle') || name.includes('flat') || name.includes('insur') || name.includes('inspect')) return '🏠';
  return '⚙️';
}

function showPreviewError(msg) {
  if (previewContent) {
    previewContent.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;height:300px;flex-direction:column;gap:16px;padding:40px;text-align:center;">
        <div style="font-size:2.5rem;">⚠️</div>
        <p style="color:#AAAAAA;font-size:1rem;">${msg}</p>
      </div>
    `;
    if (previewWindow) previewWindow.style.display = 'block';
  }
}

/* ── Event listeners ── */
if (previewBtn) {
  previewBtn.addEventListener('click', generatePreview);
}

/* ── Allow pressing Enter on selects ── */
[stateSelect, citySelect, serviceSelect].forEach(el => {
  if (el) {
    el.addEventListener('change', () => {
      const allSelected = stateSelect.value && citySelect.value && serviceSelect.value;
      if (previewBtn) {
        previewBtn.disabled = !allSelected;
        previewBtn.style.opacity = allSelected ? '1' : '0.6';
      }
    });
  }
});

/* ── Init ── */
if (previewBtn) {
  previewBtn.disabled = true;
  previewBtn.style.opacity = '0.6';
}
if (previewWindow) previewWindow.style.display = 'none';
