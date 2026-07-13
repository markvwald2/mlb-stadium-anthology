/* comiskey-spread.jsx — "The Exploding Scoreboard" two-page spread for Comiskey Park.
   Reads window.COMISKEY, window.ComiskeyField, window.ComiskeyPinwheel.
   Every populated structured value is placed exactly once. Local data only;
   the concept image is visual direction, never a factual source. */
(function () {
  const e = React.createElement;
  const D = window.COMISKEY;
  const Field = window.ComiskeyField;
  const Pinwheel = window.ComiskeyPinwheel;

  // BulbBorder: places a lamp on every corner + evenly distributed lamps along
  // each edge, measured from the host box's live size (survives font reflow /
  // print export via ResizeObserver + fonts.ready).
  function BulbBorder(props) {
    const ref = React.useRef(null);
    const [dots, setDots] = React.useState([]);
    React.useLayoutEffect(function () {
      const el = ref.current; if (!el) return;
      const host = el.parentElement; if (!host) return;
      function measure() {
        const w = host.clientWidth, h = host.clientHeight;
        const inset = props.inset, spacing = props.spacing;
        const x0 = inset, x1 = w - inset, y0 = inset, y1 = h - inset;
        const wSpan = Math.max(0, x1 - x0), hSpan = Math.max(0, y1 - y0);
        const nx = Math.max(1, Math.round(wSpan / spacing));
        const ny = Math.max(1, Math.round(hSpan / spacing));
        const pts = [];
        for (let i = 0; i <= nx; i++) { const x = x0 + wSpan * i / nx; pts.push([x, y0]); pts.push([x, y1]); }
        for (let j = 1; j < ny; j++) { const y = y0 + hSpan * j / ny; pts.push([x0, y]); pts.push([x1, y]); }
        setDots(pts);
      }
      measure();
      const ro = new ResizeObserver(measure); ro.observe(host);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
      return function () { ro.disconnect(); };
    }, [props.inset, props.spacing]);
    return e("div", { className: "cm-lampwrap", ref: ref },
      dots.map(function (p, i) {
        return e("i", { key: i, className: "cm-lamp" + (props.sm ? " sm" : ""),
          style: { left: p[0] + "px", top: p[1] + "px" } });
      }));
  }

  function Slot(props) {
    return e("image-slot", Object.assign({ id: props.id, placeholder: props.placeholder, shape: "rect" }, props.src ? { src: props.src } : {}));
  }

  // dark chip so the white-fill White Sox mark (and any mark) reads on cream
  function chipLogo(src, alt, size) {
    return e("span", { style: {
      width: (size + 12) + "px", height: (size + 12) + "px", flex: "none", display: "flex",
      alignItems: "center", justifyContent: "center", background: "#100C07",
      border: "1px solid #050301", boxShadow: "inset 0 0 0 1px #3A3122" } },
      e("img", { src: src, alt: alt, style: { width: size + "px", height: size + "px", objectFit: "contain" } }));
  }

  function wxIcon(kind) {
    const c = { className: "ico", viewBox: "0 0 24 24", fill: "none", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" };
    if (kind === "temp") return e("svg", c, e("path", { d: "M14 14.76V5a2 2 0 1 0-4 0v9.76a4 4 0 1 0 4 0z" }), e("path", { d: "M12 9v6" }));
    if (kind === "sun")  return e("svg", c, e("circle", { cx: 12, cy: 12, r: 4 }), e("path", { d: "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" }));
    if (kind === "wind") return e("svg", c, e("path", { d: "M3 8h10a2.5 2.5 0 1 0-2.5-2.5M3 16h13a2.5 2.5 0 1 1-2.5 2.5M3 12h7" }));
    if (kind === "drop") return e("svg", c, e("path", { d: "M12 2.7l5 6.3a6.5 6.5 0 1 1-10 0z" }));
    return null;
  }

  function factRow(k, v) { return e("tr", null, e("th", null, k), e("td", null, v)); }
  function vrow(k, v) { return e("div", { className: "cm-vrow" }, e("div", { className: "k" }, k), e("div", { className: "v" }, v)); }
  function drow(k, v, amber) {
    return e("div", { className: "cm-drow" }, e("div", { className: "k" }, k),
      e("div", { className: "v" + (amber ? " amber" : "") }, v));
  }

  /* inning-board line score */
  function LineScore(box) {
    const heads = []; for (let i = 1; i <= box.innings; i++) heads.push(i);
    function row(t, cls) {
      return e("tr", { className: cls },
        e("td", { className: "tm" }, t.abbr),
        t.byInning.map((n, i) => e("td", { key: i, className: n === "x" ? "x" : null }, n)),
        e("td", { className: "rhe sep" }, t.r),
        e("td", { className: "rhe" }, t.h),
        e("td", { className: "rhe" }, t.e));
    }
    return e("table", { className: "cm-line" },
      e("thead", null, e("tr", null,
        e("th", { className: "tm" }, ""),
        heads.map((n) => e("th", { key: n }, n)),
        e("th", { className: "rhe sep" }, "R"), e("th", { className: "rhe" }, "H"), e("th", { className: "rhe" }, "E"))),
      e("tbody", null, row(box.away, "away"), row(box.home, "home")));
  }

  function Spread() {
    return e("div", { className: "cm-spread", "data-screen-label": "Comiskey Park spread" },

      /* ============ LEFT / AERIAL PLATE ============ */
      e("div", { className: "cm-page cm-left", "data-screen-label": "Comiskey left page" },
        e("div", { className: "cm-hero-slot" },
          e(Slot, { id: "cm-hero", src: "images/comiskey/comiskey-park-00-main-40d390bc.jpg", placeholder: "Drop the Comiskey Park aerial \u2014 the jewel-box grandstand on the South Side with the Chicago skyline beyond" })),
        e("div", { className: "cm-hero-scrim" }),

        /* lit stat plate */
        e("div", { className: "cm-statplate" },
          e(BulbBorder, { inset: 6, spacing: 12, sm: true }),
          e("div", { className: "cm-statinner" },
            e("div", { className: "cm-stat" }, e("div", { className: "k" }, "Opened"), e("div", { className: "v" }, "1910")),
            e("div", { className: "cm-stat" }, e("div", { className: "k" }, "Closed"), e("div", { className: "v" }, "1990")))),

        /* title block */
        e("div", { className: "cm-hero-block" },
          e("div", { className: "cm-eyebrow" },
            Pinwheel ? e(Pinwheel, { size: 17, color: "#F0D384" }) : null,
            "The Exploding Scoreboard"),
          e("div", { className: "cm-title-marquee" },
            e(BulbBorder, { inset: 8.5, spacing: 17 }),
            e("div", { className: "cm-title-inner" },
              e("h1", { className: "cm-title-text" }, "Comiskey Park"))),
          e("div", { className: "cm-loc" },
            e("span", { className: "star" }, "\u2605"),
            e("span", null, D.city + ", " + D.state),
            e("span", { className: "star" }, "\u2605")),
          e("div", { className: "cm-hero-foot" },
            e("div", { className: "cm-foot-logos" },
              e("div", { className: "cm-logo-well" }, e("img", { src: "assets/white-sox-1988.svg", alt: "Chicago White Sox" })),
              e("div", { className: "cm-logo-well" }, e("img", { src: "assets/mlb-logo.svg", alt: "Major League Baseball" }))),
            e("div", { className: "cm-foot-addr" },
              e("b", null, "324 W 35th Street"), e("br"), "Chicago, IL 60616 \u00b7 Former Site")))
      ),

      /* ============ RIGHT / SCOREBOARD MACHINE ============ */
      e("div", { className: "cm-page cm-right", "data-screen-label": "Comiskey right page" },
        e("div", { className: "cm-rp" },
          e("div", { className: "cm-rivet cm-fr tl" }), e("div", { className: "cm-rivet cm-fr tr" }),
          e("div", { className: "cm-rivet cm-fr bl" }), e("div", { className: "cm-rivet cm-fr br" }),

          /* ---- photo bays ---- */
          e("div", { className: "cm-photostrip" },
            photoBay("cm-p1", "Exterior \u2014 brick, concrete & steel grandstand along 35th Street", "images/comiskey/comiskey-park-04.jpg"),
            photoBay("cm-p2", "View from the upper deck across the playing field", "images/comiskey/comiskey-park-03.jpg"),
            photoBay("cm-p3", "The exploding scoreboard \u2014 the pinwheel light towers in full burst", "images/comiskey/comiskey-park-01.jpg"),
            photoBay("cm-p4", "Concourse beneath the deck \u2014 steel columns and ramps", "images/comiskey/comiskey-park-02.jpg"),
            photoBay("cm-p5", "South Side neighborhood \u2014 the ballpark inside the city blocks", "images/comiskey/comiskey-park-05.jpg")),

          /* ---- metadata ribbon ---- */
          e("div", { className: "cm-ribbon" },
            e("div", { className: "cm-ribcell logo" },
              e("img", { src: "assets/white-sox-1988.svg", alt: "Chicago White Sox" }),
              e("div", { className: "stack" },
                e("div", { className: "k" }, "Team"),
                e("div", { className: "v" }, "Chicago", e("br"), "White Sox"))),
            e("div", { className: "cm-ribcell" },
              e("div", { className: "k" }, "Division"),
              e("div", { className: "v" }, "AL West/Central")),
            e("div", { className: "cm-ribcell" },
              e("div", { className: "k" }, "Classification"),
              e("div", { className: "v" }, "Jewel Box &", e("br"), "Early Concrete")),
            e("div", { className: "cm-ribcell" },
              e("div", { className: "k" }, "Status"),
              e("div", { className: "v", style: { color: "#CE8169" } }, "Demolished")),
            e("div", { className: "cm-ribcell" },
              e("div", { className: "k" }, "Coordinates"),
              e("div", { className: "v mono" }, "41.8317\u00b0 N", e("br"), "87.6342\u00b0 W")),
            e("div", { className: "cm-ribcell" },
              e("div", { className: "k" }, "Capacity"),
              e("div", { className: "v" }, "43,951", e("small", null, "Latest")))),

          /* ---- middle row : three scoreboard panels ---- */
          e("div", { className: "cm-midrow" },

            /* STADIUM FACTS */
            e("div", { className: "cm-panel" },
              e("div", { className: "cm-nameplate" },
                e("span", { className: "cm-bulbs" }, e("i"), e("i"), e("i")),
                e("div", { className: "t" }, "Stadium Facts")),
              e("div", { className: "cm-pbody" },
                e("table", { className: "cm-ftable" }, e("tbody", null,
                  factRow("Elevation", "595 FT"),
                  factRow("Architect", D.architect),
                  factRow("Style", D.architectural_style),
                  factRow("Structure", D.facade_material),
                  factRow("Roof", D.roof_type),
                  factRow("Surface", D.playing_surface),
                  factRow("Capacity", D.opening_capacity + " at opening"),
                  factRow("Names", D.name_history.split("; ").map((s, i, a) =>
                    e(React.Fragment, { key: i }, s, i < a.length - 1 ? e("br") : null))),
                  factRow("Preceded By", D.preceded_by),
                  factRow("Succeeded By", D.succeeded_by),
                  factRow("Renovations", D.renovations))))),

            /* VISIT INFORMATION */
            e("div", { className: "cm-panel" },
              e("div", { className: "cm-nameplate" },
                e("span", { className: "cm-bulbs" }, e("i"), e("i"), e("i")),
                e("div", { className: "t" }, "Visit Information"),
                e("div", { className: "num" }, D.visit_order + " of " + D.visit_total)),
              e("div", { className: "cm-pbody visit" },
                e("div", { className: "cm-vgroup" },
                  e("div", { className: "cm-vmatch" },
                    e("div", { className: "cm-vteam away" },
                      e("img", { src: "assets/toronto-blue-jays-logo.svg", alt: "Toronto Blue Jays" }),
                      e("div", { className: "nm" }, "Toronto", e("br"), "Blue Jays")),
                    e("div", { className: "cm-vat" }, "at"),
                    e("div", { className: "cm-vteam" },
                      e("img", { src: "assets/white-sox-1988.svg", alt: "Chicago White Sox" }),
                      e("div", { className: "nm" }, "Chicago", e("br"), "White Sox"))),
                  e("div", { className: "cm-vdate" }, "Tuesday, August 16, 1988"),
                  e("div", { className: "cm-vvenue" }, "Comiskey Park \u00b7 " + D.visit_type + " \u00b7 " + D.trip_name + " Trip")),
                e("div", { className: "cm-vgroup" },
                  e("div", { className: "cm-board" }, LineScore(D.box)),
                  e("div", { className: "cm-vresult" },
                    e("span", { className: "fin" }, "Final"),
                    e("span", { className: "txt" }, "White Sox 5, Blue Jays 4"))),
                e("div", { className: "cm-vgroup" },
                  e("div", { className: "cm-pitch" },
                    e("div", { className: "cm-prow" },
                      e("div", { className: "k" }, "Pitching Matchup"),
                      e("div", { className: "v" }, D.pitching_matchup)),
                    e("div", { className: "cm-prow" },
                      e("div", { className: "k" }, "Decision"),
                      e("div", { className: "v" }, e("b", null, "W: " + D.winning_pitcher), " \u00b7 L: " + D.losing_pitcher + " \u00b7 S: " + D.save_pitcher))),
                  e("div", { className: "cm-vdetails" },
                    vrow("Attendance", D.attendance),
                    vrow("First Pitch", D.first_pitch),
                    vrow("Duration", D.game_duration))),
                e("div", { className: "cm-vgroup" },
                  e("div", { className: "cm-firstvisit" },
                    Pinwheel ? e(Pinwheel, { size: 26, color: "#C7BCA3" }) : null,
                    e("div", { className: "lbl" },
                      e("div", { className: "k" }, "First Visit"),
                      e("div", { className: "sub" }, "First of two visits")),
                    e("div", { className: "yr" }, D.first_visit_year))))),

            /* HISTORICAL CONTEXT — scoreboard inning bays */
            e("div", { className: "cm-panel" },
              e("div", { className: "cm-nameplate" },
                e("span", { className: "cm-bulbs" }, e("i"), e("i"), e("i")),
                e("div", { className: "t" }, "Historical Context")),
              e("div", { className: "cm-pbody" },
                e("div", { className: "cm-context" },
                  D.stadium_context.map((p, i) =>
                    e("div", { className: "cm-bay", key: i },
                      e("div", { className: "chip" }, e("span", null, i + 1)),
                      e("p", null, p))))))
          ),

          /* ---- bottom row : four steel modules ---- */
          e("div", { className: "cm-botrow" },

            /* SITE & SETTING */
            e("div", { className: "cm-module" },
              e("div", { className: "cm-mhead" }, e("div", { className: "t" }, "Site & Setting"), e("div", { className: "ln" })),
              e("div", { className: "cm-mbody" },
                e("div", { className: "cm-site" },
                  e("div", { className: "cm-site-rows" },
                    drow("Setting", "Urban"),
                    drow("Original Cost", "$750k"),
                    drow("Adjusted", "$25.9M")),
                  e("div", { style: { fontFamily: "'Spectral',serif", fontStyle: "italic", fontSize: "12px",
                    lineHeight: 1.38, color: "#B8AF9B", marginTop: "6px" } },
                    "Privately financed by White Sox owner Charles Comiskey.")))),

            /* WEATHER */
            e("div", { className: "cm-module" },
              e("div", { className: "cm-mhead" }, e("div", { className: "t" }, "Weather"), e("div", { className: "ln" })),
              e("div", { className: "cm-mbody" },
                e("div", { className: "cm-wxgrid" },
                  wx("temp", D.temperature, "Temperature"),
                  wx("sun", D.conditions, "Conditions"),
                  wx("wind", "9 SSW", "Wind (mph)"),
                  wx("drop", D.humidity, "Humidity")))),

            /* FIELD DIMENSIONS */
            e("div", { className: "cm-module" },
              e("div", { className: "cm-mhead" }, e("div", { className: "t" }, "Field Dimensions"), e("div", { className: "ln" })),
              e("div", { className: "cm-mbody" },
                e("div", { className: "cm-field" },
                  Field ? e(Field, { lf: D.left_field_distance, cf: D.center_field_distance, rf: D.right_field_distance,
                    orientation: D.orientation, degrees: D.orientation_degrees }) : null))),

            /* LIFECYCLE */
            e("div", { className: "cm-module" },
              e("div", { className: "cm-mhead" }, e("div", { className: "t" }, "Lifecycle"), e("div", { className: "ln" })),
              e("div", { className: "cm-mbody" },
                e("div", { style: { flex: 1 } },
                  drow("Construction", D.construction_start),
                  drow("Opening Day", D.opening_day),
                  drow("All-Star Games", D.all_star_games),
                  drow("Final Game", D.final_game),
                  drow("Demolished", D.demolition_year, true)))))
        )
      )
    );

    function photoBay(id, ph, src) {
      return e("div", { className: "cm-photopanel" },
        e(Slot, { id: id, placeholder: ph, src: src }),
        e("div", { className: "bezel" }));
    }
    function wx(icon, val, lab) {
      return e("div", { className: "cm-wx" }, wxIcon(icon),
        e("div", { className: "txt" }, e("div", { className: "val" }, val), e("div", { className: "lab" }, lab)));
    }
  }

  window.ComiskeySpread = Spread;
})();
