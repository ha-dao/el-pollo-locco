/**
 * Represents a collectible coin in the game
 * @extends MoveableObject
 */
class Coin extends MoveableObject {
    /**
     * Collision offset values
     * @type {Object}
     */
    offset = {
        top: 30,
        right: 30,
        bottom: 30,
        left: 30
    };
    
    /**
     * Width of the coin
     * @type {number}
     */
    width = 100;
    
    /**
     * Height of the coin
     * @type {number}
     */
    height = 100;
    
    /**
     * Images for coin animation
     * @type {string[]}
     */
    IMAGES_COIN = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];

    /**
     * Creates a new coin
     * @param {number} [x] - Optional x position
     * @param {number} [y] - Optional y position
     */
    constructor(x, y) {
        super();
        this.initializeCoin(x, y);
        this.animate();
    }
    
    /**
     * Initializes the coin properties
     * @param {number} [x] - Optional x position
     * @param {number} [y] - Optional y position
     */
    initializeCoin(x, y) {
        this.loadImage(this.IMAGES_COIN[0]);
        this.loadImages(this.IMAGES_COIN);
        this.setRandomPosition(x, y);
    }
    
    /**
     * Sets random or specified position for the coin
     * @param {number} [x] - Optional x position
     * @param {number} [y] - Optional y position
     */
    setRandomPosition(x, y) {
        this.x = x || 150 + Math.random() * 2000;
        this.y = y || 100 + Math.random() * 200;
    }

    /**
     * Starts the coin animation
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 250);
    }
}