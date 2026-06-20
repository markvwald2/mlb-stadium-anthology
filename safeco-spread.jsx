/* tmobile-spread.jsx — the single T-Mobile Park spread, "Shelter Without Walls".
   Reads window.TMOBILE + window.TMobileProtractor.
   LEFT  page: full-bleed elevated hero of the retractable canopy over the field
   and the SoDo rail corridor; deep teal-charcoal ground, compact steel-signage
   title beneath a canopy rule, engineering-annotation metadata stack.
   RIGHT page: warm paper organized as ROOF BAYS beneath a faint exposed-steel
   canopy armature. Top: a 5-image photo strip with steel dividers. Then the
   identity track, a stadium data shelf (facts | construction & lifecycle | field
   instrument + logos + tags), the unified Stadium Context as a full-width 3-bay
   text field, and a compact Visit scorecard band whose line score is the
   dominant object. Every populated field renders exactly once. */
(function () {
  const e = React.createElement;
  const D = window.TMOBILE;
  const Protractor = window.TMobileProtractor;

  function Slot(props) {
    return e("image-slot", Object.assign({ id: props.id, placeholder: props.placeholder, shape: "rect" },
      props.style ? { style: props.style } : {}));
  }
  function SecHead(props) {
    return e("div", { className: "tm-h" + (props.green ? " green" : "") },
      e("span", { className: "t" }, props.title),
      props.note ? e("span", { className: "n" }, props.note) : null);
  }
  function factRow(row, i) {
    return e("div", { className: "tm-frow", key: i },
      e("div", { className: "k" }, row[0]),
      e("div", { className: "v" },
        e("span", { className: "vm" }, row[1]),
        row[2] ? e("span", { className: "vs" }, row[2]) : null));
  }
  function LineScore(box) {
    const cols = [];
    for (let i = 1; i <= box.innings; i++) cols.push(i);
    function row(t, win) {
      return e("tr", { className: win ? "win" : "" },
        e("td", { className: "tm" }, t.abbr),
        t.byInning.map((n, i) => e("td", { key: i, className: "inn" }, n)),
        e("td", { className: "rcol sep" }, t.r),
        e("td", { className: "hecol" }, t.h),
        e("td", { className: "hecol" }, t.e));
    }
    return e("table", { className: "tm-box" },
      e("thead", null, e("tr", null,
        e("th", { className: "tm" }, ""),
        cols.map((n) => e("th", { key: n, className: "inn" }, n)),
        e("th", { className: "sep" }, "R"), e("th", null, "H"), e("th", null, "E"))),
      e("tbody", null,
        row(box.away, box.away.r > box.home.r),
        row(box.home, box.home.r > box.away.r)));
  }

  // ---------- faint exposed-steel canopy armature behind the right page ----------
  function CanopyArmature() {
    // shallow concentric canopy ribs sweeping across the page + light truss verticals
    const ribs = [];
    const cx = 637, cy = 2150;            // far below page: gives broad, shallow arcs
    const radii = [1980, 1900, 1820, 1740, 1660];
    radii.forEach((R, i) => {
      const a0 = -34, a1 = 34;
      const p0 = [cx + R * Math.sin(a0 * Math.PI / 180), cy - R * Math.cos(a0 * Math.PI / 180)];
      const p1 = [cx + R * Math.sin(a1 * Math.PI / 180), cy - R * Math.cos(a1 * Math.PI / 180)];
      ribs.push(e("path", { key: "rib" + i,
        d: "M " + p0[0].toFixed(1) + " " + p0[1].toFixed(1) + " A " + R + " " + R + " 0 0 1 " + p1[0].toFixed(1) + " " + p1[1].toFixed(1),
        fill: "none", stroke: "#6E777D", strokeWidth: i === 0 ? 2.2 : 1.5, opacity: i === 0 ? 0.42 : 0.27 }));
    });
    // radial truss members
    const spokes = [];
    for (let a = -30; a <= 30; a += 10) {
      const Ra = 2000, Rb = 1620;
      const pa = [cx + Ra * Math.sin(a * Math.PI / 180), cy - Ra * Math.cos(a * Math.PI / 180)];
      const pb = [cx + Rb * Math.sin(a * Math.PI / 180), cy - Rb * Math.cos(a * Math.PI / 180)];
      spokes.push(e("line", { key: "sp" + a, x1: pa[0].toFixed(1), y1: pa[1].toFixed(1), x2: pb[0].toFixed(1), y2: pb[1].toFixed(1),
        stroke: "#6E777D", strokeWidth: 1.2, opacity: 0.22 }));
    }
    return e("svg", { className: "tm-armature", viewBox: "0 0 1275 1088", preserveAspectRatio: "none" }, ribs, spokes);
  }

  // ---------- photo strip (roof bays) ----------
  function PhotoStrip() {
    return e("div", { className: "tm-strip" },
      D.panels.map((pn, i) =>
        e("figure", { className: "tm-plate", key: i },
          e(Slot, { id: pn[0], placeholder: pn[1] }))));
  }

  function Spread() {
    return e("div", { className: "tm-spread", "data-screen-label": "Safeco Field spread" },

      /* ================= LEFT PAGE / HERO ================= */
      e("div", { className: "tm-page tm-left", "data-screen-label": "Safeco Field — hero" },
        e("div", { className: "tm-hero-slot" },
          e(Slot, { id: "tmobile-hero", placeholder: "Drop the Safeco Field hero \u2014 elevated / aerial view where the retractable steel canopy is unmistakable above the lit field, with the SoDo rail corridor, port cranes & downtown edge beyond" })),
        e("div", { className: "tm-hero-scrim" }),

        e("img", { className: "tm-hero-logo", src: "assets/seattle-mariners-logo.svg", alt: "Seattle Mariners" }),
        e("div", { className: "tm-folio" }, "VISIT NO. " + D.visit_order),
        e("div", { className: "tm-spine" }, "EST. " + D.est + "  \u00b7  SEATTLE, WASHINGTON  \u00b7  VISIT " + D.visit_order),

        // a single canopy datum line across the hero — the shelter idea, stated quietly
        e("div", { className: "tm-roofline" },
          e("span", { className: "tk" }), e("span", { className: "ln" }),
          e("span", { className: "cap" }, "RETRACTABLE CANOPY ROOF"),
          e("span", { className: "ln" }), e("span", { className: "tk" })),

        e("div", { className: "tm-hero-title" },
          D.name_lines.map((ln, i) => e("h1", { className: "tm-name", key: i }, ln)),
          e("div", { className: "tm-sub" },
            e("span", { className: "bar" }),
            e("span", { className: "txt" }, D.city + ", " + D.state))),

        // engineering-annotation metadata stack, lower-right of the hero
        e("div", { className: "tm-annot" },
          e("div", { className: "tm-annot-row" },
            e("span", { className: "al" }, "COORD"),
            e("span", { className: "av" }, D.coord_lines[0]), e("span", { className: "av" }, D.coord_lines[1])),
          e("div", { className: "tm-annot-row" },
            e("span", { className: "al" }, "ELEV"),
            e("span", { className: "av" }, D.elevation)),
          e("div", { className: "tm-annot-row" },
            e("span", { className: "al" }, "OPENED"),
            e("span", { className: "av" }, "1999"))),

        e("div", { className: "tm-marks" },
          e("img", { className: "mlb", src: "assets/mlb-logo.svg", alt: "Major League Baseball" }),
          e("span", { className: "divln" }),
          e("img", { className: "al", src: "assets/american-league-logo.png", alt: "American League" }),
          e("span", { className: "divln" }),
          e("span", { className: "dv" }, "American League \u00b7 " + D.division))
      ),

      /* ================= RIGHT PAGE / THE ROOF BAYS ================= */
      e("div", { className: "tm-page tm-right", "data-screen-label": "Safeco Field — roof bays" },
        e(CanopyArmature, null),

        /* ---- top photo strip (structural observations) ---- */
        e(PhotoStrip, null),

        /* ---- identity / classification — the main canopy track ---- */
        e("div", { className: "tm-identity" },
          e("div", { className: "tm-id-mark" },
            e("img", { src: "assets/seattle-mariners-logo.svg", alt: "Seattle Mariners" })),
          D.identity.map((row, i) =>
            e("div", { className: "tm-id-cell", key: i },
              e("div", { className: "rl" }, row[0]),
              e("div", { className: "rv" }, row[1])))
        ),

        /* ============ STADIUM SECTION ============ */
        e("div", { className: "tm-sec-rule tm-sec-stadium" },
          e("span", { className: "lbl" }, "Stadium Section"),
          e("span", { className: "sub" }, "Shelter Without Walls")),

        /* ---- data shelf: facts | construction & lifecycle | field + logos ---- */
        e("div", { className: "tm-shelf" },
          // bay 1 — stadium facts
          e("div", { className: "tm-bay b1" },
            e(SecHead, { title: "Stadium Facts", note: "MUSEUM RECORD" }),
            e("div", { className: "tm-facts" }, D.facts.map(factRow))),

          // bay 2 — construction & lifecycle + name history
          e("div", { className: "tm-bay b2" },
            e(SecHead, { title: "Construction & Lifecycle", note: "1997\u2013PRESENT" }),
            e("div", { className: "tm-facts" }, D.lifecycle.map(factRow)),
            e("div", { className: "tm-namehist" },
              e("div", { className: "lab" }, "Name History"),
              e("div", { className: "val" },
                D.name_history.split(/(\([^)]*\))/).map(function (s, i) {
                  return /^\(/.test(s) ? e("span", { key: i, className: "yr" }, s) : s;
                }))),
            e("div", { className: "tm-reno" }, D.renovations)),

          // bay 3 — field instrument + logos + tags
          e("div", { className: "tm-bay b3" },
            e("div", { className: "tm-b3-top" },
              e("div", { className: "tm-field" },
                e(SecHead, { title: "Field Dimensions" }),
                e("figure", { className: "tm-fieldfig" },
                  Protractor ? e(Protractor, { lf: D.field.left_field, cf: D.field.center_field,
                    rf: D.field.right_field, orientation: D.field.orientation, degrees: D.field.degrees }) : null)),
              e("div", { className: "tm-marks-r" },
                e(SecHead, { title: "Affiliation" }),
                e("div", { className: "tm-marks-body" },
                  e("div", { className: "tm-marks-row" },
                    e("img", { src: "assets/seattle-mariners-logo.svg", alt: "Seattle Mariners" }),
                    e("img", { src: "assets/american-league-logo.png", alt: "American League" }),
                    e("img", { className: "mlb", src: "assets/mlb-logo.svg", alt: "Major League Baseball" })),
                  e("div", { className: "tm-tags" },
                    D.tags.map((t, i) => e("span", { className: "tm-tag", key: i }, t))),
                  e("div", { className: "tm-class" }, D.classification_line)))))
        ),

        /* ---- unified Stadium Context, full-width 3-bay text field ---- */
        e("div", { className: "tm-context" },
          e(SecHead, { title: "Stadium Context", note: "ONE UNIFIED RECORD", green: true }),
          e("div", { className: "tm-prose" },
            D.stadium_context.map((p, i) => e("p", { key: i }, p)))
        ),

        /* ============ VISIT SECTION ============ */
        e("div", { className: "tm-visit" },
          e("div", { className: "tm-visit-head" },
            e("span", { className: "tag" }, "The Visit"),
            e("span", { className: "ttl" }, D.visit_result),
            e("span", { className: "meta" }, D.visit_matchup + "  \u00b7  " + D.visit_day + ", " + D.visit_date)),

          e("div", { className: "tm-visit-grid" },
            // featured visit facts
            e("div", { className: "tm-vcol facts" },
              e(SecHead, { title: "Featured Visit", green: true }),
              e("div", { className: "tm-facts tight" }, D.visit_facts.map(factRow))),

            // pitching decisions
            e("div", { className: "tm-vcol pitch" },
              e(SecHead, { title: "Pitching", green: true }),
              e("div", { className: "tm-pitch" },
                e("p", { className: "match" },
                  e("em", null, D.pitching.away_team), " ", D.pitching.away_starter,
                  e("span", { className: "vs" }, "  vs  "),
                  e("em", null, D.pitching.home_team), " ", D.pitching.home_starter),
                e("p", { className: "dec" },
                  e("b", null, "W"), " ", e("i", null, D.pitching.win),
                  e("span", { className: "sp" }, "  \u00b7  "),
                  e("b", null, "L"), " ", e("i", null, D.pitching.loss),
                  e("br", null),
                  e("b", null, "S"), " ", e("i", null, D.pitching.save))),
              e("div", { className: "tm-cond" }, D.conditions)),

            // line score — the dominant object
            e("div", { className: "tm-vcol score" },
              e(SecHead, { title: "Line Score", note: "FINAL \u00b7 " + D.box.innings + " INN \u00b7 " + D.game_duration, green: true }),
              LineScore(D.box),
              e("div", { className: "tm-gcap" },
                e("span", null, "First pitch " + D.first_pitch),
                e("span", { className: "sp" }, "\u00b7"),
                e("span", null, "Att. " + D.attendance)))
          )
        )
      )
    );
  }

  window.TMobileSpread = Spread;
})();
