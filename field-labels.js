/* field-labels.js — shared geometry helpers for stadium field-plan diagrams.
   Pure, frame-agnostic functions. Loaded as plain JS → window.FieldLabels.

   Bearing convention: `deg` is measured CLOCKWISE from true north (straight up),
   matching the book's house polar():
     polar(C, r, deg) = [Cx + r*sin(deg), Cy - r*cos(deg)]   (SVG y is down)

   Placement rules (AUTHORITATIVE — mirrors CLAUDE.md):
   - Degree / bearing chip sits OUTSIDE the arrowhead, biased by the bearing:
       horizontal: RIGHT if sin(deg) >= 0 (eastern parks), else LEFT (mirrored, western)
       vertical:   UP    if cos(deg) >= 0 (deg <= 90 or >= 270), else DOWN
     → NE up-right · SE down-right · SW down-left · NW up-left · deg==90 -> up-right.
   - Center-field chip is centered ON the axis-wall intersection: polar(C, R, deg).

   NOTE on frames: these return positions in the diagram's FINAL (on-screen)
   orientation — correct as-is for the "house protractor" spreads, which rotate the
   field INSIDE the <svg>. For a spread that instead CSS-rotates the whole figure
   (e.g. Dodger v2), inverse-rotate the returned point by -figureRotation about the
   figure centre and counter-rotate the label, since its <svg> coords are upright. */
(function () {
  function polar(C, r, deg) {
    var t = deg * Math.PI / 180;
    return [C[0] + r * Math.sin(t), C[1] - r * Math.cos(t)];
  }

  // Arrowhead / bearing-needle tip.
  function needleTip(C, tipRadius, deg) { return polar(C, tipRadius, deg); }

  // Center-field axis ∩ outfield wall — chip is centered here.
  function cfWallPoint(C, R, deg) { return polar(C, R, deg); }

  // Degree / bearing chip placement relative to the arrowhead.
  // gapX / gapY = offset (viewBox units) from the tip to the chip CENTRE.
  // Returns { x, y, anchor, east, up }; anchor ("start"/"end") is for
  // left/right-anchored text — centre-anchored chips can just use {x, y}.
  function bearingChip(C, tipRadius, deg, gapX, gapY) {
    var tip = polar(C, tipRadius, deg);
    var east = Math.sin(deg * Math.PI / 180) >= 0;
    var up = Math.cos(deg * Math.PI / 180) >= 0;
    return {
      x: tip[0] + (east ? gapX : -gapX),
      y: tip[1] + (up ? -gapY : gapY),
      anchor: east ? "start" : "end",
      east: east, up: up
    };
  }

  window.FieldLabels = {
    polar: polar,
    needleTip: needleTip,
    cfWallPoint: cfWallPoint,
    bearingChip: bearingChip
  };
})();
