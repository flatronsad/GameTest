// Инициализация TonConnect UI
const tonConnectUI = new TonConnectUI({
    manifestUrl: 'tonconnect-manifest.json',
    buttonRootId: 'connectWallet'
});

// Обработчик успешного подключения
tonConnectUI.onWalletConnected = (wallet) => {
    console.log('Кошелек подключен:', wallet);
    
    // Обновляем текст кнопки
    const button = document.getElementById('connectWallet');
    button.innerHTML = `
        <img src="icons/wallet.svg" alt="Кошелек">
        <span>${wallet.account.address.slice(0, 6)}...${wallet.account.address.slice(-4)}</span>
    `;
};

// Обработчик отключения кошелька
tonConnectUI.onWalletDisconnected = () => {
    console.log('Кошелек отключен');
    
    // Возвращаем исходный текст кнопки
    const button = document.getElementById('connectWallet');
    button.innerHTML = `
        <img src="icons/wallet.svg" alt="Подключить кошелек">
        <span>Подключить TON</span>
    `;
}; 