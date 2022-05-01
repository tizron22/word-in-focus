//Game Settings
const difficultySettings = [
  {
    difficulty: "easy",
    guesses: 7,
    wordlength: 4,
    points: 5,
  },
  {
    difficulty: "medium",
    guesses: 6,
    wordlength: 5,
    points: 15,
  },
  {
    difficulty: "hard",
    guesses: 5,
    wordlength: 6,
    points: 25,
  },
];

/**
 * This function will show the spinner to indicate that the gane is loading.
 * In the variable eithewr select On or Off.
 * @param {string} state
 * @returns Loading Spinner State
 */
const loaderControl = (state) => {
  const loaderElement = document.querySelector("#loader-holder");
  const stateLower = state.toString().toUpperCase();
  if (stateLower === "ON") {
    loaderElement.classList.add("loader");
  } else if (stateLower === "OFF") {
    loaderElement.classList.remove("loader");
  }
};

/**
 * This will obtain the default difficulty to be used.
 */
let currentDifficulty = document.querySelector(
  'input[name="game-difficulty"]:checked'
).value;

// Header Scripts
/**
 * This will show and hide the difficulty options of the game.
 */
const difficultySelector = (menu) => {
  if (menu.style.display === "flex") {
    menu.style.display = "none";
  } else {
    menu.style.display = "flex";
  }
};

const menuSelector = document.querySelector("#dropdown-menu-nav");
menuSelector.addEventListener("click", () => {
  const menu = document.querySelector("#difficulty-settings");
  difficultySelector(menu);
});

let answer;
let wordArray;

const assignWordToAnswer = async () => {
  if (!wordArray.length > 1) {
    wordArray = await getRandWords();
  }
  answer = wordArray.shift();
  console.log(answer);
  console.log(wordArray);
};

/**
 * The API key which does not change and can be used for both calls.
 */
const RAPID_API_KEY = "8fbc3322bfmsh352b091156d869cp1f1b97jsn032c122a82fb";

/**
 * This is the API method
 */
const randWordKeys = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "random-words5.p.rapidapi.com",
    "X-RapidAPI-Key": RAPID_API_KEY,
  },
};

const wordExistKeys = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "twinword-word-graph-dictionary.p.rapidapi.com",
    "X-RapidAPI-Key": RAPID_API_KEY,
  },
};

/**
 * This is the API that checks the random word to make sure it exists in the dictionary
 * @param {string} word
 */
const checkWordExists = async (word) => {
  try {
    const response = await fetch(
      `https://twinword-word-graph-dictionary.p.rapidapi.com/association/?entry=${word}`,
      wordExistKeys
    );
    if (response.status === 200) {
      const vaildWord = word.toUpperCase();
      return vaildWord;
    } else if (response.status === 200) {
      return "";
    }
  } catch (err) {
    const resultText = document.querySelector(".result");
    resultText.textContent =
      "An Error has been found, please restart the game.";
  }
};

/**
 * This is the API fetch that gets the data to use in the game.
 */
const getRandWords = async () => {
  try {
    const response = await fetch(
      `https://random-words5.p.rapidapi.com/getMultipleRandom?count=20&wordLength=${currentWordLength}`,
      randWordKeys
    );
    const jsonData = await response.json();
    const validWords = await Promise.all(jsonData.map(checkWordExists));
    const words = validWords.filter((word) => word !== "");

    wordArray = words;
    assignWordToAnswer();
  } catch (err) {
    const resultText = document.querySelector(".result");
    resultText.textContent =
      "An Error has been found, please restart the game.";
  }
};

/**
 * Creates empty arrays for the user inputs their guesses into.
 * @param {number} rowLength
 * @param {number} columnLength
 */
const createEmptyArrays = (rowLength, columnLength) => {
  let userInput = [];
  let baseArray = [];
  for (let col = 0; col < columnLength; col++) {
    for (let row = 0; row < rowLength; row++) {
      baseArray.push("");
    }
    userInput.push(baseArray);
    baseArray = [];
  }
  return userInput;
};

// Game Scripts

let curRow;
let curCol;
let guessInput;
/**
 * This will reset the game by removing the innerHTML from the div for the tiles and
 * then replace it with the new amount of tiles.
 */
const resetGame = async () => {
  wordArray = await getRandWords();
  // await assignWordToAnswer(wordArray);
  // console.log(wordArray);
  let gameDisplay = document.querySelector(".game");
  gameDisplay.innerHTML = "";
  curRow = 0;
  curCol = 0;
  guessInput = createEmptyArrays(currentWordLength, currentGuesses);
  guessInput.forEach((guessRow, guessRowIndex) => {
    const setArea = document.createElement("div");
    setArea.setAttribute("id", `inputRow-${guessRowIndex}`);
    guessRow.forEach((guess, guessIndex) => {
      const rowArea = document.createElement("div");
      rowArea.setAttribute(
        "id",
        `inputRow-${guessRowIndex}-inputColumn-${guessIndex}`
      );
      rowArea.classList.add("tile");
      setArea.append(rowArea);
    });
    gameDisplay.append(setArea);
  });
  loaderControl("OFF");
};

let currentGuesses;
let currentWordLength;
/**
 * This sets up the game and changes the user input array based on difficulty.
 */
const setupGame = (difficulty) => {
  difficultySettings.forEach((game) => {
    if (game.difficulty === difficulty) {
      loaderControl("ON");
      wordArray = [];
      currentGuesses = game.guesses;
      currentWordLength = game.wordlength;
      resetGame();
    }
  });
};

const restartGame = () => {
  const roundScore = document.querySelector(".round-score");
  const currentRound = document.querySelector(".round-number");
  currentRound.textContent = 1;
  roundScore.textContent = 0;
  resetGame();
};

