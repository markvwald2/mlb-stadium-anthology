/* yankee-app.jsx — mount the Yankee Stadium (1923) "Bronx Civic Frieze" spread
   in a pan/zoom design canvas, with the required vector-PDF print branch. */
(function () {
  const { DesignCanvas, DCSection, DCArtboard } = window;
  const Spread = window.YankeeSpread;

  // ?print=1&page=left|right[&guides=1] → single press-ready page for vector PDF export.
  const params = new URLSearchParams(location.search);
  if (params.get("print")) {
    document.body.classList.add("pp-mode");
    window.PrintPageInit();
    const side = params.get("page") === "left" ? "left" : "right";
    const bg = side === "left" ? "#0E1622" : "#ECE6D6";
    ReactDOM.createRoot(document.getElementById("root")).render(
      window.PrintPage({ Spread: Spread, side: side, bg: bg, guides: params.get("guides") === "1" })
    );
    return;
  }

  function App() {
    return React.createElement(DesignCanvas, null,
      React.createElement(DCSection, {
        id: "yankee",
        title: "Yankee Stadium (1923)",
        subtitle: "Bronx Civic Frieze \u00b7 Ruth-Era Triple-Deck Monument \u00b7 25.50 \u00d7 10.88 in spread \u00b7 7650 \u00d7 3264 px @ 300 DPI (shown at 100 ppi)"
      },
        React.createElement(DCArtboard, {
          id: "yankee-frieze",
          label: "Bronx Civic Frieze \u2014 night hero + civic data sheet",
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
