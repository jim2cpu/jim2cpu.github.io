---
layout: single
title: "Search"
permalink: /search/
author_profile: false
---

{% include base_path %}
<p class="log-lead">Search every entry by title or text. Results narrow as you type.</p>

<div class="search-wrap">
  <input id="search-input" class="search-input" type="search" placeholder="Type to search the log" autocomplete="off" aria-label="Search the log">
  <p class="search-hint" id="search-hint">Start typing. Results appear below.</p>
  <ul class="search-results" id="search-results"></ul>
</div>

<script src="{{ base_path }}/assets/js/search.js" defer></script>