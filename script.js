const openButton = document.getElementById("openInvitation");

const envelopeScreen = document.getElementById("envelope-screen");

const invitationContent = document.getElementById("invitation-content");

if (openButton) {
  openButton.addEventListener("click", function () {

    envelopeScreen.style.transition = "all 0.6s ease";
    envelopeScreen.style.opacity = "0";

    setTimeout(() => {

      envelopeScreen.style.display = "none";

      invitationContent.style.display = "block";

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }, 600);

  });
}

/* Countdown */

const targetDate = new Date("September 4, 2026 00:00:00").getTime();

const timer = setInterval(function () {

  const now = new Date().getTime();

  const distance = targetDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));

  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) /
    (1000 * 60 * 60)
  );

  const minutes = Math.floor(
    (distance % (1000 * 60 * 60)) /
    (1000 * 60)
  );

  const seconds = Math.floor(
    (distance % (1000 * 60)) /
    1000
  );

  const d = document.getElementById("days");
  const h = document.getElementById("hours");
  const m = document.getElementById("minutes");
  const s = document.getElementById("seconds");

  if (d) d.innerText = days;
  if (h) h.innerText = hours;
  if (m) m.innerText = minutes;
  if (s) s.innerText = seconds;

}, 1000);

/* Copy Address */

const copyButton =
document.getElementById("copyAddress");

if (copyButton) {

  copyButton.addEventListener("click", function () {

    navigator.clipboard.writeText(
      "MASJID-E-KHADRIA, Millers Road, Benson Town, Bangalore 560046"
    );

    copyButton.innerText = "Address Copied";

    setTimeout(() => {
      copyButton.innerText = "Copy Address";
    }, 2000);

  });

}
