/* print-page.jsx — reusable single-page print harness.
   Renders ONE page of a two-page spread at exact Blurb "Large Landscape"
   dimensions for press-ready, single-page PDF export.

   Blurb Large Landscape (13 × 11 in), perfect-bound / PUR:
     trim        13.000 × 11.000 in
     bleed       0.125 in on all four sides
     full page   13.250 × 11.250 in  ← every single-page PDF is this size

   The source spreads are built on a 2550 × 1088 design canvas with the fold
   at x = 1275 and a 12.5px outer bleed already present on the far edges.
   We scale that so one page's TRIM (1262.5 design-px) maps to 13 in, clip to
   the chosen half at the fold, and let the page's own background fill the
   inner (spine) bleed — which is correct for a bound edge.

   Usage:  window.PrintPage({ Spread, side: 'left'|'right', bg, guides })
*/
(function () {
  // ---- geometry (CSS px @ 96/in; print @page maps these to physical inches) ----
  const IN = 96;
  const BLEED_IN = 0.125;
  const TRIMW_IN = 13;
  const TRIMH_IN = 11;

  const PAGE_W = (TRIMW_IN + 2 * BLEED_IN) * IN; // 1272
  const PAGE_H = (TRIMH_IN + 2 * BLEED_IN) * IN; // 1080
  const TRIM_OFF = BLEED_IN * IN;                // 12

  // source spread
  const SPREAD_W = 2550;
  const SPREAD_H = 1088;
  const FOLD = 1275;
  const OB = 12.5; // outer bleed baked into the spread

  const designPageTrimW = FOLD - OB;             // 1262.5
  const SCALE = (TRIMW_IN * IN) / designPageTrimW; // ~0.98812

  function PrintPage(opts) {
    const side = opts.side === "left" ? "left" : "right";
    const bg = opts.bg || "#E6E4DE";
    const guides = !!opts.guides;
    const Spread = opts.Spread;

    let translateX, clipPath;
    if (side === "right") {
      // fold (design x=1275) → inner trim edge (CSS x=12); reveal x >= fold
      translateX = TRIM_OFF - FOLD * SCALE;
      clipPath = "inset(0 0 0 " + FOLD + "px)";
    } else {
      // fold → outer trim edge of left page (CSS x=12+1248=1260); reveal x <= fold
      translateX = (TRIM_OFF + TRIMW_IN * IN) - FOLD * SCALE;
      clipPath = "inset(0 " + (SPREAD_W - FOLD) + "px 0 0)";
    }
    const translateY = TRIM_OFF - OB * SCALE; // ≈ -0.35, top bleed covered

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
      guides ? React.createElement(Guides, null) : null
    );
  }

  function Guides() {
    const SAFE_IN = 0.5; // recommended safe margin from trim
    const trim = {
      position: "absolute", pointerEvents: "none",
      left: TRIM_OFF + "px", top: TRIM_OFF + "px",
      width: (TRIMW_IN * IN) + "px", height: (TRIMH_IN * IN) + "px",
      outline: "1px solid rgba(198,1,31,.85)",
    };
    const safe = {
      position: "absolute", pointerEvents: "none",
      left: (TRIM_OFF + SAFE_IN * IN) + "px", top: (TRIM_OFF + SAFE_IN * IN) + "px",
      width: ((TRIMW_IN - 2 * SAFE_IN) * IN) + "px", height: ((TRIMH_IN - 2 * SAFE_IN) * IN) + "px",
      outline: "1px dashed rgba(70,88,107,.7)",
    };
    const label = {
      position: "absolute", left: TRIM_OFF + "px", top: (TRIM_OFF - 16) + "px",
      font: "10px 'Space Mono', monospace", letterSpacing: ".12em",
      color: "rgba(198,1,31,.95)", textTransform: "uppercase", pointerEvents: "none",
    };
    return React.createElement("div", { className: "pp-guides" },
      React.createElement("div", { style: trim }),
      React.createElement("div", { style: safe }),
      React.createElement("div", { style: label }, "trim 13 × 11 in · bleed 0.125 in · safe 0.5 in")
    );
  }

  // inject print + screen-staging CSS once
  function injectCSS() {
    if (document.getElementById("pp-style")) return;
    const css = `
      html, body { margin: 0; padding: 0; }
      body.pp-mode { background: #3a3a3e; }
      body.pp-mode #root { display: flex; align-items: flex-start; justify-content: center; padding: 28px; min-height: 100vh; box-sizing: border-box; overflow: auto; }
      body.pp-mode .pp-page { flex: 0 0 auto; box-shadow: none; }

      @media print {
        @page { size: 13.25in 11.25in; margin: 0; }
        html, body { background: #fff !important; margin: 0 !important; padding: 0 !important; width: 13.25in !important; height: 11.25in !important; }
        body.pp-mode #root { padding: 0 !important; margin: 0 !important; display: block !important; min-height: 0 !important; overflow: visible !important; }
        body.pp-mode .pp-page { box-shadow: none !important; margin: 0 !important; }
        .pp-guides { display: none !important; }
        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      }
    `;
    const el = document.createElement("style");
    el.id = "pp-style";
    el.textContent = css;
    document.head.appendChild(el);
  }

  window.PrintPage = PrintPage;
  window.PrintPageInit = injectCSS;
})();
