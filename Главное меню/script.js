document.getElementById('connectWallet').addEventListener('click', async () => {
    try {
        // Проверяем наличие TonConnect
        if (typeof window.tonConnect !== 'undefined') {
            // Запрашиваем подключение кошелька
            const wallet = await window.tonConnect.connect();
            console.log('Кошелек подключен:', wallet);
            
            // Обновляем текст кнопки
            const button = document.getElementById('connectWallet');
            button.innerHTML = `
                <img src="icons/wallet.svg" alt="Кошелек">
                <span>${wallet.account.address.slice(0, 6)}...${wallet.account.address.slice(-4)}</span>
            `;
        } else {
            alert('Пожалуйста, установите расширение TonConnect');
            window.open('https://ton.org/connect', '_blank');
        }
    } catch (error) {
        console.error('Ошибка при подключении кошелька:', error);
        alert('Произошла ошибка при подключении кошелька');
    }
}); 