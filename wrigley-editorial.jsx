/* wrigley-editorial.jsx — Wrigley Field "Editorial Atlas" spread (option B).
   Reads window.WRIGLEY. Serif-forward archival treatment inspired by a classic
   stadium-monograph plate: full-bleed aerial left page; right page with a four-up
   photo strip, a blue/serif metadata ribbon, a specifications table, a field-
   dimensions diagram, historical context behind a giant 1914 watermark, and a
   rust scorecard band. Every populated WRIGLEY value is routed here exactly once.
   Exposes window.WrigleyEditorial. */
(function () {
  const D = window.WRIGLEY;

  /* Wrigley marquee wordmark inlined as VECTOR (not <img>). An <img>-SVG gets
     rasterized by Chrome's print pipeline and, because the whole page is under
     transform: scale(.96), the rasterizer splits it at a tile boundary and
     leaves a hairline seam down the center of the sign in the PDF. Inline SVG
     stays true vector through print — no raster, no seam. */
  const WRIGLEY_MARK_INNER = '<defs><linearGradient id="wf-field" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CC1531"/><stop offset="1" stop-color="#B00E28"/></linearGradient></defs><rect x="28" y="223" width="568" height="190" rx="12" fill="url(#wf-field)" stroke="#F1E7D2" stroke-width="3.5"/><rect x="35.5" y="230.5" width="553" height="175" rx="8" fill="none" stroke="#B00E28" stroke-width="7"/><rect x="40" y="235" width="544" height="166" rx="6" fill="none" stroke="#F1E7D2" stroke-opacity="0.85" stroke-width="1.8"/><g fill="#ffffff"><path d="m431 351.6c-0.4-8.9-9.5-12.1-18-12.1h-39.3-110.2-39.3c-8.5 0-17.6 3.2-18 12.1h-36.9c-8.7 0-18 3.3-18 12.7 0 3.5 1 6.3 3 8.3 2 2 4.9 3 8.3 3 3 0 8.7-1.7 9.8-6.6h91.1 110.1 91.1c1.1 4.9 6.9 6.6 9.8 6.6 3.4 0 6.3-1 8.3-3 2-2 3-4.8 3-8.3 0-9.3-9.3-12.7-18-12.7zm-206.8-8.4h39.3 110.1 39.4c3.4 0 14.3 0.6 14.3 8.9 0 2.5-0.6 4.4-1.9 5.6-1.7 1.7-4.2 1.9-5.6 1.9-0.6 0-6.4-0.3-6.4-4.6 0-0.1 0.1-0.2 0.2-0.3 0 0 0.9 1.8 2.9 1.8 1.8 0 3.3-1.5 3.3-3.3 0-1.6-1-3-2.6-3.4-1.4-0.3-2.7-0.2-4 0.4-0.8 0.3-1.4 0.8-1.9 1.4h-37.5-110.3-37.5c-0.5-0.6-1.2-1.1-1.9-1.4-1.4-0.6-2.6-0.7-4-0.4-1.6 0.4-2.6 1.8-2.6 3.4 0 1.8 1.5 3.3 3.3 3.3 2 0 2.9-1.8 2.9-1.8 0.1 0.1 0.2 0.2 0.2 0.3 0 4.3-5.8 4.6-6.4 4.6-1.4 0-3.9-0.2-5.6-1.9-1.3-1.3-1.9-3.2-1.9-5.6-0.1-8.2 10.8-8.9 14.2-8.9zm256.1 26.6c-1.7 1.7-4.2 1.9-5.6 1.9-0.6 0-6.4-0.3-6.4-4.6 0-0.1 0.1-0.2 0.2-0.3 0 0 0.9 1.8 2.9 1.8 1.8 0 3.3-1.5 3.3-3.3 0-1.6-1-3-2.6-3.4-1.4-0.3-2.7-0.2-4 0.4-1.4 0.6-2.4 1.7-3 2.9h-91.4-110.2-91.4c-0.6-1.2-1.6-2.3-3-2.9-1.4-0.6-2.6-0.7-4-0.4-1.6 0.4-2.6 1.8-2.6 3.4 0 1.8 1.5 3.3 3.3 3.3 2-0.1 2.9-1.8 2.9-1.8 0.1 0.1 0.2 0.2 0.2 0.3 0 4.3-5.8 4.6-6.4 4.6-1.4 0-3.9-0.2-5.6-1.9-1.3-1.3-1.9-3.2-1.9-5.6 0-8.3 10.9-8.9 14.3-8.9h7.6 29.7q0.6 3.15 2.7 5.1c2 2 4.9 3 8.3 3 3 0 8.7-1.7 9.8-6.6 0 0 0.1-0.7 0.1-1.6h36.1 110.1 36.1c0 0.9 0.1 1.6 0.1 1.6 1.1 4.9 6.9 6.6 9.8 6.6 3.4 0 6.3-1 8.3-3 1.3-1.3 2.2-3.1 2.7-5.1h29.7 7.6c3.3 0 14.3 0.6 14.3 8.9-0.1 2.5-0.8 4.4-2 5.6z"/><path d="m553.8 342.4h-1.2v-1h3.6v1h-1.3v6.6h-1.1z"/><path d="m556.9 341.4h1l1.4 4 1.4-4h1.1v7.6h-1.1v-4.7l-1.1 3.3h-0.6l-1-3.3v4.7h-1.1z"/><path d="m118.8 335.4c-3 0.8-5.9 1.6-8.9 2.4-2.3-17.3-4.6-35.1-6.9-53.3-0.1 0-0.1 0-0.2 0-2.5 18.7-5 37.8-7.5 57.4-3 0.9-5.9 1.8-8.8 2.7-3.2-29-6.4-58.9-9.7-89.9q5.1 0 10.2 0c1.5 19 3.1 37.7 4.6 56.2h0.2c2.5-19.2 5.1-37.9 7.7-56.2 2.4 0 4.9 0 7.3 0 2.5 18.3 4.9 36.1 7.3 53.4 0.1 0 0.1 0 0.2 0q2.55-27.15 5.1-53.4 5.1 0 10.2 0c-3.6 25.9-7.2 52.9-10.8 80.7z"/><path d="m139.7 254.4c5.1 0 10.3 0 15.4 0 11.4 0.1 16.8 6.9 16.6 20.3-0.1 8-2.4 13.9-8.6 18.2 3.3 10.4 6.5 20.5 9.8 30.4-3.4 0.6-6.8 1.3-10.1 2-2.8-9.5-5.6-19.2-8.4-29.2-1.9 0.2-3.8 0.5-5.7 0.7l-0.5 31.5c-3.2 0.7-6.4 1.4-9.5 2.2 0.4-25.4 0.7-50.7 1-76.1zm9.2 33c1.8-0.2 3.6-0.4 5.4-0.5 6.7-0.6 7.8-4.7 7.9-11.8 0.1-7.2-1-11-8-10.8-1.7 0.1-3.3 0.1-5 0.2z"/><path d="m184.1 254.4q4.8 0 9.6 0c-0.4 21.8-0.7 43.7-1.1 65.5-3.2 0.5-6.4 1-9.6 1.6 0.4-22.4 0.8-44.8 1.1-67.1z"/><path d="m204.9 269.4c0.2-10.5 8.5-15.6 16.3-15.6 7.8 0 16 4.9 15.9 14.6q0 1.5 0 3-4.8 0.15-9.6 0.3c0-1 0-2.1 0-3.1 0.1-4.2-2.9-6.1-6.4-6.1-3.5 0.1-6.5 2.1-6.6 6.4-0.2 11-0.4 22-0.5 33-0.1 4.3 2.9 6 6.4 5.6 3.5-0.4 6.6-2.6 6.6-6.8 0.1-3.8 0.1-7.6 0.2-11.5-2.6 0.2-5.1 0.3-7.7 0.5 0-2.6 0.1-5.2 0.1-7.8 5.8-0.3 11.5-0.6 17.3-0.9-0.1 6.3-0.2 12.6-0.3 18.8-0.1 9.7-8.6 15.4-16.4 16.5-7.9 1-16.1-3-15.9-13.4 0.2-11 0.4-22.3 0.6-33.5z"/><path d="m247.6 254.3q4.8 0 9.6 0-0.3 24.9-0.6 49.8c6.4-0.4 12.8-0.8 19.2-1 0 2.7 0 5.4-0.1 8.2-9.6 0.5-19.3 1.1-28.9 2 0.3-19.7 0.6-39.4 0.8-59z"/><path d="m284.8 254.3c9.5 0 19.1 0 28.6 0q0 3.75 0 7.5c-6.3 0-12.7 0-19 0 0 5.5 0 11-0.1 16.5 5.5-0.1 11.1-0.1 16.6-0.1v7.5c-5.6 0-11.1 0.1-16.7 0.1 0 5.5 0 11-0.1 16.5 6.4-0.1 12.8-0.2 19.2-0.2 0 2.7 0 5.3 0 8-9.6 0-19.3 0.2-28.9 0.6 0.2-18.7 0.3-37.6 0.4-56.4z"/><path d="m334.9 286.7c-4.5-10.9-8.9-21.7-13.3-32.5q5.1 0 10.2 0c2.6 7.4 5.2 14.9 7.8 22.4 0.1 0 0.1 0 0.2 0 2.5-7.4 5.1-14.9 7.6-22.4q5.1 0 10.2 0c-4.3 11-8.6 21.8-13 32.6 0.1 8 0.1 15.9 0.2 23.9-3.2-0.1-6.5-0.2-9.7-0.3z"/><path d="m385.5 254.3c9.5 0 19.1 0 28.6 0 0 2.8 0.1 5.6 0.1 8.4-6.3-0.1-12.7-0.2-19-0.3q0.15 9.15 0.3 18.3c5.5 0.3 11.1 0.5 16.6 0.9 0 2.8 0.1 5.6 0.1 8.4-5.5-0.4-11.1-0.8-16.6-1.1 0.1 8.6 0.2 17.1 0.4 25.7-3.2-0.3-6.5-0.7-9.7-1z"/><path d="m424.3 254.3q4.8 0 9.6 0l1.1 65.3c-3.2-0.5-6.4-1-9.6-1.4-0.4-21.3-0.7-42.6-1.1-63.9z"/><path d="m445.7 254.4c9.5 0 19.1 0 28.6 0 0 3.3 0.1 6.5 0.1 9.8-6.3-0.2-12.7-0.4-19-0.5 0.1 6.7 0.2 13.5 0.3 20.2 5.5 0.4 11 0.9 16.5 1.4l0.1 9.7c-5.5-0.6-11-1.3-16.5-1.8 0.1 6.7 0.2 13.5 0.3 20.2 6.3 1 12.6 2.1 19 3.2 0.1 3.5 0.1 6.9 0.2 10.4-9.5-2-19-3.8-28.5-5.5-0.4-22.3-0.8-44.7-1.1-67.1z"/><path d="m484.4 254.4q4.8 0 9.6 0c0.3 22 0.5 44 0.8 66 6.3 1.3 12.6 2.6 18.8 4.1 0 3.9 0.1 7.8 0.1 11.7-9.4-2.5-18.8-4.8-28.3-6.9-0.3-25-0.7-49.9-1-74.9z"/><path d="m521.5 254.5c4.7 0 9.5 0 14.2 0 10.8-0.1 16.8 8.9 16.8 24.1v43.5c0 17.4-6.2 23.5-17.3 20.1-4.4-1.3-8.7-2.6-13.1-3.8-0.2-27.9-0.4-55.9-0.6-83.9zm10 75c1.5 0.4 2.9 0.7 4.3 1.1 5.3 1.4 7.3-1.6 7.3-9.4 0-14.5-0.1-28.9-0.1-43.4 0-7.1-1.8-11.2-7.4-11.4-1.5-0.1-2.9-0.1-4.4-0.2q0.15 31.65 0.3 63.3z"/><path d="m288.8 353.5c0-17.3 14-31.3 31.3-31.3 17.3 0 31.3 14 31.3 31.3 0 17.3-14 31.3-31.3 31.3-17.3 0-31.3-14-31.3-31.3z"/></g><path fill="#073264" d="m290.8 353.4c0-16.2 13.1-29.2 29.3-29.2 16.2 0 29.2 13.1 29.2 29.2 0 16.2-13.1 29.3-29.2 29.3-16.2 0-29.3-13.1-29.3-29.3zm29.2 21.6c11.9 0 21.6-9.7 21.6-21.6 0-11.9-9.7-21.6-21.6-21.6-11.9 0-21.6 9.7-21.6 21.6 0 12 9.7 21.6 21.6 21.6z"/><g fill="#e5102c"><path d="m329.5 359.5c-2 3.1-5.5 5.2-9.5 5.2-6.2 0-11.3-5.1-11.3-11.3 0-6.2 5.1-11.3 11.3-11.3 4.1 0 7.7 2.2 9.7 5.5l5.6-5.4c-3.5-4.7-9-7.7-15.3-7.7-10.5 0-18.9 8.5-18.9 18.9 0 10.5 8.5 18.9 18.9 18.9 6.2 0 11.7-3 15.1-7.6z"/><path d="m316.7 355.3v-6.9h3.4v7c0 2.5-0.6 3.1-2.6 3.1h-3.5c-1.6 0-2.2-1.1-2.2-3.3v-6.8h3.4v6.9c0 0.9 1.5 0.9 1.5 0z"/><path d="m321.3 358.5v-10h5.4c2 0 2.9 0.5 2.9 2.8 0 1.2-0.2 1.9-0.9 2.2 0.9 0.5 0.9 1.5 0.9 2.4 0 2.2-1 2.6-2.9 2.6z"/></g><path fill="#ffffff" d="m326.3 351.2c0-0.4-0.4-0.4-1.5-0.4v1.4c0.6 0 1.5 0.1 1.5-0.5z"/><path fill="#ffffff" d="m326.3 355.2c-0.2-0.5-0.3-0.4-1.4-0.4v1.4c0.7 0 1.4 0.1 1.4-0.5 0-0.1 0-0.4 0-0.5z"/><path fill="#e5102c" d="m336.4 358.5c1.8 0 2.8-0.5 2.8-2.1 0-0.2 0-2 0-2.3 0-1.2-0.8-1.9-2-1.9h-2.4c-0.7 0-0.5-1-0.5-1.3 0-0.5 1.4-0.6 1.4 0.1v0.5h3.6c0-2.3-0.4-3.1-2.8-3.1-0.5 0-2.5 0-3.2 0-1.5 0-2.3 0.6-2.4 2.3-0.1 1.8 0 1 0 1.6 0 0.6-0.1 2.1 1.9 2.1h2.5c0.7 0 0.6 0.8 0.6 0.8v0.5c0 0.6-1.2 0.6-1.5 0.1-0.2-0.3-0.1-0.8-0.1-0.8h-3.4c0 0.7-0.4 3.3 1.7 3.3h3.8z"/><g fill="#073264"><path d="m335.5 360.2h-0.6v1.6h-0.4v-1.6h-0.5v-0.3h1.6v0.3z"/><path d="m338.1 361.8h-0.4v-1.5l-0.6 1.5h-0.4l-0.5-1.5v1.5h-0.4v-1.9h0.7l0.4 1.3 0.5-1.3h0.7z"/></g>';

  function Slot(props) {
    return React.createElement("image-slot", { id: props.id, placeholder: props.placeholder, shape: props.shape || "rect", src: props.src, fit: props.fit });
  }

  /* line-art weather glyphs */
  function WxGlyph(kind) {
    const c = { width: 30, height: 30, viewBox: "0 0 24 24", fill: "none", stroke: "#5A5347", strokeWidth: 1.1, strokeLinecap: "round", strokeLinejoin: "round", className: "we-wx-ico" };
    if (kind === "temp") return React.createElement("svg", c,
      React.createElement("path", { d: "M10 13.6V5a2 2 0 1 1 4 0v8.6a4 4 0 1 1-4 0z" }),
      React.createElement("path", { d: "M12 13.5v-5" }));
    if (kind === "clear") return React.createElement("svg", c,
      React.createElement("circle", { cx: 12, cy: 12, r: 4 }),
      React.createElement("path", { d: "M12 2.5v2.6M12 18.9v2.6M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2.5 12h2.6M18.9 12h2.6M4.2 19.8l1.8-1.8M18 6l1.8-1.8" }));
    if (kind === "wind") return React.createElement("svg", c,
      React.createElement("path", { d: "M3 8h11a2.5 2.5 0 1 0-2.5-2.5" }),
      React.createElement("path", { d: "M3 16h15a2.5 2.5 0 1 1-2.5 2.5" }),
      React.createElement("path", { d: "M3 12h7" }));
    if (kind === "humidity") return React.createElement("svg", c,
      React.createElement("path", { d: "M12 3.2s5.5 5.9 5.5 9.8a5.5 5.5 0 1 1-11 0C6.5 9.1 12 3.2 12 3.2z" }));
    return null;
  }

  function Spread() {
    const specs = [
      ["Opened", D.opening_day],
      ["First Cubs Game", "April 20, 1916"],
      ["Groundbreaking", D.construction_start],
      ["Renovations", D.renovations],
      ["Capacity", D.capacity_current + " (" + D.capacity_opening + " originally)"],
      ["Surface", D.playing_surface_type + " (" + D.surface + ")"],
      ["Architect", D.architect],
      ["Type", D.stadium_type],
      ["Previous Names", "Weeghman Park (1914\u20131920)\nCubs Park (1920\u20131926)"],
      ["Location Type", D.location_classification],
      ["Preceded By", D.preceded_by]
    ];

    return (
      React.createElement("div", { className: "we-spread", "data-screen-label": "Wrigley Field editorial spread" },

        /* ===================== LEFT PAGE / AERIAL ===================== */
        React.createElement("div", { className: "we-page we-left", "data-screen-label": "Wrigley Field aerial" },
          React.createElement("div", { className: "we-hero-slot" },
            React.createElement(Slot, { id: "wrigley-aerial", src: "images/wrigley/wrigley-field-00-main-PD.jpg", fit: "cover", placeholder: "Drop the Wrigley aerial \u2014 the ballpark embedded in the Chicago street grid, rooftops beyond the outfield" })),
          React.createElement("div", { className: "we-hero-scrim" }),
          React.createElement("div", { className: "we-hero-mast" },
            React.createElement("svg", { className: "wf-logo", viewBox: "22 217 580 196", role: "img", "aria-label": "Wrigley Field", xmlns: "http://www.w3.org/2000/svg", dangerouslySetInnerHTML: { __html: WRIGLEY_MARK_INNER } })),
          React.createElement("div", { className: "we-hero-block" },
            React.createElement("div", { className: "we-hero-loc" }, D.city + ", " + D.state),
            React.createElement("div", { className: "we-hero-rule" }),
            React.createElement("div", { className: "we-hero-stats" },
              React.createElement("div", null, D.years_active.toUpperCase() + "  \u00b7  " + D.league.toUpperCase())),
            React.createElement("div", { className: "we-hero-colophon" },
              D.address + "   \u00b7   " + D.coordinates + "   \u00b7   ELEV. " + D.elevation))
        ),

        /* ===================== RIGHT PAGE ===================== */
        React.createElement("div", { className: "we-page we-right" },
          React.createElement("div", { className: "we-rp" },

            /* --- photo strip --- */
            React.createElement("div", { className: "we-photos" },
              photo("we-p1", "Marquee", "narrow", "images/wrigley/wrigley-field-01.jpg"),
              photo("we-p2", "Ivy Wall", null, "images/wrigley/wrigley-field-02.jpg"),
              photo("we-p3", "Grandstand", null, "images/wrigley/wrigley-field-03.jpg"),
              photo("we-p4", "Skyline", "narrow", "images/wrigley/wrigley-field-04.jpg")),

            /* --- metadata ribbon --- */
            React.createElement("div", { className: "we-ribbon" },
              ribCell("Team", D.team_name),
              ribCell("Division", D.division),
              ribCell("Era", "Jewel Box & Early Concrete"),
              ribCell("Opened", D.opened),
              ribCell("Status", D.status),
              React.createElement("div", { className: "we-rc visitno" },
                React.createElement("div", { className: "k" }, "Ballpark"),
                React.createElement("div", { className: "v" },
                  React.createElement("span", { className: "ord" }, "1st"),
                  React.createElement("span", { className: "of" }, "of 42")))),

            /* --- middle: specs | field | context --- */
            React.createElement("div", { className: "we-middle" },

              React.createElement("div", { className: "we-specs" },
                React.createElement("table", { className: "we-spectable" },
                  React.createElement("tbody", null,
                    specs.map((s, i) => React.createElement("tr", { key: i },
                      React.createElement("th", null, s[0]),
                      React.createElement("td", null, String(s[1]).split("\n").map(function (ln, j, arr) {
                        return React.createElement(React.Fragment, { key: j }, ln, j < arr.length - 1 ? React.createElement("br", null) : null);
                      }))))))),

              React.createElement("div", { className: "we-field" },
                React.createElement("div", { className: "we-modh center" }, "Field Dimensions"),
                React.createElement("div", { className: "we-fd-group" },
                  React.createElement("div", { className: "we-streets" },
                    React.createElement("div", { className: "we-st we-st-top" }, "Waveland"),
                    React.createElement("div", { className: "we-st we-st-right" }, "Sheffield"),
                    React.createElement("div", { className: "we-st we-st-bottom" }, "Addison"),
                    React.createElement("div", { className: "we-st we-st-left" }, "Clark"),
                    React.createElement("div", { className: "we-fd-wrap" },
                      window.WrigleyProtractor ? React.createElement(window.WrigleyProtractor, {
                        lf: D.left_field_distance, cf: D.center_field_distance, rf: D.right_field_distance,
                        orientation: D.orientation, degrees: D.orientation_degrees, accent: "#1C3D72"
                      }) : null)),
                  React.createElement("div", { className: "we-fd-nick" }, "\u201CThe Friendly Confines\u201D")),
                React.createElement("div", { className: "we-fd-photo" },
                  React.createElement(Slot, { id: "wrigley-ivy-400", src: "images/wrigley/wrigley-field-05.jpg", fit: "cover", placeholder: "Ivy wall & 400 marker" }))),

              React.createElement("div", { className: "we-context" },
                React.createElement("div", { className: "we-watermark" }, "1914"),
                React.createElement("div", { className: "we-modh blue" }, "Historical Context"),
                React.createElement("div", { className: "we-ctx" },
                  D.stadium_context.map((p, i) => React.createElement("p", { key: i }, p))))
            ),

            /* --- construction & finance strip --- */
            React.createElement("div", { className: "we-finance" },
              finCell("Architectural Style", D.architectural_style),
              finCell("Facade Material", D.facade_material),
              React.createElement("div", { className: "we-fc cost" },
                React.createElement("div", { className: "k" }, "Stadium Cost"),
                React.createElement("div", { className: "v" },
                  React.createElement("span", { className: "big" }, D.stadium_cost),
                  React.createElement("span", { className: "adj" }, D.stadium_cost_adjusted + " adj."))),
              finCell("Financing Method", D.financing_method)),

            /* --- visit information band --- */
            React.createElement("div", { className: "we-visit" },
              React.createElement("div", { className: "we-vtab" },
                React.createElement("svg", { className: "we-vtab-flag", viewBox: "0 0 104 96", role: "img", "aria-label": "Cubs L flag" },
                  React.createElement("circle", { cx: 22, cy: 8, r: 3.2, fill: "#F1ECDF" }),
                  React.createElement("line", { x1: 22, y1: 8, x2: 22, y2: 90, stroke: "#F1ECDF", strokeWidth: 3, strokeLinecap: "round" }),
                  React.createElement("rect", { x: 22, y: 14, width: 72, height: 50, fill: "#2A5BC4", stroke: "#EFE7D6", strokeWidth: 1.5 }),
                  React.createElement("path", { d: "M46 22 L56 22 L56 50 L69 50 L69 57 L46 57 Z", fill: "#F7F2E8" }))),

              React.createElement("div", { className: "we-vmain" },

                /* scorecard */
                React.createElement("div", { className: "we-score" },
                  React.createElement("div", { className: "we-score-top" },
                    React.createElement("span", { className: "tag" }, D.trip_name + " Trip"),
                    React.createElement("span", { className: "date" }, D.featured_visit_day + " \u00b7 " + D.featured_visit_date.toUpperCase())),
                  React.createElement("div", { className: "we-score-row" },
                    React.createElement("span", { className: "tm away" }, D.away_team.split(" ").pop()),
                    React.createElement("span", { className: "box" }, D.box.away.r)),
                  React.createElement("div", { className: "we-score-row" },
                    React.createElement("span", { className: "tm home" }, D.home_team.split(" ").pop()),
                    React.createElement("span", { className: "box" }, D.box.home.r)),
                  React.createElement("div", { className: "we-venue" }, "Wrigley Field \u00b7 " + D.city + ", " + D.state),
                  LineScore(D.box)),

                /* stats */
                React.createElement("div", { className: "we-stats" },
                  statRow("Attendance", D.attendance),
                  statRow("Start Time", D.start_time + " " + D.time_zone),
                  statRow("Game Time", D.game_duration),
                  React.createElement("div", { className: "we-stat block" },
                    React.createElement("div", { className: "k" }, "Pitching Matchup"),
                    React.createElement("div", { className: "v" }, D.away_starting_pitcher + " (" + D.away_team_abbreviation + ")"),
                    React.createElement("div", { className: "v em" }, "vs."),
                    React.createElement("div", { className: "v" }, D.home_starting_pitcher + " (" + D.home_team_abbreviation + ")")),
                  React.createElement("div", { className: "we-stat block" },
                    React.createElement("div", { className: "k" }, "Decision"),
                    React.createElement("div", { className: "v" }, React.createElement("b", null, "W:"), " " + D.winning_pitcher + " (" + D.away_team_abbreviation + ")"),
                    React.createElement("div", { className: "v" }, React.createElement("b", null, "L:"), " " + D.losing_pitcher + " (" + D.home_team_abbreviation + ")"))),

                /* weather + visit history */
                React.createElement("div", { className: "we-wxn" },
                  React.createElement("div", { className: "we-wx-head" }, React.createElement("span", null, "Weather")),
                  React.createElement("div", { className: "we-wx-row" },
                    wxItem("temp", D.temperature, "Temperature"),
                    wxItem("clear", D.conditions, "Conditions"),
                    wxItem("wind", D.wind, "Wind"),
                    wxItem("humidity", D.humidity, "Humidity")),
                  VisitLog())
              ))
          )
        )
      )
    );
  }

  /* ---------- helpers ---------- */
  function photo(id, label, mod, src) {
    return React.createElement("div", { className: "we-pcard " + (mod || "") },
      React.createElement(Slot, { id: id, placeholder: label, src: src, fit: "cover" }),
      React.createElement("div", { className: "we-pcap" }, label));
  }
  function ribCell(k, v) {
    return React.createElement("div", { className: "we-rc" },
      React.createElement("div", { className: "k" }, k),
      React.createElement("div", { className: "v" }, v));
  }
  function ribCellLogo(k, v, src, alt) {
    return React.createElement("div", { className: "we-rc logo" },
      React.createElement("img", { className: "nl-logo", src: src, alt: alt }),
      React.createElement("div", { className: "k" }, k),
      React.createElement("div", { className: "v" }, v));
  }
  function VisitLog() {
    const years = D.visit_log || [];
    const span = years.length ? years[0].year + "\u2013" + years[years.length - 1].year : "";
    return React.createElement("div", { className: "we-vlog" },
      React.createElement("div", { className: "we-vlog-head" },
        React.createElement("span", { className: "lab" }, "Visit History"),
        React.createElement("span", { className: "sub" }, "Multiple visits \u00b7 " + span)),
      React.createElement("div", { className: "we-vlog-list" },
      years.map(function (y) {
        return React.createElement("div", { className: "we-vlog-year", key: y.year },
          React.createElement("div", { className: "yr" }, y.year),
          React.createElement("div", { className: "ev" },
            y.games.map(function (g, i) {
              return React.createElement("div", { className: "evrow" + (g.featured ? " feat" : ""), key: i },
                React.createElement("span", { className: "d" }, g.date),
                g.opponent ? React.createElement("span", { className: "opp" }, "vs " + g.opponent) : null,
                g.note ? React.createElement("span", { className: "n" }, g.note) : null);
            })));
      })));
  }
  function finCell(k, v) {
    return React.createElement("div", { className: "we-fc" },
      React.createElement("div", { className: "k" }, k),
      React.createElement("div", { className: "v" }, v));
  }
  function statRow(k, v) {
    return React.createElement("div", { className: "we-stat" },
      React.createElement("span", { className: "k" }, k),
      React.createElement("span", { className: "v" }, v));
  }
  function wxItem(kind, val, label) {
    return React.createElement("div", { className: "we-wx-item" },
      WxGlyph(kind),
      React.createElement("div", { className: "we-wx-val" }, val),
      React.createElement("div", { className: "we-wx-lab" }, label));
  }
  function LineScore(box) {
    const heads = []; for (let i = 1; i <= box.innings; i++) heads.push(i);
    function row(t, away) {
      return React.createElement("tr", { className: away ? "away" : "home" },
        React.createElement("td", { className: "tm" }, t.abbr),
        t.byInning.map((n, i) => React.createElement("td", { key: i }, n)),
        React.createElement("td", { className: "rhe sep" }, t.r),
        React.createElement("td", { className: "rhe" }, t.h),
        React.createElement("td", { className: "rhe" }, t.e));
    }
    return React.createElement("table", { className: "we-line" },
      React.createElement("thead", null,
        React.createElement("tr", null,
          React.createElement("th", { className: "tm" }, ""),
          heads.map((n) => React.createElement("th", { key: n }, n)),
          React.createElement("th", { className: "sep" }, "R"),
          React.createElement("th", null, "H"),
          React.createElement("th", null, "E"))),
      React.createElement("tbody", null,
        row(box.away, true),
        row(box.home, false)));
  }

  window.WrigleyEditorial = Spread;
})();
