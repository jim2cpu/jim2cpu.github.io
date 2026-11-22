# resume-pdf

Turns the resume page (`_pages/cv.md`, the source of truth) into the PDF that
gets submitted with job applications.

    build-resume-pdf.sh [repo-dir] [output.pdf]

Output defaults to `<repo-dir>/resume.pdf`, which is the file the site publishes
at `https://jimkirk.org/resume.pdf`.

## What it does

1. `jekyll build` in a `ruby:3.2` container, **without** `--drafts`, so the PDF
   is built from exactly what GitHub Pages would publish.
2. `preprocess.py` on the rendered `/cv/` page:
   - wraps each role in `section.job > .job__role` so a page break cannot strand
     a company name at the foot of a page (the markdown is a flat run of
     paragraphs, which gives a page breaker nothing to hold on to);
   - rewrites root-relative URLs (`/assets/...`) to `file://` URLs, because the
     renderer loads the page from disk;
   - sets the PDF's own title and author instead of the site's SEO title.
3. WeasyPrint (`minidocks/weasyprint`) prints the page with
   `assets/css/print.css`, which forces the light theme, hides the site chrome
   and sets up Letter pages, section rules and the footer.

`SOURCE_DATE_EPOCH` is pinned to the last non-merge commit that touched
`_pages/cv.md`, so the same resume always renders byte-identical and a merge
that only brings this pipeline into master does not change the output. That is
what lets the spacedock job tell a real change from a rebuild that changed
nothing.

## Where the styling lives

- `assets/css/print.css` - the whole printed appearance, loaded with
  `media="print"` on every page, so a browser's Ctrl+P gives the same clean
  sheet on any page of the site.
- `_includes/resume-print-head.html` - the letterhead (name, title, contact,
  headshot) at the top of the PDF. Hidden on screen by `assets/css/design.css`.
- `assets/fonts/inter-*.otf` - Inter (SIL OFL 1.1, license alongside) is
  self-hosted so the PDF renders identically wherever it is built.

## Changing the resume

Edit `_pages/cv.md` and push. Nothing else needs touching: the web page and the
PDF both come from that file.

The contact line in `_includes/resume-print-head.html` is the one duplicated
value in the pipeline; keep it in step with the resume body if the email, phone
or city changes.

## On spacedock

`~/bin/resume-pdf.sh` fetches `master` from Forgejo, runs this script when
anything the PDF depends on has changed, and opens a pull request with the
refreshed `resume.pdf`. The systemd timer `resume-pdf.timer` runs it hourly: a
quiet run costs about 11 seconds and a vault unlock, and the resume changes
perhaps monthly, so there is nothing to gain from checking more often. Log:
`~/resume/resume-pdf.log`.

The resume page deliberately carries no link to the PDF. It is a file for job
applications, not a thing for visitors to download, so do not add a button to
`_pages/cv.md`.
