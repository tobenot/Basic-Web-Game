#!/usr/bin/env bash
set -euo pipefail

# Read defaults from .template-source if exists
if [[ -f .template-source ]]; then
  # shellcheck disable=SC1091
  source .template-source
fi

TEMPLATE_REPO="${TEMPLATE_REPO:-https://your.host/your-template.git}"
TEMPLATE_REF="${TEMPLATE_REF:-main}"
MANIFEST_FILE="${MANIFEST_FILE:-sync.manifest}"

if [[ ! -f "$MANIFEST_FILE" ]]; then
  echo "Manifest $MANIFEST_FILE not found. Expect lines of paths/globs."
  exit 1
fi

tmp_dir="$(mktemp -d)"
backup_dir=".template_backups/$(date +%Y%m%d-%H%M%S)"
mkdir -p "$backup_dir"

echo "Cloning $TEMPLATE_REPO@$TEMPLATE_REF ..."
git clone --depth=1 --branch "$TEMPLATE_REF" "$TEMPLATE_REPO" "$tmp_dir" >/dev/null

echo "Syncing files listed in $MANIFEST_FILE ..."
while IFS= read -r path || [[ -n "$path" ]]; do
  [[ -z "$path" || "$path" =~ ^# ]] && continue
  src="$tmp_dir/$path"
  if [[ -e "$src" ]]; then
    mkdir -p "$(dirname "$backup_dir/$path")" || true
    if [[ -e "$path" ]]; then
      rsync -a --quiet "$path" "$backup_dir/$(dirname "$path")/.."
    fi
    rsync -a --delete-excluded "$src" "$(dirname "$path")/.."
    echo "Synced: $path"
  else
    echo "Skip (not found in template): $path"
  fi
done < "$MANIFEST_FILE"

echo "Done. Backups at: $backup_dir"