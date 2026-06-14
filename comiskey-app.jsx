/* comiskey-app.jsx — mount the Comiskey "Exploding Scoreboard" spread in a
   pan/zoom design canvas, with the ?print=1 single-page export path. */
(function () {
  const { DesignCanvas, DCSection, DCArtboard } = window;
  const Spread = window.ComiskeySpread;

  // ?print=1&page=left|right[&guides=1] → single press-ready page for vector PDF export.
  const params = new URLSearchParams(location.search);
  if (params.get("print")) {
    document.body.classList.add("pp-mode");
    window.PrintPageInit();
    const side = params.get("page") === "left" ? "left" : "right";
    const bg = side === "left" ? "#100D09" : "#16120D";
    ReactDOM.createRoot(document.getElementById("root")).render(
      window.PrintPage({ Spread: Spread, side: side, bg: bg, guides: params.get("guides") === "1" })
    );
    return;
  }

  function App() {
    return React.createElement(DesignCanvas, null,
      React.createElement(DCSection, {
        id: "comiskey",
        title: "Comiskey Park",
        subtitle: "The Exploding Scoreboard \u00b7 Chicago South Side \u00b7 25.50 \u00d7 10.88 in spread \u00b7 7650 \u00d7 3264 px @ 300 DPI (shown at 100 ppi)"
      },
        React.createElement(DCArtboard, {
          id: "comiskey-exploding-scoreboard",
          label: "The Exploding Scoreboard \u2014 Comiskey Park two-page spread",
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
