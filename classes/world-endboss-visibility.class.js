/**
 * Endboss visibility functionality for the World class
 */

/**
 * Updates the endboss status bar visibility
 */
World.prototype.updateEndbossVisibility = function() {
    const endboss = this.findEndboss();
    if (!endboss) return;
    
    const isVisible = this.isEndbossVisibleWithCharacter(endboss);
    this.endbossStatusBar.setVisibility(isVisible);
};

/**
 * Finds the endboss instance in the enemies array
 * @returns {Endboss|null} The endboss instance or null if not found
 */
World.prototype.findEndboss = function() {
    return this.level.enemies.find(enemy => enemy instanceof Endboss);
};

/**
 * Checks if the endboss is fully visible in the camera view with character
 * @param {Endboss} endboss - The endboss instance
 * @returns {boolean} Whether the endboss is fully visible
 */
World.prototype.isEndbossVisibleWithCharacter = function(endboss) {
    return this.isEntityInView(endboss) && this.isCharacterInView();
};

/**
 * Checks if the character is in the camera view
 * @returns {boolean} Whether the character is in view
 */
World.prototype.isCharacterInView = function() {
    return this.isEntityInView(this.character);
};

/**
 * Checks if an entity is fully visible in the camera view
 * @param {DrawableObject} entity - The entity to check
 * @returns {boolean} Whether the entity is fully in view
 */
World.prototype.isEntityInView = function(entity) {
    const viewLeftBound = Math.abs(this.camera_x);
    const viewRightBound = viewLeftBound + this.canvas.width;
    
    const entityLeftBound = entity.x;
    const entityRightBound = entity.x + entity.width;
    
    return entityLeftBound >= viewLeftBound && entityRightBound <= viewRightBound;
};

/**
 * Enhances the draw method to update endboss visibility
 */
const originalDraw = World.prototype.draw;
World.prototype.draw = function() {
    this.updateEndbossVisibility();
    originalDraw.call(this);
};