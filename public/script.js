const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

function addMessage(text, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = text;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userMessage = userInput.value.trim();
    if (!userMessage) return;
    addMessage(userMessage, 'user');
    userInput.value = '';
    const loadingMessage = document.createElement('div');
    loadingMessage.classList.add('message', 'bot', 'loading');
    loadingMessage.textContent = 'mengetik...';
    chatBox.appendChild(loadingMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage }),
        });
        if (!response.ok) throw new Error('Something went wrong');
        const data = await response.json();
        chatBox.removeChild(loadingMessage);
        addMessage(data.reply, 'bot');
    } catch (error) {
        chatBox.removeChild(loadingMessage);
        addMessage('Oops! Ada masalah, coba lagi nanti.', 'bot');
    }
});