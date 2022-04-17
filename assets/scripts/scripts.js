function difficultySelector() {
    const difficultySettings = document.getElementById('difficulty-settings');
    if (difficultySettings.style.display === 'none') {
        difficultySettings.style.display = 'flex';
    } else {
        difficultySettings.style.display = 'none';
    }
};
