/* jack-intro.jsx — "Jack's Ballparks" introduction leaf.
   A single 1275×1088 book page in the museum-wall-panel mode: masthead +
   intro, a linear journey timeline (12 trips at true year positions, greedily
   stacked into tiers so dense recent clusters stay legible), a Collection
   stats panel, a Stadium-Eras panel (placeholder pending data), an image-slot
   evolution strip, and a footer tagline. Reads window.JACK.
   Exports JackIntroPage (1275 leaf) and JackIntroSpread (2550 print shell). */
(function () {
  var D = window.JACK;
  var e = React.createElement;

  function xPct(year) { return (year - D.axis.min) / (D.axis.max - D.axis.min) * 100; }

  // ── MASTHEAD ───────────────────────────────────────────────────────────
  function Masthead() {
    return e("header", { className: "jb-mast" },
      e("div", { className: "jb-mast-l" },
        e("h1", { className: "jb-title" }, D.title),
        e("div", { className: "jb-subline" },
          D.subline.map(function (s, i) {
            return e(React.Fragment, { key: i },
              i ? e("span", { className: "jb-dot" }, "\u2022") : null,
              e("span", { className: "jb-sub-item jb-num" }, s));
          })),
        e("p", { className: "jb-standfirst" }, D.standfirst)),
      e("div", { className: "jb-mast-r" },
        D.intro.map(function (p, i) { return e("p", { className: "jb-intro-p", key: i }, p); })));
  }

  // ── TIMELINE ───────────────────────────────────────────────────────────
  // Dots sit at TRUE year positions on the axis (honest time scale, with the
  // sparse 1990→2011 gap intact). Labels are evenly spaced below and tied to
  // their dot by a thin leader — the only way the dense 2016–2025 cluster
  // stays legible at this page width.
  function Timeline() {
    var trips = D.trips, n = trips.length;
    // nudge same-year trips apart so both dots read (e.g. the two 2024s)
    var groups = {};
    trips.forEach(function (t) { (groups[t.year] = groups[t.year] || []).push(t); });
    var dotPct = trips.map(function (t) {
      var g = groups[t.year], idx = g.indexOf(t);
      var nudge = g.length > 1 ? (idx - (g.length - 1) / 2) * 1.15 : 0;
      return xPct(t.year) + nudge;
    });
    var slotPct = trips.map(function (_, i) { return (i + 0.5) / n * 100; });

    return e("section", { className: "jb-tl" },
      e("div", { className: "jb-kicker" }, "The Journey Timeline"),
      e("div", { className: "jb-tl-stage" },
        // decade ticks
        D.axis.ticks.map(function (y) {
          return e("div", { className: "jb-tick", style: { left: xPct(y) + "%" }, key: y },
            e("span", { className: "jb-tick-label jb-num" }, y),
            e("span", { className: "jb-tick-mark" }));
        }),
        e("div", { className: "jb-axis" }),
        // trip markers at true year positions
        trips.map(function (t, i) {
          return e("span", { className: "jb-mk", style: { left: dotPct[i] + "%", background: t.accent }, key: i });
        }),
        // leaders from each dot to its evenly-spaced label
        e("svg", { className: "jb-leadsvg", viewBox: "0 0 100 34", preserveAspectRatio: "none" },
          trips.map(function (t, i) {
            return e("line", {
              key: i, x1: dotPct[i], y1: 0, x2: slotPct[i], y2: 34,
              stroke: t.accent, strokeWidth: 1, opacity: 0.5, vectorEffect: "non-scaling-stroke"
            });
          })),
        // evenly-spaced labels
        e("div", { className: "jb-labels" },
          trips.map(function (t, i) {
            return e("div", { className: "jb-lab", style: { left: slotPct[i] + "%" }, key: i },
              e("span", { className: "jb-badge", style: { borderColor: t.accent, color: t.accent } }, t.seq),
              e("span", { className: "jb-lab-year jb-num", style: { color: t.accent } }, t.year),
              e("span", { className: "jb-lab-region" },
                t.region.map(function (r, j) { return e("span", { className: "jb-lab-line", key: j }, r); })),
              e("span", { className: "jb-lab-stat" }, t.st + " parks \u00b7 " + t.gm + " games"));
          }))));
  }

  // ── THE COLLECTION ─────────────────────────────────────────────────────
  function Collection() {
    return e("section", { className: "jb-panel jb-collection" },
      e("div", { className: "jb-panel-h" }, "The Collection"),
      e("div", { className: "jb-stats" },
        D.collection.map(function (s, i) {
          return e("div", { className: "jb-stat", key: i },
            e("div", { className: "jb-stat-n jb-num" + (s.small ? " jb-stat-sm" : ""), style: { color: s.c } }, s.n),
            e("div", { className: "jb-stat-l" }, s.l),
            s.sub ? e("div", { className: "jb-stat-sub" }, s.sub) : null);
        })));
  }

  // ── STADIUM ERAS (placeholder) ─────────────────────────────────────────
  function Eras() {
    return e("section", { className: "jb-panel jb-eras" },
      e("div", { className: "jb-panel-h" }, "Stadium Eras Represented",
        D.erasPending ? e("span", { className: "jb-panel-note" }, "stadium counts pending your list") : null),
      e("div", { className: "jb-era-row" },
        D.eras.map(function (er, i) {
          return e("div", { className: "jb-era", key: i },
            e("div", { className: "jb-era-slot" },
              e("image-slot", { id: er.slot, shape: "rect", placeholder: "engraving" })),
            e("div", { className: "jb-era-bar", style: { background: er.bar } }),
            e("div", { className: "jb-era-name" },
              (Array.isArray(er.name) ? er.name : [er.name]).map(function (ln, k) {
                return e("span", { className: "jb-era-name-l", key: k }, ln);
              })),
            e("div", { className: "jb-era-years jb-num" }, er.years),
            e("div", { className: "jb-era-count jb-num" }, er.count),
            e("div", { className: "jb-era-count-l" }, "Stadiums"));
        })));
  }

  // ── EVOLUTION STRIP ────────────────────────────────────────────────────
  function Evolution() {
    return e("section", { className: "jb-evo" },
      e("div", { className: "jb-kicker jb-evo-kicker" }, "The Evolution of the Ballpark"),
      e("div", { className: "jb-evo-row" },
        D.evolution.map(function (p, i) {
          return e("div", { className: "jb-evo-cell", key: i },
            e("div", { className: "jb-evo-slot" },
              e("image-slot", { id: p.slot, shape: "rect", placeholder: p.name + " silhouette" })),
            e("div", { className: "jb-evo-name" }, p.name),
            e("div", { className: "jb-evo-year jb-num" }, p.year));
        })));
  }

  function Footer() {
    return e("footer", { className: "jb-foot" },
      D.tagline.map(function (t, i) {
        return e(React.Fragment, { key: i },
          i ? e("span", { className: "jb-foot-dia" }, "\u25C6") : null,
          e("span", { className: "jb-foot-t" }, t));
      }));
  }

  function JackIntroPage() {
    return e("div", { className: "jb-page", "data-screen-label": "Jack\u2019s Ballparks \u2014 introduction leaf" },
      e("div", { className: "jb-inner" },
        e(Masthead, null),
        e(Timeline, null),
        e("div", { className: "jb-midband" },
          e(Collection, null),
          e(Eras, null)),
        e(Evolution, null),
        e(Footer, null)));
  }

  // 2550 print shell — page occupies the LEFT half (fold at x=1275)
  function JackIntroSpread() {
    return e("div", { style: { position: "relative", width: "2550px", height: "1088px", background: "#e9e7db" } },
      e("div", { style: { position: "absolute", left: "0", top: "0", width: "1275px", height: "1088px" } },
        e(JackIntroPage, null)));
  }

  window.JackIntroPage = JackIntroPage;
  window.JackIntroSpread = JackIntroSpread;
})();
