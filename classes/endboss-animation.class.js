/**
 * Animation functionality for the endboss
 * @extends EndbossCore
 */
class EndbossAnimation extends EndbossCore {
    /**
     * Sets up all animation intervals
     */
    animate() {
        this.setupMovementInterval();
        this.setupWalkingAnimationInterval();
        this.setupStateAnimationInterval();
    }
    
    /**
     * Sets up the movement update interval
     */
    setupMovementInterval() {
        this.movementInterval = setInterval(() => {
            if (this.world && !this.world.gameActive) return;
            
            if (this.energy > 0 && this.hasBeenHit) {
                this.checkCharacterProximity();
                this.moveLeft();
            }
        }, 1000 / 20);
    }
    
    /**
     * Sets up the walking animation interval
     */
    setupWalkingAnimationInterval() {
        this.walkingAnimationInterval = setInterval(() => {
            if (this.world && !this.world.gameActive) return;
            
            this.updateWalkingAnimation();
        }, 60);
    }
    
    /**
     * Updates the walking animation based on current state
     */
    updateWalkingAnimation() {
        if (this.isInActiveWalkingState()) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }
    
    /**
     * Checks if endboss should be actively walking
     * @returns {boolean} Whether the endboss should be walking
     */
    isInActiveWalkingState() {
        return this.energy > 0 && 
               this.hasBeenHit && 
               this.speed > 0 && 
               !this.isHurtAnimation;
    }
    
    /**
     * Sets up the state-based animation interval
     */
    setupStateAnimationInterval() {
        this.animationInterval = setInterval(() => {
            if (this.world && !this.world.gameActive) return;
            
            this.updateStateAnimation();
        }, 150);
    }
    
    /**
     * Updates animation based on current state
     */
    updateStateAnimation() {
        if (this.energy <= 0) {
            this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isHurtAnimation) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.hasBeenHit && this.isAttacking) {
            this.playAnimation(this.IMAGES_ATTACK);
        } else if (!this.hasBeenHit || this.speed === 0) {
            this.playAnimation(this.IMAGES_ALERT);
        }
    }
}