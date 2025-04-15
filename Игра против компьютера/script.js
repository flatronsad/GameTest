const choices = document.querySelectorAll('.game-option');
const resultModal = document.getElementById('resultModal');
const playerChoiceText = document.getElementById('playerChoice');
const computerChoiceText = document.getElementById('computerChoice');
const gameResultText = document.getElementById('gameResult');
const coinsChangeText = document.getElementById('coinsChange');
const playAgainButton = document.getElementById('playAgain');

const choicesArray = ['камень', 'ножницы', 'бумага'];
let balance = parseInt(localStorage.getItem('gameCoins')) || 1000;

function updateBalance(amount) {
    balance += amount;
    localStorage.setItem('gameCoins', balance);
}

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
    
    let coinsChange = 0;
    if (result === 'Победа') {
        coinsChange = 80;
    } else if (result === 'Ничья') {
        coinsChange = -10;
    } else {
        coinsChange = -100;
    }
    
    updateBalance(coinsChange);
    coinsChangeText.textContent = coinsChange > 0 ? 
        `Получено монет: +${coinsChange}` : 
        `Потеряно монет: ${coinsChange}`;
    
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