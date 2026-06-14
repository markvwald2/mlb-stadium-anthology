/* oracle-shore-store.js — single runtime source of truth for the shoreline
   registration transform (translate / scale / rotate / opacity).

   The baked defaults live in oracle-shoreline.jsx (window.OracleShoreDefaults).
   This store holds only the user's *overrides*, persisted to localStorage, so:
     - the Tweaks panel can scale / move / rotate the coast live,
     - the registration survives reloads,
     - and the ?print=1 PDF path (which never mounts the panel) still reads the
       same tuned values, since it shares this origin's localStorage.
   Once a registration is dialed in, the values can be baked back into
   OracleShoreDefaults so they travel with the file. */
(function () {
  const KEY = "oracle.shore.v1";
  const subs = new Set();

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || "null") || {}; }
    catch (e) { return {}; }
  }

  window.OracleShoreStore = {
    overrides: function () { return load(); },
    set: function (patch) {
      const next = Object.assign({}, load(), patch);
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch (e) {}
      subs.forEach(function (f) { f(next); });
    },
    reset: function () {
      try { localStorage.removeItem(KEY); } catch (e) {}
      subs.forEach(function (f) { f({}); });
    },
    subscribe: function (fn) { subs.add(fn); return function () { subs.delete(fn); }; }
  };
})();
