/* jack-collection.jsx — "Direction B" collection opener.
   Headline-as-concept + one-sentence deck, a dense documentary photo mosaic
   (the hero, user-filled image-slots), a hairline divider, and a five-part
   "Generations of the Game" key (one elevation drawing + park list each).
   Reads JACK_COLLECTION. Exports JackCollectionPage / JackCollectionSpread. */
(function () {
  var D = window.JACK_COLLECTION;
  var e = React.createElement;

  function Head() {
    return e("header", { className: "jc-head" },
      e("h1", { className: "jc-headline" },
        e("span", { className: "jc-hl-a" }, D.headline.a),
        e("span", { className: "jc-hl-dot" }, "\u2022"),
        e("span", { className: "jc-hl-b" }, D.headline.b)),
      e("p", { className: "jc-deck" }, D.deck));
  }

  function Mosaic() {
    return e("section", { className: "jc-mosaic" },
      D.mosaic.map(function (m) {
        return e("div", { className: "jc-tile", style: { gridColumn: m.gc, gridRow: m.gr }, key: m.id },
          e("image-slot", { id: m.id, shape: "rect", placeholder: m.ph }));
      }));
  }

  function Generations() {
    return e("section", { className: "jc-gen" },
      e("div", { className: "jc-gen-head" },
        e("span", { className: "jc-gen-rule" }),
        e("span", { className: "jc-gen-title" }, "Stadium Eras"),
        e("span", { className: "jc-gen-rule" })),
      e("div", { className: "jc-gen-cols" },
        D.generations.map(function (g, i) {
          return e("div", { className: "jc-gen-col", key: i },
            e("div", { className: "jc-gen-era-name", style: { color: g.accent } }, g.title),
            e("div", { className: "jc-gen-era-desc" }, g.desc),
            e("div", { className: "jc-gen-draw" },
              e("image-slot", { id: g.slot, shape: "rect", placeholder: "elevation drawing" })),
            e("div", { className: "jc-gen-parks" },
              g.parks.map(function (p, j) {
                return e(React.Fragment, { key: j },
                  j ? e("span", { className: "jc-gen-sep" }, " \u00b7 ") : null,
                  e("span", { className: "jc-gen-park" }, p));
              }),
              g.more ? e("span", { className: "jc-gen-more" }, " \u0026 " + g.more + " others") : null));
        })));
  }

  function JackCollectionPage() {
    return e("div", { className: "jc-page", "data-screen-label": "Collection opener \u2014 All 30 current ballparks" },
      e("div", { className: "jc-inner" },
        e(Head, null),
        e(Mosaic, null),
        e(Generations, null)));
  }

  function JackCollectionSpread() {
    return e("div", { style: { position: "relative", width: "2550px", height: "1088px", background: "#e9e7db" } },
      e("div", { style: { position: "absolute", left: "0", top: "0", width: "1275px", height: "1088px" } },
        e(JackCollectionPage, null)));
  }

  window.JackCollectionPage = JackCollectionPage;
  window.JackCollectionSpread = JackCollectionSpread;
})();
