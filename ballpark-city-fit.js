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
    // Force a synchronous layout flush after the re-anchor so the first
    // scrollWidth read below reflects this size, not a stale one.
    void el.offsetHeight;
    const MIN = 7;
    let guard = 0;
    while (
      (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1) &&
      size > MIN && guard < 120
    ) {
      size -= 0.2;
      el.style.fontSize = size + "px";
      // WebKit batches style writes + geometry reads inside a tight loop, so
      // the next scrollWidth check can read a stale (pre-shrink) value and the
      // loop exits while the block still overflows (spilling a column behind
      // adjacent art). Force a reflow each step so every measurement is fresh.
      void el.offsetHeight;
      guard++;
    }
  }

  function fitAll() {
    document.querySelectorAll("[data-fit]").forEach(fit);
  }

  function run() {
    fitAll();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAll);
    // Web fonts (Anton/Oswald/Spectral/Space Mono) can swap in AFTER the early
    // fit passes, widening the prose and spilling an extra column past the page
    // edge. Re-fit on every font load event and on window load, plus a longer
    // retry tail, so the final settled state never overflows.
    if (document.fonts && document.fonts.addEventListener) {
      document.fonts.addEventListener("loadingdone", fitAll);
    }
    window.addEventListener("load", fitAll);
    // React mounts after this script; retry to catch the rendered DOM + late fonts.
    [120, 400, 1000, 2000, 3500].forEach(function (t) { setTimeout(fitAll, t); });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
  window.BallparkFitAll = fitAll;
})();
