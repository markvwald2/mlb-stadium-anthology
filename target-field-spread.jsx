/* target-field-spread.jsx — the single Target Field spread, "The Urban Seam".
   Reads window.TARGET + window.TargetProtractor.
   LEFT  page: full-bleed aerial hero — the open-air bowl stitched into the
   North Loop rail/warehouse fabric — with a compact limestone title block.
   RIGHT page: warm limestone paper, an editorial data sheet. A clean photo
   strip and a metadata ribbon sit up top; an upper STADIUM band (Facts |
   Context | Construction & Setting) and a lower VISIT band (Field + Minnesota
   locator | Visit Information & 12-inning line score | Weather) divide cleanly,
   each module on one page, nothing in the gutter. Photo plates carry no
   caption. Every populated field renders exactly once. */
(function () {
  const e = React.createElement;
  const D = window.TARGET;
  const Protractor = window.TargetProtractor;

  function Slot(props) {
    // Locked-in page-2 press photos: direct full-res <img> from uploads/, each
    // carrying the exact pan/zoom the user set in the slot (percent of slot box,
    // absolutely positioned inside an overflow-clipped frame). Slots not in the
    // map fall back to a fillable <image-slot>.
    var LOCKED = {
      "tf-stadium-ph-1": { src: "uploads/target-field-01.jpg",  w: 93.49, h: 97.73,  l: 0.32,   t: -1.85 },
      "tf-stadium-ph-2": { src: "uploads/target-field-02.png",  w: 93.49, h: 97.73,  l: 0.32,   t: -1.85 },
      "tf-stadium-ph-3": { src: "uploads/target-field-03.jpg",  w: 93.49, h: 183.6,  l: 0.32,   t: -73.09 },
      "tf-stadium-ph-4": { src: "uploads/target-field-04.jpg",  w: 93.49, h: 109.52, l: 0.32,   t: -13.18 },
      "tf-visit-ph-1":   { src: "uploads/target-field-05.jpeg", w: 93.49, h: 110.05, l: 0.32,   t: -8.39 },
      "tf-visit-ph-2":   { src: "uploads/target-field-06.jpeg", w: 93.49, h: 110.05, l: 0.32,   t: -8.39 },
      "tf-visit-ph-3":   { src: "uploads/target-field-07.jpeg", w: 93.49, h: 195.66, l: 0.32,   t: -31.26 },
      "tf-visit-ph-4":   { src: "uploads/target-field-08.jpg",  w: 120.5, h: 93.19,  l: -12.15, t: 0.57 }
    };
    var p = LOCKED[props.id];
    if (p) {
      return e("div", { className: "tf-lockphoto",
        style: { position: "relative", width: "100%", height: "100%", overflow: "hidden" } },
        e("img", { src: p.src, alt: "",
          style: { position: "absolute", left: p.l + "%", top: p.t + "%",
            width: p.w + "%", height: p.h + "%", display: "block" } }));
    }
    const attrs = { id: props.id, placeholder: props.placeholder, shape: props.shape || "rect" };
    if (props.src) attrs.src = props.src;
    if (props.style) attrs.style = props.style;
    return e("image-slot", attrs);
  }

  function SecHead(props) {
    return e("div", { className: "tf-h" + (props.red ? " red" : "") },
      e("span", { className: "t" }, props.title),
      props.note ? e("span", { className: "n" }, props.note) : null);
  }

  function factRow(row, i) {
    return e("div", { className: "tf-frow", key: i },
      e("div", { className: "k" }, row[0]),
      e("div", { className: "v" },
        e("span", { className: "vm" }, row[1]),
        row[2] ? e("span", { className: "vs" }, row[2]) : null));
  }

  // Conditions read as a 2×2 cluster of typographic instrument gauges — no
  // icons, matching the archival voice of the rest of the page.
  function wxCell(value, label) {
    return e("div", { className: "tf-wcell" },
      e("div", { className: "wv" }, value),
      e("div", { className: "wl" }, label));
  }

  // A grid of full 4:3-ish frames filling the upper column — identical across
  // both twins. No captions, per book rule (placeholders are drop guidance).
  function PhotoGrid(prefix, slots) {
    return e("div", { className: "tf-pgrid" },
      slots.map(function (s, i) {
        return e("div", { className: "tf-pcell", key: i },
          e(Slot, { id: prefix + "-" + (i + 1), placeholder: s.ph, src: s.src }));
      }));
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
    return e("table", { className: "tf-box" },
      e("thead", null, e("tr", null,
        e("th", { className: "tm" }, ""),
        cols.map((n) => e("th", { key: n, className: "inn" }, n)),
        e("th", { className: "sep" }, "R"), e("th", null, "H"), e("th", null, "E"))),
      e("tbody", null,
        row(box.away, box.away.r > box.home.r),
        row(box.home, box.home.r > box.away.r)));
  }

  // ---- Minnesota state silhouette is now a full-page watermark on the right
  //      page (see .tf-mn-wm), so the small inline locator is retired. ----

  function ribCell(label, value, opts) {
    opts = opts || {};
    return e("div", { className: "cell" + (opts.coords ? " coords" : "") },
      e("div", { className: "rl" }, label),
      opts.logo
        ? e("div", { className: "rv withlogo" },
            e("img", { className: "rib-mk", src: opts.logo, alt: "" }), e("span", null, value))
        : e("div", { className: "rv" }, value));
  }

  function Spread() {
    const P = D.pitching;
    return e("div", { className: "tf-spread", "data-screen-label": "Target Field spread" },

      /* ================= LEFT PAGE / HERO ================= */
      e("div", { className: "tf-page tf-left", "data-screen-label": "Target Field \u2014 hero" },
        e("div", { className: "tf-hero-slot" },
          e(Slot, { id: "target-hero", src: "uploads/target-field-00-main.jpeg", placeholder: "Drop the Target Field hero \u2014 high aerial of the open-air bowl fitted into the North Loop: freight-rail corridors, warehouse blocks, the downtown Minneapolis grid, limestone-and-glass facade" })),
        e("div", { className: "tf-hero-scrim" }),

        e("img", { className: "tf-hero-logo", src: "assets/twins-insignia.svg", alt: "Minnesota Twins" }),
        e("div", { className: "tf-folio" }, "VISIT " + D.visit_order + " / " + D.visit_total),

        e("div", { className: "tf-hero-title" },
          D.name_lines.map((ln, i) => e("h1", { className: "tf-name", "data-t": ln, key: i }, ln)),
          e("div", { className: "tf-sub" },
            e("span", { className: "txt" }, D.city + ", " + D.state)),
          e("div", { className: "tf-openair" }, "OPEN-AIR \u00b7 NORTH LOOP, MINNEAPOLIS"),
          e("div", { className: "tf-coords" },
            e("span", null, D.coordinates_n + ", " + D.coordinates_w),
            e("span", { className: "dot" }, "\u00b7"),
            e("span", null, "ELEV. " + D.elevation))),

        e("div", { className: "tf-marks" },
          e("img", { className: "mlb", src: "assets/mlb-logo.svg", alt: "Major League Baseball" }),
          e("span", { className: "divln" }),
          e("span", { className: "dv" }, D.league + " \u00b7 " + D.division),
          e("span", { className: "divln" }),
          e("span", { className: "dv" }, "EST. " + D.est))
      ),

      /* ================= RIGHT PAGE / THE TWIN LEDGERS ================= */
      e("div", { className: "tf-page tf-right", "data-screen-label": "Target Field \u2014 the twin ledgers" },
        e("svg", { className: "tf-mn-wm", viewBox: "234 130 252 280",
          preserveAspectRatio: "xMidYMid meet", "aria-hidden": "true" },
          e("path", { d: window.MN_OUTLINE_PATH })),
        e("div", { className: "tf-rp" },

          /* ---- top metadata ribbon — the bridge between the twins ---- */
          e("div", { className: "tf-ribbon" },
            ribCell("Team", D.team_short, { logo: "assets/twins-insignia.svg" }),
            ribCell("Location", D.city + ", " + D.state, { coords: true }),
            ribCell("Capacity", D.capacity_opening),
            ribCell("League", D.league, { logo: "assets/american-league-logo.png" }),
            ribCell("Division", D.division),
            ribCell("Visit", D.visit_order + " of " + D.visit_total)),

          /* ---- the twin ledgers ---- */
          e("div", { className: "tf-ledgers" },
            e("div", { className: "tf-datum", "aria-hidden": "true" }),
            e("div", { className: "tf-axis-mark", "aria-hidden": "true" },
              e("div", { className: "bull" })),

            /* ===== LEDGER I — STADIUM ===== */
            e("div", { className: "tf-ledger stadium" },
              e("div", { className: "tf-ledger-h" },
                e("span", { className: "lbl" }, "Stadium"),
                e("span", { className: "idx" }, "I \u00b7 The Building")),
              PhotoGrid("tf-stadium-ph", [
                { ph: "Kasota limestone facade", src: null },
                { ph: "Limestone & glass detail", src: null },
                { ph: "Warehouse-district edge", src: null },
                { ph: "Field & North Loop beyond", src: null }]),
              e("div", { className: "tf-sd" },
                e("div", { className: "tf-sd-facts" },
                  e(SecHead, { title: "Stadium Facts", note: "MUSEUM RECORD" }),
                  e("div", { className: "tf-facts" }, D.facts.map(factRow))),
                e("figure", { className: "tf-fieldfig" },
                  Protractor ? e(Protractor, { lf: D.field.left_field, cf: D.field.center_field,
                    rf: D.field.right_field, orientation: D.field.orientation, degrees: D.field.degrees }) : null,
                  e("figcaption", null, "All distances in feet \u00b7 " + D.field.orientation + " " + D.field.degrees + "\u00b0")))),

            /* ===== LEDGER II — VISIT ===== */
            e("div", { className: "tf-ledger visit" },
              e("div", { className: "tf-ledger-h" },
                e("span", { className: "lbl" }, "Visit"),
                e("span", { className: "idx" }, "II \u00b7 The Game")),
              PhotoGrid("tf-visit-ph", [
                { ph: "Open-air bowl", src: null },
                { ph: "Game-day crowd", src: null },
                { ph: "Summer light / stands", src: null },
                { ph: "Downtown skyline", src: null }]),
              e("div", { className: "tf-block visitinfo" },
                e(SecHead, { title: "Visit Information", note: "FEATURED VISIT" }),
                e("div", { className: "tf-facts" }, D.visit.map(factRow))),
              e("div", { className: "tf-block plate" },
                e(SecHead, { title: "Line Score", note: D.box.innings + " INNINGS" }),
                e("div", { className: "tf-scorewrap" },
                  LineScore(D.box),
                  e("div", { className: "tf-dec" },
                    e("p", { className: "decline" },
                      e("i", null, P.away), " (" + P.away_team + ") ",
                      e("span", { className: "vs" }, "vs"), " ",
                      e("i", null, P.home), " (" + P.home_team + ") \u00b7 ",
                      e("b", null, "W"), " ", e("i", null, P.win), "\u2003",
                      e("b", null, "L"), " ", e("i", null, P.loss))),
                  e("div", { className: "tf-wx" },
                    e("div", { className: "tf-wx-row" },
                      wxCell(D.weather.temperature, "Temp"),
                      wxCell(D.weather.conditions, "Sky"),
                      wxCell(D.weather.wind, "Wind"),
                      wxCell(D.weather.humidity, "Humidity"))))))),

          /* ---- shared ground plane — Stadium Context supports both twins ---- */
          e("div", { className: "tf-context" },
            e(SecHead, { title: "Stadium Context", note: "METRODOME \u2192 TARGET FIELD" }),
            e("div", { className: "tf-prose4" },
              D.stadium_context.map((p, i) => e("p", { key: i,
                style: i === 2 ? { letterSpacing: "-0.2px" } : undefined }, p))))
        )
      )
    );
  }

  window.TargetFieldSpread = Spread;
})();
