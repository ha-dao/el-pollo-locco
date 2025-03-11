/**
 * Gameplay mechanics and game-end conditions for the World class
 */

/**
 * Checks if game end conditions are met
 */
World.prototype.checkGameEndConditions = function() {
    if (!this.gameActive) return;
    
    this.checkCharacterDeath();
    this.checkEndbossDefeat();
};

/**
 * Checks if the character has died
 */
World.prototype.checkCharacterDeath = function() {
    if (this.character.isDead()) {
        this.showGameOverScreen();
    }
};

/**
 * Checks if the endboss has been defeated
 */
World.prototype.checkEndbossDefeat = function() {
    const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
    
    if (endboss && endboss.isDead() && !this.character.isDead()) {
        this.showGameWinScreen();
    }
};

/**
 * Shows the game over screen
 */
World.prototype.showGameOverScreen = function() {
    setTimeout(() => {
        this.stopAllAnimations();
        this.createOverlay('./img/9_intro_outro_screens/game_over/oh-no-you-lost.png', 'restart-game-btn');
        this.audioManager.playLoseSound();
    }, 700);
};

/**
 * Shows the game win screen
 */
World.prototype.showGameWinScreen = function() {
    setTimeout(() => {
        this.stopAllAnimations();
        this.createOverlay('./img/9_intro_outro_screens/game_over/game-over.png', 'restart-win-btn');
        this.audioManager.playWinSound();
    }, 700);
};

/**
 * Creates an overlay with image and buttons
 * @param {string} imagePath - Path to the overlay background image
 * @param {string} buttonId - ID for the restart button
 */
World.prototype.createOverlay = function(imagePath, buttonId) {
    const canvasContainer = document.querySelector('.game-content');
    this.addOverlayHTML(canvasContainer, imagePath, buttonId);
    this.setupOverlayButtons(buttonId);
};

/**
 * Adds overlay HTML to the container
 * @param {HTMLElement} container - The container element
 * @param {string} imagePath - Path to the overlay background image
 * @param {string} buttonId - ID for the restart button
 */
