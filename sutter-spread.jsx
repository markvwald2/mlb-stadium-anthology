/* sutter-spread.jsx — Sutter Health Park anthology spread. "The Temporary Span."
   Reads window.SUTTER. Left page = full-bleed riverfront hero with a fabricated
   bridge-sign title plate. Right page = a bridge elevation of three structural
   bays (Identity / Context / Visit) framed by controlled Tower-Bridge-yellow
   truss members on warm paper with masonry backing. No module crosses the fold;
   yellow is structure, not a wash; team colors stay restrained accents. */
(function () {
  const D = window.SUTTER;
  const FieldDiagram = window.SutterProtractor;
  const e = React.createElement;

  function Slot(props) {
    return e("image-slot", { id: props.id, placeholder: props.placeholder, shape: props.shape || "rect", src: props.src });
  }

  /* ---- logo wells (Bay 1) ---- */
  function LogoWell(props) {
    let mark;
    if (props.kind === "mlb") {
      mark = e("img", { className: "shp-well-img mlb", src: "assets/mlb-logo.svg", alt: "Major League Baseball" });
    } else if (props.kind === "league") {
      mark = e("img", { className: "shp-well-img al", src: "assets/american-league-logo.png", alt: "American League" });
    } else {
      mark = e("img", { className: "shp-well-img team", src: "assets/athletics-cap-logo.svg", alt: "Athletics" });
    }
    return e("div", { className: "shp-well", title: props.cap },
      e("div", { className: "shp-well-mark" }, mark));
  }

  /* ---- bridge truss frame (right-page structure; lives only in margins/gaps) ---- */
  function trussPost(cx, y0, y1, key) {
    const half = 17, seg = 9, span = (y1 - y0) / seg, els = [];
    els.push(e("line", { key: "v" + key, x1: cx, y1: y0, x2: cx, y2: y1, stroke: "currentColor", strokeWidth: 2.6 }));
    for (let i = 0; i < seg; i++) {
      const yA = y0 + span * i, yB = y0 + span * (i + 1);
      const lx = (i % 2 === 0) ? cx - half : cx + half;
      const rx = (i % 2 === 0) ? cx + half : cx - half;
      els.push(e("line", { key: "d" + key + i, x1: lx, y1: yA, x2: rx, y2: yB, stroke: "currentColor", strokeWidth: 1.2, opacity: 0.5 }));
    }
    els.push(e("rect", { key: "nt" + key, x: cx - 4, y: y0 - 4, width: 8, height: 8, fill: "#B07C16" }));
    els.push(e("rect", { key: "nb" + key, x: cx - 4, y: y1 - 4, width: 8, height: 8, fill: "#B07C16" }));
    return e("g", { key: "post" + key }, els);
  }
  function BridgeFrame() {
    const x0 = 40, x1 = 1248, yTop = 46, yBot = 1044, posts = [386, 858];
    const rivets = [];
    for (let x = x0 + 26; x < x1; x += 52) {
      rivets.push(e("circle", { key: "rt" + x, cx: x, cy: yTop, r: 1.7, fill: "#8A6210" }));
      rivets.push(e("circle", { key: "rb" + x, cx: x, cy: yBot, r: 1.7, fill: "#8A6210" }));
    }
    return e("svg", { className: "shp-frame", viewBox: "0 0 1275 1088", preserveAspectRatio: "none", "aria-hidden": "true" },
      e("line", { x1: x0, y1: yTop, x2: x1, y2: yTop, stroke: "currentColor", strokeWidth: 4 }),
      e("line", { x1: x0, y1: yBot, x2: x1, y2: yBot, stroke: "currentColor", strokeWidth: 4 }),
      e("line", { x1: x0, y1: yTop, x2: x0, y2: yBot, stroke: "currentColor", strokeWidth: 2, opacity: 0.85 }),
      e("line", { x1: x1, y1: yTop, x2: x1, y2: yBot, stroke: "currentColor", strokeWidth: 2, opacity: 0.85 }),
      rivets,
      posts.map((cx, i) => trussPost(cx, yTop, yBot, i)),
      [x0, x1].map((cx, i) => e("g", { key: "end" + i },
        e("rect", { x: cx - 4, y: yTop - 4, width: 8, height: 8, fill: "#B07C16" }),
        e("rect", { x: cx - 4, y: yBot - 4, width: 8, height: 8, fill: "#B07C16" }))));
  }

  /* ---- weather icons ---- */
  function WxSun() {
    return e("svg", { className: "shp-wx-ico", width: "30", height: "30", viewBox: "0 0 24 24", fill: "none", stroke: "#9C6F45", strokeWidth: "1.6", strokeLinecap: "round" },
      e("circle", { cx: "12", cy: "12", r: "4.6", fill: "#E7C24A", stroke: "#C99A2A" }),
      e("g", { stroke: "#B07C16" },
        e("line", { x1: "12", y1: "2.4", x2: "12", y2: "5" }),
        e("line", { x1: "12", y1: "19", x2: "12", y2: "21.6" }),
        e("line", { x1: "2.4", y1: "12", x2: "5", y2: "12" }),
        e("line", { x1: "19", y1: "12", x2: "21.6", y2: "12" }),
        e("line", { x1: "5.2", y1: "5.2", x2: "7", y2: "7" }),
        e("line", { x1: "17", y1: "17", x2: "18.8", y2: "18.8" }),
        e("line", { x1: "18.8", y1: "5.2", x2: "17", y2: "7" }),
        e("line", { x1: "7", y1: "17", x2: "5.2", y2: "18.8" })));
  }
  function WxIcon(kind) {
    const c = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "#6B6253", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", className: "shp-wxr-ico" };
    if (kind === "wind") return e("svg", c,
      e("path", { d: "M3 8h11a2.5 2.5 0 1 0-2.5-2.5" }),
      e("path", { d: "M3 16h15a2.5 2.5 0 1 1-2.5 2.5" }),
      e("path", { d: "M3 12h7" }));
    if (kind === "humidity") return e("svg", c,
      e("path", { d: "M12 3.2s5.5 5.9 5.5 9.8a5.5 5.5 0 1 1-11 0C6.5 9.1 12 3.2 12 3.2z" }));
    return null;
  }

  function Spread() {
    return (
      e("div", { className: "shp-spread", "data-screen-label": "Sutter Health Park spread" },

        /* ===================== LEFT PAGE / HERO ===================== */
        e("div", { className: "shp-page shp-left", "data-screen-label": "Sutter Health Park hero" },
          e("div", { className: "shp-hero-slot" },
            e(Slot, { id: "sutter-hero", src: "images/sutter/sutter-health-park-00-main-PD.jpg", placeholder: "Drop the Sutter Health Park aerial \u2014 ballpark + Sacramento River + Tower Bridge + urban edge" })),
          e("div", { className: "shp-hero-scrim" }),
          e("div", { className: "shp-hero-folio" }, "Interim Riverfront Warehouse \u00b7 Temporary MLB"),

          /* small bearing cue */
          e("div", { className: "shp-hero-coord" },
            e("svg", { width: "28", height: "28", viewBox: "0 0 30 30", fill: "none", stroke: "#5D584B", strokeWidth: "1" },
              e("circle", { cx: "15", cy: "15", r: "11" }),
              e("path", { d: "M15 4 L15 26 M4 15 L26 15", strokeWidth: "0.7", opacity: "0.55" }),
              e("path", { d: "M20 9 L23 6 L21.5 10.5 Z", fill: "#E2A734", stroke: "none" })),
            e("div", { className: "shp-hero-coord-txt" },
              e("span", null, "NE \u00b7 46\u00b0"),
              e("span", { className: "ll" }, "Field bearing"))),

          /* fabricated bridge-sign title plate */
          e("div", { className: "shp-plate" },
            e("span", { className: "shp-rivet tl" }), e("span", { className: "shp-rivet tr" }),
            e("span", { className: "shp-rivet bl" }), e("span", { className: "shp-rivet br" }),
            e("div", { className: "shp-plate-inner" },
              e("h1", { className: "shp-plate-name" }, "SUTTER HEALTH PARK"),
              e("div", { className: "shp-plate-rule" }),
              e("div", { className: "shp-plate-foot" },
                e("div", { className: "shp-plate-sub" }, "West Sacramento, California")))),

          /* metadata + colophon footer */
          e("div", { className: "shp-hero-foot" },
            e("div", { className: "shp-meta" },
              e("span", null, D.address),
              e("span", { className: "dot" }, "\u00b7"),
              e("span", null, "Elev. ", e("em", null, D.elevation)),
              e("span", { className: "dot" }, "\u00b7"),
              e("span", null, D.coordinates_n, "  ", D.coordinates_w),
              e("span", { className: "dot" }, "\u00b7"),
              e("span", null, "MLB use opened ", e("em", null, D.opened_mlb))),
            e("div", { className: "shp-colophon" },
              e("span", { className: "shp-colo-as", role: "img", "aria-label": "Athletics" }),
              e("span", { className: "shp-colo-div" }),
              e("img", { className: "shp-colo-mlb", src: "assets/mlb-logo.svg", alt: "MLB" }),
              e("span", { className: "shp-colo-txt" }, "Major League Baseball")))
        ),

        /* ===================== RIGHT PAGE ===================== */
        e("div", { className: "shp-page shp-right" },
          e(BridgeFrame, null),
          e("div", { className: "shp-bays" },

            /* ---------- BAY 1 — STADIUM IDENTITY ---------- */
            e("div", { className: "shp-bay shp-bay-id" },
              e("div", { className: "shp-bayhead" },
                e("span", { className: "shp-bayhead-no" }, "Bay 01"),
                e("span", { className: "shp-bayhead-t" }, "Stadium Identity")),

              e("div", { className: "shp-wells" },
                e(LogoWell, { kind: "team", cap: "A\u2019s" }),
                e(LogoWell, { kind: "mlb", cap: "MLB" }),
                e(LogoWell, { kind: "league", cap: "AL" })),

              e("div", { className: "shp-idline" },
                e("span", { className: "team" }, D.team_name),
                idDot(), e("span", null, D.league),
                idDot(), e("span", null, D.division)),

              e("div", { className: "shp-modh" }, "Stadium Facts"),
              e("div", { className: "shp-table" },
                D.facts.map((f, i) => factRow(f[0], f[1], i))),

              e("div", { className: "shp-fig" },
                FieldDiagram ? e(FieldDiagram, {
                  lf: D.field.left_field, cf: D.field.center_field, rf: D.field.right_field,
                  orientation: D.field.orientation, degrees: D.field.orientation_degrees
                }) : null)),

            /* ---------- BAY 2 — STADIUM CONTEXT ---------- */
            e("div", { className: "shp-bay shp-bay-ctx" },
              e("div", { className: "shp-bayhead" },
                e("span", { className: "shp-bayhead-no" }, "Bay 02"),
                e("span", { className: "shp-bayhead-t" }, "Borrowed Ground")),
              e("div", { className: "shp-ctx" },
                e("p", null, D.context[0]),
                e("p", null, D.context[1]),
                e("div", { className: "shp-ctx-photo" },
                  e("div", { className: "shp-pcard" },
                    e(Slot, { id: "sutter-p3", src: "images/sutter/sutter-health-park-01.jpg", placeholder: "Warehouse-district masonry \u2014 concourse or facade detail" }))),
                e("p", null, D.context[2]),
                e("p", null, D.context[3])),
              e("div", { className: "shp-ctx-foot" },
                e("span", null, "The Temporary Span"),
                e("span", { className: "ts" }, "Oakland Coliseum \u2192 West Sacramento \u2192 Las Vegas"))),

            /* ---------- BAY 3 — VISIT ARTIFACT ---------- */
            e("div", { className: "shp-bay shp-bay-visit" },
              e("div", { className: "shp-bayhead" },
                e("span", { className: "shp-bayhead-no" }, "Bay 03"),
                e("span", { className: "shp-bayhead-t" }, "Visit Artifact"),
                e("span", { className: "shp-bayhead-vo" }, D.visit_order + " / " + D.visit_total)),

              e("div", { className: "shp-vphoto top" },
                e("div", { className: "shp-pcard" },
                  e(Slot, { id: "sutter-p1", src: "images/sutter/sutter-health-park-02.jpg", placeholder: "Riverfront approach \u2014 ballpark + Tower Bridge" }))),

              e("div", { className: "shp-visit-title" },
                e("span", { className: "gt" }, D.featured_title),
                e("span", { className: "tr" }, D.trip_name + " \u00b7 " + D.featured_day + ", " + D.featured_date)),

              e("div", { className: "shp-gtable" },
                grow("Matchup", D.away_team + " (" + D.away_abbr + ") at " + D.home_team + " (" + D.home_abbr + ")"),
                growStrong("Result", D.result_line),
                grow("First Pitch", D.first_pitch + " \u00b7 night"),
                grow("Pitching", D.starter_away + " (" + D.away_abbr + ") vs " + D.starter_home + " (" + D.home_abbr + ")"),
                grow("Attendance", e(React.Fragment, null, D.attendance, " ", e("span", { className: "k", style: { marginLeft: "30px" } }, "Duration"), " " + D.game_duration))),

              e("div", { className: "shp-score" },
                BoxScore(D.box),
                e("div", { className: "shp-decisions" },
                  decItem("W", D.winning_pitcher),
                  decItem("L", D.losing_pitcher))),

              e("div", { className: "shp-wx" },
                e("div", { className: "shp-wx-main" },
                  e(WxSun, null),
                  e("div", { className: "shp-wx-temp" },
                    e("span", { className: "deg" }, D.weather.temperature),
                    e("span", { className: "cond" }, D.weather.conditions))),
                e("div", { className: "shp-wx-r" }, WxIcon("wind"),
                  e("div", { className: "shp-wx-rt" },
                    e("span", { className: "k" }, "Wind"), e("span", { className: "v" }, D.weather.wind))),
                e("div", { className: "shp-wx-r" }, WxIcon("humidity"),
                  e("div", { className: "shp-wx-rt" },
                    e("span", { className: "k" }, "Humidity"), e("span", { className: "v" }, D.weather.humidity)))),

              e("div", { className: "shp-vphoto bot" },
                e("div", { className: "shp-pcard" },
                  e(Slot, { id: "sutter-p2", src: "images/sutter/sutter-health-park-03.jpg", placeholder: "Open-air bowl \u2014 hot July night, group visit" }))))
          )
        )
      )
    );
  }

  /* ---------- helpers ---------- */
  function idDot() { return e("span", { className: "iddot" }, "\u00b7"); }
  function factRow(k, v, i) {
    return e("div", { className: "row", key: i },
      e("div", { className: "k" }, k),
      e("div", { className: "v" }, v));
  }
  function grow(k, v) {
    return e("div", { className: "grow" },
      e("div", { className: "k" }, k),
      e("div", { className: "v" }, v));
  }
  function growStrong(k, v) {
    return e("div", { className: "grow strong" },
      e("div", { className: "k" }, k),
      e("div", { className: "v" }, v));
  }
  function decItem(k, v) {
    return e("div", { className: "d" },
      e("span", { className: "dk" }, k),
      e("span", { className: "dv" }, v));
  }
  function BoxScore(box) {
    const heads = []; for (let i = 1; i <= box.innings; i++) heads.push(i);
    function tr(t, away) {
      return e("tr", { className: away ? "awayrow" : "homerow" },
        e("td", { className: "tm" }, t.abbr),
        t.byInning.map((n, i) => e("td", { key: i, className: n > 0 ? "hit" : "" }, n)),
        e("td", { className: "rhe sep" }, t.r),
        e("td", { className: "rhe" }, t.h),
        e("td", { className: "rhe" }, t.e));
    }
    return e("table", { className: "shp-box" },
      e("thead", null,
        e("tr", null,
          e("th", { className: "tm" }, ""),
          heads.map((n) => e("th", { key: n }, n)),
          e("th", { className: "sep" }, "R"),
          e("th", null, "H"),
          e("th", null, "E"))),
      e("tbody", null,
        tr(box.away, true),
        tr(box.home, false)));
  }

  window.SutterSpread = Spread;
})();
