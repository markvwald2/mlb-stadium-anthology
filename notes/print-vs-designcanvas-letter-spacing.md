# Print/PDF vs. DesignCanvas mismatch — the `letter-spacing` trap

**Spread affected (first found on):** Tiger Stadium
**Symptom class:** text wraps / lays out differently in the exported PDF than on
the design (DesignCanvas) page, even though both use the exact same component,
CSS, fonts, and canvas geometry.

---

## The problem

The design page and the `?print=1` PDF path render the **same** `<Spread>`
component, but through two different wrappers:

- **Design page:** the spread is mounted inside a DesignCanvas artboard
  (`design-canvas.jsx`). The artboard card element (`.dc-card`) carries an
  **inline `letter-spacing: -0.5px`** (see `design-canvas.jsx`, the `.dc-card`
  style). Because `letter-spacing` **inherits**, every text node in the spread
  that does *not* set its own tracking silently inherits `-0.5px`.

- **Print / PDF page:** the spread is mounted inside `print-page.jsx`, which has
  **no card and no `letter-spacing`**. So the same untracked text falls back to
  `letter-spacing: normal` (i.e. `0`).

`0` tracking = slightly wider glyph runs than `-0.5px`. That single difference
cascaded into two visible bugs:

### Bug 1 — prose wrapping changed
The justified body prose (`.ts-ctx p`, Spectral, no explicit tracking) rendered
wider per line in print, so it wrapped **earlier** — fewer words per line
("...Bennett" instead of "...Bennett Park"). The design page (with `-0.5px`)
packed more per line.

### Bug 2 — field watermark drifted onto the last paragraph
This was the subtle one. The **facts table values** (`.ts-ftable td`, also
Spectral, also untracked) were wider in print too, so a couple of them wrapped
to an extra line. That made the **facts grid column ~16px taller**. In
`.ts-sgrid` all three columns stretch to the tallest one, so the taller facts
column inflated the middle `.ts-center` column (482.6px → 498.7px). The field
diagram watermark (`.ts-fieldwm svg`) is absolutely positioned `inset:0` and
vertically centered, so a taller container made it **bigger and lower** — its
"RF OVERHANG" label slid down out of the paragraph gap and under the last
paragraph.

So the visible "watermark is covered in the PDF" report was really a
**letter-spacing → wrap count → column height → centered-watermark position**
chain reaction.

---

## How it was diagnosed

Measured the same things in both contexts with `eval_js`, always normalizing to
**design px** by dividing measured pixels by `scale = .ts-right width / 1275`
(so display zoom / canvas zoom cancels out):

- Computed `letter-spacing` on `.ts-ctx p`: **`-0.5px` on design, `normal` on
  print.** ← the smoking gun.
- Line pitch: 23.4px in both (line-height was never the issue).
- `.ts-center` height and `.ts-fieldwm svg` top/bottom: **taller & lower in
  print** until the fix.

Key lesson: normalize to design px before comparing, and don't trust a single
screenshot — the two preview panes sit at different display zooms, which *looks*
like a spacing difference even when the geometry is identical.

---

## The fix

Replicate exactly what the DesignCanvas card does, but in the spread's own
stylesheet so it is present in **both** contexts. One line on the spread root:

```css
.ts-spread {
  /* ...existing... */
  letter-spacing: -0.5px;   /* mirror the DesignCanvas .dc-card inherited tracking */
}
```

Because it is set at the root and `letter-spacing` inherits:
- every untracked Spectral element (prose **and** facts values) now tracks
  `-0.5px` in the PDF, matching the design page;
- elements with their own explicit tracking (Oswald/Space Mono labels in `em`,
  etc.) override it and are unaffected;
- the design page is unchanged — it already inherited `-0.5px` from the card, so
  adding the same value lower in the tree is a no-op there.

A narrower first attempt (putting `-0.5px` only on `.ts-ctx p`) fixed the prose
wrap but **not** the facts-column height, so the watermark still drifted. The
root-level rule is the complete fix. Avoid the tempting "just widen the columns"
fix — it changes the design page too (the columns there were already correct).

---

## Variants seen on other spreads

Same root cause (card `-0.5px` present on design, absent in print), different
surface symptom and different temp patch — all fixed the same way (root-level
`letter-spacing: -0.5px` on the spread root, delete the print-only patch):

- **Tiger Stadium** — untracked facts values grew in print → taller grid column
  → enlarged the vertically-centered field watermark, pushing "RF OVERHANG"
  under the last paragraph. (Original symptom: prose wrap changed.)
- **Mile High Stadium** — had a print-only `body.pp-mode … letter-spacing:
  -0.4px` patch on just the prose + finance value (approximate, incomplete).
  Replaced with the exact root `-0.5px`.
- **Yankee Stadium (1923)** — had a print-only `body.pp-mode .yk-ctx p {
  line-height: 17px }` patch. Here the prose sets its OWN explicit
  `letter-spacing: 0px`, so the card tracking never touched the prose — the
  divergence was entirely in the **siblings**: untracked facts/ribbon text grew
  in print and stole ~16px from the **flex-driven** prose box (`.yk-ctx` shrank
  213px → 197px), so 19.2px leading no longer fit and the author crammed it to
  17px. Root `-0.5px` restored the prose box to its design height (213px), so
  19.2px leading fits again and the line-height patch was deleted. The prose's
  explicit `0px` is untouched (its own look is preserved); only the siblings
  needed the tracking. Lesson: the symptom can be leading/overflow, not just
  wrapping — measure the flex container height, not only the text.

