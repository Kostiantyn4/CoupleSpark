#!/usr/bin/env bash
# Renders the app icon PNGs in assets/images from the SVG sources in assets/icon-src.
# File names match the paths referenced in app.json, so no config change is needed.
# Requires rsvg-convert (Debian/Ubuntu: sudo apt install librsvg2-bin). Runs fully offline.
set -euo pipefail

cd "$(dirname "$0")/.."

SRC=assets/icon-src
OUT=assets/images

if ! command -v rsvg-convert >/dev/null 2>&1; then
  echo "rsvg-convert not found. Install it with: sudo apt install librsvg2-bin" >&2
  exit 1
fi

render() {
  local svg=$1 png=$2 size=$3
  rsvg-convert --width "$size" --height "$size" "$SRC/$svg" --output "$OUT/$png"
  echo "  $OUT/$png (${size}x${size})"
}

echo "Rendering icons:"
render icon.svg                     icon.png                     1024
render android-icon-foreground.svg  android-icon-foreground.png  1024
render android-icon-background.svg  android-icon-background.png  1024
render android-icon-monochrome.svg  android-icon-monochrome.png  1024
render splash-icon.svg              splash-icon.png              1024
echo "Done."
