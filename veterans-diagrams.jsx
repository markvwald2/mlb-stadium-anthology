/* veterans-diagrams.jsx — engineering / municipal-survey furniture for the
   Veterans Stadium spread. All linework is generated locally.
   Exports: window.VetIcon, window.VetSurvey, window.VetOctorad. */
(function () {
  const e = React.createElement;
  const SLATE = "#4B4A44";
  const INK = "#26241F";
  const RED = "#A8132B";

  /* ---- octagon vertex helper (flat-ish top, "octorad" 8-sided bowl) ---- */
  function octPts(cx, cy, r) {
    const pts = [];
    for (let i = 0; i < 8; i++) {
      const a = (Math.PI / 8) + i * (Math.PI / 4); // rotate so sides read as bays
      pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
    }
    return pts;
  }
  function octPath(cx, cy, r) {
    return octPts(cx, cy, r).map((p, i) => (i ? "L" : "M") + p[0].toFixed(2) + " " + p[1].toFixed(2)).join(" ") + " Z";
  }

  /* ====================================================================
     VetOctorad — concentric octagonal concrete-bowl plan with radial
     segmentation, an inner ring of precast bays, and a small diamond
     opening toward the field bearing. Used large+faint on the hero and
     small as a right-page watermark. Props: stroke, op, accent, degrees,
     className, showField. ==================================================== */
  function VetOctorad(props) {
    const stroke = props.stroke || SLATE;
    const op = props.op == null ? 1 : props.op;
    const accent = props.accent || RED;
    const deg = props.degrees == null ? 67.5 : props.degrees;
    const cx = 200, cy = 200;
    const rings = props.rings || [188, 158, 128, 100];
    const seg = props.segments || 32;

    // radial segmentation between the outer two rings (concrete column lines)
    const spokes = [];
    for (let i = 0; i < seg; i++) {
      const a = (i / seg) * Math.PI * 2;
      spokes.push(e("line", {
        key: "sp" + i,
        x1: cx + rings[1] * Math.cos(a), y1: cy + rings[1] * Math.sin(a),
        x2: cx + rings[0] * Math.cos(a), y2: cy + rings[0] * Math.sin(a),
        stroke: stroke, strokeWidth: 0.7, opacity: op * 0.5
      }));
    }
    // eight primary bay divisions (full radius) at octagon vertices
    const bays = [];
    octPts(cx, cy, rings[0]).forEach((p, i) => {
      bays.push(e("line", { key: "by" + i, x1: cx, y1: cy, x2: p[0], y2: p[1], stroke: stroke, strokeWidth: 0.8, opacity: op * 0.4 }));
    });

    // field diamond at center, opening toward bearing (CF up, rotated deg cw)
    const t = deg * Math.PI / 180;
    const dir = [Math.sin(t), -Math.cos(t)];          // CF direction from home
    const per = [-dir[1], dir[0]];
    const reach = rings[3] * 0.62, half = reach * 0.62;
    const home = [cx - dir[0] * reach * 0.46, cy - dir[1] * reach * 0.46];
    const cf =   [home[0] + dir[0] * reach, home[1] + dir[1] * reach];
    const lp =   [home[0] + dir[0] * half + per[0] * half, home[1] + dir[1] * half + per[1] * half];
    const rp =   [home[0] + dir[0] * half - per[0] * half, home[1] + dir[1] * half - per[1] * half];
    const diamond = "M " + home.join(" ") + " L " + lp.join(" ") + " L " + cf.join(" ") + " L " + rp.join(" ") + " Z";

    return e("svg", { viewBox: "0 0 400 400", className: props.className, "aria-hidden": "true" },
      // concentric octagon rings
      rings.map((r, i) => e("path", {
        key: "oc" + i, d: octPath(cx, cy, r), fill: i === rings.length - 1 ? stroke : "none",
        fillOpacity: i === rings.length - 1 ? op * 0.05 : 0,
        stroke: stroke, strokeWidth: i === 0 ? 1.4 : 0.9, opacity: op * (i === 0 ? 1 : 0.55)
      })),
      bays, spokes,
      // inner concentric circle (playing-bowl curb)
      e("circle", { cx: cx, cy: cy, r: rings[3] * 0.84, fill: "none", stroke: stroke, strokeWidth: 0.7, opacity: op * 0.45 }),
      props.showField === false ? null : e("g", null,
        e("path", { d: diamond, fill: "none", stroke: accent, strokeWidth: 1.2, opacity: op }),
        e("line", { x1: home[0], y1: home[1], x2: cf[0], y2: cf[1], stroke: accent, strokeWidth: 0.8, strokeDasharray: "3 3", opacity: op * 0.9 }),
        e("rect", { x: home[0] - 2.4, y: home[1] - 2.4, width: 4.8, height: 4.8, fill: accent, opacity: op,
          transform: "rotate(45 " + home[0] + " " + home[1] + ")" })
      )
    );
  }

  /* ====================================================================
     VetSurvey — radial drafting motif (concentric arcs + degree ticks +
     crosshair) for quiet decorative hero linework. ==================== */
  function VetSurvey(props) {
    const stroke = props.stroke || "#C8C2B4";
    const op = props.op == null ? 0.5 : props.op;
    const cx = 300, cy = 300;
    const rings = props.rings || [300, 248, 196, 142, 92];
    const ticks = [];
    for (let i = 0; i < 72; i++) {
      const ang = (i / 72) * Math.PI * 2;
      const long = i % 6 === 0;
      const r0 = rings[0], r1 = r0 - (long ? 28 : 14);
      ticks.push(e("line", { key: "k" + i,
        x1: cx + r0 * Math.cos(ang), y1: cy + r0 * Math.sin(ang),
        x2: cx + r1 * Math.cos(ang), y2: cy + r1 * Math.sin(ang),
        stroke: stroke, strokeWidth: long ? 1 : 0.5, opacity: op * (long ? 1 : 0.7) }));
    }
    return e("svg", { viewBox: "0 0 600 600", className: props.className, "aria-hidden": "true" },
      rings.map((r, i) => e("circle", { key: "c" + i, cx: cx, cy: cy, r: r, fill: "none",
        stroke: stroke, strokeWidth: i === 0 ? 1.2 : 0.7, opacity: op * (i === 0 ? 1 : 0.5) })),
      ticks,
      e("line", { x1: cx - rings[0], y1: cy, x2: cx + rings[0], y2: cy, stroke: stroke, strokeWidth: 0.6, opacity: op * 0.5 }),
      e("line", { x1: cx, y1: cy - rings[0], x2: cx, y2: cy + rings[0], stroke: stroke, strokeWidth: 0.6, opacity: op * 0.5 }),
      e("circle", { cx: cx, cy: cy, r: 3, fill: stroke, opacity: op })
    );
  }

  /* ---- Icon set (line icons; section + featured + weather) ---- */
  function VetIcon(kind, opts) {
    opts = opts || {};
    const c = { width: opts.size || 22, height: opts.size || 22, viewBox: "0 0 24 24", fill: "none",
      stroke: opts.stroke || INK, strokeWidth: opts.sw || 1.5, strokeLinecap: "round",
      strokeLinejoin: "round", className: opts.className };
    /* unified weather icon set — same box, same stroke, shared geometry */
    if (window.WxIcons && window.WxIcons.parts(kind)) return window.WxIcons.react(kind, c);
    switch (kind) {
      case "crosshair": return e("svg", c, e("circle", { cx: 12, cy: 12, r: 8 }),
        e("line", { x1: 12, y1: 1, x2: 12, y2: 5 }), e("line", { x1: 12, y1: 19, x2: 12, y2: 23 }),
        e("line", { x1: 1, y1: 12, x2: 5, y2: 12 }), e("line", { x1: 19, y1: 12, x2: 23, y2: 12 }),
        e("circle", { cx: 12, cy: 12, r: 1.6, fill: opts.stroke || INK, stroke: "none" }));
      case "octorad": return e("svg", c, e("polygon", { points: "12,2 19,5 22,12 19,19 12,22 5,19 2,12 5,5" }),
        e("circle", { cx: 12, cy: 12, r: 4 }));
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
      case "calendar": return e("svg", c, e("rect", { x: 3.5, y: 4.5, width: 17, height: 16, rx: 1.5 }),
        e("path", { d: "M3.5 9h17M8 3v3M16 3v3" }));
      default: return null;
    }
  }

  window.VetIcon = VetIcon;
  window.VetSurvey = VetSurvey;
  window.VetOctorad = VetOctorad;
})();
