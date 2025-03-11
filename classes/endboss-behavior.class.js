/**
 * Behavior and AI functionality for the endboss
 * @extends EndbossAnimation
 */
class EndbossBehavior extends EndbossAnimation {
    /**
     * Checks if character is within detection range
     */
    checkCharacterProximity() {
        if (!this.world || !this.world.character) return;
        
        const distanceToCharacter = this.calculateDistanceToCharacter();
        this.updateBehaviorBasedOnDistance(distanceToCharacter);
    }
    
    /**
     * Calculates distance to the character
     * @returns {number} Distance to character in pixels
     */
    calculateDistanceToCharacter() {
        return Math.abs(this.x - this.world.character.x);
    }
    
    /**
     * Updates behavior based on distance to character
     * @param {number} distance - Distance to character
     */
    updateBehaviorBasedOnDistance(distance) {
        const detectionRange = 500;
        
        if (distance < detectionRange && !this.characterNearby) {
            this.characterNearby = true;
            this.startAttack();
        } else if (distance >= detectionRange) {
            this.resetToNormalState();
        }
    }
    
    /**
     * Resets to normal movement state when character is far away
     */
    resetToNormalState() {
        this.characterNearby = false;
        this.isAttacking = false;
        this.speed = this.baseSpeed;
    }

    /**
     * Starts attack mode if activated
     */
    startAttack() {
        if (!this.hasBeenHit) return;
        
        this.isAttacking = true;
        this.speed = this.baseSpeed * 1.5;
    }
}