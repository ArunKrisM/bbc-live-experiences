/* ==========================================================================
   BBC Sport — Live Experiences prototype
   Content model. Everything the app renders comes from here.

   Four events across four sports, each with its own lifecycle states and its
   own tab set. Home ranks them against each other.

   Opta field names follow the F24 spec as documented in
   github.com/withqwerty/football-docs. Cricket, tennis and rugby schemas are
   extrapolated from the same patterns and need validating against real feeds.

   Scores, votes, ratings and fan counts are illustrative.
   ========================================================================== */

/* =========================================================================
   FOOTBALL — England v Netherlands, UEFA Nations League, Wembley
   ========================================================================= */

const MOMENTS = [
  {
    id: "live", chip: "Live",
    label: "Netherlands in possession",
    sub: "De Jong carries the ball through midfield",
    attacking: "ENGLAND ATTACKING",
    ball: [50, 32], path: "M 62 30 L 56 31 L 50 32",
    home: [[7,32],[24,12],[22,25],[22,39],[24,52],[40,20],[44,32],[40,44],[58,14],[60,32],[58,50]],
    away: [[93,32],[74,13],[72,26],[72,38],[74,51],[56,22],[50,32],[56,42],[36,15],[34,32],[36,49]]
  },
  {
    id: "goal", chip: "52' Goal",
    label: "Saka fires England ahead",
    sub: "Cuts inside from the right and finds the far corner",
    attacking: "ENGLAND ATTACKING",
    ball: [88, 22], path: "M 62 48 L 71 40 L 80 30 L 88 22",
    home: [[10,32],[45,12],[43,25],[43,39],[45,52],[62,20],[64,34],[66,46],[82,16],[88,22],[84,44]],
    away: [[96,32],[88,18],[87,28],[87,38],[88,48],[74,20],[72,32],[74,44],[56,22],[54,32],[56,42]]
  },
  {
    id: "chance", chip: "64' Chance",
    label: "Pickford denies Simons",
    sub: "Netherlands' best opening of the half",
    attacking: "NETHERLANDS ATTACKING",
    ball: [16, 36], path: "M 34 26 L 26 30 L 16 36",
    home: [[6,32],[15,14],[14,26],[14,38],[15,50],[28,20],[30,33],[28,46],[44,18],[46,34],[44,48]],
    away: [[90,32],[40,12],[38,26],[38,40],[40,52],[26,20],[24,44],[30,32],[18,20],[16,36],[20,46]]
  }
];


/* =========================================================================
   Your daily drop — the shorts deck. Every rail is a window onto this.
   ========================================================================= */

const DROP = [
  /* ten cards, all made for the vertical feed. Match photography lives on
     Home, where a still picture is doing the work; these are the things
     people actually swipe through. 0-1 cricket, 2-4 tennis, 5-7 football,
     8-9 rugby */
  { t: "England given hope for Lord's", dur: "0:48", sport: "Cricket", chan: "BBC Cricket", handle: "bbccricket",
    cap: "An Australian who has seen a lot of England sides thinks this one has turned a corner since Perth.",
    tags: ["Ashes", "Build-up"], likes: "5.2k", comments: "731", img: "ck-hope", baked: true, motif: "oval", g: ["#1B3A22", "#08170E"] },
  { t: "It has been a while", dur: "0:41", sport: "Cricket", chan: "Test Match Special", handle: "bbctms",
    cap: "The moment the TMS box stopped pretending to be neutral. Listen to the full call on Sounds.",
    tags: ["Ashes", "TMS"], likes: "14k", comments: "2.2k", img: "ck-tms", baked: true, motif: "oval", g: ["#1F3A4A", "#0A1319"], audio: true },

  { t: "Secret talent?", dur: "0:34", sport: "Tennis", chan: "BBC Sport", handle: "bbcsport",
    cap: "Not the answer anyone in the room was expecting.",
    tags: ["Wimbledon", "Off court"], likes: "11k", comments: "1.6k", img: "tn-secret", baked: true, motif: "court", g: ["#22461F", "#0C1A0B"] },
  { t: "The challenge that did not go to plan", dur: "0:36", sport: "Tennis", chan: "BBC Sport", handle: "bbcsport",
    cap: "She has beaten the best in the world. This, she could not do.",
    tags: ["Wimbledon", "Off court"], likes: "7.4k", comments: "988", img: "tn-challenge", baked: true, motif: "court", g: ["#2A3A22", "#101608"] },
  { t: "What she is reading this fortnight", dur: "0:52", sport: "Tennis", chan: "BBC Sport", handle: "bbcsport",
    cap: "Three books, two weeks, and a straight face throughout.",
    tags: ["Wimbledon", "Off court"], likes: "5.6k", comments: "744", img: "tn-books", baked: true, motif: "court", g: ["#3A2A14", "#170F06"] },

  { t: "Palmer or Trent: who starts tonight?", dur: "0:58", sport: "Football", chan: "BBC Sport", handle: "bbcsport",
    cap: "One shape needs a right-back who can cross. The other needs a ten who can finish.",
    tags: ["England", "Team news"], likes: "9.4k", comments: "3.3k", img: "fb-debate", motif: "pitch", g: ["#1B3A22", "#08170E"] },
  { t: "Why Tuchel fits England", dur: "1:41", sport: "Football", chan: "BBC Sport", handle: "bbcsport",
    cap: "Two years in, and the argument that seemed strange in 2025 looks obvious now.",
    tags: ["England", "Analysis"], likes: "11k", comments: "2.6k", img: "fb-tuchel", baked: true, motif: "pitch", g: ["#24384B", "#0B1219"] },
  { t: "Bellingham owned the second half", dur: "1:12", sport: "Football", chan: "BBC Sport", handle: "bbcsport",
    cap: "Eleven touches in the box after the break. Nobody else managed four.",
    tags: ["England", "Player of the match"], likes: "21k", comments: "4.2k", img: "fb-bellingham", motif: "pitch", g: ["#123D22", "#071A0E"] },

  { t: "Wales, three days out", dur: "0:44", sport: "Rugby Union", chan: "BBC Sport Wales", handle: "bbcsportwales",
    cap: "One win in five since the autumn. Cardiff has been quiet all week.",
    tags: ["Six Nations", "Wales"], likes: "3.9k", comments: "870", img: "rg-wales", motif: "pitch", g: ["#22314A", "#0C121C"] },
  { t: "The fourth try, with a minute left", dur: "0:33", sport: "Rugby Union", chan: "BBC Sport", handle: "bbcsport",
    cap: "Held up twice, then over. The bonus point and the title race both turn on it.",
    tags: ["Six Nations", "Bonus point"], likes: "8.1k", comments: "1.5k", img: "rg-roar", motif: "pitch", g: ["#22314A", "#0C121C"] },

  /* 10: cricket, after the close. 11: the archive, for the centenary */
  { t: "The captain on the batting order", dur: "0:39", sport: "Cricket", chan: "BBC Cricket", handle: "bbccricket",
    cap: "The morning after, on the call that everyone had an opinion about. Listen to the full interview on Sounds.",
    tags: ["Ashes", "Interview"], likes: "9.8k", comments: "1.9k", img: "ck-carse", baked: true, motif: "oval", g: ["#1B3A22", "#08170E"], audio: true },
  { t: "1937: the first pictures from Wimbledon", dur: "1:05", sport: "Tennis", chan: "BBC Archive", handle: "bbcarchive",
    cap: "Three outside broadcast vans, one camera, and about twenty-five minutes of tennis a day. The start of the habit.",
    tags: ["Wimbledon", "100 years"], likes: "6.1k", comments: "402", img: "ar-debut", baked: true, motif: "court", g: ["#2A3A22", "#101608"] }
];

const SHORTS_LIVE = { t: "shorts", label: "Your daily drop", deck: [1, 2, 11, 9, 5, 3] };

const FEED_FOOTBALL = { t: "feed", author: "Written by Emma Sanders and Phil McNulty at Wembley", posts: [
  ["67 mins", "Saka goes close again", "Drifts inside off the right and curls one towards the far corner. Verbruggen tips it over.", false],
  ["66 mins", "England seeing more of the ball", "The hosts are beginning to control the tempo. Rice switches play towards Saka on the right.", false],
  ["64 mins", "GREAT SAVE", "Xavi Simons finds space inside the area, but Pickford gets down sharply to his left.", true],
  ["61 mins", "Corner count climbing", "Six England corners in twelve minutes. Netherlands cannot get out.", false],
  ["52 mins", "GOAL! England 1-0 Netherlands", "Saka cuts in from the right and bends it beyond Verbruggen. Wembley is up.", true]
]};

const XI_ENG = [
  [1, "Pickford", "GK"], [2, "Walker", "RB"], [5, "Stones", "CB"], [6, "Guéhi", "CB"],
  [3, "Lewis-Skelly", "LB"], [4, "Rice", "CM"], [8, "Mainoo", "CM"], [7, "Saka", "RW"],
  [10, "Bellingham", "AM"], [11, "Foden", "LW"], [9, "Kane", "ST"]
];
const XI_NED = [
  [1, "Verbruggen", "GK"], [2, "Geertruida", "RB"], [4, "Van Dijk", "CB"], [3, "De Vrij", "CB"],
  [5, "Aké", "LB"], [6, "De Jong", "CM"], [8, "Reijnders", "CM"], [7, "Xavi Simons", "AM"],
  [11, "Gakpo", "LW"], [10, "Malen", "RW"], [9, "Weghorst", "ST"]
];

/* =========================================================================
   The events
   ========================================================================= */

