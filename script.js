// ==========================================
// WEDDING INVITATION SCRIPT
// Syed Suhail & Taskeen Fathima
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    initializeInvitation();
    initializeCountdown();
    initializeScrollReveal();
    initializeCopyAddress();
    initializeSmoothAnimations();

});

// ==========================================
// OPEN INVITATION
// ==========================================

function initializeInvitation() {

    const openButton = document.getElementById("openInvitationBtn");
    const landingScreen = document.getElementById("landing-screen");
    const mainInvitation = document.getElementById("mainInvitation");

    if (!openButton) return;

    openButton.addEventListener("click", () => {

        openButton.disabled = true;

        landingScreen.style.transition = "opacity 0.8s ease";
        landingScreen.style.opacity = "0";

        setTimeout(() => {

            landingScreen.style.display = "none";

            mainInvitation.classList.remove("hidden");

            mainInvitation.style.opacity = "0";

            requestAnimationFrame(() => {

                mainInvitation.style.transition = "opacity 1s ease";
                mainInvitation.style.opacity = "1";

            });

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }, 800);

    });

}

// ==========================================
// COUNTDOWN TIMER
// ==========================================

function initializeCountdown() {

    const targetDate = new Date("September 04, 2026 00:00:00").getTime();

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (!daysEl) return;

    function updateCountdown() {

        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance <= 0) {

            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";

            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));

        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24))
            / (1000 * 60 * 60)
        );

        const minutes = Math.floor(
            (distance % (1000 * 60 * 60))
            / (1000 * 60)
        );

        const seconds = Math.floor(
            (distance % (1000 * 60))
            / 1000
        );

        daysEl.textContent = String(days).padStart(2, "0");
        hoursEl.textContent = String(hours).padStart(2, "0");
        minutesEl.textContent = String(minutes).padStart(2, "0");
        secondsEl.textContent = String(seconds).padStart(2, "0");

    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

}

// ==========================================
// SCROLL REVEAL
// ==========================================

function initializeScrollReveal() {

    const revealElements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                }

            });

        },

        {
            threshold: 0.15
        }

    );

    revealElements.forEach((element) => {

        observer.observe(element);

    });

}

// ==========================================
// COPY ADDRESS
// ==========================================

function initializeCopyAddress() {

    const copyButton = document.getElementById("copyAddressBtn");
    const toast = document.getElementById("toast");

    if (!copyButton) return;

    const address =
        "MASJID-E-KHADRIA, Millers Road, Benson Town, Bangalore 560046";

    copyButton.addEventListener("click", async () => {

        try {

            await navigator.clipboard.writeText(address);

            showToast(
                "Address copied successfully"
            );

        } catch (error) {

            fallbackCopy(address);

            showToast(
                "Address copied successfully"
            );

        }

    });

    function showToast(message) {

        if (!toast) return;

        toast.textContent = message;

        toast.classList.add("show");

        setTimeout(() => {

            toast.classList.remove("show");

        }, 3000);

    }

}

// ==========================================
// FALLBACK COPY
// ==========================================

function fallbackCopy(text) {

    const textarea = document.createElement("textarea");

    textarea.value = text;

    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";

    document.body.appendChild(textarea);

    textarea.focus();
    textarea.select();

    try {

        document.execCommand("copy");

    } catch (e) {

        console.error("Copy failed", e);

    }

    document.body.removeChild(textarea);

}

// ==========================================
// EXTRA ANIMATIONS
// ==========================================

function initializeSmoothAnimations() {

    const cards = document.querySelectorAll(
        ".event-card, .section-card, .contact-card, .count-box"
    );

    cards.forEach((card) => {

        card.addEventListener("mouseenter", () => {

            card.style.transform =
                "translateY(-8px)";

            card.style.transition =
                "all 0.35s ease";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "translateY(0px)";

        });

    });

}

// ==========================================
// OPTIONAL PARALLAX EFFECT
// ==========================================

window.addEventListener("scroll", () => {

    const background =
        document.querySelector(".global-background");

    if (!background) return;

    const scrollY = window.scrollY;

    background.style.transform =
        `scale(1.08) translateY(${scrollY * 0.08}px)`;

});

// ==========================================
// PRELOAD BACKGROUND IMAGE
// ==========================================

(function preloadBackground() {

    const image = new Image();

    image.src = "ArabicBG3.jpg";

})();

// ==========================================
// PREVENT DOUBLE TAP ZOOM
// ==========================================

let lastTouchEnd = 0;

document.addEventListener(
    "touchend",
    function (event) {

        const now = new Date().getTime();

        if (now - lastTouchEnd <= 300) {

            event.preventDefault();

        }

        lastTouchEnd = now;

    },
    false
);

// ==========================================
// KEYBOARD ACCESSIBILITY
// ==========================================

document.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        const button =
            document.getElementById("openInvitationBtn");

        if (
            button &&
            document.activeElement === button
        ) {

            button.click();

        }

    }

});

// ==========================================
// END OF FILE
// ==========================================
