import os
from gtts import gTTS

# =====================================================================
# 🎤 CLASSIC INDIAN TTS VOICE (Similar to Polly Aditi/Google Assistant)
# =====================================================================

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "assets", "voice")

LINES = [
    "Welcome to Sistec Digital Gate Pass. For Smart Campus.",
    "Step one. The student logs in securely using their registered credentials.",
    "also Password reset is simple. Enter email, verify, and set a new password.",
    "Step two. The student applies for a gate pass and fills in the exit reason.",
    "Step three. The request is submitted and awaits Tutor Guardian approval.",
    "Step four. The Tutor Guardian reviews and approves the request instantly.",
    "Step five. The Head of Department grants final approval.",
    "Step six. At the security gate, the digital pass is seen by the security and verified to exit.",
    "Journey complete. Gate access granted in under two minutes. Seamless and secure.",
    "Sistec Digital Gate Pass. Next-generation campus technology.",
    "Developed by the team, and guided by the mentors.",
    "Scan the QR code to download the Sistec Digital Gate Pass app today.",
]

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    for i, text in enumerate(LINES):
        out = os.path.join(OUTPUT_DIR, f"line_{i}.mp3")
        print(f"[{i+1}/{len(LINES)}] Generating: {text[:50]}...")
        
        # Using Google TTS with tld='co.in' gives the classic Indian Female AI voice
        # (Very similar to Amazon Polly Aditi)
        tts = gTTS(text=text, lang='en', tld='co.in', slow=False)
        tts.save(out)
        print(f"  -> Saved: {out}")
        
    print("\nDone! All voice files generated with Google TTS (Indian Accent).")

if __name__ == "__main__":
    main()
