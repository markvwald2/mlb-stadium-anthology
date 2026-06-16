/* sutter-app.jsx — mount the Sutter Health Park spread in a pan/zoom design
   canvas, with a small Tweaks panel for the bridge-yellow structure and masonry
   tone. ?print=1&page=left|right[&guides=1] → press-ready single page PDF. */
(function () {
  const { DesignCanvas, DCSection, DCArtboard } = window;
  const { TweaksPanel, TweakSection, TweakToggle, TweakSlider, TweakColor } = window;
  const Spread = window.SutterSpread;
  const e = React.createElement;

  // ?print=1&page=left|right[&guides=1] → single press-ready page for vector PDF export.
  const params = new URLSearchParams(location.search);
  if (params.get("print")) {
    document.body.classList.add("pp-mode");
    window.PrintPageInit();
    const side = params.get("page") === "left" ? "left" : "right";
    const bg = side === "left" ? "#16140F" : "#E7E1D2";
    ReactDOM.createRoot(document.getElementById("root")).render(
      window.PrintPage({ Spread: Spread, side: side, bg: bg, guides: params.get("guides") === "1" })
    );
    return;
  }

  const LS = "sutter.tweaks.v1";
  function load() { try { return JSON.parse(localStorage.getItem(LS)) || {}; } catch (x) { return {}; } }
  function save(o) { try { localStorage.setItem(LS, JSON.stringify(o)); } catch (x) {} }

  function App() {
    const [v, setV] = React.useState(Object.assign({ truss: true, brick: true, frameOpacity: 1, yellow: "#D79A22" }, load()));
    React.useEffect(function () {
      const r = document.documentElement.style;
      r.setProperty("--shp-yellow", v.yellow);
      r.setProperty("--shp-frame-op", v.truss ? String(v.frameOpacity) : "0");
      r.setProperty("--shp-brick-op", v.brick ? "1" : "0");
      save(v);
    }, [v]);
    const set = function (k, val) { setV(function (p) { return Object.assign({}, p, { [k]: val }); }); };

    return e(React.Fragment, null,
      e(DesignCanvas, null,
        e(DCSection, {
          id: "sutter",
          title: "Sutter Health Park",
          subtitle: "The Temporary Span \u00b7 Blurb 13 \u00d7 11 in \u00b7 25.50 \u00d7 10.88 in spread \u00b7 7650 \u00d7 3264 px @ 300 DPI (shown at 100 ppi)"
        },
          e(DCArtboard, {
            id: "sutter-spread",
            label: "Interim riverfront warehouse \u00b7 temporary MLB \u00b7 bridge elevation",
            width: 2550, height: 1088,
            style: { boxShadow: "none" }
          },
            e(Spread, null)))),
      e(TweaksPanel, { title: "Tweaks" },
        e(TweakSection, { label: "Bridge structure" }),
        e(TweakToggle, { label: "Truss frame", value: v.truss !== false, onChange: function (x) { set("truss", x); } }),
        e(TweakSlider, { label: "Frame weight", value: Number(v.frameOpacity ?? 1), min: 0.3, max: 1, step: 0.05, onChange: function (x) { set("frameOpacity", x); } }),
        e(TweakColor, { label: "Bridge yellow", value: v.yellow || "#D79A22", options: ["#D79A22", "#E2A734", "#C68A1E", "#B9A24B"], onChange: function (x) { set("yellow", x); } }),
        e(TweakSection, { label: "Masonry" }),
        e(TweakToggle, { label: "Brick backing", value: v.brick !== false, onChange: function (x) { set("brick", x); } }))
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(e(App));
})();
