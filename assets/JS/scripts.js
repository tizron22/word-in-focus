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

function addDifficultyListener() {
    const difficultyRadios = document.querySelectorAll('input[name="game-difficulty"]');
    difficultyRadios.forEach(option =>{
        option.addEventListener('click', () => {
            currentDifficulty = option.value;
            console.log("You've clicked " + currentDifficulty);
        });
    });
};

addDifficultyListener();


