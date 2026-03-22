// ============================================
// ПСИХОМЕТРИЧЕСКИЕ ДВОЙНИКИ
// Поиск людей с похожим психологическим профилем
// Версия 1.0
// ============================================

class PsychometricDoubles {
    constructor(userId, userProfile) {
        this.userId = userId;
        this.userProfile = userProfile;
        this.doubles = [];
        this.currentDouble = null;
        this.isLoading = false;
    }
    
    async init() {
        console.log('🔍 Инициализация поиска психометрических двойников...');
        await this.findDoubles();
        return this;
    }
    
    // ============================================
    // ПОИСК ДВОЙНИКОВ
    // ============================================
    
    async findDoubles(limit = 10, filters = {}) {
        if (this.isLoading) return;
        this.isLoading = true;
        
        try {
            const params = new URLSearchParams({
                user_id: this.userId,
                limit: limit,
                ...filters
            });
            
            const response = await fetch(`/api/psychometric/find-doubles?${params}`);
            const data = await response.json();
            
            if (data.success) {
                this.doubles = data.doubles;
                console.log(`✅ Найдено ${this.doubles.length} психометрических двойников`);
                return this.doubles;
            } else {
                console.warn('⚠️ Не удалось найти двойников:', data.error);
                return [];
            }
        } catch (error) {
            console.error('❌ Ошибка поиска двойников:', error);
            return [];
        } finally {
            this.isLoading = false;
        }
    }
    
    // ============================================
    // ПОЛУЧИТЬ СЛУЧАЙНОГО ДВОЙНИКА
    // ============================================
    
    getRandomDouble() {
        if (this.doubles.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * this.doubles.length);
        this.currentDouble = this.doubles[randomIndex];
        return this.currentDouble;
    }
    
    // ============================================
    // ПОЛУЧИТЬ ДВОЙНИКА ПО ID
    // ============================================
    
    async getDoubleById(doubleId) {
        try {
            const response = await fetch(`/api/psychometric/double/${doubleId}?user_id=${this.userId}`);
            const data = await response.json();
            if (data.success) {
                this.currentDouble = data.double;
                return this.currentDouble;
            }
            return null;
        } catch (error) {
            console.error('Ошибка получения двойника:', error);
            return null;
        }
    }
    
    // ============================================
    // РАССЧИТАТЬ СОВМЕСТИМОСТЬ
    // ============================================
    
    calculateCompatibility(profile1, profile2) {
        const vectors = ['sb', 'tf', 'ub', 'chv'];
        let totalDifference = 0;
        
        for (const v of vectors) {
            const val1 = profile1[v] || 4;
            const val2 = profile2[v] || 4;
            totalDifference += Math.abs(val1 - val2);
        }
        
        // Максимальная разница 4 вектора * 5 = 20
        const compatibility = Math.max(0, Math.min(100, 100 - (totalDifference * 5)));
        
        let description = '';
        let emoji = '';
        
        if (compatibility >= 85) {
            emoji = '🌟';
            description = 'Потрясающая совместимость! Вы практически одно целое.';
        } else if (compatibility >= 70) {
            emoji = '💫';
            description = 'Отличная совместимость. Ваши профили очень похожи.';
        } else if (compatibility >= 55) {
            emoji = '✨';
            description = 'Хорошая совместимость. Много общего, но есть и различия.';
        } else if (compatibility >= 40) {
            emoji = '🌊';
            description = 'Средняя совместимость. Вы можете дополнять друг друга.';
        } else {
            emoji = '⚡';
            description = 'Низкая совместимость. Вы очень разные, но это может быть интересно.';
        }
        
        return {
            score: Math.round(compatibility),
            emoji: emoji,
            description: description,
            details: {
                sb: this._getCompatibilityDetail(profile1.sb, profile2.sb, 'реакция на давление'),
                tf: this._getCompatibilityDetail(profile1.tf, profile2.tf, 'отношение к деньгам'),
                ub: this._getCompatibilityDetail(profile1.ub, profile2.ub, 'понимание мира'),
                chv: this._getCompatibilityDetail(profile1.chv, profile2.chv, 'отношения с людьми')
            }
        };
    }
    
    _getCompatibilityDetail(val1, val2, name) {
        const diff = Math.abs(val1 - val2);
        if (diff === 0) return `✅ Идеальное совпадение по ${name}`;
        if (diff === 1) return `🟢 Близки по ${name} (разница ${diff})`;
        if (diff === 2) return `🟡 Различаетесь по ${name} (разница ${diff})`;
        return `🔴 Сильно различаетесь по ${name} (разница ${diff})`;
    }
    
    // ============================================
    // ОТПРАВИТЬ СООБЩЕНИЕ ДВОЙНИКУ
    // ============================================
    
