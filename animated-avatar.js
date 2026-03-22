// ============================================
// АНИМИРОВАННЫЙ АВАТАР
// Версия 1.0 - Canvas-анимация с эмоциями
// ============================================

class AnimatedAvatar {
    constructor(userId, userName, profileData = null) {
        this.userId = userId;
        this.userName = userName || 'Друг';
        this.profileData = profileData;
        
        // Canvas элементы
        this.canvas = null;
        this.ctx = null;
        this.width = 80;
        this.height = 80;
        
        // Состояние аватара
        this.currentMood = 'neutral'; // neutral, happy, sad, thoughtful, energetic, calm
        this.currentExpression = 'neutral';
        this.isAnimating = false;
        this.animationFrame = null;
        this.blinkTimer = null;
        
        // Параметры анимации
        this.eyeSize = 12;
        this.pupilSize = 4;
        this.eyeOffsetX = 20;
        this.eyeOffsetY = 28;
        this.mouthCurve = 0;
        this.eyebrowAngle = 0;
        this.blinkProgress = 0;
        
        // Частицы
        this.particles = [];
        this.particleCount = 20;
        
        // Эффекты
        this.glowIntensity = 0;
        this.pulseProgress = 0;
        
        // Цвета (основаны на профиле)
        this.primaryColor = '#248bf2';
        this.secondaryColor = '#6c5ce7';
        this.accentColor = '#00bcd4';
        
        // Время
        this.lastUpdate = 0;
        this.time = 0;
        
        this.init();
    }
    
    // ============================================
    // ИНИЦИАЛИЗАЦИЯ
    // ============================================
    
    async init() {
        console.log('🎨 Инициализация анимированного аватара...');
        
        // Определяем цвета на основе профиля
        if (this.profileData) {
            this._updateColorsFromProfile();
        }
        
        // Создаём canvas
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.className = 'animated-avatar';
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;
        this.canvas.style.borderRadius = '50%';
        this.canvas.style.cursor = 'pointer';
        
        this.ctx = this.canvas.getContext('2d');
        
        // Запускаем анимацию
        this.startAnimation();
        
        // Запускаем моргание
        this.startBlinking();
        
        // Добавляем обработчик клика
        this.canvas.addEventListener('click', () => this.onClick());
        
        console.log('✅ Анимированный аватар создан');
        return this.canvas;
    }
    
    // ============================================
    // ЦВЕТА НА ОСНОВЕ ПРОФИЛЯ
    // ============================================
    
    _updateColorsFromProfile() {
        // Получаем доминирующий вектор
        const scores = this.profileData.profile_data || {};
        const sb = scores.sb_level || 4;
        const tf = scores.tf_level || 4;
        const ub = scores.ub_level || 4;
        const chv = scores.chv_level || 4;
        
        // Определяем доминирующий вектор
        const vectors = [
            { name: 'sb', value: sb, color: '#4CAF50', accent: '#8BC34A' },
            { name: 'tf', value: tf, color: '#FFC107', accent: '#FFD54F' },
            { name: 'ub', value: ub, color: '#2196F3', accent: '#64B5F6' },
            { name: 'chv', value: chv, color: '#E91E63', accent: '#F06292' }
        ];
        
        const dominant = vectors.reduce((a, b) => a.value > b.value ? a : b);
        
        this.primaryColor = dominant.color;
        this.secondaryColor = dominant.accent;
        
        // Чем выше уровень, тем ярче
        const intensity = Math.min(1, Math.max(0.5, dominant.value / 6));
        this.glowIntensity = intensity * 0.5;
    }
    
    // ============================================
    // УПРАВЛЕНИЕ АНИМАЦИЕЙ
    // ============================================
    
    startAnimation() {
        const animate = (timestamp) => {
            this.time = timestamp / 1000;
            this.update();
            this.draw();
            this.animationFrame = requestAnimationFrame(animate);
        };
        
        this.animationFrame = requestAnimationFrame(animate);
    }
    
    startBlinking() {
        this.blinkTimer = setInterval(() => {
            this.blinkProgress = 1;
            setTimeout(() => { this.blinkProgress = 0; }, 150);
        }, 3000);
    }
    
