// Инициализация TON Connect
let tonConnectUI;

document.addEventListener('DOMContentLoaded', () => {
    tonConnectUI = new TONConnectUI({
        manifestUrl: '../Главное меню/tonconnect-manifest.json',
        buttonRootId: 'ton-connect'
    });

    // Обработчик подключения кошелька
    tonConnectUI.onWalletConnected = (wallet) => {
        console.log('Wallet connected:', wallet);
    };

    // Обработчик отключения кошелька
    tonConnectUI.onWalletDisconnected = () => {
        console.log('Wallet disconnected');
    };
});

// Функция для покупки монет
async function buyCoins(amount, price) {
    try {
        if (!tonConnectUI) {
            alert('Пожалуйста, подождите инициализации кошелька');
            return;
        }

        const wallet = await tonConnectUI.connectWallet();
        if (!wallet) {
            alert('Пожалуйста, подключите кошелек');
            return;
        }

        // Создаем транзакцию
        const transaction = {
            validUntil: Math.floor(Date.now() / 1000) + 600, // 10 минут на выполнение
            messages: [
                {
                    address: 'EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N', // Адрес смарт-контракта
                    amount: (price * 1000000000).toString(), // Конвертируем TON в наноТОНы
                    payload: `buy_coins:${amount}` // Добавляем информацию о покупке монет
                }
            ]
        };

        // Отправляем транзакцию
        const result = await tonConnectUI.sendTransaction(transaction);
        
        if (result) {
            // После успешной покупки
            const currentCoins = parseInt(localStorage.getItem('gameCoins') || 1000);
            localStorage.setItem('gameCoins', (currentCoins + amount).toString());
            alert(`Успешно куплено ${amount} монет!`);
            window.location.href = '../Главное меню/index.html';
        }
    } catch (error) {
        console.error('Ошибка при покупке монет:', error);
        alert('Произошла ошибка при покупке монет: ' + error.message);
    }
}

// Экспортируем функцию для использования в HTML
window.buyCoins = buyCoins; 