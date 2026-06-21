/* ballparks-app.jsx — mount the "BALLPARKS VISITED" life-list leaf in the
   pan/zoom design canvas, with the standard ?print=1 vector path. */
(function () {
  var DesignCanvas = window.DesignCanvas, DCSection = window.DCSection, DCArtboard = window.DCArtboard;
  var BallparksPage = window.BallparksPage, BallparksSpread = window.BallparksSpread;
  var e = React.createElement;

  var params = new URLSearchParams(location.search);
  if (params.get("print")) {
    document.body.classList.add("pp-mode");
    window.PrintPageInit();
    ReactDOM.createRoot(document.getElementById("root")).render(
      window.PrintPage({ Spread: BallparksSpread, side: "left", bg: "#EFE7D6", guides: params.get("guides") === "1" })
    );
    return;
  }

  function App() {
    return e(DesignCanvas, null,
      e(DCSection, {
        id: "ballparks-visited",
        title: "Ballparks Visited \u2014 Appendix",
        subtitle: "Single book leaf \u00b7 Blurb 13 \u00d7 11 in \u00b7 1275 \u00d7 1088 px \u00b7 42 ballparks \u00b7 1953\u20132025"
      },
        e(DCArtboard, {
          id: "ballparks-leaf",
          label: "BALLPARKS VISITED \u2014 lifetime ballpark life-list, 42 stadiums",
          width: 1275, height: 1088,
          style: { boxShadow: "0 8px 40px rgba(0,0,0,.28)" }
        },
          e(BallparksPage, null))));
  }

  ReactDOM.createRoot(document.getElementById("root")).render(e(App));
})();
