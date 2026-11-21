// Preview-only design lab (P3-15). Never renders on the production host.
// Applies saved choices on every page; builds the panel only on the landing page.
(function () {
  var KEY = { accent: 'jk.accent', type: 'jk.type', trek: 'jk.trek' };
  var html = document.documentElement;

  function apply(accent, type, trek) {
    if (accent) html.setAttribute('data-accent', accent);
    if (type) html.setAttribute('data-type', type);
    html.classList.toggle('trek-more', trek === 'more');
  }

  // Apply saved choices early (also done inline in head to avoid a flash).
  try {
    apply(localStorage.getItem(KEY.accent),
          localStorage.getItem(KEY.type),
          localStorage.getItem(KEY.trek));
  } catch (e) {}

  var host = location.hostname;
  var isPreview = host.indexOf('preview') !== -1 || host.indexOf('localhost') !== -1 || host.indexOf('127.0.0.1') !== -1;
  if (!isPreview) return;
  if (!document.querySelector('.hero')) return; // panel only on the landing page

  var groups = [
    { key: KEY.accent, attr: 'data-accent', label: 'Accent',
      options: [['gold','Gold'],['lcars','LCARS amber'],['copper','Copper'],['red','Command red'],['teal','Sciences teal']] },
    { key: KEY.type, attr: 'data-type', label: 'Display type',
      options: [['jost','Jost'],['grotesk','Space Grotesk'],['chakra','Chakra Petch'],['michroma','Michroma']] },
    { key: KEY.trek, attr: null, label: 'Trek dial',
      options: [['subtle','Subtle'],['more','More']] }
  ];

  var lab = document.createElement('div');
  lab.className = 'lab';
  var body = document.createElement('div');
  body.className = 'lab__body';

  function current(group) {
    if (group.key === KEY.trek) return html.classList.contains('trek-more') ? 'more' : 'subtle';
    return html.getAttribute(group.attr) || (group.key === KEY.accent ? 'gold' : 'jost');
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
        var a = localStorage.getItem(KEY.accent) || 'gold';
        var t = localStorage.getItem(KEY.type) || 'jost';
        var k = localStorage.getItem(KEY.trek) || 'subtle';
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