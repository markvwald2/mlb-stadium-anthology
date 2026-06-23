/* yankee2009-frieze-app.jsx — mount the Yankee Stadium (2009) "Franchise Frieze"
   spread in a pan/zoom design canvas, with the required vector-PDF print branch. */
(function () {
  const { DesignCanvas, DCSection, DCArtboard } = window;
  const Spread = window.YK2009FriezeSpread;

  // ?print=1&page=left|right[&guides=1] → single press-ready page for vector PDF export.
  const params = new URLSearchParams(location.search);
  if (params.get("print")) {
    document.body.classList.add("pp-mode");
    window.PrintPageInit();
    const side = params.get("page") === "left" ? "left" : "right";
    const bg = side === "left" ? "#181c22" : "#E9E4D6";
    ReactDOM.createRoot(document.getElementById("root")).render(
      window.PrintPage({ Spread: Spread, side: side, bg: bg, guides: params.get("guides") === "1" })
    );
    return;
  }

  function App() {
    return React.createElement(DesignCanvas, null,
      React.createElement(DCSection, {
        id: "yankee2009-frieze",
        title: "Yankee Stadium (2009)",
        subtitle: "The Franchise Frieze \u00b7 Memory as a Building Material \u00b7 25.50 \u00d7 10.88 in spread \u00b7 7650 \u00d7 3264 px @ 300 DPI (shown at 100 ppi)"
      },
        React.createElement(DCArtboard, {
          id: "yankee2009-frieze-art",
          label: "The Franchise Frieze \u2014 dusk facade hero + five-bay monumental elevation",
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
