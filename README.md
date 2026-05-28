# 🛡️ DigitalPass (Gatepas) — Smart Gate Pass Management System

A state-of-the-art, collaborative digital gate pass system designed to streamline and automate campus gate pass requests, authorization workflows, visitor entry-exit logging, and real-time security monitoring. 

This multi-platform system comprises a **React-based Web Portal**, a **Native Android Client**, and a **Real-Time Flask API Backend** with MongoDB Atlas storage.

---

## 🗺️ Project Structure

The workspace is organized into three major components:

```text
Gate_pas/
├── DigitalPass/                # 📱 Android Mobile Application & Web Portal
│   ├── app/                    # Native Android source code
│   ├── web-app/                # React + Vite frontend source code
│   └── build.gradle.kts        # Gradle project configurations
├── MyBackendWithAtlas/         # ⚙️ Python Flask Backend API Server
│   ├── app.py                  # Main Flask application with API endpoints
│   ├── requirements.txt        # Python dependency requirements
│   └── check_data.py           # Utility scripts for database checks
└── ER_Diagram_DigitalPass.png  # 📊 Database Schema Entity-Relationship Diagram
```

---

## ⚡ Core Features

### 1. 🛡️ Role-Based Access Control (RBAC) & Hierarchy
* **Hierarchical Permissions**: 
  `Admin` ➔ `Principal` ➔ `HOD` ➔ `Faculty` / `Security Guard` / `Reception` ➔ `Student`.
* **Authorized Onboarding**: Higher hierarchy roles can create and manage lower-hierarchy users.
* **Campus & Department Partitioning**: Principals and HODs are restricted to managing users within their specific campuses/departments.

### 2. 🔌 Real-Time Socket.io Synchronization
* Real-time notifications and instant pass approvals utilizing WebSockets (`Flask-SocketIO` + `eventlet`).
* Live dashboards for security guards to see gate pass requests instantly as they are raised.

### 3. 📍 Geofencing & Location Verification
* Spatial security checks using `geopy` to calculate distances between security guards, users, and campus coordinates.
* Out-of-bounds protection to ensure integrity during gate pass validations.

### 4. 📧 Automated Email & FCM Notifications
* Automated alerts (SMTP SSL server integration) for logins, password recoveries, and account actions.
* Push notifications powered by **Firebase Cloud Messaging (FCM)** to instantly alert users on their Android app.

### 5. 📊 Bulk User & Batch Management
* Excel-based bulk import capability powered by `pandas` to easily onboard hundreds of students or staff at once.
* Flexible batch creation (specifying departments, entry years, sections, and levels of approval).

### 6. 🎨 Premium Responsive UI/UX
* Sleek, modern dashboard utilizing custom CSS variables, elegant dark mode/light mode themes (`ThemeContext`), glassmorphism effects, and highly responsive grid layouts.

---

## 🛠️ Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Web** | React (Vite), JavaScript (ES6+), Vanilla CSS | Ultra-fast, elegant, and interactive single-page app |
| **Mobile App** | Android Native (Kotlin/Java, Gradle) | Fast on-device security verification |
| **Backend API** | Flask (Python), Eventlet, Flask-SocketIO | Async high-performance real-time server |
| **Database** | MongoDB Atlas / PyMongo | Flexible Document-based DB for profiles and logs |
| **Storage** | Cloudinary | Cloud hosting for user profile pictures |
| **Messaging** | Firebase Cloud Messaging (FCM), SMTP | Real-time push notifications & secure email alerts |

---

## 🚀 Setup & Execution

### 1. Python Flask Backend (`MyBackendWithAtlas/`)
Navigate to the backend directory, configure environment variables, and start the server:

```bash
# Install dependencies
pip install -r MyBackendWithAtlas/requirements.txt

# Create a .env file with the following variables:
# MONGODB_URI=your_mongodb_connection_string
# CLOUDINARY_CLOUD_NAME=your_cloud_name
# CLOUDINARY_API_KEY=your_api_key
# CLOUDINARY_API_SECRET=your_api_secret
# SMTP_USER=your_smtp_email
# SMTP_PASSWORD=your_app_password

# Run the Flask API Server
python MyBackendWithAtlas/app.py
```

### 2. React Frontend Web App (`DigitalPass/web-app/`)
Start the web development environment:

```bash
# Navigate to web-app directory
cd DigitalPass/web-app

# Install dependencies
npm install

# Start local Vite development server
npm run dev
```

### 3. Android Mobile Application (`DigitalPass/`)
* Open the `DigitalPass/` root folder in **Android Studio**.
* Let Gradle sync dependencies.
* Build, package, and deploy to your Android device or emulator.

---

## 📊 Database Architecture

The system utilizes an elegant document-based model optimized for quick lookups and real-time synchronization. The comprehensive database relationships, collections, and schemas are defined visually in the root-level ER diagram:

👉 **[ER_Diagram_DigitalPass.png](file:///c:/MY_PROJECTS/Gate_pas/ER_Diagram_DigitalPass.png)**

---

## 🤝 Contributing & Collaborations

The main collaborative branch is tracked under:
* **Deepak Kumar's Repository**: `https://github.com/deepakkumar7388/Gatepas`
* **Collaborative Development Fork**: `https://github.com/yogeshsaini7172/digitalPassCollabrativeRepository`

---
*Created with ❤️ by the DigitalPass Developer Team.*
