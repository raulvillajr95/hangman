// HTML attachments
const mainWord = document.querySelector('.main-word');
const restartBtn = document.querySelector('.btn');
const incorrectGuess = document.querySelector('.incorrect-guess');
const guessesRemaining = document.querySelector('.guesses-remaining');
const result = document.querySelector('.result');

// Defaults
let guesses = 8;
let words = ['banish', 'curious', 'level', 'badge', 'grumpy', 'secretive', 'battle', 'quill', 'fabulous', 'ambitious', 'bewildered', 'river', 'moult', 'pocket', 'sashay', 'tomatoes', 'wheel', 'disgusted', 'aquatic', 'fireman', 'driving', 'halting', 'smell', 'quince', 'obedient', 'snobbish', 'appear', 'worry', 'address', 'hungry', 'plough', 'tangible', 'zephyr', 'dedicate', 'panicky', 'declare', 'willing', 'awful', 'belief', 'convene', 'awake', 'expansion', 'glitter', 'amuck', 'calculate', 'offset', 'absent', 'constrain', 'shelf', 'contain', 'table', 'impart', 'wheel', 'kitty', 'faithful', 'known'];

// Preset function
function randomNum(b) {
  return Math.floor(Math.random() * b) + 1;
}

let currentWord = words[randomNum(words.length)-1]

// mainWord.textContent = `${currentWord}`;

function replaceWithUnderScore(word) {
  let finalWord = []

  for (let i = 0; i < word.length; i++) {
    let keepnessLevel = randomNum(5);
    if (keepnessLevel == 3 || keepnessLevel == 5) {
      finalWord.push('_')
    } else {
      finalWord.push(word[i])
    }
  }

  return finalWord;
}

let wordWithUnderscores = replaceWithUnderScore(currentWord)
let wordProgressing = wordWithUnderscores
// Plase wordWithUnderscores on screen
// mainWord.textContent = `${wordWithUnderscores.join('')}`

// Place within 'span' element
for (let i = 0; i < wordWithUnderscores.length; i++) {
  let span = document.createElement('span')
  span.textContent = `${wordWithUnderscores[i]}`
  mainWord.appendChild(span)
}


// Create list of missing letters
let missingLetters = [];
for (let i = 0; i < wordWithUnderscores.length; i++) {
  if (wordWithUnderscores[i] == '_') {
    missingLetters.push([currentWord[i], i])
  }
}

console.log(currentWord)
console.log(missingLetters)
console.log(wordProgressing)

let count = 0
window.addEventListener('keydown', () => {
  let letterPressed = window.event.key

  if (missingLetters[count][1] == undefined) {
    return;
  }

  console.log('compare', letterPressed, currentWord[missingLetters[count][1]])
  console.log(wordProgressing, currentWord)

  if (letterPressed == currentWord[missingLetters[count][1]]) {
    mainWord.children[missingLetters[count][1]].textContent = `${letterPressed}`

    console.log('TEST', mainWord.textContent)
    if (mainWord.textContent == currentWord) {
      result.textContent = "YOU WON"
      result.style.color = "#3a6efb"
    }
    count += 1;
  } else {
    incorrectGuess.textContent += ` ${letterPressed}`;
    guesses -= 1;
    guessesRemaining.textContent = `${guesses}`
  }
})

// Restart
restartBtn.addEventListener('click', () => {
  window.location.reload();
  guesses = 8;
  count = 0;
});