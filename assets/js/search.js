// Client-side search for The Log. Loads /search.json once and filters in place.
(function () {
  var input = document.getElementById('search-input');
  if (!input) return;
  var list = document.getElementById('search-results');
  var hint = document.getElementById('search-hint');
  var data = null;
  var loading = false;

  function esc(s) {
    return (s || '').replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function load() {
    if (data || loading) return;
    loading = true;
    fetch('/search.json')
      .then(function (r) { return r.json(); })
      .then(function (d) { data = d; loading = false; if (input.value.trim()) run(); })
      .catch(function () { hint.textContent = 'Search index failed to load.'; loading = false; });
  }

  function run() {
    if (!data) return;
    var q = input.value.trim().toLowerCase();
    list.innerHTML = '';
    if (!q) { hint.textContent = 'Start typing. Results appear below.'; return; }
    var terms = q.split(/\s+/).filter(Boolean);
    var hits = data.filter(function (p) {
      var hay = (p.title + ' ' + (p.body || p.excerpt || '')).toLowerCase();
      return terms.every(function (t) { return hay.indexOf(t) !== -1; });
    }).slice(0, 25);
    hint.textContent = hits.length
      ? hits.length + ' result' + (hits.length === 1 ? '' : 's')
      : 'No entries matched.';
    hits.forEach(function (p) {
      var li = document.createElement('li');
      li.className = 'search-result';
      li.innerHTML =
        '<a href="' + esc(p.url) + '">' +
        '<span class="search-result__title">' + esc(p.title) + '</span>' +
        '<span class="search-result__meta">' + esc(p.date) + '</span>' +
        '<span class="search-result__excerpt">' + esc(p.excerpt) + '</span>' +
        '</a>';
      list.appendChild(li);
    });
  }

  input.addEventListener('focus', load);
  input.addEventListener('input', function () { if (!data) { load(); } else { run(); } });
  load();
})();