// Dashboard tab switching
function dashSwitchTab(name, btn) {
  document.querySelectorAll('.dash-panel').forEach(function(p) {
    p.classList.remove('dash-panel-active');
  });
  document.querySelectorAll('.dash-tab-btn').forEach(function(b) {
    b.classList.remove('dash-tab-active');
  });
  document.getElementById('dash-tab-' + name).classList.add('dash-panel-active');
  btn.classList.add('dash-tab-active');
}

// Scroll-triggered reveal
var dashFrame = document.getElementById('dashBrowserFrame');
var dashObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      dashFrame.classList.add('dash-visible');
      dashObserver.disconnect();
    }
  });
}, { threshold: 0.1 });

dashObserver.observe(dashFrame);

function dashToggleTodo(el) {
     el.classList.toggle('dash-todo-done');
     var label = el.nextElementSibling;
     label.classList.toggle('dash-todo-label-done');
   }

// ══════════════════════════════════════
// FEATURES SECTION — add to script.js
// ══════════════════════════════════════

var featDetails = [
  {
    title: "Inventory management",
    iconClass: "feat-icon-green",
    iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>',
    body: "Medicines are tracked at the batch level, so you always know which batch a sale came from, what it cost, when it expires, and how many units remain. When stock drops below your reorder level, MedEase flags it automatically — before you run out.",
    pills: ["Batch-level stock", "Reorder alerts", "Expiry monitoring", "Stock adjustments", "Category tracking", "Manufacturer records"]
  },
  {
    title: "Fast POS billing",
    iconClass: "feat-icon-blue",
    iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg>',
    body: "Search any medicine by name or composition, add it to cart, adjust quantity and the total calculates in real time. On confirm, stock is deducted using FEFO — the batch expiring soonest goes out first, every single time. Invoice generated instantly.",
    pills: ["FEFO deduction", "Real-time totals", "Invoice generation", "Refund support", "Composition search", "Sale history"]
  },
  {
    title: "Expiry alerts",
    iconClass: "feat-icon-amber",
    iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    body: "MedEase checks every batch expiry date daily and groups medicines into 30, 60 and 90 day windows. It also calculates the total rupee value of stock at risk so you can prioritise which batches to sell or return to suppliers first.",
    pills: ["30 / 60 / 90 day view", "₹ value at risk", "Batch-level detail", "Dashboard alert card", "Supplier return flag", "Daily auto-check"]
  },
  {
    title: "Supplier management",
    iconClass: "feat-icon-gray",
    iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
    body: "Every purchase you record is linked to a supplier. You can view the full purchase history per vendor, see which medicines came from which supplier, and track how much you've spent — great for negotiating better rates.",
    pills: ["Vendor profiles", "Purchase history", "Contact details", "Per-supplier spend", "Batch linkage", "Invoice records"]
  },
  {
    title: "Demand forecasting",
    iconClass: "feat-icon-purple",
    iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
    body: "MedEase looks at your average daily sales for each medicine and compares it against current stock. It then tells you how many days of stock you have left, and flags anything that needs reordering within your safety buffer period.",
    pills: ["Avg. daily sales", "Days of stock left", "Reorder flag", "Safety buffer", "Fast movers", "Slow / dead stock"]
  },
  {
    title: "Sales reports",
    iconClass: "feat-icon-teal",
    iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>',
    body: "Every sale is recorded with medicine, quantity, batch, selling price and purchase price. MedEase can show you profit per medicine, revenue by day or month, top-selling items and slow-moving stock — all without any manual entry.",
    pills: ["Daily / weekly / monthly", "Profit per medicine", "Top sellers", "Revenue tracking", "Dead stock report", "Export ready"]
  }
];

var featActive = null;