- **Tropicana Field** — untracked Spectral prose (`.tf-ctx-prose p`, no explicit
  tracking) tracked `-0.5px` on design but `normal` in print, so the two justified
  columns flowed ~2 lines apart at the column boundary. Instead of the root fix,
  it had been worked around with a **divergent embedded-photo height**
  (`.tf-ctx-photo` 305px on screen vs a `body.pp-mode … height: 204px` print-only
  override) to force both columns to bottom-align in each context. Replaced with
  root `letter-spacing: -0.5px` on `.tf-spread` and deleted the pp-mode height
  patch — a single 305px photo height now bottom-aligns both columns identically
  (~456px) in design and print. Lesson: a per-context geometry patch (different
  photo/box height in `pp-mode`) is the same bug wearing a disguise — the real
  cause is the tracking divergence, so fix it at the root and drop the patch.

- **Oracle Park** — the pure-sibling case. The context prose (`.op-ctx p`) sets
  its OWN explicit `letter-spacing: -0.7px`, so the prose was identical in both
  contexts (same column bottoms, same last line) — it looked clean. But the
  untracked Spectral **value cells** in the Visit game table (`.op-gtable .v` —
  matchup + pitching lines) and the ballpark-notes band (`.op-ngrid .nc .v` —
  finance note) inherited `-0.5px` on design / `normal` in print, so in print
  they ran wider and wrapped to an extra line each. That grew the game table
  (bottom 948.8 → 977.6) and pushed the notes band bottom **1041.6 → 1054.8px,
  4.3px past the 1050.5 safe-box bottom** — a print-only safe-area violation the
  design page never showed. Root `letter-spacing: -0.5px` on `.op-spread`
  restored the print line counts and module bottoms to the design values exactly
  (prose untouched — its explicit `-0.7px` overrides). Lesson: a spread whose
  prose sets its own tracking is NOT immune — sweep the untracked *data cells*
  and check module bottoms against the safe box, not just the prose wrap.

- **Safeco Field** — same disguise as Tropicana but on leading, not photo
  height. Untracked 3-column Spectral prose (`.tm-prose p`) tracked `-0.5px` on
  design / `normal` in print, so in print it ran wider and no longer fit its
  fixed-height `.tm-context` box at the design's 26.05px leading. It had been
  worked around with a print-only `body.pp-mode .tm-prose p { line-height: 24px }`
  patch (design kept 26.05px). Replaced with root `letter-spacing: -0.5px` on
  `.tm-spread` and deleted the pp-mode leading patch — print now fits at the full
  26.05px leading with all three columns bottom-aligning at 298px, identical to
  design (fact values `.tm-frow .v .vm` also snap back to `-0.5px`). The existing
  explicit direct-edit tracking overrides (`.tm-bay.b2 …`) are Oswald with their
  own values and are untouched. Lesson: a `pp-mode`-only line-height/leading
  patch is the same tell as a `pp-mode`-only box-height patch — tracking bug in
  disguise; fix at the root and drop the patch.

## Project-wide sweep (all spreads now mirror the card tracking)

A full sweep confirmed the bug class was latent in nearly every spread: only 6
carried the root mirror (Tiger, Mile High, Yankee 1923, Tropicana, Oracle,
Safeco). The remaining spreads set no root `letter-spacing`, so any untracked
text inherited `-0.5px` on the design page but `normal` in print. Fixed in bulk
by inserting `letter-spacing: -0.5px` into every spread's root rule (located via
its `width: 2550px`/`1275px` declaration and inserted right after the rule's
opening brace, matching the DesignCanvas `.dc-card` inline tracking). Because it
is a no-op on the already-validated design page and print can only get *tighter*
(fewer wraps, never more overflow), this is strictly safe-improving even on
spreads marked "done".

Two files did NOT need the CSS edit:
- **MLB Stadium Timeline** — pure SVG infographic; every `<text>` sets its own
  explicit `letterSpacing` attribute, so nothing is untracked. Immune.
- (Closing is a single 1275px page and DID get the mirror — it just wasn't caught
  by the 2550px search.)

Verified in print (`?print=1&page=right`) that tracking is `-0.5px` and the
deepest readable right-page text clears the 1050.5px safe-box bottom with zero
violations on a representative high-risk sample: Coors (matches design exactly),
Great American (1050.0), Citizens Bank Park (1046.3), Nationals (1046.0),
Comerica (1038.0), SunTrust (1048.0). Remaining multi-column-prose spreads (Citi,
Memorial, Milwaukee County, Royals) share the identical mechanism.

## Checklist for any other spread showing print≠design text

1. Compare `getComputedStyle(...).letterSpacing` on the same element in
   `?print=1&page=…` vs the design page. If it's `-0.5px` on design and
   `normal` on print, this is the bug.
2. Fix by adding `letter-spacing: -0.5px` to that spread's root
   (`.xxx-spread` / equivalent), **not** by editing widths or per-element.
3. Re-verify in design px: prose line breaks, `.center` column height, and any
   absolutely-centered watermark/figure bottom should match to ~0.1px.
4. Any future change to the DesignCanvas card's inline tracking must be mirrored
   here (or vice-versa) or this reopens.
