/* san-diego-protractor.jsx — San Diego Stadium "Field Dimensions" graphic,
   protractor study following the shared protractor convention: a fixed
   protractor scale reads the field-axis bearing off true north (ENE / 70°);
   the ballpark glyph is ROTATED to match. Here the glyph is the real
   user-supplied stadium aerial (window.SD_STADIUM_PLAN), inked in the spread's
   concrete palette, scaled to fit, and rotated so its center-field opening
   aligns with the bearing needle. Props: lf, cf, rf, orientation, degrees,
   accent. Exposes window.SanDiegoProtractor. Local data only. */
(function () {
  const e = React.createElement;

  // San Diego concrete system (no grass — reads as a drafting instrument)
  const ink = "#2A2722", slate = "#6E6A5E", ink3 = "#8E887A", ink2 = "#564F44";
  const gold = "#B98D3E", goldDeep = "#8A6526", brown = "#5A3A24";
  const paperHi = "#ECE8DD", ruleStrong = "#B3AD9D";

  function rot(p, C, deg) {
    const t = deg * Math.PI / 180, c = Math.cos(t), s = Math.sin(t);
    const dx = p[0] - C[0], dy = p[1] - C[1];
    return [C[0] + dx * c - dy * s, C[1] + dx * s + dy * c];
  }
  function out(p, C, o) {
    const dx = p[0] - C[0], dy = p[1] - C[1], len = Math.hypot(dx, dy) || 1;
    return [p[0] + dx / len * o, p[1] + dy / len * o];
  }
  function polar(C, r, a) { const t = a * Math.PI / 180; return [C[0] + r * Math.sin(t), C[1] - r * Math.cos(t)]; }
  function strip(v) { return (v || "").toString().replace(/\s*ft$/i, ""); }

  function Chip(props) {
    const fs = props.size || 14;
    const w = Math.max(props.minW || 0, props.text.length * fs * 0.62 + (props.padX || 8) * 2), h = 21;
    const tone = props.tone || "paper";
    const fill = tone === "gold" ? gold : paperHi;
    const stk = tone === "gold" ? goldDeep : ruleStrong;
    const col = tone === "gold" ? "#241804" : ink;
    return e("g", null,
      e("rect", { x: props.x - w / 2, y: props.y - h / 2, width: w, height: h, rx: 2.5, fill: fill, stroke: stk, strokeWidth: 1 }),
      e("text", { x: props.x, y: props.y + fs * 0.35, textAnchor: "middle",
        style: { fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: fs + "px", fill: col } }, props.text)
    );
  }

  function SanDiegoProtractor(props) {
    const accent = props.accent || gold;
    const deg = (props.degrees != null) ? props.degrees : 70;     // 0° = due north, CW
    const orientation = props.orientation || "ENE";

    const C = [184, 196], PR = 126;
    // real ballpark glyph: the user-supplied stadium aerial, scaled to fit and
    // rotated so its center-field opening aligns with the bearing on the scale.
    const plan = window.SD_STADIUM_PLAN;
    const Fc = plan ? plan.fieldCenter : [693, 545];
    const planK = 0.38;                  // tuned for the redrawn (slightly larger) bowl
    const planRot = 0;                   // SVG is already correctly oriented — do not rotate
    const planDY = 0;                    // infield center sits exactly on the pivot
    const planXf = "translate(" + C[0] + " " + (C[1] + planDY) + ") rotate(" + planRot +
      ") scale(" + planK + ") translate(" + (-Fc[0]) + " " + (-Fc[1]) + ")";

    // fixed protractor scale: 0..110 around true north, ticks every 10 (big every 30)
    const ticks = [];
    for (let a = 0; a <= 110; a += 10) {
      const big = a % 30 === 0;
      const p1 = polar(C, PR, a), p2 = polar(C, PR - (big ? 13 : 7), a);
      ticks.push(e("line", { key: "t" + a, x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1],
        stroke: big ? slate : ruleStrong, strokeWidth: big ? 1.4 : 0.9, opacity: big ? 0.9 : 0.55 }));
    }
    const nums = [0, 30, 60, 90].map((a, i) => {
      const p = polar(C, PR + 14, a);
      return e("text", { key: "n" + i, x: p[0], y: p[1] + 4, textAnchor: "middle",
        style: { fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "11px", fill: ink3 } }, a);
    });
    const arcA = polar(C, PR, 0), arcB = polar(C, PR, 110);
    const protArc = "M " + arcA[0].toFixed(1) + " " + arcA[1].toFixed(1) +
      " A " + PR + " " + PR + " 0 0 1 " + arcB[0].toFixed(1) + " " + arcB[1].toFixed(1);
    const nBase = polar(C, PR, 0), nlab = polar(C, PR + 14, 0);

    // bearing needle + degree readout
    const ntip = polar(C, PR + 16, deg);
    const back = polar(ntip, 10, deg + 180), hl = polar(back, 4.5, deg - 90), hr = polar(back, 4.5, deg + 90);
    const head = [ntip, hl, hr].map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
    const bc = window.FieldLabels.bearingChip(C, PR + 16, deg, 28, 20);

    // distance chips: CF rides the bearing axis; LF/RF tuck in beside the field
    const chips = [
      { p: polar(C, 62, deg - 57), t: strip(props.lf) },
      { p: polar(C, 104, deg), t: strip(props.cf) },
      { p: polar(C, 67, deg + 60), t: strip(props.rf) }
    ];

    return e("div", { className: "sd-prot-wrap" },
      e("svg", { viewBox: "54 38 312 292", className: "sd-prot-svg", role: "img",
        "aria-label": "Field dimensions plan, field axis oriented " + orientation + " " + deg + " degrees off true north" },

        e("defs", null,
          e("radialGradient", { id: "sdPlanGrad", gradientUnits: "userSpaceOnUse", cx: Fc[0], cy: Fc[1], r: 470 },
            e("stop", { offset: "0", stopColor: "#C9C3B4" }),
            e("stop", { offset: "0.62", stopColor: "#B4AC9A" }),
            e("stop", { offset: "1", stopColor: "#9E9684" }))),

        // real stadium aerial as quiet background fabric (scaled up, low-opacity gradient)
        plan ? e("g", { transform: planXf, opacity: 0.25 },
          plan.paths.map((d, i) => e("path", { key: "pp" + i, d: d, fill: "url(#sdPlanGrad)", fillRule: "evenodd" }))
        ) : null,

        // fixed protractor scale + true-north datum
        e("path", { d: protArc, fill: "none", stroke: ink3, strokeWidth: 1.1, opacity: 0.6 }),
        ticks, nums,
        e("line", { x1: C[0], y1: C[1], x2: nBase[0], y2: nBase[1], stroke: ink2, strokeWidth: 1.1, strokeDasharray: "3 3" }),
        e("text", { x: nlab[0], y: nlab[1] - 9, textAnchor: "middle",
          style: { fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "13px", fill: ink, letterSpacing: ".05em" } }, "N"),

        // bearing needle
        e("line", { x1: C[0], y1: C[1], x2: ntip[0], y2: ntip[1], stroke: accent, strokeWidth: 2.2, strokeLinecap: "round" }),
        e("polygon", { points: head, fill: goldDeep }),
        e("circle", { cx: C[0], cy: C[1], r: 3, fill: accent }),
        e(Chip, { x: bc.x, y: bc.y, text: deg + "\u00b0", size: 13, tone: "gold", padX: 7 }),

        // distance chips
        chips.map((c, i) => e(Chip, { key: "d" + i, x: c.p[0], y: c.p[1], text: c.t, size: 14, tone: c.tone }))
      ),
      e("div", { className: "sd-prot-cap" },
        e("span", null, "FIELD AXIS \u00b7 " + orientation + " (" + deg + "\u00b0)"),
        e("span", null, "DISTANCES IN FEET")
      )
    );
  }

  window.SanDiegoProtractor = SanDiegoProtractor;
})();
