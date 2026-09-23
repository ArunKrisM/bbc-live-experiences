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
      { s: "fb-palmer", p: "pre", a: "A pundit makes the case for Cole Palmer" },
      { s: "fb-debate", p: "pre", a: "Two England selection calls, side by side" },
      { s: "fb-kane", p: "live", a: "England shoot from the edge of the area" },
      { s: "fb-celebrate", p: "post", a: "England players celebrate a goal" },
      { s: "fb-highlights", p: "post", a: "Highlights of the England match" },
      { s: "fb-bellingham", p: "post", a: "England's best player of the night" }
    ],
    tennis: [
      { s: "tn-field", p: "pre", a: "The field at a grand slam" },
      { s: "tn-forehand", p: "live", a: "Raducanu strikes a forehand" },
      { s: "tn-raducanu", p: "live", a: "Raducanu stretches wide for a forehand" },
      { s: "tn-roar", p: "post", a: "Raducanu roars after taking the point" }
    ],
    rugby: [
      { s: "rg-squad", p: "pre", a: "The Ireland side for this afternoon" },
      { s: "rg-listen", p: "pre", a: "An Ireland forward before kick-off" },
      { s: "rg-flyhalves", p: "pre", a: "The two fly-halves, side by side" },
      { s: "rg-wales", p: "pre", a: "A Wales forward leaves the field" },
      { s: "rg-maul", p: "live", a: "Wales and Ireland forwards contest a maul" },
      { s: "rg-run", p: "live", a: "A back runs at the defence" },
      { s: "rg-roar", p: "post", a: "An Ireland player roars at the final whistle" }
    ],
    cricket: [
      { s: "ck-ball", p: "live", a: "An England bowler works on the ball" },
      { s: "ck-root", p: "post", a: "Root celebrates a Test century" },
      { s: "ck-lords", p: "post", a: "England celebrate a wicket at Lord's" },
      { s: "ck-huddle", p: "post", a: "England celebrate together in the field" }
    ]
  };

  /* every slug and the crops that exist for it, so a card never asks for a
     file that was never cut */
  var SLOTS = {
    "fb-kane": "wide tall sq", "fb-xi": "wide tall sq", "fb-palmer": "wide tall sq",
    "fb-debate": "wide tall sq", "fb-celebrate": "wide tall sq", "fb-highlights": "wide sq",
    "fb-bellingham": "wide tall sq", "fb-tuchel": "tall sq",
    "tn-roar": "wide tall sq", "tn-forehand": "wide tall sq", "tn-raducanu": "wide sq",
    "tn-field": "wide sq", "tn-challenge": "tall sq", "tn-books": "tall sq",
    "rg-maul": "wide tall sq", "rg-run": "wide tall sq", "rg-flyhalves": "wide sq",
    "rg-wales": "wide tall sq", "rg-squad": "wide tall sq", "rg-listen": "wide tall sq",
    "rg-roar": "wide tall sq",
    "ck-root": "wide tall sq", "ck-lords": "wide tall sq",
    "ck-huddle": "wide tall sq", "ck-ball": "wide tall sq"
  };

  function slotFor(slug, ratio) {
    var want = ratio === "tall" ? "tall" : ratio === "square" ? "sq" : "wide";
    var have = SLOTS[slug] || "";
    if (have.indexOf(want) >= 0) { return want; }
    return have.indexOf("wide") >= 0 ? "wide" : have.indexOf("tall") >= 0 ? "tall" : "sq";
  }

  function imgTag(slug, alt, ratio) {
    return '<img class="photo" src="img/' + slug + '-' + slotFor(slug, ratio) + '.jpg" ' +
      'loading="lazy" decoding="async" alt="' + esc(alt || "") + '">';
  }

  function pickPhoto(kind, key) {
    var pool = PHOTOS[kind];
    if (!pool || !pool.length) { return null; }
    var want = PHASE[lc()] || "live";
    var fit = pool.filter(function (x) { return x.p === want; });
    if (!fit.length) {
      /* a preview frame stands in for live far better than a celebration does */
      fit = pool.filter(function (x) { return x.p !== "post"; });
    }
    if (!fit.length) { fit = pool; }
    return fit[hashStr(String(key) + "|" + kind + "|" + want) % fit.length];
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

  /* ---- the immersive live takeover -------------------------------------
     Whatever is most worth watching right now fills the top of Home: the
     picture runs full bleed, and the only thing on top of it is the state of
     the thing itself plus one way in. */

  function rankedCards() {
    var order = { live: 0, soon: 1, done: 2 };
    return EVENTS.map(function (e, i) { return { e: e, i: i, c: evState(e).card }; })
      .sort(function (a, b) {
        if (order[a.c.status] !== order[b.c.status]) { return order[a.c.status] - order[b.c.status]; }
        return b.c.sig - a.c.sig;
      });
  }

  function takeoverHero() {
    var x = rankedCards()[0], e = x.e, st = evState(e);
    var TK = e.takeover || {}, T = TK[lc()] || { stats: [] };
    var status = x.c.status === "live" ? "LIVE" : x.c.status === "soon" ? "STARTING SOON" : "FULL TIME";

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
      photoSVG(e.photo, "tall", e.sport + " " + e.title + " " + lc()) +
      '</div><span class="toveil"></span><span class="tosweep"></span></div>' +

      '<div class="totop">' +
      '<span class="tochip' + (x.c.status === "live" ? " on" : "") + '"><i></i>' + status + '</span>' +
      (st.watching ? '<span class="towatch">' + esc(st.watching) + ' watching</span>' : "") +
      '<span class="tospacer"></span>' +
      '<button class="toic" type="button" data-toast="Audio is not wired up in this prototype." aria-label="Sound">' + I.speaker + '</button>' +
      '<button class="toic" type="button" data-toast="Full screen is not wired up in this prototype." aria-label="Full screen">' + I.expand + '</button>' +
      '</div>' +

      '<div class="tocard">' +
      '<p class="tokick">' + (I.sport[e.sport] || "") + esc(e.sport) + ' · ' + esc(e.comp) + '</p>' +
      '<div class="tonames">' +
      '<span class="tos"><i style="background:' + TK.ca + '"></i>' + esc(TK.a || "") + '</span>' +
      '<span class="toline">' + esc(T.line || "") + '</span>' +
      '<span class="tos r">' + esc(TK.b || "") + '<i style="background:' + TK.cb + '"></i></span></div>' +
      (T.sub ? '<p class="tosub">' + esc(T.sub) + '</p>' : "") +
      '<div class="tostats">' + bars + '</div>' +
      '<button class="tocta" type="button" data-open="' + x.i + '">' +
      '<span>' + esc(T.cta || "Open the experience") + '</span>' + I.chevron + '</button>' +
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
          '<span class="vpimg">' + photoSVG(photo, "wide", poll.id + "#" + k) + '<span class="vpveil"></span>' +
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

  function storyCard(hero) {
    return '<section class="story">' +
      '<div class="stphoto">' + photoSVG(hero.photo, "wide", "story " + hero.head) +
      '<span class="stveil"></span>' +
      '<span class="stkick">' + esc(hero.kicker) + '</span>' +
      '<h2 class="sthead">' + esc(hero.head) + '</h2></div>' +
      '<div class="stbody"><p class="ststand">' + esc(hero.stand) + '</p>' +
      '<div class="engage">' +
      '<span class="eng">' + I.comment + esc(hero.comments) + '</span>' +
      '<span class="eng">' + I.heart + esc(hero.likes) + '</span>' +
      '<span class="eng">' + I.send + esc(hero.shares) + '</span></div></div></section>';
  }

  function homeBody() {
    var hero = HOMEFEED.hero[lc()] || HOMEFEED.hero.live;
    var cards = rankedCards();
    var bySig = cards.slice().sort(function (a, b) { return b.c.sig - a.c.sig; });
    var out = "";

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
          : c.status === "soon" ? '<span class="chipsoon">' + esc(c.when.split(" ·")[0]) + '</span>'
          : '<span class="chipdone">' + esc(c.when.split(" ·")[0]) + '</span>';
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
          '<span class="ec-when' + (c.status === "live" ? " live" : "") + '">' + esc(c.when) + '</span></span>' +
          '<span class="ec-title">' + esc(c.line1) + '</span>' +
          '<span class="ec-ctx">' + esc(c.ctx) + '</span></span></button>';
      }).join("") + '</div></section>';

    /* 6. the drop, one in focus with the rest peeking */
    var v = HOMEFEED.videos;
    out += '<section class="section">' + feedHead(v.title, "The video index is not built out in this prototype.") +
      '<div class="focusrail" data-focusrail>' + v.deck.map(function (ix) {
        var it = DROP[ix];
        return '<button class="fcard" type="button" data-play="' + ix + '">' +
          '<span class="fphoto">' + photoSVG(it, "tall", it.sport + " " + it.t) +
          '<span class="fscrim"></span>' +
          '<span class="play">' + I.playtri + '</span>' +
          '<span class="dur">' + esc(it.dur) + '</span>' +
          '<span class="fmeta"><span class="fkick">' + esc(it.sport) + '</span>' +
          '<span class="ftitle">' + esc(it.t) + '</span></span></span></button>';
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
      /* Hysteresis plus a room check. Collapsing the header shortens the page,
         which can push scrollTop back under the threshold and start an
         expand/collapse loop. Two thresholds and a minimum scroll height stop it. */
      var pending = false;
      sb.addEventListener("scroll", function () {
        if (pending) { return; }
        pending = true;
        requestAnimationFrame(function () {
          pending = false;
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
      '<button class="iconbtn dbadge" type="button" data-toast="Replies are not wired up in this prototype." aria-label="Replies">' +
      I.chat + '<i>3</i></button>' +
      '<button class="iconbtn dbadge" type="button" data-toast="Notifications are not wired up in this prototype." aria-label="Notifications">' +
      I.bell + '<i>2</i></button>' +
      '<button class="iconbtn" type="button" data-toast="Settings are not built out in this prototype." aria-label="Settings">' + I.gear + '</button>' +
      '</div>' +

      '<div class="dme"><span class="dav">M</span><h2>Matt</h2></div>' +

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
      '<nav>' + live.map(function (x) {
        var c = x.c;
        return '<button class="dl' + (S.view === "event" && x.i === S.eventIx ? " on" : "") + '" type="button" data-open="' + x.i + '">' +
          '<span>' + esc(x.e.sport) + '<span class="dsub">' + esc(c.line1) + '</span></span>' +
          (c.status === "live" ? '<span class="dlive">LIVE</span>' : '<span class="dwhen">' + esc(c.when.split(" ·")[0]) + '</span>') +
          '</button>';
      }).join("") + '</nav></section>' +

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
