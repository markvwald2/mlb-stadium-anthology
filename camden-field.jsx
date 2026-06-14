/* camden-field.jsx — Oriole Park hero "Field Plan" graphic.
   A restrained, protractor-style schematic drawn as white architectural
   linework over the dark aerial hero. The infield/outfield are drawn upright
   (center field "up"); a small north arrow is offset by the true field
   bearing so the NNE / 31deg orientation reads off the graphic itself —
   subordinate to the photo, never a generic diamond icon.
   Props: lf, cf, rf, orientation, bearing, ink (line color), accent.
   Exposes window.CamdenField. */
(function () {
  const e = React.createElement;

  function CamdenField(props) {
    const ink = props.ink || "#E7E0D0";
    const accent = props.accent || "#E2701F";
    const bearing = (props.bearing != null) ? props.bearing : 31;

    // --- field schematic (upright: home bottom, CF top) ---
    const VB = 196, cx = 98, cy = 132, R = 92;
    const home = [cx, cy + 0];           // home plate
    const lf = [cx - R, cy - R];         // 45deg foul pole left
    const rf = [cx + R, cy - R];         // 45deg foul pole right
    const arc = "M " + lf[0] + " " + lf[1] +
      " A " + (R * 1.414).toFixed(1) + " " + (R * 1.414).toFixed(1) + " 0 0 1 " + rf[0] + " " + rf[1];
    // infield diamond
    const d = 34;
    const first = [cx + d, cy - d], second = [cx, cy - 2 * d], third = [cx - d, cy - d];
    const dia = "M " + home[0] + " " + home[1] + " L " + first[0] + " " + first[1] +
      " L " + second[0] + " " + second[1] + " L " + third[0] + " " + third[1] + " Z";
    const bases = [first, second, third];

    // --- offset north arrow: CF points NNE (bearing deg E of N),
    //     so true North sits `bearing` deg counter-clockwise from "up". ---
    const nx = 30, ny = 36, nlen = 26, na = -bearing; // degrees from vertical
    const rad = na * Math.PI / 180;
    const ntip = [nx + nlen * Math.sin(rad), ny - nlen * Math.cos(rad)];
    const nbase = [nx, ny];
    const ah = 6, aw = 4;
    const back = [ntip[0] - ah * Math.sin(rad), ntip[1] + ah * Math.cos(rad)];
    const left = [back[0] - aw * Math.cos(rad), back[1] - aw * Math.sin(rad)];
    const right = [back[0] + aw * Math.cos(rad), back[1] + aw * Math.sin(rad)];

    function dim(num, lab) {
      return e("div", { className: "cy-fd-dim" },
        e("span", { className: "num" }, num),
        e("span", { className: "lab" }, lab));
    }

    return e("div", { className: "cy-field" },
      e("div", { className: "cy-fd-graphic" },
        e("svg", { viewBox: "0 0 " + VB + " 158", className: "cy-fd-svg", role: "img", "aria-label": "Field plan, oriented " + (props.orientation || "NNE") + " at " + bearing + " degrees" },
          // north arrow (offset by bearing)
          e("line", { x1: nbase[0], y1: nbase[1], x2: ntip[0], y2: ntip[1], stroke: ink, strokeWidth: 1.3, opacity: 0.75 }),
          e("polygon", { points: [ntip, left, right].map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" "), fill: ink, opacity: 0.85 }),
          e("text", { x: nbase[0] - 11, y: nbase[1] + 4, textAnchor: "middle", style: { fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: "13px", fill: ink, opacity: 0.85 } }, "N"),
          // outfield arc + foul lines
          e("path", { d: arc, fill: "none", stroke: ink, strokeWidth: 1.4, opacity: 0.9 }),
          e("line", { x1: home[0], y1: home[1], x2: lf[0], y2: lf[1], stroke: ink, strokeWidth: 1.4, opacity: 0.9 }),
          e("line", { x1: home[0], y1: home[1], x2: rf[0], y2: rf[1], stroke: ink, strokeWidth: 1.4, opacity: 0.9 }),
          // infield diamond + bases
          e("path", { d: dia, fill: "none", stroke: ink, strokeWidth: 1.4, opacity: 0.95 }),
          bases.map((b, i) => e("rect", { key: i, x: b[0] - 2.4, y: b[1] - 2.4, width: 4.8, height: 4.8, fill: ink, opacity: 0.9, transform: "rotate(45 " + b[0] + " " + b[1] + ")" })),
          e("rect", { key: "h", x: home[0] - 2.6, y: home[1] - 2.6, width: 5.2, height: 5.2, fill: accent, transform: "rotate(45 " + home[0] + " " + home[1] + ")" })
        ),
        e("div", { className: "cy-fd-orient" }, e("span", null, bearing + "\u00b0"), e("span", { className: "ol" }, "Orientation \u00b7 " + (props.orientation || "NNE")))
      ),
      e("div", { className: "cy-fd-dims" },
        dim(strip(props.lf), "LF"),
        dim(strip(props.cf), "CF"),
        dim(strip(props.rf), "RF"))
    );

    function strip(v) { return (v || "").toString().replace(" ft", ""); }
  }

  window.CamdenField = CamdenField;
})();
