/* opening-app.jsx — mount the opening two-page spread in a pan/zoom design
   canvas, and provide the required single-page press-ready PDF path.

   Built on a 2550 × 1088 design canvas (two 12.75 × 10.88 in pages, fold at
   x = 1275). Both pages are warm cream paper (a data-style spread), so the
   print harness fills the spine bleed with cream on both sides.

   ?print=1&page=left|right[&guides=1] → one press-ready page for vector PDF. */
(function () {
  const { DesignCanvas, DCSection, DCArtboard } = window;
  const Spread = window.OpeningSpread;
  const CREAM = "#e9e7db"; // both pages are cream paper

  const params = new URLSearchParams(location.search);
  if (params.get("print")) {
    document.body.classList.add("pp-mode");
    window.PrintPageInit();
    const side = params.get("page") === "left" ? "left" : "right";
    ReactDOM.createRoot(document.getElementById("root")).render(
      window.PrintPage({ Spread: Spread, side: side, bg: CREAM, guides: params.get("guides") === "1" })
    );
    return;
  }

  // on-canvas trim / safe / gutter / fold guides for the normal view (?guides=1)
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
      // per-page trim (12.5 inside each page edge)
      React.createElement("div", { style: box("rgba(198,1,31,.9)",  "solid",  12.5,   12.5, 1250, 1063) }),
      React.createElement("div", { style: box("rgba(198,1,31,.9)",  "solid",  1287.5, 12.5, 1250, 1063) }),
      // per-page safe (37.5 inside each page edge)
      React.createElement("div", { style: box("rgba(46,110,160,.85)", "dashed", 37.5,   37.5, 1200, 1013) }),
      React.createElement("div", { style: box("rgba(46,110,160,.85)", "dashed", 1312.5, 37.5, 1200, 1013) }),
      // gutter no-go zone (x 1237.5–1312.5)
      React.createElement("div", { style: Object.assign({}, base, {
        left: "1237.5px", top: 0, width: "75px", height: "1088px",
        background: "rgba(189,155,96,.16)", outline: "1px dashed rgba(154,124,68,.7)"
      }) }),
      lbl(16, 16, "rgba(198,1,31,.95)", "trim 12.50 \u00d7 10.63 in \u00b7 per page"),
      lbl(16, 40, "rgba(46,110,160,.95)", "safe 0.25 in inside trim"),
      lbl(1150, 16, "rgba(154,124,68,.95)", "gutter \u2014 no content")
    );
  }

  function App() {
    const showGuides = params.get("guides") === "1";
    return React.createElement(DesignCanvas, null,
      React.createElement(DCSection, {
        id: "opening",
        title: "Opening Spread",
        subtitle: "Inside cover + page one \u00b7 28 ballparks \u00b7 Blurb 13 \u00d7 11 in \u00b7 2550 \u00d7 1088 px @ 100 ppi \u00b7 fold x=1275"
      },
        React.createElement(DCArtboard, {
          id: "opening-spread",
          label: "Opening two-page spread \u2014 cover-grid continued (28 parks)",
          width: 2550, height: 1088,
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
