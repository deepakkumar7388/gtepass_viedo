# DigitalPass 3D Promo — Blender Python Guide

## ✅ Requirements
- **Blender 3.6+** (free from blender.org) — download karo, install karo
- **App screenshots** — already `assets/` folder mein hain ✓

---

## 🚀 Step-by-Step: Run Karein

### Step 1 — Blender Open Karo
```
blender.org → Download → Install
```

### Step 2 — Scripting Tab Select Karo
- Blender open hoga default cube ke saath
- Top menu mein **"Scripting"** tab click karo

### Step 3 — Script Load Karo
- Scripting tab mein **"Open"** button click karo
- Navigate karo: `C:\MY_PROJECTS\Gate_pas\VideoPromo\`
- Select: `blender_promo.py`

### Step 4 — Run Script
- Right side mein **▶ Run Script** button click karo
- Console mein progress dikhega (~10 sec for scene build)

### Step 5 — Render Video
```
Press: Ctrl + F12
```
- Rendering shuru ho jayega
- **~5-15 min** lagenge (depends on GPU)
- Video automatically save hogi:
  `C:\MY_PROJECTS\Gate_pas\VideoPromo\render\digitalpass_promo.mp4`

---

## 🎬 What the Script Does

| Step | Action |
|------|--------|
| 1 | Clears scene, sets 1080×1920 (9:16) vertical resolution |
| 2 | Creates realistic 3D phone (body + screen + notch + buttons) |
| 3 | Loads each screenshot as emissive texture on phone screen |
| 4 | Sets up cinematic 4-point lighting (key + fill + rim + bounce) |
| 5 | Creates camera with depth-of-field |
| 6 | Adds 40 floating particles for cinematic atmosphere |
| 7 | Keyframes 14 slides with spring-bounce phone animations |
| 8 | Creates 3D text (title, chip, bottom text) per slide |
| 9 | Applies BEZIER easing to all curves for smooth motion |
| 10 | Configures EEVEE + Bloom + Filmic color for cinema look |

---

## 🎨 Animation Details (per slide)

```
Frame 1-18  : Phone enters with overshoot spring (scale+rotation)
Frame 8-18  : 3D text scales from 0 → 1.18 → 1.0 (bounce)
Frame 18-90 : Phone gently floats (idle animation)
Frame 90+   : Color wipe transition to next slide
```

**Phone rotations per slide:**
- Tilt Left  (-25°) : Login, Verification, Track Requests
- Tilt Right (+25°) : Apply Gate Pass, Manage Everything, One App
- Straight (0°)     : Splash, Visitor Entry, Go Digital, Final

---

## ⚙️ Customize

### Change Slide Duration
```python
SLIDE_DUR = 3.5   # seconds (change to 4.0 for slower)
```

### Change Output Path
```python
OUTPUT_MP4 = r"C:\YOUR\PATH\promo.mp4"
```

### Better Quality (slower render)
```python
eevee.taa_render_samples = 256   # default: 128
```

### Use Cycles Engine (photorealistic, slower)
```python
scene.render.engine = 'CYCLES'
scene.cycles.samples = 128
```

---

## 🔧 Troubleshooting

| Problem | Fix |
|---------|-----|
| Script errors on font | Script auto-falls back to Impact or Blender default |
| Screenshot not showing | Check `assets/` folder has `s1_splash.jpeg` etc. |
| Black render | Ensure EEVEE is selected, not Cycles without GPU |
| Slow render | In Blender: Edit → Preferences → System → GPU Compute |

---

## 📁 File Structure
```
VideoPromo/
├── blender_promo.py    ← Main Blender Python script
├── index.html          ← Browser preview (GSAP version)
├── style.css
├── script.js
├── assets/
│   ├── s1_splash.jpeg
│   ├── s2_login.jpeg
│   ├── s3_apply.jpeg
│   ├── s4_apply_popup.jpeg
│   ├── s5_pending.jpeg
│   ├── s6_approved.jpeg
│   ├── s7_visitor_form.jpeg
│   ├── s8_visitor_done.jpeg
│   ├── s9_history.jpeg
│   ├── s10_allot.jpeg
│   ├── s11_dashboard.jpeg
│   └── s12_users.jpeg
└── render/
    └── digitalpass_promo.mp4  ← OUTPUT VIDEO
```
