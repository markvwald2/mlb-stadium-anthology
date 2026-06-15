/* citi-app.jsx — mount the Citi Field spread in a pan/zoom design canvas.
   ?print=1&page=left|right[&guides=1] → single press-ready page for vector PDF. */
(function () {
  const { DesignCanvas, DCSection, DCArtboard } = window;
  const Spread = window.CitiSpread;

  const params = new URLSearchParams(location.search);
  if (params.get("print")) {
    document.body.classList.add("pp-mode");
    window.PrintPageInit();
    const side = params.get("page") === "left" ? "left" : "right";
    const bg = side === "left" ? "#141312" : "#EAE2D0";
    ReactDOM.createRoot(document.getElementById("root")).render(
      window.PrintPage({ Spread: Spread, side: side, bg: bg, guides: params.get("guides") === "1" })
    );
    return;
  }

  function App() {
    return React.createElement(DesignCanvas, null,
      React.createElement(DCSection, {
        id: "citi",
        title: "Citi Field",
        subtitle: "The Rotunda Grid \u00b7 Blurb 13 \u00d7 11 in \u00b7 25.50 \u00d7 10.88 in spread \u00b7 7650 \u00d7 3264 px @ 300 DPI (shown at 100 ppi)"
      },
        React.createElement(DCArtboard, {
          id: "citi-spread",
          label: "Rotunda / Borough Classic \u00b7 brick-and-limestone retro ballpark in the Flushing Meadows stadium district",
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
