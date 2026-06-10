/* cover-app.jsx — mount the front cover in a pan/zoom design canvas and
   provide the single-page press-ready PDF path.

   The cover is ONE page (not a two-page spread), built on a 1275 × 1088
   design canvas = 12.75 × 10.88 in page-with-bleed @ 100 ppi. The single-page
   print harness below scales that 1:1 onto a 12.75 × 10.88 in sheet (the
   correct page-with-bleed size for a perfect-bound cover), so the whole cover
   bleeds to the sheet edge. Trim 0.125 in inside; safe 0.25 in inside trim. */
(function () {
  const { DesignCanvas, DCSection, DCArtboard } = window;
  const Spread = window.CoverSpread;
  const PAGE_W = 1275, PAGE_H = 1088, PPI = 100, BLEED = 12.5;

  function injectPrintCSS() {
    if (document.getElementById("cv-pp-style")) return;
    const css = `
      html, body { margin: 0; padding: 0; }
      body.cv-pp-mode { background: #3a3a3e; }
      body.cv-pp-mode #root { display: flex; align-items: flex-start; justify-content: center; padding: 28px; min-height: 100vh; box-sizing: border-box; overflow: auto; }
      body.cv-pp-mode .cv-pp-page { flex: 0 0 auto; }
      @media print {
        @page { size: 12.75in 10.88in; margin: 0; }
        html, body { background: #fff !important; margin: 0 !important; padding: 0 !important; }
        body.cv-pp-mode #root { padding: 0 !important; margin: 0 !important; display: block !important; min-height: 0 !important; overflow: visible !important; }
        body.cv-pp-mode .cv-pp-page { box-shadow: none !important; margin: 0 !important; }
        .cv-pp-guides { display: none !important; }
        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      }`;
    const el = document.createElement("style");
    el.id = "cv-pp-style";
    el.textContent = css;
    document.head.appendChild(el);
  }

  function CoverPrint(opts) {
    const guides = !!opts.guides;
    const IN = 96;
    const SCALE = IN / PPI;                 // 100 design-px → 1 in → 96 css-px
    const sheetW = PAGE_W * SCALE, sheetH = PAGE_H * SCALE;
    const tIn = BLEED * SCALE, safeIn = (BLEED + 25) * SCALE;
    const pageStyle = {
      position: "relative", width: sheetW + "px", height: sheetH + "px",
      overflow: "hidden", background: "#e9e7db"
    };
    const holderStyle = {
      position: "absolute", top: 0, left: 0, width: PAGE_W + "px", height: PAGE_H + "px",
      transformOrigin: "top left", transform: "scale(" + SCALE + ")"
    };
    const trim = { position: "absolute", pointerEvents: "none", left: tIn + "px", top: tIn + "px",
      width: (sheetW - 2 * tIn) + "px", height: (sheetH - 2 * tIn) + "px", outline: "1px solid rgba(198,1,31,.85)" };
    const safe = { position: "absolute", pointerEvents: "none", left: safeIn + "px", top: safeIn + "px",
      width: (sheetW - 2 * safeIn) + "px", height: (sheetH - 2 * safeIn) + "px", outline: "1px dashed rgba(70,88,107,.7)" };
    return React.createElement("div", { className: "cv-pp-page", style: pageStyle, "data-screen-label": "Cover print page" },
      React.createElement("div", { style: holderStyle }, React.createElement(Spread, null)),
      guides ? React.createElement("div", { className: "cv-pp-guides" },
        React.createElement("div", { style: trim }),
        React.createElement("div", { style: safe })
      ) : null
    );
  }

  // ?print=1[&guides=1] → single press-ready cover page for vector PDF export.
  const params = new URLSearchParams(location.search);
  if (params.get("print")) {
    document.body.classList.add("cv-pp-mode");
    injectPrintCSS();
    ReactDOM.createRoot(document.getElementById("root")).render(
      CoverPrint({ guides: params.get("guides") === "1" })
    );
    return;
  }

  // on-canvas trim / bleed / safe-area guides for the normal view (?guides=1).
  // bleed = canvas edge (12.5px outer), trim at 12.5 inset, safe at 37.5 inset.
  function CanvasGuides() {
    const base = { position: "absolute", pointerEvents: "none" };
    const line = (color, dash, inset) => Object.assign({}, base, {
      left: inset + "px", top: inset + "px",
      width: (PAGE_W - 2 * inset) + "px", height: (PAGE_H - 2 * inset) + "px",
      outline: "1.5px " + dash + " " + color
    });
    const lbl = (top, color, text) => React.createElement("div", {
      style: Object.assign({}, base, {
        left: "16px", top: top + "px",
        font: "600 13px 'Space Mono', ui-monospace, monospace",
        letterSpacing: ".1em", textTransform: "uppercase", color: color,
        background: "rgba(233,231,219,.82)", padding: "2px 6px"
      })
    }, text);
    return React.createElement("div", { className: "cv-guides", style: { position: "absolute", inset: 0, zIndex: 50 } },
      React.createElement("div", { style: line("rgba(198,1,31,.9)", "solid", 12.5) }),     // trim
      React.createElement("div", { style: line("rgba(46,110,160,.85)", "dashed", 37.5) }),  // safe 0.25in
      lbl(16, "rgba(198,1,31,.95)", "trim 12.50 \u00d7 10.63 in"),
      lbl(40, "rgba(46,110,160,.95)", "safe 0.25 in inside trim")
    );
  }

  function App() {
    const showGuides = new URLSearchParams(location.search).get("guides") === "1";
    return React.createElement(DesignCanvas, null,
      React.createElement(DCSection, {
        id: "cover",
        title: "Front Cover",
        subtitle: "Big League NL \u00b7 AL Ballparks \u00b7 Blurb 13 \u00d7 11 in \u00b7 single page 12.75 \u00d7 10.88 in \u00b7 1275 \u00d7 1088 px @ 100 ppi"
      },
        React.createElement(DCArtboard, {
          id: "cover-page",
          label: "Front cover \u2014 ballpark grid + wordmark",
          width: PAGE_W, height: PAGE_H,
          style: { boxShadow: "none", position: "relative" }
        },
          React.createElement(Spread, null),
          showGuides ? React.createElement(CanvasGuides, null) : null
        )
      )
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
})();
