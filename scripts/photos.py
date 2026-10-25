"""Build the responsive WebP sizes in public/photos/ from the masters in photos-src/.

    python scripts/photos.py

Each master becomes <name>-480.webp, <name>-960.webp and <name>-<full>.webp, where
<full> is the master's own width capped at 1536. src/data/photos.js builds the
srcset from the same widths, so keep WIDTHS and MAX in step with its `photo()` helper.
Re-saving also drops EXIF/GPS from what ships.
"""
from pathlib import Path

from PIL import Image

WIDTHS = (480, 960)
MAX = 1536
src = Path('photos-src')
out = Path('public/photos')
out.mkdir(parents=True, exist_ok=True)

for master in sorted(src.glob('*.jpg')):
    im = Image.open(master).convert('RGB')
    for w in (*WIDTHS, min(MAX, im.width)):
        h = round(im.height * w / im.width)
        dest = out / f'{master.stem}-{w}.webp'
        im.resize((w, h), Image.LANCZOS).save(dest, 'WEBP', quality=78, method=6)
        print(f'{dest}  {dest.stat().st_size // 1024} KB')
