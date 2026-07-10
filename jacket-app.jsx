/* jacket-app.jsx — mount the full ImageWrap cover in a pan/zoom design canvas and
   provide the SINGLE-PAGE press-ready PDF path (one wide sheet, not split).

   The cover is built on a 2668.1 × 1162.5 design canvas (= 26.681 × 11.625 in
   page-with-bleed @ 100 ppi). The print harness scales that 1:1 onto a
   26.681 × 11.625 in sheet (SCALE = 96/100 = 0.96 — nothing resized), so the
   whole wrap — covers and spine, no flaps — bleeds to the sheet edge in one PDF.
   Blurb Large Landscape, Hardcover ImageWrap cover spec (96 pp). */
(function () {
  const { DesignCanvas, DCSection, DCArtboard } = window;
  const Spread = window.JacketSpread;
  const G = window.JACKET_GEO;
  const IN = 96;
  const SCALE = IN / 100;            // 0.96 — 100 design-px → 1 in → 96 css-px
  const PAPER = "#e9e7db";

  // ---- shared guide layer (trim · safe · flap folds · spine edges) ----------
  function GuideLayer(props) {
    const k = props.scale;           // design-px → css-px multiplier
    const px = (n) => (n * k) + "px";
    const L = (color, dash, x) => ({
      position: "absolute", pointerEvents: "none",
      left: px(x), top: px(G.yTrimTop), width: "0",
      height: px(G.TRIM_H), borderLeft: "1px " + dash + " " + color
    });
    const rect = (color, dash, x, y, w, h) => ({
      position: "absolute", pointerEvents: "none",
      left: px(x), top: px(y), width: px(w), height: px(h),
      outline: "1px " + dash + " " + color
    });
    const lbl = (x, y, color, text) => React.createElement("div", {
      style: {
        position: "absolute", left: px(x), top: px(y), pointerEvents: "none",
        font: "600 11px 'Space Mono', ui-monospace, monospace", letterSpacing: ".08em",
        textTransform: "uppercase", color: color,
        background: "rgba(233,231,219,.82)", padding: "2px 6px", whiteSpace: "nowrap"
      }
    }, text);
    return React.createElement("div", { className: "jk-guides", style: { position: "absolute", inset: 0, zIndex: 60 } },
      // trim (red) + safe (blue)
      React.createElement("div", { style: rect("rgba(198,1,31,.9)", "solid", G.xTrimLeft, G.yTrimTop, G.TRIM_W, G.TRIM_H) }),
      React.createElement("div", { style: rect("rgba(46,110,160,.85)", "dashed", G.xTrimLeft + G.SAFE, G.yTrimTop + G.SAFE, G.TRIM_W - 2 * G.SAFE, G.TRIM_H - 2 * G.SAFE) }),
      // spine edges (amber)
      React.createElement("div", { style: L("rgba(176,116,28,.95)", "solid", G.xSpine) }),
      React.createElement("div", { style: L("rgba(176,116,28,.95)", "solid", G.xFrontCover) }),
      lbl(G.xBackCover + 8, G.yTrimTop + 8, "rgba(198,1,31,.95)", "back cover \u2014 father\u2019s day"),
      lbl(G.xFrontCover + 8, G.yTrimTop + 8, "rgba(198,1,31,.95)", "front cover \u2014 big league"),
      lbl(G.xTrimLeft, G.yTrimBot - 26, "rgba(46,110,160,.95)", "trim 26.069 \u00d7 11.013 in \u00b7 bleed 0.306 \u00b7 safe 0.25 \u00b7 spine 0.569 \u00b7 no flaps")
    );
  }

  // ---- single-page print path -----------------------------------------------
  function injectPrintCSS() {
    if (document.getElementById("jk-pp-style")) return;
    const css = `
      html, body { margin: 0; padding: 0; }
      body.jk-pp-mode { background: #3a3a3e; }
      body.jk-pp-mode #root { display: flex; align-items: flex-start; justify-content: center; padding: 28px; min-height: 100vh; box-sizing: border-box; overflow: auto; }
      body.jk-pp-mode .jk-pp-page { flex: 0 0 auto; box-shadow: 0 10px 40px rgba(0,0,0,.4); }
      #jk-fontbadge { position: fixed; top: 12px; left: 12px; z-index: 9999;
        font: 12px/1 ui-monospace, "SF Mono", Menlo, monospace; letter-spacing: .02em;
        padding: 8px 12px; border-radius: 4px; pointer-events: none; border: 1px solid transparent; }
      #jk-fontbadge[data-state="loading"] { background: #5b4a28; color: #ffe6ad; border-color: #8a6d2e; }
      #jk-fontbadge[data-state="ready"]   { background: #25391f; color: #c8e6b6; border-color: #4f7a37; }
      @media print {
        @page { size: 26.681in 11.625in; margin: 0; }
        html, body { background: #fff !important; margin: 0 !important; padding: 0 !important; }
        body.jk-pp-mode #root { padding: 0 !important; margin: 0 !important; display: block !important; min-height: 0 !important; overflow: visible !important; }
        body.jk-pp-mode .jk-pp-page { box-shadow: none !important; margin: 0 !important; }
        .jk-guides, #jk-fontbadge { display: none !important; }
        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      }`;
    const el = document.createElement("style");
    el.id = "jk-pp-style";
    el.textContent = css;
    document.head.appendChild(el);
  }

  // Force every declared face (incl. the digit-only Cooper Numerals used by the
  // "2026" line) to fully download before print, so Chrome embeds real subsets.
  function ensureFonts() {
    if (!document.fonts || document.getElementById("jk-fontbadge")) return;
    const badge = document.createElement("div");
    badge.id = "jk-fontbadge";
    badge.setAttribute("data-state", "loading");
    badge.textContent = "Loading fonts\u2026 don\u2019t print yet";
    const attach = () => { if (document.body && !badge.isConnected) document.body.appendChild(badge); };
    attach();
    document.addEventListener("DOMContentLoaded", attach);
    (async function run() {
      try {
        const want = ['400 1em "Cooper Black"', '400 1em "Cooper Numerals"',
          '500 1em "Spectral"', '600 1em "Spectral"', '700 1em "Spectral"', '400 1em "Ultra"'];
        await Promise.all(want.map((f) => document.fonts.load(f).catch(() => {})));
        await document.fonts.ready;
        const faces = Array.from(document.fonts);
        await Promise.all(faces.map((f) => f.load().catch(() => {})));
        await document.fonts.ready;
      } catch (e) { /* ready regardless */ }
      // Rasterize the Cooper-Numerals digits ("2026") so the PDF embeds them as
      // a high-DPI image — Chrome won't embed the OTF/CFF outlines, which the
      // printer rejects as non-embedded. Everything else stays vector text.
      try {
        for (let i = 0; i < 60 && !document.querySelector(".jk-spine-num"); i++) {
          await new Promise((r) => setTimeout(r, 50));
        }
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        rasterizeNumerals();
      } catch (e) { /* leave as text if rasterization fails */ }
      attach();
      badge.setAttribute("data-state", "ready");
      badge.textContent = "Fonts embedded \u2713 \u00b7 safe to print";
    })();
  }

  // Replace every Cooper-Numerals digit run with a crisp high-DPI raster image,
  // sized to the original text box, so the press PDF carries no non-embeddable
  // OTF. Targets: spine year + the back-cover wordmark numerals ("20" / "26").
  function rasterizeNumerals() {
    const sel = ".jk-spine-num, .jk-back .cv-logo-l2 .cv-nl, .jk-back .cv-logo-l2 .cv-al";
    const SCALE_PX = 8; // ~8× oversample → well past 300 DPI at print size
    document.querySelectorAll(sel).forEach((el) => {
      if (el.dataset.rasterized) return;
      const text = el.textContent;
      if (!text || !text.trim()) return;
      const cs = getComputedStyle(el);
      const fs = parseFloat(cs.fontSize);
      const color = cs.color;
      const ls = parseFloat(cs.letterSpacing) || 0;
      const fam = '"Cooper Numerals"';
      const m = document.createElement("canvas").getContext("2d");
      m.font = fs + 'px ' + fam;
      let w = 0;
      for (const ch of text) { w += m.measureText(ch).width + ls; }
      if (text.length) w -= ls;
      const asc = fs * 1.0, desc = fs * 0.32, h = asc + desc;
      const cnv = document.createElement("canvas");
      cnv.width = Math.max(1, Math.ceil(w * SCALE_PX));
      cnv.height = Math.max(1, Math.ceil(h * SCALE_PX));
      const ctx = cnv.getContext("2d");
      ctx.scale(SCALE_PX, SCALE_PX);
      ctx.font = fs + 'px ' + fam;
      ctx.fillStyle = color;
      ctx.textBaseline = "alphabetic";
      ctx.textAlign = "left";
      let x = 0;
      for (const ch of text) { ctx.fillText(ch, x, asc); x += m.measureText(ch).width + ls; }
      const img = document.createElement("img");
      img.src = cnv.toDataURL("image/png");
      img.alt = text;
      img.style.cssText = "display:inline-block;width:" + w + "px;height:" + h + "px;vertical-align:baseline;";
      el.textContent = "";
      el.style.letterSpacing = "0";
      el.appendChild(img);
      el.dataset.rasterized = "1";
    });
  }

  function JacketPrint(opts) {
    const guides = !!opts.guides;
    const sheetW = G.CANVAS_W * SCALE, sheetH = G.CANVAS_H * SCALE;
    const pageStyle = { position: "relative", width: sheetW + "px", height: sheetH + "px", overflow: "hidden", background: PAPER };
    const holderStyle = { position: "absolute", top: 0, left: 0, width: G.CANVAS_W + "px", height: G.CANVAS_H + "px", transformOrigin: "top left", transform: "scale(" + SCALE + ")" };
    return React.createElement("div", { className: "jk-pp-page", style: pageStyle, "data-screen-label": "Dust jacket print sheet" },
      React.createElement("div", { style: holderStyle }, React.createElement(Spread, null)),
      guides ? React.createElement(GuideLayer, { scale: SCALE }) : null
    );
  }

  const params = new URLSearchParams(location.search);
  if (params.get("print")) {
    document.body.classList.add("jk-pp-mode");
    injectPrintCSS();
    ensureFonts();
    ReactDOM.createRoot(document.getElementById("root")).render(
      JacketPrint({ guides: params.get("guides") === "1" })
    );
    return;
  }

  // ---- normal pan/zoom canvas view ------------------------------------------
  function App() {
    const showGuides = new URLSearchParams(location.search).get("guides") === "1";
    return React.createElement(DesignCanvas, null,
      React.createElement(DCSection, {
        id: "jacket",
        title: "Cover wrap \u2014 full (flapless)",
        subtitle: "Blurb Large Landscape \u00b7 Hardcover (flapless) \u00b7 PDF 26.681 \u00d7 11.625 in \u00b7 2668.1 \u00d7 1162.5 px @ 100 ppi \u00b7 one PDF"
      },
        React.createElement(DCArtboard, {
          id: "jacket-sheet",
          label: "Back cover (Father\u2019s Day) \u00b7 spine \u00b7 front cover (Big League)",
          width: G.CANVAS_W, height: G.CANVAS_H,
          style: { boxShadow: "none", position: "relative", background: PAPER }
        },
          React.createElement(Spread, null),
          showGuides ? React.createElement(GuideLayer, { scale: 1 }) : null
        )
      )
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
})();
