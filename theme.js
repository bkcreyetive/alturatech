(function () {
  var root = document.documentElement;
  var KEY = "altura-theme-mode";
  var media = window.matchMedia("(prefers-color-scheme: dark)");

  function resolve(mode) {
    if (mode === "system") return media.matches ? "dark" : "light";
    return mode;
  }

  function icon(mode) {
    if (mode === "light") return "☀️";
    if (mode === "dark") return "🌙";
    return "🖥️";
  }

  function applyMode(mode) {
    root.setAttribute("data-theme", resolve(mode));
    root.setAttribute("data-theme-mode", mode);
    var iconEls = document.querySelectorAll(".theme-icon");
    for (var i = 0; i < iconEls.length; i++) {
      iconEls[i].textContent = icon(mode);
    }
    var items = document.querySelectorAll(".theme-menu-item");
    for (var j = 0; j < items.length; j++) {
      var isActive = items[j].getAttribute("data-theme-choice") === mode;
      items[j].classList.toggle("active-choice", isActive);
    }
  }

  var currentMode = localStorage.getItem(KEY) || "dark";
  applyMode(currentMode);

  media.addEventListener("change", function () {
    if ((localStorage.getItem(KEY) || "dark") === "system") {
      applyMode("system");
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("themeToggleBtn");
    var menu = document.getElementById("themeMenu");
    if (!btn || !menu) return;

    applyMode(localStorage.getItem(KEY) || "dark");

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = menu.classList.toggle("theme-menu-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });

    var items = menu.querySelectorAll("[data-theme-choice]");
    for (var i = 0; i < items.length; i++) {
      items[i].addEventListener("click", function () {
        var choice = this.getAttribute("data-theme-choice");
        localStorage.setItem(KEY, choice);
        applyMode(choice);
        menu.classList.remove("theme-menu-open");
        btn.setAttribute("aria-expanded", "false");
      });
    }

    document.addEventListener("click", function (e) {
      if (!menu.contains(e.target) && !btn.contains(e.target)) {
        menu.classList.remove("theme-menu-open");
        btn.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        menu.classList.remove("theme-menu-open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  });
})();
