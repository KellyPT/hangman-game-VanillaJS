const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-again");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = ["application", "programming", "interface", "wizard"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable = true;
let correctLetters = [];
let wrongLetters = [];

// show hidden word
function displayWord() {
  wordEl.innerHTML = `
        ${selectedWord
          .split("")
          .map(
            letter => `
                    <span class="letter">${
                      correctLetters.includes(letter) ? letter : ""
                    }</span>
                    `
          )
          .join("")}
    `;

  const innerWord = wordEl.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won! =)";
    popup.style.display = "flex";
    playable = false;
  }
}

// update the area for wrong letters
// add the hang-man figure parts
// check if the whole hang-man is completed and notify game-over
function updateWrongLettersEl() {
  // display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${
      wrongLetters.length > 0
        ? wrongLetters.map(letter => `<span>${letter}</span>`)
        : ""
    }
  `;

  // display body parts of hang-man
  const numberOfErrors = wrongLetters.length;
  figureParts.forEach((part, index) => {
    if (index < numberOfErrors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  // check if game is over
  if (numberOfErrors === figureParts.length) {
    finalMessage.innerText = "Unfortunately you've lost! =( ";
    popup.style.display = "flex";
    playable = false;
  }
}

// show notification
function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// event listener fo rkeydown letter press while playing the game
window.addEventListener("keydown", e => {
  // we only accept alphabetical letters
  if (playable && e.keyCode >= 65 && e.keyCode <= 90) {
    const enteredLetter = e.key;

    if (
      selectedWord.includes(enteredLetter) &&
      !correctLetters.includes(enteredLetter)
    ) {
      correctLetters.push(enteredLetter);
      displayWord();
    } else if (
      !selectedWord.includes(enteredLetter) &&
      !wrongLetters.includes(enteredLetter)
    ) {
      wrongLetters.push(enteredLetter);
      updateWrongLettersEl();
    } else {
      showNotification();
    }
  }
});

// restart the game and play again
playAgainBtn.addEventListener("click", () => {
  playable = true;
  // empty arrays
  correctLetters = [];
  wrongLetters = [];

  // display a new word
  selectedWord = words[Math.floor(Math.random() * words.length)];

  // initialize a new game
  displayWord();

  // clean up areas for wrong UI
  updateWrongLettersEl();

  // hide the popup
  popup.style.display = "none";
});

// initialize our game
displayWord();
