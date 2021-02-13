'use strict'

let participants = ["Asaf", "Mariana", "Rachel", "Todd", "Victoria", "Vineet", "Mahesh"];
const MONDAY = 1;
const TUESDAY = 2;
const THURSDAY = 4;
const today = new Date().getDay();

function setupInitialLayout() {
  let mainHeader = document.getElementById("mainHeader");
  mainHeader.classList.add('text-primary');
  
  let nextButtonDiv = document.createElement('div');
  nextButtonDiv.id = "nextButton";
  let nextButton = document.createElement('button');
  nextButton.classList.add('btn', 'btn-primary');
  nextButton.setAttribute('id', 'Next');
  nextButton.onclick = assignNextTurn;
  let nextButtonText = document.createTextNode('Next');
  nextButton.appendChild(nextButtonText);
  nextButtonDiv.appendChild(nextButton);
  document.getElementById("centerColumn").appendChild(nextButtonDiv);
  
  let footerImg = document.getElementById("footer");
  footerImg.src = "imgs/welcome.png"
  footerImg.style.maxWidth = "60%";
  footerImg.style.maxHeight = "60%";

}

function changeParticipantsFontColor(participant) {
  const participantDiv = document.getElementById(participant.id + "Div");
  if (participant.checked === true) {
    participantDiv.style = 'color:#black;';
  } else {
    participantDiv.style = 'color:#b2b2b2;';
  }
}

function chooseNewFooter() {
  const min = 1;
  let max = 9;
  let footer_name = "done";
  if (today === THURSDAY) {
    max = 7;
    footer_name = "tgif"
  }
  let index = Math.floor(Math.random() * (max - min) + min);

  return "imgs/" + footer_name + "-" + index + ".jpg";
}

function displayParticipantNames(participantNames) {
  let leftColDiv = document.getElementById("leftColumn");
  participantNames.forEach(element => {
    let nameDiv = document.createElement('div');
    nameDiv.id = element + "Div";
    let input = document.createElement('input');
    input.type = "checkbox";
    input.id = element;
    input.name = "participant";
    input.value = element;
    if ((today !== MONDAY && input.value === "Mahesh") || 
    (today === TUESDAY && input.value === "Victoria") || 
    (today === THURSDAY && input.value === "Todd")) {
      input.checked = false;
      nameDiv.style = 'color:#b2b2b2;';
    } else {
      input.checked = true;
    }

    input.addEventListener('click', function () {
      changeParticipantsFontColor(input);
    })

    nameDiv.appendChild(input);
    let label = document.createElement('label');
    label.htmlFor = element;
    let labelText = document.createTextNode(element);
    label.appendChild(labelText);
    nameDiv.appendChild(label);
    leftColDiv.appendChild(nameDiv);
  });
}

function assignNextTurn() {
  const elements = document.getElementsByName("participant");
  const teammates = [...elements].filter(t => t.checked === true && !(t.hasAttribute('done')));
  const rightColumnDiv = document.getElementById("h3");
  const isMaheshPresent = teammates.filter(t => t.value === "Mahesh").length > 0;
  let teammate = "";
  
  if (teammates.length === 0) {
    rightColumnDiv.innerText = "?";
    let nextButton = document.getElementById("Next");
    nextButton.classList.replace('btn-primary', 'btn-secondary');
    nextButton.disabled = true;
    nextButton.textContent = "Done";
    let footerImg = document.getElementById("footer");
    footerImg.src = "";
    footerImg.style.maxHeight = "100%";
    footerImg.style.maxWidth = "100%";
    footerImg.src = chooseNewFooter();
  }
  
  if (teammates.length === 1) {
    teammate = teammates[0];
  }

  if (teammates.length > 1) {
    let numParticipants = teammates.length;
    if (isMaheshPresent) {
      numParticipants -= 1;
    }
    const i = Math.floor(Math.random() * numParticipants);
    teammate = teammates[i];
  }
  
  if (typeof teammate.value !== 'undefined'){
    rightColumnDiv.innerText = teammate.value;
    teammate.setAttribute('done', 'done');
  }
}

setupInitialLayout();
displayParticipantNames(participants);