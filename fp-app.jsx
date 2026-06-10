/* fp-app.jsx — lays the ten field-plan studies on a design canvas.
   Each study renders into a cream "plate" card in the Royals system. */
(function () {
  const e = React.createElement;
  const FP = window.FP;
  const A = window.FPVariantsA, B = window.FPVariantsB;

  // sample park: asymmetric distances + a NE 46° turn (Royals-era orientation)
  const SAMPLE = { lf: "347", cf: "410", rf: "330", orientation: "NE", deg: 46 };

  const STUDIES = [
    { ix: "01", title: "Bearing Compass", blurb: "Rotated field with a north reference, swept-angle arc, and a degree chip.", C: A.V1 },
    { ix: "02", title: "Compass Rose", blurb: "Field seated in a graduated rose; a gold needle marks the field axis.", C: A.V2 },
    { ix: "03", title: "Protractor", blurb: "A protractor scale reads the axis bearing directly off true north.", C: A.V3 },
    { ix: "04", title: "Blueprint", blurb: "Drafting style \u2014 dimensioned distances, north arrow, bearing callout.", C: A.V4, dark: true },
    { ix: "05", title: "Compass Dial", blurb: "Upright field for max legibility; a corner dial carries the rotation.", C: A.V5 },
    { ix: "06", title: "Radial Spokes", blurb: "Distances as measured rays from home; a wedge shows the turn from north.", C: B.V6 },
    { ix: "07", title: "Azimuth Dial", blurb: "Numeric azimuth ring with a filled bearing band across 0\u2013360\u00b0.", C: B.V7 },
    { ix: "08", title: "Stat Card", blurb: "Infographic split \u2014 a distance ledger beside a bearing donut gauge.", C: B.V8 },
    { ix: "09", title: "Surveyor Grid", blurb: "Field on a coordinate grid with a corner north arrow and BRG caption.", C: B.V9 },
    { ix: "10", title: "Minimal Line", blurb: "Hairline plan, leader-tick distances, one quiet bearing arc.", C: B.V10 }
  ];

  function Plate(props) {
    const s = props.study;
    return e("div", { style: {
      width: "100%", height: "100%", background: FP.paper,
      display: "flex", flexDirection: "column", fontFamily: "'Spectral', Georgia, serif"
    } },
      // header
      e("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "16px 18px 12px", borderBottom: "1.5px solid " + FP.royal } },
        e("span", { style: { fontFamily: "'Space Mono', monospace", fontSize: "12px", fontWeight: 700, color: "#fff", background: FP.royal, padding: "2px 7px", lineHeight: 1 } }, s.ix),
        e("span", { style: { fontFamily: "'Oswald', sans-serif", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".14em", fontSize: "18px", color: FP.ink } }, s.title),
        e("span", { style: { flex: 1, height: 3, background: "repeating-linear-gradient(90deg, " + FP.gold + " 0 22px, transparent 22px 28px)" } })
      ),
      // diagram
      e("div", { style: { padding: "14px 18px 6px", background: s.dark ? FP.paper : "transparent" } },
        e(s.C, SAMPLE)
      ),
      // caption
      e("div", { style: { marginTop: "auto", padding: "10px 18px 18px", borderTop: "1px solid " + FP.rule, display: "flex", gap: 12, alignItems: "baseline" } },
        e("span", { style: { fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: ".12em", color: FP.gold, textTransform: "uppercase", whiteSpace: "nowrap" } }, "Plate \u00b7 " + s.ix),
        e("p", { style: { margin: 0, fontFamily: "'Spectral', serif", fontStyle: "italic", fontSize: "13.5px", lineHeight: 1.4, color: FP.ink2, textWrap: "pretty" } }, s.blurb)
      )
    );
  }

  function App() {
    return e(window.DesignCanvas, null,
      e(window.DCSection, {
        id: "field-plans", title: "Field Plan \u2014 Ten Studies",
        subtitle: "Sample park \u00b7 LF 347 \u00b7 CF 410 \u00b7 RF 330 ft \u00b7 oriented NE (46\u00b0). Each study draws the same simple ballpark; they differ in how distances and the field's rotation are annotated."
      },
        STUDIES.map((s) =>
          e(window.DCArtboard, { key: s.ix, id: "v" + s.ix, label: s.ix + " \u00b7 " + s.title, width: 384, height: 500 },
            e(Plate, { study: s })
          )
        )
      )
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(e(App));
})();
