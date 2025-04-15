const choices = document.querySelectorAll('.game-option');
const resultModal = document.getElementById('resultModal');
const playerChoiceText = document.getElementById('playerChoice');
const computerChoiceText = document.getElementById('computerChoice');
const gameResultText = document.getElementById('gameResult');
const playAgainButton = document.getElementById('playAgain');

const choicesArray = ['камень', 'ножницы', 'бумага'];

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return choicesArray[randomIndex];
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'Ничья';
    }
    
    if (
        (playerChoice === 'камень' && computerChoice === 'ножницы') ||
        (playerChoice === 'ножницы' && computerChoice === 'бумага') ||
        (playerChoice === 'бумага' && computerChoice === 'камень')
    ) {
        return 'Победа';
    }
    
    return 'Поражение';
}

function showResult(playerChoice, computerChoice, result) {
    playerChoiceText.textContent = `Вы выбрали: ${playerChoice}`;
    computerChoiceText.textContent = `Компьютер выбрал: ${computerChoice}`;
    gameResultText.textContent = `Результат: ${result}`;
    
    resultModal.style.display = 'flex';
}

choices.forEach(choice => {
    choice.addEventListener('click', () => {
        const playerChoice = choice.dataset.choice;
        const computerChoice = getComputerChoice();
        const result = determineWinner(playerChoice, computerChoice);
        
        showResult(playerChoice, computerChoice, result);
    });
});

playAgainButton.addEventListener('click', () => {
    resultModal.style.display = 'none';
}); 