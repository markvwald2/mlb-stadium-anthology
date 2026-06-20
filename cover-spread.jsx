/* cover-spread.jsx — the front cover: a 4×3 grid of ballpark photo cells over
   warm cream paper. The two center cells (row 2, columns 2–3) are left open
   to hold the "Big League NL ◇ AL Ballparks" wordmark.
   window.CoverSpread — rendered on a single 1275 × 1088 page. */
(function () {
  const D = window.COVER_DATA;

  // grid-area placement for each of the 14 parks (row / col, 1-indexed) in a
  // 4×4 grid. Row 3 cols 2–3 are the title block, flanked by one photo each side.
  const PLACE = [
    { r: 1, c: 1 }, { r: 1, c: 2 }, { r: 1, c: 3 }, { r: 1, c: 4 },
    { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 },
    { r: 3, c: 1 },                                   { r: 3, c: 4 },
    { r: 4, c: 1 }, { r: 4, c: 2 }, { r: 4, c: 3 }, { r: 4, c: 4 }
  ];

  function Cell(props) {
    const p = props.park, pl = props.place;
    return React.createElement("figure", {
      className: "cv-cell cv-c" + pl.c,
      style: { gridColumn: pl.c, gridRow: pl.r }
    },
      React.createElement("div", { className: "cv-photo" },
        React.createElement("image-slot", {
          id: p.slot,
          shape: "rect",
          src: "images/cover/" + p.slot + ".jpg",
          placeholder: "Aerial \u2014 " + p.name
        })
      ),
      React.createElement("figcaption", { className: "cv-cap" },
        p.city
          ? [p.name + ", ", React.createElement("span", { className: "cv-cap-city", key: "c" }, p.city)]
          : p.name
      )
    );
  }

  function CoverSpread() {
    return React.createElement("div", { className: "cv-cover", "data-screen-label": "Front cover" },
      React.createElement("div", { className: "cv-grid" },
        D.parks.map(function (p, i) {
          return React.createElement(Cell, { key: p.slot, park: p, place: PLACE[i] });
        }),
        // open title block — center two cells of row 3
        React.createElement("div", { className: "cv-titleblock", style: { gridColumn: "2 / 4", gridRow: 3 } },
          React.createElement(window.CoverLogo, { iconHeight: 60 })
        )
      )
    );
  }

  window.CoverSpread = CoverSpread;
})();
