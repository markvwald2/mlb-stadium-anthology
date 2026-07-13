/* preflight.js — press preflight for MLB-book spreads.
   Run in the page context (works in the user's view so dropped photos are seen):

     preflight()            → checks the spread on the page, returns a report
                              object and prints a readable summary to console.
     preflight({verbose:1}) → also lists every passing item.

   Geometry is the project's authoritative 100-px/in design canvas
   (2550 x 1088). All measurements are in design px. The root is auto-detected
   as the 2550 x 1088 element, so it works regardless of the spread's root class.

   Checks:
     1. Content within printable (safe) bounds — text + SVG marks inside the
        page safe box and clear of the fold gutter.
     2. Photos >= 300 DPI at their rendered (object-fit aware) size.
     3. Drop caps fit and are sized properly (cap doesn't overhang its paragraph).
     4. Long prose blocks: font-size, letter-spacing, line-height uniform across
        paragraphs.
     5. All text >= 10px (design px).
*/
(function () {
  // Authoritative Blurb safe boxes (CLAUDE.md): 0.25 in outer/top/bottom,
  // 0.50 in binding edge → left-page x <= 1212.5, right-page x >= 1337.5.
  const SAFE = {
    LEFT:  { x0: 37.5,   x1: 1212.5, y0: 37.5, y1: 1050.5 },
    RIGHT: { x0: 1337.5, x1: 2512.5, y0: 37.5, y1: 1050.5 },
    GUT:   { x0: 1237.5, x1: 1312.5 },
  };
  const MIN_DPI = 300;
  const MIN_FONT = 12;       // design px — hard reader-data floor (CLAUDE.md)
  const MIN_FONT_SVG = 8.3;  // instrument-tick allowance for SVG glance-marks (6 pt)
  const TOL = 0.5;           // px slack on bounds
  const PROSE_MIN_CHARS = 240;

  function depth(el) { let d = 0; while ((el = el.parentElement)) d++; return d; }
  // Pick the DEEPEST element whose offset box matches the design size. The
  // design-canvas host wraps the content in a pan/zoom transform, so HTML/BODY
  // and the canvas viewport all report 2550x1088 by offset while sitting at
  // scale 1 / offset 0 — using them would ignore the transform. The innermost
  // match is the actual content card, whose getBoundingClientRect reflects the
  // live pan/zoom so screen->design mapping is correct at any zoom.
  function deepestMatch(pred) {
    const m = [...document.querySelectorAll("*")]
      .filter((el) => !["HTML", "BODY"].includes(el.tagName))
      .filter(pred);
    if (!m.length) return null;
    return m.sort((a, b) => depth(b) - depth(a))[0];
  }
  function findRoot() {
    const m2550 = deepestMatch((el) => Math.abs(el.offsetWidth - 2550) < 2 && Math.abs(el.offsetHeight - 1088) < 2);
    if (m2550) return { el: m2550, designW: 2550, single: false };
    const m1275 = deepestMatch((el) => Math.abs(el.offsetWidth - 1275) < 2 && Math.abs(el.offsetHeight - 1088) < 2);
    if (m1275) return { el: m1275, designW: 1275, single: true };
    return { el: document.body, designW: 2550, single: false };
  }

  function ownText(el) {
    return [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
  }
  function isChrome(el) {
    // design-canvas host UI (artboard title labels etc.) — not printed content
    return !!(el.closest && el.closest(".dc-editable, .dc-label, .dc-artboard-label, .dc-section-title, .dc-sectionhead, [data-dc-chrome]"));
  }
  function onPage(d, designW) {
    // a box entirely outside the page canvas is host chrome, not bleed art
    return d.x1 > 0 && d.x0 < designW && d.y1 > 0 && d.y0 < 1088;
  }
  function isTextLeaf(el) {
    if (["IMAGE-SLOT", "IMG", "SVG", "SCRIPT", "STYLE"].includes(el.tagName)) return false;
    // SVG-namespaced text is handled by the dedicated svg-text sweep (which
    // applies the 8.3px instrument-tick allowance) — don't double-count it here.
    if (el.namespaceURI === "http://www.w3.org/2000/svg") return false;
    if (isChrome(el)) return false;
    if (!ownText(el)) return false;
    // no child element that itself holds direct text (so we measure the tightest box)
    return ![...el.children].some(
      (c) => c.tagName !== "IMAGE-SLOT" && [...c.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())
    );
  }
  function shortSel(el) {
    const cls = (el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className) || "";
    const c = String(cls).trim().split(/\s+/).filter(Boolean).slice(0, 2).join(".");
    return el.tagName.toLowerCase() + (c ? "." + c : "");
  }

  async function preflight(opts) {
    opts = opts || {};
    const rootInfo = findRoot();
    const root = rootInfo.el, designW = rootInfo.designW, single = rootInfo.single;
    const rb = root.getBoundingClientRect();
    const scale = rb.width / designW;
    const toD = (r) => ({
      x0: (r.left - rb.left) / scale, y0: (r.top - rb.top) / scale,
      x1: (r.right - rb.left) / scale, y1: (r.bottom - rb.top) / scale,
    });
    const report = { scale: +scale.toFixed(4), mode: single ? "single-page" : "two-page", checks: {} };

    /* ---- 1. bounds ---- */
    (function () {
      const items = [...root.querySelectorAll("*")].filter(isTextLeaf)
        .concat([...root.querySelectorAll("svg text, svg tspan")]);
      const v = [];
      const SINGLE = { x0: 37.5, x1: designW - 37.5, y0: 37.5, y1: 1050.5 };
      for (const el of items) for (const rc of el.getClientRects()) {
        if (rc.width < 0.5 || rc.height < 0.5) continue;
        const d = toD(rc);
        if (!onPage(d, designW)) continue;
        let out, gut = false;
        if (single) {
          out = d.x0 < SINGLE.x0 - TOL || d.x1 > SINGLE.x1 + TOL || d.y0 < SINGLE.y0 - TOL || d.y1 > SINGLE.y1 + TOL;
        } else {
          const cx = (d.x0 + d.x1) / 2, pg = cx < 1275 ? SAFE.LEFT : SAFE.RIGHT;
          out = d.x0 < pg.x0 - TOL || d.x1 > pg.x1 + TOL || d.y0 < pg.y0 - TOL || d.y1 > pg.y1 + TOL;
          gut = d.x1 > SAFE.GUT.x0 && d.x0 < SAFE.GUT.x1;
        }
        if (out || gut) v.push({ text: el.textContent.trim().slice(0, 44), x0: +d.x0.toFixed(1), x1: +d.x1.toFixed(1), y0: +d.y0.toFixed(1), y1: +d.y1.toFixed(1), reason: gut ? "gutter" : "outside-safe" });
      }
      report.checks.bounds = { pass: v.length === 0, checked: items.length, violations: v };
    })();

    /* ---- 2. photo DPI ---- */
    /* ---- 2. photo DPI (true-pixel decode; <img>.naturalWidth is downsampled in this preview) ---- */
    await (async function () {
      const slots = [...root.querySelectorAll("image-slot, img")];
      const rows = [], empty = [];
      for (const s of slots) {
        const img = s.tagName === "IMG" ? s : (s.querySelector("img") || (s.shadowRoot && s.shadowRoot.querySelector("img")));
        const wD = s.offsetWidth, hD = s.offsetHeight;
        const url = img && (img.currentSrc || img.getAttribute("src")) || "";
        if (!url) { empty.push(s.id || shortSel(s)); continue; }
        // true decode — createImageBitmap reports real pixels even when the
        // preview hands <img> a memory-downsampled decode.
        let nW = 0, nH = 0;
        try {
          const blob = await (await fetch(url)).blob();
          const bm = await createImageBitmap(blob);
          nW = bm.width; nH = bm.height; bm.close && bm.close();
        } catch (e) {
          nW = (img && img.naturalWidth) || 0; nH = (img && img.naturalHeight) || 0;
        }
        if (!nW) { empty.push(s.id || shortSel(s)); continue; }
        const dpiW = Math.round(nW / (wD / 100)), dpiH = Math.round(nH / (hD / 100));
        const fit = img ? getComputedStyle(img).objectFit : "cover";
        const dpi = Math.min(dpiW, dpiH);
        rows.push({ id: s.id || shortSel(s), natural: nW + "x" + nH, rendered: wD + "x" + hD, fit, dpi, ok: dpi >= MIN_DPI });
      }
      report.checks.photos = { pass: rows.every((r) => r.ok), filled: rows.length, empty, photos: rows, low: rows.filter((r) => !r.ok) };
    })();

    /* ---- 3. drop caps ---- */
    (function () {
      const targets = new Set();
      for (const ss of document.styleSheets) {
        let rules; try { rules = ss.cssRules; } catch (e) { continue; }
        if (!rules) continue;
        for (const r of rules) {
          if (r.selectorText && /::?first-letter/.test(r.selectorText)) {
            const base = r.selectorText.replace(/::?first-letter/g, "").trim();
            try { root.querySelectorAll(base).forEach((el) => targets.add(el)); } catch (e) {}
          }
        }
      }
      const caps = [];
      for (const el of targets) {
        const cs = getComputedStyle(el), fl = getComputedStyle(el, "::first-letter");
        const capPx = parseFloat(fl.fontSize) || 0;
        if (capPx <= parseFloat(cs.fontSize) * 1.6) continue; // not actually a drop cap
        let bodyLH = parseFloat(cs.lineHeight); if (!bodyLH || cs.lineHeight === "normal") bodyLH = parseFloat(cs.fontSize) * 1.2;
        let capLH = parseFloat(fl.lineHeight); if (!capLH || fl.lineHeight === "normal") capLH = capPx * 1.2;
        const capBoxH = capLH;                       // rendered height of the cap line box
        const spanLines = Math.max(1, Math.round(capBoxH / bodyLH));
        const paraLines = Math.max(1, Math.round(el.offsetHeight / bodyLH));
        const fits = paraLines >= spanLines && capPx <= el.offsetWidth * 0.5;
        caps.push({
          sel: shortSel(el), capPx: +capPx.toFixed(1), bodyPx: +parseFloat(cs.fontSize).toFixed(1),
          capSpansLines: spanLines, paragraphLines: paraLines, fits,
          note: !fits ? (paraLines < spanLines ? "cap taller than paragraph" : "cap too wide") : "ok",
        });
      }
      report.checks.dropcaps = { pass: caps.every((c) => c.fits), count: caps.length, caps };
    })();

    /* ---- 4. prose uniformity ---- */
    (function () {
      const conts = [...root.querySelectorAll("*")].filter((el) => {
        const ps = [...el.children].filter((c) => c.tagName === "P");
        if (ps.length < 2) return false;
        return el.textContent.trim().length >= PROSE_MIN_CHARS;
      });
      const blocks = [];
      for (const c of conts) {
        const ps = [...c.children].filter((x) => x.tagName === "P");
        const read = (p) => {
          const s = getComputedStyle(p);
          return {
            size: +parseFloat(s.fontSize).toFixed(2),
            track: s.letterSpacing === "normal" ? 0 : +parseFloat(s.letterSpacing).toFixed(2),
            leading: +parseFloat(s.lineHeight).toFixed(2),
          };
        };
        const vals = ps.map(read);
        const uniq = (k) => [...new Set(vals.map((v) => v[k]))];
        const sizes = uniq("size"), tracks = uniq("track"), leads = uniq("leading");
        const ok = sizes.length === 1 && tracks.length === 1 && leads.length === 1;
        blocks.push({ sel: shortSel(c), paragraphs: ps.length, fontSizes: sizes, letterSpacing: tracks, lineHeights: leads, uniform: ok });
      }
      report.checks.prose = { pass: blocks.every((b) => b.uniform), blocks: blocks.filter((b) => !b.uniform || opts.verbose), totalBlocks: blocks.length };
    })();

    /* ---- 5. min font size ----
       HTML reader text: hard 12px floor.
       SVG text: instrument-tick allowance to 8.3px, but 8.3–12px flagged as
       REVIEW so a human decides tick (ok) vs. data-label (must bump). */
    (function () {
      const items = [...root.querySelectorAll("*")].filter(isTextLeaf);
      const bad = [], review = [];
      for (const el of items) {
        const px = parseFloat(getComputedStyle(el).fontSize);
        if (px < MIN_FONT - 0.01) bad.push({ sel: shortSel(el), px: +px.toFixed(1), text: el.textContent.trim().slice(0, 36) });
      }
      // svg text: below the 8.3px instrument floor = fail; 8.3–12px = review band
      for (const el of root.querySelectorAll("svg text, svg tspan")) {
        const px = parseFloat(getComputedStyle(el).fontSize);
        if (!px) continue;
        if (px < MIN_FONT_SVG - 0.01) bad.push({ sel: "svg text", px: +px.toFixed(1), text: el.textContent.trim().slice(0, 36) });
        else if (px < MIN_FONT - 0.01) review.push({ sel: "svg text", px: +px.toFixed(1), text: el.textContent.trim().slice(0, 36) });
      }
      report.checks.minfont = { pass: bad.length === 0, checked: items.length, under: bad, reviewSvg: review };
    })();

    /* ---- summary ---- */
    const c = report.checks;
    report.summary = {
      "1 bounds":   c.bounds.pass ? "PASS" : "FAIL (" + c.bounds.violations.length + ")",
      "2 photos":   c.photos.pass ? "PASS" + (c.photos.empty.length ? " (" + c.photos.empty.length + " empty)" : "") : "FAIL (" + c.photos.low.length + " low)",
      "3 dropcaps": c.dropcaps.count === 0 ? "n/a" : (c.dropcaps.pass ? "PASS" : "FAIL"),
      "4 prose":    c.prose.totalBlocks === 0 ? "n/a" : (c.prose.pass ? "PASS" : "FAIL"),
      "5 minfont":  c.minfont.pass ? "PASS" : "FAIL (" + c.minfont.under.length + ")",
    };
    report.allPass = c.bounds.pass && c.photos.pass && c.dropcaps.pass && c.prose.pass && c.minfont.pass;

    try {
      console.log("%cPREFLIGHT " + (report.allPass ? "✓ ALL PASS" : "✗ ISSUES"), "font-weight:bold");
      console.table(report.summary);
      if (!c.bounds.pass) console.table(c.bounds.violations);
      if (!c.photos.pass) console.table(c.photos.low);
      if (c.photos.filled) console.table(c.photos.photos);
      if (!c.dropcaps.pass) console.table(c.dropcaps.caps);
      if (!c.prose.pass) console.table(report.checks.prose.blocks);
      if (!c.minfont.pass) console.table(c.minfont.under);
    } catch (e) {}
    return report;
  }

  window.preflight = preflight;
})();
