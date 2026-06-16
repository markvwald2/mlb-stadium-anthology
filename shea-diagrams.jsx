/* shea-diagrams.jsx — World's Fair-era civic furniture for the Shea Stadium
   spread ("The Fairgrounds Grid"). All linework generated locally; no facts.
   Exports: window.SheaIcon, window.SheaFacade, window.SheaBowl. */
(function () {
  const e = React.createElement;
  const INK = "#23211C";
  const SLATE = "#4A4942";
  const BLUE = "#0A2E73";
  const ORANGE = "#E8531A";
  const APPLE = "#B11226";

  /* ====================================================================
     SheaFacade — the controlling device: a column (or row) of stacked
     modular color-panel bands derived from Shea's blue-and-orange exterior
     steel panels. Used as the hero signpost and as section-header tabs.
     Props: vertical(bool), w, h, gap, panels[hex...], className, style.
     ==================================================================== */
  function SheaFacade(props) {
    const vertical = props.vertical !== false;
    const panels = props.panels || [BLUE, ORANGE, "#E9E4D7", BLUE, ORANGE];
    const gap = props.gap == null ? 4 : props.gap;
    const style = Object.assign({
      display: "flex",
      flexDirection: vertical ? "column" : "row",
      gap: gap + "px",
      width: (props.w || (vertical ? 22 : 220)) + "px",
      height: (props.h || (vertical ? 220 : 22)) + "px"
    }, props.style || {});
    return e("div", { className: props.className, style: style, "aria-hidden": "true" },
      panels.map((c, i) => e("div", {
        key: i,
        style: { flex: 1, background: c, boxShadow: c === "#E9E4D7" ? "inset 0 0 0 1px rgba(0,0,0,.14)" : "none" }
      })));
  }

  /* ====================================================================
     SheaBowl — open-air circular multipurpose bowl plan: concentric seating
     rings, radial column lines (precast bays), an inner playing curb, and a
     small field diamond opening toward the bearing. Large+faint on hero,
     small as quiet watermark. Props: stroke, op, accent, degrees, className.
     ==================================================================== */
  function SheaBowl(props) {
    const stroke = props.stroke || SLATE;
    const op = props.op == null ? 1 : props.op;
    const accent = props.accent || ORANGE;
    const deg = props.degrees == null ? 67.5 : props.degrees;
    const cx = 200, cy = 200;
    const rings = props.rings || [192, 168, 144, 120, 98];
    const seg = props.segments || 48;

    // radial column lines between outer two rings (precast structural bays)
    const spokes = [];
    for (let i = 0; i < seg; i++) {
      const a = (i / seg) * Math.PI * 2;
      spokes.push(e("line", {
        key: "sp" + i,
        x1: cx + rings[2] * Math.cos(a), y1: cy + rings[2] * Math.sin(a),
        x2: cx + rings[0] * Math.cos(a), y2: cy + rings[0] * Math.sin(a),
        stroke: stroke, strokeWidth: 0.6, opacity: op * 0.42
      }));
    }
    // field diamond at center, opening toward bearing (CF up, rotated deg cw)
    const t = deg * Math.PI / 180;
    const dir = [Math.sin(t), -Math.cos(t)];
    const per = [-dir[1], dir[0]];
    const reach = rings[4] * 0.66, half = reach * 0.6;
    const home = [cx - dir[0] * reach * 0.42, cy - dir[1] * reach * 0.42];
    const cf =   [home[0] + dir[0] * reach, home[1] + dir[1] * reach];
    const lp =   [home[0] + dir[0] * half + per[0] * half, home[1] + dir[1] * half + per[1] * half];
    const rp =   [home[0] + dir[0] * half - per[0] * half, home[1] + dir[1] * half - per[1] * half];
    const diamond = "M " + home.join(" ") + " L " + lp.join(" ") + " L " + cf.join(" ") + " L " + rp.join(" ") + " Z";

    return e("svg", { viewBox: "0 0 400 400", className: props.className, style: props.style, "aria-hidden": "true" },
      rings.map((r, i) => e("circle", {
        key: "r" + i, cx: cx, cy: cy, r: r, fill: "none",
        stroke: stroke, strokeWidth: i === 0 ? 1.3 : 0.8, opacity: op * (i === 0 ? 1 : 0.5)
      })),
      spokes,
      // outfield apple-memory cue: a quiet red dot beyond center field
      props.apple === false ? null : e("circle", {
        cx: cf[0] + dir[0] * 14, cy: cf[1] + dir[1] * 14, r: 4.6, fill: APPLE, opacity: op * 0.9
      }),
      props.showField === false ? null : e("g", null,
        e("path", { d: diamond, fill: "none", stroke: accent, strokeWidth: 1.2, opacity: op }),
        e("line", { x1: home[0], y1: home[1], x2: cf[0], y2: cf[1], stroke: accent, strokeWidth: 0.8, strokeDasharray: "3 3", opacity: op * 0.85 }),
        e("rect", { x: home[0] - 2.3, y: home[1] - 2.3, width: 4.6, height: 4.6, fill: accent, opacity: op,
          transform: "rotate(45 " + home[0] + " " + home[1] + ")" })
      )
    );
  }

  /* ---- Icon set (line icons; section markers + weather + memory) ---- */
  function SheaIcon(kind, opts) {
    opts = opts || {};
    const c = { width: opts.size || 22, height: opts.size || 22, viewBox: "0 0 24 24", fill: "none",
      stroke: opts.stroke || INK, strokeWidth: opts.sw || 1.5, strokeLinecap: "round",
      strokeLinejoin: "round", className: opts.className };
    switch (kind) {
      // stacked color-panel placard (Stadium Section marker)
      case "panels": return e("svg", c,
        e("rect", { x: 4, y: 3.5, width: 16, height: 4.2, rx: 0.6 }),
        e("rect", { x: 4, y: 9.9, width: 16, height: 4.2, rx: 0.6 }),
        e("rect", { x: 4, y: 16.3, width: 16, height: 4.2, rx: 0.6 }));
      // open-air bowl (alt section marker)
      case "bowl": return e("svg", c, e("circle", { cx: 12, cy: 12, r: 8.5 }),
        e("circle", { cx: 12, cy: 12, r: 4.4 }),
        e("path", { d: "M12 3.5v3.6M12 16.9v3.6M3.5 12h3.6M16.9 12h3.6" }));
      // fairground arrow / wayfinding (Visit Section marker)
      case "wayfind": return e("svg", c,
        e("path", { d: "M3 12h13" }), e("path", { d: "M12 7l5 5-5 5" }),
        e("path", { d: "M19.5 6.5v11", strokeWidth: (opts.sw || 1.5) * 1.2 }));
      case "group": return e("svg", c, e("circle", { cx: 9, cy: 8, r: 3 }),
        e("path", { d: "M3.5 19a5.5 5.5 0 0 1 11 0" }),
        e("path", { d: "M16 6.2a3 3 0 0 1 0 5.6" }), e("path", { d: "M16.5 13.6A5.5 5.5 0 0 1 20.5 19" }));
      case "sun": return e("svg", c, e("circle", { cx: 12, cy: 12, r: 4 }),
        e("path", { d: "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" }));
      case "moon": return e("svg", c, e("path", { d: "M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" }));
      case "cloud": return e("svg", c, e("path", { d: "M7 18.5h9.7a3.7 3.7 0 0 0 .5-7.37 5.8 5.8 0 0 0-11.15-1.5A4.2 4.2 0 0 0 7 18.5z" }));
      case "clock": return e("svg", c, e("circle", { cx: 12, cy: 12, r: 8.5 }),
        e("path", { d: "M12 7.5V12l3 2" }));
      case "ticket": return e("svg", c, e("path", { d: "M3 8.5A1.5 1.5 0 0 1 4.5 7h15A1.5 1.5 0 0 1 21 8.5v1a2 2 0 0 0 0 5v1A1.5 1.5 0 0 1 19.5 17h-15A1.5 1.5 0 0 1 3 15.5v-1a2 2 0 0 0 0-5z" }),
        e("path", { d: "M14 7v10", strokeDasharray: "2 2" }));
      case "wind": return e("svg", c, e("path", { d: "M3 8h10a2.5 2.5 0 1 0-2.5-2.5M3 16h13a2.5 2.5 0 1 1-2.5 2.5M3 12h7" }));
      case "drop": return e("svg", c, e("path", { d: "M12 2.7l5 6.3a6.5 6.5 0 1 1-10 0z" }));
      case "calendar": return e("svg", c, e("rect", { x: 3.5, y: 4.5, width: 17, height: 16, rx: 1.5 }),
        e("path", { d: "M3.5 9h17M8 3v3M16 3v3" }));
      case "pin": return e("svg", c, e("path", { d: "M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" }),
        e("circle", { cx: 12, cy: 10, r: 2.5 }));
      // meridian globe (hero sign tab)
      case "globe": return e("svg", c,
        e("circle", { cx: 12, cy: 12, r: 9.2 }),
        e("line", { x1: 12, y1: 2.8, x2: 12, y2: 21.2 }),
        e("ellipse", { cx: 12, cy: 12, rx: 4.5, ry: 9.2 }),
        e("line", { x1: 2.8, y1: 12, x2: 21.2, y2: 12 }),
        e("line", { x1: 4.7, y1: 7.9, x2: 19.3, y2: 7.9 }),
        e("line", { x1: 4.7, y1: 16.1, x2: 19.3, y2: 16.1 }));
      default: return null;
    }
  }

  window.SheaIcon = SheaIcon;
  window.SheaFacade = SheaFacade;
  window.SheaBowl = SheaBowl;
})();