World.prototype.addOverlayHTML = function(container, imagePath, buttonId) {
    const overlayHTML = `
        <div id="game-overlay" class="game-overlay" style="background-image: url(${imagePath});">
            <button id="home-button" class="home-button">Home</button>
            <button id="${buttonId}" class="restart-button">Restart</button>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', overlayHTML);
};

/**
 * Sets up overlay button event listeners
 * @param {string} buttonId - ID for the restart button
 */
World.prototype.setupOverlayButtons = function(buttonId) {
    const restartButton = document.getElementById(buttonId);
    const homeButton = document.getElementById('home-button');
    
    this.setupRestartButton(restartButton);
    this.setupHomeButton(homeButton);
};

/**
 * Sets up restart button events
 * @param {HTMLElement} restartButton - The restart button element
 */
World.prototype.setupRestartButton = function(restartButton) {
    restartButton.addEventListener('mouseover', function() {
        this.classList.add('restart-button-hover');
    });
    
    restartButton.addEventListener('mouseout', function() {
        this.classList.remove('restart-button-hover');
    });
    
    restartButton.addEventListener('click', restartGame);
    this.setupRestartButtonTouch(restartButton);
};

/**
 * Sets up touch events for restart button
 * @param {HTMLElement} restartButton - The restart button element
 */
World.prototype.setupRestartButtonTouch = function(restartButton) {
    restartButton.addEventListener('touchstart', function(e) {
        e.preventDefault();
        this.classList.add('restart-button-hover');
    });
    
    restartButton.addEventListener('touchend', function(e) {
        e.preventDefault();
        this.classList.remove('restart-button-hover');
        restartGame();
    });
};

/**
 * Sets up home button events
 * @param {HTMLElement} homeButton - The home button element
 */
World.prototype.setupHomeButton = function(homeButton) {
    homeButton.addEventListener('mouseover', function() {
        this.classList.add('home-button-hover');
    });
    
    homeButton.addEventListener('mouseout', function() {
        this.classList.remove('home-button-hover');
    });
    
    homeButton.addEventListener('click', function() {
        window.location.reload();
    });
    
    this.setupHomeButtonTouch(homeButton);
};

/**
 * Sets up touch events for home button
 * @param {HTMLElement} homeButton - The home button element
 */
World.prototype.setupHomeButtonTouch = function(homeButton) {
    homeButton.addEventListener('touchstart', function(e) {
        e.preventDefault();
        this.classList.add('home-button-hover');
    });
    
    homeButton.addEventListener('touchend', function(e) {
        e.preventDefault();
        this.classList.remove('home-button-hover');
        window.location.reload();
    });
};

/**
 * Checks for top collision (jumping on enemies)
 */
World.prototype.checkTopCollisions = function() {
    if (this.shouldThrottleTopCollision()) return;
    this.lastTopCollisionCheck = new Date().getTime();
    
    const enemiesHit = [];
    
    this.level.enemies.forEach((enemy) => {
        if (this.canStompEnemy(enemy) && this.isStompingOnEnemy(enemy)) {
            this.handleEnemyStomp(enemy, enemiesHit);
        }
    });
    
    if (enemiesHit.length > 0) {
        this.character.lastHit = 0;
    }
    
    this.updateCollisionCheck();
};

/**
 * Determines if top collision check should be throttled
 * @returns {boolean} Whether to skip this check
 */
World.prototype.shouldThrottleTopCollision = function() {
    const currentTime = new Date().getTime();
    return this.lastTopCollisionCheck && currentTime - this.lastTopCollisionCheck < 1;
};

/**
 * Checks if an enemy can be stomped on
 * @param {MoveableObject} enemy - The enemy to check
 * @returns {boolean} Whether the enemy can be stomped
 */
World.prototype.canStompEnemy = function(enemy) {
    return !enemy.isDead() && !enemy.hasBeenJumpedOn;
};

/**
 * Checks if character is stomping on an enemy
 * @param {MoveableObject} enemy - The enemy to check
 * @returns {boolean} Whether the character is stomping the enemy
 */
World.prototype.isStompingOnEnemy = function(enemy) {
    const characterBox = this.getCollisionBox(this.character);
    const enemyBox = this.getCollisionBox(enemy);
    
    const horizontalOverlap = 
        characterBox.left < enemyBox.right &&
        characterBox.right > enemyBox.left;
    
    const verticalOverlap = 
        characterBox.bottom >= enemyBox.top &&
        characterBox.bottom <= enemyBox.top + 60;
    
    const isFalling = this.character.speedY < 0;
    
    return horizontalOverlap && verticalOverlap && isFalling;
};

/**
 * Gets collision box for an object
 * @param {DrawableObject} obj - The object
 * @returns {Object} Collision box coordinates
 */
World.prototype.getCollisionBox = function(obj) {
    return {
        left: obj.x + obj.offset.left,
        right: obj.x + obj.width - obj.offset.right,
        bottom: obj.y + obj.height - obj.offset.bottom,
        top: obj.y + obj.offset.top
    };
};

/**
 * Handles enemy stomp event
 * @param {MoveableObject} enemy - The stomped enemy
 * @param {Array} enemiesHit - Array of enemies hit during this stomp
 */
World.prototype.handleEnemyStomp = function(enemy, enemiesHit) {
    enemy.hasBeenJumpedOn = true;
    enemy.hit();

    if (this.audioManager) {
        this.audioManager.playChickenDeathSound();
    }
    
    enemiesHit.push(enemy);
    
    if (this.audioManager) {
        this.audioManager.playJumpSound();
    }
};

/**
 * Updates collision check method to prevent damage during stomp
 */
World.prototype.updateCollisionCheck = function() {
    this.checkCollisions = () => {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isDead()) {
                if (!this.isInStompPosition(enemy) && !this.character.isHurt()) {
                    this.character.hit();
                    this.statusBar.setPercentages(this.character.energy);
                }
            }
        });
    };
};

/**
 * Checks if character is in a stomping position relative to enemy
 * @param {MoveableObject} enemy - The enemy to check
 * @returns {boolean} Whether in stomp position
 */
World.prototype.isInStompPosition = function(enemy) {
    const characterBottom = this.character.y + this.character.height - this.character.offset.bottom;
    const enemyTop = enemy.y + enemy.offset.top;
    
    return this.character.speedY < 0 && 
           characterBottom >= enemyTop &&
           characterBottom <= enemyTop + 60;
};