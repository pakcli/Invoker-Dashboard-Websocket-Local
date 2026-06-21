# Invoker Portfolio Dashboard 🔮

A premium, interactive developer portfolio dashboard themed around Dota 2's Invoker hero. This application functions as a local, real-time indexer for your work history, certifications, side projects, and hardware setups.

It recursively watches a directory of markdown files, compiles their YAML frontmatter metadata, dynamically synthesizes custom game-like chimes using the **Web Audio API**, and uses a WebSocket pipeline to instantly hot-reload the layout whenever you add, modify, or delete files.

---

## 🚀 Key Features

* **Invoker Magic HUD**:
  * Keyboard hotkey binding (**Q: Quas**, **W: Wex**, **E: Exort**, **R: Invoke**, and **Space: Clear**).
  * Web Audio API synthesizer generating real-time magical chime sweeps, chimes, and ticks with randomized pitch shifts (+-2%).
  * Reactive dashboard statistics showing active card counts filtered in real-time.
  * Active Orb combination search filters: queue 3 elements and hit Invoke (R) to instantly isolate matching content.
* **Auto-Scanning Watcher**:
  * Watches local directories in real-time using Python `watchdog`.
  * Automatically compiles YAML frontmatter from `index.md` files into a unified dataset.
  * Dynamically generates customizable image thumbnails for your items.
* **Chronological Timeline Feed**:
  * Groups projects, awards, and hardware configurations chronologically.
  * **Aspect-locked 4:3 cards** with a maximum width of `512px` that dynamically auto-wrap to accommodate wide screens or browser zoom-out levels.
  * Support for markdown rendering (`react-markdown`) in detail modals.
* **Local Ingress Controls**:
  * Safe local directory traversal guard preventing path traversal attacks.
  * Secure HTTPS support out-of-the-box via dynamic self-signed certificate generation on startup.

---

## 🛠️ Stack & Architecture

| Layer | Technology | Description |
|---|---|---|
| **Frontend** | React, TypeScript, Tailwind CSS, Vite | Fast SPA, Lucide icons, dynamic Web Audio synth |
| **Backend** | Python Flask, flask-sock, watchdog | WebSocket communication, file crawler, folder open service |
| **Data Format** | Markdown (`index.md`) + YAML frontmatter | Easy, text-based cataloging |
| **Transport** | HTTPS & WSS (WebSocket Secure) | Local SSL generation |

---

## 📂 Data Directory Structure

Configure the watched folder (defaulting to the local `./data` directory or a custom path defined in `.env`) as follows:

```
watched_directory/
├── proj/              # Renders as Project Cards
│   └── 260601_project-slug/
│       ├── index.md
│       └── img.png    (Optional thumbnail)
├── cert/              # Renders as Certification Cards (Badge frame style)
│   └── 260613_cert-slug/
│       ├── index.md
│       └── img.png
├── item/              # Renders as Workstation/Hardware Cards (Clean style)
│   └── 260115_item-slug/
│       ├── index.md
│       └── img.png
└── achv/              # Renders as Achievement Cards (Golden glowing border)
    └── 260510_award-slug/
        ├── index.md
        └── img.png
```

### index.md YAML Frontmatter

Create an `index.md` inside your directory structure with the following properties:

```yaml
---
title: Chaos Meteor WebGL Renderer
datestart: 2026-06-15
dateend: 2026-06-21           # Optional, omit or leave empty for "Present"
skill: eew                     # Optional (3-letter Quas/Wex/Exort combination)
github: https://github.com/... # Optional
---

Your markdown details body here. This will display inside the "[📄 More]" details modal.
```

> [!NOTE]
> **Dynamic Underline Gradients**: Underline gradients on cards are computed dynamically based on the proportion and sequence of letters in the `skill` frontmatter field (e.g. `www` = solid Wex purple, `qwe` = equal Quas/Wex/Exort gradient). Omit the field to default to a clean neutral grey.

---

## 💻 Quick Start Setup

### 1. Prerequisites
Ensure you have the following installed on your system:
* **Python** (version 3.8+)
* **Node.js** (version 16+)

### 2. Configure Environment Variables
Copy `.env.example` to `.env` in the root folder:
```bash
cp .env.example .env
```
Open `.env` and set `PORTFOLIO_WATCH_DIR` to the folder containing your portfolio markdown data (or leave empty to default to the local `./data` directory).

### 3. Run the Application
#### Windows
Simply double-click or run:
```cmd
start.bat
```
*This script will create a Python virtual environment, install dependencies, compile the frontend, generate localhost SSL certificates, seed mock records (if the folder is empty), and boot the secure Flask server.*

#### macOS / Linux
Run the following commands in your shell:
```bash
# 1. Create and activate virtual environment
python3 -m venv .venv
source .venv/bin/activate

# 2. Install backend dependencies
pip install -r backend/requirements.txt

# 3. Compile frontend build assets
cd frontend
npm install
npm run build
cd ..

# 4. Start the secure Flask server
python3 backend/server.py
```

Open **`https://localhost:5000`** in your browser. (Since a self-signed certificate is generated for localhost development, accept the browser warning on your first visit).

---

## 🧪 Development Mode

If you'd like to make frontend changes with Hot Module Replacement (HMR) enabled:
1. Run the backend server (`python backend/server.py`) to handle the scan engine, WebSockets, and media server.
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   npm run dev
   ```
3. Open `https://localhost:5173`. The Vite server will proxy API and WebSocket connections automatically to the Flask backend running on port `5000`.