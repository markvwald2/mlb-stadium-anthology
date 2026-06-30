/* layout-audit.js — reusable layout/typography audit for the MLB book spreads.
   Run via eval_js on any open spread (NORMAL view, not ?print). Returns a compact
   JSON report in DESIGN PX (100px = 1in). It does NOT mutate the page — it surfaces
   tightening opportunities + type-floor violations so fixes stay surgical.

   Detection is transform-free: pages are found by offsetWidth/offsetHeight
   (layout px = design px), and screen measurements are divided by the page's own
   measured scale. font-size from getComputedStyle is already design px.

   Paste the whole IIFE into eval_js; it auto-invokes and returns the report.
   Reading the numbers:
   - printableHeadroom_safe: +px = unused margin INSIDE the safe area on that edge
     (room you can expand into / push toward). bottom is the usual lever.
   - blocks[].slack: allocatedH - contentH; >0 means the box is taller than its
     content (reclaimable). gapBelow: space to the next block.
   - typeFloors: hard_sub11 (any text <11px), body_sub14 (justified <14px),
     diagramData_sub11 (distance/bearing numerals rendered <11px),
     instr_sub8_3 (degree ticks / N rendered <8.3px).
   - unwrapCandidates: 2-line text with a short orphan last line (widen/unwrap).
*/
(() => {
  const pages = [...document.querySelectorAll('div')].filter(el =>
    el.offsetWidth > 1235 && el.offsetWidth < 1315 && el.offsetHeight > 1045 && el.offsetHeight < 1135);
  if (!pages.length) return { error: 'no 1275x1088 page found' };
  const txt = el => el.textContent.replace(/\s+/g, '').length;
  const page = pages.sort((a, b) => txt(b) - txt(a))[0];
  const prr = page.getBoundingClientRect();
  const PS = prr.width / page.offsetWidth;            // measured page->screen scale
  const D = px => +(px / PS).toFixed(0);
  const PX = sx => (sx - prr.left) / PS, PY = sy => (sy - prr.top) / PS;
  const instr = el => el.closest('.fd-svg,.cbp-fig,.pk-fig,svg');
  const ink = el => el.matches('image-slot,img') || [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());

  // content bounding box (ink only)
  let bx = { x1: 1e9, y1: 1e9, x2: -1e9, y2: -1e9 };
  page.querySelectorAll('*').forEach(el => {
    if (!ink(el)) return; const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return;
    bx.x1 = Math.min(bx.x1, PX(r.left)); bx.y1 = Math.min(bx.y1, PY(r.top));
    bx.x2 = Math.max(bx.x2, PX(r.right)); bx.y2 = Math.max(bx.y2, PY(r.bottom));
  });
  const SAFE = { l: 37.5, t: 37.5, r: 1237.5, b: 1050.5 };
  const headroom = { top: +(bx.y1 - SAFE.t).toFixed(0), left: +(bx.x1 - SAFE.l).toFixed(0), right: +(SAFE.r - bx.x2).toFixed(0), bottom: +(SAFE.b - bx.y2).toFixed(0) };

  // padded wrapper + its major child blocks
  let wrap = null, wPad = -1;
  page.querySelectorAll('*').forEach(el => { const s = getComputedStyle(el); const pad = parseFloat(s.paddingTop) + parseFloat(s.paddingBottom) + parseFloat(s.paddingLeft) + parseFloat(s.paddingRight); if (el.offsetWidth > 600 && el.offsetHeight > 600 && pad > wPad) { wPad = pad; wrap = el; } });
  const padOf = el => { const s = getComputedStyle(el); return [s.paddingTop, s.paddingRight, s.paddingBottom, s.paddingLeft].map(v => Math.round(parseFloat(v))).join(' '); };
  const blocks = [];
  if (wrap) { const kids = [...wrap.children].filter(el => el.offsetHeight > 14); kids.forEach((el, i) => { const r = el.getBoundingClientRect(); const next = kids[i + 1]; blocks.push({ cls: (el.className || el.tagName).toString().split(' ')[0].slice(0, 20), top: D(r.top - prr.top), bottom: D(r.bottom - prr.top), allocH: el.offsetHeight, contentH: el.scrollHeight, slack: el.offsetHeight - el.scrollHeight, gapBelow: next ? D(next.getBoundingClientRect().top - r.bottom) : null, pad: padOf(el) }); }); }

  // type-floor sweep
  const floors = { hard_sub11: [], body_sub14: [], diagramData_sub11: [], instr_sub8_3: [] };
  const seen = new Set(); const pushU = (arr, k, fs, s) => { const key = k + '|' + fs; if (seen.has(key)) return; seen.add(key); arr.push({ px: +fs.toFixed(1), sample: s.slice(0, 18) }); };
  page.querySelectorAll('*').forEach(el => { if (!ink(el) || instr(el)) return; const fs = parseFloat(getComputedStyle(el).fontSize); const s = getComputedStyle(el); const sm = el.textContent.trim(); if (fs < 11) pushU(floors.hard_sub11, el.className || el.tagName, fs, sm); if (el.tagName === 'P' && s.textAlign === 'justify' && fs < 14) pushU(floors.body_sub14, 'p', fs, sm); });
  document.querySelectorAll('.fd-svg,.cbp-fig,.pk-fig').forEach(svg => { const vb = svg.viewBox && svg.viewBox.baseVal; if (!vb || !vb.width) return; const iscale = (svg.getBoundingClientRect().width / PS) / vb.width; svg.querySelectorAll('text').forEach(t => { const rendered = parseFloat(getComputedStyle(t).fontSize) * iscale; const s = t.textContent.trim(); const isData = /\d/.test(s) && s.replace(/[^\d]/g, '').length >= 2; if (isData && rendered < 11) floors.diagramData_sub11.push({ rendered: +rendered.toFixed(1), sample: s.slice(0, 10) }); else if (!isData && rendered < 8.3) floors.instr_sub8_3.push({ rendered: +rendered.toFixed(1), sample: s.slice(0, 10) }); }); });

  // unwrap candidates: 2-line leaf text with short orphan last line
  const unwrap = [];
  page.querySelectorAll('p,span,div,td,th,li').forEach(el => { if (el.children.length) return; const s = el.textContent.trim(); if (s.length < 4) return; const cs = getComputedStyle(el); const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2; const lines = Math.round(el.getBoundingClientRect().height / lh); if (lines !== 2) return; const rng = document.createRange(); rng.selectNodeContents(el); const rects = [...rng.getClientRects()]; if (rects.length < 2) return; const w = rects.map(r => r.width); const maxW = Math.max(...w), lastW = w[w.length - 1]; if (lastW / maxW < 0.45) unwrap.push({ sample: s.slice(0, 24), orphanFrac: +(lastW / maxW).toFixed(2), cls: (el.className || el.tagName).toString().split(' ')[0].slice(0, 16) }); });

  return { pageScale: +PS.toFixed(3), page: (page.className || '').toString().split(' ').slice(0, 2).join(' '), printableHeadroom_safe: headroom, wrapper: wrap ? { cls: (wrap.className || '').toString().split(' ')[0], pad: padOf(wrap) } : null, blocks, typeFloors: floors, unwrapCandidates: unwrap.slice(0, 12) };
})();
