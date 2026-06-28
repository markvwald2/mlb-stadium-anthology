/* ballparks-page.jsx — "BALLPARKS VISITED" appendix life-list.
   A single 1275×1088 book leaf: a chronological numbered ballpark life-list
   (by first visit), split across two columns with per-column decade dividers,
   former parks flagged, and a footer stats bar. Reads window.BALLPARKS.
   Exports BallparksPage and BallparksSpread (2550 left-page print shell). */
(function () {
  var D = window.BALLPARKS;
  var L = D.teams;
  var e = React.createElement;

  function visited(row) { return row.fv; }
  function tenure(row) { return row.current ? "Since " + row.from : row.from + "\u2013" + row.to; }

  function Row(props) {
    var row = props.row;
    return e("div", { className: "bp-row" + (row.current ? "" : " bp-row-former") },
      e("div", { className: "bp-num" }, row.n),
      e("div", { className: "bp-logo-wrap" },
        e("img", { className: "bp-logo", src: "assets/" + (row.logo || L[row.team] || "mlb-logo.svg"), alt: "",
          style: Object.assign(
            {},
            (row.logoScale || row.logoDy)
              ? { transform: "translateY(" + (row.logoDy || 0) + "px) scale(" + (row.logoScale || 1) + ")" }
              : null,
            row.logoFilter ? { filter: row.logoFilter, opacity: 1 } : null) })),
      e("div", { className: "bp-main" },
        e("div", { className: "bp-line1" },
          e("span", { className: "bp-stadium" }, row.stadium),
          row.current ? null : e("span", { className: "bp-former" }, "Former")),
        e("div", { className: "bp-line2" },
          e("span", { className: "bp-team" }, row.team),
          row.division ? e("span", { className: "bp-div" }, "\u00b7 " + row.division) : null)),
      e("div", { className: "bp-right" },
        e("div", { className: "bp-visited" }, visited(row)),
        e("div", { className: "bp-tenure" }, tenure(row))));
  }

  // render a column: insert a decade divider whenever the decade changes
  function Column(props) {
    var out = [];
    var prev = null;
    props.rows.forEach(function (row, i) {
      if (row.decade !== prev) {
        out.push(e("div", { className: "bp-decade", key: "d" + row.decade + i },
          e("span", { className: "bp-decade-label" }, row.decade),
          e("span", { className: "bp-decade-rule" })));
        prev = row.decade;
      }
      out.push(e(Row, { key: "r" + row.n, row: row }));
    });
    return e("div", { className: "bp-col" },
      e("div", { className: "bp-colhead" },
        e("span", { className: "bp-ch-num" }, "No."),
        e("span", { className: "bp-ch-park" }, "Ballpark"),
        e("span", { className: "bp-ch-visited" }, "Visited")),
      out);
  }

  function BallparksPage() {
    var col1 = D.rows.filter(function (x) { return x.n <= D.split; });
    var col2 = D.rows.filter(function (x) { return x.n > D.split; });
    return e("div", { className: "bp-page", "data-screen-label": "Ballparks Visited \u2014 appendix life-list" },
      e("div", { className: "bp-paper" }),

      e("header", { className: "bp-masthead" },
        D.years ? e("div", { className: "bp-years" }, D.years) : null,
        e("div", { className: "bp-kicker" }, D.kicker),
        e("h1", { className: "bp-title" }, D.title)),

      e("div", { className: "bp-index" },
        e(Column, { rows: col1 }),
        e("div", { className: "bp-divider" }),
        e(Column, { rows: col2 })),

      e("div", { className: "bp-baseline" }));
  }

  function BallparksSpread() {
    return e("div", { style: { position: "relative", width: "2550px", height: "1088px", background: "#EFE7D6" } },
      e("div", { style: { position: "absolute", left: "0", top: "0", width: "1275px", height: "1088px" } },
        e(BallparksPage, null)));
  }

  window.BallparksPage = BallparksPage;
  window.BallparksSpread = BallparksSpread;
})();
