/* minute-maid-spread.jsx — the single Minute Maid Park spread.
   "Platform 35: The Retractable Terminal." Reads window.MMP + window.MMPDiagrams.
   LEFT  page: full-bleed dusk hero; station-sign title on an enamel plate; a
   platform band carries PLATFORM 35 + the tagline + MLB / AL marks.
   RIGHT page: warm paper organized as five station "track bays" (A–E) divided
   by steel-track rules, framed by a steel terminal border. Every populated
   field renders exactly once; nothing invented. */
(function () {
  const e = React.createElement;
  const D = window.MMP;
  // ---- right-page bay geometry (local coords 0..1275) ----
  const BAYS = {
    A: { left: 44,   width: 158 },
    B: { left: 226,  width: 224 },
    C: { left: 462,  width: 360 },
    D: { left: 834,  width: 188 },
    E: { left: 1034, width: 198 }
  };
  const TRACKS = [214, 456, 828];
  const BAY_TOP = 49, BAY_H = 990;
  // shared photo band spanning Bay A (Identity) + Bay B (Stadium Record)
  const AB_PHOTO = { left: 44, top: 807, width: 406, height: 232 };

  function Slot(props) {
    return e("image-slot", { id: props.id, placeholder: props.placeholder, shape: "rect",
      src: props.src, fit: props.fit, position: props.position,
      style: { width: "100%", height: "100%" } });
  }
  function SecHead(props) {
    return e("div", { className: "mm-h" },
      e("span", { className: "t" }, props.title),
      props.note ? e("span", { className: "n", style: props.noteStyle }, props.note) : null);
  }
  function Bay(props) {
    const g = BAYS[props.id];
    return e("div", { className: "mm-bay", style: { left: g.left + "px", width: g.width + "px",
        height: BAY_H + "px" } },
      e("div", { className: "mm-bayhead" },
        e("span", { className: "star" }, "\u273B"),
        e("span", { className: "nm" }, props.name)),
      props.children);
  }
  function PhotoPlate(props) {
    return e("figure", { className: "mm-plate-photo",
      style: { width: "100%", height: props.h + "px", marginTop: (props.mt || 0) + "px" } },
      e(Slot, { id: props.slot, placeholder: props.placeholder }));
  }

  function factRow(row, i) {
    return e("div", { className: "mm-frow", key: i },
      e("div", { className: "k" }, row[0]),
      e("div", { className: "v" },
        e("span", { className: "vm" }, row[1]),
        row[2] ? e("span", { className: "vs" }, row[2]) : null));
  }
  function vRow(row, i) {
    const hi = row[0] === "Result";
    return e("div", { className: "mm-vrow", key: i },
      e("div", { className: "k" }, row[0]),
      e("div", { className: "v" + (hi ? " hi" : "") }, row[1]));
  }

  function WxIcon(kind) {
    const c = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "#524A3C",
      strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round", style: { flex: "none" } };
    if (kind === "temp") return e("svg", c, e("path", { d: "M14 14.5V5a2 2 0 1 0-4 0v9.5a4 4 0 1 0 4 0z" }), e("path", { d: "M12 14V8" }));
    if (kind === "sky") return e("svg", c, e("circle", { cx: 12, cy: 12, r: 4.4 }),
      e("path", { d: "M12 3v1.8M12 19.2V21M3 12h1.8M19.2 12H21M5.5 5.5l1.3 1.3M17.2 17.2l1.3 1.3M18.5 5.5l-1.3 1.3M6.8 17.2l-1.3 1.3" }));
    if (kind === "wind") return e("svg", c, e("path", { d: "M3 8h10a2.4 2.4 0 1 0-2.4-2.4M3 16h13a2.4 2.4 0 1 1-2.4 2.4M3 12h7" }));
    if (kind === "drop") return e("svg", c, e("path", { d: "M12 2.8l5 6.2a6.4 6.4 0 1 1-10 0z" }));
    return null;
  }
  function wxCell(icon, value, label, vstyle) {
    return e("div", { className: "mm-wcell" }, WxIcon(icon),
      e("div", { className: "tx" }, e("div", { className: "wv", style: vstyle || null }, value), e("div", { className: "wl" }, label)));
  }

  function Board(box) {
    const cols = [];
    for (let i = 1; i <= box.innings; i++) cols.push(i);
    function row(t, win) {
      return e("tr", { className: win ? "win" : "" },
        e("td", { className: "tm" }, t.abbr),
        t.byInning.map((n, i) => e("td", { key: i }, n)),
        e("td", { className: "sep rc" }, t.r),
        e("td", null, t.h),
        e("td", null, t.e));
    }
    return e("table", null,
      e("thead", null, e("tr", null,
        e("th", { className: "tm" }, ""),
        cols.map((n) => e("th", { key: n }, n)),
        e("th", { className: "sep" }, "R"), e("th", null, "H"), e("th", null, "E"))),
      e("tbody", null,
        row(box.away, box.away.r > box.home.r),
        row(box.home, box.home.r > box.away.r)));
  }

  function Spread() {
    const F = D.field;
    return e("div", { className: "mm-spread", "data-screen-label": "Minute Maid Park spread" },

      /* ============== LEFT PAGE / HERO ============== */
      e("div", { className: "mm-page mm-left", "data-screen-label": "Minute Maid Park \u2014 hero" },
        e("div", { className: "mm-hero-slot" },
          e(Slot, { id: "mmp-hero", src: "images/minute-maid/minute-maid-park-00-main-PS.jpg",
            placeholder: "Drop the Minute Maid Park hero \u2014 dusk interior toward left field: the train, Crawford Boxes, downtown skyline & the open retractable roof" })),
        e("div", { className: "mm-hero-scrim" }),

        e("div", { className: "mm-spine" }, "EST. " + D.est + "  \u00b7  HOUSTON, TEXAS  \u00b7  VISIT " + D.visit_order),

        e("div", { className: "mm-titlewrap" },
          e("div", { className: "mm-plate" },
            e("span", { className: "blt bl" }), e("span", { className: "blt br" }),
            D.name_lines.map((ln, i) => e("h1", { className: "mm-name", key: i }, ln)),
            e("div", { className: "mm-place" },
              e("span", { className: "arw" }, "\u25C0"),
              e("span", { className: "txt" }, D.city + ", " + D.state),
              e("span", { className: "arw" }, "\u25B6")))),

        e("div", { className: "mm-platband" },
          e("div", { className: "mm-platform" },
            e("span", { className: "lab", style: { letterSpacing: "6px" } }, "VISIT"),
            e("div", { className: "mm-platnum" },
              e("span", { className: "no" }, D.visit_order),
              e("span", { className: "of" },
                e("span", { className: "ofl" }, "OF"),
                e("span", { className: "ofn" }, "42")))),
          e("span", { className: "mm-pdiv" }),
          e("span", { className: "mm-tag" }, D.tagline))
      ),

      /* ============== RIGHT PAGE / FIVE TRACK BAYS ============== */
      e("div", { className: "mm-page mm-right", "data-screen-label": "Minute Maid Park \u2014 terminal hall" },
        // steel terminal frame + corner rivets
        e("div", { className: "mm-frame" }),
        e("span", { className: "mm-rivet", style: { left: "27px", top: "27px" } }),
        e("span", { className: "mm-rivet", style: { right: "40px", top: "27px" } }),
        e("span", { className: "mm-rivet", style: { left: "27px", bottom: "27px" } }),
        e("span", { className: "mm-rivet", style: { right: "40px", bottom: "27px" } }),

        // vertical steel-track rules with rivets
        TRACKS.map((x, i) =>
          e("div", { className: "mm-track", key: "tk" + i, style: { left: x + "px" } },
            e("i", { style: { top: "0px" } }),
            e("i", { style: { top: "50%" } }),
            e("i", { style: { bottom: "0px" } }))),

        /* ----- BAY A : IDENTITY ----- */
        e(Bay, { id: "A", name: "Identity" },
          e("div", { className: "mm-idblock" },
            e("img", { src: "assets/houston-astros-logo.svg", alt: "Houston Astros" }),
            e("div", { className: "tx" },
              e("span", { className: "c" }, D.team_city),
              e("span", { className: "n" }, D.team_name))),
          e("div", { className: "mm-route" },
            D.identity.map((row, i) =>
              e("div", { className: "mm-rrow", key: i },
                e("div", { className: "rl" }, row[0]),
                e("div", { className: "rv" }, row[1])))),
          e("div", { className: "mm-asg" },
            e("span", { className: "yr" }, D.all_star),
            e("span", { className: "lb" }, "All-Star", e("br", null), "Game Host")),
          e("div", { className: "mm-names" },
            e(SecHead, { title: "Preceded By" }),
            D.preceded_by.map((n, i) =>
              e("div", { className: "nrow", key: i },
                e("span", { className: "nn" }, n[0]),
                e("span", { className: "ny" }, n[1])))),
          e("div", { className: "mm-names", style: { marginTop: "13px" } },
            e(SecHead, { title: "Name History" }),
            D.name_history.map((n, i) =>
              e("div", { className: "nrow", key: i },
                e("span", { className: "nn" }, n[0]),
                e("span", { className: "ny" }, n[1]))))
        ),

        /* ----- BAY B : STADIUM RECORD ----- */
        e(Bay, { id: "B", name: "Stadium Record" },
          e("div", { className: "mm-facts" },
            D.facts.map(factRow),
            factRow(["Renovations", D.renovations], "ren"))
        ),

        /* ----- BAY C : STADIUM CONTEXT (wide anchor) ----- */
        e(Bay, { id: "C", name: "The Moving Roof" },
          e("div", { className: "mm-ctx" },
            e("div", { className: "mm-ctxnote" }, "FROM THE ASTRODOME \u2192 A MOVING ROOF"),
            e("div", { className: "mm-window" },
              e("div", { className: "mm-prose" },
                D.stadium_context.map((p, i) => e("p", { key: i }, p)))))
        ),

        /* ----- BAY D + E : FIELD & VISIT (merged right region) ----- */
        e("div", { className: "mm-bay mm-bay-de", style: { left: "834px", width: "370px", height: BAY_H + "px" } },
          e("div", { className: "mm-bayhead" },
            e("span", { className: "star" }, "\u273B"),
            e("span", { className: "nm" }, "Field & Visit")),

          // dominant 4:3 roof photo
          e("figure", { className: "mm-plate-photo mm-photo-fill", style: { width: "100%", transform: "translateY(-3px)" } },
            e(Slot, { id: D.photos[1][0], src: "images/minute-maid/minute-maid-park-01.jpg", position: "50% 22%", placeholder: D.photos[1][1] })),

          // two-column data band : field geometry | visit facts
          e("div", { className: "mm-de-grid" },
            // LEFT : field geometry
            e("div", { className: "mm-de-col" },
              e("div", { className: "mm-figblock" },
                e(SecHead, { title: "Field Geometry" }),
                window.MMPProtractor ? e("div", { style: { position: "relative", left: "5px", top: "10px" } }, e(window.MMPProtractor, { lf: F.left_field, cf: F.center_field, rf: F.right_field, degrees: F.degrees, orientation: F.orientation })) : null)),
            // RIGHT : visit facts
            e("div", { className: "mm-de-col" },
              e("div", { className: "mm-figblock" },
                e(SecHead, { title: "Visit No. " + D.visit_order, note: "SEP 11, 2021", noteStyle: { letterSpacing: "0px" } }),
                e("div", null, D.visit.map(vRow))))),

          // line score — spans the full column
          e("div", { className: "mm-deblock" },
            e(SecHead, { title: "Game Linescore", note: "FINAL \u00b7 9 INN \u00b7 3:42" }),
            e("div", { className: "mm-board" }, Board(D.box))),

          // weather — a single line below the line score
          e("div", { className: "mm-deblock" },
            e(SecHead, { title: "Weather Report" }),
            e("div", { className: "mm-wx mm-wx-line" },
              wxCell("temp", D.weather.temperature, "Temp"),
              wxCell("sky", D.weather.conditions, "Sky"),
              wxCell("wind", D.weather.wind, "Wind", { letterSpacing: "-1px", fontSize: "15px" }),
              wxCell("drop", D.weather.humidity, "Humidity"))),

          // pitching matchup — full-width strip, three pitchers across
          e("div", { className: "mm-deblock" },
            e(SecHead, { title: "Pitching Matchup" }),
            e("div", { className: "mm-pitch3" },
              e("div", { className: "pcell" },
                e("span", { className: "pteam" }, D.pitching.away_team + " \u00b7 Starter"),
                e("span", { className: "pname" }, D.pitching.away + " (" + D.pitching.away_dec + ")")),
              e("div", { className: "pcell" },
                e("span", { className: "pteam" }, D.pitching.home_team + " \u00b7 Starter"),
                e("span", { className: "pname" }, D.pitching.home + " (" + D.pitching.home_dec + ")")),
              e("div", { className: "pcell" },
                e("span", { className: "pteam" }, "Save"),
                e("span", { className: "pname" }, D.pitching.save)))),

          // bottom photo — Crawford Boxes & the left-field train, spanning the column
          e("figure", { className: "mm-plate-photo mm-photo-fill mm-deblock", style: { width: "100%" } },
            e(Slot, { id: D.photos[2][0], src: "images/minute-maid/minute-maid-park-03.jpg", placeholder: D.photos[2][1] }))
        )
        ,

        /* ----- SHARED A+B PHOTO BAND (spans Identity + Stadium Record) ----- */
        e("figure", { className: "mm-plate-photo mm-ab-photo",
            style: { left: AB_PHOTO.left + "px", top: AB_PHOTO.top + "px",
              width: AB_PHOTO.width + "px", height: AB_PHOTO.height + "px" } },
          e(Slot, { id: "mmp-ab", src: "images/minute-maid/minute-maid-park-02.jpg", placeholder: "Wide establishing exterior \u2014 Union Station frontage, brick facade & the ballpark beyond" }))
      )
    );
  }

  window.MinuteMaidSpread = Spread;
})();
