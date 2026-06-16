/* veterans-app.jsx — mount the Veterans Stadium spread.
   Default: pan/zoom design canvas.
   ?print=1&page=left|right[&guides=1]: single press-ready page for PDF export. */
(function () {
  const { DesignCanvas, DCSection, DCArtboard } = window;
  const Spread = window.VeteransSpread;

  const params = new URLSearchParams(location.search);
  if (params.get("print")) {
    document.body.classList.add("pp-mode");
    window.PrintPageInit();
    const side = params.get("page") === "left" ? "left" : "right";
    const bg = side === "left" ? "#14130F" : "#E7E3D9";
    ReactDOM.createRoot(document.getElementById("root")).render(
      window.PrintPage({ Spread: Spread, side: side, bg: bg, guides: params.get("guides") === "1" })
    );
    return;
  }

  function App() {
    return React.createElement(DesignCanvas, null,
      React.createElement(DCSection, {
        id: "veterans",
        title: "Veterans Stadium",
        subtitle: "Concrete Civic Bowl / Zero-Hit Ledger \u00b7 Blurb 13 \u00d7 11 in \u00b7 25.50 \u00d7 10.88 in spread \u00b7 7650 \u00d7 3264 px @ 300 DPI (shown at 100 ppi)"
      },
        React.createElement(DCArtboard, {
          id: "veterans-spread",
          label: "Municipal sports-machine exhibit plate \u00b7 Aug 15, 1990 \u00b7 Mulholland no-hitter",
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
