/* three-rivers-diagrams.jsx — engineering-drawing furniture for the spread.
   All linework is generated from local data (field distances, orientation).
   Exports: window.TRSField, window.TRSBowl, window.TRSSurvey, window.TRSIcon. */
(function () {
  const e = React.createElement;
  const SLATE = "#4B4A44";   // weathered-concrete linework
  const INK = "#23211C";
  const GOLD = "#9C7B22";

  /* ---- Field-dimensions plate: upright plan, home plate low, OF opens up ---- */
  function TRSField(props) {
    const lf = (props.lf || "").replace(/\s*ft$/i, "");
    const cf = (props.cf || "").replace(/\s*ft$/i, "");
    const rf = (props.rf || "").replace(/\s*ft$/i, "");
    const grass = "#7C8560", grassHi = "#8C9670", chalk = "#EFEADb", clay = "#B89B6A";

    const home = [120, 176];
    const lfPole = [50, 104];
    const rfPole = [190, 104];
    const apex = [120, 40];
    const grassPath = "M 120 176 L 50 104 A 74 74 0 0 1 190 104 Z";

    const d = 20;
    const b1 = [home[0] + d, home[1] - d];
    const b2 = [home[0], home[1] - 2 * d];
    const b3 = [home[0] - d, home[1] - d];
    const dia = "M " + home[0] + " " + home[1] + " L " + b1[0] + " " + b1[1] +
                " L " + b2[0] + " " + b2[1] + " L " + b3[0] + " " + b3[1] + " Z";
    const mound = [home[0], home[1] - d];

    function base(p, k, s) { s = s || 4.4;
      return e("rect", { key: k, x: p[0] - s / 2, y: p[1] - s / 2, width: s, height: s,
        fill: chalk, transform: "rotate(45 " + p[0] + " " + p[1] + ")" }); }
    function dist(x, y, txt, anchor) {
      return e("text", { x: x, y: y, textAnchor: anchor || "middle", className: "trs-fd-dist" }, txt); }

    return e("div", { className: "trs-fd-wrap" },
      e("svg", { viewBox: "-30 24 300 188", className: "trs-fd-svg", role: "img",
        "aria-label": "Field dimensions \u2014 LF " + lf + ", CF " + cf + ", RF " + rf },
        e("defs", null,
          e("linearGradient", { id: "trsGrass", x1: "0", y1: "0", x2: "0", y2: "1" },
            e("stop", { offset: "0", stopColor: grassHi }),
            e("stop", { offset: "1", stopColor: grass }))),
        e("path", { d: grassPath, fill: "url(#trsGrass)", stroke: INK, strokeWidth: 1.4, strokeLinejoin: "round" }),
        e("line", { x1: home[0], y1: home[1], x2: lfPole[0], y2: lfPole[1], stroke: chalk, strokeWidth: 1.3, opacity: .85 }),
        e("line", { x1: home[0], y1: home[1], x2: rfPole[0], y2: rfPole[1], stroke: chalk, strokeWidth: 1.3, opacity: .85 }),
        e("path", { d: dia, fill: clay, stroke: chalk, strokeWidth: 1.4, strokeLinejoin: "round" }),
        base(b1, "b1"), base(b2, "b2"), base(b3, "b3"), base(home, "hp", 5.2),
        e("circle", { cx: apex[0], cy: apex[1], r: 2.4, fill: GOLD }),
        dist(apex[0], apex[1] - 9, cf + " FT", "middle"),
        e("circle", { cx: lfPole[0], cy: lfPole[1], r: 2.4, fill: GOLD }),
        dist(lfPole[0] - 8, lfPole[1] + 4, lf + " FT", "end"),
        e("circle", { cx: rfPole[0], cy: rfPole[1], r: 2.4, fill: GOLD }),
        dist(rfPole[0] + 8, rfPole[1] + 4, rf + " FT", "start"))
    );
  }

  /* ---- Circular-bowl plate: concentric concrete rings + radial ticks + diamond ---- */
  function TRSBowl(props) {
    const cx = 130, cy = 130;
    const rings = [120, 108, 96, 84];
    const deg = (props.degrees || 135);
    // home-plate diamond rotated so the field opens toward the SE bearing
    const a = (deg - 90) * Math.PI / 180; // bearing 135 -> opens lower-right
    const reach = 38, half = 26;
    const dirx = Math.cos(a), diry = Math.sin(a);
    const px = -diry, py = dirx; // perpendicular
    const home = [cx - dirx * reach * 0.5, cy - diry * reach * 0.5];
    const cf = [home[0] + dirx * reach, home[1] + diry * reach];
    const l = [home[0] + dirx * half + px * half, home[1] + diry * half + py * half];
    const r = [home[0] + dirx * half - px * half, home[1] + diry * half - py * half];
    const diamond = "M " + home[0] + " " + home[1] + " L " + l[0] + " " + l[1] +
                    " L " + cf[0] + " " + cf[1] + " L " + r[0] + " " + r[1] + " Z";

    return e("div", { className: "trs-fd-wrap" },
      e("svg", { viewBox: "0 0 260 260", className: "trs-bowl-svg", role: "img", "aria-label": "Circular bowl plan" },
        rings.map((rr, i) => e("circle", { key: "r" + i, cx: cx, cy: cy, r: rr, fill: "none",
          stroke: SLATE, strokeWidth: i === 0 ? 1.3 : 0.7, opacity: i === 0 ? 0.9 : 0.42 })),
        Array.from({ length: 60 }).map((_, i) => {
          const ang = (i / 60) * Math.PI * 2;
          return e("line", { key: "t" + i,
            x1: cx + rings[0] * Math.cos(ang), y1: cy + rings[0] * Math.sin(ang),
            x2: cx + rings[1] * Math.cos(ang), y2: cy + rings[1] * Math.sin(ang),
            stroke: SLATE, strokeWidth: 0.5, opacity: 0.3 });
        }),
        e("circle", { cx: cx, cy: cy, r: rings[3] - 4, fill: SLATE, fillOpacity: 0.05 }),
        e("path", { d: diamond, fill: "none", stroke: INK, strokeWidth: 1.1 }),
        e("line", { x1: home[0], y1: home[1], x2: cf[0], y2: cf[1], stroke: GOLD, strokeWidth: 0.9, strokeDasharray: "3 3" }),
        e("rect", { x: home[0] - 2.2, y: home[1] - 2.2, width: 4.4, height: 4.4, fill: GOLD,
          transform: "rotate(45 " + home[0] + " " + home[1] + ")" })
      )
    );
  }

  /* ---- Radial survey motif: concentric arcs + degree ticks + crosshair ----
     Decorative drafting geometry for the hero corner. Pure quiet linework. */
  function TRSSurvey(props) {
    const stroke = props.stroke || "#E0C778";
    const op = props.op == null ? 0.5 : props.op;
    const cx = 300, cy = 300;
    const rings = props.rings || [300, 250, 200, 150, 96];
    const ticks = [];
    for (let i = 0; i < 72; i++) {
      const ang = (i / 72) * Math.PI * 2;
      const long = i % 6 === 0;
      const r0 = rings[0];
      const r1 = r0 - (long ? 30 : 15);
      ticks.push(e("line", { key: "k" + i,
        x1: cx + r0 * Math.cos(ang), y1: cy + r0 * Math.sin(ang),
        x2: cx + r1 * Math.cos(ang), y2: cy + r1 * Math.sin(ang),
        stroke: stroke, strokeWidth: long ? 1 : 0.5, opacity: op * (long ? 1 : 0.7) }));
    }
    return e("svg", { viewBox: "0 0 600 600", className: props.className, "aria-hidden": "true" },
      rings.map((r, i) => e("circle", { key: "c" + i, cx: cx, cy: cy, r: r, fill: "none",
        stroke: stroke, strokeWidth: i === 0 ? 1.2 : 0.7, opacity: op * (i === 0 ? 1 : 0.55) })),
      ticks,
      // crosshair
      e("line", { x1: cx - rings[0], y1: cy, x2: cx + rings[0], y2: cy, stroke: stroke, strokeWidth: 0.6, opacity: op * 0.5 }),
      e("line", { x1: cx, y1: cy - rings[0], x2: cx, y2: cy + rings[0], stroke: stroke, strokeWidth: 0.6, opacity: op * 0.5 }),
      // radial spokes every 30deg
      Array.from({ length: 12 }).map((_, i) => {
        const ang = (i / 12) * Math.PI * 2;
        return e("line", { key: "s" + i, x1: cx, y1: cy,
          x2: cx + rings[1] * Math.cos(ang), y2: cy + rings[1] * Math.sin(ang),
          stroke: stroke, strokeWidth: 0.4, opacity: op * 0.4 });
      }),
      e("circle", { cx: cx, cy: cy, r: 3, fill: stroke, opacity: op })
    );
  }

  /* ---- Icon set (line icons; section + featured + weather) ---- */
  function TRSIcon(kind, opts) {
    opts = opts || {};
    const c = { width: opts.size || 22, height: opts.size || 22, viewBox: "0 0 24 24", fill: "none",
      stroke: opts.stroke || "#23211C", strokeWidth: opts.sw || 1.5, strokeLinecap: "round",
      strokeLinejoin: "round", className: opts.className };
    /* unified weather icon set — same box, same stroke, shared geometry */
    if (window.WxIcons && window.WxIcons.parts(kind)) return window.WxIcons.react(kind, c);
    switch (kind) {
      case "crosshair": return e("svg", c, e("circle", { cx: 12, cy: 12, r: 8 }),
        e("line", { x1: 12, y1: 1, x2: 12, y2: 5 }), e("line", { x1: 12, y1: 19, x2: 12, y2: 23 }),
        e("line", { x1: 1, y1: 12, x2: 5, y2: 12 }), e("line", { x1: 19, y1: 12, x2: 23, y2: 12 }),
        e("circle", { cx: 12, cy: 12, r: 1.6, fill: opts.stroke || "#23211C", stroke: "none" }));
      case "group": return e("svg", c, e("circle", { cx: 9, cy: 8, r: 3 }),
        e("path", { d: "M3.5 19a5.5 5.5 0 0 1 11 0" }),
        e("path", { d: "M16 6.2a3 3 0 0 1 0 5.6" }), e("path", { d: "M16.5 13.6A5.5 5.5 0 0 1 20.5 19" }));
      case "moon": return e("svg", c, e("path", { d: "M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" }));
      case "sun": return e("svg", c, e("circle", { cx: 12, cy: 12, r: 4 }),
        e("path", { d: "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" }));
      case "clock": return e("svg", c, e("circle", { cx: 12, cy: 12, r: 8.5 }),
        e("path", { d: "M12 7.5V12l3 2" }));
      case "ticket": return e("svg", c, e("path", { d: "M3 8.5A1.5 1.5 0 0 1 4.5 7h15A1.5 1.5 0 0 1 21 8.5v1a2 2 0 0 0 0 5v1A1.5 1.5 0 0 1 19.5 17h-15A1.5 1.5 0 0 1 3 15.5v-1a2 2 0 0 0 0-5z" }),
        e("path", { d: "M14 7v10", strokeDasharray: "2 2" }));
      case "wind": return e("svg", c, e("path", { d: "M3 8h10a2.5 2.5 0 1 0-2.5-2.5M3 16h13a2.5 2.5 0 1 1-2.5 2.5M3 12h7" }));
      case "drop": return e("svg", c, e("path", { d: "M12 2.7l5 6.3a6.5 6.5 0 1 1-10 0z" }));
      case "temp": return e("svg", c, e("path", { d: "M14 14.76V5a2 2 0 1 0-4 0v9.76a4 4 0 1 0 4 0z" }));
      default: return null;
    }
  }

  window.TRSField = TRSField;
  window.TRSBowl = TRSBowl;
  window.TRSSurvey = TRSSurvey;
  window.TRSIcon = TRSIcon;

  /* ---- Upside-down popcorn bucket — faint line-art watermark ---- */
  function TRSPopcorn(props) {
    const s = props.stroke || "#3C3B35";
    const sw = props.sw || 2.4;
    // inverted bucket: narrow (closed) base at top, wide opening at bottom
    const stripes = [[109, 54, 88, 196], [123, 54, 116, 196], [130, 54, 130, 196], [137, 54, 144, 196], [151, 54, 172, 196]];
    // popcorn clusters spilling out of the downward-facing opening
    const corn = [
      [88, 222, 11], [99, 215, 10], [102, 228, 10], [90, 234, 9],
      [123, 238, 11], [135, 231, 11], [138, 244, 10], [125, 249, 9],
      [159, 224, 11], [171, 217, 10], [173, 230, 10], [161, 235, 9],
      [104, 268, 10], [116, 262, 10], [118, 274, 9],
      [145, 268, 10], [156, 262, 10], [158, 274, 9],
      [78, 250, 8], [186, 252, 8], [131, 292, 9]
    ];
    return e("svg", { viewBox: "0 0 260 320", className: props.className, "aria-hidden": "true" },
      // bucket body (trapezoid, wide at the bottom opening)
      e("path", { d: "M95 54 L165 54 L200 196 L60 196 Z", fill: "none", stroke: s, strokeWidth: sw, strokeLinejoin: "round" }),
      // closed base at top (subtle curve)
      e("path", { d: "M95 54 Q130 46 165 54", fill: "none", stroke: s, strokeWidth: sw * 0.8 }),
      // open rim at bottom
      e("ellipse", { cx: 130, cy: 196, rx: 70, ry: 13, fill: "none", stroke: s, strokeWidth: sw * 0.9 }),
      // vertical stripes
      stripes.map((l, i) => e("line", { key: "s" + i, x1: l[0], y1: l[1], x2: l[2], y2: l[3], stroke: s, strokeWidth: sw * 0.7, opacity: 0.85 })),
      // popcorn kernels
      corn.map((c, i) => e("circle", { key: "c" + i, cx: c[0], cy: c[1], r: c[2], fill: "none", stroke: s, strokeWidth: sw * 0.8 }))
    );
  }

  window.TRSPopcorn = TRSPopcorn;
})();
