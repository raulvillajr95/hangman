// HTML attachments
const mainWord = document.querySelector('.main-word');
const restartBtn = document.querySelector('.btn');
const incorrectGuess = document.querySelector('.incorrect-guess');
const guessesRemaining = document.querySelector('.guesses-remaining');

// Defaults
let guesses = 8;
let words = ['banish', 'curious', 'level', 'badge', 'grumpy', 'secretive', 'battle', 'quill', 'fabulous', 'ambitious', 'bewildered', 'river', 'moult', 'pocket', 'sashay', 'tomatoes', 'wheel', 'disgusted', 'aquatic', 'fireman', 'driving', 'halting', 'smell', 'quince', 'obedient', 'snobbish', 'appear', 'worry', 'address', 'hungry', 'plough', 'tangible', 'zephyr', 'dedicate', 'panicky', 'declare', 'willing', 'awful', 'belief', 'convene', 'awake', 'expansion', 'glitter', 'amuck', 'calculate', 'offset', 'absent', 'constrain', 'shelf', 'contain', 'table', 'impart', 'wheel', 'kitty', 'faithful', 'known'];

// Preset function
function randomNum(b) {
  return Math.floor(Math.random() * b) + 1;
}

let currentWord = words[randomNum(words.length)-1]

mainWord.textContent = `${currentWord}`;

function replaceWithUnderScore(word) {
  let finalWord = []

  for (let i = 0; i < word.length; i++) {
    let keepnessLevel = randomNum(3);
    if (keepnessLevel == 3) {
      finalWord.push('_')
    } else {
      finalWord.push(word[i])
    }
  }

  return finalWord;
}

console.log(replaceWithUnderScore('banish'))

// Restart
restartBtn.addEventListener('click', () => {
  window.location.reload();
  guesses = 8;
});