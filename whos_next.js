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

function changeParticipantsFontColor(participant) {
  const participantDiv = document.getElementById(participant.id + "Div");
  if (participant.checked === true) {
    participantDiv.style = 'color:#black;';
  } else {
    participantDiv.style = 'color:#b2b2b2;';
  }
}

function assignNextTurn() {
  const teammates = document.getElementsByName("participant");
  let teammatesShuffled = Array.from(teammates);
  shuffle(teammatesShuffled);
  const rightColumnDiv = document.getElementById("h3");
  for (let i = 0; i < teammatesShuffled.length; ++i) {
    const teammate = teammatesShuffled[i];
    if (teammate.disabled === false && teammate.checked === true) {
      rightColumnDiv.innerText = teammate.value;
      const teammateDiv = document.getElementById(teammate.id + "Div");
      teammateDiv.style = 'color:#b2b2b2;';
      teammate.disabled = true;
      break;
    }
  }
}

displayParticipantNames(participants);