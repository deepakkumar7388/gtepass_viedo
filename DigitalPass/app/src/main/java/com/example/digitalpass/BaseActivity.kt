package com.example.digitalpass

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity

/**
 * BaseActivity: All protected screens extend this.
 *
 * On every onCreate it checks whether LoginUserDataHolder has live data.
 * If the OS killed the process (process death), the in-memory object will be
 * empty. We then try to restore it from SharedPreferences.
 * If restoration also fails (token expired / never logged in), we send the
 * user to splashScreen and finish() — so the app never crashes.
 */
open class BaseActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        // Run the session guard BEFORE super.onCreate so nothing in the
        // subclass can touch LoginUserDataHolder while it is still empty.
        restoreSessionIfNeeded()
        super.onCreate(savedInstanceState)
    }

    private fun restoreSessionIfNeeded() {
        // loginUserData is null when the process was killed by the OS.
        if (LoginUserDataHolder.loginUserData == null) {
            val restored = LoginUserDataHolder.loadState(this)
            if (!restored) {
                // Could not restore — send user back to splash/login.
                val intent = Intent(this, splashScreen::class.java)
                intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                startActivity(intent)
                finish()
            } else {
                // Session restored successfully! We must reconnect the socket
                // to continue receiving live updates (if applicable for role).
                val role = LoginUserDataHolder.loginUserData?.get("role")
                if (role != null && role != "student") {
                    SocketManager.connect()
                }
            }
        }
    }
}
