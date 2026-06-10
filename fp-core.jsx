/* fp-core.jsx — shared kit for the field-plan studies.
   Royals visual system (royal blue / gold / cream, Anton·Oswald·Spectral·Space Mono).
   Exports to window: FP (palette + helpers), FPChip, FPField.
   All ten variants draw their "simple field" through FPField so the ballpark
   shape stays identical; each variant differs in how it annotates distances
   and the field's rotation/bearing. */
(function () {
  // ---------- palette ----------
  const FP = {
    royal: "#134A8E", royalDeep: "#0C2F5C", royalInk: "#0A2547",
    gold: "#BD9B60", goldHi: "#D2B477", goldDeep: "#9A7C44",
    paper: "#EFE8D7", paperHi: "#F6F1E4", paperLo: "#E2D8C2",
    rule: "#C9BD9D", ruleStrong: "#B3A684",
    grass: "#557F54", grassHi: "#638F60", grassDeep: "#456846",
    clay: "#C2965E", clayEdge: "#A87C45", chalk: "#F4EEE0", wallInk: "#33523B",
    ink: "#1C2630", ink2: "#51606E", ink3: "#8A93A0",
    navy: "#0E2E58", navy2: "#08203F",
    // blueprint
    blue: "#0B2A55", blueLine: "#7FB2E6", blueDim: "#3E6FA8"
  };

  // rotate point p about center C by deg (positive = clockwise on screen, y-down)
  FP.rot = function (p, C, deg) {
    const t = deg * Math.PI / 180, c = Math.cos(t), s = Math.sin(t);
    const dx = p[0] - C[0], dy = p[1] - C[1];
    return [C[0] + dx * c - dy * s, C[1] + dx * s + dy * c];
  };
  // push point p radially away from center C by amount o
  FP.out = function (p, C, o) {
    const dx = p[0] - C[0], dy = p[1] - C[1];
    const len = Math.hypot(dx, dy) || 1;
    return [p[0] + dx / len * o, p[1] + dy / len * o];
  };
  // polar -> cartesian about C, ang measured clockwise from straight-up (screen north)
  FP.polar = function (C, r, angDeg) {
    const t = angDeg * Math.PI / 180;
    return [C[0] + r * Math.sin(t), C[1] - r * Math.cos(t)];
  };
  FP.strip = function (v) { return (v || "").toString().replace(" ft", ""); };

  // ---------- upright auto-sized label chip ----------
  // tone: "paper" (cream chip, royal text) | "royal" | "gold" | "ghost" (outline only)
  function FPChip(props) {
    const txt = props.text;
    const cx = props.x, cy = props.y;
    const fs = props.size || 15;
    const wPad = props.padX != null ? props.padX : 9;
    const h = props.height || 22;
    const tone = props.tone || "paper";
    const w = Math.max(props.minW || 0, txt.length * (fs * 0.62) + wPad * 2);
    const r = props.radius != null ? props.radius : 2.5;
    let fill = FP.paperHi, stroke = FP.rule, color = FP.royal, sw = 1;
    if (tone === "royal") { fill = FP.royal; stroke = FP.royalDeep; color = "#fff"; }
    else if (tone === "gold") { fill = FP.gold; stroke = FP.goldDeep; color = FP.royalInk; }
    else if (tone === "navy") { fill = FP.navy2; stroke = FP.royal; color = FP.paperHi; }
    else if (tone === "ghost") { fill = "none"; stroke = "none"; color = props.color || FP.ink; }
    const mono = props.mono !== false;
    return React.createElement("g", null,
      tone !== "ghost" ? React.createElement("rect", {
        x: cx - w / 2, y: cy - h / 2, width: w, height: h, rx: r,
        fill: fill, stroke: stroke, strokeWidth: sw
      }) : null,
      React.createElement("text", {
        x: cx, y: cy + fs * 0.35, textAnchor: "middle",
        style: {
          fontFamily: mono ? "'Space Mono', monospace" : "'Oswald', sans-serif",
          fontWeight: 700, fontSize: fs + "px", fill: color,
          letterSpacing: mono ? ".01em" : ".04em"
        }
      }, txt)
    );
  }

  // ---------- the simple ballpark shape ----------
  // Returns local geometry around center C with outfield radius R.
  // home at bottom of the circle, CF at top, LF/RF at the equator.
  FP.field = function (C, R) {
    const home = [C[0], C[1] + R];
    const cf = [C[0], C[1] - R];
    const lf = [C[0] - R, C[1]];
    const rf = [C[0] + R, C[1]];
    const mound = [C[0], C[1] + R * 0.42];
    const d = R * 0.30; // diamond half-diagonal
    const b1 = [C[0] + d, C[1] + R - d]; // 1B
    const b2 = [C[0], C[1] + R - 2 * d]; // 2B
    const b3 = [C[0] - d, C[1] + R - d]; // 3B
    const grassPath =
      "M " + home[0] + " " + home[1] +
      " L " + lf[0] + " " + lf[1] +
      " A " + R + " " + R + " 0 0 1 " + rf[0] + " " + rf[1] + " Z";
    const dia = "M " + home[0] + " " + home[1] +
      " L " + b1[0] + " " + b1[1] +
      " L " + b2[0] + " " + b2[1] +
      " L " + b3[0] + " " + b3[1] + " Z";
    return { home, cf, lf, rf, mound, bases: [b1, b2, b3], grassPath, dia };
  };

  // Render the field group (grass + foul lines + infield) rotated by deg.
  // opts: { C, R, deg, flat (bool: no gradient fill), lineOnly (bool: blueprint),
  //         stroke, grassFill }
  function FPField(props) {
    const C = props.C, R = props.R, deg = props.deg || 0;
    const g = FP.field(C, R);
    const lineOnly = props.lineOnly;
    const stroke = props.stroke || FP.wallInk;
    const chalk = props.chalk || FP.chalk;
    const grad = props.gradId || ("fpg" + Math.round(C[0]) + "_" + Math.round(R) + "_" + deg);
    const children = [];

    if (lineOnly) {
      children.push(React.createElement("path", { key: "g", d: g.grassPath, fill: props.grassFill || "none", stroke: stroke, strokeWidth: props.sw || 1.5, strokeLinejoin: "round" }));
    } else {
      children.push(React.createElement("path", { key: "g", d: g.grassPath, fill: "url(#" + grad + ")", stroke: stroke, strokeWidth: 1.6, strokeLinejoin: "round" }));
    }
    // foul lines
    children.push(React.createElement("line", { key: "fl", x1: g.home[0], y1: g.home[1], x2: g.lf[0], y2: g.lf[1], stroke: lineOnly ? stroke : chalk, strokeWidth: lineOnly ? (props.sw || 1.2) : 1.6, opacity: lineOnly ? 0.9 : 0.9 }));
    children.push(React.createElement("line", { key: "fr", x1: g.home[0], y1: g.home[1], x2: g.rf[0], y2: g.rf[1], stroke: lineOnly ? stroke : chalk, strokeWidth: lineOnly ? (props.sw || 1.2) : 1.6, opacity: 0.9 }));
    // infield
    if (lineOnly) {
      children.push(React.createElement("path", { key: "d", d: g.dia, fill: "none", stroke: stroke, strokeWidth: props.sw || 1.2 }));
      children.push(React.createElement("circle", { key: "m", cx: g.mound[0], cy: g.mound[1], r: 2.6, fill: "none", stroke: stroke, strokeWidth: props.sw || 1.2 }));
    } else {
      children.push(React.createElement("path", { key: "d", d: g.dia, fill: props.clay || FP.clay, stroke: chalk, strokeWidth: 1.8, strokeLinejoin: "round" }));
      children.push(React.createElement("circle", { key: "m", cx: g.mound[0], cy: g.mound[1], r: R * 0.055, fill: props.clay || FP.clay, stroke: chalk, strokeWidth: 1 }));
      g.bases.forEach(function (b, i) {
        children.push(React.createElement("rect", { key: "b" + i, x: b[0] - 3, y: b[1] - 3, width: 6, height: 6, fill: chalk, transform: "rotate(45 " + b[0] + " " + b[1] + ")" }));
      });
      children.push(React.createElement("rect", { key: "h", x: g.home[0] - 3.4, y: g.home[1] - 3.4, width: 6.8, height: 6.8, fill: chalk, transform: "rotate(45 " + g.home[0] + " " + g.home[1] + ")" }));
    }

    return React.createElement("g", { transform: "rotate(" + deg + " " + C[0] + " " + C[1] + ")" }, children);
  }

  // Gradient def for grass (call inside <defs>)
  FP.grassDef = function (id) {
    return React.createElement("linearGradient", { id: id, x1: "0", y1: "0", x2: "0", y2: "1", key: id },
      React.createElement("stop", { offset: "0", stopColor: FP.grassHi }),
      React.createElement("stop", { offset: "1", stopColor: FP.grass })
    );
  };

  window.FP = FP;
  window.FPChip = FPChip;
  window.FPField = FPField;
})();
