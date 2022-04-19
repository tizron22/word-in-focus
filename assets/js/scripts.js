// Header Scripts
/**
 * This will show and hide the difficulty options of the game.
 */
function difficultySelector() {
    const difficultyOptions = document.querySelector('#difficulty-settings');
    if (difficultyOptions.style.display === 'none') {
        difficultyOptions.style.display = 'flex';
    } else {
        difficultyOptions.style.display = 'none';
    };
};


// Game Scripts

/**
 * This is the variables for the game as an Object array.
 */
const difficultySettings = [
    {
        "difficulty" : "easy",
        "guesses" : 7,
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
function addDifficultyListener(){
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
    for(let col = 0; col < columnLength; col++){
        for(let row = 0; row < rowLength; row++){
            baseArray.push('');
        };
        guessInput.push(baseArray);
        baseArray = [];
    };
};

const gameDisplay = document.querySelector('.game');
let curRow = 0;
let curCol = 0; 
/**
 * This will reset the game by removing the innerHTML from the div for the tiles and 
 * then replace it with the new amount of tiles.
 */
function resetGame(){
    gameDisplay.innerHTML = '';
    curRow = 0;
    curCol = 0; 
    guessInput.forEach((guessRow, guessRowIndex) =>{
        const setArea = document.createElement('div');
        setArea.setAttribute('id', 'inputRow-' + guessRowIndex);
        guessRow.forEach((guess, guessIndex) =>{
            const rowArea = document.createElement('div');
            rowArea.setAttribute('id', 'inputRow-' + guessRowIndex + '-inputColumn-' + guessIndex);
            rowArea.classList.add('tile');
            setArea.append(rowArea);
        });
        gameDisplay.append(setArea);
    });
};


setupGame(currentDifficulty);
addDifficultyListener();

/**
 * This is the API method
 */

let answer = 'RUPPET';

const inputKeyboard = document.querySelector('.input');
const keyboardKeys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
                        'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ENTER',
                        'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<<'];

/**
 * Creates the keyboard for the game based on the keys above.
 */
keyboardKeys.forEach(key =>{
    const createKeyboard = document.createElement('button');
    createKeyboard.textContent = key;
    createKeyboard.setAttribute('id', key);
    createKeyboard.addEventListener('click', () => keyboardClick(key));   
    inputKeyboard.append(createKeyboard);
});

/**
 * Based on what the user clicks on will create a different action. 
 * @param {character} letter 
 */
function keyboardClick(letter){
    if(letter === '<<' && curCol > 0){
        deletingEntry();
    } else if(letter === 'ENTER'){
        submittingAnswer();
    } else if(curCol < currentWordLength && curRow <currentGuesses) {
        inputLetter(letter);
    };
};

/**
 * Deletes the previous entry before the attempt has been submitted.
 */
function deletingEntry(){
    curCol--;
    const col = document.querySelector('#inputRow-' + curRow + '-inputColumn-' + curCol);
    col.setAttribute('data', '');
    col.textContent = '';
    guessInput[curRow][curCol] = '';
};

/**
 * Handles the submitted answer either will move attempt to next row,
 * ends the game or move on to the next round.  
 */
function submittingAnswer(){
    const inputWord = guessInput[curRow].join('');
    if(curCol === currentWordLength){
        resultMsg();
    };
};

/**
 * Will add a message to page above the game and below the restart button.
 */
function resultMsg(){
    const resultText = document.querySelector('.result'); 
    if(inputWord === answer){
        resultText.textContent = 'Congratutions';
    } else {
        if(curRow >= currentGuesses) {
            resultText.textContent = 'Try Again?';
        };
    };
    setTimeout(() => resultText.textContent = '', 3000);
};

/**
 * Will input the letter into the current column before moving onto the next one.
 */
function inputLetter(letter){
    const col = document.querySelector('#inputRow-' + curRow + '-inputColumn-' + curCol);
    guessInput[curRow][curCol] = letter;
    curCol++;
    col.textContent = letter;
    col.setAttribute('data', letter);
};
