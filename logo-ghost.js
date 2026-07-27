/* logo-ghost.js — print-safe replacement for filter: drop-shadow() on logo marks.
   print-page.jsx forces `img { filter: none }` for print (Chrome's rasterizer tiles
   blurred filters into visible seams), so a drop-shadow on a mark is a screen-only
   lie. This helper gives any <img data-lg> a SILHOUETTE ghost instead: a box the
   size of the rendered mark, filled with translucent dark ink and clipped by a CSS
   mask of the mark's own file, offset a px or two behind it. Masks print as vector,
   so it reads the same on screen and on press.

   The img is never moved, wrapped, or restyled — the ghost is inserted as its
   PREVIOUS SIBLING and given the img's own offset box, so it shares the img's
   containing block and paints behind it by DOM order. (An earlier wrapper-based
   version inherited the mark's resolved insets on all four sides and dragged it
   across the page; don't reintroduce it.) Positions are recomputed on every run,
   so a mark that reflows after its SVG decodes still lines up.

   Opt in per mark:  <img class="…" data-lg src="assets/foo.svg">
   Tune per mark (CSS custom properties on the img, or data-* attributes):
     --lg-x / --lg-y   offset in px   (default 1.5 / 2)
     --lg-ink          ghost colour   (default rgba(8,8,10,.34))
   Idempotent; safe to re-run. window.LogoGhost.apply().  */
(function () {
  var CSS =
    '.lg-ghost{position:absolute;pointer-events:none;' +
    'background:var(--lg-ink,rgba(8,8,10,.34));' +
    'transform:translate(var(--lg-x,1.5px),var(--lg-y,2px))}';

  function injectCSS() {
    if (document.getElementById("lg-style")) return;
    var s = document.createElement("style");
    s.id = "lg-style"; s.textContent = CSS;
    document.head.appendChild(s);
  }

  function apply(root) {
    injectCSS();
    root = root || document.getElementById("root") || document.body;
    var imgs = root.querySelectorAll("img[data-lg], [data-lg]");
    var done = 0;
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      var cs0 = getComputedStyle(img);
      /* Two kinds of mark are supported: an <img>, whose src becomes the mask, and
         an element already drawn AS a CSS mask (a tinted silhouette div) — there
         the mask shorthand is reused verbatim, since the element has no src. */
      var maskCss = cs0.webkitMaskImage && cs0.webkitMaskImage !== "none"
        ? (cs0.webkitMask || cs0.mask || "") : "";
      var src = img.tagName === "IMG" ? img.getAttribute("src") : null;
      if (!src && !maskCss) continue;
      if (!img.parentNode) continue;
      /* a mark whose box hasn't resolved yet (SVG not decoded) is skipped, not
         pinned at zero — a later run picks it up */
      var w = img.offsetWidth, h = img.offsetHeight;
      if (!w || !h) continue;

      var ghost = img.previousElementSibling;
      if (!ghost || !ghost.classList.contains("lg-ghost")) {
        ghost = document.createElement("span");
        ghost.className = "lg-ghost";
        ghost.setAttribute("aria-hidden", "true");
        var mask = src
          ? 'url("' + src + '") center / contain no-repeat'
          : maskCss;
        ghost.style.setProperty("-webkit-mask", mask);
        ghost.style.setProperty("mask", mask);
        img.parentNode.insertBefore(ghost, img);
      }

      var cs = getComputedStyle(img);
      /* A STATIC img is painted below any positioned sibling regardless of DOM
         order — the ghost would sit ON TOP of the mark. Promoting the img to
         `relative` (with no offsets, so layout is untouched) puts both in the
         positioned pass, where DOM order decides and the ghost falls behind. */
      if (cs.position === "static") {
        img.style.setProperty("position", "relative", "important");
        cs = getComputedStyle(img);
      }
      ghost.style.left = img.offsetLeft + "px";
      ghost.style.top = img.offsetTop + "px";
      ghost.style.width = w + "px";
      ghost.style.height = h + "px";
      /* share the mark's stacking level; DOM order keeps the ghost underneath */
      ghost.style.zIndex = cs.zIndex === "auto" ? "" : cs.zIndex;

      var ink = img.getAttribute("data-lg-ink") || cs.getPropertyValue("--lg-ink");
      var ox = img.getAttribute("data-lg-x") || cs.getPropertyValue("--lg-x");
      var oy = img.getAttribute("data-lg-y") || cs.getPropertyValue("--lg-y");
      if (ink && ink.trim()) ghost.style.setProperty("--lg-ink", ink.trim());
      if (ox && String(ox).trim()) ghost.style.setProperty("--lg-x", String(ox).trim());
      if (oy && String(oy).trim()) ghost.style.setProperty("--lg-y", String(oy).trim());

      img.setAttribute("data-lg", "on");
      done++;
    }
    return done;
  }

  window.LogoGhost = { apply: apply };
  function run() { apply(); }
  if (document.readyState === "complete") run();
  else window.addEventListener("load", run);
  [200, 700, 1600, 3000].forEach(function (t) { setTimeout(run, t); });
})();
