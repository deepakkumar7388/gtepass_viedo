# DigitalPass Promo Video Maker

## 📁 Folder Structure

```
VideoPromo/
├── index.html      ← Main file — open this in Chrome/Edge
├── style.css
├── script.js
├── README.md       ← You are here
└── assets/         ← 📸 ADD YOUR SCREENSHOTS HERE
    ├── s1_splash.png       ← App Splash / Logo screen
    ├── s2_login.png        ← Login Screen
    ├── s3_apply.png        ← Student Dashboard (Apply Gate Pass button)
    ├── s4_apply_popup.png  ← Apply Gate Pass popup / Remark dialog
    ├── s5_pending.png      ← Gate Pass Details (pending status)
    ├── s6_approved.png     ← Gate Pass Details (approved / Exit button)
    ├── s7_visitor_form.png ← Visitor Registration Form (blank)
    ├── s8_visitor_done.png ← Visitor Registration (filled with photo)
    ├── s9_history.png      ← Pass History Screen
    ├── s10_allot.png       ← Allot Security Guard Screen
    ├── s11_dashboard.png   ← Admin Quick Actions Dashboard
    └── s12_users.png       ← User Management Screen
```

---

## 🚀 How to Use

### Step 1 — Add Screenshots
- Copy your app screenshots into the `assets/` folder
- Rename them exactly as shown above (e.g., `s1_splash.png`, `s2_login.png`, etc.)
- If a screenshot is missing, that slide will show a placeholder — no crash!

### Step 2 — Open in Browser
- Open `index.html` in **Google Chrome** or **Microsoft Edge**
- Do NOT use Firefox (MediaRecorder capture is limited there)

### Step 3 — Preview
- Click **▶ Play Preview** to watch the full animation

### Step 4 — Record & Download
1. Click **🔴 Record & Download**
2. A screen sharing prompt will appear — select **"This Tab"**
3. Click **Share**
4. The animation will restart and play automatically
5. When it finishes, the video will **auto-download** as `digitalpass-promo.webm`

### Step 5 — Convert to MP4 (Optional)
- Upload the `.webm` file to https://cloudconvert.com/webm-to-mp4 (free)
- Or use VLC: Media → Convert/Save → select file → choose MP4 format

---

## 📋 Slide Content (What each slide shows)

| Slide | Text | Screenshot |
|-------|------|------------|
| 1 | INTRO — DIGITALPASS animated logo | — |
| 2 | INTRODUCING → DIGITALPASS | s1_splash.png |
| 3 | SECURE LOGIN | s2_login.png |
| 4 | APPLY GATE PASS | s3_apply.png |
| 5 | NO MORE PAPERWORK | s4_apply_popup.png |
| 6 | SMART VISITOR ENTRY | s7_visitor_form.png |
| 7 | SECURE VERIFICATION | s5_pending.png |
| 8 | MANAGE EVERYTHING | s11_dashboard.png |
| 9 | TRACK EVERY REQUEST | s9_history.png |
| 10 | STOP USING PAPER PASSES | s6_approved.png |
| 11 | ONE APP | s12_users.png |
| 12 | FASTER APPROVALS | s10_allot.png |
| 13 | DIGITALPASS tagline | s8_visitor_done.png |
| 14 | OUTRO — THE FUTURE OF CAMPUS ACCESS | — |

---

## 💡 Tips
- Total video length: ~48 seconds
- For YouTube Shorts: best to trim to 30-45 seconds in any free tool
- You can change slide duration in `script.js` → `dur` value (in milliseconds)
- You can change text content in `script.js` → `SLIDES` array
