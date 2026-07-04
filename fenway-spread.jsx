/* fenway-spread.jsx — Fenway Park two-page editorial spread.
   LEFT  : full-bleed dark stadium hero (image-slot) + compact green-signage plaque.
   RIGHT : "constrained urban scoreboard wall" — green-painted riveted steel panel
           system. Upper Stadium Section (engraved metadata table on green + field
           instrument + four documentation photo bays + cream Context & Lifecycle
           panels + brick marks plate). Lower Visit Section (Green Monster manual
           line-score, secondary game strip, visit records, weather strip).
   All facts come from window.FENWAY only. Exposes window.FenwaySpread. */
(function () {
  const e = React.createElement;
  const D = window.FENWAY;
  const Field = window.FenwayField;

  function Slot(props) {
    // Photos referenced as real downscaled files via `src` (not data-URLs in the
    // sidecar) so .image-slots.state.json stays under the host writeFile cap and
    // recrops persist as tiny framing-only {s,x,y} entries.
    const attrs = { id: props.id, placeholder: props.placeholder, shape: "rect",
      style: props.style || null };
    if (props.src) attrs.src = props.src;
    return e("image-slot", attrs);
  }

  // ---------- LEFT PAGE ----------
  function LeftPage() {
    return e("div", { className: "fw-page fw-left", "data-screen-label": "Fenway Park \u2014 left (hero)" },
      e("div", { className: "fw-hero-slot" },
        e(Slot, { id: "fenway-hero", src: "images/fenway/hero-hd.jpg", placeholder: "Fenway Park \u2014 aerial / Green Monster & city edge" })),
      e("div", { className: "fw-hero-scrim" }),
      // top-left league mast
      e("div", { className: "fw-mast" },
        e("img", { className: "mlb", src: "assets/mlb-logo.svg", alt: "Major League Baseball" }),
        e("span", { className: "mast-div" }),
        e("img", { className: "al", src: "assets/american-league-logo.png", alt: "American League" })),
      // green Monster-signage plaque, lower-left
      e("div", { className: "fw-plaque" },
        e("div", { className: "fw-plaque-rivets" }),
        e("div", { className: "fw-plaque-name" }, "FENWAY PARK"),
        e("div", { className: "fw-plaque-loc" }, D.city + ", " + D.state),
        e("div", { className: "fw-plaque-years" }, D.years_active),
        e("div", { className: "fw-plaque-sub" }, D.league + " EAST \u00b7 " + D.team_name)
      )
    );
  }

  // ---------- METADATA TABLE ----------
  function MetaTable() {
    const rows = [
      ["Capacity", e("span", null, "37,755", e("em", { className: "fw-mr-note" }, "originally 27,000"))],
      ["Opened", D.opened],
      ["Opening Day", D.opening_day],
      ["Groundbreaking", D.construction_start],
      ["Years Active", D.years_active],
      ["Status", D.status],
      ["Architect", D.architect],
      ["Surface", D.surface_type + " \u00b7 " + D.surface],
      ["Roof", D.roof_type],
      ["Facade Material", D.facade],
      ["Era", D.classification_era],
      ["Style", D.architectural_style],
      ["Type", D.stadium_type],
      ["Site", D.location],
      ["Elevation", D.elevation],
      ["Coordinates", D.coordinates],
      ["Address", D.address_l1 + ", " + D.address_l2],
      ["Cost", e("span", null, D.cost_original, e("em", { className: "fw-mr-note" }, "adj. " + D.cost_adjusted))],
      ["Financing", D.financing],
      ["Preceded By", D.preceded_by],
      ["All-Star Games", D.all_star_years]
    ];
    return e("table", { className: "fw-meta-table" },
      e("tbody", null,
        rows.map((r, i) => e("tr", { key: i },
          e("th", null, r[0]),
          e("td", null, r[1])))
      )
    );
  }

  function ColorKey() {
    return e("div", { className: "fw-colors" },
      e("span", { className: "fw-colors-lab" }, "Team Colors"),
      e("div", { className: "fw-sw-row" },
        D.team_colors.map((c, i) => e("span", { key: i, className: "fw-sw", title: c.name },
          e("span", { className: "fw-sw-chip", style: { background: c.hex } }),
          e("span", { className: "fw-sw-name" }, c.name)))
      )
    );
  }

  // ---------- STADIUM SECTION ----------
  function StadiumSection() {
    const photos = [
      ["fenway-doc-1", "Exterior Brick Facade", "images/fenway/doc-1.jpg"],
      ["fenway-doc-2", "Green Monster Detail", "images/fenway/doc-2.jpg"],
      ["fenway-doc-3", "Grandstand Structure", "images/fenway/doc-3.jpg"],
      ["fenway-doc-4", "Neighborhood Edge", "images/fenway/doc-4.jpg"]
    ];
    return e("div", { className: "fw-stadium" },
      // Col A — metadata directory on green steel
      e("div", { className: "fw-colA" },
        e("div", { className: "fw-sec-head" }, e("span", { className: "fw-sec-rule" }), "STADIUM"),
        e(MetaTable),
        e("div", { className: "fw-field-row" },
          e("div", { className: "fw-field-logo-wrap" },
            e("img", { className: "fw-field-logo", src: "assets/red-sox-roundel.svg", alt: "Boston Red Sox" })),
          e("div", { className: "fw-field-bay" },
            e(Field, { lf: D.lf, cf: D.cf, rf: D.rf, orientation: D.orientation, bearing: D.bearing })))
      ),
      // Col B — four documentation photo bays (labels live in the drop placeholder
      // only; no caption survives once a photo is dropped — house rule: never caption photos)
      e("div", { className: "fw-colB" },
        photos.map((p, i) => e("div", { key: i, className: "fw-bay" },
          e("div", { className: "fw-bay-frame" }, e(Slot, { id: p[0], placeholder: p[1], src: p[2] }))))
      ),
      // Col C — cream panels: context, lifecycle, marks plate
      e("div", { className: "fw-colC" },
        e("div", { className: "fw-panel fw-ctx-panel" },
          e("div", { className: "fw-ctx-cols" },
            D.stadium_context.map((p, i) => i === 0
              ? e("p", { key: i }, e("span", { className: "fw-dropcap" }, p.charAt(0)), p.slice(1))
              : e("p", { key: i }, p)))
        ),
        e("div", { className: "fw-cWrap" },
          e("div", { className: "fw-panel fw-life-panel" },
            e("div", { className: "fw-panel-head" }, "RENOVATION TIMELINE"),
            e("div", { className: "fw-life" },
              D.lifecycle.map((grp, i) => e("div", { key: i, className: "fw-life-grp" },
                e("div", { className: "fw-life-era" },
                  e("span", { className: "yr" }, grp.era),
                  e("span", { className: "ti" }, grp.title)),
                grp.items.map((it, j) => e("div", { key: j, className: "fw-life-row" },
                  e("span", { className: "fw-life-yr" }, it.yr),
                  e("span", { className: "fw-life-note" }, it.note))))))
          ),
          e("div", { className: "fw-brick-plate" },
            e("div", { className: "fw-brick-marks" },
              e("img", { src: "assets/boston-red-sox-logo.svg", alt: "Boston Red Sox" }),
              e("img", { src: "assets/american-league-logo.png", alt: "American League" }),
              e("img", { className: "mlb", src: "assets/mlb-logo.svg", alt: "Major League Baseball" })),
            e("div", { className: "fw-brick-est" },
              e("span", { className: "fw-est-big" }, "EST. 1912"),
              e("span", { className: "fw-est-sm" }, "Boston, Massachusetts"))
          )
        )
      )
    );
  }

  // ---------- SCOREBOARD ----------
  function Scoreboard(props) {
    const g = props.game, away = g.line.away, home = g.line.home;
    const innings = away.byInning.length;
    const headNums = [];
    for (let i = 1; i <= innings; i++) headNums.push(i);
    function row(side, plate, plateCls) {
      return e("div", { className: "fw-sb-row" },
        e("div", { className: "fw-sb-plate " + plateCls }, plate),
        e("div", { className: "fw-sb-cells" },
          side.byInning.map((v, i) => e("span", { key: i, className: "fw-sb-cell" }, v))),
        e("div", { className: "fw-sb-rhe" },
          e("span", { className: "fw-sb-tot r" }, side.r),
          e("span", { className: "fw-sb-tot" }, side.h),
          e("span", { className: "fw-sb-tot" }, side.e))
      );
    }
    return e("div", { className: "fw-scoreboard" },
      e("div", { className: "fw-sb-head" },
        e("div", { className: "fw-sb-plate head" }, ""),
        e("div", { className: "fw-sb-cells" },
          headNums.map((n, i) => e("span", { key: i, className: "fw-sb-cell num" }, n))),
        e("div", { className: "fw-sb-rhe" },
          e("span", { className: "fw-sb-tot lab" }, "R"),
          e("span", { className: "fw-sb-tot lab" }, "H"),
          e("span", { className: "fw-sb-tot lab" }, "E"))),
      row(away, away.abbr, "away"),
      row(home, home.abbr, "home")
    );
  }

  // ---------- VISIT SECTION ----------
  // Two equal-weight game records, side by side — matching twin scoreboard panels.
  function rec(k, v, cls) {
    return e("div", { className: "fw-game-rec" + (cls ? " " + cls : "") },
      e("span", { className: "k" }, k),
      e("span", { className: "v" }, v));
  }

  function GameBlock(g) {
    return e("div", { className: "fw-game", key: g.no },
      e("div", { className: "fw-game-bar" },
        e("span", { className: "fw-game-tag" }, "GAME " + g.no),
        e("span", { className: "fw-game-date" }, g.date),
        e("span", { className: "fw-game-dn" }, g.day + " \u00b7 " + g.game_type)),
      e("div", { className: "fw-game-match" },
        e("span", { className: "mt" }, g.away + " at " + g.home),
        e("span", { className: "pm" }, g.away_starter + " (" + g.away_abbr + ") vs " + g.home_starter + " (" + g.home_abbr + ")")),
      e(Scoreboard, { game: g }),
      e("div", { className: "fw-game-foot" },
        e("div", { className: "fw-game-recs" },
          e("div", { className: "fw-game-recs-left" },
            rec("First Pitch", g.first_pitch.replace(" EDT", "")),
            rec("Time", g.duration),
            rec("Attendance", g.attendance)),
          rec("Result", g.line.away.abbr + " " + g.line.away.r + ", " + g.line.home.abbr + " " + g.line.home.r, "wide")),
        e("div", { className: "fw-game-pw" },
          e("div", { className: "fw-game-pitch" },
            e("span", null, e("b", { className: "lt w" }, "W"), g.wp),
            e("span", null, e("b", { className: "lt l" }, "L"), g.lp),
            g.sv ? e("span", null, e("b", { className: "lt s" }, "S"), g.sv) : null),
          e("div", { className: "fw-game-wx" },
            e("span", { className: "t" }, g.temp),
            e("span", null, g.conditions),
            e("span", null, g.wind),
            e("span", null, "H " + g.humidity))))
    );
  }

  function VisitSection() {
    return e("div", { className: "fw-visit" },
      e("div", { className: "fw-visit-head" },
        e("div", { className: "fw-visit-title" },
          e("span", { className: "fw-sec-rule" }),
          e("span", { className: "fw-visit-word" }, "VISIT"),
          e("div", { className: "fw-visit-meta" },
            e("span", { className: "fw-vm-1" }, D.trip_name + " Trip"),
            e("span", { className: "fw-vm-2" }, "Jul 22\u201323, 2016"))),
        e("div", { className: "fw-visit-badge" },
          e("span", { className: "fw-vb-no" }, D.visit_no),
          e("div", { className: "fw-vb-of" },
            e("span", { className: "lab" }, "OF"),
            e("span", { className: "num", style: { letterSpacing: "0.4px" } }, "42")))
      ),
      e("div", { className: "fw-games" }, D.games.map(g => GameBlock(g)))
    );
  }

  function RightPage() {
    return e("div", { className: "fw-page fw-right", "data-screen-label": "Fenway Park \u2014 right (scoreboard wall)" },
      e("div", { className: "fw-rivets-tl" }), e("div", { className: "fw-rivets-tr" }),
      e("div", { className: "fw-rivets-bl" }), e("div", { className: "fw-rivets-br" }),
      e("div", { className: "fw-rp" },
        e(StadiumSection),
        e("div", { className: "fw-wall-div" }),
        e(VisitSection)
      )
    );
  }

  function FenwaySpread() {
    return e("div", { className: "fw-spread" },
      e(LeftPage),
      e(RightPage)
    );
  }

  window.FenwaySpread = FenwaySpread;
})();
