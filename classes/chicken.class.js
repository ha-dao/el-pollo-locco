/**
 * Represents a regular chicken enemy in the game
 * @extends MoveableObject
 */
class Chicken extends MoveableObject {
    /**
     * Height of the chicken
     * @type {number}
     */
    height = 100;
    
    /**
     * Width of the chicken
     * @type {number}
     */
    width = 70;
    
    /**
     * Y position of the chicken
     * @type {number}
     */
    y = 330;
    
    /**
     * Collision offset values
     * @type {Object}
     */
    offset = {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5
    };
    
    /**
     * Current energy/health level
     * @type {number}
     */
    energy = 100;
    
    /**
     * Whether the chicken has been jumped on
     * @type {boolean}
     */
    hasBeenJumpedOn = false;
    
    /**
     * Images for walking animation
     * @type {string[]}
     */
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    /**
     * Images for dead state
     * @type {string[]}
     */
    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];

    /**
     * Creates a new chicken
     */
    constructor() {
        super();
        this.initializeChicken();
    }
    
    /**
     * Initializes the chicken properties
     */
    initializeChicken() {
        this.loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        
        this.setRandomPosition();
        this.setRandomSpeed();
        this.animate();
    }
    
    /**
     * Sets a random position for the chicken
     */
    setRandomPosition() {
        this.x = 500 + Math.random() * 6000;
    }
    
    /**
     * Sets a random movement speed
     */
    setRandomSpeed() {
        this.speed = 0.15 + Math.random() * 0.25;
    }

    /**
     * Starts chicken animation and movement
     */
    animate() {
        this.startMovement();
        this.startAnimation();
    }
    
    /**
     * Starts the movement interval
     */
    startMovement() {
        if (!this.isDead()) {
            setInterval(() => this.moveLeft(), 1000 / 60);
        }
    }
    
    /**
     * Starts the animation interval
     */
    startAnimation() {
        setInterval(() => {
            if (!this.isDead()) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 800);
    }

    /**
     * Handles the chicken being hit
     */
    hit() {
        if (this.isDead()) return;
        
        this.killChicken();
        this.playDeathSound();
        this.markForRemoval();
    }
    
    /**
     * Kills the chicken
     */
    killChicken() {
        this.energy = 0;
        this.speed = 0;
        this.playAnimation(this.IMAGES_DEAD);
    }
    
    /**
     * Plays the chicken death sound
     */
    playDeathSound() {
        if (this.world && this.world.audioManager) {
            this.world.audioManager.playChickenDeathSound();
        }
    }

    /**
     * Marks the chicken for removal after a delay
     */
    markForRemoval() {
        this.removalTimeout = setTimeout(() => {
            this.shouldBeRemoved = true;
        }, 500);
    }

    /**
     * Checks if the chicken is dead
     * @returns {boolean} Whether the chicken is dead
     */
    isDead() {
        return this.energy <= 0;
    }
}