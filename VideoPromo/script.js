/*
  ═══════════════════════════════════════════════════════════════
  SISTec Digital Pass PROMO — GSAP POWERED (Alight Motion Level Quality)
  ═══════════════════════════════════════════════════════════════

  GSAP = GreenSock Animation Platform
  — same engine used by major motion graphics studios & apps
  — frame-perfect spring physics, stagger, timeline sequencing

  📸 SCREENSHOTS → put in assets/ folder:
  assets/s1_splash.jpeg      s2_login.png       s3_apply.png
  assets/s4_apply_popup.jpeg s5_pending.png     s6_approved.png
  assets/s7_visitor_form.jpeg s8_visitor_done.png s9_history.png
  assets/s10_allot.jpeg      s11_dashboard.png  s12_users.png
*/

'use strict';

// Wait for GSAP to be ready
window.addEventListener('load', init);

// ══════════════════════════════════════════════════════════
//  COLOUR THEMES
// ══════════════════════════════════════════════════════════
const THEMES = {
  // All themes share the SAME neutral near-white background — no coloured stage
  default: { bg: '#f8fafc', a1: '#1a73e8', a2: '#7c3aed', a3: '#00c2ff', g: '#fbbf24' },
  indigo: { bg: '#f8fafc', a1: '#3b82f6', a2: '#6366f1', a3: '#818cf8', g: '#fbbf24' },
  teal: { bg: '#f8fafc', a1: '#0d9488', a2: '#0f766e', a3: '#14b8a6', g: '#fbbf24' },
  emerald: { bg: '#f8fafc', a1: '#059669', a2: '#10b981', a3: '#34d399', g: '#fbbf24' },
  violet: { bg: '#f8fafc', a1: '#7c3aed', a2: '#c026d3', a3: '#d8b4fe', g: '#fbbf24' },
  rose: { bg: '#f8fafc', a1: '#e11d48', a2: '#db2777', a3: '#fda4af', g: '#fbbf24' },
  amber: { bg: '#f8fafc', a1: '#d97706', a2: '#f59e0b', a3: '#fcd34d', g: '#fbbf24' },
  cyan: { bg: '#f8fafc', a1: '#0891b2', a2: '#06b6d4', a3: '#22d3ee', g: '#fbbf24' },
  royal: { bg: '#f8fafc', a1: '#6d28d9', a2: '#7c3aed', a3: '#c4b5fd', g: '#fbbf24' },
};

// ══════════════════════════════════════════════════════════
//  SLIDES
// ══════════════════════════════════════════════════════════
const SLIDES = [
  { type: 'intro', theme: 'default', dur: 6.0 },
  {
    chip: 'INTRODUCING', title: 'SISTec\nDIGITAL PASS',
    bt: 'SMART GATE PASS FOR MODERN CAMPUSES', bs: '',
    img: 'assets/preview/s1_splash.jpeg',
    img8k: 'assets/s1_splash.jpeg',
    phone: { fromY: -90, toY: 0, fromS: .5, toS: 1, fromX: 0, toX: 0 },
    ss: 'zoom', theme: 'default', dur: 6.0,
    badges: [
      { icon: 'mobile', color: '#1a73e8', text: 'Digital Pass', sub: 'Campus Solution', side: 'left', top: '34%' },
      { icon: 'school', color: '#7c3aed', text: 'Smart Campus', sub: 'SISTec', side: 'right', top: '50%' },
      { icon: 'approve', color: '#059669', text: 'Go Paperless', sub: 'Modern System', side: 'bottom', top: '64%' },
    ],
  },
  {
    chip: 'FEATURE 01', title: 'SECURE\nLOGIN',
    bt: 'FAST & SAFE ACCESS', bs: 'Role-based auth for every user type',
    img: 'assets/preview/s2_login.jpeg',
    img8k: 'assets/s2_login.jpeg',
    phone: { fromY: 0, toY: -25, fromS: 1, toS: 1.03, fromX: 0, toX: 3 },
    ss: 'slideR', theme: 'indigo', dur: 9.7,
    badges: [
      { icon: 'lock', color: '#3b82f6', text: 'Secure Login', sub: 'Encrypted Auth', side: 'left', top: '33%' },
      { icon: 'bolt', color: '#6366f1', text: 'Fast Access', sub: 'Instant Entry', side: 'right', top: '49%' },
      { icon: 'person', color: '#818cf8', text: 'Role-Based', sub: 'Student / Faculty', side: 'bottom', top: '63%' },
    ],
  },
  {
    chip: 'FEATURE 02', title: 'APPLY\nGATE PASS',
    bt: 'IN JUST FEW SECONDS', bs: 'Students apply anytime from their phone',
    img: 'assets/preview/s3_apply.jpeg',
    img8k: 'assets/s3_apply.jpeg',
    phone: { fromY: 0, toY: 25, fromS: 1, toS: 1.03, fromX: 0, toX: -3 },
    ss: 'slideL', theme: 'teal', dur: 10.4,
    badges: [
      { icon: 'mobile', color: '#0d9488', text: 'Mobile First', sub: 'Apply Anywhere', side: 'left', top: '35%' },
      { icon: 'timer', color: '#0f766e', text: 'Quick Apply', sub: 'In Seconds', side: 'right', top: '51%' },
      { icon: 'rocket', color: '#14b8a6', text: 'Anytime', sub: '24 / 7 Access', side: 'bottom', top: '64%' },
    ],
  },
  {
    chip: 'FEATURE 03', title: 'NO MORE\nPAPERWORK',
    bt: 'DIGITAL APPROVAL SYSTEM', bs: 'Automated requests & approvals',
    img: 'assets/preview/s4_apply_popup.jpeg',
    img8k: 'assets/s4_apply_popup.jpeg',
    phone: { fromY: 0, toY: 5, fromS: 1, toS: 1.06, fromX: -8, toX: 0 },
    ss: 'slideU', theme: 'emerald', dur: 8.9,
    badges: [
      { icon: 'check', color: '#059669', text: 'Paperless', sub: 'Zero Paper', side: 'left', top: '33%' },
      { icon: 'gear', color: '#10b981', text: 'Automated', sub: 'Smart Workflow', side: 'right', top: '49%' },
      { icon: 'leaf', color: '#34d399', text: 'Eco-Friendly', sub: 'Green Campus', side: 'bottom', top: '63%' },
    ],
  },
  {
    chip: 'FEATURE 04', title: 'SMART\nVISITOR ENTRY',
    bt: 'TRACK EVERY VISIT', bs: 'Register visitors with photo in seconds',
    img: 'assets/preview/s7_visitor_form.jpeg',
    img8k: 'assets/s7_visitor_form.jpeg',
    phone: { fromY: 20, toY: 0, fromS: .55, toS: 1, fromX: 0, toX: 0 },
    ss: 'zoom', theme: 'violet', dur: 8.9,
    badges: [
      { icon: 'camera', color: '#7c3aed', text: 'Photo ID', sub: 'Live Capture', side: 'left', top: '35%' },
      { icon: 'shield', color: '#c026d3', text: 'Verified Entry', sub: 'Guard Approved', side: 'right', top: '51%' },
      { icon: 'timer', color: '#d8b4fe', text: 'Real-time', sub: 'Instant Update', side: 'bottom', top: '64%' },
    ],
  },
  {
    chip: 'FEATURE 05', title: 'SECURE\nVERIFICATION',
    bt: 'REAL-TIME MONITORING', bs: 'Guards verify pass status instantly',
    img: 'assets/preview/s5_pending.jpeg',
    img8k: 'assets/s5_pending.jpeg',
    phone: { fromY: 0, toY: -25, fromS: 1, toS: 1.03, fromX: 0, toX: 3 },
    ss: 'flip', theme: 'rose', dur: 8.9,
    badges: [
      { icon: 'search', color: '#e11d48', text: 'Instant Check', sub: 'QR / ID Scan', side: 'left', top: '33%' },
      { icon: 'traffic', color: '#db2777', text: 'Live Status', sub: 'Pending / Done', side: 'right', top: '50%' },
      { icon: 'approve', color: '#fda4af', text: '100% Accurate', sub: 'No Forgery', side: 'bottom', top: '63%' },
    ],
  },
  {
    chip: 'FEATURE 06', title: 'MANAGE\nEVERYTHING',
    bt: 'FROM ONE DASHBOARD', bs: 'Add users, batches & assign guards',
    img: 'assets/preview/s11_dashboard.jpeg',
    img8k: 'assets/s11_dashboard.jpeg',
    phone: { fromY: 0, toY: 25, fromS: 1, toS: 1.03, fromX: 0, toX: -3 },
    ss: 'slideR', theme: 'amber', dur: 8.2,
    badges: [
      { icon: 'chart', color: '#d97706', text: 'Dashboard', sub: 'Live Analytics', side: 'left', top: '35%' },
      { icon: 'users', color: '#f59e0b', text: 'All Users', sub: 'Manage Roles', side: 'right', top: '51%' },
      { icon: 'gear', color: '#fcd34d', text: 'Full Control', sub: 'Admin Panel', side: 'bottom', top: '63%' },
    ],
  },
  {
    chip: 'FEATURE 07', title: 'TRACK\nEVERY REQUEST',
    bt: 'ANYTIME  •  ANYWHERE', bs: 'Full history with filter & CSV export',
    img: 'assets/preview/s9_history.jpeg',
    img8k: 'assets/s9_history.jpeg',
    phone: { fromY: 0, toY: 5, fromS: 1, toS: 1.06, fromX: -8, toX: 0 },
    ss: 'slideL', theme: 'cyan', dur: 8.9,
    badges: [
      { icon: 'list', color: '#0891b2', text: 'Full History', sub: 'All Requests', side: 'left', top: '33%' },
      { icon: 'export', color: '#06b6d4', text: 'CSV Export', sub: 'Download Data', side: 'right', top: '50%' },
      { icon: 'search', color: '#22d3ee', text: 'Filter & Search', sub: 'Smart Query', side: 'bottom', top: '63%' },
    ],
  },
  {
    chip: 'GO DIGITAL', title: 'STOP USING\nPAPER PASSES',
    bt: 'JOIN SISTec Digital Pass TODAY', bs: 'Digital transformation starts here',
    img: 'assets/preview/s6_approved.jpeg',
    img8k: 'assets/s6_approved.jpeg',
    phone: { fromY: 20, toY: 0, fromS: .55, toS: 1, fromX: 0, toX: 0 },
    ss: 'zoom', theme: 'rose', dur: 9.6,
    badges: [
      { icon: 'rocket', color: '#e11d48', text: 'Go Digital', sub: 'Start Today', side: 'left', top: '35%' },
      { icon: 'leaf', color: '#db2777', text: 'Save Paper', sub: 'Eco-Friendly', side: 'right', top: '51%' },
      { icon: 'star', color: '#fda4af', text: 'Modern Campus', sub: 'Future Ready', side: 'bottom', top: '64%' },
    ],
  },
  {
    chip: 'ONE PLATFORM', title: 'ONE APP',
    bt: 'STUDENTS  •  FACULTY  •  SECURITY', bs: 'Every role. One unified system.',
    img: 'assets/preview/s12_users.jpeg',
    img8k: 'assets/s12_users.jpeg',
    phone: { fromY: 0, toY: -25, fromS: 1, toS: 1.03, fromX: 0, toX: 3 },
    ss: 'slideR', theme: 'emerald', dur: 7.1,
    badges: [
      { icon: 'school', color: '#059669', text: 'Students', sub: 'Apply & Track', side: 'left', top: '33%' },
      { icon: 'shield', color: '#10b981', text: 'Security', sub: 'Guard Access', side: 'right', top: '49%' },
      { icon: 'teacher', color: '#34d399', text: 'Faculty', sub: 'Approve Pass', side: 'bottom', top: '63%' },
    ],
  },
  {
    chip: 'BENEFITS', title: 'FASTER\nAPPROVALS',
    bt: 'BETTER SECURITY  •  SMARTER CAMPUS', bs: '',
    img: 'assets/preview/s10_allot.jpeg',
    img8k: 'assets/s10_allot.jpeg',
    phone: { fromY: -15, toY: 5, fromS: 1.2, toS: 1, fromX: 0, toX: 0 },
    ss: 'flip', theme: 'violet', dur: 6.1,
    badges: [
      { icon: 'bolt', color: '#7c3aed', text: 'Instant Approve', sub: 'Auto Workflow', side: 'left', top: '35%' },
      { icon: 'star', color: '#c026d3', text: 'Top Efficiency', sub: '10x Faster', side: 'right', top: '51%' },
      { icon: 'lock', color: '#d8b4fe', text: 'Secure System', sub: 'Tamper-Proof', side: 'bottom', top: '63%' },
    ],
  },
  {
    chip: 'BUILT FOR CAMPUSES', title: 'SISTec\nDIGITAL PASS',
    bt: 'SECURE  •  SMART  •  EFFICIENT', bs: 'For Colleges Today — Organizations Tomorrow',
    img: 'assets/preview/s3_apply.jpeg',
    img8k: 'assets/s3_apply.jpeg',
    phone: { fromY: 0, toY: 0, fromS: .85, toS: 1, fromX: 15, toX: 0 },
    ss: 'slideU', theme: 'default', dur: 8.9,
    badges: [
      { icon: 'globe', color: '#1a73e8', text: 'sistec.ac.in', sub: 'Official Portal', side: 'left', top: '35%' },
      { icon: 'shield', color: '#7c3aed', text: 'Fully Secure', sub: 'Encrypted Data', side: 'right', top: '51%' },
      { icon: 'mobile', color: '#00c2ff', text: 'Mobile Ready', sub: 'Android & iOS', side: 'bottom', top: '64%' },
    ],
  },
  { type: 'outro', theme: 'royal', dur: 7.0 },
  { type: 'credits', theme: 'default', dur: 16.4 },
];

