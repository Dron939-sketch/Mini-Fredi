// ========== api.js ==========
// ПОЛНАЯ ВЕРСИЯ С РЕАЛЬНЫМИ ВЫЗОВАМИ API
// ВКЛЮЧАЕТ ВСЕ ЭНДПОИНТЫ ДЛЯ ТЕСТА И ИНТЕРПРЕТАЦИИ
// АДАПТИРОВАН ДЛЯ БЭКЕНДА НА RENDER

// URL вашего бэкенда на Render
const API_BASE = 'https://max-bot-1-ywpz.onrender.com';

// ============================================
// ОСНОВНОЙ API ОБЪЕКТ
// ============================================

const api = {
    /**
     * Получает статус пользователя (базовая версия)
     * @param {number|string} userId - ID пользователя
     * @returns {Promise<Object>} Статус пользователя
     */
    async getUserStatus(userId) {
        try {
            const response = await fetch(`${API_BASE}/api/user-data?user_id=${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            // Преобразуем ответ бэкенда в формат, ожидаемый фронтендом
            return {
                user_id: data.user_id,
                user_name: data.user_name || 'друг',
                context_complete: false,
                test_completed: data.has_profile || false,
                first_visit: !data.has_profile,
                profile_data: data.profile_data || null
            };
        } catch (error) {
            console.error('❌ Ошибка получения статуса пользователя:', error);
            return {
                user_id: userId,
                user_name: localStorage.getItem('userName') || 'друг',
                context_complete: false,
                test_completed: false,
                first_visit: true,
                profile_data: null
            };
        }
    },
    
    /**
     * Получает полный статус пользователя (расширенная версия)
     * @param {number|string} userId - ID пользователя
     * @returns {Promise<Object>} Полный статус пользователя
     */
    async getUserFullStatus(userId) {
        try {
            const response = await fetch(`${API_BASE}/api/user-status?user_id=${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('❌ Ошибка получения полного статуса:', error);
            return {
                success: false,
                has_profile: false,
                has_interpretation: false,
                test_completed: false,
                interpretation_ready: false,
                profile_code: null
            };
        }
    },
    
    /**
     * Получает погоду для города
     * @param {string} city - Название города
     * @returns {Promise<Object|null>} Данные о погоде
     */
    async getWeather(city) {
        try {
            // Бэкенд может предоставить погоду через отдельный эндпоинт
            // Пока возвращаем тестовые данные
            return {
                icon: '🌤',
                description: 'тестовый режим',
                temp: '+15',
                feels_like: '+13',
                humidity: 65,
                wind: 3
            };
        } catch (error) {
            console.error('❌ Ошибка получения погоды:', error);
            return null;
        }
    },
    
    /**
     * Сохраняет контекст пользователя (город, пол, возраст)
     * @param {number|string} userId - ID пользователя
     * @param {Object} contextData - Данные контекста
     * @returns {Promise<Object>} Результат сохранения
     */
    async saveContext(userId, contextData) {
        try {
            const response = await fetch(`${API_BASE}/api/save-context`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    context: contextData
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('❌ Ошибка сохранения контекста:', error);
            return { success: false, error: error.message };
        }
    },
    
    /**
     * Получает профиль пользователя
     * @param {number|string} userId - ID пользователя
     * @returns {Promise<Object|null>} Профиль пользователя
     */
    async getUserProfile(userId) {
        try {
            const response = await fetch(`${API_BASE}/api/get-profile?user_id=${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('❌ Ошибка получения профиля:', error);
            return null;
        }
    },
    
    /**
     * Сохраняет профиль пользователя
     * @param {number|string} userId - ID пользователя
     * @param {Object} profileData - Данные профиля
     * @returns {Promise<Object>} Результат сохранения
     */
    async saveUserProfile(userId, profileData) {
        try {
            const response = await fetch(`${API_BASE}/api/save-profile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    profile: profileData
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('❌ Ошибка сохранения профиля:', error);
            return { success: false, error: error.message };
        }
    },
    
    /**
     * Получает мысли психолога
     * @param {number|string} userId - ID пользователя
     * @returns {Promise<string|null>} Текст мыслей психолога
     */
    async getPsychologistThought(userId) {
        try {
            const response = await fetch(`${API_BASE}/api/thought?user_id=${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.thought;
        } catch (error) {
            console.error('❌ Ошибка получения мыслей:', error);
            return null;
        }
    },
    
    /**
     * Получает идеи на выходные
     * @param {number|string} userId - ID пользователя
     * @returns {Promise<Array>} Список идей
     */
    async getWeekendIdeas(userId) {
        try {
            const response = await fetch(`${API_BASE}/api/ideas?user_id=${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.ideas || [];
        } catch (error) {
            console.error('❌ Ошибка получения идей:', error);
            return [];
        }
    },
    
    /**
     * Получает прогресс теста
     * @param {number|string} userId - ID пользователя
     * @returns {Promise<Object>} Прогресс теста
     */
    async getTestProgress(userId) {
        try {
            const response = await fetch(`${API_BASE}/api/get-test-progress?user_id=${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('❌ Ошибка получения прогресса теста:', error);
            return {
                stage1_complete: false,
                stage2_complete: false,
                stage3_complete: false,
                stage4_complete: false,
                stage5_complete: false,
                answers_count: 0,
                current_stage: 1
            };
        }
    },
    
    /**
     * Сохраняет прогресс теста (поэтапно)
     * @param {number|string} userId - ID пользователя
     * @param {number} stage - Номер этапа
     * @param {Array} answers - Ответы на вопросы этапа
     * @returns {Promise<Object>} Результат сохранения
     */
    async saveTestProgress(userId, stage, answers) {
        try {
            const response = await fetch(`${API_BASE}/api/save-test-progress`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    stage: stage,
                    answers: answers
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('❌ Ошибка сохранения прогресса теста:', error);
            return { success: false, error: error.message };
        }
    },
    
    /**
     * Сохраняет полные результаты теста (после завершения всех этапов)
     * @param {number|string} userId - ID пользователя
     * @param {Object} results - Полные результаты теста
     * @returns {Promise<Object>} Результат сохранения
     */
    async saveTestResults(userId, results) {
        try {
            const response = await fetch(`${API_BASE}/api/save-test-results`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    results: results
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('❌ Ошибка сохранения результатов теста:', error);
            return { success: false, error: error.message };
        }
    },
    
    /**
     * Получает интерпретацию теста (опрашивает сервер)
     * @param {number|string} userId - ID пользователя
     * @returns {Promise<Object>} Интерпретация теста
     */
    async getTestInterpretation(userId) {
        try {
            const response = await fetch(`${API_BASE}/api/get-test-interpretation?user_id=${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('❌ Ошибка получения интерпретации:', error);
            return { success: false, ready: false, interpretation: null };
        }
    },
    
    /**
     * Сохраняет режим общения
     * @param {number|string} userId - ID пользователя
     * @param {string} mode - Режим (coach, psychologist, trainer)
     * @returns {Promise<Object>} Результат сохранения
     */
    async saveCommunicationMode(userId, mode) {
        try {
            const response = await fetch(`${API_BASE}/api/save-mode`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    mode: mode
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('❌ Ошибка сохранения режима:', error);
            return { success: false, error: error.message };
        }
    },
    
    /**
     * Синхронизирует все данные
     * @param {number|string} userId - ID пользователя
     * @param {Object} data - Данные для синхронизации
     * @returns {Promise<Object>} Результат синхронизации
     */
    async syncAllData(userId, data) {
        try {
            const response = await fetch(`${API_BASE}/api/sync`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    data: data
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('❌ Ошибка синхронизации:', error);
            return { success: false, error: error.message };
        }
    },
    
    /**
     * Получает вопрос теста
     * @param {number|string} userId - ID пользователя
     * @param {number} stage - Номер этапа
     * @param {number} index - Индекс вопроса
     * @returns {Promise<Object>} Вопрос теста
     */
    async getTestQuestion(userId, stage, index) {
        try {
            const response = await fetch(`${API_BASE}/api/test/question?user_id=${userId}&stage=${stage}&index=${index}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('❌ Ошибка получения вопроса:', error);
            return { success: false, error: error.message };
        }
    },
    
    /**
     * Отправляет ответ на вопрос теста
     * @param {number|string} userId - ID пользователя
     * @param {number} stage - Номер этапа
     * @param {number} questionIndex - Индекс вопроса
     * @param {string} answer - Текст ответа
     * @param {string} option - ID выбранного варианта
     * @returns {Promise<Object>} Результат отправки
     */
    async submitTestAnswer(userId, stage, questionIndex, answer, option) {
        try {
            const response = await fetch(`${API_BASE}/api/test/answer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    stage: stage,
                    question_index: questionIndex,
                    answer: answer,
                    option: option
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('❌ Ошибка отправки ответа:', error);
            return { success: false, error: error.message };
        }
    },
    
    /**
     * Получает результаты этапа теста
     * @param {number|string} userId - ID пользователя
     * @param {number} stage - Номер этапа
     * @returns {Promise<Object>} Результаты этапа
     */
    async getTestStageResults(userId, stage) {
        try {
            const response = await fetch(`${API_BASE}/api/test/results?user_id=${userId}&stage=${stage}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('❌ Ошибка получения результатов этапа:', error);
            return { success: false, error: error.message };
        }
    },
    
    /**
     * Отправляет вопрос в чат
     * @param {number|string} userId - ID пользователя
     * @param {string} question - Текст вопроса
     * @param {string} mode - Режим общения (опционально)
     * @returns {Promise<Object>} Ответ от бота
     */
    async sendQuestion(userId, question, mode = null) {
        try {
            const response = await fetch(`${API_BASE}/api/chat/message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    message: question,
                    mode: mode
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            return {
                success: data.success,
                response: data.response || 'Я вас слушаю. Расскажите подробнее.',
                mode: data.mode,
                analysis: data.analysis,
                buttons: data.buttons
            };
        } catch (error) {
            console.error('❌ Ошибка отправки вопроса:', error);
            return {
                success: false,
                response: 'Извините, произошла ошибка. Попробуйте позже.',
                error: error.message
            };
        }
    },
    
    /**
     * Выполняет действие в чате (тест, профиль, идеи и т.д.)
     * @param {number|string} userId - ID пользователя
     * @param {string} action - Действие
     * @param {Object} data - Дополнительные данные
     * @returns {Promise<Object>} Результат выполнения
     */
    async performAction(userId, action, data = {}) {
        try {
            const response = await fetch(`${API_BASE}/api/chat/action`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    action: action,
                    data: data
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('❌ Ошибка выполнения действия:', error);
            return { success: false, error: error.message };
        }
    },
    
    /**
     * Получает цели для пользователя
     * @param {number|string} userId - ID пользователя
     * @param {string} mode - Режим (coach, psychologist, trainer)
     * @returns {Promise<Array>} Список целей
     */
    async getGoals(userId, mode = 'coach') {
        try {
            const response = await fetch(`${API_BASE}/api/goals?user_id=${userId}&mode=${mode}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.goals || [];
        } catch (error) {
            console.error('❌ Ошибка получения целей:', error);
            // Возвращаем тестовые цели
            return [
                { id: 'fear_work', name: 'Проработать страхи', time: '3-4 недели', difficulty: 'medium', emoji: '🛡️' },
                { id: 'money_blocks', name: 'Проработать денежные блоки', time: '3-4 недели', difficulty: 'medium', emoji: '💰' },
                { id: 'meaning', name: 'Найти смысл и предназначение', time: '4-6 недель', difficulty: 'hard', emoji: '🎯' }
            ];
        }
    },
    
    /**
     * Получает список доступных режимов
     * @returns {Promise<Array>} Список режимов
     */
    async getAvailableModes() {
        try {
            const response = await fetch(`${API_BASE}/api/modes`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.modes || [];
        } catch (error) {
            console.error('❌ Ошибка получения режимов:', error);
            return [
                { id: 'coach', name: 'КОУЧ', emoji: '🔮', description: 'Задавать открытые вопросы, отражать мысли, направлять.' },
                { id: 'psychologist', name: 'ПСИХОЛОГ', emoji: '🧠', description: 'Исследовать глубинные паттерны, защитные механизмы.' },
                { id: 'trainer', name: 'ТРЕНЕР', emoji: '⚡', description: 'Формировать поведенческие навыки, давать инструменты.' }
            ];
        }
    },
    
    /**
     * Проверяет работу базы данных
     * @returns {Promise<Object>} Статус базы данных
     */
    async checkDatabase() {
        try {
            const response = await fetch(`${API_BASE}/api/check-db`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('❌ Ошибка проверки БД:', error);
            return { status: 'error', message: error.message };
        }
    },
    
    /**
     * Получает логи пользователя (только для админов)
     * @param {number|string} userId - ID пользователя
     * @returns {Promise<Object>} Логи пользователя
     */
    async getUserLogs(userId) {
        try {
            const response = await fetch(`${API_BASE}/api/logs/${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('❌ Ошибка получения логов:', error);
            return { error: error.message };
        }
    },
    
    /**
     * Получает историю чата
     * @param {number|string} userId - ID пользователя
     * @param {number} limit - Количество сообщений
     * @returns {Promise<Object>} История чата
     */
    async getChatHistory(userId, limit = 50) {
        try {
            const response = await fetch(`${API_BASE}/api/chat/history?user_id=${userId}&limit=${limit}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('❌ Ошибка получения истории:', error);
            return { success: false, history: [], error: error.message };
        }
    },
    
    /**
     * Проверяет соединение с бэкендом
     * @returns {Promise<boolean>} Доступность бэкенда
     */
    async healthCheck() {
        try {
            const response = await fetch(`${API_BASE}/health`);
            return response.ok;
        } catch (error) {
            console.error('❌ Health check failed:', error);
            return false;
        }
    }
};

// ============================================
// ЭКСПОРТ API
// ============================================

// Делаем API доступным глобально
window.api = api;

// Для отладки
console.log('✅ API инициализирован, базовый URL:', API_BASE);
console.log('✅ Доступные методы:', Object.keys(api));

// Проверяем соединение при загрузке
api.healthCheck().then(isAvailable => {
    if (isAvailable) {
        console.log('✅ Соединение с бэкендом установлено');
    } else {
        console.warn('⚠️ Бэкенд недоступен, работаем в офлайн-режиме');
    }
});

// ============================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ РАБОТЫ С API
// ============================================

/**
 * Сохраняет имя пользователя в localStorage и на сервер
 * @param {number|string} userId - ID пользователя
 * @param {string} name - Имя пользователя
 * @returns {Promise<boolean>} Успех сохранения
 */
async function saveUserName(userId, name) {
    if (!name || name.trim() === '') return false;
    
    const trimmedName = name.trim();
    localStorage.setItem('userName', trimmedName);
    
    // Сохраняем в контекст
    const context = App?.userContext || {};
    context.name = trimmedName;
    
    try {
        await api.saveContext(userId, { name: trimmedName });
        return true;
    } catch (error) {
        console.warn('⚠️ Не удалось сохранить имя на сервере:', error);
        return true; // Всё равно считаем успехом, так как в localStorage сохранили
    }
}

/**
 * Загружает сохраненное имя пользователя
 * @returns {string|null} Имя пользователя
 */
function loadUserName() {
    return localStorage.getItem('userName');
}

// Экспортируем вспомогательные функции
window.saveUserName = saveUserName;
window.loadUserName = loadUserName;
