/* suntrust-spread.jsx — the SunTrust Park spread, "The Anchor Tenant."
   Reads window.SUNTRUST + window.SunTrustProtractor + window.SunTrustDistrict.
   LEFT  page: full-bleed aerial hero — the open-air bowl embedded in The
   Battery's red-brick / precast / steel-canopy district — with a compact
   signage-style title block.
   RIGHT page: warm precast-stone paper read as a development SITE PLAN. A
   five-well district photo row and a metadata ribbon sit up top; a parcel grid
   of STADIUM FACTS, VISIT & GAME, and the BATTERY ATLANTA site-plan instrument;
   then a ground band carrying the unified STADIUM CONTEXT beside the
   DEVELOPMENT & LIFE CYCLE parcel. Every module belongs to one page; nothing
   sits in the gutter; photo plates carry no caption. Every populated field
   renders exactly once. Codex is the factual authority. */
(function () {
  const e = React.createElement;
  const D = window.SUNTRUST;
  const Protractor = window.SunTrustProtractor;

  function Slot(props) {
    return e("image-slot", Object.assign({
      id: props.id, placeholder: props.placeholder, shape: props.shape || "rect"
    }, props.src ? { src: props.src } : {}, props.style ? { style: props.style } : {}));
  }

  function SecHead(props) {
    return e("div", { className: "st-h" + (props.scarlet ? " scarlet" : "") },
      e("span", { className: "t" }, props.title),
      props.note ? e("span", { className: "n" }, props.note) : null);
  }

  function factRow(row, i) {
    var vsStyle = row[0] === "Location" ? { letterSpacing: "-0.6px" } : null;
    return e("div", { className: "st-frow", key: i },
      e("div", { className: "k" }, row[0]),
      e("div", { className: "v" },
        e("span", { className: "vm" }, row[1]),
        row[2] ? e("span", { className: "vs", style: vsStyle }, row[2]) : null));
  }

  function wxCell(value, label) {
    return e("div", { className: "st-wcell" },
      e("div", { className: "wl" }, label),
      e("div", { className: "wv" }, value));
  }

  function LineScore(box) {
    const cols = [];
    for (let i = 1; i <= box.innings; i++) cols.push(i);
    function row(t, win) {
      return e("tr", { className: win ? "win" : "" },
        e("td", { className: "tm" }, t.abbr),
        t.byInning.map((n, i) => e("td", { key: i, className: "inn" + (n !== 0 && n !== "x" ? " sc" : "") }, n)),
        e("td", { className: "rcol sep" }, t.r),
        e("td", { className: "hecol" }, t.h),
        e("td", { className: "hecol" }, t.e));
    }
    return e("table", { className: "st-box" },
      e("thead", null, e("tr", null,
        e("th", { className: "tm" }, ""),
        cols.map((n) => e("th", { key: n, className: "inn" }, n)),
        e("th", { className: "sep" }, "R"), e("th", null, "H"), e("th", null, "E"))),
      e("tbody", null,
        row(box.away, box.away.r > box.home.r),
        row(box.home, box.home.r > box.away.r)));
  }

  function ribCell(label, value, opts) {
    opts = opts || {};
    return e("div", { className: "cell" + (opts.coords ? " coords" : "") + (opts.wide ? " wide" : "") },
      e("div", { className: "rl" }, label),
      opts.logo
        ? e("div", { className: "rv withlogo" },
            e("img", { className: "rib-mk", src: opts.logo, alt: "" }), e("span", null, value))
        : e("div", { className: "rv" }, value, opts.sub ? e("span", { className: "rsub" }, opts.sub) : null));
  }

  function Spread() {
    const P = D.pitching;
    return e("div", { className: "st-spread", "data-screen-label": "SunTrust Park spread" },

      /* ================= LEFT PAGE / HERO ================= */
      e("div", { className: "st-page st-left", "data-screen-label": "SunTrust Park \u2014 hero" },
        e("div", { className: "st-hero-slot" },
          e(Slot, { id: "suntrust-hero", src: "images/suntrust/hero.jpg", placeholder: "Drop the SunTrust Park hero \u2014 high aerial of the open-air bowl embedded in The Battery: red-brick & precast facade, steel seating-bowl canopy, plaza frontage, structured parking, freeway-edge arrival" })),
        e("div", { className: "st-hero-scrim" }),

        e("img", { className: "st-hero-logo", src: "assets/atlanta-braves-logo.svg", alt: "Atlanta Braves" }),
        e("div", { className: "st-folio" }, "VISIT " + D.visit_order + " / " + D.visit_total),
        e("div", { className: "st-spine" }, "EST. " + D.est + "  \u00b7  THE BATTERY ATLANTA  \u00b7  VISIT " + D.visit_order),

        e("div", { className: "st-hero-title" },
          e("div", { className: "st-eyebrow" }, "EDGE-CITY BALLPARK \u00b7 CUMBERLAND, GEORGIA"),
          D.name_lines.map((ln, i) => e("h1", { className: "st-name", "data-t": ln, key: i }, ln)),
          e("div", { className: "st-sub" },
            e("span", { className: "st-rule" }),
            e("span", { className: "txt" }, D.district)),
          e("div", { className: "st-coords" },
            e("span", null, D.coordinates_n), e("span", { className: "dot" }, "\u00b7"),
            e("span", null, D.coordinates_w), e("span", { className: "dot" }, "\u00b7"),
            e("span", null, "ELEV. " + D.elevation))),

        e("div", { className: "st-marks" },
          e("img", { className: "mlb", src: "assets/mlb-logo.svg", alt: "Major League Baseball" }),
          e("span", { className: "divln" }),
          e("span", { className: "dv" }, D.league + " \u00b7 " + D.division))
      ),

      /* ================= RIGHT PAGE / THE SITE PLAN ================= */
      e("div", { className: "st-page st-right", "data-screen-label": "SunTrust Park \u2014 the site plan" },
        e("div", { className: "st-rp" },

          /* ---- top metadata ribbon ---- */
          e("div", { className: "st-ribbon" },
            ribCell("Team", D.team_short, { logo: "assets/atlanta-braves-logo.svg", wide: true }),
            ribCell("League", D.league, { logo: "assets/nl-logo.png" }),
            ribCell("Division", D.division),
            ribCell("Years Active", D.years_active),
            ribCell("Status", D.status),
            ribCell("Capacity", D.capacity_ribbon, { sub: D.capacity_note }),
            e("div", { className: "cell feature" },
              e("div", { className: "rl" }, "Visit No."),
              e("div", { className: "rv feat" },
                e("span", { className: "fnum" }, D.visit_order),
                e("span", { className: "fof" }, "/ " + D.visit_total)))),

          /* ---- upper district photo row: five 4:3 wells, no captions ---- */
          e("div", { className: "st-pstrip" },
            [["images/suntrust/p1.jpg", "Aerial / exterior \u2014 red brick, precast stone & steel canopy"],
             ["images/suntrust/p2.jpg", "Seating bowl \u2014 open-air, field & canopy rhythm"],
             ["images/suntrust/p3.jpg", "Scoreboard / videoboard"],
             ["images/suntrust/p4.jpg", "The Battery \u2014 plaza storefront & public realm"],
             ["images/suntrust/p5.jpg", "Construction \u2014 steel frame, c. 2016"]].map(function (row, i) {
              return e("div", { className: "st-pcell", key: i },
                e(Slot, { id: "st-strip-" + (i + 1), src: row[0], placeholder: row[1] }));
            })),

          /* ---- parcel grid: facts | visit & game | the Battery site plan ---- */
          e("div", { className: "st-parcels" },

            /* PARCEL A — STADIUM FACTS */
            e("div", { className: "st-parcel facts" },
              e(SecHead, { title: "Stadium Facts", note: "BUILDING RECORD" }),
              e("div", { className: "st-facts" }, D.facts.map(factRow))),

            /* PARCEL B — VISIT & GAME */
            e("div", { className: "st-parcel game" },
              e(SecHead, { title: "Visit & Game", note: "FEATURED \u00b7 " + D.visit_order + " OF " + D.visit_total, scarlet: true }),
              e("div", { className: "st-vtitle" },
                e("span", { className: "vt-note" }, D.visit_headline_note),
                e("span", { className: "vt-date" }, D.visit_headline_date)),
              e("div", { className: "st-visitinfo" }, D.visit.map(factRow)),
              e("div", { className: "st-result" },
                e("span", { className: "rscore" }, D.result),
                e("span", { className: "ratt" }, "ATT. " + D.attendance)),
              e("div", { className: "st-scorewrap" },
                LineScore(D.box),
                e("div", { className: "st-dec" },
                  e("p", { className: "decline" },
                    e("i", null, P.away), " (" + P.away_team + ") ",
                    e("span", { className: "vs" }, "vs"), " ",
                    e("i", null, P.home), " (" + P.home_team + ") \u00b7 ",
                    e("b", null, "W"), " ", e("i", null, P.win), "\u2003",
                    e("b", null, "L"), " ", e("i", null, P.loss)))),
              e("div", { className: "st-wx" },
                e(SecHead, { title: "Conditions", note: "AT GAME TIME", scarlet: true }),
                e("div", { className: "st-wx-row" },
                  wxCell(D.weather.temperature, "Temp"),
                  wxCell(D.weather.conditions, "Sky"),
                  wxCell(D.weather.wind, "Wind"),
                  wxCell(D.weather.humidity, "Humidity")))),

            /* PARCEL C — FIELD & ORIENTATION */
            e("div", { className: "st-parcel field" },
              e(SecHead, { title: "Field & Orientation", note: D.field.orientation + " " + D.field.degrees + "\u00b0 \u00b7 OPEN-AIR BOWL" }),
              e("figure", { className: "st-fieldfig" },
                Protractor ? e(Protractor, { lf: D.field.left_field, cf: D.field.center_field,
                  rf: D.field.right_field, orientation: D.field.orientation, degrees: D.field.degrees }) : null),
              e("div", { className: "st-logos" },
                e("div", { className: "st-logocell" }, e("img", { src: "assets/atlanta-braves-logo.svg", alt: "Atlanta Braves" })),
                e("div", { className: "st-logocell" }, e("img", { src: "assets/mlb-logo.svg", alt: "Major League Baseball" })),
                e("div", { className: "st-logocell" }, e("img", { src: "assets/nl-logo.png", alt: "National League" }))))),

          /* ---- ground band: unified context + development/life-cycle parcel ---- */
          e("div", { className: "st-ground" },
            e("div", { className: "st-context" },
              e(SecHead, { title: "Inside the Battery", note: "BALLPARK \u2192 DISTRICT" }),
              e("div", { className: "st-prose" },
                D.stadium_context.map((p, i) => e("p", { key: i }, p)))),
            e("div", { className: "st-lifecycle" },
              e(SecHead, { title: "Development & Life Cycle", note: "ECONOMICS", scarlet: true }),
              (function () {
                const lc = D.lifecycle.filter(r => r[0] !== "Financing" && r[0] !== "Status");
                return e("div", { className: "st-lc-cols" },
                  e("div", { className: "st-lc-col" }, lc.slice(0, 4).map(factRow)),
                  e("div", { className: "st-lc-col" }, lc.slice(4).map(factRow)));
              })(),
              (function () {
                const fin = D.lifecycle.find(r => r[0] === "Financing");
                return fin ? e("div", { className: "st-finnote" },
                  e("span", { className: "fk" }, "Financing"),
                  e("span", { className: "fv" }, fin[1] + " \u2014 " + fin[2])) : null;
              })()))
        )
      )
    );
  }

  window.SunTrustParkSpread = Spread;
})();
