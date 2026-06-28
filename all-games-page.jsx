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
    var logo = props.logo || t.logo;
    var st = (props.scale || props.dy || props.dx)
      ? { transform: "translate(" + (props.dx || 0) + "px," + (props.dy || 0) + "px) scale(" + (props.scale || 1) + ")" }
      : undefined;
    return e("span", { className: "ag-team" + (props.right ? " ag-team-right" : "") + (props.emph ? " ag-team-emph" : "") },
      e("img", { className: "ag-logo", src: "assets/" + logo, alt: "", style: st }),
      e("span", { className: "ag-nick" }, t.nick));
  }

  function ovFor(gm, name) {
    if (!gm.ov || !gm.ov[name]) return {};
    var o = gm.ov[name];
    return (typeof o === "string") ? { logo: o } : o;
  }

  function GameRow(props) {
    var gm = props.g;
    return e("div", { className: "ag-row" },
      e("div", { className: "ag-date" }, gm.date),
      e("div", { className: "ag-stadium" },
        e("span", { className: "ag-stadium-name" }, gm.stadium),
        gm.tag === "RAINOUT" ? e("span", { className: "ag-tag ag-tag-rain" }, "Rainout") : null),
      e("div", { className: "ag-match" },
        e(Team, Object.assign({ name: gm.away, right: true }, ovFor(gm, gm.away))),
        e("span", { className: "ag-vs" }, "vs"),
        e(Team, Object.assign({ name: gm.home, emph: true }, ovFor(gm, gm.home)))));
  }

  function TripChapter(props) {
    var tr = props.trip;
    // ROWH must match .ag-row height in the host CSS.
    var ROWH = 31;
    // one DH chip centered on the hairline between a consecutive same-stadium DH pair
    var dhBoundaries = [];
    for (var i = 0; i < tr.games.length - 1; i++) {
      if (tr.games[i].tag === "DH" && tr.games[i + 1].tag === "DH" &&
          tr.games[i].stadium === tr.games[i + 1].stadium) {
        dhBoundaries.push(i + 1);
      }
    }
    return e("div", { className: "ag-chapter", style: { "--accent": tr.accent } },
      e("div", { className: "ag-chap-head" },
        e("span", { className: "ag-chap-tab" }),
        e("span", { className: "ag-chap-year" }, tr.year),
        e("span", { className: "ag-chap-name" }, tr.name),
        e("span", { className: "ag-chap-count" }, tr.games.length, " ", tr.games.length === 1 ? "GAME" : "GAMES")),
      e("div", { className: "ag-chap-rows" },
        tr.games.map(function (gm, i) { return e(GameRow, { key: i, g: gm }); }),
        dhBoundaries.map(function (b) {
          return e("span", { key: "dh" + b, className: "ag-dh-link", style: { top: (b * ROWH) + "px" } }, "DH");
        })));
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
        D.years ? e("div", { className: "ag-years" }, D.years) : null,
        e("div", { className: "ag-kicker" }, "APPENDIX \u00b7 GAME INDEX"),
        e("h1", { className: "ag-title" }, D.title)),

      // ---- two-column index ----
      e("div", { className: "ag-index" },
        e(Column, { trips: col1 }),
        e("div", { className: "ag-divider" }),
        e(Column, { trips: col2 })),

      e("div", { className: "ag-baseline" }));
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
