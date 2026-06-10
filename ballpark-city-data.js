/* ballpark-city-data.js — content source-of-truth for the four-page
   editorial essay "THE BALLPARK AND THE CITY" (two two-page spreads).

   Manuscript prose is preserved VERBATIM from the source document
   "The Ballpark and the City." Only the self-referential closing sentence of
   the executive summary ("This report follows the anthology-style editorial
   brief…") is omitted as a production artifact. Pull quotes use exact phrases
   already present in the manuscript. Atlas / timeline rows distill facts that
   appear in the manuscript — no invented stadium facts. */
(function () {
  // ── era palette (muted; shared chroma) ──────────────────────────────────
  const ERA = {
    wooden: "#6E7A4F", // olive
    jewel: "#3F6075", // steel blue
    multi: "#8A8276", // concrete gray
    retro: "#9C3A28", // brick red
    district: "#4F6B57", // weathered green
  };

  // ── left-page outer-margin timeline (Spread 1) ──────────────────────────
  const TIMELINE = [
    { key: "wooden", dates: "1880s\u20131890s", name: ["WOODEN", "PARKS"], desc: "Timber grandstands, streetcar cities, intimate scale.", color: ERA.wooden, icon: "wooden" },
    { key: "jewel", dates: "1900s\u20131930s", name: ["JEWEL BOX", "ERA"], desc: "Concrete & steel, cantilevers, civic architecture.", color: ERA.jewel, icon: "jewel" },
    { key: "multi", dates: "1940s\u20131970s", name: ["MULTIPURPOSE", "ERA"], desc: "Automobiles, freeways, multi-use efficiency.", color: ERA.multi, icon: "multi" },
    { key: "retro", dates: "1990s\u20132000s", name: ["RETRO-CLASSIC", "ERA"], desc: "Asymmetry, brick, skyline, memory restored.", color: ERA.retro, icon: "retro" },
    { key: "district", dates: "2010s\u2013PRESENT", name: ["DISTRICT", "ERA"], desc: "Mixed-use districts, year-round revenue platforms.", color: ERA.district, icon: "district" },
  ];

  // ── manuscript prose, verbatim ───────────────────────────────────────────
  const EXEC = [
    "Major League Baseball stadium design has never been just about baseball. It has been about timber and fire, steel and cantilevers, parking lots and subways, bond counsel and boosterism, race and real estate, skyline views and municipal dreams. The long arc runs from combustible nineteenth-century enclosures embedded in the streetcar city, to the compact masonry parks later canonized as \u201cjewel boxes,\u201d to the circular multi-purpose bowls of the postwar freeway age, and then, in reaction, to the retro-classic urban ballparks of the 1990s and the mixed-use districts of the twenty-first century. Each era solved a problem created by the one before it, and each produced its own new dilemmas.",
    "The earliest parks were intimate because cities were dense, irregular because blocks were irregular, and perilous because wood was cheap and fire was common. The great early concrete-and-steel parks improved fire resistance, removed obstructed-view columns through cantilevering, and gave baseball a durable civic architecture. But after World War II, many owners and public officials embraced automotive access, suburban scale, and dual-use efficiency. The result was the age of the round, symmetrical, multi-purpose stadium: operationally flexible, visually bland, often acoustically harsh, and usually poor at making baseball feel like baseball.",
    "The retro-classic revolution, announced most forcefully by Oriole Park at Camden Yards in 1992, restored asymmetry, brick, skyline, and memory. Yet the deeper shift was not only aesthetic. Baseball also became a premium-seating business, then a district-development business. The modern ballpark is frequently less a standalone venue than a revenue platform knitted to offices, apartments, bars, hotels, digital ticketing systems, sponsorship programs, and tax structures. Public finance still matters, but it now coexists with naming rights, private debt, team-controlled real estate, and year-round event programming. Economists and policy analysts have repeatedly found that the promised public returns of stadium subsidies are often overstated, even as cities continue to use stadiums as redevelopment anchors.",
    "For fans, the story is equally double-edged. Sightlines improved dramatically from the obstructed colonnades of early parks to cantilevered decks and steep contemporary seating bowls. Concessions, club spaces, family zones, and social terraces multiplied. Accessibility standards under the ADA reshaped seating dispersion, companion seating, routes, and standing-spectator sightlines; protective netting expanded league-wide after severe fan injuries; digital ticketing and app-based ordering reorganized the ritual of entry itself. More sustainable materials and operating practices now sit alongside the older imperatives of spectacle and profit.",
  ];

  const WOODEN = [
    "In the beginning, the ballpark was less an object than an urban improvisation. These early parks belonged to the age of excursion trains, corner lots, and speculative growth. Their architecture was practical rather than monumental: timber grandstands, pitched roofs, narrow circulation, and ad hoc expansions driven by a sport whose popularity outpaced the durability of its buildings. They were intimate because they had to fit inside the city, and they felt close because the city pressed against them on all sides. They were also vulnerable. Fire did not merely threaten these parks; it repeatedly erased them, and that constant vulnerability became one of the central engines of baseball architecture.",
    "Baker Bowl in Philadelphia is the clearest architectural hinge. The original 1887 park was a celebrated wooden enclosure; after an 1894 fire, the rebuilt 1895 version was explicitly marketed as a safer successor, constructed primarily of steel and brick. The rebuild also used cantilevering in ways that reduced the support columns that had long produced obstructed seats. Here, in one Philadelphia park, baseball architecture moved from combustible pavilion to proto-modern structure. The motive was not pure aesthetics. It was insurance, crowd management, durability, and the growing understanding that spectators would pay for a better view if the building could provide one.",
    "The Polo Grounds tell the same story in a different key. The 1890 park grew by accretion, with bleachers pushing outward and inward in ways that made its famous \u201cbathtub\u201d geometry feel less designed than evolved. Then came the 1911 fire, and with it the concrete-and-steel reconstruction associated with Henry B. Herts. The rebuilt Polo Grounds preserved the site\u2019s peculiar profile while translating it into a more permanent material language. What mattered was not just that baseball was modernizing. What mattered was that it could not any longer afford to remain temporary.",
    "A third emblem of the wooden era, though less completely documented in readily accessible surviving architectural records, is Boston\u2019s South End Grounds, repeatedly rebuilt and reconfigured in the 1880s and 1890s. It stands in baseball memory as a representative urban timber park: close to the city, porous to the neighborhood, and structurally vulnerable. For the oldest generation of parks, exact architectural attributions are often thinner and less stable than they are for twentieth-century stadiums, which is itself part of the historical record: baseball\u2019s earliest architecture often vanished faster than the sport\u2019s legends.",
  ];

  const JEWEL = [
    "If the wooden parks were improvisations, the jewel boxes were declarations. They announced that baseball deserved durable civic architecture: masonry walls, steel framing, layered decks, and an urban presence approaching the dignity of a courthouse, theater, or railway terminal. They were still fitted to city blocks, which is why they remained asymmetrical and local in character. But they were now designed to look finished. That finish mattered. It lent the game a permanence equal to its ambition.",
    "Fenway Park, Wrigley Field, and the original Yankee Stadium reveal the range of the type. Fenway, with James McLaughlin as chief architect and Osborn Engineering handling civil engineering, transformed an awkward Boston site into a durable steel-and-concrete park whose idiosyncrasies became virtues. Wrigley, designed by Zachary Taylor Davis, carried the urban ballpark into Chicago\u2019s North Side with a similarly durable but neighborhood-scaled presence. Yankee Stadium, by contrast, inflated the form to imperial scale. The Society for American Baseball Research (SABR) describes it as America\u2019s first modern ballpark: triple-decked, consciously monumental, and intended from the outset as more than a baseball enclosure. The jewel box, in other words, could be either intimate or grand, but it was now made to last.",
    "This era also gave baseball many of its most enduring aesthetic devices: the brick and terra-cotta city face, the ornamental frieze, the hand-operated scoreboard, the irregular wall, the peculiar outfield angle that turned a surveying problem into a baseball signature. The fan experience improved materially. Cantilevering and steel framing reduced obstructed seats. Vertical layering intensified sightlines. Yet these parks still encoded hierarchy visibly: boxes, pavilions, bleachers, and different urban entrances sorted the public into social bands as much as they organized circulation.",
  ];

  const CONCRETE = [
    "Then America changed its transportation habits, its land economics, and its architectural ambitions. The postwar stadium no longer had to fit a trolley-served city block. It could sit amid freeways and parking fields, funded by metropolitan optimism and defended by the language of efficiency. It could host baseball in summer, football in autumn, concerts and conventions in between. That was the promise: one structure, many uses, maximum throughput. Baseball, which had spent half a century refining urban specificity, was invited to become generic.",
    "Dodger Stadium, opened in 1962, is the elegant exception that proves the rule. Privately financed and designed by Walter O\u2019Malley with Emil Praeger and support from Edward Fickett, it was baseball-only, yet unmistakably a product of the automobile metropolis. Its great innovation was logistical as much as formal: each entry at grade, from top deck to field level, a feat of earthwork and circulation planning unmatched in most American parks. It is modernist not because it is abstract, but because it assumes a landscape of ramps, cars, broad terraces, and sunshine. In Los Angeles, baseball became inseparable from the parking lot.",
    "The Astrodome carried the modernist impulse into pure technological theater. The National Register nomination calls it the first enclosed and air-conditioned sports stadium, a feat of engineering in which visibility, light, and acoustics were not afterthoughts but primary design problems. Its Lucite roof initially admitted sunlight for natural grass; glare forced corrective painting; the reduced light killed the grass; AstroTurf followed. A whole branch of sports architecture can be read as a sequence of consequences set off by that one Houston experiment. The dome also required major acoustic treatment, demonstrating that enclosure changed not only weather, but the sound of sport itself.",
    "Riverfront Stadium in Cincinnati translated the idea into the cookie-cutter civic bowl: circular, convertible, turf-covered, and city-owned. The Reds note that it seated roughly 56,000 when it opened and was considered state-of-the-art; the design literature and later histories emphasize AstroTurf, football reconfiguration, and the increasingly standardized spectator experience of the era. Such parks simplified maintenance, maximized event flexibility, and pleased municipal accountants. They also thinned baseball\u2019s local character. A ball hit in Cincinnati began to feel much like a ball hit in Pittsburgh or Philadelphia because the buildings had begun to resemble one another.",
  ];

  const RETRO = [
    "By the late twentieth century, baseball had grown tired of abstraction. Fans, owners, and designers wanted buildings that looked like baseball sounded in memory: brick, steel, asymmetry, compressed sightlines, skyline views, real grass, local references. Oriole Park at Camden Yards did not invent nostalgia, but it did professionalize it. Populous notes plainly that its arrival came after decades in which the MLB experience was dominated by facilities serving more than one sport. SAH Archipedia, the authoritative, peer-reviewed online encyclopedia dedicated to the history of the US built environment goes further: Camden Yards directly inspired the host of retro-style urban ballparks that followed.",
    "Camden Yards mattered because it yoked aesthetics to urbanism. Its brick language and the looming B&O Warehouse made the ballpark feel discovered rather than dropped in from elsewhere. Its success also demonstrated that baseball-specific design could be sold not as sentimentality, but as strategy: better views, a more premium product, stronger identity, and a redevelopment story broad enough to satisfy elected officials. The park\u2019s current reinvestment cycle, financed through state-backed bonds, shows that even \u201cclassic\u201d parks quickly enter the maintenance-and-upgrade logic of contemporary sports business.",
    "Oracle Park and PNC Park refined the model. In San Francisco, Populous and the Giants exploited the waterfront site so thoroughly that the bay itself became part of the ballpark drama. The Giants\u2019 own history stresses mass transit, private financing, and the building\u2019s classic design. In Pittsburgh, Populous framed the Allegheny and skyline so well that the view turned into an argument for the whole typology. These parks were still nostalgic in material language, but they were modern in revenue logic: naming rights, premium seating, sponsorships, digital systems, and highly choreographed fan circulation. Retro-classic form, in practice, was compatible with increasingly sophisticated sports capitalism.",
  ];

  const DISTRICT = [
    "The newest MLB ballpark is often not a ballpark at all, at least not in the old sense. It is an anchor tenant in a larger development ecology. Its architecture must serve baseball, but also brand a neighborhood, support real-estate value, host non-game events, and justify financing packages built from taxes, fees, land deals, naming rights, premium inventory, and sponsor integration. The contemporary ballpark is both stage and platform.",
    "Petco Park anticipated this condition with unusual clarity. Populous, working with Antoine Predock, shaped the stadium around San Diego metaphors of canyons, coasts, and cliffs; a case study by the Urban Land Institute shows that the project was bound from the outset to neighborhood-scale redevelopment in East Village. The city\u2019s financing and governance documents reveal how carefully the public-private relationship was engineered. Petco was not only a ballpark \u201cSan Diego style.\u201d It was a redevelopment instrument dressed as one.",
    "Nationals Park made the ballpark\u2019s environmental and district-making ambitions explicit. The club describes it as the nation\u2019s first major professional stadium to earn LEED Silver certification, while the U.S. Green Building Council identifies it as the first MLB stadium to receive LEED certification of any kind. Its civic ambition was just as visible in the financing: the District\u2019s CFO records a 2006 sale of $534.8 million in ballpark revenue bonds to help build the park.",
    "The site made the development logic plain. Built at the base of South Capitol Street along the Anacostia waterfront, Nationals Park was planned not only as a venue but as an anchor for surrounding residential, hotel, office, and retail growth. That transformation came, but it also raised the familiar question behind stadium-led redevelopment: when a ballpark helps remake a neighborhood, who shares in the appreciation, and who gets priced out of the place newly made valuable?",
    "Truist Park and The Battery Atlanta pushed the model further by designing ballpark and district as a single commercial proposition. Populous describes a park meant to serve everyone from devoted baseball traditionalists to casual social crowds; The Battery markets itself as an all-year destination and describes the surrounding development as a curated mixed-use environment anchored by the Braves. The logic is unmistakable: if the old downtown ballpark needed the city around it, the new district ballpark tries to own as much of the city around it as possible.",
    "Globe Life Field, designed by HKS, adds another chapter in the old American baseball argument with climate. HKS presented it as a contemporary park that could deliver game-day experiences previously impossible in North Texas heat; Arlington\u2019s municipal documents show that local taxes approved by voters fund the city\u2019s contribution and position the park within an entertainment-district strategy rather than as an isolated venue. In that sense, Globe Life Field is the Astrodome\u2019s educated descendant: climate control without abandoning the theatrical textures of the contemporary ballpark.",
  ];

  const ATLAS_PROSE = [
    "The material history of the MLB ballpark can be read almost as a sequence of technical substitutions. Wood gave way to steel and brick for fire resistance. Steel-and-concrete frames made larger spans and cantilevered decks possible, improving sightlines by reducing or eliminating columns. Domes and retractable roofs reframed weather from fate into mechanical problem-solving. Artificial turf, born of the Astrodome\u2019s roof-glare and dying-grass crisis, later spread through the multi-purpose era before baseball\u2019s renewed preference for natural grass reasserted itself in retro-classic parks. In the sustainability era, LEED certification, operational retrofits, and climate commitments joined the design brief. Nationals Park was the first MLB stadium to earn LEED certification; Oracle Park later received LEED Silver for Existing Buildings; the Yankees now frame sustainability initiatives as an operational identity rather than a decorative add-on.",
    "The economics changed just as radically. Early ballparks were often owner-built. The late twentieth century normalized public authority ownership, tax-supported bonds, and the use of stadium districts as urban policy theater. Brookings and later tax-policy work found that sports subsidies frequently fail to deliver the broad economic windfalls promised by their backers, even as cities continue to use them as anchors for redevelopment or retention. At the same time, new revenue forms transformed the pro forma: naming rights at places like Riverfront/Cinergy, PNC Park, and Oracle Park; premium seating and clubs; integrated retail districts; and, in San Francisco and Atlanta especially, the increasing fusion of baseball revenue with adjacent real estate.",
    "The fan\u2019s bodily experience also became a formal design category. The ADA and its implementing standards require dispersed wheelchair seating, companion seats, accessible routes, and sightlines over standing spectators in assembly venues such as stadiums. Those rules reshaped seating bowls and concourse planning. Fan safety changed too: following repeated foul-ball injuries, all 30 MLB clubs extended netting beyond the minimal home-plate configuration, and many pushed it much farther. Meanwhile, the MLB Ballpark app turned digital ticketing, mobile check-in, and app-based services into ordinary components of the modern stadium visit. The contemporary ballpark is therefore not merely designed in concrete and steel; it is also designed in code, policy, and liability.",
  ];

  const CONCLUSION = [
    "What remains beyond dispute is the larger architectural history. Baseball stadiums evolved from combustible urban pavilions into civic masonry icons, then into infrastructural machines, then into self-conscious memory palaces, and finally into district-scale real-estate engines. Each generation rebuilt the ballpark around its own idea of the city: streetcar neighborhoods, highway access, public authority, private revenue, downtown revival, climate control, digital entry, and year-round development.",
    "But the ballpark has never been only an argument about architecture. It is also one of the places where families learn how time moves. Fathers bring sons through turnstiles; sons grow old enough to bring fathers back. A child remembers the first impossible green of the field, the height of the upper deck, the sound of a crowd rising before he understands why. Years later, the same memory returns through a different gate, in a different city, under a different corporate name, with the old park gone and the game somehow still waiting.",
    "The game itself offers the illusion of permanence. Sixty feet six inches from mound to plate. Ninety feet between bases. A diamond fixed in the middle of an ever-changing civic argument. Around it, nearly everything has shifted: grandstands, roofs, scoreboards, concourses, parking lots, transit lines, luxury clubs, skylines. The field remembers continuity; the ballpark records change. And somewhere between them, across all the miles and summers, the game keeps carrying us back to the people who first taught us where to look.",
  ];

  // ── pull quotes (exact manuscript phrases) ───────────────────────────────
  const QUOTES = {
    wooden: "The earliest parks were intimate because cities were dense, irregular because blocks were irregular, and perilous because wood was cheap and fire was common.",
    retro: "Oriole Park at Camden Yards did not invent nostalgia, but it did professionalize it.",
    close: "The game still begins with sixty feet six inches between mound and plate.",
  };

  // ── image figures (user-filled slots) ────────────────────────────────────
  const FIGS = {
    bakerBowl: { id: "bp-baker-bowl", title: "BAKER BOWL, PHILADELPHIA", meta: "c. 1895 \u00b7 John D. Allen", caption: "Rebuilt after an 1894 fire, this steel-and-brick park introduced cantilevering to reduce obstructed seats.", kind: "photo" },
    poloGrounds: { id: "bp-polo-grounds", title: "THE POLO GROUNDS, NEW YORK", meta: "c. 1911 \u00b7 Henry B. Herts", caption: "After a 1911 fire, a concrete-and-steel reconstruction preserved the site\u2019s peculiar \u201cbathtub\u201d profile.", kind: "photo" },
    fenway: { id: "bp-fenway-plan", title: "FENWAY PARK, BOSTON", meta: "1912 \u00b7 James E. McLaughlin", caption: "Asymmetrical geometry, tight to the street grid.", kind: "plan" },
    wrigley: { id: "bp-wrigley-plan", title: "WRIGLEY FIELD, CHICAGO", meta: "1914 \u00b7 Zachary Taylor Davis", caption: "Neighborhood streets define the jewel box.", kind: "plan" },
    dodger: { id: "bp-dodger-aerial", title: "DODGER STADIUM, LOS ANGELES", meta: "1962 \u00b7 O\u2019Malley & Praeger", caption: "Every entry at grade \u2014 a baseball-only bowl engineered for the freeway city and the parking lot.", kind: "photo" },
    astrodome: { id: "bp-astrodome", title: "ASTRODOME, HOUSTON", meta: "1965 \u00b7 Lloyd & Morgan", caption: "The first enclosed, air-conditioned stadium; its roof-glare crisis is what produced AstroTurf.", kind: "photo" },
    camden: { id: "bp-camden", title: "ORIOLE PARK AT CAMDEN YARDS", meta: "1992 \u00b7 HOK Sport / Populous", caption: "Brick and the looming B&O Warehouse made the ballpark feel discovered, not dropped in.", kind: "photo" },
    district: { id: "bp-district-aerial", title: "THE BATTERY ATLANTA / TRUIST PARK", meta: "2017 \u00b7 Populous", caption: "Ballpark and district designed as one commercial proposition \u2014 a year-round mixed-use anchor.", kind: "photo" },
    southEnd: { id: "bp-south-end", title: "SOUTH END GROUNDS, BOSTON", meta: "1890s \u00b7 timber era", caption: "A representative urban timber park \u2014 porous to the neighborhood.", kind: "photo" },
    yankee: { id: "bp-yankee-1923", title: "YANKEE STADIUM, BRONX", meta: "1923 \u00b7 Osborn Eng.", caption: "The triple-decked giant SABR calls baseball\u2019s first modern ballpark.", kind: "photo" },
  };

  // ── "Ballpark evolution at a glance" comparison ──────────────────────────
  const ATLAS = {
    cols: ["ERA", "REPRESENTATIVE PARKS", "PLANNING LOGIC", "PRIMARY ACCESS", "DEFINING TRAIT"],
    rows: [
      { color: ERA.wooden, era: "Wooden Parks", years: "1880s\u201390s", parks: "Baker Bowl \u00b7 Polo Grounds", logic: "Fit the irregular city block", access: "Streetcar & excursion train", trait: "Timber grandstands; fire-prone" },
      { color: ERA.jewel, era: "Jewel Boxes", years: "1910s\u201320s", parks: "Fenway \u00b7 Wrigley \u00b7 Yankee Stadium", logic: "Durable civic permanence", access: "Streetcar & subway", trait: "Steel & masonry; site-driven asymmetry" },
      { color: ERA.multi, era: "Multi-Purpose", years: "1960s\u201370s", parks: "Dodger \u00b7 Astrodome \u00b7 Riverfront", logic: "Dual-use efficiency", access: "Automobile & freeway", trait: "Circular bowl; turf and parking" },
      { color: ERA.retro, era: "Retro-Classic", years: "1990s\u20132000s", parks: "Camden Yards \u00b7 Oracle \u00b7 PNC", logic: "Urban specificity restored", access: "Transit + revived downtown", trait: "Brick, skyline views, real grass" },
      { color: ERA.district, era: "District", years: "2000s\u2013now", parks: "Petco \u00b7 Nationals \u00b7 Truist \u00b7 Globe Life", logic: "Real-estate revenue platform", access: "Multimodal + mixed-use", trait: "Year-round mixed-use anchor" },
    ],
  };

  // ── "Forces that shaped the modern ballpark" (compact tag set) ───────────
  const FORCES = [
    "Fire safety", "Steel construction", "Transit", "Automobiles", "Parking",
    "Public finance", "Premium seating", "Accessibility (ADA)", "Digital ticketing",
    "Sustainability", "Naming rights", "Mixed-use development",
  ];

  // ── "Systems Beneath the Skyline" — sidebar module (distilled from the
  //    comparative-atlas passage; supporting context, not a second essay) ──
  const SYSTEMS = {
    kicker: "BEYOND BRICK AND STEEL",
    title: ["THE SYSTEMS THAT REMADE", "THE BALLPARK"],
    standfirst: "Beyond the visible shift from neighborhood park to stadium district, the ballpark was also remade by quieter systems: materials, finance, access, safety, and software.",
    items: [
      { icon: "materials", label: "FIRE, STEEL & SPANS", body: "Wooden parks burned; steel, brick, and concrete made larger decks, safer structures, and column-free sightlines possible. Later roofs, domes, artificial turf, and sustainability standards extended the material brief from durability to environmental control." },
      { icon: "money", label: "BONDS, RIGHTS & REAL ESTATE", body: "The ballpark moved from owner-built structure to public-finance project and revenue platform. Tax-supported bonds, naming rights, premium clubs, sponsorships, and adjacent real estate reshaped what a stadium had to earn." },
      { icon: "access", label: "ROUTES, SEATS & SIGHTLINES", body: "Accessibility became part of the building form. ADA seating, companion seats, accessible routes, wider concourses, and sightlines over standing spectators changed the way bowls and circulation systems were planned." },
      { icon: "risk", label: "NETTING, APPS & LIABILITY", body: "The modern visit is shaped by safety and software as much as concrete. Extended foul-ball netting, digital ticketing, app-based entry, mobile ordering, and risk management made code, policy, and liability part of stadium design." },
    ],
  };

  window.BallparkCityData = {
    ERA, TIMELINE, QUOTES, FIGS, ATLAS, FORCES, SYSTEMS,
    EXEC, WOODEN, JEWEL, CONCRETE, RETRO, DISTRICT, ATLAS_PROSE, CONCLUSION,
    META: {
      title: ["THE BALLPARK", "AND THE CITY"],
      deck: "How Major League ballparks evolved from dense, fire-prone neighborhood parks into civic masonry icons, multi-purpose bowls, retro-classic urban rooms, and the mixed-use entertainment districts of today.",
      runningHead: "THE BALLPARK AND THE CITY",
      chapter: "AN ARCHITECTURAL HISTORY OF BASEBALL, TOLD THROUGH URBAN FORM",
    },
  };
})();
