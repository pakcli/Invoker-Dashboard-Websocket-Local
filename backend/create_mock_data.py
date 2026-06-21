import os
import sys
from PIL import Image, ImageDraw, ImageFont

def generate_thumbnail(path, width=400, height=250, bg_color=(30, 41, 59), fg_color=(255, 255, 255), label="Thumbnail"):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img = Image.new('RGB', (width, height), color=bg_color)
    d = ImageDraw.Draw(img)
    
    # Draw simple design (outer border, some lines, and text)
    d.rectangle([(10, 10), (width - 10, height - 10)], outline=fg_color, width=2)
    d.line([(10, 10), (width - 10, height - 10)], fill=(int(bg_color[0]*1.2), int(bg_color[1]*1.2), int(bg_color[2]*1.2)), width=1)
    d.line([(10, height - 10), (width - 10, 10)], fill=(int(bg_color[0]*1.2), int(bg_color[1]*1.2), int(bg_color[2]*1.2)), width=1)
    
    # Draw centered text block
    box_w, box_h = 240, 40
    d.rectangle([(width//2 - box_w//2, height//2 - box_h//2), (width//2 + box_w//2, height//2 + box_h//2)], fill=(15, 23, 42), outline=fg_color, width=1)
    
    try:
        font = ImageFont.load_default()
        d.text((width//2 - 90, height//2 - 6), label, fill=fg_color, font=font)
    except:
        d.text((width//2 - 90, height//2 - 6), label, fill=fg_color)
        
    img.save(path)
    print(f"[MOCK] Created thumbnail at {path}")

def build_mock_structure(watch_dir):
    print(f"[MOCK] Seeding watch directory structure in: {watch_dir}")
    
    # Proj
    p1 = os.path.join(watch_dir, "proj", "260601_ufc-filter")
    os.makedirs(p1, exist_ok=True)
    with open(os.path.join(p1, "index.md"), "w", encoding="utf-8") as f:
        f.write("""---
title: UFC Modesty Filter
datestart: 2026-06-01
dateend: 2026-06-20
skill: eeq
github: https://github.com/dota2-invoker/ufc-modesty-filter
---

This project implements a real-time **YOLO AI censorship filter** optimized for live broadcast streams of mixed martial arts events.

## Key Accomplishments
- Real-time video frame parsing with < 15ms latency.
- Automated blur filter application for excessive violent content.
- Dynamic color-shifting indicators based on processing load (EEQ).
- Seamless integration with OBS Studio via web overlay plugin.
""")
    generate_thumbnail(os.path.join(p1, "img.png"), bg_color=(220, 38, 38), label="YOLO AI Censorship Filter")

    # Cert
    c1 = os.path.join(watch_dir, "cert", "260613_comptia-net")
    os.makedirs(c1, exist_ok=True)
    with open(os.path.join(c1, "index.md"), "w", encoding="utf-8") as f:
        f.write("""---
title: CompTIA Network+
datestart: 2026-06-13
dateend: 2026-06-20
skill: qqw
---

Earned the industry-standard network management credential validating infrastructure design, operations, security protocols, and active troubleshooting.

## Verification Details
- **Score:** 842 / 900
- **Topics Covered:** Subnetting, IPv4/IPv6 integration, routing protocols, and tri-band Quas-Wex packet inspection strategies.
""")
    generate_thumbnail(os.path.join(c1, "img.png"), bg_color=(37, 99, 235), label="CompTIA Network+ Badge")

    # Achv
    a1 = os.path.join(watch_dir, "achv", "260510_hackathon-champ")
    os.makedirs(a1, exist_ok=True)
    with open(os.path.join(a1, "index.md"), "w", encoding="utf-8") as f:
        f.write("""---
title: Regional Hackathon Champion
datestart: 2026-05-10
dateend: 2026-05-12
skill: qwe
---

First place winner out of 140 teams at the Garuda Hacks 2026. Designed a decentralized grid balancing algorithm using smart-contracts to redistribute excess local solar capacity.

## Project Details
- **Award:** Golden Shield Trophy & 50,000,000 IDR
- **Core Tech:** Solidity, Next.js, and Quas-Wex-Exort sensor arrays.
""")
    generate_thumbnail(os.path.join(a1, "img.png"), bg_color=(217, 119, 6), label="Garuda Hacks 2026 Gold")

    # Item
    i1 = os.path.join(watch_dir, "item", "260115_dev-laptop")
    os.makedirs(i1, exist_ok=True)
    with open(os.path.join(i1, "index.md"), "w", encoding="utf-8") as f:
        f.write("""---
title: Flying Laptop Dev Node - 2026
datestart: 2026-01-15
skill: www
---

The primary mobile workstation deployed for heavy programming, virtualization, and model fine-tuning.

## System Specifications
- **Model:** Framework Laptop 16 (DIY Edition)
- **CPU:** AMD Ryzen 7 7840HS
- **GPU:** AMD Radeon RX 7700S
- **Memory:** 64GB DDR5 (Wex maximized speed)
""")
    generate_thumbnail(os.path.join(i1, "img.png"), bg_color=(124, 58, 237), label="Framework Workstation")

    # Project 2 (Jun 2026)
    p2 = os.path.join(watch_dir, "proj", "260615_chaos-meteor-renderer")
    os.makedirs(p2, exist_ok=True)
    with open(os.path.join(p2, "index.md"), "w", encoding="utf-8") as f:
        f.write("""---
title: Chaos Meteor WebGL Renderer
datestart: 2026-06-15
dateend: 2026-06-21
skill: eew
github: https://github.com/dota2-invoker/chaos-meteor-webgl
---

A high-performance WebGL-based particle rendering engine simulating the chaotic descent of flaming meteors.

## Features
- Over 100,000 active fire particles rendered at stable 60 FPS.
- Interactive collision detection with local surface terrain.
- Dynamic color temperature mapping based on particle age (Exort-Exort-Wex).
""")
    generate_thumbnail(os.path.join(p2, "img.png"), bg_color=(249, 115, 22), label="WebGL Chaos Meteor")

    # Cert 2 (Jun 2026)
    c2 = os.path.join(watch_dir, "cert", "260605_ice-wall-defense")
    os.makedirs(c2, exist_ok=True)
    with open(os.path.join(c2, "index.md"), "w", encoding="utf-8") as f:
        f.write("""---
title: Ice Wall Security Protocol Cert
datestart: 2026-06-05
dateend: 2026-06-06
skill: qqe
---

Certified validation for establishing multi-layered defensive frost barriers to prevent brute-force ingress.

## Exam Performance
- **Score:** 98%
- **Domain Focus:** Dynamic perimeter freezing, DDoS traffic stalling, and Quas-Quas-Exort structural resilience.
""")
    generate_thumbnail(os.path.join(c2, "img.png"), bg_color=(14, 165, 233), label="Ice Wall Security Cert")

    # Item 2 (Jun 2026)
    i2 = os.path.join(watch_dir, "item", "260625_aghs-scepter")
    os.makedirs(i2, exist_ok=True)
    with open(os.path.join(i2, "index.md"), "w", encoding="utf-8") as f:
        f.write("""---
title: Aghanim's Scepter Dev Tool
datestart: 2026-06-25
skill: qwe
---

An advanced integrated development instrument that automatically upgrades invoked skills to their ultimate capability.

## Specifications
- **Hardware Upgrade:** Custom mechanical keypad with high-precision hot-swappable switches.
- **Microcontroller:** Raspberry Pi Pico running custom firmware for macro automation.
- **Synergy:** Automatically boosts spell invoking speed and key debounce response.
""")
    generate_thumbnail(os.path.join(i2, "img.png"), bg_color=(79, 70, 229), label="Aghanim's Scepter Tool")


if __name__ == "__main__":
    import sys
    # Resolve correct default WATCH_DIR dynamically
    try:
        from config import WATCH_DIR
        target = WATCH_DIR
    except:
        target = "./data"
        
    watch_dir = sys.argv[1] if len(sys.argv) > 1 else target
    build_mock_structure(watch_dir)
