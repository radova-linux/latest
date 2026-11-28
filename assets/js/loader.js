// Loads what the first paint does not need: js/latest.bundle.js?v=5 and htmx
// (css/fonts.css is linked non-blocking in <head>). Paths are relative to this file.
(function () {
  "use strict";
  var base = document.currentScript.src;
  var loaded = false;
  var ready = false;
  var pending = null; // a button clicked before the bundle arrived; clicked again once it has

  function add(tag, attrs) {
    var el = document.createElement(tag);
    for (var k in attrs) el[k] = attrs[k];
    (tag === "link" ? document.head : document.body).appendChild(el);
    return el;
  }

  function onClick(e) {
    var t = e.target.closest && e.target.closest("#theme-toggle, #lang-toggle, .nav-toggle, #about-menu-btn, .d-content-back");
    if (!t || ready) return;
    pending = t;
    load(); // a click that came without a pointer or key event first (assistive tech) still loads the bundle
  }

  function load() {
    if (loaded) return;
    loaded = true;
    // htmx starts only before DOMContentLoaded or once readyState is "complete"; in between it never does.
    function htmx() { add("script", { src: new URL("../htmx.min.js", base).href }); }
    if (document.readyState === "complete") htmx();
    else addEventListener("load", htmx, { once: true });
    add("script", {
      src: new URL("latest.bundle.js?v=5", base).href,
      onload: function () {
        ready = true;
        document.removeEventListener("click", onClick, true);
        if (pending) { var p = pending; pending = null; p.click(); }
      }
    });
  }

  document.addEventListener("click", onClick, true);
  ["pointerdown", "keydown", "touchstart", "scroll", "mouseover", "focusin"].forEach(function (type) {
    addEventListener(type, load, { once: true, passive: true });
  });

  // A saved dark theme needs the bundle now, not on the first interaction.
  try {
    if (localStorage.getItem("radova-theme") === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      load();
    }
  } catch (_) {}

  // Otherwise load it right after the DOM is ready, without waiting for an interaction.
  if (document.readyState === "complete" || document.readyState === "interactive") setTimeout(load, 1);
  else document.addEventListener("DOMContentLoaded", function () { setTimeout(load, 1); }, { once: true });
})();
