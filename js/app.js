




const words = [
    'NIRVANA', 'METALLICA', 'BEATLES', 'QUEEN', 'ACDC',
    'LEDZEPPELIN', 'PINKFLOYD', 'ROLLINGSTONES', 'U2', 'EAGLES',
    'GUNSNROSES', 'COLDPLAY', 'RADIOHEAD', 'OASIS', 'BLUR',
    'RAMONES', 'SEXPISTOLS', 'CLASH', 'KISS', 'AEROSMITH',
    'BONJOVI', 'DEFLEPPARD', 'JOURNEY', 'VANHALEN', 'WHITESNAKE',
    'DURANDURAN', 'DEPECHEMODE', 'CURE', 'SMITHS', 'JOYDIVISION',
    'TUPAC', 'BIGGIE', 'NWA', 'WUTANG', 'EMINEM',
    'DRDRE', 'SNOOPDOGG', 'JAYZ', 'NAS', 'OUTKAST',
    'BEASTIEBOYS', 'PUBLICENEMY', 'ICECUBE', 'RUN DMC', 'LLCOOLJ',
    'KANYE', 'KENDRIK', 'DRAKE', 'JCOLE', 'TRAVISSCOTT'
];

let selectedWord = '';
let guessedLetters = [];
let wrongGuesses = 0;
let maxWrongGuesses = 6;
let gameOver = false;


const wordDisplay = document.getElementById('word-display');
const messageElement = document.getElementById('message');
const livesElement = document.getElementById('lives');
const lettersElement = document.getElementById('letters');
const restartBtn = document.getElementById('restart-btn');
const hangmanParts = document.querySelectorAll('.part');
const wordInput = document.getElementById('word-input');
const guessBtn = document.getElementById('guess-btn');


function initGame() {

    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    wrongGuesses = 0;
    gameOver = false;


    updateWordDisplay();
    messageElement.textContent = '';
    messageElement.className = 'message';
    livesElement.textContent = `Lives: ${maxWrongGuesses - wrongGuesses}`;
    wordInput.value = '';
    wordInput.disabled = false;
    guessBtn.disabled = false;


    hangmanParts.forEach(part => {
        if (!part.classList.contains('gallows') &&
            !part.classList.contains('pole') &&
            !part.classList.contains('beam') &&
            !part.classList.contains('rope')) {
            part.style.display = 'none';
        }
    });


    const letterButtons = document.querySelectorAll('.letter');
    letterButtons.forEach(button => {
        button.disabled = false;
        button.classList.remove('correct', 'incorrect');
    });
}


function updateWordDisplay() {
    const displayWord = selectedWord
        .split('')
        .map(letter => guessedLetters.includes(letter) ? letter : '_')
        .join(' ');

    wordDisplay.textContent = displayWord;


    if (!displayWord.includes('_')) {
        gameOver = true;
        messageElement.textContent = 'YOU SAVED ME!';
        messageElement.className = 'message win';
        disableAllLetters();
        wordInput.disabled = true;
        guessBtn.disabled = true;
    }
}


function handleGuess(letter) {
    if (gameOver) return;

    const letterButton = Array.from(lettersElement.children)
        .find(btn => btn.textContent === letter);

    if (letterButton.disabled) return;


    letterButton.disabled = true;

    if (selectedWord.includes(letter)) {

        letterButton.classList.add('correct');
        guessedLetters.push(letter);
        updateWordDisplay();
    } else {

        letterButton.classList.add('incorrect');
        wrongGuesses++;
        updateHangman();
        livesElement.textContent = `Lives: ${maxWrongGuesses - wrongGuesses}`;


        if (wrongGuesses >= maxWrongGuesses) {
            gameOver = true;
            messageElement.textContent = 'YOU LOSE!';
            messageElement.className = 'message lose';
            wordDisplay.textContent = selectedWord.split('').join(' ');
            disableAllLetters();
            wordInput.disabled = true;
            guessBtn.disabled = true;
        }
    }
}


function handleWordGuess() {
    if (gameOver) return;

    const guessedWord = wordInput.value.toUpperCase().replace(/\s/g, '');

    if (guessedWord === selectedWord) {

        gameOver = true;
        messageElement.textContent = 'YOU SAVED ME!';
        messageElement.className = 'message win';
        wordDisplay.textContent = selectedWord.split('').join(' ');
        disableAllLetters();
        wordInput.disabled = true;
        guessBtn.disabled = true;
    } else {

        wrongGuesses++;
        updateHangman();
        livesElement.textContent = `Lives: ${maxWrongGuesses - wrongGuesses}`;
        wordInput.value = '';


        if (wrongGuesses >= maxWrongGuesses) {
            gameOver = true;
            messageElement.textContent = 'YOU LOSE!';
            messageElement.className = 'message lose';
            wordDisplay.textContent = selectedWord.split('').join(' ');
            disableAllLetters();
            wordInput.disabled = true;
            guessBtn.disabled = true;
        } else {
            messageElement.textContent = 'Wrong guess! Try again.';
            setTimeout(() => {
                if (!gameOver) messageElement.textContent = '';
            }, 1500);
        }
    }
}


function updateHangman() {
    const parts = ['head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg'];
    if (wrongGuesses <= parts.length) {
        hangmanParts.forEach(part => {
            if (part.classList.contains(parts[wrongGuesses - 1])) {
                part.style.display = 'block';
            }
        });
    }
}


function disableAllLetters() {
    Array.from(lettersElement.children).forEach(button => {
        button.disabled = true;
    });
}


document.querySelectorAll('.letter').forEach(button => {
    button.addEventListener('click', () => handleGuess(button.textContent));
});


restartBtn.addEventListener('click', initGame);
guessBtn.addEventListener('click', handleWordGuess);
wordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleWordGuess();
    }
});


window.addEventListener('DOMContentLoaded', initGame);