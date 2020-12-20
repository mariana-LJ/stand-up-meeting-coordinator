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
    input.checked = true;
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
  nextButton.onclick = assignNextTurn;
  let nextButtonText = document.createTextNode('Next');
  nextButton.appendChild(nextButtonText);
  nextButtonDiv.appendChild(nextButton);
  leftColDiv.appendChild(nextButtonDiv);
}

function assignNextTurn() {
  const teammates = document.getElementsByName("participant");
  const rightColumnDiv = document.getElementById("h3");
  for (let i = 0; i < teammates.length; ++i) {
    const teammate = teammates[i];
    if (teammate.checked === true) {
      rightColumnDiv.innerText = teammate.value;
      const teammateDiv = document.getElementById(teammate.id + "Div");
      teammateDiv.style = 'background-color:#b2b2b2;';
      teammate.checked = false;
    }
  }
}

displayParticipantNames(participants);