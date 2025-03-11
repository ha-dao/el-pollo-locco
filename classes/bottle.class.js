/**
 * Represents a collectible bottle in the game
 * @extends MoveableObject
 */
class Bottle extends MoveableObject {
    /**
     * Collision offset values
     * @type {Object}
     */
    offset = {
        top: 15,
        right: 15,
        bottom: 5,
        left: 15
    };
    
    /**
     * Width of the bottle
     * @type {number}
     */
    width = 50;
    
    /**
     * Height of the bottle
     * @type {number}
     */
    height = 60;
    
    /**
     * Images for bottle variants
     * @type {string[]}
     */
    IMAGES = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /**
     * Creates a new bottle
     */
    constructor() {
        super();
        this.initializeBottle();
    }
    
    /**
     * Initializes the bottle properties
     */
    initializeBottle() {
        this.loadRandomBottleImage();
        this.setRandomPosition();
    }
    
    /**
     * Loads a random bottle image variant
     */
    loadRandomBottleImage() {
        const randomIndex = Math.floor(Math.random() * 2);
        this.loadImage(this.IMAGES[randomIndex]);
    }
    
    /**
     * Sets a random position for the bottle
     */
    setRandomPosition() {
        this.x = 100 + Math.random() * 1900;
        this.y = 360;
    }
}