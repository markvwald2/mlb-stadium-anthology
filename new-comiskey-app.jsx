/* new-comiskey-app.jsx — mount the New Comiskey Park spread in the shared
   pan/zoom design canvas, with the press-ready single-page print path. */
(function () {
  const { DesignCanvas, DCSection, DCArtboard } = window;
  const Spread = window.NewComiskeySpread;

  // ?print=1&page=left|right[&guides=1] → single press-ready page for vector PDF export.
  const params = new URLSearchParams(location.search);
  if (params.get("print")) {
    document.body.classList.add("pp-mode");
    window.PrintPageInit();
    const side = params.get("page") === "left" ? "left" : "right";
    const bg = side === "left" ? "#0E0E0C" : "#D6D4CD";
    ReactDOM.createRoot(document.getElementById("root")).render(
      window.PrintPage({ Spread: Spread, side: side, bg: bg, guides: params.get("guides") === "1" })
    );
    return;
  }

  // ?full=1 → the whole 2550x1088 spread, no canvas chrome, for a clean raster capture.
  if (params.get("full")) {
    document.body.style.background = "#1c1c1f";
    const host = document.getElementById("root");
    host.style.cssText = "width:2550px;height:1088px;overflow:hidden;";
    ReactDOM.createRoot(host).render(React.createElement(Spread, null));
    return;
  }

  function App() {
    return React.createElement(DesignCanvas, null,
      React.createElement(DCSection, {
        id: "new-comiskey",
        title: "New Comiskey Park",
        subtitle: "The Correction \u00b7 Chicago South Side \u00b7 25.50 \u00d7 10.88 in spread \u00b7 7650 \u00d7 3264 px @ 300 DPI (shown at 100 ppi)"
      },
        React.createElement(DCArtboard, {
          id: "new-comiskey-the-correction",
          label: "The Correction \u2014 New Comiskey Park two-page spread",
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
