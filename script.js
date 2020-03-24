const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-again");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = ["application", "programming", "interface", "wizard"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

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
  }
}

// update the area for wrong letters
function updateWrongLettersEl() {
  console.log("update wrong");
}

// show notification
function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// event listener fo rkeydown letter press
window.addEventListener("keydown", e => {
  // we only accept alphabetical letters
  //   console.log(e.key);
  if (e.keyCode >= 65 && e.keyCode <= 90) {
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

displayWord();
