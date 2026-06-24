/* about-book-app.jsx — mounts the three intro-page directions side by side on a
   design canvas so they can be compared, reordered, and focused fullscreen. */
(function () {
  const e = React.createElement;

  function App() {
    return e(window.DesignCanvas, null,
      e(window.DCSection, {
        id: "about-intro",
        title: "What This Book Is \u2014 intro page, three directions",
        subtitle: "Single recto leaf, 1275 \u00d7 1088 (one page with bleed). Same Cooper / Spectral / Space Mono vocabulary as the rest of the book. A = the premise + scope, B = a personal note, C = a reader\u2019s guide. Facts are data-true; Option B prose is draft copy to personalize."
      },
        e(window.DCArtboard, { id: "opt-a", label: "A \u00b7 The Premise", width: 1275, height: 1088 },
          e(window.AboutOptionA, null)),
        e(window.DCArtboard, { id: "opt-b", label: "B \u00b7 A Note", width: 1275, height: 1088 },
          e(window.AboutOptionB, null)),
        e(window.DCArtboard, { id: "opt-c", label: "C \u00b7 How to Read It", width: 1275, height: 1088 },
          e(window.AboutOptionC, null))
      )
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(e(App, null));
})();
