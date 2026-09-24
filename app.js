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
    gear: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3.2" stroke="#fff" stroke-width="1.8"/><path d="M12 2.6v2.2M12 19.2v2.2M21.4 12h-2.2M4.8 12H2.6M18.6 5.4l-1.6 1.6M7 17l-1.6 1.6M18.6 18.6 17 17M7 7 5.4 5.4" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/></svg>',
    tickplain: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7" stroke="#0B0E12" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    close: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>',
    chat: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="2" stroke="#FFD230" stroke-width="1.8"/><path d="M7 20l3-3" stroke="#FFD230" stroke-width="1.8" stroke-linecap="round"/><path d="M7 8.5h10M7 12h6" stroke="#FFD230" stroke-width="1.6" stroke-linecap="round"/></svg>',
    optabars: '<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><rect x="2" y="9" width="3.4" height="7" rx="1" fill="#4ADE80"/><rect x="7.3" y="4" width="3.4" height="12" rx="1" fill="#4ADE80"/><rect x="12.6" y="6.5" width="3.4" height="9.5" rx="1" fill="#4ADE80"/></svg>',
    pause: '<svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true"><rect x="3.5" y="2.5" width="3" height="11" rx="1" fill="#fff"/><rect x="9.5" y="2.5" width="3" height="11" rx="1" fill="#fff"/></svg>',
    play: '<svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5 13 8l-9 5.5z" fill="#fff"/></svg>',
    refresh: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.3-5.6" stroke="#C4C4C4" stroke-width="1.9" stroke-linecap="round"/><path d="M20 4v4h-4" stroke="#C4C4C4" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    expand: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 9V4h5M20 15v5h-5M20 9V4h-5M4 15v5h5" stroke="#C4C4C4" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    playtri: '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M4 2.5 11 7l-7 4.5z" fill="#fff"/></svg>',
    phone: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="6.5" y="2.5" width="11" height="19" rx="2.5" stroke="currentColor" stroke-width="1.8"/><path d="M10.5 18.5h3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
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
      home: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 10.2 12 3.8l8 6.4V20a1 1 0 0 1-1 1h-4.5v-6.2h-5V21H5a1 1 0 0 1-1-1z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
      shorts: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5.5 3.5h13a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2z" stroke="currentColor" stroke-width="1.8"/><path d="M10 8.3v7.4l5.8-3.7z" fill="currentColor"/></svg>',
      mysport: '<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path class="navfill" d="M4 7.5h16v12a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19.5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M6 5h12M8 2.8h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle class="navcut" cx="12" cy="12.2" r="2.3" fill="none" stroke="currentColor" stroke-width="1.7"/><path class="navcut" d="M8.2 18.3a3.8 3.8 0 0 1 7.6 0" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
      scores: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8.8" stroke="currentColor" stroke-width="1.8"/><path d="m12 7.4 3.6 2.6-1.4 4.2H9.8L8.4 10z" fill="currentColor"/><path d="M12 7.4V3.4M15.6 10l3.8-1.3M14.2 14.2l2.3 3.3M9.8 14.2l-2.3 3.3M8.4 10 4.6 8.7" stroke="currentColor" stroke-width="1.5"/></svg>',
      search: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" stroke-width="2"/><path d="m15.5 15.5 5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
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
    playing: true,
    theme: "dark", hide: null, revealed: {}, sheet: null, likes: {}, myComments: {},
    article: null, reader: null, vid: null, push: null, ntypes: {}, csort: "top", shareAsCard: false, reminders: {}, myQs: {}
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
      '<text x="6" y="8.4" fill="#EDEDED" font-size="4" font-family="ReithSans, Arial" font-weight="700" letter-spacing="0.22">' + esc(m.attacking) + '</text>' +
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
        '<text x="' + p[0] + '" y="' + (p[1] + 1.6) + '" text-anchor="middle" font-size="4.2" font-weight="700" fill="' + ink + '" font-family="ReithSans, Arial">' + n + '</text>' +
        '<text x="' + p[0] + '" y="' + (p[1] + 9) + '" text-anchor="middle" font-size="3.6" fill="rgba(255,255,255,.92)" font-family="ReithSans, Arial">' + esc(nm) + '</text>';
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
    out.push('<text x="1" y="5" fill="#8E8E8E" font-size="4.2" font-family="ReithSans, Arial">52\'</text>');
    out.push('<text x="99" y="5" text-anchor="end" fill="#8E8E8E" font-size="4.2" font-family="ReithSans, Arial">67\'</text>');
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

  /* ==========================================================================
     Generated imagery
     ==========================================================================
     There is no licensed photography in this prototype, so every picture is
     drawn rather than loaded. A seeded generator reads the item it illustrates
     and builds a scene from it: stands, crowd, floodlights, the playing
     surface in perspective, the markings for that sport and a few figures on
     it. The seed comes from the item's own title, so a card keeps the same
     picture every time and no two cards get the same one.

     Swap scene() for real images and nothing else in the app has to change.
     ========================================================================== */

  function hashStr(s) {
    var h = 2166136261, i;
    s = String(s);
    for (i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }

  function mkRand(seedStr) {
    var x = hashStr(seedStr) || 0x9E3779B9;
    return function () {
      x ^= x << 13; x >>>= 0;
      x ^= x >>> 17;
      x ^= x << 5; x >>>= 0;
      return x / 4294967296;
    };
  }

  function n(v) { return Math.round(v * 100) / 100; }

  /* shared, colour-neutral texture. One copy for the whole page rather than
     several hundred circles per card. */
  function ensureSprites() {
    if (document.getElementById("gfxdefs")) { return; }
    var d = document.createElement("div");
    d.id = "gfxdefs";
    d.setAttribute("aria-hidden", "true");
    d.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;pointer-events:none";
    d.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg"><defs>' +
      '<pattern id="pxCrowd" width="1.5" height="1.3" patternUnits="userSpaceOnUse">' +
      '<circle cx="0.4" cy="0.35" r="0.3" fill="#fff" opacity="0.4"/>' +
      '<circle cx="1.05" cy="0.9" r="0.26" fill="#fff" opacity="0.2"/>' +
      '<circle cx="0.2" cy="1.0" r="0.22" fill="#000" opacity="0.4"/>' +
      '<circle cx="1.25" cy="0.2" r="0.18" fill="#000" opacity="0.32"/>' +
      '</pattern>' +
      '<pattern id="pxCrowdFar" width="0.95" height="0.85" patternUnits="userSpaceOnUse">' +
      '<circle cx="0.28" cy="0.26" r="0.2" fill="#fff" opacity="0.3"/>' +
      '<circle cx="0.7" cy="0.62" r="0.17" fill="#000" opacity="0.34"/>' +
      '</pattern>' +
      '<pattern id="pxSeats" width="6" height="2.1" patternUnits="userSpaceOnUse">' +
      '<rect width="6" height="1.1" fill="#fff" opacity="0.05"/>' +
      '<rect y="1.6" width="6" height="0.5" fill="#000" opacity="0.22"/>' +
      '</pattern>' +
      '</defs></svg>';
    document.body.appendChild(d);
  }

  /* ---- kit colours, shirt then trim ---- */
  var KITS = {
    football: [["#DB2B22", "#FFFFFF"], ["#F26D1B", "#101820"]],
    rugby: [["#C8102E", "#FFFFFF"], ["#128D51", "#FFFFFF"]],
    cricket: [["#F2F0E7", "#E2DED0", "#1A3A6B"], ["#F2F0E7", "#DED9C8", "#F1B434"]],
    tennis: [["#F5F4EE", "#4FC3C3"], ["#EFE6D2", "#BB1919"]],
    boxing: [["#DB2B22", "#FFD230"], ["#2B4C9B", "#FFFFFF"]]
  };

  var TURF = {
    football: ["#2E7A3C", "#15401E"],
    rugby: ["#2B7139", "#133C1D"],
    cricket: ["#35803D", "#194720"],
    tennis: ["#4A8B37", "#22501C"],
    boxing: ["#6E86B8", "#26355A"]
  };

  /* ---- figures ----------------------------------------------------------
     Each pose is a set of joints in a 22 x 46 box with the feet on the floor.
     Drawn twice: a fatter dark pass for the silhouette, then a thinner kit
     pass on top, which reads as a player rather than a stick. */

  var POSES = {
    run: {
      head: [11.2, 6.4, 3.9],
      spine: [[11.7, 10.2], [10.3, 24.4]],
      arms: [[[11.2, 13.4], [16.6, 17.2], [19.4, 12.8]], [[11.2, 13.4], [5.6, 16.4], [3.2, 11.0]]],
      legs: [[[10.3, 24.4], [16.0, 32.6], [15.2, 44.6]], [[10.3, 24.4], [5.4, 31.6], [1.0, 37.4]]]
    },
    kick: {
      head: [12.2, 6.0, 3.9],
      spine: [[12.4, 9.8], [9.8, 24.0]],
      arms: [[[11.8, 13.0], [18.0, 12.2], [21.4, 7.6]], [[11.8, 13.0], [4.8, 14.6], [1.4, 10.2]]],
      legs: [[[9.8, 24.0], [15.2, 29.6], [21.8, 26.4]], [[9.8, 24.0], [8.0, 34.2], [8.6, 44.6]]]
    },
    serve: {
      head: [10.4, 8.0, 3.9],
      spine: [[10.9, 11.8], [10.1, 25.0]],
      arms: [[[10.9, 14.0], [13.8, 7.4], [13.2, 1.2]], [[10.9, 14.0], [5.0, 11.8], [2.4, 6.2]]],
      legs: [[[10.1, 25.0], [12.8, 34.2], [12.2, 44.6]], [[10.1, 25.0], [6.2, 33.0], [3.8, 44.6]]],
      racket: [13.2, 1.2]
    },
    ready: {
      head: [11.0, 8.6, 3.9],
      spine: [[11.2, 12.4], [11.0, 25.6]],
      arms: [[[11.2, 14.6], [16.2, 18.6], [19.2, 15.0]], [[11.2, 14.6], [6.0, 18.2], [3.6, 15.0]]],
      legs: [[[11.0, 25.6], [16.8, 33.4], [17.6, 44.6]], [[11.0, 25.6], [5.2, 33.4], [4.2, 44.6]]],
      racket: [19.2, 15.0]
    },
    bat: {
      head: [11.8, 8.0, 3.9],
      spine: [[12.0, 11.8], [10.4, 25.0]],
      arms: [[[11.6, 14.0], [15.8, 17.6], [14.4, 21.2]], [[11.6, 14.0], [13.8, 18.4], [14.4, 21.2]]],
      legs: [[[10.4, 25.0], [15.6, 33.2], [16.2, 44.6]], [[10.4, 25.0], [5.8, 33.0], [4.4, 44.6]]],
      bat: [14.4, 21.2]
    },
    bowl: {
      head: [10.4, 6.4, 3.9],
      spine: [[10.9, 10.2], [10.1, 24.0]],
      arms: [[[10.9, 12.6], [14.8, 6.2], [14.2, 0.6]], [[10.9, 12.6], [4.8, 14.4], [2.0, 19.4]]],
      legs: [[[10.1, 24.0], [16.4, 30.4], [20.2, 39.6]], [[10.1, 24.0], [5.2, 32.4], [2.6, 43.6]]]
    },
    lift: {
      head: [11.0, 7.0, 4.1],
      spine: [[11.0, 11.0], [11.0, 25.0]],
      arms: [[[11.0, 13.4], [16.6, 8.4], [17.8, 1.6]], [[11.0, 13.4], [5.4, 8.4], [4.2, 1.6]]],
      legs: [[[11.0, 25.0], [15.0, 34.0], [15.4, 44.6]], [[11.0, 25.0], [7.0, 34.0], [6.6, 44.6]]]
    },
    guard: {
      head: [11.0, 7.4, 4.1],
      spine: [[11.0, 11.4], [10.8, 24.6]],
      arms: [[[11.0, 14.0], [16.0, 15.4], [13.4, 10.0]], [[11.0, 14.0], [6.2, 16.0], [8.6, 10.2]]],
      legs: [[[10.8, 24.6], [15.8, 33.0], [16.8, 44.6]], [[10.8, 24.6], [5.6, 33.2], [4.4, 44.6]]],
      gloves: [[13.4, 10.0], [8.6, 10.2]]
    },
    dive: {
      head: [14.0, 13.0, 3.9],
      spine: [[13.6, 16.4], [5.0, 24.0]],
      arms: [[[13.2, 18.0], [18.6, 15.0], [22.0, 11.0]], [[13.2, 18.0], [16.4, 21.8], [20.4, 23.0]]],
      legs: [[[5.0, 24.0], [1.0, 30.0], [3.0, 37.0]], [[5.0, 24.0], [0.4, 25.6], [-3.0, 30.0]]]
    }
  };

  function poly(pts, width, col, op) {
    return '<polyline points="' + pts.map(function (q) { return n(q[0]) + "," + n(q[1]); }).join(" ") +
      '" fill="none" stroke="' + col + '" stroke-width="' + n(width) + '" stroke-linecap="round" stroke-linejoin="round"' +
      (op === undefined ? "" : ' opacity="' + op + '"') + '/>';
  }

  /* cx is where the figure stands, footY where the feet land, ht its height */
  function figure(name, cx, footY, ht, kit, o) {
    var P0 = POSES[name] || POSES.run;
    o = o || {};
    var dark = o.dark || "#0A0D12";
    var s = ht / 46;
    var lw = 3.6;
    var limbs = P0.arms.concat(P0.legs);
    var g = "";

    g += limbs.map(function (L) { return poly(L, lw + 1.3, dark); }).join("");
    g += poly(P0.spine, lw + 5.0, dark);
    g += '<circle cx="' + P0.head[0] + '" cy="' + P0.head[1] + '" r="' + n(P0.head[2] + 0.6) + '" fill="' + dark + '"/>';

    if (!o.silhouette) {
      g += limbs.map(function (L) { return poly(L, lw - 0.9, kit[1]); }).join("");
      g += poly(P0.spine, lw + 2.6, kit[0]);
      g += '<circle cx="' + P0.head[0] + '" cy="' + P0.head[1] + '" r="' + P0.head[2] + '" fill="#8A6952"/>';
      if (kit[2]) {
        /* a cap, which is how you tell two sides apart when both play in white */
        g += '<path d="M' + n(P0.head[0] - P0.head[2] - 0.3) + ',' + n(P0.head[1] - 0.4) +
          ' a' + P0.head[2] + ',' + P0.head[2] + ' 0 0 1 ' + n(P0.head[2] * 2 + 0.6) + ',0' +
          ' l1.6,0.9 l-' + n(P0.head[2] * 2 + 2.2) + ',0 Z" fill="' + kit[2] + '"/>';
      }
      if (P0.racket) {
        g += '<line x1="' + P0.racket[0] + '" y1="' + n(P0.racket[1] + 1.2) + '" x2="' + P0.racket[0] + '" y2="' + n(P0.racket[1] - 1.6) +
          '" stroke="' + dark + '" stroke-width="1"/>' +
          '<ellipse cx="' + P0.racket[0] + '" cy="' + n(P0.racket[1] - 4.4) + '" rx="2.7" ry="3.5" fill="#fff" fill-opacity="0.12" stroke="' + dark + '" stroke-width="1.1"/>';
      }
      if (P0.bat) {
        g += '<rect x="' + n(P0.bat[0] - 1.2) + '" y="' + P0.bat[1] + '" width="2.4" height="11" rx="0.6" fill="#D9C08A" stroke="' + dark + '" stroke-width="0.6"/>';
      }
      if (P0.gloves) {
        g += P0.gloves.map(function (q) {
          return '<circle cx="' + q[0] + '" cy="' + q[1] + '" r="2.5" fill="' + kit[0] + '" stroke="' + dark + '" stroke-width="0.6"/>';
        }).join("");
      }
    }

    var sx = o.flip ? -s : s;
    return '<g transform="translate(' + n(cx - 11 * s) + ',' + n(footY - 46 * s) + ') scale(' + n(sx) + ',' + n(s) + ')' +
      (o.flip ? ' translate(-22,0)' : "") + '"' + (o.op !== undefined ? ' opacity="' + o.op + '"' : "") + '>' +
      g + '</g>';
  }

  /* ---- the ground -------------------------------------------------------
     A single perspective frame: t runs 0 to 1 across the pitch, d runs 0 at
     the far side to 1 at the camera. Every marking below is placed in it, so
     the lines converge the way a camera at the halfway line would see them. */

  function Ground(hzY, botY) {
    var TL = -20, TR = 120, BL = -74, BR = 174;
    return {
      xAt: function (t, d) {
        var xt = TL + (TR - TL) * t, xb = BL + (BR - BL) * t;
        return xt + (xb - xt) * d;
      },
      yAt: function (d) { return hzY + (botY - hzY) * d; },
      quad: function (t0, t1, d0, d1, fill, op) {
        var a = this.xAt(t0, d0), b = this.xAt(t1, d0), c = this.xAt(t1, d1), e = this.xAt(t0, d1);
        return '<path d="M' + n(a) + ',' + n(this.yAt(d0)) + ' L' + n(b) + ',' + n(this.yAt(d0)) +
          ' L' + n(c) + ',' + n(this.yAt(d1)) + ' L' + n(e) + ',' + n(this.yAt(d1)) + 'Z" fill="' + fill + '"' +
          (op === undefined ? "" : ' opacity="' + op + '"') + '/>';
      },
      across: function (d, t0, t1, op, wd) {
        return '<line x1="' + n(this.xAt(t0, d)) + '" y1="' + n(this.yAt(d)) + '" x2="' + n(this.xAt(t1, d)) +
          '" y2="' + n(this.yAt(d)) + '" stroke="#fff" stroke-opacity="' + op + '" stroke-width="' + (wd || 0.7) + '"/>';
      },
      along: function (t, d0, d1, op, wd) {
        return '<line x1="' + n(this.xAt(t, d0)) + '" y1="' + n(this.yAt(d0)) + '" x2="' + n(this.xAt(t, d1)) +
          '" y2="' + n(this.yAt(d1)) + '" stroke="#fff" stroke-opacity="' + op + '" stroke-width="' + (wd || 0.7) + '"/>';
      }
    };
  }

  function stands(w, hzY, rnd, uid, accent, deep) {
    var out = "";
    var roof = hzY * 0.13, upper = hzY * 0.49, walk = hzY * 0.57, lower = hzY * 0.9;
    var i;

    function tier(y0, y1, pat, dark) {
      var hh = y1 - y0;
      return '<rect x="-5" y="' + n(y0) + '" width="' + (w + 10) + '" height="' + n(hh) + '" fill="#000" opacity="' + dark + '"/>' +
        '<rect x="-5" y="' + n(y0) + '" width="' + (w + 10) + '" height="' + n(hh) + '" fill="url(#pxSeats)"/>' +
        '<rect x="-5" y="' + n(y0) + '" width="' + (w + 10) + '" height="' + n(hh) + '" fill="url(#' + pat + ')"/>';
    }

    /* roof, with a lit lip along the front edge */
    out += '<rect x="-5" y="-3" width="' + (w + 10) + '" height="' + n(roof + 3) + '" fill="#04060A"/>';
    out += '<rect x="-5" y="' + n(roof - 0.7) + '" width="' + (w + 10) + '" height="0.7" fill="#fff" opacity="0.12"/>';

    out += tier(roof, upper, "pxCrowdFar", 0.52);
    /* the concourse between the tiers reads as a dark band */
    out += '<rect x="-5" y="' + n(upper) + '" width="' + (w + 10) + '" height="' + n(walk - upper) + '" fill="#04060A" opacity="0.88"/>';
    out += tier(walk, lower, "pxCrowd", 0.34);
    /* uneven rows: some blocks fuller and better lit than others */
    for (i = 0; i < 5; i++) {
      var by = walk + (lower - walk) * (i / 5);
      out += '<rect x="-5" y="' + n(by) + '" width="' + (w + 10) + '" height="' + n((lower - walk) / 5) +
        '" fill="' + (i % 2 ? "#000" : "#fff") + '" opacity="' + n(0.03 + rnd() * 0.05) + '"/>';
    }

    /* stand blocks: vertical gangways break up the crowd */
    for (i = 1; i < 6; i++) {
      out += '<rect x="' + n(i * (w / 6) - 0.5 + (rnd() - 0.5)) + '" y="' + n(roof) + '" width="1" height="' + n(lower - roof) +
        '" fill="#04060A" opacity="0.55"/>';
    }

    /* the floodlights wash the near side of the stand */
    out += '<rect x="-5" y="' + n(roof) + '" width="' + (w + 10) + '" height="' + n(lower - roof) + '" fill="' + accent + '" opacity="0.07"/>';

    /* shirts and faces catching the light, denser at the front */
    for (i = 0; i < 46; i++) {
      var sy = walk + Math.pow(rnd(), 0.7) * (lower - walk);
      out += '<circle cx="' + n(rnd() * (w + 6) - 3) + '" cy="' + n(sy) + '" r="' + n(0.3 + rnd() * 0.45) +
        '" fill="' + (i % 4 === 0 ? accent : i % 4 === 1 ? "#FFD230" : "#fff") + '" opacity="' + n(0.3 + rnd() * 0.45) + '"/>';
    }

    /* a few flags held up */
    for (i = 0; i < 4; i++) {
      var fx = 6 + rnd() * (w - 16), fy = walk + rnd() * (lower - walk) * 0.75;
      var fw = 4 + rnd() * 3.5, fh = 2 + rnd() * 1.4;
      out += '<rect x="' + n(fx) + '" y="' + n(fy - fh) + '" width="' + n(fw) + '" height="' + n(fh) + '" fill="' +
        (i % 2 ? accent : "#fff") + '" opacity="' + n(0.4 + rnd() * 0.3) + '" transform="rotate(' + n(-6 + rnd() * 12) +
        ' ' + n(fx) + ' ' + n(fy) + ')"/>';
    }

    /* the hoarding along the front, and the strip of empty seats behind it */
    var hb = Math.max(1.4, (hzY - lower) * 0.62);
    out += '<rect x="-5" y="' + n(lower) + '" width="' + (w + 10) + '" height="' + n(hzY - lower) + '" fill="' + deep + '"/>';
    out += '<rect x="-5" y="' + n(lower) + '" width="' + (w + 10) + '" height="' + n(hzY - lower) + '" fill="#000" opacity="0.3"/>';
    for (i = 0; i < 7; i++) {
      out += '<rect x="' + n(i * (w / 6.4) - 3) + '" y="' + n(lower + 0.6) + '" width="' + n(w / 8) + '" height="' + n(hb) +
        '" fill="' + (i % 2 ? accent : "#E9ECF2") + '" opacity="0.26" rx="0.3"/>';
    }
    out += '<rect x="-5" y="' + n(hzY - 0.5) + '" width="' + (w + 10) + '" height="0.5" fill="#fff" opacity="0.14"/>';

    /* floodlights */
    out += '<g>' +
      '<circle cx="' + n(w * 0.79) + '" cy="' + n(roof * 0.5) + '" r="1.6" fill="#FFF7E0" opacity="0.9"/>' +
      '<circle cx="' + n(w * 0.79) + '" cy="' + n(roof * 0.5) + '" r="10" fill="#FFF3D0" opacity="0.09"/>' +
      '<circle cx="' + n(w * 0.2) + '" cy="' + n(roof * 0.38) + '" r="1.2" fill="#FFF7E0" opacity="0.7"/>' +
      '<circle cx="' + n(w * 0.2) + '" cy="' + n(roof * 0.38) + '" r="7" fill="#FFF3D0" opacity="0.07"/>' +
      '</g>';
    return out;
  }

  function markings(kind, G, rnd, accent) {
    var out = "";
    if (kind === "football") {
      out += G.across(0.06, 0.02, 0.98, 0.5, 0.7);
      out += G.across(0.2, 0.2, 0.8, 0.42, 0.7);
      out += G.along(0.2, 0.06, 0.2, 0.42, 0.7) + G.along(0.8, 0.06, 0.2, 0.42, 0.7);
      out += G.across(0.34, 0.34, 0.66, 0.34, 0.6);
      out += G.along(0.34, 0.06, 0.34, 0.34, 0.6) + G.along(0.66, 0.06, 0.34, 0.34, 0.6);
      out += G.across(0.94, 0.0, 1.0, 0.4, 1.1);
      /* centre circle, flattened by the angle */
      out += '<ellipse cx="' + n(G.xAt(0.5, 0.78)) + '" cy="' + n(G.yAt(0.78)) + '" rx="' + n((G.xAt(0.78, 0.78) - G.xAt(0.22, 0.78)) / 2) +
        '" ry="' + n((G.yAt(1) - G.yAt(0.62)) * 0.5) + '" fill="none" stroke="#fff" stroke-opacity="0.34" stroke-width="0.8"/>';
      /* goal */
      var gy = G.yAt(0.06), gl = G.xAt(0.4, 0.06), gr = G.xAt(0.6, 0.06);
      out += '<path d="M' + n(gl) + ',' + n(gy) + ' L' + n(gl) + ',' + n(gy - 5.4) + ' L' + n(gr) + ',' + n(gy - 5.4) +
        ' L' + n(gr) + ',' + n(gy) + '" fill="#fff" fill-opacity="0.05" stroke="#fff" stroke-opacity="0.7" stroke-width="0.9"/>';
    } else if (kind === "rugby") {
      out += G.across(0.1, 0.02, 0.98, 0.52, 0.9);
      out += G.across(0.3, 0.02, 0.98, 0.34, 0.7);
      out += G.across(0.62, 0.02, 0.98, 0.3, 0.7);
      out += G.along(0.06, 0.1, 1, 0.3, 0.7) + G.along(0.94, 0.1, 1, 0.3, 0.7);
      var py = G.yAt(0.1), pl = G.xAt(0.44, 0.1), pr = G.xAt(0.56, 0.1);
      out += '<path d="M' + n(pl) + ',' + n(py) + ' L' + n(pl) + ',' + n(py - 13) +
        ' M' + n(pr) + ',' + n(py) + ' L' + n(pr) + ',' + n(py - 13) +
        ' M' + n(pl - 0.6) + ',' + n(py - 7.2) + ' L' + n(pr + 0.6) + ',' + n(py - 7.2) +
        '" stroke="#fff" stroke-opacity="0.72" stroke-width="1.1" fill="none"/>';
    } else if (kind === "cricket") {
      /* the square, lighter than the outfield */
      out += G.quad(0.39, 0.61, 0.12, 1, "#C6B489", 0.82);
      out += G.quad(0.44, 0.56, 0.12, 1, "#D9CCA6", 0.5);
      out += G.across(0.24, 0.42, 0.58, 0.55, 0.7);
      out += G.across(0.86, 0.4, 0.6, 0.55, 0.9);
      /* stumps at the far end */
      var sy = G.yAt(0.24), sx = G.xAt(0.5, 0.24);
      out += '<path d="M' + n(sx - 0.9) + ',' + n(sy) + ' l0,-3.4 M' + n(sx) + ',' + n(sy) + ' l0,-3.6 M' + n(sx + 0.9) + ',' + n(sy) +
        ' l0,-3.4" stroke="#fff" stroke-opacity="0.85" stroke-width="0.55"/>';
      /* the rope */
      out += '<path d="M' + n(G.xAt(-0.05, 0.1)) + ',' + n(G.yAt(0.1)) + ' Q' + n(G.xAt(0.5, 0.04)) + ',' + n(G.yAt(0.03)) +
        ' ' + n(G.xAt(1.05, 0.1)) + ',' + n(G.yAt(0.1)) + '" fill="none" stroke="#fff" stroke-opacity="0.45" stroke-width="0.8"/>';
    } else if (kind === "tennis") {
      out += G.across(0.06, 0.08, 0.92, 0.6, 0.8);
      out += G.across(0.24, 0.22, 0.78, 0.5, 0.7);
      out += G.across(0.94, 0.08, 0.92, 0.6, 1.0);
      out += G.across(0.78, 0.22, 0.78, 0.5, 0.8);
      out += G.along(0.08, 0.06, 0.94, 0.45, 0.7) + G.along(0.92, 0.06, 0.94, 0.45, 0.7);
      out += G.along(0.22, 0.06, 0.94, 0.4, 0.7) + G.along(0.78, 0.06, 0.94, 0.4, 0.7);
      out += G.along(0.5, 0.24, 0.78, 0.4, 0.7);
      /* the net */
      var ny = G.yAt(0.5), nl = G.xAt(0.03, 0.5), nr = G.xAt(0.97, 0.5), nh = (G.yAt(1) - G.yAt(0)) * 0.13 + 2.5;
      out += '<path d="M' + n(nl) + ',' + n(ny) + ' L' + n(nl) + ',' + n(ny - nh) + ' L' + n(nr) + ',' + n(ny - nh) +
        ' L' + n(nr) + ',' + n(ny) + 'Z" fill="#0B0E12" fill-opacity="0.34"/>';
      out += '<path d="M' + n(nl) + ',' + n(ny - nh) + ' L' + n(nr) + ',' + n(ny - nh) + '" stroke="#fff" stroke-opacity="0.8" stroke-width="1"/>';
      for (var t = 0; t <= 16; t++) {
        var xx = nl + (nr - nl) * (t / 16);
        out += '<line x1="' + n(xx) + '" y1="' + n(ny - nh) + '" x2="' + n(xx) + '" y2="' + n(ny) + '" stroke="#fff" stroke-opacity="0.16" stroke-width="0.3"/>';
      }
    } else if (kind === "boxing") {
      out += G.quad(0.1, 0.9, 0.08, 1, "#fff", 0.05);
      out += G.along(0.1, 0.08, 1, 0.3, 0.8) + G.along(0.9, 0.08, 1, 0.3, 0.8);
      out += G.across(0.08, 0.1, 0.9, 0.3, 0.8);
      var cy = G.yAt(0.08);
      out += '<circle cx="' + n(G.xAt(0.5, 0.6)) + '" cy="' + n(G.yAt(0.6)) + '" r="9" fill="none" stroke="' + accent + '" stroke-opacity="0.3" stroke-width="1"/>';
      for (var r = 0; r < 3; r++) {
        out += '<line x1="-8" y1="' + n(cy - 2 - r * 5.4) + '" x2="112" y2="' + n(cy - 3.4 - r * 5.4) +
          '" stroke="#fff" stroke-opacity="' + (0.42 - r * 0.07) + '" stroke-width="0.9"/>';
      }
      out += '<rect x="' + n(G.xAt(0.1, 0.08) - 1) + '" y="' + n(cy - 19) + '" width="2" height="19" fill="#0B0E12" opacity="0.7"/>' +
        '<rect x="' + n(G.xAt(0.9, 0.08) - 1) + '" y="' + n(cy - 19) + '" width="2" height="19" fill="#0B0E12" opacity="0.7"/>';
    }
    return out;
  }

  function cast(kind, G, rnd, kits, span, dz) {
    var out = "", i;
    dz = dz || 1;
    /* sx is a fraction of the visible frame rather than a point on the pitch,
       so nobody ends up standing outside the crop */
    function place(pose, sx, d, scale, flip, ki) {
      d = d * dz;
      var ht = span * (0.16 + 0.46 * d) * (scale || 1);
      var x = sx * 100, y = G.yAt(d);
      out += '<ellipse cx="' + n(x) + '" cy="' + n(y) + '" rx="' + n(ht * 0.24) +
        '" ry="' + n(ht * 0.06) + '" fill="#000" opacity="0.32"/>';
      out += figure(pose, x, y, ht, kits[ki || 0], { flip: flip });
    }
    function ball(sx, d, lift, fill) {
      d = d * dz;
      out += '<circle cx="' + n(sx * 100) + '" cy="' + n(G.yAt(d) - span * lift) + '" r="' + n(span * 0.018) +
        '" fill="' + fill + '" stroke="#0B0E12" stroke-width="0.3"/>';
    }
    if (kind === "football") {
      place("kick", 0.3, 0.76, 1, false, 0);
      place("run", 0.56, 0.58, 0.9, true, 1);
      place("run", 0.8, 0.44, 0.8, false, 1);
      ball(0.44, 0.72, 0.1, "#fff");
    } else if (kind === "rugby") {
      place("run", 0.28, 0.76, 1, false, 0);
      place("run", 0.5, 0.64, 0.92, true, 1);
      place("run", 0.76, 0.48, 0.78, false, 0);
    } else if (kind === "cricket") {
      place("bat", 0.34, 0.8, 1, false, 0);
      place("bowl", 0.6, 0.32, 0.86, false, 1);
      for (i = 0; i < 3; i++) {
        place("ready", 0.14 + i * 0.33, 0.18 + i * 0.05, 0.52, i % 2 === 0, 1);
      }
      ball(0.52, 0.5, 0.12, "#C0392B");
    } else if (kind === "tennis") {
      place("serve", 0.28, 0.78, 1, false, 0);
      place("ready", 0.64, 0.26, 0.86, true, 1);
      ball(0.38, 0.6, 0.3, "#D8E84A");
    } else if (kind === "boxing") {
      place("guard", 0.36, 0.7, 1, false, 0);
      place("guard", 0.58, 0.66, 0.98, true, 1);
    }
    return out;
  }

  /* ---- the one entry point ---- */

  function scene(p, ratio, key) {
    ensureSprites();
    p = p || {};
    var motif = p.motif || "crowd";
    var sport = String(p.sport || key || "").toLowerCase();
    var seed = String(key || "") + "~" + motif + "~" + (p.g ? p.g.join("") : "");
    var rnd = mkRand(seed);

    var w = 100;
    var h = ratio === "wide" ? 56 : ratio === "square" ? 100
      : ratio === "cine" ? 66 : ratio === "tall" ? 133 : 56;

    var kind = resolveKind(motif, sport);

    var uid = "gx" + hashStr(seed + ratio).toString(36);
    var g0 = (p.g && p.g[0]) || "#22314A";
    var g1 = (p.g && p.g[1]) || "#0C121C";
    var kits = KITS[kind] || KITS.football;
    var turf = TURF[kind] || TURF.football;
    var accent = kits[0][0];

    /* a crowd card keeps the camera high in the stands, everything else
       puts the horizon a bit under halfway and gives the pitch the frame */
    var hzY = motif === "crowd" ? h * 0.56
      : ratio === "tall" ? h * (kind === "boxing" ? 0.36 : 0.32)
      : h * (kind === "boxing" ? 0.42 : 0.4);
    var botY = h + 2;

    var out = '<defs>' +
      '<linearGradient id="' + uid + 'sky" x1="0" y1="0" x2="0.3" y2="1">' +
      '<stop offset="0" stop-color="' + g0 + '"/><stop offset="1" stop-color="' + g1 + '"/></linearGradient>' +
      '<linearGradient id="' + uid + 'turf" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="' + turf[1] + '"/><stop offset="0.45" stop-color="' + turf[0] + '"/>' +
      '<stop offset="1" stop-color="' + turf[1] + '"/></linearGradient>' +
      '<radialGradient id="' + uid + 'glow" cx="0.74" cy="0.12" r="0.8">' +
      '<stop offset="0" stop-color="#fff" stop-opacity="0.3"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="' + uid + 'scrim" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="0.55" stop-color="#000" stop-opacity="0.16"/>' +
      '<stop offset="1" stop-color="#000" stop-opacity="0.72"/></linearGradient>' +
      '</defs>';

    out += '<rect x="-2" y="-2" width="' + (w + 4) + '" height="' + (h + 4) + '" fill="url(#' + uid + 'sky)"/>';
    out += '<g>' + stands(w, hzY, rnd, uid, accent, g1) + '</g>';

    var G = Ground(hzY, botY);
    out += '<path d="M' + n(G.xAt(0, 0)) + ',' + n(hzY) + ' L' + n(G.xAt(1, 0)) + ',' + n(hzY) +
      ' L' + n(G.xAt(1, 1)) + ',' + n(botY) + ' L' + n(G.xAt(0, 1)) + ',' + n(botY) + 'Z" fill="url(#' + uid + 'turf)"/>';

    if (kind !== "boxing") {
      for (var s = 0; s < 8; s += 2) {
        out += G.quad(s / 8, (s + 1) / 8, 0, 1, "#fff", 0.045);
      }
    }

    out += markings(kind, G, rnd, accent);
    out += cast(kind, G, rnd, kits, (botY - hzY), ratio === "tall" ? 0.66 : 1);

    out += '<rect x="-2" y="-2" width="' + (w + 4) + '" height="' + (h + 4) + '" fill="url(#' + uid + 'glow)"/>';
    out += '<rect x="-2" y="-2" width="' + (w + 4) + '" height="' + (h + 4) + '" fill="url(#' + uid + 'scrim)"/>';

    return '<svg class="photo" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
      out + '</svg>';
  }

  function resolveKind(motif, sport) {
    sport = String(sport || "").toLowerCase();
    return motif === "court" ? "tennis"
      : motif === "oval" ? "cricket"
      : motif === "ring" ? "boxing"
      : /rugby|six nations|ireland|wales/.test(sport) ? "rugby"
      : /cricket|ashes|test match|lord/.test(sport) ? "cricket"
      : /tennis|wimbledon|raducanu/.test(sport) ? "tennis"
      : /box|fight/.test(sport) ? "boxing"
      : motif === "pitch" ? "football"
      : "football";
  }

  /* ==========================================================================
     Photography
     ==========================================================================
     Pictures are tagged with the phase of a fixture they belong to, not just
     the sport, and the picker asks for the phase the page is currently in.
     So build-up shows team news and previews, live shows the ball in play,
     and full time shows the celebration. The same card in a different
     lifecycle state gets a different photograph, which is the point.

     Three crops per picture live in img/: wide (16:9), tall (9:13) and sq.
     A picture whose shape disagrees badly with the frame is laid across a
     blurred bed of itself rather than cropped into a thin slice.
     ========================================================================== */

  var PHASE = { buildup: "pre", live: "live", companion: "live", fulltime: "post" };

  var PHOTOS = {
    football: [
      { s: "fb-xi", p: "pre", a: "A pundit's England XI for tonight" },
      { s: "fb-debate", p: "pre", a: "Two England selection calls, side by side" },
      { s: "fb-palmer", p: "pre", a: "A pundit makes the case for Cole Palmer" },
      { s: "fb-kane", p: "live", a: "England shoot from the edge of the area" },
      { s: "fb-celebrate", p: "live", a: "England celebrate the opening goal" },
      { s: "fb-highlights", p: "live", a: "England on the attack" },
      { s: "fb-celebrate", p: "post", a: "England players celebrate a goal" },
      { s: "fb-highlights", p: "post", a: "Highlights of the England match" },
      { s: "fb-bellingham", p: "post", a: "England's best player of the night" }
    ],
    tennis: [
      { s: "tn-smile", p: "pre", a: "Raducanu at the All England Club before her match" },
      { s: "tn-plan", p: "pre", a: "Raducanu on her Wimbledon plans" },
      { s: "tn-stretch", p: "live", a: "Raducanu stretches for a backhand on grass" },
      { s: "tn-tracking", p: "live", a: "Raducanu tracks the ball on the baseline" },
      { s: "tn-dejected", p: "live", a: "Raducanu after dropping serve" },
      { s: "tn-smile", p: "post", a: "Raducanu smiles after the match" },
      { s: "tn-best", p: "post", a: "Raducanu roars after taking the match" }
    ],
    rugby: [
      { s: "rg-squad", p: "pre", a: "The Ireland side for this afternoon" },
      { s: "rg-listen", p: "pre", a: "An Ireland forward before kick-off" },
      { s: "rg-flyhalves", p: "pre", a: "The two fly-halves, side by side" },
      { s: "rg-wales", p: "pre", a: "A Wales forward leaves the field" },
      { s: "rg-maul", p: "live", a: "Wales and Ireland forwards contest a maul" },
      { s: "rg-run", p: "live", a: "A back runs at the defence" },
      { s: "rg-listen", p: "live", a: "An Ireland forward waits for the TMO" },
      { s: "rg-maul", p: "post", a: "The maul that decided the afternoon" },
      { s: "rg-roar", p: "post", a: "An Ireland player roars at the final whistle" }
    ],
    cricket: [
      { s: "ck-squad", p: "pre", a: "The England Test squad" },
      { s: "ck-xi", p: "pre", a: "Readers pick a combined Ashes XI" },
      { s: "ck-ashsquad", p: "pre", a: "The England squad for the Ashes" },
      { s: "ck-mic", p: "any", a: "A BBC Sport microphone at the Ashes" },
      { s: "ck-starc", p: "live", a: "Starc celebrates as an England batter walks off" },
      { s: "ck-wicket", p: "live", a: "England celebrate a wicket" },
      { s: "ck-stokes", p: "live", a: "Stokes rallies the crowd from the outfield" },
      { s: "ck-ball", p: "live", a: "An England bowler works on the ball" },
      { s: "ck-root", p: "post", a: "Root celebrates a Test century" },
      { s: "ck-lords", p: "post", a: "England celebrate a wicket at Lord's" },
      { s: "ck-huddle", p: "post", a: "England celebrate together in the field" }
    ]
  };

  /* every slug and the crops that exist for it, so a card never asks for a
     file that was never cut */
  var SLOTS = {
    "ar-court": "wide tall sq full",
    "ar-debut": "tall sq full",
    "ar-ident": "wide sq full",
    "ar-lords": "wide sq full",
    "ar-mag93": "tall sq full",
    "ar-mag99": "tall sq full",
    "ar-notice": "wide sq full",
    "ar-table": "sq full",
    "ck-ashsquad": "tall sq",
    "ck-ball": "wide tall sq",
    "ck-bat": "wide tall sq",
    "ck-carse": "tall sq",
    "ck-hope": "tall sq",
    "ck-huddle": "wide tall sq",
    "ck-lords": "wide tall sq",
    "ck-mic": "wide tall sq",
    "ck-root": "wide tall sq",
    "ck-squad": "wide tall sq",
    "ck-starc": "wide tall sq",
    "ck-stokes": "wide tall sq",
    "ck-tms": "tall sq",
    "ck-wicket": "wide tall sq",
    "ck-xi": "wide tall sq",
    "fb-bellingham": "wide tall sq",
    "fb-celebrate": "wide tall sq",
    "fb-debate": "wide tall sq",
    "fb-highlights": "wide sq",
    "fb-kane": "wide tall sq",
    "fb-palmer": "wide tall sq",
    "fb-tuchel": "tall sq",
    "fb-xi": "wide tall sq",
    "rg-flyhalves": "wide sq",
    "rg-listen": "wide tall sq",
    "rg-maul": "wide tall sq",
    "rg-roar": "wide tall sq",
    "rg-run": "wide tall sq",
    "rg-squad": "wide tall sq",
    "rg-wales": "wide tall sq",
    "tn-best": "wide tall sq",
    "tn-books": "tall sq",
    "tn-challenge": "tall sq",
    "tn-dejected": "wide tall sq",
    "tn-plan": "wide tall sq",
    "tn-secret": "tall sq",
    "tn-smile": "wide tall sq",
    "tn-stretch": "wide tall sq",
    "tn-tracking": "wide sq"
  };

  function slotFor(slug, ratio) {
    var want = ratio === "tall" ? "tall" : ratio === "square" ? "sq" : "wide";
    var have = SLOTS[slug] || "";
    if (have.indexOf(want) >= 0) { return want; }
    return have.indexOf("wide") >= 0 ? "wide" : have.indexOf("tall") >= 0 ? "tall" : "sq";
  }

  /* pictures already on the screen being drawn; reset at the start of each
     full render so a picture appears once per screen, not once per card */
  var USED = {};
  function resetUsed() { USED = {}; }

  function imgTag(slug, alt, ratio) {
    USED[slug] = (USED[slug] || 0) + 1;
    return '<img class="photo" src="img/' + slug + '-' + slotFor(slug, ratio) + '.jpg" ' +
      'loading="lazy" decoding="async" alt="' + esc(alt || "") + '">';
  }

  function pickPhoto(kind, key) {
    var pool = PHOTOS[kind];
    if (!pool || !pool.length) { return null; }
    var want = PHASE[lc()] || "live";
    if (want === "post" && hideOn()) { want = "pre"; }
    var fit = pool.filter(function (x) { return x.p === want || x.p === "any"; });
    if (!fit.length) {
      /* a preview frame stands in for live far better than a celebration does */
      fit = pool.filter(function (x) { return x.p !== "post"; });
    }
    if (!fit.length) { fit = pool; }
    /* prefer anything not yet on this screen, then anything in the sport */
    var fresh = fit.filter(function (x) { return !USED[x.s]; });
    if (!fresh.length) { fresh = pool.filter(function (x) { return !USED[x.s] && (x.p !== "post" || want === "post"); }); }
    if (fresh.length) { fit = fresh; }
    return fit[hashStr(String(key) + "|" + kind + "|" + lc()) % fit.length];
  }

  function photoSVG(p, ratio, key) {
    p = p || {};
    if (p.img) { return imgTag(p.img, p.cap || p.t || "", ratio); }
    var kind = resolveKind(p.motif || "crowd", p.sport || key);
    var hit = pickPhoto(kind, key);
    if (hit) { return imgTag(hit.s, hit.a, ratio); }
    return scene(p, ratio, key);
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
      '<span class="thumb">' + photoSVG(it, "tall", it.sport + " " + it.t) + '<span class="play">' + I.playtri + '</span>' +
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
        '<span class="fphoto">' + photoSVG(it, "tall", it.sport + " " + it.t) +
        '<span class="fscrim"></span>' +
        '<span class="play">' + I.playtri + '</span>' +
        '<span class="dur">' + esc(it.dur) + '</span>' +
        '<span class="fmeta"><span class="fkick">' + esc(it.sport) + '</span>' +
        (it.baked ? "" : '<span class="ftitle">' + esc(it.t) + '</span>') + '</span></span></button>';
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
      return '<section class="section' + (sec.flush ? " flush" : "") + '">' + (sec.ruleY ? '<div class="rule-y"></div>' : "") + head +
        sec.panels.map(function (p) { return P[p.t] ? P[p.t](p) : ""; }).join("") + '</section>';
    }).join("");
  }

  function appHead(sectionLabel) {
    return '<div class="apphead"><div class="headrow">' +
      '<span class="bbcblocks" aria-label="BBC"><i>B</i><i>B</i><i>C</i></span>' +
      '<button class="iconbtn nbell" type="button" data-sheet="notifs" aria-label="Notifications">' + I.bell + '<i class="ndot"></i></button>' +
      '<button class="iconbtn" type="button" data-sheet="share" aria-label="Share">' + I.share + '</button>' +
      '<button class="iconbtn menubtn" type="button" id="burger" aria-label="Your account and menu" aria-expanded="false">' +
      '<span class="meav" aria-hidden="true">A</span>' + I.burger + '</button>' +
      '</div><div class="sportrow"><span class="sportmark">SPORT</span><span class="sportsection">' + esc(sectionLabel) + '</span></div></div>';
  }

  function matchHead() {
    var e = ev(), st = evState(), h = st.head, hid = masked(e);
    /* once the TV has been switched to Court 2, the second-screen page
       follows it rather than still talking about Centre Court */
    if (e.id === "tennis" && lc() === "companion" && S.tv && S.tv.c2) {
      var lv = e.states.live;
      h = { kind: "stack", status: { kind: "paired", text: "FOLLOWING YOUR TELLY", beat: true }, rows: lv.head.rows,
        strap: "Second set · Vondroušová serving · your TV is on Court 2 now", serve: 1 };
      st = { chip: st.chip, watching: lv.watching, paired: "Paired with your TV · Court 2", head: h,
        state: "Court 2 on your TV. Centre Court is a tap away" };
    }
    var out = "";
    if (st.paired) {
      out += '<div class="paired">' + I.qr + '<span><span class="p1">' + esc(st.paired) + '</span><br>' +
        '<span class="p2">' + esc(e.title) + ' · ' + esc(e.venue) + '</span></span></div>';
    }
    out += '<div class="matchhead"><div class="compline">' +
      '<button class="iconbtn compback" type="button" data-gohome aria-label="Back to Home">' + I.back + '</button>' +
      '<span class="compname">' + esc(e.comp) + '</span>' +
      '<button class="iconbtn compback" type="button" data-toast="Added to My Sport." aria-label="Follow">' + I.star + '</button></div>';

    if (st.paired && S.vid && S.vid.mode === "full" && S.vid.id === e.id) {
      out += '<p class="tvtag">' + I.tv + (e.id === "tennis" ? "On your TV: Centre Court" : "On your TV, held back to match") + '</p>';
    }
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
        (hid ? '<span class="bigscore hid">v</span><button class="revealpill" type="button" data-reveal="' + e.id + '">' + I.eye + 'Show score</button>'
          : '<span class="' + (h.centre.small ? "kotime" : "bigscore") + '">' + esc(h.centre.big) + '</span>' +
          '<span class="clockline" id="headclock">' + esc(h.centre.sub) + '</span>') + '</span>' +
        '<span class="side"><span class="crest b">' + esc(h.away.code) + '</span><span class="tname">' + esc(h.away.name) + '</span>' +
        (h.away.sub ? '<span class="tsub">' + esc(h.away.sub) + '</span>' : "") + '</span></div>';
    } else {
      out += '<div class="stackwrap"><span class="statusrow ' + h.status.kind + '">' +
        '<i class="pip' + (h.status.beat ? " beat" : "") + '"></i>' + esc(h.status.text) + '</span>' +
        h.rows.map(function (r, i) {
          return '<div class="srow' + (r[3] ? " now" : "") + '">' +
            '<span class="sname">' + esc(r[0]) + (h.serve === i ? '<i class="servedot"></i>' : "") + '</span>' +
            '<span class="sscore' + (hid ? " hid" : "") + '">' + esc(hid ? "\u2022 \u2022" : r[1]) + '</span>' +
            '<span class="sdet"' + (i === 1 ? ' id="stackdet"' : "") + '>' + esc(hid ? "" : r[2]) + '</span></div>';
        }).join("") +
        (hid ? '<button class="revealpill" type="button" data-reveal="' + e.id + '">' + I.eye + 'Show score</button>' : '<p class="strap">' + esc(h.strap) + '</p>') + '</div>';
    }
    if (st.state && !hid) { out += '<p class="stateline">' + esc(st.state) + '</p>'; }

    if (e.audio) {
      var canWatch = hasVideo(e) && (lc() !== "buildup") && !(S.vid && S.vid.id === e.id && S.vid.mode === "full");
      out += '<div class="listenrow">' +
        (canWatch ? '<button class="listenbtn watchbtn" type="button" data-watch="' + S.eventIx + '">' + I.playtri + (lc() === "fulltime" ? "Highlights" : "Watch") + '</button>' : "") +
        '<button class="listenbtn' + (canWatch ? " ontv" : "") + '" type="button" ' +
        (!hasVideo(e) && (lc() === "live" || lc() === "companion") ? 'data-watch="' + S.eventIx + '"' : 'data-listenlive="' + S.eventIx + '"') + '>' +
        I.speaker + (canWatch ? "Listen" : "Listen live") + '</button>' +
        ((lc() === "live" || lc() === "companion") && S.surface !== "together"
          ? '<button class="listenbtn ontv" type="button" data-tvlaunch="' + S.eventIx + '">' + I.playtri + 'On TV</button>' : "") +
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

  /* ---- the immersive live takeover -------------------------------------
     Whatever is most worth watching right now fills the top of Home: the
     picture runs full bleed, and the only thing on top of it is the state of
     the thing itself plus one way in. */

  function rankedCards() {
    var order = { live: 0, soon: 1, done: 2 };
    return EVENTS.map(function (e, i) { return { e: e, i: i, c: maskCard(e, evState(e).card) }; })
      .sort(function (a, b) {
        if (order[a.c.status] !== order[b.c.status]) { return order[a.c.status] - order[b.c.status]; }
        return b.c.sig - a.c.sig;
      });
  }

  function takeoverHero() {
    var x = rankedCards()[0], e = x.e, st = evState(e);
    var TK = e.takeover || {}, T = maskT(e, TK[lc()] || { stats: [] });
    var status = x.c.status === "live" ? "LIVE" : x.c.status === "soon" ? "STARTING SOON" : evState(e).card.when.split(" \u00b7")[0].toUpperCase();
    var L = lc(), playable = L === "live" || L === "companion" || (L === "fulltime" && hasVideo(e));

    var bars = (T.stats || []).map(function (r) {
      var a = Number(r[1]), b = Number(r[2]), tot = (a + b) || 1;
      return '<div class="tostat">' +
        '<span class="tonum">' + esc(String(r[1])) + '</span>' +
        '<span class="tobar a"><i style="width:' + (a / tot * 100).toFixed(1) + '%;background:' + TK.ca + '"></i></span>' +
        '<span class="tolab">' + esc(r[0]) + '</span>' +
        '<span class="tobar b"><i style="width:' + (b / tot * 100).toFixed(1) + '%;background:' + TK.cb + '"></i></span>' +
        '<span class="tonum r">' + esc(String(r[2])) + '</span></div>';
    }).join("");

    return '<section class="livetake">' +
      '<div class="tostill"><div class="tokb">' +
      photoSVG(T.img ? { img: T.img, cap: TK.a + " v " + TK.b } : e.photo, "tall", e.sport + " " + e.title + " " + lc()) +
      '</div><span class="toveil"></span><span class="tosweep"></span></div>' +

      '<div class="totop">' +
      '<span class="tochip' + (x.c.status === "live" ? " on" : "") + '"><i></i>' + status + '</span>' +
      (st.watching ? '<span class="towatch">' + esc(st.watching) + ' watching</span>' : "") +
      '<span class="tospacer"></span>' +
      (playable ? '<button class="toic" type="button" data-listenlive="' + x.i + '" aria-label="Listen live">' + I.speaker + '</button>' +
        '<button class="toic" type="button" data-watch="' + x.i + '" data-fs="1"' + (L === "companion" && e.id === "tennis" ? ' data-court="Court 2 · Raducanu v Vondroušová"' : "") + ' aria-label="Watch full screen">' + I.expand + '</button>' : "") +
      '</div>' +

      '<div class="tocard">' +
      '<p class="tokick">' + (I.sport[e.sport] || "") + esc(e.sport) + ' · ' + esc(e.comp) + '</p>' +
      '<div class="tonames">' +
      '<span class="tos"><i style="background:' + TK.ca + '"></i>' + esc(TK.a || "") + '</span>' +
      '<span class="toline">' + esc(T.line || "") + '</span>' +
      '<span class="tos r">' + esc(TK.b || "") + '<i style="background:' + TK.cb + '"></i></span></div>' +
      (T.sub ? '<p class="tosub">' + esc(T.sub) + '</p>' : "") +
      '<div class="tostats">' + bars + '</div>' +
      (T.hidden ? '<button class="toreveal" type="button" data-reveal="' + e.id + '">' + I.eye + 'Show the score</button>' : "") +
      (playable
        ? '<button class="tocta" type="button" data-watch="' + x.i + '"' + (L === "companion" && e.id === "tennis" ? ' data-court="Court 2 · Raducanu v Vondroušová"' : "") + '>' +
          '<span>' + (hasVideo(e) ? I.playtri : I.speaker) + esc(L === "fulltime" ? "Watch the highlights" : hasVideo(e) ? (L === "companion" && e.id === "tennis" ? "Watch Court 2 here" : "Watch live") : "Listen live on TMS") + '</span>' + I.chevron + '</button>'
        : '<button class="tocta" type="button" data-open="' + x.i + '">' +
          '<span>' + esc(T.cta || "Open the experience") + '</span>' + I.chevron + '</button>') +
      (RECAPS[e.id] && (lc() === "live" || lc() === "companion")
        ? '<button class="tocatch" type="button" data-open="' + x.i + '">' + I.play +
          '<span>Just arrived? The story so far in 60 seconds</span></button>' : "") +
      '</div></section>';
  }

  /* ---- participation, led by the picture rather than by the text ---- */

  function visualPoll(poll, photo, kicker) {
    var chosen = S.votes[poll.id], done = chosen !== undefined;
    var q = String(poll.q).replace(/^Have your say:\s*/i, "");
    return '<div class="vpoll" data-vpoll="' + poll.id + '">' +
      '<span class="vpkick">' + esc(kicker || "Have your say") + '</span>' +
      '<p class="vpq">' + esc(q) + '</p>' +
      '<div class="vpopts' + (poll.opts.length > 2 ? " three" : "") + '">' +
      poll.opts.map(function (o, k) {
        var pct = poll.split[k];
        return '<button class="vpopt' + (done ? " done" : "") + (done && k === chosen ? " mine" : "") +
          '" type="button" data-i="' + k + '"' + (done ? " disabled" : "") +
          ' aria-pressed="' + (k === chosen) + '">' +
          '<span class="vpimg">' + (poll.imgs && poll.imgs[k] ? imgTag(poll.imgs[k], o, "wide") : photoSVG(photo, "wide", poll.id + "#" + k)) + '<span class="vpveil"></span>' +
          (done && k === chosen ? '<span class="vptick">' + I.tick + '</span>' : "") + '</span>' +
          '<span class="vprow"><span class="vpfill" style="width:' + (done ? pct : 0) + '%"></span>' +
          '<span class="vplab">' + esc(o) + '</span>' +
          (done ? '<span class="vppct">' + pct + '%</span>' : "") + '</span>' +
          '</button>';
      }).join("") + '</div>' +
      '<p class="vpafter">' + esc(done ? poll.after : "Tap one. Results the moment you do.") + '</p>' +
      '</div>';
  }

  /* ---- the lead story, headline on the picture ---- */

  /* after the event, with scores hidden, the lead story cannot be the result */
  function heroFor() {
    var h = HOMEFEED.hero[lc()] || HOMEFEED.hero.live;
    if (lc() !== "fulltime" || !hideOn()) { return h; }
    return { kicker: "The day, without the scores", head: "Four matches, four endings, and none of them given away here",
      stand: "Pick one to catch up on: highlights, the match in 60 seconds, or the full replay. The scores wait until you ask",
      photo: { img: "ck-mic", cap: "A BBC Sport microphone" }, sport: "cricket", article: "",
      comments: h.comments, likes: h.likes, shares: h.shares, poll: h.poll };
  }

  function storyCard(hero) {
    return '<section class="story">' +
      '<button class="stphoto" type="button" data-article="' + esc(hero.article || "") + '">' + photoSVG(hero.photo, "wide", "story " + hero.head) +
      '<span class="stveil"></span>' +
      '<span class="stkick">' + esc(hero.kicker) + '</span>' +
      '<span class="sthead">' + esc(hero.head) + '</span></button>' +
      '<div class="stbody"><button class="ststand" type="button" data-article="' + esc(hero.article || "") + '">' + esc(hero.stand) + '</button>' +
      engageBar({ listen: true, ctx: "story:" + lc(), comments: hero.comments, likes: hero.likes, shares: hero.shares, likeKey: "story:" + lc() }) +
      '</div></section>';
  }

  function homeBody() {
    var hero = heroFor();
    var cards = rankedCards();
    var bySig = cards.slice().sort(function (a, b) { return b.c.sig - a.c.sig; });
    var out = "";

    out += spoilBar() + watchBar();

    /* 1. whatever is worth watching, full bleed */
    out += takeoverHero();

    /* 2. the way in for anyone who would rather answer than watch */
    out += '<section class="section pollsec">' +
      visualPoll(hero.poll, hero.photo, "Have your say") + '</section>';

    /* 3. one card per sport, ranked by the same score */
    out += '<section class="section">' + feedHead("Live on the BBC", "The full live index is not built out in this prototype.") +
      '<div class="rail liverail">' + cards.map(function (x, k) {
        var c = x.c, isTop = k === 0 && c.status === "live";
        var chip = c.status === "live" ? '<span class="chiplive">LIVE</span>'
          : c.status === "soon" ? remindChip(x.e, c.when.split(" ·")[0])
          : '<span class="chipdone">' + esc(c.hidden ? "Result hidden" : c.when.split(" ·")[0]) + '</span>';
        return '<button class="lcard' + (isTop ? " top" : "") + '" type="button" data-open="' + x.i + '">' +
          '<span class="lphoto">' + photoSVG(x.e.photo, "wide", x.e.sport + " " + x.e.title) + chip +
          (c.badge ? '<span class="lbadge">' + esc(c.badge) + '</span>' : "") + '</span>' +
          '<span class="lsport">' + (I.sport[x.e.sport] || "") + esc(x.e.sport) + '</span>' +
          '<span class="ltitle">' + esc(c.line1) + '</span>' +
          '<span class="lsub">' + esc(c.line2) + '</span>' +
          (isTop ? '<span class="lsig hot">Watch now</span>' : "") +
          '</button>';
      }).join("") + '</div></section>';

    /* 4. the lead story */
    out += storyCard(hero);

    /* 5. following today, every card carrying its own picture */
    out += '<section class="section">' + feedHead("Following today", "Your followed events are not built out in this prototype.") +
      '<div class="cardlist">' + bySig.map(function (x) {
        var c = x.c;
        return '<button class="ecard" type="button" data-open="' + x.i + '">' +
          '<span class="ecphoto">' + photoSVG(x.e.photo, "wide", "follow " + x.e.title + c.line2) +
          (c.status === "live" ? '<span class="ecdot"></span>' : "") + '</span>' +
          '<span class="ectext">' +
          '<span class="ec-top"><span class="ec-sport">' + (I.sport[x.e.sport] || "") + esc(x.e.sport) + '</span>' +
          '<span class="ec-when' + (c.status === "live" ? " live" : c.status === "soon" ? " soon" : "") + '">' + esc(c.when) + '</span></span>' +
          '<span class="ec-title">' + esc(c.line1) + '</span>' +
          '<span class="ec-ctx">' + esc(c.ctx) + '</span>' +
          (c.status === "soon" ? '<span class="ec-foot">' + remindChip(x.e, "") + '</span>' : "") + '</span></button>';
      }).join("") + '</div></section>';

    /* 6. the drop, one in focus with the rest peeking */
    var v = HOMEFEED.videos;
    out += '<section class="section">' + feedHead(v.title, "The video index is not built out in this prototype.") +
      '<div class="focusrail" data-focusrail>' + (lc() === "fulltime" && hideOn() ? [11, 5, 8, 0, 6, 2, 3, 4] : ((v.decks && v.decks[lc()]) || v.deck)).map(function (ix) {
        var it = DROP[ix];
        return '<button class="fcard" type="button" data-play="' + ix + '">' +
          '<span class="fphoto">' + photoSVG(it, "tall", it.sport + " " + it.t) +
          '<span class="fscrim"></span>' +
          '<span class="play">' + I.playtri + '</span>' +
          '<span class="dur">' + esc(it.dur) + '</span>' +
          '<span class="fmeta"><span class="fkick">' + esc(it.sport) + '</span>' +
          (it.baked ? "" : '<span class="ftitle">' + esc(it.t) + '</span>') + '</span></span></button>';
      }).join("") + '</div></section>';

    /* 7. sport on the BBC */
    var br = HOMEFEED.bbcrail;
    out += '<section class="section">' + feedHead(br.title, "The BBC Sport index is not built out in this prototype.") +
      '<div class="rail">' + br.items.map(function (it) {
        return '<button class="bcard' + (it.badge ? " live" : "") + '" type="button" data-toast="' + esc(it.title) + ' is not built out in this prototype.">' +
          '<span class="bphoto">' + photoSVG(it, "wide", it.title + " " + it.sub) +
          (it.badge ? '<span class="chiplive">' + esc(it.badge) + '</span>' : "") + '</span>' +
          '<span class="btitle">' + esc(it.title) + '</span>' +
          '<span class="bsub">' + esc(it.sub) + '</span></button>';
      }).join("") + '</div></section>';

    /* 8. tables */
    var st = HOMEFEED.standings;
    out += '<section class="section">' + feedHead(st.title, "The full table is not built out in this prototype.") +
      table(st.cols, st.rows) + '<p class="note">' + esc(st.note) + '</p></section>';

    var cp = HOMEFEED.comps, tix = S.compTab || 0, ct = cp.tabs[tix];
    out += '<section class="section">' + feedHead(cp.title, "The competition index is not built out in this prototype.") +
      '<div class="comptabs">' + cp.tabs.map(function (t, i) {
        return '<button class="comptab" type="button" data-comp="' + i + '" aria-pressed="' + (i === tix) + '">' +
          badge(t.colour, t.initials) + esc(t.name) + '</button>';
      }).join("") + '</div>' + table(ct.cols, ct.rows, "Club") + '</section>';

    /* 9. rumours, with a picture each */
    var rm = HOMEFEED.rumours;
    out += '<section class="section">' + feedHead(rm.title, "The rumour index is not built out in this prototype.") +
      '<div class="rail">' + rm.items.map(function (it) {
        return '<button class="rcard" type="button" data-toast="' + esc(it[0]) + '">' +
          '<span class="rphoto">' + photoSVG({ motif: "pitch", g: ["#123D22", "#071A0E"], sport: "Football" }, "wide", "rumour " + it[0]) +
          '<span class="rveil"></span>' + badge(it[2], it[3]) + '</span>' +
          '<span class="rtext"><span class="rtitle">' + esc(it[0]) + '</span>' +
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

  function frameFor() {
    var dev = $("#device"), set = $("#tvset"), s = S.surface || "phone";
    if (dev) {
      dev.hidden = s === "tv";
      dev.classList.toggle("browser", s === "web");
    }
    if (set) { set.hidden = !(s === "tv" || s === "together"); }
    document.body.dataset.surface = s;
  }

  function afterRender() {
    $$(".lc").forEach(function (b, i) { b.setAttribute("aria-selected", String(i === S.lcIx)); });
    $$(".swipehint i").forEach(function (d, i) { d.classList.toggle("on", i === S.lcIx); });
    $("#lcblurb").textContent = LIFECYCLE[S.lcIx].blurb;
    wire();
    if (S.player !== null) { mountPlayer(); }
    if (S.surface === "tv" || S.surface === "together") { renderTV(); }
    sizeFS();
  }

  function eventBody() {
    var inner = summaryBox() + renderSections(curTab().sections);
    return masked(ev()) ? spoilShield(ev()) + '<div class="spoilblur" aria-hidden="true">' + inner + '</div>' : inner;
  }

  function render(dir) {
    resetUsed();
    document.body.dataset.theme = S.theme;
    /* a full-size video only lives at the top of its own event page */
    if (S.vid && S.vid.mode === "full" && !(S.view === "event" && S.nav === "home" && (!S.vid.id || S.vid.id === ev().id))) { S.vid.mode = "pip"; }
    frameFor();
    if (S.surface === "web") { renderWeb(); afterRender(); return; }
    var app = $("#app"), isHome = S.view === "home" && S.nav === "home";
    var head, body, pre = "";

    if (S.nav !== "home") {
      head = appHead(NAVSCREENS[S.nav].title);
      body = renderSections(NAVSCREENS[S.nav].sections);
    } else if (isHome) {
      head = appHead("Home");
      body = homeBody();
    } else {
      /* only the brand bar and any playing video stay fixed; the score and
         the tabs scroll with the page, and the tabs stick once they reach
         the top. On a short phone a fixed scoreboard left no room to scroll */
      head = appHead(ev().sport) + vidPane();
      pre = matchHead() + tabBar();
      body = eventBody();
    }

    var vidFull = !isHome && S.nav === "home" && S.vid && S.vid.mode === "full";
    app.innerHTML = '<div class="viewport' + (evState().sofa && !isHome && S.nav === "home" ? " sofa" : "") + (S.dock ? " docked" : "") + (vidFull ? " hasvid" : "") + (pre ? " evpage" : "") + '" id="viewport">' +
      head + '<div class="body" id="scrollbody">' + pre + '<div id="stage"' +
      (dir ? ' class="stage-anim" style="--from:' + (dir > 0 ? "18px" : "-18px") + '"' : "") + '>' + body + '</div></div>' +
      dockHTML() + navBar() + drawer() + '<div id="ovl">' + overlaysHTML() + '</div><div class="toast" id="toast" role="status"></div></div>';

    var sb = $("#scrollbody"), vp = $("#viewport");
    if (sb && vp && !pre) {
      /* Hysteresis plus a room check. Collapsing the header shortens the page,
         which can push scrollTop back under the threshold and start an
         expand/collapse loop. Two thresholds and a minimum scroll height stop it. */
      var pending = false;
      sb.addEventListener("scroll", function () {
        if (pending) { return; }
        pending = true;
        requestAnimationFrame(function () {
          pending = false;
          if (vp.classList.contains("hasvid")) { return; }
          var on = vp.classList.contains("condensed");
          var top = sb.scrollTop;
          if (!on) {
            if (top > 80 && sb.scrollHeight - sb.clientHeight > 520) { vp.classList.add("condensed"); }
          } else if (top < 24) {
            vp.classList.remove("condensed");
          }
        });
      }, { passive: true });
    }

    afterRender();
  }

  function rerenderBody() {
    if (S.surface === "web") {
      var wsb = $("#scrollbody"), wy = wsb ? wsb.scrollTop : 0;
      render();
      if ($("#scrollbody")) { $("#scrollbody").scrollTop = wy; }
      return;
    }
    var sb = $("#scrollbody"), pos = sb ? sb.scrollTop : 0;
    var isHome = S.view === "home" && S.nav === "home";
    resetUsed();
    $("#stage").innerHTML = S.nav !== "home" ? renderSections(NAVSCREENS[S.nav].sections)
      : isHome ? homeBody() : eventBody();
    if (sb) { sb.scrollTop = pos; }
    wire();
  }

  function navBar() {
    return '<div class="bottomnav" role="tablist" aria-label="Sections">' + NAVITEMS.map(function (n) {
      var on = S.nav === n[0];
      return '<button class="nav" role="tab" type="button" data-nav="' + n[0] + '" aria-selected="' + on + '">' +
        '<i class="navpill">' + I.nav[n[0]] + '</i><span>' + esc(n[1]) + '</span></button>';
    }).join("") + '</div>';
  }

  /* ==========================================================================
     The story so far, and the audio dock
     ==========================================================================
     Somebody arriving at minute 67 needs the match explained before any of
     the live furniture makes sense. The recap tells it three ways: watch the
     moments go by in sixty seconds, listen to it read while doing something
     else, or read it properly. Same story, three levels of attention.

     The dock is where anything audio lives: Listen live, a story read aloud,
     a clip from Test Match Special. It sits above the navigation and keeps
     playing as you move around the app.
     ========================================================================== */

  var RECAP_SLIDE = 3.4;

  function secs(t) {
    var m = String(t || "0:00").split(":");
    return Number(m[0]) * 60 + Number(m[1] || 0);
  }

  function rstate(id) {
    if (!S.recap) { S.recap = {}; }
    if (!S.recap[id]) { S.recap[id] = { mode: "watch", ix: 0, el: 0, play: true, pos: 0, speed: 1, heard: false }; }
    return S.recap[id];
  }

  var WAVE = (function () {
    var out = [], x = 1234567;
    for (var i = 0; i < 64; i++) {
      x = (x * 1103515245 + 12345) & 0x7fffffff;
      out.push(0.25 + (x % 1000) / 1000 * 0.75);
    }
    return out;
  })();

  function waveSVG(cls) {
    return '<svg class="' + cls + '" viewBox="0 0 256 40" preserveAspectRatio="none" aria-hidden="true">' +
      WAVE.map(function (v, i) {
        var h = v * 34;
        return '<rect x="' + (i * 4 + 0.5) + '" y="' + (20 - h / 2).toFixed(1) + '" width="2.4" height="' + h.toFixed(1) + '" rx="1.2"/>';
      }).join("") + '</svg>';
  }

  function momentTile(m, e) {
    if (m[3]) { return imgTag(m[3], m[1], "wide"); }
    /* no picture: a graphic card, coloured by what kind of moment it was */
    return '<span class="rcpgfx k-' + esc(m[4] || "score") + '" style="--acc:' + (e ? e.accent : "#FFD230") + '">' +
      '<b>' + esc(m[0]) + '</b>' + (e && I.sport[e.sport] ? '<i>' + I.sport[e.sport] + '</i>' : "") + '</span>';
  }

  function nowLine(R, r) {
    var dur = secs(R.listen), n = R.moments.length;
    var k = Math.min(n - 1, Math.floor(r.pos / dur * n));
    return R.moments[k];
  }

  P.recap = function (p) {
    var R = RECAPS[p.id];
    if (!R) { return ""; }
    var r = rstate(p.id), e = EVENTS.filter(function (x) { return x.id === p.id; })[0];
    var n = R.moments.length, out = "";

    out += '<div class="rcp" data-recap="' + esc(p.id) + '">' +
      '<div class="rcpmodes" role="tablist" aria-label="How to catch up">' +
      [["watch", "Watch", "60 sec"], ["listen", "Listen", R.listen], ["read", "Read", R.read]].map(function (m) {
        return '<button type="button" role="tab" data-rmode="' + m[0] + '" aria-selected="' + (r.mode === m[0]) + '">' +
          '<span>' + m[1] + '</span><small>' + esc(m[2]) + '</small></button>';
      }).join("") + '</div>';

    if (r.mode === "watch") {
      var m = R.moments[r.ix];
      out += '<div class="rcpstage' + (r.play ? "" : " paused") + '">' +
        '<div class="rcpslide">' + momentTile(m, e) + '</div>' +
        '<span class="rcpscrim"></span>' +
        '<div class="rcpsegs">' + R.moments.map(function (x, k) {
          var st = k < r.ix ? "done" : k === r.ix ? "on" : "";
          return '<span class="rcpseg ' + st + '"><i' +
            (k === r.ix ? ' style="animation-duration:' + RECAP_SLIDE + 's;animation-delay:-' + r.el.toFixed(2) + 's"' : "") +
            '></i></span>';
        }).join("") + '</div>' +
        '<div class="rcptext"><span class="rcptime">' + esc(m[0]) + '</span>' +
        '<b>' + esc(m[1]) + '</b><p>' + esc(m[2]) + '</p></div>' +
        '<button class="rcpzone prev" type="button" data-rstep="-1" aria-label="Previous moment"></button>' +
        '<button class="rcpzone next" type="button" data-rstep="1" aria-label="Next moment"></button>' +
        '<button class="rcpplay" type="button" data-rplay aria-label="' + (r.play ? "Pause" : "Play") + '">' +
        (r.play ? I.pause : I.play) + '</button>' +
        '<span class="rcpcount">' + (r.ix + 1) + ' of ' + n + '</span>' +
        '</div>';
    } else if (r.mode === "listen") {
      var dur = secs(R.listen), pct = Math.min(100, r.pos / dur * 100), now = nowLine(R, r);
      out += '<div class="rcpaudio">' +
        '<button class="rcpbig" type="button" data-rplay aria-label="' + (r.play ? "Pause" : "Play") + '">' +
        (r.play ? I.pause : I.play) + '</button>' +
        '<div class="rcpwavebox">' + waveSVG("rcpwave") +
        '<span class="rcpwavefill" style="clip-path:inset(0 ' + (100 - pct).toFixed(1) + '% 0 0)">' + waveSVG("rcpwave on") + '</span></div>' +
        '<div class="rcptimes"><span data-rel>' + mmss(Math.floor(r.pos)) + '</span>' +
        '<button type="button" class="rcpspeed" data-rspeed>' + r.speed + '×</button>' +
        '<span>' + esc(R.listen) + '</span></div>' +
        '<p class="rcpnow"><span>Now</span> <b data-rnow>' + esc(now[0] + " · " + now[1]) + '</b></p>' +
        '<p class="rcpvoice">' + esc(R.voice) + '</p>' +
        '</div>';
    } else {
      out += '<div class="rcpread">' + R.synopsis.map(function (para) { return '<p>' + esc(para) + '</p>'; }).join("") +
        '<ol class="rcpline">' + R.moments.map(function (x) {
          return '<li class="k-' + esc(x[4] || "score") + '"><span>' + esc(x[0]) + '</span><b>' + esc(x[1]) + '</b></li>';
        }).join("") + '</ol></div>';
    }
    return out + '</div>';
  };

  function refreshRecap(id) {
    var el = $('[data-recap="' + id + '"]');
    if (!el) { return; }
    var holder = document.createElement("div");
    holder.innerHTML = P.recap({ id: id });
    var fresh = holder.firstChild;
    el.parentNode.replaceChild(fresh, el);
    wireRecap(fresh);
  }

  function wireRecap(el) {
    var id = el.dataset.recap, R = RECAPS[id], r = rstate(id);
    $$("[data-rmode]", el).forEach(function (b) {
      b.onclick = function () {
        var m = b.dataset.rmode;
        if (m === r.mode) { return; }
        r.mode = m;
        r.play = m !== "read";
        if (m === "watch") { r.el = 0; if (r.ix >= R.moments.length - 1) { r.ix = 0; } }
        if (m === "listen") { stopDock(); if (r.pos >= secs(R.listen)) { r.pos = 0; } }
        refreshRecap(id);
      };
    });
    var pb = $("[data-rplay]", el);
    if (pb) {
      pb.onclick = function () {
        r.play = !r.play;
        if (r.play && r.mode === "watch" && r.ix >= R.moments.length - 1 && r.el >= RECAP_SLIDE) { r.ix = 0; r.el = 0; }
        if (r.play && r.mode === "listen") { stopDock(); if (r.pos >= secs(R.listen)) { r.pos = 0; } }
        refreshRecap(id);
      };
    }
    $$("[data-rstep]", el).forEach(function (b) {
      b.onclick = function () {
        r.ix = Math.max(0, Math.min(R.moments.length - 1, r.ix + Number(b.dataset.rstep)));
        r.el = 0;
        refreshRecap(id);
      };
    });
    var sp = $("[data-rspeed]", el);
    if (sp) {
      sp.onclick = function () {
        r.speed = r.speed === 1 ? 1.5 : r.speed === 1.5 ? 2 : 1;
        refreshRecap(id);
      };
    }
  }

  /* ---- the dock ---- */

  function dockHTML() {
    var d = S.dock;
    if (!d) { return '<div class="dock" id="dock" hidden></div>'; }
    var pct = d.dur ? Math.min(100, d.pos / d.dur * 100) : 0;
    return '<div class="dock' + (d.live ? " live" : "") + '" id="dock" role="region" aria-label="Now playing">' +
      '<button class="dkplay" type="button" data-dkplay aria-label="' + (d.play ? "Pause" : "Play") + '">' +
      (d.play ? I.pause : I.play) + '</button>' +
      '<span class="dktext">' +
      (d.live ? '<span class="dklive"><i></i>LIVE</span>' : "") +
      '<b>' + esc(d.title) + '</b><small>' + esc(d.sub) + '</small></span>' +
      (d.transcript ? '<button class="dkread" type="button" data-dkread aria-pressed="' + !!d.showText + '">Text</button>' : "") +
      '<button class="dkclose" type="button" data-dkclose aria-label="Stop">' + I.close + '</button>' +
      (d.dur ? '<span class="dkbar"><i style="width:' + pct.toFixed(1) + '%"></i></span>' : '<span class="dkbar live"><i></i></span>') +
      (d.transcript && d.showText ? '<div class="dktranscript">' + d.transcript.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join("") + '</div>' : "") +
      '</div>';
  }

  function paintDock() {
    var old = $("#dock");
    if (!old) { return; }
    var holder = document.createElement("div");
    holder.innerHTML = dockHTML();
    old.parentNode.replaceChild(holder.firstChild, old);
    wireDock();
    var vp = $("#viewport");
    if (vp) { vp.classList.toggle("docked", !!S.dock); }
  }

  function wireDock() {
    var el = $("#dock");
    if (!el || !S.dock) { return; }
    var p = $("[data-dkplay]", el), c = $("[data-dkclose]", el), t = $("[data-dkread]", el);
    if (p) { p.onclick = function () { S.dock.play = !S.dock.play; paintDock(); }; }
    if (c) { c.onclick = stopDock; }
    if (t) { t.onclick = function () { S.dock.showText = !S.dock.showText; paintDock(); }; }
  }

  function playDock(d) {
    /* one thing plays at a time: the recap's own player stops */
    for (var id in (S.recap || {})) {
      if (S.recap.hasOwnProperty(id) && S.recap[id].mode === "listen") { S.recap[id].play = false; refreshRecap(id); }
    }
    d.play = true; d.pos = 0;
    if (S.vid && S.vid.play) { S.vid.play = false; if (S.vid.mode === "full") { refreshVid(); } else { refreshOverlays(); } }
    S.dock = d;
    paintDock();
  }

  function stopDock() {
    if (!S.dock) { return; }
    S.dock = null;
    paintDock();
  }

  function listenLive(e) {
    playDock({ live: true, title: e.audio.station, sub: e.audio.prog, dur: 0 });
  }

  /* one clock for everything that moves on its own */
  function tickMedia() {
    var dt = 0.2;
    tickTV(dt);
    tickVid(dt);
    var id, r, R, el;
    for (id in (S.recap || {})) {
      if (!S.recap.hasOwnProperty(id)) { continue; }
      r = S.recap[id]; R = RECAPS[id];
      el = $('[data-recap="' + id + '"]');
      if (!el || !r.play) { continue; }
      if (r.mode === "watch") {
        r.el += dt;
        if (r.el >= RECAP_SLIDE) {
          if (r.ix < R.moments.length - 1) { r.ix += 1; r.el = 0; }
          else { r.el = RECAP_SLIDE; r.play = false; }
          refreshRecap(id);
        }
      } else if (r.mode === "listen") {
        var dur = secs(R.listen);
        r.pos = Math.min(dur, r.pos + dt * r.speed);
        var f = $(".rcpwavefill", el), rel = $("[data-rel]", el), nw = $("[data-rnow]", el);
        if (f) { f.style.clipPath = "inset(0 " + (100 - r.pos / dur * 100).toFixed(1) + "% 0 0)"; }
        if (rel) { rel.textContent = mmss(Math.floor(r.pos)); }
        if (nw) { var m = nowLine(R, r); nw.textContent = m[0] + " · " + m[1]; }
        if (r.pos >= dur) { r.play = false; refreshRecap(id); }
      }
    }
    var d = S.dock;
    if (d && d.play && d.dur) {
      d.pos = Math.min(d.dur, d.pos + dt);
      var bar = $("#dock .dkbar i");
      if (bar) { bar.style.width = (d.pos / d.dur * 100).toFixed(1) + "%"; }
      if (d.pos >= d.dur) { d.play = false; paintDock(); }
    }
  }

  /* the recap goes into every live and second-screen state, at the top of
     the first tab, or straight after the delay control where there is one */
  function seedRecaps() {
    EVENTS.forEach(function (e) {
      if (!RECAPS[e.id]) { return; }
      ["live", "companion"].forEach(function (st) {
        var s = e.states[st];
        if (!s || !s.tabs || !s.tabs[0]) { return; }
        var secs0 = s.tabs[0].sections;
        if (secs0.some(function (x) { return x.panels && x.panels.some(function (pn) { return pn.t === "recap"; }); })) { return; }
        var at = 0;
        secs0.forEach(function (x, i) { if (/^Match your/.test(x.h || "")) { at = i + 1; } });
        secs0.splice(at, 0, { h: "The story so far", meta: "Catch up", panels: [{ t: "recap", id: e.id }] });
      });
    });
  }


  /* ==========================================================================
     The menu: a profile rather than a nav list
     ==========================================================================
     Every poll in this prototype settles against something that actually
     happens later in the day, so the menu can show a fan what their calls
     were worth. Votes read from the same state the polls write to, which
     means answering one on the live page changes what is in here.
     ========================================================================== */

  var VOTEBOOK = {
    "hero-buildup": { t: "The Ashes, day 3", q: "England to avoid the follow-on", right: 0,
      r: "You said {x}, and they got there with 11 to spare",
      w: "You said {x}. England reached 361-8 and avoided it" },
    "hero-live": { t: "Wimbledon, Court 2", q: "Raducanu to break serve", right: 0,
      r: "You said {x}, and she did", w: "You said {x}. She broke, and served it out" },
    "hero-companion": { t: "Wimbledon, Centre Court", q: "Should BBC One switch to Court 2", pending: true,
      p: "You said {x}. The gallery decides at the changeover" },
    "hero-fulltime": { t: "The day in one line", q: "Performance of the day", right: 0,
      r: "You said {x}, and the country agreed", w: "You said {x}. Root took it, and it was not close" },
    "fb-scorer": { t: "England v Netherlands", q: "First goalscorer", right: 1,
      r: "You said {x}, and {x} got it on 52", w: "You said {x}. Saka got there first, on 52" },
    "ck-session": { t: "The Ashes, day 3", q: "Wickets before lunch", right: 2,
      r: "You said {x}, and that is how the session went", w: "You said {x}. Two fell before the interval" },
    "tn-upset": { t: "Wimbledon, day 6", q: "Which seed goes out", right: 0,
      r: "You said {x}, and he went out in four", w: "You said {x}. Musetti was the one who went" },
    "rg-bp": { t: "Wales v Ireland", q: "Ireland's four tries", right: 1,
      r: "You said {x}, and it came with a minute left", w: "You said {x}. It came with a minute left" }
  };

  /* what a fan did earlier in the week, so the list is never empty */
  var PASTVOTES = [
    { t: "Ireland v France, round 4", line: "You said Ireland by less than seven, and it finished by four", ok: true },
    { t: "England v Senegal", line: "You said a clean sheet, and they conceded in the 90th", ok: false },
    { t: "The Ashes, 1st Test", line: "You said England would chase it down, and they did", ok: true }
  ];

  var MYCOMMENTS = [
    { img: "rg-maul", t: "Wales v Ireland, Six Nations",
      body: "The maul penalty count is doing all the talking and nobody on commentary has mentioned it once" },
    { img: "ck-root", t: "The Ashes, 2nd Test, Lord's",
      body: "Root at this ground, in this light, with the new ball eight overs away. I am not moving" }
  ];

  var REWARDS = [
    { i: "stack", t: "Voted in an Ashes poll", sub: "Day 3" },
    { i: "tick", t: "Correct call on Court 2", sub: "Wimbledon" },
    { i: "chat", t: "Commented in a live page", sub: "Six Nations" },
    { i: "flame", t: "Four sports in one day", sub: "26 June" }
  ];

  var FOLLOWS = ["Cricket", "Football", "Tennis", "Rugby Union", "Formula 1", "Boxing"];

  function voteRows() {
    var rows = [], id;
    for (id in VOTEBOOK) {
      if (!VOTEBOOK.hasOwnProperty(id)) { continue; }
      var choice = S.votes[id];
      if (choice === undefined) { continue; }
      var v = VOTEBOOK[id];
      var opts = pollOpts(id);
      var said = opts && opts[choice] !== undefined ? opts[choice] : "";
      var ok = v.pending ? null : choice === v.right;
      var tpl = v.pending ? v.p : (ok ? v.r : v.w);
      /* the option goes in quotes: it can be a name or a whole phrase */
      rows.push({ t: v.t + " \u00b7 " + v.q, line: String(tpl).replace(/\{x\}/g, "\u201c" + said + "\u201d"), ok: ok });
    }
    /* top up with earlier in the week, newest of those first */
    for (var k = 0; rows.length < 3 && k < PASTVOTES.length; k++) {
      rows.push({ t: PASTVOTES[k].t, line: PASTVOTES[k].line, ok: PASTVOTES[k].ok });
    }
    return rows.slice(0, 4);
  }

  /* the options a poll was rendered with, wherever it lives in the data */
  var POLLOPTS = null;
  function pollOpts(id) {
    if (!POLLOPTS) {
      POLLOPTS = {};
      var seen = [];
      (function walk(o) {
        if (!o || typeof o !== "object" || seen.indexOf(o) >= 0) { return; }
        seen.push(o);
        if (o.id && o.opts) { POLLOPTS[o.id] = o.opts; }
        for (var k in o) { if (o.hasOwnProperty(k)) { walk(o[k]); } }
      })({ e: EVENTS, h: HOMEFEED });
    }
    return POLLOPTS[id];
  }

  function drawer() {
    var votes = voteRows();
    var live = rankedCards();

    return '<div class="scrim" id="scrim"></div>' +
      '<aside class="drawer" id="drawer" aria-label="Your account" aria-hidden="true">' +

      '<div class="dtop">' +
      '<button class="iconbtn" type="button" id="drawerclose" aria-label="Close">' + I.close + '</button>' +
      '<span class="dspacer"></span>' +
      '<button class="iconbtn dbadge" type="button" data-sheet="comments" data-ctx="' + (S.view === "event" ? ev().id : "tennis") + '" aria-label="Replies">' +
      I.chat + '<i>3</i></button>' +
      '<button class="iconbtn dbadge" type="button" data-sheet="notifs" aria-label="Notifications">' +
      I.bell + '<i>2</i></button>' +
      '<button class="iconbtn dthemebtn" type="button" data-themetoggle aria-pressed="' + (S.theme === "light") + '" aria-label="' + (S.theme === "light" ? "Switch to dark mode" : "Switch to light mode") + '">' +
      (S.theme === "light" ? I.moon : I.sun) + '</button>' +
      '</div>' +

      '<div class="dme"><button class="dav" type="button" data-toast="Adding a profile picture is not built out in this prototype." aria-label="Add a profile picture">A' +
      '<span class="davadd" aria-hidden="true">+</span></button><h2>Arun</h2></div>' +

      '<section class="dblock dset">' +
      '<button type="button" class="ntype" data-spoil="toggle" aria-pressed="' + hideOn() + '"><span><b>' + I.eyeoff + 'Hide scores</b><small>Catch-ups and replays first, scores when you choose</small></span><i class="sw' + (hideOn() ? " on" : "") + '"></i></button>' +
      '</section>' +

      '<section class="dblock">' + dhead("Follows", "Your followed sports are not built out in this prototype.") +
      '<div class="dchips"><button class="dchip ic" type="button" data-toast="Follow settings are not built out in this prototype." aria-label="Edit follows">' +
      I.optabars + '</button>' +
      FOLLOWS.map(function (f) {
        return '<button class="dchip" type="button" data-toast="' + esc(f) + ' is not built out in this prototype.">' + esc(f) + '</button>';
      }).join("") + '</div></section>' +

      '<section class="dblock">' + dhead("Votes", "Your full voting record is not built out in this prototype.") +
      '<ul class="dvotes">' + votes.map(function (v) {
        var mark = v.ok === null ? '<span class="dmark wait">' + I.livedot + '</span>'
          : v.ok ? '<span class="dmark yes">' + I.tickplain + '</span>'
            : '<span class="dmark no">' + I.close + '</span>';
        return '<li>' + mark + '<span class="dvt"><b>' + esc(v.t) + '</b><span>' + esc(v.line) + '</span></span></li>';
      }).join("") + '</ul>' +
      (S.answered ? "" : '<p class="dnote">Answer a poll anywhere in the app and it lands here.</p>') +
      '</section>' +

      '<section class="dblock">' + dhead("Comments", "Your comment history is not built out in this prototype.") +
      MYCOMMENTS.map(function (c) {
        return '<button class="dcom" type="button" data-toast="Comment threads are not built out in this prototype.">' +
          '<span class="dcimg">' + imgTag(c.img, "", "square") + '</span>' +
          '<span class="dct"><b>' + esc(c.t) + '</b><span>' + esc(c.body) + '</span></span></button>';
      }).join("") + '</section>' +

      '<section class="dblock">' + dhead("Rewards", "The rewards shelf is not built out in this prototype.") +
      '<div class="drew">' + REWARDS.map(function (r) {
        return '<div class="dbadge2"><span class="dmedal">' + (I[r.i] || I.tick) + '</span>' +
          '<b>' + esc(r.t) + '</b><span>' + esc(r.sub) + '</span></div>';
      }).join("") + '</div></section>' +

      '<section class="dblock last">' + dhead("Live today", "") +
      '<div class="rail liverail drail">' + live.map(function (x, k) {
        var c = x.c;
        var chip = c.status === "live" ? '<span class="chiplive">LIVE</span>'
          : c.status === "soon" ? '<span class="chipsoon">' + esc(c.when.split(" \u00b7")[0]) + '</span>'
          : '<span class="chipdone">' + esc(c.when.split(" \u00b7")[0]) + '</span>';
        return '<button class="lcard' + (S.view === "event" && x.i === S.eventIx ? " top" : "") + '" type="button" data-open="' + x.i + '">' +
          '<span class="lphoto">' + photoSVG(x.e.photo, "wide", x.e.sport + " " + x.e.title) + chip + '</span>' +
          '<span class="lsport">' + (I.sport[x.e.sport] || "") + esc(x.e.sport) + '</span>' +
          '<span class="ltitle">' + esc(c.line1) + '</span>' +
          '<span class="lsub">' + esc(c.line2) + '</span></button>';
      }).join("") + '</div></section>' +

      '</aside>';
  }

  function closeDrawer() {
    var d = $("#drawer"), b = $("#burger");
    if (!d) { return; }
    d.classList.remove("open");
    if ($("#scrim")) { $("#scrim").classList.remove("open"); }
    d.setAttribute("aria-hidden", "true");
    if (b) { b.setAttribute("aria-expanded", "false"); }
  }

  /* the menu is rebuilt every time it opens, so its handlers are attached
     here rather than in the page-wide pass */
  function wireDrawer() {
    var d = $("#drawer");
    if (!d) { return; }
    var c = $("#drawerclose", d);
    if (c) { c.onclick = closeDrawer; }
    $$("[data-open]", d).forEach(function (b) {
      b.onclick = function () { closeDrawer(); openEvent(Number(b.dataset.open)); };
    });
    $$("[data-toast]", d).forEach(function (b) {
      b.onclick = function () { toast(b.dataset.toast); };
    });
    wireNew(d);
  }

  function dhead(title, toast) {
    return toast
      ? '<button class="dh2" type="button" data-toast="' + esc(toast) + '"><span>' + esc(title) + '</span>' + ARROW + '</button>'
      : '<div class="dh2"><span>' + esc(title) + '</span></div>';
  }

  function wire() {
    var burger = $("#burger");
    if (burger) {
      burger.onclick = function () {
        /* rebuild on open: a poll answered since the last full render has to
           show up in Votes, and only #stage is refreshed on a vote */
        var d = $("#drawer"), holder = document.createElement("div");
        holder.innerHTML = drawer();
        var fresh = holder.querySelector(".drawer");
        d.innerHTML = fresh.innerHTML;
        wireDrawer();
        d.classList.add("open");
        $("#scrim").classList.add("open");
        d.setAttribute("aria-hidden", "false");
        burger.setAttribute("aria-expanded", "true");
      };
    }
    if ($("#scrim")) { $("#scrim").onclick = closeDrawer; }
    if ($("#drawerclose")) { $("#drawerclose").onclick = closeDrawer; }

    $$("[data-lcix]").forEach(function (b) {
      b.onclick = function () { closeDrawer(); goLc(Number(b.dataset.lcix)); };
    });
    $$("[data-open]").forEach(function (b) {
      b.onclick = function () { closeDrawer(); S.sheet = null; S.article = null; S.reader = null; openEvent(Number(b.dataset.open)); };
    });
    $$("[data-gohome]").forEach(function (b) {
      b.onclick = function () { S.view = "home"; S.nav = "home"; render(-1); };
    });

    $$(".tabbtn").forEach(function (b) {
      b.onclick = function () {
        S.tabIx[tabKey()] = Number(b.dataset.tab);
        $$(".tabbtn").forEach(function (x) { x.setAttribute("aria-selected", String(x === b)); });
        /* keep the tabs where they are: land at the top of the new tab, not
           back at the scoreboard */
        var sb0 = $("#scrollbody"), tb = $("#scrollbody > .tabbar");
        var st0 = $("#stage");
        /* a stuck bar reports where it is stuck, so measure from the content under it */
        if (sb0) { sb0.scrollTop = tb && st0 ? Math.min(sb0.scrollTop, st0.offsetTop - tb.offsetHeight) : 0; }
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

    $$("[data-recap]").forEach(wireRecap);
    $$("[data-tvlaunch]").forEach(function (b) {
      b.onclick = function () { tvs().ev = Number(b.dataset.tvlaunch); tvs().screen = "home"; setSurface("together"); };
    });
    $$("[data-remind]").forEach(function (b) {
      b.onclick = function () {
        if (!S.reminders) { S.reminders = {}; }
        var id = b.dataset.remind;
        S.reminders[id] = !S.reminders[id];
        tvs().remind[id] = S.reminders[id];
        toast(S.reminders[id] ? "Reminder set. Your phone and your TV will both tell you." : "Reminder removed.");
        rerenderBody();
      };
    });
    $$("[data-webplay]").forEach(function (b) {
      b.onclick = function () { S.webPlay = true; rerenderBody(); };
    });
    wireDock();
    wireNew(document);
    $$("[data-listenlive]").forEach(function (b) {
      b.onclick = function () { listenLive(EVENTS[Number(b.dataset.listenlive)] || ev()); };
    });
    $$("[data-storylisten]").forEach(function (b) {
      b.onclick = function () {
        var h = heroFor();
        playDock({ title: h.head, sub: "Read by BBC Sport \u00b7 2 min", dur: 120, transcript: [h.stand].concat(h.body || []) });
      };
    });

    var optaBtn = $("[data-optatoggle]");
    if (optaBtn) { optaBtn.onclick = function () { S.optaOpen = !S.optaOpen; rerenderBody(); }; }

    $$("[data-focusrail]").forEach(function (rail) {
      var cards = $$(".fcard", rail), centres = [], last = -1, queued = false;
      function measure() {
        centres = cards.map(function (c) { return c.offsetLeft + c.offsetWidth / 2; });
      }
      function mark() {
        if (!centres.length) { measure(); }
        var mid = rail.scrollLeft + rail.clientWidth / 2, best = 0, bd = 1e9;
        for (var i = 0; i < centres.length; i++) {
          var d = Math.abs(centres[i] - mid);
          if (d < bd) { bd = d; best = i; }
        }
        if (best === last) { return; }
        if (last >= 0 && cards[last]) { cards[last].classList.remove("on"); }
        cards[best].classList.add("on");
        last = best;
      }
      rail.addEventListener("scroll", function () {
        if (queued) { return; }
        queued = true;
        requestAnimationFrame(function () { queued = false; mark(); });
      }, { passive: true });
      window.addEventListener("resize", function () { measure(); last = -1; mark(); });
      measure();
      mark();
    });

    $$("[data-moment]").forEach(function (b) {
      b.onclick = function () { S.moment = b.dataset.moment; S.playing = b.dataset.moment === "live"; rerenderBody(); };
    });
    var pp = $("[data-playpause]");
    if (pp) { pp.onclick = function () { S.playing = !S.playing; rerenderBody(); }; }

    $$("[data-vpoll]").forEach(function (grp) {
      var vid = grp.dataset.vpoll;
      $$(".vpopt", grp).forEach(function (b) {
        b.onclick = function () {
          if (S.votes[vid] !== undefined) { return; }
          S.votes[vid] = Number(b.dataset.i);
          S.answered += 1;
          rerenderBody();
        };
      });
    });

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



  /* ==========================================================================
     Watching, hiding the score, and the overlays
     ==========================================================================
     Video leads wherever the BBC holds the pictures: football, tennis and
     rugby open with the match playing and a way to shrink it out of the way.
     Cricket is radio and text only, so the same slot carries Test Match
     Special with a live transcript underneath.

     Scores can be hidden for anyone arriving late or after the event. The
     page then leads with the ways to catch up, and the score is one tap away.

     Reactions happen in place. Comments, share and notifications open as
     sheets over the page rather than taking you somewhere else, so nobody
     loses the live page to leave a heart. Tapping a story opens the story.
     ========================================================================== */

  var IX = {
    rotate: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="7" y="3" width="10" height="18" rx="2" stroke="currentColor" stroke-width="1.8" transform="rotate(-45 12 12)"/><path d="M3.5 9A9 9 0 0 1 9 3.5M20.5 15A9 9 0 0 1 15 20.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    moon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19.5 14.2A7.8 7.8 0 0 1 9.8 4.5a7.8 7.8 0 1 0 9.7 9.7z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    sun: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="4.2" stroke="currentColor" stroke-width="1.8"/><path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    heartfill: '<svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7.5-4.6-7.5-9.4A4.1 4.1 0 0 1 12 8.2a4.1 4.1 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20z" fill="#E8443C"/></svg>',
    shrink: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 14h6v6M20 10h-6V4M10 14l-6.5 6.5M14 10l6.5-6.5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    grow: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    cc: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5.5" width="18" height="13" rx="2.5" stroke="currentColor" stroke-width="1.8"/><path d="M10.5 10.2a2.3 2.3 0 1 0 0 3.6M16.5 10.2a2.3 2.3 0 1 0 0 3.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    eye: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/></svg>',
    eyeoff: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3.5 3.5l17 17M9.9 5.8A9.7 9.7 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-2.9 3.7M6.3 7.3C3.9 9 2.5 12 2.5 12S6 18.5 12 18.5c1.6 0 3-.4 4.2-1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    link: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1.2 1.2M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1.2-1.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    tv: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="12.5" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M8 20.5h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    spark: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2.5c.8 4.6 2.9 6.7 7.5 7.5-4.6.8-6.7 2.9-7.5 7.5-.8-4.6-2.9-6.7-7.5-7.5 4.6-.8 6.7-2.9 7.5-7.5z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
    goal: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.8"/><path d="M12 7.5l3.8 2.8-1.5 4.4H9.7l-1.5-4.4z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    poll: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 20V11M12 20V5M19 20v-6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    msg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5.5h16a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5H10l-5 3.5v-3.5H4A1.5 1.5 0 0 1 2.5 16V7A1.5 1.5 0 0 1 4 5.5z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    camera: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor"/></svg>',
    mail: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="2.5" y="5" width="19" height="14" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M3 6.5l9 6.5 9-6.5" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    more: '<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="12" r="1.8" fill="currentColor"/><circle cx="12" cy="12" r="1.8" fill="currentColor"/><circle cx="18" cy="12" r="1.8" fill="currentColor"/></svg>',
    book: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5zM12 6.5v13" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    bellon: '<svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a6 6 0 0 0-6 6v4l-1.5 3h15L18 13V9a6 6 0 0 0-6-6z" fill="currentColor"/><path d="M10 19a2 2 0 0 0 4 0" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
    bellsm: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3a6 6 0 0 0-6 6v4l-1.5 3h15L18 13V9a6 6 0 0 0-6-6z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="M10 19a2 2 0 0 0 4 0" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    headph: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 15v-3a8 8 0 0 1 16 0v3" stroke="currentColor" stroke-width="1.8"/><rect x="3" y="14" width="4.5" height="6.5" rx="1.5" stroke="currentColor" stroke-width="1.8"/><rect x="16.5" y="14" width="4.5" height="6.5" rx="1.5" stroke="currentColor" stroke-width="1.8"/></svg>'
  };
  for (var ixk in IX) { if (IX.hasOwnProperty(ixk)) { I[ixk] = IX[ixk]; } }

  function evById(id) { return EVENTS.filter(function (x) { return x.id === id; })[0]; }
  function evIxById(id) { var k = -1; EVENTS.forEach(function (x, i) { if (x.id === id) { k = i; } }); return k; }
  function hasVideo(e) { return e.id !== "cricket"; }
  function vName(e) { var TK = e.takeover || {}; return TK.a && TK.b ? TK.a + " v " + TK.b : e.title; }

  /* ---- spoilers ------------------------------------------------------ */

  function hideOn() { return S.hide === null || S.hide === undefined ? lc() === "fulltime" : S.hide; }
  function masked(e) { return hideOn() && !S.revealed[e.id] && evState(e).card.status !== "soon"; }

  function maskCard(e, c) {
    if (!masked(e)) { return c; }
    var m = {}, k;
    for (k in c) { if (c.hasOwnProperty(k)) { m[k] = c[k]; } }
    m.line1 = vName(e);
    m.line2 = "Score hidden";
    m.ctx = c.status === "live" ? "Score hidden. Catch up in 60 seconds, or jump straight in." : "Score hidden. Highlights and the match in 60 seconds are ready.";
    m.hidden = true;
    return m;
  }

  function maskT(e, T) {
    if (!masked(e)) { return T; }
    /* a celebration gives the result away as surely as the score does */
    var NEUTRAL = { football: "fb-xi", cricket: "ck-squad", tennis: "tn-smile", rugby: "rg-squad" };
    return { img: lc() === "fulltime" ? (NEUTRAL[e.id] || T.img) : T.img, line: "v", sub: "Score hidden", stats: [], cta: T.cta, hidden: true };
  }

  function spoilBar() {
    if (!hideOn()) { return ""; }
    return '<div class="spoilbar">' + I.eyeoff + '<span><b>Scores are hidden</b> Catch up first, reveal when you choose</span>' +
      '<button type="button" data-spoil="off">Show all</button></div>';
  }

  function spoilShield(e) {
    var vid = hasVideo(e), R = RECAPS[e.id], L = lc();
    return '<section class="section shield"><div class="shieldin">' +
      '<p class="shk">' + I.eyeoff + 'Score hidden</p>' +
      '<h3>' + (L === "fulltime" ? "Watch it back before you see how it ended" : "Catch up before the score catches you") + '</h3>' +
      '<div class="shbtns">' +
      (R ? '<button class="shbtn pri" type="button" data-recapvid="' + e.id + '">' + I.playtri + 'The match in 60 seconds</button>' : "") +
      (vid ? '<button class="shbtn" type="button" data-watch="' + evIxById(e.id) + '" data-kind="' + (L === "fulltime" ? "highlights" : "live") + '">' + I.playtri + (L === "fulltime" ? "Highlights" : "Watch from here") + '</button>'
        : '<button class="shbtn" type="button" data-watch="' + evIxById(e.id) + '">' + I.headph + (L === "fulltime" ? "The day on TMS" : "Listen on TMS") + '</button>') +
      '<button class="shbtn ghost" type="button" data-reveal="' + e.id + '">' + I.eye + 'Show the score</button>' +
      '</div></div></section>';
  }

  /* ---- reactions ------------------------------------------------------ */

  function likeCount(base, key) {
    if (!S.likes[key]) { return base; }
    var n = Number(String(base).replace(/,/g, ""));
    return isNaN(n) ? base : (n + 1).toLocaleString("en-GB");
  }

  function likeBtn(key, base, cls) {
    var on = !!S.likes[key];
    return '<button class="eng likebtn' + (on ? " on" : "") + (cls ? " " + cls : "") + '" type="button" data-like="' + esc(key) + '" data-base="' + esc(base) + '" aria-pressed="' + on + '" aria-label="Like">' +
      '<span class="lk">' + (on ? I.heartfill : I.heart) + '</span><span class="n">' + esc(likeCount(base, key)) + '</span></button>';
  }

  function engageBar(o) {
    return '<div class="engage">' +
      (o.listen ? '<button class="stlisten" type="button" data-storylisten>' + I.speaker + 'Listen <small>2 min</small></button>' : "") +
      '<button class="eng" type="button" data-sheet="comments" data-ctx="' + esc(o.ctx) + '" data-cbase="' + esc(o.comments) + '" aria-label="Comments">' + I.comment + '<span class="n">' + esc(commentCount(o.ctx, o.comments)) + '</span></button>' +
      likeBtn(o.likeKey, o.likes) +
      '<button class="eng" type="button" data-sheet="share" data-ctx="' + esc(o.ctx) + '" aria-label="Share">' + I.send + '<span class="n">' + esc(o.shares) + '</span></button>' +
      '</div>';
  }

  function commentCount(ctx, base) {
    var mine = (S.myComments[ctx] || []).length;
    if (!mine) { return base; }
    var n = Number(String(base).replace(/,/g, ""));
    return isNaN(n) ? base : (n + mine).toLocaleString("en-GB");
  }

  /* ---- the sheets ----------------------------------------------------- */

  var NICON = { remind: "bell", cricket: "bat", poll: "poll", spark: "spark", goal: "goal", chat: "chat", tv: "tv", tick: "tickplain", play: "playtri" };

  function sheetHTML() {
    var sh = S.sheet;
    if (!sh) { return ""; }
    var out = '<div class="sheetscrim" data-sheetclose></div><div class="sheet s-' + sh.kind + '" role="dialog" aria-label="' + esc(sh.kind) + '">' +
      '<span class="grab"></span>';

    if (sh.kind === "notifs") {
      out += '<div class="shhead"><h2>Notifications</h2><button class="iconbtn" type="button" data-sheetclose aria-label="Close">' + I.close + '</button></div>' +
        '<div class="shbody"><ul class="nlist">' + (NOTIFS[lc()] || []).map(function (n) {
          var e = n[4] ? evById(n[4]) : null, hide = e && masked(e) && (n[0] === "goal" || n[0] === "cricket" || n[0] === "tick");
          return '<li><button type="button" class="nrow"' + (e ? ' data-open="' + evIxById(e.id) + '"' : ' data-sheetclose') + '>' +
            '<span class="nic">' + (I[NICON[n[0]]] || I.bell) + '</span>' +
            '<span class="ntx"><b>' + esc(hide ? e.sport + " · an update" : n[1]) + '</b><span>' + esc(hide ? "Hidden while scores are off" : n[2]) + '</span></span>' +
            '<span class="nwhen">' + esc(n[3]) + '</span></button></li>';
        }).join("") + '</ul>' +
        '<h3 class="shsub">Tell me about</h3><div class="ntypes">' + NOTIFTYPES.map(function (t) {
          var on = S.ntypes[t[0]] === undefined ? t[3] : S.ntypes[t[0]];
          return '<button type="button" class="ntype" data-ntype="' + t[0] + '" aria-pressed="' + on + '">' +
            '<span><b>' + esc(t[1]) + '</b>' + (t[2] ? '<small>' + esc(t[2]) + '</small>' : "") + '</span><i class="sw' + (on ? " on" : "") + '"></i></button>';
        }).join("") + '</div>' +
        '<p class="shnote">Set per sport, per team or per player from anything with a bell on it.</p></div>';
    }

    if (sh.kind === "comments") {
      var sport = commentSport(sh.ctx), list = (COMMENTS[sport] || []).slice(), mine = S.myComments[sh.ctx] || [];
      var title = commentTitle(sh.ctx);
      out += '<div class="shhead"><h2>Comments <small>' + esc(title) + '</small></h2><button class="iconbtn" type="button" data-sheetclose aria-label="Close">' + I.close + '</button></div>' +
        '<div class="shchips"><button type="button" class="shchip" aria-pressed="' + (S.csort !== "new") + '" data-csort="top">Top</button>' +
        '<button type="button" class="shchip" aria-pressed="' + (S.csort === "new") + '" data-csort="new">Newest</button>' +
        '<span class="shrule">House rules apply. Be kind.</span></div>' +
        '<div class="shbody clist">' +
        mine.slice().reverse().map(function (c, k) {
          return commentRow(["A", "Arun", "now", c, "0"], "me:" + sh.ctx + ":" + k, true);
        }).join("") +
        (S.csort === "new" ? list : list.slice().sort(function (a, b) { return Number(b[4]) - Number(a[4]); })).map(function (c, k) {
          return commentRow(c, "c:" + sport + ":" + c[0] + k, false);
        }).join("") + '</div>' +
        '<form class="composer" data-compose="' + esc(sh.ctx) + '"><span class="meav sm">A</span>' +
        '<input type="text" name="c" maxlength="280" placeholder="Add a comment" aria-label="Add a comment" autocomplete="off">' +
        '<button type="submit">Post</button></form>';
    }

    if (sh.kind === "voices") {
      var ve = evById(sh.ctx) || ev();
      out += '<div class="shhead"><h2>Listen to <small>' + esc(vName(ve)) + '</small></h2><button class="iconbtn" type="button" data-sheetclose aria-label="Close">' + I.close + '</button></div>' +
        '<div class="shbody">' + voiceRows(ve) + '<p class="shnote">Every voice is held back to match your picture, so nobody calls a goal before you see it.</p></div>';
    }

    if (sh.kind === "share") {
      var sc = shareCard(sh.ctx);
      out += '<div class="shhead"><h2>Share</h2><button class="iconbtn" type="button" data-sheetclose aria-label="Close">' + I.close + '</button></div>' +
        '<div class="shbody"><div class="scard' + (S.shareAsCard ? " big" : "") + '">' +
        '<span class="scimg">' + imgTag(sc.img, "", "wide") + '<span class="scveil"></span>' +
        '<span class="scmark"><span class="bbcblocks"><i>B</i><i>B</i><i>C</i></span> SPORT</span>' +
        (S.shareAsCard ? '<span class="scbig"><small>' + esc(sc.kick) + '</small>' + esc(sc.big) + '</span>' : "") + '</span>' +
        '<span class="sctext"><b>' + esc(sc.title) + '</b><span>' + esc(sc.url) + '</span></span></div>' +
        '<button type="button" class="ntype" data-sharecard aria-pressed="' + !!S.shareAsCard + '"><span><b>Share as a picture</b><small>' +
        (masked(evById(sc.sport) || EVENTS[0]) ? "Spoiler-free while scores are hidden" : "With the score, for the group chat") + '</small></span><i class="sw' + (S.shareAsCard ? " on" : "") + '"></i></button>' +
        '<div class="targets">' + [["msg", "Messages"], ["chat", "WhatsApp"], ["camera", "Instagram"], ["mail", "Email"], ["link", "Copy link"], ["more", "More"]].map(function (t) {
          return '<button type="button" class="tgt" data-sharego="' + esc(t[1]) + '"><span>' + (I[t[0]] || "") + '</span>' + esc(t[1]) + '</button>';
        }).join("") + '</div></div>';
    }
    return out + '</div>';
  }

  function commentRow(c, key, mine) {
    return '<div class="crow' + (mine ? " mine" : "") + '"><span class="wcav">' + esc(c[0]) + '</span><div>' +
      '<p class="wcmeta"><b>' + esc(c[1]) + '</b> · ' + esc(c[2]) + '</p><p class="wctext">' + esc(c[3]) + '</p>' +
      '<p class="wcact">' + likeBtn(key, c[4], "sm") +
      '<button type="button" data-toast="Replies open a thread. Not built out in this prototype.">Reply</button></p></div></div>';
  }

  function commentSport(ctx) {
    if (COMMENTS[ctx]) { return ctx; }
    if (ctx && ctx.indexOf("story") === 0) { return (HOMEFEED.hero[lc()] || {}).sport || "tennis"; }
    if (ARTICLES[ctx]) { return ARTICLES[ctx].sport || "tennis"; }
    return ev().id;
  }
  function commentTitle(ctx) {
    if (ARTICLES[ctx]) { return ARTICLES[ctx].kicker; }
    if (ctx && ctx.indexOf("story") === 0) { return (HOMEFEED.hero[lc()] || {}).kicker || ""; }
    var e = evById(ctx) || ev();
    return vName(e);
  }

  function shareCard(ctx) {
    var a = ARTICLES[ctx], e;
    if (a) { return { img: a.hero, title: a.title, url: "bbc.co.uk/sport/articles/" + ctx, kick: a.kicker, big: a.title, sport: a.sport }; }
    if (ctx && ctx.indexOf("story") === 0) {
      var h = heroFor();
      return { img: (h.photo && h.photo.img) || "tn-stretch", title: h.head, url: "bbc.co.uk/sport/live", kick: h.kicker, big: h.head, sport: h.sport };
    }
    e = evById(ctx) || ev();
    var tk = tkFor(e), T = tk.T;
    return { img: T.img || "tn-stretch", title: vName(e) + (T.hidden ? "" : " · " + (T.line || "")), url: "bbc.co.uk/sport/" + e.id + "/live",
      kick: e.comp, big: T.hidden || masked(e) ? vName(e) : (tk.TK.a + " " + (T.line || "v") + " " + tk.TK.b), sport: e.id };
  }

  /* ---- articles and the programme reader ----------------------------- */

  function articleHTML() {
    var a = ARTICLES[S.article];
    if (!a) { return ""; }
    var heroSlot = SLOTS[a.hero] && SLOTS[a.hero].indexOf("full") >= 0 ? "full" : "wide";
    return '<div class="article" role="dialog" aria-label="Article">' +
      '<div class="arbar"><button class="iconbtn" type="button" data-closearticle aria-label="Back">' + I.back + '</button>' +
      '<span class="arkick">' + esc(a.kicker) + '</span>' +
      '<button class="iconbtn" type="button" data-sheet="share" data-ctx="' + esc(S.article) + '" aria-label="Share">' + I.share + '</button></div>' +
      '<div class="arscroll"><figure class="arhero">' + fullImg(a.hero, a.heroCap, heroSlot) + '<figcaption>' + esc(a.heroCap) + '</figcaption></figure>' +
      '<div class="arbody"><p class="arkicker">' + esc(a.kicker) + '</p><h1>' + esc(a.title) + '</h1>' +
      '<p class="arby">' + esc(a.byline) + ' · ' + esc(a.read) + '</p>' +
      a.blocks.map(function (b) {
        if (b[0] === "p") { return '<p>' + esc(b[1]) + '</p>'; }
        if (b[0] === "h") { return '<h2>' + esc(b[1]) + '</h2>'; }
        if (b[0] === "img") {
          var full = SLOTS[b[1]] && SLOTS[b[1]].indexOf("full") >= 0;
          return '<figure class="arfig' + (full ? " whole" : "") + '">' + fullImg(b[1], b[2], full ? "full" : "wide") + '<figcaption>' + esc(b[2]) + '</figcaption></figure>';
        }
        return "";
      }).join("") +
      (S.article === "w100" ? '<button class="feat compact" type="button" data-reader="0"><span class="fimg">' + imgTag("ar-mag93", "", "square") + '</span>' +
        '<span class="ftx"><small>Read</small><b>Leaf through the programmes</b><span>Six pages from 1937 to 1999</span></span></button>' : "") +
      '</div></div>' +
      '<div class="arfoot">' + engageBar({ ctx: S.article, comments: a.comments, likes: a.likes, shares: a.shares, likeKey: "art:" + S.article }) + '</div>' +
      '</div>';
  }

  function fullImg(slug, alt, slot) {
    USED[slug] = (USED[slug] || 0) + 1;
    return '<img class="photo" src="img/' + slug + '-' + (slot === "full" ? "full" : slotFor(slug, slot)) + '.jpg" alt="' + esc(alt || "") + '" loading="lazy">';
  }

  function readerHTML() {
    if (S.reader === null || S.reader === undefined) { return ""; }
    return '<div class="reader" role="dialog" aria-label="The programmes">' +
      '<div class="rdbar"><span><b>The programmes</b><small>Wimbledon on the BBC</small></span>' +
      '<button class="iconbtn" type="button" data-readerclose aria-label="Close">' + I.close + '</button></div>' +
      '<div class="rdpages" data-rdpages>' + READER.map(function (pg, k) {
        return '<figure class="rdpage" data-pg="' + k + '"><div class="rdimg">' + fullImg(pg[0], pg[2], "full") + '</div>' +
          '<figcaption><b>' + esc(pg[1]) + '</b>' + esc(pg[2]) + '</figcaption></figure>';
      }).join("") + '</div>' +
      '<div class="rddots">' + READER.map(function (pg, k) { return '<i class="' + (k === S.reader ? "on" : "") + '"></i>'; }).join("") + '</div>' +
      '<p class="rdnote">Swipe to turn the page</p></div>';
  }

  /* ---- the companion nudge -------------------------------------------- */

  function pushHTML() {
    var p = S.push;
    if (!p) { return ""; }
    return '<div class="push' + (p.out ? " out" : "") + '" role="status">' +
      '<div class="pushtop"><span class="pushapp"><span class="bbcblocks mini"><i>B</i><i>B</i><i>C</i></span></span>' +
      '<span class="pushsrc">BBC SPORT · now</span><button type="button" class="pushx" data-pushclose aria-label="Dismiss">' + I.close + '</button></div>' +
      '<b>' + esc(p.title) + '</b><p>' + esc(p.body) + '</p>' +
      '<div class="pushbtns">' + p.actions.map(function (a) {
        return '<button type="button" data-pushact="' + esc(a[0]) + '">' + esc(a[1]) + '</button>';
      }).join("") + '</div></div>';
  }

  function sendCompanionPush() {
    if (S.surface === "tv" || S.surface === "web" || lc() !== "companion") { return; }
    S.push = { title: "Worth a switch: Court 2",
      body: "Your living room TV is on Centre Court. Raducanu has three break points on Court 2.",
      actions: [["switchtv", "Put Court 2 on the TV"], ["watchhere", "Watch on this phone"]] };
    refreshOverlays();
    clearTimeout(S.pushT);
    S.pushT = setTimeout(function () { if (S.push) { S.push.out = true; refreshOverlays(); setTimeout(function () { S.push = null; refreshOverlays(); }, 450); } }, 9000);
  }

  function watchBar() {
    if (lc() !== "companion") { return ""; }
    var tn = evIxById("tennis"), onC2 = tvs().c2;
    return '<button class="watchbar" type="button" data-open="' + tn + '">' +
      '<span class="wbic">' + I.tv + '</span><span class="wbtx"><small>Watching on iPlayer · Living room TV</small>' +
      '<b>' + (onC2 ? "Court 2 · Raducanu v Vondroušová" : "BBC One · Centre Court, Alcaraz v Musetti") + '</b></span>' +
      '<span class="wbchip">' + I.livedot + 'Paired</span></button>';
  }

  /* ---- video, or radio where there are no pictures -------------------- */

  var CK_TRANSCRIPT = [
    ["89.1", "Starc to Root, back of a length, defended to cover. No run."],
    ["89.2", "Full and straight, clipped off the pads to square leg for a single."],
    ["89.3", "Starc over the wicket to Woakes. Leaves it alone outside off."],
    ["89.4", "Short, and Woakes sways out of the way. The crowd lets Starc know about it."],
    ["89.5", "Pitched up, edged, and it falls short of second slip. Woakes survives."],
    ["89.6", "Driven firmly to mid-off. End of the over. England 284-6."],
    ["90.1", "Lyon into the attack. Root comes down the pitch and drives to long-on for one."],
    ["90.2", "Flighted, Woakes pats it back to the bowler."]
  ];

  function vidStart(o) {
    var prev = S.vid && S.vid.kind === "live" ? S.vid : null;
    S.vid = { id: o.id || null, kind: o.kind || "live", mode: o.mode || "full", play: true, t: 0, cc: S.vid ? S.vid.cc : false,
      aud: S.vid ? S.vid.aud : (S.webAud || "bbc"), stats: S.vid ? S.vid.stats : false, title: o.title || null, img: o.img || null, dur: o.dur || 0, ix: 0, archive: !!o.archive,
      back: o.kind && o.kind !== "live" ? prev : null, line: 0 };
    stopDock();
  }

  function vidEvent() { return S.vid && S.vid.id ? evById(S.vid.id) : null; }

  function vidInfo() {
    var v = S.vid, e = vidEvent(), tk = e ? tkFor(e) : null;
    var info = { img: v.img, label: v.title, chan: "", live: v.kind === "live", audio: false, cap: "" };
    if (v.kind === "live" && e) {
      info.audio = !hasVideo(e);
      info.img = v.img || (tk.T.img || null);
      info.label = v.title || (e.id === "tennis" ? "Court 2 · " + vName(e) : vName(e));
      info.chan = info.audio ? "Test Match Special" : e.id === "tennis" ? "BBC iPlayer" : "BBC One";
      var tm = TVMOMENTS[e.id] || [], m = tm[v.line % Math.max(1, tm.length)];
      info.cap = m ? m[1] + ". " + m[2] : "";
    } else if (v.kind === "recap" && e) {
      var R = RECAPS[e.id], mo = R.moments[Math.min(v.ix, R.moments.length - 1)];
      info.img = mo[3] || (tk.T.img || null);
      info.label = "The match in 60 seconds";
      info.chan = e.sport;
      info.cap = mo[0] + " · " + mo[1] + ". " + mo[2];
    } else if (v.kind === "highlights" && e) {
      info.img = v.img || (tk.T.img || null);
      info.label = "Highlights · " + vName(e);
      info.chan = "BBC iPlayer";
      info.cap = "Extended highlights with commentary";
    } else {
      info.chan = v.archive ? "BBC Archive" : "BBC iPlayer";
      info.cap = v.title;
    }
    return info;
  }

  function vidDur() {
    var v = S.vid;
    if (v.kind === "recap") { var R = RECAPS[v.id]; return R.moments.length * 4; }
    if (v.kind === "highlights") { return 11 * 60 + 20; }
    return secs(v.dur || "0:40");
  }

  /* ---- the voice over the picture ------------------------------------ */

  function voiceList(e) { return (e && VOICES[e.id]) || []; }
  function voiceOf(e) {
    var list = voiceList(e), id = S.vid ? S.vid.aud : (S.webAud || "bbc");
    return list.filter(function (x) { return x[0] === id; })[0] || list[0];
  }
  function voiceAv(vo, cls) {
    return vo && vo[5] ? '<span class="vav' + (cls ? " " + cls : "") + '" style="background:' + vo[6] + '">' + esc(vo[5]) + '</span>'
      : '<span class="vav ic' + (cls ? " " + cls : "") + '">' + (vo && vo[0] === "crowd" ? I.speaker : vo && vo[0] === "ad" ? I.cc : I.headph) + '</span>';
  }
  function voiceChip(e, fs) {
    var vo = voiceOf(e);
    if (!vo) { return ""; }
    return '<button class="vvoice" type="button" ' + (fs ? "data-fsvoices" : 'data-sheet="voices" data-ctx="' + e.id + '"') + ' aria-label="Change commentary">' +
      voiceAv(vo) + '<span><small>' + (vo[4] === "Watch with" || vo[4] === "Listen with" ? "Watching with" : "Commentary") + '</small>' + esc(vo[1]) + '</span>' + I.chevron + '</button>';
  }
  function voiceRows(e) {
    var cur = voiceOf(e), groups = [];
    voiceList(e).forEach(function (v) { if (groups.indexOf(v[4]) < 0) { groups.push(v[4]); } });
    return groups.map(function (g) {
      return '<h3 class="shsub">' + esc(g) + '</h3>' + voiceList(e).filter(function (v) { return v[4] === g; }).map(function (v) {
        var on = cur && cur[0] === v[0];
        return '<button type="button" class="vrow' + (on ? " on" : "") + '" data-voice="' + v[0] + '" data-ev="' + e.id + '">' + voiceAv(v, "lg") +
          '<span class="vrtx"><b>' + esc(v[2]) + '</b><small>' + esc(v[3]) + '</small></span>' + (on ? '<i>' + I.tickplain + '</i>' : "") + '</button>';
      }).join("");
    }).join("");
  }

  /* ---- controls shared by the page player and full screen ------------ */

  function vidControls(v, inf, e, fs) {
    var live = inf.live, dur = vidDur();
    return '<div class="vctl">' +
      '<button class="vpp" type="button" data-vidplay aria-label="' + (v.play ? "Pause" : "Play") + '">' + (v.play ? I.pause : I.play) + '</button>' +
      (live ? '<span class="vlivepill"><i></i>LIVE</span>' : '<span class="vclock" data-vtime>' + mmss(Math.floor(v.t)) + " / " + mmss(dur) + '</span>') +
      '<span class="vsp"></span>' +
      (live && e ? voiceChip(e, fs) : "") +
      '<button class="vic" type="button" data-vidcc aria-pressed="' + v.cc + '" aria-label="Subtitles">' + I.cc + '</button>' +
      (fs && live && e ? '<button class="vic" type="button" data-vidstats aria-pressed="' + !!v.stats + '" aria-label="Stats">' + I.poll + '</button>' : "") +
      '<button class="vic" type="button" data-vidfs aria-label="' + (fs ? "Exit full screen" : "Full screen") + '">' + (fs ? I.shrink : I.expand) + '</button>' +
      '</div>' +
      '<span class="vprog' + (live ? " live" : "") + '"><i style="width:' + (live ? 100 : Math.min(100, v.t / dur * 100)).toFixed(1) + '%"></i></span>';
  }

  function vidPane() {
    var v = S.vid;
    if (!v || v.mode !== "full") { return ""; }
    var inf = vidInfo(), e = vidEvent();
    if (inf.audio) {
      var tl = CK_TRANSCRIPT.slice(0, 3 + (v.line % (CK_TRANSCRIPT.length - 2)));
      return '<div class="vid audio" data-vidpane>' +
        '<div class="vidimg dim">' + imgTag("ck-mic", "", "wide") + '</div><span class="vidveil"></span>' +
        '<div class="vtop"><span class="vlive"><i></i>LIVE</span><span class="vchan">' + esc(voiceOf(e) ? voiceOf(e)[2] : "Test Match Special") + '</span><span class="vsp"></span>' +
        '<button class="vbtn" type="button" data-vidmin aria-label="Shrink">' + I.shrink + '</button></div>' +
        '<div class="vaud"><span class="vwave">' + waveSVG("rcpwave on") + '</span>' +
        '<p class="vnote">Radio and live text only. The BBC does not hold the pictures for this series.</p></div>' +
        vidControls(v, inf, e, false) + '</div>' +
        (v.cc ? '<div class="vtrans" aria-live="polite"><p class="vtk">Live transcript · Test Match Special</p>' + tl.slice(-3).map(function (l, k, a) {
          return '<p class="' + (k === a.length - 1 ? "now" : "") + '"><b>' + esc(l[0]) + '</b>' + esc(l[1]) + '</p>';
        }).join("") + '</div>' : "");
    }
    var live = inf.live;
    return '<div class="vid' + (v.archive ? " archive" : "") + '" data-vidpane>' +
      '<div class="vidimg' + (v.play ? " kb" : "") + '">' + (inf.img ? imgTag(inf.img, inf.label || "", "wide") : "") + '</div><span class="vidveil"></span>' +
      '<div class="vtop">' + (live ? '<span class="vlive"><i></i>LIVE</span>' : '<span class="vclip">' + (v.kind === "recap" ? "CATCH-UP" : v.archive ? "ARCHIVE" : "CLIP") + '</span>') +
      '<span class="vchan">' + esc(inf.chan) + '</span><span class="vsp"></span>' +
      (live && e && watchingFor(e) ? '<span class="vwatch">' + esc(watchingFor(e)) + '</span>' : "") +
      '<button class="vbtn" type="button" data-vidmin aria-label="Shrink the video">' + I.shrink + '</button>' +
      (v.kind !== "live" ? '<button class="vbtn" type="button" data-vidclose aria-label="Close">' + I.close + '</button>' : "") + '</div>' +
      '<p class="vlabel">' + esc(inf.label || "") + '</p>' +
      (v.cc && inf.cap ? '<p class="vcap">' + esc(inf.cap) + '</p>' : "") +
      vidControls(v, inf, e, false) + '</div>';
  }

  /* ---- full screen: turned on its side on the phone -------------------- */

  function fsHTML() {
    var v = S.vid;
    if (!v || v.mode !== "fs") { return ""; }
    var inf = vidInfo(), e = vidEvent(), tk = e ? tkFor(e) : null, TK = tk ? tk.TK : {}, T = tk ? tk.T : {};
    var bug = e && inf.live ? '<div class="fsbug"><span class="fsbn"><i style="background:' + TK.ca + '"></i>' + esc(TK.a || "") + '</span>' +
      '<b>' + esc(T.hidden ? "v" : (T.line || "v")) + '</b><span class="fsbn">' + esc(TK.b || "") + '<i style="background:' + TK.cb + '"></i></span></div>' +
      '<p class="fssub">' + esc(T.hidden ? "Score hidden" : (T.sub || "")) + '</p>' : '<p class="fstitle">' + esc(inf.label || "") + '</p>';
    var body = inf.audio
      ? '<div class="vidimg dim">' + imgTag("ck-mic", "", "wide") + '</div><span class="vidveil"></span>' +
        '<div class="fsaud"><span class="vwave">' + waveSVG("rcpwave on") + '</span>' +
        CK_TRANSCRIPT.slice(0, 3 + (v.line % (CK_TRANSCRIPT.length - 2))).slice(-3).map(function (l, k, a) {
          return '<p class="' + (k === a.length - 1 ? "now" : "") + '"><b>' + esc(l[0]) + '</b>' + esc(l[1]) + '</p>';
        }).join("") + '</div>'
      : '<div class="vidimg' + (v.play ? " kb" : "") + (v.archive ? " arch" : "") + '">' + (inf.img ? imgTag(inf.img, inf.label || "", "wide") : "") + '</div><span class="vidveil"></span>';
    var vpEl = $("#viewport"), wideVP = vpEl && vpEl.clientWidth > vpEl.clientHeight;
    var lay = S.surface === "web" || wideVP ? "" : v.land ? " rot" : " port";
    var port = lay === " port";
    return '<div class="vfs' + lay + '" role="dialog" aria-label="Full screen">' + body +
      '<div class="fstop"><div class="fsl">' + (inf.live ? '<span class="vlive"><i></i>LIVE</span>' : '<span class="vclip">' + (v.kind === "recap" ? "CATCH-UP" : "CLIP") + '</span>') +
      '<span class="vchan">' + esc(inf.chan) + '</span></div>' + bug + '<span class="vsp"></span>' +
      (inf.live && e && watchingFor(e) ? '<span class="vwatch">' + esc(watchingFor(e)) + ' watching</span>' : "") +
      (S.surface !== "web" ? '<button class="vic" type="button" data-vidrot aria-pressed="' + !!v.land + '" aria-label="' + (v.land ? "Hold upright" : "Turn to landscape") + '">' + I.rotate + '</button>' : "") + '</div>' +
      (port && e && inf.live
        /* held upright, the space under the picture is used: what you are
           listening to, or the numbers, with the tabs staying put */
        ? '<div class="fspanel"><div class="fstabs" role="tablist">' +
          '<button type="button" role="tab" data-fstab="voices" aria-selected="' + (v.fsTab !== "stats") + '">' + I.headph + 'Listen to</button>' +
          (T.hidden ? "" : '<button type="button" role="tab" data-fstab="stats" aria-selected="' + (v.fsTab === "stats") + '">' + I.poll + 'In numbers</button>') + '</div>' +
          '<div class="fsbody">' + (v.fsTab === "stats" && !T.hidden ? statBars(TK, T) : voiceRows(e)) + '</div></div>'
        : (v.stats && e && inf.live && !T.hidden ? '<aside class="fsstats"><p class="vtk">In numbers</p>' + statBars(TK, T) + '</aside>' : "") +
          (v.fsVoices && e ? '<aside class="fsvoices"><p class="vtk">Listen to</p>' + voiceRows(e) + '</aside>' : "")) +
      (v.cc && inf.cap && !inf.audio ? '<p class="vcap">' + esc(inf.cap) + '</p>' : "") +
      '<div class="fsbot">' + vidControls(v, inf, e, true) + '</div></div>';
  }

  function redrawKeepingMenu() {
    var d = $("#drawer"), open = d && d.classList.contains("open"), y = d ? d.scrollTop : 0;
    render();
    if (!open) { return; }
    var d2 = $("#drawer"), sc = $("#scrim"), bg = $("#burger");
    if (!d2) { return; }
    d2.classList.add("noanim"); if (sc) { sc.classList.add("noanim"); }
    d2.classList.add("open"); if (sc) { sc.classList.add("open"); }
    d2.setAttribute("aria-hidden", "false"); if (bg) { bg.setAttribute("aria-expanded", "true"); }
    wireDrawer();
    d2.scrollTop = y;
    void d2.offsetWidth;
    requestAnimationFrame(function () { d2.classList.remove("noanim"); if (sc) { sc.classList.remove("noanim"); } });
  }

  function onPhone() { return window.matchMedia && window.matchMedia("(pointer: coarse)").matches && Math.min(window.innerWidth, window.innerHeight) <= 500; }

  function nativeFS(on, then) {
    if (!onPhone() || S.surface === "web") { if (then) { then(); } return; }
    var el = $("#device");
    try {
      if (on && !document.fullscreenElement && el && el.requestFullscreen) {
        el.requestFullscreen().then(function () { if (then) { then(); } }).catch(function () { if (then) { then(); } });
        return;
      }
      if (!on && document.fullscreenElement) {
        if (screen.orientation && screen.orientation.unlock) { try { screen.orientation.unlock(); } catch (x) {} }
        document.exitFullscreen();
      }
    } catch (x) {}
    if (then) { then(); }
  }

  /* turning the phone, or leaving fullscreen with the back gesture, redraws */
  window.addEventListener("resize", function () { if (S.vid && S.vid.mode === "fs") { refreshOverlays(); } });
  document.addEventListener("fullscreenchange", function () {
    if (!document.fullscreenElement && S.vid && S.vid.mode === "fs" && onPhone()) { S.vid.mode = "full"; S.vid.land = false; render(); }
  });

  function sizeFS() {
    /* sized in CSS against the overlay layer, which always matches the screen */
  }

  /* ---- ask the experts ------------------------------------------------- */

  P.pundits = function (p) {
    var d = PUNDITS[p.id];
    if (!d) { return ""; }
    var e = evById(p.id), ix = evIxById(p.id), mine = (S.myQs[p.id] || []);
    return '<div class="pund">' +
      '<div class="rail phosts">' + d.hosts.map(function (h) {
        var on = /now|along/i.test(h[3]);
        return '<div class="phost"><span class="phav" style="background:' + h[4] + '">' + esc(h[0]) + '</span>' +
          '<b>' + esc(h[1]) + '</b><small>' + esc(h[2]) + '</small>' +
          '<span class="pstat' + (on ? " on" : "") + '">' + (on ? "<i></i>" : "") + esc(h[3]) + '</span>' +
          (h[5] && lc() !== "fulltime" ? '<button class="pbtn" type="button" data-watchwith="' + h[5] + '" data-ev="' + ix + '">' + (hasVideo(e) ? I.playtri + "Watch with" : I.headph + "Listen with") + '</button>'
            : '<button class="pbtn ghost" type="button" data-follow aria-pressed="false">Follow</button>') + '</div>';
      }).join("") + '</div>' +
      '<form class="pask" data-askq="' + p.id + '"><span class="meav sm">A</span><input type="text" maxlength="200" placeholder="Ask the experts a question" aria-label="Ask a question" autocomplete="off"><button type="submit">Ask</button></form>' +
      '<p class="pnote">The questions with the most votes are put to the studio. You get a notification if yours is answered.</p>' +
      '<div class="pqs">' + mine.slice().reverse().map(function (q) {
        return '<div class="pq mine"><div><b>' + esc(q) + '</b><small>You · just now · sent to the studio</small></div><span class="votebtn on">' + I.chevron + '1</span></div>';
      }).join("") + d.qs.map(function (q, k) {
        var key = "q:" + p.id + ":" + k, on = !!S.likes[key];
        return '<div class="pq"><div><b>' + esc(q[0]) + '</b><small>' + esc(q[1]) + '</small></div>' +
          '<button type="button" class="votebtn' + (on ? " on" : "") + '" data-vote="' + key + '" data-base="' + esc(q[2]) + '" aria-pressed="' + on + '" aria-label="Vote for this question">' + I.chevron + '<span class="n">' + esc(on ? bump(q[2]) : q[2]) + '</span></button></div>';
      }).join("") + '</div>' +
      '<h3 class="psub">Answered on air</h3><div class="bites">' + d.answered.map(function (a, k) {
        return '<button class="bite" type="button" data-bite="' + k + '" data-title="' + esc(a[0] + ": " + a[1].toLowerCase()) + '" data-dur="' + esc(a[2]) + '" data-desc="' + esc(a[1] + ". The answer as it went out, from the programme.") + '">' +
          '<span class="bplay">' + I.playtri + '</span><span class="btx"><b>' + esc(a[0]) + '</b><span>' + esc(a[1]) + '</span></span><span class="bdur">' + esc(a[2]) + '</span></button>';
      }).join("") + '</div></div>';
  };

  function bump(n) {
    var m = String(n).match(/^([\d.]+)(k?)$/);
    if (!m) { return n; }
    return m[2] ? n : String(Number(m[1]) + 1);
  }

  function seedPundits() {
    EVENTS.forEach(function (e) {
      if (!PUNDITS[e.id]) { return; }
      ["live", "companion", "fulltime"].forEach(function (st) {
        var s = e.states[st];
        if (!s || !s.tabs || !s.tabs[0]) { return; }
        var sec = s.tabs[0].sections;
        if (sec.some(function (x) { return x.panels && x.panels.some(function (pn) { return pn.t === "pundits"; }); })) { return; }
        var at = sec.length;
        sec.forEach(function (x, i) { if (x.panels && x.panels.some(function (pn) { return pn.t === "recap"; })) { at = i + 1; } });
        sec.splice(at, 0, { h: st === "fulltime" ? "From the studio" : "Ask the experts", meta: st === "fulltime" ? "Answered on air" : "Live Q&A", panels: [{ t: "pundits", id: e.id }] });
      });
    });
  }

  function wireV12(root) {
    $$("[data-vidfs]", root).forEach(function (b) {
      b.onclick = function (ev2) {
        ev2.stopPropagation();
        var v = S.vid;
        if (v.mode === "fs") {
          v.fsVoices = false;
          nativeFS(false);
          if (S.surface === "web") { S.vid = null; S.webPlay = true; } else { v.mode = "full"; }
        } else { v.mode = "fs"; nativeFS(true); }
        render();
      };
    });
    $$("[data-vidrot]", root).forEach(function (b) {
      b.onclick = function () {
        S.vid.land = !S.vid.land;
        /* on a real phone, turn the screen itself; the drawn rotation is for desks */
        if (onPhone() && screen.orientation && screen.orientation.lock) {
          if (S.vid.land) {
            nativeFS(true, function () {
              screen.orientation.lock("landscape").then(function () { S.vid.land = false; refreshOverlays(); }).catch(function () {});
            });
          } else { try { screen.orientation.unlock(); } catch (x) {} }
        }
        refreshOverlays(); sizeFS();
      };
    });
    $$("[data-fstab]", root).forEach(function (b) { b.onclick = function () { S.vid.fsTab = b.dataset.fstab; refreshOverlays(); }; });
    $$("[data-vidstats]", root).forEach(function (b) {
      b.onclick = function () { if ($(".vfs.port")) { S.vid.fsTab = "stats"; } else { S.vid.stats = !S.vid.stats; S.vid.fsVoices = false; } refreshOverlays(); };
    });
    $$("[data-fsvoices]", root).forEach(function (b) {
      b.onclick = function () { if ($(".vfs.port")) { S.vid.fsTab = "voices"; } else { S.vid.fsVoices = !S.vid.fsVoices; S.vid.stats = false; } refreshOverlays(); };
    });
    $$("[data-voice]", root).forEach(function (b) {
      b.onclick = function () {
        var e = evById(b.dataset.ev), vo = voiceList(e).filter(function (x) { return x[0] === b.dataset.voice; })[0];
        if (S.surface === "web" && !(S.vid && S.vid.mode === "fs")) {
          S.webAud = b.dataset.voice; S.sheet = null; S.webPlay = true; render();
          toast("Now listening to " + vo[2] + ". The picture carries on where it was."); return;
        }
        if (!S.vid || S.vid.id !== e.id) { watchEvent(evIxById(e.id), "live"); }
        S.vid.aud = b.dataset.voice; S.vid.fsVoices = false; S.sheet = null;
        if (S.vid.mode === "fs") { refreshOverlays(); } else { refreshVid(); refreshOverlays(); }
        toast("Now listening to " + vo[2] + ". The picture carries on where it was.");
      };
    });
    $$("[data-watchwith]", root).forEach(function (b) {
      b.onclick = function () {
        var ix = Number(b.dataset.ev);
        watchEvent(ix, "live");
        S.vid.aud = b.dataset.watchwith;
        refreshVid();
        var vo = voiceOf(EVENTS[ix]);
        toast("Watching with " + vo[2] + ".");
      };
    });
    $$("[data-vote]", root).forEach(function (b) {
      b.onclick = function () {
        var k = b.dataset.vote, on = !S.likes[k];
        S.likes[k] = on;
        b.classList.toggle("on", on); b.setAttribute("aria-pressed", String(on));
        $(".n", b).textContent = on ? bump(b.dataset.base) : b.dataset.base;
      };
    });
    $$("[data-askq]", root).forEach(function (f) {
      f.onsubmit = function (ev2) {
        ev2.preventDefault();
        var inp = f.querySelector("input"), txt = inp.value.trim();
        if (!txt) { inp.focus(); return; }
        (S.myQs[f.dataset.askq] = S.myQs[f.dataset.askq] || []).push(txt);
        rerenderBody();
        toast("Sent to the studio. We'll tell you if it's answered on air.");
      };
    });
    sizeFS();
  }

  function pipHTML() {
    var v = S.vid;
    if (!v || v.mode !== "pip") { return ""; }
    var inf = vidInfo();
    return '<div class="pip' + (inf.audio ? " audio" : "") + '"><button type="button" class="pipimg" data-vidgrow aria-label="Make the video bigger">' +
      (inf.audio ? imgTag("ck-mic", "", "wide") + '<span class="pipwave">' + waveSVG("rcpwave on") + '</span>' : (inf.img ? imgTag(inf.img, "", "wide") : "")) +
      (inf.live ? '<span class="vlive sm"><i></i>LIVE</span>' : "") + '</button>' +
      '<span class="piptx"><b>' + esc(inf.audio ? "Test Match Special" : inf.label || "") + '</b><small>' + esc(inf.chan) + '</small></span>' +
      '<button type="button" class="pipb" data-vidplay aria-label="' + (v.play ? "Pause" : "Play") + '">' + (v.play ? I.pause : I.play) + '</button>' +
      '<button type="button" class="pipb" data-vidclose aria-label="Close">' + I.close + '</button></div>';
  }

  function tickVid(dt) {
    var v = S.vid;
    if (!v || !v.play) { return; }
    v.t += dt;
    var live = v.kind === "live";
    if (live) {
      if (Math.floor(v.t / 6) !== v.line) { v.line = Math.floor(v.t / 6); if (v.cc || !hasVideo(vidEvent() || EVENTS[0])) { refreshVid(); } }
      return;
    }
    if (v.kind === "recap") {
      var R = RECAPS[v.id], k = Math.floor(v.t / 4);
      if (k >= R.moments.length) { vidEnd(); return; }
      if (k !== v.ix) { v.ix = k; refreshVid(); return; }
    } else if (v.t >= vidDur()) { vidEnd(); return; }
    var bar = $(".vprog i"), tm = $("[data-vtime]");
    if (bar) { bar.style.width = Math.min(100, v.t / vidDur() * 100).toFixed(1) + "%"; }
    if (tm) { tm.textContent = mmss(Math.floor(v.t)) + " / " + mmss(vidDur()); }
  }

  function vidEnd() {
    var v = S.vid;
    if (v.kind === "recap" && v.id) { S.revealed[v.id] = true; toast("That is where it stands. Scores are showing for this match."); }
    S.vid = v.back || null;
    render();
  }

  function refreshVid() {
    var pane = $("[data-vidpane]");
    if (S.vid && S.vid.mode === "fs") { refreshOverlays(); return; }
    if (pane && S.vid && S.vid.mode === "full") {
      var holder = document.createElement("div");
      holder.innerHTML = vidPane();
      var trans = pane.nextElementSibling && pane.nextElementSibling.classList.contains("vtrans") ? pane.nextElementSibling : null;
      if (trans) { trans.remove(); }
      pane.replaceWith.apply(pane, [].slice.call(holder.childNodes));
      wireNew($("#viewport") || document);
    } else { refreshOverlays(); }
  }

  /* ---- panels --------------------------------------------------------- */

  function heat(sig) {
    var n = sig >= 0.85 ? 4 : sig >= 0.6 ? 3 : sig >= 0.35 ? 2 : 1;
    var word = n === 4 ? "Hot right now" : n === 3 ? "Heating up" : n === 2 ? "Steady" : "Quiet";
    return '<span class="heat h' + n + '"><span class="hbars"><i></i><i></i><i></i><i></i></span>' + word + '</span>';
  }

  P.courts = function (p) {
    var rows = p.rows.slice().sort(function (a, b) { return b[3] - a[3]; });
    var tn = evIxById("tennis");
    return '<div class="courtlist">' + rows.map(function (r, i) {
      var top = i === 0;
      return '<div class="court' + (top ? " top" : "") + '">' +
        '<span class="cname">' + esc(r[0]) + '</span>' + heat(r[3]) +
        '<span class="cmatch">' + esc(r[1]) + '</span>' +
        '<span class="cstate">' + esc(r[2]) + '</span>' +
        '<span class="cacts"><button type="button" class="cbtn pri" data-watch="' + tn + '" data-court="' + esc(r[0] + " · " + r[1].replace(" (on your telly)", "")) + '">' + I.playtri + 'Watch</button>' +
        '<button type="button" class="cbtn" data-listenlive="' + tn + '">' + I.speaker + 'Listen</button></span></div>';
    }).join("") + '</div>';
  };

  P.clips = function (p) {
    return '<div class="rail cliprail">' + p.items.map(function (c) {
      return '<button class="clip' + (p.archive ? " archive" : "") + '" type="button" data-clip="' + esc(c[2]) + '" data-title="' + esc(c[0]) + '" data-dur="' + esc(c[1]) + '"' + (p.archive ? ' data-archive="1"' : "") + '>' +
        '<span class="climg">' + imgTag(c[2], c[0], "wide") + '<span class="play">' + I.playtri + '</span><span class="dur">' + esc(c[1]) + '</span></span>' +
        '<span class="cltitle">' + esc(c[0]) + '</span></button>';
    }).join("") + '</div>';
  };

  P.soundbites = function (p) {
    return '<div class="bites">' + p.items.map(function (b, k) {
      return '<button class="bite" type="button" data-bite="' + k + '" data-title="' + esc(b[0]) + '" data-dur="' + esc(b[1]) + '" data-desc="' + esc(b[2]) + '">' +
        '<span class="bplay">' + I.playtri + '</span><span class="btx"><b>' + esc(b[0]) + '</b><span>' + esc(b[2]) + '</span></span>' +
        '<span class="bdur">' + esc(b[1]) + '</span></button>';
    }).join("") + '</div>';
  };

  P.feature = function (p) {
    return '<button class="feat' + (p.compact ? " compact" : "") + '" type="button" data-article="' + esc(p.article) + '">' +
      '<span class="fimg">' + imgTag(p.img, "", p.compact ? "square" : "wide") + '</span>' +
      '<span class="ftx"><small>' + esc(p.kicker) + '</small><b>' + esc(p.title) + '</b><span>' + I.book + esc(p.sub) + '</span></span></button>';
  };

  P.reader = function () {
    return '<div class="rail readrail">' + READER.map(function (pg, k) {
      return '<button class="rpage" type="button" data-reader="' + k + '"><span class="rpimg">' + imgTag(pg[0], pg[2], "tall") + '</span>' +
        '<span class="rpy">' + esc(pg[1]) + '</span></button>';
    }).join("") + '</div>';
  };

  /* ---- a reminder on anything that has not started -------------------- */

  function remindChip(e, text) {
    var on = !!(S.reminders && S.reminders[e.id]);
    if (text === "") {
      return '<span class="rpill' + (on ? " on" : "") + '" role="button" tabindex="0" data-remindchip="' + e.id + '" aria-pressed="' + on + '">' +
        (on ? I.bellon : I.bellsm) + (on ? "Reminder set" : "Remind me") + '</span>';
    }
    return '<span class="chipsoon remind' + (on ? " on" : "") + '" role="button" tabindex="0" data-remindchip="' + e.id + '" aria-pressed="' + on + '" aria-label="' + (on ? "Reminder set" : "Remind me when it starts") + '">' +
      (on ? I.bellon : I.bellsm) + esc(text) + '</span>';
  }

  /* ---- overlays live in one container, redrawn on their own ----------- */

  function overlaysHTML() {
    return articleHTML() + readerHTML() + fsHTML() + sheetHTML() + pipHTML() + pushHTML();
  }

  function refreshOverlays() {
    var o = $("#ovl");
    if (!o) { return; }
    o.innerHTML = overlaysHTML();
    wireNew(o);
    sizeFS();
    var pg = $("[data-rdpages]", o);
    if (pg && S.reader) { pg.scrollLeft = S.reader * pg.clientWidth; }
  }

  function openSheet(kind, ctx) { S.sheet = { kind: kind, ctx: ctx || null }; refreshOverlays(); }

  function watchEvent(ix, kind, court, fs) {
    var e = EVENTS[ix];
    vidStart({ id: e.id, kind: kind || (lc() === "fulltime" && hasVideo(e) ? "highlights" : "live"), title: court || null });
    if (fs) { S.vid.mode = "fs"; }
    S.article = null;
    if (S.view !== "event" || S.eventIx !== ix) { closeDrawer(); openEvent(ix); } else { render(); }
    var sb = $("#scrollbody"); if (sb) { sb.scrollTop = 0; }
  }

  /* handlers for everything above; safe to run on any root, repeatedly */
  function wireNew(root) {
    root = root || document;
    $$("[data-sheet]", root).forEach(function (b) {
      b.onclick = function (ev2) { ev2.stopPropagation(); closeDrawer(); openSheet(b.dataset.sheet, b.dataset.ctx || (S.view === "event" ? ev().id : "story:" + lc())); };
    });
    $$("[data-sheetclose]", root).forEach(function (b) { b.onclick = function () { S.sheet = null; refreshOverlays(); }; });
    $$("[data-like]", root).forEach(function (b) {
      b.onclick = function (ev2) {
        ev2.stopPropagation();
        var k = b.dataset.like, on = !S.likes[k];
        S.likes[k] = on;
        b.classList.toggle("on", on);
        b.setAttribute("aria-pressed", String(on));
        $(".lk", b).innerHTML = on ? I.heartfill : I.heart;
        $(".n", b).textContent = likeCount(b.dataset.base, k);
        if (on) { b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop"); }
      };
    });
    $$("[data-csort]", root).forEach(function (b) { b.onclick = function () { S.csort = b.dataset.csort; refreshOverlays(); }; });
    $$("[data-compose]", root).forEach(function (f) {
      f.onsubmit = function (ev2) {
        ev2.preventDefault();
        var inp = f.querySelector("input"), txt = inp.value.trim();
        if (!txt) { inp.focus(); return; }
        var ctx = f.dataset.compose;
        (S.myComments[ctx] = S.myComments[ctx] || []).push(txt);
        refreshOverlays();
        $$('[data-sheet="comments"][data-ctx="' + ctx + '"][data-cbase]').forEach(function (c) { $(".n", c).textContent = commentCount(ctx, c.dataset.cbase); });
        toast("Posted. It shows for everyone once it is checked.");
      };
    });
    $$("[data-ntype]", root).forEach(function (b) {
      b.onclick = function () {
        var t = b.dataset.ntype, def = NOTIFTYPES.filter(function (x) { return x[0] === t; })[0][3];
        S.ntypes[t] = !(S.ntypes[t] === undefined ? def : S.ntypes[t]);
        refreshOverlays();
      };
    });
    $$("[data-sharecard]", root).forEach(function (b) { b.onclick = function () { S.shareAsCard = !S.shareAsCard; refreshOverlays(); }; });
    $$("[data-sharego]", root).forEach(function (b) {
      b.onclick = function () {
        var t = b.dataset.sharego;
        S.sheet = null; refreshOverlays();
        toast(t === "Copy link" ? "Link copied." : "Opens " + t + " with the " + (S.shareAsCard ? "picture" : "link") + " ready to send.");
      };
    });
    $$("[data-article]", root).forEach(function (b) {
      b.onclick = function () { S.article = b.dataset.article; S.sheet = null; closeDrawer(); refreshOverlays(); var sc = $(".arscroll"); if (sc) { sc.scrollTop = 0; } };
    });
    $$("[data-closearticle]", root).forEach(function (b) { b.onclick = function () { S.article = null; refreshOverlays(); }; });
    $$("[data-reader]", root).forEach(function (b) { b.onclick = function () { S.reader = Number(b.dataset.reader); refreshOverlays(); }; });
    $$("[data-readerclose]", root).forEach(function (b) { b.onclick = function () { S.reader = null; refreshOverlays(); }; });
    $$("[data-rdpages]", root).forEach(function (pg) {
      pg.addEventListener("scroll", function () {
        var k = Math.round(pg.scrollLeft / Math.max(1, pg.clientWidth));
        if (k !== S.reader) { S.reader = k; $$(".rddots i").forEach(function (d, i) { d.classList.toggle("on", i === k); }); }
      }, { passive: true });
    });
    $$("[data-reveal]", root).forEach(function (b) { b.onclick = function (ev2) { ev2.stopPropagation(); S.revealed[b.dataset.reveal] = true; render(); }; });
    $$("[data-spoil]", root).forEach(function (b) {
      b.onclick = function (ev2) {
        ev2.stopPropagation();
        S.hide = b.dataset.spoil === "on" ? true : b.dataset.spoil === "off" ? false : !hideOn();
        if (S.hide) { S.revealed = {}; }
        redrawKeepingMenu();
        toast(S.hide ? "Scores hidden across the app. Catch-ups come first." : "Scores are showing.");
      };
    });
    $$("[data-themetoggle]", root).forEach(function (b) {
      b.onclick = function () {
        S.theme = S.theme === "light" ? "dark" : "light";
        document.body.dataset.theme = S.theme;
        redrawKeepingMenu();
      };
    });
    $$("[data-remindchip]", root).forEach(function (b) {
      var go = function (ev2) {
        ev2.stopPropagation(); ev2.preventDefault();
        var id = b.dataset.remindchip, e = evById(id);
        if (!S.reminders) { S.reminders = {}; }
        S.reminders[id] = !S.reminders[id];
        tvs().remind[id] = S.reminders[id];
        $$('[data-remindchip="' + id + '"]').forEach(function (c) {
          c.classList.toggle("on", S.reminders[id]);
          c.setAttribute("aria-pressed", String(S.reminders[id]));
          c.innerHTML = (S.reminders[id] ? I.bellon : I.bellsm) + (c.classList.contains("rpill") ? (S.reminders[id] ? "Reminder set" : "Remind me") : esc(evState(e).card.when.split(" ·")[0]));
        });
        toast(S.reminders[id] ? "We'll tell you when " + e.title + " starts, on your phone and your TV." : "Reminder removed.");
      };
      b.onclick = go;
      b.onkeydown = function (k) { if (k.key === "Enter" || k.key === " ") { go(k); } };
    });
    $$("[data-watch]", root).forEach(function (b) {
      b.onclick = function (ev2) { ev2.stopPropagation(); S.sheet = null; watchEvent(Number(b.dataset.watch), b.dataset.kind || null, b.dataset.court || null, !!b.dataset.fs); };
    });
    $$("[data-recapvid]", root).forEach(function (b) {
      b.onclick = function () { var id = b.dataset.recapvid; vidStart({ id: id, kind: "recap" }); render(); var sb = $("#scrollbody"); if (sb) { sb.scrollTop = 0; } };
    });
    $$("[data-clip]", root).forEach(function (b) {
      b.onclick = function () {
        vidStart({ id: S.view === "event" ? ev().id : null, kind: "clip", img: b.dataset.clip, title: b.dataset.title, dur: b.dataset.dur, archive: !!b.dataset.archive });
        render(); var sb = $("#scrollbody"); if (sb) { sb.scrollTop = 0; }
      };
    });
    $$("[data-bite]", root).forEach(function (b) {
      b.onclick = function () {
        if (S.vid && S.vid.mode === "full") { S.vid.mode = "pip"; S.vid.play = false; render(); }
        playDock({ title: b.dataset.title, sub: "Radio 5 Sports Extra · clip", dur: secs(b.dataset.dur), transcript: [b.dataset.desc] });
      };
    });
    $$("[data-vidmin]", root).forEach(function (b) { b.onclick = function () { S.vid.mode = "pip"; render(); toast("Still playing. Tap the small player to bring it back."); }; });
    $$("[data-vidgrow]", root).forEach(function (b) {
      b.onclick = function () {
        var v = S.vid, ix = v.id ? evIxById(v.id) : -1;
        v.mode = "full"; v.play = true;
        if (ix >= 0 && (S.view !== "event" || S.eventIx !== ix)) { openEvent(ix); } else { S.view = S.view; render(); }
        var sb = $("#scrollbody"); if (sb) { sb.scrollTop = 0; }
      };
    });
    $$("[data-vidclose]", root).forEach(function (b) {
      b.onclick = function (ev2) { ev2.stopPropagation(); var v = S.vid; S.vid = v && v.kind !== "live" ? v.back : null; render(); };
    });
    $$("[data-vidplay]", root).forEach(function (b) {
      b.onclick = function (ev2) { ev2.stopPropagation(); S.vid.play = !S.vid.play; if (S.vid.play) { stopDock(); } if (S.vid.mode === "full") { refreshVid(); } else { refreshOverlays(); } };
    });
    $$("[data-vidcc]", root).forEach(function (b) { b.onclick = function () { S.vid.cc = !S.vid.cc; refreshVid(); }; });
    $$("[data-vidaud]", root).forEach(function (b) {
      b.onclick = function () {
        var v = S.vid; v.aud = v.aud === "tv" ? "radio" : v.aud === "radio" ? "crowd" : "tv";
        toast(v.aud === "tv" ? "TV commentary." : v.aud === "radio" ? "Radio 5 Live commentary, synced to the picture." : "Crowd only. No commentary.");
        refreshVid();
      };
    });
    $$("[data-pushclose]", root).forEach(function (b) { b.onclick = function () { S.push = null; refreshOverlays(); }; });
    $$("[data-pushact]", root).forEach(function (b) {
      b.onclick = function () {
        var a = b.dataset.pushact; S.push = null;
        if (a === "switchtv") {
          /* the phone acts as a remote for the paired TV: iPlayer on the TV
             changes stream, and the phone's own page follows the new match */
          var t = tvs();
          t.c2 = true; t.ev = evIxById("tennis"); t.screen = "player"; t.mode = "live";
          if (S.surface === "together") { syncPhoneTo(t.ev); }
          render();
          toast("Your living room TV is now on Court 2.");
          return;
        }
        watchEvent(evIxById("tennis"), "live", "Court 2 · Raducanu v Vondroušová");
      };
    });
    wireV12(root);
    wireMySport(root);
    $$("[data-toast]", root).forEach(function (b) { if (!b.onclick) { b.onclick = function () { toast(b.dataset.toast); }; } });
    $$("[data-open]", root).forEach(function (b) {
      if (!b.onclick) { b.onclick = function () { S.sheet = null; closeDrawer(); refreshOverlays(); openEvent(Number(b.dataset.open)); }; }
    });
  }


  /* ==========================================================================
     My Sport: who you follow along the top, one feed underneath
     ========================================================================== */

  function msFollow(id) { return MYSPORT.follows.filter(function (f) { return f[0] === id; })[0]; }

  function msAvatar(f, cls) {
    var isImg = /-/.test(f[3]) && SLOTS[f[3]];
    return '<span class="msav' + (cls ? " " + cls : "") + (f[5] ? " fresh" : "") + '"><span class="msavin" style="background:' + f[4] + '">' +
      (isImg ? imgTag(f[3], f[1], "square") : '<b>' + esc(f[3]) + '</b>') + '</span></span>';
  }

  function msCard(it, k) {
    var e = it.open ? evById(it.open) : null, ix = e ? evIxById(e.id) : -1;
    if (it.k === "article") {
      var tagLine = '<span class="mstag"><b>' + esc(it.tag) + '</b> · ' + esc(it.ago) + '</span>';
      if (it.hero) {
        return '<button class="mshero" type="button" data-article="' + esc(it.article) + '"><span class="msimg">' + imgTag(it.img, "", "wide") + '</span>' +
          '<span class="mstitle big">' + esc(it.title) + '</span>' + tagLine + '</button>';
      }
      return '<button class="msrow" type="button" data-article="' + esc(it.article) + '"><span class="msthumb">' + imgTag(it.img, "", "wide") + '</span>' +
        '<span class="mstx"><span class="mstitle">' + esc(it.title) + '</span>' + tagLine + '</span></button>';
    }
    if (it.k === "live" && e) {
      var c = maskCard(e, evState(e).card), live = c.status === "live";
      return '<button class="msrow mslive" type="button" data-open="' + ix + '"><span class="msthumb">' + photoSVG(e.photo, "wide", "ms " + e.title) +
        (live ? '<span class="chiplive">LIVE</span>' : c.status === "soon" ? '<span class="chipsoon">' + esc(c.when.split(" ·")[0]) + '</span>' : "") + '</span>' +
        '<span class="mstx"><span class="mstitle">' + esc(c.line1) + '</span><span class="mssub">' + esc(c.line2) + '</span>' +
        '<span class="mstag"><b>' + esc(e.sport) + '</b> · ' + esc(live ? "Live now" : c.when) + '</span></span></button>';
    }
    if (it.k === "short") {
      var d = DROP[it.play];
      if (!d) { return ""; }
      return '<button class="msshort" type="button" data-play="' + it.play + '"><span class="msimg tall">' + imgTag(d.img, d.t, "tall") +
        '<span class="play">' + I.playtri + '</span><span class="dur">' + esc(d.dur) + '</span></span>' +
        '<span class="mstitle">' + esc(d.t) + '</span><span class="mstag"><b>' + esc(d.sport) + '</b> · Short</span></button>';
    }
    if (it.k === "quiz") {
      return '<button class="mscta quiz" type="button" data-open="' + ix + '"><span class="msic">' + I.poll + '</span><span class="mstx">' +
        '<span class="mskick">' + esc(it.tag) + '</span><span class="mstitle">' + esc(it.title) + '</span><span class="msgo">Play along ' + I.chevron + '</span></span></button>';
    }
    if (it.k === "qa") {
      return '<button class="mscta qa" type="button" data-bite="' + k + '" data-title="' + esc(it.who + ": " + it.title.toLowerCase()) + '" data-dur="' + esc(it.dur) + '" data-desc="' + esc(it.title + ". The answer as it went out, from the programme.") + '">' +
        '<span class="bplay">' + I.playtri + '</span><span class="mstx"><span class="mskick">' + esc(it.tag) + ' · ' + esc(it.who) + '</span>' +
        '<span class="mstitle">' + esc(it.title) + '</span><span class="mssub">' + esc(it.dur) + ' · because you follow ' + esc(it.who) + '</span></span></button>';
    }
    if (it.k === "watchwith" && e) {
      var fw = msFollow(it.tags[0]);
      return '<button class="mscta ww" type="button" data-watchwith="creator" data-ev="' + ix + '">' + msAvatar(fw, "sm") + '<span class="mstx">' +
        '<span class="mskick">' + esc(it.tag) + '</span><span class="mstitle">' + esc(it.title) + '</span><span class="msgo">Watch with ' + esc(it.who) + ' ' + I.chevron + '</span></span></button>';
    }
    return "";
  }

  P.mysport = function () {
    var sel = S.msFilter || null, f = sel ? msFollow(sel) : null;
    var items = MYSPORT.feed.filter(function (it) { return !sel || it.tags.indexOf(sel) >= 0; });
    var out = '<div class="ms">';

    /* the people, teams and voices you follow */
    out += '<div class="msrail" role="tablist" aria-label="Following">' +
      '<button type="button" class="msf' + (!sel ? " on" : "") + '" data-msf="" aria-selected="' + !sel + '"><span class="msav all"><span class="msavin">' + I.nav.mysport + '</span></span><span class="msn">All</span></button>' +
      MYSPORT.follows.map(function (x) {
        var on = sel === x[0], seen = S.msSeen && S.msSeen[x[0]];
        return '<button type="button" class="msf' + (on ? " on" : "") + '" data-msf="' + x[0] + '" aria-selected="' + on + '">' +
          msAvatar(seen ? [x[0], x[1], x[2], x[3], x[4], 0] : x) + '<span class="msn">' + esc(x[1]) + '</span></button>';
      }).join("") +
      '<button type="button" class="msf" data-toast="Adding follows is not built out in this prototype."><span class="msav add"><span class="msavin">+</span></span><span class="msn">Add</span></button></div>';

    out += '<div class="mshead"><h2>' + (f ? esc(f[1]) : "Most recent") + (f ? '<small>' + esc(f[2]) + '</small>' : "") + '</h2>' +
      (f ? '<button type="button" class="msedit on" data-follow aria-pressed="true">Following</button>'
        : '<button type="button" class="msedit" data-toast="Editing your follows is not built out in this prototype.">Edit</button>') + '</div>';

    if (!items.length) { return out + '<p class="note">Nothing new from ' + esc(f[1]) + ' since you last looked.</p></div>'; }

    /* a lead, then a mix: two shorts side by side, cards between the rows */
    var lead = items.filter(function (x) { return x.hero; })[0] || items.filter(function (x) { return x.k === "article"; })[0];
    if (lead) { out += msCard(lead.hero ? lead : { k: "article", article: lead.article, img: lead.img, title: lead.title, tag: lead.tag, ago: lead.ago, hero: true }, 0); }
    var rest = items.filter(function (x) { return x !== lead; }), shorts = [];
    out += '<div class="msfeed">';
    rest.forEach(function (it, k) {
      if (it.k === "short") {
        shorts.push(it);
        if (shorts.length === 2) { out += '<div class="mspair">' + shorts.map(msCard).join("") + '</div>'; shorts = []; }
        return;
      }
      out += msCard(it, k);
    });
    if (shorts.length) { out += '<div class="mspair">' + shorts.map(msCard).join("") + '</div>'; }
    out += '</div></div>';
    return out;
  };

  function wireMySport(root) {
    $$("[data-msf]", root).forEach(function (b) {
      b.onclick = function () {
        var id = b.dataset.msf || null;
        S.msFilter = S.msFilter === id ? null : id;
        if (id) { S.msSeen = S.msSeen || {}; S.msSeen[id] = true; }
        var rail = $(".msrail"), x = rail ? rail.scrollLeft : 0;
        rerenderBody();
        var rail2 = $(".msrail"); if (rail2) { rail2.scrollLeft = x; }
      };
    });
  }

  /* ------------------------------------------------------------- player */

  function playerHTML() {
    if (S.player === null) { return ""; }
    var ix = S.player, it = DROP[ix], n = DROP.length;
    var liked = !!S.liked[ix];
    return '<div class="takeover" id="takeover" role="dialog" aria-label="' + esc(it.t) + '">' +
      '<div class="tovideo">' + photoSVG(it, "tall", it.sport + " " + it.t) + '<span class="toscrim"></span></div>' +
      '<div class="tonav"><button class="tozone prev" type="button" data-step-clip="-1" aria-label="Previous"></button>' +
      '<button class="tozone next" type="button" data-step-clip="1" aria-label="Next"></button></div>' +
      '<button class="toback" type="button" data-closeplayer aria-label="Close">' + I.back2 + '</button>' +
      '<div class="torail">' +
      '<button class="toact' + (liked ? " on" : "") + '" type="button" data-likeclip aria-pressed="' + liked + '">' +
      I.heartbig + '<span>' + (liked ? bumpCount(it.likes) : it.likes) + '</span></button>' +
      '<button class="toact" type="button" data-toast="Comments are not built out in this prototype.">' + I.commentbig + '<span>' + esc(it.comments) + '</span></button>' +
      '<button class="toact" type="button" data-toast="Share sheet is not wired up in this prototype.">' + I.sharebig + '<span>Share</span></button>' +
      (TRANSCRIPTS[it.img] ? '<button class="toact' + (S.transcript ? " texton" : "") + '" type="button" data-cliptext aria-pressed="' + !!S.transcript + '">' +
        '<span class="toaa">Aa</span><span>Text</span></button>' : "") +
      '</div>' +
      (S.transcript && TRANSCRIPTS[it.img] ? '<div class="totext"><b>What is said</b><p>' + esc(TRANSCRIPTS[it.img]) + '</p></div>' : "") +
      '<div class="tofoot">' +
      '<div class="tochan"><span class="toav">' + esc(it.chan.replace("BBC ", "").slice(0, 2).toUpperCase()) + '</span>' +
      '<span><span class="tocn">' + esc(it.chan) + '</span><br>' +
      '<span class="tohandle">' + I.tick + esc(it.handle) + '</span></span></div>' +
      '<p class="tocap">' + esc(it.cap) + '</p>' +
      (it.audio ? '<button class="tosounds" type="button" data-cliplisten>' + I.speaker + 'Listen to the full call on Sounds</button>' : "") +
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
    $$("[data-cliptext]", el).forEach(function (b) {
      b.onclick = function () { S.transcript = !S.transcript; mountPlayer(); };
    });
    $$("[data-cliplisten]", el).forEach(function (b) {
      b.onclick = function () {
        var it = DROP[S.player];
        closePlayer();
        playDock({ live: false, title: "Test Match Special", sub: it.t + " \u00b7 the full call", dur: 312,
          transcript: TRANSCRIPTS[it.img] ? [TRANSCRIPTS[it.img]] : null });
      };
    });
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

  /* ==========================================================================
     The website
     ==========================================================================
     Same events, same panels, laid out for a desk rather than a hand. The
     phone stacks everything in one column because it has to; the website
     has room to hold the story, the match and the conversation side by side,
     so nobody has to choose which one to scroll away from.
     ========================================================================== */

  var WEBNAV = ["Home", "News", "Sport", "Weather", "iPlayer", "Sounds", "Bitesize"];
  var WEBSPORT = ["Home", "Football", "Cricket", "Formula 1", "Rugby U", "Tennis", "Golf", "Athletics", "Cycling"];

  function tkFor(e) {
    var TK = e.takeover || {};
    return { TK: TK, T: maskT(e, TK[lc()] || { stats: [] }) };
  }

  /* where it is on: cricket is radio only here, and Court 2 is an iPlayer
     stream while BBC One stays on Centre Court */
  function chanFor(e) {
    return e.id === "cricket" ? "Test Match Special" : e.id === "tennis" ? "BBC iPlayer" : "BBC One";
  }

  function watchingFor(e) {
    var st = evState(e);
    /* a count of people watching only means something while it is on */
    return st.card && st.card.status === "live" ? (st.watching || null) : null;
  }

  function statBars(TK, T) {
    return '<div class="tostats">' + (T.stats || []).map(function (r) {
      var a = Number(r[1]), b = Number(r[2]), tot = (a + b) || 1;
      return '<div class="tostat">' +
        '<span class="tonum">' + esc(String(r[1])) + '</span>' +
        '<span class="tobar a"><i style="width:' + (a / tot * 100).toFixed(1) + '%;background:' + TK.ca + '"></i></span>' +
        '<span class="tolab">' + esc(r[0]) + '</span>' +
        '<span class="tobar b"><i style="width:' + (b / tot * 100).toFixed(1) + '%;background:' + TK.cb + '"></i></span>' +
        '<span class="tonum r">' + esc(String(r[2])) + '</span></div>';
    }).join("") + '</div>';
  }

  function liveChip(status, small) {
    return status === "live" ? '<span class="wlive' + (small ? " sm" : "") + '"><i></i>LIVE</span>'
      : status === "soon" ? '<span class="wsoon' + (small ? " sm" : "") + '">Coming up</span>'
      : '<span class="wdone' + (small ? " sm" : "") + '">' + (lc() === "fulltime" ? "Highlights" : "Result") + '</span>';
  }

  function commentsPanel(id, n) {
    var list = (COMMENTS[id] || []).slice(0, n || 4);
    return '<div class="wcom">' +
      '<div class="wcomin"><span class="meav sm">A</span>' +
      '<button type="button" class="wcomfake" data-sheet="comments" data-ctx="' + esc(id) + '">Add to the conversation</button></div>' +
      list.map(function (c, k) {
        return '<div class="wcomrow"><span class="wcav">' + esc(c[0]) + '</span>' +
          '<div><p class="wcmeta"><b>' + esc(c[1]) + '</b> · ' + esc(c[2]) + '</p>' +
          '<p class="wctext">' + esc(c[3]) + '</p>' +
          '<p class="wcact">' + likeBtn("c:" + id + ":" + c[0] + k, c[4], "sm") +
          '<button type="button" data-toast="Replies are not built out in this prototype.">Reply</button></p></div></div>';
      }).join("") + '</div>';
  }

  function webMast() {
    return '<header class="wmast"><div class="wwrap wmastin">' +
      '<span class="bbcblocks" aria-label="BBC"><i>B</i><i>B</i><i>C</i></span>' +
      '<nav class="wnav">' + WEBNAV.map(function (n) {
        return '<a href="#" class="' + (n === "Sport" ? "on" : "") + '" data-toast="' + esc(n) + ' is outside this prototype.">' + esc(n) + '</a>';
      }).join("") + '</nav>' +
      '<span class="wfill"></span>' +
      '<button class="wsearch" type="button" data-toast="Search is a stub in this prototype.">Search BBC</button>' +
      '<button class="iconbtn nbell" type="button" data-sheet="notifs" aria-label="Notifications">' + I.bell + '<i class="ndot"></i></button>' +
      '<button class="iconbtn menubtn" type="button" id="burger" aria-label="Your account and menu" aria-expanded="false">' +
      '<span class="meav" aria-hidden="true">A</span>' + I.burger + '</button>' +
      '</div></header>' +
      '<div class="wsport"><div class="wwrap wsportin"><button class="wsportmark" type="button" data-gohome>SPORT</button>' +
      '<nav>' + WEBSPORT.map(function (n) {
        var on = (n === "Home" && S.view === "home") || (S.view === "event" && ev().sport.indexOf(n.replace(" U", "")) === 0);
        return '<a href="#" class="' + (on ? "on" : "") + '"' + (n === "Home" ? " data-gohome" : ' data-toast="' + esc(n) + ' is not built out in this prototype."') + '>' + esc(n) + '</a>';
      }).join("") + '<a href="#" data-toast="The full sport list is not built out in this prototype.">All sport</a></nav></div></div>';
  }

  function webHome() {
    var cards = rankedCards(), top = cards[0], e = top.e, tk = tkFor(e), TK = tk.TK, T = tk.T;
    var hero = heroFor();
    var isLive = lc() === "live" || lc() === "companion";
    var out = "";

    /* the lead: whatever is most worth watching, beside everything else live */
    out += spoilBar();
    out += '<section class="wtop"><div class="whero">' +
      '<div class="wheroimg">' + (T.img ? imgTag(T.img, TK.a + " v " + TK.b, "wide") : photoSVG(e.photo, "wide", e.title)) +
      '<span class="wheroveil"></span></div>' +
      '<div class="wherotext">' +
      '<p class="wkick">' + liveChip(top.c.status) + '<span>' + esc(e.sport) + ' · ' + esc(e.comp) + '</span>' +
      (watchingFor(e) ? '<span class="wwatch">' + esc(watchingFor(e)) + ' watching</span>' : "") + '</p>' +
      '<h1 class="wh1">' + esc(TK.a) + ' <span>' + esc(T.line || "v") + '</span> ' + esc(TK.b) + '</h1>' +
      (T.sub ? '<p class="wsub">' + esc(T.sub) + '</p>' : "") +
      '<div class="wherostats">' + statBars(TK, T) + '</div>' +
      '<div class="wbtns">' +
      '<button class="wbtn pri" type="button" data-open="' + top.i + '">' + esc(T.cta || "Open the live page") + '</button>' +
      (isLive ? '<button class="wbtn" type="button" data-tvlaunch="' + top.i + '">' + I.playtri + 'Watch on your TV</button>' +
        '<button class="wbtn" type="button" data-listenlive="' + top.i + '">' + I.speaker + 'Listen live</button>' : "") +
      (lc() === "buildup" ? '<button class="wbtn" type="button" data-remind="' + e.id + '">' + I.bell + (S.reminders && S.reminders[e.id] ? "Reminder set" : "Remind me") + '</button>' : "") +
      '</div></div></div>' +

      '<aside class="wlivelist"><h2 class="wh2">' + (isLive ? "Live now" : lc() === "buildup" ? "Today" : "Earlier today") + '</h2>' +
      cards.map(function (x) {
        var c = x.c, wt = watchingFor(x.e);
        return '<button class="wlrow" type="button" data-open="' + x.i + '">' +
          '<span class="wlimg">' + photoSVG(x.e.photo, "square", x.e.sport + " " + x.e.title) + '</span>' +
          '<span class="wltext">' + liveChip(c.status, true) +
          '<b>' + esc(c.line1) + '</b><span>' + esc(c.line2) + '</span>' +
          (wt && c.status === "live" ? '<small>' + esc(wt) + ' watching</small>' : '<small>' + esc(c.when) + '</small>') +
          (c.status === "soon" ? remindChip(x.e, "") : "") +
          '</span></button>';
      }).join("") + '</aside></section>';

    /* three things you can do right now, side by side */
    out += '<section class="wthree">' +
      '<div class="wpanel">' + visualPoll(hero.poll, hero.photo, "Have your say") + '</div>' +
      (RECAPS[e.id] && isLive
        ? '<div class="wpanel"><h2 class="wh2">The story so far <small>' + esc(e.title) + '</small></h2>' + P.recap({ id: e.id }) + '</div>'
        : '<div class="wpanel wstory"><button class="wstlink" type="button" data-article="' + esc(hero.article || "") + '"><span class="wstimg">' + photoSVG(hero.photo, "wide", "story " + hero.head) + '</span>' +
          '<span class="wkick"><span>' + esc(hero.kicker) + '</span></span><span class="wh2 big">' + esc(hero.head) + '</span><span class="wsub">' + esc(hero.stand) + '</span></button>' +
          engageBar({ listen: true, ctx: "story:" + lc(), comments: hero.comments, likes: hero.likes, shares: hero.shares, likeKey: "story:" + lc() }) + '</div>') +
      '<div class="wpanel"><h2 class="wh2">The conversation <small>' + esc(e.title) + '</small></h2>' + commentsPanel(e.id, 3) + '</div>' +
      '</section>';

    /* the rest of the day, as a grid rather than a scroll */
    out += '<section class="wsec"><h2 class="wh2">Following today</h2><div class="wgrid4">' +
      cards.slice().sort(function (a, b) { return b.c.sig - a.c.sig; }).map(function (x) {
        var c = x.c;
        return '<button class="wcard" type="button" data-open="' + x.i + '">' +
          '<span class="wcimg">' + photoSVG(x.e.photo, "wide", "follow " + x.e.title + c.line2) + liveChip(c.status, true) + '</span>' +
          '<span class="wcsport">' + esc(x.e.sport) + ' · ' + esc(c.when) + '</span>' +
          '<b>' + esc(c.line1) + '</b><span class="wcctx">' + esc(c.ctx) + '</span>' +
          (c.status === "soon" ? '<span class="ec-foot">' + remindChip(x.e, "") + '</span>' : "") + '</button>';
      }).join("") + '</div></section>';

    var v = HOMEFEED.videos;
    out += '<section class="wsec"><h2 class="wh2">' + esc(v.title) + '</h2><div class="wshorts">' +
      [1, 7, 2, 9, 5, 0].map(function (ix) {
        var it = DROP[ix];
        return '<button class="wshort" type="button" data-play="' + ix + '">' +
          '<span class="wsimg">' + photoSVG(it, "tall", it.sport + " " + it.t) + '<span class="play">' + I.playtri + '</span>' +
          '<span class="dur">' + esc(it.dur) + '</span></span>' +
          '<span class="wcsport">' + esc(it.sport) + '</span><b>' + esc(it.t) + '</b></button>';
      }).join("") + '</div></section>';

    var st = HOMEFEED.standings, cp = HOMEFEED.comps, tix = S.compTab || 0, ct = cp.tabs[tix];
    out += '<section class="wsec wtables"><div><h2 class="wh2">' + esc(st.title) + '</h2>' + table(st.cols, st.rows) +
      '<p class="note">' + esc(st.note) + '</p></div>' +
      '<div><h2 class="wh2">' + esc(cp.title) + '</h2><div class="comptabs">' + cp.tabs.map(function (t, i) {
        return '<button class="comptab" type="button" data-comp="' + i + '" aria-pressed="' + (i === tix) + '">' + badge(t.colour, t.initials) + esc(t.name) + '</button>';
      }).join("") + '</div>' + table(ct.cols, ct.rows, "Club") + '</div></section>';
    return out;
  }

  function webEvent() {
    var e = ev(), st = evState(), tk = tkFor(e), TK = tk.TK, T = tk.T;
    var card = st.card, isLive = lc() === "live" || lc() === "companion";
    var R = RECAPS[e.id];
    var out = "";

    out += '<section class="wevhead"><div class="wwrap">' +
      '<p class="wcrumb"><button type="button" data-gohome>Sport</button> › ' + esc(e.sport) + ' › ' + esc(e.comp) + '</p>' +
      '<div class="wevrow"><div>' +
      '<p class="wkick">' + liveChip(card.status) + (watchingFor(e) ? '<span class="wwatch">' + esc(watchingFor(e)) + ' watching</span>' : "") + '</p>' +
      '<h1 class="wh1">' + esc(TK.a) + ' <span>' + esc(T.line || "v") + '</span> ' + esc(TK.b) + '</h1>' +
      (T.sub ? '<p class="wsub">' + esc(T.sub) + '</p>' : "") + '</div>' +
      '<div class="wbtns">' +
      (isLive ? '<button class="wbtn pri" type="button" data-tvlaunch="' + S.eventIx + '">' + I.playtri + 'Watch on your TV</button>' : "") +
      '<button class="wbtn" type="button" data-listenlive="' + S.eventIx + '">' + I.speaker + 'Listen live</button>' +
      (lc() === "buildup" ? '<button class="wbtn" type="button" data-remind="' + e.id + '">' + I.bell + (S.reminders && S.reminders[e.id] ? "Reminder set" : "Remind me") + '</button>' : "") +
      '<button class="wbtn ghost" type="button" data-toast="Added to My Sport.">' + I.star + 'Follow</button>' +
      '</div></div>' + tabBar() + '</div></section>';

    /* left: catch up. centre: the match. right: take part. */
    out += '<div class="wwrap wcols"><aside class="wleft">' +
      (R && isLive ? '<div class="wpanel"><h2 class="wh2">The story so far</h2>' + P.recap({ id: e.id }) + '</div>' : "") +
      (R ? '<div class="wpanel"><h2 class="wh2">Key moments</h2><ol class="rcpline">' + R.moments.map(function (x) {
        return '<li class="k-' + esc(x[4] || "score") + '"><span>' + esc(x[0]) + '</span><b>' + esc(x[1]) + '</b></li>';
      }).join("") + '</ol></div>' : "") +
      '</aside>' +

      '<section class="wcentre"><div id="stage">' +
      (isLive ? '<div class="wplayer' + (S.webPlay ? " on" : "") + '">' + (T.img ? imgTag(T.img, TK.a + " v " + TK.b, "wide") : photoSVG(e.photo, "wide", e.title)) +
        '<span class="wpveil"></span><span class="wpchip">' + liveChip("live") + '<span>' + esc(chanFor(e)) + '</span></span>' +
        (S.webPlay ? '<span class="wpnow">' + I.pause + '</span>' : '<button class="wpplay" type="button" data-webplay aria-label="Play">' + I.playtri + '</button>') +
        '<span class="wpvoice">' + voiceChip(e, false) + '</span>' +
        '<button class="wpfs" type="button" data-watch="' + S.eventIx + '" data-fs="1" aria-label="Full screen">' + I.expand + '</button>' +
        '</div>' : "") +
      summaryBox() + renderSections(curTab().sections.filter(function (x) {
        return !(x.panels && x.panels.some(function (pn) { return pn.t === "recap"; }));
      })) + '</div></section>' +

      '<aside class="wright">' +
      (T.stats && T.stats.length ? '<div class="wpanel"><h2 class="wh2">In numbers</h2>' + statBars(TK, T) + '</div>' : "") +
      '<div class="wpanel"><h2 class="wh2">The conversation</h2>' + commentsPanel(e.id, 4) + '</div>' +
      '<div class="wpanel"><h2 class="wh2">Watch</h2><div class="wshorts two">' +
      DROP.map(function (it, ix) { return { it: it, ix: ix }; }).filter(function (x) { return x.it.sport.indexOf(e.sport.split(" ")[0]) === 0; }).slice(0, 2).map(function (x) {
        return '<button class="wshort" type="button" data-play="' + x.ix + '"><span class="wsimg">' + photoSVG(x.it, "tall", x.it.sport + " " + x.it.t) +
          '<span class="play">' + I.playtri + '</span><span class="dur">' + esc(x.it.dur) + '</span></span><b>' + esc(x.it.t) + '</b></button>';
      }).join("") + '</div></div>' +
      '</aside></div>';
    return out;
  }

  function renderWeb() {
    var app = $("#app");
    var url = S.view === "event" ? "bbc.co.uk/sport/" + ev().id + "/live" : "bbc.co.uk/sport";
    app.innerHTML = '<div class="web" id="viewport">' +
      '<div class="wbrowser"><span class="wdots"><i></i><i></i><i></i></span><span class="wurl">' + esc(url) + '</span></div>' +
      '<div class="wscroll" id="scrollbody">' + webMast() +
      '<main class="wmain">' + (S.view === "event" ? webEvent() : '<div class="wwrap">' + webHome() + '</div>') + '</main>' +
      '<footer class="wfoot"><div class="wwrap"><span class="bbcblocks"><i>B</i><i>B</i><i>C</i></span>' +
      '<nav>' + ["Terms of Use", "About the BBC", "Privacy Policy", "Cookies", "Accessibility Help", "Contact the BBC"].map(function (n) {
        return '<a href="#" data-toast="' + esc(n) + ' is outside this prototype.">' + esc(n) + '</a>';
      }).join("") + '</nav></div></footer>' +
      '</div>' + dockHTML() + drawer() + '<div id="ovl">' + overlaysHTML() + '</div><div class="toast" id="toast" role="status"></div></div>';
  }

  /* ==========================================================================
     iPlayer on the television
     ==========================================================================
     Ten feet away, with a remote. The telly is for watching and listening:
     the picture, a choice of commentary, a way to catch up, a glance at the
     numbers, and a sense of how many others are with you. Anything that
     needs typing, voting or scrolling is handed to the phone in the room.

     Drawn at 1280 x 720 and scaled to fit. Arrow keys move, Enter selects,
     Escape or Backspace goes back, S toggles the stats.
     ========================================================================== */

  function tvs() {
    if (!S.tv) {
      S.tv = { screen: "home", f: [0, 0], overlay: null, stats: false, audio: "bbc", subs: false,
        ev: null, mode: "live", rix: 0, rel: 0, rplay: true, rmode: "watch",
        mt: 0, mi: -1, toast: null, toastT: 0, phoneT: 0, paired: false, remind: {}, bump: 0, focus: false };
    }
    return S.tv;
  }

  function tvEvent() {
    var t = tvs();
    if (t.ev === null) { t.ev = rankedCards()[0].i; }
    return EVENTS[t.ev];
  }

  function tvWatching(e) {
    var w = watchingFor(e);
    if (!w) { return null; }
    var base = Number(String(w).replace(/[^0-9]/g, "")) || 0;
    return (base + tvs().bump).toLocaleString("en-GB");
  }

  var AUDIO_OPTS = [
    ["tv", "TV commentary", "The commentary team on the broadcast"],
    ["radio", "Radio commentary", "Synced to the picture, not twenty seconds ahead of it"],
    ["crowd", "Crowd only", "No commentary. Just the ground"],
    ["ad", "Audio described", "Commentary that describes what is on screen"]
  ];

  function radioName(e) { return e.audio.station.replace("BBC ", ""); }

  function isAudioLed(e) { return e.id === "cricket"; }

  function tvBtn(r, c, act, label, cls) {
    return '<button class="tvb' + (cls ? " " + cls : "") + '" type="button" data-tvf="' + r + "," + c + '" data-tvact="' + act + '">' + label + '</button>';
  }

  /* ---- home ---- */

  function tvHome() {
    var cards = rankedCards(), top = cards[0], e = top.e, tk = tkFor(e), TK = tk.TK, T = tk.T;
    var L = lc(), isLive = L === "live" || L === "companion", w = tvWatching(e);
    var out = '<div class="tvhero">' + (T.img ? imgTag(T.img, "", "wide") : photoSVG(e.photo, "wide", e.title)) +
      '<span class="tvheroveil"></span></div>';

    out += '<div class="tvrailnav"><span class="tvlogo">BBC <b>iPlayer</b></span>' +
      ['Search', 'Home', 'Channels', 'Categories', 'My programmes'].map(function (n, i) {
        return '<span class="tvnav' + (i === 1 ? " on" : "") + '">' + n + '</span>';
      }).join("") + '</div>';

    out += '<div class="tvherotext">' +
      '<p class="tvkick">' + (isLive ? '<span class="tvlive"><i></i>LIVE</span>' : L === "buildup" ? '<span class="tvsoon">' + esc(top.c.when) + '</span>' : '<span class="tvsoon">Highlights</span>') +
      '<span>' + esc(chanFor(e)) + '</span>' +
      (w && isLive ? '<span class="tvwatch">' + I.stack + esc(w) + ' watching</span>' : "") + '</p>' +
      '<h1>' + esc(TK.a) + ' <span>' + esc(T.line || "v") + '</span> ' + esc(TK.b) + '</h1>' +
      '<p class="tvsub">' + esc(e.comp) + (T.sub ? " · " + esc(T.sub) : "") + '</p>' +
      '<div class="tvbtns">' +
      (isLive
        ? tvBtn(0, 0, "watch:" + top.i, I.playtri + (isAudioLed(e) ? "Listen live" : "Watch live"), "pri") +
          (RECAPS[e.id] ? tvBtn(0, 1, "catchup:" + top.i, "Catch up in 60 seconds") : "") +
          tvBtn(0, 2, "start:" + top.i, "From the start")
        : L === "buildup"
          ? tvBtn(0, 0, "remind:" + e.id, I.bell + (tvs().remind[e.id] ? "Reminder set" : "Remind me"), "pri") +
            tvBtn(0, 1, "watch:" + top.i, I.playtri + "Watch the build-up")
          : tvBtn(0, 0, "watch:" + top.i, I.playtri + "Highlights", "pri") +
            (RECAPS[e.id] ? tvBtn(0, 1, "catchup:" + top.i, "The match in 60 seconds") : "") +
            tvBtn(0, 2, "start:" + top.i, "Full replay")) +
      '</div></div>';

    out += '<div class="tvrails"><h2>' + (isLive ? "Live now" : L === "buildup" ? "On today" : "Catch up on today") + '</h2><div class="tvrow">' +
      cards.map(function (x, k) {
        var c = x.c, xtk = tkFor(x.e), ww = tvWatching(x.e);
        var img = xtk.T.img || null;
        return '<button class="tvcard" type="button" data-tvf="1,' + k + '" data-tvact="watch:' + x.i + '">' +
          '<span class="tvcimg">' + (img ? imgTag(img, "", "wide") : photoSVG(x.e.photo, "wide", x.e.title)) +
          (c.status === "live" ? '<span class="tvlive sm"><i></i>' + (isAudioLed(x.e) ? "LIVE · RADIO" : "LIVE") + '</span>' : '<span class="tvsoon sm">' + esc(c.when.split(" ·")[0]) + '</span>') +
          (c.status === "live" ? '<span class="tvprog"><i style="width:' + (40 + k * 12) + '%"></i></span>' : "") + '</span>' +
          '<b>' + esc(c.line1) + '</b><span>' + esc(c.status === "live" && ww ? ww + " watching" : c.line2) + '</span></button>';
      }).join("") + '</div>' +

      '<h2>Coming up</h2><div class="tvrow">' + COMINGUP.map(function (u, k) {
        var on = !!tvs().remind[u.id];
        return '<button class="tvcard up" type="button" data-tvf="2,' + k + '" data-tvact="remind:' + u.id + '">' +
          '<span class="tvcimg">' + imgTag(u.img, "", "wide") + '<span class="tvbell' + (on ? " on" : "") + '">' + I.bell + (on ? "Reminder set" : "Remind me") + '</span></span>' +
          '<b>' + esc(u.t) + '</b><span>' + esc(u.when) + ' · ' + esc(u.ch) + '</span></button>';
      }).join("") + '</div></div>';
    return out;
  }

  /* ---- catch up ---- */

  function tvCatchup() {
    var t = tvs(), e = tvEvent(), R = RECAPS[e.id], m = R.moments[t.rix];
    var out = "";
    if (t.rmode === "watch") {
      out += '<div class="tvfull">' + (m[3] ? imgTag(m[3], m[1], "wide") : '<span class="tvgfx k-' + esc(m[4]) + '" style="--acc:' + e.accent + '"><b>' + esc(m[0]) + '</b></span>') +
        '<span class="tvfullveil"></span></div>' +
        '<div class="tvsegs">' + R.moments.map(function (x, k) {
          return '<span class="' + (k < t.rix ? "done" : k === t.rix ? "on" : "") + '"><i' +
            (k === t.rix ? ' style="width:' + Math.min(100, t.rel / 4.5 * 100).toFixed(1) + '%"' : "") + '></i></span>';
        }).join("") + '</div>' +
        '<p class="tvcatchkick">The story so far · ' + esc(e.title) + '</p>' +
        '<div class="tvcatchtext"><span class="tvtime">' + esc(m[0]) + '</span><h1>' + esc(m[1]) + '</h1><p>' + esc(m[2]) + '</p></div>';
    } else {
      var dur = secs(R.listen), pos = Math.min(dur, t.rel), k = Math.min(R.moments.length - 1, Math.floor(pos / dur * R.moments.length));
      out += '<div class="tvfull dim">' + (T_IMG(e) ? imgTag(T_IMG(e), "", "wide") : "") + '<span class="tvfullveil heavy"></span></div>' +
        '<div class="tvlisten"><p class="tvcatchkick">Listening · ' + esc(R.voice) + '</p>' +
        '<h1>' + esc(R.moments[k][0] + " · " + R.moments[k][1]) + '</h1>' +
        '<div class="tvwave">' + waveSVG("rcpwave") + '<span class="rcpwavefill" style="clip-path:inset(0 ' + (100 - pos / dur * 100).toFixed(1) + '% 0 0)">' + waveSVG("rcpwave on") + '</span></div>' +
        '<p class="tvtimes"><span>' + mmss(Math.floor(pos)) + '</span><span>' + esc(R.listen) + '</span></p>' +
        '<p class="tvline">' + esc(R.synopsis[Math.min(R.synopsis.length - 1, Math.floor(pos / dur * R.synopsis.length))]) + '</p></div>';
    }
    out += '<div class="tvbtns bottom">' +
      tvBtn(0, 0, "skip", I.playtri + (lc() === "fulltime" ? "Watch the highlights" : "Join live"), "pri") +
      tvBtn(0, 1, "rmode", t.rmode === "watch" ? I.speaker + "Listen instead" : "Watch instead") +
      tvBtn(0, 2, "rpause", t.rplay ? "Pause" : "Play") + '</div>';
    return out;
  }

  function centreCourt(e) {
    var t = tvs();
    return e.id === "tennis" && lc() === "companion" && !t.c2;
  }

  function T_IMG(e) { var x = tkFor(e); return x.T.img || null; }

  /* ---- the player ---- */

  function tvPlayer() {
    var t = tvs(), e = tvEvent(), tk = tkFor(e), TK = tk.TK, T = tk.T, L = lc();
    var hl = L === "fulltime" || t.mode === "highlights", w = tvWatching(e);
    var audioLed = isAudioLed(e) && !hl;
    var cc = centreCourt(e);
    var out = '<div class="tvfull kb' + (audioLed ? " dim" : "") + (cc ? " blur" : "") + '">' + (T.img ? imgTag(T.img, "", "wide") : photoSVG(e.photo, "wide", e.title)) +
      '<span class="tvfullveil' + (audioLed ? " heavy" : " light") + '"></span></div>';

    /* the top line: what this is, and how many are with you */
    out += '<div class="tvtop"><p>' +
      (hl ? '<span class="tvsoon">Highlights</span>' : t.mode === "start" ? '<span class="tvsoon">From the start</span>' : '<span class="tvlive"><i></i>LIVE</span>') +
      '<span>' + (audioLed ? "Test Match Special" : cc ? "BBC One" : esc(chanFor(e))) + '</span><span class="tvdim">' + (cc ? "Centre Court" : e.id === "tennis" ? "Court 2 · Raducanu v Vondroušová" : esc(e.title)) + '</span></p>' +
      (w && !hl ? '<p class="tvwatch">' + I.stack + '<b>' + esc(w) + '</b>&nbsp;watching with you</p>' : "") + '</div>';

    var tvo = voiceList(e).filter(function (x) { return x[0] === t.audio; })[0] || voiceList(e)[0];
    if (tvo && (t.audio !== "bbc" || audioLed)) {
      out += '<p class="tvaudiochip">' + (tvo[5] ? '<span class="vav" style="background:' + tvo[6] + '">' + esc(tvo[5]) + '</span>' : I.speaker) +
        esc(tvo[4] === "Watch with" || tvo[4] === "Listen with" ? tvo[4] + " " + tvo[2].replace(/ watchalong$/, "") : tvo[2]) + '</p>';
    }

    /* cricket has radio rights and no pictures here: the telly becomes a
       radio with a scoreboard, rather than a black screen */
    if (audioLed) {
      out += '<div class="tvradio"><p class="tvcatchkick">' + I.speaker + 'Test Match Special · listening on your TV</p>' +
        '<div class="tvscore"><div><span>Australia</span><b>372</b></div><div class="on"><span>England</span><b>284-6</b><small>89.2 overs · trail by 88</small></div></div>' +
        '<p class="tvbatters"><b>Root 121*</b> (238) &nbsp;·&nbsp; Woakes 4* (11) &nbsp;·&nbsp; New ball in 8 overs</p>' +
        '<div class="tvover">' + ["1", "•", "4", "•", "2", "•"].map(function (b, k) {
          return '<span class="' + (b === "4" ? "four" : "") + (k === 5 ? " now" : "") + '">' + b + '</span>';
        }).join("") + '</div>' +
        '<div class="tvwave live">' + waveSVG("rcpwave on") + '</div></div>';
    }

    /* the second-screen tennis story: BBC One is on Centre Court, and the
       Spine says Court 2 is the better match. On the big screen that is a
       single, dismissable suggestion with one button, not a feed */
    if (cc) {
      out += '<div class="tvradio"><p class="tvcatchkick">Centre Court · third set</p>' +
        '<div class="tvsets"><p class="on"><span>Alcaraz</span><em>7</em><em>6</em><em>2</em><i></i></p><p><span>Musetti</span><em>6</em><em>3</em><em>1</em></p></div>' +
        '<p class="tvbatters">Alcaraz serving · 30-15 · on serve all set</p></div>' +
        (t.stay ? "" : '<div class="tvspine"><p class="tvcatchkick">Worth watching now</p>' +
        '<p class="tvspinet"><b>Court 2</b><i>Hot right now</i></p>' +
        '<p class="tvspines">Raducanu has three break points to level the second set against Vondroušová</p>' +
        '<div class="tvbtns">' + tvBtn(0, 0, "court2", I.playtri + "Switch to Court 2", "pri") + tvBtn(0, 1, "stay", "Stay here") + '</div></div>');
    }

    /* a moment, as a lower third, then the hand-off to the phone */
    if (t.toast) {
      out += '<div class="tvl3"><span class="tvl3k">' + esc(t.toast[0]) + '</span><div><b>' + esc(t.toast[1]) + '</b><span>' + esc(t.toast[2]) + '</span></div></div>';
    }
    if (t.phoneT > 0 && !t.overlay) {
      out += '<div class="tvphone' + (t.paired ? " paired" : "") + '">' + (t.paired ? '<span class="tvphicon">' + I.phone + '</span>' : qrSVG()) + '<div><b>' + (t.paired ? "On your phone now" : "Play along on your phone") + '</b>' +
        '<span>' + (e.id === "tennis" ? "Call the next game" : e.id === "rugby" ? "Was it a try?" : e.id === "cricket" ? "Predict the next wicket" : "Rate the players") +
        ' · 3,109 playing along</span></div></div>';
    }

    if (t.stats && !hl && !cc) {
      out += '<aside class="tvstats"><p class="tvcatchkick">In numbers</p>' +
        '<p class="tvsline"><b>' + esc(TK.a) + '</b><span>' + esc(T.line || "") + '</span><b>' + esc(TK.b) + '</b></p>' +
        statBars(TK, T) +
        (e.id === "tennis" ? '<p class="tvcatchkick" style="margin-top:18px">Worth watching now</p>' +
          '<ol class="tvcourts"><li class="on"><b>Court 2</b>Raducanu v Vondroušová<i>Hot</i></li><li><b>Court 18</b>Boulter v Kalinskaya<i>Heating up</i></li><li><b>No.1</b>Sinner v Fils<i>Heating up</i></li></ol>' : "") +
        '</aside>';
    }

    if (!t.overlay) {
      out += '<p class="tvhint">OK for options</p>';
    }

    if (t.overlay === "controls") {
      var R = RECAPS[e.id];
      out += '<div class="tvctrl">' +
        '<div class="tvbar"><span class="tvbarfill" style="width:' + (hl ? 38 : t.mode === "start" ? 6 : 100) + '%"></span>' +
        (R ? R.moments.map(function (x, k) {
          return '<span class="tvmark k-' + esc(x[4]) + '" style="left:' + ((k + 1) / (R.moments.length + 1) * 100).toFixed(1) + '%"><em>' + esc(x[0] + " " + x[1]) + '</em></span>';
        }).join("") : "") +
        (hl ? "" : '<span class="tvbarlive">' + (t.mode === "start" ? "67 min behind" : "LIVE") + '</span>') + '</div>' +
        '<div class="tvbtns">' +
        (t.mode === "start" ? tvBtn(0, 0, "golive", "Jump to live", "pri") : "") +
        tvBtn(0, 1, "ov:audio", I.speaker + "Commentary") +
        tvBtn(0, 2, "subs", "Subtitles " + (t.subs ? "on" : "off")) +
        (hl ? "" : tvBtn(0, 3, "stats", "Stats " + (t.stats ? "on" : "off"))) +
        (RECAPS[e.id] ? tvBtn(0, 4, "catchup:" + t.ev, "Catch up") : "") +
        (PUNDITS[e.id] ? tvBtn(0, 5, "ov:experts", "The experts") : "") +
        tvBtn(0, 7, "ov:others", "Other matches") +
        tvBtn(0, 8, "ov:phone", "Play along on phone") +
        '</div></div>';
    }

    if (t.overlay === "audio") {
      var lastG = "";
      out += '<div class="tvsheet"><p class="tvcatchkick">Listen to</p>' + voiceList(e).map(function (o, k) {
        var head = o[4] !== lastG ? '<p class="tvgroup">' + esc(o[4]) + '</p>' : "";
        lastG = o[4];
        return head + '<button class="tvopt' + (t.audio === o[0] ? " sel" : "") + (o[5] ? " withav" : "") + '" type="button" data-tvf="' + k + ',0" data-tvact="audio:' + o[0] + '">' +
          (o[5] ? '<span class="vav lg" style="background:' + o[6] + '">' + esc(o[5]) + '</span>' : "") +
          '<b>' + esc(o[2]) + '</b><span>' + esc(o[3]) + '</span>' + (t.audio === o[0] ? '<i>' + I.tickplain + '</i>' : "") + '</button>';
      }).join("") + '</div>';
    }

    /* the experts, the ten-foot way: watch with one of them, or hear an
       answer that went out on air. Asking a question is for the phone */
    if (t.overlay === "experts" && PUNDITS[e.id]) {
      var PD = PUNDITS[e.id], row = 0;
      out += '<div class="tvsheet"><p class="tvcatchkick">The experts</p>' +
        PD.hosts.map(function (h) {
          var r = row++;
          return '<button class="tvopt withav" type="button" data-tvf="' + r + ',0" data-tvact="' + (h[5] ? "audio:" + h[5] : "ov:phone") + '">' +
            '<span class="vav lg" style="background:' + h[4] + '">' + esc(h[0]) + '</span><b>' + esc(h[1]) + '</b>' +
            '<span>' + esc(h[2]) + ' · ' + esc(h[3]) + '</span><em class="tvworth dim">' + (h[5] ? "Watch with" : "Ask on your phone") + '</em></button>';
        }).join("") +
        '<p class="tvgroup">Answered on air</p>' + PD.answered.map(function (a) {
          var r = row++;
          return '<button class="tvopt" type="button" data-tvf="' + r + ',0" data-tvact="answer:' + r + '">' +
            '<b>' + esc(a[0]) + '</b><span>' + esc(a[1]) + ' · ' + esc(a[2]) + '</span></button>';
        }).join("") +
        '<div class="tvask">' + qrSVG() + '<span><b>Ask a question</b>Scan to ask from your phone. The most-voted go to the studio.</span></div></div>';
    }

    if (t.overlay === "others") {
      out += '<div class="tvsheet"><p class="tvcatchkick">Also live</p>' + rankedCards().map(function (x, k) {
        var ww = tvWatching(x.e);
        return '<button class="tvopt' + (x.i === t.ev ? " sel" : "") + '" type="button" data-tvf="' + k + ',0" data-tvact="switch:' + x.i + '">' +
          '<b>' + esc(x.c.line1) + '</b><span>' + esc(x.e.comp) + (ww ? " · " + esc(ww) + " watching" : "") + '</span>' +
          (k === 0 ? '<em class="tvworth">Worth watching</em>' : "") + '</button>';
      }).join("") + '</div>';
    }

    if (t.overlay === "phone") {
      out += '<div class="tvsheet wide"><div class="tvpair">' + qrSVG(true) + '<div>' +
        '<p class="tvcatchkick">Scan with your phone camera</p>' +
        '<h1>Play along without covering the match</h1>' +
        '<ul><li>Predictions and polls, settled as it happens</li><li>Player ratings and the full stats</li><li>The conversation, and your mates\' calls</li></ul>' +
        '<p class="tvline">Your phone follows this TV, held back to match the picture.</p>' +
        '<div class="tvbtns">' + tvBtn(0, 0, "pair", t.paired ? "Paired" : "I've scanned it", "pri") + '</div></div></div></div>';
    }
    return out;
  }

  function qrSVG(big) {
    var n = 21, x = 97531, cells = "";
    for (var r = 0; r < n; r++) {
      for (var c = 0; c < n; c++) {
        var finder = (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7);
        var on;
        if (finder) {
          var rr = r >= n - 7 ? r - (n - 7) : r, cc = c >= n - 7 ? c - (n - 7) : c;
          on = rr === 0 || rr === 6 || cc === 0 || cc === 6 || (rr > 1 && rr < 5 && cc > 1 && cc < 5);
        } else {
          x = (x * 1103515245 + 12345) & 0x7fffffff;
          on = (x >> 8) % 2 === 0;
        }
        if (on) { cells += '<rect x="' + c + '" y="' + r + '" width="1" height="1"/>'; }
      }
    }
    return '<svg class="tvqr' + (big ? " big" : "") + '" viewBox="-2 -2 25 25" aria-hidden="true"><rect x="-2" y="-2" width="25" height="25" fill="#fff"/><g fill="#000">' + cells + '</g></svg>';
  }

  function renderTV() {
    var host = $("#tvapp");
    if (!host) { return; }
    var t = tvs();
    resetUsed();
    var body = t.screen === "player" ? tvPlayer() : t.screen === "catchup" ? tvCatchup() : tvHome();
    host.innerHTML = '<div class="tv s-' + t.screen + (t.screen === "home" && t.f[0] >= 2 ? " deep" : "") + (t.overlay ? " ov" : "") + '">' + body + '</div>';
    tvFocus();
    $$("[data-tvact]", host).forEach(function (b) {
      b.onclick = function () {
        t.f = b.dataset.tvf.split(",").map(Number);
        t.focus = true;
        tvAct(b.dataset.tvact);
      };
    });
    fitTV();
  }

  function tvFocusables() {
    return $$("[data-tvf]", $("#tvapp")).map(function (el) {
      var p = el.dataset.tvf.split(",").map(Number);
      return { el: el, r: p[0], c: p[1] };
    });
  }

  function tvFocus() {
    var t = tvs(), list = tvFocusables();
    if (!list.length) { return; }
    var hit = list.filter(function (x) { return x.r === t.f[0] && x.c === t.f[1]; })[0];
    if (!hit) {
      var row = list.filter(function (x) { return x.r === t.f[0]; });
      hit = row.length ? row.reduce(function (a, b) { return Math.abs(b.c - t.f[1]) < Math.abs(a.c - t.f[1]) ? b : a; }) : list[0];
      t.f = [hit.r, hit.c];
    }
    hit.el.classList.add("tvfocus");
    var row2 = hit.el.closest(".tvrow");
    if (row2 && row2.children.length > 1) {
      /* scroll only once the focus would leave the right-hand edge */
      var kids = [].slice.call(row2.children), ix = kids.indexOf(hit.el);
      var step = kids[1].offsetLeft - kids[0].offsetLeft;
      var vis = Math.max(1, Math.floor((row2.clientWidth - 64) / step));
      row2.scrollLeft = Math.max(0, (ix - vis + 1) * step);
    }
  }

  function tvMove(dr, dc) {
    var t = tvs(), list = tvFocusables();
    if (!list.length) { return; }
    if (dr) {
      var rows = list.map(function (x) { return x.r; }).filter(function (v, i, a) { return a.indexOf(v) === i; }).sort(function (a, b) { return a - b; });
      var ix = rows.indexOf(t.f[0]) + dr;
      if (ix < 0 || ix >= rows.length) {
        /* off the bottom of a clean player opens the controls */
        if (t.screen === "player" && !t.overlay && dr > 0) { t.overlay = "controls"; t.f = [0, 1]; renderTV(); }
        return;
      }
      t.f = [rows[ix], t.f[1]];
    } else {
      var row = list.filter(function (x) { return x.r === t.f[0]; }).map(function (x) { return x.c; }).sort(function (a, b) { return a - b; });
      var j = row.indexOf(t.f[1]) + dc;
      if (j < 0 || j >= row.length) { return; }
      t.f = [t.f[0], row[j]];
    }
    renderTV();
  }

  function tvBack() {
    var t = tvs();
    if (t.overlay) { t.overlay = null; t.f = [0, 1]; }
    else if (t.screen !== "home") { t.screen = "home"; t.f = [0, 0]; t.toast = null; t.phoneT = 0; }
    renderTV();
  }

  function tvGo(screen, ix, mode) {
    var t = tvs();
    t.screen = screen;
    if (ix !== undefined && ix !== null) { t.ev = ix; }
    t.overlay = null; t.toast = null; t.phoneT = 0; t.mt = 0; t.mi = -1;
    t.mode = mode || (lc() === "fulltime" ? "highlights" : "live");
    t.f = [0, 0];
    if (screen === "catchup") { t.rix = 0; t.rel = 0; t.rplay = true; t.rmode = "watch"; }
    if (S.surface === "together" && screen === "player" && S.eventIx !== t.ev) {
      /* the phone follows the telly to the new match */
      syncPhoneTo(t.ev); render(); return;
    }
    renderTV();
  }

  function tvAct(act) {
    var t = tvs(), p = act.split(":"), k = p[0], v = p[1];
    if (k === "watch") { tvGo("player", Number(v)); return; }
    if (k === "start") { tvGo("player", Number(v), lc() === "fulltime" ? "highlights" : "start"); return; }
    if (k === "catchup") { tvGo("catchup", Number(v)); return; }
    if (k === "remind") { t.remind[v] = !t.remind[v]; if (!S.reminders) { S.reminders = {}; } S.reminders[v] = t.remind[v]; renderTV(); return; }
    if (k === "skip") { tvGo("player", t.ev); return; }
    if (k === "rmode") { t.rmode = t.rmode === "watch" ? "listen" : "watch"; t.rel = 0; t.rplay = true; renderTV(); return; }
    if (k === "rpause") { t.rplay = !t.rplay; renderTV(); return; }
    if (k === "golive") { t.mode = "live"; t.overlay = null; renderTV(); return; }
    if (k === "ov") { t.overlay = v; t.f = [0, 0]; renderTV(); return; }
    if (k === "audio") { t.audio = v; t.overlay = "controls"; t.f = [0, 1]; renderTV(); return; }
    if (k === "answer") {
      var PDa = PUNDITS[tvEvent().id], ai = Number(v) - PDa.hosts.length, an = PDa.answered[ai];
      t.overlay = null; t.toast = [an[0], "Answered on air", an[1]]; t.toastT = 7; t.phoneT = 0; renderTV(); return;
    }
    if (k === "subs") { t.subs = !t.subs; renderTV(); return; }
    if (k === "stats") { t.stats = !t.stats; renderTV(); return; }
    if (k === "switch") { tvGo("player", Number(v)); return; }
    if (k === "court2") {
      t.c2 = true; t.mt = 0; t.mi = -1; t.f = [0, 0];
      if (S.surface === "together") { phoneNudge(["", "Your telly is on Court 2", "Raducanu v Vondroušová. Break points coming up"], tvEvent()); }
      renderTV(); return;
    }
    if (k === "stay") { t.stay = true; renderTV(); return; }
    if (k === "pair") { t.paired = true; t.overlay = null; if (S.surface !== "together") { setSurface("together"); } else { renderTV(); } return; }
  }

  function tvKey(e) {
    var t = tvs(), k = e.key;
    if (k === "ArrowUp") { e.preventDefault(); tvMove(-1, 0); }
    else if (k === "ArrowDown") { e.preventDefault(); tvMove(1, 0); }
    else if (k === "ArrowLeft") { e.preventDefault(); tvMove(0, -1); }
    else if (k === "ArrowRight") { e.preventDefault(); tvMove(0, 1); }
    else if (k === "Enter" || k === " ") {
      e.preventDefault();
      if (t.screen === "player" && !t.overlay && !$("#tvapp [data-tvf]")) { t.overlay = "controls"; t.f = [0, 1]; renderTV(); return; }
      var f = $("#tvapp .tvfocus");
      if (f) { f.click(); }
    }
    else if (k === "Escape" || k === "Backspace") { e.preventDefault(); tvBack(); }
    else if (k === "s" || k === "S") { if (t.screen === "player") { t.stats = !t.stats; renderTV(); } }
  }

  /* runs on the media clock */
  function tickTV(dt) {
    if (S.surface !== "tv" && S.surface !== "together") { return; }
    var t = tvs(), e, R, redraw = false;
    if (t.screen === "catchup" && t.rplay) {
      e = tvEvent(); R = RECAPS[e.id];
      t.rel += dt;
      if (t.rmode === "watch" && t.rel >= 4.5) {
        t.rel = 0;
        if (t.rix < R.moments.length - 1) { t.rix += 1; } else { tvGo("player", t.ev); return; }
      }
      if (t.rmode === "listen" && t.rel >= secs(R.listen)) { tvGo("player", t.ev); return; }
      /* redraw only when the slide or spoken line changes; otherwise move the
         progress in place, so the text is not re-animated five times a second */
      if (t.rmode === "watch") {
        if (t.rel < dt + 0.001) { redraw = true; }
        else { var seg = $("#tvapp .tvsegs .on i"); if (seg) { seg.style.width = Math.min(100, t.rel / 4.5 * 100).toFixed(1) + "%"; } else { redraw = true; } }
      } else {
        var dur = secs(R.listen), n = R.moments.length, k = Math.min(n - 1, Math.floor(t.rel / dur * n));
        var fill = $("#tvapp .tvwave .rcpwavefill"), tm = $("#tvapp .tvtimes span");
        if (fill && k === t.lk) {
          fill.style.clipPath = "inset(0 " + (100 - Math.min(100, t.rel / dur * 100)).toFixed(1) + "% 0 0)";
          if (tm) { tm.textContent = mmss(Math.floor(t.rel)); }
        } else { t.lk = k; redraw = true; }
      }
    }
    if (t.screen === "player" && lc() !== "fulltime" && t.mode !== "highlights" && !centreCourt(tvEvent())) {
      e = tvEvent();
      var list = TVMOMENTS[e.id] || [];
      t.mt += dt;
      if (Math.random() < 0.02) {
        t.bump += 1 + Math.floor(Math.random() * 9);
        var wb = $("#tvapp .tvtop .tvwatch b"), wv = tvWatching(e);
        if (wb && wv) { wb.textContent = wv; }
      }
      if (t.toastT > 0) { t.toastT -= dt; if (t.toastT <= 0) { t.toast = null; t.phoneT = 9; redraw = true; } }
      else if (t.phoneT > 0) { t.phoneT -= dt; if (t.phoneT <= 0) { redraw = true; } }
      if (t.mt >= (t.mi < 0 ? 4 : 16) && list.length) {
        t.mt = 0; t.mi = (t.mi + 1) % list.length;
        t.toast = list[t.mi]; t.toastT = 7; t.phoneT = 0;
        if (S.surface === "together") { phoneNudge(list[t.mi], e); }
        redraw = true;
      }
    }
    if (redraw) { renderTV(); }
  }

  /* ---- surfaces ---- */

  var SURFACES = [
    ["phone", "Phone app"],
    ["web", "Website"],
    ["tv", "iPlayer TV"],
    ["together", "TV and phone"]
  ];

  function setSurface(s) {
    S.surface = s;
    var t = tvs();
    if (s === "together") {
      /* the second-screen state is the one this pairing exists for */
      if (lc() !== "companion" && lc() !== "fulltime" && lc() !== "buildup") { S.lcIx = 2; }
      /* start the pairing on the match: the phone's paired state is written for it */
      if (t.screen !== "player") {
        var fb = -1; EVENTS.forEach(function (x, i) { if (x.id === "football") { fb = i; } });
        t.ev = fb >= 0 ? fb : rankedCards()[0].i; tvGo("player", t.ev);
      }
      syncPhoneTo(t.ev);
      t.paired = true;
      t.focus = true;
    }
    if (s === "tv") { t.focus = true; }
    $$(".sf").forEach(function (b) { b.setAttribute("aria-selected", String(b.dataset.surface === s)); });
    document.body.dataset.surface = s;
    render();
  }

  function syncPhoneTo(ix) {
    if (ix === null || ix === undefined) { return; }
    S.eventIx = ix; S.view = "event"; S.nav = "home";
  }

  function phoneNudge(m, e) {
    var vp = $("#app .viewport");
    if (!vp) { return; }
    var old = $(".nudge", vp);
    if (old) { old.remove(); }
    vp.insertAdjacentHTML("beforeend", '<div class="nudge" role="status"><span class="nudgek">On your telly</span>' +
      '<b>' + esc(m[1]) + '</b><span>' + esc(m[2]) + '</span></div>');
    setTimeout(function () { var n = $(".nudge", vp); if (n) { n.classList.add("out"); } }, 6000);
    setTimeout(function () { var n = $(".nudge", vp); if (n) { n.remove(); } }, 6600);
  }

  function fitTV() {
    var set = $("#tvset"), scr = $("#tvapp");
    if (!set || set.hidden || !scr) { return; }
    var avail = scr.parentNode.clientWidth;
    var sc = Math.min(1, avail / 1280);
    scr.style.transform = "scale(" + sc + ")";
    set.style.setProperty("--tvh", Math.round(720 * sc) + "px");
  }
  window.addEventListener("resize", fitTV);

  /* ------------------------------------------------------------- moves */

  function goLc(ix) {
    if (ix < 0 || ix >= LIFECYCLE.length || ix === S.lcIx) { return; }
    var dir = ix > S.lcIx ? 1 : -1;
    S.lcIx = ix;
    S.nav = "home";
    S.push = null;
    render(dir);
    if ($("#scrollbody")) { $("#scrollbody").scrollTop = 0; }
    if (LIFECYCLE[ix].id === "companion") { setTimeout(sendCompanionPush, 1400); }
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
    /* the part of the day changes only from the pills at the top. Swipes
       and arrow keys used to do it too, and fought with scrolling rails */

    document.addEventListener("keydown", function (e) {
      if (e.target.matches("input, select, textarea")) { return; }
      if (S.player === null && (S.surface === "tv" || (S.surface === "together" && tvs().focus))) { tvKey(e); return; }
      if (S.player !== null) {
        if (e.key === "Escape") { closePlayer(); }
        if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); stepClip(1); }
        if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); stepClip(-1); }
        return;
      }
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

    seedRecaps();
    seedPundits();
    S.surface = "phone";
    var sfh = $("#surface");
    if (sfh) {
      sfh.innerHTML = SURFACES.map(function (x) {
        return '<button class="sf" role="tab" type="button" data-surface="' + x[0] + '" aria-selected="' + (x[0] === "phone") + '">' + esc(x[1]) + '</button>';
      }).join("");
      $$(".sf").forEach(function (b) { b.onclick = function () { setSurface(b.dataset.surface); }; });
    }
    var tvset = $("#tvset"), dev = $("#device");
    if (tvset) { tvset.addEventListener("pointerdown", function () { tvs().focus = true; }); }
    if (dev) { dev.addEventListener("pointerdown", function () { if (S.surface === "together") { tvs().focus = false; } }); }
    render();
    attachSwipe();
    startClocks();
    setInterval(tickMedia, 200);
  }

  if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", boot); }
  else { boot(); }
})();
