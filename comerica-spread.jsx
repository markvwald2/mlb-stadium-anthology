/* comerica-spread.jsx — "The Civic Gateway" two-page spread for Comerica Park.
   Left page: a dusk arrival hero with an engraved limestone title block.
   Right page: the brick façade IS the editorial grid — three architectural bays
   (Stadium Facts · Stadium Context · Visit Information) framed by brick piers,
   steel lintels, limestone caps, and engraved-stone keystones, over a limestone
   base course carrying address, coordinates, and capacity.
   Reads window.COMERICA, window.ComericaProtractor. Local data only — every
   populated value placed once; n/a fields omitted. */
(function () {
  const e = React.createElement;
  const D = window.COMERICA;
  const Protractor = window.ComericaProtractor;

  function Slot(props) {
    return e("image-slot", { id: props.id, placeholder: props.placeholder, shape: "rect", src: props.src || ("images/comerica/" + props.id + ".webp") });
  }

  /* ---- small line icons ---- */
  function wxIcon(kind) {
    const c = { className: "ico", viewBox: "0 0 24 24", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" };
    /* unified weather icon set — same box, same stroke, shared geometry */
    if (window.WxIcons && window.WxIcons.parts(kind)) return window.WxIcons.react(kind, c);
    if (kind === "temp") return e("svg", c, e("path", { d: "M14 14.76V5a2 2 0 1 0-4 0v9.76a4 4 0 1 0 4 0z" }), e("path", { d: "M12 9v6" }));
    if (kind === "sun")  return e("svg", c, e("circle", { cx: 12, cy: 12, r: 4 }), e("path", { d: "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" }));
    if (kind === "wind") return e("svg", c, e("path", { d: "M3 8h10a2.5 2.5 0 1 0-2.5-2.5M3 16h13a2.5 2.5 0 1 1-2.5 2.5M3 12h7" }));
    if (kind === "drop") return e("svg", c, e("path", { d: "M12 2.7l5 6.3a6.5 6.5 0 1 1-10 0z" }));
    return null;
  }
  function classIcon(kind) {
    const c = { className: "ico", viewBox: "0 0 24 24", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" };
    if (kind === "era")  return e("svg", c, e("path", { d: "M4 9h16M5 9v9M9.5 9v9M14.5 9v9M19 9v9M3.5 20h17M5 9l7-4 7 4" }));
    if (kind === "status") return e("svg", c, e("circle", { cx: 12, cy: 12, r: 8 }), e("circle", { cx: 12, cy: 12, r: 2.6, fill: "#0C2340", stroke: "none" }));
    if (kind === "roof") return e("svg", c,
      e("circle", { cx: 12, cy: 12, r: 4 }),
      e("path", { d: "M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" }));
    if (kind === "loc")  return e("svg", c, e("path", { d: "M4 21V8l5-3v16M14 21V3l6 4v14M4 21h17M9 9h0M9 13h0M9 17h0M17 9h0M17 13h0M17 17h0" }));
    return null;
  }

  function factRow(k, v) { return e("tr", null, e("th", null, k), e("td", null, v)); }
  function vrow(k, v, navy) {
    return e("div", { className: "cp-vrow" },
      e("div", { className: "k" }, k),
      e("div", { className: "v" + (navy ? " navy" : "") }, v));
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
    return e("table", { className: "cp-line" },
      e("thead", null,
        e("tr", null,
          e("th", { className: "tm" }, ""),
          heads.map((n) => e("th", { key: n }, n)),
          e("th", { className: "sep" }, "R"), e("th", null, "H"), e("th", null, "E"))),
      e("tbody", null, row(box.away, "away"), row(box.home, "home")));
  }

  /* ---- crisp vector masonry sized to the pier width (running bond) ---- */
  function brickSvg(w) {
    const rowH = 20, mortarLines = [], shadow = [], joints = [];
    const H = 1088;                     // pier spans full canvas height
    for (let y = 0; y <= H; y += rowH) {
      mortarLines.push(e("line", { key: "m" + y, className: "mortar", x1: 0, y1: y, x2: w, y2: y }));
      shadow.push(e("line", { key: "s" + y, className: "mortar-sh", x1: 0, y1: y + 1.6, x2: w, y2: y + 1.6 }));
    }
    // running bond: alternate courses carry a single centre head-joint
    let course = 0;
    for (let y = 0; y < H; y += rowH, course++) {
      if (course % 2 === 0) {
        joints.push(e("line", { key: "j" + y, className: "mortar", x1: w / 2, y1: y, x2: w / 2, y2: y + rowH }));
        joints.push(e("line", { key: "js" + y, className: "mortar-sh", x1: w / 2 + 1.4, y1: y, x2: w / 2 + 1.4, y2: y + rowH }));
      }
    }
    return e("svg", { className: "brick", width: w, height: H,
      xmlns: "http://www.w3.org/2000/svg" },
      mortarLines, shadow, joints);
  }

  /* ---- brick pier with limestone cap + engraved keystone ---- */
  function Pier(col, w) {
    return e("div", { className: "cp-pier", style: { gridColumn: col } },
      brickSvg(w),
      e("div", { className: "cap-top" }),
      e("div", { className: "cap-sill" }),
      e("div", { className: "keystone" },
        e("img", { src: "assets/detroit-tigers-d.svg", alt: "" })));
  }
  function PhotoBay(col, id, ph) {
    return e("div", { className: "cp-photobay", style: { gridColumn: col } },
      e("div", { className: "cp-photo" }, e(Slot, { id: id, placeholder: ph })));
  }

  function Spread() {
    const awayWin = D.box.away.r > D.box.home.r;

    /* ===== LEFT BAY — Stadium Section ===== */
    const stadiumBay = e("div", { className: "cp-contentbay", style: { gridColumn: 2 } },
      e("div", { className: "cp-secthead" },
        e("div", { className: "tk" }),
        e("div", { className: "t" }, "Stadium Facts"),
        e("div", { className: "ln" }),
        e("div", { className: "ix" }, "I")),
      e("table", { className: "cp-facts" }, e("tbody", null,
        factRow("Team", e("b", null, D.team_name)),
        factRow("League", D.league + " \u00b7 " + D.division),
        factRow("Style", D.architectural_style),
        factRow("Type", D.stadium_type),
        factRow("Roof", D.roof_type),
        factRow("Surface", D.surface + " (" + D.surface_type.toLowerCase() + ")"),
        factRow("Architect", D.architect),
        factRow("Fa\u00e7ade", D.facade),
        factRow("Preceded By", e(React.Fragment, null, "Bennett Park (1896 to 1911)", e("br"), "Navin/Briggs/Tiger Stadium (1912\u20131999)")))),

      e("div", { className: "cp-subhd" }, "Construction & Lifecycle"),
      e("div", { className: "cp-lifecycle" },
        e("div", { className: "cp-lc" }, e("div", { className: "k" }, "Construction Start"), e("div", { className: "v" }, D.construction_start)),
        e("div", { className: "cp-lc" }, e("div", { className: "k" }, "Opening Day"), e("div", { className: "v" }, D.opening_day)),
        e("div", { className: "cp-lc" }, e("div", { className: "k" }, "All-Star Game"), e("div", { className: "v" }, D.all_star)),
        e("div", { className: "cp-lc" }, e("div", { className: "k" }, "Original Cost"), e("div", { className: "v" }, D.original_cost.replace(" million", "M") + " \u00b7 " + D.adjusted_cost.replace(" million", "M") + " adj."))),
      e("div", { className: "cp-note" }, e("span", { className: "lab" }, "Financing"), D.financing),
      e("div", { className: "cp-note" }, e("span", { className: "lab" }, "Renovations"), D.renovations),

      e("div", { className: "cp-class" },
        chip("era", D.era + " Era"),
        chip("status", [D.status, e("br", { key: "b" }), "Status"]),
        chip("roof", ["Open-Air", e("br", { key: "b" }), "Roof"]),
        chip("loc", D.location + " Location"))
    );

    /* ===== CENTER BAY — Stadium Context ===== */
    const contextBay = e("div", { className: "cp-contentbay mid", style: { gridColumn: 4 } },
      e("div", { className: "cp-secthead" },
        e("div", { className: "tk" }),
        e("div", { className: "t" }, "Brick & Limestone Bays"),
        e("div", { className: "ln" }),
        e("div", { className: "ix" }, "II")),
      e("div", { className: "cp-ctx" },
        e("p", { key: "p0" }, e("span", { className: "cp-dropcap", style: { fontSize: "36px" } }, D.stadium_context[0].charAt(0)), D.stadium_context[0].slice(1)),
        e("p", { key: "p1" }, D.stadium_context[1]),
        e("figure", { className: "cp-ctxfig", key: "fig" },
          e(Slot, { id: "cp-ctx-photo", placeholder: "Comerica Park \u2014 brick fa\u00e7ade course, stone tiger-head ornament, or concourse detail" })),
        e("p", { key: "p2" }, D.stadium_context[2]),
        e("p", { key: "p3" }, D.stadium_context[3]))
    );

    /* ===== RIGHT BAY — Visit Section ===== */
    const visitBay = e("div", { className: "cp-contentbay vis", style: { gridColumn: 6 } },
      e("div", { className: "cp-secthead" },
        e("div", { className: "tk" }),
        e("div", { className: "t" }, "Visit Information"),
        e("div", { className: "ln" }),
        e("div", { className: "ix" }, D.visit_order + " / " + D.visit_total)),

      e("div", { className: "cp-vtop" },
        e("div", { className: "cp-result" },
        e("div", { className: "when" }, D.featured_visit_day + " \u00b7 " + D.featured_visit_date),
        e("div", { className: "gt" }, D.visit_type + " \u00b7 " + D.trip_name + " Trip \u00b7 " + D.game_type + " Game"),
        e("div", { className: "cp-scorerow" + (awayWin ? " win" : "") },
          e("div", { className: "tm" }, "San Diego", e("small", null, "Padres")),
          e("div", { className: "sc" }, D.box.away.r)),
        e("div", { className: "cp-scorerow" + (!awayWin ? " win" : "") },
          e("div", { className: "tm" }, "Detroit", e("small", null, "Tigers")),
          e("div", { className: "sc" }, D.box.home.r)),
        e("div", { className: "cp-matchup" }, D.away_team + " at " + D.home_team)),

      LineScore(D.box),

      e("div", { className: "cp-decis" },
        e("div", { className: "d" }, D.away_team_abbreviation + " ", e("b", null, D.away_starter), " ", e("span", { className: "w" }, "(W)")),
        e("div", { className: "d" }, D.home_team_abbreviation + " ", e("b", null, D.home_starter), " (L)"),
        e("div", { className: "d" }, "Save ", e("b", null, D.save_pitcher)))),

      e("div", { className: "cp-vrows" },
        vrow("First Pitch", D.first_pitch),
        vrow("Duration", D.game_duration),
        vrow("Attendance", D.attendance),
        vrow("Total Visits", D.visit_count),
        vrow("First Visit", D.first_visit_date, true)),

      e("div", { className: "cp-vbottom" },
        e("div", { className: "cp-vfoot" },
        e("div", { className: "cp-weather" },
          wx("temp", D.temperature, "Temperature"),
          wx("sun", D.conditions, "Conditions"),
          wx("wind", D.wind, "Wind"),
          wx("drop", D.humidity, "Humidity")),
        Protractor ? e("div", { className: "cp-diagram" },
          e("div", { className: "dh" }, "Field \u00b7 " + D.orientation + " " + D.orientation_degrees + "\u00b0"),
          e(Protractor, { lf: D.left_field_distance, cf: D.center_field_distance, rf: D.right_field_distance,
            orientation: D.orientation, degrees: D.orientation_degrees })) : null))
    );

    return e("div", { className: "cp-spread", "data-screen-label": "Comerica Park spread" },

      /* ============ LEFT / ARRIVAL HERO ============ */
      e("div", { className: "cp-page cp-left", "data-screen-label": "Comerica Park \u2014 left (arrival)" },
        e("div", { className: "cp-hero-slot" },
          e(Slot, { id: "cp-hero", placeholder: "Drop the Comerica Park arrival aerial \u2014 oblique dusk view: downtown Detroit skyline, Woodward Avenue frontage, brick fa\u00e7ade, scoreboard, and the open bowl" })),
        e("div", { className: "cp-hero-scrim" }),

        e("div", { className: "cp-mast" },
          e("div", { className: "cp-logo-well" },
            e("img", { src: "assets/american-league-logo.png", alt: "American League" })),
          e("div", { className: "cp-logo-well" },
            e("img", { src: "assets/mlb-logo.svg", alt: "Major League Baseball" }))),

        e("div", { className: "cp-hero-block" },
          e("div", { className: "cp-kicker" }, "2100 Woodward Avenue"),
          e("h1", { className: "cp-name" }, "Comerica Park"),
          e("div", { className: "cp-loc" },
            e("span", { className: "bar" }),
            e("span", { className: "txt" }, "Detroit", e("span", { className: "dot" }, "\u00b7"), "Michigan")),
          e("div", { className: "cp-submeta" },
            e("span", null, D.era),
            e("span", { className: "s" }, "\u2014"),
            e("span", null, "Open-Air Ballpark"),
            e("span", { className: "s" }, "\u2014"),
            e("span", null, D.years_active)),
          e("div", { className: "cp-badges" },
            e("div", { className: "cp-dmed" },
              e("img", { src: "assets/detroit-tigers-d.svg", alt: "Detroit Tigers" })),
            e("div", { className: "cp-badge" }, e("span", { className: "k" }, "Club"), "Detroit Tigers"),
            e("div", { className: "cp-badge" }, e("span", { className: "k" }, "League"), "American League"),
            e("div", { className: "cp-badge" }, e("span", { className: "k" }, "Division"), "AL Central"),
            e("div", { className: "cp-badge v" }, e("span", { className: "k" }, "Logbook"),
              e("span", { className: "n" }, "Visit " + D.visit_order + " of " + D.visit_total)))
        )
      ),

      /* ============ RIGHT / FAÇADE ============ */
      e("div", { className: "cp-page cp-right", "data-screen-label": "Comerica Park \u2014 right (fa\u00e7ade)" },
        e("div", { className: "cp-facade" },
          e("div", { className: "cp-girder" }),
          e("div", { className: "cp-grid" },
            Pier(1, 36), Pier(3, 28), Pier(5, 28), Pier(7, 36),
            PhotoBay(2, "cp-ph1", "Exterior entrance \u2014 brick fa\u00e7ade & tiger sculptures along Woodward Avenue"),
            PhotoBay(4, "cp-ph2", "Interior seating bowl \u2014 field, grandstand, and downtown skyline beyond"),
            PhotoBay(6, "cp-ph3", "Scoreboard & skyline \u2014 main video board with the city behind"),
            stadiumBay, contextBay, visitBay),

          /* limestone base course */
          e("div", { className: "cp-base" },
            e("div", { className: "cp-base-grid" },
              e("div", { className: "cp-bcell" },
                e("div", { className: "bk" }, "Address"),
                e("div", { className: "bv" }, "2100 Woodward Avenue", e("br"), "Detroit, Michigan 48201")),
              e("div", { className: "cp-bcell coords" },
                e("div", { className: "bk" }, "Coordinates / Elevation"),
                e("div", { className: "row" }, "42.3392\u00b0 N", e("span", { className: "d" }, "\u25c6"), "83.0486\u00b0 W"),
                e("div", { className: "el" }, "Elevation " + D.elevation)),
              e("div", { className: "cp-bcell cap" },
                e("div", { className: "bk" }, "Capacity"),
                e("div", { className: "big" }, D.capacity_current),
                e("div", { className: "open" }, e("b", null, D.capacity_opening), " at opening, 2000"))),
            e("div", { className: "cp-base-rail" }))
        )
      )
    );

    function chip(kind, label) {
      return e("div", { className: "cp-chip" }, classIcon(kind), e("div", { className: "cl" }, label));
    }
    function wx(icon, val, lab) {
      return e("div", { className: "cp-wx" }, wxIcon(icon),
        e("div", null, e("div", { className: "val" }, val), e("div", { className: "lab" }, lab)));
    }
  }

  window.ComericaSpread = Spread;
})();
