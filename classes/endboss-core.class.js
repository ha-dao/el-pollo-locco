/**
 * Core properties and initialization for the final boss enemy
 * @extends MoveableObject
 */
class EndbossCore extends MoveableObject {
    /**
     * Height and Width of the endboss
     * @type {number}
     */
    height = 400;
    width = 200;

    /**
     * Y position of the endboss
     * @type {number}
     */
    y = 60;
    
    /**
     * Number of hits received
     * @type {number}
     */
    hitCount = 0;
    
    /**
     * Collision offset values
     * @type {Object}
     */
    offset = {
        top: 70,
        right: 20,
        bottom: 10,
        left: 20
    };
    
    /**
     * Current energy/health level
     * @type {number}
     */
    energy = 100;
    
    /**
     * Base movement speed
     * @type {number}
     */
    baseSpeed = 4.5;
    
    /**
     * Current movement speed
     * @type {number}
     */
    speed = 0;
    
    /**
     * Whether the boss is in alert state
     * @type {boolean}
     */
    isAlerted = true;
    
    /**
     * Whether the boss is attacking
     * @type {boolean}
     */
    isAttacking = false;
    
    /**
     * Whether the boss is playing hurt animation
     * @type {boolean}
     */
    isHurtAnimation = false;
    
    /**
     * Whether the boss has been hit at least once (activated)
     * @type {boolean}
     */
    hasBeenHit = false;
    
    /**
     * Timestamp of last hit
     * @type {number}
     */
    lastHit = 0;
    
    /**
     * Whether the character is nearby
     * @type {boolean}
     */
    characterNearby = false;
    
    /**
     * Duration of alert animation in ms
     * @type {number}
     */
    alertDuration = 2000;
    
    /**
     * Duration of hurt animation in ms
     * @type {number}
     */
    hurtAnimationDuration = 500;

    /**
     * Images for alert animation
     * @type {string[]}
     */
    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    /**
     * Images for walking animation
     * @type {string[]}
     */
    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    /**
     * Images for attack animation
     * @type {string[]}
     */
    IMAGES_ATTACK = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    /**
     * Images for hurt animation
     * @type {string[]}
     */
    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    /**
     * Images for dead animation
     * @type {string[]}
     */
    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    /**
     * Creates a new endboss
     */
    constructor() {
        super();
        this.initializeEndboss();
    }
    
    /**
     * Initializes the endboss properties
     */
    initializeEndboss() {
        this.loadImage(this.IMAGES_ALERT[0]);
        this.loadAllAnimationImages();
        this.x = 2200;
        this.animate();
    }
    
    /**
     * Loads all animation images
     */
    loadAllAnimationImages() {
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
    }

    /**
     * Sets the world reference
     * @param {World} world - The game world instance
     */
    setWorld(world) {
        this.world = world;
    }

    /**
     * Moves the endboss to the left
     */
    moveLeft() {
        this.x -= this.speed;
    }
}