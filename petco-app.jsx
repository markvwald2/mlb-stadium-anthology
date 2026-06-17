/* petco-app.jsx — mount the Petco Park spread in the shared pan/zoom design
   canvas, with the press-ready single-page print path. "The Warehouse Block." */
(function () {
  const { DesignCanvas, DCSection, DCArtboard } = window;
  const Spread = window.PetcoParkSpread;

  // ?print=1&page=left|right[&guides=1] → single press-ready page for vector PDF export.
  const params = new URLSearchParams(location.search);
  if (params.get("print")) {
    document.body.classList.add("pp-mode");
    window.PrintPageInit();
    const side = params.get("page") === "left" ? "left" : "right";
    const bg = side === "left" ? "#110E08" : "#1E1B15";
    ReactDOM.createRoot(document.getElementById("root")).render(
      window.PrintPage({ Spread: Spread, side: side, bg: bg, guides: params.get("guides") === "1" })
    );
    return;
  }

  // ?full=1 → whole 2550x1088 spread, no canvas chrome, for a clean raster capture.
  if (params.get("full")) {
    document.body.style.background = "#121009";
    const host = document.getElementById("root");
    host.style.cssText = "width:2550px;height:1088px;overflow:hidden;";
    ReactDOM.createRoot(host).render(React.createElement(Spread, null));
    return;
  }

  function App() {
    return React.createElement(DesignCanvas, null,
      React.createElement(DCSection, {
        id: "petco-park",
        title: "Petco Park",
        subtitle: "The Warehouse Block \u00b7 Blurb 13 \u00d7 11 in \u00b7 25.50 \u00d7 10.88 in spread \u00b7 7650 \u00d7 3264 px @ 300 DPI (shown at 100 ppi)"
      },
        React.createElement(DCArtboard, {
          id: "petco-park-spread",
          label: "Petco Park \u2014 four-bay warehouse-facade spread",
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
