/* all-games-app.jsx — mount the "ALL TRIP GAMES" appendix leaf in the pan/zoom
   design canvas, with the project's standard ?print=1 vector path. Single leaf,
   so no Tweaks panel. */
(function () {
  var DesignCanvas = window.DesignCanvas, DCSection = window.DCSection, DCArtboard = window.DCArtboard;
  var AppendixPage = window.AppendixPage, AppendixSpread = window.AppendixSpread;
  var e = React.createElement;

  // ?print=1[&guides=1] → press-ready leaf for vector PDF export (left-page harness).
  var params = new URLSearchParams(location.search);
  if (params.get("print")) {
    document.body.classList.add("pp-mode");
    window.PrintPageInit();
    ReactDOM.createRoot(document.getElementById("root")).render(
      window.PrintPage({ Spread: AppendixSpread, side: "left", bg: "#EFE7D6", guides: params.get("guides") === "1" })
    );
    return;
  }

  function App() {
    return e(DesignCanvas, null,
      e(DCSection, {
        id: "all-trip-games",
        title: "All Trip Games \u2014 Appendix",
        subtitle: "Single book leaf \u00b7 Blurb 13 \u00d7 11 in \u00b7 1275 \u00d7 1088 px (12.75 \u00d7 10.88 in @ 100 ppi) \u00b7 39 games \u00b7 1986\u20132025"
      },
        e(DCArtboard, {
          id: "all-games-leaf",
          label: "ALL TRIP GAMES \u2014 game index, 39 games across 12 trips",
          width: 1275, height: 1088,
          style: { boxShadow: "0 8px 40px rgba(0,0,0,.28)" }
        },
          e(AppendixPage, null))));
  }

  ReactDOM.createRoot(document.getElementById("root")).render(e(App));
})();
