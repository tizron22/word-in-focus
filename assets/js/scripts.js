//Game Settings
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

const gamingPoints = [
    {
        "difficulty" : "easy", 
        "points": 5,
    },
    {
        "difficulty" : "medium", 
        "points": 15,
    },
    {
        "difficulty" : "hard", 
        "points": 25,
    },
];

// Header Scripts
/**
 * This will show and hide the difficulty options of the game.
 */
 const difficultySelector = () =>{
    const difficultyOptions = document.querySelector('#difficulty-settings');
    if (difficultyOptions.style.display === 'flex') {
        difficultyOptions.style.display = 'none';
    } else {
        difficultyOptions.style.display = 'flex';
    }
};

let wordArray;
/**
 * This is the API method
 */
const randWordKeys = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'random-words5.p.rapidapi.com',
		'X-RapidAPI-Key': '8fbc3322bfmsh352b091156d869cp1f1b97jsn032c122a82fb'
	}
};

const wordExistKeys = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com',
		'X-RapidAPI-Key': '8fbc3322bfmsh352b091156d869cp1f1b97jsn032c122a82fb'
	}
};
/**
 * This is the API fetch that gets the data to use in the game.
 */
const getRandWords = () =>{
    fetch(`https://random-words5.p.rapidapi.com/getMultipleRandom?count=20&wordLength=${currentWordLength}`, randWordKeys)
        .then(response => response.json())
        .then(response => {
            response.forEach(word =>{
                checkWordExists(word, true);
            });
            assignWordToAnswer();
        })
        .catch(err => console.error(err));
};

/**
 * This is the API that checks the random word to make sure it exists in the dictionary
 * @param {string} word 
 */
const checkWordExists = (word, randWord) =>{
    fetch(`https://twinword-word-graph-dictionary.p.rapidapi.com/association/?entry=${word}`, wordExistKeys)
    .then(response => response.json())
    .then(response => {
        if(response.result_msg === 'Success' && randWord === true){
            wordArray.push(word.toUpperCase());
        } else if(response.result_msg === 'Success' && randWord === false){
            console.log('else if');
        }
    })
    .catch(err => console.error(err));
};

// Game Scripts
let currentDifficulty =  document.querySelector('input[name="game-difficulty"]:checked').value;

/** 
* This will add an event listener to the radio buttons and change the game accordingly.
*/
const addDifficultyListener = () =>{
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
const setupGame = difficulty =>{
    difficultySettings.forEach(game =>{
        if(game.difficulty === difficulty){
            wordArray = [];
            currentGuesses = game.guesses;
            currentWordLength = game.wordlength;
            resetGame();
        }
    });
};


/**
 * Creates empty arrays for the user inputs their guesses into.
 * @param {number} rowLength 
 * @param {number} columnLength 
 */
const createEmptyArrays = (rowLength, columnLength) =>{
    userInput = [];
    let baseArray = [];
    for(let col = 0; col < columnLength; col++){
        for(let row = 0; row < rowLength; row++){
            baseArray.push('');
        }
        userInput.push(baseArray);
        baseArray = [];
    }
    return userInput;
};

let curRow;
let curCol; 
/**
 * This will reset the game by removing the innerHTML from the div for the tiles and 
 * then replace it with the new amount of tiles.
 */
const resetGame = () =>{
    getRandWords();
    let gameDisplay = document.querySelector('.game');
    gameDisplay.innerHTML = '';
    curRow = 0;
    curCol = 0; 
    guessInput = createEmptyArrays(currentWordLength, currentGuesses);
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
let answer;
const assignWordToAnswer = () =>{
    const answerArrayLength = wordArray.length;
    if(answerArrayLength > 0){
        answer = wordArray[0];
        wordArray.shift(answer);
    } else {
        getRandWords();
        answer = wordArray[0];
        wordArray.shift(answer);
    };
};

const keyboardKeys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
                        'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ENTER',
                        'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<<'];
const keyboardArr = [...keyboardKeys];
keyboardArr.push('DELETE', 'BACKSPACE');

/**
 * Creates the keyboard for the game based on the keys above.
 */
keyboardKeys.forEach(key =>{
    const inputKeyboard = document.querySelector('.input');
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
const keyboardClick = letter =>{
    if(curCol > 0 && (letter === '<<' || letter === 'DELETE' || letter === 'BACKSPACE')){
        deletingEntry();
    } else if(letter === 'ENTER'){
        submittingAnswer();
    } else if(curCol < currentWordLength && curRow < currentGuesses) {
        inputLetter(letter);
    }
};

const keyboardEvent = document.addEventListener('keydown', event =>{
    event.preventDefault();
    keyboardArr.forEach(key =>{
        if(key === event.key.toUpperCase()){
            keyboardClick(event.key.toUpperCase());
        }
    });
});

/**
 * Deletes the previous entry before the attempt has been submitted.
 */
const deletingEntry = () =>{
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
const submittingAnswer = () =>{
    const inputWord = guessInput[curRow].join('');
    if(curCol === currentWordLength){
        showGuessResults();
        nextRow(inputWord);
        resultMsg(inputWord);
    }
};

/**
 * Moves to next row if the users guess is wrong.
 */
const nextRow = userGuess =>{if(userGuess !== answer){curRow++; curCol = 0;}};

/**
 * Will add a message to page above the game and below the restart button.
 */
const resultMsg = userGuess =>{
    const resultText = document.querySelector('.result'); 
    if(userGuess == answer){
        resultText.textContent = 'Congratutions';
        increaseRound();
        giveScore(currentDifficulty);
        setTimeout(() => resetGame(), 5000);
    } else {
        if(curRow >= currentGuesses) {
            resultText.textContent = 'Try Again?';
        }
    }
    setTimeout(() => resultText.textContent = '', 7500);
};

/**
 * Will input the letter into the current column before moving onto the next one.
 */
const inputLetter = letter =>{
    if(letter !== '<<' && letter !== 'DELETE' && letter !== 'BACKSPACE'){
        const col = document.querySelector('#inputRow-' + curRow + '-inputColumn-' + curCol);
        guessInput[curRow][curCol] = letter;
        curCol++;
        col.textContent = letter;
        col.setAttribute('data', letter);
    }
};

const showGuessResults = () =>{
    const currentRow = document.querySelector('#inputRow-' + curRow).childNodes;
    currentRow.forEach((col, colIndex) =>{
        const colLetter = col.getAttribute('data');
        setTimeout(() =>{
            if (colLetter === answer[colIndex]){
                col.style.backgroundColor = 'green';
            } else if (answer.includes(colLetter)) {
                col.style.backgroundColor = 'orange';
            } else {
                col.style.backgroundColor = 'grey';
            }
        }, 500 * colIndex);

    });
};

const increaseRound = () =>{
    const currentRound = document.querySelector('.round-number');
    let round = currentRound.textContent;
    round++;
    currentRound.textContent = round;
};

const giveScore = difficulty =>{
    gamingPoints.forEach(game =>{
        if(game.difficulty === difficulty){
            pointsAvailable = game.points;
            pointsForRound = (pointsAvailable / (curRow + 1));
            const roundScore = document.querySelector('.round-score');
            let currScore = parseFloat(roundScore.textContent);
            let newScore = (currScore + pointsForRound);
            roundScore.textContent = newScore;
        }
    });
};

const restartGame = () =>{
    const roundScore = document.querySelector('.round-score');
    const currentRound = document.querySelector('.round-number');
    currentRound.textContent = 1;
    roundScore.textContent = 0;
    resetGame();
};

module.exports = createEmptyArrays;
