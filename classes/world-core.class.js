/**
 * Main game world class that manages all game objects and core logic
 */
class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinStatusBar = new StatusBarCoin();
    bottleStatusBar = new StatusBarBottle();
    endbossStatusBar = new StatusBarEndboss();
    bottlesCollected = 0;
    coinsCollected = 0;
    throwableObjects = [];
    gameActive = true;
    score = 0;

    /**
     * Creates a new world instance
     * @param {HTMLCanvasElement} canvas - The game canvas element
     * @param {Keyboard} keyboard - The keyboard input handler
     */
    constructor(canvas, keyboard) {
        this.initializeWorld(canvas, keyboard);
        this.setupGameObjects();
        this.startGameLoops();
    }
    
    /**
     * Initializes the world with canvas and keyboard
     */
    initializeWorld(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.audioManager = new AudioManager();
    }
    
    /**
     * Sets up game objects and references
     */
    setupGameObjects() {
        this.draw();
        this.setWorld();
        this.audioManager.character = this.character;
    }
    
    /**
     * Starts all game loop intervals
     */
    startGameLoops() {
        this.run();
        
        // Check game end conditions regularly
        setInterval(() => {
            this.checkGameEndConditions();
        }, 500);
    }

    /**
     * Sets the world reference for game objects
     */
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
        });
    }

    /**
     * Runs the main game logic loop
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkTopCollisions();
            this.checkThrowObjects();
            this.checkCoinCollection();
            this.checkBottleCollection();
            this.checkBottleEnemyCollisions();
            this.removeDeadEnemies();
        }, 50);
    }
    
    /**
     * Removes enemies that are marked for removal
     */
    removeDeadEnemies() {
        this.level.enemies = this.level.enemies.filter(enemy => {
            if (enemy.shouldBeRemoved) {
                clearTimeout(enemy.removalTimeout);
                return false;
            }
            return true;
        });
    }
}