/**
 * Handles playback of audio in the game
 */
class AudioManagerPlayback extends AudioManagerState {
    /**
     * Plays the hurt sound effect
     */
    playHurtSound() {
        this.play('hurt');
    }    

    /**
     * Plays a specific sound by name
     * @param {string} soundName - Name of the sound to play
     */
    play(soundName) {
        if (this.isMuted) return;
        
        const sound = this.sounds[soundName];
        if (!sound) return;
        
        this.handleSoundPlayback(sound, soundName);
    }
    
    /**
     * Handles sound playback based on sound type
     * @param {HTMLAudioElement} sound - The sound to play
     * @param {string} soundName - Name of the sound
     */
    handleSoundPlayback(sound, soundName) {
        if (this.isNonLoopingSound(soundName)) {
            this.playOneShotSound(sound);
        } else {
            this.playLoopingSound(sound, soundName);
        }
    }
    
    /**
     * Checks if a sound is a non-looping one-shot sound
     * @param {string} soundName - Name of the sound to check
     * @returns {boolean} Whether the sound is non-looping
     */
    isNonLoopingSound(soundName) {
        return soundName !== 'running' && 
               soundName !== 'snoring' && 
               soundName !== 'backgroundMusic';
    }
    
    /**
     * Plays a one-shot sound effect
     * @param {HTMLAudioElement} sound - The sound to play
     */
    playOneShotSound(sound) {
        sound.currentTime = 0;
        sound.play().catch(() => {});
    }
    
    /**
     * Plays a looping sound
     * @param {HTMLAudioElement} sound - The sound to play
     * @param {string} soundName - Name of the sound
     */
    playLoopingSound(sound, soundName) {
        if (soundName === 'backgroundMusic') {
            sound.play().catch(() => {});
        } else if (soundName === 'running') {
            this.playRunningSound(sound);
        } else if (soundName === 'snoring') {
            this.playSnoringSound(sound);
        }
    }

    /**
     * Plays the running sound
     * @param {HTMLAudioElement} sound - The sound to play
     */
    playRunningSound(sound) {
        this.isRunning = true;
        if (!sound.paused && sound.currentTime > 0) return;
        sound.play().catch(() => {});
    }

    /**
     * Plays the snoring sound
     * @param {HTMLAudioElement} sound - The sound to play
     */
    playSnoringSound(sound) {
        this.isSnoring = true;
        if (!sound.paused && sound.currentTime > 0) return;
        sound.play().catch(() => {});
    }

    /**
     * Stops a specific sound
     * @param {string} soundName - Name of the sound to stop
     */
    stop(soundName) {
        const sound = this.sounds[soundName];
        if (!sound) return;
        
        if (soundName === 'running') {
            this.stopRunningSound(sound);
        } else if (soundName === 'snoring') {
            this.stopSnoringSound(sound);
        }
    }
    
    /**
     * Stops the running sound
     * @param {HTMLAudioElement} sound - The sound to stop
     */
    stopRunningSound(sound) {
        this.isRunning = false;
        sound.pause();
        sound.currentTime = 0;
    }
    
    /**
     * Stops the snoring sound
     * @param {HTMLAudioElement} sound - The sound to stop
     */
    stopSnoringSound(sound) {
        this.isSnoring = false;
        sound.pause();
        sound.currentTime = 0;
    }

    /**
     * Plays character walking sound if appropriate
     */
    playCharacterWalkingSound() {
        if (!this.isSnoring && this.character && !this.character.isAboveGround()) {
            this.play('running');
        }
    }

    /**
     * Stops character walking sound
     */
    stopCharacterWalkingSound() {
        this.stop('running');
    }

    /**
     * Plays character snoring sound
     */
    playCharacterSnoringSound() {
        this.play('snoring');
    }

    /**
     * Stops character snoring sound
     */
    stopCharacterSnoringSound() {
        this.stop('snoring');
    }

    /**
     * Plays bottle collect sound
     */
    playBottleCollectSound() {
        this.play('bottleClink');
    }

    /**
     * Plays coin collect sound
     */
    playCoinCollectSound() {
        this.play('coin');
    }

    /**
     * Plays jump sound
     */
    playJumpSound() {
        this.play('jumping');
    }

    /**
     * Plays bottle throw sound
     */
    playBottleThrowSound() {
        this.play('bottleClink');
    }

    /**
     * Plays bottle smash sound
     */
    playBottleSmashSound() {
        this.play('bottleSmash');
    }

    /**
     * Plays chicken death sound
     */
    playChickenDeathSound() {
        this.play('chickenScream');
    }

    /**
     * Plays win sound and stops all other sounds
     */
    playWinSound() {
        this.pauseAllSounds();
        this.stopBackgroundMusic();
        this.play('win');
    }

    /**
     * Plays lose sound and stops all other sounds
     */
    playLoseSound() {
        this.pauseAllSounds();
        this.stopBackgroundMusic();
        this.play('lose');
    }
}