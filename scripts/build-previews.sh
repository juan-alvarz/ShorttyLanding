#!/usr/bin/env bash
# Builds the GitHub Pages preview site: one folder per variant branch, plus scripts/previews/index.html
# at the root, which opens ?variant=<branch> (e.g. ?variant=22-cobalt-cat). Publishes it to the
# gh-pages branch, which Settings -> Pages serves from its root.
#   scripts/build-previews.sh            build and publish
#   scripts/build-previews.sh --no-push  build only, into .previews/site
# Variants: edit VARIANTS here and the list in scripts/previews/index.html together.
set -euo pipefail

VARIANTS=(01-cobalt 17-cat 21-cat-cobalt 22-cobalt-cat)
REPO_NAME=ShorttyLanding   # Pages serves the site at /<repo name>/
ROOT=$(git rev-parse --show-toplevel)
WORK="$ROOT/.previews"
SITE="$WORK/site"

git -C "$ROOT" fetch -q origin
rm -rf "$WORK" && mkdir -p "$SITE"
for v in "${VARIANTS[@]}"; do
  git -C "$ROOT" worktree add -q -f "$WORK/src/$v" "origin/versions/$v"
  (cd "$WORK/src/$v" && pnpm install --frozen-lockfile && pnpm astro build --base "/$REPO_NAME/$v/" --outDir "$SITE/$v")
  git -C "$ROOT" worktree remove --force "$WORK/src/$v"
done
cp "$ROOT/scripts/previews/index.html" "$SITE/index.html"
touch "$SITE/.nojekyll"   # keeps GitHub Pages from hiding Astro's _astro/ folders

[[ "${1:-}" == "--no-push" ]] && { echo "Built $SITE"; exit 0; }

# Publish: gh-pages holds only the built site, one commit on top of the last.
git -C "$ROOT" worktree add -q -f "$WORK/pages" origin/gh-pages 2>/dev/null \
  || git -C "$ROOT" worktree add -q -f --orphan -b gh-pages "$WORK/pages"
cd "$WORK/pages"
git rm -rq --ignore-unmatch . && cp -R "$SITE"/. .
git add -A && git commit -qm "Build previews: ${VARIANTS[*]}" && git push -q origin HEAD:gh-pages
git -C "$ROOT" worktree remove --force "$WORK/pages"
echo "Published to gh-pages"
