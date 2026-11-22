#!/usr/bin/env bash
# Build the resume PDF from the site source.
#
#   build-resume-pdf.sh [repo-dir] [output.pdf]
#
# Defaults are the spacedock layout: the repo clone at ~/work/resume-build/src
# and the PDF written to <repo-dir>/resume.pdf, which is the copy the site
# publishes at https://jimkirk.org/resume.pdf.
#
# Pipeline: Jekyll builds the site (no drafts, same as GitHub Pages) ->
# preprocess.py groups the resume into page-break-safe blocks -> WeasyPrint
# prints it through assets/css/print.css.
#
# Needs docker. The Jekyll gems cache and the WeasyPrint image are reused
# across runs; the first run is slow (bundle install), later ones about 40s.
set -euo pipefail

REPO="${1:-$HOME/work/resume-build/src}"
OUT_PDF="${2:-$REPO/resume.pdf}"
GEMS="${GEMS_DIR:-$HOME/containers/site-preview/gems}"
OUT="${OUT_DIR:-$HOME/work/resume-build/out}"
RUBY_IMAGE="${RUBY_IMAGE:-ruby:3.2}"
WEASY_IMAGE="${WEASY_IMAGE:-minidocks/weasyprint:latest}"

[ -d "$REPO/.git" ] || { echo "not a git clone: $REPO" >&2; exit 1; }
mkdir -p "$OUT" "$GEMS"

echo "== building the site from $(git -C "$REPO" rev-parse --short HEAD) on $(git -C "$REPO" rev-parse --abbrev-ref HEAD)"
docker run --rm -u "$(id -u):$(id -g)" \
  -v "$REPO":/src -v "$OUT":/out -v "$GEMS":/gems \
  -w /src -e GEM_HOME=/gems -e BUNDLE_PATH=/gems \
  "$RUBY_IMAGE" bash -lc '
    set -e
    export PATH=/gems/bin:$PATH
    if [ ! -x /gems/bin/bundle ]; then gem install bundler -v 2.3.26 --no-document >/dev/null; fi
    if [ ! -f /gems/.installed ]; then bundle install --quiet && touch /gems/.installed; fi
    rm -rf /out/*
    bundle exec jekyll build -d /out --config _config.yml,_config_docker.yml 2>&1 | tail -2
  '

[ -f "$OUT/cv/index.html" ] || { echo "no /cv/ page in the build" >&2; exit 1; }

echo "== grouping resume blocks"
python3 "$REPO/tools/resume-pdf/preprocess.py" "$OUT" --base-url file:///out/ \
  "$OUT/cv/index.html" "$OUT/cv/resume-print.html"

echo "== rendering the PDF"
# SOURCE_DATE_EPOCH pins the PDF's creation date to the source commit, so the
# same source renders byte-identical: a rebuild that changes nothing produces
# no diff and no commit.
# The epoch is the last non-merge commit that touched the resume itself, not
# the commit being built: a merge that brings this pipeline into master must
# not move it, or every merge would render a PDF that differs by its creation
# date alone and the refresh job would open a pointless pull request.
EPOCH="$(git -C "$REPO" log -1 --no-merges --format=%at -- _pages/cv.md)"
[ -n "$EPOCH" ] || EPOCH="$(git -C "$REPO" log -1 --format=%at)"
docker run --rm -e "SOURCE_DATE_EPOCH=$EPOCH" -v "$OUT":/out "$WEASY_IMAGE" \
  -m print --optimize-images \
  /out/cv/resume-print.html /out/resume.pdf

cp "$OUT/resume.pdf" "$OUT_PDF"
echo "== wrote $OUT_PDF ($(stat -c%s "$OUT_PDF") bytes)"
