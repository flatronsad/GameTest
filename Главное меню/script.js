// Инициализация TonConnect
const connector = new TonConnect({
    manifestUrl: 'tonconnect-manifest.json'
});

// Функция для подключения кошелька
async function connectWallet() {
    try {
        // Запрашиваем подключение кошелька
        const wallet = await connector.connect();
        console.log('Кошелек подключен:', wallet);
        
        // Обновляем текст кнопки
        const button = document.getElementById('connectWallet');
        button.innerHTML = `
            <img src="icons/wallet.svg" alt="Кошелек">
            <span>${wallet.account.address.slice(0, 6)}...${wallet.account.address.slice(-4)}</span>
        `;
    } catch (error) {
        console.error('Ошибка при подключении кошелька:', error);
        alert('Произошла ошибка при подключении кошелька');
    }
}

// Добавляем обработчик события для кнопки
document.getElementById('connectWallet').addEventListener('click', connectWallet); 