class ChickenSmall extends MoveableObject {
    height = 70;
    width = 50;
    y = 360;
    offset = {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5
    };
    energy = 100;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 800 + Math.random() * 8000;
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
        if (this.isDead()) return;
        this.energy -= 100;
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            this.speed = 0;
            this.markForRemoval();
        }
    }

    markForRemoval() {
        this.removalTimeout = setTimeout(() => {
            this.shouldBeRemoved = true;
        }, 500);
    }

    isDead() {
        return this.energy <= 0;
    }
}