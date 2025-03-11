/**
 * Base status bar for displaying health and other statuses
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
    /**
     * Image paths for different status bar states
     * @type {string[]}
     */
    IMAGES = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];
    
    /**
     * Current percentage value
     * @type {number}
     */
    percentage = 100;

    /**
     * Creates a new status bar
     */
    constructor() {
        super();
        this.initialize();
    }
    
    /**
     * Initializes the status bar properties
     */
    initialize() {
        this.loadImages(this.IMAGES);
        this.setPosition();
        this.setDimensions();
        this.setPercentages(100);
    }
    
    /**
     * Sets the position of the status bar
     */
    setPosition() {
        this.x = 10;
        this.y = -10;
    }
    
    /**
     * Sets the dimensions of the status bar
     */
    setDimensions() {
        this.width = 200;
        this.height = 60;
    }

    /**
     * Updates the status bar based on a percentage value
     * @param {number} percentage - The percentage value (0-100)
     */
    setPercentages(percentage) {
        this.percentage = percentage;
        this.updateImage();
    }
    
    /**
     * Updates the displayed image based on current percentage
     */
    updateImage() {
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
    
    /**
     * Determines the image index based on percentage
     * @returns {number} The index of the image to use
     */
    resolveImageIndex() {
        if(this.percentage == 100) {
            return 5;
        } else if(this.percentage > 80) {
            return 4;
        } else if(this.percentage > 60) {
            return 3;
        } else if(this.percentage > 40) {
            return 2;
        } else if(this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}