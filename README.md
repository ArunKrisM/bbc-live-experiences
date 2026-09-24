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
| Screen pills, top of the page | App, Website, iPlayer TV and Multiscreen (a TV and a phone paired on one match). iPlayer TV and Multiscreen are work in progress |
| Lifecycle pills, top of the page | Build-up, Live, Near-live |
| Sport nav on the website | Football, Cricket, Tennis and Rugby U open a sport page: today's fixtures (live now, coming up, finished), then stories, journalist posts, expert clips, creator posts and shorts |
| On the TV | Click the TV, then arrow keys move, `Enter` selects or opens the controls, `Esc` goes back, `S` toggles stats |
| Swipe left/right on the phone | Same thing, on a touch device |
| `←` `→` arrow keys | Same thing, on a desktop. `Esc` returns to Home |
| Home | A full-bleed takeover of whatever is most worth watching, a picture-led poll, then one card per sport |
| The takeover card | Scoreline and three comparisons for the event at the top of the ranking, in every lifecycle state |
| Tapping a card | Opens that event in the current lifecycle state |
| Match tabs | Each sport in each state has its own tab set |
| The menu, top right | Opens from the right as a profile: follows, your voting record, your comments, rewards, and what is live as cards. Answer a poll anywhere and it appears in Votes |
| Your daily drop | Ten short-form cards. Tapping one takes over the screen; swipe up/down or tap the halves to move, `Text` shows what is said, `Esc` closes |
| The story so far | At the top of every live and second-screen page: watch the key moments in sixty seconds, listen to them read, or read them |
| Audio | Listen live, a story read aloud and the TMS clip all play in a bar above the navigation that keeps going as you move around |
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

## Watching, spoilers and reactions

Watch live on the Home hero opens the match with the video already playing.
The shrink button keeps it playing in a small player while you read the rest
of the page. Football, tennis and rugby get pictures. Cricket gets Test Match
Special with a live transcript, because the BBC holds radio rights only.

Hide scores is on by default in Near-live and is a switch in the menu the
rest of the time. Cards, the hero, the website and the TV all hold the score
back, celebratory photographs included, and each match leads with the
60-second catch-up, highlights, or a reveal.

Hearts work in place. Comments, share and notifications open as sheets over
the page. Tapping a story opens the article. Light mode is in the menu.

The tennis 100 years tab has archive clips, a programme reader and a long read
on the BBC at Wimbledon. The archive pictures are draft material and need
clearing before anything goes public.

## Commentary, watchalongs and the experts

The chip on every player says who you are listening to. The same list runs on
the phone, the website and the TV: BBC commentary, the radio call synced to
the picture, a presenter or creator watching along, or no voice at all. Full
screen works from the Home hero and the player, upright or turned sideways.

Every match page has Ask the experts: the presenters, journalists and
creators around the match, a question box, votes on other fans' questions and
the answers that went out on air as audio. On the TV the same people appear
under The experts in the player controls, with Watch with, the answers on air,
and a code to ask from your phone. Answers are summarised by topic and never
written up as quotes. The creator channels are invented placeholders.

## Multiscreen

The second-screen experience is a screen choice rather than a part of the
day. Multiscreen pairs a TV and a phone on England v Netherlands and runs
through all three states. Build-up: the match leads the TV's home screen and
the phone is nudged to predict the score and check team news. Live: the TV
plays the match, the phone follows it held back to the picture, with nudges
for have your say, the stats, and a better match elsewhere that can be put
on the TV. Near-live: highlights on the TV, player ratings, how your
predictions did and the next fixture on the phone.

## Big screen, small screen

The same four events and the same data run on four surfaces. The TV is drawn
at 1280 x 720 and scaled to fit, and is driven like a remote.

The telly carries what suits a shared screen ten feet away: the picture, a
choice of audio (TV commentary, radio synced to the picture, crowd only, audio
described), the story so far in sixty seconds watched or listened to, From the
start with Jump to live, a stats overlay you turn on and off, how many others
are watching, and reminders on what is coming up.

Anything participatory goes to the phone: polls, predictions, ratings and the
conversation. The TV shows a moment as a lower third, then offers the phone by
QR code, and a paired phone is nudged with what just happened on the telly.
Cricket is radio only here, so iPlayer becomes Test Match Special with a
scoreboard. On the second-screen tennis afternoon BBC One is on Centre Court
and the TV offers one suggestion, Switch to Court 2.

The website lays the live page out in three columns: the story so far, the
match, and the conversation, side by side.

## Live is teal

Anything labelled Live uses BBC Live Light, `#00CCC7`, with the Core and Dark shades
kept for contrast. Red is kept for things going wrong: warnings, wickets, wrong
answers.

## Pictures

Photographs live in `img/`, three crops each: `-wide` (16:9), `-tall` (9:13)
and `-sq`. Each one is tagged with the phase of a fixture it belongs to as
well as the sport, and `photoSVG()` in `app.js` asks for the phase the page
is currently in. Build-up shows team news and previews, live shows the ball
in play, near-live shows the celebration. The same card in a different
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
