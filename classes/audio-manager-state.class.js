/**
 * Manages audio state (mute/unmute, persistence)
 */
class AudioManagerState extends AudioManagerUI {
    /**
     * Toggles the mute state of all audio
     */
    toggleMute() {
        this.isMuted = !this.isMuted;
        this.saveStateAndUpdateButton();
    }
    
    /**
     * Saves mute state and updates the button appearance
     */
    saveStateAndUpdateButton() {
        localStorage.setItem('gameAudioMuted', this.isMuted.toString());
        
        const audioButton = document.getElementById('audio-toggle');
        if (!audioButton) return;
        
        this.updateAudioButtonAppearance(audioButton);
        this.updateAudioState();
    }

    /**
     * Updates the audio state based on mute setting
     */
    updateAudioState() {
        if (this.isMuted) {
            this.handleMutedState();
        } else {
            this.resumeBackgroundMusic();
        }
    }

    /**
     * Handles actions when audio is muted
     */
    handleMutedState() {
        this.pauseAllSounds();
        
        this.sounds.backgroundMusic.pause();
        this.sounds.backgroundMusic.currentTime = 0;
    }

    /**
     * Pauses all active sounds
     */
    pauseAllSounds() {
        Object.values(this.sounds).forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
    }

    /**
     * Resumes playing background music if not muted
     */
    resumeBackgroundMusic() {
        if (this.isMuted) {
            return;
        }
        
        this.sounds.backgroundMusic.play().catch((error) => {
            console.log('Background music autoplay prevented:', error);
            this.pendingAutoplay = true;
        });
    }

    /**
     * Completely stops background music and resets it
     */
    stopBackgroundMusic() {
        const bgMusic = this.sounds.backgroundMusic;
        bgMusic.pause();
        bgMusic.currentTime = 0;
        
        this.sounds.backgroundMusic = new Audio('./audio/background-music.mp3');
        this.sounds.backgroundMusic.loop = true;
        this.sounds.backgroundMusic.volume = 0.3;
    }
}