/* timeline-app.jsx — mount the MLB Stadium Timeline interstitial in the
   pan/zoom design canvas, with the project's standard ?print=1 vector path.
   This is a data spread: BOTH pages share the warm cream paper background. */
(function () {
  const { DesignCanvas, DCSection, DCArtboard } = window;
  const Spread = window.TimelineSpread;

  // ?print=1&page=left|right[&guides=1] → single press-ready page for vector PDF export.
  const params = new URLSearchParams(location.search);
  if (params.get("print")) {
    document.body.classList.add("pp-mode");
    // Guarantee a font-free PDF: once the webfonts have loaded and the
    // collision-aware label pass has settled, every SVG <text> is replaced by
    // its own vector outlines (see outline-text.js). Placement is read off the
    // live render, so layout/size/colour are untouched. Skip with &outline=0.
    if (params.get("outline") !== "0" && window.OutlineSVGText) {
      window.PPExtraReady = (async function () {
        try { await document.fonts.ready; } catch (e) {}
        const svgReady = async () => {
          for (let i = 0; i < 80; i++) {
            const n = document.querySelectorAll(".pp-page svg text").length;
            await new Promise((r) => setTimeout(r, 120));
            if (n > 40 && document.querySelectorAll(".pp-page svg text").length === n) return;
          }
        };
        await svgReady();
        const s = await window.OutlineSVGText(document.querySelector(".pp-page"));
        const bad = s.remaining || s.missing.length || s.warnings.length;
        return !bad
          ? "Text outlined \u2713 " + s.glyphs + " glyphs \u00b7 no fonts in PDF \u00b7 safe to print"
          : "OUTLINE WARNING \u00b7 " + s.remaining + " text left \u00b7 " + s.missing.concat(s.warnings).join(" | ");
      })();
    }
    window.PrintPageInit();
    const side = params.get("page") === "left" ? "left" : "right";
    // Chrome seeds the Save-as-PDF filename from document.title — name the pages
    // by their book folio so the saved files land as requested.
    document.title = side === "left" ? "92 timeline left" : "93 timeline right";
    const bg = "#EFE7D6"; // paper on both pages for this infographic
    ReactDOM.createRoot(document.getElementById("root")).render(
      window.PrintPage({ Spread: Spread, side: side, bg: bg, guides: params.get("guides") === "1" })
    );
    return;
  }

  function App() {
    return React.createElement(DesignCanvas, null,
      React.createElement(DCSection, {
        id: "timeline",
        title: "MLB Stadium Timeline",
        subtitle: "Thematic interstitial \u00b7 Blurb 13 \u00d7 11 in \u00b7 25.50 \u00d7 10.88 in spread \u00b7 7650 \u00d7 3264 px @ 300 DPI (shown at 100 ppi)"
      },
        React.createElement(DCArtboard, {
          id: "timeline-spread",
          label: "MLB Stadium Timeline \u2014 franchise tenure chronology",
          width: 2550, height: 1088,
          style: { boxShadow: "none" }
        },
          React.createElement(Spread, null)
        )
      )
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
})();
