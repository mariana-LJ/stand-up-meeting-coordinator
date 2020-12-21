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
    if (element !== "Mahesh") {
      input.checked = true;
    }
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

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  // While there are elements to shuffle
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function assignNextTurn() {
  const teammates = document.getElementsByName("participant");
  let teammatesShuffled = Array.from(teammates);
  shuffle(teammatesShuffled);
  const rightColumnDiv = document.getElementById("h3");
  for (let i = 0; i < teammatesShuffled.length; ++i) {
    const teammate = teammatesShuffled[i];
    if (teammate.checked === true) {
      rightColumnDiv.innerText = teammate.value;
      const teammateDiv = document.getElementById(teammate.id + "Div");
      teammateDiv.style = 'color:#b2b2b2;';
      teammate.checked = false;
      break;
    }
  }
}

displayParticipantNames(participants);