// ══════════════════════════════════════════════════════════
//  TEXT TO SPEECH (TTS) VOICE ANNOUNCEMENTS (using local WAVs)
// ══════════════════════════════════════════════════════════
const speechPlaying = {
  speak(text) {
    if (typeof audioEngine !== 'undefined' && typeof audioEngine.playVoice === 'function') {
      audioEngine.playVoice(currentIdx);
    }
  },
  cancel(shouldUnduck = true) {
    if (typeof audioEngine !== 'undefined' && typeof audioEngine.stopVoice === 'function') {
      audioEngine.stopVoice(shouldUnduck);
    }
  }
};

// ══════════════════════════════════════════════════════════

//  GSAP EASES  (exact Alight Motion feel)
// ══════════════════════════════════════════════════════════
// Spring overshoot — for text pop and phone entrance
const SPRING = 'back.out(1.7)';
// Strong spring for dramatic phone spin
const SPRING2 = 'back.out(2.2)';
// Smooth decel — for background and color transitions
const SMOOTH = 'power3.out';
// Elastic — for the accent bar under title
const ELASTIC = 'elastic.out(1, 0.4)';

// ══════════════════════════════════════════════════════════
//  DOM REFS
// ══════════════════════════════════════════════════════════
const $ = id => document.getElementById(id);

const stage = $('stage');
const bgMorph = $('bg-morph');
const introEl = $('intro');
const outroEl = $('outro');
const flashEl = $('flash');
const wipeEl = $('wipe');
const phoneWrap = $('phone-wrap');
const ssA = $('ss-a');
const ssB = $('ss-b');
const ssEmpty = $('ss-empty');
const ttChip = $('tt-chip');
const ttLabel = $('tt-label');
const ttTitle = $('tt-title');
const ttBar = $('tt-bar');
const btMain = $('bt-main');
const btSub = $('bt-sub');
const progBar = $('progress-bar');
const streaks = document.querySelectorAll('.streak');
const rings = document.querySelectorAll('.ring');
const blob1 = document.querySelector('.b1');
const blob2 = document.querySelector('.b2');
const blob3 = document.querySelector('.b3');

// ══════════════════════════════════════════════════════════
//  PARTICLES  (canvas — float upward like Alight Motion bg)
// ══════════════════════════════════════════════════════════
let pColors = ['#5c6bff', '#a855f7', '#22d3ee', '#fbbf24'];
let pts = [];
let pW, pH;

