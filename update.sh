#!/usr/bin/env bash
# Push a change. Run this inside the folder after editing anything.
#   ./update.sh "added the tennis serve stats"
set -e
git add -A
git commit -qm "${1:-update prototype}"
git push
echo "Pushed. GitHub Pages rebuilds in about a minute."
