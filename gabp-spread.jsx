/* gabp-spread.jsx — Great American Ball Park anthology spread.
   "Riverboat Reds Frame." Reads window.GABP. Warm cast-stone paper, charcoal
   rules, white-painted-steel truss verticals, low Ohio-River datum bands,
   restrained brick-red accents. Exposes window.GABPSpread. */
(function () {
  const e = React.createElement;
  const D = window.GABP;
  const FieldDiagram = window.GABPProtractor;

  function Slot(props) {
    return e("image-slot", { id: props.id, placeholder: props.placeholder, shape: props.shape || "rect", fit: "cover" });
  }

  /* White-painted-steel truss vertical — smokestack / light-tower marker.
     Pure structural device (lattice texture + brick-red cap/foot), never an
     illustration; used to separate the photo wells and frame the signage. */
  function Stack(props) {
    return e("div", { className: "gabp-stack " + (props.cls || "") },
      e("div", { className: "cap" }),
      e("div", { className: "shaft" }),
      e("div", { className: "foot" }));
  }

  /* Low Ohio-River datum rule — subtle repeating wave, editorial not nautical. */
  function RiverRule(props) {
    return e("div", { className: "gabp-river " + (props.cls || ""), role: "presentation" });
  }

  /* Ohio-River course watermark — one broad sweeping channel + banks + current,
     extended to bleed off the page edges as a faint river-haze tint. */
  function RiverWatermark() {
    const c = "rgba(104,128,138,1)";
    const spine = "M -160 1120 C 300 1065 600 920 805 800 C 1025 672 1195 470 1430 335";
    const edgeTop = "M -160 940 C 300 885 600 740 805 620 C 1025 492 1195 290 1430 155";
    const edgeLow = "M -160 1300 C 300 1245 600 1100 805 980 C 1025 852 1195 650 1430 515";
    return e("svg", { className: "gabp-river-wm", viewBox: "0 0 1275 1088", preserveAspectRatio: "none", "aria-hidden": "true", role: "presentation" },
      e("path", { d: spine, fill: "none", stroke: c, strokeWidth: 336, strokeLinecap: "round", opacity: 0.5 }),
      e("path", { d: spine, fill: "none", stroke: c, strokeWidth: 192, strokeLinecap: "round", opacity: 0.42 }),
      e("path", { d: edgeTop, fill: "none", stroke: c, strokeWidth: 3, opacity: 0.9 }),
      e("path", { d: edgeLow, fill: "none", stroke: c, strokeWidth: 3, opacity: 0.9 }),
      e("path", { d: spine, fill: "none", stroke: c, strokeWidth: 1.4, opacity: 0.6 }));
  }

  function SectBar(props) {
    return e("div", { className: "gabp-sectbar" },
      e("span", { className: "ix" }, props.ix),
      e("span", { className: "t" }, props.title),
      e("span", { className: "rule" }));
  }

  /* Weather glyphs — fine line-art. */
  function WxIcon() {
    return e("svg", { width: 38, height: 38, viewBox: "0 0 24 24", fill: "none", stroke: "#5A5147", strokeWidth: 1.05, strokeLinecap: "round", strokeLinejoin: "round", className: "gabp-wx-ico" },
      e("path", { d: "M7 15a4 4 0 0 1 .4-7.98 5.5 5.5 0 0 1 10.6 1.48A3.5 3.5 0 0 1 17.5 15z" }),
      e("path", { d: "M8 18.4l-1.1 2.1M12 18.4l-1.1 2.1M16 18.4l-1.1 2.1" }));
  }
  function WxRowIcon(kind) {
    const c = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "#5A5147", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", className: "gabp-wxr-ico" };
    if (kind === "wind") return e("svg", c,
      e("path", { d: "M3 8h11a2.5 2.5 0 1 0-2.5-2.5" }),
      e("path", { d: "M3 16h15a2.5 2.5 0 1 1-2.5 2.5" }),
      e("path", { d: "M3 12h7" }));
    if (kind === "humidity") return e("svg", c,
      e("path", { d: "M12 3.2s5.5 5.9 5.5 9.8a5.5 5.5 0 1 1-11 0C6.5 9.1 12 3.2 12 3.2z" }));
    return null;
  }

  /* Footer classification glyphs — simple geometric line-art. */
  function FootIcon(kind) {
    const c = { width: 25, height: 25, viewBox: "0 0 24 24", fill: "none", stroke: "#5A5147", strokeWidth: 1.3, strokeLinecap: "round", strokeLinejoin: "round", className: "gabp-foot-ico" };
    if (kind === "era") return e("svg", c, e("circle", { cx: 12, cy: 12, r: 8 }), e("path", { d: "M12 4v16M4 12h16" }));
    if (kind === "status") return e("svg", c, e("circle", { cx: 12, cy: 12, r: 4.4, fill: "#B11E2A", stroke: "none" }), e("circle", { cx: 12, cy: 12, r: 8.4 }));
    if (kind === "league") return e("svg", c, e("circle", { cx: 12, cy: 12, r: 8 }), e("path", { d: "M6.6 7.4C9 9.8 9 14.2 6.6 16.6M17.4 7.4C15 9.8 15 14.2 17.4 16.6" }));
    if (kind === "division") return e("svg", c, e("path", { d: "M12 3.4l2.5 5.1 5.6.8-4 4 1 5.6L12 16.3 6.9 19l1-5.6-4-4 5.6-.8z" }));
    if (kind === "location") return e("svg", c, e("path", { d: "M3 21h18M5 21V10l3-2 3 2v11M14 21V8l4-2 2 2v13" }), e("path", { d: "M8 12h0M8 16h0M17 11h0M17 15h0" }));
    if (kind === "river") return e("svg", c,
      e("path", { d: "M2 8c2.2-1.6 3.8-1.6 6 0s3.8 1.6 6 0 3.8-1.6 6 0" }),
      e("path", { d: "M2 13c2.2-1.6 3.8-1.6 6 0s3.8 1.6 6 0 3.8-1.6 6 0" }),
      e("path", { d: "M2 18c2.2-1.6 3.8-1.6 6 0s3.8 1.6 6 0 3.8-1.6 6 0" }));
    return null;
  }

  function BoxScore(box) {
    const heads = []; for (let i = 1; i <= box.innings; i++) heads.push(i);
    function tr(t, win) {
      return e("tr", { className: win ? "win" : "" },
        e("td", { className: "tm" }, t.abbr),
        t.byInning.map((n, i) => e("td", { key: i, className: (n === "x" ? "x" : "") }, n)),
        e("td", { className: "rhe sep" }, t.r),
        e("td", { className: "rhe" }, t.h),
        e("td", { className: "rhe" }, t.e));
    }
    return e("table", { className: "gabp-box" },
      e("thead", null,
        e("tr", null,
          e("th", { className: "tm" }, ""),
          heads.map((n) => e("th", { key: n }, n)),
          e("th", { className: "sep" }, "R"),
          e("th", null, "H"),
          e("th", null, "E"))),
      e("tbody", null,
        tr(box.away, box.away.r > box.home.r),
        tr(box.home, box.home.r > box.away.r)));
  }

  function ribCell(k, v, i) {
    return e("div", { className: "rcell", key: i },
      e("div", { className: "k" }, k),
      e("div", { className: "v" }, v));
  }
  function factRow(k, v, i) {
    return e("div", { className: "row", key: i },
      e("div", { className: "k" }, k),
      e("div", { className: "v" }, v));
  }
  function infoRow(k, v) {
    return e("div", { className: "irow" },
      e("div", { className: "k" }, k),
      e("div", { className: "v" }, v));
  }
  function wxRow(k, v, kind) {
    return e("div", { className: "wxr" },
      WxRowIcon(kind),
      e("div", { className: "wxr-txt" },
        e("span", { className: "k" }, k),
        e("span", { className: "v" }, v)));
  }
  function footCell(k, v, kind, i) {
    return e("div", { className: "fcell", key: i },
      FootIcon(kind),
      e("div", { className: "ftxt" },
        e("div", { className: "k" }, k),
        e("div", { className: "v" }, v)));
  }
  function photoWell(id, placeholder) {
    return e("div", { className: "gabp-well", "data-slot": id },
      e("div", { className: "wframe" },
        e(Slot, { id: id, placeholder: placeholder })),
      e("div", { className: "wbase" }));
  }

  function Spread() {
    const G = D.game, V = D.visit, W = D.weather, F = D.field;
    return (
      e("div", { className: "gabp-spread", "data-screen-label": "Great American Ball Park spread" },

        /* ===================== LEFT PAGE / HERO ===================== */
        e("div", { className: "gabp-page gabp-left", "data-screen-label": "Great American Ball Park hero" },
          e("div", { className: "gabp-hero-slot" },
            e(Slot, { id: "gabp-hero", placeholder: "Drop the Great American Ball Park aerial \u2014 Ohio River, downtown skyline, red bowl, white steel towers" })),
          e("div", { className: "gabp-hero-scrim" }),
          e("div", { className: "gabp-hero-folio" }, "Retro Classic ballpark \u00b7 No. 24"),

          /* steel-framed riverfront signage panel */
          e("div", { className: "gabp-sign" },
            e(Stack, { cls: "sign-stack" }),
            e("div", { className: "gabp-sign-inner" },
              e("h1", { className: "gabp-hero-name" }, "Great American", e("br", null), "Ball Park"),
              e("div", { className: "gabp-hero-loc" },
                e("span", { className: "bar" }),
                e("span", { className: "txt" }, "Cincinnati, Ohio"),
                e("span", { className: "bar" }))),
            e(Stack, { cls: "sign-stack" })),

          /* bottom identity metadata */
          e("div", { className: "gabp-meta" },
            e("div", { className: "mcell" },
              e("div", { className: "k" }, "Years Active"),
              e("div", { className: "v" }, D.years_active)),
            e("div", { className: "mcell" },
              e("div", { className: "k" }, "Coordinates"),
              e("div", { className: "v mono" }, D.coordinates_n),
              e("div", { className: "v mono" }, D.coordinates_w)),
            e("div", { className: "mcell" },
              e("div", { className: "k" }, "Elevation"),
              e("div", { className: "v" }, D.elevation)),
            e("div", { className: "mcell logos" },
              e("img", { className: "reds", src: "assets/reds.svg", alt: "Cincinnati Reds" }),
              e("div", { className: "logos-r" },
                e("img", { className: "mlb", src: "assets/mlb-logo.svg", alt: "MLB" }),
                e("img", { className: "nl", src: "assets/nl-logo.png", alt: "National League" })))
          ),
          e("div", { className: "gabp-addr" },
            e("span", null, D.team_name),
            e("span", { className: "dot" }, "\u25C6"),
            e("span", null, D.address))
        ),

        /* ===================== RIGHT PAGE ===================== */
        e("div", { className: "gabp-page gabp-right" },
          e(RiverWatermark),
          e("div", { className: "gabp-rp" },

            /* --- photo strip held between steel trusses --- */
            e("div", { className: "gabp-strip" },
              e(Stack, null),
              photoWell("gabp-p1", "Brick facade / riverfront entry"),
              e(Stack, null),
              photoWell("gabp-p2", "Red seating bowl"),
              e(Stack, null),
              photoWell("gabp-p3", "Scoreboard"),
              e(Stack, null),
              photoWell("gabp-p4", "Concourse / river integration"),
              e(Stack, null)),

            /* --- metadata ribbon + river datum --- */
            e("div", { className: "gabp-ribbon-wrap" },
              e("div", { className: "gabp-ribbon" },
                D.ribbon.map((r, i) => ribCell(r[0], r[1], i))),
              e(RiverRule, { cls: "under-ribbon" })),

            /* ===== STADIUM SECTION ===== */
            e(SectBar, { ix: "I", title: "Stadium Section" }),
            e("div", { className: "gabp-stadium" },

              e("div", { className: "gabp-col facts" },
                e("div", { className: "gabp-modh" }, "Stadium Facts"),
                e("div", { className: "gabp-table" },
                  D.facts.map((f, i) => factRow(f[0], f[1], i)))),

              e("div", { className: "gabp-col field" },
                e("div", { className: "gabp-modh" }, "Stadium History"),
                e("ol", { className: "gabp-lineage" },
                  D.preceded_by.map((n, i) => e("li", { key: i, className: i === D.preceded_by.length - 1 ? "last" : "" },
                    e("span", { className: "dot" }),
                    e("span", { className: "nm" }, n)))),
                e("div", { className: "gabp-modh ctr fd-rule" }),
                e("figure", { className: "gabp-fp" },
                  FieldDiagram ? e(FieldDiagram, {
                    lf: F.left_field, cf: F.center_field, rf: F.right_field,
                    orientation: F.orientation, degrees: F.orientation_degrees, accent: "#B11E2A"
                  }) : null)),

              e("div", { className: "gabp-col context" },
                e("div", { className: "gabp-modh" }, "Stadium Context"),
                e("div", { className: "gabp-ctx" },
                  e("div", { className: "ccol" }, D.context.slice(0, 2).map((p, i) => e("p", { key: i }, p))),
                  e("div", { className: "ccol" }, D.context.slice(2).map((p, i) => e("p", { key: i }, p)))))
            ),

            /* ===== VISIT SECTION ===== */
            e(SectBar, { ix: "II", title: "Visit Section" }),
            e("div", { className: "gabp-visit" },

              e("div", { className: "gabp-col vinfo" },
                e("div", { className: "gabp-modh" }, "Visit Information ", e("span", { className: "vidx" }, "(" + D.visit_order + " of 42)")),
                e("div", { className: "irows" },
                  infoRow("Group Visit", V.first_visit),
                  infoRow("Trip", V.trip_name),
                  infoRow("Attendance", V.attendance),
                  infoRow("First Pitch", V.first_pitch),
                  infoRow("Duration", V.duration))),

              e("div", { className: "gabp-col weather" },
                e("div", { className: "gabp-modh" }, "Weather"),
                e("div", { className: "gabp-wx" },
                  e("div", { className: "wxmain" },
                    WxIcon(),
                    e("div", { className: "wxtemp" },
                      e("span", { className: "deg" }, W.temperature),
                      e("span", { className: "cond" }, W.conditions))),
                  e("div", { className: "wxrows" },
                    wxRow("Wind", W.wind, "wind"),
                    wxRow("Humidity", W.humidity, "humidity")))),

              e("div", { className: "gabp-col featured" },
                e("div", { className: "gabp-modh" }, "Featured Game ", e("span", { className: "vidx" }, "\u00b7 " + G.day + ", " + G.date_full)),
                e("div", { className: "feat-card" },
                  e("div", { className: "feat-score" },
                    e("img", { className: "tlogo", src: "assets/houston-astros-logo.svg", alt: "Houston Astros" }),
                    e("span", { className: "tname away" }, G.away_full),
                    e("span", { className: "rn away" }, G.away_runs),
                    e("div", { className: "vs" }, "Final"),
                    e("span", { className: "rn home" }, G.home_runs),
                    e("span", { className: "tname home" }, G.home_full),
                    e("img", { className: "tlogo", src: "assets/reds.svg", alt: "Cincinnati Reds" }),
                    e("div", { className: "feat-pitchers" },
                      e("div", { className: "pl" }, G.away_starter + " (" + D.box.away.abbr + ") vs"),
                      e("div", { className: "pl" }, G.home_starter + " (" + D.box.home.abbr + ")"))),
                  e("div", { className: "feat-box" }, BoxScore(D.box)),
                  e("div", { className: "feat-dec" },
                    e("div", { className: "di" }, e("span", { className: "k" }, "W"), e("span", { className: "v" }, G.winning_pitcher)),
                    e("div", { className: "di" }, e("span", { className: "k" }, "L"), e("span", { className: "v" }, G.losing_pitcher)))))
            ),

            /* --- footer river band: classification chips --- */
            e("div", { className: "gabp-footwrap" },
              e(RiverRule, { cls: "over-foot" }),
              e("div", { className: "gabp-foot" },
                D.footer.map((f, i) => footCell(f[0], f[1], f[2], i))))
          )
        )
      )
    );
  }

  window.GABPSpread = Spread;
})();