function initParticles() {
  const cvs = $('particles');
  const ctx = cvs.getContext('2d');

  function resize() {
    pW = cvs.width = stage.clientWidth;
    pH = cvs.height = stage.clientHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class P {
    seed(init) {
      this.x = Math.random() * (pW || 360);
      this.y = init ? Math.random() * (pH || 640) : -4;
      this.r = Math.random() * 1.6 + .3;
      this.vx = (Math.random() - .5) * .28;
      this.vy = Math.random() * .4 + .09;
      this.a = Math.random() * .5 + .1;
      this.c = pColors[Math.floor(Math.random() * pColors.length)];
    }
    constructor() { this.seed(true); }
    tick() {
      this.x += this.vx; this.y += this.vy;
      if (this.y > pH + 5) {
        this.seed(false);
        this.c = pColors[Math.floor(Math.random() * pColors.length)];
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.c;
      ctx.globalAlpha = this.a;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }
  for (let i = 0; i < 75; i++) pts.push(new P());
  (function loop() {
    ctx.clearRect(0, 0, pW, pH);
    pts.forEach(p => { p.tick(); p.draw(); });
    requestAnimationFrame(loop);
  })();
}

// ══════════════════════════════════════════════════════════
//  THEME  — GSAP animates CSS vars and element colors
// ══════════════════════════════════════════════════════════
function hex2rgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

function applyTheme(key, duration = 1.0) {
  const t = THEMES[key] || THEMES.default;

  // Animate CSS custom properties via GSAP proxy
  gsap.to(stage, {
    '--bg': t.bg,
    duration: duration,
    ease: SMOOTH,
    onUpdate() {
      stage.style.background = t.bg;
    }
  });

  // Background radial gradient morph — barely perceptible accent tint
  gsap.to(bgMorph, {
    duration: duration,
    ease: SMOOTH,
    onUpdate() {
      const r1 = hex2rgb(t.a1), r2 = hex2rgb(t.a2);
      bgMorph.style.background =
        `radial-gradient(ellipse 55% 40% at 20% 12%, rgba(${r1.r},${r1.g},${r1.b},.006) 0%, transparent 70%),
         radial-gradient(ellipse 55% 40% at 80% 88%, rgba(${r2.r},${r2.g},${r2.b},.003) 0%, transparent 70%)`;
    }
  });

  // Blob colors — GSAP tween
  gsap.to(blob1, { backgroundColor: t.a1, duration: duration, ease: SMOOTH });
  gsap.to(blob2, { backgroundColor: t.a2, duration: duration, ease: SMOOTH });
  gsap.to(blob3, { backgroundColor: t.a3, duration: duration, ease: SMOOTH });

  // Update particle colors
  pColors = [t.a1, t.a2, t.a3, t.g];

  // CSS vars for static references (progress bar, etc.)
  stage.style.setProperty('--a1', t.a1);
  stage.style.setProperty('--a2', t.a2);
  stage.style.setProperty('--a3', t.a3);
  stage.style.setProperty('--g', t.g);
}

// ══════════════════════════════════════════════════════════
//  STREAK ANIMATIONS  (continuous diagonal light rays)
// ══════════════════════════════════════════════════════════
function initStreaks() {
  streaks.forEach((el, i) => {
    const delay = i * 2.5;
    function loop() {
      gsap.fromTo(el,
        { left: '-120%', opacity: 0 },
        {
          left: '100%', opacity: 0,
          duration: 7 + i * 1.5,
          delay,
          ease: 'none',
          keyframes: [
            { left: '-120%', opacity: 0 },
            { left: '-60%', opacity: .7 },
            { left: '100%', opacity: 0 },
          ],
          onComplete: loop,
        }
      );
    }
    gsap.delayedCall(delay, loop);
  });
}

// ══════════════════════════════════════════════════════════
//  PHONE IDLE FLOAT  (always running in background)
// ══════════════════════════════════════════════════════════
let idleTl = null;
function startPhoneIdle() {
  if (idleTl) idleTl.kill();
  idleTl = gsap.to(phoneWrap, {
    rotateY: 4, rotateX: -2, y: -7,
    duration: 2.5,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  });
}

// ══════════════════════════════════════════════════════════
//  PHONE 3D ANIMATION  — GSAP exact Alight Motion motion
// ══════════════════════════════════════════════════════════
function animatePhone(config) {
  // Kill idle animation
  if (idleTl) { idleTl.kill(); idleTl = null; }

  // Reset to neutral first (instant)
  gsap.set(phoneWrap, { rotateY: config.fromY, rotateX: config.fromX, scale: config.fromS, opacity: 1, y: 0 });

  // Animate to target with spring overshoot
  const tl = gsap.timeline({ onComplete: startPhoneIdle });

  if (config.fromS < 0.8) {
    // Dramatic entrance — spring overshoot
    tl.to(phoneWrap, {
      rotateY: config.toY,
      rotateX: config.toX,
      scale: config.toS * 1.08, // overshoot
      y: -6,
      duration: .55,
      ease: SPRING2,
    }).to(phoneWrap, {
      scale: config.toS,
      duration: .3,
      ease: SMOOTH,
    });
  } else {
    // Tilt / lean — smooth spring
    tl.to(phoneWrap, {
      rotateY: config.toY * 1.35, // overshoot
      rotateX: config.toX * 1.4,
      scale: config.toS * 1.04,
      y: -8,
      duration: .5,
      ease: SPRING,
    }).to(phoneWrap, {
      rotateY: config.toY,
      rotateX: config.toX,
      scale: config.toS,
      y: -4,
      duration: .35,
      ease: SMOOTH,
    });
  }
}

// ══════════════════════════════════════════════════════════
//  SCREENSHOT  — GSAP crossfade + entry animation
// ══════════════════════════════════════════════════════════
let activeSS = 'a';

function setScreenshot(src, src8k, type) {
  // Use preview image (src) always to prevent heavy image decoding lag
  const activeSrc = src;

  const front = activeSS === 'a' ? ssA : ssB;
  const back = activeSS === 'a' ? ssB : ssA;

  if (!activeSrc) {
    gsap.to([ssA, ssB], { opacity: 0, duration: .3 });
    gsap.set(ssEmpty, { display: 'flex' });
    return;
  }

  gsap.set(ssEmpty, { display: 'none' });
  back.src = activeSrc;

  // Set initial state by animation type
  const initState = {
    zoom: { scale: 1.4, opacity: 0 },
    slideR: { x: '104%', opacity: 0, scale: 1 },
    slideL: { x: '-104%', opacity: 0, scale: 1 },
    slideU: { y: '65%', opacity: 0, scale: 1 },
    flip: { rotationY: -90, opacity: 0, scale: 1, transformOrigin: '50% 50%' },
  }[type] || { scale: 1.3, opacity: 0 };

  gsap.set(back, initState);

  // Animate in with spring
  const animIn = {
    zoom: { scale: 1, opacity: 1, duration: .55, ease: SPRING },
    slideR: { x: 0, opacity: 1, duration: .55, ease: SPRING },
    slideL: { x: 0, opacity: 1, duration: .55, ease: SPRING },
    slideU: { y: 0, opacity: 1, duration: .55, ease: SPRING },
    flip: { rotationY: 0, opacity: 1, duration: .6, ease: SPRING },
  }[type] || { scale: 1, opacity: 1, duration: .5, ease: SPRING };

  gsap.to(back, animIn);
  gsap.to(front, { opacity: 0, duration: .35, ease: SMOOTH });

  activeSS = activeSS === 'a' ? 'b' : 'a';
}

// ══════════════════════════════════════════════════════════
//  COLOR WIPE  (Alight Motion's signature slide transition)
// ══════════════════════════════════════════════════════════
function doWipe(onMidpoint) {
  const tl = gsap.timeline();
  tl
    .set(wipeEl, { opacity: 1.0 })
    // Sweep across entire stage
    .to(wipeEl, {
      clipPath: 'inset(0 0% 0 0)',
      duration: .25,
      ease: 'power3.in',
    })
    .call(onMidpoint)          // swap content at peak
    .to(wipeEl, {
      clipPath: 'inset(0 0 0 100%)',
      duration: .28,
      ease: 'power3.out',
    })
    .set(wipeEl, { opacity: 0, clipPath: 'inset(0 100% 0 0)' });
}

// ══════════════════════════════════════════════════════════
//  FLASH
// ══════════════════════════════════════════════════════════
function doFlash(v = .35) {
  gsap.fromTo(flashEl,
    { opacity: v },
    { opacity: 0, duration: .35, ease: SMOOTH }
  );
}

// ══════════════════════════════════════════════════════════
//  FLOATING BADGES  (Alight Motion style feature pills)
// ══════════════════════════════════════════════════════════

// Minimal SVG icon paths (Material Design, 24x24 viewBox)
const SVG_ICONS = {
  lock: '<path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>',
  bolt: '<path d="M7 2v11h3v9l7-12h-4l4-8z"/>',
  person: '<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>',
  phone: '<path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02L6.6 10.8z"/>',
  check: '<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>',
  leaf: '<path d="M17 8C8 10 5.9 16.17 3.82 21H5.1c.5-1.03 1.29-2.16 2.4-2.85C8.5 18 10.65 18 12 18c3.31 0 6-2.69 6-6.1V8c-.93.6-1.96 1-3 1-1.64 0-3-1.36-3-3s1.36-3 3-3c2.5 0 4.5 2 4.5 4.5C22 10.9 19.79 13 17 13c-.68 0-1.34-.13-1.94-.36"/>',
  camera: '<path d="M20 5h-3.17L15 3H9L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3z"/>',
  shield: '<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>',
  chart: '<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>',
  search: '<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>',
  list: '<path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>',
  rocket: '<path d="M9.19 6.35c-2.04 2.29-3.44 5.58-3.57 5.89L2 10l4.05-4.05c.47-.47 1.07-.87 1.71-.87.64 0 1.24.4 1.43.4zm11.46 0C18.5 3.01 13.95 2 12 2s-6.5 1.01-8.65 4.35L9 10l1.5-1.5c1.58-1.58 4.02-2.28 5.7-1.53-.76 1.68-1.43 4.12 1.53 5.7L19 11l3.65 5.65C23 14.5 23.06 9.86 20.65 6.35zM7.64 17.64C5.8 19.47 2 20 2 20s.53-3.8 2.36-5.64l6.1 6.1c-1.84 1.83-5.64 2.36-5.64 2.36s.53-3.8 2.36-5.64M9.5 9.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S8 11.83 8 11s.67-1.5 1.5-1.5z"/>',
  globe: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>',
  users: '<path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>',
  gear: '<path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.57 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.21.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>',
  star: '<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>',
  timer: '<path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>',
  export: '<path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>',
  traffic: '<path d="M20 10H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zm-9 9H8v-2h3v2zm0-4H8v-2h3v2zm5 4h-3v-2h3v2zm0-4h-3v-2h3v2zM4 8h16V6H4v2zm2-4h12V2H6v2z"/>',
  school: '<path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>',
  teacher: '<path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm-5 8.95v4l5 2.73 5-2.73v-4l-5 2.73-5-2.73z"/>',
  mobile: '<path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>',
  approve: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>',
};

const badgeEls = {
  left: { wrap: document.getElementById('badge-left'), icon: document.getElementById('badge-left-icon'), text: document.getElementById('badge-left-text'), sub: document.getElementById('badge-left-sub') },
  right: { wrap: document.getElementById('badge-right'), icon: document.getElementById('badge-right-icon'), text: document.getElementById('badge-right-text'), sub: document.getElementById('badge-right-sub') },
  bottom: { wrap: document.getElementById('badge-bottom'), icon: document.getElementById('badge-bottom-icon'), text: document.getElementById('badge-bottom-text'), sub: document.getElementById('badge-bottom-sub') },
};

let badgeFloatTls = [];

function hideBadges(instant = false) {
  badgeFloatTls.forEach(tl => tl && tl.kill());
  badgeFloatTls = [];
  const all = [badgeEls.left.wrap, badgeEls.right.wrap, badgeEls.bottom.wrap];
  if (instant) {
    gsap.set(all, { opacity: 0, display: 'none' });
  } else {
    gsap.to(all, {
      opacity: 0, scale: .8, duration: .2, ease: 'power2.in',
      onComplete() { gsap.set(all, { display: 'none' }); }
    });
  }
}

function showBadges(badges) {
  if (!badges || !badges.length) return;
  hideBadges(true);

  badges.forEach((b, i) => {
    const el = badgeEls[b.side];
    if (!el || !el.wrap) return;

    // Set SVG icon with colored circle background
    const svgPath = SVG_ICONS[b.icon] || SVG_ICONS.check;
    el.icon.style.background = b.color || '#1a73e8';
    el.icon.innerHTML = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="white">${svgPath}</svg>`;

    // Set text content
    el.text.textContent = b.text;
    if (el.sub) el.sub.textContent = b.sub || '';

    // Position override
    if (b.top) el.wrap.style.top = b.top;

    gsap.set(el.wrap, { display: 'flex', opacity: 0, scale: .6 });

    // Staggered spring-in from the sides
    const fromX = b.side === 'left' ? -45 : b.side === 'right' ? 45 : 0;
    const fromY = b.side === 'bottom' ? 22 : 0;
    gsap.set(el.wrap, { x: fromX, y: fromY });

    gsap.to(el.wrap, {
      opacity: 1, scale: 1, x: 0, y: 0,
      duration: .5,
      delay: i * 0.18 + 0.35,
      ease: SPRING2,
    });

    // Play badge pop sound synchronized with spring-in
    const badgeSlideIdx = currentIdx;
    setTimeout(() => {
      if (isRunning && currentIdx === badgeSlideIdx) {
        audioEngine.playBadgeChime();
      }
    }, (i * 0.18 + 0.35) * 1000);

    // Gentle continuous float
    const floatTl = gsap.to(el.wrap, {
      y: b.side === 'bottom' ? '-4px' : b.side === 'left' ? '-7px' : '-5px',
      duration: 1.8 + i * 0.35,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: i * 0.18 + 0.9,
    });
    badgeFloatTls.push(floatTl);
  });
}

// ══════════════════════════════════════════════════════════
//  SPARKLE BURST  (slide transition particles — pooled for zero GC)
// ══════════════════════════════════════════════════════════
const burstContainer = document.getElementById('burst-container');
const BURST_COLORS = ['#1a73e8', '#7c3aed', '#00c2ff', '#fbbf24', '#10b981'];
const BURST_COUNT = 6;  // reduced from 12 — half the DOM work, still looks great

// Pre-create burst dots once and reuse them (zero DOM creation per transition)
const _burstPool = [];
(function buildPool() {
  for (let i = 0; i < BURST_COUNT; i++) {
    const dot = document.createElement('div');
    dot.className = 'burst-dot';
    dot.style.cssText = 'width:6px;height:6px;opacity:0;left:180px;top:320px;';
    burstContainer.appendChild(dot);
    _burstPool.push(dot);
  }
})();

function doBurst() {
  const cx = 180, cy = 320;
  _burstPool.forEach((dot, i) => {
    const size = Math.random() * 6 + 3;
    const color = BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)];
    gsap.set(dot, { x: 0, y: 0, width: size, height: size, background: color, opacity: 1, scale: 1 });
    const angle = (i / BURST_COUNT) * Math.PI * 2;
    const dist = Math.random() * 80 + 40;
    gsap.to(dot, {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
      opacity: 0,
      scale: 0,
      duration: .5 + Math.random() * .2,
      ease: 'power2.out',
    });
  });
}

// ══════════════════════════════════════════════════════════
//  TEXT ANIMATIONS  — LETTER BY LETTER (Alight Motion exact)
// ══════════════════════════════════════════════════════════
function animateTextIn(chip, titleText, btMainText, btSubText) {
  // Build letter spans
  ttTitle.innerHTML = '';
  const lines = titleText.split('\n');
  lines.forEach((line, li) => {
    for (const ch of line) {
      const s = document.createElement('span');
      s.className = 'dp-char';
      s.textContent = ch === ' ' ? '\u00A0' : ch;
      ttTitle.appendChild(s);
    }
    if (li < lines.length - 1) ttTitle.appendChild(document.createElement('br'));
  });

  ttLabel.textContent = chip || '';
  btMain.textContent = btMainText || '';
  btSub.textContent = btSubText || '';

  const chars = ttTitle.querySelectorAll('.dp-char');

  // Reset everything — restore ttTitle container opacity (restart/download sets it to 0)
  gsap.set(ttTitle, { opacity: 1 });
  // Kill any lingering tweens on text elements to prevent frozen states
  gsap.killTweensOf([ttChip, ttBar, btMain, btSub]);
  gsap.set([ttChip, ttBar, btMain, btSub], { opacity: 0 });
  gsap.set(ttChip, { y: -20, scale: .75 });
  gsap.set(chars, { scale: 3, y: -15, opacity: 0, rotateZ: -8 });
  gsap.set(btMain, { y: 10, scale: .95 });
  gsap.set(btSub, { y: 6 });
  gsap.set(ttBar, { width: 0 });

  const tl = gsap.timeline();

  // 1. Chip badge — spring pop
  tl.to(ttChip, {
    opacity: 1, y: 0, scale: 1,
    duration: .45, ease: SPRING,
  }, 0);

  // 2. Letters — stagger spring pop (exact Alight Motion)
  tl.to(chars, {
    scale: 1, y: 0, opacity: 1, rotateZ: 0,
    duration: .32,
    stagger: { amount: chars.length * .048, ease: 'power1.in' },
    ease: SPRING2,
  }, 0.05);

  // 3. Accent bar — elastic stretch
  tl.to(ttBar, {
    width: 85, opacity: 1,
    duration: .6, ease: ELASTIC,
  }, 0.25);

  // 4. Bottom main — spring from below
  tl.to(btMain, {
    opacity: 1, y: 0, scale: 1,
    duration: .4, ease: SPRING,
  }, 0.25);

  // 5. Bottom sub — fade up
  tl.to(btSub, {
    opacity: 1, y: 0,
    duration: .35, ease: SMOOTH,
  }, 0.35);
}

function animateTextOut() {
  return gsap.to([ttChip, ttTitle, ttBar, btMain, btSub], {
    opacity: 0, y: -10, scale: .95,
    duration: .22, ease: 'power2.in',
    stagger: .04,
  });
}

// ══════════════════════════════════════════════════════════
//  PROGRESS BAR  — GSAP tween
// ══════════════════════════════════════════════════════════
const totalDur = SLIDES.reduce((a, s) => a + s.dur, 0);

function setProgress(idx) {
  if (!progBar) return;
  let elapsed = 0;
  for (let i = 0; i < idx; i++) elapsed += SLIDES[i].dur;
  gsap.to(progBar, {
    width: (elapsed / totalDur * 100) + '%',
    duration: SLIDES[idx]?.dur || 0,
    ease: 'none',
  });
}

// ══════════════════════════════════════════════════════════
//  INTRO ANIMATION  — GSAP timeline (Alight Motion quality)
// ══════════════════════════════════════════════════════════
function playIntro() {
  return new Promise(resolve => {
    const tl = gsap.timeline({ onComplete: resolve });

    // Set stage visible instantly without blank fade-in
    tl.set(introEl, { opacity: 1, pointerEvents: 'auto' });

    // Rings pulse
    tl.from(rings, {
      scale: .5, opacity: 0, duration: .8, stagger: .15, ease: SPRING,
    }, 0);

    // Loop rings (continuous)
    rings.forEach((ring, i) => {
      gsap.to(ring, {
        scale: 1.06, opacity: 1,
        duration: 1.5 + i * .3,
        ease: 'sine.inOut',
        yoyo: true, repeat: -1,
        delay: i * .4,
      });
    });

    // Icon dramatic entrance zoom
    tl.fromTo($('intro-icon'),
      { scale: .2, opacity: 0 },
      { scale: 1, opacity: 1, duration: .8, ease: SPRING2 },
      0.05
    );

    // Continuous Icon pulse (subtle, high-performance scale pulse)
    gsap.to($('intro-icon'), {
      scale: 1.08,
      duration: 1.3,
      ease: 'sine.inOut',
      yoyo: true, repeat: -1,
      delay: .9,
    });

    // Logo dramatic zoom — EXACT Alight Motion 3D flip-scale
    tl.fromTo($('intro-logo'),
      { scale: 3.5, rotationY: 30, opacity: 0 },
      { scale: 1, rotationY: 0, opacity: 1, duration: 1.0, ease: SPRING2 },
      0.15
    );

    // Line expand
    tl.fromTo($('intro-line'),
      { width: 0, opacity: 0 },
      { width: 80, opacity: 1, duration: .5, ease: ELASTIC },
      0.85
    );

    // Tag fade up
    tl.fromTo($('intro-tag'),
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: .45, ease: SMOOTH },
      1.0
    );
  });
}

// ══════════════════════════════════════════════════════════
//  OUTRO ANIMATION  — GSAP timeline
// ══════════════════════════════════════════════════════════
function playOutro() {
  const outroLogo = $('outro-logo');
  const tl = gsap.timeline();

  tl.set(outroEl, { opacity: 0, pointerEvents: 'auto' });
  tl.to(outroEl, { opacity: 1, duration: .6, ease: SMOOTH });

  // Glow pulse
  gsap.to($('outro-glow'), {
    scale: 1.12, opacity: 1,
    duration: 2, ease: 'sine.inOut',
    yoyo: true, repeat: -1,
  });

  // Logo and Icon zoom
  tl.fromTo([outroLogo, $('outro-icon')],
    { scale: .4, opacity: 0 },
    { scale: 1, opacity: 1, duration: .8, ease: SPRING2 },
    .2
  );

  // Logo subtle pulse (no dark mode glow)
  gsap.to(outroLogo, {
    scale: 1.04,
    duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1,
    delay: .8,
  });

  // Stagger in the rest including the new cta button (using fromTo to ensure opacity animates to 1)
  tl.fromTo([$('outro-rule'), $('outro-badge'), $('outro-headline'), $('outro-btn'), $('outro-footer')],
    { y: 22, opacity: 0 },
    { y: 0, opacity: 1, duration: .45, stagger: .14, ease: SPRING },
    .6
  );
}

// ══════════════════════════════════════════════════════════
//  CREDITS ANIMATION
// ══════════════════════════════════════════════════════════
function playCredits() {
  const credEl = $('credits');
  const tl = gsap.timeline();

  tl.set(credEl, { opacity: 0, pointerEvents: 'auto' });
  tl.to(credEl, { opacity: 1, duration: 0.6, ease: SMOOTH });

  // Photo banner — slides in from top with a gentle Ken Burns scale
  tl.fromTo($('cred-photo'),
    { y: '-6%', opacity: 0, scale: 1.06, filter: 'grayscale(15%) brightness(0.6)' },
    { y: '0%', opacity: 1, scale: 1, filter: 'grayscale(15%) brightness(0.88)', duration: 1.1, ease: SMOOTH },
    0.1
  );

  // Developed by label — fades up
  tl.fromTo($('cred-label'),
    { y: 10, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.45, ease: SMOOTH },
    0.9
  );

  // Team title — clean slide up
  tl.fromTo($('cred-title'),
    { y: 12, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.45, ease: SPRING },
    1.05
  );

  // Divider line — expand from center
  tl.fromTo($('cred-rule'),
    { width: 0, opacity: 0 },
    { width: '88%', opacity: 1, duration: 0.55, ease: 'power2.out' },
    1.35
  );

  // Member name rows — clean stagger from below
  const members = document.querySelectorAll('.cred-member');
  tl.fromTo(members,
    { x: -12, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.38, stagger: 0.12, ease: SMOOTH },
    1.55
  );

  // Under guidance label — fades up
  tl.fromTo($('cred-guide-label'),
    { y: 10, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.45, ease: SMOOTH },
    1.8
  );

  // Under guidance title — clean slide up
  tl.fromTo($('cred-guide-title'),
    { y: 12, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.45, ease: SPRING },
    1.95
  );

  // Under guidance divider line — expand from center
  tl.fromTo($('cred-guide-rule'),
    { width: 0, opacity: 0 },
    { width: '88%', opacity: 1, duration: 0.55, ease: 'power2.out' },
    2.25
  );

  // Guide name rows — clean stagger from below
  const guides = document.querySelectorAll('.cred-guide');
  tl.fromTo(guides,
    { x: -12, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.38, stagger: 0.12, ease: SMOOTH },
    2.45
  );

  // Footer
  tl.fromTo($('cred-footer'),
    { opacity: 0 },
    { opacity: 1, duration: 0.4, ease: SMOOTH },
    2.9
  );
}

// ══════════════════════════════════════════════════════════
//  SLIDE ENGINE
// ══════════════════════════════════════════════════════════
let currentIdx = -1;
let slideTimer = null;
let isRunning = false;
let currentRunId = 0;

async function showSlide(idx, runId) {
  if (runId !== currentRunId || !isRunning) return;
  if (idx >= SLIDES.length) { onEnd(runId); return; }
  speechPlaying.cancel(false);
  currentIdx = idx;
  const s = SLIDES[idx];

  // Play transition sound effects
  if (s.type === 'intro') {
    audioEngine.playIntroImpact();
  } else if (s.type === 'outro') {
    audioEngine.playOutroImpact();
  } else {
    audioEngine.playSwoosh();
  }

  setProgress(idx);

  // ── Preload NEXT slide image now so decode finishes before transition ──
  const nextSlide = SLIDES[idx + 1];
  if (nextSlide && nextSlide.img) {
    const preImg = new Image();
    preImg.decoding = 'async';
    preImg.src = nextSlide.img;  // warms browser cache; zero lag at transition time
  }

  // INTRO
  if (s.type === 'intro') {
    gsap.set(outroEl, { opacity: 0, pointerEvents: 'none' });
    applyTheme(s.theme);
    speechPlaying.speak("Welcome to Sistec Digital Pass.");
    await playIntro();
    if (runId !== currentRunId || !isRunning) return;
    slideTimer = setTimeout(() => {
      if (runId !== currentRunId || !isRunning) return;
      gsap.to(introEl, {
        opacity: 0, duration: .6, ease: SMOOTH, onComplete: () => {
          introEl.style.pointerEvents = 'none';
        }
      });
      showSlide(idx + 1, runId);
    }, Math.max(0, s.dur - 0.6) * 1000);
    return;
  }

  // OUTRO
  if (s.type === 'outro') {
    gsap.set(introEl, { opacity: 0, pointerEvents: 'none' });
    gsap.set($('credits'), { opacity: 0, pointerEvents: 'none' });
    hideBadges(false);  // fade out badges before outro
    doFlash(.6);
    applyTheme(s.theme);
    speechPlaying.speak("Go paperless. Go digital. Get started today.");
    playOutro();
    slideTimer = setTimeout(() => {
      if (runId !== currentRunId || !isRunning) return;
      showSlide(idx + 1, runId);
    }, s.dur * 1000);
    return;
  }

  // CREDITS
  if (s.type === 'credits') {
    gsap.set(outroEl, { opacity: 0, pointerEvents: 'none' });
    gsap.set(introEl, { opacity: 0, pointerEvents: 'none' });
    // Completely remove phone, text, badges, and progress bar from render
    $('phone-scene').style.display = 'none';
    $('top-text').style.display = 'none';
    $('bottom-text').style.display = 'none';
    const prog = $('progress');
    if (prog) prog.style.display = 'none';
    hideBadges(true);
    doFlash(.3);
    applyTheme(s.theme);
    speechPlaying.speak("Developed by the team, guided by the mentors.");
    playCredits();

    // Smoothly fade out music during credits slide so it ends professionally (starting at 14s of the 18s slide)
    setTimeout(() => {
      if (runId === currentRunId && isRunning) {
        audioEngine.fadeOutBGM(4.0);
      }
    }, 14000);

    slideTimer = setTimeout(() => {
      if (runId !== currentRunId || !isRunning) return;
      onEnd(runId);
    }, s.dur * 1000);
    return;
  }

  // NORMAL SLIDE — wipe transition then populate content
  const populate = () => {
    if (runId !== currentRunId || !isRunning) return;
    gsap.set(introEl, { opacity: 0, pointerEvents: 'none' });
    gsap.set(outroEl, { opacity: 0, pointerEvents: 'none' });
    applyTheme(s.theme);
    animatePhone(s.phone);
    setScreenshot(s.img, s.img8k, s.ss);
    animateTextIn(s.chip, s.title, s.bt, s.bs);
    // Show floating badges for this slide
    showBadges(s.badges);
    speechPlaying.speak(s.title);
  };

  if (idx === 1) {
    // First content slide — no wipe, no burst
    hideBadges(true);
    populate();
  } else {
    // Hide badges, do sparkle burst, then wipe between slides
    hideBadges(false);
    gsap.delayedCall(0.15, doBurst);
    doWipe(populate);
  }

  slideTimer = setTimeout(() => {
    if (runId !== currentRunId || !isRunning) return;
    showSlide(idx + 1, runId);
  }, s.dur * 1000);
}

function onEnd(runId) {
  audioEngine.stopBGM();
  speechPlaying.cancel();
  // If we're in recording mode, delegate to the recording handler
  if (isRecording && window._recOnEnd) {
    window._recOnEnd(runId);
    return;
  }
  if (runId !== currentRunId) return;
  isRunning = false;
  if (progBar) gsap.to(progBar, { width: '100%', duration: .2, ease: SMOOTH });
}

// ══════════════════════════════════════════════════════════
//  PUBLIC CONTROLS
// ══════════════════════════════════════════════════════════

// Preload either preview (1080px) or 8K assets depending on mode
function preloadAll(use8k = false) {
  SLIDES.forEach(s => {
    const src = use8k ? (s.img8k || s.img) : s.img;
    if (src) {
      const i = new Image();
      i.decoding = 'async'; // non-blocking decode
      i.src = src;
    }
  });
}

function startShow() {
  if (isRunning) return;
  _resetDisplay();
  audioEngine.startBGM();
  isRunning = true;
  currentRunId++;
  preloadAll();
  if (progBar) gsap.set(progBar, { width: '0%' });

  // Debug helper to start at a specific slide index (e.g. ?slide=14 for credits)
  const urlParams = new URLSearchParams(window.location.search);
  const slideParam = urlParams.get('slide');
  const startIdx = slideParam !== null ? parseInt(slideParam, 10) : 0;

  showSlide(startIdx, currentRunId);
}

function restartShow() {
  audioEngine.stopBGM();
  speechPlaying.cancel();
  clearTimeout(slideTimer);
  isRunning = false;
  currentRunId++;
  if (idleTl) { idleTl.kill(); idleTl = null; }
  hideBadges(true);  // instantly clear badges on restart

  // Kill running GSAP tweens on content elements to prevent ghost/overlapping animations
  gsap.killTweensOf([
    introEl, outroEl, wipeEl, ssA, ssB, ssEmpty, phoneWrap,
    ttChip, ttBar, btMain, btSub, progBar, flashEl,
    '#intro *', '#outro *', '#phone-scene *', '#top-text *', '#bottom-text *', '#credits *'
  ]);

  _resetDisplay();
  gsap.set(introEl, { opacity: 1, pointerEvents: 'auto' });
  gsap.set(outroEl, { opacity: 0, pointerEvents: 'none' });
  gsap.set($('credits'), { opacity: 0, pointerEvents: 'none' });
  gsap.set($('phone-scene'), { opacity: 1 });
  const prog = $('progress');
  if (prog) prog.style.opacity = '';
  gsap.set([ssA, ssB], { opacity: 0 });
  gsap.set(ssEmpty, { display: 'flex' });
  gsap.set(phoneWrap, { rotateY: 0, rotateX: 0, scale: 1, y: 0 });
  gsap.set([
    ttChip, ttTitle, ttBar, btMain, btSub,
    $('outro-btn'), $('outro-icon'), $('intro-icon'),
    $('cred-label'), $('cred-title'), $('cred-rule'),
    $('cred-guide-label'), $('cred-guide-title'), $('cred-guide-rule')
  ], { opacity: 0 });
  gsap.set(document.querySelectorAll('.cred-member, .cred-guide'), { opacity: 0 });
  gsap.set($('intro-icon'), { scale: 1 });
  if (progBar) gsap.set(progBar, { width: '0%' });

  // Hide inner elements of intro so they don't flash before animation begins
  gsap.set(['#intro-icon', '#intro-logo', '#intro-line', '#intro-tag', '.ring'], { opacity: 0 });

  applyTheme('default', 0);
  setTimeout(startShow, 300);
}

// ══════════════════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════════════════
function init() {
  _resetDisplay();
  gsap.set(introEl, { opacity: 0, pointerEvents: 'none' });
  gsap.set(outroEl, { opacity: 0, pointerEvents: 'none' });
  gsap.set(wipeEl, { opacity: 0, clipPath: 'inset(0 100% 0 0)' });
  gsap.set(ssEmpty, { display: 'flex' });
  gsap.set([ssA, ssB], { opacity: 0, scale: 1 });
  gsap.set([ttChip, ttBar, btMain, btSub, $('outro-btn'), $('outro-icon'), $('intro-icon')], { opacity: 0 });
  gsap.set($('intro-icon'), { scale: 1 });
  gsap.set(ttTitle, { opacity: 1 }); // letters inside are opacity:0
  if (progBar) gsap.set(progBar, { width: '0%' });

  initParticles();
  initStreaks();
  startPhoneIdle();
  applyTheme('default', 0);

  // Warm up all preview images immediately so first-play is lag-free
  preloadAll(false);

  // Warm-start loading the professional background music and voice announcements
  setTimeout(() => {
    audioEngine.loadBGM().catch(() => { });
    audioEngine.preloadVoices().catch(() => { });
  }, 1000);
}

// ══════════════════════════════════════════════════════════
//  DOWNLOAD VIDEO — Maximum Quality (8K Ultra HD)
//  Strategy:
//    1. Scale #stage to fill viewport (max source pixels)
//    2. Screen capture at 60fps, request highest resolution
//    3. Crop stage region → draw to 8K canvas (4320×7680)
//    4. Encode at 200Mbps VP9 for true near-lossless 8K quality
// ══════════════════════════════════════════════════════════
let isRecording = false;
let recMediaRec = null;
let recChunks = [];
let recStream = null;
let recVideo = null;
let recAnimId = null;
let recCanvas = null;
let recCtx = null;

// Output resolution — 2K Quad HD 9:16 portrait (1440 × 2560)
const OUT_W = 1440;
const OUT_H = 2560;

// Elements to hide during recording for max stage area
const _ctrlEl = document.getElementById('controls');
const _hintEl = document.getElementById('controls-hint');
const _stageEl = document.getElementById('stage');

// Store original stage CSS values
let _origStageW, _origStageH, _origStageBR, _origStageMargin;
let _origCssVarPW, _origCssVarPH, _origCssVarPR;

function _scaleStageUp() {
  // Measure maximum scale so stage fills viewport height (9:16 ratio)
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // We want: stageH * scale = vh * 0.98   →   scale = vh * 0.98 / 640
  // Also check width fits:  stageW * scale ≤ vw * 0.98
  const scaleByH = (vh * 0.98) / 640;
  const scaleByW = (vw * 0.98) / 360;
  const scale = Math.min(scaleByH, scaleByW);

  const newW = Math.round(360 * scale);
  const newH = Math.round(640 * scale);

  // Save originals
  _origStageW = _stageEl.style.width;
  _origStageH = _stageEl.style.height;
  _origStageBR = _stageEl.style.borderRadius;
  _origStageMargin = _stageEl.style.margin;
  _origCssVarPW = _stageEl.style.getPropertyValue('--pw');
  _origCssVarPH = _stageEl.style.getPropertyValue('--ph');
  _origCssVarPR = _stageEl.style.getPropertyValue('--pr');

  // Hide UI chrome
  if (_ctrlEl) _ctrlEl.style.display = 'none';
  if (_hintEl) _hintEl.style.display = 'none';

  // Resize stage
  _stageEl.style.width = newW + 'px';
  _stageEl.style.height = newH + 'px';
  _stageEl.style.borderRadius = '0';
  _stageEl.style.margin = '1px auto';

  // Scale phone proportionally (CSS custom properties)
  const phonePW = Math.round(230 * scale);
  const phonePH = Math.round(468 * scale);
  const phonePR = Math.round(9 * scale);
  _stageEl.style.setProperty('--pw', phonePW + 'px');
  _stageEl.style.setProperty('--ph', phonePH + 'px');
  _stageEl.style.setProperty('--pr', phonePR + 'px');

  // Resize particle canvas to match new stage size
  const cvs = document.getElementById('particles');
  if (cvs) { cvs.width = newW; cvs.height = newH; }

  return { scale, newW, newH };
}

function _resetDisplay() {
  const pc = $('phone-scene');
  if (pc) pc.style.display = '';
  const tt = $('top-text');
  if (tt) tt.style.display = '';
  const bt = $('bottom-text');
  if (bt) bt.style.display = '';
  const prog = $('progress');
  if (prog) prog.style.display = '';
}

function _restoreStage() {
  if (_ctrlEl) _ctrlEl.style.display = '';
  if (_hintEl) _hintEl.style.display = '';
  _resetDisplay();

  _stageEl.style.width = _origStageW || '';
  _stageEl.style.height = _origStageH || '';
  _stageEl.style.borderRadius = _origStageBR || '';
  _stageEl.style.margin = _origStageMargin || '';

  _stageEl.style.setProperty('--pw', _origCssVarPW || '230px');
  _stageEl.style.setProperty('--ph', _origCssVarPH || '468px');
  _stageEl.style.setProperty('--pr', _origCssVarPR || '9px');

  const cvs = document.getElementById('particles');
  if (cvs) { cvs.width = 360; cvs.height = 640; }
}

let recStartTime = 0;

async function downloadVideo() {
  if (isRecording) return;

  const btn = $('btn-download');
  btn.textContent = '⏳ Preparing...';
  btn.disabled = true;

  // Stop background music if it was playing in preview
  audioEngine.stopBGM();
  speechPlaying.cancel();

  // ── Step 0: Reset animation state first (so capture stream starts on a clean intro stage) ──
  clearTimeout(slideTimer);
  currentRunId++;
  isRunning = false;
  if (idleTl) { idleTl.kill(); idleTl = null; }
  hideBadges(true);
  _resetDisplay();

  gsap.killTweensOf([
    introEl, outroEl, wipeEl, ssA, ssB, ssEmpty, phoneWrap,
    ttChip, ttBar, btMain, btSub, progBar, flashEl,
    '#intro *', '#outro *', '#phone-scene *', '#top-text *', '#bottom-text *'
  ]);
  gsap.set(introEl, { opacity: 1, pointerEvents: 'auto' });
  gsap.set(outroEl, { opacity: 0, pointerEvents: 'none' });
  gsap.set($('credits'), { opacity: 0, pointerEvents: 'none' });
  gsap.set([ssA, ssB], { opacity: 0 });
  gsap.set(ssEmpty, { display: 'flex' });
  gsap.set(phoneWrap, { rotateY: 0, rotateX: 0, scale: 1, y: 0 });
  gsap.set([ttChip, ttTitle, ttBar, btMain, btSub,
    $('outro-btn'), $('outro-icon'), $('intro-icon')], { opacity: 0 });
  gsap.set($('intro-icon'), { scale: 1 });
  if (progBar) gsap.set(progBar, { width: '0%' });
  applyTheme('default', 0);

  // Hide inner elements of intro so they don't flash before animation begins
  gsap.set(['#intro-icon', '#intro-logo', '#intro-line', '#intro-tag', '.ring'], { opacity: 0 });

  // ── Step 1: Preload preview images (non-blocking, in background) ──
  preloadAll(false);

  // ── Step 2: Scale stage UP for maximum capture resolution ──
  const { scale: stageScale } = _scaleStageUp();

  // Give browser time to reflow + repaint at new size
  await new Promise(r => setTimeout(r, 400));

  // ── Step 3: Request screen capture ──
  try {
    recStream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        frameRate: { ideal: 30, max: 30 },
        width: { ideal: 7680 },
        height: { ideal: 4320 },
        cursor: 'never',
      },
      audio: false,
      preferCurrentTab: true,
      selfBrowserSurface: 'include',
    });
  } catch {
    _restoreStage();
    btn.textContent = '⬇ Download Video';
    btn.disabled = false;
    return;
  }

  isRecording = true;
  $('btn-play').disabled = true;
  $('btn-restart').disabled = true;
  btn.textContent = '🔴 Recording...';

  // ── Step 4: Create output canvas ──
  recCanvas = document.createElement('canvas');
  recCanvas.width = OUT_W;   // 2160 (4K width)
  recCanvas.height = OUT_H;  // 3840 (4K height)
  recCtx = recCanvas.getContext('2d', { alpha: false, willReadFrequently: false });
  recCtx.imageSmoothingEnabled = true;
  recCtx.imageSmoothingQuality = 'high';

  // ── Step 5: Decode stream into hidden <video> ──
  recVideo = document.createElement('video');
  recVideo.srcObject = recStream;
  recVideo.muted = true;
  recVideo.playsInline = true;
  await recVideo.play().catch(e => console.warn('[rec] video play:', e));

  // Wait for first frame metadata
  await new Promise(r => { recVideo.onloadedmetadata = r; setTimeout(r, 600); });

  const captVideoTrack = recStream.getVideoTracks()[0];
  const settings = captVideoTrack.getSettings();
  const captW = settings.width || recVideo.videoWidth || window.innerWidth;
  const captH = settings.height || recVideo.videoHeight || window.innerHeight;

  // Pixel ratio between capture resolution and CSS viewport
  const pixRatioX = captW / window.innerWidth;
  const pixRatioY = captH / window.innerHeight;

  // Measure crop rect once outside loop to prevent layout thrashing (causes CPU lag and audio stutter)
  const rect = _stageEl.getBoundingClientRect();
  const sx = rect.left * pixRatioX;
  const sy = rect.top * pixRatioY;
  const sw = rect.width * pixRatioX;
  const sh = rect.height * pixRatioY;

  // ── Step 6: Frame-by-frame crop → draw to 4K canvas (throttled to 30 FPS to prevent audio lag) ──
  let lastDrawTime = performance.now();
  const fpsInterval = 1000 / 30; // ~33.3ms

  function drawFrame(timestamp) {
    if (!isRecording) return;
    recAnimId = requestAnimationFrame(drawFrame);

    const now = timestamp || performance.now();
    const elapsed = now - lastDrawTime;
    if (elapsed < fpsInterval) return;

    lastDrawTime = now - (elapsed % fpsInterval);
    recCtx.drawImage(recVideo, sx, sy, sw, sh, 0, 0, OUT_W, OUT_H);
  }

  // Start drawing static frame to canvas
  drawFrame();

  // Wait 400ms for browser video buffer to stabilize on the canvas
  await new Promise(r => setTimeout(r, 400));

  // ── Step 7: Configure MediaRecorder (Prefer MP4) ──
  const mime = [
    'video/mp4;codecs=avc1.424028',
    'video/mp4',
    'video/webm;codecs=vp9',
    'video/webm;codecs=vp8',
    'video/webm',
  ].find(t => MediaRecorder.isTypeSupported(t)) || '';

  recChunks = [];
  const canvasStream = recCanvas.captureStream(30);
  const videoTrack = canvasStream.getVideoTracks()[0];

  // Initialize and retrieve the synthesizer/music audio track
  audioEngine.init();
  if (audioEngine.ctx && audioEngine.ctx.state === 'suspended') {
    await audioEngine.ctx.resume().catch(e => console.warn('Ctx resume error:', e));
  }
  const audioTrack = audioEngine.getRecordingTrack();

  // Combine video and audio tracks in a new MediaStream to ensure MediaRecorder registers both
  const combinedStream = new MediaStream();
  if (videoTrack) combinedStream.addTrack(videoTrack);
  if (audioTrack) combinedStream.addTrack(audioTrack);

  recMediaRec = new MediaRecorder(combinedStream, Object.assign(
    {
      videoBitsPerSecond: 25_000_000,   // 25 Mbps — crisp 2K Quad HD
      audioBitsPerSecond: 320_000       // Studio-quality stereo audio (320 kbps)
    },
    mime ? { mimeType: mime } : {}
  ));

  recMediaRec.ondataavailable = e => { if (e.data.size) recChunks.push(e.data); };

  recMediaRec.onstop = () => {
    cancelAnimationFrame(recAnimId);
    audioEngine.stopBGM();
    audioEngine.stopRecordingStream();

    // Stop screen capture stream
    if (recStream) { recStream.getTracks().forEach(t => t.stop()); recStream = null; }

    // Release hidden video element
    if (recVideo) { recVideo.pause(); recVideo.srcObject = null; recVideo = null; }

    // Shrink canvas to 1x1 to free GPU VRAM
    if (recCanvas) { recCanvas.width = 1; recCanvas.height = 1; recCanvas = null; recCtx = null; }

    // Release phone screen elements
    ssA.src = '';
    ssB.src = '';

    // Restore stage layout
    _restoreStage();

    const duration = Date.now() - recStartTime;
    const buggyBlob = new Blob(recChunks, { type: mime || 'video/webm' });
    recChunks = [];   // free chunk memory

    const triggerDownload = (finalBlob) => {
      const url = URL.createObjectURL(finalBlob);
      const a = document.createElement('a');
      a.href = url;
      const extension = mime.includes('mp4') ? 'mp4' : 'webm';
      a.setAttribute('download', `SISTec_DigitalPass_4K.${extension}`);
      document.body.appendChild(a);

      // Programmatic click using standards-compliant MouseEvent for cross-browser file naming
      const clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      });
      a.dispatchEvent(clickEvent);

      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 10000);

      btn.textContent = '\u2714 Downloaded!';
      setTimeout(() => {
        btn.textContent = '\u2b07 Download Video';
        btn.disabled = false;
        $('btn-play').disabled = false;
        $('btn-restart').disabled = false;
      }, 3000);

      // Re-warm preview images
      preloadAll(false);

      isRecording = false;
      window._recOnEnd = null;
    };

    if (mime.includes('webm') && typeof ysFixWebmDuration === 'function') {
      ysFixWebmDuration(buggyBlob, duration, { logger: false })
        .then(triggerDownload)
        .catch(e => {
          console.warn('ysFixWebmDuration failed, downloading raw webm:', e);
          triggerDownload(buggyBlob);
        });
    } else {
      triggerDownload(buggyBlob);
    }
  };

  // ── Step 8: Auto-stop when animation ends ──
  const recordRunId = currentRunId + 1;
  window._recOnEnd = function (runId) {
    if (runId !== recordRunId) return;
    isRunning = false;
    if (progBar) gsap.to(progBar, { width: '100%', duration: .2, ease: SMOOTH });
    setTimeout(() => {
      if (recMediaRec && recMediaRec.state === 'recording') {
        recMediaRec.stop();
      }
    }, 1500);
  };

  // ── Step 9: Start MediaRecorder ──
  recMediaRec.start(100);
  recStartTime = Date.now();
  audioEngine.startBGM();

  // ── Step 10: Start animation instantly (0ms delay) ──
  isRunning = true;
  currentRunId++;
  preloadAll();
  if (progBar) gsap.set(progBar, { width: '0%' });
  showSlide(0, currentRunId);

  // Progress indicator
  let elapsed = 0;
  const updateBtn = setInterval(() => {
    if (!isRecording) { clearInterval(updateBtn); return; }
    elapsed++;
    const pct = Math.min(100, Math.round(elapsed / totalDur * 100));
    btn.textContent = `🔴 ${pct}% — 4K Recording`;
  }, 1000);
}

// ══════════════════════════════════════════════════════════
//  DYNAMIC AUDIO ENGINE  — Web Audio API Synthesizers
// ══════════════════════════════════════════════════════════
const audioEngine = {
  ctx: null,
  masterGain: null,
  bgmGain: null,
  voiceGain: null,
  compressor: null,
  recDestination: null,
  isPlaying: false,
  bgmBuffer: null,
  bgmSource: null,
  noiseBuffer: null,
  isLoading: false,
  voiceBuffers: {},
  eventsLog: [],
  isFadingBGM: false,

  logEvent(action, value) {
    const time = this.ctx ? this.ctx.currentTime.toFixed(3) : '0.000';
    const msg = `[Audio Context Time: ${time}s] ${action} -> Target Volume: ${value}`;
    console.log(msg);
    if (this.eventsLog) this.eventsLog.push(msg);
  },

  init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContextClass({ latencyHint: 'playback' });

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.7; // clean comfortable volume level (increased from 0.5 for energy)

    // Create separate bgmGain node to allow independent ducking/volume control
    this.bgmGain = this.ctx.createGain();
    this.bgmGain.gain.setValueAtTime(1.0, this.ctx.currentTime);
    this.bgmGain.connect(this.masterGain);

    // Create voiceGain node to boost narration voice independently
    this.voiceGain = this.ctx.createGain();
    this.voiceGain.gain.setValueAtTime(1.8, this.ctx.currentTime); // Boost voice volume by 1.8x
    this.voiceGain.connect(this.masterGain);

    // Create DynamicsCompressorNode to act as a professional limiter/glue
    this.compressor = this.ctx.createDynamicsCompressor();
    this.compressor.threshold.setValueAtTime(-12, this.ctx.currentTime);
    this.compressor.knee.setValueAtTime(30, this.ctx.currentTime);
    this.compressor.ratio.setValueAtTime(4, this.ctx.currentTime);
    this.compressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
    this.compressor.release.setValueAtTime(0.08, this.ctx.currentTime);

    // Route: masterGain -> compressor -> speakers
    this.masterGain.connect(this.compressor);
    this.compressor.connect(this.ctx.destination);

    // Echo/Delay line for ambient tech space feel of sound effects
    this.delayNode = this.ctx.createDelay(1.0);
    this.delayNode.delayTime.value = 0.375; // dotted eighth delay at 120 BPM
    this.delayFeedback = this.ctx.createGain();
    this.delayFeedback.gain.value = 0.3;

    this.delayNode.connect(this.delayFeedback);
    this.delayFeedback.connect(this.delayNode);
    this.delayNode.connect(this.masterGain);

    // Pre-create noise buffer once to prevent CPU spikes and GC stutter during transitions
    const bufferSize = this.ctx.sampleRate * 1.0;
    this.noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = this.noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
  },

  async loadBGM() {
    if (this.bgmBuffer || this.isLoading) return;
    this.isLoading = true;
    try {
      if (!this.ctx) this.init();
      const response = await fetch(`assets/bgm.m4a?v=${Date.now()}`);
      const arrayBuffer = await response.arrayBuffer();
      this.bgmBuffer = await this.ctx.decodeAudioData(arrayBuffer);
    } catch (e) {
      console.error('Failed to load BGM:', e);
    } finally {
      this.isLoading = false;
    }
  },

  getRecordingTrack() {
    if (!this.ctx) this.init();

    // Reset previous recording destination if any to prevent leaks
    if (this.recDestination) {
      this.stopRecordingStream();
    }

    this.recDestination = this.ctx.createMediaStreamDestination();
    // Route the compressed/limited master output to the recorder
    this.compressor.connect(this.recDestination);

    const audioTracks = this.recDestination.stream.getAudioTracks();
    return audioTracks[0] || null;
  },

  stopRecordingStream() {
    if (this.recDestination && this.compressor) {
      try {
        this.compressor.disconnect(this.recDestination);
      } catch (e) { }
      this.recDestination = null;
    }
  },

  startBGM() {
    if (!this.ctx) this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isFadingBGM = false;
    if (this.masterGain) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
    }
    if (this.bgmGain) {
      this.bgmGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.bgmGain.gain.setValueAtTime(1.0, this.ctx.currentTime); // Ensure reset on start
    }
    this.logEvent('startBGM', 1.0);
    if (this.isPlaying) return;
    this.isPlaying = true;

    if (this.bgmBuffer) {
      this.bgmSource = this.ctx.createBufferSource();
      this.bgmSource.buffer = this.bgmBuffer;
      this.bgmSource.loop = true;
      this.bgmSource.connect(this.bgmGain);
      this.bgmSource.start(0);
    } else {
      this.loadBGM().then(() => {
        if (this.isPlaying && this.bgmBuffer) {
          this.bgmSource = this.ctx.createBufferSource();
          this.bgmSource.buffer = this.bgmBuffer;
          this.bgmSource.loop = true;
          this.bgmSource.connect(this.bgmGain);
          this.bgmSource.start(0);
        }
      });
    }
  },

  stopBGM() {
    this.logEvent('stopBGM', 0.0);
    this.isFadingBGM = false;
    this.isPlaying = false;
    if (this.bgmSource) {
      try {
        this.bgmSource.stop(0);
      } catch (e) { }
      this.bgmSource = null;
    }
  },

  fadeOutBGM(duration = 2.0) {
    if (!this.ctx || !this.bgmGain || !this.isPlaying) return;
    const time = this.ctx.currentTime;
    this.isFadingBGM = true;
    this.logEvent('fadeOutBGM', 0.001);
    try {
      this.bgmGain.gain.cancelScheduledValues(time);
      this.bgmGain.gain.setValueAtTime(this.bgmGain.gain.value, time);
      this.bgmGain.gain.exponentialRampToValueAtTime(0.001, time + duration);
    } catch (e) {
      this.bgmGain.gain.setValueAtTime(0, time);
    }
  },

  duckBGM() {
    if (!this.ctx || !this.bgmGain) return;
    const time = this.ctx.currentTime;
    this.logEvent('duckBGM', 0.30);
    try {
      this.bgmGain.gain.cancelScheduledValues(time);
      this.bgmGain.gain.setValueAtTime(this.bgmGain.gain.value, time);
      // Smoothly transition BGM down to 30% volume over 0.2 seconds (increased from 8% for better audible presence)
      this.bgmGain.gain.linearRampToValueAtTime(0.30, time + 0.2);
    } catch (e) {
      this.bgmGain.gain.setValueAtTime(0.30, time);
    }
  },

  unduckBGM() {
    if (!this.ctx || !this.bgmGain || this.isFadingBGM) return;
    const time = this.ctx.currentTime;
    this.logEvent('unduckBGM', 1.0);
    try {
      this.bgmGain.gain.cancelScheduledValues(time);
      this.bgmGain.gain.setValueAtTime(this.bgmGain.gain.value, time);
      // Smoothly restore BGM back to 100% volume over 0.35 seconds
      this.bgmGain.gain.linearRampToValueAtTime(1.0, time + 0.35);
    } catch (e) {
      this.bgmGain.gain.setValueAtTime(1.0, time);
    }
  },

  playSwoosh() {
    if (!this.ctx) this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const time = this.ctx.currentTime;
    const duration = 0.5;

    if (!this.noiseBuffer) return;

    const noise = this.ctx.createBufferSource();
    noise.buffer = this.noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.value = 2.0;
    filter.frequency.setValueAtTime(250, time);
    filter.frequency.exponentialRampToValueAtTime(2800, time + duration * 0.4);
    filter.frequency.exponentialRampToValueAtTime(450, time + duration);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(0.2, time + duration * 0.3); // original energetic gain
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(time);
    noise.stop(time + duration + 0.05);
  },

  playBadgeChime() {
    if (!this.ctx) this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const time = this.ctx.currentTime;

    // Layer 1: Woody/organic body pop (triangle wave)
    const oscBody = this.ctx.createOscillator();
    const gainBody = this.ctx.createGain();

    oscBody.type = 'triangle';
    oscBody.frequency.setValueAtTime(523.25, time); // C5
    oscBody.frequency.exponentialRampToValueAtTime(261.63, time + 0.04); // quick drop to C4 for organic impact

    gainBody.gain.setValueAtTime(0.001, time);
    gainBody.gain.linearRampToValueAtTime(0.06, time + 0.008);
    gainBody.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

    // Layer 2: Clean metallic/glass highlights (high sine wave "tink")
    const oscTink = this.ctx.createOscillator();
    const gainTink = this.ctx.createGain();

    oscTink.type = 'sine';
    oscTink.frequency.setValueAtTime(1567.98, time); // G6 (sweet, high chime frequency)

    gainTink.gain.setValueAtTime(0.001, time);
    gainTink.gain.linearRampToValueAtTime(0.03, time + 0.004);
    gainTink.gain.exponentialRampToValueAtTime(0.001, time + 0.08);

    // Connections
    oscBody.connect(gainBody);
    gainBody.connect(this.masterGain);

    oscTink.connect(gainTink);
    gainTink.connect(this.masterGain);

    // Tiny spatial echo feedback for the high chime
    gainTink.connect(this.delayNode);

    oscBody.start(time);
    oscTink.start(time);

    oscBody.stop(time + 0.15);
    oscTink.stop(time + 0.1);
  },

  playIntroImpact() {
    if (!this.ctx) this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const time = this.ctx.currentTime;
    const duration = 1.8;

    // Pure warm sine drop to prevent clipping and give professional cinema presence
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(90, time);
    osc.frequency.exponentialRampToValueAtTime(30, time + 1.2);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(0.5, time + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + duration + 0.05);
  },

  playOutroImpact() {
    this.playIntroImpact();
  },

  async preloadVoices() {
    if (!this.ctx) this.init();
    const voiceFiles = {
      0: 'v_intro.wav',
      1: 'v_s1.wav',
      2: 'v_s2.wav',
      3: 'v_s3.wav',
      4: 'v_s4.wav',
      5: 'v_s5.wav',
      6: 'v_s6.wav',
      7: 'v_s7.wav',
      8: 'v_s8.wav',
      9: 'v_s9.wav',
      10: 'v_s10.wav',
      11: 'v_s11.wav',
      12: 'v_s12.wav',
      13: 'v_outro.wav',
      14: 'v_credits.wav'
    };

    for (const [idx, filename] of Object.entries(voiceFiles)) {
      if (this.voiceBuffers[idx]) continue;
      fetch(`assets/voice/${filename}?v=${Date.now()}`)
        .then(res => res.arrayBuffer())
        .then(ab => this.ctx.decodeAudioData(ab))
        .then(buffer => {
          this.voiceBuffers[idx] = buffer;
        })
        .catch(err => console.error(`Failed to preload voice: ${filename}`, err));
    }
  },

  playVoice(idx) {
    if (!this.ctx) this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();

    // Stop current voice if playing
    this.stopVoice(false);

    // Duck BGM
    this.duckBGM();

    const playBuffer = (buffer) => {
      const source = this.ctx.createBufferSource();
      source.buffer = buffer;

      // Connect to voiceGain so it goes to speakers and MediaRecorder
      source.connect(this.voiceGain);

      source.onended = () => {
        if (this.activeVoiceSource === source) {
          this.activeVoiceSource = null;
          this.unduckBGM();
        }
      };

      this.activeVoiceSource = source;
      source.start(0);
    };

    if (this.voiceBuffers[idx]) {
      playBuffer(this.voiceBuffers[idx]);
    } else {
      // Fallback: fetch on the fly
      const voiceFiles = {
        0: 'v_intro.wav', 1: 'v_s1.wav', 2: 'v_s2.wav', 3: 'v_s3.wav',
        4: 'v_s4.wav', 5: 'v_s5.wav', 6: 'v_s6.wav', 7: 'v_s7.wav',
        8: 'v_s8.wav', 9: 'v_s9.wav', 10: 'v_s10.wav', 11: 'v_s11.wav',
        12: 'v_s12.wav', 13: 'v_outro.wav', 14: 'v_credits.wav'
      };
      const filename = voiceFiles[idx];
      if (!filename) return;

      fetch(`assets/voice/${filename}?v=${Date.now()}`)
        .then(res => res.arrayBuffer())
        .then(ab => this.ctx.decodeAudioData(ab))
        .then(buffer => {
          this.voiceBuffers[idx] = buffer;
          // Only play if it's still the current slide
          if (currentIdx === idx && isRunning) {
            playBuffer(buffer);
          }
        })
        .catch(err => {
          console.warn(`Failed to play voice on-the-fly: ${filename}`, err);
          this.unduckBGM();
        });
    }
  },

  stopVoice(shouldUnduck = true) {
    if (this.activeVoiceSource) {
      try {
        this.activeVoiceSource.stop(0);
      } catch (e) { }
      this.activeVoiceSource = null;
    }
    if (shouldUnduck) {
      this.unduckBGM();
    }
  }
};

