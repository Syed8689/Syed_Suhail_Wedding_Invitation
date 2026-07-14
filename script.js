// =====================================
// WEDDING INVITATION V2
// Syed Suhail & Taskeen Fathima
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    initializeInvitationOpening();
    initializeCountdown();
    initializeScrollReveal();
    initializeCopyAddress();
    initializeParallax();
    initializeGlowEffects();

});

// =====================================
// OPEN INVITATION
// =====================================

function initializeInvitationOpening() {

    const openButton = document.getElementById("openInvitationBtn");
    const landingScreen = document.getElementById("landingScreen");
    const invitationWrapper = document.getElementById("invitationWrapper");

    if (!openButton) return;

    openButton.addEventListener("click", () => {

        openButton.disabled = true;

        openButton.innerHTML = "Opening...";

        landingScreen.style.transition =
            "opacity 1s ease, transform 1s ease";

        landingScreen.style.opacity = "0";

        landingScreen.style.transform =
            "scale(1.05)";

        setTimeout(() => {

            landingScreen.style.display = "none";

            invitationWrapper.classList.remove("hidden");

            invitationWrapper.style.opacity = "0";

            requestAnimationFrame(() => {

                invitationWrapper.style.transition =
                    "opacity 1.2s ease";

                invitationWrapper.style.opacity = "1";

            });

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            triggerInitialReveal();

        }, 1000);

    });

}

// =====================================
// INITIAL REVEAL
// =====================================

function triggerInitialReveal() {

    const firstRevealElements =
        document.querySelectorAll(".reveal");

    firstRevealElements.forEach((element, index) => {

        setTimeout(() => {

            element.classList.add("active");

        }, index * 120);

    });

}

// =====================================
// COUNTDOWN
// =====================================

function initializeCountdown() {

    const targetDate =
        new Date("September 04, 2026 00:00:00").getTime();

    const daysElement =
        document.getElementById("days");

    const hoursElement =
        document.getElementById("hours");

    const minutesElement =
        document.getElementById("minutes");

    const secondsElement =
        document.getElementById("seconds");

    if (!daysElement) return;

    function updateCountdown() {

        const now = new Date().getTime();

        const distance =
            targetDate - now;

        if (distance <= 0) {

            daysElement.textContent = "00";
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";

            return;
        }

        const days = Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (distance %
                (1000 * 60 * 60 * 24))
            /
            (1000 * 60 * 60)
        );

        const minutes = Math.floor(
            (distance %
                (1000 * 60 * 60))
            /
            (1000 * 60)
        );

        const seconds = Math.floor(
            (distance %
                (1000 * 60))
            /
            1000
        );

        daysElement.textContent =
            String(days).padStart(2, "0");

        hoursElement.textContent =
            String(hours).padStart(2, "0");

        minutesElement.textContent =
            String(minutes).padStart(2, "0");

        secondsElement.textContent =
            String(seconds).padStart(2, "0");

    }

    updateCountdown();

    setInterval(updateCountdown, 1000);

}

// =====================================
// SCROLL REVEAL
// =====================================

function initializeScrollReveal() {

    const revealElements =
        document.querySelectorAll(".reveal");

    const observer =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "active"
                        );

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

// =====================================
// COPY ADDRESS
// =====================================

function initializeCopyAddress() {

    const copyButton =
        document.getElementById(
            "copyAddressBtn"
        );

    const toast =
        document.getElementById("toast");

    if (!copyButton) return;

    const receptionAddress =
        "Classic Banquet Hall, No.831, 4th Block, HBR Layout, Bangalore 560043";

    copyButton.addEventListener(
        "click",
        async () => {

            try {

                await navigator.clipboard.writeText(
                    receptionAddress
                );

                showToast(
                    "Address copied successfully"
                );

            } catch {

                fallbackCopy(
                    receptionAddress
                );

                showToast(
                    "Address copied successfully"
                );

            }

        }
    );

    function showToast(message) {

        if (!toast) return;

        toast.textContent = message;

        toast.classList.add("show");

        setTimeout(() => {

            toast.classList.remove("show");

        }, 2500);

    }

}

// =====================================
// FALLBACK COPY
// =====================================

function fallbackCopy(text) {

    const textArea =
        document.createElement(
            "textarea"
        );

    textArea.value = text;

    textArea.style.position =
        "fixed";

    textArea.style.left =
        "-9999px";

    document.body.appendChild(
        textArea
    );

    textArea.focus();
    textArea.select();

    try {

        document.execCommand("copy");

    } catch (error) {

        console.error(error);

    }

    document.body.removeChild(
        textArea
    );

}

// =====================================
// PARALLAX
// =====================================

function initializeParallax() {

    const background =
        document.querySelector(
            ".background-image"
        );

    if (!background) return;

    window.addEventListener(
        "scroll",
        () => {

            const offset =
                window.scrollY * 0.06;

            background.style.transform =
                `scale(1.08) translateY(${offset}px)`;

        }
    );

}

// =====================================
// CARD HOVER GLOW
// =====================================

function initializeGlowEffects() {

    const cards = document.querySelectorAll(
        `
        .landing-card,
        .main-arch,
        .events-card,
        .venue-card,
        .closing-card,
        .count-item,
        .contact-box
        `
    );

    cards.forEach((card) => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.style.transition =
                    "all .35s ease";

                card.style.boxShadow =
                    "0 0 40px rgba(176,138,69,.18)";

            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.boxShadow = "";

            }
        );

    });

}

// =====================================
// PRELOAD BACKGROUND
// =====================================

(function preloadBackground() {

    const image = new Image();

    image.src = "ArabicBG3.jpg";

})();

// =====================================
// MOBILE DOUBLE TAP FIX
// =====================================

let lastTouchEnd = 0;

document.addEventListener(
    "touchend",
    function (event) {

        const now =
            new Date().getTime();

        if (
            now - lastTouchEnd <= 300
        ) {

            event.preventDefault();

        }

        lastTouchEnd = now;

    },
    false
);

// =====================================
// KEYBOARD ACCESSIBILITY
// =====================================

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter"
        ) {

            const button =
                document.getElementById(
                    "openInvitationBtn"
                );

            if (
                button &&
                document.activeElement ===
                    button
            ) {

                button.click();

            }

        }

    }
);

// =====================================
// PERFORMANCE OPTIMIZATION
// =====================================

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "loaded"
        );

    }
);

// =====================================
// FUTURE PLACEHOLDER
// Background Music Toggle
// RSVP
// Dynamic Config Loader
// =====================================

// End of File
