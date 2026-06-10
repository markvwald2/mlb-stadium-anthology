/* wrigley-app.jsx — mount the Wrigley Field editorial spread in a pan/zoom design canvas. */
(function () {
  const { DesignCanvas, DCSection, DCArtboard } = window;
  const Editorial = window.WrigleyEditorial;

  // ?print=1&page=left|right[&guides=1] → single press-ready page for vector PDF export.
  const params = new URLSearchParams(location.search);
  if (params.get("print")) {
    document.body.classList.add("pp-mode");
    window.PrintPageInit();
    const side = params.get("page") === "left" ? "left" : "right";
    const bg = side === "left" ? "#1b1b1a" : "#EFEADD";
    ReactDOM.createRoot(document.getElementById("root")).render(
      window.PrintPage({ Spread: Editorial, side: side, bg: bg, guides: params.get("guides") === "1" })
    );
    return;
  }

  function App() {
    return React.createElement(DesignCanvas, null,
      React.createElement(DCSection, {
        id: "wrigley",
        title: "Wrigley Field",
        subtitle: "Editorial atlas \u00b7 Blurb 13 \u00d7 11 in \u00b7 25.50 \u00d7 10.88 in spread \u00b7 7650 \u00d7 3264 px @ 300 DPI (shown at 100 ppi)"
      },
        React.createElement(DCArtboard, {
          id: "wrigley-editorial",
          label: "Editorial atlas \u2014 serif archival monograph",
          width: 2550, height: 1088,
          style: { boxShadow: "none" }
        },
          React.createElement(Editorial, null)
        )
      )
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
})();
