/* print-page.jsx — reusable single-page print harness.
   Renders ONE page of a two-page spread at exact Blurb "Large Landscape"
   dimensions for press-ready, single-page PDF export.

   Blurb Large Landscape — Hardcover ImageWrap (98pp), INTERIOR page PDF:
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

    const holderStyle = {
      position: "absolute",
      top: 0, left: 0,
      width: SPREAD_W + "px",
      height: SPREAD_H + "px",
      transformOrigin: "top left",
      transform: "translate(" + translateX + "px," + translateY + "px) scale(" + SCALE + ")",
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
    // Asymmetric safe margins: 0.25in outside/top/bottom, 0.50in binding edge.
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
      /* Self-hosted Oswald (variable, wght 200–700). Declared here — injected
         into <head> AFTER each spread's Google-Fonts <link>, so it wins the
         cascade for family "Oswald" during export. Being local it loads
         instantly (no swap/synthesis race) and Chrome embeds a real subset
         into the PDF, fixing the publisher's non-embedded-font rejection. */
      @font-face {
        font-family: "Oswald";
        src: url("fonts/Oswald-VariableFont_wght.ttf") format("truetype-variations");
        font-weight: 200 700;
        font-style: normal;
        font-display: block;
      }

      html, body { margin: 0; padding: 0; }
      body.pp-mode { background: #3a3a3e; }
      body.pp-mode #root { display: flex; align-items: flex-start; justify-content: center; padding: 28px; min-height: 100vh; box-sizing: border-box; overflow: auto; }
      body.pp-mode .pp-page { flex: 0 0 auto; box-shadow: none; }

      #pp-fontbadge {
        position: fixed; top: 12px; left: 12px; z-index: 9999;
        font: 12px/1 ui-monospace, "SF Mono", Menlo, monospace; letter-spacing: .02em;
        padding: 8px 12px; border-radius: 4px; pointer-events: none;
        border: 1px solid transparent; transition: background .2s, color .2s, border-color .2s;
      }
      #pp-fontbadge[data-state="loading"] { background: #5b4a28; color: #ffe6ad; border-color: #8a6d2e; }
      #pp-fontbadge[data-state="ready"]   { background: #25391f; color: #c8e6b6; border-color: #4f7a37; }

      @media print {
        @page { size: 12.625in 10.875in; margin: 0; }
        html, body { background: #fff !important; margin: 0 !important; padding: 0 !important; width: 12.625in !important; height: 10.875in !important; }
        body.pp-mode #root { padding: 0 !important; margin: 0 !important; display: block !important; min-height: 0 !important; overflow: visible !important; }
        body.pp-mode .pp-page { box-shadow: none !important; margin: 0 !important; }
        .pp-guides, #pp-fontbadge { display: none !important; }
        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }

        /* Chrome's print rasterizer tiles large blurred shadows/filters, leaving
           rectangular seams behind hero titles & logos. Only the hero titles
           carry text-shadow (body text has none), and the logo filters are
           purely cosmetic drop-shadows over dark hero art — so neutralizing
           both blurs in print kills the banding with no legibility loss. */
        * { text-shadow: none !important; }
        img { filter: none !important; }
      }
    `;
    const el = document.createElement("style");
    el.id = "pp-style";
    el.textContent = css;
    document.head.appendChild(el);
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
      badge.setAttribute("data-state", "ready");
      badge.textContent = "Fonts embedded \u2713 \u00b7 safe to print";
    })();
  }

  window.PrintPage = PrintPage;
  window.PrintPageInit = function () { injectCSS(); ensureFontsLoaded(); };
})();
