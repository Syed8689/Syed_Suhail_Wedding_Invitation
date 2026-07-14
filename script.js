// =====================================
// OPEN INVITATION
// =====================================

const openButton =
document.getElementById("openInvitation");

const envelopeScreen =
document.getElementById("envelope-screen");

const invitationContent =
document.getElementById("invitation-content");

if(openButton){

openButton.addEventListener("click",()=>{

envelopeScreen.style.transition =
"all 1s ease";

envelopeScreen.style.opacity = "0";

setTimeout(()=>{

envelopeScreen.style.display="none";

invitationContent.style.display="block";

window.scrollTo({
top:0,
behavior:"smooth"
});

observeSections();

},1000);

});

}

// =====================================
// COUNTDOWN
// =====================================

const weddingDate =
new Date("2026-09-04T11:00:00").getTime();

function updateCountdown(){

const now =
new Date().getTime();

const distance =
weddingDate - now;

if(distance <= 0){

document.getElementById("days").innerText="00";
document.getElementById("hours").innerText="00";
document.getElementById("minutes").innerText="00";
document.getElementById("seconds").innerText="00";

return;

}

const days =
Math.floor(distance/(1000*60*60*24));

const hours =
Math.floor(
(distance%(1000*60*60*24))
/
(1000*60*60)
);

const minutes =
Math.floor(
(distance%(1000*60*60))
/
(1000*60)
);

const seconds =
Math.floor(
(distance%(1000*60))
/
1000
);

document.getElementById("days").innerText =
String(days).padStart(2,"0");

document.getElementById("hours").innerText =
String(hours).padStart(2,"0");

document.getElementById("minutes").innerText =
String(minutes).padStart(2,"0");

document.getElementById("seconds").innerText =
String(seconds).padStart(2,"0");

}

setInterval(updateCountdown,1000);

updateCountdown();

// =====================================
// COPY ADDRESS
// =====================================

const copyButton =
document.getElementById("copyAddress");

if(copyButton){

copyButton.addEventListener("click",()=>{

const address =
`MASJID-E-KHADRIA
Millers Road
Benson Town
Bangalore 560046`;

navigator.clipboard.writeText(address);

copyButton.innerText =
"Copied ✓";

setTimeout(()=>{

copyButton.innerText =
"Copy Address";

},2500);

});

}

// =====================================
// SCROLL ANIMATION
// =====================================

function observeSections(){

const sections =
document.querySelectorAll(".section");

const observer =
new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},

{
threshold:0.15
}

);

sections.forEach(section=>{

observer.observe(section);

});

}

// =====================================
// HERO PARALLAX
// =====================================

window.addEventListener("scroll",()=>{

const hero =
document.querySelector(".hero");

if(hero){

const offset =
window.pageYOffset;

hero.style.backgroundPositionY =
offset * 0.4 + "px";

}

});

// =====================================
// GOLD FADE ON LOAD
// =====================================

window.addEventListener("load",()=>{

document.body.style.opacity="1";

});
