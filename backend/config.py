import os

# Load configuration values from environment variables or custom manual .env parsing
PORT = int(os.environ.get("PORT", 5000))
DEBOUNCE_SECONDS = float(os.environ.get("DEBOUNCE_SECONDS", 1.5))

LOCAL_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "data"))
env_watch_dir = os.environ.get("PORTFOLIO_WATCH_DIR")

# Try to load from .env file if it exists at the root of the project
if not env_watch_dir:
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    env_file = os.path.join(root_dir, ".env")
    if os.path.exists(env_file):
        try:
            with open(env_file, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith("#") and "=" in line:
                        k, v = line.split("=", 1)
                        if k.strip() == "PORTFOLIO_WATCH_DIR":
                            env_watch_dir = v.strip().strip('"').strip("'")
                            break
        except Exception as e:
            print(f"[CONFIG] Error reading .env file: {e}")

# Resolve WATCH_DIR with fallbacks
if env_watch_dir:
    WATCH_DIR = os.path.abspath(env_watch_dir)
elif os.path.exists("E:/data"):
    WATCH_DIR = "E:/data"
else:
    WATCH_DIR = LOCAL_DIR

CERT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "certs"))
CERT_PATH = os.path.join(CERT_DIR, "localhost.pem")
KEY_PATH = os.path.join(CERT_DIR, "localhost-key.pem")

print(f"[CONFIG] WATCH_DIR: {WATCH_DIR}")
print(f"[CONFIG] CERT_PATH: {CERT_PATH}")
print(f"[CONFIG] KEY_PATH: {KEY_PATH}")

