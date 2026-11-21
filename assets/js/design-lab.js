// Preview-only design lab (P3-15). Never renders on the production host.
// Applies saved choices on every page, computes a live stardate, and builds
// the panel only on the landing page of a preview host.
(function () {
  var KEY = { accent: 'jk.accent', type: 'jk.type', trek: 'jk.trek' };
  var html = document.documentElement;

  function apply(accent, type, trek) {
    if (accent) html.setAttribute('data-accent', accent);
    if (type) html.setAttribute('data-type', type);
    html.classList.toggle('trek-more', trek === 'more');
  }

  try {
    var a0 = localStorage.getItem(KEY.accent) || 'lcars';
    var t0 = localStorage.getItem(KEY.type) || 'chakra';
    var k0 = localStorage.getItem(KEY.trek) || 'more';
    apply(a0, t0, k0);
  } catch (e) {}

  // Live stardate: year + zero-padded day of year, recomputed on each load.
  function setStardate() {
    var el = document.querySelector('[data-stardate]');
    if (!el) return;
    var now = new Date();
    var y = now.getFullYear();
    var start = Date.UTC(y, 0, 1);
    var today = Date.UTC(y, now.getMonth(), now.getDate());
    var day = Math.floor((today - start) / 86400000) + 1;
    el.textContent = y + '.' + String(day).padStart(3, '0');
  }
  setStardate();

  var host = location.hostname;
  var isPreview = host.indexOf('preview') !== -1 || host.indexOf('localhost') !== -1 || host.indexOf('127.0.0.1') !== -1;
  if (!isPreview) return;
  if (!document.querySelector('.hero')) return;

  var groups = [
    { key: KEY.accent, attr: 'data-accent', label: 'Accent', def: 'lcars',
      options: [['gold','Gold'],['lcars','LCARS amber'],['copper','Copper'],['red','Command red'],['teal','Sciences teal']] },
    { key: KEY.type, attr: 'data-type', label: 'Display type', def: 'chakra',
      options: [['jost','Jost'],['grotesk','Space Grotesk'],['chakra','Chakra Petch'],['michroma','Michroma']] },
    { key: KEY.trek, attr: null, label: 'Trek dial', def: 'more',
      options: [['subtle','Subtle'],['more','More']] }
  ];

  var lab = document.createElement('div');
  lab.className = 'lab';
  var body = document.createElement('div');
  body.className = 'lab__body';

  function current(group) {
    if (group.key === KEY.trek) return html.classList.contains('trek-more') ? 'more' : 'subtle';
    return html.getAttribute(group.attr) || group.def;
  }

  groups.forEach(function (group) {
    var g = document.createElement('p');
    g.className = 'lab__group';
    g.textContent = group.label;
    body.appendChild(g);
    var row = document.createElement('div');
    row.className = 'lab__row';
    group.options.forEach(function (opt) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = opt[1];
      b.dataset.v = opt[0];
      if (current(group) === opt[0]) b.classList.add('on');
      b.addEventListener('click', function () {
        var a = localStorage.getItem(KEY.accent) || 'lcars';
        var t = localStorage.getItem(KEY.type) || 'chakra';
        var k = localStorage.getItem(KEY.trek) || 'more';
        if (group.key === KEY.accent) a = opt[0];
        if (group.key === KEY.type) t = opt[0];
        if (group.key === KEY.trek) k = opt[0];
        try { localStorage.setItem(KEY.accent, a); localStorage.setItem(KEY.type, t); localStorage.setItem(KEY.trek, k); } catch (e) {}
        apply(a, t, k);
        row.querySelectorAll('button').forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on');
      });
      row.appendChild(b);
    });
    body.appendChild(row);
  });

  var toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'lab__toggle';
  toggle.textContent = 'Design lab';
  toggle.addEventListener('click', function () { lab.classList.toggle('open'); });

  lab.appendChild(body);
  lab.appendChild(toggle);
  document.body.appendChild(lab);
})();