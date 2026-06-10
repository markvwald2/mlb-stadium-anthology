/* chase-field.jsx — Chase Field "orientation device": a clean, upright
   top-down field plan (LF / CF / RF distances + true-north tick). Treated as
   a precision instrument, not an infographic. Local data only.
   Props: lf, cf, rf, orientation, accent. */
(function () {
  const e = React.createElement;

  function ChaseField(props) {
    const sedona = props.accent || "#A3392B";
    const grass = "#5F7E54", grassHi = "#6E8B5E", clay = "#C29760", clayEdge = "#A87C45";
    const chalk = "#EFE7D2", wallInk = "#3B4A36", ink = "#2A2620", ink3 = "#8B8273";

    const lf = (props.lf || "").replace(/\s*FT$/i, "");
    const cf = (props.cf || "");
    const rf = (props.rf || "").replace(/\s*FT$/i, "");

    // geometry (upright; home plate at bottom, outfield opens up)
    const home = [120, 188];
    const lfPole = [48, 116];
    const rfPole = [192, 116];
    const apex = [120, 44];                 // deepest center-field point
    const grassPath = "M 120 188 L 48 116 A 72 72 0 0 1 192 116 Z";

    // infield diamond
    const d = 21;
    const b1 = [home[0] + d, home[1] - d];   // 1B
    const b2 = [home[0], home[1] - 2 * d];   // 2B
    const b3 = [home[0] - d, home[1] - d];   // 3B
    const dia = "M " + home[0] + " " + home[1] + " L " + b1[0] + " " + b1[1] +
                " L " + b2[0] + " " + b2[1] + " L " + b3[0] + " " + b3[1] + " Z";
    const mound = [home[0], home[1] - d];

    function base(p, k, s) {
      s = s || 5;
      return e("rect", { key: k, x: p[0] - s / 2, y: p[1] - s / 2, width: s, height: s,
        fill: chalk, transform: "rotate(45 " + p[0] + " " + p[1] + ")" });
    }
    function dist(x, y, txt, anchor) {
      return e("text", { x: x, y: y, textAnchor: anchor || "middle",
        style: { fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: "15px",
          letterSpacing: ".02em", fill: ink } }, txt);
    }

    return e("div", { className: "chf-fd-wrap" },
      e("svg", { viewBox: "-32 0 312 238", className: "chf-fd-svg", role: "img",
        "aria-label": "Field dimensions plan \u2014 left field " + lf + ", center " + cf + ", right field " + rf },
        e("defs", null,
          e("linearGradient", { id: "chfGrass", x1: "0", y1: "0", x2: "0", y2: "1" },
            e("stop", { offset: "0", stopColor: grassHi }),
            e("stop", { offset: "1", stopColor: grass }))
        ),

        // outfield grass + domed wall
        e("path", { d: grassPath, fill: "url(#chfGrass)", stroke: wallInk, strokeWidth: 1.6, strokeLinejoin: "round" }),
        // foul lines
        e("line", { x1: home[0], y1: home[1], x2: lfPole[0], y2: lfPole[1], stroke: chalk, strokeWidth: 1.5, opacity: .85 }),
        e("line", { x1: home[0], y1: home[1], x2: rfPole[0], y2: rfPole[1], stroke: chalk, strokeWidth: 1.5, opacity: .85 }),
        // infield
        e("path", { d: dia, fill: clay, stroke: chalk, strokeWidth: 1.7, strokeLinejoin: "round" }),
        e("path", { d: dia, fill: "none", stroke: clayEdge, strokeWidth: 1, opacity: .5 }),
        e("circle", { cx: mound[0], cy: mound[1], r: 4, fill: clay, stroke: chalk, strokeWidth: 1 }),
        base(b1, "b1"), base(b2, "b2"), base(b3, "b3"), base(home, "hp", 6),

        // distance pins + labels
        e("circle", { cx: apex[0], cy: apex[1], r: 2.6, fill: sedona }),
        dist(apex[0], apex[1] - 12, cf, "middle"),
        e("circle", { cx: lfPole[0], cy: lfPole[1], r: 2.6, fill: sedona }),
        dist(lfPole[0] - 9, lfPole[1] + 5, lf + " FT", "end"),
        e("circle", { cx: rfPole[0], cy: rfPole[1], r: 2.6, fill: sedona }),
        dist(rfPole[0] + 9, rfPole[1] + 5, rf + " FT", "start"),

        // true-north tick below home plate
        e("line", { x1: home[0], y1: home[1] + 12, x2: home[0], y2: home[1] + 26, stroke: ink3, strokeWidth: 1.2 }),
        e("text", { x: home[0], y: home[1] + 40, textAnchor: "middle",
          style: { fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "13px",
            letterSpacing: ".08em", fill: ink } }, props.orientation || "N")
      )
    );
  }

  window.ChaseField = ChaseField;
})();