const EVENTS = [

  /* ------------------------------------------------------------------ */
  /* FOOTBALL                                                            */
  /* ------------------------------------------------------------------ */
  {
    id: "football",
    audio: { station: "BBC Radio 5 Live", prog: "England v Netherlands - Nations League" },
    sport: "Football",
    photo: { motif: "pitch", g: ["#123D22", "#071A0E"] },
    comp: "UEFA Nations League",
    title: "England v Netherlands",
    venue: "Wembley",
    accent: "#FFD230",

    /* the immersive Home takeover: a scoreline and three comparisons,
       one set per lifecycle state */
    takeover: {
      a: "England", b: "Netherlands", ca: "#C8102E", cb: "#F26D1B",
      buildup: { img: "fb-palmer", line: "19:45", sub: "Wembley · live on BBC One",
        stats: [["Wins in last 5", 3, 2], ["Goals scored", 11, 9], ["Clean sheets", 2, 1]],
        cta: "Open the build-up" },
      live: { img: "fb-kane", line: "1 – 0", sub: "67:57 · Saka 52'",
        stats: [["Shots", 14, 6], ["Possession %", 58, 42], ["Expected goals", 1.9, 0.7]],
        cta: "Open the live experience" },
      companion: { img: "fb-celebrate", line: "1 – 0", sub: "Paired with BBC One · held back 23s",
        stats: [["Shots", 14, 6], ["Possession %", 58, 42], ["Expected goals", 1.9, 0.7]],
        cta: "Follow it on your phone" },
      fulltime: { img: "fb-highlights", line: "2 – 1", sub: "Full time · Saka 52', Kane 79'",
        stats: [["Shots", 19, 11], ["Possession %", 55, 45], ["Expected goals", 2.4, 1.3]],
        cta: "Highlights and how your night went" }
    },

    states: {

      buildup: {
        chip: "Today 19:45", state: "Team news at 18:45. England unchanged from Thursday.",
        card: { status: "soon", when: "19:45 · BBC One", line1: "England v Netherlands", line2: "Nations League · Wembley",
          ctx: "England have scored first in 4 of the last 5 meetings and won 2", sig: 0.41 },
        head: { kind: "teams", status: { kind: "pre", text: "Kick-off tonight", beat: true },
          centre: { big: "19:45", sub: "Wembley", small: true },
          home: { code: "ENG", name: "England", sub: "W W D W L" },
          away: { code: "NED", name: "Netherlands", sub: "W D W W W" } },
        tabs: [
          { id: "preview", label: "Preview", sections: [
            { panels: [
              { t: "countdown", h: 1, m: 58, s: 42 },
              { t: "toggle", id: "remind", label: "Remind me at kick-off", on: "Reminder set",
                off: "One notification, 10 minutes before. Nothing else.",
                onNote: "We'll nudge you at 19:35. 612,000 fans have a reminder on this fixture." }
            ]},
            { h: "One thing to watch for", meta: "BBC Sport", panels: [
              { t: "storyline", kicker: "The tactical angle",
                body: "Netherlands have conceded six of their last nine goals from crosses into the six-yard box. Saka has delivered more of those than any England player this cycle. Watch the far post." }
            ]},
            { h: "Watch: Build-up", meta: "Swipe for more", panels: [{ t: "shorts", label: "Build-up", deck: [5, 6, 0] }]},
            { h: "The numbers", meta: "Opta", panels: [
              { t: "kv", items: [["At Wembley", "W4", "of last 5"], ["Both scored", "7", "of last 8"], ["Avg goals", "3.1", "this fixture"]] },
              { t: "note", body: "England have scored first in four of the last five meetings and won only two of them." }
            ]}
          ]},
          { id: "predict", label: "Predict", sections: [
            { h: "Predict the score", meta: "41,882 in", ruleY: true, panels: [{ t: "predict" }] },
            { h: "First goalscorer", panels: [{ t: "poll", id: "fb-scorer", q: "Who opens the scoring?",
              opts: ["Kane", "Saka", "Gakpo", "No-one"], split: [44, 23, 19, 14],
              tally: "Tap to see how the country has voted.",
              after: "Result lands the moment the first goal goes in." }]},
            { h: "Your Predictor season", meta: "Week 6", panels: [{ t: "league" }] }
          ]},
          { id: "form", label: "Form", sections: [
            { h: "Last five meetings", meta: "England result first", panels: [{ t: "h2h", results: ["W", "D", "L", "W", "D"] }] },
            { h: "This qualifying cycle", meta: "Opta", panels: [{ t: "stats", rows: [
              ["8", "Matches won", "7", 53], ["21", "Goals scored", "19", 53], ["6", "Goals conceded", "9", 40],
              ["58%", "Average possession", "55%", 51], ["1.71", "xG per match", "1.44", 54]
            ]}]},
            { h: "The shape of it", panels: [{ t: "note", body: "England create more and concede less, and have still drawn three of the last five against sides in the top ten. The gap in this fixture has never been the chances. It has been the finishing." }] }
          ]},
          { id: "lineups", label: "Line-ups", sections: [
            { h: "Predicted line-ups", meta: "Confirmed at 18:45", panels: [
              { t: "formation", shape: "4-2-3-1", team: "eng", label: "England", sub: "Unchanged from Thursday" },
              { t: "xi", team: "eng", list: XI_ENG, highlight: 7, hint: "Most crosses this cycle" }
            ]},
            { h: "Netherlands", meta: "4-3-3", panels: [
              { t: "formation", shape: "4-3-3", team: "ned", label: "Netherlands", sub: "Two changes expected" },
              { t: "xi", team: "ned", list: XI_NED, highlight: 4, hint: "Blocks more shots than anyone" }
            ]}
          ]}
        ]
      },

      live: {
        chip: "In Play", state: "England lead by one with 22 minutes left", watching: "62,140",
        summary: ["England 1-0 up through Saka", "Seven corners in the second half", "Netherlands yet to have a shot on target since the break", "Rice booked, 69 mins"],
        card: { status: "live", when: "LIVE · 68 mins", line1: "England 1 - 0 Netherlands", line2: "Saka 52'",
          ctx: "England 1.42 xG to 0.38 and have not conceded halfway in six minutes", sig: 0.72 },
        head: { kind: "teams", status: { kind: "live", text: "LIVE", beat: true },
          centre: { big: "1 – 0", sub: "67:57" },
          home: { code: "ENG", name: "England", sub: "Saka 52'" },
          away: { code: "NED", name: "Netherlands", sub: "" } },
        clock: "football",
        tabs: [
          { id: "summary", label: "Summary", sections: [
            { panels: [{ t: "involve", title: "Send us your views",
              body: "What did you make of Saka's opener? Tell us and we'll publish the best.",
              cta: "Get involved", toast: "Thanks. Your view goes to the live page team." }]},
            { h: "Watch: Match shorts", meta: "Swipe for more", panels: [SHORTS_LIVE] },
            { h: "Key moments", meta: "Auto updates", panels: [
              { t: "kv", items: [["Score", "1-0", "Saka 52'"], ["Shots", "14", "v 6"], ["xG", "1.42", "v 0.38"]] },
              { t: "note", body: "England have not let Netherlands past halfway in six minutes." }
            ]},
            { h: "Pundit verdict", meta: "Live from the gantry", panels: [{ t: "pundit", initials: "BBC", who: "The studio", when: "66'",
              quote: "England are winning this comfortably and playing like a side that doesn't believe it.",
              opts: ["He's right", "Harsh"], split: [64, 36], after: "Close enough to go on air. Counted in the last 90 seconds." }]}
          ]},
          { id: "livetab", label: "Live", sections: [
            { h: "Live reporting", meta: "Auto updates", metaLive: true, panels: [{ t: "opta" }] },
            { h: "Get involved", meta: "Closes at the next moment", panels: [{ t: "poll", id: "fb-moment", kind: "alert", tag: "BIG CHANCE · 67:24",
              q: "Should Saka have squared it to Kane?", opts: ["Square it", "Right to shoot"], split: [61, 39],
              tally: "Closes before the next chance.",
              after: "Counted inside the window. 3,110 fans answered." }]},
            { h: "Momentum", meta: "Last 15 minutes", panels: [{ t: "momentum" }] },
            { h: "Live Reporting", ruleY: true, panels: [{ t: "sortrow" }, FEED_FOOTBALL] }
          ]},
          { id: "stats", label: "Stats", sections: [
            { h: "Match stats", meta: "Opta", panels: [{ t: "stats", rows: [
              ["62%", "Possession", "38%", 62], ["14", "Shots", "6", 70], ["6", "On target", "2", 75],
              ["1.42", "Expected goals", "0.38", 79], ["7", "Corners", "1", 88],
              ["31", "Final third entries", "12", 72], ["8.4", "PPDA", "14.1", 63]
            ]}]},
            { h: "What the numbers say", panels: [{ t: "note", body: "PPDA is passes allowed per defensive action: the lower the number, the harder a side is pressing. England at 8.4 are pressing about as hard as they have all cycle, and it is why Netherlands cannot get out." }] },
            { h: "Rate the performance", meta: "Live average", panels: [{ t: "rating", who: "Bukayo Saka", avg: 7.6, count: "41,220 ratings" }] }
          ]},
          { id: "lineups", label: "Line-ups", sections: [
            { h: "England", meta: "4-2-3-1", panels: [
              { t: "formation", shape: "4-2-3-1", team: "eng", label: "England", sub: "Saka 52'" },
              { t: "xi", team: "eng", list: XI_ENG, highlight: 7, hint: "8.4 fan rating" }
            ]},
            { h: "Netherlands", meta: "4-3-3 · 1 change", panels: [
              { t: "formation", shape: "4-3-3", team: "ned", label: "Netherlands", sub: "Reijnders on for De Jong, 64'" },
              { t: "xi", team: "ned", list: XI_NED, highlight: 1, hint: "6 saves" }
            ]}
          ]}
        ]
      },

      companion: {
        chip: "In Play", state: "Held back 23 seconds to match BBC One", watching: "62,140",
        card: { status: "live", when: "LIVE on BBC One", line1: "England 1 - 0 Netherlands", line2: "Paired with your telly",
          ctx: "Companion mode. Held back 23 seconds to match the broadcast", sig: 0.72 },
        paired: "Paired with BBC One",
        head: { kind: "teams", status: { kind: "paired", text: "FOLLOWING YOUR TELLY", beat: true },
          centre: { big: "1 – 0", sub: "67:34" },
          home: { code: "ENG", name: "England", sub: "Saka 52'" },
          away: { code: "NED", name: "Netherlands", sub: "" } },
        clock: "football", sofa: true,
        tabs: [
          { id: "watch", label: "Watch", sections: [
            { h: "In step with your TV", meta: "Paired", panels: [{ t: "sync" }] },
            { h: "From the gantry", meta: "Live", panels: [{ t: "pundit", initials: "BBC", who: "The studio", when: "66'",
              quote: "England are winning this comfortably and playing like a side that doesn't believe it.",
              opts: ["He's right", "Harsh"], split: [64, 36], after: "The split goes on air if it stays this close." }]}
          ]},
          { id: "playalong", label: "Play along", sections: [
            { h: "Play along", meta: "Only in the gaps", ruleY: true, panels: [{ t: "quiz", id: "fb",
              q: "Last England player to score from outside the box at Wembley?",
              opts: ["Rice", "Foden", "Bellingham", "Maddison"], correct: 1,
              why: "Foden, against Bosnia, June 2024. 68% of fans got it.", seconds: 20 }]},
            { h: "The big call", meta: "88,402 voted", panels: [{ t: "poll", id: "fb-bigcall", big: true,
              q: "Tuchel has 20 minutes and one change left. What would you do?",
              opts: ["Go again, bring on Gordon", "Shut it down, Guéhi on"], split: [57, 43],
              tally: "Results go to the studio at 75 minutes.", after: "Counted. The studio sees this at 75 minutes." }]},
            { h: "Keep your night", meta: "30 seconds", panels: [{ t: "signin" }] }
          ]},
          { id: "livetab", label: "Live", sections: [
            { h: "Live match view", meta: "Held back to match your telly", panels: [{ t: "opta" }] },
            { h: "Live Reporting", ruleY: true, panels: [FEED_FOOTBALL] }
          ]}
        ]
      },

      fulltime: {
        chip: "Result", state: "England win 2-1", watching: "18,400",
        summary: ["England win 2-1 at Wembley", "Saka 52, Kane 79, Gakpo 88", "First win over the Netherlands here since 2018", "Saka is your player of the match on 8.4"],
        card: { status: "done", when: "FT · 21:42", line1: "England 2 - 1 Netherlands", line2: "Saka 52', Kane 79' · Gakpo 88'",
          ctx: "England finished on 2.31 xG. Closer than the first eighty minutes suggested", sig: 0.30 },
        head: { kind: "teams", status: { kind: "ft", text: "FULL TIME", beat: false },
          centre: { big: "2 – 1", sub: "Full time" },
          home: { code: "ENG", name: "England", sub: "Saka 52', Kane 79'" },
          away: { code: "NED", name: "Netherlands", sub: "Gakpo 88'" } },
        tabs: [
          { id: "report", label: "Report", sections: [
            { ruleY: true, panels: [{ t: "storyline", kicker: "Full-time report",
              body: "England held on. Two goals of real quality, a nervous last ten minutes after Gakpo's header, and a first win over the Netherlands at Wembley since 2018." }]},
            { h: "Watch: The best of it", meta: "Swipe for more", panels: [{ t: "shorts", label: "The best of it", deck: [7, 6, 1] }]},
            { h: "Pundit verdict", meta: "Full time", panels: [{ t: "pundit", initials: "BBC", who: "The studio", when: "FT",
              quote: "Better. Still made the last ten minutes harder than they needed to be.",
              opts: ["Fair", "Too kind"], split: [51, 49], after: "The country is genuinely split on this one." }]}
          ]},
          { id: "yournight", label: "Your night", sections: [
            { h: "Your night", meta: "Scored at the whistle", ruleY: true, panels: [{ t: "scored", total: 49, max: 60, rows: [
              [true, "Exact score, 2-1", "14% of 41,883 got it", 25],
              [true, "First scorer, Saka", "You were with 23% of the country", 15],
              [false, "Play-along quiz", "One of three", 4],
              [true, "The big call, go again", "Kane scored six minutes later", 5]
            ], note: "Your best night of the season. Previous best: 31." }]},
            { h: "Predictor league", meta: "Week 6 settled", panels: [{ t: "leagueft" }] },
            { h: "Your streak", meta: "3 weeks", panels: [{ t: "streak", weeks: ["W3","W4","W5","W6","W7"], on: [1,2,3], next: 4,
              note: "Three Saturdays running. One more keeps it alive." }]},
            { h: "Next up", meta: "Saturday", panels: [{ t: "nextfix", fixture: "Wales v Ireland", when: "Sat 17:30 · BBC One",
              sub: "Your Predictor week 7 opens Thursday", cta: "Remind me and open my Predictor", on: "Set for Saturday",
              off: "One notification on Thursday. One on Saturday. Nothing else.",
              onNote: "Week 7 opens Thursday. Your streak survives if you play before kick-off." }]}
          ]},
          { id: "stats", label: "Stats", sections: [
            { h: "Final stats", meta: "Opta", panels: [{ t: "stats", rows: [
              ["58%", "Possession", "42%", 58], ["19", "Shots", "11", 63], ["8", "On target", "4", 67],
              ["2.31", "Expected goals", "1.04", 69], ["9", "Corners", "3", 75], ["9.8", "PPDA", "13.2", 57]
            ]}]},
            { h: "The story in one number", panels: [{ t: "note", body: "England finished on 2.31 xG and scored twice, which is about par. Netherlands finished on 1.04 and scored once. On the balance of chances this was closer than the eighty minutes before Gakpo's header suggested." }] }
          ]},
          { id: "ratings", label: "Ratings", sections: [
            { h: "Player of the match", meta: "41,220 fan ratings", panels: [{ t: "potm", name: "Bukayo Saka", score: "8.4",
              sub: "You rated him 8.1, just under the country",
              rows: [["Saka", 8.4, true], ["Kane", 7.9, false], ["Rice", 7.2, false], ["Pickford", 7.1, false], ["Stones", 6.8, false]] }]}
          ]}
        ]
      }
    }
  },

  /* ------------------------------------------------------------------ */
  /* CRICKET — The Ashes 2027, 2nd Test, Lord's                          */
  /* ------------------------------------------------------------------ */
  {
    id: "cricket",
    audio: { station: "BBC Test Match Special", prog: "England v Australia - 2nd Test" },
    sport: "Cricket",
    photo: { motif: "oval", sport: "Cricket", g: ["#1B2E3F", "#0A1219"] },
    comp: "The Ashes · 2nd Test · Lord's",
    title: "England v Australia",
    venue: "Lord's",
    accent: "#4ADE80",

    takeover: {
      a: "England", b: "Australia", ca: "#1A3A6B", cb: "#F1B434",
      buildup: { img: "ck-ashsquad", line: "148-3", sub: "Day 3 · England trail by 224",
        stats: [["Runs", 148, 372], ["Overs faced", 51, 118.4], ["Wickets down", 3, 10]],
        cta: "Open day three" },
      live: { img: "ck-starc", line: "284-6", sub: "89.2 overs · trail by 88",
        stats: [["Runs", 284, 372], ["Overs faced", 89.2, 118.4], ["Wickets down", 6, 10]],
        cta: "Open the live experience" },
      companion: { img: "ck-mic", line: "284-6", sub: "Following Test Match Special",
        stats: [["Runs", 284, 372], ["Overs faced", 89.2, 118.4], ["Wickets down", 6, 10]],
        cta: "Follow along with the radio" },
      fulltime: { img: "ck-root", line: "361-8", sub: "Stumps · England trail by 11",
        stats: [["Runs", 361, 372], ["Overs faced", 114, 118.4], ["Wickets down", 8, 10]],
        cta: "The day in eleven balls" }
    },

    states: {

      buildup: {
        chip: "Day 3", state: "England trail by 224 with seven wickets standing", watching: "9,120",
        card: { status: "soon", when: "Day 3 · 11:00 start", line1: "England v Australia", line2: "2nd Test, Lord's · ENG 148-3, trail by 224",
          ctx: "Overcast with the Lord's slope. The first hour decides this Test", sig: 0.55 },
        head: { kind: "stack", status: { kind: "pre", text: "DAY 3 · PLAY AT 11:00", beat: true },
          rows: [["Australia", "372", "(118.4 ov)", false], ["England", "148-3", "(51.0 ov) · trail by 224", true]],
          strap: "Root 62*, Brook 11* · Live on Test Match Special" },
        tabs: [
          { id: "preview", label: "Preview", sections: [
            { panels: [
              { t: "countdown", h: 0, m: 41, s: 12 },
              { t: "toggle", id: "tms", label: "Alert me at the first wicket", on: "Wicket alerts on",
                off: "One notification per wicket. Nothing else, and nothing before play.",
                onNote: "We'll nudge you at every wicket. 214,000 fans have wicket alerts on this Test." }
            ]},
            { h: "Listen live", meta: "Test Match Special", panels: [{ t: "audio",
              title: "Test Match Special", sub: "Aggers, Tuffers and Ebony Rainford-Brent · Lord's",
              note: "" }]},
            { h: "The state of it", meta: "Session by session", panels: [
              { t: "sessionbar", sessions: [
                ["Day 2, eve", "England 148-3", 62, "AUS"],
                ["Day 3, morning", "To come", 50, ""],
                ["Day 3, afternoon", "To come", 50, ""]
              ]},
              { t: "note", body: "England need 223 to avoid the follow-on with seven wickets standing. On this pitch, 300 has been par in the third innings for the last four Tests here." }
            ]},
            { h: "One thing to watch for", meta: "BBC Sport", panels: [{ t: "storyline", kicker: "The tactical angle",
              body: "The Lord's slope brings the ball back into the right-hander from the Pavilion End. Root has been beaten on the inside edge four times in this innings and has not been out to it. Australia will keep coming from that end for the first hour." }]},
            { h: "Watch: Build-up", meta: "Swipe for more", panels: [{ t: "shorts", label: "Build-up", deck: [0, 1, 5] }]}
          ]},
          { id: "predict", label: "Predict", sections: [
            { h: "Predict the morning session", meta: "28,104 in", ruleY: true, panels: [
              { t: "poll", id: "ck-session", q: "How many wickets fall before lunch?",
                opts: ["None", "One", "Two", "Three or more"], split: [21, 34, 29, 16],
                tally: "Locks at the first ball. Counts towards your Ashes Predictor.",
                after: "Settles at 13:00. You'll get a notification either way." }
            ]},
            { h: "Where does England's innings end?", panels: [{ t: "poll", id: "ck-total",
              q: "England's first-innings total", opts: ["Under 250", "250 to 320", "320 to 372", "Past 372"],
              split: [18, 37, 28, 17], tally: "Australia made 372.",
              after: "Par here is 300. The crowd is more optimistic than the pitch." }]},
            { h: "Your Ashes Predictor", meta: "Test 2 of 5", panels: [{ t: "league" }] }
          ]},
          { id: "scorecard", label: "Scorecard", sections: [
            { h: "England, 1st innings", meta: "148-3 (51.0 ov)", panels: [{ t: "battinglist", rows: [
              ["Crawley", "c Carey b Hazlewood", "24", "41"],
              ["Duckett", "lbw b Starc", "9", "12"],
              ["Pope", "c Smith b Cummins", "38", "72"],
              ["Root", "not out", "62", "118"],
              ["Brook", "not out", "11", "19"]
            ], extras: "Extras 4 (b2 lb2)", total: "148-3 (51.0 ov)" }]},
            { h: "Australia bowling", panels: [{ t: "bowlinglist", rows: [
              ["Starc", "14-3-41-1"], ["Hazlewood", "13-5-28-1"], ["Cummins", "15-4-39-1"], ["Lyon", "9-2-36-0"]
            ]}]},
            { h: "Australia, 1st innings", meta: "372 all out", panels: [{ t: "note", body: "Labuschagne 118, Smith 91, Carey 54. Stokes 4-88, Tongue 3-71." }] }
          ]}
        ]
      },

      live: {
        chip: "In Play", state: "England trail by 88 with four wickets standing", watching: "24,730",
        summary: ["Root unbeaten on 121, his second Ashes hundred at Lord's", "England 284-6, trailing by 88", "New ball available in eight overs", "Stokes caught behind off Starc for 43"],
        card: { status: "live", when: "LIVE · Day 3, afternoon", line1: "England 284-6", line2: "89.2 ov · trail by 88",
          ctx: "Root 121*. England 34% to win, 41% to draw, and the new ball is eight overs away", sig: 0.81, badge: "TMS" },
        head: { kind: "stack", status: { kind: "live", text: "LIVE · DAY 3", beat: true },
          rows: [["Australia", "372", "(118.4 ov)", false], ["England", "284-6", "(89.2 ov) · trail by 88", true]],
          strap: "Root 121*, Woakes 14* · New ball in 8 overs" },
        clock: "cricket",
        tabs: [
          { id: "live", label: "Live", sections: [
            { h: "This over", meta: "Bowling: Cummins", metaLive: true, panels: [
              { t: "over", balls: [["1", ""], ["4", "four"], ["•", ""], ["W", "wkt"], ["2", ""], ["4", "four now"]],
                caption: "Root drives Cummins through cover for four.",
                sub: "" },
              { t: "wagon", shots: [
                [291, 0.88, "four"], [45, 0.6, "two"], [120, 0.35, "one"], [200, 0.9, "four"],
                [330, 0.5, "one"], [15, 0.8, "six"], [250, 0.4, "one"], [170, 0.7, "three"]
              ], caption: "Root's scoring shots this innings. Two-thirds square of the wicket on the off side." }
            ]},
            { h: "Get involved", meta: "Closes at the over", panels: [{ t: "poll", id: "ck-moment", kind: "alert",
              tag: "NEW BALL DUE · 8 OVERS",
              q: "Australia take the new ball immediately, or wait for Root?",
              opts: ["Take it now", "Wait for the change"], split: [46, 54],
              tally: "Closes when the new ball is taken.",
              after: "Counted. 9,211 fans answered before the over ended." }]},
            { h: "Win predictor", meta: "Updated every ball", panels: [{ t: "winpred",
              a: "England", b: "Australia", draw: true, values: [34, 25, 41],
              series: [18, 20, 19, 24, 26, 25, 30, 28, 33, 31, 34],
              note: "England have climbed from 18% to 34% since lunch. The draw is still the most likely result." }]},
            { h: "Live Reporting", ruleY: true, panels: [{ t: "sortrow" }, { t: "feed",
              author: "Written by Stephan Shemilt at Lord's", posts: [
                ["89.2 ov", "FOUR", "Root drives on the up through extra cover. That is his fourteenth boundary and his second Ashes hundred at Lord's.", true],
                ["88.4 ov", "Cummins around the wicket", "Going for the rough outside off. Root leaves three in a row and the crowd starts up.", false],
                ["86.1 ov", "WICKET! Stokes c Carey b Starc 43", "Loose drive at a wide one. Australia are back in it, and the follow-on is not quite gone.", true],
                ["82.0 ov", "Partnership of 88", "Root and Stokes have taken England from 168-5 to within sight of the follow-on mark.", false]
              ]}]}
          ]},
          { id: "situation", label: "Situation", sections: [
            { h: "The partnership", meta: "Root and Woakes", panels: [{ t: "partnership",
              a: ["Root", "121", "204", "14x4 1x6"], b: ["Woakes", "14", "38", "2x4"],
              runs: 31, balls: 62, note: "Fourth partnership of fifty or more in this innings. Root has faced 62% of it." }]},
            { h: "Session tracker", meta: "Day 3", panels: [
              { t: "sessionbar", sessions: [
                ["Morning", "68-1 in 27 ov", 68, "ENG"],
                ["Afternoon", "84-3 in 29 ov", 55, "AUS"],
                ["Evening", "In progress · 42-2", 45, "AUS"]
              ]},
              { t: "note", body: "Australia have taken six wickets today and still trail the run rate. That is the shape of a drawn Test unless the new ball changes it." }
            ]},
            { h: "The ball", meta: "Kookaburra · 72 overs old", panels: [
              { t: "kv", items: [["Swing", "0.4°", "was 1.9° new"], ["Seam", "0.6°", "flattening"], ["New ball", "8 ov", "available"]] },
              { t: "note", body: "Swing has halved since the 40th over. The hard new ball at 80 overs is the last real chance Australia have of bowling England out today." }
            ]},
            { h: "Reviews", panels: [{ t: "kv", items: [["England", "2", "remaining"], ["Australia", "1", "remaining"], ["Used today", "3", "all unsuccessful"]] }] }
          ]},
          { id: "scorecard", label: "Scorecard", sections: [
            { h: "England, 1st innings", meta: "284-6 (89.2 ov)", panels: [{ t: "battinglist", rows: [
              ["Crawley", "c Carey b Hazlewood", "24", "41"],
              ["Duckett", "lbw b Starc", "9", "12"],
              ["Pope", "c Smith b Cummins", "38", "72"],
              ["Root", "not out", "121", "204"],
              ["Brook", "b Lyon", "29", "44"],
              ["Stokes", "c Carey b Starc", "43", "61"],
              ["Smith", "lbw b Cummins", "6", "18"],
              ["Woakes", "not out", "14", "38"]
            ], extras: "Extras 0", total: "284-6 (89.2 ov)" }]},
            { h: "Australia bowling", panels: [{ t: "bowlinglist", rows: [
              ["Starc", "22-4-71-2"], ["Hazlewood", "21-7-48-1"], ["Cummins", "24-6-79-2"], ["Lyon", "22-3-86-1"]
            ]}]}
          ]},
          { id: "stats", label: "Stats", sections: [
            { h: "This Test", meta: "Both innings", panels: [{ t: "stats", rows: [
              ["3.17", "Run rate", "3.14", 50], ["48%", "Dot-ball rate", "53%", 48],
              ["14", "Boundaries", "39", 26], ["6", "Wickets today", "0", 100], ["72", "Balls per wicket", "53", 58]
            ]}]},
            { h: "What the numbers say", panels: [{ t: "note", body: "England are scoring at the same rate as Australia off far fewer boundaries, which means more of their runs are coming in ones and twos. That is a slower, safer innings, and it is the right one if the plan is to bat out the draw." }] },
            { h: "Rate the innings", meta: "Live average", panels: [{ t: "rating", who: "Joe Root", avg: 9.1, count: "62,880 ratings" }] }
          ]}
        ]
      },

      companion: {
        chip: "In Play", state: "England trail by 88", watching: "24,762",
        card: { status: "live", when: "LIVE · with TMS", line1: "England 284-6", line2: "Following Test Match Special",
          ctx: "No live pictures on the BBC, so the second screen is the only screen", sig: 0.81 },
        paired: "Following Test Match Special",
        head: { kind: "stack", status: { kind: "paired", text: "FOLLOWING TMS", beat: true },
          rows: [["Australia", "372", "(118.4 ov)", false], ["England", "284-6", "(89.2 ov) · trail by 88", true]],
          strap: "Root 121*, Woakes 14*" },
        clock: "cricket", sofa: true,
        tabs: [
          { id: "listen", label: "Listen", sections: [
            { h: "Test Match Special", meta: "Live", panels: [{ t: "audio",
              title: "Test Match Special", sub: "Aggers and Tuffers · Lord's, Day 3 evening",
              note: "" }]},
            { h: "In step with your radio", meta: "Digital radio runs behind", panels: [{ t: "sync" }] },
            { h: "From the commentary box", meta: "Live", panels: [{ t: "pundit", initials: "TMS", who: "The TMS box", when: "89 ov",
              quote: "Root is batting as though the result has already been decided and he is simply making sure of it.",
              opts: ["Agreed", "Too soon"], split: [72, 28], after: "The box is more relaxed than the dressing room." }]}
          ]},
          { id: "playalong", label: "Play along", sections: [
            { h: "Play along", meta: "Between overs only", ruleY: true, panels: [{ t: "quiz", id: "ck",
              q: "Who was the last England batter to score an Ashes hundred at Lord's?",
              opts: ["Stokes", "Root", "Bairstow", "Cook"], correct: 1,
              why: "Root, in 2023. Only the fourth in thirty years.", seconds: 20 }]},
            { h: "The big call", meta: "44,120 voted", panels: [{ t: "poll", id: "ck-bigcall", big: true,
              q: "England are 88 behind with four wickets left. What is the plan?",
              opts: ["Bat out the draw", "Go for the lead"], split: [63, 37],
              tally: "Results go to TMS at the close.", after: "Counted. TMS sees this at stumps." }]},
            { h: "Keep your day", meta: "30 seconds", panels: [{ t: "signin" }] }
          ]}
        ]
      },

      fulltime: {
        chip: "Stumps", state: "England trail by 11 with two wickets standing", watching: "11,900",
        summary: ["Root 148 not out at the close", "England 361-8, eleven behind", "Cummins takes 3-98 in 31 overs", "Day 4 starts at 11:00"],
        card: { status: "done", when: "STUMPS · Day 3", line1: "England 361-8", line2: "trail by 11 · Root 148*",
          ctx: "Root unbeaten on 148. England within touching distance and two days to survive", sig: 0.34 },
        head: { kind: "stack", status: { kind: "ft", text: "STUMPS · DAY 3", beat: false },
          rows: [["Australia", "372", "(118.4 ov)", false], ["England", "361-8", "(114.0 ov) · trail by 11", true]],
          strap: "Root 148*, Tongue 3* · Day 4 at 11:00" },
        tabs: [
          { id: "report", label: "Report", sections: [
            { ruleY: true, panels: [{ t: "storyline", kicker: "Close of play",
              body: "Root's 148 not out dragged England from 168-5 to within eleven of Australia's total. Two days left, a flattening pitch and a bowling attack that looked tired for the last hour. This Test is drifting towards a draw, and England will take it." }]},
            { h: "Watch: The day", meta: "Swipe for more", panels: [{ t: "shorts", label: "The day", deck: [1, 0, 2] }]},
            { h: "From the box", meta: "Stumps", panels: [{ t: "pundit", initials: "TMS", who: "The TMS box", when: "Stumps",
              quote: "The best innings he has played in this country. It has changed nothing about the pitch and everything about the series.",
              opts: ["Right", "Overstated"], split: [77, 23], after: "Not much argument in the country on this one." }]}
          ]},
          { id: "yourday", label: "Your day", sections: [
            { h: "Your day", meta: "Scored at stumps", ruleY: true, panels: [{ t: "scored", total: 36, max: 50, rows: [
              [true, "Wickets before lunch: one", "34% of 28,104 got it", 15],
              [false, "England's total: 250 to 320", "They passed 320 at 108 overs", 0],
              [true, "The big call: bat out the draw", "They did exactly that", 15],
              [true, "Play-along quiz", "Two of three", 6]
            ], note: "Your best day of the series so far." }]},
            { h: "Your Ashes Predictor", meta: "Test 2 of 5", panels: [{ t: "leagueft" }] },
            { h: "Your streak", meta: "5 days", panels: [{ t: "streak", weeks: ["D1","D2","D3","D4","D5"], on: [0,1,2], next: 3,
              note: "Three days of this Test running. Day 4 starts at 11:00." }]},
            { h: "Tomorrow", meta: "Day 4", panels: [{ t: "nextfix", fixture: "Day 4 at Lord's", when: "Thu 11:00 · TMS",
              sub: "England 11 behind with two wickets standing", cta: "Wake me for the first ball", on: "Set for 11:00",
              off: "One notification at the start of play. Nothing before it.",
              onNote: "We'll nudge you at 10:55. Wicket alerts stay on through the day." }]}
          ]},
          { id: "scorecard", label: "Scorecard", sections: [
            { h: "England, 1st innings", meta: "361-8 (114.0 ov)", panels: [{ t: "battinglist", rows: [
              ["Crawley", "c Carey b Hazlewood", "24", "41"],
              ["Duckett", "lbw b Starc", "9", "12"],
              ["Pope", "c Smith b Cummins", "38", "72"],
              ["Root", "not out", "148", "261"],
              ["Brook", "b Lyon", "29", "44"],
              ["Stokes", "c Carey b Starc", "43", "61"],
              ["Smith", "lbw b Cummins", "6", "18"],
              ["Woakes", "c Head b Lyon", "31", "68"],
              ["Carse", "b Cummins", "18", "24"],
              ["Tongue", "not out", "3", "11"]
            ], extras: "Extras 12 (b4 lb6 nb2)", total: "361-8 (114.0 ov)" }]},
            { h: "Australia bowling", panels: [{ t: "bowlinglist", rows: [
              ["Starc", "28-5-89-2"], ["Hazlewood", "27-9-61-1"], ["Cummins", "31-7-98-3"], ["Lyon", "28-4-103-2"]
            ]}]}
          ]}
        ]
      }
    }
  },

  /* ------------------------------------------------------------------ */
  /* TENNIS — Wimbledon 2027, 100 years of BBC at Wimbledon              */
  /* ------------------------------------------------------------------ */
  {
    id: "tennis",
    audio: { station: "BBC Radio 5 Sports Extra", prog: "Wimbledon - Centre Court commentary" },
    sport: "Tennis",
    photo: { motif: "court", g: ["#1D3A1F", "#0B1A0D"] },
    comp: "Wimbledon 2027 · Day 6",
    title: "The Championships",
    venue: "All England Club",
    accent: "#9ADFA0",

    takeover: {
      a: "Raducanu", b: "Vondroušová", ca: "#BB1919", cb: "#9C8BD9",
      buildup: { img: "tn-smile", line: "Day 6", sub: "18 courts in play from 11:00",
        stats: [["Career meetings won", 3, 1], ["Grass win %", 71, 58], ["Aces last round", 6, 2]],
        cta: "See what is coming on" },
      live: { img: "tn-stretch", line: "6-4, 4-5", sub: "0-40 · Court 2 · three break points",
        stats: [["Break points won", 4, 1], ["First serve %", 68, 55], ["Winners", 22, 15]],
        cta: "Open the live experience" },
      companion: { img: "tn-tracking", line: "6-4, 4-5", sub: "Court 2 · while your TV shows Centre Court",
        stats: [["Break points won", 4, 1], ["First serve %", 68, 55], ["Winners", 22, 15]],
        cta: "Watch the better match" },
      fulltime: { img: "tn-best", line: "6-4, 7-5", sub: "Raducanu through in straight sets",
        stats: [["Winners", 31, 22], ["First serve %", 66, 57], ["Break points won", 5, 2]],
        cta: "How Court 2 was won" }
    },

    states: {

      buildup: {
        chip: "Today 11:00", state: "18 courts in play from 11:00, Centre Court from 13:30", watching: "6,300",
        card: { status: "soon", when: "Play at 11:00", line1: "Wimbledon · Day 6", line2: "18 courts · third round",
          ctx: "100 years since the BBC first broadcast from Wimbledon", sig: 0.48, badge: "100" },
        head: { kind: "stack", status: { kind: "pre", text: "PLAY AT 11:00", beat: true },
          rows: [["The Championships", "Day 6", "Third round", true], ["Courts in play", "18", "Order of play below", false]],
          strap: "Centre Court from 13:30 · BBC One and iPlayer" },
        tabs: [
          { id: "today", label: "Today", sections: [
            { panels: [
              { t: "countdown", h: 1, m: 12, s: 30 },
              { t: "toggle", id: "wimb-remind", label: "Follow Raducanu today", on: "Following Raducanu",
                off: "One notification when she walks on, one at every set point.",
                onNote: "On court 2, not before 13:00. 1.1m fans are following her today." }
            ]},
            { h: "100 years of the BBC at Wimbledon", meta: "1927 to 2027", ruleY: true, panels: [{ t: "centenary",
              years: [
                ["1927", "First radio commentary", "Teddy Wakelam calls the Championships from a hut beside Centre Court."],
                ["1937", "First television pictures", "A single camera, a handful of London sets, and the beginning of the habit."],
                ["1967", "Colour", "Wimbledon is the first colour broadcast on BBC Two, and the grass turns green."],
                ["2027", "The centenary", "Every one of those hundred years is in the archive. This is the year to open it."]
              ],
              note: "" }, { t: "feature", img: "ar-debut", compact: true, kicker: "Read",
              title: "From a hut beside Centre Court to eighteen courts in your pocket", sub: "6 min read", article: "w100" }]},
            { h: "Order of play", meta: "From 11:00", panels: [{ t: "oop", rows: [
              ["Centre", "13:30", "Alcaraz v Musetti", "then Raducanu v Vondroušová"],
              ["No.1", "13:00", "Sinner v Fils", "then Świątek v Paolini"],
              ["Court 2", "11:00", "Boulter v Kalinskaya", "then Draper v Shelton"],
              ["Court 18", "11:00", "Fearnley v Rune", "then two more"]
            ]}]},
            { h: "Watch: Build-up", meta: "Swipe for more", panels: [{ t: "shorts", label: "Build-up", deck: [2, 3, 4] }]}
          ]},
          { id: "predict", label: "Predict", sections: [
            { h: "Predict the day", meta: "62,400 in", ruleY: true, panels: [
              { t: "poll", id: "tn-upset", q: "Which seed goes out today?",
                opts: ["Musetti", "Rune", "Paolini", "None of them"], split: [31, 24, 27, 18],
                tally: "Locks at the first serve on Centre.",
                after: "Settles at the last ball of the day." }
            ]},
            { h: "Your bracket", meta: "Third round", panels: [{ t: "poll", id: "tn-winner",
              q: "Who lifts it a week on Sunday?", opts: ["Alcaraz", "Sinner", "Draper", "The field"],
              split: [38, 34, 11, 17], tally: "You can change this until the quarter-finals.",
              after: "Locked in. You can still change it until the quarters." }]},
            { h: "Your Wimbledon", meta: "Day 6", panels: [{ t: "league" }] }
          ]},
          { id: "draw", label: "Draw", sections: [
            { h: "Third round, bottom half", panels: [{ t: "oop", rows: [
              ["Court 2", "1st", "Raducanu (18)", "v Vondroušová (12)"],
              ["Court 18", "1st", "Boulter (24)", "v Kalinskaya"],
              ["No.1", "1st", "Świątek (2)", "v Paolini (7)"],
              ["Centre", "1st", "Sabalenka (1)", "v Andreeva (15)"]
            ]}]},
            { h: "How the draw opened up", panels: [{ t: "note", body: "Three of the top eight seeds in this quarter have gone out in the first week. Whoever comes through Court 2 this afternoon has the kindest route to the semi-finals of anyone left in the draw." }] }
          ]}
        ]
      },

      live: {
        chip: "In Play", state: "Raducanu has three break points at 4-5", watching: "41,880",
        summary: ["Raducanu leads by a set and has three break points", "Vondroušová has won nine points on her second serve all set", "Boulter on Court 18 is 5-5 in the decider", "Sinner is serving for the match on No.1"],
        card: { status: "live", when: "LIVE · 18 courts", line1: "Raducanu 6-4, 4-5", line2: "Court 2 · 0-40, three break points",
          ctx: "Three break points on Court 2, and the busiest match on the BBC right now", sig: 0.93, badge: "WATCH NOW" },
        head: { kind: "stack", status: { kind: "live", text: "LIVE · COURT 2", beat: true },
          rows: [["Raducanu", "6 4", "", true], ["Vondroušová", "4 5", "0-40", false]],
          strap: "Second set · Vondroušová serving · three break points", serve: 1 },
        clock: "tennis",
        tabs: [
          { id: "watchnow", label: "Watch now", sections: [
            { h: "Every court", meta: "Updated every point", metaLive: true, panels: [
              { t: "courts", rows: [
                ["Court 2", "Raducanu v Vondroušová", "6-4, 4-5 · 0-40 · three break points", 0.93],
                ["Court 18", "Boulter v Kalinskaya", "3-6, 6-4, 5-5 · deuce", 0.71],
                ["No.1", "Sinner v Fils", "6-2, 5-2 · serving for the match", 0.66],
                ["Centre", "Alcaraz v Musetti", "7-6, 6-3, 2-1 · on serve", 0.41],
                ["Court 12", "Draper v Shelton", "4-6, 2-1 · new balls", 0.22]
              ]},
            ]},
            { h: "Get involved", meta: "Closes at the game", panels: [{ t: "poll", id: "tn-moment", kind: "alert",
              tag: "THREE BREAK POINTS · COURT 2",
              q: "Does Raducanu break here?", opts: ["She breaks", "Vondroušová holds"], split: [68, 32],
              tally: "Closes when the game ends.",
              after: "Counted. 18,440 fans answered inside the game." }]},
            { h: "Clips from Court 2", meta: "iPlayer", panels: [{ t: "clips", items: [
              ["The 22-shot rally at 3-3", "0:48", "tn-stretch"],
              ["The first-set break, at 2-1", "0:36", "tn-tracking"],
              ["Vondroušová's lob, from three angles", "0:29", "tn-dejected"]
            ]}]},
            { h: "5 Live on Court 2", meta: "Radio 5 Sports Extra", panels: [{ t: "soundbites", items: [
              ["The call at 0-40", "0:22", "Commentary as Raducanu earns three break points, with the crowd noise building behind it."],
              ["Why her second serve is the story", "0:41", "The summariser on Vondroušová winning fewer than a third of her second-serve points."],
              ["The walk over from Centre", "0:18", "Courtside reporter on the crowd arriving at Court 2 as word gets round the grounds."]
            ]}]}
          ]},
          { id: "match", label: "This match", sections: [
            { h: "Point by point", meta: "Second set", panels: [
              { t: "pointgrid", games: [
                ["R", [1,1,0,1]], ["V", [0,1,1,1,0,1]], ["R", [1,0,1,1]], ["V", [1,1,0,0,1,1]],
                ["R", [0,1,1,0,1,1]], ["V", [1,0,1,1]], ["R", [1,1,1,0]], ["V", [0,1,0,1,1,1]],
                ["R", [1,0,0,1,1,1]], ["V", [0,0,0]]
              ], note: "One column a game, one block a point. Raducanu in yellow." }
            ]},
            { h: "Serve", meta: "This match", panels: [{ t: "stats", rows: [
              ["64%", "First serves in", "58%", 52],
              ["78%", "First-serve points won", "61%", 56],
              ["54%", "Second-serve points won", "31%", 64],
              ["4", "Aces", "2", 67],
              ["1", "Double faults", "5", 17],
              ["3 of 4", "Break points converted", "1 of 6", 71]
            ]}]},
            { h: "What the numbers say", panels: [{ t: "note", body: "The match is being decided on second serve. Vondroušová is winning fewer than a third of hers, which is why every one of her service games has gone to deuce or worse since the first set." }] }
          ]},
          { id: "hundred", label: "100 years", sections: [
            { ruleY: true, panels: [{ t: "feature", img: "ar-court", kicker: "Wimbledon · 100 years on the BBC",
              title: "From a hut beside Centre Court to eighteen courts in your pocket", sub: "6 min read · with pictures from the archive", article: "w100" }]},
            { h: "Archive clips", meta: "From 1937", panels: [{ t: "clips", archive: true, items: [
              ["1937: the first pictures", "1:05", "ar-debut"],
              ["BBC Television presents", "0:40", "ar-ident"],
              ["An afternoon at Wimbledon and Lord's", "0:31", "ar-lords"],
              ["Before Centre Court had a roof", "0:57", "ar-court"]
            ]}]},
            { h: "Read the programmes", meta: "Six pages", panels: [{ t: "reader" }] },
            { h: "On this day", meta: "From the archive", panels: [{ t: "centenary",
              years: [
                ["1977", "Virginia Wade wins", "The last British woman to take the singles title, in the Centenary Championships, with the Queen watching."],
                ["1991", "The People's Sunday", "Rain forces an unseeded middle Sunday. 24,000 fans get in for a fiver and never sit down."],
                ["2013", "Murray ends the wait", "77 years, and the BBC audience peaks at 17.3 million."]
              ],
              note: "" }]},
            { h: "Watch: Beyond the court", meta: "Swipe for more", panels: [{ t: "shorts", label: "Off court", deck: [3, 4, 2] }]}
          ]}
        ]
      },

      companion: {
        chip: "In Play", state: "Centre Court on BBC One, Court 2 on this screen", watching: "41,880",
        card: { status: "live", when: "LIVE on BBC One", line1: "Centre Court", line2: "Paired with your telly",
          ctx: "Centre Court on your TV. We will say if another court is worth a switch", sig: 0.93 },
        paired: "Paired with BBC One · Centre Court",
        head: { kind: "stack", status: { kind: "paired", text: "FOLLOWING YOUR TELLY", beat: true },
          rows: [["Alcaraz", "7 6 2", "", true], ["Musetti", "6 3 1", "", false]],
          strap: "Third set · on serve · you are watching Centre Court" },
        clock: "tennis", sofa: true,
        tabs: [
          { id: "watch", label: "Watch", sections: [
            { h: "Worth a switch", meta: "Court 2", ruleY: true, panels: [
              { t: "courts", rows: [
                ["Court 2", "Raducanu v Vondroušová", "6-4, 4-5 · 0-40 · three break points", 0.93],
                ["Centre", "Alcaraz v Musetti (on your telly)", "7-6, 6-3, 2-1 · on serve", 0.41]
              ]},
              { t: "btnrow", label: "Follow Court 2 on this screen", toast: "Court 2 on your phone, Centre on your telly. Both scores stay pinned." }
            ]},
            { h: "In step with your TV", meta: "Paired", panels: [{ t: "sync" }] }
          ]},
          { id: "playalong", label: "Play along", sections: [
            { h: "Play along", meta: "Changeovers only", ruleY: true, panels: [{ t: "quiz", id: "tn",
              q: "Who was the last British woman to win the Wimbledon singles title?",
              opts: ["Ann Jones", "Virginia Wade", "Sue Barker", "Johanna Konta"], correct: 1,
              why: "Virginia Wade, 1977, in the Centenary Championships.", seconds: 25 }]},
            { h: "The big call", meta: "52,880 voted", panels: [{ t: "poll", id: "tn-bigcall", big: true,
              q: "Should BBC One stay on Centre or switch to Court 2?",
              opts: ["Stay on Centre", "Switch to Court 2"], split: [41, 59],
              tally: "Results go to the gallery at the next changeover.",
              after: "Counted. The gallery sees this at the changeover." }]},
            { h: "Keep your day", meta: "30 seconds", panels: [{ t: "signin" }] }
          ]}
        ]
      },

      fulltime: {
        chip: "Result", state: "Raducanu into the fourth round", watching: "12,400",
        summary: ["Raducanu wins 6-4, 7-5 in 1 hour 48", "Broke at 4-5 in the second and never looked back", "Musetti and Boulter go out", "Fourth round on the middle Sunday"],
        card: { status: "done", when: "Day 6 done · 20:14", line1: "Raducanu wins 6-4, 7-5", line2: "Into the fourth round",
          ctx: "Two seeds out. 6.2m watched the Court 2 switch, the biggest of the Championships", sig: 0.28 },
        head: { kind: "stack", status: { kind: "ft", text: "MATCH OVER", beat: false },
          rows: [["Raducanu", "6 7", "wins", true], ["Vondroušová", "4 5", "", false]],
          strap: "Third round · 1 hour 48 minutes · into the fourth round" },
        tabs: [
          { id: "report", label: "Report", sections: [
            { ruleY: true, panels: [{ t: "storyline", kicker: "Match report",
              body: "Raducanu broke at 4-5 in the second and never looked like losing it from there. A performance built on returning a second serve that was not good enough, in front of a Court 2 crowd that grew by the game as the rest of the grounds worked out where to be." }]},
            { h: "Day 6 results", meta: "Third round", panels: [{ t: "oop", rows: [
              ["Court 2", "Raducanu", "def Vondroušová", "6-4, 7-5"],
              ["Centre", "Alcaraz", "def Musetti", "7-6, 6-3, 6-4"],
              ["No.1", "Sinner", "def Fils", "6-2, 6-2, 6-3"],
              ["Court 18", "Kalinskaya", "def Boulter", "6-3, 4-6, 7-5"]
            ]}]},
            { h: "Watch: The day", meta: "Swipe for more", panels: [{ t: "shorts", label: "The day", deck: [2, 4, 3] }]}
          ]},
          { id: "yourday", label: "Your day", sections: [
            { h: "Your day", meta: "Scored at the last ball", ruleY: true, panels: [{ t: "scored", total: 41, max: 55, rows: [
              [true, "She breaks at 0-40", "68% of 18,440 agreed", 20],
              [true, "Seed out today: Musetti", "31% got it", 15],
              [false, "Play-along quiz", "One of two", 6],
              [false, "Winner: still open", "Settles a week on Sunday", 0]
            ], note: "Your best day of the Championships." }]},
            { h: "Your Wimbledon", meta: "Day 6 settled", panels: [{ t: "leagueft" }] },
            { h: "Your streak", meta: "6 days", panels: [{ t: "streak", weeks: ["D3","D4","D5","D6","D7"], on: [0,1,2,3], next: 4,
              note: "Four days running. The middle Sunday is the one that breaks most streaks." }]},
            { h: "Tomorrow", meta: "Day 7", panels: [{ t: "nextfix", fixture: "Middle Sunday", when: "Sun 11:00 · BBC One",
              sub: "Raducanu in the fourth round, not before 14:00", cta: "Remind me when she's on",
              on: "Set for Sunday", off: "One notification when she walks on. Nothing else.",
              onNote: "We'll nudge you when she's called. Your streak needs one match watched." }]}
          ]},
          { id: "hundred", label: "100 years", sections: [
            { ruleY: true, panels: [{ t: "feature", img: "ar-mag93", kicker: "Wimbledon · 100 years on the BBC",
              title: "From a hut beside Centre Court to eighteen courts in your pocket", sub: "6 min read · with pictures from the archive", article: "w100" }]},
            { h: "The centenary, in numbers", meta: "1927 to 2027", panels: [
              { t: "kv", items: [["Broadcasts", "2,304", "on BBC television, 1937 to 2021"], ["All-time rank", "38th", "most broadcast BBC programme"], ["Peak audience", "17.3m", "Murray, 2013"]] }
            ]},
            { h: "Read the programmes", meta: "Six pages", panels: [{ t: "reader" }] },
            { h: "On this day", meta: "From the archive", ruleY: true, panels: [{ t: "centenary",
              years: [
                ["1977", "Virginia Wade wins", "The last British woman to take the singles title, in the Centenary Championships."],
                ["2013", "Murray ends the wait", "77 years, and a BBC audience peaking at 17.3 million."]
              ], note: "" }]}
          ]}
        ]
      }
    }
  },

  /* ------------------------------------------------------------------ */
  /* RUGBY — Six Nations 2027, Wales v Ireland                           */
  /* ------------------------------------------------------------------ */
  {
    id: "rugby",
    audio: { station: "BBC Radio 5 Live", prog: "Wales v Ireland - Six Nations" },
    sport: "Rugby Union",
    photo: { motif: "pitch", g: ["#22314A", "#0C121C"] },
    comp: "Guinness Six Nations",
    title: "Wales v Ireland",
    venue: "Principality Stadium",
    accent: "#7FB2FF",

    takeover: {
      a: "Wales", b: "Ireland", ca: "#C8102E", cb: "#128D51",
      buildup: { img: "rg-wales", line: "17:15", sub: "Principality Stadium · roof closed",
        stats: [["Wins in last 5", 1, 4], ["Points scored", 68, 131], ["Tries", 7, 17]],
        cta: "Open the build-up" },
      live: { img: "rg-maul", line: "13 – 16", sub: "64:12 · TMO reviewing a grounding",
        stats: [["Territory %", 44, 56], ["Possession %", 47, 53], ["Tackles made", 118, 96]],
        cta: "Open the live experience" },
      companion: { img: "rg-run", line: "13 – 16", sub: "Following your telly · held back 18s",
        stats: [["Territory %", 44, 56], ["Possession %", 47, 53], ["Tackles made", 118, 96]],
        cta: "See why the whistle went" },
      fulltime: { img: "rg-roar", line: "16 – 23", sub: "Full time · Ireland take the bonus point",
        stats: [["Territory %", 42, 58], ["Possession %", 45, 55], ["Tries", 1, 4]],
        cta: "The four tries and the table" }
    },

    states: {

      buildup: {
        chip: "Today 17:15", state: "Ireland need a bonus point to stay in the title race", watching: "8,400",
        card: { status: "soon", when: "17:15 · BBC One", line1: "Wales v Ireland", line2: "Six Nations · Principality Stadium",
          ctx: "Roof closed. Ireland need a bonus point to stay in the title race", sig: 0.44 },
        head: { kind: "teams", status: { kind: "pre", text: "Kick-off 17:15", beat: true },
          centre: { big: "17:15", sub: "Principality", small: true },
          home: { code: "WAL", name: "Wales", sub: "L L W L L" },
          away: { code: "IRE", name: "Ireland", sub: "W W W D W" } },
        tabs: [
          { id: "preview", label: "Preview", sections: [
            { panels: [
              { t: "countdown", h: 0, m: 52, s: 18 },
              { t: "toggle", id: "rg-remind", label: "Remind me at kick-off", on: "Reminder set",
                off: "One notification, 10 minutes before. Nothing else.",
                onNote: "We'll nudge you at 17:05. 402,000 fans have a reminder on this match." }
            ]},
            { h: "One thing to watch for", meta: "BBC Sport", panels: [{ t: "storyline", kicker: "The tactical angle",
              body: "Ireland have won 71% of their attacking lineouts inside the 22 this championship, the best in the tournament. Wales have conceded a try from a driving maul in four of their last five. The first penalty to the corner will tell you how this goes." }]},
            { h: "The championship", meta: "After four rounds", panels: [
              { t: "kv", items: [["Ireland", "2nd", "17 pts"], ["Wales", "6th", "2 pts"], ["Bonus point", "4 tries", "Ireland need it"]] },
              { t: "note", body: "Ireland need a bonus-point win and France to slip. Wales need a performance more than a result, which is a different match to watch." }
            ]},
            { h: "Watch: Build-up", meta: "Swipe for more", panels: [{ t: "shorts", label: "Build-up", deck: [8, 0, 2] }]}
          ]},
          { id: "predict", label: "Predict", sections: [
            { h: "Predict the match", meta: "52,220 in", ruleY: true, panels: [{ t: "predict" }] },
            { h: "Bonus point", panels: [{ t: "poll", id: "rg-bp", q: "Do Ireland get their four tries?",
              opts: ["Yes, comfortably", "Yes, late on", "No"], split: [37, 34, 29],
              tally: "Locks at kick-off.", after: "Settles at the final whistle." }]},
            { h: "Your Six Nations", meta: "Round 5", panels: [{ t: "league" }] }
          ]},
          { id: "lineups", label: "Line-ups", sections: [
            { h: "The laws, before you start", meta: "New this season", ruleY: true, panels: [{ t: "law",
              ref: "LAW 19 · LINEOUT · MAUL",
              body: "A maul from a lineout may not be pulled down, and the defending side may not join from the side. If you have wondered why a driving maul so often ends in a penalty rather than a try, it is almost always one of those two.",
              meta: "Checked by the BBC Sport rugby team" }]},
            { h: "Wales", meta: "Two changes", panels: [{ t: "xi", team: "wal", list: [
              [15, "Winnett", "FB"], [14, "Rogers", "W"], [13, "Llewellyn", "C"], [12, "Edwards", "C"], [11, "Adams", "W"],
              [10, "Anscombe", "FH"], [9, "Hardy", "SH"], [1, "Thomas", "LP"], [2, "Lake", "H"], [3, "Assiratti", "TP"],
              [4, "Rowlands", "L"], [5, "Beard", "L"], [6, "Morgan", "BF"], [7, "Reffell", "OF"], [8, "Faletau", "N8"]
            ], highlight: 7, hint: "Most turnovers this championship" }]},
            { h: "Ireland", meta: "Unchanged", panels: [{ t: "xi", team: "ire", list: [
              [15, "Keenan", "FB"], [14, "Hansen", "W"], [13, "Ringrose", "C"], [12, "Aki", "C"], [11, "Lowe", "W"],
              [10, "Crowley", "FH"], [9, "Gibson-Park", "SH"], [1, "Porter", "LP"], [2, "Sheehan", "H"], [3, "Furlong", "TP"],
              [4, "Baird", "L"], [5, "McCarthy", "L"], [6, "Conan", "BF"], [7, "van der Flier", "OF"], [8, "Doris", "N8"]
            ], highlight: 2, hint: "Lineout throw 94%" }]}
          ]}
        ]
      },

      live: {
        chip: "In Play", state: "Wales trail by three, TMO reviewing", watching: "38,210",
        summary: ["Wales 13-16 Ireland with 16 minutes left", "Penalty Wales at 22 metres, TMO checking the build-up", "Wales have 71% territory in the last ten minutes", "Sheehan try from the driving maul, 58 mins"],
        card: { status: "live", when: "LIVE · 64 mins", line1: "Wales 13 - 16 Ireland", line2: "TMO review in progress",
          ctx: "Wales 71% territory in the last ten. A penalty at 22 metres takes them within one score", sig: 0.69 },
        head: { kind: "teams", status: { kind: "live", text: "LIVE · TMO REVIEW", beat: true },
          centre: { big: "13 – 16", sub: "64:12" },
          home: { code: "WAL", name: "Wales", sub: "1T 1C 2P" },
          away: { code: "IRE", name: "Ireland", sub: "2T 2P" } },
        clock: "rugby",
        tabs: [
          { id: "live", label: "Live", sections: [
            { h: "Why the whistle went", meta: "Explained in 12 seconds", metaLive: true, ruleY: true, panels: [
              { t: "law", ref: "LAW 15.6(c) · RUCK · OFFSIDE LINE",
                body: "Ireland's number 7 joined the ruck from the side rather than through the gate. The offside line at a ruck is the hindmost foot, and arriving from any other angle is a penalty regardless of whether there was contact.",
                meta: "Under review by the BBC Sport rugby team" },
            ]},
            { h: "TMO", meta: "Under review", panels: [{ t: "tmo",
              q: "Was there a knock-on in the build-up?", elapsed: 48,
              note: "Average review this championship: 1 minute 42." }]},
            { h: "Get involved", meta: "Closes when play restarts", panels: [{ t: "poll", id: "rg-moment", kind: "alert",
              tag: "PENALTY WALES · 22 METRES",
              q: "Kick at goal, or go to the corner?", opts: ["Take the three", "Corner"], split: [58, 42],
              tally: "Kick success from this position: 84% this season.",
              after: "Counted. 11,330 fans answered before the restart." }]},
            { h: "Territory and possession", meta: "Last 10 minutes", panels: [{ t: "territory",
              rows: [["Territory", 71, 29], ["Possession", 63, 37], ["Time in the 22", 78, 22]],
              a: "Wales", b: "Ireland",
              note: "Wales have had the ball and the field position for ten minutes and are still three behind. That is the story of their championship." }]},
            { h: "Phase play", meta: "This possession", panels: [{ t: "phases", count: 14, max: 18,
              note: "Fourteen phases is the longest of the match. Ireland have not conceded a penalty in a phase sequence this long all championship, until now." }]},
            { h: "Live Reporting", ruleY: true, panels: [{ t: "sortrow" }, { t: "feed",
              author: "Written by Gareth Griffiths at the Principality Stadium", posts: [
                ["64 mins", "PENALTY WALES", "Advantage over. Ireland's 7 comes in from the side and Wales have a shot at the posts from 22 metres.", true],
                ["63 mins", "Fourteen phases", "Wales going nowhere fast but going nowhere very patiently. Ireland's defence is starting to fold at the edges.", false],
                ["58 mins", "TRY IRELAND", "Sheehan from the back of a driving maul. The fourth of those Wales have conceded in five matches.", true],
                ["52 mins", "Anscombe penalty", "Straightforward from in front. Three points and a two-score game again.", false]
              ]}]}
          ]},
          { id: "stats", label: "Stats", sections: [
            { h: "Match stats", meta: "Opta", panels: [{ t: "stats", rows: [
              ["54%", "Possession", "46%", 54], ["61%", "Territory", "39%", 61],
              ["112", "Carries", "98", 53], ["14", "Turnovers conceded", "9", 61],
              ["92%", "Lineout won", "94%", 49], ["7", "Penalties conceded", "11", 39],
              ["3 of 4", "Kicks at goal", "1 of 1", 75]
            ]}]},
            { h: "What the numbers say", panels: [{ t: "note", body: "Wales are winning almost every column except the one that counts. Eleven penalties from Ireland would normally be a losing number, and the difference is that four of them came inside their own 22 where Wales kicked for the corner and lost the lineout." }] },
            { h: "Rate the performance", meta: "Live average", panels: [{ t: "rating", who: "Taulupe Faletau", avg: 7.8, count: "28,110 ratings" }] }
          ]},
          { id: "lineups", label: "Line-ups", sections: [
            { h: "Wales", meta: "2 replacements used", panels: [{ t: "xi", team: "wal", list: [
              [15, "Winnett", "FB"], [14, "Rogers", "W"], [13, "Llewellyn", "C"], [12, "Edwards", "C"], [11, "Adams", "W"],
              [10, "Anscombe", "FH"], [9, "Hardy", "SH"], [1, "Thomas", "LP"], [2, "Lake", "H"], [3, "Assiratti", "TP"],
              [4, "Rowlands", "L"], [5, "Beard", "L"], [6, "Morgan", "BF"], [7, "Reffell", "OF"], [8, "Faletau", "N8"]
            ], highlight: 8, hint: "7.8 fan rating" }]},
            { h: "Ireland", meta: "3 replacements used", panels: [{ t: "xi", team: "ire", list: [
              [15, "Keenan", "FB"], [14, "Hansen", "W"], [13, "Ringrose", "C"], [12, "Aki", "C"], [11, "Lowe", "W"],
              [10, "Crowley", "FH"], [9, "Gibson-Park", "SH"], [1, "Porter", "LP"], [2, "Sheehan", "H"], [3, "Furlong", "TP"],
              [4, "Baird", "L"], [5, "McCarthy", "L"], [6, "Conan", "BF"], [7, "van der Flier", "OF"], [8, "Doris", "N8"]
            ], highlight: 2, hint: "Try, 58'" }]}
          ]}
        ]
      },

      companion: {
        chip: "In Play", state: "Wales trail by three", watching: "38,210",
        card: { status: "live", when: "LIVE on BBC One", line1: "Wales 13 - 16 Ireland", line2: "Paired with your telly",
          ctx: "Law explainers during the TMO, which is exactly when you want them", sig: 0.69 },
        paired: "Paired with BBC One",
        head: { kind: "teams", status: { kind: "paired", text: "FOLLOWING YOUR TELLY", beat: true },
          centre: { big: "13 – 16", sub: "63:41" },
          home: { code: "WAL", name: "Wales", sub: "1T 1C 2P" },
          away: { code: "IRE", name: "Ireland", sub: "2T 2P" } },
        clock: "rugby", sofa: true,
        tabs: [
          { id: "watch", label: "Watch", sections: [
            { h: "Why the whistle went", meta: "While the TMO looks", ruleY: true, panels: [
              { t: "law", ref: "LAW 15.6(c) · RUCK · OFFSIDE LINE",
                body: "Ireland's number 7 joined the ruck from the side rather than through the gate. The offside line at a ruck is the hindmost foot.",
                meta: "Under review by the BBC Sport rugby team" },
              { t: "tmo", q: "Was there a knock-on in the build-up?", elapsed: 48,
                note: "" }
            ]},
            { h: "In step with your TV", meta: "Paired", panels: [{ t: "sync" }] }
          ]},
          { id: "playalong", label: "Play along", sections: [
            { h: "Play along", meta: "Stoppages only", ruleY: true, panels: [{ t: "quiz", id: "rg",
              q: "At a ruck, where is the offside line?", opts: ["The ball", "The hindmost foot", "Five metres back", "The referee's mark"],
              correct: 1, why: "The hindmost foot of the last player in the ruck. 44% of fans got this.", seconds: 25 }]},
            { h: "The big call", meta: "71,400 voted", panels: [{ t: "poll", id: "rg-bigcall", big: true,
              q: "Wales, 22 metres out, three behind with 16 minutes left", opts: ["Take the three", "Go to the corner"],
              split: [58, 42], tally: "Results go to the studio at the restart.",
              after: "Counted. The studio sees this at the restart." }]},
            { h: "Keep your afternoon", meta: "30 seconds", panels: [{ t: "signin" }] }
          ]}
        ]
      },

      fulltime: {
        chip: "Result", state: "Ireland win 23-16 with a bonus point", watching: "9,800",
        summary: ["Ireland 23-16 Wales, bonus point secured", "Fourth try with a minute left", "Wales won territory and lost the try count 4-1", "France v Ireland decides it on Super Saturday"],
        card: { status: "done", when: "FT · 19:08", line1: "Wales 16 - 23 Ireland", line2: "Ireland get the bonus point",
          ctx: "Ireland's fourth try in the 79th minute keeps them in the title race", sig: 0.26 },
        head: { kind: "teams", status: { kind: "ft", text: "FULL TIME", beat: false },
          centre: { big: "16 – 23", sub: "Full time" },
          home: { code: "WAL", name: "Wales", sub: "1T 1C 3P" },
          away: { code: "IRE", name: "Ireland", sub: "4T 3C 1P" } },
        tabs: [
          { id: "report", label: "Report", sections: [
            { ruleY: true, panels: [{ t: "storyline", kicker: "Full-time report",
              body: "Ireland got the fourth try with a minute left and a bonus point that keeps the championship alive. Wales had the territory, the possession and the crowd, and lost the two moments that mattered: a lineout on the Irish line and a ruck penalty at 64 minutes." }]},
            { h: "The decisions that decided it", meta: "Explained", ruleY: true, panels: [{ t: "law",
              ref: "LAW 15.6(c) · THE 64TH-MINUTE PENALTY",
              body: "Wales kicked the three and drew within one score. The alternative was the corner, where they had already lost two lineouts. 58% of fans said take the three, and on the night it was the right call that still lost.",
              meta: "Checked by the BBC Sport rugby team" }]},
            { h: "Watch: The best of it", meta: "Swipe for more", panels: [{ t: "shorts", label: "The best of it", deck: [9, 8, 7] }]}
          ]},
          { id: "yourday", label: "Your afternoon", sections: [
            { h: "Your afternoon", meta: "Scored at the whistle", ruleY: true, panels: [{ t: "scored", total: 33, max: 55, rows: [
              [true, "Ireland get the bonus point", "Late on, as 34% predicted", 15],
              [false, "Exact score, 13-20", "Finished 16-23", 0],
              [true, "The big call: take the three", "With 58% of the country", 12],
              [true, "Play-along quiz", "Two of two", 6]
            ], note: "Your best round of the championship." }]},
            { h: "Your Six Nations", meta: "Round 5 settled", panels: [{ t: "leagueft" }] },
            { h: "Your streak", meta: "4 rounds", panels: [{ t: "streak", weeks: ["R2","R3","R4","R5","R1"], on: [0,1,2,3], next: 4,
              note: "Four rounds running. The autumn internationals restart it in November." }]},
            { h: "Next up", meta: "Super Saturday", panels: [{ t: "nextfix", fixture: "France v Ireland", when: "Sat 20:00 · BBC One",
              sub: "The championship decider, and your round 6 opens Thursday", cta: "Remind me and open my Predictor",
              on: "Set for Saturday", off: "One notification on Thursday. One on Saturday. Nothing else.",
              onNote: "Round 6 opens Thursday. Your streak survives if you play before kick-off." }]}
          ]},
          { id: "stats", label: "Stats", sections: [
            { h: "Final stats", meta: "Opta", panels: [{ t: "stats", rows: [
              ["56%", "Possession", "44%", 56], ["59%", "Territory", "41%", 59],
              ["1", "Tries", "4", 20], ["16", "Turnovers conceded", "11", 59],
              ["88%", "Lineout won", "96%", 48], ["9", "Penalties conceded", "13", 41]
            ]}]},
            { h: "The story in one number", panels: [{ t: "note", body: "Wales won territory by eighteen points and lost the try count four to one. Ireland scored three of their four from set piece inside the 22, which is the thing Wales knew was coming and could not stop." }] }
          ]}
        ]
      }
    }
  }
];

