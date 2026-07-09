/* county-spread.jsx — "Lamp-Matrix Municipal" two-page spread for Milwaukee
   County Stadium. The right page is a reconstructed scoreboard face: amber
   lamp bays on painted steel & deep navy, with the long-form context held on a
   warm painted-enamel sign panel. Reads window.MCS and window.CountyProtractor.
   Every populated structured value is placed exactly once. Local data only. */
(function () {
  const e = React.createElement;
  const D = window.MCS;
  const Protractor = window.CountyProtractor;

  function Slot(props) {
    return e("image-slot", { id: props.id, placeholder: props.placeholder, shape: "rect", src: props.src });
  }

  /* ---- weather / utility line icons ---- */
  function Icon(kind, cls) {
    const c = { className: cls || "ico", viewBox: "0 0 24 24", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
    const P = (d) => e("path", { d: d });
    if (kind === "temp") return e("svg", c, P("M14 14.5V5a2 2 0 1 0-4 0v9.5a4 4 0 1 0 4 0z"));
    if (kind === "sun")  return e("svg", c, e("circle", { cx: 12, cy: 12, r: 4 }), P("M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"));
    if (kind === "wind") return e("svg", c, P("M3 8h10a2.5 2.5 0 1 0-2.5-2.5M3 16h13a2.5 2.5 0 1 1-2.5 2.5M3 12h7"));
    if (kind === "drop") return e("svg", c, P("M12 2.7l5 6.3a6.5 6.5 0 1 1-10 0z"));
    return null;
  }

  function Bay(props) {
    return e("div", { className: "lm-bay" + (props.className ? " " + props.className : "") },
      e("div", { className: "hd" }, e("div", { className: "lm-lbl" }, props.label,
        props.rule ? e("span", { className: "ln" }) : null),
        props.headerRight ? e("div", { className: "lm-hd-right" }, props.headerRight) : null),
      e("div", { className: "bd" }, props.children));
  }

  function kv(k, v, cls) {
    return e("div", { className: "lm-kv" },
      e("div", { className: "k" }, k),
      e("div", { className: "v" + (cls ? " " + cls : "") }, v));
  }

  function fRow(k, v, desc) {
    return e("tr", null, e("th", null, k), e("td", { className: desc ? "desc" : "" }, v));
  }

  function vRow(k, v, cls) {
    return e("div", { className: "lm-vrow" },
      e("div", { className: "k" }, k), e("div", { className: "v" + (cls ? " " + cls : "") }, v));
  }

  function wx(icon, val, lab) {
    return e("div", { className: "lm-wx" }, Icon(icon, "ico"),
      e("div", { className: "txt" }, e("div", { className: "val" }, val), e("div", { className: "lab" }, lab)));
  }

  function LineScore(box) {
    const heads = []; for (let i = 1; i <= box.innings; i++) heads.push(i);
    function row(t, cls) {
      return e("tr", { className: cls },
        e("td", { className: "tmcell" }, t.abbr),
        t.byInning.map((n, i) => e("td", { key: i, className: "cell" }, n)),
        e("td", { className: "cell rhe rcol" }, t.r),
        e("td", { className: "cell rhe" }, t.h),
        e("td", { className: "cell rhe" }, t.e));
    }
    return e("table", { className: "lm-line" },
      e("thead", null,
        e("tr", null,
          e("th", { className: "tm" }, ""),
          heads.map((n) => e("th", { key: n }, n)),
          e("th", { className: "rhe-h" }, "R"), e("th", null, "H"), e("th", null, "E"))),
      e("tbody", null, row(box.away, "away"), row(box.home, "home")));
  }

  function Spread() {
    const homeWin = D.box.home.r > D.box.away.r;
    return e("div", { className: "lm-spread", "data-screen-label": "Milwaukee County Stadium spread" },

      /* ============ LEFT / NIGHT-AERIAL HERO ============ */
      e("div", { className: "lm-page lm-left", "data-screen-label": "Milwaukee County Stadium — hero (left page)" },
        e("div", { className: "lm-hero-slot" },
          e(Slot, { id: "mcs-hero", src: "images/county/county-stadium-00-main-2ee57177.jpg", placeholder: "Drop the Milwaukee County Stadium night / dusk aerial \u2014 the open municipal bowl, light towers, giant outfield scoreboard, and the fairgrounds parking fields" })),
        e("div", { className: "lm-hero-scrim" }),

        e("div", { className: "lm-hero-datum" }, D.coordinates,
          e("span", { className: "sub" }, "Elev. " + D.elevation + " \u00b7 " + D.location_type)),

        e("div", { className: "lm-hero-block" },
          e("div", { className: "lm-hero-kicker" }, D.era_short + " \u00b7 " + D.years_active),
          e("h1", { className: "lm-hero-name lm-matrix" },
            e("span", { className: "l1 lm-bulb" }, "Milwaukee"),
            e("span", { className: "l2 lm-bulb" }, "County Stadium")),
          e("div", { className: "lm-hero-loc" },
            e("span", { className: "bar" }),
            e("span", { className: "txt" }, D.city + ", " + D.state)),
          e("div", { className: "lm-hero-sub" }, D.stadium_type),
          e("div", { className: "lm-hero-era" },
            e("span", { className: "dot" }),
            e("span", { className: "t" }, "Status"),
            e("span", { className: "v" }, D.status + " " + D.demolition_year + " \u00b7 Succeeded by " + D.succeeded_by)))
      ),

      /* ============ RIGHT / SCOREBOARD FACE ============ */
      e("div", { className: "lm-page lm-right", "data-screen-label": "Milwaukee County Stadium — scoreboard page (right)" },
        e("div", { className: "lm-board" }),

        e("div", { className: "lm-rp" },

          /* engraved board nameplate */
          e("div", { className: "lm-boardlabel" },
            e("span", { className: "ln" }),
            e("span", { className: "t" }, "Milwaukee County Stadium \u00b7 Milwaukee, Wisconsin"),
            e("span", { className: "ln" })),

          /* ---- upper: identity bay + photo bays ---- */
          e("div", { className: "lm-upper" },
            e("div", { className: "lm-identity" },
              e("div", { className: "lm-id-top" },
                e("div", { className: "lm-id-logos" },
                  e("div", { className: "lm-id-glove braves" }, e("img", { src: "assets/milwaukee-braves-cap.svg", alt: "Milwaukee Braves" })),
                  e("div", { className: "lm-id-glove" }, e("img", { src: "assets/brewers-glove-sm.png", alt: "Milwaukee Brewers" }))),
                e("div", { className: "lm-id-name" },
                  e("div", { className: "nm" }, "Milwaukee"),
                  e("div", { className: "clubs" }, "Braves & Brewers"),
                  e("div", { className: "lg" }, "Home Clubs \u00b7 " + D.years_active))),
              e("div", { className: "lm-id-lamps" }, Array.from({ length: 17 }).map((_, i) => e("span", { key: i, className: "b" }))),
              e("div", { className: "lm-id-bottom" },
                e("div", { className: "lm-id-tag" }, "FEATURED VISIT", e("br", null), e("span", null, D.featured_visit_date)),
                e("div", { className: "lm-id-wells" },
                  e("div", { className: "lm-id-well" }, e("img", { src: "assets/american-league-logo.png", alt: "American League" })),
                  e("div", { className: "lm-id-well" }, e("img", { src: "assets/nl-logo.png", alt: "National League" })),
                  e("div", { className: "lm-id-well" }, e("img", { src: "assets/mlb-logo.svg", alt: "MLB" }))))),
            e("div", { className: "lm-photos" },
              e("div", { className: "lm-photo" }, e(Slot, { id: "mcs-p1", src: "images/county/county-stadium-01.jpg", placeholder: "Exposed steel grandstand & ramps" })),
              e("div", { className: "lm-photo" }, e(Slot, { id: "mcs-p2", src: "images/county/county-stadium-02.jpg", placeholder: "Open-air seating bowl" })),
              e("div", { className: "lm-photo" }, e(Slot, { id: "mcs-p3", src: "images/county/county-stadium-03.jpg", placeholder: "Outfield lamp-matrix scoreboard" })))
          ),

          /* ---- data bays ---- */
          e("div", { className: "lm-data" },

            /* STADIUM FACTS */
            e(Bay, { label: "Stadium Facts", rule: true, className: "lm-facts" },
              e("table", { className: "lm-ftab" }, e("tbody", null,
                fRow("Opened", e("b", null, D.opened)),
                fRow("Architect", D.architect),
                fRow("Surface", e(React.Fragment, null, D.playing_surface, " \u00b7 ", D.surface_detail)),
                fRow("Capacity", e(React.Fragment, null, e("b", null, D.capacity_opening), " \u2192 ", e("b", null, D.capacity_current))),
                fRow("Roof", D.roof_type),
                fRow("Structure", D.facade, true),
                fRow("Style", D.architectural_style, true))),
              e("div", { className: "lm-allstar" },
                e("div", { className: "k" }, "MLB All-Star Games"),
                e("div", { className: "v" }, D.allstar_years))),

            /* LIFECYCLE */
            e("div", { className: "lm-data-right" },
            e(Bay, { label: "Lifecycle", rule: true },
              kv("Construction Start", D.construction_start),
              kv("Opening Day", D.opening_day, "amber"),
              kv("Final Game", D.final_game),
              kv("Demolished", D.demolition_year, "red"),
              kv("Succeeded By", D.succeeded_by, "amber"),
              kv("Years Active", D.years_active),
              e("div", { className: "lm-kvw" },
                e("div", { className: "k" }, "Renovations"),
                e("div", { className: "v" }, D.renovations))),

            /* CLASSIFICATION + FINANCING */
            e("div", { className: "lm-stack" },
              e(Bay, { label: "Classification", rule: true },
                kv("Era", D.classification_era),
                kv("Status", D.status, "red"),
                kv("Type", D.stadium_type),
                kv("Location", D.location_type)),
              e(Bay, { label: "Financing" },
                kv("Owner", D.financing_owner, "amber"),
                kv("Cost", "$5.9M ($71M adj.)"),
                kv("Funding", "Publicly financed"))),

            /* FIELD DIMENSIONS + protractor */
            e(Bay, { label: "Field Dimensions", className: "lm-fd" },
              Protractor ? e("div", { className: "lm-fd-instr" },
                e(Protractor, { orientation: D.orientation, degrees: D.orientation_degrees })) : null,
              e("div", { className: "lm-fd-rows" },
                e("div", { className: "lm-fd-dims" },
                  e("div", { className: "c" }, e("div", { className: "k" }, "LF"), e("div", { className: "v" }, D.left_field_distance.replace(" ft", ""))),
                  e("div", { className: "c" }, e("div", { className: "k" }, "CF"), e("div", { className: "v" }, D.center_field_distance.replace(" ft", ""))),
                  e("div", { className: "c" }, e("div", { className: "k" }, "RF"), e("div", { className: "v" }, D.right_field_distance.replace(" ft", "")))),
                e("div", { className: "lm-fd-orient" },
                  e("div", { className: "k" }, "Orientation"),
                  e("div", { className: "v" }, D.orientation + " \u00b7 " + D.orientation_degrees + "\u00b0"))))
            )
          ),

          /* ---- STADIUM CONTEXT (enamel sign panel, largest) ---- */
          e("div", { className: "lm-context" },
            e("div", { className: "hd" },
              e("div", { className: "t" }, "The Tailgate Lot"),
              e("div", { className: "ln" }),
              e("div", { className: "sub" }, "A Public Invitation to the Majors")),
            e("div", { className: "lm-ctx-cols" },
              e("div", { className: "col" }, D.stadium_context.slice(0, 2).map((p, i) => e("p", { key: i }, p))),
              e("div", { className: "col" }, D.stadium_context.slice(2).map((p, i) => e("p", { key: i }, p))))),

          /* ---- GAME SCOREBOARD PANEL ---- */
          e("div", { className: "lm-game" },

            /* result + visit */
            e(Bay, { label: "Game \u00b7 " + D.game_title, className: "lm-gresult" },
              e("div", { className: "lm-score-line" },
                e("span", { className: homeWin ? "win" : "" }, "Brewers " + D.box.home.r), ", ",
                e("span", { className: !homeWin ? "win" : "" }, "Orioles " + D.box.away.r)),
              e("div", { className: "lm-matchup" }, D.matchup),
              e("div", { className: "lm-vrows" },
                vRow("Trip", D.trip_name, "amber"),
                vRow("Date", D.featured_visit_day + ", " + D.featured_visit_date),
                vRow("First Pitch", D.first_pitch, "amber")),
              e("div", { className: "lm-firstvisit" },
                e("span", { className: "k" }, "First Visit"),
                e("span", { className: "v" }, D.first_visit_date))),

            /* line score + pitching (starters matchup & decisions) */
            e(Bay, { label: "Line Score", rule: true,
                headerRight: "Final \u00b7 " + D.innings_played + " Innings \u00b7 " + D.game_duration },
              e("div", { className: "lm-line-wrap" }, LineScore(D.box)),
              e("div", { className: "lm-line-pitch" },
                e("div", { className: "pr match" }, e("span", { className: "tag" }, "Starters"),
                  e("span", { className: "nm" }, D.box.away.abbr + " " + D.away_starter + " vs " + D.box.home.abbr + " " + D.home_starter)),
                e("div", { className: "wl" },
                  e("div", { className: "pr" }, e("span", { className: "tag" }, "W"), e("span", { className: "nm" }, D.winning_pitcher)),
                  e("div", { className: "pr" }, e("span", { className: "tag" }, "L"), e("span", { className: "nm" }, D.losing_pitcher)),
                  e("div", { className: "att" }, e("span", { className: "tag" }, "ATT"), e("span", { className: "nm" }, D.attendance))))),

            /* weather */
            e(Bay, { label: "Conditions", rule: true },
              e("div", { className: "lm-wxgrid" },
                wx("temp", D.temperature, "Temperature"),
                wx("sun", D.conditions, "Conditions"),
                wx("wind", D.wind, "Wind"),
                wx("drop", D.humidity, "Humidity")))
          )
        )
      )
    );
  }

  window.CountySpread = Spread;
})();
