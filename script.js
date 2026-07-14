document.addEventListener("DOMContentLoaded", () => {

  const envelopeScreen = document.getElementById("envelope-screen");
  const openBtn = document.getElementById("openInvite");
  const mainContent = document.getElementById("mainContent");

  if (openBtn) {
    openBtn.addEventListener("click", () => {
      envelopeScreen.style.opacity = "0";
      envelopeScreen.style.transition = "opacity 1s ease";

      setTimeout(() => {
        envelopeScreen.style.display = "none";
        mainContent.style.display = "block";
        revealVisible();
      }, 1000);
    });
  }

  fetch("config.json")
    .then(r => r.json())
    .then(config => {

      const groom = document.getElementById("groomName");
      const bride = document.getElementById("brideName");

      if (groom) groom.textContent = config.groomName;
      if (bride) bride.textContent = config.brideName;

      startCountdown(config.nikah.date);
      handleReception(config);
    })
    .catch(err => {
      console.log("Config load failed", err);
      startCountdown("2026-09-04");
    });

  initGuestGreeting();
  initScrollAnimations();
  createLanterns();
});

function startCountdown(dateString) {

  const countdownEl = document.getElementById("countdown");

  function update() {

    const target = new Date(dateString + "T00:00:00");
    const now = new Date();

    const diff = target - now;

    if (diff <= 0) {
      countdownEl.innerHTML =
        "<h3>Wedding Day Has Arrived ✨</h3>";
      return;
    }

    const days =
      Math.floor(diff / (1000 * 60 * 60 * 24));

    const hours =
      Math.floor((diff / (1000 * 60 * 60)) % 24);

    const minutes =
      Math.floor((diff / (1000 * 60)) % 60);

    const seconds =
      Math.floor((diff / 1000) % 60);

    countdownEl.innerHTML = `
      <div class="count-box">
        <h2>${days}</h2>
        <p>Days</p>
      </div>

      <div class="count-box">
        <h2>${hours}</h2>
        <p>Hours</p>
      </div>

      <div class="count-box">
        <h2>${minutes}</h2>
        <p>Minutes</p>
      </div>

      <div class="count-box">
        <h2>${seconds}</h2>
        <p>Seconds</p>
      </div>
    `;
  }

  update();

  setInterval(update, 1000);
}

function initGuestGreeting() {

  const params =
    new URLSearchParams(window.location.search);

  const guest =
    params.get("guest");

  if (!guest) return;

  const hero =
    document.getElementById("hero");

  const welcome =
    document.createElement("div");

  welcome.innerHTML = `
    <h3 style="margin-bottom:20px">
      Welcome ${guest}
    </h3>
  `;

  hero.prepend(welcome);
}

function initScrollAnimations() {

  const scenes =
    document.querySelectorAll(".scene");

  scenes.forEach(scene => {
    scene.classList.add("fade-up");
  });

  revealVisible();

  window.addEventListener(
    "scroll",
    revealVisible
  );
}

function revealVisible() {

  const elements =
    document.querySelectorAll(".fade-up");

  elements.forEach(el => {

    const rect =
      el.getBoundingClientRect();

    if (
      rect.top <
      window.innerHeight * 0.85
    ) {
      el.classList.add("visible");
    }
  });
}

function createLanterns() {

  for (let i = 0; i < 8; i++) {

    const lantern =
      document.createElement("div");

    lantern.className =
      "lantern";

    lantern.style.left =
      Math.random() * 100 + "%";

    lantern.style.animationDelay =
      Math.random() * 12 + "s";

    lantern.style.animationDuration =
      15 + Math.random() * 15 + "s";

    document.body.appendChild(
      lantern
    );
  }
}

function handleReception(config) {

  const reception =
    config.reception &&
    config.reception.venue &&
    config.reception.venue.trim() !== "";

  if (!reception) {

    const allSections =
      document.querySelectorAll("section");

    allSections.forEach(section => {

      const txt =
        section.innerText.toLowerCase();

      if (
        txt.includes("reception") &&
        txt.includes("coming soon")
      ) {
        section.style.opacity = "0.8";
      }
    });
  }
}

function copyAddress(text) {

  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("Address copied");
    });
}

function openMaps(url) {

  if (!url) return;

  window.open(url, "_blank");
}

let bgAudio = null;

function initMusic() {

  bgAudio =
    new Audio(
      "assets/music/nasheed.mp3"
    );

  bgAudio.loop = true;
}

function toggleMusic() {

  if (!bgAudio) return;

  if (bgAudio.paused) {
    bgAudio.play();
  } else {
    bgAudio.pause();
  }
}