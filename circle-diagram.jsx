/* CircleDiagram — the "concrete doughnut" plan, drawn from local data only:
   symmetrical field (LF/RF 330, CF 404), orientation E (90 deg).
   Concentric rings = the circular concrete bowl; austere blueprint linework. */
(function () {
  function CircleDiagram(props) {
    const lf = (props.lf || "").replace(" ft", "");
    const cf = (props.cf || "").replace(" ft", "");
    const rf = (props.rf || "").replace(" ft", "");
    const orientation = props.orientation || "E";
    const deg = props.degrees;
    const red = props.accent || "#C6011F";
    const slate = "#46586B";

    const cx = 182, cy = 182;
    // concrete bowl rings (outer -> inner decks)
    const rings = [170, 156, 143, 131];

    // field: home plate left of center, field opens EAST (to the right)
    const home = [104, 182];
    // foul lines at +/-45deg from the east axis
    const Lf = 150;                          // foul-pole length (px) for 330 ft
    const k = Math.SQRT1_2;                  // cos/sin 45
    const rfPole = [home[0] + Lf * k, home[1] - Lf * k]; // upper-right
    const lfPole = [home[0] + Lf * k, home[1] + Lf * k]; // lower-right
    const Lcf = 196;                         // longer (404 ft) straight east
    const cfPt = [home[0] + Lcf, home[1]];

    // outfield wall: arc LF -> CF -> RF (two quadratics bulging east)
    const wall =
      `M ${lfPole[0]} ${lfPole[1]} Q ${cfPt[0]+8} ${cfPt[1]+58} ${cfPt[0]} ${cfPt[1]} ` +
      `Q ${cfPt[0]+8} ${cfPt[1]-58} ${rfPole[0]} ${rfPole[1]}`;
    const fan =
      `M ${home[0]} ${home[1]} L ${lfPole[0]} ${lfPole[1]} ` +
      `Q ${cfPt[0]+8} ${cfPt[1]+58} ${cfPt[0]} ${cfPt[1]} ` +
      `Q ${cfPt[0]+8} ${cfPt[1]-58} ${rfPole[0]} ${rfPole[1]} Z`;

    // infield diamond (rotated, opens east)
    const mound = [home[0] + 42, home[1]];
    const b1 = [home[0] + 30, home[1] - 30]; // 1B (upper)
    const b2 = [home[0] + 60, home[1]];      // 2B (east)
    const b3 = [home[0] + 30, home[1] + 30]; // 3B (lower)
    const diamond = `M ${home[0]} ${home[1]} L ${b1[0]} ${b1[1]} L ${b2[0]} ${b2[1]} L ${b3[0]} ${b3[1]} Z`;

    // compass — N up
    const compX = 326, compY = 60, cr = 17;

    return (
      React.createElement("div", { className: "rf-fd-wrap" },
        React.createElement("svg", { viewBox: "0 0 364 364", className: "rf-fd-svg", role: "img", "aria-label": "Riverfront Stadium field plan" },
          // concrete bowl rings
          rings.map((r, i) => React.createElement("circle", {
            key: "r" + i, cx: cx, cy: cy, r: r, fill: "none",
            stroke: slate, strokeWidth: i === 0 ? 1.4 : 0.8, opacity: i === 0 ? 0.85 : 0.4
          })),
          // bowl hatch ticks (radial seat lines) between two outer rings
          Array.from({ length: 48 }).map((_, i) => {
            const a = (i / 48) * Math.PI * 2;
            const r0 = rings[0], r1 = rings[1];
            return React.createElement("line", {
              key: "t" + i,
              x1: cx + r0 * Math.cos(a), y1: cy + r0 * Math.sin(a),
              x2: cx + r1 * Math.cos(a), y2: cy + r1 * Math.sin(a),
              stroke: slate, strokeWidth: 0.5, opacity: 0.28
            });
          }),
          // playing field
          React.createElement("path", { d: fan, fill: slate, fillOpacity: 0.07, stroke: slate, strokeWidth: 1 }),
          React.createElement("path", { d: wall, fill: "none", stroke: slate, strokeWidth: 1.6 }),
          // foul lines
          React.createElement("line", { x1: home[0], y1: home[1], x2: rfPole[0], y2: rfPole[1], stroke: slate, strokeWidth: 1 }),
          React.createElement("line", { x1: home[0], y1: home[1], x2: lfPole[0], y2: lfPole[1], stroke: slate, strokeWidth: 1 }),
          // center axis (home -> CF), dashed
          React.createElement("line", { x1: home[0], y1: home[1], x2: cfPt[0], y2: cfPt[1], stroke: red, strokeWidth: 0.9, strokeDasharray: "3 3", opacity: 0.8 }),
          // infield
          React.createElement("path", { d: diamond, fill: "none", stroke: slate, strokeWidth: 1 }),
          React.createElement("circle", { cx: mound[0], cy: mound[1], r: 2.4, fill: slate }),
          React.createElement("rect", { x: home[0] - 2.4, y: home[1] - 2.4, width: 4.8, height: 4.8, fill: red }),
          // distance labels
          React.createElement("text", { x: rfPole[0] + 6, y: rfPole[1] - 4, className: "rf-fd-dist" }, rf),
          React.createElement("text", { x: lfPole[0] + 6, y: lfPole[1] + 14, className: "rf-fd-dist" }, lf),
          React.createElement("text", { x: cfPt[0] + 7, y: cfPt[1] + 9, className: "rf-fd-dist", textAnchor: "start" }, cf),
          // pole ticks
          [rfPole, lfPole, cfPt].map((p, i) => React.createElement("circle", { key: "p" + i, cx: p[0], cy: p[1], r: 2, fill: slate })),
          // E label at axis end
          React.createElement("text", { x: cfPt[0] + 7, y: cfPt[1] - 12, className: "rf-fd-axis", textAnchor: "start" }, orientation)
        ),
        React.createElement("div", { className: "rf-fd-cap" },
          React.createElement("span", null, "FIELD AXIS \u00b7 " + orientation + " (" + deg + "\u00b0)"),
          React.createElement("span", null, "SYMMETRICAL \u00b7 DISTANCES IN FEET")
        )
      )
    );
  }
  window.CircleDiagram = CircleDiagram;
})();
