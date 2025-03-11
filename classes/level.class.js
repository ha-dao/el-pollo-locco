/**
 * Represents a game level with all its components
 */
class Level {
    /**
     * Array of enemy objects
     * @type {Array<MoveableObject>}
     */
    enemies;
    
    /**
     * Array of cloud objects
     * @type {Array<Cloud>}
     */
    clouds;
    
    /**
     * Array of background objects
     * @type {Array<BackgroundObject>}
     */
    backgroundObjects;
    
    /**
     * Array of coin objects
     * @type {Array<Coin>}
     */
    coins;
    
    /**
     * Array of bottle objects
     * @type {Array<Bottle>}
     */
    bottles;
    
    /**
     * X position where the level ends
     * @type {number}
     */
    level_end_x = 2200;

    /**
     * Creates a new level
     * @param {Array<MoveableObject>} enemies - Array of enemy objects
     * @param {Array<Cloud>} clouds - Array of cloud objects
     * @param {Array<BackgroundObject>} backgroundObjects - Array of background objects
     * @param {Array<Coin>} coins - Array of coin objects
     * @param {Array<Bottle>} bottles - Array of bottle objects
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}