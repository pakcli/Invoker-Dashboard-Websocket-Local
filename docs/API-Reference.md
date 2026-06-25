# API Reference

The server exposes HTTP REST endpoints and a WebSocket channel to enable database updates, directory access, file manipulation, and real-time frontend updates.

---

## 📡 REST API Endpoints

### 1. Retrieve Portfolio Entries
* **URL**: `/api/entries`
* **Method**: `GET`
* **Description**: Returns the complete list of parsed entries, sorted chronologically from newest to oldest.
* **Response Content-Type**: `application/json`
* **Response Schema**:
  ```json
  [
    {
      "id": "proj_webgl-renderer",
      "source": "proj",
      "title": "WebGL Engine",
      "datestart": "2026-06-15",
      "dateend": "2026-06-21",
      "skill": "qwe",
      "github": "https://github.com/...",
      "linkedin": "",
      "folderPath": "d:\\0pro\\backend-python-porto\\data\\proj\\webgl-renderer",
      "imgPath": "/api/media/proj/webgl-renderer/thumbnail.png",
      "attachments": ["thumbnail.png", "blueprint.pdf"],
      "body": "Markdown details content here",
      "done": true,
      "dependencies": []
    }
  ]
  ```

---

### 2. Create or Update Entry
* **URL**: `/api/entries/create`
* **Method**: `POST`
* **Content-Type**: `multipart/form-data`
* **Parameters**:
  * `category` (String, Required): Target subdirectory category (`proj`, `cert`, `item`, `achv`).
  * `folderName` (String, Required): Name of the folder to create/target (slug).
  * `content` (String, Required): The exact markdown content to write to `index.md`.
  * `originalCategory` (String, Optional): Used to rename or relocate an entry's category.
  * `originalFolderName` (String, Optional): Used to rename or relocate an entry's folder name.
  * `thumbnailFilename` (String, Optional): Name of the uploaded file designated as the thumbnail.
  * `files` (File Upload, Optional): Array of file attachments.
  * `deleteFiles` (Array of Strings, Optional): List of attachment filenames to delete from the folder.
* **Response**: `{"success": true}` on success, or an error payload (e.g. `{"error": "Access denied"}`).

---

### 3. Delete Entry
* **URL**: `/api/entries/delete`
* **Method**: `POST`
* **Content-Type**: `application/x-www-form-urlencoded` or `multipart/form-data`
* **Parameters**:
  * `category` (String, Required): Folder category (`proj`, `cert`, `item`, `achv`).
  * `folderName` (String, Required): Subfolder name containing the target entry.
* **Response**: `{"success": true}` or error JSON.

---

### 4. Toggle Completion Status
* **URL**: `/api/entries/toggle-done`
* **Method**: `POST`
* **Content-Type**: `application/json`
* **Request Body**:
  ```json
  {
    "id": "proj_webgl-renderer",
    "done": true
  }
  ```
* **Description**: Updates the `done` YAML frontmatter key in the target `index.md` file without changing other fields.
* **Response**: `{"success": true}` or error JSON.

---

### 5. Duplicate Entry
* **URL**: `/api/entries/duplicate`
* **Method**: `POST`
* **Content-Type**: `application/json`
* **Request Body**:
  ```json
  {
    "id": "proj_webgl-renderer"
  }
  ```
* **Description**: Clones an entry directory, creating a new directory appended with `-copy`. Automatically updates the duplicate's frontmatter `title` by appending ` (Copy)` to differentiate it.
* **Response**: `{"success": true}` or error JSON.

---

### 6. Serve File Media
* **URL**: `/api/media/<category>/<entry_name>/<filename>`
* **Method**: `GET`
* **Description**: Securely serves files (images, PDFs) associated with a specific entry folder.
* **Security**: Enforces absolute path checks to prevent serving files outside of the configured watch directory.

---

### 7. Open Directory in Host File Explorer
* **URL**: `/api/open-folder`
* **Method**: `POST`
* **Content-Type**: `application/json`
* **Request Body**:
  ```json
  {
    "folderPath": "d:\\0pro\\backend-python-porto\\data\\proj\\webgl-renderer"
  }
  ```
* **Description**: Launches the default OS file explorer (e.g., File Explorer on Windows, Finder on macOS) to target the folder on the host machine.
* **Security**: Rejects request with a `403 Forbidden` if the `folderPath` target does not resolve inside the configured root watch directory.

---

## 🔌 WebSocket Connection

* **Address**: `wss://<host>:<port>/ws` (or `ws://` in HTTP mode)
* **Description**: Handles persistent active-client connections to push live cache reloads on directory modifications.
* **Messages**:
  * **Keep-Alive**: Client sends periodic heartbeat messages to prevent timeouts.
  * **Server Broadcast Event**: On any database rebuild, the server emits:
    ```json
    {
      "event": "dashboard_update",
      "data": [ ...updated entries array... ]
    }
    ```
