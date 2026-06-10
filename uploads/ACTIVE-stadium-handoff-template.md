# Active Stadium Handoff Template

Use this compact template for each Claude Design request. The project's
`CLAUDE.md` is the authoritative source for dimensions, print safety, gutter
rules, export rules, visual constraints, and data fidelity — it loads
automatically, so you don't need to attach anything for those. This file just
captures the expected *shape* of each stadium request.

## New Stadium Spread Prompt

```text
Use the active project context.

Build the [STADIUM NAME] spread from the attached stadium brief and optional concept image.

Treat the brief/data as authoritative factual source. Treat the image as visual direction only for mood, hierarchy, composition, and art direction. Do not copy incorrect text or invented data from the image.

Create a finished print-ready two-page spread with:
- left-page full-bleed stadium hero and compact title block
- right-page Stadium Section and Visit Section
- all populated data preserved accurately
- no critical content in bleed or gutter
- no modules crossing the center split
- vector PDF print path preserved if this is a bound spread
```

## Revision Prompt

```text
Use the active project context.

Revise only [SECTION / COMPONENT / SPREAD AREA] of the [STADIUM NAME] spread:

[SHORT CHANGE LIST]

Keep the existing data, geometry, print sizing, safe areas, gutter rules, and export path unchanged. Do not redesign unrelated sections.
```

## Stadium Brief Shape

Use this shape when preparing a compact stadium-specific file:

```text
# [STADIUM NAME] Brief

## Goal
[One or two sentences describing the desired spread direction.]

## Required Data Source
[Paste the selected CSV row, current project data object, or exact values to preserve.]

## Featured Game / Visit Data
[Paste exact game, visit, weather, and score data. Omit if not applicable.]

## Historical Context
[Paste final approved context text. This is factual source text, not optional flavor.]

## Visual Direction
[Describe mood, composition, visual motifs, hero image treatment, team-color restraint, and any stadium-specific design ideas.]

## Assets
[List attached or existing assets by filename and how they should be used.]

## Must Preserve
[List any current spread elements, layouts, or decisions that should not change.]

## Known Risks
[Crowding, low-res source images, gutter-sensitive labels, data that often gets hallucinated, etc.]
```

## Ultra-Short Follow-Up Prompt

```text
Use the active project context and current [STADIUM NAME] spread. Make this change only: [CHANGE].
```