const restartButtonClick = () => {
  const buttonClick = document.querySelector("#restart");
  buttonClick.addEventListener("click", () => {
    loaderControl("ON");
    restartGame();
  });
};
restartButtonClick();

/**
 * This will add an event listener to the radio buttons and change the game accordingly.
 */
const addDifficultyListener = () => {
  const difficultyRadios = document.querySelectorAll(
    'input[name="game-difficulty"]'
  );
  difficultyRadios.forEach((option) => {
    option.addEventListener("click", () => {
      currentDifficulty = option.value;
      setupGame(currentDifficulty);
    });
  });
};

setupGame(currentDifficulty);
addDifficultyListener();

const keyboardKeys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "ENTER",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "<<",
];
const keyboardArr = [...keyboardKeys];
keyboardArr.push("DELETE", "BACKSPACE");

/**
 * Creates the keyboard for the game based on the keys above.
 */
keyboardKeys.forEach((key) => {
  const inputKeyboard = document.querySelector(".input");
  const createKeyboard = document.createElement("button");
  createKeyboard.textContent = key;
  createKeyboard.setAttribute("id", key);
  createKeyboard.addEventListener("click", () => keyboardClick(key));
  inputKeyboard.append(createKeyboard);
});

/**
 * Based on what the user clicks on will create a different action.
 * @param {string} letter
 */
const keyboardClick = (letter) => {
  if (
    curCol > 0 &&
    (letter === "<<" || letter === "DELETE" || letter === "BACKSPACE")
  ) {
    deletingEntry();
  } else if (letter === "ENTER") {
    submittingAnswer();
  } else if (curCol < currentWordLength && curRow < currentGuesses) {
    inputLetter(letter);
  }
};

const keyboardEvent = document.addEventListener("keydown", (event) => {
  event.preventDefault();
  keyboardArr.forEach((key) => {
    if (key === event.key.toUpperCase()) {
      keyboardClick(event.key.toUpperCase());
    }
  });
});

/**
 * Deletes the previous entry before the attempt has been submitted.
 */
const deletingEntry = () => {
  curCol--;
  const col = document.querySelector(
    `#inputRow-${curRow}-inputColumn-${curCol}`
  );
  col.setAttribute("data", "");
  col.textContent = "";
  guessInput[curRow][curCol] = "";
};

/**
 * Moves to next row if the users guess is wrong.
 */
const nextRow = (userGuess) => {
  if (userGuess !== answer) {
    curRow++;
    curCol = 0;
  }
};

/**
 * Will add a message to page above the game and below the restart button.
 */
const resultMsg = (userGuess) => {
  const resultText = document.querySelector(".result");
  if (userGuess == answer) {
    resultText.textContent = "Congratutions";
    loaderControl("ON");
    increaseRound();
    giveScore(currentDifficulty);
    setTimeout(() => resetGame(), 5000);
  } else {
    if (curRow >= currentGuesses) {
      resultText.textContent = "Try Again?";
    }
  }
  setTimeout(() => (resultText.textContent = ""), 7500);
};

/**
 * Will input the letter into the current column before moving onto the next one.
 */
const inputLetter = (letter) => {
  if (letter !== "<<" && letter !== "DELETE" && letter !== "BACKSPACE") {
    const col = document.querySelector(
      `#inputRow-${curRow}-inputColumn-${curCol}`
    );
    guessInput[curRow][curCol] = letter;
    curCol++;
    col.textContent = letter;
    col.setAttribute("data", letter);
  }
};

const showGuessResults = () => {
  const currentRow = document.querySelector(`#inputRow-${curRow}`).childNodes;
  currentRow.forEach((col, colIndex) => {
    const colLetter = col.getAttribute("data");
    setTimeout(() => {
      if (colLetter === answer[colIndex]) {
        col.style.backgroundColor = "green";
      } else if (answer.includes(colLetter)) {
        col.style.backgroundColor = "orange";
      } else {
        col.style.backgroundColor = "grey";
      }
    }, 250 * colIndex);
  });
};

const increaseRound = () => {
  const currentRound = document.querySelector(".round-number");
  let round = currentRound.textContent;
  round++;
  currentRound.textContent = round;
};

const giveScore = (difficulty) => {
  difficultySettings.forEach((game) => {
    if (game.difficulty === difficulty) {
      const pointsAvailable = game.points;
      const pointsForRound = pointsAvailable / (curRow + 1);
      const roundScore = document.querySelector(".round-score");
      const currScore = parseFloat(roundScore.textContent);
      const newScore = currScore + pointsForRound;
      roundScore.textContent = newScore;
      savingDataToLocal(newScore);
    }
  });
};

const savingDataToLocal = (newScore) => {
  const savedScore = localStorage.getItem("highScore");
  if (newScore >= savedScore) {
    const highScoreEle = document.querySelector("#high-score-number");
    localStorage.setItem("highScore", newScore);
    highScoreEle.textContent = localStorage.getItem("highScore");
  }
};

const checkLocalData = () => {
  const savedScore = localStorage.getItem("highScore");
  const highScoreEle = document.querySelector("#high-score-number");
  if (savedScore === null) {
    localStorage.setItem("highScore", 0);
    highScoreEle.textContent = localStorage.getItem("highScore");
  } else {
    highScoreEle.textContent = localStorage.getItem("highScore");
  }
};
checkLocalData();

/**
 * Handles the submitted answer either will move attempt to next row,
 * ends the game or move on to the next round.
 */
const submittingAnswer = () => {
  const inputWord = guessInput[curRow].join("");
  if (curCol === currentWordLength) {
    showGuessResults();
    nextRow(inputWord);
    resultMsg(inputWord);
  }
};

module.exports = createEmptyArrays;
