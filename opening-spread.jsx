/* opening-spread.jsx — the opening two-page spread (inside cover + page one).
   Two cover-style cream grids, one per page, on a 2550 × 1088 design canvas.
   Each page mirrors the front cover: a 4×4 grid of ballpark photo cells with
   captions, the center two cells (row 3, cols 2–3) holding the wordmark block.
   No module crosses the fold (x = 1275); each grid belongs to exactly one page.
   window.OpeningSpread  */
(function () {
  const D = window.OPENING_DATA;

  // grid-area placement for 14 parks in a 4×4 grid — row 3 cols 2–3 = title.
  // (identical to the front cover's PLACE map)
  const PLACE = [
    { r: 1, c: 1 }, { r: 1, c: 2 }, { r: 1, c: 3 }, { r: 1, c: 4 },
    { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 },
    { r: 3, c: 1 },                                   { r: 3, c: 4 },
    { r: 4, c: 1 }, { r: 4, c: 2 }, { r: 4, c: 3 }, { r: 4, c: 4 }
  ];

  // slots still awaiting a (high-res) photo — no `src` so the empty
  // placeholder shows instead of a broken image. Remove a slot here once its
  // images/opening/<slot>.jpg is in place.
  const NO_PHOTO = {};

  // slots whose photo file was replaced post-publish: point at a fresh filename
  // so the serve layer can't hand back a stale-cached copy of the old path.
  const SRC_OVERRIDE = {
    "op-l02": "images/opening/op-l02-v2.jpg",
    "op-l04": "images/opening/op-l04-v2.jpg",
    "op-l14": "images/opening/op-l14-v2.jpg",
  };

  function Cell(props) {
    const p = props.park, pl = props.place;
    const slotProps = {
      id: p.slot,
      shape: "rect",
      placeholder: "Aerial \u2014 " + p.name
    };
    if (!NO_PHOTO[p.slot]) slotProps.src = SRC_OVERRIDE[p.slot] || ("images/opening/" + p.slot + ".jpg");
    return React.createElement("figure", {
      className: "op-cell",
      style: { gridColumn: pl.c, gridRow: pl.r }
    },
      React.createElement("div", { className: "op-photo" },
        React.createElement("image-slot", slotProps)
      ),
      React.createElement("figcaption", { className: "op-cap" },
        p.city
          ? [p.name + ", ", React.createElement("span", { className: "op-cap-city", key: "c" }, p.city)]
          : p.name
      )
    );
  }

  function Page(props) {
    const parks = props.parks;
    return React.createElement("div", {
      className: "op-page op-" + props.side,
      "data-screen-label": props.label
    },
      React.createElement("div", { className: "op-grid" },
        parks.map(function (p, i) {
          return React.createElement(Cell, { key: p.slot, park: p, place: PLACE[i] });
        }),
        React.createElement("div", {
          className: "op-titleblock",
          style: { gridColumn: "2 / 4", gridRow: 3 }
        },
          React.createElement(window.CoverLogo, { iconHeight: 60, title: props.title })
        )
      )
    );
  }

  function OpeningSpread() {
    return React.createElement("div", { className: "op-spread", "data-screen-label": "Opening page" },
      React.createElement(Page, { side: "left", parks: D.left, label: "Inside cover", title: D.titleLeft })
    );
  }

  window.OpeningSpread = OpeningSpread;
})();