/* =========================================================================
   Global lifecycle states
   ========================================================================= */

const LIFECYCLE = [
  { id: "buildup", label: "Build-up", blurb: "before it starts" },
  { id: "live", label: "Live", blurb: "while it's happening" },
  { id: "fulltime", label: "Near-live", blurb: "highlights, clips and catch-up, straight after" }
];

/* =========================================================================
   Home copy per lifecycle state
   ========================================================================= */

const HOMECOPY = {
  buildup: { strap: "Saturday 26 June 2027" },
  live: { strap: "Saturday 26 June 2027 · 16:42" },
  companion: { strap: "Saturday 26 June 2027 · on the sofa" },
  fulltime: { strap: "Saturday 26 June 2027 · the evening after" }
};

/* =========================================================================
   Bottom-nav screens other than Home
   ========================================================================= */

const NAVSCREENS = {
  shorts: {
    title: "Shorts",
    sections: [
      { h: "Today on Shorts", meta: "All sports", panels: [{ t: "shortsgrid", deck: [1, 2, 7, 9, 5, 0, 3, 8, 6, 4] }]}
    ]
  },
  mysport: {
    title: "My Sport",
    sections: [
      { flush: true, panels: [{ t: "mysport" }] },
      { h: "Your Predictor", meta: "Across four sports", panels: [{ t: "league" }] },
      { h: "Your streak", meta: "3 weeks", panels: [{ t: "streak", weeks: ["W3","W4","W5","W6","W7"], on: [1,2,3], next: 4,
        note: "Three weeks running. One more keeps it alive." }] }
    ]
  },
  scores: {
    title: "Scores & Fixtures",
    sections: [
      { h: "Live now", meta: "Saturday 26 June", panels: [{ t: "scorelist", items: [
        ["England 284-6", "", "Australia 372", "", "Day 3", true],
        ["Raducanu", "6 4", "Vondroušová", "4 5", "Set 2", true],
        ["Wales", "13", "Ireland", "16", "64'", true]
      ]}]},
      { h: "Later today", meta: "Kick-off times BST", panels: [{ t: "scorelist", items: [
        ["England", "", "Netherlands", "", "19:45", false],
        ["Scotland", "", "Italy", "", "20:00", false]
      ]}]},
      { h: "Earlier", panels: [{ t: "scorelist", items: [
        ["Alcaraz", "3", "Musetti", "0", "FT", false],
        ["Sinner", "3", "Fils", "0", "FT", false]
      ]}]}
    ]
  },
  search: {
    title: "Search",
    sections: [
      { panels: [{ t: "searchbox" }] },
      { h: "Trending", panels: [{ t: "chips", items: ["Ashes Lord's", "Wimbledon order of play", "Root", "100 years of BBC Wimbledon", "Six Nations table", "Predictor"] }] }
    ]
  }
};


