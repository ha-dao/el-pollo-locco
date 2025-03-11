/**
 * Base class for all objects that can move in the game
 * @extends DrawableObject
 */
class MoveableObject extends DrawableObject {
    /**
     * Movement speed
     * @type {number}
     */
    speed = 0.15;
    
    /**
     * Whether the object is facing left
     * @type {boolean}
     */
    otherDirection = false;
    
    /**
     * Vertical speed (for jumping/falling)
     * @type {number}
     */
    speedY = 0;
    
    /**
     * Gravity acceleration
     * @type {number}
     */
    acceleration = 2.5;
    
    /**
     * Current energy/health level
     * @type {number}
     */
    energy = 100;

    /**
     * Timestamp of last hit
     * @type {number}
     */
    lastHit = 0;

    /**
     * Applies gravity to the object
     */
    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.applyVerticalMovement();
            }
        }, 1000 / 30);
    }
    
    /**
     * Applies vertical movement based on current speedY
     */
    applyVerticalMovement() {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
    }

    /**
     * Checks if the object is above ground
     * @returns {boolean} Whether the object is above ground
     */
    isAboveGround() {
        if(this.constructor.name === 'ThrowableObject') {
            return true;
        } else {
            return this.y < 120;
        }
    }

    /**
     * Checks for collision with another object
     * @param {MoveableObject} mo - The object to check collision with
     * @returns {boolean} Whether objects are colliding
     */
    isColliding(mo) {
        return this.checkHorizontalCollision(mo) && this.checkVerticalCollision(mo);
    }
    
    /**
     * Checks for horizontal collision
     * @param {MoveableObject} mo - The object to check collision with
     * @returns {boolean} Whether objects overlap horizontally
     */
    checkHorizontalCollision(mo) {
        return (
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.x + this.width - this.offset.right > mo.x + mo.offset.left
        );
    }
    
    /**
     * Checks for vertical collision
     * @param {MoveableObject} mo - The object to check collision with
     * @returns {boolean} Whether objects overlap vertically
     */
    checkVerticalCollision(mo) {
        return (
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top
        );
    }

    /**
     * Applies damage to the object
     */
    hit() {
        if (this.isDead()) return;
        
        this.energy -= 30;
        if (this.isDead()) {
            this.onDeath();
        }
    }
    
    /**
     * Actions to perform on death
     */
    onDeath() {
        if (this.IMAGES_DEAD) {
            this.playAnimation(this.IMAGES_DEAD);
        }
        this.speed = 0;
    }

    /**
     * Checks if the object is currently in hurt state
     * @returns {boolean} Whether the object is hurt
     */
    isHurt() {
        let timeSinceLastHit = new Date().getTime() - this.lastHit;
        return timeSinceLastHit < 1000; // 1 second cooldown
    }

    /**
     * Checks if the object is dead
     * @returns {boolean} Whether the object is dead
     */
    isDead() {
        return this.energy <= 0;
    }

    /**
     * Plays animation frames
     * @param {string[]} images - Array of image paths
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump
     */
    jump() {
        this.speedY = 30;
    }
}