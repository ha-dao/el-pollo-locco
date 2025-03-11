/**
 * Canvas element reference
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * World instance
 * @type {World}
 */
let world;

/**
 * Keyboard input handler instance
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * Timestamp of the last bottle throw
 * @type {number}
 */
let lastBottleThrow = 0;

/**
 * Cooldown time between bottle throws in milliseconds
 * @type {number}
 */
const bottleThrowCooldown = 300;

/**
 * Initializes the game by setting up the world and canvas
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    if ('ontouchstart' in window) {
        createMobileControls();
    }
}

/**
 * Handles special actions for certain keys
 * @param {string} key - The mapped key name
 */
function handleSpecialKeyActions(key) {
    if (key === 'F') {
        const currentTime = new Date().getTime();
        if (currentTime - lastBottleThrow > bottleThrowCooldown && world && world.bottlesCollected > 0) {
            world.throwBottle();
            lastBottleThrow = currentTime;
        }
    }
}

/**
 * Removes the start screen from view
 */
function removeStartScreen() {
    const startScreen = document.getElementById('start-screen');
    if (startScreen) {
        startScreen.style.display = 'none';
    }
}

/**
 * Restarts the game by resetting all components
 */
function restartGame() {
    removeGameOverlay();
    removeMobileControlsIfExist();
    const isMuted = preserveAudioState();
    resetGameComponents(isMuted);
}

/**
 * Removes the game overlay if it exists
 */
function removeGameOverlay() {
    const overlay = document.getElementById('game-overlay');
    if (overlay) {
        overlay.remove();
    }
}

/**
 * Preserves the audio state before restarting
 * @returns {boolean} Whether audio was muted before restart
 */
function preserveAudioState() {
    let isMuted = false;
    if (world && world.audioManager) {
        isMuted = world.audioManager.isMuted;
        world.audioManager.removeAudioButton();
    }
    return isMuted;
}

/**
 * Resets all game components and initializes a new game
 * @param {boolean} isMuted - Whether audio should be muted
 */
function resetGameComponents(isMuted) {
    keyboard = new Keyboard();
    setupKeyboardControls();
    
    initLevel1();
    init();
    removeStartScreen();
    
    restoreAudioState(isMuted);
}

/**
 * Restores the audio state after game reset
 * @param {boolean} isMuted - Whether audio should be muted
 */
function restoreAudioState(isMuted) {
    if (world && world.audioManager) {
        world.audioManager.stopBackgroundMusic();
        world.audioManager.isMuted = isMuted;
        if (isMuted) {
            world.audioManager.isMuted = true;
        } else {
            world.audioManager.resumeBackgroundMusic();
        }
    }
}

// Initialize event listeners when document loads
document.addEventListener('DOMContentLoaded', setupTouchButtons);
document.addEventListener('DOMContentLoaded', setupKeyboardControls);