/* =========================================================================
   Home feed — the modules around the live rail
   ========================================================================= */

const HOMEFEED = {

  hero: {
    buildup: {
      kicker: "Ashes · Day 3",
      head: "England start day three 224 behind at Lord's",
      stand: "Root and Brook resume with seven wickets standing and a forecast that favours the bowlers",
      photo: { img: "ck-squad", cap: "The England Test squad" }, sport: "cricket", article: "st-buildup",
      comments: "418", likes: "5k", shares: "204",
      poll: { id: "hero-buildup", imgs: ["ck-stokes", "ck-starc"],  q: "Have your say: Can England avoid the follow-on?",
        opts: ["They will", "No chance"], split: [61, 39],
        after: "The country is more optimistic than the forecast." }
    },
    live: {
      kicker: "Wimbledon · Court 2",
      head: "Raducanu has three break points and the grounds are emptying towards Court 2",
      stand: "Of everything live across four sports this afternoon, this is the one people are switching to",
      photo: { img: "tn-tracking", cap: "Raducanu on the baseline, Court 2" }, sport: "tennis", article: "st-live",
      comments: "262", likes: "3k", shares: "123",
      poll: { id: "hero-live", imgs: ["tn-stretch", "tn-dejected"],  q: "Have your say: Does she break here?",
        opts: ["She breaks", "Vondroušová holds"], split: [68, 32],
        after: "68% of 18,440 fans backed the break." }
    },
    companion: {
      kicker: "Wimbledon · Court 2",
      head: "Raducanu three points from levelling it, and Court 2 is filling up",
      stand: "Vondroušová has won nine points on her second serve all set. The crowd has worked out where to be",
      photo: { img: "tn-smile", cap: "Raducanu at the All England Club" }, sport: "tennis", article: "st-companion",
      comments: "188", likes: "2k", shares: "96",
      poll: { id: "hero-companion", imgs: ["tn-stretch", "tn-plan"],  q: "Have your say: Should BBC One switch to Court 2?",
        opts: ["Switch it", "Stay on Centre"], split: [59, 41],
        after: "The gallery sees this at the next changeover." }
    },
    fulltime: {
      kicker: "The day in one line",
      head: "Root unbeaten on 148, Raducanu through, and Ireland get the bonus point with a minute left",
      stand: "Four sports, four results, and everything you predicted this afternoon settled within the hour",
      photo: { img: "ck-lords", cap: "England celebrate at Lord's" }, sport: "cricket", article: "st-fulltime",
      comments: "902", likes: "11k", shares: "477",
      poll: { id: "hero-fulltime", imgs: ["ck-huddle", "tn-best", "rg-roar"],  q: "Have your say: Performance of the day?",
        opts: ["Root", "Raducanu", "Ireland"], split: [52, 31, 17],
        after: "Root takes it, and it was not close." }
    }
  },

  /* a standings module, F1-style, with abstract badges */
  standings: {
    title: "Six Nations table",
    cols: ["P", "W", "PD", "Pts"],
    rows: [
      ["France", "#2B4C9B", "FR", ["4", "4", "+61", "19"]],
      ["Ireland", "#1E7A45", "IE", ["4", "3", "+44", "17"]],
      ["England", "#B9BEC6", "EN", ["4", "3", "+22", "14"]],
      ["Scotland", "#2E5F86", "SC", ["4", "2", "+3", "10"]],
      ["Italy", "#3E6DB5", "IT", ["4", "1", "-38", "6"]],
      ["Wales", "#9E2B2B", "WA", ["4", "0", "-92", "2"]]
    ],
    note: "Ireland need a bonus-point win this afternoon and France to slip."
  },

  comps: {
    title: "Football competitions",
    tabs: [
      { name: "Premiership", colour: "#1E7A45", initials: "SP", cols: ["P", "W", "D", "L", "GD", "Pts"], rows: [
        ["Celtic", "#1E7A45", "CE", ["1", "1", "0", "0", "3", "3"]],
        ["Rangers", "#2B4C9B", "RA", ["1", "1", "0", "0", "2", "3"]],
        ["Aberdeen", "#9E2B2B", "AB", ["1", "1", "0", "0", "1", "3"]],
        ["Hearts", "#7A1F2B", "HE", ["1", "0", "1", "0", "0", "1"]]
      ]},
      { name: "Premier League", colour: "#4B2E83", initials: "PL", cols: ["P", "W", "D", "L", "GD", "Pts"], rows: [
        ["Arsenal", "#B23A3A", "AR", ["31", "22", "5", "4", "41", "71"]],
        ["Liverpool", "#9E2B2B", "LI", ["31", "21", "6", "4", "38", "69"]],
        ["Man City", "#4E9ECF", "MC", ["31", "20", "5", "6", "35", "65"]],
        ["Chelsea", "#2B4C9B", "CH", ["31", "17", "7", "7", "19", "58"]]
      ]}
    ]
  },

  bbcrail: {
    title: "Sport on the BBC",
    items: [
      { badge: "", title: "Sports Personality", sub: "Voting opens Monday", motif: "crowd", sport: "Football", g: ["#2A2438", "#100C18"] },
      { badge: "LIVE", title: "Test Match Special", sub: "Lord's, day 3 evening", motif: "oval", sport: "Cricket", g: ["#1B3A22", "#08170E"] },
      { badge: "LIVE", title: "Boxing", sub: "Thompson v Ramirez", motif: "ring", g: ["#3A1622", "#170A0F"] },
      { badge: "", title: "Match of the Day", sub: "Tonight, 22:30", motif: "pitch", g: ["#123D22", "#071A0E"] }
    ]
  },

  rumours: {
    title: "Transfer rumour latest",
    items: [
      ["Official bid for Arne Engels", "21k views", "#1E7A45", "CE"],
      ["Ipswich open talks for star Maeda", "21k views", "#2B4C9B", "IP"],
      ["Rangers weigh up move for Tavernier replacement", "17k views", "#7A1F2B", "RA"]
    ]
  },

  videos: { title: "Watch: Today's best", deck: [1, 2, 6, 11, 8, 3, 5, 4],
    decks: {
      buildup: [0, 5, 8, 11, 6, 2, 3, 4],
      live: [1, 2, 6, 11, 8, 3, 5, 0],
      companion: [11, 4, 1, 3, 6, 0, 2, 8],
      fulltime: [10, 7, 9, 1, 11, 2, 6, 4]
    } }
};

