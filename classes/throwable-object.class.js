/**
 * Represents a throwable object in the game
 * @extends MoveableObject
 */
class ThrowableObject extends MoveableObject {
    /**
     * Speed on X-axis
     * @type {number}
     */
    speedX = 4;
    
    /**
     * Whether the bottle has hit an enemy
     * @type {boolean}
     */
    hasHitEnemy = false;
    
    /**
     * Interval identifier for the throw animation
     * @type {number}
     */
    throwInterval = null;
    
    /**
     * Collision offset values
     * @type {Object}
     */
    offset = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
    };
    
    /**
     * Images for bottle in the air
     * @type {string[]}
     */
    IMAGES_BOTTLE = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    
    /**
     * Images for bottle splash animation
     * @type {string[]}
     */
    IMAGES_SPLASH = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    /**
     * Creates a new throwable object
     * @param {number} x - X position of the throw origin
     * @param {number} y - Y position of the throw origin
     * @param {boolean} [facingLeft=false] - Whether to throw to the left
     */
    constructor(x, y, facingLeft = false) {
        super();
        this.initializeThrowableObject(x, y, facingLeft);
    }
    
    /**
     * Initializes the throwable object properties
     * @param {number} x - X position of the throw origin
     * @param {number} y - Y position of the throw origin
     * @param {boolean} facingLeft - Whether to throw to the left
     */
    initializeThrowableObject(x, y, facingLeft) {
        this.loadImage(this.IMAGES_BOTTLE[0]);
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImages(this.IMAGES_SPLASH);
        
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 60;
        this.otherDirection = facingLeft; // Set sprite direction
        this.throw(facingLeft);
    }

    /**
     * Initiates the throwing animation and physics
     * @param {boolean} facingLeft - Whether to throw to the left
     */
    throw(facingLeft) {
        this.speedY = 25;
        this.applyGravity();
        const directionMultiplier = facingLeft ? -1 : 1;
        
        this.throwInterval = setInterval(() => {
            this.x += this.speedX * directionMultiplier;
            this.playAnimation(this.IMAGES_BOTTLE);
            this.checkBottleOutOfBounds();
        }, 25);
    }
    
    /**
     * Checks if the bottle is out of visible area and removes it
     */
    checkBottleOutOfBounds() {
        if (this.y > 400 || this.x < -500 || this.x > 3000) {
            this.removeBottle();
        }
    }
    
    /**
     * Removes the bottle from the scene
     */
    removeBottle() {
        clearInterval(this.throwInterval);
        
        if (this.world) {
            const index = this.world.throwableObjects.indexOf(this);
            if (index > -1) {
                this.world.throwableObjects.splice(index, 1);
            }
        }
    }
}