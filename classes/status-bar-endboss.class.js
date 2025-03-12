/**
 * Status bar for displaying endboss health
 * @extends StatusBar
 */
class StatusBarEndboss extends StatusBar {
    /**
     * Image paths for different endboss status states
     * @type {string[]}
     */
    IMAGES = [
        './img/7_statusbars/2_statusbar_endboss/0.png',
        './img/7_statusbars/2_statusbar_endboss/20.png',
        './img/7_statusbars/2_statusbar_endboss/40.png',
        './img/7_statusbars/2_statusbar_endboss/60.png',
        './img/7_statusbars/2_statusbar_endboss/80.png',
        './img/7_statusbars/2_statusbar_endboss/100.png',
    ];
    
    /**
     * Current percentage value
     * @type {number}
     */
    percentages = 100;

    /**
     * Visibility state of the status bar
     * @type {boolean}
     */
    visible = false;

    /**
     * Creates a new endboss status bar
     */
    constructor() {
        super();
        this.initialize();
    }
    
    /**
     * Initializes the endboss status bar properties
     */
    initialize() {
        this.loadImages(this.IMAGES);
        this.setPosition();
        this.setDimensions();
        this.setPercentages(100);
    }
    
    /**
     * Sets the position of the endboss status bar
     */
    setPosition() {
        this.x = 580;
        this.y = -10;
    }
    
    /**
     * Sets the dimensions of the endboss status bar
     */
    setDimensions() {
        this.width = 200;
        this.height = 60;
    }

    /**
     * Updates the status bar based on endboss health percentage
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
     * Sets the visibility state of the status bar
     * @param {boolean} isVisible - Whether the status bar should be visible
     */
    setVisibility(isVisible) {
        this.visible = isVisible;
    }

    /**
     * Overrides the draw method to check visibility before drawing
     * @param {CanvasRenderingContext2D} ctx - The canvas context
     */
    draw(ctx) {
        if (this.visible) {
            super.draw(ctx);
        }
    }
}