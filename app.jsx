/* app.jsx — mount the Wrigley spread inside a pan/zoom design canvas
   (lets you zoom into the dense field-manual type; ready for more spreads later). */
(function () {
  const { DesignCanvas, DCSection, DCArtboard } = window;
  const Spread = window.WrigleySpread;

  function App() {
    return React.createElement(DesignCanvas, null,
      React.createElement(DCSection, {
        id: "wrigley",
        title: "Wrigley Field",
        subtitle: "Full spread \u00b7 26.25 \u00d7 11.125 in \u00b7 7875 \u00d7 3338 px @ 300 DPI (design shown at 100 ppi)"
      },
        React.createElement(DCArtboard, {
          id: "wrigley-spread",
          label: "Archival Field Manual \u00b7 single master",
          width: 2625, height: 1113
        },
          React.createElement(Spread, null)
        )
      )
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
})();
