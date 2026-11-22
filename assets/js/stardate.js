// Live stardate: year plus zero-padded day of year, recomputed on each load.
(function () {
  var el = document.querySelector('[data-stardate]');
  if (!el) return;
  var now = new Date();
  var y = now.getFullYear();
  var start = Date.UTC(y, 0, 1);
  var today = Date.UTC(y, now.getMonth(), now.getDate());
  var day = Math.floor((today - start) / 86400000) + 1;
  el.textContent = y + '.' + String(day).padStart(3, '0');
})();