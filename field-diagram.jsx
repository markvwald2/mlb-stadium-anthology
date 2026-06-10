/* FieldDiagram — simple schematic ballpark plan from local data only:
   domed outfield + diamond infield, colored grass/clay.
   Rotated to match the real orientation (NE, 46 deg); distance labels
   stay upright on chips and a fixed compass shows true north. */
(function () {
  function FieldDiagram(props) {
    const lf = (props.lf || "").replace(" ft", "");
    const cf = (props.cf || "").replace(" ft", "");
    const rf = (props.rf || "").replace(" ft", "");
    const orientation = props.orientation || "NE";
    const deg = (props.degrees != null) ? props.degrees : 46;
    const royal = props.accent || "#134A8E";

    // ---- palette ----
    const grass = "#557F54";
    const grassHi = "#638F60";
    const clay = "#C2965E";
    const clayEdge = "#A87C45";
    const chalk = "#F4EEE0";
    const wallInk = "#33523B";

    const VB = 320, C = [160, 160], R = 86;

    // ---- field geometry (local frame: home at bottom, opens "north"/up) ----
    // everything sits on a circle of radius R about C, so rotation stays inscribed.
    const home = [160, 246];
    const lfPole = [74, 160];
    const rfPole = [246, 160];
    const cfPt = [160, 74];                     // deepest point of the dome (CF)

    // grass = home -> LF pole -> domed wall (semicircle) -> RF pole -> home
    const grassPath = "M 160 246 L 74 160 A 86 86 0 0 1 246 160 Z";

    // infield diamond
    const dia = "M 160 246 L 200 206 L 160 166 L 120 206 Z";
    const bases = [[200, 206], [160, 166], [120, 206]];   // 1B, 2B, 3B
    const mound = [160, 213];

    // ---- rotation helpers (positive deg = clockwise on screen) ----
    const t = deg * Math.PI / 180;
    const cos = Math.cos(t), sin = Math.sin(t);
    function rot(p) {
      const dx = p[0] - C[0], dy = p[1] - C[1];
      return [C[0] + dx * cos - dy * sin, C[1] + dx * sin + dy * cos];
    }
    function out(p, o) {
      const dx = p[0] - C[0], dy = p[1] - C[1];
      const len = Math.hypot(dx, dy) || 1;
      return [p[0] + dx / len * o, p[1] + dy / len * o];
    }

    const labels = [
      { p: out(rot(lfPole), 18), txt: lf },
      { p: out(rot(cfPt), 18), txt: cf },
      { p: out(rot(rfPole), 18), txt: rf }
    ];

    // ---- bearing annotation: true-north reference + the field's center axis ----
    const rHome = rot(home);                   // rotated home plate
    const rCF = rot(cfPt);                      // rotated center-field point (deepest)
    const Ntip = [C[0], C[1] - 70];            // true-north reference (straight up from pivot)
    const arcR = 38;                            // swept angle arc radius
    const aN = [C[0], C[1] - arcR];             // arc start (north)
    const aAx = [C[0] + arcR * Math.sin(t), C[1] - arcR * Math.cos(t)]; // arc end (field axis)
    const arcPath = "M " + aN[0] + " " + aN[1] + " A " + arcR + " " + arcR + " 0 0 1 " + aAx[0].toFixed(1) + " " + aAx[1].toFixed(1);
    const half = t / 2, labR = 57;              // degree label on the bisector
    const degPos = [C[0] + labR * Math.sin(half), C[1] - labR * Math.cos(half)];
    const degTxt = deg + "\u00b0";

    return (
      React.createElement("div", { className: "fd-wrap" },
        React.createElement("svg", { viewBox: "0 0 " + VB + " " + VB, className: "fd-svg", role: "img", "aria-label": "Field dimensions plan, oriented " + orientation },
          React.createElement("defs", null,
            React.createElement("linearGradient", { id: "fdGrass", x1: "0", y1: "0", x2: "0", y2: "1" },
              React.createElement("stop", { offset: "0", stopColor: grassHi }),
              React.createElement("stop", { offset: "1", stopColor: grass })
            )
          ),

          /* ===== FIELD GROUP — rotated to match true orientation ===== */
          React.createElement("g", { transform: "rotate(" + deg + " " + C[0] + " " + C[1] + ")" },
            // outfield grass + outline (the domed wall + foul lines)
            React.createElement("path", { d: grassPath, fill: "url(#fdGrass)", stroke: wallInk, strokeWidth: 1.6, strokeLinejoin: "round" }),
            // foul lines (chalk over the boundary)
            React.createElement("line", { x1: home[0], y1: home[1], x2: lfPole[0], y2: lfPole[1], stroke: chalk, strokeWidth: 1.6, opacity: 0.9 }),
            React.createElement("line", { x1: home[0], y1: home[1], x2: rfPole[0], y2: rfPole[1], stroke: chalk, strokeWidth: 1.6, opacity: 0.9 }),
            // infield diamond
            React.createElement("path", { d: dia, fill: clay, stroke: chalk, strokeWidth: 1.8, strokeLinejoin: "round" }),
            React.createElement("path", { d: dia, fill: "none", stroke: clayEdge, strokeWidth: 1, opacity: 0.5 }),
            // pitcher's mound
            React.createElement("circle", { cx: mound[0], cy: mound[1], r: 5, fill: clay, stroke: chalk, strokeWidth: 1 }),
            // bases + home plate
            bases.map((b, i) => React.createElement("rect", { key: "b" + i, x: b[0] - 3, y: b[1] - 3, width: 6, height: 6, fill: chalk, transform: "rotate(45 " + b[0] + " " + b[1] + ")" })),
            React.createElement("rect", { x: home[0] - 3.4, y: home[1] - 3.4, width: 6.8, height: 6.8, fill: chalk, transform: "rotate(45 " + home[0] + " " + home[1] + ")" })
          ),

          /* ===== DISTANCE LABELS — upright, on cream chips ===== */
          labels.map((l, i) => {
            const w = l.txt.length * 10 + 14;
            return React.createElement("g", { key: "l" + i },
              React.createElement("rect", { x: l.p[0] - w / 2, y: l.p[1] - 11, width: w, height: 22, rx: 2.5, fill: "#F6F1E4", stroke: "#C9BD9D", strokeWidth: 1 }),
              React.createElement("text", { x: l.p[0], y: l.p[1] + 5, textAnchor: "middle", style: { fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: "15px", fill: royal, letterSpacing: ".02em" } }, l.txt)
            );
          }),

          /* ===== BEARING ANNOTATION — north reference + field center axis ===== */
          // field center axis (home -> center field), cased so it reads over grass
          React.createElement("line", { x1: rHome[0], y1: rHome[1], x2: rCF[0], y2: rCF[1], stroke: "#F4EEE0", strokeWidth: 3.6, strokeLinecap: "round", opacity: 0.6 }),
          React.createElement("line", { x1: rHome[0], y1: rHome[1], x2: rCF[0], y2: rCF[1], stroke: royal, strokeWidth: 1.6, strokeDasharray: "5 4" }),
          React.createElement("circle", { cx: rCF[0], cy: rCF[1], r: 2.6, fill: royal }),
          // true-north reference line
          React.createElement("line", { x1: C[0], y1: C[1], x2: Ntip[0], y2: Ntip[1], stroke: "#F4EEE0", strokeWidth: 3, strokeLinecap: "round", opacity: 0.55 }),
          React.createElement("line", { x1: C[0], y1: C[1], x2: Ntip[0], y2: Ntip[1], stroke: "#48586A", strokeWidth: 1.3, strokeDasharray: "3 3" }),
          // pivot + swept angle arc
          React.createElement("circle", { cx: C[0], cy: C[1], r: 2.6, fill: royal }),
          React.createElement("path", { d: arcPath, fill: "none", stroke: "#F4EEE0", strokeWidth: 3, opacity: 0.55 }),
          React.createElement("path", { d: arcPath, fill: "none", stroke: royal, strokeWidth: 1.6 }),
          // N label (cream-haloed so it reads anywhere)
          React.createElement("text", { x: Ntip[0], y: Ntip[1] - 5, textAnchor: "middle", style: { fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "13px", fill: "#3A4654", letterSpacing: ".06em", paintOrder: "stroke", stroke: "#F6F1E4", strokeWidth: "3px", strokeLinejoin: "round" } }, "N"),
          // angle value chip
          React.createElement("rect", { x: degPos[0] - (degTxt.length * 9 + 12) / 2, y: degPos[1] - 11, width: degTxt.length * 9 + 12, height: 22, rx: 2.5, fill: "#F6F1E4", stroke: "#C9BD9D", strokeWidth: 1 }),
          React.createElement("text", { x: degPos[0], y: degPos[1] + 5, textAnchor: "middle", style: { fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "14px", fill: royal } }, degTxt)
        )
      )
    );
  }

  window.FieldDiagram = FieldDiagram;
})();
