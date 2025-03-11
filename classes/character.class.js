/**
 * Represents the player character in the game
 * @extends MoveableObject
 */
class Character extends MoveableObject {
    /**
     * Width and Height of the character
     * @type {number}
     */
    width = 150;
    height = 300;
    
    /**
     * Y position of the character
     * @type {number}
     */
    y = 0;
    
    /**
     * Collision offset values
     * @type {Object}
     */
    offset = {
        top: 130,
        right: 30,
        bottom: 15,
        left: 30
    };
    
    /**
     * Movement speed
     * @type {number}
     */
    speed = 6;
    
    /**
     * Timestamp of the last movement
     * @type {number}
     */
    lastMovement = new Date().getTime();
    
    /**
     * Reference to the game world
     * @type {World}
     */
    world;

    /**
     * Images for idle animation
     * @type {string[]}
     */
    IMAGES_IDLE = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    /**
     * Images for long idle animation
     * @type {string[]}
     */
    IMAGES_LONG_IDLE = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    /**
     * Images for walking animation
     * @type {string[]}
     */
    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];

    /**
     * Images for jumping animation
     * @type {string[]}
     */
    IMAGES_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png',
    ];

    /**
     * Images for dead animation
     * @type {string[]}
     */
    IMAGES_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];

    /**
     * Images for hurt animation
     * @type {string[]}
     */
    IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png',
    ];

    /**
     * Creates a new character
     */
    constructor() {
        super();
        this.initializeCharacter();
    }
    
    /**
     * Initializes the character properties and animations
     */
    initializeCharacter() {
        this.loadImage('./img/2_character_pepe/2_walk/W-21.png');
        this.loadAllAnimationImages();
        this.animate();
        this.applyGravity();
    }
    
    /**
     * Loads all animation images for the character
     */
    loadAllAnimationImages() {
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
    }

    /**
     * Starts character animation loops
     */
    animate() {
        this.startMovementInterval();
        this.startAnimationInterval();
    }
    
    /**
     * Starts the movement update interval
     */
    startMovementInterval() {
        this.movementInterval = setInterval(() => {
            if (this.world && !this.world.gameActive) return;
            
            this.updateMovement();
            this.updateCamera();
        }, 1000 / 60);
    }
    
    /**
     * Updates character movement based on keyboard input
     */
    updateMovement() {
        let isMoving = false;
        
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            isMoving = this.handleRightMovement();
        }

        if (this.world.keyboard.LEFT && this.x > 0) {
            isMoving = this.handleLeftMovement();
        }

        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            isMoving = this.handleJump();
        }
        
        this.updateSoundBasedOnMovement(isMoving);
    }
    
    /**
     * Handles right movement
     * @returns {boolean} Whether movement occurred
     */
    handleRightMovement() {
        this.otherDirection = false;
        this.moveRight();
        
        if (this.world.audioManager) {
            this.world.audioManager.playCharacterWalkingSound();
        }
        
        return true;
    }
    
    /**
     * Handles left movement
     * @returns {boolean} Whether movement occurred
     */
    handleLeftMovement() {
        this.otherDirection = true;
        this.moveLeft();
        
        if (this.world.audioManager) {
            this.world.audioManager.playCharacterWalkingSound();
        }
        
        return true;
    }
    
    /**
     * Handles jump action
     * @returns {boolean} Whether jump occurred
     */
    handleJump() {
        this.jump();
        
        if (this.world.audioManager) {
            this.world.audioManager.playJumpSound();
            this.world.audioManager.stopCharacterWalkingSound();
        }
        
        return true;
    }
    
    /**
     * Updates sounds based on character movement state
     * @param {boolean} isMoving - Whether the character is moving
     */
    updateSoundBasedOnMovement(isMoving) {
        if (!isMoving) {
            if (this.world.audioManager) {
                this.world.audioManager.stopCharacterWalkingSound();
            }
        }
        
        if (isMoving || this.isAboveGround()) {
            this.lastMovement = new Date().getTime();
            
            if (this.world.audioManager) {
                this.world.audioManager.stopCharacterSnoringSound();
            }
        }
    }

    /**
     * Updates the camera position to follow the character
     */
    updateCamera() {
        this.world.camera_x = -this.x + 100;
    }
    
    /**
     * Starts the animation update interval
     */
    startAnimationInterval() {
        this.animationInterval = setInterval(() => {
            if (this.world && !this.world.gameActive) return;
            
            this.updateAnimation();
        }, 80);
    }
    
    /**
     * Updates the character animation based on current state
     */
    updateAnimation() {
        if (this.isDead() && this.percentage === 0) {
            this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.handleIdleAnimation();
        }
    }
    
    /**
     * Handles idle animation states
     */
    handleIdleAnimation() {
        const currentTime = new Date().getTime();
        const idleTime = currentTime - this.lastMovement;
        
        if (idleTime > 3000) {
            this.playLongIdleAnimation();
        } else {
            this.playRegularIdleAnimation();
        }
    }
    
    /**
     * Plays the long idle animation with snoring
     */
    playLongIdleAnimation() {
        this.playAnimation(this.IMAGES_LONG_IDLE);
        
        if (this.world.audioManager) {
            this.world.audioManager.playCharacterSnoringSound();
        }
    }
    
    /**
     * Plays the regular idle animation
     */
    playRegularIdleAnimation() {
        this.playAnimation(this.IMAGES_IDLE);
        
        if (this.world.audioManager) {
            this.world.audioManager.stopCharacterSnoringSound();
        }
    }

    /**
     * Handles the character being hit
     */
    hit() {
        if (this.isHurt()) return;
        
        this.applyDamage();
        this.playHurtSound();
        this.resetIdleTime();
    }
    
    /**
     * Applies damage to the character
     */
    applyDamage() {
        this.energy -= 39;
        this.lastHit = new Date().getTime();
    }
    
    /**
     * Plays the hurt sound
     */
    playHurtSound() {
        if (this.world && this.world.audioManager) {
            this.world.audioManager.playHurtSound();
        }
    }
    
    /**
     * Resets the idle timer
     */
    resetIdleTime() {
        this.lastMovement = new Date().getTime();
    }
    
    /**
     * Moves the character to the right
     */
    moveRight() {
        super.moveRight();
        this.lastMovement = new Date().getTime();
    }
    
    /**
     * Moves the character to the left
     */
    moveLeft() {
        super.moveLeft();
        this.lastMovement = new Date().getTime();
    }
    
    /**
     * Makes the character jump
     */
    jump() {
        super.jump();
        this.lastMovement = new Date().getTime();
    }
}