function featSelect(id) {
  var cards = document.querySelectorAll('.feat-card');
  var panel = document.getElementById('featDetailPanel');
  var d = featDetails[id];

  // clicking same card collapses it
  if (featActive === id) {
    cards[id].classList.remove('feat-active');
    panel.classList.remove('feat-panel-open');
    featActive = null;
    return;
  }

  // deactivate all, activate clicked
  cards.forEach(function(c) { c.classList.remove('feat-active'); });
  cards[id].classList.add('feat-active');
  featActive = id;

  // populate detail panel
  var iconEl = document.getElementById('featDetailIcon');
  iconEl.className = 'feat-detail-icon ' + d.iconClass;
  iconEl.innerHTML = d.iconSvg;

  document.getElementById('featDetailTitle').textContent = d.title;
  document.getElementById('featDetailBody').textContent = d.body;

  var pillsEl = document.getElementById('featDetailPills');
  pillsEl.innerHTML = d.pills.map(function(p) {
    return '<span class="feat-pill">' + p + '</span>';
  }).join('');

  panel.classList.add('feat-panel-open');

  // smooth scroll to panel on mobile
  if (window.innerWidth < 768) {
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// ══════════════════════════════════════════════════════
// CTA SECTION — GSAP ANIMATIONS
// Add to js/script.js
//
// Requires GSAP + ScrollTrigger loaded in index.html.
// Add these two lines BEFORE your <script src="js/script.js">:
//
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
// ══════════════════════════════════════════════════════

(function () {

  // Guard — only run if GSAP is loaded
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // ── 1. Floating orbs — slow continuous drift ──
  gsap.to('.cta-orb-1', {
    x: 60, y: 40,
    duration: 8,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true
  });

  gsap.to('.cta-orb-2', {
    x: -50, y: -30,
    duration: 10,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    delay: 1.5
  });

  gsap.to('.cta-orb-3', {
    x: 30, y: 50,
    duration: 7,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    delay: 0.8
  });

  // ── 2. Eyebrow — fade + slide up on scroll ──
  gsap.fromTo('#ctaEyebrow',
    { opacity: 0, y: 24 },
    {
      opacity: 1, y: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#cta',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    }
  );

  // ── 3. Headline words — staggered cascade on scroll ──
  gsap.fromTo('.cta-word',
    { opacity: 0, y: 40, rotateX: -20 },
    {
      opacity: 1, y: 0, rotateX: 0,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: '#ctaHeadline',
        start: 'top 82%',
        toggleActions: 'play none none none'
      }
    }
  );

  // ── 4. Subheadline — fade + blur in ──
  gsap.fromTo('#ctaSub',
    { opacity: 0, y: 20, filter: 'blur(6px)' },
    {
      opacity: 1, y: 0, filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power2.out',
      delay: 0.3,
      scrollTrigger: {
        trigger: '#ctaSub',
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    }
  );

  // ── 5. Buttons — scale up from slightly small ──
  gsap.fromTo('#ctaButtons',
    { opacity: 0, y: 20, scale: 0.95 },
    {
      opacity: 1, y: 0, scale: 1,
      duration: 0.7,
      ease: 'back.out(1.5)',
      delay: 0.15,
      scrollTrigger: {
        trigger: '#ctaButtons',
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    }
  );

  // ── 6. Stats row — slide up staggered ──
  gsap.fromTo('#ctaStats',
    { opacity: 0, y: 32 },
    {
      opacity: 1, y: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.2,
      scrollTrigger: {
        trigger: '#ctaStats',
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    }
  );

  // Stagger each stat item inside the row
  gsap.fromTo('.cta-stat-item',
    { opacity: 0, y: 16 },
    {
      opacity: 1, y: 0,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.1,
      delay: 0.4,
      scrollTrigger: {
        trigger: '#ctaStats',
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    }
  );

  // ── 7. Orb parallax on scroll ──
  gsap.to('.cta-orb-1', {
    y: -80,
    ease: 'none',
    scrollTrigger: {
      trigger: '#cta',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5
    }
  });

  gsap.to('.cta-orb-2', {
    y: 60,
    ease: 'none',
    scrollTrigger: {
      trigger: '#cta',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 2
    }
  });

  // ── 8. Magnetic hover on primary button ──
  var btn = document.getElementById('ctaBtnPrimary');
  if (btn) {
    btn.addEventListener('mousemove', function (e) {
      var rect = btn.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;
      var dx = (e.clientX - cx) * 0.25;
      var dy = (e.clientY - cy) * 0.25;
      gsap.to(btn, { x: dx, y: dy, duration: 0.3, ease: 'power2.out' });
    });

    btn.addEventListener('mouseleave', function () {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    });
  }

  // ── 9. Stat icon pulse on hover ──
  document.querySelectorAll('.cta-stat-item').forEach(function (item) {
    var icon = item.querySelector('.cta-stat-icon');
    item.addEventListener('mouseenter', function () {
      gsap.to(icon, { scale: 1.15, rotation: 5, duration: 0.3, ease: 'back.out(2)' });
    });
    item.addEventListener('mouseleave', function () {
      gsap.to(icon, { scale: 1, rotation: 0, duration: 0.4, ease: 'elastic.out(1, 0.5)' });
    });
  });

  // ── 10. Section background subtle scroll tint ──
  gsap.fromTo('#cta',
    { backgroundColor: '#080f09' },
    {
      backgroundColor: '#060d07',
      ease: 'none',
      scrollTrigger: {
        trigger: '#cta',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    }
  );

})();

// ══════════════════════════════════════════════════════
// HERO SECTION — GSAP ANIMATIONS
// Add to js/script.js
// GSAP + ScrollTrigger must be loaded before script.js
// ══════════════════════════════════════════════════════

(function () {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // ── 1. Eyebrow pill — fades down from above on page load ──
  gsap.fromTo('.hero-eyebrow',
    { opacity: 0, y: -20 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.1 }
  );

  // ── 2. Hero headline — each word flips up individually ──
  // We need to split the headline into spans first
  var titleEl = document.querySelector('.hero-title');
  if (titleEl) {
    // Preserve the .hover-pharmacy span — rebuild around it
    var rawHTML = titleEl.innerHTML;

    // Replace plain text nodes with word spans, leave existing spans untouched
    titleEl.childNodes.forEach(function (node) {
      if (node.nodeType === 3) { // text node
        var words = node.textContent.trim().split(/\s+/).filter(Boolean);
        if (words.length === 0) return;
        var frag = document.createDocumentFragment();
        words.forEach(function (word) {
          var span = document.createElement('span');
          span.className = 'hero-word';
          span.textContent = word;
          frag.appendChild(span);
          frag.appendChild(document.createTextNode(' '));
        });
        node.parentNode.replaceChild(frag, node);
      }
    });

    // Also wrap the .hover-pharmacy span as a word unit
    var pharmacySpan = titleEl.querySelector('.hover-pharmacy');
    if (pharmacySpan && !pharmacySpan.classList.contains('hero-word')) {
      pharmacySpan.classList.add('hero-word');
    }

    gsap.fromTo('.hero-word',
      { opacity: 0, y: 48, rotateX: -25, transformOrigin: '0% 50%' },
      {
        opacity: 1, y: 0, rotateX: 0,
        duration: 0.7,
        ease: 'power4.out',
        stagger: 0.07,
        delay: 0.35
      }
    );
  }

  // ── 3. Subheadline — blur + fade in ──
  gsap.fromTo('.hero-sub',
    { opacity: 0, y: 20, filter: 'blur(8px)' },
    {
      opacity: 1, y: 0, filter: 'blur(0px)',
      duration: 0.9,
      ease: 'power2.out',
      delay: 0.85
    }
  );

  // ── 4. CTA buttons — scale up with spring bounce ──
  gsap.fromTo('.hero-buttons',
    { opacity: 0, y: 24, scale: 0.92 },
    {
      opacity: 1, y: 0, scale: 1,
      duration: 0.7,
      ease: 'back.out(1.8)',
      delay: 1.05
    }
  );

  // ── 5. Trust line — gentle fade up last ──
  gsap.fromTo('.hero-trust',
    { opacity: 0, y: 10 },
    {
      opacity: 1, y: 0,
      duration: 0.6,
      ease: 'power2.out',
      delay: 1.25
    }
  );

  // ── 6. Dot grid parallax — moves up slowly as you scroll down ──
  gsap.to('.hero::before', {
    backgroundPositionY: '-40px',
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5
    }
  });

  // Since ::before pseudo-elements can't be targeted by GSAP directly,
  // we animate the hero section's background-position instead
  gsap.to('.hero', {
    backgroundPositionY: '20px',
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 2
    }
  });

  // ── 7. Magnetic hover on primary CTA button ──
  var heroPrimaryBtn = document.querySelector('.hero-btn-primary');
  if (heroPrimaryBtn) {
    heroPrimaryBtn.addEventListener('mousemove', function (e) {
      var rect = heroPrimaryBtn.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;
      var dx = (e.clientX - cx) * 0.22;
      var dy = (e.clientY - cy) * 0.22;
      gsap.to(heroPrimaryBtn, { x: dx, y: dy, duration: 0.3, ease: 'power2.out' });
    });

    heroPrimaryBtn.addEventListener('mouseleave', function () {
      gsap.to(heroPrimaryBtn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    });
  }

  // ── 8. Secondary button — subtle lift on hover ──
  var heroSecBtn = document.querySelector('.hero-buttons .btn-secondary');
  if (heroSecBtn) {
    heroSecBtn.addEventListener('mouseenter', function () {
      gsap.to(heroSecBtn, { y: -3, duration: 0.25, ease: 'power2.out' });
    });
    heroSecBtn.addEventListener('mouseleave', function () {
      gsap.to(heroSecBtn, { y: 0, duration: 0.4, ease: 'elastic.out(1, 0.6)' });
    });
  }

  // ── 9. Eyebrow dot — scale pulse on hover ──
  var eyebrowDot = document.querySelector('.hero-eyebrow-dot');
  var eyebrow    = document.querySelector('.hero-eyebrow');
  if (eyebrow && eyebrowDot) {
    eyebrow.addEventListener('mouseenter', function () {
      gsap.to(eyebrowDot, { scale: 1.6, duration: 0.3, ease: 'back.out(3)' });
    });
    eyebrow.addEventListener('mouseleave', function () {
      gsap.to(eyebrowDot, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' });
    });
  }

  // ── 10. Hero section fades out slightly as dashboard scrolls in ──
  gsap.to('.hero-inner', {
    opacity: 0.3,
    y: -30,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'center top',
      end: 'bottom top',
      scrub: 1
    }
  });

})();

// ══════════════════════════════════════════════════════
// PRODUCT DEFINITION — Apple-style scroll highlight
// Paste into js/script.js after your other functions
// ══════════════════════════════════════════════════════

(function () {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  var section = document.getElementById('product-definition');
  if (!section) return;

  // Inject progress bar
  var progressBar = document.createElement('div');
  progressBar.className = 'pd-progress-bar';
  section.appendChild(progressBar);

  var words = document.querySelectorAll('.pd-word');
  var arrow = document.getElementById('pdArrow');
  var totalWords = words.length;

  // ── 1. Pin the section and scrub word highlights on scroll ──
  // Each word lights up as its proportional position in the scroll is reached.
  // This is exactly the Apple iPhone feature page technique.

  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: function () {
      // Pin for 3x the viewport height so words light up slowly
      return '+=' + (window.innerHeight * 3);
    },
    pin: true,
    pinSpacing: true,
    scrub: 0,
    onUpdate: function (self) {
      var progress = self.progress; // 0 to 1

      // Arrow appears at 3% scroll
      if (progress > 0.03) {
        arrow.classList.add('pd-active');
      } else {
        arrow.classList.remove('pd-active');
      }

      // Each word lights up sequentially based on scroll progress
      words.forEach(function (word, i) {
        // Word threshold: spread words across 0.05 to 0.95 of scroll range
        var threshold = 0.05 + (i / (totalWords - 1)) * 0.90;
        if (progress >= threshold) {
          word.classList.add('pd-lit');
        } else {
          word.classList.remove('pd-lit');
        }
      });
    }
  });

  // ── 2. Progress bar follows scroll ──
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: function () {
      return '+=' + (window.innerHeight * 3);
    },
    scrub: 0.3,
    onUpdate: function (self) {
      gsap.set(progressBar, { width: (self.progress * 100) + '%' });
    }
  });

  // ── 3. Section entrance — text fades up before pinning ──
  gsap.fromTo('#definitionText',
    { opacity: 0, y: 48 },
    {
      opacity: 1, y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    }
  );

  // ── 4. Magnetic hover on each word ──
  words.forEach(function (word) {
    word.addEventListener('mousemove', function (e) {
      if (!word.classList.contains('pd-lit')) return;
      var rect = word.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;
      var dx = (e.clientX - cx) * 0.14;
      var dy = (e.clientY - cy) * 0.14;
      gsap.to(word, { x: dx, y: dy, duration: 0.25, ease: 'power2.out' });
    });

    word.addEventListener('mouseleave', function () {
      gsap.to(word, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    });

    // Click — scale pop
    word.addEventListener('click', function () {
      if (!word.classList.contains('pd-lit')) return;
      gsap.timeline()
        .to(word, { scale: 1.1, duration: 0.1, ease: 'power2.out' })
        .to(word, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' });
    });
  });

})();