/* ---------------------------------------------------------------------------
   The story so far. One per event, shown at the top of the live and
   second-screen states. Three ways into the same story: watch the moments
   as a rapid recap, listen to it read, or read it. Moments with no picture
   render as a graphic card rather than borrowing a photo that shows the
   wrong side celebrating.
   ------------------------------------------------------------------------- */
const RECAPS = {
  football: {
    listen: "1:40", read: "1 min", voice: "Read by BBC Radio 5 Live",
    synopsis: [
      "England lead through Bukayo Saka's goal seven minutes after half-time, and have looked more comfortable since than at any point before it.",
      "The Netherlands had the better of the first half. They pressed high, won the ball back in England's third eleven times, and Cody Gakpo hit the bar on 24 minutes. England's best chance before the break fell to Harry Kane, whose shot from the edge of the area was tipped round the post.",
      "Since the goal England have sat deeper and let the Netherlands have the ball. Jordan Pickford has had one save to make, from Xavi Simons on 64 minutes."
    ],
    moments: [
      ["12'", "Kane tests Verbruggen", "Low shot from the edge of the area, tipped round the post.", "fb-kane", "chance"],
      ["24'", "Gakpo hits the bar", "Curled from the corner of the box with Pickford beaten.", null, "chance"],
      ["38'", "Rice booked", "Late on Reijnders. One more yellow and he misses the next match.", null, "card"],
      ["HT", "Half-time: 0-0", "Netherlands 58% of the ball. England two shots on target to one.", null, "break"],
      ["52'", "Goal: Saka", "Kane's pass inside the full-back, one touch past Van Dijk, near post.", "fb-celebrate", "goal"],
      ["64'", "Pickford saves from Simons", "The Netherlands' only shot on target. Parried and cleared.", null, "chance"]
    ]
  },
  cricket: {
    listen: "2:05", read: "1 min", voice: "Read by Test Match Special",
    synopsis: [
      "Joe Root is 121 not out and England are 284-6, 88 behind Australia's 372. He started the day on 62 and has batted through every session.",
      "The morning belonged to Australia. Harry Brook was bowled by Nathan Lyon for 29, two more wickets followed before lunch, and England went in at 168-5 with the follow-on still five runs away.",
      "Root and Ben Stokes then put on 88 across the afternoon. Root reached his second Ashes hundred at Lord's after tea, Stokes fell for 43 caught behind off Mitchell Starc, and the new ball is due in eight overs."
    ],
    moments: [
      ["11:00", "Play resumes on 148-3", "Root 62, Brook 11. England 224 behind.", "ck-bat", "start"],
      ["11:48", "Brook b Lyon 29", "Went back to one that skidded on. Australia's first breakthrough of the day.", null, "wicket"],
      ["12:55", "Lunch: 168-5", "Two more gone in the last half-hour. The follow-on is five runs away.", null, "break"],
      ["13:41", "Follow-on saved", "Stokes drives Cummins through the covers.", null, "milestone"],
      ["16:42", "Root's hundred", "His second Ashes century at Lord's, from 243 balls. The slowest of his career and the most needed.", "ck-root", "milestone"],
      ["17:31", "Stokes c Carey b Starc 43", "Loose drive at a wide one. The stand ends on 88.", null, "wicket"]
    ]
  },
  tennis: {
    listen: "1:15", read: "1 min", voice: "Read by BBC Radio 5 Sports Extra",
    synopsis: [
      "Emma Raducanu won the first set 6-4 and has three break points to level the second at 5-5, with Markéta Vondroušová serving for the set.",
      "She broke early in the first, was broken straight back, then broke again at 4-4 and served it out to love. Her first serve has been the difference: 68% in, and four of five break points taken.",
      "Vondroušová found her range at the start of the second, broke to lead 3-2 and has held every time since. The crowd walking over from the outside courts tells you what the next point is worth."
    ],
    moments: [
      ["Set 1 · 2-1", "Early break", "Backhand return down the line on the first break point of the match.", "tn-tracking", "score"],
      ["Set 1 · 3-3", "Broken straight back", "Two double faults in one game. The only loose one she has played.", "tn-dejected", "chance"],
      ["Set 1 · 6-4", "First set Raducanu", "Broke at 4-4 and served it out to love.", "tn-stretch", "goal"],
      ["Set 2 · 2-3", "Vondroušová breaks", "A lob off the frame lands on the baseline.", null, "chance"],
      ["Set 2 · 4-5", "0-40 on the Vondroušová serve", "Serving for the set, three break points down. Court 2 is filling up.", null, "milestone"]
    ]
  },
  rugby: {
    listen: "1:50", read: "1 min", voice: "Read by BBC Radio 5 Live",
    synopsis: [
      "Ireland lead 16-13 with a quarter of an hour left, and the TMO is looking at what would be their third try.",
      "They have scored the only two tries from open play but missed both conversions, which is why Wales are still within a score. Wales' try came from a driving maul after 33 minutes and put them 10-8 up at half-time.",
      "The second half has been a kicking contest. Ireland need two more tries for the bonus point that keeps them in the title race."
    ],
    moments: [
      ["6'", "Try: Keenan", "Eleven phases, finished in the right corner. Conversion missed. 0-5.", "rg-run", "goal"],
      ["33'", "Try: Wales, converted", "Driving maul from a lineout fifteen metres out. 10-8.", "rg-maul", "goal"],
      ["HT", "Wales 10-8 Ireland", "Ireland have had 61% of the territory and not 61% of the scoreboard.", null, "break"],
      ["47'", "Try: Ireland", "Over from a scrum on the Wales line. Conversion hits the post. 10-13.", null, "goal"],
      ["61'", "Penalty: Ireland", "Wales offside at the ruck, 35 metres out. 13-16.", null, "score"],
      ["64'", "TMO: grounding in the corner", "A third try would put the bonus point back in reach.", null, "milestone"]
    ]
  }
};

