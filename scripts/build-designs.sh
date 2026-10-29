#!/usr/bin/env bash
# Build design sites from designs/<name> into hub/sites/<name>.
#
#   scripts/build-designs.sh            # build every design
#   scripts/build-designs.sh pink       # build just one (or several)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/designs"

names=("$@")
[ ${#names[@]} -eq 0 ] && names=(*/) && names=("${names[@]%/}")

for name in "${names[@]}"; do
  echo "🔨 Building $name"
  (
    cd "$ROOT/designs/$name"
    [ -d node_modules ] || pnpm install
    npx vite build --base="/sites/$name/"
  )
  rm -rf "$ROOT/hub/sites/$name"
  mkdir -p "$ROOT/hub/sites/$name"
  cp -r "$ROOT/designs/$name/dist/public/." "$ROOT/hub/sites/$name/"
  echo "✅ hub/sites/$name"
done
