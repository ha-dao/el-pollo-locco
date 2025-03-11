/**
 * Creates mobile control buttons for touch devices
 */
function createMobileControls() {
    removeMobileControlsIfExist();
    addMobileControlsToDOM();
    setupMobileControlButtons();
}

/**
 * Removes any existing mobile controls
 */
function removeMobileControlsIfExist() {
    const existingControls = document.querySelector('.mobile-controls');
    if (existingControls) {
        existingControls.remove();
    }
}

/**
 * Adds mobile control HTML to the DOM
 */
function addMobileControlsToDOM() {
    const gameContent = document.querySelector('.game-content');
    
    const mobileControlsHTML = `
        <div class="mobile-controls">
            <div class="left-controls">
                <button id="mobile-left-btn" class="mobile-control-btn">
                    <img src="./img/mobile-controls/left-arrow.png" alt="Move Left">
                </button>
                <button id="mobile-right-btn" class="mobile-control-btn">
                    <img src="./img/mobile-controls/right-arrow.png" alt="Move Right">
                </button>
            </div>
            <div class="right-controls">
                <button id="mobile-throw-btn" class="mobile-control-btn">
                    <img src="./img/mobile-controls/throw.png" alt="Throw">
                </button>
                <button id="mobile-jump-btn" class="mobile-control-btn">
                    <img src="./img/mobile-controls/jump.png" alt="Jump">
                </button>
            </div>
        </div>
    `;
    
    gameContent.insertAdjacentHTML('beforeend', mobileControlsHTML);
}

/**
 * Sets up event listeners for all mobile control buttons
 */
function setupMobileControlButtons() {
    setupMobileDirectionButtons();
    setupMobileActionButtons();
}

/**
 * Sets up left and right movement buttons for mobile
 */
function setupMobileDirectionButtons() {
    const mobileLeftBtn = document.getElementById('mobile-left-btn');
    mobileLeftBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    mobileLeftBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    const mobileRightBtn = document.getElementById('mobile-right-btn');
    mobileRightBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    mobileRightBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
}

/**
 * Sets up jump and throw buttons for mobile
 */
function setupMobileActionButtons() {
    setupMobileJumpButton();
    setupMobileThrowButton();
}

/**
 * Sets up the jump button for mobile controls
 */
function setupMobileJumpButton() {
    const mobileJumpBtn = document.getElementById('mobile-jump-btn');
    mobileJumpBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    mobileJumpBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
}

/**
 * Sets up the throw button for mobile controls with cooldown handling
 */
function setupMobileThrowButton() {
    const mobileThrowBtn = document.getElementById('mobile-throw-btn');
    mobileThrowBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const currentTime = new Date().getTime();
        if (currentTime - lastBottleThrow > bottleThrowCooldown && world && world.bottlesCollected > 0) {
            world.throwBottle();
            lastBottleThrow = currentTime;
        }
    });
}