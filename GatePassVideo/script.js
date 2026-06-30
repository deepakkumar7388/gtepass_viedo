/* ======================================================
   SISTec Gate Pass — Professional Video Engine
   6-Step: Login→Apply→Submit→TG Approve→HOD Approve→Exit
   Total ~75s  |  BGM + Voice Narration
   ====================================================== */

// ── AUDIO ENGINE (BGM + VOICE) ──────────────────────
let audioCtx = null, bgmNodes = [], speechTimers = [];
let masterGainNode = null; // Globally hoisted for ducking

/* ---- Ambient BGM via Web Audio API synthesizer ---- */
function createBGM() {
  if (audioCtx) stopBGM();
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  bgmNodes = [];

  // Master compressor + gain
  const master = audioCtx.createDynamicsCompressor();
  masterGainNode = audioCtx.createGain();
  masterGainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  masterGainNode.gain.linearRampToValueAtTime(0.18, audioCtx.currentTime + 2);
  masterGainNode.connect(audioCtx.destination);
  master.connect(masterGainNode);
  preloadVoices();

  // Reverb convolver (impulse response)
  const convolver = audioCtx.createConvolver();
  const reverbGain = audioCtx.createGain(); reverbGain.gain.value = 0.4;
  const irLen = audioCtx.sampleRate * 2.5;
  const ir = audioCtx.createBuffer(2, irLen, audioCtx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = ir.getChannelData(ch);
    for (let i = 0; i < irLen; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / irLen, 2);
  }
  convolver.buffer = ir;
  convolver.connect(reverbGain); reverbGain.connect(master);

  // Chord pads — Fm pentatonic warm-cinematic feel
  // F3, Ab3, C4, Eb4, Bb3, Db4  (emotional, professional)
  const chords = [
    [174.61, 207.65, 261.63],  // Fm
    [155.56, 185.00, 233.08],  // Ebm
    [196.00, 233.08, 293.66],  // Gm
    [174.61, 220.00, 261.63],  // Fm/C
    [164.81, 196.00, 246.94],  // Em (brief colour)
    [174.61, 207.65, 261.63],  // Fm
    [185.00, 220.00, 277.18],  // Fm7-ish
    [155.56, 196.00, 246.94],  // Cm
  ];
  const beatLen = 1.85;
  const totalBars = 34;

  for (let bar = 0; bar < totalBars; bar++) {
    const chord = chords[bar % chords.length];
    chord.forEach((freq, hi) => {
      const osc = audioCtx.createOscillator();
      const env = audioCtx.createGain();
      osc.type = hi === 0 ? 'sine' : hi === 1 ? 'triangle' : 'sine';
      osc.frequency.value = freq;
      // Add gentle vibrato to root
      if (hi === 0) {
        const vibLfo = audioCtx.createOscillator();
        const vibGain = audioCtx.createGain();
        vibLfo.frequency.value = 5.2; vibGain.gain.value = 1.8;
        vibLfo.connect(vibGain); vibGain.connect(osc.frequency);
        vibLfo.start(audioCtx.currentTime + bar * beatLen);
        vibLfo.stop(audioCtx.currentTime + (bar + 1) * beatLen);
        bgmNodes.push(vibLfo, vibGain);
      }
      const t = audioCtx.currentTime + bar * beatLen;
      env.gain.setValueAtTime(0, t);
      env.gain.linearRampToValueAtTime(0.055 - hi * 0.012, t + 0.4);
      env.gain.exponentialRampToValueAtTime(0.001, t + beatLen * 0.92);
      osc.connect(env); env.connect(master); env.connect(convolver);
      osc.start(t); osc.stop(t + beatLen);
      bgmNodes.push(osc, env);
    });

    // Sub-bass on beat 1 of every bar (alternating intensity)
    const sub = audioCtx.createOscillator();
    const subEnv = audioCtx.createGain();
    sub.type = 'sine'; sub.frequency.value = chord[0] * 0.5;
    const t = audioCtx.currentTime + bar * beatLen;
    subEnv.gain.setValueAtTime(0, t);
    subEnv.gain.linearRampToValueAtTime(bar % 2 === 0 ? 0.12 : 0.07, t + 0.06);
    subEnv.gain.exponentialRampToValueAtTime(0.001, t + 0.7);
    sub.connect(subEnv); subEnv.connect(master);
    sub.start(t); sub.stop(t + 0.7);
    bgmNodes.push(sub, subEnv);

    // Soft click/tick on every beat (cinematic pulse)
    const click = audioCtx.createOscillator();
    const clickEnv = audioCtx.createGain();
    click.type = 'sine'; click.frequency.value = 900;
    const ct = audioCtx.currentTime + bar * beatLen + (beatLen / 2);
    clickEnv.gain.setValueAtTime(0.022, ct);
    clickEnv.gain.exponentialRampToValueAtTime(0.001, ct + 0.04);
    click.connect(clickEnv); clickEnv.connect(master);
    click.start(ct); click.stop(ct + 0.05);
    bgmNodes.push(click, clickEnv);

    // High shimmer (sparkling air)
    const shim = audioCtx.createOscillator();
    const shimEnv = audioCtx.createGain();
    shim.type = 'sine'; shim.frequency.value = chord[1] * 4 + 30;
    const st = audioCtx.currentTime + bar * beatLen + beatLen * 0.55;
    shimEnv.gain.setValueAtTime(0, st);
    shimEnv.gain.linearRampToValueAtTime(0.012, st + 0.18);
    shimEnv.gain.exponentialRampToValueAtTime(0.001, st + 0.9);
    shim.connect(shimEnv); shimEnv.connect(convolver);
    shim.start(st); shim.stop(st + 0.9);
    bgmNodes.push(shim, shimEnv);
  }

  bgmNodes.push(master, masterGainNode, reverbGain, convolver);

  // ── MELODY LAYER — Arpeggiated cinematic notes ──
  const melodyNotes = [
    261.63, 311.13, 369.99, 311.13,  // C4, Eb4, F#4 loop
    246.94, 293.66, 349.23, 293.66,
    261.63, 329.63, 392.00, 329.63,
    233.08, 277.18, 329.63, 277.18,
  ];
  const melodyGain = audioCtx.createGain(); melodyGain.gain.value = 0.5;
  melodyGain.connect(convolver);
  melodyNotes.forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const env = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    const t = audioCtx.currentTime + i * (beatLen / 2);
    env.gain.setValueAtTime(0, t);
    env.gain.linearRampToValueAtTime(0.018, t + 0.08);
    env.gain.exponentialRampToValueAtTime(0.001, t + beatLen * 0.9);
    osc.connect(env); env.connect(melodyGain);
    osc.start(t); osc.stop(t + beatLen);
    bgmNodes.push(osc, env);
  });
  bgmNodes.push(melodyGain);

  // ── RISING SWEEP — Builds energy every 4 bars ──
  for (let sw = 0; sw < 8; sw++) {
    const sweep = audioCtx.createOscillator();
    const swEnv = audioCtx.createGain();
    sweep.type = 'sawtooth';
    sweep.frequency.setValueAtTime(80, audioCtx.currentTime + sw * (beatLen * 4));
    sweep.frequency.linearRampToValueAtTime(160, audioCtx.currentTime + sw * (beatLen * 4) + beatLen * 3);
    const st = audioCtx.currentTime + sw * (beatLen * 4);
    swEnv.gain.setValueAtTime(0, st);
    swEnv.gain.linearRampToValueAtTime(0.008, st + beatLen);
    swEnv.gain.exponentialRampToValueAtTime(0.001, st + beatLen * 3.8);
    sweep.connect(swEnv); swEnv.connect(convolver);
    sweep.start(st); sweep.stop(st + beatLen * 4);
    bgmNodes.push(sweep, swEnv);
  }
}