/* what is said in each short, for anyone watching with the sound off.
   Written as a summary rather than as quotation: these are real people and
   the prototype does not put words in their mouths. Where the frame itself
   carries a subtitle, that line is used as it appears. */
const TRANSCRIPTS = {
  "ck-hope": "A former Australia captain on England's chances going into Lord's. Subtitle on screen: \u201cI know everyone judged the English boys really harshly in Perth.\u201d He goes on to say the conditions at Lord's should suit England's seamers better.",
  "ck-tms": "The Test Match Special box as a wicket falls. The commentators are out of their seats, one with both arms up, and the call is drowned out by the ground. The full passage is on BBC Sounds.",
  "tn-secret": "Raducanu is asked for a secret talent and laughs before answering. Subtitle on screen: \u201cspeak a few languages\u201d.",
  "tn-challenge": "A trick-shot challenge filmed off court. Several attempts, one near miss, and a lot of laughing at the result.",
  "tn-books": "At a press conference Raducanu is asked what she is reading during the fortnight and talks through the books she has on the go.",
  "fb-debate": "A pundit sets out the selection question for tonight: which of the two starts depends on whether England line up with a back four or a back three.",
  "fb-tuchel": "A studio piece on why the England head coach has suited this squad, looking back at how the appointment was received and what has changed since.",
  "fb-bellingham": "A short on the second-half performance, built around the number of touches in the opposition box after the break.",
  "rg-wales": "Wales players leave the field after the autumn defeat, with the coaching team's week in Cardiff as the backdrop to Saturday.",
  "rg-roar": "The fourth Ireland try from two angles: held up twice on the line, then grounded, and the celebration that followed.",
  "ck-carse": "The England captain is interviewed pitchside with a BBC Sport microphone, talking through the decision on the batting order. The full interview is on BBC Sounds.",
  "ar-debut": "Archive material from June 1937: the outside broadcast vans at the All England Club and the first television pictures of the Championships."
};

