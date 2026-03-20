// ========== test.js ==========
// ПОЛНЫЙ ТЕСТ ИЗ 5 ЭТАПОВ

const Test = {
    // Текущее состояние
    currentStage: 0,
    userId: null,
    answers: {},
    
    // Структура теста
    stages: [
        { 
            id: 'perception', 
            name: '🧠 ЭТАП 1/5: КОНФИГУРАЦИЯ ВОСПРИЯТИЯ',
            description: 'Линза, через которую вы смотрите на мир'
        },
        { 
            id: 'thinking', 
            name: '🧠 ЭТАП 2/5: КОНФИГУРАЦИЯ МЫШЛЕНИЯ',
            description: 'Как вы обрабатываете информацию'
        },
        { 
            id: 'behavior', 
            name: '🧠 ЭТАП 3/5: КОНФИГУРАЦИЯ ПОВЕДЕНИЯ',
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
                    '🎭 Я по-разному ведусь с разными людьми',
                    '🌊 Я плыву по течению'
                ]
            }
        ]
    },
    
    // Инициализация теста
    init(userId) {
        this.userId = userId || App?.userId || 'test_user';
        this.currentStage = 0;
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
                this.answers = data.answers || {};
                console.log('📂 Загружен прогресс теста, этап:', this.currentStage);
            } catch (e) {
                console.warn('❌ Ошибка загрузки прогресса:', e);
            }
        }
    },
    
    // Сохранение прогресса
    saveProgress() {
        const data = {
            currentStage: this.currentStage,
            answers: this.answers,
            updatedAt: new Date().toISOString()
        };
        localStorage.setItem(`test_${this.userId}`, JSON.stringify(data));
        console.log('💾 Прогресс сохранен');
    },
    
    // Начать тест
    start() {
        this.currentStage = 0;
        this.answers = {};
        this.saveProgress();
        this.showCurrentStage();
    },
    
    // Показать текущий этап
    showCurrentStage() {
        if (this.currentStage >= this.stages.length) {
            this.showResults();
            return;
        }
        
        const stage = this.stages[this.currentStage];
        const questions = this.questions[stage.id];
        
        this.renderStage(stage, questions);
    },
    
    // Отрисовка этапа
    renderStage(stage, questions) {
        const container = document.getElementById('screenContainer');
        if (!container) return;
        
        // Создаем HTML
        let html = `
            <div class="test-container">
                <div class="test-header">
                    <div class="test-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${(this.currentStage / this.stages.length) * 100}%"></div>
                        </div>
                        <div class="progress-text">${stage.name}</div>
                        <div class="stage-desc">${stage.description}</div>
                    </div>
                </div>
                
                <div class="test-questions">
        `;
        
        // Добавляем вопросы
        questions.forEach((q, index) => {
            const savedAnswer = this.answers[`${stage.id}_${q.id}`];
            
            html += `
                <div class="test-question" data-question-id="${q.id}">
                    <div class="question-text">${index + 1}. ${q.text}</div>
                    <div class="question-options">
            `;
            
            q.options.forEach((option, optIndex) => {
                const isSelected = savedAnswer === optIndex;
                html += `
                    <button class="question-option ${isSelected ? 'selected' : ''}" 
                            data-option-index="${optIndex}"
                            onclick="Test.selectAnswer('${stage.id}', '${q.id}', ${optIndex})">
                        ${option}
                    </button>
                `;
            });
            
            html += `
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
                
                <div class="test-footer">
                    <button class="test-btn secondary" onclick="Test.prevStage()" ${this.currentStage === 0 ? 'disabled' : ''}>
                        ◀️ Назад
                    </button>
                    <button class="test-btn primary" onclick="Test.nextStage()" id="nextStageBtn">
                        ${this.currentStage === this.stages.length - 1 ? '✅ Завершить' : '➡️ Далее'}
                    </button>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
        
        // Добавляем стили если их нет
        this.addTestStyles();
        
        // Прокрутка вверх
        container.scrollTop = 0;
    },
    
    // Выбор ответа
    selectAnswer(stageId, questionId, optionIndex) {
        const answerKey = `${stageId}_${questionId}`;
        this.answers[answerKey] = optionIndex;
        this.saveProgress();
        
        // Визуальное обновление
        const questionEl = document.querySelector(`[data-question-id="${questionId}"]`);
        if (questionEl) {
            const options = questionEl.querySelectorAll('.question-option');
            options.forEach((opt, idx) => {
                if (idx === optionIndex) {
                    opt.classList.add('selected');
                } else {
                    opt.classList.remove('selected');
                }
            });
        }
        
        // Проверяем все ли ответы на этапе
        this.checkStageComplete();
    },
    
    // Проверка завершенности этапа
    checkStageComplete() {
        const stage = this.stages[this.currentStage];
        const questions = this.questions[stage.id];
        
        let allAnswered = true;
        questions.forEach(q => {
            if (this.answers[`${stage.id}_${q.id}`] === undefined) {
                allAnswered = false;
            }
        });
        
        const nextBtn = document.getElementById('nextStageBtn');
        if (nextBtn) {
            if (allAnswered) {
                nextBtn.disabled = false;
                nextBtn.classList.add('enabled');
            } else {
                nextBtn.disabled = true;
                nextBtn.classList.remove('enabled');
            }
        }
    },
    
    // Следующий этап
    nextStage() {
        // Проверяем все ли ответы на текущем этапе
        const stage = this.stages[this.currentStage];
        const questions = this.questions[stage.id];
        
        let allAnswered = true;
        questions.forEach(q => {
            if (this.answers[`${stage.id}_${q.id}`] === undefined) {
                allAnswered = false;
            }
        });
        
        if (!allAnswered) {
            alert('⚠️ Пожалуйста, ответьте на все вопросы перед переходом');
            return;
        }
        
        if (this.currentStage < this.stages.length - 1) {
            this.currentStage++;
            this.saveProgress();
            this.showCurrentStage();
        } else {
            this.showResults();
        }
    },
    
    // Предыдущий этап
    prevStage() {
        if (this.currentStage > 0) {
            this.currentStage--;
            this.saveProgress();
            this.showCurrentStage();
        }
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
                
                <div class="results-radar">
                    <canvas id="radarChart" width="300" height="300"></canvas>
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
        
        // Рисуем график
        setTimeout(() => this.drawRadarChart(results), 100);
    },
    
    // Рисование графика
    drawRadarChart(results) {
        const canvas = document.getElementById('radarChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const centerX = 150;
        const centerY = 150;
        const radius = 120;
        
        // Очищаем canvas
        ctx.clearRect(0, 0, 300, 300);
        
        // Рисуем оси
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < 5; i++) {
            const angle = (i * 72 - 90) * Math.PI / 180;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.stroke();
        }
        
        // Рисуем окружности
        for (let r = 30; r <= radius; r += 30) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, r, 0, 2 * Math.PI);
            ctx.strokeStyle = 'rgba(255,255,255,0.1)';
            ctx.stroke();
        }
        
        // Рисуем профиль
        const values = [
            results.perception / 100,
            results.thinking / 100,
            results.behavior / 100,
            results.growth / 100,
            results.deep / 100
        ];
        
        ctx.beginPath();
        ctx.fillStyle = 'rgba(36, 139, 242, 0.3)';
        ctx.strokeStyle = '#248bf2';
        ctx.lineWidth = 2;
        
        for (let i = 0; i < 5; i++) {
            const angle = (i * 72 - 90) * Math.PI / 180;
            const r = radius * values[i];
            const x = centerX + r * Math.cos(angle);
            const y = centerY + r * Math.sin(angle);
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
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
            .test-container {
                display: flex;
                flex-direction: column;
                height: 100%;
                padding: 16px;
            }
            
            .test-header {
                margin-bottom: 24px;
            }
            
            .progress-bar {
                width: 100%;
                height: 6px;
                background: var(--glass-bg);
                border-radius: 3px;
                margin-bottom: 12px;
                overflow: hidden;
            }
            
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, var(--max-blue), #5a9eff);
                border-radius: 3px;
                transition: width 0.3s;
            }
            
            .progress-text {
                font-size: 16px;
                font-weight: 600;
                margin-bottom: 4px;
            }
            
            .stage-desc {
                font-size: 14px;
                color: var(--max-text-secondary);
            }
            
            .test-questions {
                flex: 1;
                overflow-y: auto;
                margin-bottom: 20px;
            }
            
            .test-question {
                margin-bottom: 24px;
                padding: 16px;
                background: var(--glass-bg);
                border: 1px solid var(--glass-border);
                border-radius: 16px;
            }
            
            .question-text {
                font-size: 16px;
                font-weight: 500;
                margin-bottom: 12px;
            }
            
            .question-options {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            
            .question-option {
                padding: 12px 16px;
                background: transparent;
                border: 1px solid var(--glass-border);
                border-radius: 30px;
                color: var(--max-text);
                font-size: 15px;
                text-align: left;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .question-option:hover {
                background: var(--max-hover);
                border-color: var(--max-blue);
            }
            
            .question-option.selected {
                background: var(--max-blue);
                border-color: var(--max-blue);
                color: white;
            }
            
            .test-footer {
                display: flex;
                gap: 12px;
                padding: 16px 0;
            }
            
            .test-btn {
                flex: 1;
                padding: 14px;
                border-radius: 30px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
                border: none;
            }
            
            .test-btn.primary {
                background: linear-gradient(135deg, var(--max-blue), #5a9eff);
                color: white;
            }
            
            .test-btn.primary:disabled {
                opacity: 0.3;
                cursor: not-allowed;
            }
            
            .test-btn.secondary {
                background: transparent;
                color: var(--max-text);
                border: 1px solid var(--glass-border);
            }
            
            .test-btn.secondary:disabled {
                opacity: 0.3;
                cursor: not-allowed;
            }
            
            .test-btn:hover:not(:disabled) {
                transform: scale(1.02);
            }
            
            .test-btn:active:not(:disabled) {
                transform: scale(0.98);
            }
            
            /* Стили для результатов */
            .results-container {
                padding: 20px;
                overflow-y: auto;
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
            
            .results-radar {
                display: flex;
                justify-content: center;
                margin: 20px 0;
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
        `;
        
        document.head.appendChild(style);
    },
    
    addResultsStyles() {
        this.addTestStyles(); // Используем те же стили
    }
};

// Делаем Test доступным глобально
window.Test = Test;