    async sendMessage(doubleId, message) {
        try {
            const response = await fetch('/api/psychometric/send-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: this.userId,
                    double_id: doubleId,
                    message: message
                })
            });
            
            const data = await response.json();
            return data.success;
        } catch (error) {
            console.error('Ошибка отправки сообщения:', error);
            return false;
        }
    }
    
    // ============================================
    // ПОЛУЧИТЬ ДИАЛОГ С ДВОЙНИКОМ
    // ============================================
    
    async getMessages(doubleId, limit = 50) {
        try {
            const response = await fetch(`/api/psychometric/messages?user_id=${this.userId}&double_id=${doubleId}&limit=${limit}`);
            const data = await response.json();
            if (data.success) {
                return data.messages;
            }
            return [];
        } catch (error) {
            console.error('Ошибка получения сообщений:', error);
            return [];
        }
    }
    
    // ============================================
    // ОТМЕТИТЬ ПРОСМОТР
    // ============================================
    
    async markAsViewed(doubleId) {
        try {
            await fetch('/api/psychometric/mark-viewed', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: this.userId,
                    double_id: doubleId
                })
            });
        } catch (error) {
            console.error('Ошибка отметки просмотра:', error);
        }
    }
    
    // ============================================
    // ПОЛУЧИТЬ СТАТИСТИКУ ДВОЙНИКОВ
    // ============================================
    
    async getStats() {
        try {
            const response = await fetch(`/api/psychometric/stats?user_id=${this.userId}`);
            const data = await response.json();
            if (data.success) {
                return data.stats;
            }
            return null;
        } catch (error) {
            console.error('Ошибка получения статистики:', error);
            return null;
        }
    }
    
    // ============================================
    // ОТРИСОВКА КАРТОЧКИ ДВОЙНИКА
    // ============================================
    
    renderDoubleCard(double, compatibility = null) {
        if (!compatibility) {
            compatibility = this.calculateCompatibility(this.userProfile, double.profile);
        }
        
        const avatarUrl = double.avatar_url || `https://ui-avatars.com/api/?name=${double.first_name.charAt(0)}&background=248bf2&color=fff&size=128`;
        
        return `
            <div class="double-card" data-double-id="${double.id}">
                <div class="double-avatar">
                    <img src="${avatarUrl}" alt="${double.first_name}">
                    <div class="double-compatibility-badge" style="background: ${this._getCompatibilityColor(compatibility.score)}">
                        ${compatibility.emoji} ${compatibility.score}%
                    </div>
                </div>
                <div class="double-info">
                    <div class="double-name">${double.first_name} ${double.last_name || ''}</div>
                    <div class="double-details">
                        <span class="double-age">${double.age || '?'} лет</span>
                        <span class="double-gender">${double.gender === 'male' ? '👨' : '👩'}</span>
                        <span class="double-city">${double.city || '?'}</span>
                    </div>
                    <div class="double-profile">
                        <span class="profile-badge">${double.profile_code || 'СБ-4_ТФ-4_УБ-4_ЧВ-4'}</span>
                    </div>
                    <div class="double-compatibility-desc">${compatibility.description}</div>
                </div>
                <div class="double-actions">
                    <button class="double-message-btn" data-double-id="${double.id}">
                        💬 Написать
                    </button>
                    <button class="double-details-btn" data-double-id="${double.id}">
                        👤 Подробнее
                    </button>
                </div>
            </div>
        `;
    }
    
    _getCompatibilityColor(score) {
        if (score >= 80) return '#4caf50';
        if (score >= 60) return '#8bc34a';
        if (score >= 40) return '#ffc107';
        if (score >= 20) return '#ff9800';
        return '#f44336';
    }
    
    // ============================================
    // ОТРИСОВКА МОДАЛЬНОГО ОКНА ЧАТА
    // ============================================
    
    renderChatModal(double) {
        return `
            <div class="modal-overlay" id="psychometricChatModal">
                <div class="modal-content chat-modal">
                    <div class="modal-header">
                        <div class="modal-header-info">
                            <div class="chat-avatar-small">
                                <img src="https://ui-avatars.com/api/?name=${double.first_name.charAt(0)}&background=248bf2&color=fff&size=64" alt="${double.first_name}">
                            </div>
                            <div class="chat-header-info">
                                <div class="chat-name">${double.first_name} ${double.last_name || ''}</div>
                                <div class="chat-status">Психометрический двойник</div>
                            </div>
                        </div>
                        <button class="modal-close" id="closeChatModal">✕</button>
                    </div>
                    <div class="modal-body chat-messages" id="chatMessages">
                        <div class="messages-list" id="messagesList">
                            <div class="message system-message">
                                🤝 Вы совместимы на ${double.compatibility.score}%
                            </div>
                            <div class="message system-message">
                                💬 Напишите первое сообщение, чтобы начать общение
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="chat-input-area">
                            <input type="text" class="chat-input" id="chatMessageInput" placeholder="Напишите сообщение...">
                            <button class="chat-send-btn" id="sendChatMessage">➡️</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // ============================================
    // ПОЛУЧИТЬ ВСЕХ ДВОЙНИКОВ
    // ============================================
    
    getAllDoubles() {
        return this.doubles;
    }
    
    // ============================================
    // ОЧИСТИТЬ КЭШ
    // ============================================
    
    clearCache() {
        this.doubles = [];
        this.currentDouble = null;
        console.log('🧹 Кэш психометрических двойников очищен');
    }
}

// Глобальный экземпляр
window.PsychometricDoubles = PsychometricDoubles;

console.log('✅ Психометрические двойники загружены');
