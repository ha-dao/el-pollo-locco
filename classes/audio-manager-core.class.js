/**
 * Core audio manager class with base properties and initialization
 */
class AudioManagerCore {
    /**
     * Collection of all game sounds
     * @type {Object<string, HTMLAudioElement>}
     */
    sounds = {
        backgroundMusic: new Audio('audio/background-music.mp3'),
        bottleClink: new Audio('audio/bottle-clink.mp3'),
        bottleSmash: new Audio('audio/bottle-smash.mp3'),
        chickenScream: new Audio('audio/chicken-scream.mp3'),
        coin: new Audio('audio/coin.mp3'),
        jumping: new Audio('audio/jumping.mp3'),
        running: new Audio('audio/running.mp3'),
        snoring: new Audio('audio/snoring.mp3'),
        lose: new Audio('audio/you-lose.mp3'),
        win: new Audio('audio/you-win.mp3'),
        hurt: new Audio('audio/hurt.mp3')
    };

    /**
     * Whether audio is currently muted
     * @type {boolean}
     */
    isMuted = false;
    
    /**
     * Whether running sound is currently playing
     * @type {boolean}
     */
    isRunning = false;
    
    /**
     * Whether snoring sound is currently playing
     * @type {boolean}
     */
    isSnoring = false;
    
    /**
     * Reference to the character object
     * @type {Character}
     */
    character = null;
    
    /**
     * Whether autoplay was prevented and is pending
     * @type {boolean}
     */
    pendingAutoplay = false;

    /**
     * Creates a new audio manager core
     */
    constructor() {
        this.initializeAudio();
    }
    
    /**
     * Initializes all audio components
     */
    initializeAudio() {
        this.loadMuteStateFromLocalStorage();
        this.setupBackgroundMusic();
        this.createMuteButton();
        this.resumeBackgroundMusic();
    }

    /**
     * Loads the mute state from local storage
     */
    loadMuteStateFromLocalStorage() {
        const savedMuteState = localStorage.getItem('gameAudioMuted');
        
        if (savedMuteState !== null) {
            this.isMuted = savedMuteState === 'true';
        } else {
            this.isMuted = true;
            localStorage.setItem('gameAudioMuted', 'true');
        }
    }

    /**
     * Sets up the background music properties
     */
    setupBackgroundMusic() {
        this.sounds.backgroundMusic.loop = true;
        this.sounds.backgroundMusic.volume = 0.3;
    }
}