/* american-family-spread.jsx — the single American Family Field spread, "The Fan".
   Reads window.AMFAM + window.AmFamProtractor.
   LEFT  page: full-bleed night-aerial hero of the fan roof; navy ground.
   RIGHT page: warm paper drawn as the roof PLAN. A pivot hub sits just below
   the page bottom-center; structural ribs radiate up, concentric roof-track
   arcs sweep across, five photo panels fan across the crown, the data fills the
   roof bays, the protractor field-symbol sits at the pivot, the line score is a
   roof-track band, and the unified Stadium Context is the outermost roof panel.
   Every populated field renders exactly once. */
(function () {
  const e = React.createElement;
  const D = window.AMFAM;
  const Protractor = window.AmFamProtractor;

  // ---------- roof-fan geometry (right-page LOCAL coords, 0..1275 x 0..1088) ----------
  const HX = 436, HY = 1252;          // pivot hub, just below the page, under the fan region
  const HALF = 18, NW = 5;            // fan half-angle (deg) + number of roof panels
  const ribAngles = [];
  for (let i = 0; i <= NW; i++) ribAngles.push(-HALF + (2 * HALF) * i / NW);
  const wedgeCenters = [];
  for (let i = 0; i < NW; i++) wedgeCenters.push((ribAngles[i] + ribAngles[i + 1]) / 2);

  const RAD = (a) => a * Math.PI / 180;
  function P(R, a) { return [HX + R * Math.sin(RAD(a)), HY - R * Math.cos(RAD(a))]; }
  // an arc path of radius R swept across the page (clipped by the page frame)
  function arcPath(R, a0, a1) {
    const p0 = P(R, a0), p1 = P(R, a1);
    return "M " + p0[0].toFixed(1) + " " + p0[1].toFixed(1) +
      " A " + R + " " + R + " 0 0 1 " + p1[0].toFixed(1) + " " + p1[1].toFixed(1);
  }

  const R_CROWN = 1140;   // photo-panel centers ride this arc
  const TRACKS = [1228, 985, 742, 505]; // roof-track arc radii (outer -> inner)

  function Slot(props) {
    return e("image-slot", Object.assign({ id: props.id, placeholder: props.placeholder, shape: "rect", src: props.src },
      props.style ? { style: props.style } : {}));
  }
  function SecHead(props) {
    return e("div", { className: "amf-h" + (props.brick ? " brick" : "") },
      e("span", { className: "t" }, props.title),
      props.note ? e("span", { className: "n", style: props.noteStyle || undefined }, props.note) : null);
  }
  function factRow(row, i) {
    return e("div", { className: "amf-frow", key: i },
      e("div", { className: "k" }, row[0]),
      e("div", { className: "v" },
        e("span", { className: "vm" }, row[1]),
        row[2] ? e("span", { className: "vs" }, row[2]) : null));
  }
  function WxIcon(kind) {
    const c = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "#564E40",
      strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round", className: "amf-wico" };
    if (kind === "temp") return e("svg", c, e("path", { d: "M14 14.5V5a2 2 0 1 0-4 0v9.5a4 4 0 1 0 4 0z" }), e("path", { d: "M12 14V8" }));
    if (kind === "sky") return e("svg", c, e("circle", { cx: 12, cy: 12, r: 4.6 }),
      e("path", { d: "M12 3v1.8M12 19.2V21M3 12h1.8M19.2 12H21M5.5 5.5l1.3 1.3M17.2 17.2l1.3 1.3M18.5 5.5l-1.3 1.3M6.8 17.2l-1.3 1.3" }));
    if (kind === "wind") return e("svg", c, e("path", { d: "M3 8h10a2.4 2.4 0 1 0-2.4-2.4M3 16h13a2.4 2.4 0 1 1-2.4 2.4M3 12h7" }));
    if (kind === "drop") return e("svg", c, e("path", { d: "M12 2.8l5 6.2a6.4 6.4 0 1 1-10 0z" }));
    return null;
  }
  function wxCell(icon, value, label) {
    return e("div", { className: "amf-wcell" }, WxIcon(icon),
      e("div", { className: "tx" }, e("div", { className: "wv" }, value), e("div", { className: "wl" }, label)));
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
    return e("table", { className: "amf-box" },
      e("thead", null, e("tr", null,
        e("th", { className: "tm" }, ""),
        cols.map((n) => e("th", { key: n, className: "inn" }, n)),
        e("th", { className: "sep" }, "R"), e("th", null, "H"), e("th", null, "E"))),
      e("tbody", null,
        row(box.away, box.away.r > box.home.r),
        row(box.home, box.home.r > box.away.r)));
  }

  // ---------- SVG roof-plan armature for the right page ----------
  function RoofPlan() {
    const ribs = ribAngles.map((a, i) => {
      const p = P(1320, a);
      const bold = (i === 0 || i === NW);
      return e("line", { key: "r" + i, x1: HX, y1: HY, x2: p[0].toFixed(1), y2: p[1].toFixed(1),
        stroke: bold ? "#9C988F" : "#ACA89F", strokeWidth: bold ? 1.5 : 1, opacity: bold ? 0.42 : 0.26 });
    });
    // panel-seam ticks along each track where ribs cross (roof-track rivets)
    const rivets = [];
    TRACKS.forEach((R, ti) => {
      ribAngles.forEach((a, ri) => {
        const p = P(R, a);
        rivets.push(e("circle", { key: "rv" + ti + "-" + ri, cx: p[0].toFixed(1), cy: p[1].toFixed(1),
          r: 2, fill: "#9C988F", opacity: 0.4 }));
      });
    });
    return e("svg", { className: "amf-roofsvg", viewBox: "0 0 1275 1088", preserveAspectRatio: "none" },
      // track arcs sweep right across the whole page (into the context panel)
      TRACKS.map((R, i) =>
        e("path", { key: "t" + i, d: arcPath(R, -HALF - 24, 62), fill: "none",
          stroke: i === 0 ? "#9C988F" : "#ACA89F", strokeWidth: i === 0 ? 1.5 : 1.1, opacity: i === 0 ? 0.45 : 0.26 })),
      ribs,
      rivets,
      // hub pivot mark
      e("circle", { cx: HX, cy: HY, r: 8, fill: "none", stroke: "#9C988F", strokeWidth: 1.2, opacity: 0.5 }),
      e("circle", { cx: HX, cy: HY, r: 2.6, fill: "#9E3B2E", opacity: 0.7 })
    );
  }

  // ---------- photo panels fanned across the crown ----------
  function PhotoFan() {
    const W = 156, H = 117;
    return e("div", { className: "amf-fan" },
      D.panels.map((pn, i) => {
        const a = wedgeCenters[i];
        const c = P(R_CROWN, a);
        const z = 10 - Math.abs(i - (NW - 1) / 2); // center panel on top, like a folding fan
        return e("figure", { className: "amf-panel", key: i,
          style: { left: (c[0] - W / 2).toFixed(1) + "px", top: (c[1] - H / 2).toFixed(1) + "px",
            width: W + "px", height: H + "px", transform: "rotate(" + a.toFixed(1) + "deg)", zIndex: Math.round(z) } },
          e(Slot, { id: pn[0], placeholder: pn[1], src: pn[3] }));
      }));
  }

  function Spread() {
    return e("div", { className: "amf-spread", "data-screen-label": "American Family Field spread" },

      /* ================= LEFT PAGE / HERO ================= */
      e("div", { className: "amf-page amf-left", "data-screen-label": "American Family Field — hero" },
        e("div", { className: "amf-hero-slot" },
          e(Slot, { id: "amfam-hero", src: "images/american-family/miller-park-00-main-c17983a5.jpg", placeholder: "Drop the American Family Field hero \u2014 night aerial of the fan-shaped retractable roof, brick-and-steel mass, surrounding lots & the Menomonee valley" })),
        e("div", { className: "amf-hero-scrim" }),

        e("img", { className: "amf-hero-logo", src: "assets/milwaukee-brewers-logo.svg", alt: "Milwaukee Brewers" }),
        e("div", { className: "amf-spine" }, "EST. " + D.est + "  \u00b7  MILWAUKEE, WISCONSIN  \u00b7  VISIT " + D.visit_order),

        // a single faint roof-track datum line across the hero — the fan idea, stated quietly
        e("div", { className: "amf-roofline" },
          e("span", { className: "tk" }), e("span", { className: "ln" }),
          e("span", { className: "cap" }, "FAN-SHAPED RETRACTABLE ROOF"),
          e("span", { className: "ln" }), e("span", { className: "tk" })),

        e("div", { className: "amf-hero-title" },
          D.name_lines.map((ln, i) => e("h1", { className: "amf-name", "data-t": ln, key: i }, ln)),
          e("div", { className: "amf-sub" },
            e("span", { className: "bar" }),
            e("span", { className: "txt" }, D.city + ", " + D.state))),

        e("div", { className: "amf-marks" },
          e("img", { className: "mlb", src: "assets/mlb-logo.svg", alt: "Major League Baseball" }),
          e("span", { className: "divln" }),
          e("img", { className: "nl", src: "assets/nl-logo.png", alt: "National League" }),
          e("span", { className: "divln" }),
          e("span", { className: "dv" }, "National League \u00b7 " + D.division))
      ),

      /* ================= RIGHT PAGE / THE ROOF PLAN ================= */
      e("div", { className: "amf-page amf-right", "data-screen-label": "American Family Field — roof plan" },
        e(RoofPlan, null),
        e(PhotoFan, null),

        /* ---- identity / classification — the main roof track ---- */
        e("div", { className: "amf-identity" },
          e("div", { className: "amf-id-mark" },
            e("img", { src: "assets/milwaukee-brewers-ball-in-glove.svg", alt: "Milwaukee Brewers" })),
          D.identity.map((row, i) =>
            e("div", { className: "amf-id-cell", key: i },
              e("div", { className: "rl" }, row[0]),
              e("div", { className: "rv" }, row[1])))
        ),

        /* ---- stadium facts (left bay) + construction (right bay) ---- */
        e("div", { className: "amf-specs" },
          e("div", { className: "amf-bay left" },
            e(SecHead, { title: "Stadium Facts", note: "MUSEUM RECORD" }),
            e("div", { className: "amf-facts" }, D.facts.map(factRow))),
          e("div", { className: "amf-bay right" },
            e(SecHead, { title: "Construction & Lifecycle", note: "1996\u2013PRESENT" }),
            e("div", { className: "amf-facts" }, D.lifecycle.map(factRow)))
        ),

        /* ---- field dimensions + protractor, AT the pivot hub ---- */
        e("div", { className: "amf-hub" },
          e("div", { className: "amf-hub-head" },
            e("span", { className: "t" }, "Field Dimensions"),
            e("span", { className: "n" }, "ORIENTED " + D.field.orientation + " \u00b7 " + D.field.degrees + "\u00b0")),
          e("figure", { className: "amf-fieldfig" },
            Protractor ? e(Protractor, { lf: D.field.left_field, cf: D.field.center_field,
              rf: D.field.right_field, orientation: D.field.orientation, degrees: D.field.degrees }) : null)),

        /* ---- the lower apron beneath the fan: the visit ---- */
        e("div", { className: "amf-apron" },
          e("div", { className: "amf-apron-head" },
            e("span", { className: "tag" }, "The Visit"),
            e("span", { className: "ttl" }, "Brewers 4, Braves 3"),
            e("span", { className: "meta" }, D.game_day + " \u00b7 " + D.game_date + " \u00b7 " + D.weather.temperature + " " + D.weather.conditions)),

          e("div", { className: "amf-apron-grid" },
            // featured visit facts
            e("div", { className: "amf-acol vis" },
              e(SecHead, { title: "Featured Visit", brick: true }),
              e("div", { className: "amf-facts tight" }, D.visit.map(factRow))),
            // pitching
            e("div", { className: "amf-acol mid" },
              e(SecHead, { title: "Pitching", brick: true }),
              e("div", { className: "amf-pitch" },
                e("div", { className: "match" },
                  e("em", null, D.pitching.away_team),
                  e("span", null, D.pitching.away),
                  e("span", { className: "vs" }, "vs"),
                  e("em", null, D.pitching.home_team),
                  e("span", null, D.pitching.home)),
                e("div", { className: "dec" },
                  e("p", null, e("b", null, "W"), " ", e("i", null, D.pitching.win)),
                  e("p", null, e("b", null, "L"), " ", e("i", null, D.pitching.loss)),
                  e("p", { className: "sv" }, e("b", null, "S"), " ", e("i", null, D.pitching.save))))),
            // line score as a roof-track band, with the weather strip beneath it
            e("div", { className: "amf-acol score" },
              e(SecHead, { title: "Line Score", note: "FINAL \u00b7 " + D.box.innings + " \u00b7 " + D.game_duration, brick: true }),
              LineScore(D.box),
              e("div", { className: "amf-gcap" },
                e("span", null, "Att. " + D.visit[5][1]),
                e("span", { className: "sp" }, "\u00b7"),
                e("span", null, "First pitch 6:15 PM CDT")),
              e("div", { className: "amf-wx-track" },
                e("span", { className: "amf-wx-rail" }, "Weather"),
                e("div", { className: "amf-weather row" },
                  wxCell("temp", D.weather.temperature, "Temp"),
                  wxCell("sky", "Clear", "Sky"),
                  wxCell("wind", "5 WSW", "Wind"),
                  wxCell("drop", D.weather.humidity, "Humidity"))))
          )
        ),

        /* ---- steel mullion separating the fan from the context panel ---- */
        e("div", { className: "amf-mullion" }),

        /* ---- the outermost roof panel: unified Stadium Context ---- */
        e("div", { className: "amf-context" },
          e("div", { className: "amf-ctx-watermark" },
            e("img", { src: "assets/wisconsin-outline.svg", alt: "" })),
          e(SecHead, { title: "The Pivoting Fan", note: "MILLER PARK \u2192 AMERICAN FAMILY FIELD", noteStyle: { letterSpacing: "-0.7px", fontSize: "12px" } }),
          e("div", { className: "amf-prose" },
            D.stadium_context.map((p, i) => e("p", { key: i }, p)))
        )
      )
    );
  }

  window.AmericanFamilySpread = Spread;
})();
