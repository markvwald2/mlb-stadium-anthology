/* ballpark-city-spread1.jsx — Spread 1 (pages 1–2).
   LEFT: title block, "the long arc" era timeline rail, EXECUTIVE SUMMARY.
   RIGHT: WOODEN PARKS AND THE SEARCH FOR PERMANENCE + THE JEWEL BOX IDEAL,
          with archival figures and a pull quote. */
(function () {
  const D = window.BallparkCityData;
  const M = window.BallparkMotifs;
  const { CityGrid, Skyline, SectionHead, Figure, PullQuote, TimelineRail } = M;

  // body block: paragraphs in N balanced columns; first para gets a drop cap
  function Body({ paras, x, y, w, h, cols, gap, size, lh, dropcap, fill }) {
    return (
      <div className="bc-body bc-cols" data-fit
      style={{
        position: "absolute", left: x, top: y, width: w, height: h,
        columnCount: cols, columnGap: gap, columnFill: fill || "balance",
        fontSize: size + "px", lineHeight: lh
      }}>
        {paras.map((p, i) => {
          const isCap = dropcap && i === 0;
          if (isCap) {
            const letter = p.charAt(0);
            const rest = p.slice(1);
            const narrow = /[IJ]/.test(letter);
            return (
              <p key={i} className={"bc-dropcap" + (narrow ? " bc-dropcap-narrow" : "")} style={{ letterSpacing: "0px" }}>
                <span className="bc-dropcap-letter">{letter}</span>{rest}
              </p>);
          }
          return (
            <p key={i} style={{ letterSpacing: "0px" }}>{p}</p>);

        })}
      </div>);

  }

  function Spread1() {
    return (
      <div className="bc-spread" data-screen-label="Spread 1 — pages 1–2 (Title · Executive Summary · Wooden Parks · Jewel Box)">

        {/* ===== background motifs ===== */}
        <CityGrid x={150} y={2} w={1140} h={452} opacity={0.06} spacing={60} color="#20384C" />
        <Skyline x={150} y={946} w={1130} h={128} opacity={0.07} color="#20384C" />

        {/* facing-page gutter */}
        <div className="bc-fold-shade"></div>

        {/* ============================ LEFT PAGE ============================ */}
        <TimelineRail items={D.TIMELINE} x={45} y={54} h={880} gap={15}
        headLabel={["THE LONG ARC", "OF BALLPARK", "EVOLUTION"]} />

        <div className="bc-region bc-chapter-kicker" style={{ left: 230, top: 70, width: 964 }}>
          {D.META.chapter}
        </div>

        <h1 className="bc-title bc-region" style={{ left: 226, top: 96, width: 968, fontSize: 146 }}>
          <span className="l1">{D.META.title[0]}</span>
          <span className="l2">{D.META.title[1]}</span>
        </h1>

        {/* rule + diamond under title */}
        <div className="bc-region" style={{ left: 230, top: 392, width: 964, display: "flex", alignItems: "center", gap: 0 }}>
          <span style={{ flex: 1, height: 0, borderTop: "1.5px solid var(--rule-2)" }}></span>
          <span style={{ width: 9, height: 9, background: "var(--brick)", transform: "rotate(45deg)", margin: "0 0 0 0" }}></span>
          <span style={{ flex: 1, height: 0, borderTop: "1.5px solid var(--rule-2)" }}></span>
        </div>

        <SectionHead label={"BASEBALL\u2019S BUILT ENVIRONMENT"} num={"\u00a7"} width={964}
        style={{ position: "absolute", left: 230, top: 418, fontSize: 21 }} />

        <Body paras={D.EXEC} x={230} y={462} w={964} h={486}
        cols={3} gap={34} size={14.5} lh={1.5} dropcap fill="balance" />

        {/* ============================ RIGHT PAGE =========================== */}
        <SectionHead label="WOODEN PARKS AND THE SEARCH FOR PERMANENCE" num="I" width={840}
        style={{ position: "absolute", left: 1339, top: 58, fontSize: 21 }} />

        <Body paras={D.WOODEN} x={1339} y={104} w={840} h={366}
        cols={3} gap={28} size={13} lh={1.45} dropcap />

        <SectionHead label="THE JEWEL BOX IDEAL" num="II" width={840}
        style={{ position: "absolute", left: 1339, top: 486, fontSize: 21 }} />

        <Body paras={D.JEWEL} x={1339} y={528} w={840} h={301}
        cols={3} gap={28} size={12.9} lh={1.45} dropcap />

        {/* ---- right-hand figure strip ---- */}
        <Figure fig={D.FIGS.bakerBowl} x={2205} y={104} w={300} imgH={152} />
        <Figure fig={D.FIGS.poloGrounds} x={2205} y={362} w={300} imgH={152} />

        {/* pull quote sits in the figure strip */}
        <div className="bc-region" style={{ left: 2205, top: 614, width: 300 }}>
          <span style={{ display: "block", width: 44, height: 0, borderTop: "2px solid var(--brick)", opacity: 0.6, marginBottom: 14 }}></span>
          <div className="bc-pullquote" style={{ fontSize: 19.5 }}>
            <span className="mark" style={{ fontSize: 40, position: "absolute", left: -4, top: -20 }}>&#8220;</span>
            {D.QUOTES.wooden}
          </div>
        </div>

        {/* bottom figure row — four equal figures across the foot of the page */}
        <Figure fig={D.FIGS.fenway} x={1339} y={834} w={264} imgH={132} />
        <Figure fig={D.FIGS.wrigley} x={1623} y={834} w={264} imgH={132} />
        <Figure fig={D.FIGS.southEnd} x={1907} y={834} w={264} imgH={132} />
        <Figure fig={D.FIGS.yankee} x={2191} y={834} w={264} imgH={132} />

        {/* (running heads removed — bottom band now carries the figure row) */}
      </div>);

  }

  window.BallparkSpread1 = Spread1;
})();