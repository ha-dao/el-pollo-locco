/**
 * Handles UI elements for the audio manager
 */
class AudioManagerUI extends AudioManagerCore {
    /**
     * Creates the mute toggle button in the UI
     */
    createMuteButton() {
        const canvasContainer = document.querySelector('.game-content');
        this.removeExistingSettings();
        const gameSettings = this.createSettingsContainer();
        
        this.createAudioButton(gameSettings);
        this.createInstructionButton(gameSettings);
        
        canvasContainer.appendChild(gameSettings);
    }
    
    /**
     * Removes existing game settings if they exist
     */
    removeExistingSettings() {
        const existingSettings = document.getElementById('game-settings');
        if (existingSettings) {
            existingSettings.remove();
        }
    }
    
    /**
     * Creates the settings container element
     * @returns {HTMLElement} The settings container
     */
    createSettingsContainer() {
        const gameSettings = document.createElement('section');
        gameSettings.id = 'game-settings';
        gameSettings.className = 'game-settings';
        return gameSettings;
    }
    
    /**
     * Creates the audio toggle button
     * @param {HTMLElement} container - The container to add the button to
     */
    createAudioButton(container) {
        const audioButton = document.createElement('button');
        audioButton.id = 'audio-toggle';
        audioButton.className = `audio-button ${this.isMuted ? 'audio-off' : 'audio-on'}`;
        
        this.addImageToAudioButton(audioButton);
        this.addEventListenersToAudioButton(audioButton);
        
        container.appendChild(audioButton);
    }
    
    /**
     * Adds the appropriate image to the audio button
     * @param {HTMLElement} audioButton - The audio button
     */
    addImageToAudioButton(audioButton) {
        const audioImg = document.createElement('img');
        audioImg.src = `./img/icons/${this.isMuted ? 'mute' : 'sound'}.png`;
        audioImg.alt = 'Toggle Sound';
        audioButton.appendChild(audioImg);
    }

    /**
     * Adds event listeners to the audio button
     * @param {HTMLElement} audioButton - The audio button
     */
    addEventListenersToAudioButton(audioButton) {
        const self = this;
        
        this.addClickEventToButton(audioButton, self);
        this.addTouchEventsToButton(audioButton, self);
    }

    /**
     * Adds click event to a button
     * @param {HTMLElement} button - The button element
     * @param {Object} self - Reference to the class instance
     */
    addClickEventToButton(button, self) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            self.toggleMute();
            this.blur();
        });
    }

    /**
     * Adds touch events to a button
     * @param {HTMLElement} button - The button element
     * @param {Object} self - Reference to the class instance
     */
    addTouchEventsToButton(button, self) {
        button.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
        });
        
        button.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            self.toggleMute();
            this.blur();
        });
    }
    
    /**
     * Creates the instruction button
     * @param {HTMLElement} container - The container to add the button to
     */
    createInstructionButton(container) {
        const instructionButton = document.createElement('button');
        instructionButton.id = 'instruction-info';
        instructionButton.className = 'instruction-info-button';
        instructionButton.textContent = '?';
        
        this.addEventListenersToInstructionButton(instructionButton);
        container.appendChild(instructionButton);
    }
    
    /**
     * Adds event listeners to the instruction button
     * @param {HTMLElement} instructionButton - The instruction button
     */
    addEventListenersToInstructionButton(instructionButton) {
        this.addInstructionClickEvent(instructionButton);
        this.addInstructionTouchEvents(instructionButton);
    }

    /**
     * Adds click event to instruction button
     * @param {HTMLElement} button - The instruction button
     */
    addInstructionClickEvent(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleInstruction();
            this.blur();
        });
    }

    /**
     * Adds touch events to instruction button
     * @param {HTMLElement} button - The instruction button
     */
    addInstructionTouchEvents(button) {
        button.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
        });
        
        button.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleInstruction();
            this.blur();
        });
    }

    /**
     * Updates the audio button's appearance
     * @param {HTMLElement} audioButton - The audio button
     */
    updateAudioButtonAppearance(audioButton) {
        if (this.isMuted) {
            this.updateButtonToMutedState(audioButton);
        } else {
            this.updateButtonToUnmutedState(audioButton);
        }
        
        audioButton.blur();
    }
    
    /**
     * Updates button to show muted state
     * @param {HTMLElement} audioButton - The audio button
     */
    updateButtonToMutedState(audioButton) {
        audioButton.classList.remove('audio-on');
        audioButton.classList.add('audio-off');
        
        this.updateButtonImage(audioButton, './img/icons/mute.png');
    }
    
    /**
     * Updates button to show unmuted state
     * @param {HTMLElement} audioButton - The audio button
     */
    updateButtonToUnmutedState(audioButton) {
        audioButton.classList.remove('audio-off');
        audioButton.classList.add('audio-on');
        
        this.updateButtonImage(audioButton, './img/icons/sound.png');
    }
    
    /**
     * Updates the image in the audio button
     * @param {HTMLElement} audioButton - The audio button
     * @param {string} imagePath - Path to the new image
     */
    updateButtonImage(audioButton, imagePath) {
        const oldImg = audioButton.querySelector('img');
        if (oldImg) {
            const newImg = document.createElement('img');
            newImg.src = imagePath;
            newImg.alt = 'Toggle Sound';
            oldImg.parentNode.replaceChild(newImg, oldImg);
        }
    }

    /**
     * Removes the audio button from the UI
     */
    removeAudioButton() {
        const gameSettings = document.getElementById('game-settings');
        if (gameSettings) {
            gameSettings.remove();
        }
    }
}