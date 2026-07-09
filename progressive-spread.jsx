/* progressive-spread.jsx — Progressive Field anthology spread.
   Concept: "The Gateway Frame" — an engineering-drawing of an exposed-steel
   ballpark. The right page is a thin steel drafting frame (double-line members,
   ruler ticks, bolted corner targets, splice plates) carving THREE structural
   bays: Ballpark Identity, Stadium Context, Visit / Game Data. The left page is
   a full-bleed hero with a fabricated-steel sign-band title and a faint cyan
   drafting overlay. Reads window.PROG, window.ProgProtractor. Charcoal /
   steel-white / steel drafting line; navy + brick red are restrained accents.
   ALL facts come from window.PROG (the Codex payload); the concept render is
   visual direction only and contributes NO data. */
(function () {
  const e = React.createElement;
  const D = window.PROG;
  const Prot = window.ProgProtractor;

  function Slot(props) {
    return e("image-slot", { id: props.id, placeholder: props.placeholder, shape: "rect", src: props.src });
  }

  /* engineering drafting frame: perimeter double line, ruler ticks, corner
     registration targets, two vertical dividers with bolted splice plates */
  function Frame() {
    const corners = [["tl", 44, 42], ["tr", 1231, 42], ["bl", 44, 1046], ["br", 1231, 1046]];
    const splices = [60, 545, 1030];
    return e("div", { className: "pf-frame", "aria-hidden": "true" },
      e("div", { className: "pf-edge outer" }),
      e("div", { className: "pf-edge inner" }),
      e("div", { className: "pf-ticks top" }),
      e("div", { className: "pf-ticks bottom" }),
      e("div", { className: "pf-ticks left" }),
      e("div", { className: "pf-ticks right" }),
      [438, 867].map((x, di) =>
        e("div", { key: "d" + di, className: "pf-div", style: { left: x } },
          splices.map((y, si) => e("div", { key: si, className: "pf-splice", style: { top: y } },
            e("span", { className: "rv t" }), e("span", { className: "rv b" }))))),
      corners.map((c) => e("div", { key: c[0], className: "pf-corner " + c[0], style: { left: c[1], top: c[2] } },
        e("span", { className: "h" }), e("span", { className: "v" }),
        e("span", { className: "rv a" }), e("span", { className: "rv b" }),
        e("span", { className: "rv c" }), e("span", { className: "rv d" })))
    );
  }

  /* ---- small building blocks ---- */
  function ColHead(t) { return e("div", { className: "pf-colh" }, t); }
  function SubHead(t) { return e("div", { className: "pf-subh" }, t); }
  function MidHead(t) { return e("div", { className: "pf-midh" }, t); }
  function StackRow(k, v, hot) {
    const lng = v.length > 40;
    return e("div", { className: "pf-stack" },
      e("div", { className: "k" }, k),
      e("div", { className: "v" + (hot ? " hot" : "") + (lng ? " lng" : "") }, v));
  }
  function InlineRow(k, v, hot) {
    return e("div", { className: "pf-inline" },
      e("div", { className: "k" }, k),
      e("div", { className: "v" + (hot ? " hot" : "") }, v));
  }

  function LineScore(box) {
    const heads = []; for (let i = 1; i <= box.innings; i++) heads.push(i);
    function row(t, win) {
      return e("tr", { className: win ? "win" : "" },
        e("td", { className: "tm" }, t.abbr),
        t.byInning.map((n, i) => e("td", { key: i, className: n === 0 ? "z" : "" }, n)),
        e("td", { className: "rhe sep" }, t.r),
        e("td", { className: "rhe" }, t.h),
        e("td", { className: "rhe" }, t.e));
    }
    return e("table", { className: "pf-box" },
      e("thead", null,
        e("tr", null,
          e("th", { className: "tm" }, ""),
          heads.map((n) => e("th", { key: n }, n)),
          e("th", { className: "sep" }, "R"), e("th", null, "H"), e("th", null, "E"))),
      e("tbody", null,
        row(box.away, box.away.r > box.home.r),
        row(box.home, box.home.r > box.away.r)));
  }

  function Spread() {
    return e("div", { className: "pf-spread", "data-screen-label": "Progressive Field spread" },

      /* ===================== LEFT PAGE / HERO ===================== */
      e("div", { className: "pf-page pf-left", "data-screen-label": "Progressive Field hero" },
        e("div", { className: "pf-hero-slot" },
          e(Slot, { id: "prog-hero", src: "images/progressive/progressive-field-00-main-03ebb94f.jpg", placeholder: "Drop the Progressive Field hero \u2014 painted exposed steel, light towers, seating bowl, downtown Cleveland skyline beyond the outfield" })),
        e("div", { className: "pf-hero-scrim" }),

        /* faint cyan drafting overlay */
        e("div", { className: "pf-draft", "aria-hidden": "true" },
          e("div", { className: "pf-dlabel elev" },
            e("span", { className: "lead" }), e("span", null, "ELEV. 650'\u20130\"")),
          e("div", { className: "pf-dlabel gridn" }, "GRID N")),

        e("div", { className: "pf-hero-folio" },
          e("span", null, D.folio)),

        /* fabricated-steel sign band title */
        e("div", { className: "pf-band" },
          e("span", { className: "rail t" }), e("span", { className: "rail b" }),
          e("span", { className: "star l" }, "\u2605"),
          e("h1", { className: "pf-band-name" }, "Progressive Field"),
          e("span", { className: "star r" }, "\u2605")),
        e("div", { className: "pf-subplate" },
          e("span", { className: "city" }, D.city + ", " + D.state)),

        /* coordinates / elevation / address — survey footer strip (no box) */
        e("div", { className: "pf-geofoot" },
          e("div", { className: "grp l" },
            e("span", { className: "tick" }),
            e("span", null, D.coordinates_n + "  \u00b7  " + D.coordinates_w),
            e("span", { className: "seg" }, "ELEV " + D.elevation.toUpperCase())),
          e("div", { className: "grp r" },
            e("span", { className: "loc" }, D.location.toUpperCase()),
            e("span", { className: "addr" }, D.address.toUpperCase())))
      ),

      /* ===================== RIGHT PAGE / DRAFTING FRAME ===================== */
      e("div", { className: "pf-page pf-right", "data-screen-label": "Progressive Field data elevation" },
        e(Frame),
        e("div", { className: "pf-cols" },

          /* ---------- COLUMN 1 · BALLPARK IDENTITY ---------- */
          e("div", { className: "pf-col col-id" },
            ColHead("Ballpark Identity"),
            e("div", { className: "pf-logos" },
              e("img", { className: "team", src: "assets/cleveland-indians-logo.svg", alt: "Cleveland franchise mark" }),
              e("img", { className: "mlb", src: "assets/mlb-logo.svg", alt: "Major League Baseball" }),
              e("img", { className: "lg", src: "assets/american-league-logo.png", alt: "American League" })),
            e("div", { className: "pf-idline" }, D.team_full + " \u00b7 " + D.division),

            StackRow("Years Active", "1994\u2013Present \u00b7 Active"),
            e("div", { className: "pf-stack pf-stack-pair" },
              e("div", { className: "sp-cell" },
                e("div", { className: "k" }, "Construction Start"),
                e("div", { className: "v hot" }, D.construction_start)),
              e("div", { className: "sp-cell" },
                e("div", { className: "k" }, "Opened"),
                e("div", { className: "v hot" }, D.opening_day))),
            StackRow("Construction Cost", D.stadium_cost + " (" + D.stadium_cost_adjusted + " adjusted)", true),
            StackRow("Capacity", "34,820 (originally 42,865)"),
            StackRow("Surface", "Natural grass (Kentucky bluegrass)"),
            StackRow("All-Star Games", D.all_star_games),

            e("figure", { className: "pf-id-photo" },
              e(Slot, { id: "prog-p2", src: "images/progressive/progressive-field-03.jpg", placeholder: "Painted exposed steel / brick structural detail" })),

            StackRow("Architect", "HOK Sport", true),
            StackRow("Type / Roof", "Open-air baseball-only ballpark \u00b7 Open Air"),
            StackRow("Style / Era", "Retro-classic modern downtown ballpark with industrial steel expression"),
            StackRow("Facade", D.facade_material),
            StackRow("Renovations", "Major 2015-2016 renovation; additional 2020s renovations to upper deck, social spaces, club areas, bullpens, and neighborhood connections", true),
            e("div", { className: "pf-stack" },
              e("div", { className: "k" }, "Preceded By"),
              e("div", { className: "v" },
                e("div", null, "League Park (1890\u20131931)"),
                e("div", null, "Cleveland Municipal Stadium (1932\u20131993)"))),
            StackRow("Financing", D.financing_method)),

          /* ---------- COLUMN 2 · STADIUM CONTEXT ---------- */
          e("div", { className: "pf-col col-ctx" },
            ColHead("The Toothbrush Towers"),
            e("div", { className: "pf-ctx" },
              e("p", { style: { lineHeight: 1.45, fontWeight: 600 } }, D.context[0]),
              e("figure", { className: "pf-ctx-photo" },
                e(Slot, { id: "prog-p1", src: "images/progressive/progressive-field-01.jpg", placeholder: "Bowl + downtown skyline beyond the outfield at dusk" })),
              e("p", { style: { lineHeight: 1.45 } }, D.context[1]),
              e("p", { style: { lineHeight: 1.45 } }, D.context[2]),
              e("p", { style: { lineHeight: 1.45 } }, D.context[3]),
              SubHead("Name History"),
              e("div", { className: "pf-names" },
                e("div", null, "Jacobs Field ", e("span", { className: "yr" }, "(1994\u20132007)")),
                e("div", { className: "cur" }, "Progressive Field ", e("span", { className: "yr" }, "(2008\u2013present)"))))),

          /* ---------- COLUMN 3 · VISIT / GAME DATA ---------- */
          e("div", { className: "pf-col col-game" },
            e("div", { className: "pf-colh wtag" },
              e("span", { className: "ttl" }, "Visit / Game Data"),
              e("span", { className: "tag" }, D.visit_order + " of 42")),
            e("div", { className: "pf-data" },
              InlineRow("Trip", D.trip_name),
              InlineRow("Visit Date", D.featured_day + ", " + D.featured_date),
              InlineRow("First Pitch", D.first_pitch),
              InlineRow("Game Type", D.game_type),
              InlineRow("Weather", D.weather.temperature + " \u00b7 " + D.weather.conditions),
              InlineRow("Wind / Hum.", D.weather.wind + " \u00b7 " + D.weather.humidity),
              InlineRow("Attendance", D.attendance),
              InlineRow("Duration", D.game_duration),
              InlineRow("Visit Order", String(D.visit_order)),
              InlineRow("Other Visit", D.first_visit)),

            e("div", { className: "pf-matchup oneline" },
              e("span", { className: "pn" }, "Philip Humber ", e("span", { className: "tm" }, "(CWS)")),
              e("span", { className: "vs" }, "vs"),
              e("span", { className: "pn" }, "Jeanmar Gomez ", e("span", { className: "tm" }, "(CLE)"))),

            e("div", { className: "pf-result-line" },
              e("img", { className: "rl-logo", src: "assets/cleveland-indians-logo.svg", alt: "" }),
              e("span", { className: "rl-text" }, D.result_line),
              e("img", { className: "rl-logo", src: "assets/chicago-white-sox-logo.svg", alt: "" })),
            e("div", { className: "pf-score" }, LineScore(D.box)),

            e("div", { className: "pf-results oneline" },
              e("div", { className: "rr" }, e("span", { className: "d" }, "W"), e("span", { className: "nm" }, "Jeanmar Gomez")),
              e("div", { className: "rr" }, e("span", { className: "d" }, "L"), e("span", { className: "nm" }, "Philip Humber"))),

            e("figure", { className: "pf-fieldplan" },
              Prot ? e(Prot, {
                lf: D.field.left_field, cf: D.field.center_field, rf: D.field.right_field,
                orientation: D.field.orientation, bearing: D.field.bearing
              }) : null),

            e("figure", { className: "pf-game-photo" },
              e(Slot, { id: "prog-p3", src: "images/progressive/progressive-field-02.jpg", placeholder: "Home-plate gate and marquee on the night of the visit" })))
        )
      )
    );
  }

  window.ProgSpread = Spread;
})();
