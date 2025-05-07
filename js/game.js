document.addEventListener('DOMContentLoaded', function() {
    // Получаем данные персонажа из localStorage
    const characterData = JSON.parse(localStorage.getItem('ruslexCharacter')) || {
        name: 'Неизвестный',
        gender: 'male',
        age: '20',
        class: 'warrior',
        health: 100
    };

    // Устанавливаем аватар в зависимости от пола
    const avatar = document.getElementById('characterAvatar');
    if (characterData.gender === 'male') {
        avatar.innerHTML = '♂<br>ВОИН';
        avatar.style.color = '#4a9c8d';
    } else {
        avatar.innerHTML = '♀<br>ВОИН';
        avatar.style.color = '#f05454';
    }

    // Заполняем информацию о персонаже
    document.getElementById('characterName').textContent = characterData.name.toUpperCase();
    document.getElementById('characterClass').textContent = getClassDisplayName(characterData.class);
    document.getElementById('healthValue').textContent = characterData.health;
    document.getElementById('healthFill').style.width = `${characterData.health}%`;

    // Инициализируем вкладки
    const profileTab = document.getElementById('profileTab');
    const chatTab = document.getElementById('chatTab');
    const profileSection = document.getElementById('profileSection');
    const chatSection = document.getElementById('chatSection');

    profileTab.addEventListener('click', function() {
        profileTab.classList.add('active');
        chatTab.classList.remove('active');
        profileSection.classList.add('active');
        chatSection.classList.remove('active');
    });

    chatTab.addEventListener('click', function() {
        chatTab.classList.add('active');
        profileTab.classList.remove('active');
        chatSection.classList.add('active');
        profileSection.classList.remove('active');
    });

    // Генерируем события для лога
    const eventLog = document.getElementById('eventLog');
    const events = [
        `${characterData.name} появился в мире Ruslex!`,
        `Вы выбрали класс ${getClassDisplayName(characterData.class).toLowerCase()}.`,
        'Вы находитесь в стартовой локации.',
        'Поговорите с местными жителями, чтобы получить задания.',
        'Ваш друг Алексей хочет поговорить с вами (см. вкладку ЧАТ).'
    ];

    events.forEach(event => {
        const eventElement = document.createElement('p');
        eventElement.textContent = `> ${event}`;
        eventLog.appendChild(eventElement);
    });

    // Инициализируем чат
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');

    // Предзагруженные сообщения
    const predefinedMessages = [
        {
            sender: 'Алексей',
            text: 'Привет! Как дела?',
            time: '12:30'
        },
        {
            sender: 'Мария',
            text: 'Готов к новому заданию?',
            time: '12:35'
        },
        {
            sender: characterData.name,
            text: 'Я только начал игру!',
            time: '12:40'
        }
    ];

    predefinedMessages.forEach(msg => {
        addMessageToChat(msg.sender, msg.text, msg.time);
    });

    // Обработчик отправки сообщения
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const text = messageInput.value.trim();
        if (text) {
            addMessageToChat(characterData.name, text, getCurrentTime());
            messageInput.value = '';
            
            // Имитация ответа
            setTimeout(() => {
                const responses = [
                    'Интересно...',
                    'Я понял тебя!',
                    'Давай встретимся в игре!',
                    'У меня для тебя есть задание.'
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessageToChat('Алексей', randomResponse, getCurrentTime());
            }, 1000);
        }
    }

    function addMessageToChat(sender, text, time) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message';
        
        const senderDiv = document.createElement('div');
        senderDiv.className = 'message-sender';
        senderDiv.textContent = sender;
        
        const textDiv = document.createElement('div');
        textDiv.className = 'message-text';
        textDiv.textContent = text;
        
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = time;
        
        messageDiv.appendChild(senderDiv);
        messageDiv.appendChild(textDiv);
        messageDiv.appendChild(timeDiv);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getCurrentTime() {
        const now = new Date();
        return `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    }

    function getClassDisplayName(classId) {
        const classes = {
            warrior: 'ВОИН',
            mage: 'МАГ',
            rogue: 'ПЛУТ'
        };
        return classes[classId] || 'ПУТЕШЕСТВЕННИК';
    }
});