/* ---------------------------------------------------------------------------
   Other screens. The same events, told for the website and for iPlayer on a
   television. What differs is not the data but what each screen is for.
   ------------------------------------------------------------------------- */

/* the conversation: lives on the phone and the website, never on the telly */
const COMMENTS = {
  football: [
    ["JM", "Jess M", "2m", "Saka's goal came from Kane dropping deep. Nobody tracked him. Twice now.", "412"],
    ["RK", "Rav K", "4m", "We have been sitting too deep since 55. Asking for trouble.", "287"],
    ["TO", "Tom O", "7m", "Rice one booking from missing the next match and still going into every tackle.", "166"],
    ["AB", "Aisha B", "9m", "Netherlands have had the ball and done nothing with it. Happy with that.", "98"]
  ],
  cricket: [
    ["DP", "Dave P", "1m", "Root at Lord's with the new ball eight overs away. This is the session.", "644"],
    ["SH", "Sarah H", "3m", "Stokes drive was the only loose shot all afternoon and it cost him.", "309"],
    ["NC", "Neil C", "6m", "TMS on, telly off, scorecard open. Perfect Saturday.", "251"],
    ["PL", "Priya L", "11m", "Follow-on saved. Now bat all of tomorrow please.", "120"]
  ],
  tennis: [
    ["EW", "Ellie W", "30s", "Three break points and Court 2 has never been this full.", "902"],
    ["MJ", "Marcus J", "2m", "Her first serve percentage is the whole story of this match.", "344"],
    ["KF", "Kat F", "5m", "Switched from Centre for this. Right call.", "217"],
    ["OB", "Olly B", "8m", "Vondroušová's lob at 2-3 was absurd. Credit where it is due.", "133"]
  ],
  rugby: [
    ["GW", "Gareth W", "40s", "If that is given it is 23-13 and the bonus point is on.", "518"],
    ["CN", "Ciara N", "3m", "Two missed conversions. That is the only reason Wales are in this.", "402"],
    ["HR", "Huw R", "6m", "Our maul is the one thing working. Keep kicking to the corner.", "190"],
    ["LD", "Liam D", "10m", "Territory 56% and a three-point lead. Should be out of sight.", "141"]
  ]
};

/* what the telly shows as it happens, one line at a time */
const TVMOMENTS = {
  football: [["70'", "Chance", "Kane's shot is blocked on the line", "fb-kane"], ["72'", "Corner", "England's seventh of the half", null], ["74'", "Save", "Pickford tips over from Simons", null]],
  cricket: [["89.3", "FOUR", "Root drives Starc through extra cover", "ck-bat"], ["89.5", "Appeal", "Not out. Australia have no reviews left", null], ["90.0", "Drinks", "England 288-6, trail by 84", null]],
  tennis: [["0-40", "Break point", "Vondroušová saves the first with an ace", "tn-stretch"], ["15-40", "Break point", "Second saved at the net", "tn-dejected"], ["Break", "Raducanu breaks", "Five games all in the second set", "tn-best"]],
  rugby: [["64'", "TMO", "Checking the grounding in the corner", "rg-run"], ["65'", "Try given", "Ireland 21-13. Conversion to come", "rg-roar"], ["67'", "Penalty", "Wales kick to the corner", "rg-maul"]]
};

/* the next things on, for the reminders rail */
const COMINGUP = [
  { t: "Wales v Ireland", s: "Six Nations", when: "17:15", ch: "BBC One", img: "rg-wales", id: "rg-ko" },
  { t: "England v Netherlands", s: "Nations League", when: "19:45", ch: "BBC One", img: "fb-debate", id: "fb-ko" },
  { t: "Match of the Day", s: "Nations League special", when: "22:30", ch: "BBC One", img: "fb-celebrate", id: "motd" },
  { t: "The Ashes, day 4", s: "Test Match Special", when: "Sun 10:30", ch: "Radio 5 Sports Extra", img: "ck-squad", id: "ck-d4" },
  { t: "Wimbledon, day 7", s: "Middle Sunday", when: "Sun 11:00", ch: "BBC Two", img: "tn-smile", id: "tn-d7" }
];


/* ---------------------------------------------------------------------------
   Articles. Tapping a story opens it; reactions, comments and share stay as
   overlays so nobody loses the live page to leave a heart.
   ------------------------------------------------------------------------- */
const ARTICLES = {
  w100: {
    kicker: "Wimbledon · 100 years on the BBC", title: "From a hut beside Centre Court to eighteen courts in your pocket",
    byline: "BBC Sport · from the archive", read: "6 min read", hero: "ar-court",
    heroCap: "A men's singles match on an early Wimbledon grass court, in front of a packed stand",
    sport: "tennis", comments: "1.2k", likes: "8.4k", shares: "640",
    blocks: [
      ["p", "In 1927 the BBC put a commentator in a small hut beside Centre Court and let him describe what he saw. A hundred years later you can watch any of eighteen courts on a phone, pick your commentary, and be told when the match you are not watching becomes the one to see."],
      ["p", "Television followed ten years after radio. On 21 June 1937 a single camera sent pictures of Centre Court to the few thousand London homes that owned a set. The coverage was short, a matter of minutes, and it was not even listed in that week's schedule. By the next summer it ran for hours."],
      ["img", "ar-debut", "A poster marking the first televised Championships in June 1937: three outside broadcast vans for about twenty-five minutes of tennis a day"],
      ["h", "Moving the camera"],
      ["p", "Outside broadcasting was new enough that the distance from the transmitter decided what could be shown at all. In 1939 the cameras moved to the end of the court, which is where the main camera still sits. Then the war stopped television altogether, and Wimbledon came back with it in 1946."],
      ["img", "ar-notice", "A listing from the late 1930s, announcing that the experiment of televising Centre Court would carry on through the week"],
      ["p", "The tennis had to share. In 1948 and 1949 the Test at Lord's took priority on the same afternoons, which meant very little Wimbledon on screen in those two summers. It is not the last time the two have wanted the same Saturday."],
      ["img", "ar-lords", "Wimbledon and Lord's on the same afternoon, as the papers put it"],
      ["h", "Colour, and after"],
      ["p", "In July 1967 Wimbledon was chosen to launch colour television in Britain on BBC Two, and the grass turned green. Dan Maskell's commentary carried the next three decades. In 2011 the final was used for the BBC's first attempt at a 3D broadcast."],
      ["img", "ar-ident", "BBC Television presents: the opening titles viewers knew for years"],
      ["p", "Counted by the number of times it has been on air, the Championships are the 38th most broadcast programme in the BBC's history: 2,304 broadcasts between 1937 and 2021, across BBC One, BBC Two and the pre-war television service."],
      ["img", "ar-table", "Wimbledon on BBC television by timeslot, day, channel and year, 1937 to 2021"],
      ["h", "The programmes"],
      ["p", "For the fans who could not get a ticket, the official magazine was the next best thing: previews, player profiles and the order of play, with a cover star who would be the talk of the fortnight."],
      ["img", "ar-mag93", "The official BBC Sports magazine for Wimbledon 1993"],
      ["img", "ar-mag99", "Wimbledon 99, with the home favourites on the cover"],
      ["p", "What a hundred years of coverage adds up to is a habit. The first radio listeners tuned in because they could not be there. The job now is the same, with more courts, more choice, and fewer reasons to miss the moment that matters."]
    ]
  },
  "st-buildup": {
    kicker: "Ashes · Day 3", title: "England start day three 224 behind at Lord's", byline: "BBC Sport", read: "3 min read",
    hero: "ck-squad", heroCap: "The England Test squad", sport: "cricket", comments: "418", likes: "5k", shares: "204",
    blocks: [
      ["p", "England resume on 148-3, still 224 runs short of Australia's 372, and 25 short of saving the follow-on. Root and Brook are the not-out batters, and both got through the last hour of day two without much alarm."],
      ["p", "The forecast is the complication. Cloud is expected over St John's Wood until lunch, and the second new ball is due in the first hour. If England are still batting at tea, the draw comes into view."],
      ["img", "ck-ashsquad", "The England squad named for the series"],
      ["p", "Test Match Special is on from 10:30 on Radio 5 Sports Extra and BBC Sounds, with ball-by-ball text on this page."]
    ]
  },
  "st-live": {
    kicker: "Wimbledon · Court 2", title: "Raducanu has three break points and the grounds are emptying towards Court 2", byline: "BBC Sport", read: "2 min read",
    hero: "tn-tracking", heroCap: "Raducanu on the baseline, Court 2", sport: "tennis", comments: "262", likes: "3k", shares: "123",
    blocks: [
      ["p", "Raducanu took the first set 6-4 and is 0-40 up on Vondroušová's serve at 4-5 in the second. Win any one of the next three points and the set is level at five games all."],
      ["p", "The story of the match has been second serve. Vondroušová has won nine points on hers all set, and every one of her service games since the opener has gone to deuce or worse."],
      ["img", "tn-stretch", "Raducanu stretches for a backhand"],
      ["p", "Court 2 is live on BBC iPlayer and the BBC Sport app, with commentary on Radio 5 Sports Extra."]
    ]
  },
  "st-companion": {
    kicker: "Wimbledon · Court 2", title: "Raducanu three points from levelling it, and Court 2 is filling up", byline: "BBC Sport", read: "2 min read",
    hero: "tn-smile", heroCap: "Raducanu at the All England Club", sport: "tennis", comments: "188", likes: "2k", shares: "96",
    blocks: [
      ["p", "While BBC One stays with Alcaraz and Musetti on Centre Court, the match of the afternoon has moved to Court 2. Raducanu has three break points at 4-5 in the second set."],
      ["p", "Vondroušová has won nine points on her second serve all set. The stands on Court 2 were half empty at the start of the set and are full now."],
      ["img", "tn-plan", "Raducanu on her Wimbledon plans"]
    ]
  },
  "st-fulltime": {
    kicker: "The day in one line", title: "Root unbeaten on 148, Raducanu through, and Ireland get the bonus point with a minute left",
    byline: "BBC Sport", read: "4 min read", hero: "ck-lords", heroCap: "England celebrate at Lord's", sport: "cricket", comments: "902", likes: "11k", shares: "477",
    blocks: [
      ["p", "At Lord's, Root batted through the day to finish unbeaten on 148 and England saved the follow-on with eleven runs to spare. They trail by 11 going into day four."],
      ["img", "ck-root", "Root celebrates his century"],
      ["p", "At Wimbledon, Raducanu broke at 4-5 in the second set and won in straight sets, 6-4, 7-5, to reach the fourth round on the middle Sunday."],
      ["img", "tn-best", "Raducanu after match point"],
      ["p", "In Cardiff, Ireland's fourth try came with a minute left and took the bonus point, keeping their title hopes alive into the final round. And at Wembley, England beat the Netherlands 2-1."],
      ["img", "rg-roar", "Ireland at the final whistle"]
    ]
  }
};

