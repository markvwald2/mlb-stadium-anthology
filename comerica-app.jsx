/* comerica-app.jsx — mount the Comerica Park "Civic Gateway" spread in a pan/zoom
   design canvas, with the press-ready single-page print branch. */
(function () {
  const { DesignCanvas, DCSection, DCArtboard } = window;
  const Spread = window.ComericaSpread;

  // ?print=1&page=left|right[&guides=1] → single press-ready page for vector PDF export.
  const params = new URLSearchParams(location.search);
  if (params.get("print")) {
    document.body.classList.add("pp-mode");
    window.PrintPageInit();
    const side = params.get("page") === "left" ? "left" : "right";
    const bg = side === "left" ? "#121319" : "#EAE2D0";
    ReactDOM.createRoot(document.getElementById("root")).render(
      window.PrintPage({ Spread: Spread, side: side, bg: bg, guides: params.get("guides") === "1" })
    );
    return;
  }

  function App() {
    return React.createElement(DesignCanvas, null,
      React.createElement(DCSection, {
        id: "comerica",
        title: "Comerica Park",
        subtitle: "The Civic Gateway \u00b7 Detroit fa\u00e7ade spread \u00b7 25.50 \u00d7 10.88 in \u00b7 7650 \u00d7 3264 px @ 300 DPI (shown at 100 ppi)"
      },
        React.createElement(DCArtboard, {
          id: "comerica-civic-gateway",
          label: "The Civic Gateway \u2014 Woodward Avenue fa\u00e7ade spread",
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
