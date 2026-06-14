# Stadium Field Map

Use this fixed field map for every stadium spread.

Every non-empty, non-`n/a` value from the selected row of `all-stadium-pages.csv` must appear exactly once on the spread, except team color values may count as used through visual accents/swatches.

`stadium_name`, `city`, and `state` count as used in the left-page title overlay and should not repeat in the right-page Stadium Section.

`stadium_context` from `stadium-context.csv` must appear in full, verbatim, when a matching row exists. Facts mentioned inside Stadium Context do not count as duplicate structured CSV values.

## Stadium Section Fields

Assign these fields to the Stadium Section:

- `team_name`
- `league`
- `division`
- `opened`
- `years_active`
- `status`
- `renovations`
- `mlb_all_star_game_years`
- `capacity_opening`
- `capacity_current`
- `playing_surface_type`
- `surface`
- `architect`
- `facade_material`
- `architectural_style`
- `classification_era`
- `stadium_type`
- `roof_type`
- `name_history`
- `preceded_by`
- `succeeded_by`
- `elevation`
- `coordinates`
- `stadium_cost`
- `stadium_cost_adjusted`
- `financing_method`
- `address`
- `location_classification`
- `construction_start`
- `opening_day`
- `final_game`
- `demolition_year`
- `left_field_distance`
- `center_field_distance`
- `right_field_distance`
- `orientation`
- `orientation_degrees`
- `primary_home_team_color`
- `secondary_home_team_color`
- `home_team_accent_color`
- full `stadium_context` from `stadium-context.csv`

## Visit Section Fields

Assign these fields to the Visit Section:

- `visit_order`
- `visit_count`
- `first_visit_date`
- `featured_visit_day`
- `featured_visit_date`
- `featured_game_title`
- `other_visits`
- `trip_name`
- `home_team`
- `home_team_abbreviation`
- `away_team`
- `away_team_abbreviation`
- `game_result`
- `attendance`
- `start_time`
- `time_zone`
- `game_duration`
- `day_night`
- `home_starting_pitcher`
- `away_starting_pitcher`
- `winning_pitcher`
- `losing_pitcher`
- `save_pitcher`
- `innings_played`
- `temperature`
- `conditions`
- `wind`
- `humidity`

## Rendering Rules

Designed labels are allowed if exact values remain clear.

Use graphics where appropriate, but the underlying exact values must still be visible or visually represented exactly once.

If visit/game fields contain paired semicolon-separated values for two featured games, render two separate game blocks in the Visit Section: Game 1 and Game 2. Align paired values across date, result, attendance, time, duration, pitchers, weather, and related fields. Do not merge the two games into one combined block.
