# Source of truth

This repository is the source of truth for jimkirk.org.

The live site is built and served by GitHub Pages from
[jim2cpu/jim2cpu.github.io](https://github.com/jim2cpu/jim2cpu.github.io). A push
mirror configured in this repository's settings pushes every branch and tag here
to that GitHub repository on each commit (and every 8 hours), force-updating it.
GitHub is therefore a pure replica: commit here, never there, because anything
created only on GitHub is removed by the next sync.

Jekyll ignores directories whose names begin with a dot, so nothing in this
directory is published to the site. This file exists to document the arrangement
and to have a harmless commit to prove the mirror path works end to end.

Ownership was transferred to jimbo on 2026-11-17, and Agent Kirk retains admin
on the repository so it can keep pushing site changes here. The GitHub deploy
key and the push mirror are unaffected by the move.

Added by Agent Kirk, 2026-11-17.
