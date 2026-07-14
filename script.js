const openButton = document.getElementById("openInvitation");

const envelopeScreen = document.getElementById("envelope-screen");

const invitationContent = document.getElementById("invitation-content");

if (openButton) {
  openButton.addEventListener("click", function () {

    envelopeScreen.style.opacity = "0";

    setTimeout(() => {

      envelopeScreen.style.display = "none";

      invitationContent.style.display = "block";

      invitationContent.style.opacity = "0";

      setTimeout(() => {
        invitationContent.style.opacity = "1";
      }, 50);

    }, 600);

  });
}
