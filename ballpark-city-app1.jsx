/* ballpark-city-app1.jsx — mount Spread 1 in the design canvas, with the
   project-standard ?print=1 vector path. Text-first essay: BOTH pages share
   the warm paper background. */
(function () {
  const { DesignCanvas, DCSection, DCArtboard } = window;
  const Spread = window.BallparkSpread1;
  const PAPER = "#ECE3D0";

  const params = new URLSearchParams(location.search);
  if (params.get("print")) {
    document.body.classList.add("pp-mode");
    window.PrintPageInit();
    const side = params.get("page") === "left" ? "left" : "right";
    ReactDOM.createRoot(document.getElementById("root")).render(
      window.PrintPage({ Spread: Spread, side: side, bg: PAPER, guides: params.get("guides") === "1" })
    );
    return;
  }

  function App() {
    return React.createElement(DesignCanvas, null,
      React.createElement(DCSection, {
        id: "spread1",
        title: "The Ballpark and the City \u2014 Spread 1",
        subtitle: "Pages 1\u20132 \u00b7 Title \u00b7 Executive Summary \u00b7 Wooden Parks \u00b7 The Jewel Box \u00b7 Blurb 13 \u00d7 11 in \u00b7 2550 \u00d7 1088 px",
      },
        React.createElement(DCArtboard, {
          id: "spread1-art",
          label: "Spread 1 \u2014 pages 1\u20132",
          width: 2550, height: 1088,
          style: { boxShadow: "0 1px 3px rgba(0,0,0,.10),0 10px 40px rgba(0,0,0,.12)" },
        }, React.createElement(Spread, null))
      )
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
})();
