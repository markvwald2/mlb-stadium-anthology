/* jack-intro-app.jsx — mount the collection-gallery intro leaf in the design
   canvas (Direction B: photo-led collection opener + complete Stadium Eras key).
   ?print=1[&guides=1] → single press-ready page for vector PDF export. */
(function () {
  var DesignCanvas = window.DesignCanvas, DCSection = window.DCSection, DCArtboard = window.DCArtboard;
  var e = React.createElement;

  var params = new URLSearchParams(location.search);
  if (params.get("print")) {
    document.body.classList.add("pp-mode");
    window.PrintPageInit();
    ReactDOM.createRoot(document.getElementById("root")).render(
      window.PrintPage({ Spread: window.JackCollectionSpread, side: "left", bg: "#e9e7db", guides: params.get("guides") === "1" })
    );
    return;
  }

  function App() {
    return e(DesignCanvas, null,
      e(DCSection, {
        id: "jack-intro",
        title: "Book introduction Leaf",
        subtitle: "Single book page \u00b7 1275 \u00d7 1088"
      },
        e(DCArtboard, {
          id: "dir-b-gallery",
          label: "Collection gallery",
          width: 1275, height: 1088,
          style: { boxShadow: "0 8px 40px rgba(0,0,0,.28)" }
        },
          e(window.JackCollectionPage, null))));
  }

  ReactDOM.createRoot(document.getElementById("root")).render(e(App));
})();
