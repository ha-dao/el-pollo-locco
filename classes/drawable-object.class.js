/**
 * Base class for all drawable objects in the game
 */
class DrawableObject {
    /**
     * The image object
     * @type {HTMLImageElement}
     */
    img;
    
    /**
     * Cache for preloaded images
     * @type {Object<string, HTMLImageElement>}
     */
    imageCache = {};
    
    /**
     * Current animation frame index
     * @type {number}
     */
    currentImage = 0;
    
    /**
     * X position
     * @type {number}
     */
    x = 120;
    
    /**
     * Y position
     * @type {number}
     */
    y = 280;
    
    /**
     * Object height
     * @type {number}
     */
    height = 150;
    
    /**
     * Object width
     * @type {number}
     */
    width = 100;

    /**
     * Collision offset values
     * @type {Object}
     */
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };

    /**
     * Loads a single image
     * @param {string} path - Path to the image
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object on the canvas
     * @param {CanvasRenderingContext2D} ctx - The canvas context
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws a collision frame around the object (debug purpose)
     * @param {CanvasRenderingContext2D} ctx - The canvas context
     */
    drawFrame(ctx) {
        if (this instanceof Character) {
            this.drawCharacterFrame(ctx);
        } else if (this instanceof Chicken || this instanceof ChickenSmall) {
            this.drawChickenFrame(ctx);
        } else if (this instanceof Bottle || this instanceof Coin || this instanceof Endboss) {
            this.drawCollectibleFrame(ctx);
        }
    }
    
    /**
     * Draws character collision frame
     * @param {CanvasRenderingContext2D} ctx - The canvas context
     */
    drawCharacterFrame(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255, 0, 0, 0)";
        ctx.rect(
            this.x + this.offset.left,
            this.y + this.offset.top,
            this.width - this.offset.left - this.offset.right,
            this.height - this.offset.top - this.offset.bottom
        );
        ctx.stroke();
    }
    
    /**
     * Draws chicken collision frame
     * @param {CanvasRenderingContext2D} ctx - The canvas context
     */
    drawChickenFrame(ctx) {
        ctx.strokeStyle = "rgba(255,0,0,0)";
        ctx.strokeRect(
            this.x + this.offset.left,
            this.y + this.offset.top,
            this.width - this.offset.left - this.offset.right,
            this.height - this.offset.top - this.offset.bottom
        );
    }
    
    /**
     * Draws collectible item collision frame
     * @param {CanvasRenderingContext2D} ctx - The canvas context
     */
    drawCollectibleFrame(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255, 255, 0, 0)";
        ctx.rect(
            this.x + this.offset.left,
            this.y + this.offset.top,
            this.width - this.offset.left - this.offset.right,
            this.height - this.offset.top - this.offset.bottom
        );
        ctx.stroke();
    }

    /**
     * Loads multiple images into the image cache
     * @param {string[]} arr - Array of image paths
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}