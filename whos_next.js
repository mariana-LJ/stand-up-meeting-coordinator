'use strict'

let participants = ["Asaf", "Mahesh", "Mariana", "Rachel", "Todd", "Victoria", "Vineet"];

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
    if (input.value !== "Mahesh") {
      input.checked = true;
    }
    if (input.value === "Mahesh") {
      input.disabled = true;
      nameDiv.style = 'color:#b2b2b2;';
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
  nextButton.classList.add('btn', 'btn-primary')
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
  if (teammates.length === 0) return;
  const i = Math.floor(Math.random() * teammates.length);
  const teammate = teammates[i];
  const rightColumnDiv = document.getElementById("h3");
  rightColumnDiv.innerText = teammate.value;
  const teammateDiv = document.getElementById(teammate.id + "Div");
  teammateDiv.style = 'color:#b2b2b2;';
  teammate.disabled = true;
}

displayParticipantNames(participants);