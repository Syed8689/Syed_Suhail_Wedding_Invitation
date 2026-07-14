const openButton =
document.getElementById("openInvitation");

const envelopeScreen =
document.getElementById("envelope-screen");

const invitationContent =
document.getElementById("invitation-content");

if(openButton){

openButton.onclick = function(){

envelopeScreen.style.display = "none";

invitationContent.style.display = "block";

};

}
