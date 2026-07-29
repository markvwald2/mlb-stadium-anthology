/* outline-text.js — convert every SVG <text> in the page to vector <path>
   outlines, so the exported PDF contains NO font references at all (guaranteed
   pass for Blurb's "non-embedded fonts" preflight).

   Why outlines instead of trusting Chrome to embed:
     Chrome's Skia print backend embeds subset instances of the faces it
     rasterized. When it synthesizes a weight/style, or when a Google-Fonts
     webfont arrives late, the PDF ends up carrying non-embeddable pseudo-faces
     ("Oswald-Regular_Medium", "CAAAAA+Oswald-Regular", Spectral Italic, ...).
     Converting text to filled paths removes the question entirely.

   Layout fidelity: glyph placement is taken from the LIVE RENDER via
   SVGTextContentElement.getStartPositionOfChar(), so text-anchor,
   dominant-baseline, letter-spacing, tspan x/dx/dy and the collision-fitted
   positions are all preserved exactly — nothing is re-laid-out. Only the glyph
   is swapped for its own outline, from the same typeface at the same size.

   Usage:  await window.OutlineSVGText();          // whole document
           await window.OutlineSVGText(rootEl);    // scoped
*/
(function () {
  const FONTS = {
    "oswald-regular": "fonts/Oswald-Regular.ttf",
    "oswald-medium": "fonts/Oswald-Medium.ttf",
    "oswald-bold": "fonts/Oswald-Bold.ttf",
    "spacemono-regular": "fonts/SpaceMono-Regular.ttf",
    "spectral-italic": "fonts/Spectral-Italic.ttf",
    "spectral-bolditalic": "fonts/Spectral-BoldItalic.ttf",
  };
  const loaded = {};
  const warned = {};

  async function loadFonts() {
    const keys = Object.keys(FONTS);
    await Promise.all(keys.map(async (k) => {
      if (loaded[k]) return;
      const buf = await (await fetch(FONTS[k])).arrayBuffer();
      loaded[k] = opentype.parse(buf);
    }));
  }

  // ---- attribute-driven style lookup -------------------------------------
  // Read presentation attributes up the ancestor chain rather than computed
  // style: the print harness scales the page with CSS `zoom`, and Chrome folds
  // zoom into computed font-size — attributes stay in true user units.
  function attrUp(el, name, stop) {
    let n = el;
    while (n && n !== stop) {
      if (n.nodeType === 1) {
        if (n.hasAttribute && n.hasAttribute(name)) return n.getAttribute(name);
        const inl = n.style && n.style.getPropertyValue(cssName(name));
        if (inl) return inl;
      }
      n = n.parentNode;
    }
    if (stop && stop.nodeType === 1) {
      if (stop.hasAttribute(name)) return stop.getAttribute(name);
      const inl = stop.style && stop.style.getPropertyValue(cssName(name));
      if (inl) return inl;
    }
    return null;
  }
  function cssName(n) { return n; }

  function firstFamily(v) {
    if (!v) return "";
    return v.split(",")[0].trim().replace(/^['"]|['"]$/g, "");
  }

  function fontKey(family, weight, style) {
    const f = family.toLowerCase();
    const w = parseInt(weight, 10) || (weight === "bold" ? 700 : 400);
    const ital = /italic|oblique/.test(style || "");
    if (f === "oswald med") return "oswald-medium";
    if (f === "oswald bd") return "oswald-bold";
    if (f === "oswald") return w >= 700 ? "oswald-bold" : w >= 500 ? "oswald-medium" : "oswald-regular";
    if (f === "space mono") return "spacemono-regular";
    if (f === "spectral") return w >= 600 ? "spectral-bolditalic" : "spectral-italic";
    if (/mono/.test(f)) return "spacemono-regular";
    if (/serif/.test(f) && !/sans/.test(f)) return ital ? "spectral-italic" : "spectral-italic";
    return "oswald-regular";
  }

  /* Build the ADDRESSABLE character list for a <text>.
     getStartPositionOfChar() indexes the element's characters AFTER SVG
     whitespace normalisation (xml:space="default"): newlines dropped, tabs →
     spaces, runs of spaces collapsed to one, leading/trailing space stripped.
     Naively using DOM string offsets desynchronises the moment a label contains
     a double space (e.g. the era labels' "1903  First modern World Series"),
     which silently shifts every following glyph. So normalise here, exactly the
     same way, and keep each surviving character tied to its source text node
     (for per-tspan font-weight / fill). \u00a0 is NOT collapsible whitespace. */
  function addressableChars(textEl) {
    const raw = [];
    const walk = (node) => {
      for (const kid of node.childNodes) {
        if (kid.nodeType === 3) {
          const s = kid.nodeValue || "";
          for (const ch of s) raw.push({ ch: ch, node: kid });
        } else if (kid.nodeType === 1) walk(kid);
      }
    };
    walk(textEl);
    const kept = [];
    for (const c of raw) {
      let ch = c.ch;
      if (ch === "\n" || ch === "\r") continue;      // removed outright
      if (ch === "\t") ch = " ";
      if (ch === " " && (!kept.length || kept[kept.length - 1].ch === " ")) continue; // collapse + strip leading
      kept.push({ ch: ch, node: c.node });
    }
    while (kept.length && kept[kept.length - 1].ch === " ") kept.pop();  // strip trailing
    kept.forEach((c, i) => { c.i = i; });
    return kept;
  }

  function outlineOne(textEl, stats) {
    const nChars = textEl.getNumberOfChars();
    if (!nChars) return;
    const chars = addressableChars(textEl);
    if (chars.length !== nChars) {
      stats.warnings.push("char-count " + chars.length + "/" + nChars + " \u2014 " + textEl.textContent.slice(0, 40));
    }
    // group consecutive characters that share a source text node → one <path>
    const runs = [];
    for (const c of chars) {
      const last = runs[runs.length - 1];
      if (last && last.node === c.node) last.chars.push(c);
      else runs.push({ node: c.node, chars: [c] });
    }
    const frag = document.createDocumentFragment();
    const NS = "http://www.w3.org/2000/svg";
    let painted = 0;

    for (const run of runs) {
      const holder = run.node.parentElement;
      // dominant-baseline / alignment-baseline shifts are NOT reflected in
      // getStartPositionOfChar().y (Chrome returns the specified y), so a
      // dominant-baseline="central" label would outline with its baseline on the
      // centre line and appear to jump upward. getExtentOfChar() DOES include
      // the shift, so recover it: extent.y is the top of the glyph's font box,
      // and (extent.y + ascent) is the true painted baseline.
      let dyFix = 0;
      const family = firstFamily(attrUp(holder, "font-family", textEl));
      const weight = attrUp(holder, "font-weight", textEl) || "400";
      const style = attrUp(holder, "font-style", textEl) || "normal";
      const sizeRaw = attrUp(holder, "font-size", textEl) || "16";
      const size = parseFloat(sizeRaw);
      const fill = attrUp(holder, "fill", textEl) || "#000";
      const opacity = attrUp(holder, "opacity", textEl);
      const key = fontKey(family, weight, style);
      const font = loaded[key];
      if (!font) { if (!warned[key]) { warned[key] = 1; stats.missing.push(key); } continue; }

      let d = "", fixed = false;
      for (const c of run.chars) {
        const ch = c.ch;
        if (!ch.trim()) continue;              // spaces & nbsp paint nothing
        const gi = c.i;
        if (gi >= nChars) continue;
        let p;
        try { p = textEl.getStartPositionOfChar(gi); } catch (e) { continue; }
        if (!fixed) {
          fixed = true;
          try {
            const ext = textEl.getExtentOfChar(gi);
            // Chrome rounds a font's ascent/descent to whole CSS px before use,
            // so round here too — otherwise the recovered baseline is off by up
            // to half a pixel on every label.
            const ascentPx = Math.round((font.ascender / font.unitsPerEm) * size);
            const cand = (ext.y + ascentPx) - p.y;
            if (isFinite(cand) && Math.abs(cand) < size * 1.5) dyFix = cand;
          } catch (e) {}
        }
        const path = font.getPath(ch, p.x, p.y + dyFix, size);
        const seg = path.toPathData(3);
        if (seg && seg !== "") { d += (d ? " " : "") + seg; }
        painted++;
      }
      if (!d) continue;
      const el = document.createElementNS(NS, "path");
      el.setAttribute("d", d);
      el.setAttribute("fill", fill);
      if (opacity) el.setAttribute("opacity", opacity);
      el.setAttribute("shape-rendering", "geometricPrecision");
      frag.appendChild(el);
    }

    const g = document.createElementNS(NS, "g");
    g.setAttribute("data-outlined", textEl.getAttribute("data-lg") || "text");
    // carry over any transform/opacity that lived on the <text> itself
    for (const a of ["transform", "opacity", "clip-path", "mask", "filter"]) {
      if (textEl.hasAttribute(a)) g.setAttribute(a, textEl.getAttribute(a));
    }
    g.appendChild(frag);
    textEl.parentNode.replaceChild(g, textEl);
    stats.texts++;
    stats.glyphs += painted;
  }

  async function OutlineSVGText(root) {
    await loadFonts();
    const scope = root || document;
    const stats = { texts: 0, glyphs: 0, missing: [], warnings: [] };
    const list = Array.from(scope.querySelectorAll("svg text"));
    for (const t of list) {
      try { outlineOne(t, stats); } catch (e) { stats.missing.push("err:" + (e && e.message)); }
    }
    // Belt and braces: any <text> that somehow survived would re-introduce a
    // font reference, so report it loudly.
    stats.remaining = scope.querySelectorAll("svg text").length;
    window.__outlineStats = stats;
    return stats;
  }

  window.OutlineSVGText = OutlineSVGText;
})();
