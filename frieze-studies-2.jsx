/* frieze-studies-2.jsx — 10 MORE Yankee Stadium frieze treatments.
   This set follows the architectural brief: every treatment is built from the
   five canonical parts the brief insists on and that Set I lacked —
     1) two heavy end PYLONS with a clipped Art-Deco parapet crown,
     2) one flat TOP BEAM (the datum),
     3) a field of repeating arched BALUSTERS,
     4) a thin LOWER RAIL, and
     5) a broad, shallow LOWER ARCH (the bottom edge rises pylon-to-pylon).
   Variants modulate crown shape, arch depth, baluster top, and cadence. */
(function () {
  const e = React.createElement;
  const f2 = (v) => v.toFixed(2);

  /* ---- geometry ---------------------------------------------------------- */
  function buildFrieze(cfg, vw, H) {
    const crownH   = H * (cfg.crownFrac ?? 0.16);   // pylon crown above the beam
    const beamTop  = crownH;
    const beamT    = H * (cfg.beamFrac ?? 0.13);
    const beamBot  = beamTop + beamT;
    const pylW     = Math.max(18, H * (cfg.pylonFrac ?? 1.25));
    const proj     = H * (cfg.projFrac ?? 0.12);    // pylon foot below arch
    const archDep  = H * (cfg.archFrac ?? 0.18);    // depth of the lower arch
    const railT    = H * (cfg.railFrac ?? 0.06);    // lower rail thickness
    const M        = vw * (cfg.marginFrac ?? 0.16);  // side margin -> shorter span
    const L = M, R = vw - M;                         // inset working edges
    const xc       = (L + R) / 2;
    const half     = Math.max(1, (R - L - 2 * pylW) / 2);

    // bottom of the openings = top of the lower rail; deepest (max y) at centre.
    const baseOpen = (x) => {
      const t = (x - xc) / half;
      return (H - proj) - archDep * (1 - t * t);
    };
    const baseUnder = (x) => baseOpen(x) + railT; // underside of the rail

    /* ---- outer silhouette (clockwise) ---- */
    const pts = [];
    const cl = cfg.crown === "flat" ? 0 : (cfg.crownClip != null ? cfg.crownClip : pylW * 0.32);

    function crown(x0) { // pylon crown top edge, left→right, within [x0, x0+pylW]
      if (cfg.crown === "step") {
        const sx = pylW * 0.26, sy = crownH * 0.5;
        pts.push([x0, crownH], [x0, sy], [x0 + sx, sy], [x0 + sx, 0],
                 [x0 + pylW - sx, 0], [x0 + pylW - sx, sy], [x0 + pylW, sy], [x0 + pylW, crownH]);
      } else if (cfg.crown === "flat") {
        pts.push([x0, crownH], [x0, 0], [x0 + pylW, 0], [x0 + pylW, crownH]);
      } else { // clipped parapet (default)
        pts.push([x0, crownH], [x0 + cl, 0], [x0 + pylW - cl, 0], [x0 + pylW, crownH]);
      }
    }

    crown(L);                       // left pylon crown
    pts.push([R - pylW, crownH]);   // beam top spans to the right pylon
    crown(R - pylW);                // right pylon crown
    pts.push([R, H]);               // right pylon outer face down
    pts.push([R - pylW, H]);        // right pylon foot
    pts.push([R - pylW, baseUnder(R - pylW)]);
    const N = 48;                   // sample the arched underside
    for (let i = 1; i <= N; i++) {
      const xx = (R - pylW) - ((R - L - 2 * pylW) * (i / N));
      pts.push([xx, baseUnder(xx)]);
    }
    pts.push([L + pylW, H]);        // left pylon foot
    pts.push([L, H]);               // left pylon outer
    let d = "M " + f2(pts[0][0]) + " " + f2(pts[0][1]) + " ";
    for (let i = 1; i < pts.length; i++) d += "L " + f2(pts[i][0]) + " " + f2(pts[i][1]) + " ";
    d += "Z ";

    /* ---- baluster openings (holes, even-odd) ---- */
    const fieldW = R - L - 2 * pylW;
    const n = Math.max(3, Math.round(fieldW / (cfg.cell || 68)));
    const c = fieldW / n;
    const pierW = Math.max(2.2, c * (cfg.pierFrac ?? 0.26));
    const ow = c - pierW;
    const spandrel = beamT * (cfg.spandrelMul ?? 0.6);
    const topY = beamBot + spandrel;

    for (let i = 0; i < n; i++) {
      const o0 = L + pylW + i * c + pierW / 2, o1 = o0 + ow, cx = (o0 + o1) / 2;
      const ob = baseOpen(cx);
      if (cfg.bal === "pointed" || cfg.bal === "lancet") {
        const k = cfg.bal === "lancet" ? 1.5 : 1.0, R = ow * k;
        const sp = topY + Math.sqrt(R * R - (R - ow / 2) * (R - ow / 2));
        d += "M " + f2(o0) + " " + f2(ob) + " L " + f2(o0) + " " + f2(sp) +
             " A " + f2(R) + " " + f2(R) + " 0 0 1 " + f2(cx) + " " + f2(topY) +
             " A " + f2(R) + " " + f2(R) + " 0 0 1 " + f2(o1) + " " + f2(sp) +
             " L " + f2(o1) + " " + f2(ob) + " Z ";
      } else if (cfg.bal === "segmental") {
        const R = ow * 1.15, rise = R - Math.sqrt(R * R - (ow / 2) * (ow / 2)), sp = topY + rise;
        d += "M " + f2(o0) + " " + f2(ob) + " L " + f2(o0) + " " + f2(sp) +
             " A " + f2(R) + " " + f2(R) + " 0 0 1 " + f2(o1) + " " + f2(sp) +
             " L " + f2(o1) + " " + f2(ob) + " Z ";
      } else { // round (default)
        let r = ow / 2; const sp = topY + r;
        d += "M " + f2(o0) + " " + f2(ob) + " L " + f2(o0) + " " + f2(sp) +
             " A " + f2(r) + " " + f2(r) + " 0 0 1 " + f2(o1) + " " + f2(sp) +
             " L " + f2(o1) + " " + f2(ob) + " Z ";
      }
    }

    /* ---- optional second (upper) rail slot in the lower rail ---- */
    if (cfg.doubleRail) {
      const slotT = railT * 0.42;
      let s = "M " + f2(L + pylW) + " " + f2(baseOpen(L + pylW) + (railT - slotT) / 2) + " ";
      for (let i = 1; i <= N; i++) {
        const xx = L + pylW + (fieldW * (i / N));
        s += "L " + f2(xx) + " " + f2(baseOpen(xx) + (railT - slotT) / 2) + " ";
      }
      for (let i = N; i >= 0; i--) {
        const xx = L + pylW + (fieldW * (i / N));
        s += "L " + f2(xx) + " " + f2(baseOpen(xx) + (railT + slotT) / 2) + " ";
      }
      d += s + "Z ";
    }

    /* ---- optional bead course on the beam ---- */
    if (cfg.beads) {
      const by = beamTop + beamT / 2, br = Math.max(1, beamT * 0.26);
      for (let i = 0; i < n; i++) {
        const cx = L + pylW + i * c + c / 2;
        d += "M " + f2(cx - br) + " " + f2(by) + " a " + f2(br) + " " + f2(br) + " 0 1 0 " + f2(2 * br) + " 0" +
             " a " + f2(br) + " " + f2(br) + " 0 1 0 " + f2(-2 * br) + " 0 Z ";
      }
    }

    return d;
  }

  function Frieze(props) {
    const d = buildFrieze(props.cfg, props.vw, props.H);
    return e("svg", { viewBox: "0 0 " + props.vw + " " + props.H, preserveAspectRatio: "none",
      width: "100%", height: props.H, "aria-hidden": "true", style: { display: "block", overflow: "hidden" } },
      e("path", { d: d, fill: props.fill, fillRule: "evenodd" }));
  }

  /* ---- variants ---------------------------------------------------------- */
  const NAVY = "#0C2340", LIGHT = "#F4F0E5";
  const VW = 1119;

  const VARIANTS = [
    { name: "Authentic Crown", desc: "The canonical reconstruction \u2014 clipped parapet pylons, flat beam, round balusters, lower rail, shallow lower arch.",
      cfg: { bal: "round", crown: "clip", beads: false, cell: 68 } },
    { name: "Viaduct Span", desc: "Deeper lower arch and a heavier rail with fewer, wider bays \u2014 the bridge / civic-arcade read the brief calls for.",
      cfg: { bal: "round", crown: "clip", cell: 140, pierFrac: 0.2, archFrac: 0.30, railFrac: 0.09, projFrac: 0.14 } },
    { name: "Stepped Pylons", desc: "Two-step ziggurat parapet on the pylons \u2014 a more overtly Art-Deco crown over the round arcade.",
      cfg: { bal: "round", crown: "step", cell: 68, crownFrac: 0.2 } },
    { name: "Flat-Block Pylons", desc: "Square-topped pylons, no clip \u2014 the quietest, most monolithic bookends; shallow arch.",
      cfg: { bal: "round", crown: "flat", cell: 64, archFrac: 0.14, beamFrac: 0.15 } },
    { name: "Deco Shoulders", desc: "Pronounced angled parapet shoulders on broad pylons \u2014 the most monumental, prewar-civic silhouette.",
      cfg: { bal: "round", crown: "clip", crownClip: 40, pylonFrac: 1.7, crownFrac: 0.2, cell: 72 } },
    { name: "Double-Rail Span", desc: "Two stacked lower rails tie the baluster feet together \u2014 the added structural layering of the original.",
      cfg: { bal: "round", crown: "clip", cell: 68, railFrac: 0.12, doubleRail: true, archFrac: 0.2 } },
    { name: "Civic Colonnade", desc: "Dense, slim round balusters on a shallow arch \u2014 the disciplined, musical rhythm read from a distance.",
      cfg: { bal: "round", crown: "clip", cell: 62, pierFrac: 0.3, archFrac: 0.13 } },
    { name: "Monumental Bays", desc: "A handful of wide round bays between heavy pylons over a deep arch \u2014 grand, sparse cadence.",
      cfg: { bal: "round", crown: "clip", cell: 160, pierFrac: 0.18, pylonFrac: 1.6, archFrac: 0.26 } },
    { name: "Segmental Span", desc: "Shallow segmental baluster tops over a shallow arch \u2014 calm, low, and very horizontal.",
      cfg: { bal: "segmental", crown: "clip", cell: 76, archFrac: 0.16, beamFrac: 0.15 } },
    { name: "Lancet Pylons", desc: "Narrow pointed lancets, beaded beam, pylons and arch intact \u2014 the most vertical, Gothic-civic reading.",
      cfg: { bal: "lancet", crown: "clip", cell: 44, pierFrac: 0.32, beads: true, archFrac: 0.17, beamFrac: 0.16 } }
  ];

  function Card(props) {
    const v = props.v, i = props.i;
    const num = ("0" + (i + 1)).slice(-2);
    return e("div", { className: "card" },
      e("div", { className: "cap" },
        e("span", { className: "num" }, num),
        e("span", { className: "nm" }, v.name),
        e("span", { className: "desc" }, v.desc)),
      e("div", { className: "ctx" },
        e("div", { className: "strip paper" },
          e("div", { className: "friezeholder" }, e(Frieze, { cfg: v.cfg, vw: VW, H: 52, fill: NAVY })),
          e("div", { className: "lbl" }, "Sheet crown \u00b7 navy on limestone")),
        e("div", { className: "strip night" },
          e("div", { className: "friezeholder" }, e(Frieze, { cfg: v.cfg, vw: VW, H: 56, fill: LIGHT })),
          e("div", { className: "lbl" }, "Hero \u00b7 light on night"))));
  }

  function App() {
    return e("div", { className: "wrap" },
      e("div", { className: "head" },
        e("div", { className: "kick" }, "Yankee Stadium \u00b7 1923 \u00b7 Set II"),
        e("h1", null, "Frieze Treatments \u2014 The Pylon Set"),
        e("p", null, "Ten more takes, this set built to the architectural brief: every treatment carries the two heavy end pylons, the flat top beam, the repeating balusters, the thin lower rail, and the broad shallow lower arch that gives the original its unmistakable profile. Same two contexts \u2014 navy on limestone, light on night.")),
      VARIANTS.map((v, i) => e(Card, { key: i, v: v, i: i })));
  }

  ReactDOM.createRoot(document.getElementById("root")).render(e(App));
})();
