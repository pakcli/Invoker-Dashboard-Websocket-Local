# Data Structure & Directory Schema

The application structures and indexes content using local folders containing Markdown files and associated attachments.

---

## 📂 Watch Directory Layout

The application monitors the folder specified by the `PORTFOLIO_WATCH_DIR` environment variable (defaulting to `./data` in the project root). The directory contains four primary subfolders representing specific entry categories:

```
watched_directory/
├── proj/              # Projects
├── cert/              # Certifications
├── item/              # Workstation & Hardware
└── achv/              # Achievements
```

Inside each category folder, entries are organized in individual subdirectories:

```
proj/
└── 2026-06-25_dashboard-system/
    ├── index.md
    └── thumbnail.png
```

* **Directory Name**: Serves as the unique slug suffix for the entry. Must contain only alphanumeric characters, dashes, and underscores.
* **Required Files**: Each entry folder must contain an `index.md` file.

---

## 📜 Markdown Schema & YAML Frontmatter

The `index.md` file contains two parts: YAML frontmatter at the top (enclosed by triple dashes `---`), followed by the Markdown body.

### Frontmatter Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | String | Yes | The user-facing heading of the portfolio card. |
| `datestart` | Date (YYYY-MM-DD) | Yes | Start date used for sorting entries chronologically. |
| `dateend` | Date (YYYY-MM-DD) | No | End date. Omit or leave blank to display as "Present". |
| `skill` | String (3 chars) | No | Visual attribute filters (e.g., `qwe`, `www`, `qeq`). Must match `^[qwe]{3}$` (case-insensitive). Controls UI color gradients. |
| `github` | String (URL) | No | Link to a target source code repository. |
| `linkedin` | String (URL) | No | Link to a professional credential or post. |
| `done` | Boolean | No | Mark completion state. Defaults to `false`. |
| `dependencies` | List of Strings | No | List of entry IDs this item depends on. |

### Example Schema (`index.md`)

```yaml
---
title: Multi-Attribute Query Engine
datestart: 2026-06-15
dateend: 2026-06-21
skill: qwe
github: https://github.com/developer/query-engine
dependencies:
  - cert_backend-foundations
done: true
---

This engine performs in-memory evaluations of multi-layered filter options.
```

---

## 🎨 UI Attribute & Color Gradients

The `skill` parameter determines the card's underline indicator color gradient:
* Each character in the string (`q`, `w`, `e`) maps to a distinct CSS visual asset.
* For example:
  * `q` = Blue (Attribute 1)
  * `w` = Purple (Attribute 2)
  * `e` = Gold (Attribute 3)
* Combinations generate linear gradient spectrums based on the selected sequences (e.g., `qwe` transitions equally from Blue to Purple to Gold).

---

## 📎 Media and Attachments

The scanning crawler automatically catalogues folder contents alongside the Markdown files:

1. **Thumbnail Images**: The system scans the directory for image files. A file named `img.png` (or `thumbnail.png`, `thumbnail.jpg`, etc.) is mapped as the primary thumbnail.
2. **Document Previews**: PDF files are supported and rendered directly as thumbnails or document links in the UI preview modal.
3. **General Attachments**: Any file in the entry folder other than `index.md` is compiled into an `attachments` array and made accessible for download in the UI detail modal.
