# BBC Sport — Live Experiences prototype

An interactive prototype of a sense-making layer across the BBC Sport live pages,
built for the Visual Data H2 discovery under Bet 4.

Four sports on one Saturday in June 2027, each with its own lifecycle states and
its own tab set, ranked against each other on a shared Home screen.

## Running it

A static site with no build step and no dependencies.

**Locally**

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Opening `index.html` directly with `file://` works too.

**On GitHub Pages**

Push the folder to a repository, then Settings → Pages → Source: *Deploy from a
branch*, branch `main`, folder `/ (root)`. The site appears at
`https://<user>.github.io/<repo>/` within a minute or two.

## Getting around

| Control | What it does |
| --- | --- |
| Lifecycle pills, top of the page | Build-up, Live, Second screen, Full time |
| Swipe left/right on the phone | Same thing, on a touch device |
| `←` `→` arrow keys | Same thing, on a desktop. `Esc` returns to Home |
| Home | A full-bleed takeover of whatever is most worth watching, a picture-led poll, then one card per sport |
| The takeover card | Scoreline and three comparisons for the event at the top of the ranking, in every lifecycle state |
| Tapping a card | Opens that event in the current lifecycle state |
| Match tabs | Each sport in each state has its own tab set |
| The menu, top left | Opens from the right as a profile: follows, your voting record, your comments, rewards, and what is live. Answer a poll anywhere and it appears in Votes |
| Your daily drop | The shorts carousel. Tapping a card takes over the screen; swipe up/down or tap the left/right halves to move through the deck, `Esc` to close |
| Bottom navigation | Home, Shorts, My Sport, Scores and Search all render something |

The prototype carries no commentary about its own design. A separate one-page
explainer covers the arguments, the caveats and what is real, for anyone opening
it for the first time.

## The day

The date is deliberate. The 2027 Ashes runs 18 June to 2 August and Wimbledon
runs across the same fortnight, so an Ashes Test at Lord's and the Wimbledon
third round genuinely collide on a Saturday afternoon. That collision is the
hardest ranking problem the BBC has, and it is what Home is built to show.

**Football** — England v Netherlands, Nations League, Wembley. Opta live match
view, moment-triggered prompts, momentum, player ratings, the score predictor
and the full-time settle-up.

**Cricket** — The Ashes, 2nd Test, Lord's, day 3. Session tracker, ball-by-ball
set, wagon wheel, partnership, win predictor and Test Match Special. The
companion state pairs with the radio rather than the pictures, because the BBC
has radio and text rights to this series and no live video. That makes the app
the primary screen rather than a second one.

**Tennis** — Wimbledon 2027, day 6, and 100 years since the BBC first broadcast
from the Championships in 1927. The Watch now tab is the significance ranking
across eighteen courts with nothing on top of it, and the 100 years tab puts the
archive inside the live page rather than in a collection nobody visits.

**Rugby** — Six Nations, Wales v Ireland, Principality Stadium. Law explainers
for why the whistle went, a live TMO review timer, territory against possession
and a phase tracker. The strongest public-service case in the set.

## Pictures

Photographs live in `img/`, three crops each: `-wide` (16:9), `-tall` (9:13)
and `-sq`. Each one is tagged with the phase of a fixture it belongs to as
well as the sport, and `photoSVG()` in `app.js` asks for the phase the page
is currently in. Build-up shows team news and previews, live shows the ball
in play, full time shows the celebration. The same card in a different
lifecycle state gets a different picture, which is the point of the tagging.

A picture whose shape disagrees badly with the frame is laid across a
blurred bed of itself and faded out, rather than cropped into a thin slice
or upscaled into mush.

**These photographs are third-party sports photography, not BBC-owned
material, and several carry agency credit.** They are here to show what the
layouts look like with real pictures in them. Clear them properly or replace
them before this repository is public or shown outside the team.

Where a sport has no photograph, `scene()` draws one instead: a seeded
generator that builds a stadium from the item, with stands, crowd,
floodlights, the playing surface in perspective, the markings for that sport
and figures on it. The boxing short in the drop deck is the one that still
falls through to it, which is a useful thing to keep working.

## Files

```
index.html     page shell
styles.css     all styling
data.js        every piece of content, as EVENTS + LIFECYCLE + NAVSCREENS
app.js         rendering and interaction, no dependencies
```

To change what any tab shows, edit `data.js`. Panels are declared as objects
with a `t` field naming their renderer; the renderers live in the `P` object in
`app.js`. Adding a fifth sport means adding one entry to `EVENTS` and, if it
needs a display nothing else has, one renderer in `P`.

## Data provenance

Football panels use Opta F24 field names as documented in
[football-docs](https://github.com/withqwerty/football-docs): numeric `typeId`
values, qualifier ids, and the 0–100 pitch coordinate system with the attacking
team always playing left to right.

That index covers football only. The cricket, tennis and rugby schemas here are
extrapolated from the same patterns and need validating against the real feeds
during H2 discovery. The significance score on every Home card is deliberately
the same field computed the same way across all four, which is the architectural
claim the prototype exists to make.

Scores, votes, fan counts, ratings and league positions are illustrative. Poll
results are simulated in the page rather than shared between viewers.

## Fonts

This is the public build, so BBC Reith Sans is deliberately **not** included:
the font is licensed to the BBC and should not be served from a public
repository. The stack falls back to Helvetica.

To restore it internally, drop the WOFF2 files into `fonts/` and put the
`@font-face` rules back at the top of `styles.css`.