    stopAnimation() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
        if (this.blinkTimer) {
            clearInterval(this.blinkTimer);
            this.blinkTimer = null;
        }
    }
    
    // ============================================
    // СМЕНА ЭМОЦИОНАЛЬНОГО СОСТОЯНИЯ
    // ============================================
    
    setMood(mood) {
        const validMoods = ['neutral', 'happy', 'sad', 'thoughtful', 'energetic', 'calm'];
        if (validMoods.includes(mood)) {
            this.currentMood = mood;
            this._updateExpressionForMood();
            this._createParticlesForMood();
            console.log(`😊 Аватар сменил настроение на: ${mood}`);
        }
    }
    
    _updateExpressionForMood() {
        switch(this.currentMood) {
            case 'happy':
                this.mouthCurve = 15;
                this.eyebrowAngle = 5;
                this.pupilSize = 5;
                break;
            case 'sad':
                this.mouthCurve = -10;
                this.eyebrowAngle = -8;
                this.pupilSize = 3;
                break;
            case 'thoughtful':
                this.mouthCurve = 0;
                this.eyebrowAngle = -3;
                this.pupilSize = 4;
                this.eyeOffsetX = 22;
                break;
            case 'energetic':
                this.mouthCurve = 12;
                this.eyebrowAngle = 8;
                this.pupilSize = 6;
                this.eyeSize = 14;
                break;
            case 'calm':
                this.mouthCurve = 3;
                this.eyebrowAngle = 0;
                this.pupilSize = 4;
                this.eyeSize = 12;
                break;
            default:
                this.mouthCurve = 0;
                this.eyebrowAngle = 0;
                this.pupilSize = 4;
                this.eyeSize = 12;
                this.eyeOffsetX = 20;
        }
    }
    
    // ============================================
    // ЧАСТИЦЫ
    // ============================================
    
    _createParticlesForMood() {
        this.particles = [];
        const colors = {
            happy: ['#FFD700', '#FFA500', '#FF6B6B'],
            sad: ['#4A90E2', '#7B68EE', '#9370DB'],
            thoughtful: ['#00CED1', '#20B2AA', '#3CB371'],
            energetic: ['#FF4500', '#FF6347', '#FF8C00'],
            calm: ['#87CEEB', '#98FB98', '#ADD8E6'],
            neutral: ['#248bf2', '#6c5ce7', '#00bcd4']
        };
        
        const moodColors = colors[this.currentMood] || colors.neutral;
        
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5 - 0.5,
                size: 2 + Math.random() * 3,
                color: moodColors[Math.floor(Math.random() * moodColors.length)],
                life: 0.5 + Math.random() * 0.5,
                opacity: 0.3 + Math.random() * 0.3
            });
        }
    }
    
    updateParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.01;
            p.opacity = Math.max(0, p.opacity - 0.005);
            
            if (p.life <= 0 || p.y < -20 || p.x > this.width + 20 || p.x < -20) {
                // Возрождаем частицу
                this.particles[i] = {
                    x: Math.random() * this.width,
                    y: this.height + 5,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: -0.5 - Math.random() * 0.5,
                    size: 2 + Math.random() * 3,
                    color: p.color,
                    life: 0.8,
                    opacity: 0.4
                };
            }
        }
    }
    
    // ============================================
    // ОТРИСОВКА
    // ============================================
    
    update() {
        // Пульсация
        this.pulseProgress = (Math.sin(this.time * 4) + 1) / 2;
        
        // Анимация частиц
        this.updateParticles();
        
        // Анимация зрачков (слежение за мышью)
        if (this.mouseX && this.mouseY) {
            const dx = (this.mouseX - this.width/2) / this.width;
            const dy = (this.mouseY - this.height/2) / this.height;
            this.pupilOffsetX = Math.min(3, Math.max(-3, dx * 5));
            this.pupilOffsetY = Math.min(3, Math.max(-3, dy * 5));
        } else {
            this.pupilOffsetX = 0;
            this.pupilOffsetY = 0;
        }
        
        // Анимация моргания
        if (this.blinkProgress > 0) {
            this.blinkProgress = Math.max(0, this.blinkProgress - 0.05);
        }
    }
    
    draw() {
        if (!this.ctx) return;
        
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height);
        
        // Сохраняем состояние
        ctx.save();
        
        // Рисуем свечение
        this._drawGlow();
        
        // Рисуем частицы
        this._drawParticles();
        
        // Рисуем фон
        this._drawBackground();
        
        // Рисуем лицо
        this._drawFace();
        
        ctx.restore();
    }
    
    _drawGlow() {
        const ctx = this.ctx;
        const glowSize = this.width + this.glowIntensity * 20;
        
        ctx.save();
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.primaryColor;
        ctx.beginPath();
        ctx.arc(this.width/2, this.height/2, glowSize/2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${parseInt(this.primaryColor.slice(1,3), 16)}, ${parseInt(this.primaryColor.slice(3,5), 16)}, ${parseInt(this.primaryColor.slice(5,7), 16)}, 0.2)`;
        ctx.fill();
        ctx.restore();
    }
    
    _drawParticles() {
        const ctx = this.ctx;
        for (const p of this.particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.opacity * (0.5 + this.pulseProgress * 0.5);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    }
    
    _drawBackground() {
        const ctx = this.ctx;
        const gradient = ctx.createLinearGradient(0, 0, this.width, this.height);
        gradient.addColorStop(0, this.primaryColor);
        gradient.addColorStop(1, this.secondaryColor);
        
        ctx.beginPath();
        ctx.arc(this.width/2, this.height/2, this.width/2 - 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Внутренний градиент для объёма
        ctx.beginPath();
        ctx.arc(this.width/2, this.height/2, this.width/2 - 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, 0.1)`;
        ctx.fill();
    }
    
    _drawFace() {
        const ctx = this.ctx;
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        
        // Глаза
        this._drawEyes(centerX, centerY);
        
        // Брови
        this._drawEyebrows(centerX, centerY);
        
        // Рот
        this._drawMouth(centerX, centerY);
        
        // Щёки (румянец)
        if (this.currentMood === 'happy' || this.currentMood === 'energetic') {
            this._drawBlush(centerX, centerY);
        }
    }
    
    _drawEyes(centerX, centerY) {
        const ctx = this.ctx;
        const eyeY = centerY - 5;
        const eyeXLeft = centerX - this.eyeOffsetX;
        const eyeXRight = centerX + this.eyeOffsetX;
        
        // Левое око
        this._drawEye(ctx, eyeXLeft, eyeY);
        // Правое око
        this._drawEye(ctx, eyeXRight, eyeY);
    }
    
    _drawEye(ctx, x, y) {
        // Белок
        ctx.beginPath();
        ctx.ellipse(x, y, this.eyeSize, this.eyeSize * (1 - this.blinkProgress * 0.8), 0, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        
        // Зрачок
        ctx.beginPath();
        ctx.arc(x + (this.pupilOffsetX || 0), y + (this.pupilOffsetY || 0), this.pupilSize, 0, Math.PI * 2);
        ctx.fillStyle = '#2c3e50';
        ctx.fill();
        
        // Блик
        ctx.beginPath();
        ctx.arc(x - 2 + (this.pupilOffsetX || 0), y - 2 + (this.pupilOffsetY || 0), this.pupilSize * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
    }
    
    _drawEyebrows(centerX, centerY) {
        const ctx = this.ctx;
        const browY = centerY - 15;
        const browXLeft = centerX - this.eyeOffsetX - 5;
        const browXRight = centerX + this.eyeOffsetX + 5;
        
        ctx.beginPath();
        ctx.moveTo(browXLeft - 5, browY - this.eyebrowAngle);
        ctx.quadraticCurveTo(browXLeft, browY - this.eyebrowAngle * 0.8, browXLeft + 8, browY);
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#2c3e50';
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(browXRight + 5, browY - this.eyebrowAngle);
        ctx.quadraticCurveTo(browXRight, browY - this.eyebrowAngle * 0.8, browXRight - 8, browY);
        ctx.stroke();
    }
    
    _drawMouth(centerX, centerY) {
        const ctx = this.ctx;
        const mouthY = centerY + 12;
        const mouthWidth = 25;
        
        ctx.beginPath();
        
        if (this.mouthCurve >= 0) {
            // Улыбка
            ctx.arc(centerX, mouthY, mouthWidth, 0.1, Math.PI - 0.1, false);
        } else {
            // Грусть
            ctx.arc(centerX, mouthY + 5, mouthWidth, Math.PI + 0.1, Math.PI * 2 - 0.1, true);
        }
        
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#2c3e50';
        ctx.stroke();
    }
    
    _drawBlush(centerX, centerY) {
        const ctx = this.ctx;
        const blushX = centerX - 25;
        const blushY = centerY + 5;
        
        ctx.beginPath();
        ctx.ellipse(blushX, blushY, 8, 4, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 120, 120, 0.3)';
        ctx.fill();
        
        ctx.beginPath();
        ctx.ellipse(centerX + 25, blushY, 8, 4, 0, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // ============================================
    // ВЗАИМОДЕЙСТВИЕ
    // ============================================
    
    onClick() {
        console.log('🖱️ Аватар нажат');
        
        // Временная анимация
        this.glowIntensity = 0.8;
        setTimeout(() => {
            this.glowIntensity = 0.5;
        }, 300);
        
        // Случайная реакция
        const reactions = ['happy', 'energetic', 'thoughtful'];
        const randomMood = reactions[Math.floor(Math.random() * reactions.length)];
        this.setMood(randomMood);
        
        setTimeout(() => {
            this.setMood('neutral');
        }, 2000);
        
        // Вызываем событие для внешней обработки
        if (this.onAvatarClick) {
            this.onAvatarClick();
        }
    }
    
    onMouseMove(x, y) {
        const rect = this.canvas.getBoundingClientRect();
        const relativeX = x - rect.left;
        const relativeY = y - rect.top;
        
        this.mouseX = relativeX;
        this.mouseY = relativeY;
    }
    
    // ============================================
    // ИНТЕГРАЦИЯ С ПРОФИЛЕМ
    // ============================================
    
    async updateFromProfile() {
        try {
            const response = await fetch(`/api/get-profile?user_id=${this.userId}`);
            const data = await response.json();
            
            if (data && data.profile_data) {
                this.profileData = data;
                this._updateColorsFromProfile();
                this._createParticlesForMood();
            }
        } catch (error) {
            console.error('Ошибка обновления профиля для аватара:', error);
        }
    }
    
    // ============================================
    // УТИЛИТЫ
    // ============================================
    
    setSize(width, height) {
        this.width = width;
        this.height = height;
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;
    }
    
    destroy() {
        this.stopAnimation();
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        console.log('🗑️ Анимированный аватар уничтожен');
    }
}

// Глобальный экспорт
window.AnimatedAvatar = AnimatedAvatar;

console.log('✅ Модуль анимированного аватара загружен');