function stopBGM() {
  bgmNodes.forEach(n => { try { n.stop && n.stop(); n.disconnect && n.disconnect(); } catch (e) { } });
  bgmNodes = [];
  if (audioCtx) { audioCtx.close(); audioCtx = null; }
}

/* ---- File-based BGM (place downloaded audio at assets/bgm.mp3) ---- */
let bgmAudio = null;

function startFileBGM() {
  return new Promise((resolve, reject) => {
    const audio = new Audio('assets/bgm.webm');
    audio.loop = true;
    audio.volume = 0;
    audio.preload = 'auto';
    audio.addEventListener('canplaythrough', () => {
      bgmAudio = audio;

      // Route BGM through audioCtx so it's captured in the MediaStreamDestination
      if (audioCtx && !audio.isRouted) {
        audio.isRouted = true;
        const source = audioCtx.createMediaElementSource(audio);
        source.connect(masterGainNode);
      }

      audio.play().then(() => {
        // Smooth fade-in over 2.5 seconds
        let vol = 0;
        const step = 0.22 / 50;
        const iv = setInterval(() => {
          vol = Math.min(vol + step, 0.22);
          audio.volume = vol;
          if (vol >= 0.22) clearInterval(iv);
        }, 50);
        resolve(true);
      }).catch(reject);
    }, { once: true });
    audio.addEventListener('error', () => reject(new Error('bgm.webm not found')), { once: true });
    audio.load();
  });
}

function stopFileBGM() {
  if (bgmAudio) {
    // Fade out
    let vol = bgmAudio.volume;
    const iv = setInterval(() => {
      vol = Math.max(vol - 0.03, 0);
      if (bgmAudio) bgmAudio.volume = vol;
      if (vol <= 0) { clearInterval(iv); if (bgmAudio) { bgmAudio.pause(); bgmAudio = null; } }
    }, 40);
  }
}

/* ---- Audio Ducking — BGM only, not voice ---- */
let duckIv = null;
let bgmBaseVol = 0.22;

function duckBGM() {
  if (duckIv) clearInterval(duckIv);
  if (bgmAudio) {
    duckIv = setInterval(() => {
      bgmAudio.volume = Math.max(bgmAudio.volume - 0.02, 0.04);
      if (bgmAudio.volume <= 0.04) clearInterval(duckIv);
    }, 40);
  }
}

function unduckBGM() {
  if (duckIv) clearInterval(duckIv);
  if (bgmAudio) {
    duckIv = setInterval(() => {
      bgmAudio.volume = Math.min(bgmAudio.volume + 0.012, bgmBaseVol);
      if (bgmAudio.volume >= bgmBaseVol) clearInterval(duckIv);
    }, 50);
  }
}


/* ════════════════════════════════════════════════
   VOICE NARRATION — Single Female TTS (Web Speech API)
   All timings exactly match animation transitions
   ════════════════════════════════════════════════ */
const NARRATIONS = [
  // Intro 0s — must finish before 5.7s (5.1s window → max ~11 words)
  { t: 1,  text: 'Welcome to SISTec Digital Gate Pass. For Smart Campus.' },
  // Step 1 Login 5.7s — must finish before 13.0s (7.3s window → OK)
  { t: 5.7,  text: 'Step one. The student logs in securely using their registered credentials.' },
  // FP 13.0s — must finish before 19.8s (6.8s window → max ~14 words)
  { t: 13.0, text: 'also Password reset is simple. Enter email, verify, and set a new password.' },
  // Step 2 Apply 19.8s — must finish before 29.8s (10s window → plenty)
  { t: 19.8, text: 'Step two. The student applies for a gate pass and fills in the exit reason.' },
  // Step 3 29.8s — must finish before 39.8s (10s window → plenty)
  { t: 29.8, text: 'Step three. The request is submitted and awaits Tutor Guardian approval.' },
  // Step 4 TG 39.8s — must finish before 49.8s (10s window → plenty)
  { t: 39.8, text: 'Step four. The Tutor Guardian reviews and approves the request instantly.' },
  // Step 5 HOD 49.8s — must finish before 58.8s (9s window → OK)
  { t: 49.8, text: 'Step five. The Head of Department grants final approval.' },
  // Step 6 Exit 58.8s — must finish before 68.8s (10s window → plenty)
  { t: 58.8, text: 'Step six. At the security gate, the digital pass is seen by the security and verified to exit.' },
  // Complete 68.8s — must finish before 79.8s (11s window → plenty)
  { t: 68.8, text: 'Journey complete. Gate access granted in under two minutes. Seamless and secure.' },
  // Outro 79.8s — must finish before 89.8s (10s window → plenty)
  { t: 79.8, text: 'SISTec Digital Gate Pass. Next-generation campus technology.' },
  // Credits 84.0s
  { t: 84.0, text: 'Developed by the team, and guided by the mentors.' },
  // QR 98.8s — delayed to allow for Credits scene (84s - 98s)
  { t: 98.8, text: 'Scan the QR code to download the SISTec Digital Gate Pass app today.' },
];


/* ---- Voice Engine — Pre-generated MP3 files via Web Audio API ---- */
// Voice files are in assets/voice/line_0.mp3 .. line_10.mp3
// Generated by generate_voice.py using Microsoft Edge Neural TTS (AriaNeural)
// Routed through audioCtx → masterGainNode → captured in MediaStreamDestination

let _voiceAudios = [];  // active Audio elements

// Pre-create Audio elements for all narration lines
function _createVoiceAudio(index) {
  const audio = new Audio('assets/voice/line_' + index + '.mp3');
  audio.preload = 'auto';
  audio.volume = 1.0;
  return audio;
}

// Play a pre-generated voice line through audioCtx (so it's recordable)
function playVoiceLine(index) {
  const audio = _createVoiceAudio(index);

  // Route through audioCtx for recording capture
  if (audioCtx && masterGainNode) {
    try {
      const source = audioCtx.createMediaElementSource(audio);
      const vGain = audioCtx.createGain();
      vGain.gain.value = 2.5;  // Voice louder than BGM
      source.connect(vGain);
      vGain.connect(masterGainNode);
    } catch(e) {
      // If audioCtx routing fails, still play directly
      console.warn('[Voice] audioCtx routing failed, playing directly', e);
    }
  }

  duckBGM();
  audio.play().catch(e => console.warn('[Voice] play failed:', e));
  audio.onended = () => {
    setTimeout(unduckBGM, 400);
    // Cleanup
    const idx = _voiceAudios.indexOf(audio);
    if (idx > -1) _voiceAudios.splice(idx, 1);
  };
  _voiceAudios.push(audio);
}

// Preload all voice files into browser cache
async function preloadVoices() {
  const promises = NARRATIONS.map((_, i) => {
    return new Promise(resolve => {
      const a = new Audio('assets/voice/line_' + i + '.mp3');
      a.preload = 'auto';
      a.oncanplaythrough = resolve;
      a.onerror = resolve; // don't block on error
      setTimeout(resolve, 3000); // timeout fallback
    });
  });
  await Promise.all(promises);
}

function startVoice(startOffset = 0) {
  stopVoice();
  NARRATIONS.forEach((item, i) => {
    const delay = Math.max(0, (item.t - startOffset) * 1000);
    const id = setTimeout(() => playVoiceLine(i), delay);
    speechTimers.push(id);
  });
}

function stopVoice() {
  speechTimers.forEach(clearTimeout);
  speechTimers = [];
  _voiceAudios.forEach(a => { try { a.pause(); a.currentTime = 0; } catch(e){} });
  _voiceAudios = [];
}


