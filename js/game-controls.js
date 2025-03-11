/**
 * Mapping of keyboard keys to game actions
 * @type {Object}
 */
const keyMap = {
    'ArrowRight': 'RIGHT',
    'd': 'RIGHT',
    'ArrowLeft': 'LEFT',
    'a': 'LEFT',
    'ArrowUp': 'UP',
    'w': 'UP',
    'ArrowDown': 'DOWN',
    's': 'DOWN',
    ' ': 'SPACE',
    'f': 'F'
};

/**
 * Handles key press events
 * @param {KeyboardEvent} event - The keyboard event
 */
document.addEventListener('keydown', (event) => {
    const key = keyMap[event.key];
    if (key) {
        keyboard[key] = true;
        handleSpecialKeyActions(key);
    }
});

/**
 * Handles key release events
 * @param {KeyboardEvent} event - The keyboard event
 */
document.addEventListener('keyup', (event) => {
    const key = keyMap[event.key];
    if (key) keyboard[key] = false;
});

/**
 * Prevents default touch behaviors that might interfere with the game
 */
document.addEventListener('touchstart', (event) => {
    event.preventDefault();
}, { passive: false });

/**
 * Prevents default touch move behaviors
 */
document.addEventListener('touchmove', (event) => {
    event.preventDefault();
}, { passive: false });

/**
 * Sets up keyboard control event listeners
 */
function setupKeyboardControls() {
    document.addEventListener('keydown', (event) => {
        const key = keyMap[event.key];
        if (key) keyboard[key] = true;
    });

    document.addEventListener('keyup', (event) => {
        const key = keyMap[event.key];
        if (key) keyboard[key] = false;
    });
}

/**
 * Add touch event listeners to a button element
 * @param {string} buttonId - The ID of the button element
 * @param {function} clickHandler - The function to call when clicked/touched
 */
function enableTouchForButton(buttonId, clickHandler) {
    const button = document.getElementById(buttonId);
    if (!button) return;
    
    setupButtonClickEvent(button, clickHandler);
    setupButtonTouchEvents(button, clickHandler);
}

/**
 * Sets up click event for a button
 * @param {HTMLElement} button - The button element
 * @param {function} clickHandler - The click handler function
 */
function setupButtonClickEvent(button, clickHandler) {
    button.addEventListener('click', (e) => {
        clickHandler(e);
    });
}

/**
 * Sets up touch events for a button
 * @param {HTMLElement} button - The button element
 * @param {function} clickHandler - The click handler function
 */
function setupButtonTouchEvents(button, clickHandler) {
    button.addEventListener('touchstart', (e) => {
        e.preventDefault();
    });
    
    button.addEventListener('touchend', (e) => {
        e.preventDefault();
        clickHandler(e);
    });
}

/**
 * Sets up all touch-enabled buttons in the game
 */
function setupTouchButtons() {
    setupGameButtons();
    setupLegalNoticeLink();
}

/**
 * Sets up main game interaction buttons
 */
function setupGameButtons() {
    enableTouchForButton('start-game-btn', () => {
        initLevel1();
        init();
        removeStartScreen();
    });
    
    enableTouchForButton('instruction-start-btn', toggleInstruction);
}

/**
 * Sets up the legal notice link for touch devices
 */
function setupLegalNoticeLink() {
    const legalNoticeLink = document.querySelector('.legal-notice-link');
    if (legalNoticeLink) {
        setupLegalNoticeTouchEvents(legalNoticeLink);
    }
}

/**
 * Sets up touch events for legal notice link
 * @param {HTMLElement} legalNoticeLink - The legal notice link element
 */
function setupLegalNoticeTouchEvents(legalNoticeLink) {
    legalNoticeLink.addEventListener('touchstart', function(e) {
        this.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    });
    
    legalNoticeLink.addEventListener('touchend', function(e) {
        this.style.backgroundColor = '';
        window.location.href = this.getAttribute('href');
        e.preventDefault();
    });
}