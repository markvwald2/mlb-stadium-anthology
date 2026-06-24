/* jack-intro-app.jsx — mount BOTH intro directions side by side in the design
   canvas: A = data/infographic panel, B = photo-led collection gallery.
   ?print=1[&dir=a|b] → single press-ready page (default A). */
(function () {
  var DesignCanvas = window.DesignCanvas, DCSection = window.DCSection, DCArtboard = window.DCArtboard;
  var e = React.createElement;

  var params = new URLSearchParams(location.search);
  if (params.get("print")) {
    document.body.classList.add("pp-mode");
    window.PrintPageInit();
    var Spread = params.get("dir") === "b" ? window.JackCollectionSpread : window.JackIntroSpread;
    ReactDOM.createRoot(document.getElementById("root")).render(
      window.PrintPage({ Spread: Spread, side: "left", bg: "#e9e7db", guides: params.get("guides") === "1" })
    );
    return;
  }

  function App() {
    return e(DesignCanvas, null,
      e(DCSection, {
        id: "jack-intro",
        title: "Jack\u2019s Ballparks \u2014 Introduction Leaf \u00b7 two directions",
        subtitle: "Single book page \u00b7 1275 \u00d7 1088. A = data panel (journey timeline + collection + eras + evolution). B = photo-led collection gallery (mosaic + Generations-of-the-Game key, no stats \u2014 those live on the Road Trips spread that follows). Shared League Gothic / Newsreader type."
      },
        e(DCArtboard, {
          id: "dir-a-data",
          label: "A \u00b7 Data panel",
          width: 1275, height: 1088,
          style: { boxShadow: "0 8px 40px rgba(0,0,0,.28)" }
        },
          e(window.JackIntroPage, null)),
        e(DCArtboard, {
          id: "dir-b-gallery",
          label: "B \u00b7 Collection gallery",
          width: 1275, height: 1088,
          style: { boxShadow: "0 8px 40px rgba(0,0,0,.28)" }
        },
          e(window.JackCollectionPage, null))));
  }

  ReactDOM.createRoot(document.getElementById("root")).render(e(App));
})();
