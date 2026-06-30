/* opening-app.jsx — mount the opening page (single interior leaf) in a pan/zoom
   design canvas, and provide the required single-page press-ready PDF path.

   Built on a 1275 × 1088 design page (12.75 in wide incl. binding bleed; the
   print harness drops the binding bleed and outputs the 12.625 × 10.875 in
   interior page per the updated Blurb spec). Warm cream paper throughout.

   ?print=1[&page=left|right][&guides=1] → one press-ready page for vector PDF. */
(function () {
  const { DesignCanvas, DCSection, DCArtboard } = window;
  const Spread = window.OpeningSpread;
  const CREAM = "#e9e7db"; // cream paper

  const params = new URLSearchParams(location.search);
  if (params.get("print")) {
    document.body.classList.add("pp-mode");
    window.PrintPageInit();
    // single page lives on the LEFT half of the harness canvas; default left.
    const side = params.get("page") === "right" ? "right" : "left";
    ReactDOM.createRoot(document.getElementById("root")).render(
      window.PrintPage({ Spread: Spread, side: side, bg: CREAM, guides: params.get("guides") === "1" })
    );
    return;
  }

  // on-canvas trim / safe guides for the normal view (?guides=1), single page.
  function CanvasGuides() {
    const base = { position: "absolute", pointerEvents: "none" };
    const box = (color, dash, x, y, w, h) => Object.assign({}, base, {
      left: x + "px", top: y + "px", width: w + "px", height: h + "px",
      outline: "1.5px " + dash + " " + color
    });
    const lbl = (x, y, color, text) => React.createElement("div", {
      style: Object.assign({}, base, {
        left: x + "px", top: y + "px",
        font: "600 12px 'Space Mono', ui-monospace, monospace",
        letterSpacing: ".1em", textTransform: "uppercase", color: color,
        background: "rgba(233,231,219,.82)", padding: "2px 6px"
      })
    }, text);
    return React.createElement("div", { style: { position: "absolute", inset: 0, zIndex: 50 } },
      // trim 12.5 inside the page edge (binding bleed dropped at export)
      React.createElement("div", { style: box("rgba(198,1,31,.9)", "solid", 12.5, 12.5, 1250, 1063) }),
      // safe: 0.25 in outer/top/bottom, 0.5 in binding (right) edge
      React.createElement("div", { style: box("rgba(46,110,160,.85)", "dashed", 37.5, 37.5, 1175, 1013) }),
      lbl(16, 16, "rgba(198,1,31,.95)", "trim 12.50 \u00d7 10.63 in"),
      lbl(16, 40, "rgba(46,110,160,.95)", "safe 0.25 in \u00b7 0.5 in binding")
    );
  }

  function App() {
    const showGuides = params.get("guides") === "1";
    return React.createElement(DesignCanvas, null,
      React.createElement(DCSection, {
        id: "opening",
        title: "Closing Page",
        subtitle: "Inside back cover \u00b7 14 ballparks \u00b7 single interior page \u00b7 PDF 12.625 \u00d7 10.875 in (trim 12.5 \u00d7 10.625) \u00b7 1275 \u00d7 1088 px @ 100 ppi"
      },
        React.createElement(DCArtboard, {
          id: "opening-page",
          label: "Opening page \u2014 cover-grid (14 parks)",
          width: 1275, height: 1088,
          style: { boxShadow: "none", position: "relative", padding: 0, background: "#e9e7db" }
        },
          React.createElement(Spread, null),
          showGuides ? React.createElement(CanvasGuides, null) : null
        )
      )
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
})();
