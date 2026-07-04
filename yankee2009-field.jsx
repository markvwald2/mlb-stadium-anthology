/* yankee2009-field.jsx — field instruments for the Yankee Stadium (2009) spread.
     window.YK2009FieldPlan  — faint field-geometry plan used as a quiet drafting
                               watermark behind the Stadium Context column.
     window.YK2009Protractor — compact protractor orientation symbol (~1 in), the
                               bearing read off true north; oriented ENE / 75 deg.
   Drawn only from window.YK2009 geometry (LF 318 / CF 408 / RF 314, ENE, 75).
   No invented values. */
(function () {
  const e = React.createElement;

  const ink = "#1E2229", line = "#6E747C", lineSoft = "#9AA0A6",
        navy = "#0C2340", steel = "#5E6976", brass = "#9C7A3C",
        paper = "#EAE5D7", ink3 = "#8A857B";

  function strip(v) { return (v || "").toString().replace(" ft", ""); }
  function polar(C, r, a) { const t = a * Math.PI / 180; return [C[0] + r * Math.sin(t), C[1] - r * Math.cos(t)]; }

  /* ---------- Large field plan (faint watermark) ----------
     Home plate bottom-center; CF deep at top. LF 318 / RF 314 near-even short
     corners, CF 408 reaches deep — drawn straight from the data. */
  function YK2009FieldPlan(props) {
    const stroke = props.stroke || line;
    const op = props.opacity != null ? props.opacity : 1;
    const home = [300, 470];
    const lfPole = [150, 320];
    const lfAlley = [206, 214];
    const cf = [300, 150];
    const rfAlley = [398, 218];
    const rfPole = [452, 326];
    const wall =
      "M " + lfPole[0] + " " + lfPole[1] +
      " L " + lfAlley[0] + " " + lfAlley[1] +
      " Q 250 162 " + cf[0] + " " + cf[1] +
      " Q 352 164 " + rfAlley[0] + " " + rfAlley[1] +
      " L " + rfPole[0] + " " + rfPole[1];
    const fair =
      "M " + home[0] + " " + home[1] +
      " L " + lfPole[0] + " " + lfPole[1] +
      " L " + lfAlley[0] + " " + lfAlley[1] +
      " Q 250 162 " + cf[0] + " " + cf[1] +
      " Q 352 164 " + rfAlley[0] + " " + rfAlley[1] +
      " L " + rfPole[0] + " " + rfPole[1] + " Z";
    const d = 52;
    const first = [home[0] + d, home[1] - d], second = [home[0], home[1] - 2 * d], third = [home[0] - d, home[1] - d];
    const dia = "M " + home[0] + " " + home[1] + " L " + first[0] + " " + first[1] +
                " L " + second[0] + " " + second[1] + " L " + third[0] + " " + third[1] + " Z";

    return e("svg", { viewBox: "110 110 380 400", className: props.className, "aria-hidden": "true",
      style: { opacity: op, overflow: "visible" } },
      e("path", { d: fair, fill: stroke, fillOpacity: 0.06, stroke: "none" }),
      e("line", { x1: home[0], y1: home[1], x2: lfPole[0], y2: lfPole[1], stroke: stroke, strokeWidth: 1.4 }),
      e("line", { x1: home[0], y1: home[1], x2: rfPole[0], y2: rfPole[1], stroke: stroke, strokeWidth: 1.4 }),
      e("path", { d: wall, fill: "none", stroke: stroke, strokeWidth: 2, strokeLinejoin: "round", strokeLinecap: "round" }),
      e("path", { d: dia, fill: "none", stroke: stroke, strokeWidth: 1.3 }),
      e("circle", { cx: home[0], cy: home[1] - d, r: 13, fill: "none", stroke: stroke, strokeWidth: 1 })
    );
  }

  /* ---------- Compact protractor orientation symbol (~1 in) ----------
     Subordinate field cue: arc, tick marks, LF/CF/RF chips, the ENE / 75 deg datum. */
  function YK2009Protractor(props) {
    const deg = props.degrees != null ? props.degrees : 75;
    const orientation = props.orientation || "ENE";
    const lf = strip(props.lf), cf = strip(props.cf), rf = strip(props.rf);
    const C = [96, 100], R = 50, PR = 70;
    const home = [C[0], C[1] + R * 0.6], cfp = [C[0], C[1] - R * 0.6],
          lfp = [C[0] - R * 0.62, C[1] + R * 0.02], rfp = [C[0] + R * 0.62, C[1] + R * 0.02];
    const grass = "M " + home[0] + " " + home[1] + " L " + lfp[0] + " " + lfp[1] +
                  " A " + (R * 0.62) + " " + (R * 0.62) + " 0 0 1 " + rfp[0] + " " + rfp[1] + " Z";
    const ticks = [];
    for (let a = 0; a <= 90; a += 15) {
      const big = a % 45 === 0;
      const p1 = polar(C, PR, a), p2 = polar(C, PR - (big ? 9 : 5), a);
      ticks.push(e("line", { key: "t" + a, x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1],
        stroke: big ? ink : lineSoft, strokeWidth: big ? 1.2 : 0.8 }));
    }
    const arcA = polar(C, PR, 0), arcB = polar(C, PR, 90);
    const arc = "M " + arcA[0] + " " + arcA[1] + " A " + PR + " " + PR + " 0 0 1 " + arcB[0].toFixed(1) + " " + arcB[1].toFixed(1);
    const ntip = polar(C, PR + 4, deg);
    const nlab = polar(C, PR + 13, 0);
    const dlab = [C[0], 142];
    // arrowhead at the needle tip, pointing along the bearing
    const _r = deg * Math.PI / 180;
    const _dx = Math.sin(_r), _dy = -Math.cos(_r);
    const _px = Math.cos(_r), _py = Math.sin(_r);
    const ahL = 11, ahW = 4.6;
    const _bx = ntip[0] - _dx * ahL, _by = ntip[1] - _dy * ahL;
    const arrowPts = ntip[0] + "," + ntip[1] + " " + (_bx + _px * ahW) + "," + (_by + _py * ahW) + " " + (_bx - _px * ahW) + "," + (_by - _py * ahW);

    return e("svg", { viewBox: "6 0 182 150", className: props.className, role: "img",
      "aria-label": "Field orientation " + orientation + " " + deg + " degrees", style: { overflow: "visible" } },
      e("g", { transform: "rotate(" + deg + " " + C[0] + " " + C[1] + ")" },
        e("path", { d: grass, fill: navy, fillOpacity: 0.12, stroke: navy, strokeWidth: 1.3, strokeLinejoin: "round" }),
        e("line", { x1: home[0], y1: home[1], x2: lfp[0], y2: lfp[1], stroke: navy, strokeWidth: 0.9 }),
        e("line", { x1: home[0], y1: home[1], x2: rfp[0], y2: rfp[1], stroke: navy, strokeWidth: 0.9 }),
        e("line", { x1: home[0], y1: home[1], x2: cfp[0], y2: cfp[1], stroke: navy, strokeWidth: 0.7, strokeDasharray: "2 2" })
      ),
      e("path", { d: arc, fill: "none", stroke: ink3, strokeWidth: 1 }),
      ticks,
      e("text", { x: nlab[0], y: nlab[1] - 4, textAnchor: "middle",
        style: { fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "13px", fill: ink } }, "N"),
      // bearing needle to ENE (75 deg from north)
      e("line", { x1: C[0], y1: C[1], x2: ntip[0], y2: ntip[1], stroke: brass, strokeWidth: 2, strokeLinecap: "round" }),
      e("polygon", { points: arrowPts, fill: brass }),
      e("circle", { cx: C[0], cy: C[1], r: 2.4, fill: ink }),
      e("text", { x: dlab[0], y: dlab[1] + 4, textAnchor: "middle",
        style: { fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "16px", fill: brass } }, orientation + " \u00b7 " + deg + "\u00b0")
    );
  }

  window.YK2009FieldPlan = YK2009FieldPlan;
  window.YK2009Protractor = YK2009Protractor;
})();
