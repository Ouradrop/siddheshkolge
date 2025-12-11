document.addEventListener("DOMContentLoaded", function() {

      document.body.classList.add('js-ready'); // Enable visibility of JS-dependent elements after JS loads
  // Initialize all components
  initMenu();
});

function initMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const ctaButton = document.querySelector(".nav-cta");
  const navbar = document.querySelector(".navbar");
  const menuOverlay = document.getElementById("menuOverlay");

  // Hide the nav menu immediately on initialization
  navLinks.classList.remove("active");

  // Move CTA button based on screen size
  function moveCTA() {
    if (window.innerWidth <= 1000) {
      if (navLinks && ctaButton && !navLinks.contains(ctaButton)) {
        navLinks.appendChild(ctaButton);
      }
    } else {
      if (navbar && ctaButton && navLinks.contains(ctaButton)) {
        navbar.insertBefore(ctaButton, hamburger);
      }
    }
  }

  // Close menu automatically if resizing to desktop width
  function closeMenuOnDesktop() {
    if (window.innerWidth > 1000) {
      navLinks.classList.remove("active");
      menuOverlay?.classList.remove("show");
      hamburger.classList.remove("open");
      enableScroll();
      window.__snapDisabled = false; // 🔓 re-enable snapping
    }
  }

  // Prevent transition jump on page load
  navLinks.style.transition = "none";
  requestAnimationFrame(() => {
    navLinks.style.transition = "";
  });

  moveCTA();
  closeMenuOnDesktop();

  window.addEventListener("resize", () => {
    moveCTA();
    closeMenuOnDesktop();
  });

  // --- Toggle Menu ---
  hamburger.addEventListener("click", () => {
    const isActive = navLinks.classList.toggle("active");

    if (isActive) {
      hamburger.classList.add("open");
      menuOverlay.classList.add("show");
      disableScroll();        // 🔒 Freeze background scroll
      window.__snapDisabled = true;  // 📴 Disable snap-scroll.js
    } else {
      hamburger.classList.remove("open");
      menuOverlay.classList.remove("show");
      enableScroll();         // 🔓 Restore scroll
      window.__snapDisabled = false; // 🔛 Enable snap-scroll.js
    }
  });

  // --- Overlay click closes menu ---
  menuOverlay?.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("open");
    menuOverlay.classList.remove("show");
    enableScroll();
    window.__snapDisabled = false; // 🔛 Enable snap-scroll.js
  });
}

/* =========================
   CLEAN SCROLL LOCK HELPERS
   ========================= */
function disableScroll() {
  document.documentElement.classList.add("no-scroll");
  document.body.classList.add("no-scroll");
}

function enableScroll() {
  document.documentElement.classList.remove("no-scroll");
  document.body.classList.remove("no-scroll");
}


// Navigation For Mobile Device - Closed




document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.add("js-ready");
  initMenu();
  startHeroTyping();   // ⬅ add this line
});

/* --------------------
   HERO TYPING EFFECT
   -------------------- */

function startHeroTyping() {
  const words = [
    "Depression",
    "Anxiety",
    "Addiction",
    "Burnout",
    "Stress"
  ];

  const el = document.getElementById("heroDynamicText");
  if (!el) return;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 100;       // typing speed
  const deleteSpeed = 60;      // deleting speed
  const holdTime = 5000;       // 5s hold on full word

  function type() {
    const current = words[wordIndex];

    if (!isDeleting) {
      // typing forward
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === current.length) {
        // full word typed – hold for 5s then delete
        setTimeout(function () {
          isDeleting = true;
          type();
        }, holdTime);
        return;
      }

      setTimeout(type, typeSpeed);
    } else {
      // deleting
      el.textContent = current.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length; // next word
        setTimeout(type, typeSpeed);
        return;
      }

      setTimeout(type, deleteSpeed);
    }
  }

  type();
}
