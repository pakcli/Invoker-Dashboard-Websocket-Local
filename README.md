# 🎮 Workspace Portfolio Dashboard

A premium, interactive developer portfolio dashboard and local workspace indexer designed for developers, sysadmins, and IT tech wizards who love competitive gaming. 

This repository allows you to document and manage your work history, certifications (*"serts"*), side projects, achievements, and hardware setups. It watches your local directories in real-time, compiles YAML frontmatter, synthesizes custom interface feedback tones using the **Web Audio API**, and uses WebSockets to hot-reload your viewport instantly.

Choose your hero alignment below:

---

## 🔵🟣🟠 1. Invoker's Spellbook (For DOTA 2 Players)

> *"A mind structured and precise... I invoke the catalog of my legacy!"*

If you are a Dota 2 player, you will feel right at home with the default HUD configuration. Map your portfolio's frontmatter attributes to spell components and summon your items into view:

* **Quas, Wex, and Exort Orbs**:
  * Keyboard hotkeys: Queue elements using **Q (Quas - Blue)**, **W (Wex - Purple)**, and **E (Exort - Gold)**.
  * Press **R (Invoke)** to execute the active combination and instantly query matching cards.
  * Press **Space (Clear)** to empty your active orb queue.
* **Dynamic Underline Gradients**: Underline borders on cards are computed dynamically based on the proportion and sequence of letters in the `skill` frontmatter field (e.g. `www` = solid Wex purple, `qwe` = equal Quas/Wex/Exort gradient). Omit the field to default to a clean neutral grey.
* **Synthesized Spell Chimes**: Uses the Web Audio API to play real-time magical chime sweeps and clicks corresponding to your orb queues and spell invocation.

---

## 🌙 2. Code of the Moon Elf (For MLBB Players)

> *"The Code of the Moon Elf dictates my workspace... heal and index!"*

For Mobile Legends: Bang Bang (MLBB) players, the dashboard serves as a support HUD themed after the Moon Elf King, **Estes**. Use the scrolls of scriptures and moonlight domains to manage your portfolio nodes:

* **Scripture of the Moon Elf (Automatic Sync)**:
  * The background scan engine watches your data directory continuously. Changes dynamically charge the dashboard, updating statistics instantly.
* **Moonlight Immersion (Host Ingress Linking)**:
  * Click to link the web interface to your host operating system. The server securely spawns the default file browser to target files, maintaining absolute path-traversal safety boundaries.
* **Domain of Moon Goddess (Tri-Attribute Query Circles)**:
  * Use the circular HUD filters (`Q`, `W`, and `E` keys) to cast a domain slowing/restricting filter across the grid, narrowing down cards dynamically.
* **Blessing of Moon Goddess (WebSocket Hot-Reload)**:
  * Constant synchronization! An event is broadcast over a WebSocket stream (`wss://`) to heal all open client tabs, refreshing components in memory without page reloads.

---

## 📂 Data Directory Structure

Configure the watched folder (defaulting to `./data` or custom path defined in `.env`) as follows:

```
watched_directory/
├── proj/              # Projects (Renders as Project Cards)
│   └── 260601_project-slug/
│       ├── index.md
│       └── img.png    (Optional thumbnail)
├── cert/              # Certifications (Renders as Certification Cards - Badge frame style)
│   └── 260613_cert-slug/
│       ├── index.md
│       └── img.png
├── item/              # Workstation & Hardware (Renders as Workstation Cards - Clean style)
│   └── 260115_item-slug/
│       ├── index.md
│       └── img.png
└── achv/              # Achievements (Renders as Achievement Cards - Golden glowing border)
    └── 260510_award-slug/
        ├── index.md
        └── img.png
```

### index.md Frontmatter Runes (Schema)

Create an `index.md` inside your directory structure with the following properties:

```yaml
---
title: Chaos Meteor WebGL Renderer
datestart: 2026-06-15
dateend: 2026-06-21           # Optional, omit or leave empty for "Present"
skill: eew                     # Optional (3-letter combination of q, w, e)
github: https://github.com/... # Optional
---

Your markdown details body here. This will display inside the details modal.
```

---

## ⚔️ Setup & Installation

### 1. Prerequisites
* **Python** (version 3.8+)
* **Node.js** (version 16+)

### 2. Configuration
Copy `.env.example` to `.env` in the root folder:
```bash
cp .env.example .env
```
Open `.env` and set `PORTFOLIO_WATCH_DIR` to the folder containing your portfolio markdown data.

### 3. Run the Application
#### Windows
Run the boot script:
```cmd
start.bat
```

#### macOS / Linux
Run the commands in your shell:
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt

cd frontend
npm install
npm run build
cd ..

python3 backend/server.py
```

Open **`https://localhost:5000`** in your browser. Accept the localhost self-signed certificate warning on your first visit.