#!/usr/bin/env python3
"""Prepare the built /cv/ page for the PDF renderer.

    preprocess.py <built-site-dir> <in.html> <out.html>

Three things the markdown source cannot express, done on the rendered HTML:

1. Group each role into a `.job__role` block inside a `section.job`, so the
   print stylesheet can keep a company name with the role it belongs to and
   never strand one at the foot of a page. The markdown is a flat run of
   paragraphs, which gives a page breaker nothing to hold on to.
2. Rewrite root-relative URLs (`/assets/...`, `/images/...`) to absolute file
   URLs, because the renderer loads the page over file://, where a leading
   slash means the filesystem root.
3. Set the PDF's own metadata: title and author, not the site's SEO title.

Stdlib only, no imports beyond re/sys/argparse.
"""

import argparse
import os
import re
import sys

COMPANY = re.compile(r'<p>\s*<a href="[^"]+">\s*<strong>', re.S)
ROLE = re.compile(r'<p>\s*<strong>', re.S)
BLOCK = re.compile(r"<p>.*?</p>|<ul>.*?</ul>", re.S)


def rebuild(text, classify):
    """Rewrite a run of top-level blocks, keeping everything between them.

    The gaps matter: they carry the closing tags of the surrounding layout and
    the site footer, so the page stays valid HTML after the rewrite.
    """
    out = []
    pos = 0
    for m in BLOCK.finditer(text):
        out.append(text[pos:m.start()])
        out.append(classify(m.group(0)))
        pos = m.end()
    out.append(text[pos:])
    return "".join(out)


def group_roles(body):
    """Wrap the work-experience blocks into section.job > .job__role units.

    A unit is one role: the employer line (only on the first role at that
    employer), the role line with its dates, the intro paragraph and the
    bullets. The print stylesheet keeps a unit off a page boundary, which is
    what stops a company name sitting alone at the foot of a page.
    """
    state = {"open": False, "has_role": False, "sections": 0, "roles": 0}

    def classify(block):
        out = []
        if COMPANY.match(block):
            if state["open"]:
                out.append("</div>")
            if state["sections"]:
                out.append("</section>")
            out.append('<section class="job">')
            state["sections"] += 1
            out.append('<div class="job__role">')
            state["roles"] += 1
            state["open"] = True
            state["has_role"] = False
        elif ROLE.match(block) and state["open"]:
            if state["has_role"]:
                # a further role at the same employer: its own unit
                out.append("</div>")
                out.append('<div class="job__role">')
                state["roles"] += 1
            state["has_role"] = True
        out.append(block.strip())
        return "\n".join(out)

    body = rebuild(body, classify)
    if state["open"]:
        body += "\n</div>"
    if state["sections"]:
        body += "\n</section>"
    return body, state["sections"], state["roles"]


def group_work_experience(html):
    start = re.search(r'<h2 id="work-experience".*?</h2>\s*<hr\s*/?>', html, re.S)
    if not start:
        return html, 0, 0
    head = html[: start.end()]
    rest = html[start.end():]
    nxt = re.search(r"<h2\b", rest)
    body = rest[: nxt.start()] if nxt else rest
    tail = rest[nxt.start():] if nxt else ""
    grouped, sections, roles = group_roles(body)
    return head + grouped + tail, sections, roles


def localise_urls(html, base_url):
    """file:// rendering: a leading slash would mean the filesystem root."""
    root = base_url.rstrip("/") + "/"
    html = re.sub(r'\b(href|src)="/(?!/)', lambda m: '%s="%s' % (m.group(1), root), html)
    html = re.sub(r'\b(href|src)=\'/(?!/)', lambda m: "%s='%s" % (m.group(1), root), html)
    return html


def set_metadata(html):
    html = re.sub(r"<title>.*?</title>", "<title>Jim Kirk - Resume</title>", html,
                  count=1, flags=re.S)
    html = re.sub(r'<meta name="description"[^>]*>', "", html)
    html = re.sub(r'<meta name="author"[^>]*>', "", html)
    html = re.sub(
        r"(<title>Jim Kirk - Resume</title>)",
        r'\1\n<meta name="author" content="Jim Kirk">'
        r'\n<meta name="description" content="Resume of Jim Kirk, Technology Executive, Halifax, Nova Scotia">',
        html, count=1)
    return html


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("site_dir", help="built site root (the directory holding cv/index.html)")
    ap.add_argument("--base-url", default=None,
                    help="URL the site root is mounted at for the renderer, e.g. "
                         "file:///out/ when it is a docker mount (default: the "
                         "site_dir's own file:// URL)")
    ap.add_argument("in_html")
    ap.add_argument("out_html")
    args = ap.parse_args()

    with open(args.in_html, encoding="utf-8") as fh:
        html = fh.read()

    html, sections, roles = group_work_experience(html)
    base_url = args.base_url or "file://" + os.path.abspath(args.site_dir)
    html = localise_urls(html, base_url)
    html = set_metadata(html)

    with open(args.out_html, "w", encoding="utf-8") as fh:
        fh.write(html)

    print("grouped %d employers / %d roles -> %s" % (sections, roles, args.out_html))
    if not sections:
        print("WARNING: no work-experience sections found; is the heading still "
              "'## Work Experience'?", file=sys.stderr)


if __name__ == "__main__":
    main()
