/* road-trips-app.jsx — mount "THE ROAD TRIPS" overview in the pan/zoom design
   canvas, with the project's standard ?print=1 vector path and a small Tweaks
   panel (accent intensity, rail tone, paper). Data spread: paper on BOTH pages. */
(function () {
  const { DesignCanvas, DCSection, DCArtboard } = window;
  const { TweaksPanel, TweakSection, TweakToggle, TweakSlider, TweakColor } = window;
  const Spread = window.RoadTripsSpread;
  const e = React.createElement;

  // ?print=1&page=left|right[&guides=1] → single press-ready page for vector PDF export.
  const params = new URLSearchParams(location.search);
  if (params.get("print")) {
    document.body.classList.add("pp-mode");
    window.PrintPageInit();
    const side = params.get("page") === "left" ? "left" : "right";
    const bg = "#EFE7D6"; // warm paper on both pages — this is a data spread
    ReactDOM.createRoot(document.getElementById("root")).render(
      window.PrintPage({ Spread: Spread, side: side, bg: bg, guides: params.get("guides") === "1" })
    );
    return;
  }

  const LS = "roadtrips.tweaks.v1";
  function load() { try { return JSON.parse(localStorage.getItem(LS)) || {}; } catch (x) { return {}; } }
  function save(o) { try { localStorage.setItem(LS, JSON.stringify(o)); } catch (x) {} }

  function App() {
    const [v, setV] = React.useState(Object.assign({
      accentOn: true, accentStrength: 1, rail: "#21344A", keylines: true,
    }, load()));
    React.useEffect(function () {
      const r = document.documentElement.style;
      r.setProperty("--rt-accent-sat", v.accentOn ? String(0.4 + 0.6 * v.accentStrength) : "0.12");
      r.setProperty("--rt-accent-op", v.accentOn ? "1" : "0.4");
      r.setProperty("--rt-rail", v.rail);
      r.setProperty("--rt-keyline-op", v.keylines ? "1" : "0");
      save(v);
    }, [v]);
    const set = function (k, val) { setV(function (p) { return Object.assign({}, p, { [k]: val }); }); };

    return e(React.Fragment, null,
      e(DesignCanvas, null,
        e(DCSection, {
          id: "roadtrips",
          title: "The Road Trips \u2014 Overview",
          subtitle: "Lifetime road-trip chronology \u00b7 Blurb 13 \u00d7 11 in \u00b7 25.50 \u00d7 10.88 in spread \u00b7 7650 \u00d7 3264 px @ 300 DPI (shown at 100 ppi)"
        },
          e(DCArtboard, {
            id: "roadtrips-spread",
            label: "THE ROAD TRIPS \u2014 12 trips, 39 games, 34 stadiums, 1986\u20132025",
            width: 2550, height: 1088,
            style: { boxShadow: "none" }
          },
            e(Spread, null)))),
      e(TweaksPanel, { title: "Tweaks" },
        e(TweakSection, { label: "Trip accents" }),
        e(TweakToggle, { label: "Team-color accents", value: v.accentOn !== false, onChange: function (x) { set("accentOn", x); } }),
        e(TweakSlider, { label: "Accent strength", value: Number(v.accentStrength ?? 1), min: 0.4, max: 1, step: 0.05, onChange: function (x) { set("accentStrength", x); } }),
        e(TweakSection, { label: "Chronology rail" }),
        e(TweakColor, { label: "Rail ink", value: v.rail || "#21344A", options: ["#21344A", "#23201B", "#3A2A1C", "#1E5641"], onChange: function (x) { set("rail", x); } }),
        e(TweakSection, { label: "Photo plates" }),
        e(TweakToggle, { label: "Keyline borders", value: v.keylines !== false, onChange: function (x) { set("keylines", x); } }))
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(e(App));
})();
