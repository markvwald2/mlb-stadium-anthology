/* frieze-studies.jsx — 10 Yankee Stadium frieze treatments for review.
   Each treatment is a parametric SVG arcade. Shown in two contexts:
   navy-on-limestone (sheet crown) and light-on-night (hero). */
(function () {
  const e = React.createElement;

  function circleStr(cx, cy, r) {
    return "M " + (cx - r).toFixed(2) + " " + cy.toFixed(2) +
      " a " + r.toFixed(2) + " " + r.toFixed(2) + " 0 1 0 " + (2 * r).toFixed(2) + " 0" +
      " a " + r.toFixed(2) + " " + r.toFixed(2) + " 0 1 0 " + (-2 * r).toFixed(2) + " 0 Z ";
  }
  function beadsStr(n, c, by, H) {
    const br = Math.min(2, Math.max(0.9, H * 0.05));
    let s = "";
    for (let i = 0; i < n; i++) s += circleStr(i * c + c / 2, by, br);
    return s;
  }

  /* Build a frieze path (evenodd) + optional flagpole extras. */
  function friezeD(cfg, vw, H) {
    const n = Math.max(2, Math.round(vw / (cfg.cell || 30)));
    const c = vw / n;
    const bandTop = cfg.poleH || 0;
    const hr = H - bandTop;
    const pierW = Math.max(2.4, c * (cfg.pierFrac || 0.24));
    const ow = c - pierW;
    const archTop = bandTop + Math.max(3, Math.round(hr * (cfg.archTopFrac || 0.27)));
    const baseRail = cfg.baseRail ? Math.round(H * cfg.baseRail) : 0;
    const bottom = baseRail ? (H - baseRail) : (H + 3);
    const poles = [];
    let d = "";

    if (cfg.arch === "pendant") {
      const corn = bandTop + Math.max(3, Math.round(hr * 0.30));
      d += "M 0 " + bandTop + " H " + vw + " V " + corn + " H 0 Z ";
      for (let i = 0; i < n; i++) {
        const cx = i * c + c / 2;
        const tw = c - Math.max(3, c * 0.34);
        const tr = tw / 2;
        const yb = H - tr;
        d += "M " + (cx - tw / 2).toFixed(2) + " " + corn +
             " L " + (cx - tw / 2).toFixed(2) + " " + yb.toFixed(2) +
             " A " + tr.toFixed(2) + " " + tr.toFixed(2) + " 0 0 0 " + (cx + tw / 2).toFixed(2) + " " + yb.toFixed(2) +
             " L " + (cx + tw / 2).toFixed(2) + " " + corn + " Z ";
      }
      if (cfg.beads) d += beadsStr(n, c, (bandTop + corn) / 2, H);
      return { d: d, poles: poles };
    }

    d += "M 0 " + bandTop + " H " + vw + " V " + H + " H 0 Z ";
    for (let i = 0; i < n; i++) {
      const x0 = i * c + pierW / 2, x1 = x0 + ow, cx = (x0 + x1) / 2;
      if (cfg.arch === "round") {
        let r = ow / 2; const maxR = bottom - archTop; if (r > maxR) r = maxR;
        const sp = archTop + r;
        d += "M " + x0.toFixed(2) + " " + bottom + " L " + x0.toFixed(2) + " " + sp.toFixed(2) +
             " A " + r.toFixed(2) + " " + r.toFixed(2) + " 0 0 1 " + x1.toFixed(2) + " " + sp.toFixed(2) +
             " L " + x1.toFixed(2) + " " + bottom + " Z ";
      } else if (cfg.arch === "segmental") {
        const R = ow; const rise = R - Math.sqrt(R * R - (ow / 2) * (ow / 2)); const sp = archTop + rise;
        d += "M " + x0.toFixed(2) + " " + bottom + " L " + x0.toFixed(2) + " " + sp.toFixed(2) +
             " A " + R.toFixed(2) + " " + R.toFixed(2) + " 0 0 1 " + x1.toFixed(2) + " " + sp.toFixed(2) +
             " L " + x1.toFixed(2) + " " + bottom + " Z ";
      } else if (cfg.arch === "pointed" || cfg.arch === "lancet") {
        const k = cfg.arch === "lancet" ? 1.5 : 1.0;
        const R = ow * k;
        const ah = Math.sqrt(R * R - (R - ow / 2) * (R - ow / 2));
        const sp = archTop + ah;
        d += "M " + x0.toFixed(2) + " " + bottom + " L " + x0.toFixed(2) + " " + sp.toFixed(2) +
             " A " + R.toFixed(2) + " " + R.toFixed(2) + " 0 0 1 " + cx.toFixed(2) + " " + archTop.toFixed(2) +
             " A " + R.toFixed(2) + " " + R.toFixed(2) + " 0 0 1 " + x1.toFixed(2) + " " + sp.toFixed(2) +
             " L " + x1.toFixed(2) + " " + bottom + " Z ";
      }
    }
    if (cfg.molding) {
      for (let m = 1; m <= cfg.molding; m++) {
        const my = bandTop + (archTop - bandTop) * (m / (cfg.molding + 1));
        const t = Math.max(0.8, H * 0.022);
        d += "M 0 " + (my - t / 2).toFixed(2) + " H " + vw + " V " + (my + t / 2).toFixed(2) + " H 0 Z ";
      }
    }
    if (cfg.beads) d += beadsStr(n, c, (bandTop + archTop) / 2, H);
    if (cfg.poleH) {
      const every = cfg.poleEvery || 4;
      const ballR = Math.max(1.6, cfg.poleH * 0.2);
      const pw = Math.max(1.4, c * 0.1);
      for (let i = 0; i <= n; i += every) {
        poles.push({ x: i * c, pw: pw, bandTop: bandTop, ballR: ballR });
      }
    }
    return { d: d, poles: poles };
  }

  function Frieze(props) {
    const r = friezeD(props.cfg, props.vw, props.H);
    return e("svg", { viewBox: "0 0 " + props.vw + " " + props.H, preserveAspectRatio: "none",
      width: "100%", height: props.H, "aria-hidden": "true", style: { display: "block", overflow: "hidden" } },
      e("path", { d: r.d, fill: props.fill, fillRule: "evenodd" }),
      r.poles.map((p, i) => e("g", { key: i },
        e("rect", { x: p.x - p.pw / 2, y: p.ballR, width: p.pw, height: p.bandTop - p.ballR, fill: props.fill }),
        e("circle", { cx: p.x, cy: p.ballR, r: p.ballR, fill: props.fill }))));
  }

  const NAVY = "#0C2340", LIGHT = "#F4F0E5";
  const VW = 1119;

  const VARIANTS = [
    { name: "Classic Roman Arcade", desc: "Current treatment \u2014 flat cornice, beaded course, round arches open at the base.",
      cfg: { arch: "round", beads: true, cell: 30, archTopFrac: 0.27 } },
    { name: "Plain Roman Arcade", desc: "Round arches, no beads, a deeper plain cornice. Quietest / most architectural.",
      cfg: { arch: "round", beads: false, cell: 30, archTopFrac: 0.34 } },
    { name: "Framed Windows", desc: "Round arches closed on a base rail \u2014 reads as framed arched windows rather than open arcade.",
      cfg: { arch: "round", beads: true, cell: 30, archTopFrac: 0.24, baseRail: 0.12 } },
    { name: "Gothic Pointed", desc: "Equilateral pointed arches \u2014 sharper, more Deco-civic than the Roman round.",
      cfg: { arch: "pointed", beads: true, cell: 30, archTopFrac: 0.20 } },
    { name: "Lancet Colonnade", desc: "Narrow, tall pointed lancets, densely set \u2014 strong vertical rhythm.",
      cfg: { arch: "lancet", beads: false, cell: 18, pierFrac: 0.3, archTopFrac: 0.16 } },
    { name: "Segmental Arcade", desc: "Shallow segmental arches \u2014 calmer, wider sweep, low and steady.",
      cfg: { arch: "segmental", beads: true, cell: 30, archTopFrac: 0.30 } },
    { name: "Monumental Arches", desc: "Few wide round arches on bold piers \u2014 grander, sparser cadence.",
      cfg: { arch: "round", beads: false, cell: 66, pierFrac: 0.18, archTopFrac: 0.22 } },
    { name: "Layered Cornice", desc: "Round arcade beneath a double string-course and beads \u2014 the most ornate molding.",
      cfg: { arch: "round", beads: true, molding: 2, cell: 30, archTopFrac: 0.40 } },
    { name: "Flagpole Frieze", desc: "Round arcade with beaded cornice and flagpole finials \u2014 echoes the stadium roofline pennants.",
      cfg: { arch: "round", beads: true, cell: 26, archTopFrac: 0.27, poleH: 12, poleEvery: 5 } },
    { name: "Solid Pendants", desc: "Inverse silhouette \u2014 solid round-bottomed pendants hang from the cornice instead of open arches.",
      cfg: { arch: "pendant", beads: true, cell: 26 } }
  ];

  function Card(props) {
    const v = props.v, i = props.i;
    const num = ("0" + (i + 1)).slice(-2);
    // flagpole variant needs extra height for the poles
    const extra = v.cfg.poleH || 0;
    return e("div", { className: "card" },
      e("div", { className: "cap" },
        e("span", { className: "num" }, num),
        e("span", { className: "nm" }, v.name),
        e("span", { className: "desc" }, v.desc)),
      e("div", { className: "ctx" },
        e("div", { className: "strip paper" },
          e("div", { className: "friezeholder" }, e(Frieze, { cfg: v.cfg, vw: VW, H: 30 + extra, fill: NAVY })),
          e("div", { className: "lbl" }, "Sheet crown \u00b7 navy on limestone")),
        e("div", { className: "strip night" },
          e("div", { className: "friezeholder" }, e(Frieze, { cfg: v.cfg, vw: VW, H: 34 + extra, fill: LIGHT })),
          e("div", { className: "lbl" }, "Hero \u00b7 light on night"))));
  }

  function App() {
    return e("div", { className: "wrap" },
      e("div", { className: "head" },
        e("div", { className: "kick" }, "Yankee Stadium \u00b7 1923"),
        e("h1", null, "Frieze Treatments"),
        e("p", null, "Ten takes on the white frieze, each shown as it would sit on the sheet crown (navy on limestone) and across the top of the night hero (light on the photo). Tell me the number you want and I\u2019ll set it across the spread.")),
      VARIANTS.map((v, i) => e(Card, { key: i, v: v, i: i })));
  }

  ReactDOM.createRoot(document.getElementById("root")).render(e(App));
})();
