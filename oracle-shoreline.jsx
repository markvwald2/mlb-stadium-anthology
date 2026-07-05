/* oracle-shoreline.jsx — real China Basin / McCovey Cove shoreline, styled as an
   archival site-plan underlay on the right page.

   A single evenodd coastline path (user trace of the Mission Bay / China Basin
   waterfront: bay edge, China Basin pier teeth, McCovey Cove + creek channel).
   The land is the filled region of the path, so in figure-ground the land reads
   as the page's paper and the bay / cove / piers read as the toned negative
   space. Registered to the Field Geometry diagram via one transform group.

   Layers (Tweaks in OracleShoreStore):
     water    — faint sage figure-ground wash on the bay/cove/channel
     bathy    — water-depth treatment: "off" | "contours" (derived offset lines) |
                "hatch" (engraved diagonal lines) | "stipple" (dotted), each
                confined to the water via the figure-ground mask
     labels   — Space-Mono place names in the water
     splash   — one orange accent marking McCovey Cove (the "splash" datum)
   Tone: multiply blend (CSS) + a coast edge slightly heavier than the texture.

   Registration + toggles persist via OracleShoreStore; the ?print=1 PDF path
   reads the same values. Exposes window.OracleShoreline / OracleShoreDefaults. */
(function () {
  const e = React.createElement;
  const bay = "#5C857C", bayDeep = "#436E6C", orange = "#BC6233", orangeDeep = "#9C4E27", ink = "#1C1B19";

  // single evenodd path; land = filled region in source
  const SHORE_PATH = "m1856.9-617l9.9 70.1 65 3.2 38.7 440.1 6.9 103.7 3 36.7-17.3-1.5-28 16.3 0.3 38 46.5 12.9 64.5 1.5 173.8-19.1 5.2 50.8-283.2 29.1c1.9 18.5 3.5 33.7 5.3 51.8l201.7-17.7 4.9 54.2-197.8 16.3q2.3 23 4.4 45.1l254.6-18.2 0.8 11.8-254.3 18.3q2.1 22.3 4 43.6l246.5-17.7 0.8 11.8-246.3 17.7q1.8 20.8 3.4 40.3l249.1-17.8 0.8 11.8-248.9 17.9q1.5 19.1 2.9 36.8l244.2-17.5 0.8 11.8-244.2 17.6q1.2 16.8 2.2 32l243.2-17.4 0.8 11.8-243.2 17.5q0.9 14.2 1.5 26.7l236.9-17 0.8 11.8-237.1 17.1c0.5 9.9 0.8 18.8 1.1 26.7l204.2-14.6 0.8 11.8-204.8 14.7c0.2 16.6-0.3 26.7-1.8 28.5-11.6 14.1-248.3 118-269.7 139-0.4 0.4-2.7 2.7-6.7 6.6l40.3 56.8c1.2-1 2.3-1.6 3.4-2.1 10.3-4.7 216.8-19.5 216.8-19.5l21.7 18.2 3.6 33.9 11.5 1.4 3.8 22.1 194.8-25.7 16.8 112.2-6.5 1.4 1.9 10.1-199.7 27.7 7.3 85.4c0 0 446.5-44 475.5-36.3 10.4 2.7 38.4 291.4 35.6 321.2-0.6 7.1-303.2-166.3-303.2-166.3l-188 10.2 2.9 80.8 26.1 97.3 35.9 66.2 91.4 163.7 223.2 304.5-2669.2 76.7 18-2631.6zm-811 2052.5c-2.1 6.4 4.7 61.8 7.4 65.9 5.8 9.1 93.1-97.4 215.8-212.1 9.4-8.7 11.9 15.7 21.6 6.9 76.7-70.1 169.1-171.2 236.2-238.7l-52.1-53.3c-185.9 184.7-425.6 421.1-428.9 431.3zm666-574.5l-30-46.7c-38.6 38.1-104.5 104.5-178.1 177.6l28.3 29.3 18.4 11.9c78.4-76.4 133.4-125.1 161.2-157 4.9-5.6 0.8-9.8 0.2-15.1z";

  // baked registration (page-local px) + layer toggles. rot pivots about (px,py)
  // in raw path units; the contours also expand from that pivot (the cove).
  const DEF = {
    tx: -332, ty: 85, s: 0.61, rot: 0, px: 1970, py: 1400, opacity: 0.62,
    water: true, bathy: "hatch", labels: true, splash: true,
    missionX: 351, missionY: 944, missionRot: -46, creekX: 526, creekY: 777, creekRot: -46,
    coveMarkX: 831, coveMarkY: 511, coveLabelX: 841, coveLabelY: 522
  };
  window.OracleShoreDefaults = DEF;

  // page-coords annotations (tuned to the baked registration; in the water zones)
  const LABELS = [
    { x: 1115, y: 665, t: "CHINA BASIN", rot: 0, anchor: "middle" }
  ];
  const COVE = { x: 830, y: 523 }; // McCovey Cove marker — off the right-field corner (page coords)

  function OracleShoreline(props) {
    const store = window.OracleShoreStore;
    const [ov, setOv] = React.useState(store ? store.overrides() : {});
    React.useEffect(function () { return store ? store.subscribe(setOv) : undefined; }, []);
    const cfg = Object.assign({}, DEF, ov, props || {});
    const on = function (k) { return cfg[k] !== false; };

    const T = "translate(" + cfg.tx + " " + cfg.ty + ") scale(" + cfg.s + ") rotate(" + cfg.rot + " " + cfg.px + " " + cfg.py + ")";
    const contourT = function (k) {
      return "translate(" + cfg.px + " " + cfg.py + ") scale(" + k + ") translate(" + (-cfg.px) + " " + (-cfg.py) + ")";
    };

    const labels = LABELS.concat([
      { x: cfg.coveLabelX, y: cfg.coveLabelY, lines: ["McCOVEY", "COVE"], rot: 0, anchor: "start", accent: true },
      { x: cfg.missionX, y: cfg.missionY, t: "MISSION", rot: cfg.missionRot, anchor: "middle" },
      { x: cfg.creekX, y: cfg.creekY, t: "CREEK", rot: cfg.creekRot, anchor: "middle" }
    ]);
    return e("svg", { className: "op-shoreline", viewBox: "0 0 1275 1088", preserveAspectRatio: "xMidYMid meet", "aria-hidden": "true" },
      e("defs", null,
        // mask: white page minus the land → reveals tone/texture only on water
        e("mask", { id: "opWaterMask", maskUnits: "userSpaceOnUse", x: 0, y: 0, width: 1275, height: 1088 },
          e("rect", { x: 0, y: 0, width: 1275, height: 1088, fill: "#fff" }),
          e("g", { transform: T }, e("path", { d: SHORE_PATH, fill: "#000", fillRule: "evenodd" }))),
        // engraved diagonal hatch
        e("pattern", { id: "opHatch", patternUnits: "userSpaceOnUse", width: 7, height: 7 },
          e("path", { d: "M0 7 L7 0", stroke: bayDeep, strokeWidth: 0.55, opacity: 0.7 })),
        // dotted stipple
        e("pattern", { id: "opStipple", patternUnits: "userSpaceOnUse", width: 8, height: 8 },
          e("circle", { cx: 2, cy: 2, r: 0.85, fill: bayDeep, opacity: 0.75 }))),

      // 1 — figure-ground water tone
      on("water") ? e("rect", { x: 0, y: 0, width: 1275, height: 1088, fill: bay, opacity: 0.12, mask: "url(#opWaterMask)" }) : null,

      // 2 — bathymetry: hatch / stipple fill the water region precisely
      cfg.bathy === "hatch" ? e("rect", { x: 0, y: 0, width: 1275, height: 1088, fill: "url(#opHatch)", mask: "url(#opWaterMask)", opacity: 0.3 }) : null,
      cfg.bathy === "stipple" ? e("rect", { x: 0, y: 0, width: 1275, height: 1088, fill: "url(#opStipple)", mask: "url(#opWaterMask)", opacity: 0.38 }) : null,

      e("g", { transform: T, opacity: cfg.opacity },
        // 2 — bathymetry: derived offset contour lines expanding from the cove
        cfg.bathy === "contours" ? e("path", { d: SHORE_PATH, transform: contourT(1.05), fill: "none", stroke: bay, strokeWidth: 1, vectorEffect: "non-scaling-stroke", strokeLinejoin: "round", opacity: 0.42 }) : null,
        cfg.bathy === "contours" ? e("path", { d: SHORE_PATH, transform: contourT(1.11), fill: "none", stroke: bay, strokeWidth: 0.8, vectorEffect: "non-scaling-stroke", strokeLinejoin: "round", opacity: 0.26 }) : null,
        // coastline (dialed-back hairline)
        e("path", { d: SHORE_PATH, fill: "none", stroke: bay, strokeWidth: 1, vectorEffect: "non-scaling-stroke", strokeLinejoin: "round", strokeLinecap: "round" })
      ),

      // 3 — place-name labels (page coords, in the water)
      on("labels") ? e("g", { className: "op-shore-labels" },
        labels.map(function (l, i) {
          var body = l.lines
            ? l.lines.map(function (ln, j) { return e("tspan", { key: j, x: l.x, dy: j === 0 ? "0" : "1.15em" }, ln); })
            : l.t;
          return e("text", {
            key: i, x: l.x, y: l.y, textAnchor: l.anchor || "middle",
            transform: l.rot ? "rotate(" + l.rot + " " + l.x + " " + l.y + ")" : null,
            style: {
              fontFamily: "'Space Mono', monospace", fontSize: "12px", letterSpacing: ".24em",
              fill: l.accent ? orangeDeep : bayDeep, opacity: l.accent ? 0.92 : 0.7
            }
          }, body);
        })) : null,

      // splash datum — one orange accent at McCovey Cove
      on("splash") ? e("g", null,
        e("circle", { cx: cfg.coveMarkX, cy: cfg.coveMarkY, r: 4.5, fill: "none", stroke: orange, strokeWidth: 1.6 }),
        e("circle", { cx: cfg.coveMarkX, cy: cfg.coveMarkY, r: 1.6, fill: orange })) : null
    );
  }

  window.OracleShoreline = OracleShoreline;
})();
