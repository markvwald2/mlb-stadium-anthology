/* county-app.jsx — mount the Milwaukee County Stadium "Lamp-Matrix Municipal"
   spread in a pan/zoom design canvas, with the press-ready print path. */
(function () {
  const { DesignCanvas, DCSection, DCArtboard } = window;
  const Spread = window.CountySpread;

  // ?print=1&page=left|right[&guides=1] → single press-ready page for vector PDF export.
  const params = new URLSearchParams(location.search);
  if (params.get("print")) {
    document.body.classList.add("pp-mode");
    window.PrintPageInit();
    const side = params.get("page") === "left" ? "left" : "right";
    const bg = side === "left" ? "#080d15" : "#161d2b";
    ReactDOM.createRoot(document.getElementById("root")).render(
      window.PrintPage({ Spread: Spread, side: side, bg: bg, guides: params.get("guides") === "1" })
    );
    return;
  }

  function App() {
    return React.createElement(DesignCanvas, null,
      React.createElement(DCSection, {
        id: "county",
        title: "Milwaukee County Stadium",
        subtitle: "Lamp-Matrix Municipal \u00b7 25.50 \u00d7 10.88 in spread \u00b7 7650 \u00d7 3264 px @ 300 DPI (shown at 100 ppi)"
      },
        React.createElement(DCArtboard, {
          id: "county-lamp-matrix-municipal",
          label: "Lamp-Matrix Municipal \u2014 two-page spread",
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
