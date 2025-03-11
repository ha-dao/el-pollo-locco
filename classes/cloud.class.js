/**
 * Represents a cloud in the background
 * @extends MoveableObject
 */
class Cloud extends MoveableObject {
    /**
     * Y position of the cloud
     * @type {number}
     */
    y = 20;
    
    /**
     * Height of the cloud
     * @type {number}
     */
    height = 250;
    
    /**
     * Width of the cloud
     * @type {number}
     */
    width = 500;

    /**
     * Creates a new cloud
     */
    constructor() {
        super();
        this.initializeCloud();
        this.animate();
    }
    
    /**
     * Initializes the cloud properties
     */
    initializeCloud() {
        this.loadImage('./img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 2500;
    }

    /**
     * Starts the cloud animation
     */
    animate() {
        this.moveLeft();
    }

    /**
     * Moves the cloud to the left
     */
    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}