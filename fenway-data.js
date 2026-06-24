/* Fenway Park — verbatim values from the user-provided Codex brief (Fenway Park).
   Local data only. Every populated structured value appears here exactly once and
   is rendered exactly once in the layout. Fields marked n/a / blank / not-applicable
   in the brief (Name History, Succeeded By, Closed Date, Final Game, Demolition,
   Other Visits, Save for the secondary game) are omitted. No facts are invented,
   normalized, or supplemented from memory or the concept image. */
window.FENWAY = {
  // ---- Identity (left-page title block) ----
  stadium_name: "Fenway Park",
  city: "Boston",
  state: "Massachusetts",
  years_active: "1912\u2013Present",

  // ---- Stadium Section ----
  team_name: "Boston Red Sox",
  team_abbr: "BOS",
  league: "American League",
  division: "AL East",
  address_l1: "4 Jersey Street",
  address_l2: "Boston, MA 02215",
  opened: "1912",
  status: "Active",
  architect: "James E. McLaughlin",
  classification_era: "Jewel Box & Early Concrete",
  architectural_style: "Jewel-box neighborhood ballpark",
  stadium_type: "Open-air neighborhood jewel-box ballpark",
  roof_type: "Open Air",
  surface_type: "Natural grass",
  surface: "Kentucky bluegrass",
  facade: "Red tapestry brick facade with concrete/stucco trim, green-painted steel, and concrete grandstand",
  capacity_opening: "27,000",
  capacity_current: "37,755",
  elevation: "20 ft",
  coordinates: "42.3464\u00b0 N, 71.0978\u00b0 W",
  cost_original: "$650k",
  cost_adjusted: "$21.7 million",
  financing: "Privately financed by owner John I. Taylor and the Fenway Realty Company",
  preceded_by: "Huntington Avenue Grounds",
  location: "Urban",
  construction_start: "Sep 25, 1911",
  opening_day: "Apr 20, 1912",
  all_star_years: "1946 \u00b7 1961 \u00b7 1999",

  // field geometry
  lf: "310",
  cf: "389",
  rf: "302",
  orientation: "NE",
  bearing: 45,

  // team colors (brief: Red, Navy Blue, White) — surfaced once as a small key
  team_colors: [
    { name: "Red", hex: "#BD3039" },
    { name: "Navy Blue", hex: "#0C2340" },
    { name: "White", hex: "#FFFFFF" }
  ],

  // Lifecycle / renovation timeline — condensed from the user-provided renovation
  // brief (long version pared to the key milestones per era; dates verbatim).
  lifecycle: [
    { era: "1912\u20131947", title: "Early Years & Reconstruction", items: [
      { yr: "1934", note: "Original wood structure replaced with steel and concrete, establishing the park\u2019s modern form." },
      { yr: "1947", note: "Permanent night-game lighting installed; the left-field wall adopts its green paint scheme." }
    ]},
    { era: "1976\u20132000", title: "Late-Century Tweaks", items: [
      { yr: "1988", note: "\u201c600 Club\u201d luxury seating and suites added above the grandstand behind home plate." }
    ]},
    { era: "2002\u2013Present", title: "Modernization", items: [
      { yr: "2003", note: "Green Monster Seats added atop the left-field wall." },
      { yr: "2006", note: "State Street Pavilion and additional roof-deck seating added above the grandstand." },
      { yr: "2010", note: "New center-field video board and expanded fan amenities beyond the bleachers." },
      { yr: "2017", note: "Dugouts repositioned forward to improve sightlines and create additional seating." },
      { yr: "2022", note: "Bleacher Overlook viewing platform added behind the right-field bleachers." }
    ]}
  ],

  // ---- Visit Section ----
  visit_no: 26,
  visit_count: 2,
  trip_name: "Boston",
  featured_game_title: "Group Visit",
  matchup: "Minnesota Twins at Boston Red Sox",

  // Two games of the visit — rendered as parallel, EQUAL-WEIGHT records.
  games: [
    {
      no: 1,
      day: "Friday",
      date: "Jul 22, 2016",
      home: "Boston Red Sox", home_abbr: "BOS",
      away: "Minnesota Twins", away_abbr: "MIN",
      result: "Twins 2, Red Sox 1",
      attendance: "37,001",
      first_pitch: "7:10 PM EDT",
      duration: "3:00",
      game_type: "Night",
      home_starter: "Eduardo Rodriguez",
      away_starter: "Kyle Gibson",
      wp: "Kyle Gibson",
      lp: "Eduardo Rodriguez",
      sv: "Brandon Kintzler",
      innings: 9,
      temp: "92\u00b0", conditions: "Cloudy", wind: "18 mph SW", humidity: "47%",
      line: {
        away: { abbr: "MIN", byInning: [0,1,0,0,0,1,0,0,0], r: 2, h: 10, e: 1 },
        home: { abbr: "BOS", byInning: [1,0,0,0,0,0,0,0,0], r: 1, h: 4, e: 1 }
      }
    },
    {
      no: 2,
      day: "Saturday",
      date: "Jul 23, 2016",
      home: "Boston Red Sox", home_abbr: "BOS",
      away: "Minnesota Twins", away_abbr: "MIN",
      result: "Twins 11, Red Sox 9",
      attendance: "37,600",
      first_pitch: "7:11 PM EDT",
      duration: "4:11",
      game_type: "Night",
      home_starter: "David Price",
      away_starter: "Ricky Nolasco",
      wp: "Ryan Pressly",
      lp: "Tom Layne",
      // sv: n/a for this game — omitted
      innings: 9,
      temp: "79\u00b0", conditions: "Cloudy", wind: "7 mph SW", humidity: "54%",
      line: {
        away: { abbr: "MIN", byInning: [1,3,0,0,0,1,5,1,0], r: 11, h: 19, e: 1 },
        home: { abbr: "BOS", byInning: [1,5,0,1,0,1,1,0,0], r: 9, h: 15, e: 1 }
      }
    }
  ],

  // ---- Stadium Context (verbatim, paragraph breaks preserved) ----
  stadium_context: [
    "Fenway Park survives as more than an old ballpark because it has never stopped being altered. Opened in 1912 after the Huntington Avenue Grounds, it gave the Red Sox a permanent home in Boston's urban fabric, but its long life has depended on constant adjustment. The park's identity comes from that tension: a jewel-box building whose constraints became treasured only because generations kept finding ways to work within them.",
    "The site shaped everything. Fenway was fitted into a dense city setting, where block dimensions, street edges, and limited land produced asymmetry rather than polish. The Green Monster, compact grandstand, and neighborhood enclosure were not originally museum pieces. They were practical responses to urban limits. Later stadium eras would try to reproduce that kind of character, but Fenway's character came from actual pressure.",
    "The 1934 rebuild and the long sequence of later changes to seats, the Monster, clubs, concourses, scoreboards, structure, accessibility, and preservation show how difficult survival has been. The park could not remain untouched and still function as an MLB venue. Every improvement has had to negotiate between old geometry and modern demands for revenue, comfort, safety, broadcast infrastructure, and player facilities.",
    "Fenway matters because it rewrites the usual replacement story. Most parks this old were demolished when they became inconvenient. Fenway became more valuable because of its inconvenience, then had to be carefully modernized so that value could be used. It is not important merely because it is old. It is important because it shows how an old ballpark can become a living constraint around which modern baseball continues to organize itself."
  ]
};
