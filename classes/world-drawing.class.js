/**
 * Drawing functionality for the World class
 */

/**
 * Draws the game world
 */
World.prototype.draw = function() {
    this.clearCanvas();
    this.drawGameWorld();
    this.scheduleNextFrame();
};

/**
 * Clears the canvas for fresh rendering
 */
World.prototype.clearCanvas = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

/**
 * Draws all game world elements
 */
World.prototype.drawGameWorld = function() {
    // Background layer (follows camera)
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);

    // UI layer (fixed position)
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.coinStatusBar);
    this.addToMap(this.bottleStatusBar);
    this.addToMap(this.endbossStatusBar);
    
    // Game objects layer (follows camera)
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.throwableObjects);
    
    // Reset translation
    this.ctx.translate(-this.camera_x, 0);
};

/**
 * Schedules the next animation frame
 */
World.prototype.scheduleNextFrame = function() {
    let self = this;
    requestAnimationFrame(function () {
        self.draw();
    });
};

/**
 * Adds multiple objects to the map
 * @param {Array<DrawableObject>} objects - Array of objects to add
 */
World.prototype.addObjectsToMap = function(objects) {
    objects.forEach(o => {
        this.addToMap(o);
    });
};

/**
 * Adds a single object to the map
 * @param {DrawableObject} mo - The object to add
 */
World.prototype.addToMap = function(mo) {
    if(mo.otherDirection) {
        this.flipImage(mo);
    }
    
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if(mo.otherDirection) {
        this.flipImageBack(mo);
    }
};

/**
 * Flips an image horizontally
 * @param {DrawableObject} mo - The object to flip
 */
World.prototype.flipImage = function(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1,1);
    mo.x = mo.x * -1;
};

/**
 * Restores an image after flipping
 * @param {DrawableObject} mo - The object to restore
 */
World.prototype.flipImageBack = function(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
};

/**
 * Stops all animation intervals
 */
World.prototype.stopAllAnimations = function() {
    this.gameActive = false;
    
    this.stopCharacterAnimations();
    this.stopEnemyAnimations();
    this.stopCloudAnimations();
    this.stopCoinAnimations();
    this.stopBottleAnimations();
    
    this.clearAllIntervals();
};

/**
 * Stops character animations
 */
World.prototype.stopCharacterAnimations = function() {
    if (this.character) {
        clearInterval(this.character.animationInterval);
        clearInterval(this.character.movementInterval);
    }
};

/**
 * Stops enemy animations
 */
World.prototype.stopEnemyAnimations = function() {
    this.level.enemies.forEach(enemy => {
        if (enemy.animationInterval) clearInterval(enemy.animationInterval);
        if (enemy.movementInterval) clearInterval(enemy.movementInterval);
        if (enemy.walkingAnimationInterval) clearInterval(enemy.walkingAnimationInterval);
    });
};

/**
 * Stops cloud animations
 */
World.prototype.stopCloudAnimations = function() {
    this.level.clouds.forEach(cloud => {
        if (cloud.movementInterval) clearInterval(cloud.movementInterval);
    });
};

/**
 * Stops coin animations
 */
World.prototype.stopCoinAnimations = function() {
    this.level.coins.forEach(coin => {
        if (coin.animationInterval) clearInterval(coin.animationInterval);
    });
};

/**
 * Stops throwable bottle animations
 */
World.prototype.stopBottleAnimations = function() {
    this.throwableObjects.forEach(bottle => {
        if (bottle.throwInterval) clearInterval(bottle.throwInterval);
        if (bottle.animationInterval) clearInterval(bottle.animationInterval);
    });
};

/**
 * Clears all intervals to ensure proper cleanup
 */
World.prototype.clearAllIntervals = function() {
    let highestId = window.setInterval(() => {}, 100000);
    for (let i = 0; i < highestId; i++) {
        window.clearInterval(i);
    }
};