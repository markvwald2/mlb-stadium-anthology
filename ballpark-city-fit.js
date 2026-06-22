/* ballpark-city-fit.js — auto-fit pass for [data-fit] body blocks.
   Each editorial Body is an absolutely-positioned, fixed-size multi-column box.
   When its prose is slightly too long for `cols × height`, the column flow
   spills an extra column to the RIGHT, overrunning the page (e.g. into the
   sidebar). This shrinks the font-size just enough that the text fits inside
   its declared box with no horizontal overflow. All copy is preserved. */
(function () {
  function fit(el) {
    // Re-anchor to the size React set inline so repeated runs are idempotent.
    if (el.dataset.fitBase == null) {
      el.dataset.fitBase = parseFloat(getComputedStyle(el).fontSize) || 12;
    }
    let size = parseFloat(el.dataset.fitBase);
    el.style.fontSize = size + "px";
    const MIN = 7;
    let guard = 0;
    while (
      (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1) &&
      size > MIN && guard < 120
    ) {
      size -= 0.2;
      el.style.fontSize = size + "px";
      guard++;
    }
  }

  function fitAll() {
    document.querySelectorAll("[data-fit]").forEach(fit);
  }

  function run() {
    fitAll();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAll);
    // React mounts after this script; retry to catch the rendered DOM + late fonts.
    setTimeout(fitAll, 120);
    setTimeout(fitAll, 400);
    setTimeout(fitAll, 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
  window.BallparkFitAll = fitAll;
})();
