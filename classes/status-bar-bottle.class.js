/**
 * Status bar for displaying collected bottles
 * @extends StatusBar
 */
class StatusBarBottle extends StatusBar {
    /**
     * Image paths for different bottle status states
     * @type {string[]}
     */
    IMAGES = [
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];
    
    /**
     * Number of bottles collected
     * @type {number}
     */
    bottles = 0;

    /**
     * Creates a new bottle status bar
     */
    constructor() {
        super();
        this.initialize();
    }
    
    /**
     * Initializes the bottle status bar properties
     */
    initialize() {
        this.loadImages(this.IMAGES);
        this.setPosition();
        this.setDimensions();
        this.setPercentage(0);
    }
    
    /**
     * Sets the position of the bottle status bar
     */
    setPosition() {
        this.x = 10;
        this.y = 70;
    }
    
    /**
     * Sets the dimensions of the bottle status bar
     */
    setDimensions() {
        this.width = 180;
        this.height = 50;
    }

    /**
     * Updates the status bar based on number of bottles collected
     * @param {number} bottles - Number of bottles collected (0-10)
     */
    setPercentage(bottles) {
        this.bottles = Math.min(bottles, 10); // Maximum 10
        this.updateImage();
    }
    
    /**
     * Updates the displayed image based on current bottles count
     */
    updateImage() {
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the image index based on bottles collected
     * @returns {number} The index of the image to use
     */
    resolveImageIndex() {
        return Math.floor(this.bottles / 2); // 0-10 becomes 0-5 index
    }
}