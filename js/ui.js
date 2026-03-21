// ui.js - UI компоненты (модалки, тосты, стили)
const UI = {
    showLoading(message = 'Загрузка...') {
        let overlay = document.getElementById('loadingOverlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'loadingOverlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.7);
                backdrop-filter: blur(5px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
            `;
            overlay.innerHTML = `
                <div style="background: var(--max-panel-bg); padding: 24px; border-radius: 30px; text-align: center;">
                    <div style="font-size: 48px; margin-bottom: 12px;">🧠</div>
                    <div style="color: var(--max-text);">${message}</div>
                </div>
            `;
            document.body.appendChild(overlay);
        } else {
            const textDiv = overlay.querySelector('div div:last-child');
            if (textDiv) textDiv.textContent = message;
            overlay.style.display = 'flex';
        }
    },
    
    hideLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) overlay.style.display = 'none';
    },
    
    showToast(message, type = 'info', duration = 3000) {
        let toast = document.getElementById('globalToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'globalToast';
            toast.style.cssText = `
                position: fixed;
                bottom: 80px;
                left: 50%;
                transform: translateX(-50%);
                background: var(--max-blue);
                color: white;
                padding: 12px 24px;
                border-radius: 30px;
                font-size: 14px;
                z-index: 2000;
                opacity: 0;
                transition: opacity 0.3s;
                pointer-events: none;
                white-space: nowrap;
            `;
            document.body.appendChild(toast);
        }
        
        const colors = { info: '#248bf2', success: '#4caf50', warning: '#ff9800', error: '#f44336' };
        toast.style.background = colors[type] || colors.info;
        toast.textContent = message;
        toast.style.opacity = '1';
        
        setTimeout(() => {
            toast.style.opacity = '0';
        }, duration);
    },
    
    addModalStyles() {
        if (document.getElementById('modalStyles')) return;
        const style = document.createElement('style');
        style.id = 'modalStyles';
        style.textContent = `
            .modal {
                display: flex;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(5px);
                align-items: center;
                justify-content: center;
                z-index: 1000;
                animation: modalFadeIn 0.3s ease;
            }
            @keyframes modalFadeIn {
                from { opacity: 0; transform: scale(0.9); }
                to { opacity: 1; transform: scale(1); }
            }
            .modal-content {
                width: 90%;
                max-width: 320px;
                padding: 24px;
                border-radius: 30px;
                text-align: center;
                background: var(--max-panel-bg);
                border: 1px solid var(--glass-border);
            }
            .modal-title { font-size: 24px; margin-bottom: 8px; color: var(--max-text); }
            .modal-subtitle { color: var(--max-text-secondary); margin-bottom: 20px; font-size: 14px; }
            .input-group { display: flex; gap: 8px; margin-bottom: 12px; }
            .modal-input {
                flex: 1;
                padding: 12px 16px;
                background: var(--glass-bg);
                border: 1px solid var(--glass-border);
                border-radius: 30px;
                color: var(--max-text);
                font-size: 16px;
                outline: none;
            }
            .modal-input:focus { border-color: var(--max-blue); }
            .modal-btn {
                width: 100%;
                padding: 12px;
                border-radius: 30px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                border: none;
                margin-bottom: 8px;
            }
            .modal-btn.primary { background: var(--max-blue); color: white; }
            .modal-btn.secondary { background: transparent; color: var(--max-text); border: 1px solid var(--glass-border); }
            .modal-btn:hover { transform: scale(1.02); }
        `;
        document.head.appendChild(style);
    },
    
    showNameModal(onSave) {
        this.addModalStyles();
        
        const oldModal = document.getElementById('nameModal');
        if (oldModal) oldModal.remove();
        
        const savedName = localStorage.getItem('userName') || Auth?.userName || 'Гость';
        const modal = document.createElement('div');
        modal.id = 'nameModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content glass-panel">
                <h2 class="modal-title">👋 Как вас зовут?</h2>
                <p class="modal-subtitle">Введите ваше имя для персонализации</p>
                <div class="input-group">
                    <input type="text" id="userNameInput" class="modal-input" 
                           placeholder="Ваше имя" maxlength="30" value="${savedName !== 'Гость' ? savedName : ''}">
                    <button id="saveNameBtn" class="modal-btn primary">Сохранить</button>
                </div>
                <button id="closeNameModalBtn" class="modal-btn secondary">Позже</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const input = document.getElementById('userNameInput');
        const saveBtn = document.getElementById('saveNameBtn');
        const closeBtn = document.getElementById('closeNameModalBtn');
        
        const handleSave = () => {
            const name = input?.value.trim();
            if (name) {
                if (onSave) onSave(name);
                modal.remove();
            } else {
                this.showToast('Пожалуйста, введите имя', 'warning');
            }
        };
        
        if (saveBtn) saveBtn.addEventListener('click', handleSave);
        if (closeBtn) closeBtn.addEventListener('click', () => modal.remove());
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') handleSave();
            });
            setTimeout(() => input.focus(), 100);
        }
    },
    
    updateUserNameInUI(userName) {
        const userNameEl = document.getElementById('userName');
        if (userNameEl) userNameEl.textContent = userName;
        
        const userStatus = document.getElementById('userStatus');
        if (userStatus) userStatus.textContent = userName === 'Гость' ? '👤 войдите' : '🧠 онлайн';
        
        const nameSpan = document.getElementById('userNamePlaceholder');
        if (nameSpan) nameSpan.textContent = userName;
        
        const goalUserName = document.getElementById('goalUserName');
        if (goalUserName) goalUserName.textContent = userName;
        
        const avatarImg = document.getElementById('userAvatar');
        if (avatarImg) {
            const firstLetter = userName.charAt(0).toUpperCase();
            avatarImg.src = `https://ui-avatars.com/api/?name=${firstLetter}&background=248bf2&color=fff&size=64`;
        }
    },
    
    setScreenContent(html) {
        const container = document.getElementById('screenContainer');
        if (container) container.innerHTML = html;
    },
    
    addMessageToChat(text, sender, messagesListId = 'messagesList') {
        const messagesList = document.getElementById(messagesListId);
        if (!messagesList) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender === 'user' ? 'user-message' : 'bot-message'}`;
        messageDiv.innerHTML = `
            <div class="message-bubble">
                <div class="message-text">${this.escapeHtml(text)}</div>
                <div class="message-time">только что</div>
            </div>
        `;
        messagesList.appendChild(messageDiv);
        
        const container = document.querySelector('.messages-container');
        if (container) container.scrollTop = container.scrollHeight;
    },
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

window.UI = UI;
