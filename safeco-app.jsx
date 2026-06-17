/* safeco-app.jsx — mount the Safeco Field spread in the shared pan/zoom design
   canvas, with the press-ready single-page print path. */
(function () {
  const { DesignCanvas, DCSection, DCArtboard } = window;
  const Spread = window.SafecoSpread;

  // ?print=1&page=left|right[&guides=1] → single press-ready page for vector PDF export.
  const params = new URLSearchParams(location.search);
  if (params.get("print")) {
    document.body.classList.add("pp-mode");
    window.PrintPageInit();
    const side = params.get("page") === "left" ? "left" : "right";
    const bg = side === "left" ? "#0C1E22" : "#EAE3D3";
    ReactDOM.createRoot(document.getElementById("root")).render(
      window.PrintPage({ Spread: Spread, side: side, bg: bg, guides: params.get("guides") === "1" })
    );
    return;
  }

  // ?full=1 → the whole 2550x1088 spread, no canvas chrome, for a clean raster capture.
  if (params.get("full")) {
    document.body.style.background = "#23232a";
    const host = document.getElementById("root");
    host.style.cssText = "width:2550px;height:1088px;overflow:hidden;";
    ReactDOM.createRoot(host).render(React.createElement(Spread, null));
    return;
  }

  function App() {
    return React.createElement(DesignCanvas, null,
      React.createElement(DCSection, {
        id: "safeco-field",
        title: "Safeco Field",
        subtitle: "Shelter Without Walls \u00b7 Blurb 13 \u00d7 11 in \u00b7 25.50 \u00d7 10.88 in spread \u00b7 7650 \u00d7 3264 px @ 300 DPI (shown at 100 ppi)"
      },
        React.createElement(DCArtboard, {
          id: "safeco-field-spread",
          label: "Safeco Field \u2014 canopy roof-bay spread",
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
