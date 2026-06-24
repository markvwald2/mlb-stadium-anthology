/* about-book-options.jsx — three content directions for a one-page
   "what this book is" intro leaf (single 1275×1088 recto page on warm paper).
   All facts used are data-supported (ballparks-data.js): 42 ballparks, 30 teams,
   1953–2025, 12 former parks, 6 divisions; first park Wrigley 1953; last 2025.
   The personal-note prose in Option B is draft copy meant to be personalized.
   Exports window.AboutOptionA / AboutOptionB / AboutOptionC. */
(function () {
  const e = React.createElement;

  function Kicker(props) {
    return e("div", { className: "ab-kicker" },
      e("span", null, props.children),
      e("span", { className: "ab-kicker-rule" })
    );
  }

  /* ───────────────── OPTION A — THE PREMISE (editorial title page) ───────── */
  function AboutOptionA() {
    const stats = [
      { n: "42", l: "Ballparks" },
      { n: "30", l: "Teams" },
      { n: "1953\u20132025", l: "Seasons" },
      { n: "12", l: "Former parks" }
    ];
    return e("div", { className: "ab-page", "data-screen-label": "About \u2014 Option A \u00b7 The Premise" },
      e("div", { className: "ab-inner ab-a" },
        e(Kicker, null, "Introduction"),
        e("h1", { className: "ab-title" },
          "Forty-two", e("br"), "ballparks,", e("br"),
          e("span", { className: "ab-title-em" }, "one lifetime.")
        ),
        e("p", { className: "ab-lede" },
          "This book follows one fan across more than seventy years of baseball \u2014 from a first afternoon at Wrigley Field in 1953 to a last pitch in 2025. Every park he walked into is gathered here, the ones still standing and the ones long gone, each given its own spread: the architecture, the field, and the day it was seen."
        ),
        e("div", { className: "ab-spacer" }),
        e("div", { className: "ab-stats" },
          stats.map(function (s, i) {
            return e("div", { className: "ab-stat", key: i },
              e("div", { className: "ab-stat-n ab-num" }, s.n),
              e("div", { className: "ab-stat-l" }, s.l)
            );
          })
        )
      )
    );
  }

  /* ───────────────── OPTION B — A NOTE (personal foreword) ───────────────── */
  function AboutOptionB() {
    return e("div", { className: "ab-page", "data-screen-label": "About \u2014 Option B \u00b7 A Note" },
      e("div", { className: "ab-inner ab-b" },
        e("div", { className: "ab-dateline" }, "Father\u2019s Day \u00b7 June 2026"),
        e("h1", { className: "ab-title ab-title-b" }, "For Dad"),
        e("div", { className: "ab-note" },
          e("p", { className: "ab-note-lead" },
            "Some people measure a life in years. You\u2019ve measured yours in ballparks."
          ),
          e("p", null,
            "In the green of a first Wrigley afternoon in 1953. In the smell of cut grass and old steel, in every long drive that ended at a ticket gate, in scorecards kept and seats remembered."
          ),
          e("p", null,
            "This is a record of those days \u2014 forty-two parks across more than seventy seasons, the ones still standing and the ones we can only visit in memory. One trip at a time, here they all are."
          )
        ),
        e("div", { className: "ab-sign" },
          e("span", { className: "ab-sign-rule" }),
          e("span", { className: "ab-sign-text" }, "Happy Father\u2019s Day")
        )
      )
    );
  }

  /* ───────────────── OPTION C — HOW TO READ THIS BOOK (reader\u2019s guide) ──── */
  function AboutOptionC() {
    const legend = [
      { k: "L", t: "Stadium hero", d: "A full-bleed photograph of the park, with its name and city." },
      { k: "R", t: "Stadium Section", d: "Architecture, opening year, capacity, and the field\u2019s dimensions and orientation." },
      { k: "R", t: "Visit Section", d: "The game that was seen there \u2014 the date, the teams, the result." }
    ];
    return e("div", { className: "ab-page", "data-screen-label": "About \u2014 Option C \u00b7 How to Read This Book" },
      e("div", { className: "ab-inner ab-c" },
        e(Kicker, null, "How to read this book"),
        e("h1", { className: "ab-title ab-title-c" }, "Two pages,", e("br"), "one ballpark."),
        e("div", { className: "ab-c-body" },
          // mini spread diagram
          e("div", { className: "ab-diagram" },
            e("div", { className: "ab-dia-spread" },
              e("div", { className: "ab-dia-left" },
                e("div", { className: "ab-dia-tag" }, "Hero")
              ),
              e("div", { className: "ab-dia-fold" }),
              e("div", { className: "ab-dia-right" },
                e("div", { className: "ab-dia-block ab-dia-stadium" }, "Stadium"),
                e("div", { className: "ab-dia-block ab-dia-visit" }, "Visit")
              )
            ),
            e("div", { className: "ab-dia-cap" }, "A typical spread")
          ),
          // legend
          e("div", { className: "ab-legend" },
            legend.map(function (it, i) {
              return e("div", { className: "ab-leg-row", key: i },
                e("div", { className: "ab-leg-side" }, it.k),
                e("div", { className: "ab-leg-main" },
                  e("div", { className: "ab-leg-t" }, it.t),
                  e("div", { className: "ab-leg-d" }, it.d)
                )
              );
            })
          )
        ),
        e("div", { className: "ab-c-foot" },
          "Forty-two spreads, ordered by first visit \u2014 followed by a complete index of every ballpark, team, and season."
        )
      )
    );
  }

  window.AboutOptionA = AboutOptionA;
  window.AboutOptionB = AboutOptionB;
  window.AboutOptionC = AboutOptionC;
})();
