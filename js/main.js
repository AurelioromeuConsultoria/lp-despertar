(function () {
  "use strict";

  /** @type {string} Data/hora final ISO 8601 — ajuste no HTML: data-countdown-end */
  function initCountdown() {
    var el = document.getElementById("countdown");
    if (!el) return;

    var endAttr = el.getAttribute("data-end");
    var end = endAttr ? new Date(endAttr).getTime() : Date.now() + 3 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000;

    var daysEl = document.getElementById("cd-days");
    var hoursEl = document.getElementById("cd-hours");
    var minsEl = document.getElementById("cd-mins");
    var secsEl = document.getElementById("cd-secs");

    function tick() {
      var now = Date.now();
      var diff = Math.max(0, end - now);

      var s = Math.floor(diff / 1000);
      var days = Math.floor(s / 86400);
      s %= 86400;
      var hours = Math.floor(s / 3600);
      s %= 3600;
      var mins = Math.floor(s / 60);
      var secs = s % 60;

      function pad(n) {
        return String(n).padStart(2, "0");
      }

      if (daysEl) daysEl.textContent = String(days);
      if (hoursEl) hoursEl.textContent = pad(hours);
      if (minsEl) minsEl.textContent = pad(mins);
      if (secsEl) secsEl.textContent = pad(secs);
    }

    tick();
    setInterval(tick, 1000);
  }

  function initCarousel(rootSelector) {
    var root = document.querySelector(rootSelector);
    if (!root) return;

    var track = root.querySelector("[data-carousel-track]");
    var slides = root.querySelectorAll("[data-carousel-slide]");
    var prev = root.querySelector("[data-carousel-prev]");
    var next = root.querySelector("[data-carousel-next]");
    var dotsContainer = root.querySelector("[data-carousel-dots]");

    if (!track || slides.length === 0) return;

    var index = 0;

    function go(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = "translateX(-" + index * 100 + "%)";
      slides.forEach(function (slide, j) {
        slide.setAttribute("aria-hidden", j !== index ? "true" : "false");
      });
      if (dotsContainer) {
        var dots = dotsContainer.querySelectorAll("[data-carousel-dot]");
        dots.forEach(function (dot, j) {
          dot.setAttribute("aria-current", j === index ? "true" : "false");
        });
      }
    }

    if (prev) prev.addEventListener("click", function () { go(index - 1); });
    if (next) next.addEventListener("click", function () { go(index + 1); });

    if (dotsContainer && slides.length) {
      slides.forEach(function (_, j) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "carousel__dot";
        dot.setAttribute("data-carousel-dot", "");
        dot.setAttribute("aria-label", "Slide " + (j + 1));
        dot.addEventListener("click", function () { go(j); });
        dotsContainer.appendChild(dot);
      });
      go(0);
    } else {
      go(0);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initCountdown();
    initCarousel("[data-carousel-modules]");
    initCarousel("[data-carousel-testimonials]");
  });
})();
