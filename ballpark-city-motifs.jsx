/* ballpark-city-motifs.jsx — shared visual furniture for the editorial essay.
   Low-contrast background motifs (city grid, skyline, parcel field), simple
   geometric era icons, image-slot figures with captions, section heads,
   pull quotes, the era timeline rail, the comparative-atlas grid, and the
   forces tag cloud. All exported to window for the two spread files. */
(function () {
  const C = {
    ink: "#221E18", ink2: "#514A3F", ink3: "#897F6E",
    navy: "#20384C", brick: "#9C3A28", rule: "#C8BA9C", rule2: "#AF9F7F",
    paperLo: "#E3D8C0"
  };

  // ── faint orthogonal street-grid (decorative background) ─────────────────
  function CityGrid(props) {
    const { x = 0, y = 0, w = 900, h = 700, opacity = 0.07, spacing = 58,
      color = C.navy, rotate = 0, seed = 1 } = props;
    const lines = [];
    // verticals (avenues) — a couple are doubled to suggest boulevards
    let i = 0;
    for (let gx = 0; gx <= w; gx += spacing) {
      const major = i % 4 === 0;
      lines.push(<line key={"v" + gx} x1={gx} y1={-20} x2={gx} y2={h + 20}
      stroke={color} strokeWidth={major ? 2 : 1} />);
      i++;
    }
    let j = 0;
    for (let gy = 0; gy <= h; gy += spacing) {
      const major = j % 4 === 0;
      lines.push(<line key={"h" + gy} x1={-20} y1={gy} x2={w + 20} y2={gy}
      stroke={color} strokeWidth={major ? 2 : 1} />);
      j++;
    }
    // a single diagonal "rail/diagonal avenue" for life
    lines.push(<line key="diag" x1={-20} y1={h * 0.62} x2={w + 20} y2={h * 0.14}
    stroke={color} strokeWidth="2" />);
    return (
      <svg className="bc-region" style={{ left: x, top: y, pointerEvents: "none" }}
      width={w} height={h} viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none" aria-hidden="true">
        <g opacity={opacity} transform={rotate ? `rotate(${rotate} ${w / 2} ${h / 2})` : undefined}>
          {lines}
        </g>
      </svg>);

  }

  // ── faint skyline silhouette (row of buildings) ──────────────────────────
  function Skyline(props) {
    const { x = 0, y = 0, w = 1200, h = 150, opacity = 0.1, color = C.navy } = props;
    // deterministic building heights — varied but stable
    const heights = [0.42, 0.66, 0.55, 0.84, 0.7, 0.5, 0.93, 0.62, 0.74, 0.46,
    0.6, 0.8, 0.52, 0.7, 0.58, 0.88, 0.64, 0.5, 0.76, 0.6, 0.44, 0.7, 0.82, 0.55,
    0.68, 0.5, 0.9, 0.6, 0.72, 0.48, 0.64, 0.78, 0.54, 0.7, 0.6];
    const widths = [34, 26, 40, 22, 30, 44, 24, 36, 28, 38, 30, 22, 42, 26, 34, 20,
    40, 30, 24, 36, 44, 28, 22, 38, 30, 34, 24, 42, 26, 36, 30, 22, 40, 28, 34];
    const rects = [];
    let cx = 0,k = 0;
    while (cx < w && k < heights.length) {
      const bw = widths[k % widths.length];
      const bh = h * heights[k % heights.length];
      rects.push(<rect key={k} x={cx} y={h - bh} width={bw - 3} height={bh} />);
      // occasional rooftop tank / setback detail
      if (k % 5 === 2) rects.push(<rect key={"t" + k} x={cx + bw * 0.3} y={h - bh - 8} width={8} height={8} />);
      cx += bw;
      k++;
    }
    return (
      <svg className="bc-region" style={{ left: x, top: y, pointerEvents: "none" }}
      width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
        <g opacity={opacity} fill={color}>{rects}</g>
      </svg>);

  }

  // ── simple geometric era icons (28 x 24) ─────────────────────────────────
  function EraIcon({ kind, size = 30, color = C.ink }) {
    const common = { width: size, height: size * (24 / 30), viewBox: "0 0 30 24" };
    const s = { stroke: color, strokeWidth: 1.6, fill: "none", strokeLinejoin: "round", strokeLinecap: "round" };
    let body = null;
    if (kind === "wooden") {
      // timber grandstand: low trapezoid roof + posts
      body = <g {...s}>
        <path d="M3 19 L7 9 L23 9 L27 19 Z" />
        <line x1="7" y1="9" x2="23" y2="9" />
        <line x1="11" y1="9" x2="9" y2="19" /><line x1="15" y1="9" x2="15" y2="19" /><line x1="19" y1="9" x2="21" y2="19" />
        <line x1="2" y1="19" x2="28" y2="19" />
      </g>;
    } else if (kind === "jewel") {
      // masonry facade w/ arches
      body = <g {...s}>
        <rect x="4" y="6" width="22" height="13" />
        <path d="M8 19 L8 13 Q8 11 10 11 Q12 11 12 13 L12 19" />
        <path d="M14 19 L14 13 Q14 11 16 11 Q18 11 18 13 L18 19" />
        <path d="M20 19 L20 13 Q20 11 22 11 Q24 11 24 13 L24 19" />
        <line x1="4" y1="9" x2="26" y2="9" />
      </g>;
    } else if (kind === "postwar") {
      // monumental municipal facade: pediment on columns
      body = <g {...s}>
        <path d="M4 9 L15 4 L26 9 Z" />
        <line x1="4" y1="9" x2="26" y2="9" />
        <line x1="8" y1="9" x2="8" y2="19" /><line x1="15" y1="9" x2="15" y2="19" /><line x1="22" y1="9" x2="22" y2="19" />
        <line x1="4" y1="19" x2="26" y2="19" />
      </g>;
    } else if (kind === "modernist") {
      // baseball-only modern bowl: cantilever roof plane over open field
      body = <g {...s}>
        <path d="M3 8 L27 8 L23 12 L7 12 Z" />
        <path d="M6 19 Q15 13 24 19" />
        <line x1="15" y1="12" x2="15" y2="15" />
      </g>;
    } else if (kind === "multi") {
      // circular multi-purpose bowl (concentric ellipses)
      body = <g {...s}>
        <ellipse cx="15" cy="13" rx="12" ry="7" />
        <ellipse cx="15" cy="13" rx="6.5" ry="3.6" />
      </g>;
    } else if (kind === "retro") {
      // brick wall coursing
      body = <g {...s}>
        <rect x="4" y="7" width="22" height="12" />
        <line x1="4" y1="11" x2="26" y2="11" /><line x1="4" y1="15" x2="26" y2="15" />
        <line x1="11" y1="7" x2="11" y2="11" /><line x1="19" y1="7" x2="19" y2="11" />
        <line x1="8" y1="11" x2="8" y2="15" /><line x1="15" y1="11" x2="15" y2="15" /><line x1="22" y1="11" x2="22" y2="15" />
        <line x1="11" y1="15" x2="11" y2="19" /><line x1="19" y1="15" x2="19" y2="19" />
      </g>;
    } else if (kind === "district") {
      // cluster of mixed towers
      body = <g {...s}>
        <rect x="4" y="11" width="6" height="8" />
        <rect x="12" y="5" width="6" height="14" />
        <rect x="20" y="9" width="6" height="10" />
        <line x1="2" y1="19" x2="28" y2="19" />
      </g>;
    }
    return <svg {...common} aria-hidden="true">{body}</svg>;
  }

  // ── section head: brick label + number + trailing rule ───────────────────
  function SectionHead({ num, label, width, fontSize = 22, style = {} }) {
    return (
      <div className="bc-sectionhead" style={{ width, fontSize, ...style }}>
        {num ? <span className="bc-sectionnum" style={{ ...{ fontSize: fontSize * 0.62 }, fontSize: "14px" }}>{num}</span> : null}
        <span className="txt">{label}</span>
        <span className="rule" />
      </div>);

  }

  // ── image-slot figure with caption block ─────────────────────────────────
  function Figure(props) {
    const { fig, x, y, w, imgH, captionW, noBody } = props;
    const ph = (fig.kind === "plan" ? "Stadium plan \u00b7 " : "Archival photo \u00b7 ") +
    fig.title.replace(/,.*$/, "");
    return (
      <figure className="bc-figure" style={{ left: x, top: y, width: w, margin: 0 }}>
        <div style={{ position: "relative", width: w, height: imgH }}>
          <image-slot
            id={fig.id}
            src={"images/ballpark-city/" + fig.id + ".jpg"}
            statefile={".image-slots-" + fig.id.replace(/[^a-z0-9]/gi, "") + ".state.json"}
            shape="rect"
            fit="cover"
            maxdim="1400"
            placeholder={ph}
            style={{ width: w + "px", height: imgH + "px" }}>
          </image-slot>
          <div className="frame-rule"></div>
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: fig.kind === "plan" ?
            "rgba(32,56,76,0.05)" :
            "rgba(110,39,24,0.06)",
            mixBlendMode: "multiply"
          }}></div>
        </div>
        <figcaption style={{ width: captionW || w }}>
          <div className="bc-cap-title">{fig.title}</div>
          <div className="bc-cap-meta">{fig.meta}</div>
          {noBody ? null : <div className="bc-cap-body">{fig.caption}</div>}
        </figcaption>
      </figure>);

  }

  // ── pull quote ────────────────────────────────────────────────────────────
  function PullQuote({ text, x, y, w, fontSize = 27, variant = "brick", align = "left" }) {
    const serif = variant === "serif";
    return (
      <div className="bc-region" style={{ left: x, top: y, width: w }}>
        <div className={"bc-pullquote" + (serif ? " serif" : "")}
        style={{ fontSize, textAlign: align }}>
          {!serif ? <span className="mark" style={{ fontSize: fontSize * 2.0, position: "absolute", left: -6, top: -fontSize * 0.5 }}>&#8220;</span> : null}
          {serif ? <span style={{ color: C.brick, fontWeight: 700, marginRight: 4 }}>&#8220;</span> : null}
          {text}
          {serif ? <span style={{ color: C.brick, fontWeight: 700, marginLeft: 2 }}>&#8221;</span> : null}
        </div>
      </div>);

  }

  // ── era timeline rail (Spread 1 left margin) ─────────────────────────────
  function TimelineRail({ items, x, y, h, headLabel, gap = 22 }) {
    // Items flow naturally with a CONSTANT gap between them, so eras with
    // shorter descriptions don't leave an oversized hole below them. The spine
    // is measured from the first dot centre to the last dot centre.
    const listRef = React.useRef(null);
    const firstItem = React.useRef(null);
    const lastItem = React.useRef(null);
    const [spine, setSpine] = React.useState({ top: 0, height: 0 });
    React.useLayoutEffect(() => {
      if (!firstItem.current || !lastItem.current) return;
      const DOT_CENTER = 3 + 6.5; // dot top offset + half its 13px height
      const t0 = firstItem.current.offsetTop + DOT_CENTER;
      const t1 = lastItem.current.offsetTop + DOT_CENTER;
      setSpine({ top: t0, height: t1 - t0 });
    }, [items]);
    return (
      <div className="bc-region" style={{ left: x, top: y, width: 150, height: h }}>
        <div className="bc-rail-head" style={{ marginBottom: 22 }}>
          {headLabel.map((ln, i) => <div key={i}>{ln}</div>)}
        </div>
        <div ref={listRef} style={{ position: "relative", display: "flex", flexDirection: "column", gap: gap }}>
          {/* spine */}
          <div style={{ position: "absolute", left: 5, top: spine.top, width: 2, height: spine.height, background: C.rule2 }}></div>
          {items.map((it, i) => {
            const ref = i === 0 ? firstItem : i === items.length - 1 ? lastItem : null;
            return (
              <div key={it.key} ref={ref} style={{ position: "relative", width: 150 }}>
                <div style={{ position: "absolute", left: -1, top: 3, width: 13, height: 13, borderRadius: "50%", background: it.color, boxShadow: "0 0 0 3px var(--paper)" }}></div>
                <div className="bc-era-date" style={{ marginLeft: 26 }}>{it.dates}</div>
                <div style={{ marginLeft: 26, marginTop: 1, marginBottom: 0 }}>
                  <EraIcon kind={it.icon} size={28} color={it.color} />
                </div>
                <div className="bc-era-name" style={{ marginLeft: 26, ...(it.nameStyle || {}) }}>
                  {Array.isArray(it.name) ? it.name.join(" ") : it.name}
                </div>
                <div className="bc-era-desc" style={{ marginLeft: 26 }}>{it.desc}</div>
              </div>);

          })}
        </div>
      </div>);

  }

  // ── comparative atlas grid ───────────────────────────────────────────────
  function AtlasGrid({ atlas, x, y, w, title, dense, template, pad, minH }) {
    const tmpl = template || (dense ?
    "132px 268px 1fr 1.28fr" :
    "168px 1fr 1.05fr 1.18fr");
    const cellPad = pad || (dense ? "5px 12px 5px 0" : "11px 14px 11px 0");
    const cellFont = dense ? 12 : 12;
    const eraFont = dense ? 12 : 13.5;
    const cellStyle = { padding: cellPad, fontSize: cellFont, minHeight: minH != null ? minH : dense ? 42 : undefined };
    return (
      <div className="bc-region" style={{ left: x, top: y, width: w }}>
        {title ? <div className="bc-atlas-title" style={{ marginBottom: dense ? 9 : 12, fontSize: dense ? 16 : 17 }}>{title}</div> : null}
        <div className="bc-atlas-grid" style={{ gridTemplateColumns: tmpl }}>
          {atlas.cols.map((c, i) =>
          <div key={"c" + i} className="bc-atlas-colhead"
          style={{ paddingRight: 13, textAlign: "left" }}>{c}</div>
          )}
          {atlas.rows.map((r, ri) =>
          <React.Fragment key={"r" + ri}>
              <div className="bc-atlas-cell" style={{ ...cellStyle, display: "flex", gap: 9 }}>
                <div style={{ flex: "0 0 auto", width: 10, height: 10, marginTop: 3, background: r.color }}></div>
                <div>
                  <div className="bc-atlas-era" style={{ fontSize: eraFont, whiteSpace: "nowrap" }}>{r.era}</div>
                  {dense ? null : <div className="bc-atlas-years">{r.years}</div>}
                </div>
              </div>
              <div className="bc-atlas-cell bc-atlas-text parks" style={{ ...cellStyle, letterSpacing: r.parksLS || "-0.1px" }}>{r.parks}</div>
              <div className="bc-atlas-cell bc-atlas-text" style={cellStyle}>{r.logic}</div>
              <div className="bc-atlas-cell bc-atlas-text" style={{ ...cellStyle, letterSpacing: "-0.7px" }}>{r.trait}</div>
            </React.Fragment>
          )}
        </div>
      </div>);

  }

  // ── sidebar note icons (simple line symbols, 28 x 24) ────────────────────
  function NoteIcon({ kind, size = 26, color = C.ink }) {
    const s = { stroke: color, strokeWidth: 1.5, fill: "none", strokeLinejoin: "round", strokeLinecap: "round" };
    let body = null;
    if (kind === "materials") {
      // I-beam / structural member
      body = <g {...s}>
        <line x1="6" y1="6" x2="22" y2="6" /><line x1="6" y1="18" x2="22" y2="18" />
        <line x1="14" y1="6" x2="14" y2="18" />
        <line x1="8" y1="9" x2="8" y2="15" opacity="0.5" /><line x1="20" y1="9" x2="20" y2="15" opacity="0.5" />
      </g>;
    } else if (kind === "money") {
      // bond certificate: sheet + seal + lines
      body = <g {...s}>
        <rect x="5" y="6" width="20" height="13" rx="1" />
        <circle cx="20" cy="12.5" r="2.6" />
        <line x1="8" y1="10" x2="15" y2="10" /><line x1="8" y1="13.5" x2="14" y2="13.5" /><line x1="8" y1="16" x2="13" y2="16" />
      </g>;
    } else if (kind === "access") {
      // accessible route / sightline ramp
      body = <g {...s}>
        <line x1="5" y1="19" x2="24" y2="19" />
        <line x1="7" y1="19" x2="20" y2="8" />
        <circle cx="20" cy="6.4" r="2" />
        <line x1="12" y1="19" x2="14.5" y2="13.5" opacity="0.5" />
      </g>;
    } else if (kind === "risk") {
      // protective netting mesh
      body = <g {...s}>
        <rect x="6" y="6" width="16" height="14" rx="1" />
        <line x1="6" y1="11" x2="22" y2="11" opacity="0.6" /><line x1="6" y1="15.5" x2="22" y2="15.5" opacity="0.6" />
        <line x1="11" y1="6" x2="11" y2="20" opacity="0.6" /><line x1="16.5" y1="6" x2="16.5" y2="20" opacity="0.6" />
      </g>;
    }
    return <svg width={size} height={size * (24 / 28)} viewBox="0 0 28 24" aria-hidden="true">{body}</svg>;
  }

  window.BallparkMotifs = { CityGrid, Skyline, EraIcon, NoteIcon, SectionHead, Figure, PullQuote, TimelineRail, AtlasGrid };
})();