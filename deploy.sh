#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "Pulling latest code..."
git pull --ff-only

echo "Building updated containers..."
docker compose build --pull

echo "Restarting services..."
docker compose up -d --remove-orphans

echo "Deployment complete."
