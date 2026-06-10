/* cover-logo.jsx — the "Big League NL ◇ AL Ballparks" wordmark, recreated
   from the source poster: Cooper Black display type with a baseball-field
   icon (home plate bottom-center, foul lines fanning to the outfield arc,
   a dark slate infield diamond with a center mound dot) set between NL and AL.
   window.CoverLogo */
(function () {
  // baseball-field icon — circular sector (fan) centered at home plate, a
  // stroked pitcher's-mound circle, and the infield diamond taken verbatim
  // from the user-supplied infield.svg (each corner cut by an inward notch,
  // notch edges at 90° to the long sides). That path is centered at
  // (383.5,546.5) with a 120.205 half-diagonal in its 842-unit space; here it
  // is scaled (k = 37/120.205) and translated to icon center (84,67).
  function FieldIcon(props) {
    const h = props.height || 84;
    const INK = "#14110d";
    const cx = 84, cy = 67, R = 98;
    const apex = [84, 109.44];                           // home plate (diamond's projected bottom corner)
    const th = 45 * Math.PI / 180;                       // foul lines at ±45° = parallel to infield baselines, meeting at 90°
    const lx = cx - R * Math.sin(th), ly = apex[1] - R * Math.cos(th);
    const rx = cx + R * Math.sin(th), ry = ly;
    // infield.svg, normalized to this icon's space, scaled 0.85 about center (84,67)
    const diamond = "M 52.6 71.6 L 57.1 67.0 L 52.6 62.4 L 79.4 35.6 L 84.0 40.1 L 88.6 35.6 " +
      "L 115.5 62.4 L 110.9 67.0 L 115.5 71.6 L 88.6 98.5 L 84.0 93.9 L 79.4 98.5 Z";
    return React.createElement("svg", {
      className: "cv-fieldicon",
      viewBox: "0 0 168 120",
      height: h,
      "aria-hidden": "true",
      style: { display: "block", overflow: "visible" }
    },
      // outfield arc (fence)
      React.createElement("path", {
        d: "M " + lx.toFixed(1) + " " + ly.toFixed(1) + " A " + R + " " + R + " 0 0 1 " + rx.toFixed(1) + " " + ry.toFixed(1),
        fill: "none", stroke: INK, strokeWidth: 2.4
      }),
      // foul lines (radii from home plate)
      React.createElement("path", {
        d: "M " + apex[0] + " " + apex[1] + " L " + lx.toFixed(1) + " " + ly.toFixed(1) +
           " M " + apex[0] + " " + apex[1] + " L " + rx.toFixed(1) + " " + ry.toFixed(1),
        fill: "none", stroke: INK, strokeWidth: 2.4, strokeLinecap: "round"
      }),
      // infield diamond (verbatim from infield.svg)
      React.createElement("path", {
        d: diamond,
        fill: "#5b6675", stroke: INK, strokeWidth: 2.4, strokeLinejoin: "round"
      }),
      // pitcher's mound — light circle with a dark stroke ring
      React.createElement("circle", {
        cx: cx, cy: cy, r: 4.6, fill: "#edeae1", stroke: INK, strokeWidth: 1.8
      })
    );
  }

  function CoverLogo(props) {
    const t = (window.COVER_DATA && window.COVER_DATA.title) ||
      { l1: "Big League", l2a: "NL", l2b: "AL", l3: "Ballparks" };
    return React.createElement("div", { className: "cv-logo" },
      React.createElement("div", { className: "cv-logo-l1" }, t.l1),
      React.createElement("div", { className: "cv-logo-l2" },
        React.createElement("span", { className: "cv-nl" }, t.l2a),
        React.createElement(FieldIcon, { height: props.iconHeight || 92 }),
        React.createElement("span", { className: "cv-al" }, t.l2b)
      ),
      React.createElement("div", { className: "cv-logo-l3" }, t.l3)
    );
  }

  window.CoverLogo = CoverLogo;
})();
