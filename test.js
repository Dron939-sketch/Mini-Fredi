// ========== test.js ==========
// ТЕСТ КАК В TELEGRAM - ВОПРОС И КНОПКИ ВМЕСТЕ

const Test = {
    // Текущее состояние
    currentStage: 0,
    currentQuestionIndex: 0,
    userId: null,
    answers: {},
    
    // Структура теста
    stages: [
        { 
            id: 'perception', 
            name: '🧠 ЭТАП 1/5: ВОСПРИЯТИЕ',
            description: 'Линза, через которую вы смотрите на мир'
        },
        { 
            id: 'thinking', 
            name: '🧠 ЭТАП 2/5: МЫШЛЕНИЕ',
            description: 'Как вы обрабатываете информацию'
        },
        { 
            id: 'behavior', 
            name: '🧠 ЭТАП 3/5: ПОВЕДЕНИЕ',
            description: 'Ваши автоматические реакции'
        },
        { 
            id: 'growth', 
            name: '🧠 ЭТАП 4/5: ТОЧКА РОСТА',
            description: 'Где находится рычаг изменений'
        },
        { 
            id: 'deep', 
            name: '🧠 ЭТАП 5/5: ГЛУБИННЫЕ ПАТТЕРНЫ',
            description: 'Тип привязанности, защитные механизмы'
        }
    ],
    
    // Вопросы по этапам
    questions: {
        perception: [
            {
                id: 'p1',
                text: 'Когда вы заходите в новую компанию, что замечаете в первую очередь?',
                options: [
                    '👥 Кто с кем общается и какие между ними отношения',
                    '🤔 Что здесь происходит и каковы правила',
                    '💡 Какие здесь есть возможности и идеи',
                    '⚡ Кто здесь главный и какую позицию занять'
                ]
            },
            {
                id: 'p2',
                text: 'Какое утверждение больше про вас?',
                options: [
                    '🎨 Я чувствую атмосферу и настроение людей',
                    '📊 Я анализирую факты и логику',
                    '🔮 Я вижу потенциал и будущие возможности',
                    '🏃 Я действую быстро, не задумываясь'
                ]
            },
            {
                id: 'p3',
                text: 'В конфликтной ситуации вы обычно:',
                options: [
                    '❤️ Стараетесь сгладить и сохранить отношения',
                    '⚖️ Ищете справедливое решение',
                    '💭 Анализируете причины конфликта',
                    '🛡️ Защищаете свои интересы'
                ]
            }
        ],
        
        thinking: [
            {
                id: 't1',
                text: 'Когда вы сталкиваетесь с проблемой, вы:',
                options: [
                    '📚 Ищете похожий опыт и готовые решения',
                    '🧩 Раскладываете на части и анализируете',
                    '💫 Доверяете интуиции и первому впечатлению',
                    '🤝 Советуетесь с другими'
                ]
            },
            {
                id: 't2',
                text: 'Что вам легче всего?',
                options: [
                    '🔍 Замечать детали и нюансы',
                    '📈 Видеть общую картину и тенденции',
                    '🎯 Находить нестандартные решения',
                    '📝 Действовать по инструкции'
                ]
            },
            {
                id: 't3',
                text: 'Как вы принимаете важные решения?',
                options: [
                    '⚖️ Взвешиваете все за и против',
                    '💭 Прислушиваетесь к внутреннему голосу',
                    '👥 Советуетесь с близкими',
                    '⏰ Откладываете, пока всё не решится само'
                ]
            }
        ],
        
        behavior: [
            {
                id: 'b1',
                text: 'В стрессовой ситуации вы:',
                options: [
                    '🏃‍♂️ Начинаете действовать быстро и активно',
                    '🧊 Замираете и наблюдаете',
                    '🗣 Ищете поддержку у других',
                    '🎭 Делаете вид, что всё нормально'
                ]
            },
            {
                id: 'b2',
                text: 'Когда кто-то критикует вас, вы:',
                options: [
                    '👂 Внимательно слушаете и анализируете',
                    '🛡️ Защищаетесь и объясняете',
                    '😔 Расстраиваетесь и переживаете',
                    '🤷 Пропускаете мимо ушей'
                ]
            },
            {
                id: 'b3',
                text: 'Ваш типичный способ отдыха:',
                options: [
                    '🏠 Побыть в тишине и одиночестве',
                    '👥 Встретиться с друзьями',
                    '🎮 Заняться любимым хобби',
                    '📱 Зависнуть в телефоне/интернете'
                ]
            }
        ],
        
        growth: [
            {
                id: 'g1',
                text: 'Что для вас самое сложное?',
                options: [
                    '🚀 Начинать новое',
                    '⏸ Останавливаться и отдыхать',
                    '🙏 Просить о помощи',
                    '🎯 Доводить до конца'
                ]
            },
            {
                id: 'g2',
                text: 'В чем ваша суперсила?',
                options: [
                    '💪 Упорство и дисциплина',
                    '🤝 Эмпатия и понимание людей',
                    '💡 Креативность и идеи',
                    '⚡ Скорость и реакция'
                ]
            },
            {
                id: 'g3',
                text: 'Что бы вы хотели в себе изменить?',
                options: [
                    '🐢 Меньше тормозить',
                    '🎭 Меньше зависеть от чужого мнения',
                    '🧠 Лучше понимать свои эмоции',
                    '📋 Стать более организованным'
                ]
            }
        ],
        
        deep: [
            {
                id: 'd1',
                text: 'В детстве, когда вы расстраивались, родители обычно:',
                options: [
                    '🤗 Утешали и обнимали',
                    '💬 Объясняли и говорили',
                    '⏰ Оставляли побыть одного',
                    '🎁 Отвлекали чем-то интересным'
                ]
            },
            {
                id: 'd2',
                text: 'В отношениях вы чаще всего боитесь:',
                options: [
                    '👋 Что вас бросят',
                    '🔗 Потерять себя',
                    '🙅 Что не поймут',
                    '💔 Что будет больно'
                ]
            },
            {
                id: 'd3',
                text: 'Какое утверждение про вас?',
                options: [
                    '🏰 Я сам по себе, мне никто не нужен',
                    '🤝 Я не могу без близких отношений',
                    '🎭 Я по-разному веду себя с разными людьми',
                    '🌊 Я плыву по течению'
                ]
            }
        ]
    },
    
    // Инициализация теста
    init(userId) {
        this.userId = userId || App?.userId || 'test_user';
        this.currentStage = 0;
        this.currentQuestionIndex = 0;
        this.answers = {};
        
        // Загружаем сохраненные ответы если есть
        this.loadProgress();
        
        console.log('📝 Тест инициализирован для пользователя:', this.userId);
    },
    
    // Загрузка прогресса
    loadProgress() {
        const saved = localStorage.getItem(`test_${this.userId}`);
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.currentStage = data.currentStage || 0;
                this.currentQuestionIndex = data.currentQuestionIndex || 0;
                this.answers = data.answers || {};
                console.log('📂 Загружен прогресс теста, этап:', this.currentStage, 'вопрос:', this.currentQuestionIndex);
            } catch (e) {
                console.warn('❌ Ошибка загрузки прогресса:', e);
            }
        }
    },
    
    // Сохранение прогресса
    saveProgress() {
        const data = {
            currentStage: this.currentStage,
            currentQuestionIndex: this.currentQuestionIndex,
            answers: this.answers,
            updatedAt: new Date().toISOString()
        };
        localStorage.setItem(`test_${this.userId}`, JSON.stringify(data));
        console.log('💾 Прогресс сохранен');
    },
    
    // Начать тест
    start() {
        this.currentStage = 0;
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.saveProgress();
        this.showTestScreen();
        
        // Показываем приветственное сообщение
        setTimeout(() => {
            this.addBotMessageWithButtons(
                '🧠 Начинаем тест из 5 этапов. Я буду задавать вопросы, а ты выбирай ответы.',
                []
            );
            
            // Через секунду показываем первый вопрос
            setTimeout(() => {
                this.sendNextQuestion();
            }, 1000);
        }, 100);
    },
    
    // Показать экран теста (контейнер для сообщений)
    showTestScreen() {
        const container = document.getElementById('screenContainer');
        
        container.innerHTML = `
            <div class="test-messages-container" id="testMessagesContainer">
                <div class="test-messages-list" id="testMessagesList"></div>
            </div>
        `;
        
        // Добавляем стили
        this.addTestStyles();
    },
    
    // Добавить сообщение бота с кнопками
    addBotMessageWithButtons(text, options, callback) {
        const messagesList = document.getElementById('testMessagesList');
        if (!messagesList) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        
        let buttonsHtml = '';
        if (options && options.length > 0) {
            buttonsHtml = '<div class="message-buttons">';
            options.forEach((option, index) => {
                buttonsHtml += `
                    <button class="message-button" data-option-index="${index}">
                        ${option}
                    </button>
                `;
            });
            buttonsHtml += '</div>';
        }
        
        messageDiv.innerHTML = `
            <div class="message-bubble">
                <div class="message-text">${text}</div>
                ${buttonsHtml}
                <div class="message-time">только что</div>
            </div>
        `;
        
        messagesList.appendChild(messageDiv);
        
        // Добавляем обработчики для кнопок
        if (options && options.length > 0 && callback) {
            const buttons = messageDiv.querySelectorAll('.message-button');
            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const index = parseInt(btn.dataset.optionIndex);
                    
                    // Добавляем сообщение пользователя
                    this.addUserMessage(options[index]);
                    
                    // Удаляем кнопки из сообщения бота
                    const buttonsContainer = messageDiv.querySelector('.message-buttons');
                    if (buttonsContainer) {
                        buttonsContainer.remove();
                    }
                    
                    // Вызываем callback
                    callback(index);
                });
            });
        }
        
        // Прокрутка вниз
        setTimeout(() => {
            const container = document.getElementById('testMessagesContainer');
            if (container) {
                container.scrollTop = container.scrollHeight;
            }
        }, 50);
        
        return messageDiv;
    },
    
    // Добавить сообщение пользователя
    addUserMessage(text) {
        const messagesList = document.getElementById('testMessagesList');
        if (!messagesList) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `
            <div class="message-bubble">
                <div class="message-text">${text}</div>
                <div class="message-time">только что</div>
                <div class="message-status">
                    <span class="status-icon sent"></span>
                </div>
            </div>
        `;
        
        messagesList.appendChild(messageDiv);
        
        // Прокрутка вниз
        setTimeout(() => {
            const container = document.getElementById('testMessagesContainer');
            if (container) {
                container.scrollTop = container.scrollHeight;
            }
        }, 50);
    },
    
    // Отправить следующий вопрос
    sendNextQuestion() {
        if (this.currentStage >= this.stages.length) {
            this.showResults();
            return;
        }
        
        const stage = this.stages[this.currentStage];
        const questions = this.questions[stage.id];
        
        if (this.currentQuestionIndex >= questions.length) {
            // Переходим к следующему этапу
            this.currentStage++;
            this.currentQuestionIndex = 0;
            
            if (this.currentStage < this.stages.length) {
                this.sendStageMessage();
            } else {
                this.showResults();
            }
            return;
        }
        
        const question = questions[this.currentQuestionIndex];
        
        // Показываем вопрос с кнопками
        this.addBotMessageWithButtons(
            question.text,
            question.options,
            (selectedIndex) => {
                this.handleAnswer(stage.id, question.id, selectedIndex, question.options[selectedIndex]);
            }
        );
    },
    
    // Отправить сообщение о начале этапа
    sendStageMessage() {
        const stage = this.stages[this.currentStage];
        const stageMessage = `${stage.name}\n${stage.description}`;
        
        this.addBotMessageWithButtons(stageMessage, []);
        
        // Небольшая пауза перед первым вопросом этапа
        setTimeout(() => {
            this.sendNextQuestion();
        }, 1000);
    },
    
    // Обработка ответа
    handleAnswer(stageId, questionId, optionIndex, optionText) {
        const answerKey = `${stageId}_${questionId}`;
        this.answers[answerKey] = optionIndex;
        
        // Сохраняем прогресс
        this.saveProgress();
        
        // Переходим к следующему вопросу
        this.currentQuestionIndex++;
        
        // Небольшая пауза перед следующим вопросом
        setTimeout(() => {
            this.sendNextQuestion();
        }, 800);
    },
    
    // Показать результаты
    showResults() {
        const results = this.calculateResults();
        
        // Отправляем результаты на сервер
        if (window.api) {
            api.saveTestResults(this.userId, results).catch(e => {
                console.warn('❌ Не удалось сохранить результаты на сервере:', e);
            });
        }
        
        // Очищаем прогресс
        localStorage.removeItem(`test_${this.userId}`);
        
        // Показываем результаты
        this.renderResults(results);
    },
    
    // Расчет результатов
    calculateResults() {
        const results = {
            perception: this.calculateDimension('perception'),
            thinking: this.calculateDimension('thinking'),
            behavior: this.calculateDimension('behavior'),
            growth: this.calculateDimension('growth'),
            deep: this.calculateDimension('deep'),
            
            profile: this.getProfileType(),
            attachment: this.getAttachmentType(),
            defense: this.getDefenseMechanisms()
        };
        
        return results;
    },
    
    // Расчет одного измерения
    calculateDimension(dimension) {
        const questions = this.questions[dimension];
        let sum = 0;
        let count = 0;
        
        questions.forEach(q => {
            const answer = this.answers[`${dimension}_${q.id}`];
            if (answer !== undefined) {
                sum += answer;
                count++;
            }
        });
        
        // Нормализуем к 0-100%
        return count > 0 ? Math.round((sum / (count * 3)) * 100) : 50;
    },
    
    // Тип профиля
    getProfileType() {
        const p = this.calculateDimension('perception');
        const t = this.calculateDimension('thinking');
        const b = this.calculateDimension('behavior');
        
        if (p > 60 && t > 60) return '🧠 Аналитик';
        if (p > 60 && b > 60) return '🤝 Эмпат';
        if (t > 60 && b > 60) return '⚡ Реализатор';
        if (p < 40 && t < 40) return '🎨 Творец';
        return '🌀 Гармоничный';
    },
    
    // Тип привязанности
    getAttachmentType() {
        const d1 = this.answers['deep_d1'];
        const d2 = this.answers['deep_d2'];
        
        if (d1 === 0 && d2 === 1) return '🤗 Надежный';
        if (d1 === 2 && d2 === 0) return '😥 Тревожный';
        if (d1 === 1 && d2 === 0) return '🛡️ Избегающий';
        return '🌀 Смешанный';
    },
    
    // Защитные механизмы
    getDefenseMechanisms() {
        const mechanisms = [];
        
        if (this.answers['behavior_b1'] === 1) mechanisms.push('🧊 Замирание');
        if (this.answers['behavior_b2'] === 1) mechanisms.push('🛡️ Рационализация');
        if (this.answers['deep_d3'] === 2) mechanisms.push('🎭 Диссоциация');
        
        return mechanisms.length > 0 ? mechanisms : ['⚖️ Адаптивные'];
    },
    
    // Отрисовка результатов
    renderResults(results) {
        const container = document.getElementById('screenContainer');
        
        const html = `
            <div class="results-container">
                <div class="results-header">
                    <div class="results-emoji">📊</div>
                    <h1>Ваш психологический профиль</h1>
                    <p class="profile-type">${results.profile}</p>
                </div>
                
                <div class="results-dimensions">
                    <div class="dimension-item">
                        <div class="dimension-name">Восприятие</div>
                        <div class="dimension-bar">
                            <div class="dimension-fill" style="width: ${results.perception}%"></div>
                        </div>
                        <div class="dimension-value">${results.perception}%</div>
                    </div>
                    
                    <div class="dimension-item">
                        <div class="dimension-name">Мышление</div>
                        <div class="dimension-bar">
                            <div class="dimension-fill" style="width: ${results.thinking}%"></div>
                        </div>
                        <div class="dimension-value">${results.thinking}%</div>
                    </div>
                    
                    <div class="dimension-item">
                        <div class="dimension-name">Поведение</div>
                        <div class="dimension-bar">
                            <div class="dimension-fill" style="width: ${results.behavior}%"></div>
                        </div>
                        <div class="dimension-value">${results.behavior}%</div>
                    </div>
                    
                    <div class="dimension-item">
                        <div class="dimension-name">Точка роста</div>
                        <div class="dimension-bar">
                            <div class="dimension-fill" style="width: ${results.growth}%"></div>
                        </div>
                        <div class="dimension-value">${results.growth}%</div>
                    </div>
                    
                    <div class="dimension-item">
                        <div class="dimension-name">Глубинные паттерны</div>
                        <div class="dimension-bar">
                            <div class="dimension-fill" style="width: ${results.deep}%"></div>
                        </div>
                        <div class="dimension-value">${results.deep}%</div>
                    </div>
                </div>
                
                <div class="results-details">
                    <div class="detail-card">
                        <h3>🧠 Тип привязанности</h3>
                        <p>${results.attachment}</p>
                    </div>
                    
                    <div class="detail-card">
                        <h3>🛡️ Защитные механизмы</h3>
                        <p>${results.defense.join(' · ')}</p>
                    </div>
                </div>
                
                <div class="results-actions">
                    <button class="onboarding-btn primary" onclick="Test.chooseMode('coach')">
                        🔮 КОУЧ
                    </button>
                    <button class="onboarding-btn primary" onclick="Test.chooseMode('psychologist')">
                        🧠 ПСИХОЛОГ
                    </button>
                    <button class="onboarding-btn primary" onclick="Test.chooseMode('trainer')">
                        ⚡ ТРЕНЕР
                    </button>
                </div>
                
                <div class="results-chat">
                    <button class="onboarding-btn secondary" onclick="Test.startChat()">
                        💬 Перейти в чат
                    </button>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
        
        // Добавляем стили
        this.addResultsStyles();
    },
    
    // Выбор режима общения
    chooseMode(mode) {
        localStorage.setItem('chatMode', mode);
        alert(`✅ Выбран режим: ${mode === 'coach' ? 'КОУЧ' : mode === 'psychologist' ? 'ПСИХОЛОГ' : 'ТРЕНЕР'}`);
        this.startChat();
    },
    
    // Переход в чат
    startChat() {
        if (App && App.showMainChat) {
            App.showMainChat();
        } else {
            window.location.href = '#chat';
        }
    },
    
    // Добавление стилей теста
    addTestStyles() {
        if (document.getElementById('testStyles')) return;
        
        const style = document.createElement('style');
        style.id = 'testStyles';
        style.textContent = `
            .test-messages-container {
                display: flex;
                flex-direction: column;
                height: 100%;
                overflow-y: auto;
                padding: 16px;
                position: relative;
            }
            
            .test-messages-list {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            
            .message-buttons {
                display: flex;
                flex-direction: column;
                gap: 6px;
                margin-top: 12px;
            }
            
            .message-button {
                width: 100%;
                padding: 12px 16px;
                background: var(--glass-bg);
                border: 1px solid var(--glass-border);
                border-radius: 30px;
                color: var(--max-text);
                font-size: 15px;
                text-align: left;
                cursor: pointer;
                transition: all 0.2s;
                backdrop-filter: blur(8px);
            }
            
            .message-button:hover {
                background: var(--max-hover);
                border-color: var(--max-blue);
                transform: translateY(-1px);
            }
            
            .message-button:active {
                transform: translateY(0);
            }
            
            /* Стили для результатов */
            .results-container {
                padding: 20px;
                overflow-y: auto;
                height: 100%;
            }
            
            .results-header {
                text-align: center;
                margin-bottom: 24px;
            }
            
            .results-emoji {
                font-size: 48px;
                margin-bottom: 8px;
            }
            
            .profile-type {
                font-size: 20px;
                color: var(--max-blue);
                font-weight: 600;
                margin-top: 8px;
            }
            
            .results-dimensions {
                margin: 24px 0;
            }
            
            .dimension-item {
                display: flex;
                align-items: center;
                gap: 12px;
                margin-bottom: 12px;
            }
            
            .dimension-name {
                width: 100px;
                font-size: 14px;
            }
            
            .dimension-bar {
                flex: 1;
                height: 8px;
                background: var(--glass-bg);
                border-radius: 4px;
                overflow: hidden;
            }
            
            .dimension-fill {
                height: 100%;
                background: linear-gradient(90deg, var(--max-blue), #5a9eff);
                border-radius: 4px;
                transition: width 0.3s;
            }
            
            .dimension-value {
                width: 45px;
                font-size: 14px;
                font-weight: 600;
            }
            
            .results-details {
                display: flex;
                gap: 16px;
                margin: 24px 0;
            }
            
            .detail-card {
                flex: 1;
                padding: 16px;
                background: var(--glass-bg);
                border: 1px solid var(--glass-border);
                border-radius: 16px;
                text-align: center;
            }
            
            .detail-card h3 {
                font-size: 14px;
                margin-bottom: 8px;
                color: var(--max-text-secondary);
            }
            
            .detail-card p {
                font-size: 16px;
                font-weight: 600;
            }
            
            .results-actions {
                display: flex;
                gap: 8px;
                margin: 20px 0;
                flex-wrap: wrap;
            }
            
            .results-actions .onboarding-btn {
                flex: 1;
                min-width: 100px;
                font-size: 14px;
            }
            
            .results-chat {
                margin-top: 20px;
            }
            
            /* Анимации */
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .message {
                animation: slideIn 0.3s ease;
            }
            
            .message-button {
                animation: slideIn 0.3s ease;
            }
        `;
        
        document.head.appendChild(style);
    },
    
    addResultsStyles() {
        this.addTestStyles();
    }
};

// Делаем Test доступным глобально
window.Test = Test;
