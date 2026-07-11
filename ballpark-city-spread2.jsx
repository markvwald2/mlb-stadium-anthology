/* ballpark-city-spread2.jsx — Spread 2 (pages 3–4 of the section / book pp.4–5).
   LEFT: CONCRETE CIRCLES AND CLIMATE CONTROL + THE RETRO-CLASSIC TURN, with
         archival figures (Dodger, Astrodome, Camden) and a pull quote.
   RIGHT: THE BALLPARK BECOMES A DISTRICT + COMPARATIVE ATLAS, the compact
          "Ballpark evolution at a glance" table, and the closing paragraphs. */
(function () {
  const D = window.BallparkCityData;
  const M = window.BallparkMotifs;
  const { CityGrid, Skyline, SectionHead, Figure, AtlasGrid, NoteIcon } = M;

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
              <p key={i} className={"bc-dropcap" + (narrow ? " bc-dropcap-narrow" : "")}>
                <span className="bc-dropcap-letter">{letter}</span>{rest}
              </p>
            );
          }
          return (
            <p key={i}>{p}</p>
          );
        })}
      </div>);

  }

  // "Systems Beneath the Skyline" — secondary atlas-note sidebar
  function SystemsSidebar({ data, x, y, w }) {
    return (
      <div className="bc-region bc-sidebar" style={{ left: x, top: y, width: w }}>
        <div className="bc-sidebar-kicker">{data.kicker}</div>
        <div className="bc-sidebar-title">
          {data.title.map((ln, i) => <div key={i}>{ln}</div>)}
        </div>
        <div className="bc-sidebar-standfirst">{data.standfirst}</div>
        {data.items.map((it, i) =>
        <div key={i} className="bc-sysrow">
            <div className="bc-sysrow-head">
              <span className="bc-sysrow-icon"><NoteIcon kind={it.icon} size={26} color="#9C3A28" /></span>
              <span className="bc-sysrow-label">{it.label}</span>
            </div>
            <div className="bc-sysrow-body" style={{ letterSpacing: "0px" }}>{it.body}</div>
          </div>
        )}
      </div>);

  }

  function Spread2() {
    const Q = D.QUOTES;
    return (
      <div className="bc-spread" data-screen-label="Spread 2 — pages 3–4 (Concrete Circles · Retro-Classic Turn · The Ballpark Becomes a District · Comparative Atlas)">

        {/* ===== background motifs ===== */}
        {/* faint parking-lot / parcel grid behind the multipurpose-era left page */}
        <CityGrid x={20} y={120} w={900} h={760} opacity={0.05} spacing={66} color="#8A8276" />
        {/* faint skyline along the bottom of the right (district / conclusion) page */}
        <Skyline x={1300} y={946} w={1240} h={128} opacity={0.075} color="#20384C" />

        <div className="bc-fold-shade"></div>

        {/* ============================ LEFT PAGE ============================ */}
        {/* outer figure strip */}
        <Figure fig={D.FIGS.dodger} x={45} y={104} w={277} imgH={159} />
        <Figure fig={D.FIGS.astrodome} x={45} y={392} w={300} imgH={172} />
        <Figure fig={D.FIGS.camden} x={45} y={680} w={300} imgH={172} />

        <SectionHead label="CONCRETE CIRCLES AND CLIMATE CONTROL" num="III" width={826}
        style={{ position: "absolute", left: 380, top: 58, fontSize: 21 }} />

        <Body paras={D.CONCRETE} x={380} y={104} w={826} h={374}
        cols={3} gap={30} size={12.8} lh={1.45} dropcap />

        <SectionHead label="THE RETRO-CLASSIC TURN" num="IV" width={826}
        style={{ position: "absolute", left: 380, top: 510, fontSize: 21 }} />

        <Body paras={D.RETRO} x={380} y={556} w={826} h={308}
        cols={3} gap={30} size={13.1} lh={1.45} dropcap />

        {/* retro pull quote — spans under the left-page text */}
        <div className="bc-region" style={{ left: 380, top: 898, width: 826 }}>
          <span style={{ display: "block", width: 60, height: 0, borderTop: "2px solid var(--brick)", opacity: 0.6, marginBottom: 16 }}></span>
          <div className="bc-pullquote" style={{ fontSize: 32 }}>
            <span className="mark" style={{ fontSize: 64, position: "absolute", left: -8, top: -34 }}>&#8220;</span>
            {Q.retro}
          </div>
        </div>

        {/* ============================ RIGHT PAGE =========================== */}
        <SectionHead label="THE BALLPARK BECOMES A DISTRICT" num="V" width={795}
        style={{ position: "absolute", left: 1340, top: 56, fontSize: 21 }} />

        <Body paras={D.DISTRICT} x={1340} y={102} w={795} h={472}
        cols={3} gap={26} size={13} lh={1.45} dropcap />

        {/* secondary companion rail — supporting systems, clearly subordinate */}
        <SystemsSidebar data={D.SYSTEMS} x={2167} y={72} w={338} />

        {/* compact "evolution at a glance" comparison (left column, under the essay) */}
        <div className="bc-region" style={{ left: 1340, top: 588, width: 795 }}>
          <div className="bc-sidebar-kicker" style={{ marginBottom: 7 }}>BALLPARK EVOLUTION AT A GLANCE</div>
          <span style={{ display: "block", width: "100%", height: 0, borderTop: "2px solid var(--ink)" }}></span>
        </div>
        <AtlasGrid atlas={D.ATLAS} x={1340} y={620} w={795} dense
        template="1.8fr 2fr 2.15fr 2fr" pad="1px 14px 1px 0" minH={20} />

        {/* closing paragraphs — full width beneath both columns */}
        <div className="bc-region" style={{ left: 1340, top: 818, width: 1165, height: 0, borderTop: "1px solid var(--rule)" }}></div>
        <Body paras={D.CONCLUSION} x={1340} y={830} w={1165} h={184}
        cols={4} gap={30} size={13} lh={1.45} />

        {/* end mark */}
        <div className="bc-region" style={{ left: 1340, top: 1022, width: 1165, textAlign: "center" }}>
          <span style={{ display: "inline-block", width: 9, height: 9, background: "var(--brick)", transform: "rotate(45deg)" }}></span>
        </div>

        {/* (running heads removed for a clean four-page section) */}
      </div>);

  }

  window.BallparkSpread2 = Spread2;
})();