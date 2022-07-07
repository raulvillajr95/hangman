// HTML attachments
const mainWord = document.querySelector('.main-word');
const restartBtn = document.querySelector('.btn');
const incorrectGuess = document.querySelector('.incorrect-guess');
const guessesRemaining = document.querySelector('.guesses-remaining');
const result = document.querySelector('.result');

// Defaults
let guesses = 8;
let words = ['banish', 'curious', 'level', 'badge', 'grumpy', 'secretive', 'battle', 'quill', 'fabulous', 'ambitious', 'bewildered', 'river', 'moult', 'pocket', 'sashay', 'tomatoes', 'wheel', 'disgusted', 'aquatic', 'fireman', 'driving', 'halting', 'smell', 'quince', 'obedient', 'snobbish', 'appear', 'worry', 'address', 'hungry', 'plough', 'tangible', 'zephyr', 'dedicate', 'panicky', 'declare', 'willing', 'awful', 'belief', 'convene', 'awake', 'expansion', 'glitter', 'amuck', 'calculate', 'offset', 'absent', 'constrain', 'shelf', 'contain', 'table', 'impart', 'wheel', 'kitty', 'faithful', 'known'];
let alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

// Preset function
function randomNum(b) {
  return Math.floor(Math.random() * b) + 1;
}

let currentWord = words[randomNum(words.length)-1]

// mainWord.textContent = `${currentWord}`;
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

  // Check that word has at least 1 under score
  // and no all under scores

  console.log("Before check", finalWord)

  if (finalWord.includes('_')) {
    console.log('INCLUDES _')

    let alphaCount = 0;

    for (let i = 0; i < finalWord.length; i++) {
      if (alphabet.includes(finalWord[i])) {
        alphaCount += 1;
      };
    }
    console.log('alphaCount',alphaCount)
    if (alphaCount >= 1) {
      alphaCount = 0;
      console.log("final check", finalWord)
      return finalWord;
    } else {
      console.log('NEEDS LETTER')
      finalWord = []
      replaceWithUnderScore(word)
    }
  } else {
    console.log('REACHED')
    finalWord = []
    currentWord = words[randomNum(words.length)-1]
    replaceWithUnderScore(word)
  }
}

let wordWithUnderscores = replaceWithUnderScore(currentWord)
let wordProgressing = wordWithUnderscores
// Plase wordWithUnderscores on screen
// mainWord.textContent = `${wordWithUnderscores.join('')}`

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
    console.log("not alpha character")
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
    guesses -= 1;
    if (guesses <= -1) {
      guessesRemaining.textContent = `Done`
      result.textContent = "YOU LOSE"
      result.style.color = "#dc3545"
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
});