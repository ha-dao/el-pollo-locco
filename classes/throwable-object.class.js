/**
 * Represents a throwable object (bottle) in the game
 * @extends MoveableObject
 */
class ThrowableObject extends MoveableObject {
    /**
     * Images for bottle rotation animation
     * @type {string[]}
     */
    IMAGES_ROTATION = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
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
     * Whether the bottle has hit an enemy
     * @type {boolean}
     */
    hasHitEnemy = false;

    /**
     * Creates a new throwable object
     * @param {number} x - Starting x position
     * @param {number} y - Starting y position
     */
    constructor(x, y) {
        super();
        this.initializeBottle(x, y);
        this.throw();
    }
    
    /**
     * Initializes the bottle properties
     * @param {number} x - Starting x position
     * @param {number} y - Starting y position
     */
    initializeBottle(x, y) {
        this.loadImage('./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x - 50;
        this.y = y - 80;
        this.width = 50;
        this.height = 60;
    }

    /**
     * Throws the bottle with physics and animation
     */
    throw() {
        this.initializeThrowPhysics();
        this.startAnimationAndMovement();
        this.setupAutoSplash();
    }
    
    /**
     * Initializes throw physics
     */
    initializeThrowPhysics() {
        this.speedY = 20;
        this.applyGravity();
    }
    
    /**
     * Starts bottle animation and movement
     */
    startAnimationAndMovement() {
        this.throwInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATION);
            this.x += 5;
        }, 20);
    }
    
    /**
     * Sets up automatic splash after timeout
     */
    setupAutoSplash() {
        setTimeout(() => {
            this.playSplashAnimation();
        }, 5000);
    }
    
    /**
     * Plays the splash animation and removes the bottle
     */
    playSplashAnimation() {
        this.playAnimation(this.IMAGES_SPLASH);
        clearInterval(this.throwInterval);
        
        setTimeout(() => {
            this.removeFromWorld();
        }, 200);
    }
    
    /**
     * Removes this bottle from the world
     */
    removeFromWorld() {
        const index = world.throwableObjects.indexOf(this);
        if (index > -1) world.throwableObjects.splice(index, 1);
    }
}