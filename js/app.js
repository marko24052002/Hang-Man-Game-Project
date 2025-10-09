

// Game variables
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

// DOM elements
const wordDisplay = document.getElementById('word-display');
const messageElement = document.getElementById('message');
const livesElement = document.getElementById('lives');
const lettersElement = document.getElementById('letters');
const restartBtn = document.getElementById('restart-btn');
const hangmanParts = document.querySelectorAll('.part');
const wordInput = document.getElementById('word-input');
const guessBtn = document.getElementById('guess-btn');



