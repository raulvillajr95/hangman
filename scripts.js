// HTML attachments
const mainWord = document.querySelector('.main-word');
const restartBtn = document.querySelector('.btn');
const incorrectGuess = document.querySelector('.incorrect-guess');
const guessesRemaining = document.querySelector('.guesses-remaining');
const result = document.querySelector('.result');
const typingInput = document.querySelector('.typing-input');

// Defaults
let guesses = 8;
let words = ['banish', 'curious', 'level', 'badge', 'grumpy', 'secretive', 'battle', 'quill', 'fabulous', 'ambitious', 'bewildered', 'river', 'moult', 'pocket', 'sashay', 'tomatoes', 'wheel', 'disgusted', 'aquatic', 'fireman', 'driving', 'halting', 'smell', 'quince', 'obedient', 'snobbish', 'appear', 'worry', 'address', 'hungry', 'plough', 'tangible', 'zephyr', 'dedicate', 'panicky', 'declare', 'willing', 'awful', 'belief', 'convene', 'awake', 'expansion', 'glitter', 'amuck', 'calculate', 'offset', 'absent', 'constrain', 'shelf', 'contain', 'table', 'impart', 'wheel', 'kitty', 'faithful', 'known'];
let alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

// Preset function
function randomNum(b) {
  return Math.floor(Math.random() * b) + 1;
}

let currentWord = words[randomNum(words.length)-1]

let finalWord;
function replaceWithUnderScore(word) {
  finalWord = []

  for (let i = 0; i < word.length; i++) {
    let keepnessLevel = randomNum(5);
    if (keepnessLevel == 3 || keepnessLevel == 5) {
      finalWord.push('_')
    } else {
      finalWord.push(word[i])
    }
  }

  if (finalWord.includes('_')) {

    let alphaCount = 0;

    for (let i = 0; i < finalWord.length; i++) {
      if (alphabet.includes(finalWord[i])) {
        alphaCount += 1;
      };
    }
    if (alphaCount >= 1) {
      alphaCount = 0;
      return finalWord;
    } else {
      finalWord = []
      replaceWithUnderScore(word)
    }
  } else {
    finalWord = []
    currentWord = words[randomNum(words.length)-1]
    replaceWithUnderScore(word)
  }
}

let wordWithUnderscores = replaceWithUnderScore(currentWord)
let wordProgressing = wordWithUnderscores

// Place within 'span' element
if (wordWithUnderscores == undefined) {
  wordWithUnderscores = replaceWithUnderScore(currentWord)
  wordProgressing = wordWithUnderscores
}
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

let count = 0
window.addEventListener('keydown', () => {
  let letterPressed = window.event.key

  if (missingLetters[count][1] == undefined || alphabet.includes(letterPressed) != true) {
    return;
  }

  if (letterPressed == currentWord[missingLetters[count][1]]) {
    typingInput.value = '';
    mainWord.children[missingLetters[count][1]].textContent = `${letterPressed}`

    if (mainWord.textContent == currentWord) {
      result.textContent = "YOU WON"
      result.style.color = "#3a6efb"
    }
    count += 1;
  } else {
    typingInput.value = '';
    guesses -= 1;
    if (guesses <= 0) {
      guessesRemaining.textContent = `Done`
      result.textContent = "YOU LOSE"
      result.style.color = "#dc3545"
      mainWord.textContent = `${currentWord}`
    } else {
      guessesRemaining.textContent = `${guesses}`
      incorrectGuess.textContent += ` ${letterPressed}`;
    }
  }
})

// Restart
restartBtn.addEventListener('click', () => {
  window.location.reload();
  guesses = 8;
  count = 0;
  typingInput.textContent = '';
});