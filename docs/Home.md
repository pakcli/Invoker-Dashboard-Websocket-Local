# Developer Portfolio Dashboard Wiki

Welcome to the documentation for the Developer Portfolio Dashboard. This application serves as a local, real-time indexer and visualization tool for tracking professional history, technical certifications, workstation components, and key achievements.

---

## 📋 Project Overview

The system is designed as a secure, fast, and local single-page dashboard. It monitors a target directory of Markdown files, parses metadata from frontmatter headers, and renders them onto an interactive chronological timeline feed.

This dashboard provides structural workspace management, allowing users to:
* Organise side projects, certifications, workstation inventories, and accomplishments.
* Interactively search and filter entries using a dynamic tri-attribute visual indicator panel.
* Edit, create, and delete records directly from a secure web portal.
* Instantly open directories on the host operating system directly from the web interface.

---

## 📚 Documentation Sections

Explore the technical details of the application through the following pages:

1. **[System Architecture](System-Architecture.md)**: Details the backend Flask application, Vite React frontend, file synchronization pipeline, and secure directory-watching architecture.
2. **[Data Structure & Directory Schema](Data-Structure.md)**: Explains the watched folder structure, categories, indexing patterns, and Markdown YAML frontmatter schemas.
3. **[API Reference](API-Reference.md)**: Specifications for the HTTP REST endpoints, directory access endpoints, and WebSocket real-time event broadcaster.

---

## ⚡ Main Functionalities

### Tri-Attribute Filter System
The dashboard includes an interactive filter bar mapped to three distinct attribute indicators (represented as circular UI controls labeled `Q`, `W`, and `E`). 
* Users can toggle combinations of these three attributes to isolate portfolio items matching specific tags.
* A clear button is available to reset selected filters, and an execution button compiles the current combinations.
* Each card shows dynamic gradient lines computed from the distribution of these three attributes.

### Tegak Lurus Planning (Planning Vision)
The **Tegak Lurus Planning** interface (formerly Dreaming Oracle) provides an annual chronological timeline of future tasks (start date from today onwards).
* Starts with a Dota-style matchmaking prompt and chimes on accepting.
* Performs a sequential 3D card-flip reveal with linear animation delays based on calendar year distance (500ms per year from today).
* Groups cards dynamically by calendar year sections under sleek, glowing emerald headers.
* Filters out completed (done) entries by default, switchable via a header toggle (Show All / Undone) which is persistently saved to the HUD sidebar.

### Real-Time Synchronization & Status Edits
A background file-monitoring process scans for changes in the folder directory structure. On identifying any additions or modifications:
1. The catalog database is rebuilt.
2. An update signal is pushed to active clients via a persistent WebSocket connection.
3. The UI hot-reloads the updated state immediately without page refreshes.

Additionally, checking or unchecking a card's done status in either the timeline grid or the edit panel immediately propagates state changes across the UI (utilizing optimistic `checkedCards` state synchronization) and persists the update directly to the YAML frontmatter on disk.

### Audio Interface Feedback
The dashboard uses the Web Audio API to play localized synthesised sound alerts (ticks and chimes) corresponding to UI interactions, ensuring a tactile user experience. Completing achievements triggers a special *Dota 2 Treasure Open* SFX, while other completions play the *Ready Check Yes* chime.
