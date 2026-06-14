/* camden-app.jsx — mount the Camden Yards spread in a pan/zoom design canvas.
   ?print=1&page=left|right[&guides=1] → single press-ready page for vector PDF. */
(function () {
  const { DesignCanvas, DCSection, DCArtboard } = window;
  const Spread = window.CamdenSpread;

  const params = new URLSearchParams(location.search);
  if (params.get("print")) {
    document.body.classList.add("pp-mode");
    window.PrintPageInit();
    const side = params.get("page") === "left" ? "left" : "right";
    const bg = side === "left" ? "#13110D" : "#E7E0D0";
    ReactDOM.createRoot(document.getElementById("root")).render(
      window.PrintPage({ Spread: Spread, side: side, bg: bg, guides: params.get("guides") === "1" })
    );
    return;
  }

  function App() {
    return React.createElement(DesignCanvas, null,
      React.createElement(DCSection, {
        id: "camden",
        title: "Oriole Park at Camden Yards",
        subtitle: "The Warehouse Datum \u00b7 Blurb 13 \u00d7 11 in \u00b7 25.50 \u00d7 10.88 in spread \u00b7 7650 \u00d7 3264 px @ 300 DPI (shown at 100 ppi)"
      },
        React.createElement(DCArtboard, {
          id: "camden-spread",
          label: "Warehouse-district architectural monograph \u00b7 retro-classic ballpark",
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
