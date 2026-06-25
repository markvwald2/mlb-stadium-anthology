/* yankee2009-frieze-spread.jsx — "The Franchise Frieze" two-page spread for
   Yankee Stadium (2009). Reads window.YK2009 (factual authority) and
   window.YK2009Protractor (subordinate field datum).

   Controlling metaphor: memory became a building material. The right page is
   a monumental limestone-facade ELEVATION — a continuous replicated frieze
   running across the top as the organizing datum, with FIVE structural bays
   beneath it. Each bay is one information family. The page reads like an
   architectural section of institutional memory inhabited by data.

   Geometry: 2550×1088 design canvas, fold at x=1275. Nothing readable in the
   gutter; no module crosses the split; the frieze terminates cleanly at the
   fold. Every populated value placed once; empties omitted; nothing invented.
   The concept render is visual direction only and is NOT a data source. */
(function () {
  const e = React.createElement;
  const D = window.YK2009;
  const Protractor = window.YK2009Protractor;

  function Slot(props) {
    return e("image-slot", { id: props.id, src: props.src, placeholder: props.placeholder, shape: "rect" });
  }

  /* ---- Replicated frieze, rendered as a carved limestone arcade band ----
     A monumental elevation of the Yankee frieze: limestone rail + round-top
     arcade openings recessed into stone shadow, engraved hairlines, a row of
     keystone beads, and a navy datum rule anchoring the bays beneath it.
     Quiet full-bleed architecture — allowed to pass to the cut edges. */
  function Frieze(props) {
    const H = props.h || 70;
    const vw = props.vw || 1275;
    const stone = props.stone || "#E7E1D2";
    const shadow = props.shadow || "#C8BFA8";
    const cell = props.cell || 30;
    const n = Math.max(2, Math.round(vw / cell));
    const c = vw / n;
    const railH = Math.round(H * 0.34);     // solid top rail
    const pier = Math.max(3, c * 0.34);     // pier width between arches
    const ow = c - pier;                    // opening width
    let r = ow / 2; const maxR = H - railH - 4; if (r > maxR) r = maxR;
    const springY = railH + r;
    const bottom = H;
    // solid band with arched openings cut out (evenodd) → openings reveal shadow plane
    let d = "M 0 0 H " + vw + " V " + bottom + " H 0 Z ";
    for (let i = 0; i < n; i++) {
      if (i % 2 === 1) continue; // every other arch deleted
      const x0 = i * c + pier / 2, x1 = x0 + ow;
      d += "M " + x0.toFixed(2) + " " + bottom +
           " L " + x0.toFixed(2) + " " + springY.toFixed(2) +
           " A " + r.toFixed(2) + " " + r.toFixed(2) + " 0 0 1 " + x1.toFixed(2) + " " + springY.toFixed(2) +
           " L " + x1.toFixed(2) + " " + bottom + " Z ";
    }
    // paired ornament rectangles — combined span equals each arch's width, centered on the arch
    const ahGap = ow * 0.16, orW = (ow - ahGap) / 2, orH = orW * 1.5;
    const orY = railH * 0.5 - orH / 2;
    let beads = "";
    for (let i = 0; i < n; i++) {
      if (i % 2 === 1) continue; // rectangle set deleted with its arch
      const cx = i * c + c / 2;
      const lx = cx - ow / 2, rx = cx + ahGap / 2;
      beads += "M " + lx.toFixed(2) + " " + orY.toFixed(2) + " h " + orW.toFixed(2) + " v " + orH.toFixed(2) + " h " + (-orW).toFixed(2) + " Z ";
      beads += "M " + rx.toFixed(2) + " " + orY.toFixed(2) + " h " + orW.toFixed(2) + " v " + orH.toFixed(2) + " h " + (-orW).toFixed(2) + " Z ";
    }
    // two parallel vertical lines centered in each gap between arches, full height,
    // spaced one rectangle-width (orW) apart
    let dividers = "";
    let toprule = "";
    let xprev = 0;
    for (let i = 1; i < n; i += 2) {
      const gcx = i * c + c / 2;
      const gapL = gcx - orW / 2, gapR = gcx + orW / 2;
      dividers += "M " + gapL.toFixed(2) + " 0 V " + H + " ";
      dividers += "M " + gapR.toFixed(2) + " 0 V " + H + " ";
      toprule += "M " + xprev.toFixed(2) + " 2.5 H " + gapL.toFixed(2) + " ";
      xprev = gapR;
    }
    toprule += "M " + xprev.toFixed(2) + " 2.5 H " + vw + " ";
    return e("svg", { className: props.className, viewBox: "0 0 " + vw + " " + H,
      preserveAspectRatio: "none", "aria-hidden": "true",
      style: { display: "block", width: "100%", height: H + "px" } },
      e("rect", { x: 0, y: 0, width: vw, height: H, fill: shadow }),
      e("path", { d: d, fill: stone, fillRule: "evenodd", stroke: "#B7AE96", strokeWidth: 0.8 }),
      // engraved top rule — broken between each pair of vertical divider lines
      e("path", { d: toprule, stroke: "#CFC6B0", strokeWidth: 1, fill: "none" }),
      e("path", { d: beads, fill: shadow, stroke: "#B7AE96", strokeWidth: 0.8 }),
      e("path", { d: dividers, stroke: "#B7AE96", strokeWidth: 0.8, fill: "none" })
    );
  }

  /* ---- field helpers ---- */
  function ident(k, v, sm) {
    return e("div", { className: "yf-id" },
      e("div", { className: "k" }, k),
      e("div", { className: "v" + (sm ? " sm" : "") }, v));
  }
  function spec(k, v, sm) {
    return e("div", { className: "yf-sp" },
      e("div", { className: "k" }, k),
      e("div", { className: "v" + (sm ? " sm" : "") }, v));
  }
  function strip(v) { return (v || "").toString().replace(" ft", ""); }

  function LineScore(box) {
    const heads = []; for (let i = 1; i <= box.innings; i++) heads.push(i);
    function row(t, cls) {
      return e("tr", { className: cls },
        e("td", { className: "tm" }, t.abbr),
        t.byInning.map((nn, i) => e("td", { key: i }, nn)),
        e("td", { className: "rhe sep" }, t.r),
        e("td", { className: "rhe" }, t.h),
        e("td", { className: "rhe" }, t.e));
    }
    return e("table", { className: "yf-line" },
      e("thead", null,
        e("tr", null,
          e("th", { className: "tm" }, ""),
          heads.map((nn) => e("th", { key: nn }, nn)),
          e("th", { className: "sep" }, "R"), e("th", null, "H"), e("th", null, "E"))),
      e("tbody", null, row(box.away, "away"), row(box.home, "home")));
  }

  /* ---- a single lineage monument block ---- */
  function Lin(name, note, cur) {
    return e("div", { className: "yf-lin" + (cur ? " cur" : "") },
      e("div", { className: "nm" }, name),
      note ? e("div", { className: "nt" }, note) : null);
  }

  function Spread() {
    const homeWin = D.box.home.r > D.box.away.r;

    return e("div", { className: "yf-spread", "data-screen-label": "Yankee Stadium (2009) spread" },

      /* ===================== LEFT / DUSK FACADE HERO ===================== */
      e("div", { className: "yf-page yf-left", "data-screen-label": "Hero — Yankee Stadium 2009 facade at dusk" },
        e("div", { className: "yf-hero-slot" },
          e(Slot, { id: "yf-hero", src: "assets/yankee2009/bowl-interior.jpg", placeholder: "Drop the 2009 Yankee Stadium exterior \u2014 Indiana-limestone facade, replicated frieze, and monumental Gate entrance at dusk / overcast. The building is the subject; avoid field-level glamour and skyline shots." })),
        e("div", { className: "yf-hero-scrim" }),

        /* logo mast — restrained stone wells, top-left over sky */
        e("div", { className: "yf-hero-mast" },
          e("div", { className: "yf-logo-well" }, e("img", { src: "assets/mlb-logo.svg", alt: "Major League Baseball" })),
          e("div", { className: "yf-logo-well" }, e("img", { src: "assets/american-league-logo.png", alt: "American League" })),
          e("div", { className: "yf-logo-well" }, e("img", { src: "assets/new-york-yankees-logo.svg", alt: "New York Yankees" }))),

        /* carved limestone sign panel integrated at the base */
        e("div", { className: "yf-plaque" },
          e("div", { className: "yf-plaque-inner" },
            e("div", { className: "yf-plaque-kicker" }, "American League \u00b7 2009"),
            e("div", { className: "yf-plaque-row" },
              e("h1", { className: "yf-plaque-name" }, "Yankee Stadium")),
            e("div", { className: "yf-plaque-loc" }, "The Bronx, New York"))
        )
      ),

      /* ===================== RIGHT / FACADE ELEVATION ===================== */
      e("div", { className: "yf-page yf-right", "data-screen-label": "Editorial — Yankee Stadium 2009 facade elevation" },

        /* continuous replicated frieze — relocated to the page foot */
        e("div", { className: "yf-frieze-bleed" }),
        e("div", { className: "yf-frieze" },
          e("div", { className: "yf-frieze-base" }),
          e(Frieze, { h: 70, vw: 1275 })),

        /* running title across the frieze datum */
        e("div", { className: "yf-elev-title" },
          e("span", { className: "t" }, "The Franchise Frieze"),
          e("span", { className: "s" }, "Memory as a Building Material"),
          e("div", { className: "yf-retired" },
            e("span", { className: "rn" }, [1,2,3,4,5,6,7,8,8,9,10,15,16,20,21,23,32,37,42,42,44,46,49,51].join(" ")))),

        /* ---------------- five monumental bays ---------------- */
        e("div", { className: "yf-bays" },

          /* ===== BAY 1 — STADIUM IDENTITY ===== */
          e("section", { className: "yf-bay", "data-screen-label": "Bay 1 — Stadium Identity" },
            e("div", { className: "yf-bayhead" },
              e("div", { className: "no" }, "I"),
              e("div", { className: "tt" }, "Stadium", e("span", null, "Identity"))),
            e("div", { className: "yf-baybody" },
              ident("Team", "New York Yankees"),
              ident("League", "American League"),
              ident("Division", "AL East"),
              ident("Classification Era", "Retro Classic"),
              ident("Years Active", D.years_active),
              ident("Status", e("span", { className: "act" }, D.status)),
              ident("Coordinates", D.coordinates, true),
              ident("Elevation", D.elevation),
              ident("Address", e(React.Fragment, null, "1 East 161st Street", e("br"), "Bronx, NY 10451")),
              ident("Setting", D.location_classification),
              /* identity photo — fills the column above the field diagram */
              e("div", { className: "yf-id-photo" },
                e(Slot, { id: "yf-id-photo", src: "assets/yankee2009/ctx-judge.jpg", placeholder: "Gate / entry portal detail \u2014 the limestone Great Hall frontage or a monumental entrance arch (current stadium)" })),
              /* field-orientation datum — small, subordinate */
              e("div", { className: "yf-fielddatum" },
                e("div", { className: "hd" }, "Field \u00b7 Orientation"),
                e("div", { className: "row" },
                  Protractor ? e(Protractor, { className: "pro", orientation: D.orientation, degrees: D.orientation_degrees }) : null,
                  e("div", { className: "dims" },
                    e("div", { className: "dim" }, e("span", { className: "n" }, strip(D.left_field_distance)), e("span", { className: "l" }, "LF")),
                    e("div", { className: "dim" }, e("span", { className: "n" }, strip(D.center_field_distance)), e("span", { className: "l" }, "CF")),
                    e("div", { className: "dim" }, e("span", { className: "n" }, strip(D.right_field_distance)), e("span", { className: "l" }, "RF")))))
            )
          ),

          /* ===== BAY 2 — CONSTRUCTION & MONUMENT ===== */
          e("section", { className: "yf-bay", "data-screen-label": "Bay 2 — Construction & Monument" },
            e("div", { className: "yf-bayhead" },
              e("div", { className: "no" }, "II"),
              e("div", { className: "tt" }, "Construction", e("span", null, "& Monument"))),
            e("div", { className: "yf-baybody" },
              spec("Opened", e(React.Fragment, null, e("b", null, "Apr 16, 2009"), e("br"), e("span", { className: "sub" }, "Broke ground Aug 19, 2006"))),
              spec("Architect", e("b", null, D.architect)),
              spec("Capacity", e(React.Fragment, null, e("b", null, D.capacity_current), e("span", { className: "sub" }, " \u00b7 " + D.capacity_opening + " at opening"))),
              spec("Surface", "Natural grass \u00b7 Kentucky bluegrass"),
              spec("Cost", e(React.Fragment, null, e("b", null, D.stadium_cost), e("span", { className: "sub" }, " \u00b7 $3.45B adj."))),
              spec("Type", "Open-air baseball-only"),
              /* engraved cornerstone — the monument: style, facade, cost & financing */
              e("div", { className: "yf-cornerstone" },
                e("div", { className: "cs-text" },
                  e("div", { className: "k" }, "Architectural Style"),
                  e("div", { className: "v" }, D.architectural_style)),
                e("div", { className: "cs-text" },
                  e("div", { className: "k" }, "Facade"),
                  e("div", { className: "v" }, D.facade_material)),
                e("div", { className: "cs-fin" },
                  e("div", { className: "k" }, "Financing"),
                  e("div", { className: "v" }, D.financing_method)))
            )
          ),

          /* ===== BAY 3 — LINEAGE ===== */
          e("section", { className: "yf-bay", "data-screen-label": "Bay 3 — Lineage" },
            e("div", { className: "yf-bayhead" },
              e("div", { className: "no" }, "III"),
              e("div", { className: "tt" }, "Lineage of a", e("span", null, "Franchise"))),
            e("div", { className: "yf-baybody" },
              e("div", { className: "yf-lineage" },
                Lin("Hilltop Park", "Manhattan, 1903\u20131912"),
                e("div", { className: "yf-conn" }),
                Lin("Polo Grounds", "Manhattan, 1913\u20131922"),
                e("div", { className: "yf-conn" }),
                Lin("Yankee Stadium", "The Bronx, 1923\u20132008"),
                e("div", { className: "yf-conn" }),
                Lin("Yankee Stadium", "The Bronx, " + D.years_active, true)),
              /* interior bowl photo — fills the bay beneath the chain */
              e("div", { className: "yf-photostack" },
                e("div", { className: "yf-photo" },
                  e(Slot, { id: "yf-bowl", src: "assets/yankee2009/visit-monument-park.jpeg", placeholder: "Open-air bowl interior \u2014 the replicated white frieze along the roofline above the seating tiers" })))
            )
          ),

          /* ===== BAY 4 — STADIUM CONTEXT ===== */
          e("section", { className: "yf-bay yf-bay-ctx", "data-screen-label": "Bay 4 — Stadium Context" },
            e("div", { className: "yf-bayhead" },
              e("div", { className: "no" }, "IV"),
              e("div", { className: "tt" }, "Stadium", e("span", null, "Context"))),
            e("div", { className: "yf-baybody" },
              e("div", { className: "yf-ctx" },
                e("p", null, D.stadium_context[0]),
                e("p", null, D.stadium_context[1]),
                e("div", { className: "yf-ctx-photo" },
                  e(Slot, { id: "yf-ctx-photo", src: "assets/yankee2009/hero-facade.jpg", placeholder: "The monumental limestone street wall along River Avenue / 161st Street \u2014 facade and replicated frieze in its Bronx setting" })),
                e("p", null, D.stadium_context[2]),
                e("p", null, D.stadium_context[3])))
          ),

          /* ===== BAY 5 — VISIT & GAME ARTIFACT ===== */
          e("section", { className: "yf-bay yf-bay-visit", "data-screen-label": "Bay 5 — Visit & Game Artifact" },
            e("div", { className: "yf-bayhead" },
              e("div", { className: "no" }, "V"),
              e("div", { className: "tt" }, "Visit &", e("span", null, "Game Artifact"))),
            e("div", { className: "yf-baybody" },
              /* featured game header */
              e("div", { className: "yf-game-hd" },
                e("div", { className: "ttl" }, "Featured Game \u00b7 ", e("b", null, D.featured_game_title)),
                e("div", { className: "dt" }, D.featured_visit_day + " \u00b7 " + D.featured_visit_date)),
              /* scoreline */
              e("div", { className: "yf-scores" },
                e("div", { className: "yf-srow" + (!homeWin ? " win" : "") },
                  e("img", { className: "lg", src: "assets/twins-insignia.svg", alt: "Minnesota Twins" }),
                  e("div", { className: "ab" }, D.away_team_abbreviation),
                  e("div", { className: "sc" }, D.box.away.r)),
                e("div", { className: "yf-srow" + (homeWin ? " win" : "") },
                  e("img", { className: "lg", src: "assets/yankees-ny-insignia.svg", alt: "New York Yankees" }),
                  e("div", { className: "ab" }, D.home_team_abbreviation),
                  e("div", { className: "sc" }, D.box.home.r))),
              e("div", { className: "yf-matchup" }, D.away_team + " at " + D.home_team),
              e("div", { className: "yf-startline" }, "Starters \u00b7 " + D.pitching_matchup),

              /* line score — refined archival scoreboard insert */
              LineScore(D.box),

              /* decisions */
              e("div", { className: "yf-dec" },
                e("span", null, e("b", null, "W"), " " + D.win_pitcher),
                e("span", null, e("b", null, "L"), " " + D.loss_pitcher),
                e("span", null, e("b", null, "S"), " " + D.save_pitcher)),

              /* weather strip */
              e("div", { className: "yf-wx" },
                e("div", { className: "w" }, e("div", { className: "val" }, D.temperature), e("div", { className: "lab" }, "Temp")),
                e("div", { className: "w" }, e("div", { className: "val" }, D.conditions), e("div", { className: "lab" }, "Sky")),
                e("div", { className: "w" }, e("div", { className: "val" }, D.wind), e("div", { className: "lab" }, "Wind")),
                e("div", { className: "w" }, e("div", { className: "val" }, D.humidity), e("div", { className: "lab" }, "Humidity"))),

              /* visit ledger */
              e("div", { className: "yf-ledger" },
                e("div", { className: "lr" }, e("div", { className: "k" }, "Attendance"), e("div", { className: "v" }, D.attendance)),
                e("div", { className: "lr" }, e("div", { className: "k" }, "First Pitch"), e("div", { className: "v" }, D.first_pitch)),
                e("div", { className: "lr" }, e("div", { className: "k" }, "Duration"), e("div", { className: "v" }, D.game_duration)),
                e("div", { className: "lr" }, e("div", { className: "k" }, "Trip"), e("div", { className: "v" }, D.trip_name)),
                e("div", { className: "lr" }, e("div", { className: "k" }, "Visit"), e("div", { className: "v" }, "No. " + D.visit_order + " of 42"))),
              /* visit photo — fills the foot of the column */
              e("div", { className: "yf-visit-photo" },
                e(Slot, { id: "yf-visit-photo", src: "assets/yankee2009/id-group-field.jpeg", placeholder: "May 3, 2019 \u2014 the group at Yankee Stadium, or a night-game view under the lights (light drizzle)" }))
            )
          ),
          /* combined photo spanning Bays 2–3 (facade + Monument Park) */
          e("div", { className: "yf-span-photo" },
            e(Slot, { id: "yf-facade-monument", src: "assets/yankee2009/span-worldseries.jpg", placeholder: "Indiana-limestone facade & replicated frieze with Monument Park / museum memory \u2014 the building's civic exterior and its memorial heart (wide landscape)" }))
        )
      )
    );
  }

  window.YK2009FriezeSpread = Spread;
})();
