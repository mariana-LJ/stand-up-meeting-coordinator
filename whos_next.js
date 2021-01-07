'use strict'

let participants = ["Asaf", "Mariana", "Rachel", "Todd", "Victoria", "Vineet", "Mahesh"];

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
    const TUESDAY = 2;
    const THURSDAY = 4;
    const date = new Date();
    const today = date.getDay();
    if ((today !== THURSDAY && input.value === "Mahesh") || (today === TUESDAY && input.value === "Victoria")) {
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
}

function changeParticipantsFontColor(participant) {
  const participantDiv = document.getElementById(participant.id + "Div");
  if (participant.checked === true) {
    participantDiv.style = 'color:#black;';
  } else {
    participantDiv.style = 'color:#b2b2b2;';
  }
}

function assignNextTurn() {
  const elements = document.getElementsByName("participant");
  const teammates = [...elements].filter(t => t.disabled === false && t.checked === true);
  const isMaheshPresent = teammates.filter(t => t.value === "Mahesh").length > 0;
  let teammate = "";
  if (teammates.length === 0) return;
  if (teammates.length > 1) {
    let numParticipants = teammates.length;
    if (isMaheshPresent) {
      numParticipants -= 1;
    }
    const i = Math.floor(Math.random() * numParticipants);
    teammate = teammates[i];
  }
  if (teammates.length === 1) {
    teammate = teammates[0];
  }
  const rightColumnDiv = document.getElementById("h3");
  rightColumnDiv.innerText = teammate.value;
  const teammateDiv = document.getElementById(teammate.id + "Div");
  teammateDiv.style = 'color:#b2b2b2;';
  teammate.disabled = true;
  if (teammates.length === 1) {
    let nextButton = document.getElementById("Next");
    nextButton.classList.replace('btn-primary', 'btn-secondary');
    nextButton.disabled = true;
  }
}

displayParticipantNames(participants);