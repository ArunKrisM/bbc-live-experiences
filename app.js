/* ==========================================================================
   BBC Sport — Live Experiences prototype
   Rendering and interaction. No dependencies.
   ========================================================================== */

(function () {
  "use strict";

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------- icons */

  var I = {
    burger: '<svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><g stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M2 5h18"/><path d="M2 11h18"/><path d="M2 17h18"/></g></svg>',
    bell: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3a6 6 0 0 0-6 6v4l-1.5 3h15L18 13V9a6 6 0 0 0-6-6z" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"/><path d="M10 19a2 2 0 0 0 4 0" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/></svg>',
    share: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="18" cy="5.5" r="2.6" stroke="#fff" stroke-width="1.8"/><circle cx="6" cy="12" r="2.6" stroke="#fff" stroke-width="1.8"/><circle cx="18" cy="18.5" r="2.6" stroke="#fff" stroke-width="1.8"/><path d="M8.4 10.8 15.6 6.7M8.4 13.2l7.2 4.1" stroke="#fff" stroke-width="1.8"/></svg>',
    back: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 5 8 12l7 7" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    star: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m12 3.6 2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L3.4 9.9l6-.8z" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    close: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>',
    chat: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="2" stroke="#FFD230" stroke-width="1.8"/><path d="M7 20l3-3" stroke="#FFD230" stroke-width="1.8" stroke-linecap="round"/><path d="M7 8.5h10M7 12h6" stroke="#FFD230" stroke-width="1.6" stroke-linecap="round"/></svg>',
    optabars: '<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><rect x="2" y="9" width="3.4" height="7" rx="1" fill="#4ADE80"/><rect x="7.3" y="4" width="3.4" height="12" rx="1" fill="#4ADE80"/><rect x="12.6" y="6.5" width="3.4" height="9.5" rx="1" fill="#4ADE80"/></svg>',
    pause: '<svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true"><rect x="3.5" y="2.5" width="3" height="11" rx="1" fill="#fff"/><rect x="9.5" y="2.5" width="3" height="11" rx="1" fill="#fff"/></svg>',
    play: '<svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5 13 8l-9 5.5z" fill="#fff"/></svg>',
    refresh: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.3-5.6" stroke="#C4C4C4" stroke-width="1.9" stroke-linecap="round"/><path d="M20 4v4h-4" stroke="#C4C4C4" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    expand: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 9V4h5M20 15v5h-5M20 9V4h-5M4 15v5h5" stroke="#C4C4C4" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    playtri: '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M4 2.5 11 7l-7 4.5z" fill="#fff"/></svg>',
    qr: '<svg width="24" height="24" viewBox="0 0 22 22" aria-hidden="true"><rect x="1" y="1" width="8" height="8" rx="1.5" fill="none" stroke="#B79CFF" stroke-width="1.7"/><rect x="13" y="1" width="8" height="8" rx="1.5" fill="none" stroke="#B79CFF" stroke-width="1.7"/><rect x="1" y="13" width="8" height="8" rx="1.5" fill="none" stroke="#B79CFF" stroke-width="1.7"/><rect x="14" y="14" width="3" height="3" fill="#B79CFF"/><rect x="18" y="18" width="3" height="3" fill="#B79CFF"/></svg>',
    back2: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 5 8 12l7 7" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    heartbig: '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20.5s-8-5-8-10.1A4.4 4.4 0 0 1 12 7.8a4.4 4.4 0 0 1 8 2.6c0 5.1-8 10.1-8 10.1z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" fill="var(--heartfill, none)"/></svg>',
    commentbig: '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="2.5" y="4" width="19" height="14" rx="2.4" stroke="currentColor" stroke-width="1.8"/><path d="M7 21.5 10.5 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M6.5 9h11M6.5 13h7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    sharebig: '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18.5 5.5M9 5.5h9.5V15" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    livedot: '<svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true"><circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="6" r="2.4" fill="currentColor"/></svg>',
    speaker: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13L7.5 14.5H4z" fill="currentColor"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    thumbup: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 10.5 11.5 3a2 2 0 0 1 2.7 2.5L13 9.5h5.3a2 2 0 0 1 2 2.4l-1.3 6A2 2 0 0 1 17 19.5H7z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><rect x="3" y="10" width="4" height="9.5" rx="1" stroke="currentColor" stroke-width="1.6"/></svg>',
    thumbdown: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M17 13.5 12.5 21a2 2 0 0 1-2.7-2.5L11 14.5H5.7a2 2 0 0 1-2-2.4l1.3-6A2 2 0 0 1 7 4.5h10z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><rect x="17" y="4.5" width="4" height="9.5" rx="1" stroke="currentColor" stroke-width="1.6"/></svg>',
    shareflat: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="18" cy="5.5" r="2.4" stroke="currentColor" stroke-width="1.7"/><circle cx="6" cy="12" r="2.4" stroke="currentColor" stroke-width="1.7"/><circle cx="18" cy="18.5" r="2.4" stroke="currentColor" stroke-width="1.7"/><path d="M8.3 10.9 15.7 6.6M8.3 13.1l7.4 4.3" stroke="currentColor" stroke-width="1.7"/></svg>',
    bat: '<svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 13 9.5 6.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="m9 6 2.5-2.5L14 6l-2.5 2.5z" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linejoin="round"/></svg>',
    flame: '<svg width="14" height="15" viewBox="0 0 14 15" aria-hidden="true"><path d="M7 .8s.9 2.5-.6 4.2C4.6 7.3 3 8.3 3 10.6A4.2 4.2 0 0 0 7 14.8a4.2 4.2 0 0 0 4-4.2c0-2-1.1-3-1.9-4.3-.5 1-1.2 1.4-1.2 1.4S9 5.1 7 .8z" fill="#FF7A2F"/></svg>',
    stack: '<svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="6" y="2.5" width="11.5" height="11.5" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M13.5 17.5H4.5A2 2 0 0 1 2.5 15.5V6.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    tick: '<svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 .9 9.8 2.5l2.4-.2.5 2.3 2 1.3L13.6 8l1.1 2.1-2 1.3-.5 2.3-2.4-.2L8 15.1l-1.8-1.6-2.4.2-.5-2.3-2-1.3L2.4 8 1.3 5.9l2-1.3.5-2.3 2.4.2z" fill="#B7BEC7"/><path d="m5.4 8 1.9 1.9 3.4-3.6" stroke="#101010" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    comment: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4.5" width="18" height="13" rx="2" stroke="currentColor" stroke-width="1.9"/><path d="M7 20.5l3-3" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M7 9h10M7 13h6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    heart: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20s-7.5-4.6-7.5-9.4A4.1 4.1 0 0 1 12 8.2a4.1 4.1 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20z" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/></svg>',
    send: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3.5 12 20.5 4.5 15 20l-3.2-6.2z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    playsm: '<svg width="9" height="9" viewBox="0 0 10 10" aria-hidden="true"><path d="M2.5 1.5 8 5l-5.5 3.5z" fill="#fff"/></svg>',
    chevron: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m9 5 7 7-7 7" stroke="#8E8E8E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    nav: {
      home: '<svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
      shorts: '<svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2.5" stroke="currentColor" stroke-width="1.8"/><path d="m10.5 9 5 3-5 3z" fill="currentColor"/></svg>',
      mysport: '<svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="1.8"/><path d="M6.5 18.5a6 6 0 0 1 11 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
      scores: '<svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 4h10v3a5 5 0 0 1-10 0z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" stroke="currentColor" stroke-width="1.8"/><path d="M12 12v4M9 20h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
      search: '<svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="1.8"/><path d="m16 16 4.5 4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'
    },
    sport: {
      Football: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.7"/><path d="m12 7 4 3-1.5 4.7h-5L8 10z" fill="currentColor"/></svg>',
      Cricket: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 18 15 7" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="m14.5 6.5 3-3 3 3-3 3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="6.5" cy="7" r="2.4" stroke="currentColor" stroke-width="1.6"/></svg>',
      Tennis: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.7"/><path d="M5 5a10 10 0 0 0 14 14M19 5A10 10 0 0 1 5 19" stroke="currentColor" stroke-width="1.5"/></svg>',
      "Rugby Union": '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><ellipse cx="12" cy="12" rx="9" ry="6" transform="rotate(-40 12 12)" stroke="currentColor" stroke-width="1.7"/><path d="m9 15 6-6M10.5 13l1.5 1.5M13 10.5l1.5 1.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>'
    }
  };

  var NAVITEMS = [
    ["home", "Home"], ["shorts", "Shorts"], ["mysport", "My Sport"],
    ["scores", "Scores"], ["search", "Search"]
  ];

  var SPORTS = ["Football", "Cricket", "Tennis", "Rugby Union", "Formula 1", "Golf", "Athletics", "Boxing"];

  /* ---------------------------------------------------------------- state */

  var S = {
    view: "home",
    eventIx: 0,
    lcIx: 1,
    tabIx: {},
    nav: "home",
    moment: "live",
    votes: {},
    toggles: {},
    predict: { h: 2, a: 1, locked: false },
    ratings: {},
    offset: 23,
    dataSecs: 67 * 60 + 57,
    rugbySecs: 64 * 60 + 12,
    overBall: 2,
    overNum: 89,
    feedNewest: true,
    compTab: 0,
    optaOpen: true,
    player: null,
    liked: {},
    quiz: {},
    tmo: 48,
    answered: 0,
    signedIn: false,
    playing: true
  };

  function lc() { return LIFECYCLE[S.lcIx].id; }
  function ev() { return EVENTS[S.eventIx]; }
  function evState(e, id) { return (e || ev()).states[id || lc()] || (e || ev()).states.live; }
  function tabKey() { return ev().id + ":" + lc(); }
  function curTabs() { return evState().tabs; }
  function curTab() {
    var k = tabKey();
    if (S.tabIx[k] === undefined || S.tabIx[k] >= curTabs().length) { S.tabIx[k] = 0; }
    return curTabs()[S.tabIx[k]];
  }

  /* ------------------------------------------------------------- utilities */

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function mmss(s) { return pad(Math.floor(s / 60)) + ":" + pad(s % 60); }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  var toastTimer;
  function toast(msg) {
    var t = $("#toast");
    if (!t) { return; }
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 2400);
  }

  /* ------------------------------------------------------------- SVG parts */

  function pitchSVG(m) {
    var out = "";
    for (var i = 0; i < 8; i++) {
      out += '<rect x="' + (i * 12.5) + '" y="0" width="12.5" height="64" fill="' + (i % 2 ? "#35893F" : "#2F7D3A") + '"/>';
    }
    out += '<g stroke="rgba(255,255,255,.42)" stroke-width="0.5" fill="none">' +
      '<rect x="2" y="2" width="96" height="60"/><line x1="50" y1="2" x2="50" y2="62"/>' +
      '<circle cx="50" cy="32" r="8.5"/><circle cx="50" cy="32" r="0.9" fill="rgba(255,255,255,.6)" stroke="none"/>' +
      '<rect x="2" y="14" width="13" height="36"/><rect x="85" y="14" width="13" height="36"/>' +
      '<rect x="2" y="24" width="5" height="16"/><rect x="93" y="24" width="5" height="16"/></g>';

    var ay = 6.8, bw = m.attacking.length * 2.35 + 5;
    out += '<rect x="3.5" y="3.2" width="' + bw.toFixed(1) + '" height="7.2" rx="1" fill="rgba(0,0,0,.6)"/>' +
      '<text x="6" y="8.4" fill="#EDEDED" font-size="4" font-family="Helvetica Neue, Arial" font-weight="700" letter-spacing="0.22">' + esc(m.attacking) + '</text>' +
      '<line x1="' + (bw + 7).toFixed(1) + '" y1="' + ay + '" x2="89" y2="' + ay + '" stroke="rgba(255,255,255,.6)" stroke-width="0.55" stroke-dasharray="2 1.6"/>' +
      '<path d="M 89 ' + (ay - 1.5) + ' L 92.5 ' + ay + ' L 89 ' + (ay + 1.5) + '" fill="rgba(255,255,255,.7)"/>';

    if (m.path) {
      out += '<path d="' + m.path + '" stroke="#FFD230" stroke-width="0.8" fill="none" stroke-dasharray="2 1.4" stroke-linecap="round"/>';
    }
    function dots(list, home) {
      return list.map(function (p) {
        return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="2.1" fill="' + (home ? "#F3F6FA" : "#F26522") +
          '" stroke="rgba(0,0,0,.55)" stroke-width="0.45"/>';
      }).join("");
    }
    out += dots(m.home, true) + dots(m.away, false);
    out += '<circle cx="' + m.ball[0] + '" cy="' + m.ball[1] + '" r="3.4" fill="none" stroke="#FFD230" stroke-width="0.7" opacity="0.8"' +
      (reduce ? "" : '><animate attributeName="r" values="2.6;5;2.6" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.9;0;0.9" dur="2s" repeatCount="indefinite"/') +
      '/><circle cx="' + m.ball[0] + '" cy="' + m.ball[1] + '" r="1.5" fill="#FFD230"/>';

    return '<svg class="pitchsvg" viewBox="0 0 100 64" role="img" aria-label="' + esc(m.label + ". " + m.sub) + '">' + out + '</svg>';
  }

  var FORMATIONS = {
    "4-2-3-1": [[50,92],[18,74],[39,76],[61,76],[82,74],[36,57],[64,57],[20,38],[50,40],[80,38],[50,20]],
    "4-3-3": [[50,92],[18,74],[39,76],[61,76],[82,74],[30,55],[50,58],[70,55],[20,32],[50,24],[80,32]]
  };

  function formationSVG(shape, team) {
    var pts = FORMATIONS[shape] || FORMATIONS["4-2-3-1"];
    var out = "";
    for (var i = 0; i < 6; i++) {
      out += '<rect x="0" y="' + (i * 16.67) + '" width="100" height="16.67" fill="' + (i % 2 ? "#35893F" : "#2F7D3A") + '"/>';
    }
    out += '<g stroke="rgba(255,255,255,.4)" stroke-width="0.4" fill="none">' +
      '<rect x="2" y="2" width="96" height="96"/><line x1="2" y1="50" x2="98" y2="50"/>' +
      '<circle cx="50" cy="50" r="10"/><rect x="24" y="84" width="52" height="14"/><rect x="24" y="2" width="52" height="14"/></g>';
    var fill = team === "eng" ? "#F3F6FA" : "#F26522";
    var ink = team === "eng" ? "#16296B" : "#fff";
    var list = team === "eng" ? XI_ENG : XI_NED;
    out += pts.map(function (p, i) {
      var n = list[i] ? list[i][0] : i + 1, nm = list[i] ? list[i][1] : "";
      return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="4.4" fill="' + fill + '" stroke="rgba(0,0,0,.5)" stroke-width="0.5"/>' +
        '<text x="' + p[0] + '" y="' + (p[1] + 1.6) + '" text-anchor="middle" font-size="4.2" font-weight="700" fill="' + ink + '" font-family="Helvetica Neue, Arial">' + n + '</text>' +
        '<text x="' + p[0] + '" y="' + (p[1] + 9) + '" text-anchor="middle" font-size="3.6" fill="rgba(255,255,255,.92)" font-family="Helvetica Neue, Arial">' + esc(nm) + '</text>';
    }).join("");
    return '<svg class="formsvg" viewBox="0 0 100 100" role="img" aria-label="' + esc(shape + " formation") + '">' + out + '</svg>';
  }

  var MOM = [-0.2,-0.45,-0.3,0.1,0.35,0.2,0.55,0.7,0.45,0.6,0.8,0.5,0.65,0.85,0.72];

  function momentumSVG() {
    var w = 100, mid = 23, n = MOM.length, bw = (w - 2) / n;
    var out = ['<line x1="0" y1="' + mid + '" x2="' + w + '" y2="' + mid + '" stroke="#3A3A3A" stroke-width="0.5"/>'];
    for (var i = 0; i < n; i++) {
      var v = MOM[i], mag = Math.abs(v) * 20, y = v >= 0 ? mid - mag : mid;
      out.push('<rect x="' + (1 + i * bw).toFixed(2) + '" y="' + y.toFixed(2) + '" width="' + (bw - 1.2).toFixed(2) +
        '" height="' + Math.max(0.7, mag).toFixed(2) + '" rx="0.5" fill="' + (v >= 0 ? "#E8F0FC" : "#F26522") +
        '" opacity="' + (i === n - 1 ? 1 : 0.6) + '"/>');
    }
    out.push('<text x="1" y="5" fill="#8E8E8E" font-size="4.2" font-family="Helvetica Neue, Arial">52\'</text>');
    out.push('<text x="99" y="5" text-anchor="end" fill="#8E8E8E" font-size="4.2" font-family="Helvetica Neue, Arial">67\'</text>');
    return '<svg class="momsvg" viewBox="0 0 100 46" role="img" aria-label="Momentum over the last fifteen minutes.">' + out.join("") + '</svg>';
  }

  function wagonSVG(shots) {
    var cx = 50, cy = 50, r = 44;
    var col = { four: "#FFD230", six: "#FF9F1C", three: "#9ADFA0", two: "#7FB2FF", one: "#8E8E8E" };
    var out = '<circle cx="50" cy="50" r="44" fill="#123A1C" stroke="#2F7D3A" stroke-width="0.8"/>' +
      '<circle cx="50" cy="50" r="28" fill="none" stroke="rgba(255,255,255,.16)" stroke-width="0.5" stroke-dasharray="2 2"/>' +
      '<rect x="47" y="38" width="6" height="24" fill="#C8A96E" opacity="0.5"/>' +
      '<line x1="50" y1="6" x2="50" y2="94" stroke="rgba(255,255,255,.1)" stroke-width="0.4"/>' +
      '<line x1="6" y1="50" x2="94" y2="50" stroke="rgba(255,255,255,.1)" stroke-width="0.4"/>';
    out += shots.map(function (s) {
      var a = (s[0] - 90) * Math.PI / 180, len = r * s[1];
      var x = cx + Math.cos(a) * len, y = cy + Math.sin(a) * len;
      var c = col[s[2]] || "#8E8E8E";
      return '<line x1="50" y1="50" x2="' + x.toFixed(1) + '" y2="' + y.toFixed(1) + '" stroke="' + c +
        '" stroke-width="' + (s[2] === "four" || s[2] === "six" ? 1.3 : 0.8) + '" stroke-linecap="round" opacity="0.92"/>' +
        '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="1.4" fill="' + c + '"/>';
    }).join("");
    return '<svg class="wagonsvg" viewBox="0 0 100 100" role="img" aria-label="Wagon wheel of scoring shots.">' + out + '</svg>';
  }

  function winpredSeries(series) {
    var n = series.length, w = 100, h = 26;
    var pts = series.map(function (v, i) {
      return (i / (n - 1) * w).toFixed(1) + "," + (h - v / 100 * h).toFixed(1);
    }).join(" ");
    return '<svg class="wpsvg" viewBox="0 0 100 26" preserveAspectRatio="none" role="img" aria-label="England win probability since lunch.">' +
      '<polyline points="' + pts + '" fill="none" stroke="#4ADE80" stroke-width="1.2" stroke-linejoin="round"/>' +
      '<circle cx="100" cy="' + (h - series[n - 1] / 100 * h).toFixed(1) + '" r="1.8" fill="#4ADE80"/></svg>';
  }

  function thumbSVG(g) {
    var id = "g" + Math.random().toString(36).slice(2, 8);
    return '<svg viewBox="0 0 60 80" preserveAspectRatio="none" aria-hidden="true">' +
      '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="' + g[0] + '"/><stop offset="1" stop-color="' + g[1] + '"/></linearGradient>' +
      '<radialGradient id="' + id + 'r" cx="0.32" cy="0.3" r="0.72">' +
      '<stop offset="0" stop-color="#fff" stop-opacity="0.16"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>' +
      '<rect width="60" height="80" fill="url(#' + id + ')"/>' +
      '<g stroke="#fff" stroke-opacity="0.07" stroke-width="0.8" fill="none">' +
      '<path d="M-6 62 L66 46"/><path d="M-6 72 L66 56"/><path d="M-6 52 L66 36"/></g>' +
      '<rect width="60" height="80" fill="url(#' + id + 'r)"/>' +
      '<rect y="58" width="60" height="22" fill="#000" opacity="0.22"/></svg>';
  }


  /* ---- photo placeholders: abstract sport imagery, no real photography ---- */

  function photoSVG(p, ratio) {
    var id = "p" + Math.random().toString(36).slice(2, 8);
    var w = 100, h = ratio === "wide" ? 56 : ratio === "square" ? 100 : 133;
    var g = p.g || ["#22314A", "#0C121C"];
    var out = '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0.4" y2="1">' +
      '<stop offset="0" stop-color="' + g[0] + '"/><stop offset="1" stop-color="' + g[1] + '"/></linearGradient>' +
      '<radialGradient id="' + id + 'f" cx="0.68" cy="0.18" r="0.7">' +
      '<stop offset="0" stop-color="#fff" stop-opacity="0.28"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>' +
      '</defs><rect width="' + w + '" height="' + h + '" fill="url(#' + id + ')"/>';

    // crowd band + floodlights across the upper third of every placeholder
    var band = h * 0.34;
    out += '<rect y="0" width="' + w + '" height="' + band.toFixed(1) + '" fill="#000" opacity="0.16"/>';
    for (var k = 0; k < 120; k++) {
      var kx = (k * 41 % 103) - 1, ky = (k * 29 % 100) / 100 * band;
      out += '<circle cx="' + kx + '" cy="' + ky.toFixed(1) + '" r="' + (0.45 + (k % 4) * 0.22).toFixed(2) +
        '" fill="#fff" opacity="' + (0.05 + (k % 6) * 0.018).toFixed(3) + '"/>';
    }
    out += '<circle cx="76" cy="' + (band * 0.36).toFixed(1) + '" r="1.6" fill="#fff" opacity="0.5"/>' +
      '<circle cx="76" cy="' + (band * 0.36).toFixed(1) + '" r="7" fill="#fff" opacity="0.07"/>' +
      '<circle cx="21" cy="' + (band * 0.22).toFixed(1) + '" r="1.2" fill="#fff" opacity="0.4"/>' +
      '<circle cx="21" cy="' + (band * 0.22).toFixed(1) + '" r="5.5" fill="#fff" opacity="0.055"/>' +
      '<line x1="-4" y1="' + band.toFixed(1) + '" x2="104" y2="' + (band * 0.94).toFixed(1) +
      '" stroke="#fff" stroke-opacity="0.12" stroke-width="0.7"/>';

    if (p.motif === "pitch") {
      for (var i = 0; i < 7; i++) {
        out += '<rect x="' + (i * 16 - 10) + '" y="' + (h * 0.42) + '" width="9" height="' + (h * 0.6) +
          '" fill="#fff" opacity="0.035" transform="skewX(-14)"/>';
      }
      out += '<path d="M -10 ' + (h * 0.72) + ' Q ' + (w / 2) + ' ' + (h * 0.52) + ' ' + (w + 10) + ' ' + (h * 0.72) +
        '" stroke="#fff" stroke-opacity="0.16" stroke-width="0.9" fill="none"/>' +
        '<line x1="-10" y1="' + (h * 0.9) + '" x2="' + (w + 10) + '" y2="' + (h * 0.86) + '" stroke="#fff" stroke-opacity="0.13" stroke-width="0.8"/>';
    } else if (p.motif === "court") {
      out += '<rect x="14" y="' + (h * 0.5) + '" width="72" height="' + (h * 0.44) + '" fill="none" stroke="#fff" stroke-opacity="0.2" stroke-width="0.9"/>' +
        '<line x1="50" y1="' + (h * 0.5) + '" x2="50" y2="' + (h * 0.94) + '" stroke="#fff" stroke-opacity="0.16" stroke-width="0.8"/>' +
        '<line x1="14" y1="' + (h * 0.68) + '" x2="86" y2="' + (h * 0.68) + '" stroke="#fff" stroke-opacity="0.16" stroke-width="0.8"/>' +
        '<line x1="-6" y1="' + (h * 0.46) + '" x2="106" y2="' + (h * 0.46) + '" stroke="#fff" stroke-opacity="0.3" stroke-width="1.6"/>';
    } else if (p.motif === "ring") {
      out += '<rect x="8" y="' + (h * 0.52) + '" width="84" height="' + (h * 0.4) + '" fill="#000" opacity="0.22"/>';
      for (var r = 0; r < 3; r++) {
        out += '<line x1="4" y1="' + (h * 0.5 + r * 6) + '" x2="96" y2="' + (h * 0.5 + r * 6) + '" stroke="#fff" stroke-opacity="0.16" stroke-width="0.7"/>';
      }
    } else {
      for (var c = 0; c < 90; c++) {
        var cx = (c * 37 % 101), cy = (c * 53 % 40) + h * 0.06;
        out += '<circle cx="' + cx + '" cy="' + cy.toFixed(1) + '" r="' + (0.7 + (c % 3) * 0.35).toFixed(2) +
          '" fill="#fff" opacity="' + (0.05 + (c % 5) * 0.022).toFixed(3) + '"/>';
      }
      out += '<rect y="' + (h * 0.55) + '" width="100" height="' + (h * 0.45) + '" fill="#000" opacity="0.2"/>';
    }
    out += '<rect width="' + w + '" height="' + h + '" fill="url(#' + id + 'f)"/>';
    return '<svg class="photo" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + out + '</svg>';
  }

  function badge(colour, initials) {
    return '<span class="tbadge" style="background:' + colour + '" aria-hidden="true">' + esc(initials) + '</span>';
  }

  var ARROW = '<svg class="secarrow" width="26" height="12" viewBox="0 0 26 12" aria-hidden="true">' +
    '<line x1="1" y1="6" x2="13" y2="6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="1.6 3.2"/>' +
    '<path d="M15 2.5 19.5 6 15 9.5" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<line x1="15" y1="6" x2="24" y2="6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';

  function feedHead(title, toast) {
    return '<button class="feedhead" type="button" data-toast="' + esc(toast || (title + " is not built out in this prototype.")) + '">' +
      '<span>' + esc(title) + '</span>' + ARROW + '</button>';
  }

  /* ------------------------------------------------------------- panels */

  var P = {};

  P.involve = function (p) {
    return '<div class="involve"><div class="rule-y" style="margin:0"></div><div class="inner">' +
      '<div class="ihead">' + I.chat + '<div><h3>' + esc(p.title) + '</h3><p>' + esc(p.body) + '</p></div></div>' +
      '<div><button class="btn" type="button" data-toast="' + esc(p.toast) + '">' + esc(p.cta) + '</button></div></div></div>';
  };

  P.storyline = function (p) {
    return '<div class="c"><div class="storyline"><div class="sk">' + esc(p.kicker) + '</div><p>' + esc(p.body) + '</p></div></div>';
  };

  P.note = function (p) { return '<p class="note">' + esc(p.body) + '</p>'; };

  P.kv = function (p) {
    return '<dl class="kvgrid">' + p.items.map(function (it) {
      return '<div><dt>' + esc(it[0]) + '</dt><dd>' + esc(it[1]) + (it[2] ? '<small>' + esc(it[2]) + '</small>' : "") + '</dd></div>';
    }).join("") + '</dl>';
  };

  P.stats = function (p) {
    return '<div class="c">' + p.rows.map(function (r) {
      return '<div class="statrow"><div class="statlab"><span class="v">' + esc(r[0]) + '</span>' +
        '<span class="k">' + esc(r[1]) + '</span><span class="v r">' + esc(r[2]) + '</span></div>' +
        '<div class="statbar"><span class="sb l"><i style="width:' + r[3] + '%"></i></span><span class="mid"></span>' +
        '<span class="sb r"><i style="width:' + (100 - r[3]) + '%"></i></span></div></div>';
    }).join("") + '</div>';
  };

  P.h2h = function (p) {
    return '<div class="h2h">' + p.results.map(function (r) {
      return '<span class="' + (r === "W" ? "w" : r === "L" ? "l" : "") + '">' + r + '</span>';
    }).join("") + '</div>';
  };

  function deckCard(ix, idx) {
    var it = DROP[ix];
    return '<button class="short" type="button" data-play="' + ix + '">' +
      '<span class="thumb">' + photoSVG(it, "tall") + '<span class="play">' + I.playtri + '</span>' +
      '<span class="dur">' + esc(it.dur) + '</span></span>' +
      '<span class="kick">' + esc(it.sport) + '</span><span class="st">' + esc(it.t) + '</span></button>';
  }

  P.shorts = function (p) {
    return '<div class="dropwrap">' +
      '<span class="droppill">' + I.flame + '<b>' + esc(p.label || "Your daily drop") + '</b>' +
      '<span class="dropcount">' + I.stack + DROP.length + ' items</span></span>' +
      '<div class="rail droprail">' + p.deck.map(deckCard).join("") + '</div></div>';
  };

  P.shortsgrid = function (p) {
    return '<div class="focusrail" data-focusrail>' + p.deck.map(function (ix) {
      var it = DROP[ix];
      return '<button class="fcard" type="button" data-play="' + ix + '">' +
        '<span class="fphoto">' + photoSVG(it, "tall") +
        '<span class="fscrim"></span>' +
        '<span class="play">' + I.playtri + '</span>' +
        '<span class="dur">' + esc(it.dur) + '</span>' +
        '<span class="fmeta"><span class="fkick">' + esc(it.sport) + '</span>' +
        '<span class="ftitle">' + esc(it.t) + '</span></span></span></button>';
    }).join("") + '</div>';
  };

  P.opta = function () {
    var m = MOMENTS.filter(function (x) { return x.id === S.moment; })[0] || MOMENTS[0];
    var shown = lc() === "companion" ? mmss(Math.max(0, S.dataSecs - S.offset)) : mmss(S.dataSecs);
    return '<div class="optacard">' +
      '<div class="optahead"><span class="optaicon">' + I.optabars + '</span>' +
      '<span><span class="t1">Live match view</span><br><span class="t2">Powered by Opta</span></span>' +
      '<button class="linkbtn" type="button" data-optatoggle aria-expanded="' + S.optaOpen + '">' +
      (S.optaOpen ? 'Hide ⌃' : 'Show ⌄') + '</button></div>' +
      '<div class="optabody"' + (S.optaOpen ? '' : ' hidden') + '>' +
      '<div class="optaclock"><span class="l" id="opta-clock">' + shown + '</span>' +
      '<button class="iconbtn" type="button" style="width:30px;height:30px" data-toast="Full-screen pitch view is not wired up." aria-label="Expand">' + I.expand + '</button></div>' +
      '<div class="pitchbox">' + pitchSVG(m) + '</div>' +
      '<div class="optacap"><div class="c1">' + esc(m.label) + '</div><div class="c2">' + esc(m.sub) + '</div></div>' +
      '<div class="optactrl">' +
      '<button class="ctrlbtn" type="button" data-playpause aria-label="' + (S.playing ? "Pause" : "Play") + '">' + (S.playing ? I.pause : I.play) + '</button>' +
      MOMENTS.map(function (x) {
        return '<button class="chip" type="button" data-moment="' + x.id + '" aria-pressed="' + (x.id === S.moment) + '">' + esc(x.chip) + '</button>';
      }).join("") +
      '<span class="spacer"></span>' +
      '<button class="ctrlbtn" type="button" data-toast="Feed refreshed. 4 new events." aria-label="Refresh">' + I.refresh + '</button></div>' +
      '</div></div>';
  };

  function resultRows(opts, split, chosen) {
    return '<div class="results">' + opts.map(function (o, j) {
      var me = j === chosen;
      return '<div class="resrow"><div class="reslab"><span>' + esc(o) + (me ? " · you" : "") + '</span><b>' + split[j] + '%</b></div>' +
        '<div class="track"><i class="' + (me ? "me" : "") + '" style="width:' + split[j] + '%"></i></div></div>';
    }).join("") + '</div>';
  }

  P.poll = function (p) {
    var chosen = S.votes[p.id], done = chosen !== undefined;
    var head = p.tag ? '<div class="alerttag">' + esc(p.tag) + '</div>' : "";
    return '<div class="c' + (p.kind === "alert" ? " alert" : "") + '">' + head +
      '<p class="q">' + esc(p.q) + '</p>' +
      '<div class="opts' + (p.opts.length === 2 && !p.big ? " two" : "") + '" data-poll="' + p.id + '">' +
      p.opts.map(function (o, j) {
        return '<button class="optbtn" type="button" aria-pressed="' + (j === chosen) + '" data-i="' + j + '"' + (done ? " disabled" : "") + '>' + esc(o) + '</button>';
      }).join("") + '</div>' +
      (done ? resultRows(p.opts, p.split, chosen) : "") +
      '<p class="tally">' + esc(done ? (p.after || "Counted.") : (p.tally || "")) + '</p></div>';
  };

  P.predict = function () {
    var COMMON = { "2-1": 14, "1-1": 12, "2-0": 11, "1-0": 9, "3-1": 7, "0-0": 5, "1-2": 5, "3-0": 4 };
    var key = S.predict.h + "-" + S.predict.a, mine = COMMON[key] || 1, rows = "";
    var names = ev().id === "rugby" ? ["Wales", "Ireland"] : ["England", "Netherlands"];
    if (S.predict.locked) {
      var keys = Object.keys(COMMON).slice(0, 4);
      if (keys.indexOf(key) === -1) { keys[3] = key; }
      keys.sort(function (a, b) { return (COMMON[b] || mine) - (COMMON[a] || mine); });
      rows = '<div class="results">' + keys.map(function (k) {
        var pct = COMMON[k] || mine, me = k === key;
        return '<div class="resrow"><div class="reslab"><span>' + k.replace("-", " – ") + (me ? " · your call" : "") +
          '</span><b>' + pct + '%</b></div><div class="track"><i class="' + (me ? "me" : "") +
          '" style="width:' + Math.min(100, pct * 6) + '%"></i></div></div>';
      }).join("") + '</div>';
    }
    return '<div class="c"><div class="stepgrid">' +
      ["h", "a"].map(function (t, i) {
        return '<div class="steprow"><span class="n">' + names[i] + '</span>' +
          '<button class="stepb" type="button" data-step="' + t + '" data-d="-1" aria-label="' + names[i] + ' one fewer"' + (S.predict.locked ? " disabled" : "") + '>&minus;</button>' +
          '<span class="stepv">' + S.predict[t] + '</span>' +
          '<button class="stepb" type="button" data-step="' + t + '" data-d="1" aria-label="' + names[i] + ' one more"' + (S.predict.locked ? " disabled" : "") + '>+</button></div>';
      }).join("") + '</div>' + rows +
      '<p class="tally">' + (S.predict.locked
        ? (mine >= 10 ? "You're with the crowd. " + mine + "% agree." : "Bold. Only " + mine + "% went for that.")
        : "Locks at kick-off. Counts towards your Predictor season.") + '</p>' +
      '<button class="btn block ' + (S.predict.locked ? "" : "solid") + '" type="button" data-lock style="margin-top:12px"' + (S.predict.locked ? " disabled" : "") + '>' +
      (S.predict.locked ? "Locked: " + S.predict.h + " – " + S.predict.a : "Lock in " + S.predict.h + " – " + S.predict.a) + '</button></div>';
  };

  P.countdown = function (p) {
    return '<div class="c"><div class="cd" id="cd" data-h="' + p.h + '" data-m="' + p.m + '" data-s="' + p.s + '">' +
      '<span class="cdu"><span class="cdn" id="cd-h">' + pad(p.h) + '</span><span class="cdl">hrs</span></span>' +
      '<span class="cdsep">:</span><span class="cdu"><span class="cdn" id="cd-m">' + pad(p.m) + '</span><span class="cdl">min</span></span>' +
      '<span class="cdsep">:</span><span class="cdu"><span class="cdn" id="cd-s">' + pad(p.s) + '</span><span class="cdl">sec</span></span>' +
      '</div></div>';
  };

  P.toggle = function (p) {
    var on = !!S.toggles[p.id];
    return '<div style="margin-top:10px"><button class="btn block ' + (on ? "" : "solid") + '" type="button" data-toggleid="' + p.id + '" aria-pressed="' + on + '">' +
      esc(on ? p.on + " ✓" : p.label) + '</button><p class="tally">' + esc(on ? p.onNote : p.off) + '</p></div>';
  };

  P.league = function () {
    return '<div class="c"><div class="lgtop"><span class="lgpos">306,107<small>th of 1.2m</small></span>' +
      '<span class="lgmove">▲ 8,402 last week</span></div>' +
      '<div class="results" style="margin-top:14px">' +
      '<div class="resrow"><div class="reslab"><span>Exact calls this season</span><b>2 of 11</b></div><div class="track"><i class="me" style="width:18%"></i></div></div>' +
      '<div class="resrow"><div class="reslab"><span>Correct outcomes</span><b>7 of 11</b></div><div class="track"><i class="alt" style="width:64%"></i></div></div>' +
      '</div></div>';
  };

  P.leagueft = function () {
    return '<div class="c"><div class="lgtop"><span class="lgpos">214,903<small>rd of 1.2m</small></span>' +
      '<span class="lgmove">▲ 91,204</span></div>' +
      '<p class="note" style="margin-top:6px">Your highest position this season.</p>' +
      '<div class="results" style="margin-top:12px"><div class="resrow"><div class="reslab"><span>Beat your mates</span><b>4 of 6</b></div>' +
      '<div class="track"><i class="me" style="width:67%"></i></div></div></div>' +
      '<button class="btn block" type="button" data-toast="Card copied. Paste it into the group chat." style="margin-top:12px">Share your card</button></div>';
  };

  P.momentum = function () {
    return '<div class="c">' + momentumSVG() +
      '<div class="momkey"><span class="a"><b>England</b> 71% of the last 10</span><span class="b"><b>Netherlands</b> 29%</span></div></div>';
  };

  P.sortrow = function () {
    return '<div class="selectrow"><span>Show</span><select id="feedsort" aria-label="Sort live reporting">' +
      '<option value="new"' + (S.feedNewest ? " selected" : "") + '>Most recent</option>' +
      '<option value="old"' + (S.feedNewest ? "" : " selected") + '>Oldest first</option></select></div>';
  };

  P.feed = function (p) {
    var posts = S.feedNewest ? p.posts : p.posts.slice().reverse();
    return '<p class="byline">' + esc(p.author) + '</p><div class="feed">' +
      posts.map(function (q, i) {
        var up = 8 + (q[1].length * 3) % 41, down = 1 + (q[2].length % 7);
        return '<article class="post">' +
          '<span class="stamp">' + esc(q[0]) + '</span>' +
          '<div class="postbody">' +
          '<h3' + (q[3] ? ' class="shout"' : "") + '>' + esc(q[1]) + '</h3><p>' + esc(q[2]) + '</p>' +
          '<div class="react"><button class="rbtn" type="button" data-toast="Thanks for the feedback.">' + I.thumbup + up + '</button>' +
          '<button class="rbtn" type="button" data-toast="Thanks for the feedback.">' + I.thumbdown + down + '</button>' +
          '<button class="rbtn share" type="button" data-toast="Share sheet is not wired up in this prototype.">' + I.shareflat + 'Share</button></div>' +
          '</div></article>';
      }).join("") + '</div>';
  };

  P.formation = function (p) {
    return '<div class="formation">' + formationSVG(p.shape, p.team) +
      '<div class="formmeta"><span><b>' + esc(p.label) + '</b> ' + esc(p.shape) + '</span><span>' + esc(p.sub) + '</span></div></div>';
  };

  P.xi = function (p) {
    return '<div class="playerlist">' + p.list.map(function (pl) {
      var hot = pl[0] === p.highlight;
      return '<div class="pl"><span class="num">' + pl[0] + '</span><span class="pn">' + esc(pl[1]) + '</span>' +
        '<span class="pr' + (hot ? " hot" : "") + '">' + esc(hot ? p.hint : pl[2]) + '</span></div>';
    }).join("") + '</div>';
  };

  P.rating = function (p) {
    var key = ev().id;
    if (S.ratings[key] === undefined) { S.ratings[key] = p.avg + 0.5; }
    var v = S.ratings[key], diff = (v - p.avg).toFixed(1);
    var line = Math.abs(diff) < 0.3 ? "Right on the national average. Stays open until the end."
      : (diff > 0 ? "You're " + diff + " above the country. " : "You're " + Math.abs(diff).toFixed(1) + " below the country. ") + "Stays open until the end.";
    return '<div class="c"><div class="ratehead"><span class="who">' + esc(p.who) + '</span>' +
      '<span class="val" id="rateval">' + v.toFixed(1) + '</span></div>' +
      '<input type="range" id="rate" min="1" max="10" step="0.1" value="' + v + '" aria-label="Rate ' + esc(p.who) + ' out of ten">' +
      '<div class="results" style="margin-top:8px"><div class="resrow"><div class="reslab"><span>Fan average, ' + esc(p.count) + '</span><b>' + p.avg + '</b></div>' +
      '<div class="track"><i class="alt" style="width:' + (p.avg * 10) + '%"></i></div></div></div>' +
      '<p class="tally" id="ratenote">' + esc(line) + '</p></div>';
  };

  P.scored = function (p) {
    return '<div class="c"><div class="bigpts"><span class="v">' + p.total + '</span>' +
      '<span class="l">points<br>of a possible ' + p.max + '</span></div><div class="scored">' +
      p.rows.map(function (r) {
        return '<div class="sc-row"><span class="sc-m ' + (r[0] ? "y" : "n") + '">' + (r[0] ? "✓" : "✕") + '</span>' +
          '<span class="sc-t">' + esc(r[1]) + '<small>' + esc(r[2]) + '</small></span>' +
          '<span class="sc-p' + (r[0] ? " on" : "") + '">+' + r[3] + '</span></div>';
      }).join("") + '</div><p class="tally">' + esc(p.note) + '</p></div>';
  };

  P.streak = function (p) {
    return '<div class="c"><div class="streak">' + p.weeks.map(function (w, i) {
      return '<span class="wk ' + (p.on.indexOf(i) > -1 ? "on" : (i === p.next ? "next" : "")) + '">' + esc(w) + '</span>';
    }).join("") + '</div><p class="note" style="margin:0">' + esc(p.note) + '</p></div>';
  };

  P.nextfix = function (p) {
    var on = !!S.toggles["next-" + ev().id];
    return '<div class="c"><div class="fixrow"><span class="f1">' + esc(p.fixture) + '</span><span class="f2">' + esc(p.when) + '</span></div>' +
      '<p class="note" style="margin:0 0 12px">' + esc(p.sub) + '</p>' +
      '<button class="btn block ' + (on ? "" : "solid") + '" type="button" data-toggleid="next-' + ev().id + '" aria-pressed="' + on + '">' +
      esc(on ? p.on + " ✓" : p.cta) + '</button><p class="tally">' + esc(on ? p.onNote : p.off) + '</p></div>';
  };

  P.potm = function (p) {
    return '<div class="c"><div class="potmtop"><span class="pname">' + esc(p.name) + '</span>' +
      '<span class="pscore">' + esc(p.score) + '</span></div>' +
      '<p class="note" style="margin:4px 0 0">' + esc(p.sub) + '</p><div class="results" style="margin-top:14px">' +
      p.rows.map(function (r) {
        return '<div class="resrow"><div class="reslab"><span>' + esc(r[0]) + '</span><b>' + r[1].toFixed(1) + '</b></div>' +
          '<div class="track"><i class="' + (r[2] ? "me" : "alt") + '" style="width:' + (r[1] * 10) + '%"></i></div></div>';
      }).join("") + '</div></div>';
  };

  P.sync = function () {
    var off = S.offset, data = S.dataSecs, cls, msg, label;
    var src = ev().id === "cricket" ? "radio" : "telly";
    if (off === 0) {
      cls = "warn"; label = "Ahead of your " + src;
      msg = "<b>You'll see it first.</b> With no delay set, this screen tells you about the moment roughly 23 seconds before your " + src + " does.";
    } else if (off < 12) {
      cls = "warn"; label = "Probably ahead";
      msg = "<b>Still ahead.</b> Most living-room streams sit 20 to 30 seconds behind. Try nudging it further.";
    } else if (off > 34) {
      cls = "warn ok"; label = "Running late";
      msg = "<b>Behind the picture.</b> Safe from spoilers, though reactions will feel a beat late.";
    } else {
      cls = "warn ok"; label = "In sync";
      msg = "<b>Matched.</b> Nothing on this screen will get ahead of your " + src + ".";
    }
    return '<div class="c"><div class="synctop"><span>Status</span><b id="syncstate">' + label + '</b></div>' +
      '<div class="clocks"><span class="ck"><span class="cl">Data feed</span><span class="cv" id="c-data">' + mmss(data) + '</span></span>' +
      '<span class="ckgap">' + (off === 0 ? "0s" : "−" + off + "s") + '</span>' +
      '<span class="ck tv"><span class="cl">Your ' + src + '</span><span class="cv" id="c-tv">' + mmss(Math.max(0, data - off)) + '</span></span></div>' +
      '<input type="range" id="offset" min="0" max="45" step="1" value="' + off + '" aria-label="Seconds your broadcast is behind the live data">' +
      '<div class="rangeends"><span>Live data</span><span>45s behind</span></div>' +
      '<div class="' + cls + '" style="margin-top:14px">' + msg + '</div>' +
      '<p class="tally">Set once. Remembered for every match on this device.</p></div>';
  };

  P.quiz = function (p) {
    var q = S.quiz[p.id];
    if (!q) { q = S.quiz[p.id] = { answered: false, left: p.seconds }; }
    return '<div class="c"><div class="qbar"><i class="qbar-i" data-qid="' + p.id + '" style="width:' + (q.left / p.seconds * 100) + '%"></i></div>' +
      '<p class="q">' + esc(p.q) + '</p><div class="opts" data-quiz="' + p.id + '">' +
      p.opts.map(function (o, j) {
        return '<button class="optbtn" type="button" aria-pressed="' + (q.answered === j) + '" data-i="' + j + '"' +
          (q.answered !== false ? " disabled" : "") + '>' + esc(o) + '</button>';
      }).join("") + '</div><p class="tally" data-qtally="' + p.id + '">' +
      esc(q.answered !== false
        ? (q.answered === p.correct ? "Right. " : "Not that one. ") + p.why
        : "Fires in the gaps only. Never while the ball is live.") + '</p></div>';
  };

  P.pundit = function (p) {
    var id = "pundit-" + ev().id + "-" + p.when;
    var chosen = S.votes[id], done = chosen !== undefined;
    return '<div class="c"><div class="pundit"><span class="pav">' + esc(p.initials) + '</span>' +
      '<div><p class="pq">“' + esc(p.quote) + '”</p><span class="pw">' + esc(p.who) + ' · ' + esc(p.when) + '</span></div></div>' +
      '<div class="opts two" style="margin-top:14px" data-poll="' + id + '">' +
      p.opts.map(function (o, j) {
        return '<button class="optbtn" type="button" aria-pressed="' + (j === chosen) + '" data-i="' + j + '"' + (done ? " disabled" : "") + '>' + esc(o) + '</button>';
      }).join("") + '</div>' + (done ? resultRows(p.opts, p.split, chosen) : "") +
      '<p class="tally">' + esc(done ? p.after : "Tap to see where the country sits.") + '</p></div>';
  };

  P.signin = function () {
    return '<div class="c dashed"><p class="signp">You\'ve answered <b>' + S.answered + '</b> thing' + (S.answered === 1 ? "" : "s") +
      ' today. Sign in to keep them, see how you did at the end, and get your Predictor score.</p>' +
      '<p class="tally signnote">' + (S.signedIn ? "Saved. Anything you answer is scored at the end."
        : (S.answered >= 3 ? "Fans who answer three or more are 4x likelier to come back next week"
          : "1 of 4 companion fans signs in before the end")) + '</p>' +
      '<button class="btn block ' + (S.signedIn ? "" : "solid") + '" type="button" data-signin' + (S.signedIn ? " disabled" : "") + '>' +
      (S.signedIn ? "Signed in ✓" : "Sign in with BBC account") + '</button></div>';
  };

  P.follows = function (p) {
    return '<div class="playerlist">' + p.items.map(function (it, i) {
      return '<div class="pl follow"><span class="pn">' + esc(it[0]) + '<br><span class="pr small">' + esc(it[1]) + '</span></span>' +
        '<button class="chip" type="button" data-follow="' + i + '" aria-pressed="' + it[2] + '">' + (it[2] ? "Following" : "Follow") + '</button></div>';
    }).join("") + '</div>';
  };

  P.scorelist = function (p) {
    return '<div class="playerlist">' + p.items.map(function (it) {
      return '<div class="pl score3"><span class="pn">' + esc(it[0]) + '<br>' + esc(it[2]) + '</span>' +
        '<span class="pn nums">' + (it[1] ? esc(it[1]) + '<br>' + esc(it[3]) : "&nbsp;") + '</span>' +
        '<span class="pr' + (it[5] ? " hot" : "") + '">' + esc(it[4]) + '</span></div>';
    }).join("") + '</div>';
  };

  P.searchbox = function () {
    return '<div class="c" style="padding:10px"><input id="searchbox" type="search" placeholder="Search BBC Sport" aria-label="Search BBC Sport" class="searchin"></div>';
  };

  P.chips = function (p) {
    return '<div class="chiprow">' + p.items.map(function (c) {
      return '<button class="chip" type="button" data-toast="Search is a stub in this prototype.">' + esc(c) + '</button>';
    }).join("") + '</div>';
  };

  P.btnrow = function (p) {
    return '<button class="btn block solid" type="button" data-toast="' + esc(p.toast) + '">' + esc(p.label) + '</button>';
  };

  /* ---- cricket ---- */

  P.audio = function (p) {
    var bars = "";
    for (var i = 0; i < 28; i++) {
      var h = 3 + Math.abs(Math.sin(i * 1.4)) * 11;
      bars += '<rect x="' + (i * 3.5) + '" y="' + ((14 - h) / 2 + 1) + '" width="2" height="' + h.toFixed(1) + '" rx="1" fill="#4ADE80" opacity="' + (0.35 + (i % 5) * 0.13).toFixed(2) + '"/>';
    }
    return '<div class="c audio"><div class="audiotop">' +
      '<button class="audiobtn" type="button" data-toast="Test Match Special is a placeholder in this prototype." aria-label="Play Test Match Special">' + I.play + '</button>' +
      '<span><span class="at1">' + esc(p.title) + '</span><br><span class="at2">' + esc(p.sub) + '</span></span></div>' +
      '<svg class="wave" viewBox="0 0 98 16" preserveAspectRatio="none" aria-hidden="true">' + bars + '</svg>' +
      (p.note ? '<p class="note" style="margin-top:12px">' + esc(p.note) + '</p>' : "") + '</div>';
  };

  P.sessionbar = function (p) {
    return '<div class="c">' + p.sessions.map(function (s) {
      var side = s[3];
      return '<div class="sess"><div class="sesslab"><span>' + esc(s[0]) + '</span><b>' + esc(s[1]) + '</b></div>' +
        '<div class="track"><i class="' + (side === "ENG" ? "me" : side === "AUS" ? "alt" : "") + '" style="width:' + s[2] + '%"></i></div></div>';
    }).join("") + '</div>';
  };

  P.over = function (p) {
    return '<div class="c"><div class="over">' + p.balls.map(function (b) {
      return '<span class="ball ' + b[1] + '">' + esc(b[0]) + '</span>';
    }).join("") + '</div><p class="overcap">' + esc(p.caption) + '</p>' +
      '<p class="note" style="margin-top:6px;font-size:11.5px">' + esc(p.sub) + '</p></div>';
  };

  P.wagon = function (p) {
    return '<div class="c">' + wagonSVG(p.shots) +
      '<div class="wagonkey"><span><i style="background:#FFD230"></i>Four</span><span><i style="background:#FF9F1C"></i>Six</span>' +
      '<span><i style="background:#7FB2FF"></i>Two</span><span><i style="background:#8E8E8E"></i>One</span></div>' +
      '<p class="note">' + esc(p.caption) + '</p></div>';
  };

  P.winpred = function (p) {
    return '<div class="c"><div class="wpbar" role="img" aria-label="England ' + p.values[0] + '%, draw ' + p.values[2] + '%, Australia ' + p.values[1] + '%">' +
      '<i class="a" style="width:' + p.values[0] + '%"></i><i class="d" style="width:' + p.values[2] + '%"></i><i class="b" style="width:' + p.values[1] + '%"></i></div>' +
      '<div class="wpkey"><span class="a"><b>' + esc(p.a) + '</b> ' + p.values[0] + '%</span>' +
      '<span class="d"><b>Draw</b> ' + p.values[2] + '%</span>' +
      '<span class="b"><b>' + esc(p.b) + '</b> ' + p.values[1] + '%</span></div>' +
      '<div class="wpspark">' + winpredSeries(p.series) + '<span class="wpsparkl">England, since lunch</span></div>' +
      '<p class="note">' + esc(p.note) + '</p></div>';
  };

  P.partnership = function (p) {
    function bat(b, lead) {
      return '<div class="bat' + (lead ? " lead" : "") + '"><span class="bn">' + esc(b[0]) + '</span>' +
        '<span class="br">' + esc(b[1]) + '<small> (' + esc(b[2]) + ')</small></span>' +
        '<span class="bx">' + esc(b[3]) + '</span></div>';
    }
    return '<div class="c">' + bat(p.a, true) + bat(p.b, false) +
      '<div class="ptotal"><span>Partnership</span><b>' + p.runs + ' off ' + p.balls + '</b></div>' +
      '<p class="note" style="margin-top:10px">' + esc(p.note) + '</p></div>';
  };

  P.battinglist = function (p) {
    return '<div class="tablewrap"><table class="sctable"><thead><tr>' +
      '<th class="scname">Batter</th><th>R</th><th>B</th><th>4s</th><th>SR</th></tr></thead><tbody>' +
      p.rows.map(function (r) {
        var notout = /not out/i.test(r[1]);
        var runs = Number(r[2]), balls = Number(r[3]) || 1;
        var fours = Math.max(0, Math.round(runs / 9));
        var sr = (runs / balls * 100).toFixed(2);
        return '<tr' + (notout ? ' class="notout"' : "") + '>' +
          '<td class="scname">' + (notout ? '<span class="batico">' + I.bat + '</span>' : "") +
          '<span><b>' + esc(r[0]) + '</b><br><span class="scdis">' + esc(r[1]) + '</span></span></td>' +
          '<td class="scr">' + esc(r[2]) + '</td><td>' + esc(r[3]) + '</td><td>' + fours + '</td><td>' + sr + '</td></tr>';
      }).join("") + '</tbody></table></div>' +
      '<div class="totrow"><span>' + esc(p.extras) + '</span><b>' + esc(p.total) + '</b></div>';
  };

  P.bowlinglist = function (p) {
    return '<div class="playerlist">' + p.rows.map(function (r) {
      return '<div class="pl follow"><span class="pn">' + esc(r[0]) + '</span><span class="pr nums">' + esc(r[1]) + '</span></div>';
    }).join("") + '</div>';
  };

  /* ---- tennis ---- */

  P.courts = function (p) {
    var rows = p.rows.slice().sort(function (a, b) { return b[3] - a[3]; });
    return '<div class="courtlist">' + rows.map(function (r, i) {
      return '<button class="court' + (i === 0 ? " top" : "") + '" type="button" data-toast="Switched to ' + esc(r[0]) + '. Your other scores stay pinned.">' +
        '<span class="cname">' + esc(r[0]) + (i === 0 ? " · watch now" : "") + '</span>' +
        '<span class="sig">' + r[3].toFixed(2) + '</span>' +
        '<span class="cmatch">' + esc(r[1]) + '</span>' +
        '<span class="cstate">' + esc(r[2]) + '</span></button>';
    }).join("") + '</div>';
  };

  P.pointgrid = function (p) {
    return '<div class="c"><div class="pgrid">' + p.games.map(function (g) {
      return '<div class="pgcol"><span class="pgl">' + esc(g[0]) + '</span>' +
        g[1].map(function (pt) { return '<i class="' + (pt ? "won" : "") + '"></i>'; }).join("") + '</div>';
    }).join("") + '</div><p class="note">' + esc(p.note) + '</p></div>';
  };

  P.oop = function (p) {
    return '<div class="playerlist">' + p.rows.map(function (r) {
      return '<div class="pl oop"><span class="num">' + esc(r[0]) + '</span>' +
        '<span class="pn">' + esc(r[2]) + '<br><span class="pr small">' + esc(r[3]) + '</span></span>' +
        '<span class="pr">' + esc(r[1]) + '</span></div>';
    }).join("") + '</div>';
  };

  P.centenary = function (p) {
    return '<div class="c cent">' + p.years.map(function (y) {
      return '<div class="centrow"><span class="cy">' + esc(y[0]) + '</span>' +
        '<div><span class="ct">' + esc(y[1]) + '</span><p class="cb">' + esc(y[2]) + '</p></div></div>';
    }).join("") + (p.note ? '<p class="note" style="margin-top:4px">' + esc(p.note) + '</p>' : "") + '</div>';
  };

  /* ---- rugby ---- */

  P.law = function (p) {
    return '<div class="c lawcard"><div class="lawref">' + esc(p.ref) + '</div>' +
      '<p class="lawbody">' + esc(p.body) + '</p>' +
      '<p class="lawmeta">' + esc(p.meta) + '</p></div>';
  };

  P.tmo = function (p) {
    return '<div class="c alert"><div class="alerttag">TMO REVIEW · IN PROGRESS</div>' +
      '<p class="q">' + esc(p.q) + '</p>' +
      '<div class="tmobar"><i id="tmobar" style="width:' + Math.min(100, p.elapsed / 120 * 100) + '%"></i></div>' +
      '<div class="tmotime"><span>Elapsed</span><b id="tmotime">' + mmss(S.tmo) + '</b></div>' +
      (p.note ? '<p class="note" style="margin-top:12px">' + esc(p.note) + '</p>' : "") + '</div>';
  };

  P.territory = function (p) {
    return '<div class="c">' + p.rows.map(function (r) {
      return '<div class="statrow"><div class="statlab"><span class="v">' + r[1] + '%</span>' +
        '<span class="k">' + esc(r[0]) + '</span><span class="v r">' + r[2] + '%</span></div>' +
        '<div class="statbar"><span class="sb l"><i style="width:' + r[1] + '%"></i></span><span class="mid"></span>' +
        '<span class="sb r"><i style="width:' + r[2] + '%"></i></span></div></div>';
    }).join("") + '<p class="note">' + esc(p.note) + '</p></div>';
  };

  P.phases = function (p) {
    var dots = "";
    for (var i = 0; i < p.max; i++) {
      dots += '<i class="' + (i < p.count ? "on" : "") + (i === p.count - 1 ? " now" : "") + '"></i>';
    }
    return '<div class="c"><div class="phasetop"><span class="pcount">' + p.count + '</span><span class="plab">phases<br>this possession</span></div>' +
      '<div class="phaserow">' + dots + '</div><p class="note">' + esc(p.note) + '</p></div>';
  };

  /* ------------------------------------------------------------- render */

  function renderSections(sections) {
    return sections.map(function (sec) {
      var head = "";
      if (sec.h) {
        head = '<div class="sechead"><h2>' + (sec.metaLive ? '<span class="livedot">' + esc(sec.h) + '</span>' : esc(sec.h)) + '</h2>' +
          (sec.meta ? '<span class="meta' + (sec.metaLive ? " live" : "") + '">' + esc(sec.meta) + '</span>' : "") + '</div>';
      }
      return '<section class="section">' + (sec.ruleY ? '<div class="rule-y"></div>' : "") + head +
        sec.panels.map(function (p) { return P[p.t] ? P[p.t](p) : ""; }).join("") + '</section>';
    }).join("");
  }

  function appHead(sectionLabel) {
    return '<div class="apphead"><div class="headrow">' +
      '<button class="iconbtn" type="button" id="burger" aria-label="Menu" aria-expanded="false">' + I.burger + '</button>' +
      '<span class="bbcblocks" aria-label="BBC"><i>B</i><i>B</i><i>C</i></span>' +
      '<button class="iconbtn" type="button" data-toast="Notifications are not wired up in this prototype." aria-label="Notifications">' + I.bell + '</button>' +
      '<button class="iconbtn" type="button" data-toast="Share sheet is not wired up in this prototype." aria-label="Share">' + I.share + '</button>' +
      '</div><div class="sportrow"><span class="sportmark">SPORT</span><span class="sportsection">' + esc(sectionLabel) + '</span></div></div>';
  }

  function matchHead() {
    var e = ev(), st = evState(), h = st.head;
    var out = "";
    if (st.paired) {
      out += '<div class="paired">' + I.qr + '<span><span class="p1">' + esc(st.paired) + '</span><br>' +
        '<span class="p2">' + esc(e.title) + ' · ' + esc(e.venue) + '</span></span></div>';
    }
    out += '<div class="matchhead"><div class="compline">' +
      '<button class="iconbtn compback" type="button" data-gohome aria-label="Back to Home">' + I.back + '</button>' +
      '<span class="compname">' + esc(e.comp) + '</span>' +
      '<button class="iconbtn compback" type="button" data-toast="Added to My Sport." aria-label="Follow">' + I.star + '</button></div>';

    if (st.chip) {
      out += '<div class="statestrip">' +
        '<span class="inplay' + (h.status.kind === "live" || h.status.kind === "paired" ? " on" : "") + '">' + esc(st.chip) + '</span>' +
        (st.watching ? '<span class="watching">' + I.livedot + esc(st.watching) + ' watching</span>' : "") +
        '</div>';
    }

    if (h.kind === "teams") {
      out += '<div class="scorewrap">' +
        '<span class="side"><span class="crest a">' + esc(h.home.code) + '</span><span class="tname">' + esc(h.home.name) + '</span>' +
        (h.home.sub ? '<span class="tsub">' + esc(h.home.sub) + '</span>' : "") + '</span>' +
        '<span class="centre"><span class="statusrow ' + h.status.kind + '">' +
        '<i class="pip' + (h.status.beat ? " beat" : "") + '"></i>' + esc(h.status.text) + '</span>' +
        '<span class="' + (h.centre.small ? "kotime" : "bigscore") + '">' + esc(h.centre.big) + '</span>' +
        '<span class="clockline" id="headclock">' + esc(h.centre.sub) + '</span></span>' +
        '<span class="side"><span class="crest b">' + esc(h.away.code) + '</span><span class="tname">' + esc(h.away.name) + '</span>' +
        (h.away.sub ? '<span class="tsub">' + esc(h.away.sub) + '</span>' : "") + '</span></div>';
    } else {
      out += '<div class="stackwrap"><span class="statusrow ' + h.status.kind + '">' +
        '<i class="pip' + (h.status.beat ? " beat" : "") + '"></i>' + esc(h.status.text) + '</span>' +
        h.rows.map(function (r, i) {
          return '<div class="srow' + (r[3] ? " now" : "") + '">' +
            '<span class="sname">' + esc(r[0]) + (h.serve === i ? '<i class="servedot"></i>' : "") + '</span>' +
            '<span class="sscore">' + esc(r[1]) + '</span>' +
            '<span class="sdet"' + (i === 1 ? ' id="stackdet"' : "") + '>' + esc(r[2]) + '</span></div>';
        }).join("") +
        '<p class="strap">' + esc(h.strap) + '</p></div>';
    }
    if (st.state) { out += '<p class="stateline">' + esc(st.state) + '</p>'; }

    if (e.audio) {
      out += '<div class="listenrow">' +
        '<button class="listenbtn" type="button" data-toast="' + esc(e.audio.station) + ' is a placeholder in this prototype.">' +
        I.speaker + 'Listen live</button>' +
        '<span class="listenmeta"><b>' + esc(e.audio.prog) + '</b><br>' + esc(e.audio.station) + '</span></div>';
    }

    out += '</div>';
    return out;
  }

  function summaryBox() {
    var st = evState();
    curTab();
    if (!st.summary || S.tabIx[tabKey()] !== 0) { return ""; }
    return '<section class="section"><div class="sechead"><h2>Summary</h2></div>' +
      '<ul class="summary">' + st.summary.map(function (s, i) {
        return '<li' + (i === 1 ? ' class="link"' : "") + '>' + esc(s) + '</li>';
      }).join("") + '</ul></section>';
  }

  function tabBar() {
    var k = tabKey();
    return '<div class="tabbar" role="tablist" aria-label="Sections">' + curTabs().map(function (t, i) {
      return '<button class="tabbtn" role="tab" type="button" data-tab="' + i + '" aria-selected="' + (i === S.tabIx[k]) + '">' + esc(t.label) + '</button>';
    }).join("") + '</div>';
  }

  /* ---- Home ---- */

  var GROUPS = [
    ["live", "Live now"],
    ["soon", "Starting soon"],
    ["done", "Earlier today"]
  ];

  function homeBody() {
    var copy = HOMECOPY[lc()] || HOMECOPY.live;
    var hero = HOMEFEED.hero[lc()] || HOMEFEED.hero.live;
    var cards = EVENTS.map(function (e, i) { return { e: e, i: i, c: evState(e).card }; });
    var top = cards.slice().sort(function (a, b) { return b.c.sig - a.c.sig; })[0];
    var out = "";

    /* ---- hero story ---- */
    var chosen = S.votes[hero.poll.id], done = chosen !== undefined;
    out += '<section class="hero">' +
      '<div class="herophoto">' + photoSVG(hero.photo, "square") + '<span class="heroscrim"></span></div>' +
      '<div class="herotext"><span class="herokick">' + esc(hero.kicker) + '</span>' +
      '<h1 class="herohead">' + esc(hero.head) + '</h1></div></section>' +
      '<section class="section herobody">' +
      '<p class="herostand">' + esc(hero.stand) + '</p>' +
      '<div class="engage">' +
      '<span class="eng">' + I.comment + esc(hero.comments) + '</span>' +
      '<span class="eng">' + I.heart + esc(hero.likes) + '</span>' +
      '<span class="eng">' + I.send + esc(hero.shares) + '</span></div>' +
      '<div class="hys"><p class="hysq">' + esc(hero.poll.q) + '</p>' +
      '<div class="hysopts" data-poll="' + hero.poll.id + '">' +
      hero.poll.opts.map(function (o, k) {
        return '<button class="hysbtn" type="button" aria-pressed="' + (k === chosen) + '" data-i="' + k + '"' +
          (done ? " disabled" : "") + '>' + esc(o) + '</button>';
      }).join("") + '</div>' +
      (done ? resultRows(hero.poll.opts, hero.poll.split, chosen) : "") +
      (done ? '<p class="tally">' + esc(hero.poll.after) + '</p>' : "") +
      '</div></section>';

    /* ---- the live rail: one card per sport ---- */
    var railOrder = cards.slice().sort(function (a, b) {
      var rank = { live: 0, soon: 1, done: 2 };
      if (rank[a.c.status] !== rank[b.c.status]) { return rank[a.c.status] - rank[b.c.status]; }
      return b.c.sig - a.c.sig;
    });
    out += '<section class="section">' + feedHead("Live on the BBC", "The full live index is not built out in this prototype.") +
      '<div class="rail liverail">' + railOrder.map(function (x) {
        var c = x.c, isTop = x === top && c.status === "live";
        var chip = c.status === "live" ? '<span class="chiplive">LIVE</span>'
          : c.status === "soon" ? '<span class="chipsoon">' + esc(c.when.split(" ·")[0]) + '</span>'
          : '<span class="chipdone">' + esc(c.when.split(" ·")[0]) + '</span>';
        return '<button class="lcard' + (isTop ? " top" : "") + '" type="button" data-open="' + x.i + '">' +
          '<span class="lphoto">' + photoSVG(x.e.photo, "wide") + chip +
          (c.badge ? '<span class="lbadge">' + esc(c.badge) + '</span>' : "") + '</span>' +
          '<span class="lsport">' + (I.sport[x.e.sport] || "") + esc(x.e.sport) + '</span>' +
          '<span class="ltitle">' + esc(c.line1) + '</span>' +
          '<span class="lsub">' + esc(c.line2) + '</span>' +
          (isTop ? '<span class="lsig hot">Watch now</span>' : "") +
          '</button>';
      }).join("") + '</div></section>';

    /* ---- following today: the ranked list with the context lines ---- */
    out += '<section class="section">' + feedHead("Following today", "Your followed events are not built out in this prototype.") +
      '<div class="cardlist">' + cards.slice().sort(function (a, b) { return b.c.sig - a.c.sig; }).map(function (x) {
        var c = x.c;
        return '<button class="ecard" type="button" data-open="' + x.i + '">' +
          '<span class="ec-top"><span class="ec-sport">' + (I.sport[x.e.sport] || "") + esc(x.e.sport) + '</span>' +
          '<span class="ec-when' + (c.status === "live" ? " live" : "") + '">' + esc(c.when) + '</span></span>' +
          '<span class="ec-title">' + esc(c.line1) + '</span>' +
          '<span class="ec-sub">' + esc(c.line2) + '</span>' +
          '<span class="ec-ctx">' + esc(c.ctx) + '</span>' +
          '<span class="ec-foot"><span class="ec-go">' + I.chevron + '</span></span></button>';
      }).join("") + '</div></section>';

    /* ---- video rail ---- */
    var v = HOMEFEED.videos;
    out += '<section class="section">' + feedHead(v.title, "The video index is not built out in this prototype.") +
      '<div class="rail">' + v.deck.map(function (ix) {
        var it = DROP[ix];
        return '<button class="vcard" type="button" data-play="' + ix + '">' +
          '<span class="vphoto">' + photoSVG(it, "wide") + '<span class="vplay">' + I.playtri + '</span>' +
          '<span class="vdur">' + I.playsm + esc(it.dur) + '</span></span>' +
          '<span class="vtitle">' + esc(it.t) + '</span></button>';
      }).join("") + '</div></section>';

    /* ---- sport on the BBC ---- */
    var br = HOMEFEED.bbcrail;
    out += '<section class="section">' + feedHead(br.title, "The BBC Sport index is not built out in this prototype.") +
      '<div class="rail">' + br.items.map(function (it) {
        return '<button class="bcard' + (it.badge ? " live" : "") + '" type="button" data-toast="' + esc(it.title) + ' is not built out in this prototype.">' +
          '<span class="bphoto">' + photoSVG(it, "wide") +
          (it.badge ? '<span class="chiplive">' + esc(it.badge) + '</span>' : "") + '</span>' +
          '<span class="btitle">' + esc(it.title) + '</span>' +
          '<span class="bsub">' + esc(it.sub) + '</span></button>';
      }).join("") + '</div></section>';

    /* ---- standings ---- */
    var st = HOMEFEED.standings;
    out += '<section class="section">' + feedHead(st.title, "The full table is not built out in this prototype.") +
      table(st.cols, st.rows) + '<p class="note">' + esc(st.note) + '</p></section>';

    /* ---- football competitions ---- */
    var cp = HOMEFEED.comps, tix = S.compTab || 0, ct = cp.tabs[tix];
    out += '<section class="section">' + feedHead(cp.title, "The competition index is not built out in this prototype.") +
      '<div class="comptabs">' + cp.tabs.map(function (t, i) {
        return '<button class="comptab" type="button" data-comp="' + i + '" aria-pressed="' + (i === tix) + '">' +
          badge(t.colour, t.initials) + esc(t.name) + '</button>';
      }).join("") + '</div>' + table(ct.cols, ct.rows, "Club") + '</section>';

    /* ---- transfer rumours ---- */
    var rm = HOMEFEED.rumours;
    out += '<section class="section">' + feedHead(rm.title, "The rumour index is not built out in this prototype.") +
      '<div class="rail">' + rm.items.map(function (it) {
        return '<button class="rcard" type="button" data-toast="' + esc(it[0]) + '">' +
          badge(it[2], it[3]) + '<span><span class="rtitle">' + esc(it[0]) + '</span>' +
          '<span class="rviews">' + esc(it[1]) + '</span></span></button>';
      }).join("") + '</div></section>';

    return out;
  }

  function table(cols, rows, firstCol) {
    return '<div class="tablewrap"><table class="ltable"><thead><tr>' +
      '<th class="tpos"></th><th class="tname">' + esc(firstCol || "Team") + '</th>' +
      cols.map(function (c) { return '<th>' + esc(c) + '</th>'; }).join("") +
      '</tr></thead><tbody>' + rows.map(function (r, i) {
        return '<tr' + (i === 0 ? ' class="lead"' : "") + '><td class="tpos">' + (i + 1) + '</td>' +
          '<td class="tname">' + badge(r[1], r[2]) + '<span>' + esc(r[0]) + '</span></td>' +
          r[3].map(function (v) { return '<td>' + esc(v) + '</td>'; }).join("") + '</tr>';
      }).join("") + '</tbody></table></div>';
  }

  /* ---- shell ---- */

  function render(dir) {
    var app = $("#app"), isHome = S.view === "home" && S.nav === "home";
    var head, body;

    if (S.nav !== "home") {
      head = appHead(NAVSCREENS[S.nav].title);
      body = renderSections(NAVSCREENS[S.nav].sections);
    } else if (isHome) {
      head = appHead("Home");
      body = homeBody();
    } else {
      head = appHead(ev().sport) + matchHead() + tabBar();
      body = summaryBox() + renderSections(curTab().sections);
    }

    app.innerHTML = '<div class="viewport' + (evState().sofa && !isHome && S.nav === "home" ? " sofa" : "") + '" id="viewport">' +
      head + '<div class="body" id="scrollbody"><div id="stage"' +
      (dir ? ' class="stage-anim" style="--from:' + (dir > 0 ? "18px" : "-18px") + '"' : "") + '>' + body + '</div></div>' +
      navBar() + drawer() + '<div class="toast" id="toast" role="status"></div></div>';

    var sb = $("#scrollbody"), vp = $("#viewport");
    if (sb && vp) {
      sb.addEventListener("scroll", function () {
        vp.classList.toggle("condensed", sb.scrollTop > 36);
      }, { passive: true });
    }

    $$(".lc").forEach(function (b, i) { b.setAttribute("aria-selected", String(i === S.lcIx)); });
    $$(".swipehint i").forEach(function (d, i) { d.classList.toggle("on", i === S.lcIx); });
    $("#lcblurb").textContent = LIFECYCLE[S.lcIx].blurb;
    wire();
    if (S.player !== null) { mountPlayer(); }
  }

  function rerenderBody() {
    var sb = $("#scrollbody"), pos = sb ? sb.scrollTop : 0;
    var isHome = S.view === "home" && S.nav === "home";
    $("#stage").innerHTML = S.nav !== "home" ? renderSections(NAVSCREENS[S.nav].sections)
      : isHome ? homeBody() : summaryBox() + renderSections(curTab().sections);
    if (sb) { sb.scrollTop = pos; }
    wire();
  }

  function navBar() {
    return '<div class="bottomnav" role="tablist" aria-label="Sections">' + NAVITEMS.map(function (n) {
      var on = S.nav === n[0];
      return '<button class="nav" role="tab" type="button" data-nav="' + n[0] + '" aria-selected="' + on + '">' +
        I.nav[n[0]] + '<span>' + esc(n[1]) + '</span></button>';
    }).join("") + '</div>';
  }

  function drawer() {
    return '<div class="scrim" id="scrim"></div><aside class="drawer" id="drawer" aria-label="Menu" aria-hidden="true">' +
      '<div class="dh"><span>SPORT</span><button class="iconbtn" type="button" id="drawerclose" aria-label="Close menu">' + I.close + '</button></div>' +
      '<div class="dsec">Lifecycle state</div><nav>' + LIFECYCLE.map(function (l, i) {
        return '<button class="dl' + (i === S.lcIx ? " on" : "") + '" type="button" data-lcix="' + i + '">' +
          esc(l.label) + '<span class="dsub">' + esc(l.blurb) + '</span></button>';
      }).join("") + '</nav>' +
      '<div class="dsec">Live today</div><nav>' + EVENTS.map(function (e, i) {
        return '<button class="dl' + (S.view === "event" && i === S.eventIx ? " on" : "") + '" type="button" data-open="' + i + '">' +
          esc(e.sport) + '<span class="dsub">' + esc(e.title) + '</span></button>';
      }).join("") + '</nav>' +
      '<div class="dsec">All sport</div><nav>' + SPORTS.map(function (s) {
        return '<button class="dl" type="button" data-toast="' + esc(s) + ' is not built out in this prototype.">' + esc(s) + '</button>';
      }).join("") + '</nav></aside>';
  }

  /* ------------------------------------------------------------- wiring */

  function wire() {
    var burger = $("#burger");
    function closeDrawer() {
      $("#drawer").classList.remove("open");
      $("#scrim").classList.remove("open");
      $("#drawer").setAttribute("aria-hidden", "true");
      if (burger) { burger.setAttribute("aria-expanded", "false"); }
    }
    if (burger) {
      burger.onclick = function () {
        $("#drawer").classList.add("open");
        $("#scrim").classList.add("open");
        $("#drawer").setAttribute("aria-hidden", "false");
        burger.setAttribute("aria-expanded", "true");
      };
    }
    if ($("#scrim")) { $("#scrim").onclick = closeDrawer; }
    if ($("#drawerclose")) { $("#drawerclose").onclick = closeDrawer; }

    $$("[data-lcix]").forEach(function (b) {
      b.onclick = function () { closeDrawer(); goLc(Number(b.dataset.lcix)); };
    });
    $$("[data-open]").forEach(function (b) {
      b.onclick = function () { closeDrawer(); openEvent(Number(b.dataset.open)); };
    });
    $$("[data-gohome]").forEach(function (b) {
      b.onclick = function () { S.view = "home"; S.nav = "home"; render(-1); };
    });

    $$(".tabbtn").forEach(function (b) {
      b.onclick = function () {
        S.tabIx[tabKey()] = Number(b.dataset.tab);
        $$(".tabbtn").forEach(function (x) { x.setAttribute("aria-selected", String(x === b)); });
        $("#scrollbody").scrollTop = 0;
        rerenderBody();
      };
    });

    $$("[data-nav]").forEach(function (b) {
      b.onclick = function () {
        S.nav = b.dataset.nav;
        if (b.dataset.nav === "home") { S.view = "home"; }
        render();
      };
    });

    $$("[data-toast]").forEach(function (b) { b.onclick = function () { toast(b.dataset.toast); }; });

    $$("[data-comp]").forEach(function (b) {
      b.onclick = function () { S.compTab = Number(b.dataset.comp); rerenderBody(); };
    });

    $$("[data-play]").forEach(function (b) {
      b.onclick = function () { openPlayer(Number(b.dataset.play)); };
    });

    var optaBtn = $("[data-optatoggle]");
    if (optaBtn) { optaBtn.onclick = function () { S.optaOpen = !S.optaOpen; rerenderBody(); }; }

    $$("[data-focusrail]").forEach(function (rail) {
      function mark() {
        var mid = rail.scrollLeft + rail.clientWidth / 2, best = null, bd = 1e9;
        $$(".fcard", rail).forEach(function (c) {
          var d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
          if (d < bd) { bd = d; best = c; }
        });
        $$(".fcard", rail).forEach(function (c) { c.classList.toggle("on", c === best); });
      }
      rail.addEventListener("scroll", mark, { passive: true });
      mark();
    });

    $$("[data-moment]").forEach(function (b) {
      b.onclick = function () { S.moment = b.dataset.moment; S.playing = b.dataset.moment === "live"; rerenderBody(); };
    });
    var pp = $("[data-playpause]");
    if (pp) { pp.onclick = function () { S.playing = !S.playing; rerenderBody(); }; }

    $$("[data-poll]").forEach(function (grp) {
      var id = grp.dataset.poll;
      $$(".optbtn", grp).forEach(function (b) {
        b.onclick = function () {
          if (S.votes[id] !== undefined) { return; }
          S.votes[id] = Number(b.dataset.i);
          S.answered += 1;
          rerenderBody();
        };
      });
    });

    $$("[data-quiz]").forEach(function (grp) {
      var qid = grp.dataset.quiz;
      $$(".optbtn", grp).forEach(function (b) {
        b.onclick = function () {
          if (S.quiz[qid].answered !== false) { return; }
          S.quiz[qid].answered = Number(b.dataset.i);
          S.answered += 1;
          rerenderBody();
        };
      });
    });

    $$("[data-step]").forEach(function (b) {
      b.onclick = function () {
        var t = b.dataset.step;
        S.predict[t] = Math.max(0, Math.min(9, S.predict[t] + Number(b.dataset.d)));
        rerenderBody();
      };
    });
    var lock = $("[data-lock]");
    if (lock) { lock.onclick = function () { S.predict.locked = true; rerenderBody(); }; }

    $$("[data-toggleid]").forEach(function (b) {
      b.onclick = function () { S.toggles[b.dataset.toggleid] = !S.toggles[b.dataset.toggleid]; rerenderBody(); };
    });

    $$("[data-follow]").forEach(function (b) {
      b.onclick = function () {
        var on = b.getAttribute("aria-pressed") !== "true";
        b.setAttribute("aria-pressed", String(on));
        b.textContent = on ? "Following" : "Follow";
      };
    });

    var signin = $("[data-signin]");
    if (signin) { signin.onclick = function () { S.signedIn = true; rerenderBody(); }; }

    var rate = $("#rate");
    if (rate) {
      rate.oninput = function () {
        var key = ev().id;
        S.ratings[key] = Number(rate.value);
        $("#rateval").textContent = S.ratings[key].toFixed(1);
      };
      rate.onchange = function () { rerenderBody(); };
    }

    var offset = $("#offset");
    if (offset) { offset.oninput = function () { S.offset = Number(offset.value); rerenderBody(); }; }

    var sort = $("#feedsort");
    if (sort) { sort.onchange = function () { S.feedNewest = sort.value === "new"; rerenderBody(); }; }

    var search = $("#searchbox");
    if (search) { search.onkeydown = function (e) { if (e.key === "Enter") { toast("Search is a stub in this prototype."); } }; }
  }


  /* ------------------------------------------------------------- player */

  function playerHTML() {
    if (S.player === null) { return ""; }
    var ix = S.player, it = DROP[ix], n = DROP.length;
    var liked = !!S.liked[ix];
    return '<div class="takeover" id="takeover" role="dialog" aria-label="' + esc(it.t) + '">' +
      '<div class="tovideo">' + photoSVG(it, "tall") + '<span class="toscrim"></span></div>' +
      '<div class="tonav"><button class="tozone prev" type="button" data-step-clip="-1" aria-label="Previous"></button>' +
      '<button class="tozone next" type="button" data-step-clip="1" aria-label="Next"></button></div>' +
      '<button class="toback" type="button" data-closeplayer aria-label="Close">' + I.back2 + '</button>' +
      '<div class="torail">' +
      '<button class="toact' + (liked ? " on" : "") + '" type="button" data-likeclip aria-pressed="' + liked + '">' +
      I.heartbig + '<span>' + (liked ? bumpCount(it.likes) : it.likes) + '</span></button>' +
      '<button class="toact" type="button" data-toast="Comments are not built out in this prototype.">' + I.commentbig + '<span>' + esc(it.comments) + '</span></button>' +
      '<button class="toact" type="button" data-toast="Share sheet is not wired up in this prototype.">' + I.sharebig + '<span>Share</span></button>' +
      '</div>' +
      '<div class="tofoot">' +
      '<div class="tochan"><span class="toav">' + esc(it.chan.replace("BBC ", "").slice(0, 2).toUpperCase()) + '</span>' +
      '<span><span class="tocn">' + esc(it.chan) + '</span><br>' +
      '<span class="tohandle">' + I.tick + esc(it.handle) + '</span></span></div>' +
      '<p class="tocap">' + esc(it.cap) + '</p>' +
      '<div class="totags">' + it.tags.map(function (tg) {
        return '<button class="totag" type="button" data-toast="' + esc(tg) + ' is not built out in this prototype.">' + esc(tg) + '</button>';
      }).join("") + '</div></div>' +
      '<div class="toprog"><span class="tosegs">' + DROP.map(function (x, k) {
        return '<button class="toseg' + (k === ix ? " on" : "") + '" type="button" data-clip="' + k + '" aria-label="Item ' + (k + 1) + '"></button>';
      }).join("") + '</span><span class="tocount">' + (ix + 1) + ' of ' + n + '</span></div>' +
      '</div>';
  }

  function bumpCount(s) {
    var m = /^([\d.]+)(k?)$/.exec(s);
    if (!m) { return s; }
    if (m[2]) { return (parseFloat(m[1]) + 0.1).toFixed(1) + "k"; }
    return String(Number(m[1]) + 1);
  }

  function openPlayer(ix) {
    S.player = ix;
    mountPlayer();
  }
  function closePlayer() {
    S.player = null;
    var el = $("#takeover");
    if (el) { el.remove(); }
  }
  function stepClip(d) {
    if (S.player === null) { return; }
    S.player = (S.player + d + DROP.length) % DROP.length;
    mountPlayer();
  }
  function mountPlayer() {
    var old = $("#takeover");
    if (old) { old.remove(); }
    $("#viewport").insertAdjacentHTML("beforeend", playerHTML());
    wirePlayer();
  }

  function wirePlayer() {
    var el = $("#takeover");
    if (!el) { return; }
    $$("[data-closeplayer]", el).forEach(function (b) { b.onclick = closePlayer; });
    $$("[data-step-clip]", el).forEach(function (b) {
      b.onclick = function () { stepClip(Number(b.dataset.stepClip)); };
    });
    $$("[data-clip]", el).forEach(function (b) {
      b.onclick = function () { S.player = Number(b.dataset.clip); mountPlayer(); };
    });
    $$("[data-toast]", el).forEach(function (b) { b.onclick = function () { toast(b.dataset.toast); }; });
    var like = $("[data-likeclip]", el);
    if (like) {
      like.onclick = function () {
        S.liked[S.player] = !S.liked[S.player];
        mountPlayer();
      };
    }
    var wheelAt = 0;
    el.addEventListener("wheel", function (e) {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 10) { return; }
      var now = Date.now();
      if (now - wheelAt < 420) { return; }
      wheelAt = now;
      stepClip(e.deltaY > 0 ? 1 : -1);
    }, { passive: false });

    var sy = 0, tracking = false;
    el.addEventListener("touchstart", function (e) {
      if (e.touches.length !== 1) { return; }
      sy = e.touches[0].clientY; tracking = true;
    }, { passive: true });
    el.addEventListener("touchend", function (e) {
      if (!tracking) { return; }
      tracking = false;
      var dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dy) > 60) { stepClip(dy < 0 ? 1 : -1); }
    }, { passive: true });
    el.focus();
  }

  /* ------------------------------------------------------------- moves */

  function goLc(ix) {
    if (ix < 0 || ix >= LIFECYCLE.length || ix === S.lcIx) { return; }
    var dir = ix > S.lcIx ? 1 : -1;
    S.lcIx = ix;
    S.nav = "home";
    render(dir);
    if ($("#scrollbody")) { $("#scrollbody").scrollTop = 0; }
  }

  function openEvent(ix) {
    S.eventIx = ix;
    S.view = "event";
    S.nav = "home";
    render(1);
    if ($("#scrollbody")) { $("#scrollbody").scrollTop = 0; }
  }

  function attachSwipe() {
    var app = $("#app"), sx = 0, sy = 0, tracking = false;
    app.addEventListener("touchstart", function (e) {
      if (e.touches.length !== 1 || S.player !== null) { return; }
      sx = e.touches[0].clientX; sy = e.touches[0].clientY; tracking = true;
    }, { passive: true });
    app.addEventListener("touchend", function (e) {
      if (!tracking) { return; }
      tracking = false;
      var t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
      if (Math.abs(dx) > 64 && Math.abs(dx) > Math.abs(dy) * 1.6) { goLc(S.lcIx + (dx < 0 ? 1 : -1)); }
    }, { passive: true });

    var md = false, mx = 0, my = 0;
    app.addEventListener("mousedown", function (e) {
      if (e.target.closest("button, input, select, a") || S.player !== null) { return; }
      md = true; mx = e.clientX; my = e.clientY;
    });
    window.addEventListener("mouseup", function (e) {
      if (!md) { return; }
      md = false;
      var dx = e.clientX - mx, dy = e.clientY - my;
      if (Math.abs(dx) > 90 && Math.abs(dx) > Math.abs(dy) * 1.6) { goLc(S.lcIx + (dx < 0 ? 1 : -1)); }
    });

    document.addEventListener("keydown", function (e) {
      if (e.target.matches("input, select, textarea")) { return; }
      if (S.player !== null) {
        if (e.key === "Escape") { closePlayer(); }
        if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); stepClip(1); }
        if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); stepClip(-1); }
        return;
      }
      if (e.key === "ArrowRight") { goLc(S.lcIx + 1); }
      if (e.key === "ArrowLeft") { goLc(S.lcIx - 1); }
      if (e.key === "Escape" && S.view === "event") { S.view = "home"; S.nav = "home"; render(-1); }
    });
  }

  /* ------------------------------------------------------------- clocks */

  var overTick = 0;

  function startClocks() {
    setInterval(function () {
      var st = evState(), kind = st.clock;

      if (kind === "football") {
        S.dataSecs += 1;
        var hc = $("#headclock");
        if (hc && S.view === "event" && S.nav === "home") {
          hc.textContent = lc() === "companion" ? mmss(Math.max(0, S.dataSecs - S.offset)) : mmss(S.dataSecs);
        }
        var oc = $("#opta-clock");
        if (oc) { oc.textContent = lc() === "companion" ? mmss(Math.max(0, S.dataSecs - S.offset)) : mmss(S.dataSecs); }
      }

      if (kind === "rugby") {
        S.rugbySecs += 1;
        var rc = $("#headclock");
        if (rc && S.view === "event" && S.nav === "home") {
          rc.textContent = lc() === "companion" ? mmss(Math.max(0, S.rugbySecs - S.offset)) : mmss(S.rugbySecs);
        }
      }

      if (kind === "cricket") {
        overTick += 1;
        if (overTick >= 8) {
          overTick = 0;
          S.overBall += 1;
          if (S.overBall > 6) { S.overBall = 1; S.overNum += 1; }
          var sd = $("#stackdet");
          if (sd) { sd.textContent = "(" + S.overNum + "." + S.overBall + " ov) · trail by 88"; }
        }
      }

      var cd = $("#c-data"), ctv = $("#c-tv");
      if (cd) { cd.textContent = mmss(kind === "rugby" ? S.rugbySecs : S.dataSecs); }
      if (ctv) { ctv.textContent = mmss(Math.max(0, (kind === "rugby" ? S.rugbySecs : S.dataSecs) - S.offset)); }

      var cdEl = $("#cd");
      if (cdEl) {
        var left = Number(cdEl.dataset.h) * 3600 + Number(cdEl.dataset.m) * 60 + Number(cdEl.dataset.s) - 1;
        if (left < 0) { left = 0; }
        cdEl.dataset.h = Math.floor(left / 3600);
        cdEl.dataset.m = Math.floor(left % 3600 / 60);
        cdEl.dataset.s = left % 60;
        $("#cd-h").textContent = pad(Number(cdEl.dataset.h));
        $("#cd-m").textContent = pad(Number(cdEl.dataset.m));
        $("#cd-s").textContent = pad(Number(cdEl.dataset.s));
      }

      var tb = $("#tmobar");
      if (tb) {
        S.tmo += 1;
        tb.style.width = Math.min(100, S.tmo / 120 * 100) + "%";
        $("#tmotime").textContent = mmss(S.tmo);
      }

      $$(".qbar-i").forEach(function (bar) {
        var qid = bar.dataset.qid, q = S.quiz[qid];
        if (!q || q.answered !== false || q.left <= 0) { return; }
        q.left -= 1;
        bar.style.width = Math.max(0, q.left / 20 * 100) + "%";
        if (q.left <= 0) {
          q.answered = -1;
          var t = $('[data-qtally="' + qid + '"]');
          if (t) { t.textContent = "Time's up. The answer lands with the next replay."; }
        }
      });
    }, 1000);
  }

  /* ------------------------------------------------------------- boot */

  function boot() {
    $("#lifecycle").innerHTML = LIFECYCLE.map(function (l, i) {
      return '<button class="lc" role="tab" type="button" aria-selected="' + (i === S.lcIx) + '">' + esc(l.label) + '</button>';
    }).join("");
    $$(".lc").forEach(function (b, i) { b.onclick = function () { goLc(i); }; });
    $("#swipehint").innerHTML = LIFECYCLE.map(function (l, i) {
      return '<i class="' + (i === S.lcIx ? "on" : "") + '"></i>';
    }).join("");

    render();
    attachSwipe();
    startClocks();
  }

  if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", boot); }
  else { boot(); }
})();