/* the programme reader, a page at a time */
const READER = [
  ["ar-mag93", "1993", "The official BBC Sports magazine for the Championships, on sale at £2.95"],
  ["ar-mag99", "1999", "Wimbledon 99, in association with the All England Club"],
  ["ar-debut", "1937", "A poster marking the first live television pictures from Wimbledon, 21 June 1937"],
  ["ar-notice", "1930s", "Televising the Centre Court: the listing for the second week of the experiment"],
  ["ar-lords", "From the papers", "You can spend the day at Wimbledon and Lord's"],
  ["ar-table", "1937 to 2021", "Every year of Wimbledon on BBC television, counted"]
];

/* the notifications a fan would actually get today, newest first */
const NOTIFS = {
  buildup: [
    ["remind", "Wimbledon starts at 11:00", "18 courts in play. Raducanu is on Court 2, not before 13:00.", "Now", "tennis"],
    ["cricket", "TMS is on air", "Day 3 from Lord's. England 148-3, 224 behind.", "10:30", "cricket"],
    ["poll", "Your prediction is locked in", "England to avoid the follow-on. Settles today.", "Yesterday", null]
  ],
  live: [
    ["spark", "Court 2 is the one to watch", "Raducanu has three break points at 4-5.", "Now", "tennis"],
    ["goal", "England 1-0 Netherlands", "Saka, 52 minutes.", "16m", "football"],
    ["cricket", "Root reaches 100", "His second Ashes hundred at Lord's.", "34m", "cricket"],
    ["chat", "Kat F replied to you", "Switched from Centre for this. Right call.", "41m", null]
  ],
  companion: [
    ["tv", "Your TV and phone are paired", "Following BBC One on Living room TV. Your phone waits for the picture.", "Now", null],
    ["spark", "Worth a switch: Court 2", "Raducanu has three break points while your TV is on Centre Court.", "1m", "tennis"],
    ["poll", "The big call closes at the changeover", "Should BBC One switch to Court 2?", "3m", "tennis"]
  ],
  fulltime: [
    ["tick", "Your day is scored", "41 of 55. Your best day of the Championships.", "Now", null],
    ["play", "Highlights are ready", "England v Netherlands, and the match in 60 seconds.", "12m", "football"],
    ["remind", "Tomorrow: the middle Sunday", "Raducanu in the fourth round, not before 14:00.", "20m", "tennis"]
  ]
};

const NOTIFTYPES = [
  ["start", "When a match starts", "One nudge, for things you follow", true],
  ["key", "Goals, wickets, breaks and tries", "Held back to match your TV when paired", true],
  ["switch", "Worth switching to", "When something you are not watching gets good", true],
  ["settle", "When your predictions settle", "", true],
  ["reply", "Replies to your comments", "", false]
];

/* ---------------------------------------------------------------------------
   Who you watch with. The picture is the same; the voice over it is a
   choice. BBC commentary, the radio call synced to the picture, a presenter
   or creator watching along, or no voice at all.
   [id, short label, name, line, group, initials, colour]
   ------------------------------------------------------------------------- */
const VOICES = {
  football: [
    ["bbc", "BBC One", "BBC One commentary", "The match commentary team, as broadcast", "BBC commentary", "", ""],
    ["radio", "5 Live", "5 Live commentary", "The radio call, held back to match your picture", "BBC commentary", "", ""],
    ["host", "Chapman", "Mark Chapman watchalong", "5 Live Sport, reacting live and reading your messages", "Watch with", "MC", "#E4002B"],
    ["creator", "The Terrace", "The Terrace", "Fan channel watchalong · 410k followers", "Watch with", "TT", "#7A3FD1"],
    ["crowd", "Crowd", "Crowd only", "No commentary. Just Wembley", "No voice", "", ""],
    ["ad", "Described", "Audio described", "Commentary that says what is on screen", "No voice", "", ""]
  ],
  tennis: [
    ["bbc", "BBC", "BBC commentary", "The Court 2 commentary team", "BBC commentary", "", ""],
    ["radio", "5 Sports Extra", "5 Sports Extra", "The radio call, held back to match your picture", "BBC commentary", "", ""],
    ["creator", "Baseline Club", "Baseline Club", "Creator watchalong · 180k followers", "Watch with", "BC", "#1E8C5A"],
    ["crowd", "Court 2", "Court sound only", "Ball, strings and the crowd", "No voice", "", ""],
    ["ad", "Described", "Audio described", "Commentary that says what is on screen", "No voice", "", ""]
  ],
  rugby: [
    ["bbc", "BBC One", "BBC One commentary", "The match commentary team, as broadcast", "BBC commentary", "", ""],
    ["radio", "5 Live", "5 Live commentary", "The radio call, held back to match your picture", "BBC commentary", "", ""],
    ["host", "Scrum V", "Scrum V watchalong", "BBC Wales, in Welsh and English", "Watch with", "SV", "#C8102E"],
    ["creator", "Ruck & Maul", "Ruck & Maul", "Creator watchalong · 95k followers", "Watch with", "RM", "#128D51"],
    ["crowd", "Crowd", "Crowd only", "No commentary. The roof is closed", "No voice", "", ""],
    ["ad", "Described", "Audio described", "Commentary that says what is on screen", "No voice", "", ""]
  ],
  cricket: [
    ["bbc", "TMS", "Test Match Special", "Ball by ball, with the chat", "BBC commentary", "", ""],
    ["radio", "Ball by ball", "TMS, ball by ball only", "The call on each delivery, none of the cake", "BBC commentary", "", ""],
    ["creator", "Third Man", "Third Man Pod", "Creator listen-along · 60k followers", "Listen with", "3M", "#1A3A6B"]
  ]
};

/* the experts and the voices around a match. Answers are summarised by
   topic and played as audio from the show, never written up as quotes */
const PUNDITS = {
  football: {
    hosts: [
      ["MC", "Mark Chapman", "5 Live Sport", "On air now", "#E4002B", "host"],
      ["DR", "Dan Roan", "BBC Sports Editor", "Answering after the match", "#3B3B3B", null],
      ["TT", "The Terrace", "Fan channel · 410k", "Watching along", "#7A3FD1", "creator"]
    ],
    qs: [["Why has Palmer come off with twenty to go?", "Rav K", "1.2k"], ["If England hold on, is this the Euros side?", "Jess M", "860"], ["Who is on penalties if Kane goes off?", "Tom O", "402"]],
    answered: [["Mark Chapman", "On whether England should sit on a one-goal lead", "0:48"], ["Dan Roan", "On Wembley ticket prices and the empty seats", "1:12"]]
  },
  tennis: {
    hosts: [
      ["5S", "5 Sports Extra", "Court 2 commentary", "On air now", "#007A78", null],
      ["DR", "Dan Roan", "BBC Sports Editor", "Q&A at 18:00", "#3B3B3B", null],
      ["BC", "Baseline Club", "Creator · 180k", "Watching along", "#1E8C5A", "creator"]
    ],
    qs: [["Why is her second serve so much stronger this year?", "Kat F", "940"], ["Can Court 2 get a roof before the centenary?", "Olly B", "512"], ["Who does the winner play on Sunday?", "Ellie W", "301"]],
    answered: [["5 Sports Extra", "On why Court 2 fills up faster than Centre on a day like this", "0:36"], ["Dan Roan", "On the BBC's 100 years at the Championships", "1:40"]]
  },
  rugby: {
    hosts: [
      ["SV", "Scrum V", "BBC Wales", "Watching along", "#C8102E", "host"],
      ["DR", "Dan Roan", "BBC Sports Editor", "Answering after the match", "#3B3B3B", null],
      ["RM", "Ruck & Maul", "Creator · 95k", "Watching along", "#128D51", "creator"]
    ],
    qs: [["How long can a TMO review actually take?", "Ciara N", "780"], ["Does a losing bonus point still matter for Wales?", "Huw R", "455"], ["Why kick to the corner and not the posts?", "Liam D", "260"]],
    answered: [["Scrum V", "On the Wales maul and why it keeps winning penalties", "0:52"]]
  },
  cricket: {
    hosts: [
      ["TM", "Test Match Special", "Your messages on air", "On air now", "#1A3A6B", null],
      ["DR", "Dan Roan", "BBC Sports Editor", "At stumps", "#3B3B3B", null],
      ["3M", "Third Man Pod", "Creator · 60k", "Listening along", "#1A3A6B", "creator"]
    ],
    qs: [["Should England take the new ball straight away?", "Dave P", "1.1k"], ["Is this Root's best Ashes innings?", "Neil C", "730"], ["What does a draw do to the series?", "Priya L", "290"]],
    answered: [["Test Match Special", "On the second new ball and who takes it", "1:05"]]
  }
};

/* ---------------------------------------------------------------------------
   My Sport: the people and teams you follow along the top, then one feed
   of everything they touch, articles, live games, shorts, quizzes and
   the experts, ranked for you. Tap a face to narrow the feed to them.
   follows: [id, name, kind, img or initials, colour, new items]
   ------------------------------------------------------------------------- */
const MYSPORT = {
  follows: [
    ["eng-cricket", "England Cricket", "Team", "ck-huddle", "#1A3A6B", 4],
    ["raducanu", "Emma Raducanu", "Player", "tn-smile", "#BB1919", 3],
    ["england", "England", "Team", "fb-celebrate", "#E8F0FC", 2],
    ["root", "Joe Root", "Player", "ck-root", "#1A3A6B", 2],
    ["wales", "Wales", "Team", "rg-wales", "#C8102E", 1],
    ["chapman", "Mark Chapman", "Presenter", "MC", "#E4002B", 1],
    ["roan", "Dan Roan", "Sports Editor", "DR", "#3B3B3B", 0],
    ["terrace", "The Terrace", "Creator", "TT", "#7A3FD1", 2],
    ["wimbledon", "Wimbledon", "Event", "ar-court", "#1E6B3A", 3]
  ],
  /* kind, tags, and what each card needs. "open" is an event id, "article" an
     ARTICLES key, "play" an index into DROP */
  feed: [
    { k: "article", tags: ["raducanu", "wimbledon"], article: "st-live", img: "tn-tracking", title: "Raducanu has three break points and the grounds are emptying towards Court 2", tag: "Tennis", ago: "12m ago", hero: true },
    { k: "live", tags: ["eng-cricket", "root"], open: "cricket" },
    { k: "article", tags: ["eng-cricket", "root"], article: "st-buildup", img: "ck-squad", title: "England start day three 224 behind at Lord's", tag: "Cricket", ago: "5h ago" },
    { k: "short", tags: ["england"], play: 6 },
    { k: "quiz", tags: ["eng-cricket", "root"], open: "cricket", title: "Who was the last England batter to score an Ashes hundred at Lord's?", tag: "Ashes quiz", ago: "Play along" },
    { k: "qa", tags: ["chapman", "england"], open: "football", who: "Mark Chapman", title: "On whether England should sit on a one-goal lead", dur: "0:48", tag: "Answered on air" },
    { k: "live", tags: ["england", "chapman", "terrace"], open: "football" },
    { k: "short", tags: ["eng-cricket"], play: 1 },
    { k: "article", tags: ["wimbledon", "raducanu"], article: "w100", img: "ar-court", title: "From a hut beside Centre Court to eighteen courts in your pocket", tag: "Wimbledon · 100 years", ago: "1d ago" },
    { k: "live", tags: ["wales"], open: "rugby" },
    { k: "qa", tags: ["roan", "wimbledon"], open: "tennis", who: "Dan Roan", title: "On the BBC's 100 years at the Championships", dur: "1:40", tag: "Answered on air" },
    { k: "short", tags: ["raducanu", "wimbledon"], play: 4 },
    { k: "watchwith", tags: ["terrace", "england"], open: "football", who: "The Terrace", title: "Watching England v Netherlands along with 18,200 others", tag: "Creator watchalong" },
    { k: "short", tags: ["wales"], play: 8 },
    { k: "short", tags: ["eng-cricket"], play: 10 }
  ]
};
