/* =========================================================
   Titanium Fitness - script.js
   ========================================================= */
(function () {
    "use strict";

    /* Content is only hidden by CSS when this script is running */
    document.documentElement.classList.add("js");

    /* ---------- Helpers ---------- */
    var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
    var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function safeGet(key) {
        try { return localStorage.getItem(key); } catch (e) { return null; }
    }
    function safeSet(key, value) {
        try { localStorage.setItem(key, value); } catch (e) { /* storage unavailable */ }
    }

    /* ---------- Toast ---------- */
    var toastTimer;
    function showToast(message) {
        var toast = $("#toast");
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 2800);
    }

    /* ---------- Theme ---------- */
    function applyTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        var btn = $("#theme-toggle");
        if (btn) btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }

    window.changeTheme = function () {
        var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(next);
        safeSet("tf-theme", next);
    };

    applyTheme(document.documentElement.getAttribute("data-theme") || "light");

    /* ---------- Live date and time ---------- */
    function updateClock() {
        var now = new Date();
        var dateEl = $("#live-date");
        var timeEl = $("#live-time");
        if (dateEl) {
            dateEl.textContent = now.toLocaleDateString("en-IN", {
                weekday: "long", day: "numeric", month: "long", year: "numeric"
            });
        }
        if (timeEl) {
            timeEl.textContent = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
        }
    }
    updateClock();
    setInterval(updateClock, 30000);

    var yearEl = $("#year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------- Navigation ---------- */
    var nav = $("#nav");
    var burger = $("#burger");
    var navLinks = $("#nav-links");
    var toTop = $("#to-top");

    function onScroll() {
        var y = window.scrollY || document.documentElement.scrollTop;
        if (nav) nav.classList.toggle("scrolled", y > 10);
        if (toTop) toTop.classList.toggle("show", y > 600);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    function closeMenu() {
        if (!navLinks || !burger) return;
        navLinks.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
    }

    if (burger && navLinks) {
        burger.addEventListener("click", function () {
            var open = navLinks.classList.toggle("open");
            burger.setAttribute("aria-expanded", String(open));
        });
        $$("a", navLinks).forEach(function (a) { a.addEventListener("click", closeMenu); });
        document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
        document.addEventListener("click", function (e) {
            if (nav && !nav.contains(e.target)) closeMenu();
        });
    }

    if (toTop) {
        toTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
        });
    }

    /* Highlight the nav link of the section in view */
    var sectionLinks = {};
    $$('.links a[href^="#"]').forEach(function (a) {
        sectionLinks[a.getAttribute("href").slice(1)] = a;
    });
    if ("IntersectionObserver" in window) {
        var spy = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && sectionLinks[entry.target.id]) {
                    $$(".links a.active").forEach(function (a) { a.classList.remove("active"); });
                    sectionLinks[entry.target.id].classList.add("active");
                }
            });
        }, { rootMargin: "-45% 0px -50% 0px" });
        Object.keys(sectionLinks).forEach(function (id) {
            var sec = document.getElementById(id);
            if (sec) spy.observe(sec);
        });
    }

    /* ---------- Reveal on scroll, counters, progress bars ---------- */
    function animateCount(el) {
        var target = parseInt(el.getAttribute("data-count"), 10);
        var pad = parseInt(el.getAttribute("data-pad") || "0", 10);
        var format = function (n) { return pad ? String(n).padStart(pad, "0") : String(n); };
        if (reduceMotion) { el.textContent = format(target); return; }

        var duration = 1200;
        var start = null;
        function step(ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / duration, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = format(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    function activate(el) {
        el.classList.add("in");
        $$("[data-count]", el).forEach(animateCount);
        $$("[data-width]", el).forEach(function (bar) {
            bar.style.width = bar.getAttribute("data-width") + "%";
        });
    }

    var revealEls = $$(".reveal");
    if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    activate(entry.target);
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        revealEls.forEach(function (el) { io.observe(el); });
    } else {
        revealEls.forEach(activate);
    }

    /* ---------- BMI Calculator ---------- */
    var bmiCategories = [
        { max: 18.5, label: "Underweight", color: "#38bdf8", tip: "Consider a nutrient-rich diet and strength training to build healthy mass." },
        { max: 25,   label: "Normal weight", color: "#22c55e", tip: "Great work. Keep up a balanced diet and regular training." },
        { max: 30,   label: "Overweight", color: "#f59e0b", tip: "A mix of cardio, strength work and mindful nutrition can help." },
        { max: Infinity, label: "Obese", color: "#ef4444", tip: "Speak with a health professional and ask a trainer for a guided plan." }
    ];

    function setBmiError(msg) {
        var err = $("#bmi-error");
        if (err) err.textContent = msg || "";
    }

    window.calculateBMI = function () {
        var hEl = $("#height");
        var wEl = $("#weight");
        var out = $("#bmi-result");
        if (!hEl || !wEl || !out) return;

        var h = parseFloat(hEl.value);
        var w = parseFloat(wEl.value);
        hEl.classList.remove("invalid");
        wEl.classList.remove("invalid");

        if (isNaN(h) || isNaN(w)) {
            if (isNaN(h)) hEl.classList.add("invalid");
            if (isNaN(w)) wEl.classList.add("invalid");
            setBmiError("Please enter both height and weight.");
            return;
        }
        if (h < 50 || h > 250) {
            hEl.classList.add("invalid");
            setBmiError("Height must be between 50 and 250 cm.");
            return;
        }
        if (w < 10 || w > 300) {
            wEl.classList.add("invalid");
            setBmiError("Weight must be between 10 and 300 kg.");
            return;
        }

        setBmiError("");
        var m = h / 100;
        var bmi = w / (m * m);
        var cat = bmiCategories.find(function (c) { return bmi < c.max; });

        /* Map BMI 15 - 40 onto the gauge */
        var pos = Math.max(0, Math.min(100, ((bmi - 15) / 25) * 100));

        out.innerHTML =
            '<div class="bmi-value">' + bmi.toFixed(1) + '</div>' +
            '<div class="bmi-cat" style="color:' + cat.color + '">' + cat.label + '</div>' +
            '<div class="gauge"><span class="marker" style="left:0"></span></div>' +
            '<div class="gauge-labels"><span>15</span><span>18.5</span><span>25</span><span>30</span><span>40</span></div>' +
            '<p class="bmi-note">' + cat.tip + '</p>';

        var marker = $(".marker", out);
        requestAnimationFrame(function () {
            requestAnimationFrame(function () { marker.style.left = pos + "%"; });
        });
    };

    window.resetBMI = function () {
        var h = $("#height");
        var w = $("#weight");
        var out = $("#bmi-result");
        if (h) { h.value = ""; h.classList.remove("invalid"); }
        if (w) { w.value = ""; w.classList.remove("invalid"); }
        if (out) out.innerHTML = '<p class="placeholder">Your result will appear here.</p>';
        setBmiError("");
    };

    var bmiForm = $("#bmi-form");
    if (bmiForm) {
        bmiForm.addEventListener("submit", function (e) {
            e.preventDefault();
            window.calculateBMI();
        });
        bmiForm.addEventListener("keydown", function (e) {
            if (e.key === "Enter") { e.preventDefault(); window.calculateBMI(); }
        });
    }

    /* ---------- Workout of the Day ---------- */
    var workouts = {
        chest: {
            title: "Chest Day",
            meta: "45 min  |  Intermediate",
            moves: [
                ["Barbell Bench Press", "4 x 8"],
                ["Incline Dumbbell Press", "3 x 10"],
                ["Cable Fly", "3 x 12"],
                ["Push-ups", "3 x failure"],
                ["Dips", "3 x 10"]
            ]
        },
        back: {
            title: "Back Day",
            meta: "50 min  |  Intermediate",
            moves: [
                ["Deadlift", "4 x 6"],
                ["Pull-ups", "4 x 8"],
                ["Bent-over Row", "3 x 10"],
                ["Lat Pulldown", "3 x 12"],
                ["Seated Cable Row", "3 x 12"]
            ]
        },
        legs: {
            title: "Leg Day",
            meta: "55 min  |  Advanced",
            moves: [
                ["Back Squat", "4 x 8"],
                ["Romanian Deadlift", "3 x 10"],
                ["Walking Lunges", "3 x 12 each"],
                ["Leg Press", "3 x 12"],
                ["Calf Raises", "4 x 15"]
            ]
        },
        cardio: {
            title: "Cardio Blast",
            meta: "30 min  |  All levels",
            moves: [
                ["Warm-up Jog", "5 min"],
                ["HIIT Sprints (30s on / 30s off)", "10 min"],
                ["Rowing Machine", "8 min"],
                ["Jump Rope", "5 min"],
                ["Cool-down Walk", "2 min"]
            ]
        }
    };

    var currentCat = "chest";

    function renderWorkout(cat, shuffled) {
        var data = workouts[cat];
        var out = $("#workout-result");
        if (!data || !out) return;

        var moves = data.moves.slice();
        if (shuffled) {
            for (var i = moves.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var tmp = moves[i]; moves[i] = moves[j]; moves[j] = tmp;
            }
        }

        out.innerHTML =
            '<h3 class="workout-title">' + data.title + '</h3>' +
            '<p class="workout-meta">' + data.meta + '</p>' +
            '<ul class="exercise-list">' +
            moves.map(function (m, idx) {
                return '<li style="animation-delay:' + (idx * 70) + 'ms">' + m[0] + '<span>' + m[1] + '</span></li>';
            }).join("") +
            '</ul>';
    }

    function setCategory(cat) {
        currentCat = cat;
        var select = $("#workout-category");
        if (select) select.value = cat;
        $$(".tab").forEach(function (t) {
            t.setAttribute("aria-selected", String(t.getAttribute("data-cat") === cat));
        });
    }

    window.showWorkout = function () {
        var select = $("#workout-category");
        var cat = select ? select.value : currentCat;
        setCategory(cat);
        renderWorkout(cat, false);
    };

    window.shuffleWorkout = function () {
        renderWorkout(currentCat, true);
        showToast("Exercise order shuffled");
    };

    $$(".tab").forEach(function (tab) {
        tab.addEventListener("click", function () {
            setCategory(tab.getAttribute("data-cat"));
            renderWorkout(currentCat, false);
        });
    });

    var catSelect = $("#workout-category");
    if (catSelect) {
        catSelect.addEventListener("change", function () {
            setCategory(catSelect.value);
            renderWorkout(currentCat, false);
        });
    }

    /* ---------- Billing toggle ---------- */
    var billingSwitch = $("#billing-switch");
    function formatINR(n) { return "INR " + n.toLocaleString("en-IN"); }

    function setBilling(yearly) {
        if (!billingSwitch) return;
        billingSwitch.setAttribute("aria-checked", String(yearly));
        $$("[data-monthly]").forEach(function (el) {
            var value = parseInt(el.getAttribute(yearly ? "data-yearly" : "data-monthly"), 10);
            el.textContent = formatINR(value);
        });
    }
    if (billingSwitch) {
        billingSwitch.addEventListener("click", function () {
            setBilling(billingSwitch.getAttribute("aria-checked") !== "true");
        });
    }

    /* ---------- Contact form ---------- */
    var contactForm = $("#contact-form");
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function fieldError(id, msg) {
        var input = document.getElementById(id);
        var err = $('.field-error[data-for="' + id + '"]');
        if (input) input.classList.toggle("invalid", !!msg);
        if (err) err.textContent = msg || "";
        return !msg;
    }

    function validateContact() {
        var name = $("#contact-name").value.trim();
        var email = $("#contact-email").value.trim();
        var message = $("#contact-message").value.trim();

        var okName = fieldError("contact-name", name.length < 2 ? "Please enter your name." : "");
        var okEmail = fieldError("contact-email", !emailPattern.test(email) ? "Please enter a valid email address." : "");
        var okMsg = fieldError("contact-message", message.length < 10 ? "Message should be at least 10 characters." : "");
        return okName && okEmail && okMsg;
    }

    if (contactForm) {
        ["contact-name", "contact-email", "contact-message"].forEach(function (id) {
            var el = document.getElementById(id);
            if (el) el.addEventListener("input", function () { fieldError(id, ""); });
        });

        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            var result = $("#contact-result");
            if (!validateContact()) {
                result.className = "error";
                result.textContent = "Please fix the highlighted fields.";
                return;
            }

            var firstName = $("#contact-name").value.trim().split(" ")[0];
            result.className = "success";
            result.textContent = "Thanks, " + firstName + "! We will get back to you soon.";
            showToast("Message sent successfully");
            contactForm.reset();

            setTimeout(function () {
                result.textContent = "";
                result.className = "";
            }, 6000);
        });
    }
})();