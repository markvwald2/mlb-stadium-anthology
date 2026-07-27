/* ghost-shadow.js — bulk print-safe replacement for blurred text-shadow.
   Chrome's HTML-to-PDF pipeline drops CSS text-shadow entirely (print-page.jsx
   also neutralizes it, to stop rasterized banding), so a blurred halo is a
   screen-only lie: on press the type loses its separation from the photo.
   This helper walks the rendered spread and, for every text block that carries
   a DARK BLURRED shadow layer, removes those blurred layers and inserts a GHOST
   DUPLICATE of the block behind it — a real cloned copy, offset a px or two, in
   translucent dark ink. Ordinary vector type, so it prints as it screens.
   Hard (0-blur) layers and light-colored glows are left untouched.

   Idempotent; safe to re-run after a render. window.GhostShadow.apply(). */
(function () {
  var MIN_BLUR = 2;       // px — below this a shadow reads as a hard offset; keep it
  var DARK_LUM = 0.35;    // shadow colour must be this dark to count as a separation shadow
  var MAX_TEXT = 200;     // don't ghost anything bigger than a title/label block
  var SKIP = "IMAGE-SLOT,IMG,SVG,CANVAS,VIDEO,PICTURE";

  var CSS =
    '.gs-ghost{position:absolute;pointer-events:none;user-select:none;z-index:-1;' +
    'transform:translate(var(--gsx,1.5px),var(--gsy,2px))}' +
    '.gs-ghost,.gs-ghost *{color:var(--gsc,rgba(8,8,10,.3))!important;' +
    '-webkit-text-fill-color:var(--gsc,rgba(8,8,10,.3))!important;text-shadow:none!important;' +
    '-webkit-text-stroke:0!important;background:none!important;box-shadow:none!important;' +
    'border-color:transparent!important;filter:none!important;opacity:1!important}' +
    /* a ghost is ink only — never re-run the original's decorative pseudo layers
       (grain fills, background-clip:text overlays, blend modes), which would
       paint a second, offset copy of the effect and dirty the letterforms. */
    '.gs-ghost::before,.gs-ghost::after,.gs-ghost *::before,.gs-ghost *::after{' +
    'content:none!important;display:none!important}';

  function injectCSS() {
    if (document.getElementById("gs-style")) return;
    var s = document.createElement("style");
    s.id = "gs-style"; s.textContent = CSS;
    document.head.appendChild(s);
  }

  function splitLayers(v) {
    var out = [], depth = 0, cur = "";
    for (var i = 0; i < v.length; i++) {
      var c = v[i];
      if (c === "(") depth++; else if (c === ")") depth--;
      if (c === "," && depth === 0) { out.push(cur); cur = ""; } else cur += c;
    }
    if (cur.trim()) out.push(cur);
    return out.map(function (s) { return s.trim(); }).filter(Boolean);
  }

  function parseLayer(l) {
    var color = (l.match(/rgba?\([^)]*\)/) || [null])[0];
    var nums = (l.replace(/rgba?\([^)]*\)/, "").match(/-?[\d.]+px/g) || [])
      .map(function (n) { return parseFloat(n); });
    var lum = 0, alpha = 1;
    if (color) {
      var p = color.replace(/[a-z()]/g, "").split(",").map(Number);
      lum = (0.299 * p[0] + 0.587 * p[1] + 0.114 * p[2]) / 255;
      if (color.indexOf("rgba") === 0 && !isNaN(p[3])) alpha = p[3];
    }
    return { raw: l, nums: nums, blur: nums.length > 2 ? nums[2] : 0, lum: lum, alpha: alpha };
  }

  function apply(root) {
    injectCSS();
    root = root || document.getElementById("root") || document.body;
    var all = root.querySelectorAll("*");
    var handled = [], done = 0;
    outer: for (var i = 0; i < all.length; i++) {
      var el = all[i];
      if (el.classList.contains("gs-ghost") || el.closest(".gs-ghost")) continue;
      if (el.hasAttribute("data-gs") || el.hasAttribute("data-pp-shadow")) { handled.push(el); continue; }
      for (var h = 0; h < handled.length; h++) if (handled[h].contains(el)) continue outer;
      var txt = (el.textContent || "").trim();
      if (!txt || txt.length > MAX_TEXT) continue;
      if (el.matches(SKIP) || el.querySelector(SKIP)) continue;
      var cs = getComputedStyle(el);
      var ts = cs.textShadow;
      if (!ts || ts === "none") continue;
      var layers = splitLayers(ts).map(parseLayer);
      var dark = layers.filter(function (L) { return L.blur >= MIN_BLUR && L.lum < DARK_LUM; });
      if (!dark.length) continue;               // pure glow or hard offsets only — leave alone
      var keep = layers.filter(function (L) { return L.blur < MIN_BLUR; })
        .map(function (L) { return L.raw; });

      var ghost = el.cloneNode(true);
      ghost.removeAttribute("id");
      var ids = ghost.querySelectorAll("[id]");
      for (var k = 0; k < ids.length; k++) ids[k].removeAttribute("id");
      ghost.classList.add("gs-ghost");
      ghost.setAttribute("aria-hidden", "true");
      ghost.style.textShadow = "none";
      ghost.style.display = cs.display;
      /* The clone keeps the original's classes, so any page rule more specific
         than ".gs-ghost" (e.g. ".hero-name .two{position:relative}") would win
         and drop the ghost back into normal flow — it would then take up space
         and paint as a solid duplicate block. Pin the box inline + !important. */
      var pin = { position: "absolute", margin: "0", left: "0", top: "0" };
      if (cs.display.indexOf("inline") !== 0) { pin.right = "0"; pin.bottom = "0"; }
      for (var pk in pin) ghost.style.setProperty(pk, pin[pk], "important");

      var fs = parseFloat(cs.fontSize) || 16, big = fs >= 40;
      var a = Math.max(0.22, Math.min(0.38, dark[0].alpha));
      var gx = big ? 2 : 1, gy = big ? 2 : 1.5;
      /* Offset DIRECTION must follow the shadow it replaces: a shadow authored
         with a negative y (light from below) has to ghost upward, not down. */
      var oy = (dark[0].nums && dark[0].nums.length > 1) ? dark[0].nums[1] : 1;
      var ox = (dark[0].nums && dark[0].nums.length > 0) ? dark[0].nums[0] : 0;
      if (oy < 0) gy = -gy; else if (oy === 0 && ox === 0) gy = gy;
      if (ox < 0) gx = -gx;
      /* Per-element opt-in overrides. A stroked or heavily outlined face hides a
         1-2px ghost inside its own stroke, so such an element can author
         --gs-x / --gs-y (and --gs-alpha) in CSS to push its ghost clear. */
      var vx = parseFloat(cs.getPropertyValue("--gs-x"));
      var vy = parseFloat(cs.getPropertyValue("--gs-y"));
      var va = parseFloat(cs.getPropertyValue("--gs-alpha"));
      if (!isNaN(vx)) gx = vx;
      if (!isNaN(vy)) gy = vy;
      if (!isNaN(va)) a = va;
      /* The clone keeps the original's classes, so a page rule with higher
         specificity (e.g. ".hero .l1{transform:scaleY(1.06)}") would beat
         ".gs-ghost{transform:translate(...)}": the ghost would inherit a SCALE
         instead of its offset and land in the wrong place (a scaleY with a
         bottom-left origin visibly LIFTS it). The ghost is a child of the
         original, so the original's transform already applies to it — its own
         transform must be the offset ONLY, inline + !important so nothing wins. */
      ghost.style.setProperty("transform", "translate(" + gx + "px," + gy + "px)", "important");
      ghost.style.setProperty("transform-origin", "50% 50%", "important");
      el.style.setProperty("--gsx", gx + "px");
      el.style.setProperty("--gsy", gy + "px");
      el.style.setProperty("--gsc", "rgba(8,8,10," + a + ")");
      el.style.textShadow = keep.length ? keep.join(", ") : "none";
      if (cs.position === "static") el.style.position = "relative";
      if (cs.zIndex === "auto") el.style.zIndex = "0";
      el.setAttribute("data-gs", "1");
      el.insertBefore(ghost, el.firstChild);
      handled.push(el);
      done++;
    }
    return done;
  }

  window.GhostShadow = { apply: apply };
  function run() { apply(); }
  if (document.readyState === "complete") run();
  else window.addEventListener("load", run);
  [200, 700, 1600, 3000].forEach(function (t) { setTimeout(run, t); });
})();
