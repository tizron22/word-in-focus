// Header Scripts

function difficultySelector() {
    const difficultySettings = document.getElementById('difficulty-settings');
    if (difficultySettings.style.display === 'none') {
        difficultySettings.style.display = 'flex';
    } else {
        difficultySettings.style.display = 'none';
    }
};


// Game Scripts

// Set Up Game

const difficultySettings = [
    {
        "difficulty" : "easy",
        "guesses" : 8,
        "wordlength" : 4,
    },
    {
        "difficulty" : "medium",
        "guesses" : 6,
        "wordlength" : 5,
    },
    {
        "difficulty" : "hard",
        "guesses" : 5,
        "wordlength" : 6,
    },
];

let currentDifficulty = document.querySelector('input[name="game-difficulty"]:checked').value;
/** 
* This will add an event listener to the radio buttons and change the game accordingly.
*/
function addDifficultyListener() {
    const difficultyRadios = document.querySelectorAll('input[name="game-difficulty"]');
    difficultyRadios.forEach(option =>{
        option.addEventListener('click', () => {
            currentDifficulty = option.value;
            setupGame(currentDifficulty);
        });
    });
};

let currentGuesses;
let currentWordLength;
/**
 * This sets up the game and changes the user input array based on difficulty.
 */
function setupGame(difficulty){
    difficultySettings.forEach(game =>{
        if(game.difficulty === difficulty){
            currentGuesses = game.guesses;
            currentWordLength = game.wordlength;
            createEmptyArrays(currentWordLength, currentGuesses);
            resetGame();
        };
    });
};

let guessInput;
/**
 * Creates empty arrays for the user inputs their guesses into.
 * @param {number} rowLength 
 * @param {number} columnLength 
 */
function createEmptyArrays(rowLength, columnLength){
    guessInput = [];
    let baseArray = [];
    for(let i = 0; i < rowLength; i++){
        baseArray.push('');
    };
    for(let i = 0; i < columnLength; i++){
        guessInput.push(baseArray);
    };
};

const gameDisplay = document.querySelector('.game');

/**
 * This will reset the game by removing the innerHTML from the div for the tiles and 
 * then replace it with the new amount of tiles.
 */
function resetGame(){
    gameDisplay.innerHTML = '';
    guessInput.forEach((guessRow, guessRowIndex) =>{
        const setArea = document.createElement('div');
        setArea.setAttribute('id', 'inputRow-' + guessRowIndex);
        guessRow.forEach((guess, guessIndex) =>{
            const rowArea = document.createElement('div');
            rowArea.setAttribute('id', 'inputRow-' + guessRowIndex + '-area-' + guessIndex);
            rowArea.classList.add('tile');
            setArea.append(rowArea);
        });
        gameDisplay.append(setArea);
    });
};


setupGame(currentDifficulty);
addDifficultyListener();

const inputKeyboard = document.querySelector('.input');

const keyboardKeys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
                        'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ENTER',
                        'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<<'];

keyboardKeys.forEach(key =>{
    const createKeyboard = document.createElement('button');
    createKeyboard.textContent = key;
    createKeyboard.setAttribute('id', key);   
    inputKeyboard.append(createKeyboard);
});