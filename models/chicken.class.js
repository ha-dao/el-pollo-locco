class Chicken extends MoveableObject {
    height = 100;
    width = 70;
    y = 330;
    offset = {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5
    };
    energy = 100;
    hasBeenJumpedOn = false;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 500 + Math.random() * 6000;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        if (!this.isDead()) {
            setInterval(() => this.moveLeft(), 1000 / 60);
        }
        
        setInterval(() => {
            if (!this.isDead()) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 800);
    }

    hit() {
        if (this.isDead()) return; // Already dead, do nothing
        
        this.energy = 0; // Kill instantly
        this.speed = 0;  // Stop movement
        
        // Make sure we load and play the dead animation
        this.loadImage(this.IMAGES_DEAD[0]);
        this.playAnimation(this.IMAGES_DEAD);
        
        // Make sure the chicken is marked for removal after a delay
        this.markForRemoval();
    }
    
    // Also make sure markForRemoval is properly implemented:
    markForRemoval() {
        if (this.removalTimeout) clearTimeout(this.removalTimeout); // Clear any existing timeout
        
        this.removalTimeout = setTimeout(() => {
            this.shouldBeRemoved = true;
        }, 1000); // Wait 1 second before removing from game
    }

    isDead() {
        return this.energy <= 0;
    }
}