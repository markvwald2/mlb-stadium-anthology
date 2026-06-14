/* oracle-app.jsx — mount the Oracle Park spread in a pan/zoom design canvas,
   plus a Tweaks panel that scales / moves / rotates the georeferenced shoreline
   into registration with the Field Geometry diagram. Values persist via
   OracleShoreStore (localStorage) and are read by the ?print=1 PDF path too. */
(function () {
  const { DesignCanvas, DCSection, DCArtboard } = window;
  const { TweaksPanel, TweakSection, TweakSlider, TweakToggle, TweakSelect, TweakButton } = window;
  const Spread = window.OracleSpread;
  const e = React.createElement;

  // ?print=1&page=left|right[&guides=1] → single press-ready page for vector PDF export.
  const params = new URLSearchParams(location.search);
  if (params.get("print")) {
    document.body.classList.add("pp-mode");
    window.PrintPageInit();
    const side = params.get("page") === "left" ? "left" : "right";
    const bg = side === "left" ? "#121315" : "#E9E4D7";
    ReactDOM.createRoot(document.getElementById("root")).render(
      window.PrintPage({ Spread: Spread, side: side, bg: bg, guides: params.get("guides") === "1" })
    );
    return;
  }

  function App() {
    const store = window.OracleShoreStore;
    const DEF = window.OracleShoreDefaults || {};
    const [ov, setOv] = React.useState(store ? store.overrides() : {});
    React.useEffect(function () { return store ? store.subscribe(setOv) : undefined; }, []);
    const v = Object.assign({}, DEF, ov);
    const set = function (k, val) { store && store.set({ [k]: val }); };
    const onb = function (k) { return v[k] !== false; };

    return e(React.Fragment, null,
      e(DesignCanvas, null,
        e(DCSection, {
          id: "oracle",
          title: "Oracle Park",
          subtitle: "The Bay as Architecture \u00b7 Blurb 13 \u00d7 11 in \u00b7 25.50 \u00d7 10.88 in spread \u00b7 7650 \u00d7 3264 px @ 300 DPI (shown at 100 ppi)"
        },
          e(DCArtboard, {
            id: "oracle-spread",
            label: "Urban waterfront ballpark \u00b7 retro-classic exhibit",
            width: 2550, height: 1088,
            style: { boxShadow: "none" }
          },
            e(Spread, null)
          )
        )
      ),
      e(TweaksPanel, { title: "Tweaks" },
        e(TweakSection, { label: "Shoreline effects" }),
        e(TweakToggle, { label: "Water tone", value: onb("water"), onChange: function (x) { set("water", x); } }),
        e(TweakSelect, { label: "Bathymetry", value: v.bathy || "hatch", options: [
          { value: "off", label: "Off" }, { value: "contours", label: "Contours" },
          { value: "hatch", label: "Hatch" }, { value: "stipple", label: "Stipple" }],
          onChange: function (x) { set("bathy", x); } }),
        e(TweakToggle, { label: "Place labels", value: onb("labels"), onChange: function (x) { set("labels", x); } }),
        e(TweakToggle, { label: "Cove accent", value: onb("splash"), onChange: function (x) { set("splash", x); } }),
        e(TweakSection, { label: "Creek labels" }),
        e(TweakSlider, { label: "Mission X", value: Math.round(v.missionX), min: 0, max: 1275, step: 1, unit: "px", onChange: function (x) { set("missionX", x); } }),
        e(TweakSlider, { label: "Mission Y", value: Math.round(v.missionY), min: 0, max: 1088, step: 1, unit: "px", onChange: function (x) { set("missionY", x); } }),
        e(TweakSlider, { label: "Mission rotate", value: Math.round(v.missionRot), min: -90, max: 90, step: 1, unit: "\u00b0", onChange: function (x) { set("missionRot", x); } }),
        e(TweakSlider, { label: "Creek X", value: Math.round(v.creekX), min: 0, max: 1275, step: 1, unit: "px", onChange: function (x) { set("creekX", x); } }),
        e(TweakSlider, { label: "Creek Y", value: Math.round(v.creekY), min: 0, max: 1088, step: 1, unit: "px", onChange: function (x) { set("creekY", x); } }),
        e(TweakSlider, { label: "Creek rotate", value: Math.round(v.creekRot), min: -90, max: 90, step: 1, unit: "\u00b0", onChange: function (x) { set("creekRot", x); } }),
        e(TweakSection, { label: "Cove marker + label" }),
        e(TweakSlider, { label: "Marker X", value: Math.round(v.coveMarkX), min: 0, max: 1275, step: 1, unit: "px", onChange: function (x) { set("coveMarkX", x); } }),
        e(TweakSlider, { label: "Marker Y", value: Math.round(v.coveMarkY), min: 0, max: 1088, step: 1, unit: "px", onChange: function (x) { set("coveMarkY", x); } }),
        e(TweakSlider, { label: "Label X", value: Math.round(v.coveLabelX), min: 0, max: 1275, step: 1, unit: "px", onChange: function (x) { set("coveLabelX", x); } }),
        e(TweakSlider, { label: "Label Y", value: Math.round(v.coveLabelY), min: 0, max: 1088, step: 1, unit: "px", onChange: function (x) { set("coveLabelY", x); } }),
        e(TweakSection, { label: "Shoreline registration" }),
        e(TweakSlider, { label: "Move X", value: Math.round(v.tx), min: -600, max: 800, step: 1, unit: "px", onChange: function (x) { set("tx", x); } }),
        e(TweakSlider, { label: "Move Y", value: Math.round(v.ty), min: -600, max: 600, step: 1, unit: "px", onChange: function (x) { set("ty", x); } }),
        e(TweakSlider, { label: "Scale", value: Number(v.s.toFixed(3)), min: 0.2, max: 1.4, step: 0.005, onChange: function (x) { set("s", x); } }),
        e(TweakSlider, { label: "Rotate", value: Math.round(v.rot), min: -90, max: 90, step: 1, unit: "\u00b0", onChange: function (x) { set("rot", x); } }),
        e(TweakSlider, { label: "Opacity", value: Number(v.opacity.toFixed(2)), min: 0.1, max: 1, step: 0.02, onChange: function (x) { set("opacity", x); } }),
        e(TweakSection, { label: "Pivot (raw path units)" }),
        e(TweakSlider, { label: "Pivot X", value: Math.round(v.px), min: 0, max: 2942, step: 5, onChange: function (x) { set("px", x); } }),
        e(TweakSlider, { label: "Pivot Y", value: Math.round(v.py), min: 0, max: 2017, step: 5, onChange: function (x) { set("py", x); } }),
        e("div", { style: { marginTop: "6px" } },
          e(TweakButton, { label: "Reset registration", secondary: true, onClick: function () { store && store.set({ tx: DEF.tx, ty: DEF.ty, s: DEF.s, rot: DEF.rot, px: DEF.px, py: DEF.py, opacity: DEF.opacity }); } }))
      )
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(e(App));
})();
