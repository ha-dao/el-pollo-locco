/**
 * Collision detection and object interactions for the World class
 */

/**
 * Checks collisions between character and enemies
 */
World.prototype.checkCollisions = function() {
    this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy) && !enemy.isDead()) {
            if (!this.character.isHurt()) {
                this.character.hit();
                this.statusBar.setPercentages(this.character.energy);
            }
        }
    });
};

/**
 * Checks for coin collection collisions
 */
World.prototype.checkCoinCollection = function() {
    this.level.coins.forEach((coin, index) => {
        if (this.character.isColliding(coin)) {
            this.collectCoin(index);
        }
    });
};

/**
 * Processes coin collection
 * @param {number} index - The index of the collected coin
 */
World.prototype.collectCoin = function(index) {
    this.level.coins.splice(index, 1);
    this.coinsCollected++;
    this.coinStatusBar.setPercentage(this.coinsCollected);
    
    if (this.audioManager) {
        this.audioManager.playCoinCollectSound();
    }
};

/**
 * Checks for bottle collection collisions
 */
World.prototype.checkBottleCollection = function() {
    this.level.bottles.forEach((bottle, index) => {
        if (this.character.isColliding(bottle) && this.bottlesCollected < 10) {
            this.collectBottle(index);
        }
    });
};

/**
 * Processes bottle collection
 * @param {number} index - The index of the collected bottle
 */
World.prototype.collectBottle = function(index) {
    this.level.bottles.splice(index, 1);
    this.bottlesCollected++;
    this.bottleStatusBar.setPercentage(this.bottlesCollected);
    this.audioManager.playBottleCollectSound();
};

/**
 * Creates and throws a bottle
 */
World.prototype.throwBottle = function() {
    if (this.bottlesCollected > 0) {
        this.createThrowableBottle();
        this.decreaseBottleCount();
        this.playBottleThrowSound();
    }
};

/**
 * Creates a new throwable bottle object
 */
World.prototype.createThrowableBottle = function() {
    let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
    this.throwableObjects.push(bottle);
};

/**
 * Decreases the bottle count and updates UI
 */
World.prototype.decreaseBottleCount = function() {
    this.bottlesCollected--;
    this.bottleStatusBar.setPercentage(this.bottlesCollected);
};

/**
 * Plays the bottle throw sound effect
 */
World.prototype.playBottleThrowSound = function() {
    if (this.audioManager) {
        this.audioManager.playBottleThrowSound();
    }
};

/**
 * Checks if a bottle throw should be initiated
 */
World.prototype.checkThrowObjects = function() {
    if (this.keyboard.F && this.bottlesCollected > 0) {
        // Actual throw happens in keyboard handler
    }
};

/**
 * Checks for collisions between thrown bottles and enemies
 */
World.prototype.checkBottleEnemyCollisions = function() {
    this.throwableObjects.forEach((bottle) => {
        if (bottle.hasHitEnemy) return;
        
        this.checkBottleEnemyCollision(bottle);
    });
};

/**
 * Checks if a single bottle collides with any enemy
 * @param {ThrowableObject} bottle - The bottle to check
 */
World.prototype.checkBottleEnemyCollision = function(bottle) {
    let bottleHitEnemy = false;
    
    this.level.enemies.forEach((enemy) => {
        if (!enemy.isDead() && !bottleHitEnemy && bottle.isColliding(enemy)) {
            bottleHitEnemy = true;
            this.handleBottleEnemyHit(bottle, enemy);
        }
    });
};

/**
 * Handles the event when a bottle hits an enemy
 * @param {ThrowableObject} bottle - The bottle that hit
 * @param {MoveableObject} enemy - The enemy that was hit
 */
World.prototype.handleBottleEnemyHit = function(bottle, enemy) {
    bottle.hasHitEnemy = true;
    enemy.hit();
    this.playBottleHitSounds(enemy);
    this.stopAndSplashBottle(bottle);
};

/**
 * Plays appropriate sounds for bottle hit
 * @param {MoveableObject} enemy - The enemy that was hit
 */
World.prototype.playBottleHitSounds = function(enemy) {
    if (this.audioManager) {
        this.audioManager.playBottleSmashSound();
        
        if (enemy instanceof Endboss) {
            this.audioManager.playChickenDeathSound();
        } else if (enemy.isDead()) {
            this.audioManager.playChickenDeathSound();
        }
    }
};

/**
 * Stops bottle movement and plays splash animation
 * @param {ThrowableObject} bottle - The bottle to stop and splash
 */
World.prototype.stopAndSplashBottle = function(bottle) {
    clearInterval(bottle.throwInterval);
    bottle.playAnimation(bottle.IMAGES_SPLASH);
    
    setTimeout(() => {
        const index = this.throwableObjects.indexOf(bottle);
        if (index > -1) this.throwableObjects.splice(index, 1);
    }, 200);
};

/**
 * Removes a bottle by index
 * @param {number} index - The index of the bottle to remove
 */
World.prototype.removeBottle = function(index) {
    this.throwableObjects.splice(index, 1);
};