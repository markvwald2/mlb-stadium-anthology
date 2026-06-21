/* all-games-page.jsx — "ALL TRIP GAMES" appendix index.
   A single 1275×1088 book leaf: massive title, a two-column chaptered game
   index (one chapter per trip), and a footer stats bar. Reads window.ALLGAMES.
   Exports AppendixPage (the 1275-wide leaf) and AppendixSpread (a 2550 shell
   that drops the leaf onto the left page for the standard vector-PDF harness). */
(function () {
  var D = window.ALLGAMES;
  var T = D.teams;
  var e = React.createElement;

  function Team(props) {
    var t = T[props.name] || { logo: "mlb-logo.svg", nick: props.name };
    return e("span", { className: "ag-team" + (props.home ? " ag-team-home" : "") },
      e("img", { className: "ag-logo", src: "assets/" + t.logo, alt: "" }),
      e("span", { className: "ag-nick" }, t.nick));
  }

  function GameRow(props) {
    var gm = props.g;
    return e("div", { className: "ag-row" },
      e("div", { className: "ag-date" }, gm.date),
      e("div", { className: "ag-stadium" },
        e("span", { className: "ag-stadium-name" }, gm.stadium),
        gm.tag ? e("span", { className: "ag-tag ag-tag-" + (gm.tag === "RAINOUT" ? "rain" : "dh") },
          gm.tag === "RAINOUT" ? "Rainout" : "DH") : null),
      e("div", { className: "ag-match" },
        e(Team, { name: gm.home, home: true }),
        e("span", { className: "ag-vs" }, "vs"),
        e(Team, { name: gm.away })));
  }

  function TripChapter(props) {
    var tr = props.trip;
    return e("div", { className: "ag-chapter", style: { "--accent": tr.accent } },
      e("div", { className: "ag-chap-head" },
        e("span", { className: "ag-chap-tab" }),
        e("span", { className: "ag-chap-year" }, tr.year),
        e("span", { className: "ag-chap-name" }, tr.name),
        e("span", { className: "ag-chap-count" }, tr.games.length, " ", tr.games.length === 1 ? "GAME" : "GAMES")),
      e("div", { className: "ag-chap-rows" },
        tr.games.map(function (gm, i) { return e(GameRow, { key: i, g: gm }); })));
  }

  function Column(props) {
    return e("div", { className: "ag-col" },
      e("div", { className: "ag-colhead" },
        e("span", { className: "ag-ch-date" }, "Date"),
        e("span", { className: "ag-ch-stadium" }, "Stadium"),
        e("span", { className: "ag-ch-match" }, "Matchup")),
      props.trips.map(function (tr, i) { return e(TripChapter, { key: i, trip: tr }); }));
  }

  function AppendixPage() {
    var col1 = D.trips.filter(function (t) { return t.col === 1; });
    var col2 = D.trips.filter(function (t) { return t.col === 2; });
    return e("div", { className: "ag-page", "data-screen-label": "All Trip Games \u2014 appendix index" },
      e("div", { className: "ag-paper" }),

      // ---- masthead ----
      e("header", { className: "ag-masthead" },
        e("div", { className: "ag-kicker" }, "APPENDIX \u00b7 GAME INDEX"),
        e("h1", { className: "ag-title" }, D.title),
        e("div", { className: "ag-subline" },
          D.sub.map(function (s, i) {
            return e(React.Fragment, { key: i },
              i > 0 ? e("span", { className: "ag-sub-sep" }, "\u00b7") : null,
              e("span", { className: "ag-sub" },
                e("span", { className: "ag-sub-n" }, s.n),
                s.l ? e("span", { className: "ag-sub-l" }, " ", s.l) : null));
          }))),

      // ---- two-column index ----
      e("div", { className: "ag-index" },
        e(Column, { trips: col1 }),
        e("div", { className: "ag-divider" }),
        e(Column, { trips: col2 })),

      // ---- footer stats bar ----
      e("footer", { className: "ag-footer" },
        D.footer.map(function (m, i) {
          return e("div", { className: "ag-stat", key: i },
            e("div", { className: "ag-stat-n" }, m.n),
            e("div", { className: "ag-stat-l" }, m.l.map(function (ln, j) { return e("span", { key: j }, ln); })));
        }),
        e("div", { className: "ag-stat ag-stat-mark" },
          e("img", { className: "ag-mlb", src: "assets/mlb-logo.svg", alt: "MLB" }),
          e("div", { className: "ag-stat-l" }, e("span", null, "1986\u20132025")))));
  }

  // 2550 shell for the standard left-page print harness: paper across the sheet,
  // the appendix leaf occupying the left page (x 0..1275).
  function AppendixSpread() {
    return e("div", { style: { position: "relative", width: "2550px", height: "1088px", background: "#EFE7D6" } },
      e("div", { style: { position: "absolute", left: "0", top: "0", width: "1275px", height: "1088px" } },
        e(AppendixPage, null)));
  }

  window.AppendixPage = AppendixPage;
  window.AppendixSpread = AppendixSpread;
})();
