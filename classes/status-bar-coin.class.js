/**
 * Status bar for displaying collected coins
 * @extends StatusBar
 */
class StatusBarCoin extends StatusBar {
    /**
     * Image paths for different coin status states
     * @type {string[]}
     */
    IMAGES = [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];
    
    /**
     * Number of coins collected
     * @type {number}
     */
    coins = 0;

    /**
     * Creates a new coin status bar
     */
    constructor() {
        super();
        this.initialize();
    }
    
    /**
     * Initializes the coin status bar properties
     */
    initialize() {
        this.loadImages(this.IMAGES);
        this.setPosition();
        this.setDimensions();
        this.setPercentage(0);
    }
    
    /**
     * Sets the position of the coin status bar
     */
    setPosition() {
        this.x = 28;
        this.y = 35;
    }
    
    /**
     * Sets the dimensions of the coin status bar
     */
    setDimensions() {
        this.width = 180;
        this.height = 50;
    }

    /**
     * Updates the status bar based on number of coins collected
     * @param {number} coins - Number of coins collected
     */
    setPercentage(coins) {
        this.coins = coins;
        this.updateImage();
    }
    
    /**
     * Updates the displayed image based on current coins count
     */
    updateImage() {
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the image index based on coins collected
     * @returns {number} The index of the image to use
     */
    resolveImageIndex() {
        if(this.coins >= 10) {
            return 5;
        } else if(this.coins >= 8) {
            return 4;
        } else if(this.coins >= 6) {
            return 3;
        } else if(this.coins >= 4) {
            return 2;
        } else if(this.coins >= 2) {
            return 1;
        } else {
            return 0;
        }
    }
}