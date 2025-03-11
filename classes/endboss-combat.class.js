/**
 * Combat and damage functionality for the endboss
 * @extends EndbossBehavior
 */
class EndbossCombat extends EndbossBehavior {
    /**
     * Handles when the endboss is hit
     */
    hit() {
        if (this.energy <= 0) return;
        this.processHit();
        this.triggerHurtAnimation();
        this.updateUI();
        this.checkIfDead();
    }
    
    /**
     * Processes the hit effects and damage
     */
    processHit() {
        this.activateIfFirstHit();
        this.applyDamage();
    }
    
    /**
     * Activates the endboss if this is the first hit
     */
    activateIfFirstHit() {
        if (!this.hasBeenHit) {
            this.hasBeenHit = true;
            this.speed = this.baseSpeed;
        }
    }
    
    /**
     * Applies damage to the endboss
     */
    applyDamage() {
        this.energy -= 25;
        this.lastHit = new Date().getTime();
    }
    
    /**
     * Triggers the hurt animation sequence
     */
    triggerHurtAnimation() {
        this.isHurtAnimation = true;
        this.isAttacking = false;
        
        setTimeout(() => {
            this.finishHurtAnimation();
        }, this.hurtAnimationDuration);
    }
    
    /**
     * Finishes the hurt animation and resets state
     */
    finishHurtAnimation() {
        if (this.energy <= 0) return;
        
        this.isHurtAnimation = false;
        
        if (this.characterNearby) {
            this.isAttacking = true;
        }
    }
    
    /**
     * Updates UI elements after being hit
     */
    updateUI() {
        if (this.world) {
            this.world.endbossStatusBar.setPercentages(this.energy);
            this.playHitSounds();
        }
    }
    
    /**
     * Plays sounds for being hit
     */
    playHitSounds() {
        if (this.world.audioManager) {
            this.world.audioManager.playHurtSound();
            this.world.audioManager.playChickenDeathSound();
        }
    }
    
    /**
     * Checks if the endboss is dead after being hit
     */
    checkIfDead() {
        if (this.energy <= 0) {
            this.die();
        }
    }

    /**
     * Handles the death of the endboss
     */
    die() {
        this.resetStatesOnDeath();
        this.playDeathSound();
    }
    
    /**
     * Resets all states on death
     */
    resetStatesOnDeath() {
        this.speed = 0;
        this.isAttacking = false;
        this.isAlerted = false;
        this.isHurtAnimation = false;
    }
    
    /**
     * Plays the death sound
     */
    playDeathSound() {
        if (this.world && this.world.audioManager) {
            this.world.audioManager.playChickenDeathSound();
        }
    }
}