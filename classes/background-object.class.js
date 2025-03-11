/**
 * Represents a background layer in the game
 * @extends MoveableObject
 */
class BackgroundObject extends MoveableObject {
    /**
     * Width of the background object
     * @type {number}
     */
    width = 720;
    
    /**
     * Height of the background object
     * @type {number}
     */
    height = 480;
    
    /**
     * Creates a new background object
     * @param {string} imagePath - Path to the background image
     * @param {number} x - X position of the background
     */
    constructor(imagePath, x) {
        super();
        this.initializeBackgroundObject(imagePath, x);
    }
    
    /**
     * Initializes the background object properties
     * @param {string} imagePath - Path to the background image
     * @param {number} x - X position of the background
     */
    initializeBackgroundObject(imagePath, x) {
        this.loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}