/* yankee-spread.jsx — "Bronx Civic Frieze" two-page spread for Yankee Stadium (1923).
   Reads window.YANKEE, window.YankeeFieldPlan, window.YankeeProtractor.
   Visual concept: the old stadium's white frieze + triple-deck structure unfolded
   into a civic editorial system. Codex data is authoritative; concept image is
   visual direction only. Every populated value placed once; n/a fields omitted. */
(function () {
  const e = React.createElement;
  const D = window.YANKEE;
  const FieldPlan = window.YankeeFieldPlan;
  const Protractor = window.YankeeProtractor;

  function Slot(props) {
    return e("image-slot", { id: props.id, placeholder: props.placeholder, shape: "rect" });
  }

  /* ---- Civic Colonnade frieze (studies treatment #7) ---------------------
     End pylons w/ clipped Art-Deco parapet, flat top beam, round balusters,
     thin lower rail, and a broad CONVEX (bows up at centre) shallow arch.
     Openings are transparent (evenodd) so photo/paper shows through. */
  const f2 = (v) => v.toFixed(2);
  const CIVIC = { bal: "round", crown: "clip", cell: 50, archesPerSpan: 11, pierFrac: 0.1,
                  pylonFrac: 0.32, archFrac: 0.11, projFrac: 0.16, crownFrac: 0, marginFrac: 0 };

  function buildPylonFrieze(cfg, vw, H) {
    const crownH = H * (cfg.crownFrac ?? 0.16);
    const beamTop = crownH, beamT = H * (cfg.beamFrac ?? 0.13), beamBot = beamTop + beamT;
    const pylW = Math.max(14, H * (cfg.pylonFrac ?? 1.25));
    const proj = H * (cfg.projFrac ?? 0.12), archDep = H * (cfg.archFrac ?? 0.18);
    const railT = H * (cfg.railFrac ?? 0.06);
    const M = vw * (cfg.marginFrac ?? 0.16), L = M, R = vw - M;
    const xc = (L + R) / 2, half = Math.max(1, (R - L - 2 * pylW) / 2);
    const baseOpen = (x) => { const t = (x - xc) / half; return (H - proj) - archDep * (1 - t * t); };
    const baseUnder = (x) => baseOpen(x) + railT;

    const pts = [];
    const cl = cfg.crownClip != null ? cfg.crownClip : pylW * 0.32;
    function crown(x0) {
      pts.push([x0, crownH], [x0 + cl, 0], [x0 + pylW - cl, 0], [x0 + pylW, crownH]);
    }
    crown(L);
    pts.push([R - pylW, crownH]);
    crown(R - pylW);
    pts.push([R, H], [R - pylW, H], [R - pylW, baseUnder(R - pylW)]);
    const N = 48;
    for (let i = 1; i <= N; i++) {
      const xx = (R - pylW) - ((R - L - 2 * pylW) * (i / N));
      pts.push([xx, baseUnder(xx)]);
    }
    pts.push([L + pylW, H], [L, H]);
    let d = "M " + f2(pts[0][0]) + " " + f2(pts[0][1]) + " ";
    for (let i = 1; i < pts.length; i++) d += "L " + f2(pts[i][0]) + " " + f2(pts[i][1]) + " ";
    d += "Z ";

    const fieldW = R - L - 2 * pylW;
    const n = Math.max(3, Math.round(fieldW / (cfg.cell || 62)));
    const c = fieldW / n;
    const pierW = Math.max(2.2, c * (cfg.pierFrac ?? 0.26)), ow = c - pierW;
    const topY = beamBot + beamT * (cfg.spandrelMul ?? 0.6);
    for (let i = 0; i < n; i++) {
      const o0 = L + pylW + i * c + pierW / 2, o1 = o0 + ow, cx = (o0 + o1) / 2;
      const ob = baseOpen(cx), r = ow / 2, sp = topY + r;
      d += "M " + f2(o0) + " " + f2(ob) + " L " + f2(o0) + " " + f2(sp) +
           " A " + f2(r) + " " + f2(r) + " 0 0 1 " + f2(o1) + " " + f2(sp) +
           " L " + f2(o1) + " " + f2(ob) + " Z ";
    }
    return d;
  }

  function PylonFrieze(props) {
    const H = props.h, vw = props.vw;
    const d = buildPylonFrieze(props.cfg || CIVIC, vw, H);
    return e("svg", { className: props.className, viewBox: "0 0 " + vw + " " + H,
      preserveAspectRatio: "none", "aria-hidden": "true",
      style: Object.assign({ display: "block", width: "100%", height: H + "px" }, props.style || {}) },
      e("path", { d: d, fill: props.fill, fillRule: "evenodd" }));
  }

  /* Multi-span frieze: a CONTINUOUS run of `spans` arched sections that SHARE
     their pylons (no gaps) — end pylon, span, pylon, span, … pylon. Each span
     has its own convex (bows up at centre) underside; pylons drop to feet below
     the rail. Matches the real Yankee Stadium frieze, where sections join at a
     single common pylon. */
  function buildJoinedFrieze(cfg, vw, H, spans) {
    const crownH = H * (cfg.crownFrac ?? 0.16);
    const beamTop = crownH, beamT = H * (cfg.beamFrac ?? 0.13), beamBot = beamTop + beamT;
    const pylW = Math.max(10, H * (cfg.pylonFrac ?? 1.1));
    const proj = H * (cfg.projFrac ?? 0.22), archDep = H * (cfg.archFrac ?? 0.16);
    const railT = H * (cfg.railFrac ?? 0.06);
    const M = vw * (cfg.marginFrac ?? 0.018), L = M, R = vw - M, innerW = R - L;
    const P = spans + 1;
    const spanW = (innerW - P * pylW) / spans;
    const pylonX = (k) => L + k * (pylW + spanW);
    const spanA = (s) => pylonX(s) + pylW;          // span s left edge
    const spanB = (s) => spanA(s) + spanW;          // span s right edge
    const cl = cfg.crownClip != null ? cfg.crownClip : pylW * 0.30;
    const baseOpen = (s, x) => {
      const a = spanA(s), b = spanB(s), c = (a + b) / 2, half = Math.max(1, (b - a) / 2);
      const t = (x - c) / half; return (H - proj) - archDep * (1 - t * t);
    };
    const baseUnder = (s, x) => baseOpen(s, x) + railT;

    /* ---- outer silhouette ---- */
    const pts = [];
    const cap = (x0) => pts.push([x0, crownH], [x0 + cl, 0], [x0 + pylW - cl, 0], [x0 + pylW, crownH]);
    cap(pylonX(0));
    for (let k = 1; k < P; k++) { pts.push([pylonX(k), crownH]); cap(pylonX(k)); }
    pts.push([R, H]);                                // right outer face down
    const N = 30;
    for (let s = spans - 1; s >= 0; s--) {           // trace undersides right→left
      const a = spanA(s), b = spanB(s);
      pts.push([pylonX(s + 1) + pylW, H], [b, H]);   // right pylon foot bottom
      pts.push([b, baseUnder(s, b)]);
      for (let i = 1; i <= N; i++) { const x = b - (b - a) * (i / N); pts.push([x, baseUnder(s, x)]); }
      pts.push([a, H]);                              // down the left pylon's inner side
    }
    pts.push([L, H]);                                // left end pylon foot bottom
    let d = "M " + f2(pts[0][0]) + " " + f2(pts[0][1]) + " ";
    for (let i = 1; i < pts.length; i++) d += "L " + f2(pts[i][0]) + " " + f2(pts[i][1]) + " ";
    d += "Z ";

    /* ---- baluster openings per span (round-topped holes, evenodd) ---- */
    const topY = beamBot + beamT * (cfg.spandrelMul ?? 0.6);
    for (let s = 0; s < spans; s++) {
      const a = spanA(s), b = spanB(s);
      const n = cfg.archesPerSpan || Math.max(3, Math.round((b - a) / (cfg.cell || 62)));
      const c = (b - a) / n, pierW = Math.max(2.2, c * (cfg.pierFrac ?? 0.26)), ow = c - pierW;
      for (let i = 0; i < n; i++) {
        const o0 = a + i * c + pierW / 2, o1 = o0 + ow, cx = (o0 + o1) / 2;
        const ob = baseOpen(s, cx), r = ow / 2, sp = topY + r;
        d += "M " + f2(o0) + " " + f2(ob) + " L " + f2(o0) + " " + f2(sp) +
             " A " + f2(r) + " " + f2(r) + " 0 0 1 " + f2(o1) + " " + f2(sp) +
             " L " + f2(o1) + " " + f2(ob) + " Z ";
      }
    }
    return d;
  }

  /* One continuous joined frieze across the band (default 3 spans, shared pylons). */
  function FriezeRow(props) {
    const H = props.h, vw = props.vw, spans = props.spans || 3;
    const d = buildJoinedFrieze(props.cfg || CIVIC, vw, H, spans);
    return e("svg", { className: props.className, viewBox: "0 0 " + vw + " " + H,
      preserveAspectRatio: "none", "aria-hidden": "true",
      style: { display: "block", width: "100%", height: H + "px" } },
      e("path", { d: d, fill: props.fill, fillRule: "evenodd" }));
  }

  /* Frieze arcade — the literal Yankee Stadium frieze: FLAT cornice on top with a
     beaded course, then a colonnade of piers with round-topped arches that open
     at the BOTTOM edge (arched bottom). Openings are transparent (evenodd) so the
     photo shows through on the hero and the paper shows through on the sheet. */
  function Frieze(props) {
    const fill = props.fill || "#0C2340";
    const H = props.h || 26;
    const vw = props.vw || 1200;          // viewBox width ~ real px width (keeps arches round)
    const cell = props.cell || 28;        // arch bay pitch in px
    const n = Math.max(2, Math.round(vw / cell));
    const c = vw / n;
    const archTop = Math.max(4, Math.round(H * 0.27));  // crown line: flat cornice above, arches below
    const pier = Math.max(2.5, c * 0.24);               // pier width between arches
    const ow = c - pier;                                // opening width
    let r = ow / 2;
    const maxR = H - archTop;
    if (r > maxR) r = maxR;
    const springY = archTop + r;
    const bottom = H + 2;                               // overshoot so arches read as open at the base
    // outer band, then arched openings punched open at the bottom edge
    let d = "M 0 0 H " + vw + " V " + H + " H 0 Z ";
    for (let i = 0; i < n; i++) {
      const x0 = i * c + pier / 2;
      const x1 = x0 + ow;
      d += "M " + x0.toFixed(2) + " " + bottom +
           " L " + x0.toFixed(2) + " " + springY.toFixed(2) +
           " A " + r.toFixed(2) + " " + r.toFixed(2) + " 0 0 1 " + x1.toFixed(2) + " " + springY.toFixed(2) +
           " L " + x1.toFixed(2) + " " + bottom + " Z ";
    }
    // beaded course punched into the cornice (only when tall enough to read)
    if (H >= 18) {
      const beadR = Math.min(2, Math.max(0.9, H * 0.045));
      const beadY = archTop * 0.5;
      for (let i = 0; i < n; i++) {
        const cx = i * c + c / 2;
        d += "M " + (cx - beadR).toFixed(2) + " " + beadY.toFixed(2) +
             " a " + beadR.toFixed(2) + " " + beadR.toFixed(2) + " 0 1 0 " + (2 * beadR).toFixed(2) + " 0" +
             " a " + beadR.toFixed(2) + " " + beadR.toFixed(2) + " 0 1 0 " + (-2 * beadR).toFixed(2) + " 0 Z ";
      }
    }
    return e("svg", { className: props.className, viewBox: "0 0 " + vw + " " + H,
      preserveAspectRatio: "none", "aria-hidden": "true", style: { display: "block", width: "100%", height: H + "px" } },
      e("path", { d: d, fill: fill, fillRule: "evenodd" }));
  }

  function factRow(k, v) {
    return e("tr", null, e("th", null, k), e("td", null, v));
  }
  function rb(k, v, sm) {
    return e("div", { className: "yk-rb" },
      e("div", { className: "k" }, k),
      e("div", { className: "v" + (sm ? " sm" : "") }, v));
  }
  function virow(k, v, cls) {
    return e("div", { className: "yk-virow" + (cls ? " " + cls : "") }, e("div", { className: "k" }, k), e("div", { className: "v" }, v));
  }

  function LineScore(box) {
    const heads = []; for (let i = 1; i <= box.innings; i++) heads.push(i);
    function row(t, cls) {
      return e("tr", { className: cls },
        e("td", { className: "tm" }, t.abbr),
        t.byInning.map((n, i) => e("td", { key: i }, n)),
        e("td", { className: "rhe sep" }, t.r),
        e("td", { className: "rhe" }, t.h),
        e("td", { className: "rhe" }, t.e));
    }
    return e("table", { className: "yk-line" },
      e("thead", null,
        e("tr", null,
          e("th", { className: "tm" }, ""),
          heads.map((n) => e("th", { key: n }, n)),
          e("th", { className: "sep" }, "R"), e("th", null, "H"), e("th", null, "E"))),
      e("tbody", null, row(box.away, "away"), row(box.home, "home")));
  }

  function Spread() {
    const awayWin = D.box.away.r > D.box.home.r;
    return e("div", { className: "yk-spread", "data-screen-label": "Yankee Stadium (1923) spread" },

      /* ============ LEFT / NIGHT HERO PLATE ============ */
      e("div", { className: "yk-page yk-left", "data-screen-label": "Hero — Yankee Stadium night" },
        e("div", { className: "yk-hero-slot" },
          e(Slot, { id: "yk-hero", placeholder: "Drop the original Yankee Stadium aerial \u2014 the floodlit triple-deck bowl in the South Bronx at 161st & River Avenue, night game" })),
        e("div", { className: "yk-hero-scrim" }),
        e("div", { className: "yk-pinstripe" }),
        e("div", { className: "yk-hero-frieze-bleed" }),
        e(FriezeRow, { className: "yk-hero-frieze", h: 25, vw: 1275, fill: "#F4F0E5", cfg: CIVIC, spans: 14 }),

        /* Ruth-era origin marker — typographic datum plate, no photo */
        e("div", { className: "yk-ruth" },
          e("div", { className: "yr" }, "1923"),
          e("div", { className: "stars" }, "\u2605 \u2605 \u2605"),
          e("div", { className: "tx" }, "Built for ", e("b", null, "Babe Ruth"), "-era demand that outgrew borrowed space at the Polo Grounds")),

        /* logo wells */
        e("div", { className: "yk-hero-mast" },
          e("div", { className: "yk-logo-well" },
            e("img", { src: "assets/new-york-yankees-logo.svg", alt: "New York Yankees" })),
          e("div", { className: "yk-logo-well" },
            e("img", { src: "assets/american-league-logo.png", alt: "American League" })),
          e("div", { className: "yk-logo-well" },
            e("img", { src: "assets/mlb-logo.svg", alt: "Major League Baseball" }))),

        /* title block */
        e("div", { className: "yk-hero-block" },
          e("div", { className: "yk-hero-kicker" }, "The Bronx \u00b7 American League"),
          e("h1", { className: "yk-hero-name" }, "Yankee", e("span", { className: "l2" }, "Stadium")),
          e("div", { className: "yk-hero-rule" },
            e("div", { className: "band" }),
            e("div", { className: "band thin" })),
          e("div", { className: "yk-hero-loc" },
            e("span", { className: "txt" }, D.city + ", " + D.state)),
          e("div", { className: "yk-hero-meta" },
            e("span", null, e("b", null, D.years_active)),
            e("span", { className: "dot" }, "\u00b7"),
            e("span", null, D.classification_era + " Era"),
            e("span", { className: "dot" }, "\u00b7"),
            e("span", null, "Open Air"),
            e("span", { className: "dot" }, "\u00b7"),
            e("span", { className: "dem" }, "Demolished " + D.demolition_year))
        )
      ),

      /* ============ RIGHT / LIMESTONE CIVIC SHEET ============ */
      e("div", { className: "yk-page yk-right", "data-screen-label": "Editorial — Yankee Stadium data" },
        e("div", { className: "yk-rp" },

          /* frieze crown */
          e("div", { className: "yk-crown-bleed" }),
          e(FriezeRow, { className: "yk-crown", h: 25, vw: 1275, fill: "#0C2340", cfg: CIVIC, spans: 14 }),

          /* sheet title-block */
          e("div", { className: "yk-head" },
            e("div", { className: "hl" },
              e("div", { className: "over" }, "A Bronx Monument"),
              e("div", { className: "nm" }, "Yankee Stadium \u00b7 1923")),
            e("div", { className: "hr" },
              e("div", { className: "cell" }, e("div", { className: "k" }, "Status"), e("div", { className: "v dem" }, D.status)),
              e("div", { className: "cell" }, e("div", { className: "k" }, "Roof"), e("div", { className: "v" }, D.roof_type)),
              e("div", { className: "cell" }, e("div", { className: "k" }, "Setting"), e("div", { className: "v" }, D.location_classification)))
          ),

          /* TIER 1 — facade-bay photo strip */
          e("div", { className: "yk-bays" },
            bay("yk-b1", "Limestone & concrete exterior elevation along 161st Street"),
            bay("yk-b2", "Copper / painted concrete frieze detail at the upper-deck roofline"),
            bay("yk-b3", "Triple-deck grandstand interior and the bowl"),
            bay("yk-b5", "Archival aerial \u2014 the monument in the South Bronx grid")
          ),

          /* metadata ribbon */
          e("div", { className: "yk-ribbon" },
            rb("Team", D.team_name, true),
            rb("League / Division", "American League East", true),
            rb("Classification", "Jewel Box & Early Concrete", true),
            rb("Years Active", D.years_active),
            rb("Visit No.", D.visit_order + " of 42"),
            rb("Coordinates", D.coordinates, true),
            rb("Capacity", D.capacity_opening + " \u2192 " + D.capacity_current, true)
          ),

          /* TIER 2 — the monument: facts | instruments */
          e("div", { className: "yk-monument" },
            e("div", { className: "yk-parcel" },
              e("div", { className: "t" }, "The Monument"),
              e("div", { className: "ln" }),
              e("div", { className: "ribbon" },
                e("span", null, "Architect ", e("b", null, D.architect)),
                e("span", null, "Surface ", e("b", null, "Merion bluegrass")))),

            e("div", { className: "yk-mgrid" },
              /* facts */
              e("div", { className: "yk-facts" },
                e("table", { className: "yk-ftable" },
                  e("tbody", null,
                    factRow("Architect", e("b", null, D.architect)),
                    factRow("Style", D.architectural_style),
                    factRow("Structure", D.facade_material),
                    factRow("Surface", D.playing_surface + " \u00b7 Elev. " + D.elevation),
                    factRow("Lineage", e(React.Fragment, null, "Hilltop Park (1903\u20131912); Polo Grounds (1913\u20131922)", e("span", { className: "sub" }, "  \u2192  "), e("b", null, "Yankee Stadium (1923-2008)"), e("span", { className: "sub" }, "  \u2192  "), "Yankee Stadium (2009- present)")),
                    factRow("Cost", e(React.Fragment, null, D.stadium_cost, e("span", { className: "sub" }, " (" + D.stadium_cost_adjusted + " adj.) \u00b7 " + D.financing_method.replace("Privately financed by Yankees owners ", "Privately financed, ").replace(" and ", " & ")))),
                    factRow("Address", D.address),
                    factRow("Renovations", D.renovations)))),

              /* field dimensions */
              e("div", { className: "yk-fieldcol" },
                e("div", { className: "hd" }, "Field Dimensions"),
                Protractor ? e(Protractor, { className: "pro", orientation: D.orientation, degrees: D.orientation_degrees }) : null,
                e("div", { className: "yk-dimrow" },
                  dim(D.left_field_distance, "LF"),
                  dim(D.center_field_distance, "CF"),
                  dim(D.right_field_distance, "RF")),
                e("div", { className: "yk-fieldnote" }, "Oriented " + D.orientation + " \u00b7 bearing " + D.orientation_degrees + "\u00b0")),

              /* lifecycle */
              e("div", { className: "yk-life" },
                e("div", { className: "hd" }, "A Bronx Monument \u00b7 Life Cycle"),
                D.lifecycle.map((s, i) => e("div", { className: "yk-liferow", key: i },
                  e("div", { className: "y" }, s.year),
                  e("div", { className: "lab" }, s.label, e("span", { className: "n" }, "  \u2014  " + s.note)))))
            ),

            /* Honors — All-Star + World Series as one decorative year-rule between sections */
            e("div", { className: "yk-honors" },
              e("div", { className: "hgroup" },
                e("span", { className: "hlab" }, "All-Star Games"),
                e("div", { className: "yk-ws-grid" },
                  D.allstar_years.split(" \u00b7 ").map((y, i) => e("div", { className: "yk-ws-y", key: i }, "\u2019" + y.slice(2))))),
              e("div", { className: "hsep" }),
              e("div", { className: "hgroup" },
                e("span", { className: "hlab" }, "World Series"),
                e("div", { className: "yk-ws-grid" },
                  D.world_series.map((y, i) => e("div", { className: "yk-ws-y", key: i }, "\u2019" + y.slice(2))))))
          ),

          /* TIER 3 — Stadium Context (single unified block) */
          e("div", { className: "yk-context" },
            FieldPlan ? e(FieldPlan, { className: "yk-ctx-wm", lf: D.left_field_distance,
              cf: D.center_field_distance, rf: D.right_field_distance, stroke: "#5E6976", opacity: 0.10 }) : null,
            e("div", { className: "yk-ctxh" },
              e("div", { className: "t" }, "Stadium Context"),
              e("div", { className: "ln nav" }),
              e("div", { className: "ln" })),
            e("div", { className: "yk-ctx" },
              D.stadium_context.map((p, i) => e("p", { key: i }, p)))
          ),

          /* VISIT SECTION — night / navy illuminated band */
          e("div", { className: "yk-visit", "data-screen-label": "Visit section" },
            e("div", { className: "yk-visit-inner" },
              /* result */
              e("div", { className: "yk-vcol yk-result" },
                e("div", { className: "yk-vh" }, "Featured Game \u00b7 ", e("b", null, D.featured_game_title)),
                e("div", { className: "date" }, D.featured_visit_day + " \u00b7 " + D.featured_visit_date),
                e("div", { className: "yk-scorerow" + (awayWin ? " win" : "") },
                  e("div", { className: "tmwrap" },
                    e("img", { className: "logo", src: "assets/detroit-tigers-logo.svg", alt: "" }),
                    e("div", { className: "tm" }, D.away_team_abbreviation)),
                  e("div", { className: "sc" }, D.box.away.r)),
                e("div", { className: "yk-scorerow" + (!awayWin ? " win" : "") },
                  e("div", { className: "tmwrap" },
                    e("img", { className: "logo", src: "assets/new-york-yankees-logo.svg", alt: "" }),
                    e("div", { className: "tm" }, D.home_team_abbreviation)),
                  e("div", { className: "sc" }, D.box.home.r)),
                e("div", { className: "venue" }, D.away_team + " at " + D.home_team)),

              /* line score + pitching + game-time conditions */
              e("div", { className: "yk-vcol" },
                e("div", { className: "yk-vh" }, "Line Score \u00b7 " + D.innings_played + " Innings"),
                LineScore(D.box),
                e("div", { className: "yk-botrow" },
                  e("div", { className: "yk-pitch" },
                    e("div", { className: "yk-prow" },
                      e("div", { className: "k" }, "Pitching Matchup"),
                      e("div", { className: "v" }, D.pitching_matchup)),
                    e("div", { className: "yk-prow" },
                      e("div", { className: "k" }, "Decision"),
                      e("div", { className: "v" }, e("b", null, "W: " + D.winning_pitcher), "  /  L: " + D.losing_pitcher))),
                  e("div", { className: "yk-wx" },
                    wx(D.temperature, "Temp"),
                    wx(D.conditions, "Sky"),
                    wx(D.wind, "Wind"),
                    wx(D.humidity, "Humidity")))),

              /* visit info */
              e("div", { className: "yk-vcol" },
                e("div", { className: "yk-vh" }, "Visit Information"),
                virow("Attendance", D.attendance),
                virow("First Pitch", D.first_pitch),
                virow("Duration", D.game_duration),
                virow("Total Visits", D.visit_total, "divtop"),
                virow("Other Visits", D.other_visits))
            )
          ),

          /* footer colophon */
          e("div", { className: "yk-foot" },
            e("span", { className: "plate" }, "Bronx Civic Frieze"),
            e("span", { className: "sep" }, "\u2014"),
            e("span", null, "Yankee Stadium, 161st St & River Ave \u00b7 ", D.coordinates),
            e("span", { className: "end" }, "Ruth-Era Triple-Deck Monument"))
        )
      )
    );

    function bay(id, ph) {
      return e("div", { className: "yk-bay" },
        e("div", { className: "frame" }, e(Slot, { id: id, placeholder: ph })));
    }
    function dim(v, l) {
      return e("div", { className: "chip" },
        e("div", { className: "n" }, (v || "").replace(" ft", "")),
        e("div", { className: "l" }, l));
    }
    function wx(val, lab) {
      return e("div", { className: "w" }, e("div", { className: "val" }, val), e("div", { className: "lab" }, lab));
    }
    function e_() { return null; }
  }

  window.YankeeSpread = Spread;
})();