// Try file BGM first; fall back to synthesized
async function startAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    masterGainNode = audioCtx.createGain();
    masterGainNode.connect(audioCtx.destination);
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();

  await preloadVoices(); // Ensure voices are loaded

  startVoice(0);
  startFileBGM().catch(() => {
    // File not found — use synthesized BGM
    createBGM();
  });
}
function stopAudio() {
  stopVoice();
  stopFileBGM();
  stopBGM();
}


// ── BG CANVAS PARTICLES ──────────────────────────────
const cvs = document.getElementById('bg-canvas');
const ctx = cvs.getContext('2d');
let particles = [];
function resizeCanvas() {
  // Stage is now 1080x1920 internally
  cvs.width = 1080; cvs.height = 1920;
}
function spawnParticles(n = 200) {
  particles = [];
  const cols = ['#00d4ff', '#7b2fff', '#ff3cac', '#ffd700', '#00ff88'];
  for (let i = 0; i < n; i++) {
    particles.push({
      x: Math.random() * cvs.width, y: Math.random() * cvs.height,
      r: Math.random() * 3.5 + 0.5,
      vx: (Math.random() - .5) * .6, vy: (Math.random() - .5) * .6,
      a: Math.random() * .35 + .08,
      col: cols[Math.floor(Math.random() * cols.length)]
    });
  }
}
function drawParticles() {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  particles.forEach(p => {
    ctx.globalAlpha = p.a; ctx.fillStyle = p.col;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = cvs.width; if (p.x > cvs.width) p.x = 0;
    if (p.y < 0) p.y = cvs.height; if (p.y > cvs.height) p.y = 0;
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(drawParticles);
}
resizeCanvas(); spawnParticles(); drawParticles();

// ── HELPERS ──────────────────────────────────────────
let masterTL = null, isPlaying = false;
const $ = id => document.getElementById(id);
const TOTAL_STEPS = 6;

function showScene(id) {
  document.querySelectorAll('.scene').forEach(s => { s.style.display = 'none'; s.style.opacity = '0'; });
  const el = $(id);
  if (el) el.style.display = 'flex';
  return el;
}
function setProgress(pct) { $('progress-bar-fill').style.width = pct + '%'; }

function activateDot(n) {
  for (let i = 1; i <= TOTAL_STEPS; i++) {
    const d = $('dot' + i); if (!d) continue;
    d.classList.remove('active', 'done');
    if (i < n) d.classList.add('done');
    if (i === n) d.classList.add('active');
  }
  for (let i = 1; i <= TOTAL_STEPS - 1; i++) {
    const l = $('dotl' + i); if (!l) continue;
    l.classList.toggle('done', i < n);
  }
}

// ── TRANSITIONS ───────────────────────────────────────
function wipeIn(tl, nextId, t) {
  tl.to('#wipe', { scaleX: 1, duration: 0.22, ease: 'power2.in' }, t);
  tl.call(() => showScene(nextId), null, t + 0.22);
  tl.call(() => { $('wipe').style.transformOrigin = 'right'; }, null, t + 0.22);
  tl.to('#wipe', { scaleX: 0, duration: 0.22, ease: 'power2.out' }, t + 0.27);
  tl.to('#' + nextId, { opacity: 1, duration: 0.18 }, t + 0.27);
  tl.set('#wipe', { transformOrigin: 'left' }, t + 0.52);
}
function flashIn(tl, nextId, t) {
  tl.to('#flash', { opacity: 1, duration: 0.08 }, t);
  tl.call(() => showScene(nextId), null, t + 0.08);
  tl.to('#flash', { opacity: 0, duration: 0.3 }, t + 0.1);
  tl.set('#' + nextId, { opacity: 1 }, t + 0.1);
}

// ── SHARED: phone 3D entry ───────────────────────────
function phoneEntry(tl, id, rx, ry, t) {
  tl.fromTo(id,
    { opacity: 0, y: 80, rotationX: rx, rotationY: ry, scale: 0.82 },
    { opacity: 1, y: 0, rotationX: 0, rotationY: 0, scale: 1, duration: 0.8, ease: 'back.out(1.3)' }, t);
}
// Shared approve burst sequence
function approveBurst(tl, burstId, br1, br2, checkSel, sparkSel, labelSel, t) {
  tl.to(burstId, { opacity: 1, duration: 0.1 }, t);
  tl.fromTo(br1, { opacity: 0, scale: 0 }, { opacity: 0.8, scale: 1, duration: 0.35, ease: 'power2.out' }, t + 0.1);
  tl.fromTo(br2, { opacity: 0, scale: 0 }, { opacity: 0.4, scale: 1, duration: 0.45, ease: 'power2.out' }, t + 0.15);
  tl.to(checkSel, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.4)' }, t + 0.2);
  tl.to(sparkSel, { opacity: 1, duration: 0.1 }, t + 0.5);
  tl.to(sparkSel, { opacity: 0, y: -20, duration: 0.6, stagger: 0.05 }, t + 0.6);
  tl.to(labelSel, { opacity: 1, duration: 0.4 }, t + 0.65);
  tl.to(br1, { scale: 1.5, opacity: 0, duration: 0.5 }, t + 1.0);
  tl.to(br2, { scale: 1.6, opacity: 0, duration: 0.6 }, t + 1.1);
}

// ── BUILD TIMELINE ────────────────────────────────────
function buildTimeline() {
  if (masterTL) masterTL.kill();
  masterTL = gsap.timeline({ paused: true, onComplete: () => { isPlaying = false; } });
  const tl = masterTL;

  /* ═══════════════════════════
     INTRO  0s – 5.5s
     ═══════════════════════════ */
  showScene('scene-intro');
  gsap.set('#scene-intro', { opacity: 1 });
  tl.to('#step-dots', { opacity: 1, duration: 0.4 }, 0.3);
  tl.call(() => setProgress(0), null, 0);

  tl.fromTo('#intro-top-badge', { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.3);
  tl.fromTo('#intro-logo-circle', { opacity: 0, scale: 0.2, rotation: -90 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.7, ease: 'back.out(1.7)' }, 0.5);
  tl.fromTo('#intro-brand', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, 0.95);
  tl.fromTo('#intro-product', { opacity: 0, letterSpacing: '12px' }, { opacity: 1, letterSpacing: '6px', duration: 0.45 }, 1.3);
  tl.fromTo('#intro-divider', { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.4, ease: 'power2.inOut' }, 1.65);
  tl.fromTo('#intro-tagline', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, 1.95);
  tl.fromTo('#intro-year', { opacity: 0 }, { opacity: 1, duration: 0.35 }, 2.25);
  tl.fromTo('#intro-bottom-text', { opacity: 0 }, { opacity: 1, duration: 0.4 }, 2.9);
  tl.to('#intro-logo-circle', {
    boxShadow: '0 0 60px rgba(0,212,255,.5),inset 0 0 30px rgba(123,47,255,.25)',
    duration: 0.5, yoyo: true, repeat: 2
  }, 3.0);

  wipeIn(tl, 'scene-step1', 5.2);

  /* ═══════════════════════════
     STEP 1: LOGIN + FORGOT PASSWORD  5.5s – 23s
     ═══════════════════════════ */
  tl.call(() => { activateDot(1); setProgress(8); }, null, 5.5);
  tl.fromTo('#scene-step1 .step-header', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, 5.6);
  phoneEntry(tl, '#p1-wrap', 18, -22, 5.8);
  tl.fromTo('#fb1', { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.4 }, 6.4);
  tl.to('#s1-cap', { opacity: 1, duration: 0.3 }, 6.7);
  tl.to('#s1-cap .cap-line', { width: '100%', duration: 0.5, ease: 'power2.out' }, 6.8);

  // Tap animation on login button → logs in
  tl.set('#tap1', { css: { top: '81.3%', left: '50%', transform: 'translateX(-50%)' } }, 7.5);
  tl.to('#tap1', { opacity: 1, duration: 0.2 }, 7.8);
  tl.to('#tap1', { scale: 0.85, duration: 0.1 }, 8.0);
  tl.to('#tap1', { opacity: 0, scale: 1, duration: 0.2 }, 8.2);
  tl.to('#phone1', { boxShadow: '0 0 50px rgba(0,212,255,.5)', duration: 0.3, yoyo: true, repeat: 1 }, 7.8);

  // ── FORGOT PASSWORD SUB-FLOW BEGINS ─────────────────────
  // Caption & title change to Forgot Password
  tl.call(() => {
    const capText = document.getElementById('s1-cap-text');
    if (capText) capText.textContent = 'Forgot password? Tap to reset securely';
    const title = document.getElementById('s1-title');
    if (title) title.textContent = 'Forgot Password';
    const eyebrow = document.getElementById('s1-eyebrow');
    if (eyebrow) eyebrow.textContent = 'SELF SERVICE';
  }, null, 8.9);

  // "Forgot Password" badge appears on left
  tl.to('#fb1', { opacity: 0, duration: 0.25 }, 8.8);
  tl.fromTo('#fb1-forgot', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.45, ease: 'back.out(1.4)' }, 9.0);

  // Sub-label pill slides up
  tl.fromTo('#fp-sublabel', { opacity: 0, y: 30, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.5)' }, 9.1);

  // 3D flip: Login screen → Verification screen
  // Phone tilts for dramatic flip effect
  tl.to('#phone1', { rotationY: -12, scale: 0.96, duration: 0.3, ease: 'power2.in' }, 9.8);
  tl.to('#ss1-login', { opacity: 0, rotationY: -90, duration: 0.35, ease: 'power2.in' }, 9.9);
  tl.set('#ss1-verify', { rotationY: 90 }, 10.2);
  tl.to('#ss1-verify', { opacity: 1, rotationY: 0, duration: 0.38, ease: 'power2.out' }, 10.25);
  tl.to('#phone1', { rotationY: 0, scale: 1, duration: 0.35, ease: 'back.out(1.3)' }, 10.3);
  // Glow pink on phone
  tl.to('#phone1', { boxShadow: '0 0 60px rgba(255,60,172,.6), 0 0 120px rgba(123,47,255,.3)', duration: 0.4 }, 10.4);

  // Update caption
  tl.call(() => {
    const capText = document.getElementById('s1-cap-text');
    if (capText) capText.textContent = 'Enter email address for OTP verification';
  }, null, 10.5);

  // Tap "Send" button on verification screen
  tl.set('#tap1-send', { css: { top: '72%', left: '50%', transform: 'translateX(-50%)' } }, 11.2);
  tl.to('#tap1-send', { opacity: 1, duration: 0.2 }, 11.3);
  tl.to('#tap1-send', { scale: 0.85, duration: 0.12 }, 11.5);
  tl.to('#tap1-send', { opacity: 0, scale: 1, duration: 0.2 }, 11.7);

  // "Email Sent!" badge appears
  tl.to('#fb1-forgot', { opacity: 0, duration: 0.3 }, 11.6);
  tl.fromTo('#fb1-sent', { opacity: 0, x: 20, scale: 0.8 }, { opacity: 1, x: 0, scale: 1, duration: 0.45, ease: 'elastic.out(1,0.5)' }, 11.8);
  tl.to('#phone1', { boxShadow: '0 0 50px rgba(0,212,255,.5)', duration: 0.3, yoyo: true, repeat: 1 }, 11.8);

  // Small pause — email received animation
  tl.call(() => setProgress(12), null, 12.5);

  // 3D flip: Verification screen → Create New Password screen
  tl.to('#phone1', { rotationY: 12, scale: 0.96, duration: 0.3, ease: 'power2.in' }, 13.0);
  tl.to('#ss1-verify', { opacity: 0, rotationY: 90, duration: 0.35, ease: 'power2.in' }, 13.1);
  tl.set('#ss1-newpwd', { rotationY: -90 }, 13.4);
  tl.to('#ss1-newpwd', { opacity: 1, rotationY: 0, duration: 0.38, ease: 'power2.out' }, 13.45);
  tl.to('#phone1', { rotationY: 0, scale: 1, duration: 0.35, ease: 'back.out(1.3)' }, 13.5);
  // Glow green on phone (success incoming)
  tl.to('#phone1', { boxShadow: '0 0 60px rgba(0,255,136,.5), 0 0 120px rgba(123,47,255,.3)', duration: 0.4 }, 13.6);

  // Update caption
  tl.call(() => {
    const capText = document.getElementById('s1-cap-text');
    if (capText) capText.textContent = 'Create new password — type & confirm securely';
  }, null, 13.7);

  // Badge: hide sent, show done badge area
  tl.to('#fb1-sent', { opacity: 0, duration: 0.25 }, 13.5);

  // Tap "Update" button
  tl.set('#tap1-update', { css: { top: '78%', left: '50%', transform: 'translateX(-50%)' } }, 14.8);
  tl.to('#tap1-update', { opacity: 1, duration: 0.2 }, 14.9);
  tl.to('#tap1-update', { scale: 0.85, duration: 0.12 }, 15.1);
  tl.to('#tap1-update', { opacity: 0, scale: 1, duration: 0.2 }, 15.3);

  // ✅ Success: Password Updated badge + phone celebration glow
  tl.fromTo('#fb1-done', { opacity: 0, y: 20, scale: 0.7 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'elastic.out(1.2,0.5)' }, 15.5);
  tl.to('#phone1', { boxShadow: '0 0 80px rgba(0,255,136,.8), 0 0 160px rgba(0,255,136,.3)', duration: 0.4, yoyo: true, repeat: 2 }, 15.6);

  // Sub-label slides out
  tl.to('#fp-sublabel', { opacity: 0, y: -20, duration: 0.4 }, 16.2);
  tl.to('#fb1-done', { opacity: 0, duration: 0.3 }, 16.5);

  // 3D flip back to Login screen (user can now login with new password)
  tl.call(() => {
    const capText = document.getElementById('s1-cap-text');
    if (capText) capText.textContent = 'Password reset done — logging in with new credentials';
    const title = document.getElementById('s1-title');
    if (title) title.textContent = 'Login to App';
    const eyebrow = document.getElementById('s1-eyebrow');
    if (eyebrow) eyebrow.textContent = 'STUDENT ACTION';
  }, null, 16.7);
  tl.to('#phone1', { rotationY: -12, scale: 0.94, duration: 0.3, ease: 'power2.in' }, 16.8);
  tl.to('#ss1-newpwd', { opacity: 0, rotationY: 90, duration: 0.35, ease: 'power2.in' }, 16.9);
  tl.set('#ss1-login', { rotationY: -90 }, 17.2);
  tl.to('#ss1-login', { opacity: 1, rotationY: 0, duration: 0.38, ease: 'power2.out' }, 17.25);
  tl.to('#phone1', { rotationY: 0, scale: 1, boxShadow: '0 0 50px rgba(0,212,255,.4)', duration: 0.38, ease: 'back.out(1.3)' }, 17.3);

  tl.call(() => setProgress(16), null, 18.5);
  wipeIn(tl, 'scene-step2', 19.2);

  /* ═══════════════════════════
     STEP 2: APPLY  19.5s – 31.5s  (+4s buffer for voice)
     ═══════════════════════════ */
  tl.call(() => { activateDot(2); setProgress(24); }, null, 19.5);
  tl.fromTo('#scene-step2 .step-header', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, 19.6);
  phoneEntry(tl, '#p2-wrap', 10, 22, 19.9);
  tl.to('#s2-cap', { opacity: 1, duration: 0.3 }, 20.3);
  tl.to('#s2-cap .cap-line', { width: '100%', duration: 0.5 }, 20.4);
  tl.fromTo('#fb2', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4 }, 21.0);
  tl.to('#ss2-popup', { opacity: 1, duration: 0.5, ease: 'power2.inOut' }, 21.5);
  tl.to('#typing-chip', { opacity: 1, duration: 0.3 }, 22.0);
  tl.to('#typing-chip', { opacity: 0, duration: 0.3 }, 27.0);
  tl.to('#phone2', { boxShadow: '0 0 50px rgba(123,47,255,.5)', duration: 0.3, yoyo: true, repeat: 1 }, 26.5);
  tl.call(() => setProgress(32), null, 28.0);
  wipeIn(tl, 'scene-step3', 29.2);

  /* ═══════════════════════════
     STEP 3: SUBMITTED  29.5s – 41.5s  (+8s cumulative)
     ═══════════════════════════ */
  tl.call(() => { activateDot(3); setProgress(40); }, null, 29.5);
  tl.fromTo('#scene-step3 .step-header', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, 29.6);
  phoneEntry(tl, '#p3-wrap', 20, -15, 29.9);
  tl.fromTo('#fb3', { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.4 }, 30.5);
  tl.to('#status-pill', { opacity: 1, duration: 0.4 }, 30.9);
  tl.to('#s3-cap', { opacity: 1, duration: 0.3 }, 31.3);
  tl.to('#s3-cap .cap-line', { width: '100%', duration: 0.5 }, 31.4);
  tl.to('#phone3', { boxShadow: '0 0 50px rgba(255,215,0,.3)', duration: 0.4, yoyo: true, repeat: 2 }, 34.0);
  tl.call(() => setProgress(48), null, 37.5);
  wipeIn(tl, 'scene-step4', 39.2);

  /* ═══════════════════════════
     STEP 4: TG APPROVES  39.5s – 51.5s  (+12s cumulative)
     ═══════════════════════════ */
  tl.call(() => { activateDot(4); setProgress(54); }, null, 39.5);
  tl.fromTo('#scene-step4 .step-header', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, 39.6);
  phoneEntry(tl, '#p4-wrap', 12, -20, 39.9);
  tl.to('#s4-cap', { opacity: 1, duration: 0.3 }, 40.6);
  tl.to('#s4-cap .cap-line', { width: '100%', duration: 0.5 }, 40.7);
  tl.to('#p4-wrap', { opacity: 0.3, scale: 0.82, duration: 0.4 }, 42.0);
  approveBurst(tl, '#tg-burst', '.br1', '.br2', '.tg-check', '#tg-burst .spark', '.tg-label', 42.2);
  tl.to('.tg-check', { scale: 1.08, boxShadow: '0 0 80px rgba(255,170,0,.8)', duration: 0.2, yoyo: true, repeat: 3 }, 42.8);
  tl.call(() => setProgress(62), null, 48.5);
  wipeIn(tl, 'scene-step5', 49.2);

  /* ═══════════════════════════
     STEP 5: HOD APPROVES  49.5s – 61.5s  (+16s cumulative)
     ═══════════════════════════ */
  tl.call(() => { activateDot(5); setProgress(68); }, null, 49.5);
  tl.fromTo('#scene-step5 .step-header', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, 49.6);
  phoneEntry(tl, '#p5-wrap', 10, 20, 49.9);
  tl.to('#s5-cap', { opacity: 1, duration: 0.3 }, 50.5);
  tl.to('#s5-cap .cap-line', { width: '100%', duration: 0.5 }, 50.6);
  tl.to('#p5-wrap', { opacity: 0.3, scale: 0.82, duration: 0.4 }, 52.0);
  approveBurst(tl, '#hod-burst', '.hbr1', '.hbr2', '.hod-check', '#hod-burst .spark', '.hod-label', 52.2);
  tl.to('.hod-check', { scale: 1.08, boxShadow: '0 0 80px rgba(0,255,136,.8)', duration: 0.2, yoyo: true, repeat: 3 }, 52.8);
  tl.call(() => setProgress(78), null, 57.5);
  flashIn(tl, 'scene-step6', 58.2);

  /* ═══════════════════════════
     STEP 6: EXIT  58.5s – 70.5s  (+20s cumulative)
     ═══════════════════════════ */
  tl.call(() => { activateDot(6); setProgress(88); }, null, 58.5);
  tl.fromTo('#scene-step6 .step-header', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, 58.6);
  phoneEntry(tl, '#p6-wrap', 15, -18, 58.9);
  tl.fromTo('#fb6', { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.4 }, 59.5);
  tl.to('#s6-cap', { opacity: 1, duration: 0.3 }, 59.9);
  tl.to('#s6-cap .cap-line', { width: '100%', duration: 0.5 }, 60.0);
  tl.to('#p6-wrap', { opacity: 0.35, scale: 0.82, duration: 0.4 }, 61.0);
  tl.to('#gate-anim', { opacity: 1, duration: 0.1 }, 61.2);
  tl.to('.gate-left',  { rotationY: -70, duration: 0.55, ease: 'power2.out' }, 61.4);
  tl.to('.gate-right', { rotationY:  70, duration: 0.55, ease: 'power2.out' }, 61.4);
  tl.to('.gate-text',  { opacity: 1, duration: 0.4 }, 61.8);
  tl.to('.gate-beam',  { width: 600, duration: 0.5, ease: 'power2.out' }, 62.0);
  tl.to('.gate-text',  { scale: 1.06, duration: 0.2, yoyo: true, repeat: 3 }, 62.3);
  tl.call(() => setProgress(96), null, 65.5);
  flashIn(tl, 'scene-complete', 68.2);

  /* ═══════════════════════════
     COMPLETE  68.5s – 79.5s  (+24s cumulative)
     ═══════════════════════════ */
  tl.call(() => { activateDot(0); setProgress(100); }, null, 68.5);
  tl.to('#comp-check', { scale: 1, duration: 0.55, ease: 'elastic.out(1, 0.4)' }, 68.7);
  tl.to('.cb-ring.r1', { opacity: 0.5, scale: 1, duration: 0.4 }, 68.9);
  tl.to('.cb-ring.r2', { opacity: 0.3, scale: 1, duration: 0.5 }, 69.1);
  tl.to('.cb-ring.r3', { opacity: 0.15, scale: 1, duration: 0.6 }, 69.3);
  tl.to('.cb-ring', { scale: 1.35, opacity: 0, duration: 0.8, stagger: 0.15 }, 69.6);
  tl.fromTo('#comp-title', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45 }, 69.5);
  tl.fromTo('#comp-name',  { opacity: 0 }, { opacity: 1, duration: 0.4 }, 69.9);
  ['#cf1','#cf2','#cf3','#cf4','#cf5','#cf6'].forEach((id, i) => {
    tl.to(id, { opacity: 1, scale: 1, duration: 0.22, ease: 'back.out(1.4)' }, 70.5 + i * 0.15);
    if (i < 5) tl.to(`#cfa${i + 1}`, { opacity: 1, duration: 0.12 }, 70.64 + i * 0.15);
  });
  tl.to('#comp-badge', { opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.5)' }, 71.7);
  tl.to('#comp-badge', { boxShadow: '0 0 20px rgba(0,255,136,.3)', duration: 0.3, yoyo: true, repeat: 3 }, 72.2);

  wipeIn(tl, 'scene-outro', 79.2);

  /* ═══════════════════════════
     OUTRO  79.5s – 91s  (+28s cumulative)
     ═══════════════════════════ */
  tl.fromTo('#outro-logo-ring',
    { opacity: 0, scale: 0.3, rotation: -90 },
    { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.7)' }, 79.7);
  tl.fromTo('#outro-sistec',
    { opacity: 0, y: 24, letterSpacing: '18px' },
    { opacity: 1, y: 0, letterSpacing: '10px', duration: 0.6, ease: 'power3.out' }, 80.1);
  tl.fromTo('#outro-title',
    { opacity: 0, y: 12 },
    { opacity: 1, y: 0, duration: 0.45 }, 80.4);
  tl.fromTo('#outro-tagline-bar',
    { opacity: 0, scaleX: 0 },
    { opacity: 1, scaleX: 1, duration: 0.5, ease: 'power2.inOut' }, 80.7);
  tl.fromTo('#outro-dept-box',
    { opacity: 0, y: 12 },
    { opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.4)' }, 81.0);
  tl.fromTo('#outro-inst',
    { opacity: 0 },
    { opacity: 1, duration: 0.4 }, 81.3);
  tl.fromTo('#outro-year-badge',
    { opacity: 0 },
    { opacity: 1, duration: 0.4 }, 81.6);
  tl.fromTo('#outro-bottom-bar',
    { opacity: 0, y: 28 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 81.9);
  tl.to('#outro-logo-ring', {
    boxShadow: '0 0 80px rgba(0,212,255,.6),0 0 160px rgba(0,212,255,.2)',
    duration: 0.4, yoyo: true, repeat: 2
  }, 82.4);

  /* ═══════════════════════════
     CREDITS  84.0s – 98s
     ═══════════════════════════ */
  wipeIn(tl, 'scene-credits', 84.0);

  // Photo banner — slides in from top with a gentle Ken Burns scale
  tl.fromTo('#cred-photo',
    { y: '-6%', opacity: 0, scale: 1.06, filter: 'grayscale(15%) brightness(0.6)' },
    { y: '0%', opacity: 1, scale: 1, filter: 'grayscale(15%) brightness(0.88)', duration: 1.1, ease: 'power3.out' },
    84.4
  );

  // Developed by label — fades up
  tl.fromTo('#cred-label',
    { y: 10, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' },
    85.2
  );

  // Team title — clean slide up
  tl.fromTo('#cred-title',
    { y: 12, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.45, ease: 'back.out(1.7)' },
    85.35
  );

  // Divider line — expand from center
  tl.fromTo('#cred-rule',
    { width: 0, opacity: 0 },
    { width: '88%', opacity: 1, duration: 0.55, ease: 'power2.out' },
    85.65
  );

  // Member name rows — clean stagger from below
  tl.fromTo('.cred-member',
    { x: -12, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.38, stagger: 0.12, ease: 'power3.out' },
    85.85
  );

  // Under guidance label — fades up
  tl.fromTo('#cred-guide-label',
    { y: 10, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' },
    86.8
  );

  // Under guidance title — clean slide up
  tl.fromTo('#cred-guide-title',
    { y: 12, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.45, ease: 'back.out(1.7)' },
    86.95
  );

  // Under guidance divider line — expand from center
  tl.fromTo('#cred-guide-rule',
    { width: 0, opacity: 0 },
    { width: '88%', opacity: 1, duration: 0.55, ease: 'power2.out' },
    87.25
  );

  // Guide name rows — clean stagger from below
  tl.fromTo('.cred-guide',
    { x: -12, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.38, stagger: 0.12, ease: 'power3.out' },
    87.45
  );

  // Footer
  tl.fromTo('#cred-footer',
    { opacity: 0 },
    { opacity: 1, duration: 0.4, ease: 'power3.out' },
    88.0
  );

  /* ═══════════════════════════
     QR SCENE  98s – 107s  (separate full scene)
     ═══════════════════════════ */
  wipeIn(tl, 'scene-qr', 98.0);
  tl.fromTo('#qr-full-poster',
    { opacity: 0, scale: 1.15 },
    { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }, 98.4);
  // Hold for scanning
  tl.to({}, { duration: 5.0 }, 102.8);
  return tl;
}


// ── RESET ──────────────────────────────────────────
function resetAll() {
  document.querySelectorAll('.scene').forEach(s => { s.style.display = 'none'; s.style.opacity = '0'; });
  setProgress(0);
  $('step-dots').style.opacity = '0';
  activateDot(0);

  // Intro
  ['#intro-top-badge', '#intro-brand', '#intro-product', '#intro-divider', '#intro-tagline', '#intro-year', '#intro-bottom-text'].forEach(s => gsap.set(s, { opacity: 0 }));
  gsap.set('#intro-logo-circle', { opacity: 0, scale: 0.2, rotation: -90 });
  gsap.set('#intro-brand', { y: 24 });
  gsap.set('#intro-divider', { scaleX: 0 });
  gsap.set('#intro-tagline', { y: 10 });

  // Step headers
  document.querySelectorAll('.step-header').forEach(h => gsap.set(h, { opacity: 0, x: -30 }));

  // Phone wraps
  [1, 2, 3, 4, 5, 6].forEach(i => {
    const w = $(`p${i}-wrap`);
    if (w) gsap.set(w, { opacity: 0, y: 80, scale: 0.82, rotationX: 0, rotationY: 0 });
  });

  // Captions & lines
  [1, 2, 3, 4, 5, 6].forEach(i => {
    const c = $(`s${i}-cap`);
    if (c) { gsap.set(c, { opacity: 0 }); const l = c.querySelector('.cap-line'); if (l) gsap.set(l, { width: 0 }); }
  });

  // Step 1 — Login + Forgot Password
  gsap.set('#tap1', { opacity: 0, scale: 1 });
  gsap.set('#tap1-send', { opacity: 0, scale: 1 });
  gsap.set('#tap1-update', { opacity: 0, scale: 1 });
  gsap.set('#fb1', { opacity: 0, x: 20 });
  gsap.set('#fb1-forgot', { opacity: 0, x: -20 });
  gsap.set('#fb1-sent', { opacity: 0, x: 20, scale: 0.8 });
  gsap.set('#fb1-done', { opacity: 0, y: 20, scale: 0.7 });
  gsap.set('#fp-sublabel', { opacity: 0, y: 30, scale: 0.85 });
  // Reset FP screens — login visible, others hidden
  gsap.set('#ss1-login', { opacity: 1, rotationY: 0 });
  gsap.set('#ss1-verify', { opacity: 0, rotationY: 90 });
  gsap.set('#ss1-newpwd', { opacity: 0, rotationY: -90 });
  // Reset caption text
  const capText = document.getElementById('s1-cap-text');
  if (capText) capText.textContent = 'Student opens app and logs in securely';
  const title = document.getElementById('s1-title');
  if (title) title.textContent = 'Login to App';
  const eyebrow = document.getElementById('s1-eyebrow');
  if (eyebrow) eyebrow.textContent = 'STUDENT ACTION';

  // Step 2
  gsap.set('#ss2-popup', { opacity: 0 });
  gsap.set('#typing-chip', { opacity: 0 });
  gsap.set('#fb2', { opacity: 0, x: -20 });

  // Step 3
  gsap.set('#status-pill', { opacity: 0 });
  gsap.set('#fb3', { opacity: 0, x: 20 });

  // TG burst
  gsap.set('#tg-burst', { opacity: 0 });
  gsap.set('.br1', { opacity: 0, scale: 0 });
  gsap.set('.br2', { opacity: 0, scale: 0 });
  gsap.set('.tg-check', { scale: 0, boxShadow: '0 0 0 0 transparent' });
  gsap.set('#tg-burst .spark', { opacity: 0, y: 0 });
  gsap.set('.tg-label', { opacity: 0 });

  // HOD burst
  gsap.set('#hod-burst', { opacity: 0 });
  gsap.set('.hbr1', { opacity: 0, scale: 0 });
  gsap.set('.hbr2', { opacity: 0, scale: 0 });
  gsap.set('.hod-check', { scale: 0, boxShadow: '0 0 0 0 transparent' });
  gsap.set('#hod-burst .spark', { opacity: 0, y: 0 });
  gsap.set('.hod-label', { opacity: 0 });

  // Step 6 gate
  gsap.set('#gate-anim', { opacity: 0 });
  gsap.set('.gate-left', { rotationY: 0 });
  gsap.set('.gate-right', { rotationY: 0 });
  gsap.set('.gate-text', { opacity: 0, scale: 1 });
  gsap.set('.gate-beam', { width: 0 });
  gsap.set('#fb6', { opacity: 0, x: 20 });

  // Complete
  gsap.set('#comp-check', { scale: 0 });
  gsap.set('.cb-ring', { opacity: 0, scale: 1 });
  gsap.set('#comp-title', { opacity: 0, y: 16 });
  gsap.set('#comp-name', { opacity: 0 });
  gsap.set('.cf-item', { opacity: 0, scale: 0.6 });
  gsap.set('.cf-arrow', { opacity: 0 });
  gsap.set('#comp-badge', { opacity: 0, y: 16 });

  // Outro
  ['#outro-logo-ring', '#outro-sistec', '#outro-title', '#outro-tagline-bar',
    '#outro-dept-box', '#outro-inst', '#outro-year-badge', '#outro-bottom-bar'].forEach(s => gsap.set(s, { opacity: 0 }));
  gsap.set('#outro-logo-ring', { scale: 0.3, rotation: -90 });
  gsap.set('#outro-sistec', { y: 24, letterSpacing: '18px' });
  gsap.set('#outro-title', { y: 12 });
  gsap.set('#outro-tagline-bar', { scaleX: 0 });
  gsap.set('#outro-dept-box', { y: 12 });
  gsap.set('#outro-bottom-bar', { y: 28 });
  // QR code reset
  gsap.set('#qr-full-poster', { opacity: 0, scale: 1.15 });

  // Credits reset
  gsap.set(['#cred-photo', '#cred-label', '#cred-title', '#cred-guide-label', '#cred-guide-title', '#cred-footer'], { opacity: 0 });
  gsap.set('#cred-photo', { scale: 1.06, y: '-6%', filter: 'grayscale(15%) brightness(0.6)' });
  gsap.set(['#cred-label', '#cred-guide-label'], { y: 10 });
  gsap.set(['#cred-title', '#cred-guide-title'], { y: 12 });
  gsap.set(['#cred-rule', '#cred-guide-rule'], { opacity: 0, width: 0 });
  gsap.set(document.querySelectorAll('.cred-member, .cred-guide'), { opacity: 0, x: -12 });

  // Transitions
  gsap.set('#flash', { opacity: 0 });
  gsap.set('#wipe', { scaleX: 0, transformOrigin: 'left' });
}

// ── PUBLIC ────────────────────────────────────────────
function startShow() {
  if (isPlaying) return;
  isPlaying = true;
  resetAll();
  buildTimeline();
  masterTL.play(0);
  startAudio();
}
function restartShow() {
  isPlaying = false;
  if (masterTL) masterTL.kill();
  stopAudio();
  resetAll();
  showScene('scene-intro');
  gsap.set('#scene-intro', { opacity: 1 });
  setTimeout(startShow, 150);
}

// ── RECORDING GLOBALS ──────────────────────────────────
var _recStream = null, _recCanvas = null, _recCtx = null;
var _recVideo = null, _recMediaRec = null, _recChunks = [];
var _recAnimId = null, _recStartTime = 0, _isRecording = false;
var _origStageW, _origStageH, _origStageBR, _origStageMargin;

function _scaleStageUp() {
  var stageEl = document.getElementById('stage');
  var ctrlEl = document.getElementById('controls');
  var hintEl = document.getElementById('controls-hint');
  var wrapEl = document.getElementById('stage-wrapper');

  var vw = window.innerWidth;
  var vh = window.innerHeight;

  // Scale so stage fills viewport (1080x1920 internal → fit screen)
  var scaleByH = (vh * 0.98) / 1920;
  var scaleByW = (vw * 0.98) / 1080;
  var scale = Math.min(scaleByH, scaleByW);

  var newW = Math.round(1080 * scale);
  var newH = Math.round(1920 * scale);

  _origStageW = stageEl.style.width;
  _origStageH = stageEl.style.height;
  _origStageBR = stageEl.style.borderRadius;
  _origStageMargin = stageEl.style.margin;

  if (ctrlEl) ctrlEl.style.display = 'none';
  if (hintEl) hintEl.style.display = 'none';

  stageEl.style.width = newW + 'px';
  stageEl.style.height = newH + 'px';
  stageEl.style.borderRadius = '0';
  stageEl.style.margin = '0 auto';

  // Resize bg-canvas
  var bgCvs = document.getElementById('bg-canvas');
  if (bgCvs) { bgCvs.width = newW; bgCvs.height = newH; }

  return { scale: scale, newW: newW, newH: newH };
}

function _restoreStage() {
  var stageEl = document.getElementById('stage');
  var ctrlEl = document.getElementById('controls');
  var hintEl = document.getElementById('controls-hint');

  if (ctrlEl) ctrlEl.style.display = '';
  if (hintEl) hintEl.style.display = '';

  stageEl.style.width = _origStageW || '';
  stageEl.style.height = _origStageH || '';
  stageEl.style.borderRadius = _origStageBR || '';
  stageEl.style.margin = _origStageMargin || '';
}

async function downloadVideo() {
  if (_isRecording) return;

  var btn = document.getElementById('btn-download');
  btn.textContent = 'Preparing...';
  btn.disabled = true;

  // INITIALIZE AUDIO CONTEXT HERE IMMEDIATELY ON CLICK GESTURE!
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    masterGainNode = audioCtx.createGain();
    masterGainNode.connect(audioCtx.destination);
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();

  // Stop any preview
  stopAudio();
  if (masterTL) { masterTL.kill(); masterTL = null; }
  isPlaying = false;
  resetAll();
  showScene('scene-intro');
  gsap.set('#scene-intro', { opacity: 1 });

  // --- Scale stage to fill viewport ---
  var stageEl = document.getElementById('stage');
  var ctrlEl = document.getElementById('controls');
  var hintEl = document.getElementById('controls-hint');
  var wrapperEl = document.getElementById('stage-wrapper');

  _origStageW = stageEl.style.width;
  _origStageH = stageEl.style.height;
  _origStageBR = stageEl.style.borderRadius;
  _origStageMargin = stageEl.style.margin;

  var _origWrapW = wrapperEl ? wrapperEl.style.width : '';
  var _origWrapH = wrapperEl ? wrapperEl.style.height : '';
  var _origWrapBR = wrapperEl ? wrapperEl.style.borderRadius : '';
  var _origWrapBS = wrapperEl ? wrapperEl.style.boxShadow : '';
  var _origBodyJC = document.body.style.justifyContent;

  if (ctrlEl) ctrlEl.style.display = 'none';
  if (hintEl) hintEl.style.display = 'none';

  var vw = window.innerWidth, vh = window.innerHeight;
  var scaleByH = (vh * 0.98) / 1920;
  var scaleByW = (vw * 0.98) / 1080;
  var scale = Math.min(scaleByH, scaleByW);
  var newW = 1080 * scale;
  var newH = 1920 * scale;

  document.body.style.justifyContent = 'center';

  if (wrapperEl) {
    wrapperEl.style.width = newW + 'px';
    wrapperEl.style.height = newH + 'px';
    wrapperEl.style.borderRadius = '0';
    wrapperEl.style.boxShadow = 'none';
    wrapperEl.style.overflow = 'hidden';
  }

  stageEl.style.borderRadius = '0';
  stageEl.style.transformOrigin = 'top left';
  stageEl.style.transform = 'scale(' + scale + ')';
  stageEl.style.margin = '0';

  await new Promise(function (r) { setTimeout(r, 400); });

  // --- Request tab capture ---
  var recStream;
  try {
    recStream = await navigator.mediaDevices.getDisplayMedia({
      video: { frameRate: { ideal: 30, max: 30 }, width: { ideal: 7680 }, height: { ideal: 4320 }, cursor: 'never' },
      audio: false,
      preferCurrentTab: true,
      selfBrowserSurface: 'include'
    });
  } catch (e) {
    // Restore on cancel
    if (ctrlEl) ctrlEl.style.display = '';
    if (hintEl) hintEl.style.display = '';
    document.body.style.justifyContent = _origBodyJC;
    if (wrapperEl) {
      wrapperEl.style.width = _origWrapW || '400px';
      wrapperEl.style.height = _origWrapH || '711px';
      wrapperEl.style.borderRadius = _origWrapBR || '16px';
      wrapperEl.style.boxShadow = _origWrapBS || '0 0 100px rgba(0,212,255,.18),0 0 200px rgba(123,47,255,.12)';
    }
    stageEl.style.transform = 'scale(0.3704)';
    stageEl.style.borderRadius = _origStageBR || '';
    btn.textContent = 'Download Video'; btn.disabled = false;
    return;
  }

  _isRecording = true;
  btn.textContent = 'Recording 0%';

  // --- Output canvas 1080x1920 ---
  var recCanvas = document.createElement('canvas');
  recCanvas.width = 2160; recCanvas.height = 3840;
  var recCtx = recCanvas.getContext('2d', { alpha: false });
  recCtx.imageSmoothingEnabled = true;
  recCtx.imageSmoothingQuality = 'high';

  // --- Decode captured stream ---
  var recVideo = document.createElement('video');
  recVideo.srcObject = recStream;
  recVideo.muted = true; recVideo.playsInline = true;
  await recVideo.play().catch(function () { });
  await new Promise(function (r) { recVideo.onloadedmetadata = r; setTimeout(r, 600); });

  var settings = recStream.getVideoTracks()[0].getSettings();
  var captW = settings.width || recVideo.videoWidth || window.innerWidth;
  var captH = settings.height || recVideo.videoHeight || window.innerHeight;
  var pixRX = captW / window.innerWidth;
  var pixRY = captH / window.innerHeight;
  var rect = stageEl.getBoundingClientRect();
  var sx = rect.left * pixRX, sy = rect.top * pixRY;
  var sw = rect.width * pixRX, sh = rect.height * pixRY;

  var lastDraw = performance.now();
  var FPS_INT = 1000 / 30;
  var recAnimId;
  function drawFrame(ts) {
    if (!_isRecording) return;
    recAnimId = requestAnimationFrame(drawFrame);
    var now = ts || performance.now();
    var el = now - lastDraw;
    if (el < FPS_INT) return;
    lastDraw = now - (el % FPS_INT);
    recCtx.drawImage(recVideo, sx, sy, sw, sh, 0, 0, 2160, 3840);
  }
  drawFrame();
  await new Promise(function (r) { setTimeout(r, 400); });

  // --- Pick best codec (MP4 preferred) ---
  var mime = [
    'video/mp4;codecs=avc1.424028', 'video/mp4',
    'video/webm;codecs=vp9', 'video/webm'
  ].find(function (t) { return MediaRecorder.isTypeSupported(t); }) || '';

  // --- Start audio engine ---
  await startAudio();
  await new Promise(function (r) { setTimeout(r, 200); });

  var canvasStream = recCanvas.captureStream(30);
  var videoTrack = canvasStream.getVideoTracks()[0];
  var combinedStream = new MediaStream();
  if (videoTrack) combinedStream.addTrack(videoTrack);

  // --- Audio via Web Audio MediaStreamDestination ---
  // Voice MP3s are routed through audioCtx (createMediaElementSource → masterGainNode)
  // BGM is also through audioCtx. So MediaStreamDestination captures BOTH.
  if (audioCtx) {
    var recDest = audioCtx.createMediaStreamDestination();
    masterGainNode.connect(recDest);
    var audioTrack = recDest.stream.getAudioTracks()[0];
    if (audioTrack) combinedStream.addTrack(audioTrack);
  }

  var recChunks = [];
  var recStartT = 0;
  var recMediaRec = new MediaRecorder(combinedStream, Object.assign(
    { videoBitsPerSecond: 40000000, audioBitsPerSecond: 320000 },
    mime ? { mimeType: mime } : {}
  ));

  recMediaRec.ondataavailable = function (e) { if (e.data.size) recChunks.push(e.data); };

  recMediaRec.onstop = function () {
    cancelAnimationFrame(recAnimId);
    stopAudio();
    recStream.getTracks().forEach(function (t) { t.stop(); });
    recVideo.pause(); recVideo.srcObject = null;
    recCanvas.width = 1; recCanvas.height = 1;

    // Restore stage
    if (ctrlEl) ctrlEl.style.display = '';
    if (hintEl) hintEl.style.display = '';
    document.body.style.justifyContent = _origBodyJC;
    if (wrapperEl) {
      wrapperEl.style.width = _origWrapW || '400px';
      wrapperEl.style.height = _origWrapH || '711px';
      wrapperEl.style.borderRadius = _origWrapBR || '16px';
      wrapperEl.style.boxShadow = _origWrapBS || '0 0 100px rgba(0,212,255,.18),0 0 200px rgba(123,47,255,.12)';
    }
    stageEl.style.transform = 'scale(0.3704)';
    stageEl.style.borderRadius = _origStageBR || '';

    var duration = Date.now() - recStartT;
    var rawBlob = new Blob(recChunks, { type: mime || 'video/webm' });
    recChunks = [];

    var ext = mime.includes('mp4') ? 'mp4' : 'webm';

    function triggerDownload(finalBlob) {
      var url = URL.createObjectURL(finalBlob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'SISTec_GatePass_Video.' + ext;
      document.body.appendChild(a);
      a.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 10000);

      btn.textContent = 'Downloaded!';
      setTimeout(function () {
        btn.textContent = 'Download Video';
        btn.disabled = false;
      }, 3000);
      _isRecording = false;
    }

    // Fix WebM duration metadata
    if (mime.includes('webm') && typeof ysFixWebmDuration === 'function') {
      ysFixWebmDuration(rawBlob, duration, { logger: false })
        .then(triggerDownload)
        .catch(function () { triggerDownload(rawBlob); });
    } else {
      triggerDownload(rawBlob);
    }
  };

  // --- Start animation with recording-mode voice (routes through audioCtx) ---
  isRecordingMode = true;
  recMediaRec.start(100);
  recStartT = Date.now();
  buildTimeline();
  masterTL.play(0);

  // Progress % on button
  var elapsed = 0;
  var progressIv = setInterval(function () {
    if (!_isRecording) { clearInterval(progressIv); return; }
    elapsed++;
    var pct = Math.min(100, Math.round(elapsed / 99 * 100));
    btn.textContent = 'Recording ' + pct + '%';
  }, 1000);

  // Auto-stop when animation ends
  var stopIv = setInterval(function () {
    if (masterTL && masterTL.progress() >= 1) {
      clearInterval(stopIv);
      setTimeout(function () {
        if (recMediaRec && recMediaRec.state === 'recording') recMediaRec.stop();
      }, 2000);
    }
  }, 500);
}


// ── INIT ─────────────────────────────────────────
resetAll();
showScene('scene-intro');
gsap.set('#scene-intro', { opacity: 1 });
