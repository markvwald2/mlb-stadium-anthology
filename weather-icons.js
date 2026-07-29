/* Shared weather icon system for every ballpark spread.
   One geometry, one optical weight, 24×24 viewBox, stroke-only line art.

   window.WxIcons.parts(kind)  -> [[tag, attrs], ...]  (for React.createElement)
   window.WxIcons.markup(kind) -> inner SVG markup string (for plain HTML)
   window.WxIcons.KINDS        -> canonical kind list
   window.WxIcons.resolve(str) -> maps a condition string / legacy kind to a canonical kind

   Canonical kinds:
     thermo | wind | drop | sun | partly | cloud | drizzle | rain
*/
(function () {
  var P = function (d, extra) { var a = { d: d }; if (extra) for (var k in extra) a[k] = extra[k]; return ["path", a]; };
  var C = function (cx, cy, r) { return ["circle", { cx: cx, cy: cy, r: r }]; };

  // one cloud body, reused everywhere so every cloud in the book is the same cloud
  var CLOUD_HI = "M7.4 16.4h9.1a3.5 3.5 0 0 0 .4-6.97 5.15 5.15 0 0 0-9.63-1.2A3.85 3.85 0 0 0 7.4 16.4z";
  var SUN_RAYS = "M12 2.5v2.1M12 19.4v2.1M2.5 12h2.1M19.4 12h2.1M5.22 5.22l1.5 1.5M17.28 17.28l1.5 1.5M18.78 5.22l-1.5 1.5M6.72 17.28l-1.5 1.5";

  var SET = {
    thermo: [P("M14 14.6V5.1a2 2 0 1 0-4 0v9.5a4 4 0 1 0 4 0z"), P("M12 14.2V8.4")],
    wind:   [P("M3 8h10a2.4 2.4 0 1 0-2.4-2.4M3 16h13a2.4 2.4 0 1 1-2.4 2.4M3 12h7")],
    drop:   [P("M12 3.1l4.75 6.05a6.15 6.15 0 1 1-9.5 0z")],
    sun:    [C(12, 12, 4.3), P(SUN_RAYS)],
    // crescent: waning moon at the same optical weight as the sun disc
    crescent: [P("M14.05 3.15a8.85 8.85 0 1 0 6.8 13.1 7.15 7.15 0 0 1-6.8-13.1z")],
    // night partly-cloudy: the same cloud body with a small crescent behind it
    partlynight: [P("M6.95 1.73a5.13 5.13 0 1 0 3.94 7.6 4.15 4.15 0 0 1-3.94-7.6z"), ["g", { transform: "translate(2 3.2)" }, [P(CLOUD_HI)]]],
    cloud:  [["g", { transform: "translate(0 1.4)" }, [P(CLOUD_HI)]]],
    partly: [
      P("m10.4 20.8c-1 0-2-0.6-2.7-1.3-0.8-0.7-1.2-1.7-1.2-2.7 0-1 0.4-2 1.1-2.8q0.1-0.1 0.2-0.2c0.7-0.6 1.5-0.9 2.5-1.2 0.4-0.9 1.2-1.7 2.1-2.2q1.4-0.6 2.7-0.6 0.2 0 0.4 0c1.1 0.2 2.1 0.6 2.8 1.3 0.8 0.8 1.4 1.7 1.6 2.7 0.9 0.1 1.7 0.6 2.2 1.3 0.6 0.6 0.9 1.5 0.8 2.4 0 0.9-0.4 1.7-1 2.3-0.7 0.6-1.5 1-2.4 1h-7.3z"),
      P("m6.7 11c0-2.4 1.9-4.3 4.3-4.3 2 0 3.6 1.3 4.1 3.1q-1.4 0-2.7 0.6c-0.9 0.5-1.7 1.3-2.1 2.2-1 0.3-1.8 0.6-2.5 1.2-0.7-0.7-1.1-1.7-1.1-2.8z"),
      P("m12.9 1.7c0.2-0.8 0-0.3-0.4 2.1m-11 5l2.1 0.5m2.1-6.5l1.1 1.8m12.1 1.3l-1.8 1.1m-12.7 8l-1.8 1.1")
    ],
    drizzle: [P(CLOUD_HI), P("M9.2 18.9l-.85 1.7M12.5 18.9l-.85 1.7M15.8 18.9l-.85 1.7")],
    rain:    [P(CLOUD_HI), P("M8.9 18.7l-1.5 3.05M12.5 18.7l-1.5 3.05M16.1 18.7l-1.5 3.05")]
  };

  var ALIAS = {
    temp: "thermo", thermo: "thermo", thermometer: "thermo", temperature: "thermo",
    wind: "wind",
    drop: "drop", droplet: "drop", humidity: "drop", hum: "drop",
    sun: "sun", clear: "sun", sunny: "sun", "mostly clear": "sun", moon: "sun", sky: "sun", night: "sun",
    crescent: "crescent",
    partlynight: "partlynight", "partly night": "partlynight", "crescent-cloud": "partlynight",
    partly: "partly", "partly cloudy": "partly", "partly cloudy; mostly clear": "partly", "mostly cloudy": "partly",
    cloud: "cloud", cloudy: "cloud", overcast: "cloud",
    drizzle: "drizzle", "light drizzle": "drizzle",
    rain: "rain", "light rain": "rain", showers: "rain"
  };

  function resolve(s) {
    if (!s) return null;
    var k = String(s).trim().toLowerCase();
    if (SET[k]) return k;
    if (ALIAS[k]) return ALIAS[k];
    if (/drizzle/.test(k)) return "drizzle";
    if (/rain|shower/.test(k)) return "rain";
    if (/partly|mostly cloudy/.test(k)) return "partly";
    if (/overcast|cloud/.test(k)) return "cloud";
    if (/clear|sunny|fair/.test(k)) return "sun";
    return null;
  }

  function parts(kind) {
    var k = resolve(kind);
    return k ? SET[k] : null;
  }

  function toEl(node, key) {
    var tag = node[0], attrs = node[1], kids = node[2];
    var props = { key: key };
    for (var a in attrs) props[a] = attrs[a];
    return kids
      ? React.createElement(tag, props, kids.map(function (n, i) { return toEl(n, key + "-" + i); }))
      : React.createElement(tag, props);
  }

  // React helper: WxIcons.react(kind, svgProps) -> <svg …>…</svg>
  function react(kind, svgProps) {
    var p = parts(kind);
    if (!p) return null;
    var base = { viewBox: "0 0 24 24", fill: "none", strokeLinecap: "round", strokeLinejoin: "round" };
    for (var a in (svgProps || {})) base[a] = svgProps[a];
    var wrap = base.wrapTransform; delete base.wrapTransform;
    var kids = p.map(function (n, i) { return toEl(n, "wx" + i); });
    if (wrap) kids = [React.createElement("g", { key: "wxg", transform: wrap }, kids)];
    return React.createElement("svg", base, kids);
  }

  function nodeMarkup(node) {
    var tag = node[0], attrs = node[1], kids = node[2], s = "<" + tag;
    for (var a in attrs) s += " " + a + '="' + attrs[a] + '"';
    if (!kids) return s + "/>";
    return s + ">" + kids.map(nodeMarkup).join("") + "</" + tag + ">";
  }

  function markup(kind) {
    var p = parts(kind);
    return p ? p.map(nodeMarkup).join("") : "";
  }

  window.WxIcons = {
    KINDS: ["thermo", "wind", "drop", "sun", "crescent", "partly", "partlynight", "cloud", "drizzle", "rain"],
    parts: parts, react: react, markup: markup, resolve: resolve
  };
})();
