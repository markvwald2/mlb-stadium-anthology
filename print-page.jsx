/* print-page.jsx — reusable single-page print harness.
   Renders ONE page of a two-page spread at exact Blurb "Large Landscape"
   dimensions for press-ready, single-page PDF export.

   Blurb Large Landscape — Hardcover, Dust Jacket (98pp), INTERIOR page PDF:
     trim        12.500 × 10.625 in
     bleed       0.125 in on top, bottom & OUTSIDE edge only
                 (NO bleed on the binding / spine edge)
     full page   12.625 × 10.875 in  =  909 × 783 pt
                 ← every single-page interior PDF is exactly this size
     safe        0.25 in top/bottom/outside · 0.50 in binding edge

   The source spreads are built on a 2550 × 1088 design canvas at 100 px/in
   with the fold at x = 1275 and a 12.5px (0.125in) bleed baked onto all four
   far edges of the spread. We print the design 1:1 at its NATIVE scale
   (100 design-px → 1 inch, i.e. SCALE = 96/100 = 0.96) so NOTHING is
   resized — the design's nominal 12.5 × 10.625 in trim maps exactly onto
   Blurb's 12.5 × 10.625 in trim. For each page we map the binding edge to the
   trim line (no bleed) and let the design's own outer/top/bottom bleed fill
   the 0.125 in bleed on the other three sides.

   Usage:  window.PrintPage({ Spread, side: 'left'|'right', bg, guides })
*/
(function () {
  // ---- geometry (CSS px @ 96/in; print @page maps these to physical inches) ----
  const IN = 96;
  const BLEED_IN = 0.125;
  const TRIMW_IN = 12.5;
  const TRIMH_IN = 10.625;

  // Bleed only on outside + top + bottom; binding edge has NO bleed.
  const PAGE_W = (TRIMW_IN + BLEED_IN) * IN;     // 12.625in → 1212
  const PAGE_H = (TRIMH_IN + 2 * BLEED_IN) * IN; // 10.875in → 1044
  const TRIM_OFF = BLEED_IN * IN;                // 12 (top & outside bleed)

  // source spread (design canvas, 100 px/in)
  const SPREAD_W = 2550;
  const SPREAD_H = 1088;
  const FOLD = 1275;
  const OB = 12.5; // bleed baked into the spread's far edges (0.125in)

  // Print the design at its true native size — no content scaling.
  const DESIGN_PPI = 100;
  const SCALE = IN / DESIGN_PPI; // 0.96  (100 design-px = 1 in = 96 CSS px)

  // Binding (trim) edge of each page in design-px. No bleed crosses these.
  const LEFT_TRIM_INNER = FOLD - OB;   // 1262.5 — right edge of left page
  const RIGHT_TRIM_INNER = FOLD + OB;  // 1287.5 — left edge of right page

  function PrintPage(opts) {
    const side = opts.side === "left" ? "left" : "right";
    const bg = opts.bg || "#E6E4DE";
    const guides = !!opts.guides;
    const Spread = opts.Spread;

    let translateX, clipPath;
    if (side === "right") {
      // right page: binding at design x=1287.5 → CSS x=0 (no bleed); reveal x ≥ 1287.5
      translateX = -RIGHT_TRIM_INNER * SCALE; // -1236
      clipPath = "inset(0 0 0 " + RIGHT_TRIM_INNER + "px)";
    } else {
      // left page: outer bleed at design x=0 → CSS x=0; binding at x=1262.5 → page edge; reveal x ≤ 1262.5
      translateX = 0;
      clipPath = "inset(0 " + (SPREAD_W - LEFT_TRIM_INNER) + "px 0 0)";
    }
    const translateY = 0; // design top bleed (y 0–12.5) fills the 0.125in top bleed

    // Scale the page with `zoom`, NOT `transform: scale()`. A composited
    // transform makes Chrome's print pipeline rasterize the page into GPU tiles
    // and leave hairline SEAMS at tile boundaries (visible as a faint vertical/
    // horizontal line across flat color fields — e.g. straight through a solid
    // sign). `zoom` is a paint-time scale with no compositing layer, so no
    // tiling and no seams. Geometry is identical: zoom multiplies the element's
    // own `left`/`top`/`width`, so the offset is expressed in DESIGN px
    // (translateX / SCALE); clip-path stays in the element's pre-zoom design-px
    // coordinate space, unchanged.
    const holderStyle = {
      position: "absolute",
      top: (translateY / SCALE) + "px",
      left: (translateX / SCALE) + "px",
      width: SPREAD_W + "px",
      height: SPREAD_H + "px",
      zoom: SCALE,
      WebkitClipPath: clipPath,
      clipPath: clipPath,
    };

    const pageStyle = {
      position: "relative",
      width: PAGE_W + "px",
      height: PAGE_H + "px",
      overflow: "hidden",
      background: bg,
    };

    return React.createElement("div", { className: "pp-page", style: pageStyle, "data-screen-label": "Print page (" + side + ")" },
      React.createElement("div", { style: holderStyle },
        React.createElement(Spread, null)
      ),
      guides ? React.createElement(Guides, { side: side }) : null
    );
  }

  function Guides(props) {
    const side = props && props.side === "left" ? "left" : "right";
    // Asymmetric safe margins: 0.25in outside/top/bottom, 0.50in binding edge (Blurb product spec).
    const SAFE_OUT = 0.25 * IN; // 24
    const SAFE_BIND = 0.5 * IN; // 48

    // Binding edge has NO bleed, so the trim touches the page edge on that side:
    //   left page  → binding on the RIGHT  (trim starts TRIM_OFF in from left)
    //   right page → binding on the LEFT   (trim starts at x=0)
    const trimLeft = side === "left" ? TRIM_OFF : 0;
    const trimTop = TRIM_OFF;
    const trimW = TRIMW_IN * IN;
    const trimH = TRIMH_IN * IN;

    const trim = {
      position: "absolute", pointerEvents: "none",
      left: trimLeft + "px", top: trimTop + "px",
      width: trimW + "px", height: trimH + "px",
      outline: "1px solid rgba(198,1,31,.85)",
    };

    const safeLeftMargin = side === "left" ? SAFE_OUT : SAFE_BIND;
    const safeRightMargin = side === "left" ? SAFE_BIND : SAFE_OUT;
    const safe = {
      position: "absolute", pointerEvents: "none",
      left: (trimLeft + safeLeftMargin) + "px", top: (trimTop + SAFE_OUT) + "px",
      width: (trimW - safeLeftMargin - safeRightMargin) + "px",
      height: (trimH - 2 * SAFE_OUT) + "px",
      outline: "1px dashed rgba(70,88,107,.7)",
    };
    const label = {
      position: "absolute", left: trimLeft + "px", top: (trimTop - 16) + "px",
      font: "10px 'Space Mono', monospace", letterSpacing: ".12em",
      color: "rgba(198,1,31,.95)", textTransform: "uppercase", pointerEvents: "none",
    };
    return React.createElement("div", { className: "pp-guides" },
      React.createElement("div", { style: trim }),
      React.createElement("div", { style: safe }),
      React.createElement("div", { style: label }, "trim 12.5 × 10.625 in · bleed 0.125 in · safe 0.25 / 0.5 bind · " + side)
    );
  }

  // inject print + screen-staging CSS once
  function injectCSS() {
    if (document.getElementById("pp-style")) return;
    const css = `
      /* Oswald: DO NOT self-host the variable font here. Chrome's Skia
         print-to-PDF backend does NOT subset/embed variable fonts — it
         collapses "Oswald-VariableFont_wght.ttf" to its Regular master,
         SYNTHESIZES the other weights (they show up as unembedded
         "Oswald-Regular_Bold/SemiBold/Medium" instances), and Blurb rejects
         the file for non-embedded fonts. Instead we rely on the STATIC
         per-weight Oswald faces each spread already loads via its Google-Fonts
         <link> (wght@300;400;500;600;700). Skia embeds those as real subsets —
         exactly like Anton / Spectral / Space Mono in the same PDFs.
         ensureFontsLoaded() below force-loads every registered static weight
         before "safe to print", so there is no swap/synthesis race. */

      html, body { margin: 0; padding: 0; }
      body.pp-mode { background: #3a3a3e; }
      body.pp-mode #root { display: flex; align-items: flex-start; justify-content: center; padding: 28px; min-height: 100vh; box-sizing: border-box; overflow: auto; }
      /* On SCREEN the page is fit-to-viewport (via CSS zoom, so the layout box
         shrinks and flex-centering keeps it centered) — makes the preview look
         like the whole spread page instead of a cropped native-size sheet. zoom
         is reset for print below, so the exported PDF stays exact native scale. */
      body.pp-mode .pp-page { flex: 0 0 auto; box-shadow: 0 8px 40px rgba(0,0,0,.45); }

      #pp-fontbadge {
        position: fixed; top: 12px; left: 12px; z-index: 9999;
        font: 12px/1 ui-monospace, "SF Mono", Menlo, monospace; letter-spacing: .02em;
        padding: 8px 12px; border-radius: 4px; pointer-events: none;
        border: 1px solid transparent; transition: background .2s, color .2s, border-color .2s;
      }
      #pp-fontbadge[data-state="loading"] { background: #5b4a28; color: #ffe6ad; border-color: #8a6d2e; }
      #pp-fontbadge[data-state="ready"]   { background: #25391f; color: #c8e6b6; border-color: #4f7a37; }

      /* Print guard: present only while fonts load (JS removes it when ready).
         On screen it is a slim top banner; in print it fills the whole page so a
         premature export is an obvious "DO NOT SUBMIT" sheet, never a silently
         broken PDF with synthesized faux weights. */
      #pp-printguard {
        position: fixed; top: 0; left: 0; right: 0; z-index: 9998;
        font: 700 13px/1.3 ui-monospace, "SF Mono", Menlo, monospace; letter-spacing: .04em;
        text-align: center; padding: 8px 14px; background: #7a1420; color: #ffe1e1;
        pointer-events: none;
      }
      @media print {
        #pp-printguard {
          position: fixed; inset: 0; z-index: 99999;
          display: flex; align-items: center; justify-content: center;
          padding: 8% 12%; font-size: 40px; line-height: 1.35; letter-spacing: .02em;
          background: #7a1420; color: #fff;
        }
      }

      @media print {
        @page { size: 12.625in 10.875in; margin: 0; }
        html, body { background: #fff !important; margin: 0 !important; padding: 0 !important; width: 12.625in !important; height: 10.875in !important; }
        body.pp-mode #root { padding: 0 !important; margin: 0 !important; display: block !important; min-height: 0 !important; overflow: visible !important; }
        /* CRITICAL: fitPreview() leaves a fractional inline zoom on .pp-page to
           fit the window on screen. If it leaks into print the PDF renders at
           that fractional scale and CSS-grid columns round sub-pixel leftward,
           tipping the RIGHTMOST column's text into extra wrapping. Force the
           page back to true native scale for print — the holder keeps its own
           0.96 content zoom, which is what we want embedded. */
        body.pp-mode .pp-page { box-shadow: none !important; margin: 0 !important; zoom: 1 !important; }
        .pp-guides, #pp-fontbadge { display: none !important; }
        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }

        /* Chrome's print rasterizer tiles large blurred shadows/filters, leaving
           rectangular seams behind hero titles & logos. Only the hero titles
           carry text-shadow (body text has none), and the logo filters are
           purely cosmetic drop-shadows over dark hero art — so neutralizing
           both blurs in print kills the banding with no legibility loss. */
        * { text-shadow: none !important; }
        img:not([data-pp-filter]) { filter: none !important; }
        /* Opt-in: a keyline that separates a full-colour mark from the photo
           behind it. It must be built from CENTRED shadows — directional ±.5px
           offsets round asymmetrically at print's .96 zoom (.48px snaps to 0 on
           one side and 1 on the other), which visibly shifts the outline off the
           mark. A stack of zero-offset sub-pixel blurs can't shift: it is
           symmetric by construction, and radii this small never reach Chrome's
           blur-tiling path. */
        img[data-pp-filter="keyline"][data-pp-filter] {
          filter: drop-shadow(0 0 .8px #fff) drop-shadow(0 0 .8px #fff)
            drop-shadow(0 0 .8px #fff) !important; }

        /* Opt-in: elements marked data-pp-shadow keep a halo in print, but as a
           TIGHT blur only (<=9px). Small radii don't hit the tiling path that
           produced the rectangular seams, so the legibility shadow survives
           without banding. Set --pp-shadow-color per element to retint. */
        [data-pp-shadow][data-pp-shadow][data-pp-shadow] { --pp-shadow-color: 0,0,0;
          text-shadow:
            0 0 1.5px rgba(var(--pp-shadow-color),.98),
            0 0 3px rgba(var(--pp-shadow-color),.95),
            0 0 6px rgba(var(--pp-shadow-color),.9),
            0 1px 4px rgba(var(--pp-shadow-color),.9),
            0 2px 9px rgba(var(--pp-shadow-color),.8) !important; }
        [data-pp-shadow="soft"][data-pp-shadow][data-pp-shadow] {
          text-shadow:
            0 0 3px rgba(var(--pp-shadow-color),.7),
            0 1px 5px rgba(var(--pp-shadow-color),.8),
            0 2px 9px rgba(var(--pp-shadow-color),.6) !important; }

        /* Blurred OUTER box-shadows: Chrome's print rasterizer tiles them into
           grey rectangular seams — UNLESS the shadowed element is promoted to
           its own composited layer, in which case the blur rasterizes as one
           continuous surface and prints clean (cf. the Anaheim placard, whose
           hero layers are composited). promoteShadows() tags every element
           carrying a blurred non-inset shadow; this rule promotes them. */
        [data-pp-promote] { transform: translateZ(0) !important; }
        [data-pp-promote][data-pp-xf] { transform: var(--pp-xf) translateZ(0) !important; }
      }
    `;
    const el = document.createElement("style");
    el.id = "pp-style";
    el.textContent = css;
    document.head.appendChild(el);
  }

  // ---- composited-layer promotion for blurred outer shadows ----
  // A non-inset shadow with blur > 0 tiles into seams in Chrome's print raster.
  // Promoting the element to its own layer fixes it with no visual change.
  function splitLayers(v) {
    const out = []; let d = 0, cur = "";
    for (const ch of v) {
      if (ch === "(") d++; if (ch === ")") d--;
      if (ch === "," && d === 0) { out.push(cur); cur = ""; } else cur += ch;
    }
    if (cur.trim()) out.push(cur);
    return out;
  }
  function hasBlurredOuterShadow(v) {
    if (!v || v === "none") return false;
    return splitLayers(v).some(function (L) {
      if (/\binset\b/.test(L)) return false;
      const n = L.match(/-?[\d.]+px/g);
      return !!n && n.length >= 3 && parseFloat(n[2]) > 0.5;
    });
  }
  function promoteShadows() {
    const nodes = document.querySelectorAll(".pp-page *");
    for (const el of nodes) {
      if (el.hasAttribute("data-pp-promote")) continue;
      const cs = getComputedStyle(el);
      if (!hasBlurredOuterShadow(cs.boxShadow)) continue;
      // A transform makes this element the containing block for abs/fixed
      // descendants. Skip static elements that hold any — promoting them could
      // reposition a child that resolves against an ancestor further up.
      if (cs.position === "static") {
        let risky = false;
        for (const kid of el.querySelectorAll("*")) {
          const p = getComputedStyle(kid).position;
          if (p === "absolute" || p === "fixed") { risky = true; break; }
        }
        if (risky) continue;
      }
      if (cs.transform && cs.transform !== "none") {
        el.style.setProperty("--pp-xf", cs.transform);
        el.setAttribute("data-pp-xf", "");
      }
      el.setAttribute("data-pp-promote", "");
    }
  }

  // Force EVERY declared @font-face (all weights/families) to fully download
  // before the page is considered print-ready. Prevents Chrome from rendering —
  // and embedding — a synthesized faux weight (e.g. "Oswald-Regular_Medium")
  // when a real weight file hasn't loaded yet at Cmd+P time. A visible badge
  // tells the user not to print until fonts are embedded.
  function ensureFontsLoaded() {
    if (!document.fonts || document.getElementById("pp-fontbadge")) return;
    const badge = document.createElement("div");
    badge.id = "pp-fontbadge";
    badge.setAttribute("data-state", "loading");
    badge.textContent = "Loading fonts\u2026 don\u2019t print yet";
    const attach = () => { if (document.body && !badge.isConnected) document.body.appendChild(badge); };
    attach();
    document.addEventListener("DOMContentLoaded", attach);

    // Until fonts are confirmed loaded, PHYSICALLY block a print. If the user
    // hits Cmd/Ctrl+P (or the browser menu → Print) too early, Chrome embeds
    // synthesized faux weights (e.g. "Oswald-Regular_Medium/_Bold") that Blurb
    // rejects as non-embedded. Two guards:
    //   1. swallow the Cmd/Ctrl+P keydown and alert while not ready, and
    //   2. a full-bleed @media-print overlay so any print that slips through
    //      (menu → Print) comes out as an obvious "DO NOT SUBMIT" page rather
    //      than a silently-broken PDF.
    let fontsReady = false;
    const guardKey = (e) => {
      if (fontsReady) return;
      const k = (e.key || "").toLowerCase();
      if ((e.metaKey || e.ctrlKey) && k === "p") {
        e.preventDefault();
        e.stopPropagation();
        alert("Fonts are still loading — wait for the green \u201CFonts embedded \u2713\u201D badge before printing, or the PDF will contain non-embedded fonts.");
      }
    };
    window.addEventListener("keydown", guardKey, true);

    const guard = document.createElement("div");
    guard.id = "pp-printguard";
    guard.textContent = "FONTS NOT YET LOADED \u2014 DO NOT SUBMIT THIS PDF. Wait for the green badge and re-export.";
    const attachGuard = () => { if (document.body && !guard.isConnected) document.body.appendChild(guard); };
    attachGuard();
    document.addEventListener("DOMContentLoaded", attachGuard);

    (async function run() {
      try {
        // first pass: let the linked Google-Fonts stylesheet parse & register faces
        await document.fonts.ready;
        // now force every registered face (incl. not-yet-requested weights) to load
        const faces = Array.from(document.fonts);
        await Promise.all(faces.map((f) => f.load().catch(() => {})));
        await document.fonts.ready;
      } catch (e) { /* fall through to ready state regardless */ }
      attach();
      fontsReady = true;
      window.removeEventListener("keydown", guardKey, true);
      if (guard.isConnected) guard.remove();
      badge.setAttribute("data-state", "ready");
      badge.textContent = "Fonts embedded \u2713 \u00b7 safe to print";
    })();
  }

  // On-screen only: shrink the native-size page to fit the viewport so the
  // preview reads like the whole spread page, not a cropped sheet. Uses `zoom`
  // (reflows the layout box → flex-centering keeps it centered, no scrollbars).
  // Never runs at true 1:1 upscale; caps at 1. Print resets zoom via CSS.
  // Staging differs by context:
  //  • TOP-LEVEL (a real print tab, Cmd+P target): center the native-size page
  //    and shrink it with CSS `zoom` to fit the window so it previews like the
  //    whole page. `zoom` resets to 1 for print (below) → exact native PDF.
  //  • EMBEDDED (host "present" iframe): the host does its OWN scale-to-fit, so
  //    we must NOT also zoom (the two stack and crop). Instead shrink-wrap #root
  //    to the page's exact bounds so the host fits the real page rectangle.
  function isTopLevel() {
    try { return window.top === window.self; } catch (e) { return false; }
  }
  function fitPreview() {
    const page = document.querySelector(".pp-page");
    if (!page || !isTopLevel()) return !!page;
    const pad = 40;
    const z = Math.min(1, (window.innerWidth - pad) / PAGE_W, (window.innerHeight - pad) / PAGE_H);
    page.style.zoom = String(z > 0 ? z : 1);
    return true;
  }
  function applyStaging() {
    const root = document.getElementById("root");
    const page = document.querySelector(".pp-page");
    if (!root || !page) return false;
    if (isTopLevel()) {
      root.style.cssText =
        "display:flex;align-items:flex-start;justify-content:center;padding:28px;min-height:100vh;box-sizing:border-box;";
      fitPreview();
    } else {
      // Let the host present frame own the scaling: page at its true bounds.
      // Use block + max-content so #root shrink-wraps to the page with NO inline
      // baseline gap — and WITHOUT touching line-height (that would inherit into
      // the page and collapse text rows like the line score).
      document.body.style.background = "transparent";
      root.style.cssText = "display:block;width:max-content;padding:0;margin:0;min-height:0;";
      page.style.zoom = "";
    }
    return true;
  }
  function startFitPreview() {
    let elapsed = 0;
    const timer = setInterval(function () {
      elapsed += 120;
      if (applyStaging() || elapsed > 12000) clearInterval(timer);
    }, 120);
    window.addEventListener("resize", fitPreview);
  }

  window.PrintPage = PrintPage;
  window.PrintPageInit = function () {
    injectCSS(); ensureFontsLoaded(); startFitPreview();
    setTimeout(promoteShadows, 1200);
    setTimeout(promoteShadows, 3000);
    window.addEventListener("beforeprint", promoteShadows);
  };
})();
